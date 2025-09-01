import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartItem } from '@kickzone-workspace/entities';
import { CartService } from '@kickzone-workspace/services';
import { CartResolver } from '@kickzone-workspace/resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem])],
  providers: [CartService, CartResolver],
  exports: [CartService],
})
export class CartModule {}
