// Canonical brand name — always SAINTBALA, never translated for Farsi.
// Duplicated here to avoid importing from shared-i18n (React) in the server bundle.
// Keep in sync with libs/shared/shared-i18n/src/lib/site-name.ts
const SITE_NAME = 'SAINTBALA' as const;

type Locale = 'en' | 'fa';

interface EmailTemplateContent {
  subject: string;
  html: string;
}

const emailTranslations = {
  en: {
    passwordSetup: {
      subject: `Welcome to ${SITE_NAME} - Set Up Your Password`,
      title: `Welcome to ${SITE_NAME}!`,
      message: `Thank you for joining ${SITE_NAME} as a seller. To get started, you'll need to set up your password.`,
      instruction: 'Click the button below to set up your password:',
      button: 'Set Up Password',
      footer:
        "This link is valid for 24 hours and can only be used once. If you didn't request this email, please ignore it.",
    },
    passwordReset: {
      subject: `${SITE_NAME} - Password Reset Request`,
      title: 'Password Reset Request',
      message: `We received a request to reset your password for your ${SITE_NAME} account.`,
      instruction: 'Click the button below to reset your password:',
      button: 'Reset Password',
      footer:
        "This link is valid for 24 hours. If you didn't request this email, please ignore it and your password will remain unchanged.",
    },
  },
  fa: {
    passwordSetup: {
      subject: `خوش آمدید به ${SITE_NAME} - تنظیم رمز عبور`,
      title: `به ${SITE_NAME} خوش آمدید!`,
      message: `از پیوستن شما به ${SITE_NAME} به عنوان فروشنده سپاسگزاریم. برای شروع، باید رمز عبور خود را تنظیم کنید.`,
      instruction: 'برای تنظیم رمز عبور، روی دکمه زیر کلیک کنید:',
      button: 'تنظیم رمز عبور',
      footer:
        'این لینک برای ۲۴ ساعت معتبر است و فقط یک بار قابل استفاده است. اگر این ایمیل را درخواست نکرده‌اید، لطفاً آن را نادیده بگیرید.',
    },
    passwordReset: {
      subject: `${SITE_NAME} - درخواست بازیابی رمز عبور`,
      title: 'درخواست بازیابی رمز عبور',
      message: `درخواستی برای بازیابی رمز عبور حساب ${SITE_NAME} شما دریافت کردیم.`,
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
    <!DOCTYPE html>
    <html lang="${locale}" dir="${direction}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <style>
        @media only screen and (max-width: 600px) {
          .container {
            width: 100% !important;
            padding: 10px !important;
          }
          .glass-card {
            padding: 30px 20px !important;
            margin: 10px !important;
          }
          .title {
            font-size: 24px !important;
          }
          .button {
            padding: 14px 28px !important;
            font-size: 16px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); background-color: #667eea; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; direction: ${direction};">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); background-color: #667eea;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" class="container" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; margin: 0 auto;">
              <tr>
                <td>
                  <!-- Glass Card Container -->
                  <table role="presentation" class="glass-card" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); padding: 50px 40px;">
                    <tr>
                      <td align="center" style="padding-bottom: 30px;">
                        <h1 class="title" style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); letter-spacing: -0.5px;">${
                          t.title
                        }</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 25px;">
                        <p style="margin: 0; color: rgba(255, 255, 255, 0.95); font-size: 16px; line-height: 1.6; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">${
                          t.message
                        }</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 30px;">
                        <p style="margin: 0; color: rgba(255, 255, 255, 0.9); font-size: 15px; line-height: 1.6;">${
                          t.instruction
                        }</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom: 35px;">
                        <a href="${setupLink}" class="button" style="display: inline-block; background: rgba(255, 255, 255, 0.3); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; border: 2px solid rgba(255, 255, 255, 0.4); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);">${
      t.button
    }</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div style="background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); border-radius: 12px; padding: 20px; border: 1px solid rgba(255, 255, 255, 0.2);">
                          <p style="margin: 0; color: rgba(255, 255, 255, 0.85); font-size: 13px; line-height: 1.6; text-align: center;">${
                            t.footer
                          }</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top: 30px;">
                  <p style="margin: 0; color: rgba(255, 255, 255, 0.7); font-size: 12px; text-align: center;">© ${new Date().getFullYear()} ${
      SITE_NAME
    }. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
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
    <!DOCTYPE html>
    <html lang="${locale}" dir="${direction}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <style>
        @media only screen and (max-width: 600px) {
          .container {
            width: 100% !important;
            padding: 10px !important;
          }
          .glass-card {
            padding: 30px 20px !important;
            margin: 10px !important;
          }
          .title {
            font-size: 24px !important;
          }
          .button {
            padding: 14px 28px !important;
            font-size: 16px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); background-color: #667eea; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; direction: ${direction};">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); background-color: #667eea;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" class="container" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; margin: 0 auto;">
              <tr>
                <td>
                  <!-- Glass Card Container -->
                  <table role="presentation" class="glass-card" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); padding: 50px 40px;">
                    <tr>
                      <td align="center" style="padding-bottom: 30px;">
                        <h1 class="title" style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); letter-spacing: -0.5px;">${
                          t.title
                        }</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 25px;">
                        <p style="margin: 0; color: rgba(255, 255, 255, 0.95); font-size: 16px; line-height: 1.6; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">${
                          t.message
                        }</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 30px;">
                        <p style="margin: 0; color: rgba(255, 255, 255, 0.9); font-size: 15px; line-height: 1.6;">${
                          t.instruction
                        }</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom: 35px;">
                        <a href="${resetLink}" class="button" style="display: inline-block; background: rgba(255, 255, 255, 0.3); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; border: 2px solid rgba(255, 255, 255, 0.4); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);">${
      t.button
    }</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div style="background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); border-radius: 12px; padding: 20px; border: 1px solid rgba(255, 255, 255, 0.2);">
                          <p style="margin: 0; color: rgba(255, 255, 255, 0.85); font-size: 13px; line-height: 1.6; text-align: center;">${
                            t.footer
                          }</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top: 30px;">
                  <p style="margin: 0; color: rgba(255, 255, 255, 0.7); font-size: 12px; text-align: center;">© ${new Date().getFullYear()} ${
      SITE_NAME
    }. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
  };
};
