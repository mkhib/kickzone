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
} from '@kickzone-workspace/services';
import { TokenModule } from './token.module';
import { SellerResolver } from '@kickzone-workspace/resolvers';
import { ProductModule } from './product.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([SellerInfo, SellerProduct, ProductInfo, User]),
    UserModule,
    ProductModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'defaultSecret',
      signOptions: { expiresIn: '60m' },
    }),
    TokenModule,
  ],
  providers: [
    SellerService,
    SellerResolver,
    AuthService,
    EmailService,
    ConfigService,
  ],
  exports: [SellerService],
})
export class SellerInfoModule {}
