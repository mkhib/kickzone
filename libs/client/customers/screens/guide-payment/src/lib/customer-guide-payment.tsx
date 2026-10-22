import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import {
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';

interface PaymentPillar {
  id: string;
  titleEn: string;
  titleFa: string;
  descEn: string;
  descFa: string;
  icon: React.ReactNode;
}

const PAYMENT_PILLARS: PaymentPillar[] = [
  {
    id: 'methods',
    titleEn: 'Supported Payment Methods',
    titleFa: 'روش‌های پرداخت پشتیبانی‌شده',
    descEn:
      'Seamless online checkout via our official Zarinpal gateway. Supports all Iranian banking cards on the Shetab and Shaparak network with dynamic SMS OTP.',
    descFa:
      'پرداخت آنلاین سریع و بدون واسطه از طریق درگاه رسمی زرین‌پال. پشتیبانی از تمامی کارت‌های بانکی عضو شبکه شتاب با رمز پویای پیامکی.',
    icon: <CreditCardIcon sx={{ fontSize: 28 }} />,
  },
  {
    id: 'security',
    titleEn: '256-Bit SSL & Gateway Security',
    titleFa: 'امنیت درگاه و رمزنگاری ۲۵۶ بیتی',
    descEn:
      'All transactions are processed through end-to-end 256-bit TLS/SSL encryption with strict PCI-DSS compliance. SAINTBALA never stores or has access to CVV2, card PINs, or sensitive credentials.',
    descFa:
      'کلیه تبادلات مالی تحت پروتکل فوق امن SSL/TLS انجام می‌گیرد. پلتفرم SAINTBALA هیچ‌گونه اطلاعات محرمانه مانند رمز دوم یا CVV2 را ذخیره نمی‌کند.',
    icon: <LockOutlinedIcon sx={{ fontSize: 28 }} />,
  },
  {
    id: 'settlement',
    titleEn: 'Order Settlement Verification',
    titleFa: 'راستی‌آزمایی و تسویه آنی سفارش',
    descEn:
      'Instant real-time transaction reconciliation upon gateway return. Automated order confirmation SMS and digital invoice with a unique tracking code are dispatched within seconds.',
    descFa:
      'تطبیق فوری تراکنش بلافاصله پس از بازگشت از درگاه بانک، همراه با ثبت خودکار سفارش و ارسال پیامک تایید با شماره پیگیری معتبر.',
    icon: <ReceiptLongIcon sx={{ fontSize: 28 }} />,
  },
  {
    id: 'refunds',
    titleEn: 'Automated Refund Safeguards',
    titleFa: 'تضمین بازگشت وجه خودکار بانکی',
    descEn:
      'In the rare event of a network glitch where funds are deducted from your account but the bank fails to confirm the order, the amount is automatically refunded by Shaparak within 72 hours.',
    descFa:
      'در صورت بروز قطعی شبکه شتاب و کسر وجه بدون ثبت سفارش، مبلغ کسرشده طبق قوانین بانک مرکزی حداکثر ظرف ۷۲ ساعت به کارت شما بازمی‌گردد.',
    icon: <AutorenewIcon sx={{ fontSize: 28 }} />,
  },
];

interface FAQItem {
  id: string;
  questionEn: string;
  questionFa: string;
  answerEn: string;
  answerFa: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-deduction',
    questionEn: 'What happens if money was deducted from my account but the order is not showing?',
    questionFa: 'اگر مبلغ از حساب کسر شود اما سفارش ثبت نشود چه باید کرد؟',
    answerEn:
      'This occurs during temporary bank network inter-switch timeouts. In 99% of cases, the banking system detects the unacknowledged transaction and automatically refunds your account within 15 minutes to 72 hours. If it does not reverse after 72 hours, contact our concierge with your bank reference number.',
    answerFa:
      'این وضعیت ناشی از قطعی موقت در سوییچ شاپرک است. در اکثر موارد مبلغ کسرشده ظرف ۱۵ دقیقه تا حداکثر ۷۲ ساعت توسط بانک عامل خودکار بازگردانده می‌شود. در صورت عدم بازگشت، با در دست داشتن شماره پیگیری با پشتیبانی تماس بگیرید.',
  },
  {
    id: 'faq-foreign',
    questionEn: 'Are international cards (Visa/Mastercard) directly accepted?',
    questionFa: 'آیا کارت‌های بین‌المللی مانند مسترکارت یا ویزا کارت پذیرفته می‌شوند؟',
    answerEn:
      'Currently, our primary gateway processes transactions via the Iranian banking network (Shetab). For bespoke international private acquisitions or foreign currency settlements, please reach out directly to our private client concierge.',
    answerFa:
      'درگاه پرداخت فعلی پلتفرم مبتنی بر شبکه شتاب و ریال/تومان است. برای هماهنگی خریدهای اختصاصی بین‌المللی یا ارزی، با پشتیبانی مشتریان اختصاصی تماس حاصل فرمایید.',
  },
  {
    id: 'faq-failure',
    questionEn: 'Why did my payment attempt fail or decline?',
    questionFa: 'چرا تراکنش پرداخت من ناموفق شد؟',
    answerEn:
      'Common reasons include: (1) Expired or incorrect dynamic OTP password, (2) Reaching your bank account daily online transaction limit, or (3) Temporary bank switch maintenance. Verify your card limits or try again after a few moments.',
    answerFa:
      'علل رایج تراکنش‌های ناموفق: ۱) انقضا یا اشتباه وارد کردن رمز پویا، ۲) اتمام سقف مجاز خرید اینترنتی روزانه کارت بانکی، ۳) اختلال موقت در درگاه بانک صادرکننده. پس از بررسی سقف مجدد اقدام فرمایید.',
  },
];

