import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class PaymentLogger {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(PaymentLogger.name);
  }

  logPaymentInitiated(input: {
    orderId?: string;
    userId?: string;
    amount: number;
    currency: string;
    gateway: string;
  }) {
    this.logger.info(
      {
        event: 'payment_initiated',
        orderId: input.orderId,
        userId: input.userId,
        amount: input.amount,
        currency: input.currency,
        gateway: input.gateway,
      },
      'Payment initiated'
    );
  }

  logGatewayResponse(input: {
    orderId?: string;
    authority?: string;
    code: number;
    message: string;
    gateway: string;
  }) {
    this.logger.info(
      {
        event: 'payment_gateway_response',
        orderId: input.orderId,
        authority: input.authority,
        code: input.code,
        message: input.message,
        gateway: input.gateway,
      },
      'Payment gateway responded'
    );
  }

  logVerificationResult(input: {
    orderId?: string;
    authority: string;
    amount: number;
    code: number;
    message: string;
    refId?: number;
  }) {
    this.logger.info(
      {
        event: 'payment_verification_result',
        orderId: input.orderId,
        authority: input.authority,
        amount: input.amount,
        code: input.code,
        message: input.message,
        refId: input.refId,
      },
      'Payment verification finished'
    );
  }

  logOrderConfirmationFailed(orderId: string, error: unknown) {
    this.logger.error(
      {
        event: 'order_confirmation_failed',
        orderId,
        error:
          error instanceof Error
            ? { name: error.name, message: error.message }
            : error,
      },
      'Failed to confirm order after successful payment'
    );
  }

  logOrderCancellationFailed(orderId: string, error: unknown) {
    this.logger.error(
      {
        event: 'order_cancellation_failed',
        orderId,
        error:
          error instanceof Error
            ? { name: error.name, message: error.message }
            : error,
      },
      'Failed to cancel order after failed payment'
    );
  }
}
