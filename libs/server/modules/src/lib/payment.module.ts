import { Module } from '@nestjs/common';
import { PaymentService } from '@kickzone-workspace/services';
import { PaymentResolver } from '@kickzone-workspace/resolvers';
import { OrderModule } from './order.module';

@Module({
  imports: [OrderModule], // Import OrderModule to access OrderService
  providers: [PaymentService, PaymentResolver],
  exports: [PaymentService],
})
export class PaymentModule {}