export function CustomerGuidePayment() {
  const { currentLocale } = useLanguageContext();
  const isEn = currentLocale === 'en';
  const isRTL = currentLocale === 'fa';

  usePageTitle(() =>
    isEn
      ? 'Payment & Security Guide — SAINTBALA'
      : 'راهنمای پرداخت و امنیت تراکنش — SAINTBALA'
  );

  return (
    <CustomersLayout>
      <Box
        data-testid="customer-guide-payment-screen"
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: 760,
              mx: 'auto',
              mb: { xs: 6, md: 10 },
            }}
          >
            <Typography
              component="div"
              sx={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#c9a774' : '#8a6a3d',
                mb: 1.5,
              }}
            >
              <bdi>SAINTBALA</bdi> {isEn ? 'FINANCIAL ENCRYPTION' : 'امنیت تراکنش'}
            </Typography>

            <Typography
              component="h1"
              variant="h3"
              sx={{
                fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.8rem', md: '3.2rem' },
                letterSpacing: '-0.03em',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                lineHeight: 1.2,
                mb: 2.5,
              }}
            >
              {isEn ? (
                'Payment & Gateway Security Guide'
              ) : (
                <span>
                  راهنمای جامع پرداخت و امنیت مالی در <bdi>SAINTBALA</bdi>
                </span>
              )}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#d2d2d7' : '#424245',
                fontSize: { xs: '1rem', sm: '1.15rem' },
                lineHeight: 1.8,
              }}
            >
              {isEn ? (
                'Every transaction on SAINTBALA is processed through bank-grade cryptographic protocols. Learn how your payments are protected, verified, and settled in real time.'
              ) : (
                <span>
                  تراکنش‌های مالی در پلتفرم <bdi>SAINTBALA</bdi> تحت بالاترین
                  استانداردهای رمزنگاری بانکی و اتصال رسمی به شبکه شاپرک پردازش
                  می‌شوند.
                </span>
              )}
            </Typography>
          </Box>

          {/* 4 Pillars of Payment Security */}
          <Box sx={{ mb: { xs: 8, md: 10 } }}>
            <Typography
              component="h2"
              variant="h5"
              sx={{
                fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                fontWeight: 700,
                fontSize: { xs: '1.3rem', sm: '1.6rem' },
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                mb: 4,
                textAlign: { xs: 'center', sm: isRTL ? 'right' : 'left' },
              }}
            >
              {isEn
                ? 'Core Pillars of Transaction Security'
                : 'اصول بنیادین امنیت پرداخت و تسویه'}
            </Typography>

            <Grid container spacing={3}>
              {PAYMENT_PILLARS.map((pillar) => {
                const title = isEn ? pillar.titleEn : pillar.titleFa;
                const desc = isEn ? pillar.descEn : pillar.descFa;

                return (
                  <Grid size={{ xs: 12, md: 6 }} key={pillar.id}>
                    <Paper
                      elevation={0}
                      data-testid={`payment-pillar-${pillar.id}`}
                      sx={{
                        p: { xs: 3, sm: 4 },
                        height: '100%',
                        borderRadius: '20px',
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(13, 14, 20, 0.72)'
                            : 'rgba(255, 255, 255, 0.85)',
                        border: (theme) =>
                          theme.palette.mode === 'dark'
                            ? '1px solid rgba(255, 255, 255, 0.10)'
                            : '1px solid rgba(0, 0, 0, 0.08)',
                        backdropFilter: 'blur(28px)',
                        transition:
                          'transform 0.25s ease, border-color 0.25s ease',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          borderColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#c9a774'
                              : '#8a6a3d',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(201, 167, 116, 0.16)'
                              : 'rgba(138, 106, 61, 0.12)',
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#c9a774'
                              : '#8a6a3d',
                          mb: 2.5,
                        }}
                      >
                        {pillar.icon}
                      </Box>

                      <Typography
                        component="h3"
                        variant="h6"
                        sx={{
                          fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                          fontWeight: 700,
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#ffffff'
                              : '#1d1d1f',
                          mb: 1.5,
                        }}
                      >
                        {title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#d2d2d7'
                              : '#525252',
                          lineHeight: 1.7,
                        }}
                      >
                        {desc}
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* Payment Troubleshooting FAQs */}
          <Box sx={{ mb: { xs: 8, md: 10 } }}>
            <Typography
              component="h2"
              variant="h5"
              sx={{
                fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                fontWeight: 700,
                fontSize: { xs: '1.3rem', sm: '1.6rem' },
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                mb: 3,
                textAlign: { xs: 'center', sm: isRTL ? 'right' : 'left' },
              }}
            >
              {isEn
                ? 'Frequently Asked Questions & Troubleshooting'
                : 'پرسش‌های متداول و راهنمای رفع خطای پرداخت'}
            </Typography>

            <Box data-testid="payment-faqs">
              {FAQS.map((faq) => {
                const question = isEn ? faq.questionEn : faq.questionFa;
                const answer = isEn ? faq.answerEn : faq.answerFa;

                return (
                  <Accordion
                    key={faq.id}
                    elevation={0}
                    data-testid={`faq-item-${faq.id}`}
                    sx={{
                      mb: 1.5,
                      borderRadius: '14px !important',
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(13, 14, 20, 0.65)'
                          : 'rgba(255, 255, 255, 0.85)',
                      border: (theme) =>
                        theme.palette.mode === 'dark'
                          ? '1px solid rgba(255, 255, 255, 0.08)'
                          : '1px solid rgba(0, 0, 0, 0.06)',
                      '&:before': { display: 'none' },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#c9a774'
                                : '#8a6a3d',
                          }}
                        />
                      }
                      sx={{ py: 1 }}
                    >
                      <Typography
                        sx={{
                          fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                          fontWeight: 700,
                          fontSize: '0.98rem',
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#ffffff'
                              : '#1d1d1f',
                        }}
                      >
                        {question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0, pb: 2.5 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#d2d2d7'
                              : '#525252',
                          lineHeight: 1.8,
                        }}
                      >
                        {answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          </Box>

          {/* Quick Action Navigation */}
          <Box
            sx={{
              p: { xs: 3.5, sm: 5 },
              borderRadius: '20px',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(201, 167, 116, 0.10)'
                  : 'rgba(138, 106, 61, 0.08)',
              border: (theme) =>
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(201, 167, 116, 0.25)'
                  : '1px solid rgba(138, 106, 61, 0.20)',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 3,
            }}
          >
            <Box sx={{ textAlign: { xs: 'center', sm: isRTL ? 'right' : 'left' } }}>
              <Typography
                component="h3"
                variant="h6"
                sx={{
                  fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                  fontWeight: 700,
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                  mb: 0.5,
                }}
              >
                {isEn ? 'Ready to Complete Your Acquisition?' : 'آماده تکمیل سفارش هستید؟'}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#d2d2d7' : '#525252',
                }}
              >
                {isEn
                  ? 'Explore the latest season releases or track your existing order status.'
                  : 'جدیدترین مجموعه‌ها را مشاهده کرده یا وضعیت سفارشات جاری خود را پیگیری نمایید.'}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              <Button
                component={RouterLink}
                to={CUSTOMER_ROUTES.SHOP}
                variant="contained"
                data-testid="payment-shop-cta"
                startIcon={<ShoppingBagOutlinedIcon />}
                sx={{
                  minHeight: '44px',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#c9a774' : '#1d1d1f',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
                  fontWeight: 700,
                  px: 3.5,
                  borderRadius: '10px',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#d8bc8c' : '#2e2e2c',
                  },
                }}
              >
                {isEn ? 'Explore Catalog' : 'مشاهده محصولات'}
              </Button>

              <Button
                component={RouterLink}
                to={CUSTOMER_ROUTES.ORDERS}
                variant="outlined"
                data-testid="payment-orders-cta"
                startIcon={<LocalShippingOutlinedIcon />}
                sx={{
                  minHeight: '44px',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(201, 167, 116, 0.4)'
                      : 'rgba(0, 0, 0, 0.2)',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#f5f5f7' : '#1d1d1f',
                  fontWeight: 600,
                  px: 3,
                  borderRadius: '10px',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#c9a774' : '#8a6a3d',
                  },
                }}
              >
                {isEn ? 'Track Orders' : 'پیگیری سفارشات'}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerGuidePayment;
