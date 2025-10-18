import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerProfile } from '@kickzone-workspace/entities';
import { CustomerProfileService } from '@kickzone-workspace/services';
import { CustomerProfileResolver } from '@kickzone-workspace/resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerProfile])],
  providers: [CustomerProfileService, CustomerProfileResolver],
  exports: [CustomerProfileService],
})
export class CustomerProfileModule {}
