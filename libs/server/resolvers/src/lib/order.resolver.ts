import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import {
  Order,
  OrderItem,
  OrderStatus,
  User,
} from '@kickzone-workspace/entities';
import {
  CreateOrderInput,
  UpdateOrderInput,
  UpdateOrderStatusInput,
} from '@kickzone-workspace/inputs';
import { OrderService } from '@kickzone-workspace/services';
import { GraphqlAuthGuard } from '@kickzone-workspace/guards';
import { CurrentUser } from '@kickzone-workspace/decorators';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

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
  async order(@Args('id', { type: () => String }) id: string) {
    return this.orderService.findOne(id);
  }

  @Query(() => [Order])
  @UseGuards(GraphqlAuthGuard)
  async myOrders(
    @CurrentUser() user: User,
    @Args('first', { type: () => Number, defaultValue: 10 }) first: number,
    @Args('after', { type: () => String, nullable: true }) after?: string
  ) {
    // Get orders by customer email
    // User.email is the customer's email address
    const result = await this.orderService.getOrdersByCustomerEmail(
      user.email,
      first,
      after
    );
    return result.edges.map((edge) => edge.node);
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
