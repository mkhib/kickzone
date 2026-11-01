import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from '@kickzone-workspace/services';
import {
  CreateOrderInput,
  UpdateOrderInput,
  UpdateOrderStatusInput,
} from '@kickzone-workspace/inputs';
import { Order, OrderStatus } from '@kickzone-workspace/entities';
import { HttpAuthGuard } from '@kickzone-workspace/guards';
import { CurrentUser, type AuthenticatedUser } from '@kickzone-workspace/decorators';

@Controller('orders')
@UseGuards(HttpAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders(
    @Query('first') first = '10',
    @Query('after') after?: string,
    @Query('sellerId') sellerId?: string,
    @Query('status') status?: OrderStatus
  ) {
    const result = await this.orderService.findAll(
      parseInt(first),
      after,
      sellerId,
      status
    );
    return result;
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Get('seller/:sellerId')
  async getSellerOrders(
    @Param('sellerId') sellerId: string,
    @Query('first') first = '10',
    @Query('after') after?: string,
    @Query('status') status?: OrderStatus
  ) {
    const result = await this.orderService.findAll(
      parseInt(first),
      after,
      sellerId,
      status
    );
    return result;
  }

  @Get('admin/seller/:sellerId')
  async adminGetSellerOrders(
    @CurrentUser() user: AuthenticatedUser,
    @Param('sellerId') sellerId: string,
    @Query('first') first = '10',
    @Query('after') after?: string,
    @Query('status') status?: OrderStatus
  ) {
    // Admin can view any seller's orders
    const result = await this.orderService.findAll(
      parseInt(first),
      after,
      sellerId,
      status
    );
    return result;
  }

  @Get('admin/all')
  async adminGetAllOrders(
    @CurrentUser() user: AuthenticatedUser,
    @Query('first') first = '10',
    @Query('after') after?: string,
    @Query('status') status?: OrderStatus
  ) {
    // Admin can view all orders from all sellers
    const result = await this.orderService.findAll(
      parseInt(first),
      after,
      undefined,
      status
    );
    return result;
  }

  @Get('my/orders')
  async getMyOrders(
    @CurrentUser() user: AuthenticatedUser,
    @Query('first') first = '10',
    @Query('after') after?: string
  ) {
    const result = await this.orderService.getOrdersBySeller(
      user.id,
      parseInt(first),
      after
    );
    return result;
  }

  @Post()
  async createOrder(@Body() createOrderInput: CreateOrderInput) {
    return this.orderService.createOrder(createOrderInput);
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderInput: UpdateOrderInput
  ) {
    return this.orderService.updateOrder(id, updateOrderInput);
  }

  @Put(':id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusInput: UpdateOrderStatusInput
  ) {
    return this.orderService.updateOrderStatus(
      id,
      updateOrderStatusInput.status
    );
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    await this.orderService.deleteOrder(id);
    return { success: true };
  }
}
