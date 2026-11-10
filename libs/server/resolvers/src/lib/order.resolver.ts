import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  UseGuards,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import {
  Order,
  OrderItem,
  OrderStatus,
  User,
  toSellerOrder,
} from '@kickzone-workspace/entities';
import {
  CreateOrderInput,
  OrdersConnection,
  SellerOrdersConnection,
  UpdateOrderInput,
  UpdateOrderStatusInput,
} from '@kickzone-workspace/inputs';
import {
  createOrderSchema,
  cursorSchema,
  idSchema,
  optionalIdSchema,
  paginationFirstSchema,
  trackingNumberSchema,
  updateOrderSchema,
  updateOrderStatusSchema,
} from '@kickzone-workspace/validation';
import { ZodValidationPipe } from './zod-validation.pipe';

const SELLER_STATUS_TRANSITIONS: Partial<Record<OrderStatus, OrderStatus>> = {
  [OrderStatus.CONFIRMED]: OrderStatus.PROCESSING,
  [OrderStatus.PROCESSING]: OrderStatus.SHIPPED,
  [OrderStatus.SHIPPED]: OrderStatus.DELIVERED,
};
import { OrderService, SellerService } from '@kickzone-workspace/services';
import { GraphqlAuthGuard } from '@kickzone-workspace/guards';
import {
  CurrentUser,
  type AuthenticatedUser,
  type OptionalAuthenticatedUser,
} from '@kickzone-workspace/decorators';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly sellerService: SellerService
  ) {}

  /**
   * Extract user ID from various possible fields in the user object.
   */
  private getUserId(user: OptionalAuthenticatedUser): string {
    return String(user?.id ?? user?.sub ?? '');
  }

  /**
   * Check if the customer user owns the order by comparing emails.
   * Returns false if either email is empty/undefined to prevent empty-email matches.
   */
  private isCustomerOrderOwner(
    user: OptionalAuthenticatedUser,
    order: Order
  ): boolean {
    const userEmail = String(user?.email ?? '').trim().toLowerCase();
    const orderEmail = String(order?.customerEmail ?? '').trim().toLowerCase();
    return userEmail.length > 0 && orderEmail.length > 0 && userEmail === orderEmail;
  }

  /**
   * Normalize user role to uppercase standard values.
   */
  private getUserRole(user: OptionalAuthenticatedUser): 'ADMIN' | 'SELLER' | 'CUSTOMER' | 'UNKNOWN' {
    const rawRole = user?.role ?? user?.userType;
    if (!rawRole) return 'UNKNOWN';
    const normalized = String(rawRole).toUpperCase();
    if (normalized === 'ADMIN') return 'ADMIN';
    if (normalized === 'SELLER') return 'SELLER';
    if (normalized === 'CUSTOMER') return 'CUSTOMER';
    return 'UNKNOWN';
  }

  /**
   * Assert that the caller is an admin.
   */
  private assertAdmin(user: OptionalAuthenticatedUser): void {
    if (this.getUserRole(user) !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }
  }

  @Query(() => OrdersConnection)
  @UseGuards(GraphqlAuthGuard)
  async orders(
    @CurrentUser() user: AuthenticatedUser,
    @Args(
      'first',
      { type: () => Number, defaultValue: 10 },
      new ZodValidationPipe(paginationFirstSchema)
    )
    first: number,
    @Args(
      'after',
      { type: () => String, nullable: true },
      new ZodValidationPipe(cursorSchema)
    )
    after?: string,
    @Args(
      'sellerId',
      { type: () => String, nullable: true },
      new ZodValidationPipe(optionalIdSchema)
    )
    sellerId?: string,
    @Args('status', { type: () => OrderStatus, nullable: true })
    status?: OrderStatus
  ) {
    this.assertAdmin(user);
    return this.orderService.findAll(first, after, sellerId, status);
  }

  @Query(() => Order)
  @UseGuards(GraphqlAuthGuard)
  async order(
    @CurrentUser() user: AuthenticatedUser,
    @Args('id', { type: () => String }, new ZodValidationPipe(idSchema)) id: string
  ) {
    const order = await this.orderService.findOne(id);
    const role = this.getUserRole(user);

    switch (role) {
      case 'ADMIN':
        return order;

      case 'SELLER': {
        // Get seller info for this user to check ownership
        const seller = await this.sellerService.findOneByUserId(this.getUserId(user));
        if (!seller || order.sellerId !== seller.id) {
          throw new ForbiddenException('You do not have permission to view this order');
        }
        return toSellerOrder(order);
      }

      case 'CUSTOMER': {
        // Customer ownership is determined by email
        if (!this.isCustomerOrderOwner(user, order)) {
          throw new ForbiddenException('You do not have permission to view this order');
        }
        return order;
      }

      default:
        throw new ForbiddenException('Access denied');
    }
  }

  @Query(() => [Order])
  @UseGuards(GraphqlAuthGuard)
  async myOrders(
    @CurrentUser() user: User,
    @Args(
      'first',
      { type: () => Number, defaultValue: 10 },
      new ZodValidationPipe(paginationFirstSchema)
    )
    first: number,
    @Args(
      'after',
      { type: () => String, nullable: true },
      new ZodValidationPipe(cursorSchema)
    )
    after?: string
  ) {
    // For CUSTOMER: Get orders by customer email
    if (this.getUserRole(user) === 'CUSTOMER') {
      if (!user?.email || String(user.email).trim() === '') {
        return [];
      }
      const result = await this.orderService.getOrdersByCustomerEmail(
        user.email,
        first,
        after
      );
      return result.edges.map((edge) => edge.node);
    }

    // For SELLER: Use mySellerOrders query instead (returns SellerOrder without customer PII)
    throw new NotFoundException(
      'Sellers should use mySellerOrders query instead'
    );
  }

  /**
   * Seller orders query - returns SellerOrder type WITHOUT customer PII
   * Sellers should NOT see customer name, email, phone, or address
   */
  @Query(() => SellerOrdersConnection)
  @UseGuards(GraphqlAuthGuard)
  async mySellerOrders(
    @CurrentUser() user: User,
    @Args(
      'first',
      { type: () => Number, defaultValue: 10 },
      new ZodValidationPipe(paginationFirstSchema)
    )
    first: number,
    @Args(
      'after',
      { type: () => String, nullable: true },
      new ZodValidationPipe(cursorSchema)
    )
    after?: string,
    @Args('status', { type: () => OrderStatus, nullable: true })
    status?: OrderStatus
  ) {
    // Only sellers can access this
    if (this.getUserRole(user) !== 'SELLER') {
      throw new NotFoundException('Only sellers can access seller orders');
    }

    // Get seller info from user
    const seller = await this.sellerService.findOneByUserId(this.getUserId(user));
    if (!seller) {
      throw new NotFoundException('Seller not found for this user');
    }

    // Get orders for this seller
    const result = await this.orderService.getOrdersBySeller(
      seller.id.toString(),
      first,
      after,
      status
    );

    // Convert to SellerOrder connection (removes customer PII)
    return {
      edges: result.edges.map((edge) => ({
        cursor: edge.cursor,
        node: toSellerOrder(edge.node),
      })),
      pageInfo: result.pageInfo,
      totalCount: result.totalCount,
    };
  }

  @Query(() => OrdersConnection)
  @UseGuards(GraphqlAuthGuard)
  async adminSellerOrders(
    @CurrentUser() user: AuthenticatedUser,
    @Args('sellerId', { type: () => String }, new ZodValidationPipe(idSchema))
    sellerId: string,
    @Args(
      'first',
      { type: () => Number, defaultValue: 10 },
      new ZodValidationPipe(paginationFirstSchema)
    )
    first: number,
    @Args(
      'after',
      { type: () => String, nullable: true },
      new ZodValidationPipe(cursorSchema)
    )
    after?: string,
    @Args('status', { type: () => OrderStatus, nullable: true })
    status?: OrderStatus
  ) {
    this.assertAdmin(user);
    return this.orderService.findAll(first, after, sellerId, status);
  }

  @Query(() => OrdersConnection)
  @UseGuards(GraphqlAuthGuard)
  async allSellerOrders(
    @CurrentUser() user: AuthenticatedUser,
    @Args(
      'first',
      { type: () => Number, defaultValue: 10 },
      new ZodValidationPipe(paginationFirstSchema)
    )
    first: number,
    @Args(
      'after',
      { type: () => String, nullable: true },
      new ZodValidationPipe(cursorSchema)
    )
    after?: string,
    @Args('status', { type: () => OrderStatus, nullable: true })
    status?: OrderStatus
  ) {
    this.assertAdmin(user);
    return this.orderService.findAll(first, after, undefined, status);
  }

  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderInput', new ZodValidationPipe(createOrderSchema))
    createOrderInput: CreateOrderInput
  ) {
    return this.orderService.createOrder(createOrderInput);
  }

  @Mutation(() => Order)
  @UseGuards(GraphqlAuthGuard)
  async updateOrder(
    @CurrentUser() user: AuthenticatedUser,
    @Args('id', { type: () => String }, new ZodValidationPipe(idSchema)) id: string,
    @Args('updateOrderInput', new ZodValidationPipe(updateOrderSchema))
    updateOrderInput: UpdateOrderInput
  ) {
    this.assertAdmin(user);

    const order = await this.orderService.findOne(id);

    // Forbid modifying items or financial totals after order creation
    // items is not part of UpdateOrderInput; guard against it arriving anyway
    const input: UpdateOrderInput & { items?: unknown } = updateOrderInput;
    if (
      input.items != null ||
      order.status !== OrderStatus.PENDING
    ) {
      throw new BadRequestException(
        'Order items and financial totals cannot be rewritten after order creation'
      );
    }

    return this.orderService.updateOrder(id, updateOrderInput);
  }

  @Mutation(() => Order)
  @UseGuards(GraphqlAuthGuard)
  async updateOrderStatus(
    @CurrentUser() user: AuthenticatedUser,
    @Args('updateOrderStatusInput', new ZodValidationPipe(updateOrderStatusSchema))
    updateOrderStatusInput: UpdateOrderStatusInput
  ) {
    const { id, status } = updateOrderStatusInput;
    const order = await this.orderService.findOne(id);

    const role = this.getUserRole(user);

    switch (role) {
      case 'ADMIN':
        // Admin can update any order status
        break;

      case 'SELLER': {
        // Get seller info for this user to check ownership
        const seller = await this.sellerService.findOneByUserId(this.getUserId(user));
        if (!seller || order.sellerId !== seller.id) {
          throw new ForbiddenException('You can only update status for your own seller orders');
        }
        // Sellers can only move orders through fulfilment steps
        if (SELLER_STATUS_TRANSITIONS[order.status] !== status) {
          throw new BadRequestException(
            `Sellers can only move orders through fulfilment steps (CONFIRMED->PROCESSING->SHIPPED->DELIVERED); ${order.status} -> ${status} is not allowed`
          );
        }
        break;
      }

      case 'CUSTOMER':
      default:
        throw new ForbiddenException('Customers are not allowed to update order status');
    }

    const updated = await this.orderService.updateOrderStatus(id, status);

    // If caller is SELLER, return redacted SellerOrder
    if (role === 'SELLER') {
      return toSellerOrder(updated);
    }

    return updated;
  }

  @Mutation(() => Boolean)
  @UseGuards(GraphqlAuthGuard)
  async cancelPendingOrder(
    @CurrentUser() user: AuthenticatedUser,
    @Args('orderId', { type: () => String }, new ZodValidationPipe(idSchema)) orderId: string
  ) {
    const order = await this.orderService.findOne(orderId);

    const role = this.getUserRole(user);

    // Ownership check
    let isOwner = false;
    if (role === 'ADMIN') {
      isOwner = true;
    } else if (role === 'CUSTOMER') {
      // Customer ownership by email (prevents empty-email matches)
      isOwner = this.isCustomerOrderOwner(user, order);
    } else if (role === 'SELLER') {
      // Seller ownership via SellerInfo
      const seller = await this.sellerService.findOneByUserId(this.getUserId(user));
      isOwner = seller != null && order.sellerId === seller.id;
    }

    if (!isOwner) {
      throw new ForbiddenException('You do not have permission to cancel this order');
    }

    // Status check: only PENDING orders can be cancelled
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Only pending orders can be cancelled');
    }

    await this.orderService.cancelPendingOrder(orderId);
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(GraphqlAuthGuard)
  async deleteOrder(
    @CurrentUser() user: AuthenticatedUser,
    @Args('id', { type: () => String }, new ZodValidationPipe(idSchema)) id: string
  ) {
    this.assertAdmin(user);

    const order = await this.orderService.findOne(id);

    // If order is in an active paid status, cancel it first to restore stock
    const activePaidStatuses = [
      OrderStatus.CONFIRMED,
      OrderStatus.PROCESSING,
      OrderStatus.SHIPPED,
    ];

    if (activePaidStatuses.includes(order.status) || order.stockReserved === true) {
      await this.orderService.updateOrderStatus(id, OrderStatus.CANCELLED);
    }

    await this.orderService.deleteOrder(id);
    return true;
  }

  @Mutation(() => Order)
  @UseGuards(GraphqlAuthGuard)
  async updateOrderTracking(
    @CurrentUser() user: AuthenticatedUser,
    @Args('id', { type: () => String }, new ZodValidationPipe(idSchema)) id: string,
    @Args(
      'trackingNumber',
      { type: () => String },
      new ZodValidationPipe(trackingNumberSchema)
    )
    trackingNumber: string
  ) {
    const trimmed = String(trackingNumber ?? '').trim();
    if (!trimmed || trimmed.length > 100) {
      throw new BadRequestException('Tracking number must be 1-100 characters');
    }

    const order = await this.orderService.findOne(id);
    const role = this.getUserRole(user);

    switch (role) {
      case 'ADMIN':
        break;

      case 'SELLER': {
        const seller = await this.sellerService.findOneByUserId(this.getUserId(user));
        if (!seller || order.sellerId !== seller.id) {
          throw new ForbiddenException('You can only update tracking for your own seller orders');
        }
        break;
      }

      case 'CUSTOMER':
      default:
        throw new ForbiddenException('Customers are not allowed to update tracking');
    }

    const allowedStatuses = [OrderStatus.CONFIRMED, OrderStatus.PROCESSING, OrderStatus.SHIPPED];
    if (!allowedStatuses.includes(order.status)) {
      throw new BadRequestException('Tracking can only be set on confirmed, processing or shipped orders');
    }

    const updated = await this.orderService.updateTrackingNumber(id, trimmed);
    return role === 'SELLER' ? toSellerOrder(updated) : updated;
  }

  @Mutation(() => [Order])
  async recalculateBatchOrdersShipping(
    @Args('orderIds', { type: () => [String] }) orderIds: string[],
    @CurrentUser() user?: OptionalAuthenticatedUser,
    @Args('guestToken', { type: () => String, nullable: true }) guestToken?: string
  ): Promise<Order[]> {
    const uniqueOrderIds = Array.from(
      new Set(
        (orderIds ?? []).filter(
          (id): id is string => typeof id === 'string' && id.trim().length > 0
        )
      )
    );
    if (uniqueOrderIds.length === 0) {
      throw new BadRequestException('At least one orderId is required');
    }

    // Validate raw guestToken format before trimming: reject brackets, CR/LF, or any whitespace
    if (
      typeof guestToken === 'string' &&
      guestToken.length > 0 &&
      /[[\]\r\n\s]/.test(guestToken)
    ) {
      throw new BadRequestException('Invalid guest token format');
    }

    const orders = await Promise.all(
      uniqueOrderIds.map((id) => this.orderService.findOne(id))
    );

    const firstEmail = String(orders[0].customerEmail ?? '').trim().toLowerCase();
    const extractToken = (notes?: string | null) => {
      const m = /\[GuestToken:\s*([^\]]+)\]/.exec(notes ?? '');
      return m ? m[1].trim() : null;
    };
    const firstToken = extractToken(orders[0].notes);

    for (const order of orders) {
      if (order.status !== OrderStatus.PENDING) {
        throw new BadRequestException(
          `Order ${order.id} is not in PENDING status`
        );
      }
      if (String(order.customerEmail ?? '').trim().toLowerCase() !== firstEmail) {
        throw new BadRequestException(
          'All orders in a batch must belong to the same customer'
        );
      }
      if (extractToken(order.notes) !== firstToken) {
        throw new BadRequestException(
          'All orders in a batch must share the same guest checkout token'
        );
      }
      if (firstToken) {
        const provided = guestToken?.trim();
        if (!provided || provided !== firstToken) {
          throw new ForbiddenException('Invalid guest token for batch shipping recalculation');
        }
      } else {
        const userEmail = String(user?.email ?? '').trim().toLowerCase();
        if (!userEmail || !firstEmail || firstEmail !== userEmail) {
          throw new ForbiddenException('Not allowed to recalculate shipping for this order batch');
        }
      }
    }

    return this.orderService.recalculateBatchOrdersShipping(orders);
  }

  @ResolveField(() => [OrderItem])
  async items(@Parent() order: Order) {
    return order.items;
  }
}