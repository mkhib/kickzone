import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderItem, SellerProduct } from '@kickzone-workspace/entities';
import { OrderService } from '@kickzone-workspace/services';
import { OrderResolver } from '@kickzone-workspace/resolvers';
import { OrderController } from '@kickzone-workspace/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, SellerProduct])],
  providers: [OrderService, OrderResolver],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
