/**
 * ZarinPal Payment Gateway helpers (client)
 *
 * Official API (v4): https://www.zarinpal.com/docs/paymentGateway/connectToGateway.html
 * Live docs MCP: https://www.zarinpal.com/docs/mcp
 *
 * Payment request/verify run on the Nest server (ZARINPAL_MERCHANT_ID).
 * This module keeps gateway URL fallbacks, types, and Persian error messages.
 */

export interface ZarinPalPaymentRequest {
  merchant_id: string;
  /** Amount in the unit of `currency` (IRT = Toman, IRR = Rial) */
  amount: number;
  callback_url: string;
  description: string;
  metadata?: {
    mobile?: string;
    email?: string;
    order_id?: string;
  };
  /** IRR = Rial, IRT = Toman. Kickzone uses IRT. */
  currency?: 'IRR' | 'IRT';
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
  /** Must match the amount used in the original request */
  amount: number;
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
 * Client-side sandbox flag used only as a fallback if GraphQL gateway URL fails.
 * Server sandbox is controlled by ZARINPAL_SANDBOX / NODE_ENV.
 */
export function isZarinPalSandbox(): boolean {
  const sandboxEnv = import.meta.env.VITE_ZARINPAL_SANDBOX;
  if (sandboxEnv === undefined || sandboxEnv === '') {
    return true;
  }
  return sandboxEnv === 'true';
}

/**
 * Persian messages for ZarinPal status codes
 * Source: https://www.zarinpal.com/docs/paymentGateway/errorList.html
 */
export function getZarinPalErrorMessage(code: number): string {
  const errorMessages: Record<number, string> = {
    [-9]: 'خطای اعتبار سنجی',
    [-10]: 'ای‌پی یا مرچنت کد پذیرنده صحیح نیست',
    [-11]: 'مرچنت کد پذیرنده فعال نیست',
    [-12]: 'تلاش بیش از حد در یک بازه زمانی کوتاه',
    [-13]: 'کد کال‌بک (callback URL) نامعتبر است',
    [-14]: 'کال‌بک دامنه ثبت‌شده در پنل نیست',
    [-15]: 'ترمینال شما به حالت تعلیق در آمده است',
    [-16]: 'سطح تایید پذیرنده پایین‌تر از سطح نقره‌ای است',
    [-17]: 'محدودیت در دسترسی پذیرنده',
    [-18]: 'دامنه یا آدرس کال‌بک نامعتبر است',
    [-19]: 'امکان ایجاد تراکنش برای این پذیرنده وجود ندارد',
    [-30]: 'اجازه دسترسی به تسویه اشتراکی شناور ندارید',
    [-31]: 'حساب بانکی تسویه اشتراکی به درستی تنظیم نشده است',
    [-32]: 'مبلغ از مجموع مبالغ تسویه اشتراکی بیشتر است',
    [-33]: 'درصدهای وارد شده صحیح نیست',
    [-34]: 'مبلغ از مبلغ قابل تسویه بیشتر است',
    [-35]: 'تعداد درخواست تسویه بیش از حد مجاز است',
    [-40]: 'اجازه دسترسی به متد مربوطه را ندارید',
    [-41]: 'اطلاعات ارسال‌شده مربوط به AdditionalData غیرمعتبر است',
    [-50]: 'مبلغ پرداخت‌شده با مبلغ ارسالی در متد وریفای مغایرت دارد',
    [-51]: 'پرداخت ناموفق',
    [-52]: 'خطای غیرمنتظره‌ای رخ داده است',
    [-53]: 'پرداخت متعلق به این مرچنت کد نیست',
    [-54]: 'اتوریتی نامعتبر است',
    [-55]: 'تراکنش مورد نظر یافت نشد',
    [-60]: 'امکان ریورس کردن تراکنش با بانک وجود ندارد',
    [-61]: 'تراکنش موفق نیست یا قبلا ریورس شده است',
    [-62]: 'آدرس آی‌پی نامعتبر است',
    [-63]: 'حداکثر زمان (30 دقیقه) برای ریورس کردن تراکنش گذشته است',
    100: 'عملیات با موفقیت انجام شد',
    101: 'تراکنش قبلا verify شده است',
  };

  return errorMessages[code] || `خطای نامشخص با کد ${code}`;
}
