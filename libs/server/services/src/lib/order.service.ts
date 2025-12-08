import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(SellerProduct)
    private sellerProductRepository: Repository<SellerProduct>,
    @InjectRepository(SellerInfo)
    private sellerInfoRepository: Repository<SellerInfo>
  ) {}

  async createOrder(createOrderInput: CreateOrderInput): Promise<Order> {
    const order = this.orderRepository.create(createOrderInput);

    // Generate unique order number
    order.orderNumber = this.generateOrderNumber();

    // Generate unique tracking number
    order.trackingNumber = this.generateTrackingNumber();

    // Get seller's information to preserve snapshot
    const seller = await this.sellerInfoRepository.findOne({
      where: { id: createOrderInput.sellerId },
    });

    if (!seller) {
      throw new NotFoundException(
        `Seller with ID ${createOrderInput.sellerId} not found`
      );
    }

    // Preserve seller snapshot at order time
    order.sellerStoreName = seller.storeName;
    order.sellerPhone = seller.phone || undefined;
    order.sellerAddress = seller.address || undefined;

    // Calculate totals
    order.subtotal = order.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );
    order.shippingCost = seller.shippingFee || 0; // Use seller's shipping fee
    order.total = order.subtotal + order.shippingCost;

    // Fetch seller products to get pricing details for snapshot
    const orderItemsWithSnapshots = await Promise.all(
      order.items.map(async (item) => {
        if (item.sellerProductId) {
          const sellerProduct = await this.sellerProductRepository.findOne({
            where: { id: item.sellerProductId },
            relations: ['productInfo'],
          });

          if (sellerProduct) {
            // Preserve product pricing snapshot
            return {
              ...item,
              originalPrice: sellerProduct.price,
              discountPercentage: sellerProduct.discount,
              productInfoId: sellerProduct.productInfoId || undefined,
            };
          }
        }
        // If sellerProduct not found, keep item as is
        return item;
      })
    );

    // Decrease stock for each ordered item
    await this.decreaseStock(order.items);

    const savedOrder = await this.orderRepository.save(order);

    // Save order items with snapshot data
    const orderItems = orderItemsWithSnapshots.map((item) => ({
      ...item,
      orderId: savedOrder.id,
    }));

    await this.orderItemRepository.save(orderItems);

    return this.findOne(savedOrder.id);
  }

  async findAll(
    first = 10,
    after?: string,
    sellerId?: string,
    status?: OrderStatus
  ): Promise<OrdersConnection> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('order.seller', 'seller')
      .orderBy('order.createdAt', 'DESC');

    if (sellerId) {
      // Parse sellerId as integer since the database column is an integer
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
    updateOrderInput: UpdateOrderInput
  ): Promise<Order> {
    const order = await this.findOne(id);

    Object.assign(order, updateOrderInput);

    if (updateOrderInput.items) {
      // Update order items
      await this.orderItemRepository.delete({ orderId: id });

      const orderItems = updateOrderInput.items.map((item) => ({
        ...item,
        orderId: id,
      }));

      await this.orderItemRepository.save(orderItems);

      // Recalculate totals
      order.subtotal = orderItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      order.total = order.subtotal + order.shippingCost;
    }

    return this.orderRepository.save(order);
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.findOne(id);
    const previousStatus = order.status;

    // If order is being cancelled or rejected, restore stock
    if (
      (status === OrderStatus.CANCELLED || status === OrderStatus.REFUNDED) &&
      previousStatus !== OrderStatus.CANCELLED &&
      previousStatus !== OrderStatus.REFUNDED
    ) {
      await this.restoreStock(order.items);
    }

    order.status = status;
    return this.orderRepository.save(order);
  }

  async deleteOrder(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  async getOrdersBySeller(
    sellerId: string,
    first = 10,
    after?: string
  ): Promise<OrdersConnection> {
    return this.findAll(first, after, sellerId);
  }

  async getOrdersByStatus(
    status: OrderStatus,
    first = 10,
    after?: string
  ): Promise<OrdersConnection> {
    return this.findAll(first, after, undefined, status);
  }

  async getOrdersByCustomerEmail(
    customerEmail: string,
    first = 10,
    after?: string
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
    // Generate a tracking number in format: KZ-YYYYMMDD-XXXXXX
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
    status?: OrderStatus
  ): Promise<number> {
    const queryBuilder = this.orderRepository.createQueryBuilder('order');

    if (sellerId) {
      // Parse sellerId as integer since the database column is an integer
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

  /**
   * Decrease stock quantity for ordered items
   * Best practice: This ensures inventory is reserved when order is placed
   */
  private async decreaseStock(
    items: {
      productId: string;
      productName: string;
      quantity: number;
      sellerProductId?: string;
    }[]
  ): Promise<void> {
    for (const item of items) {
      // Use sellerProductId directly as UUID string (no parsing needed)
      const sellerProductId = item.sellerProductId || item.productId;

      const sellerProduct = await this.sellerProductRepository.findOne({
        where: { id: sellerProductId },
      });

      if (!sellerProduct) {
        throw new NotFoundException(
          `SellerProduct with ID ${sellerProductId} not found for ${item.productName}`
        );
      }

      if (sellerProduct.stockQuantity < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product ${item.productName}. Available: ${sellerProduct.stockQuantity}, Requested: ${item.quantity}`
        );
      }

      sellerProduct.stockQuantity -= item.quantity;
      await this.sellerProductRepository.save(sellerProduct);
    }
  }

  /**
   * Restore stock quantity for cancelled/rejected orders
   * Best practice: Return items to inventory when orders are cancelled
   */
  private async restoreStock(items: OrderItem[]): Promise<void> {
    for (const item of items) {
      // productId in OrderItem is the SellerProduct ID (UUID) for stock management
      const sellerProduct = await this.sellerProductRepository.findOne({
        where: { id: item.productId },
      });

      if (sellerProduct) {
        sellerProduct.stockQuantity += item.quantity;
        await this.sellerProductRepository.save(sellerProduct);
      }
    }
  }
}
