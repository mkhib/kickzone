import { SITE_NAME } from '@kickzone-workspace/shared-i18n';

type Locale = 'en' | 'fa';

interface EmailTemplateContent {
  subject: string;
  html: string;
}

// Email translations using a central site name variable for easy future change
// Imported from @kickzone-workspace/shared-i18n to ensure consistency across the app
const SITE_NAMES = SITE_NAME;

const emailTranslations = {
  en: {
    passwordSetup: {
      subject: `Welcome to ${SITE_NAMES.en} - Set Up Your Password`,
      title: `Welcome to ${SITE_NAMES.en}!`,
      message: `Thank you for joining ${SITE_NAMES.en} as a seller. To get started, you'll need to set up your password.`,
      instruction: 'Click the button below to set up your password:',
      button: 'Set Up Password',
      footer:
        "This link is valid for 24 hours and can only be used once. If you didn't request this email, please ignore it.",
    },
    passwordReset: {
      subject: `${SITE_NAMES.en} - Password Reset Request`,
      title: 'Password Reset Request',
      message: `We received a request to reset your password for your ${SITE_NAMES.en} account.`,
      instruction: 'Click the button below to reset your password:',
      button: 'Reset Password',
      footer:
        "This link is valid for 24 hours. If you didn't request this email, please ignore it and your password will remain unchanged.",
    },
  },
  fa: {
    passwordSetup: {
      subject: `خوش آمدید به ${SITE_NAMES.fa} - تنظیم رمز عبور`,
      title: `به ${SITE_NAMES.fa} خوش آمدید!`,
      message: `از پیوستن شما به ${SITE_NAMES.fa} به عنوان فروشنده سپاسگزاریم. برای شروع، باید رمز عبور خود را تنظیم کنید.`,
      instruction: 'برای تنظیم رمز عبور، روی دکمه زیر کلیک کنید:',
      button: 'تنظیم رمز عبور',
      footer:
        'این لینک برای ۲۴ ساعت معتبر است و فقط یک بار قابل استفاده است. اگر این ایمیل را درخواست نکرده‌اید، لطفاً آن را نادیده بگیرید.',
    },
    passwordReset: {
      subject: `${SITE_NAMES.fa} - درخواست بازیابی رمز عبور`,
      title: 'درخواست بازیابی رمز عبور',
      message: `درخواستی برای بازیابی رمز عبور حساب ${SITE_NAMES.fa} شما دریافت کردیم.`,
      instruction: 'برای بازیابی رمز عبور، روی دکمه زیر کلیک کنید:',
      button: 'بازیابی رمز عبور',
      footer:
        'این لینک برای ۲۴ ساعت معتبر است. اگر این ایمیل را درخواست نکرده‌اید، لطفاً آن را نادیده بگیرید و رمز عبور شما تغییر نخواهد کرد.',
    },
  },
};

const getEmailDirection = (locale: Locale): string => {
  return locale === 'fa' ? 'rtl' : 'ltr';
};

export const getPasswordSetupEmailTemplate = (
  setupLink: string,
  locale: Locale = 'en'
): EmailTemplateContent => {
  const t = emailTranslations[locale].passwordSetup;
  const direction = getEmailDirection(locale);

  return {
    subject: t.subject,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: ${direction};">
      <h2 style="color: #333;">${t.title}</h2>
      <p>${t.message}</p>
      <p>${t.instruction}</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${setupLink}" 
           style="background-color: #4CAF50; 
                  color: white; 
                  padding: 12px 24px; 
                  text-decoration: none; 
                  border-radius: 4px;
                  display: inline-block;">
          ${t.button}
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">
        ${t.footer}
      </p>
    </div>
  `,
  };
};

export const getPasswordResetEmailTemplate = (
  resetLink: string,
  locale: Locale = 'en'
): EmailTemplateContent => {
  const t = emailTranslations[locale].passwordReset;
  const direction = getEmailDirection(locale);

  return {
    subject: t.subject,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: ${direction};">
      <h2 style="color: #333;">${t.title}</h2>
      <p>${t.message}</p>
      <p>${t.instruction}</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" 
           style="background-color: #2196F3; 
                  color: white; 
                  padding: 12px 24px; 
                  text-decoration: none; 
                  border-radius: 4px;
                  display: inline-block;">
          ${t.button}
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">
        ${t.footer}
      </p>
    </div>
  `,
  };
};
