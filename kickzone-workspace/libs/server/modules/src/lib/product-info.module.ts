import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInfo } from '@kickzone-workspace/entities';
import { ProductService } from '@kickzone-workspace/services';
import { ProductModule } from './product.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductInfo]), ProductModule],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductInfoModule {}
