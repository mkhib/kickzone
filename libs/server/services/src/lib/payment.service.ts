import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
  private readonly logger = new Logger(PaymentService.name);
  private readonly merchantId: string;
  private readonly isSandbox: boolean;
  private readonly apiBaseUrl: string;

  constructor(private configService: ConfigService) {
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

      if (data.errors && data.errors.length > 0) {
        const errorMessages = data.errors.map((e) => e.message).join(', ');
        this.logger.error(`ZarinPal API error: ${errorMessages}`);
        throw new Error(`ZarinPal API error: ${errorMessages}`);
      }

      return data;
    } catch (error) {
      this.logger.error('Failed to request payment from ZarinPal', error);
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
        this.logger.error(`ZarinPal API error: ${errorMessages}`);
        throw new Error(`ZarinPal API error: ${errorMessages}`);
      }

      return data;
    } catch (error) {
      this.logger.error('Failed to verify payment with ZarinPal', error);
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
