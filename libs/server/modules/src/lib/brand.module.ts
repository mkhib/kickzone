import { CatalogGuardModule } from './catalog-guard.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand, Product } from '@kickzone-workspace/entities';
import { BrandService } from '@kickzone-workspace/services';
import { BrandResolver } from '@kickzone-workspace/resolvers';
import { TranslationModule } from './translation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brand, Product]),
    TranslationModule,
    CatalogGuardModule,
  ],
  providers: [BrandService, BrandResolver],
  exports: [BrandService, TypeOrmModule.forFeature([Brand])],
})
export class BrandModule {}
