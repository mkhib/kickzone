import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerInfo } from '@kickzone-workspace/entities';
import { CatalogGuard } from '@kickzone-workspace/guards';

@Module({
  imports: [TypeOrmModule.forFeature([SellerInfo])],
  providers: [CatalogGuard],
  exports: [CatalogGuard],
})
export class CatalogGuardModule {}
