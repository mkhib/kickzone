import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Order,
  OrderItem,
  SellerProduct,
  SellerInfo,
} from '@kickzone-workspace/entities';
import { OrderService } from '@kickzone-workspace/services';
import { OrderResolver } from '@kickzone-workspace/resolvers';
import { OrderController } from '@kickzone-workspace/controllers';
import { SellerInfoModule } from './seller-info.module';
import { PlatformSettingsModule } from './platform-settings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, SellerProduct, SellerInfo]),
    SellerInfoModule,
    PlatformSettingsModule,
  ],
  providers: [OrderService, OrderResolver],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
