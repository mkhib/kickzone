import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformSettings } from '@kickzone-workspace/entities';
import { ShippingCalculationService } from '@kickzone-workspace/services';

@Module({
  imports: [TypeOrmModule.forFeature([PlatformSettings])],
  providers: [ShippingCalculationService],
  exports: [ShippingCalculationService],
})
export class PlatformSettingsModule {}
