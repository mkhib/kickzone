import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards, NotFoundException } from '@nestjs/common';
import {
  Order,
  OrderItem,
  OrderStatus,
  User,
  UserRole,
  SellerOrder,
  toSellerOrder,
} from '@kickzone-workspace/entities';
import {
  CreateOrderInput,
  UpdateOrderInput,
  UpdateOrderStatusInput,
} from '@kickzone-workspace/inputs';
import { OrderService, SellerService } from '@kickzone-workspace/services';
import { GraphqlAuthGuard } from '@kickzone-workspace/guards';
import { CurrentUser } from '@kickzone-workspace/decorators';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly sellerService: SellerService
  ) {}

  @Query(() => [Order])
  @UseGuards(GraphqlAuthGuard)
  async orders(
    @Args('first', { type: () => Number, defaultValue: 10 }) first: number,
    @Args('after', { type: () => String, nullable: true }) after?: string,
    @Args('sellerId', { type: () => String, nullable: true }) sellerId?: string,
    @Args('status', { type: () => OrderStatus, nullable: true })
    status?: OrderStatus
  ) {
    const result = await this.orderService.findAll(
      first,
      after,
      sellerId,
      status
    );
    return result.edges.map((edge) => edge.node);
  }

  @Query(() => Order)
  @UseGuards(GraphqlAuthGuard)
  async order(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string
  ) {
    const order = await this.orderService.findOne(id);

    // If user is a seller and this is their order, return SellerOrder (no customer PII)
    if (user.role === UserRole.SELLER) {
      const seller = await this.sellerService.findOneByUserId(user.id);
      if (seller && order.sellerId === seller.id) {
        // Sellers should use mySellerOrders, but for single order query, convert to SellerOrder
        return toSellerOrder(order);
      }
    }

    // For customers and admins, return full Order
    return order;
  }

  @Query(() => [Order])
  @UseGuards(GraphqlAuthGuard)
  async myOrders(
    @CurrentUser() user: User,
    @Args('first', { type: () => Number, defaultValue: 10 }) first: number,
    @Args('after', { type: () => String, nullable: true }) after?: string
  ) {
    // For CUSTOMER: Get orders by customer email
    if (user.role === UserRole.CUSTOMER) {
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
  @Query(() => [SellerOrder])
  @UseGuards(GraphqlAuthGuard)
  async mySellerOrders(
    @CurrentUser() user: User,
    @Args('first', { type: () => Number, defaultValue: 10 }) first: number,
    @Args('after', { type: () => String, nullable: true }) after?: string
  ) {
    // Only sellers can access this
    if (user.role !== UserRole.SELLER) {
      throw new NotFoundException('Only sellers can access seller orders');
    }

    // Get seller info from user
    const seller = await this.sellerService.findOneByUserId(user.id);
    if (!seller) {
      throw new NotFoundException('Seller not found for this user');
    }

    // Get orders for this seller
    const result = await this.orderService.getOrdersBySeller(
      seller.id.toString(),
      first,
      after
    );

    // Convert to SellerOrder (removes customer PII)
    return result.edges.map((edge) => toSellerOrder(edge.node));
  }

  @Query(() => [Order])
  @UseGuards(GraphqlAuthGuard)
  async adminSellerOrders(
    @CurrentUser() _user: User,
    @Args('sellerId', { type: () => String }) sellerId: string,
    @Args('first', { type: () => Number, defaultValue: 10 }) first: number,
    @Args('after', { type: () => String, nullable: true }) after?: string,
    @Args('status', { type: () => OrderStatus, nullable: true })
    status?: OrderStatus
  ) {
    // Admin can view any seller's orders
    const result = await this.orderService.findAll(
      first,
      after,
      sellerId,
      status
    );
    return result.edges.map((edge) => edge.node);
  }

  @Query(() => [Order])
  @UseGuards(GraphqlAuthGuard)
  async allSellerOrders(
    @CurrentUser() _user: User,
    @Args('first', { type: () => Number, defaultValue: 10 }) first: number,
    @Args('after', { type: () => String, nullable: true }) after?: string,
    @Args('status', { type: () => OrderStatus, nullable: true })
    status?: OrderStatus
  ) {
    // Admin can view all orders from all sellers
    const result = await this.orderService.findAll(
      first,
      after,
      undefined,
      status
    );
    return result.edges.map((edge) => edge.node);
  }

  @Mutation(() => Order)
  @UseGuards(GraphqlAuthGuard)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput
  ) {
    return this.orderService.createOrder(createOrderInput);
  }

  @Mutation(() => Order)
  @UseGuards(GraphqlAuthGuard)
  async updateOrder(
    @Args('id', { type: () => String }) id: string,
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput
  ) {
    return this.orderService.updateOrder(id, updateOrderInput);
  }

  @Mutation(() => Order)
  @UseGuards(GraphqlAuthGuard)
  async updateOrderStatus(
    @Args('updateOrderStatusInput')
    updateOrderStatusInput: UpdateOrderStatusInput
  ) {
    return this.orderService.updateOrderStatus(
      updateOrderStatusInput.id,
      updateOrderStatusInput.status
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(GraphqlAuthGuard)
  async deleteOrder(@Args('id', { type: () => String }) id: string) {
    await this.orderService.deleteOrder(id);
    return true;
  }

  @ResolveField(() => [OrderItem])
  async items(@Parent() order: Order) {
    return order.items;
  }
}
