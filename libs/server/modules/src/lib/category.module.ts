import { CatalogGuardModule } from './catalog-guard.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Product } from '@kickzone-workspace/entities';
import { ProductService, CategoryService } from '@kickzone-workspace/services';
import { CategoryResolver } from '@kickzone-workspace/resolvers';
import { ProductModule } from './product.module';
import { TranslationModule } from './translation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Product]),
    ProductModule,
    TranslationModule,
    CatalogGuardModule,
  ],
  providers: [ProductService, CategoryResolver, CategoryService],
  exports: [ProductService, CategoryService],
})
export class CategoryModule {}
