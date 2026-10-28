import { Injectable, NotFoundException, BadRequestException, Optional, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import {
  Order,
  OrderItem,
  OrderStatus,
  SellerProduct,
  SellerInfo,
} from '@kickzone-workspace/entities';
import {
  CreateOrderInput,
  UpdateOrderInput,
  OrdersConnection,
  OrderEdge,
} from '@kickzone-workspace/inputs';

@Injectable()
export class OrderService {
  private static readonly ALLOWED_STATUS_TRANSITIONS: Record<
    OrderStatus,
    OrderStatus[]
  > = {
    [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
    [OrderStatus.CONFIRMED]: [
      OrderStatus.PROCESSING,
      OrderStatus.SHIPPED,
      OrderStatus.CANCELLED,
      OrderStatus.REFUNDED,
    ],
    [OrderStatus.PROCESSING]: [
      OrderStatus.SHIPPED,
      OrderStatus.CANCELLED,
      OrderStatus.REFUNDED,
    ],
    [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED, OrderStatus.REFUNDED],
    [OrderStatus.DELIVERED]: [OrderStatus.REFUNDED],
    [OrderStatus.CANCELLED]: [],
    [OrderStatus.REFUNDED]: [],
  };

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(SellerProduct)
    private sellerProductRepository: Repository<SellerProduct>,
    @InjectRepository(SellerInfo)
    private sellerInfoRepository: Repository<SellerInfo>,
    @Optional()
    @Inject(DataSource)
    private readonly dataSource?: DataSource,
  ) {}

  private async runInTransaction<T>(
    fn: (manager?: EntityManager) => Promise<T>,
  ): Promise<T> {
    if (this.dataSource?.transaction) {
      return this.dataSource.transaction(fn);
    }
    return fn(undefined);
  }

  async createOrder(createOrderInput: CreateOrderInput): Promise<Order> {
    const { items: inputItems, ...orderData } = createOrderInput;

    const order = this.orderRepository.create(orderData);

    order.orderNumber = this.generateOrderNumber();
    order.trackingNumber = this.generateTrackingNumber();

    const seller = await this.sellerInfoRepository.findOne({
      where: { id: createOrderInput.sellerId },
    });

    if (!seller) {
      throw new NotFoundException(
        `Seller with ID ${createOrderInput.sellerId} not found`,
      );
    }

    order.sellerStoreName = seller.storeName;
    order.sellerPhone = seller.phone || undefined;
    order.sellerAddress = seller.address || undefined;

    // Validate and compute prices from catalog
    const validatedItems = await Promise.all(
      inputItems.map(async (item) => {
        // Validate quantity
        if (!Number.isInteger(Number(item.quantity)) || Number(item.quantity) <= 0) {
          throw new BadRequestException(
            `Quantity must be a positive integer for product ${item.productId}`,
          );
        }

        if (!item.sellerProductId) {
          throw new BadRequestException(
            `sellerProductId is required for product ${item.productId}`,
          );
        }

        const sellerProduct = await this.sellerProductRepository.findOne({
          where: { id: item.sellerProductId },
          relations: ['seller', 'productInfo'],
        });

        if (!sellerProduct) {
          throw new NotFoundException(
            `SellerProduct with ID ${item.sellerProductId} not found`,
          );
        }

        // Ownership check: sellerProduct must belong to the order's seller
        if (Number(sellerProduct.seller.id) !== createOrderInput.sellerId) {
          throw new BadRequestException(
            `Product ${item.sellerProductId} does not belong to seller ${createOrderInput.sellerId}`,
          );
        }

        // Stock check
        if (sellerProduct.stockQuantity < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ${item.sellerProductId}. Available: ${sellerProduct.stockQuantity}, Requested: ${item.quantity}`,
          );
        }

        // Compute catalog price: price * (1 - discount/100)
        const catalogUnitPrice = Number(
          (sellerProduct.price * (1 - (sellerProduct.discount || 0) / 100)).toFixed(2),
        );
        const catalogTotalPrice = Number((catalogUnitPrice * item.quantity).toFixed(2));

        return {
          ...item,
          sellerProduct,
          catalogUnitPrice,
          catalogTotalPrice,
          originalPrice: sellerProduct.price,
          discountPercentage: sellerProduct.discount,
          productInfoId: sellerProduct.productInfoId || undefined,
        };
      }),
    );

    // Compute server-side totals from catalog prices
    order.subtotal = Number(
      validatedItems.reduce((sum, item) => sum + item.catalogTotalPrice, 0).toFixed(2),
    );

    // Validate shipping cost (must be non-negative if provided)
    const shippingCost = createOrderInput.shippingCost !== undefined
      ? createOrderInput.shippingCost
      : seller.shippingFee || 0;

    if (shippingCost < 0) {
      throw new BadRequestException('Shipping cost cannot be negative');
    }

    order.shippingCost = shippingCost;
    order.total = Number((order.subtotal + order.shippingCost).toFixed(2));

    const savedOrder = await this.orderRepository.save(order);

    const orderItemsToCreate = validatedItems.map((item) => ({
      orderId: savedOrder.id,
      productId: item.productId,
      sellerProductId: item.sellerProductId,
      productName: item.productName,
      productImage: item.productImage,
      quantity: item.quantity,
      unitPrice: item.catalogUnitPrice,
      totalPrice: item.catalogTotalPrice,
      color: item.color,
      size: item.size,
      originalPrice: item.originalPrice,
      discountPercentage: item.discountPercentage,
      productInfoId: item.productInfoId,
    }));

    const savedItems = await this.orderItemRepository.save(orderItemsToCreate);

    savedOrder.items = savedItems;

    return savedOrder;
  }

  async findAll(
    first = 10,
    after?: string,
    sellerId?: string,
    status?: OrderStatus,
  ): Promise<OrdersConnection> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('order.seller', 'seller')
      .orderBy('order.createdAt', 'DESC')
      .addOrderBy('order.id', 'DESC');

    if (sellerId) {
      const sellerIdInt = parseInt(sellerId, 10);
      if (isNaN(sellerIdInt)) {
        throw new BadRequestException('Invalid sellerId');
      }
      queryBuilder.andWhere('order.sellerId = :sellerId', {
        sellerId: sellerIdInt,
      });
    }

    if (status) {
      queryBuilder.andWhere('order.status = :status', { status });
    }

    if (after) {
      const cursor = await this.decodeCursor(after);
      queryBuilder.andWhere('order.createdAt < :cursor', { cursor });
    }

    const orders = await queryBuilder.take(first + 1).getMany();

    const hasNextPage = orders.length > first;
    const edges: OrderEdge[] = orders.slice(0, first).map((order) => ({
      node: order,
      cursor: this.encodeCursor(order.createdAt),
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage: !!after,
        endCursor: edges[edges.length - 1]?.cursor,
      },
      totalCount: await this.getTotalCount(sellerId, status),
    };
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'seller'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async updateOrder(
    id: string,
    updateOrderInput: UpdateOrderInput,
  ): Promise<Order> {
    const order = await this.findOne(id);

    Object.assign(order, updateOrderInput);

    if (updateOrderInput.items) {
      await this.orderItemRepository.delete({ orderId: id });

      const orderItems = updateOrderInput.items.map((item) => ({
        ...item,
        orderId: id,
      }));

      await this.orderItemRepository.save(orderItems);

      order.subtotal = orderItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );
      order.total = order.subtotal + order.shippingCost;
    }

    return this.orderRepository.save(order);
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    return this.runInTransaction(async (manager) => {
      const orderRepo = manager
        ? manager.getRepository(Order)
        : this.orderRepository;
      const sellerProductRepo = manager
        ? manager.getRepository(SellerProduct)
        : this.sellerProductRepository;

      const order = await orderRepo.findOne({
        where: { id },
        relations: ['items'],
        lock: manager ? { mode: 'pessimistic_write' } : undefined,
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      if (order.status === status) {
        return order;
      }

      const allowedTransitions =
        OrderService.ALLOWED_STATUS_TRANSITIONS[order.status] || [];
      if (!allowedTransitions.includes(status)) {
        throw new BadRequestException(
          `Invalid status transition from ${order.status} to ${status}`,
        );
      }

      if (
        order.status === OrderStatus.PENDING &&
        status === OrderStatus.CONFIRMED &&
        !order.stockReserved
      ) {
        await this.decreaseStock(order, sellerProductRepo);
        order.stockReserved = true;
      }

      if (
        (status === OrderStatus.CANCELLED || status === OrderStatus.REFUNDED) &&
        order.stockReserved
      ) {
        await this.restoreStock(order, sellerProductRepo);
        order.stockReserved = false;
      }

      order.status = status;
      return orderRepo.save(order);
    });
  }

  async deleteOrder(id: string): Promise<void> {
    return this.runInTransaction(async (manager) => {
      const orderRepo = manager
        ? manager.getRepository(Order)
        : this.orderRepository;
      const sellerProductRepo = manager
        ? manager.getRepository(SellerProduct)
        : this.sellerProductRepository;

      const order = await orderRepo.findOne({
        where: { id },
        relations: ['items'],
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      if (order.stockReserved) {
        await this.restoreStock(order, sellerProductRepo);
      }

      await orderRepo.remove(order);
    });
  }

  async getOrdersBySeller(
    sellerId: string,
    first = 10,
    after?: string,
    status?: OrderStatus,
  ): Promise<OrdersConnection> {
    return this.findAll(first, after, sellerId, status);
  }

  async getOrdersByStatus(
    status: OrderStatus,
    first = 10,
    after?: string,
  ): Promise<OrdersConnection> {
    return this.findAll(first, after, undefined, status);
  }

  async getOrdersByCustomerEmail(
    customerEmail: string,
    first = 10,
    after?: string,
  ): Promise<OrdersConnection> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('order.seller', 'seller')
      .where('order.customerEmail = :customerEmail', { customerEmail })
      .orderBy('order.createdAt', 'DESC');

    if (after) {
      const cursor = await this.decodeCursor(after);
      queryBuilder.andWhere('order.createdAt < :cursor', { cursor });
    }

    const orders = await queryBuilder.take(first + 1).getMany();

    const hasNextPage = orders.length > first;
    const edges: OrderEdge[] = orders.slice(0, first).map((order) => ({
      node: order,
      cursor: this.encodeCursor(order.createdAt),
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage: !!after,
        endCursor: edges[edges.length - 1]?.cursor,
      },
      totalCount: await this.orderRepository.count({
        where: { customerEmail },
      }),
    };
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ORD-${timestamp}-${random}`;
  }

  private generateTrackingNumber(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `KZ-${year}${month}${day}-${random}`;
  }

  private encodeCursor(date: Date): string {
    return Buffer.from(date.toISOString()).toString('base64');
  }

  private async decodeCursor(cursor: string): Promise<Date> {
    try {
      const decoded = Buffer.from(cursor, 'base64').toString();
      return new Date(decoded);
    } catch {
      throw new BadRequestException('Invalid cursor');
    }
  }

  private async getTotalCount(
    sellerId?: string,
    status?: OrderStatus,
  ): Promise<number> {
    const queryBuilder = this.orderRepository.createQueryBuilder('order');

    if (sellerId) {
      const sellerIdInt = parseInt(sellerId, 10);
      if (!isNaN(sellerIdInt)) {
        queryBuilder.andWhere('order.sellerId = :sellerId', {
          sellerId: sellerIdInt,
        });
      }
    }

    if (status) {
      queryBuilder.andWhere('order.status = :status', { status });
    }

    return queryBuilder.getCount();
  }

  private async decreaseStock(
    order: Order,
    sellerProductRepo: Repository<SellerProduct>,
  ): Promise<void> {
    if (order.stockReserved) {
      return;
    }

    for (const item of order.items) {
      if (
        !Number.isInteger(Number(item.quantity)) ||
        Number(item.quantity) <= 0
      ) {
        throw new BadRequestException(
          'Order item quantity must be a positive integer',
        );
      }
    }

    const qtyBySellerProduct = new Map<string, number>();
    for (const item of order.items) {
      const sellerProductId = item.sellerProductId || item.productId;
      const existing = qtyBySellerProduct.get(sellerProductId) || 0;
      qtyBySellerProduct.set(sellerProductId, existing + Number(item.quantity));
    }

    const sortedSellerProductIds = Array.from(qtyBySellerProduct.keys()).sort();

    for (const sellerProductId of sortedSellerProductIds) {
      const requiredQty = qtyBySellerProduct.get(sellerProductId)!;

      const sellerProduct = await sellerProductRepo.findOne({
        where: { id: sellerProductId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!sellerProduct) {
        throw new NotFoundException(
          `SellerProduct with ID ${sellerProductId} not found`,
        );
      }

      if (sellerProduct.stockQuantity < requiredQty) {
        throw new BadRequestException(
          `Insufficient stock for product ${sellerProductId}. Available: ${sellerProduct.stockQuantity}, Requested: ${requiredQty}`,
        );
      }
    }

    for (const sellerProductId of sortedSellerProductIds) {
      const requiredQty = qtyBySellerProduct.get(sellerProductId)!;

      const sellerProduct = await sellerProductRepo.findOne({
        where: { id: sellerProductId },
        lock: { mode: 'pessimistic_write' },
      });

      if (sellerProduct) {
        sellerProduct.stockQuantity -= requiredQty;
        await sellerProductRepo.save(sellerProduct);
      }
    }
  }

  async confirmOrderPayment(
    orderId: string,
    refId?: string,
  ): Promise<Order> {
    return this.runInTransaction(async (manager) => {
      const orderRepo = manager
        ? manager.getRepository(Order)
        : this.orderRepository;
      const sellerProductRepo = manager
        ? manager.getRepository(SellerProduct)
        : this.sellerProductRepository;

      const order = await orderRepo.findOne({
        where: { id: orderId },
        relations: ['items'],
        lock: manager ? { mode: 'pessimistic_write' } : undefined,
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      if (order.status === OrderStatus.CONFIRMED && order.stockReserved) {
        return order;
      }

      if (order.status !== OrderStatus.PENDING) {
        throw new BadRequestException(
          `Cannot confirm payment for order in status ${order.status}`,
        );
      }

      await this.decreaseStock(order, sellerProductRepo);
      order.stockReserved = true;
      order.status = OrderStatus.CONFIRMED;

      return orderRepo.save(order);
    });
  }

  async setPaymentIntent(params: {
    orderId: string;
    authority: string;
    amount: number;
    currency?: string;
  }): Promise<Order> {
    const order = await this.findOne(params.orderId);

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException(
        `Cannot create payment intent for order with status ${order.status}`,
      );
    }

    order.paymentAuthority = params.authority;
    order.paymentAmount = params.amount;
    order.paymentCurrency = params.currency || 'IRT';

    return this.orderRepository.save(order);
  }

  async findOrdersByPaymentAuthority(authority: string): Promise<Order[]> {
    if (!authority) return [];
    return this.orderRepository.find({
      where: { paymentAuthority: authority },
      relations: ['items', 'items.sellerProduct', 'customer', 'seller'],
      order: { id: 'ASC' },
    });
  }

  async cancelPendingOrder(orderId: string): Promise<Order> {
    return this.runInTransaction(async (manager) => {
      const orderRepo = manager
        ? manager.getRepository(Order)
        : this.orderRepository;
      const sellerProductRepo = manager
        ? manager.getRepository(SellerProduct)
        : this.sellerProductRepository;

      const order = await orderRepo.findOne({
        where: { id: orderId },
        relations: ['items'],
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      if (order.status !== OrderStatus.PENDING) {
        throw new BadRequestException('Only PENDING orders can be cancelled');
      }

      if (order.stockReserved) {
        await this.restoreStock(order, sellerProductRepo);
      }

      order.status = OrderStatus.CANCELLED;
      return orderRepo.save(order);
    });
  }

  private async restoreStock(
    order: Order,
    sellerProductRepo: Repository<SellerProduct>,
  ): Promise<void> {
    if (!order.stockReserved) {
      return;
    }

    for (const item of order.items) {
      if (!Number.isInteger(Number(item.quantity)) || Number(item.quantity) <= 0) {
        throw new BadRequestException(
          'Order item quantity must be a positive integer',
        );
      }
    }

    const qtyBySellerProduct = new Map<string, number>();
    for (const item of order.items) {
      const sellerProductId = item.sellerProductId || item.productId;
      const existing = qtyBySellerProduct.get(sellerProductId) || 0;
      qtyBySellerProduct.set(sellerProductId, existing + Number(item.quantity));
    }

    const sortedSellerProductIds = Array.from(qtyBySellerProduct.keys()).sort();

    for (const sellerProductId of sortedSellerProductIds) {
      const requiredQty = qtyBySellerProduct.get(sellerProductId)!;

      const sellerProduct = await sellerProductRepo.findOne({
        where: { id: sellerProductId },
        lock: { mode: 'pessimistic_write' },
      });

      if (sellerProduct) {
        sellerProduct.stockQuantity += requiredQty;
        await sellerProductRepo.save(sellerProduct);
      }
    }
  }
}