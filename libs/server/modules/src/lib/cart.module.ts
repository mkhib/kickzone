import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartItem, SellerProduct } from '@kickzone-workspace/entities';
import { CartService } from '@kickzone-workspace/services';
import { CartResolver } from '@kickzone-workspace/resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, SellerProduct])],
  providers: [CartService, CartResolver],
  exports: [CartService],
})
export class CartModule {}
