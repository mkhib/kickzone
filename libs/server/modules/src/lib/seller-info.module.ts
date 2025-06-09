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

@Module({
  imports: [
    TypeOrmModule.forFeature([SellerInfo, SellerProduct, ProductInfo, User]),
    UserModule,
  ],
  providers: [SellerService],
  exports: [SellerService],
})
export class SellerInfoModule {}
