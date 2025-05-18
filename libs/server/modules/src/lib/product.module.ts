import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Product,
  ProductInfo,
  Category,
  SellerProduct,
  Color,
} from '@kickzone-workspace/entities';
import { ProductService } from '@kickzone-workspace/services';
import { ProductResolver } from '@kickzone-workspace/resolvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductInfo,
      Category,
      SellerProduct,
      Color,
    ]),
  ],
  providers: [ProductService, ProductResolver],
  exports: [ProductService, TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
