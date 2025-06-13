import {
  Category,
  Color,
  Product,
  ProductInfo,
  SellerProduct,
  SellerInfo,
  User,
} from '@kickzone-workspace/entities';
import {
  AuthResolver,
  ProductResolver,
  UserResolver,
} from '@kickzone-workspace/resolvers';
import {
  AuthService,
  EmailService,
  ProductService,
  SellerService,
  TokenService,
  UserService,
} from '@kickzone-workspace/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
    AuthService,
    AuthResolver,
    JwtService,
    EmailService,
    TokenService,
    ConfigService,
  ],
  exports: [ProductService, TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
