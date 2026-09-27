import {
  Category,
  Color,
  OrderItem,
  Product,
  ProductInfo,
  ProductInfoColor,
  SellerProduct,
  SellerInfo,
  User,
} from '@kickzone-workspace/entities';
import {
  AuthResolver,
  ProductResolver,
  ProductInfoResolver,
  SellerProductResolver,
  UserResolver,
} from '@kickzone-workspace/resolvers';
import {
  AuthService,
  EmailService,
  ProductService,
  SellerService,
  UserService,
} from '@kickzone-workspace/services';
import { TokenModule } from './token.module';
import { TranslationModule } from './translation.module';
import { CatalogGuardModule } from './catalog-guard.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Product,
      ProductInfo,
      ProductInfoColor,
      Category,
      SellerProduct,
      Color,
      SellerInfo,
      OrderItem,
    ]),
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'defaultSecret',
      signOptions: { expiresIn: '60m' },
    }),
    TokenModule,
    TranslationModule,
    CatalogGuardModule,
  ],
  providers: [
    ProductService,
    ProductResolver,
    ProductInfoResolver,
    SellerProductResolver,
    SellerService,
    UserService,
    UserResolver,
    AuthService,
    AuthResolver,
    EmailService,
    ConfigService,
  ],
  exports: [ProductService, TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
