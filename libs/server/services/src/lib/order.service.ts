import { Injectable, NotFoundException, BadRequestException, Optional, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager, In } from 'typeorm';
import {
  Order,
  OrderItem,
  OrderStatus,
  SellerProduct,
  SellerInfo,
  ShippingPaymentMode,
} from '@kickzone-workspace/entities';
import {
  CreateOrderInput,
  UpdateOrderInput,
  OrdersConnection,
  OrderEdge,
} from '@kickzone-workspace/inputs';
import {
  ShippingCalculationService,
  applyShippingMethodMultiplier,
} from './shipping-calculation.service';

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
    private readonly shippingCalculationService?: ShippingCalculationService,
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

    if (!Array.isArray(inputItems) || inputItems.length === 0) {
      throw new BadRequestException('Order must contain at least one item');
    }

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

    // Aggregate stock check: sum quantities per sellerProductId across all line items
    const requestedBySellerProduct = new Map<
      string,
      { totalQty: number; available: number }
    >();
    for (const item of validatedItems) {
      const sellerProductId = item.sellerProductId!; // validated as required earlier
      const current = requestedBySellerProduct.get(sellerProductId) ?? {
        totalQty: 0,
        available: item.sellerProduct.stockQuantity,
      };
      current.totalQty += Number(item.quantity);
      if (current.totalQty > current.available) {
        throw new BadRequestException(
          `Insufficient stock for product ${sellerProductId}. Available: ${current.available}, Requested: ${current.totalQty}`,
        );
      }
      requestedBySellerProduct.set(sellerProductId, current);
    }

    // Compute server-side totals from catalog prices
    order.subtotal = Number(
      validatedItems.reduce((sum, item) => sum + item.catalogTotalPrice, 0).toFixed(2),
    );

    // Validate and normalize shipping method
    const shippingMethod = this.normalizeShippingMethod(
      createOrderInput.shippingMethod,
    );

    // Read seller's shipping payment mode
    const paymentMode =
      seller.shippingPaymentMode ?? ShippingPaymentMode.PAY_ON_DELIVERY;

    order.shippingMethod = shippingMethod;
    order.shippingPaymentMode = paymentMode;

    let shippingCost = 0;
    if (paymentMode === ShippingPaymentMode.PAY_ONLINE) {
      let baseFee = Number(seller.shippingFee || 0);
      if (this.shippingCalculationService) {
        const calc = await this.shippingCalculationService.calculateShippingCost(
          order.subtotal,
          [
            {
              sellerId: seller.id,
              shippingFee: baseFee,
              sellerName: seller.storeName,
              shippingPaymentMode: ShippingPaymentMode.PAY_ONLINE,
            },
          ],
        );
        baseFee = calc.totalShippingCost;
      }
      shippingCost = applyShippingMethodMultiplier(baseFee, shippingMethod);
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

  private normalizeShippingMethod(
    method?: string | null,
  ): 'vip' | 'express' | 'pickup' {
    if (method === undefined || method === null || method === '') {
      return 'vip';
    }
    const normalized = String(method).trim().toLowerCase();
    if (
      normalized === 'vip' ||
      normalized === 'express' ||
      normalized === 'pickup'
    ) {
      return normalized;
    }
    throw new BadRequestException(`Invalid shipping method: ${method}`);
  }

  async recalculateBatchOrdersShipping(orders: Order[]): Promise<Order[]> {
    if (!Array.isArray(orders) || orders.length === 0) {
      return [];
    }

    // Load SellerInfo for each order if not already attached
    const sellerMap = new Map<number, SellerInfo>();
    for (const order of orders) {
      if (order.seller) {
        sellerMap.set(Number(order.sellerId), order.seller);
      } else if (!sellerMap.has(Number(order.sellerId))) {
        const found = await this.sellerInfoRepository.findOne({
          where: { id: Number(order.sellerId) },
        });
        if (found) {
          sellerMap.set(Number(order.sellerId), found);
        }
      }
    }

    const onlineOrders: Order[] = [];
    const codOrders: Order[] = [];

    for (const order of orders) {
      const seller = sellerMap.get(Number(order.sellerId));
      const mode =
        seller?.shippingPaymentMode ??
        order.shippingPaymentMode ??
        ShippingPaymentMode.PAY_ON_DELIVERY;

      if (mode === ShippingPaymentMode.PAY_ONLINE) {
        onlineOrders.push(order);
      } else {
        codOrders.push(order);
      }
    }

    // 1. Force all PAY_ON_DELIVERY orders to 0 shipping
    for (const order of codOrders) {
      const subtotal = Number(Number(order.subtotal).toFixed(2));
      const changed =
        Number(order.shippingCost) !== 0 ||
        Number(order.total) !== subtotal ||
        order.shippingPaymentMode !== ShippingPaymentMode.PAY_ON_DELIVERY;

      order.shippingPaymentMode = ShippingPaymentMode.PAY_ON_DELIVERY;
      order.shippingCost = 0;
      order.total = subtotal;

      if (changed) {
        await this.orderRepository.save(order);
      }
    }

    // 2. Recompute online shipping across all PAY_ONLINE orders in deterministic sellerId ASC order
    if (onlineOrders.length > 0) {
      const sortedOnline = [...onlineOrders].sort((a, b) => {
        const diff = Number(a.sellerId) - Number(b.sellerId);
        return diff !== 0 ? diff : String(a.id).localeCompare(String(b.id));
      });

      const onlineSubtotal = sortedOnline.reduce(
        (sum, o) => sum + Number(o.subtotal),
        0,
      );

      const sellerFeesInput = sortedOnline.map((o) => {
        const seller = sellerMap.get(Number(o.sellerId));
        return {
          sellerId: Number(o.sellerId),
          shippingFee: Number(seller?.shippingFee ?? 0),
          sellerName: seller?.storeName ?? o.sellerStoreName,
          shippingPaymentMode: ShippingPaymentMode.PAY_ONLINE,
        };
      });

      const breakdownBySellerId = new Map<string, number>();
      if (this.shippingCalculationService) {
        const calc =
          await this.shippingCalculationService.calculateShippingCost(
            onlineSubtotal,
            sellerFeesInput,
          );
        for (const item of calc.shippingBreakdown) {
          breakdownBySellerId.set(String(item.sellerId), item.appliedFee);
        }
      } else {
        for (const item of sellerFeesInput) {
          breakdownBySellerId.set(String(item.sellerId), item.shippingFee);
        }
      }

      for (const order of sortedOnline) {
        const appliedBaseFee =
          breakdownBySellerId.get(String(order.sellerId)) ?? 0;
        const method = this.normalizeShippingMethod(order.shippingMethod);
        const computedShipping = applyShippingMethodMultiplier(
          appliedBaseFee,
          method,
        );
        const computedTotal = Number(
          (Number(order.subtotal) + computedShipping).toFixed(2),
        );

        const changed =
          Number(order.shippingCost) !== computedShipping ||
          Number(order.total) !== computedTotal ||
          order.shippingPaymentMode !== ShippingPaymentMode.PAY_ONLINE ||
          order.shippingMethod !== method;

        order.shippingMethod = method;
        order.shippingPaymentMode = ShippingPaymentMode.PAY_ONLINE;
        order.shippingCost = computedShipping;
        order.total = computedTotal;

        if (changed) {
          await this.orderRepository.save(order);
        }
      }
    }

    return orders;
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

    if (after !== undefined && after !== null) {
      const cursor = await this.decodeCursor(after);
      if (cursor.id) {
        queryBuilder.andWhere(
          '(order.createdAt < :cursorDate OR (order.createdAt = :cursorDate AND order.id < :cursorId))',
          { cursorDate: cursor.date, cursorId: cursor.id },
        );
      } else {
        queryBuilder.andWhere('order.createdAt < :cursor', {
          cursor: cursor.date,
        });
      }
    }

    const orders = await queryBuilder.take(first + 1).getMany();

    const hasNextPage = orders.length > first;
    const edges: OrderEdge[] = orders.slice(0, first).map((order) => ({
      node: order,
      cursor: this.encodeCursor(order.createdAt, order.id),
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage: after !== undefined && after !== null && after !== '',
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

    const inputWithItems = updateOrderInput as UpdateOrderInput & {
      items?: unknown;
      subtotal?: unknown;
      total?: unknown;
      shippingCost?: unknown;
    };

    if (
      inputWithItems.items != null ||
      inputWithItems.subtotal != null ||
      inputWithItems.total != null ||
      inputWithItems.shippingCost != null ||
      order.status !== OrderStatus.PENDING
    ) {
      throw new BadRequestException(
        'Order items and financial totals cannot be rewritten after order creation',
      );
    }

    if (updateOrderInput.customerEmail !== undefined) {
      order.customerEmail = updateOrderInput.customerEmail;
    }
    if (updateOrderInput.customerPhone !== undefined) {
      order.customerPhone = updateOrderInput.customerPhone;
    }
    if (updateOrderInput.customerName !== undefined) {
      order.customerName = updateOrderInput.customerName;
    }
    if (updateOrderInput.shippingAddress !== undefined) {
      order.shippingAddress = updateOrderInput.shippingAddress;
    }
    if (updateOrderInput.city !== undefined) {
      order.city = updateOrderInput.city;
    }
    if (updateOrderInput.state !== undefined) {
      order.state = updateOrderInput.state;
    }
    if (updateOrderInput.zipCode !== undefined) {
      order.zipCode = updateOrderInput.zipCode;
    }
    if (updateOrderInput.country !== undefined) {
      order.country = updateOrderInput.country;
    }
    if (updateOrderInput.notes !== undefined) {
      order.notes = updateOrderInput.notes;
    }
    if (updateOrderInput.trackingNumber !== undefined) {
      order.trackingNumber = updateOrderInput.trackingNumber;
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

      if (status === OrderStatus.CANCELLED || status === OrderStatus.REFUNDED) {
        order.paymentVerifiedAt = null;
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
        lock: manager ? { mode: 'pessimistic_write' } : undefined,
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
      .orderBy('order.createdAt', 'DESC')
      .addOrderBy('order.id', 'DESC');

    if (after !== undefined && after !== null) {
      const cursor = await this.decodeCursor(after);
      if (cursor.id) {
        queryBuilder.andWhere(
          '(order.createdAt < :cursorDate OR (order.createdAt = :cursorDate AND order.id < :cursorId))',
          { cursorDate: cursor.date, cursorId: cursor.id },
        );
      } else {
        queryBuilder.andWhere('order.createdAt < :cursor', {
          cursor: cursor.date,
        });
      }
    }

    const orders = await queryBuilder.take(first + 1).getMany();

    const hasNextPage = orders.length > first;
    const edges: OrderEdge[] = orders.slice(0, first).map((order) => ({
      node: order,
      cursor: this.encodeCursor(order.createdAt, order.id),
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage: after !== undefined && after !== null && after !== '',
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

  private encodeCursor(date: Date, id?: string): string {
    const payload = id ? `${date.toISOString()}|${id}` : date.toISOString();
    return Buffer.from(payload).toString('base64');
  }

  private async decodeCursor(
    cursor: string,
  ): Promise<{ date: Date; id?: string }> {
    if (typeof cursor !== 'string' || cursor.trim() === '') {
      throw new BadRequestException('Invalid cursor');
    }
    try {
      const decoded = Buffer.from(cursor, 'base64').toString();
      if (!decoded) {
        throw new BadRequestException('Invalid cursor');
      }
      const separatorIndex = decoded.indexOf('|');
      if (separatorIndex !== -1) {
        const datePart = decoded.slice(0, separatorIndex);
        const idPart = decoded.slice(separatorIndex + 1).trim();
        const date = new Date(datePart);
        if (!datePart || !idPart || Number.isNaN(date.getTime())) {
          throw new BadRequestException('Invalid cursor');
        }
        return { date, id: idPart };
      }
      const date = new Date(decoded);
      if (Number.isNaN(date.getTime())) {
        throw new BadRequestException('Invalid cursor');
      }
      return { date };
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

  async reopenRolledBackOrder(orderId: string): Promise<Order> {
    return this.runInTransaction(async (manager) => {
      const orderRepo = manager
        ? manager.getRepository(Order)
        : this.orderRepository;

      const order = await orderRepo.findOne({
        where: { id: orderId },
        relations: ['items'],
        lock: manager ? { mode: 'pessimistic_write' } : undefined,
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      if (order.status !== OrderStatus.CANCELLED || order.stockReserved) {
        throw new BadRequestException(
          `Cannot reopen order ${orderId} from status ${order.status}`
        );
      }

      order.status = OrderStatus.PENDING;
      order.stockReserved = false;
      order.paymentVerifiedAt = null;

      return orderRepo.save(order);
    });
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
      order.paymentVerifiedAt = new Date();

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
    const orders = await this.orderRepository.find({
      where: { paymentAuthority: authority },
      relations: ['items', 'seller'],
      order: { id: 'ASC' },
    });

    // Collect unique non-empty sellerProductId from all order items
    const sellerProductIds = new Set<string>();
    for (const order of orders) {
      for (const item of order.items || []) {
        if (item.sellerProductId) {
          sellerProductIds.add(item.sellerProductId);
        }
      }
    }

    if (sellerProductIds.size > 0) {
      const sellerProducts = await this.sellerProductRepository.findBy({
        id: In(Array.from(sellerProductIds)),
      });
      const sellerProductMap = new Map(sellerProducts.map((sp) => [sp.id, sp]));

      for (const order of orders) {
        for (const item of order.items || []) {
          (item as OrderItem & { sellerProduct?: SellerProduct | null }).sellerProduct =
            item.sellerProductId ? sellerProductMap.get(item.sellerProductId) ?? null : null;
        }
      }
    }

    return orders;
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
        lock: manager ? { mode: 'pessimistic_write' } : undefined,
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      if (order.status !== OrderStatus.PENDING || order.paymentVerifiedAt) {
        throw new BadRequestException('Only PENDING orders can be cancelled');
      }

      if (order.stockReserved) {
        await this.restoreStock(order, sellerProductRepo);
      }

      order.status = OrderStatus.CANCELLED;
      return orderRepo.save(order);
    });
  }

  async updateTrackingNumber(id: string, trackingNumber: string): Promise<Order> {
    const order = await this.findOne(id);
    order.trackingNumber = trackingNumber.trim();
    return this.orderRepository.save(order);
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