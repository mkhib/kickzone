import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderItem, OrderStatus } from '@kickzone-workspace/entities';
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
    private orderItemRepository: Repository<OrderItem>
  ) {}

  async createOrder(createOrderInput: CreateOrderInput): Promise<Order> {
    const order = this.orderRepository.create(createOrderInput);

    // Generate unique order number
    order.orderNumber = this.generateOrderNumber();

    // Calculate totals
    order.subtotal = order.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );
    order.shippingCost = 10.0; // Fixed shipping cost for now
    order.total = order.subtotal + order.shippingCost;

    const savedOrder = await this.orderRepository.save(order);

    // Save order items
    const orderItems = order.items.map((item) => ({
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
      queryBuilder.andWhere('order.sellerId = :sellerId', { sellerId });
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

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ORD-${timestamp}-${random}`;
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
      queryBuilder.andWhere('order.sellerId = :sellerId', { sellerId });
    }

    if (status) {
      queryBuilder.andWhere('order.status = :status', { status });
    }

    return queryBuilder.getCount();
  }
}
