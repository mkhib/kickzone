import {
  SellerInfo,
  SellerProduct,
  ProductInfo,
  User,
} from '@kickzone-workspace/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import {
  AuthService,
  EmailService,
  SellerService,
  TokenService,
} from '@kickzone-workspace/services';
import { SellerResolver } from '@kickzone-workspace/resolvers';
import { ProductModule } from './product.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([SellerInfo, SellerProduct, ProductInfo, User]),
    UserModule,
    ProductModule,
  ],
  providers: [
    SellerService,
    SellerResolver,
    AuthService,
    JwtService,
    EmailService,
    TokenService,
    ConfigService,
  ],
  exports: [SellerService],
})
export class SellerInfoModule {}
