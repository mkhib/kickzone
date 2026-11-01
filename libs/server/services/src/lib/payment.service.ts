import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface ZarinPalPaymentRequest {
  amount: number; // Amount in unit of currency (Kickzone uses IRT / Toman)
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
  amount: number; // Must match request amount / currency unit
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

/** Error body returned by the ZarinPal REST API on non-2xx responses. */
interface ZarinPalErrorBody {
  errors?: { message?: string; code?: number }[];
  message?: string;
  data?: { message?: string };
}

@Injectable()
export class PaymentService {
  private readonly merchantId: string;
  private readonly isSandbox: boolean;
  private readonly apiBaseUrl: string;

  constructor(private readonly configService: ConfigService) {
    // Use a random UUID for sandbox if not configured (sandbox accepts any UUID)
    // Generate a random UUID: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    const generateRandomUUID = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    };

    this.merchantId =
      this.configService.get<string>('ZARINPAL_MERCHANT_ID') ||
      generateRandomUUID();

    // Check sandbox mode - default to true in development
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');
    const sandboxEnv = this.configService.get<string>('ZARINPAL_SANDBOX');

    // Default to sandbox in development, require explicit false for production
    this.isSandbox =
      sandboxEnv === undefined ? nodeEnv !== 'production' : sandboxEnv !== 'false';

    this.apiBaseUrl = this.isSandbox
      ? 'https://sandbox.zarinpal.com/pg/v4/payment'
      : 'https://payment.zarinpal.com/pg/v4/payment';

    // Warn if using default merchant ID
    if (this.merchantId === '00000000-0000-0000-0000-000000000000') {
      if (!this.isSandbox) {
        console.error(
          '❌ ZarinPal PRODUCTION: Merchant ID not configured! ' +
            'Payment requests will fail. Set ZARINPAL_MERCHANT_ID environment variable.'
        );
      }
    }
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
        // Clone the response so we can read it multiple times
        const responseClone = response.clone();

        // Try to get error details from response body
        let errorDetails = '';
        let fullErrorBody: ZarinPalErrorBody | null = null;
        let responseText = '';

        try {
          // First try to get as text to see what we're dealing with
          responseText = await responseClone.text();
          console.error(
            `[PaymentService] ❌ ZarinPal API raw error response:`,
            responseText.substring(0, 1000) // First 1000 chars
          );

          // Try to parse as JSON
          try {
            const parsedBody: ZarinPalErrorBody = JSON.parse(responseText);
            fullErrorBody = parsedBody;
            console.error(
              `[PaymentService] ❌ ZarinPal API error response body (JSON):`,
              JSON.stringify(fullErrorBody, null, 2)
            );

            if (parsedBody.errors && parsedBody.errors.length > 0) {
              errorDetails = parsedBody.errors
                .map(
                  (e: { message?: string; code?: number }) =>
                    e.message || `Code: ${e.code}`
                )
                .join(', ');
            } else if (parsedBody.message) {
              errorDetails = parsedBody.message;
            } else if (parsedBody.data && parsedBody.data.message) {
              errorDetails = parsedBody.data.message;
            } else {
              errorDetails = JSON.stringify(fullErrorBody);
            }
          } catch (jsonError) {
            // Not JSON, use text as error details
            errorDetails = responseText || response.statusText;
            console.error(
              `[PaymentService] ❌ ZarinPal API error (non-JSON response):`,
              responseText.substring(0, 500)
            );
          }
        } catch (textError) {
          // Can't even read as text
          errorDetails = response.statusText;
          console.error(
            `[PaymentService] ❌ Could not read response body:`,
            textError
          );
        }

        const errorMessage = errorDetails
          ? `ZarinPal API error (${response.status}): ${errorDetails}`
          : `ZarinPal API error: HTTP ${response.status} ${response.statusText}`;

        console.error(`[PaymentService] ❌ Payment request failed:`, {
          status: response.status,
          statusText: response.statusText,
          errorDetails,
          fullResponse: fullErrorBody,
          orderId: request.metadata?.order_id,
          amount: request.amount,
          currency: request.currency || 'IRT',
          merchantId: this.merchantId,
          isSandbox: this.isSandbox,
          apiUrl: this.apiBaseUrl,
          payload: {
            merchant_id: this.merchantId.substring(0, 8) + '...',
            amount: request.amount,
            currency: request.currency || 'IRT',
            callback_url: request.callback_url,
          },
        });

        throw new Error(errorMessage);
      }

      const data: ZarinPalPaymentResponse = await response.json();

      if (data.errors && data.errors.length > 0) {
        const errorMessages = data.errors.map((e) => e.message).join(', ');
        throw new Error(`ZarinPal API error: ${errorMessages}`);
      }

      return data;
    } catch (error) {
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
        // Try to get error details from response body
        let errorDetails = '';
        try {
          const errorBody = await response.json();
          if (errorBody.errors && errorBody.errors.length > 0) {
            errorDetails = errorBody.errors
              .map(
                (e: { message?: string; code?: number }) =>
                  e.message || `Code: ${e.code}`
              )
              .join(', ');
          }
        } catch {
          // If parsing fails, use status text
          errorDetails = response.statusText;
        }

        const errorMessage = errorDetails
          ? `ZarinPal API error (${response.status}): ${errorDetails}`
          : `ZarinPal API error: HTTP ${response.status} ${response.statusText}`;

        console.error(`[PaymentService] ❌ Payment verification failed:`, {
          status: response.status,
          statusText: response.statusText,
          errorDetails,
          authority: request.authority,
          amount: request.amount,
          merchantId: this.merchantId.substring(0, 8) + '...',
          isSandbox: this.isSandbox,
        });

        throw new Error(errorMessage);
      }

      const data: ZarinPalVerificationResponse = await response.json();

      if (data.errors && data.errors.length > 0) {
        const errorMessages = data.errors.map((e) => e.message).join(', ');
        throw new Error(`ZarinPal API error: ${errorMessages}`);
      }

      return data;
    } catch (error) {
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
