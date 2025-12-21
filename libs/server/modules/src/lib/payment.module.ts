import { Module } from '@nestjs/common';
import { PaymentService } from '@kickzone-workspace/services';
import { PaymentResolver } from '@kickzone-workspace/resolvers';

@Module({
  providers: [PaymentService, PaymentResolver],
  exports: [PaymentService],
})
export class PaymentModule {}
