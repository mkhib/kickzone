import {
  Category,
  Color,
  Product,
  ProductInfo,
  SellerProduct,
  SellerInfo,
  User,
} from '@kickzone-workspace/entities';
import { ProductResolver, UserResolver } from '@kickzone-workspace/resolvers';
import {
  ProductService,
  SellerService,
  UserService,
} from '@kickzone-workspace/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Product,
      ProductInfo,
      Category,
      SellerProduct,
      Color,
      SellerInfo,
    ]),
  ],
  providers: [
    ProductService,
    ProductResolver,
    SellerService,
    UserService,
    UserResolver,
  ],
  exports: [ProductService, TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
