/**
 * ZarinPal Payment Gateway Service
 * Handles payment request and verification with ZarinPal API via GraphQL
 */

export interface ZarinPalPaymentRequest {
  merchant_id: string;
  amount: number; // Amount in Toman (IRR/10)
  callback_url: string;
  description: string;
  metadata?: {
    mobile?: string;
    email?: string;
    order_id?: string;
  };
  currency?: 'IRR' | 'IRT'; // IRR for Rial, IRT for Toman
  referrer_id?: string;
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
  merchant_id: string;
  amount: number; // Amount in Toman (IRR/10)
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

export const ZARINPAL_GATEWAY_URL = 'https://payment.zarinpal.com/pg/StartPay';
export const ZARINPAL_SANDBOX_GATEWAY_URL =
  'https://sandbox.zarinpal.com/pg/StartPay';

/**
 * Get merchant ID from environment variable
 * Uses a default UUID for sandbox mode if not set
 */
export function getZarinPalMerchantId(): string {
  const merchantId = import.meta.env.VITE_ZARINPAL_MERCHANT_ID;
  if (!merchantId) {
    // Default UUID for sandbox testing (ZarinPal sandbox accepts any UUID)
    return '00000000-0000-0000-0000-000000000000';
  }
  return merchantId;
}

/**
 * Check if we're using sandbox mode
 * Defaults to sandbox mode for development/testing
 */
export function isZarinPalSandbox(): boolean {
  const sandboxEnv = import.meta.env.VITE_ZARINPAL_SANDBOX;
  // Default to sandbox mode unless explicitly set to 'false'
  if (sandboxEnv === undefined || sandboxEnv === '') {
    return true; // Default to sandbox for now
  }
  return sandboxEnv === 'true';
}

// Payment functions are now implemented via GraphQL mutations in use-zarinpal-payment.tsx
// These types and helper functions are kept for backward compatibility

/**
 * Get error message for ZarinPal error codes
 */
export function getZarinPalErrorMessage(code: number): string {
  const errorMessages: Record<number, string> = {
    [-9]: 'خطای اعتبار سنجی',
    [-10]: 'IP یا مرچنت کد پذیرنده صحیح نیست',
    [-11]: 'مرچنت کد پذیرنده فعال نیست',
    [-12]: 'تلاش بیش از حد در یک بازه زمانی کوتاه',
    [-15]: 'ترمینال شما به حالت تعلیق در آمده است',
    [-16]: 'سطح تایید پذیرنده پایین تر از سطح نقره ای است',
    [-30]: 'اجازه دسترسی به تسویه اشتراکی شناور ندارید',
    [-31]: 'حساب بانکی تسویه اشتراکی به درستی تنظیم نشده است',
    [-32]: 'مبلغ ارسالی از مجموع مبالغ تسویه اشتراکی بیشتر است',
    [-33]: 'درخواست مورد نظر یافت نشد',
    [-34]: 'مبلغ قابل تسویه از مبلغ درخواستی بیشتر است',
    [-35]: 'تعداد درخواست تسویه بیشتر از حد مجاز است',
    [-40]: 'اجازه دسترسی به متد مربوطه را ندارید',
    [-50]: 'سطح تایید پذیرنده پایین تر از سطح طلایی است',
    [-51]: 'سطح تایید پذیرنده پایین تر از سطح الماس است',
    [-52]: 'طول IP بیشتر از حد مجاز است',
    [-53]: 'درخواست مورد نظر یافت نشد',
    [-54]: 'درخواست مورد نظر یافت نشد',
    [-101]: 'تراکنش با موفقیت انجام شد',
    100: 'عملیات با موفقیت انجام شد',
    101: 'این تراکنش قبلا تایید شده است',
  };

  return errorMessages[code] || `خطای نامشخص با کد ${code}`;
}
