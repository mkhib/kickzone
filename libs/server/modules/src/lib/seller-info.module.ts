import {
  SellerInfo,
  SellerProduct,
  ProductInfo,
  User,
} from '@kickzone-workspace/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { SellerService } from '@kickzone-workspace/services';
import { SellerResolver } from '@kickzone-workspace/resolvers';
import { ProductModule } from './product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SellerInfo, SellerProduct, ProductInfo, User]),
    UserModule,
    ProductModule,
  ],
  providers: [SellerService, SellerResolver],
  exports: [SellerService],
})
export class SellerInfoModule {}
