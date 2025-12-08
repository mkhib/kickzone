import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartItem, SellerProduct } from '@kickzone-workspace/entities';
import { CartService } from '@kickzone-workspace/services';
import { CartResolver, ShippingResolver } from '@kickzone-workspace/resolvers';
import { PlatformSettingsModule } from './platform-settings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, SellerProduct]),
    PlatformSettingsModule,
  ],
  providers: [CartService, CartResolver, ShippingResolver],
  exports: [CartService],
})
export class CartModule {}
