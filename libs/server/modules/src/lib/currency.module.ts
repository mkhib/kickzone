import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Currency,
  ExchangeRate,
  CurrencyPreference,
} from '@kickzone-workspace/entities';
import { CurrencyService } from '@kickzone-workspace/services';
import { CurrencyResolver } from '@kickzone-workspace/resolvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Currency, ExchangeRate, CurrencyPreference]),
  ],
  providers: [CurrencyService, CurrencyResolver],
  exports: [CurrencyService],
})
export class CurrencyModule {}
