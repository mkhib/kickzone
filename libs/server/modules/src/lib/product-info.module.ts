import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInfo } from '@kickzone-workspace/entities';
import { ProductService } from '@kickzone-workspace/services';
import { ProductModule } from './product.module';
import { TranslationModule } from './translation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductInfo]),
    ProductModule,
    TranslationModule,
  ],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductInfoModule {}
