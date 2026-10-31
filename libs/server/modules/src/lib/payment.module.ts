import { Module } from '@nestjs/common';
import { PaymentService, PaymentLogger } from '@kickzone-workspace/services';
import { PaymentResolver } from '@kickzone-workspace/resolvers';
import { CurrencyModule } from './currency.module';
import { OrderModule } from './order.module';

@Module({
  imports: [
    OrderModule, // OrderService
    CurrencyModule, // CurrencyService for the server-side FX check
  ],
  providers: [PaymentService, PaymentResolver, PaymentLogger],
  exports: [PaymentService],
})
export class PaymentModule {}
