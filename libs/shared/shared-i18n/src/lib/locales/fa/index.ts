import type { BaseTranslation } from '../i18n-types';

const fa = {
  button: {
    submit: 'ارسال',
    cancel: 'لغو',
  },
  greeting: 'سلام',
  authorization: {
    signIn: 'ورود',
    signUp: 'ثبت نام',
    forgotPassword: 'فراموشی رمز عبور',
    resetPassword: 'بازیابی رمز عبور',
    verifyEmail: 'تایید ایمیل',
    resendVerificationEmail: 'ارسال مجدد تایید ایمیل',
    emailVerification: 'تایید ایمیل',
    emailVerificationSent: 'ایمیل تایید ارسال شد',
    emailVerificationFailed: 'تایید ایمیل ناموفق',
    emailVerificationSuccess: 'تایید ایمیل با موفقیت انجام شد',
    wrongEmailOrPassword: 'ایمیل یا رمز عبور اشتباه است',
  },
  errors: {
    unauthorized: 'شما مجاز نیستید. لطفا وارد شوید.',
    unknown: 'خطای ناشناخته‌ای رخ داده است. لطفا دوباره تلاش کنید.',
  },
} satisfies BaseTranslation;

export default fa;
