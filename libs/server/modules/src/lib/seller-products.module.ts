import { SellerProduct } from '@kickzone-workspace/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerInfoModule } from './seller-info.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SellerProduct]),
    SellerInfoModule,
    UserModule,
  ],
})
export class SellerProductsModule {}
