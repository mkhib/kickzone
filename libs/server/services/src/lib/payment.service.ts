import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentLogger } from './payment-logger.service';

export interface ZarinPalPaymentRequest {
  amount: number; // Amount in Toman (IRT)
  callback_url: string;
  description: string;
  metadata?: {
    mobile?: string;
    email?: string;
    order_id?: string;
  };
  currency?: 'IRR' | 'IRT';
}

export interface ZarinPalPaymentResponse {
  data: {
    code: number;
    message: string;
    authority: string;
    fee_type?: string;
    fee?: number;
  };
  errors: Array<{
    code: number;
    message: string;
  }>;
}

export interface ZarinPalVerificationRequest {
  amount: number; // Amount in Toman (IRT)
  authority: string;
}

export interface ZarinPalVerificationResponse {
  data: {
    code: number;
    message: string;
    ref_id?: number;
    card_pan?: string;
    card_hash?: string;
    fee_type?: string;
    fee?: number;
  };
  errors: Array<{
    code: number;
    message: string;
  }>;
}

@Injectable()
export class PaymentService {
  private readonly merchantId: string;
  private readonly isSandbox: boolean;
  private readonly apiBaseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly paymentLogger: PaymentLogger
  ) {
    this.merchantId =
      this.configService.get<string>('ZARINPAL_MERCHANT_ID') ||
      '00000000-0000-0000-0000-000000000000';
    this.isSandbox =
      this.configService.get<string>('ZARINPAL_SANDBOX', 'true') !== 'false';
    this.apiBaseUrl = this.isSandbox
      ? 'https://sandbox.zarinpal.com/pg/v4/payment'
      : 'https://payment.zarinpal.com/pg/v4/payment';
  }

  /**
   * Request payment from ZarinPal
   */
  async requestPayment(
    request: ZarinPalPaymentRequest
  ): Promise<ZarinPalPaymentResponse> {
    const payload = {
      merchant_id: this.merchantId,
      amount: request.amount,
      callback_url: request.callback_url,
      description: request.description,
      currency: request.currency || 'IRT',
      metadata: request.metadata,
    };

    try {
      this.paymentLogger.logPaymentInitiated({
        orderId: request.metadata?.order_id,
        amount: request.amount,
        currency: request.currency || 'IRT',
        gateway: 'zarinpal',
      });
      const response = await fetch(`${this.apiBaseUrl}/request.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ZarinPalPaymentResponse = await response.json();

      this.paymentLogger.logGatewayResponse({
        orderId: request.metadata?.order_id,
        authority: data.data.authority,
        code: data.data.code,
        message: data.data.message,
        gateway: 'zarinpal',
      });

      if (data.errors && data.errors.length > 0) {
        const errorMessages = data.errors.map((e) => e.message).join(', ');
        throw new Error(`ZarinPal API error: ${errorMessages}`);
      }

      return data;
    } catch (error) {
      this.paymentLogger.logGatewayResponse({
        orderId: request.metadata?.order_id,
        authority: undefined,
        code: -1,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to request payment from ZarinPal',
        gateway: 'zarinpal',
      });
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to request payment from ZarinPal');
    }
  }

  /**
   * Verify payment with ZarinPal
   */
  async verifyPayment(
    request: ZarinPalVerificationRequest
  ): Promise<ZarinPalVerificationResponse> {
    const payload = {
      merchant_id: this.merchantId,
      amount: request.amount,
      authority: request.authority,
    };

    try {
      const response = await fetch(`${this.apiBaseUrl}/verify.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ZarinPalVerificationResponse = await response.json();

      if (data.errors && data.errors.length > 0) {
        const errorMessages = data.errors.map((e) => e.message).join(', ');
        throw new Error(`ZarinPal API error: ${errorMessages}`);
      }

      this.paymentLogger.logVerificationResult({
        orderId: undefined,
        authority: request.authority,
        amount: request.amount,
        code: data.data.code,
        message: data.data.message,
        refId: data.data.ref_id,
      });

      return data;
    } catch (error) {
      this.paymentLogger.logVerificationResult({
        orderId: undefined,
        authority: request.authority,
        amount: request.amount,
        code: -1,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to verify payment with ZarinPal',
        refId: undefined,
      });
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to verify payment with ZarinPal');
    }
  }

  /**
   * Get payment gateway URL
   */
  getGatewayUrl(authority: string): string {
    const gatewayBaseUrl = this.isSandbox
      ? 'https://sandbox.zarinpal.com/pg/StartPay'
      : 'https://payment.zarinpal.com/pg/StartPay';
    return `${gatewayBaseUrl}/${authority}`;
  }
}
