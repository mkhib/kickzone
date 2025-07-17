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
  UserService,
} from '@kickzone-workspace/services';
import { TokenModule } from './token.module';
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
      Category,
      SellerProduct,
      Color,
      SellerInfo,
    ]),
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'defaultSecret',
      signOptions: { expiresIn: '60m' },
    }),
    TokenModule,
  ],
  providers: [
    ProductService,
    ProductResolver,
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
