import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SecurityIcon from '@mui/icons-material/Security';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import {
  useLanguageContext,
  usePageTitle,
  SITE_NAME,
} from '@kickzone-workspace/shared-i18n';

interface PrivacyPillar {
  id: string;
  number: string;
  titleEn: string;
  titleFa: string;
  descEn: string;
  descFa: string;
  commitmentsEn: string[];
  commitmentsFa: string[];
  icon: React.ReactNode;
}

const PRIVACY_PILLARS: PrivacyPillar[] = [
  {
    id: 'banking-security',
    number: '01',
    titleEn: 'Zero Card Data Retention & Banking Gateway Isolation',
    titleFa: 'عدم ذخیره‌سازی اطلاعات بانکی و ایزولاسیون کامل درگاه',
    descEn:
      'All monetary transactions are processed directly via certified Central Bank Shaparak & Zarinpal gateway tunnels protected by TLS 1.3 and 256-bit encryption. SAINTBALA never receives, logs, or stores debit card numbers, expiration dates, or dynamic SMS OTPs.',
    descFa:
      'تمامی تراکنش‌های مالی منحصراً از طریق بستر رمزنگاری‌شده TLS 1.3 شبکه شاپرک و درگاه امن زرین‌پال انجام می‌شوند. سرورهای SAINTBALA به هیچ‌عنوان شماره کارت، تاریخ انقضا، CVV2 یا رمز پویای پیامکی را پردازش، ذخیره یا مشاهده نمی‌کنند.',
    commitmentsEn: [
      'No card numbers or CVV2 credentials ever touch our servers',
      'Central Bank of Iran (CBI) & Shaparak compliant TLS 1.3 encryption',
      'Direct verified tokenization with multi-signature authorization',
    ],
    commitmentsFa: [
      'عدم دریافت و ذخیره‌سازی شماره کارت و اطلاعات حساس پرداخت',
      'انطباق کامل با پروتکل‌های امنیتی شبکه شاپرک و بانک مرکزی',
      'تایید اصالت تراکنش از طریق توکن‌های رمزنگاری‌شده یک‌بارمصرف',
    ],
    icon: <CreditCardOffOutlinedIcon sx={{ fontSize: 28 }} />,
  },
  {
    id: 'data-confidentiality',
    number: '02',
    titleEn: 'Zero Third-Party Commercial Data Sharing',
    titleFa: 'تعهد عدم اشتراک‌گذاری تجاری داده‌ها با اشخاص ثالث',
    descEn:
      'Your identity, order history, shipping addresses, and personal contact details are held in sovereign vaults. We never sell, lease, monetize, or expose client profiles to third-party ad brokers or analytics marketing networks.',
    descFa:
      'هویت، تاریخچه خرید، نشانی‌ها و اطلاعات تماس شما در مخزن اختصاصی رمزنگاری‌شده نگهداری می‌شوند. ما تحت هیچ شرایطی داده‌های مشتریان را به آژانس‌های تبلیغاتی یا واسطه‌های تجاری واگذار نمی‌کنیم.',
    commitmentsEn: [
      'Zero commercial data monetization or third-party ad sharing',
      'Encrypted client storage with restricted cryptographic keys',
      'Logistical address transmission strictly limited to assigned couriers',
    ],
    commitmentsFa: [
      'تضمین عدم فروش یا واگذاری اطلاعات به شبکه‌های بازاریابی',
      'نگهداری اطلاعات در دیتاسنترهای ایزوله با کلیدهای رمزنگاری اختصاصی',
      'ارسال نشانی صرفاً به سفیر اختصاصی جهت تحویل همان مرسوله',
    ],
    icon: <VisibilityOffOutlinedIcon sx={{ fontSize: 28 }} />,
  },
  {
    id: 'discreet-packaging',
    number: '03',
    titleEn: 'Discreet High-Value Delivery & Vault Protocol',
    titleFa: 'پروتکل بسته‌بندی محرمانه و تحویل اختصاصی اقلام باارزش',
    descEn:
      'To safeguard high-value streetwear pieces during transit and protect client privacy, outer shipping cartons can be requested in plain, unbranded armored configuration with discreet sender labels upon checkout.',
    descFa:
      'جهت حفظ حریم خصوصی خریداران و امنیت کلکسیون‌ها حین حمل‌ونقل، امکان انتخاب کارتن‌های بدون نشان تجاری با برچسب محرمانه هنگام ثبت سفارش فراهم است.',
    commitmentsEn: [
      'Optional unbranded neutral outer protective cartons',
      'Confidential concierge couriers bound by non-disclosure pledges',
      'Tamper-evident internal seals accessible only by the recipient',
    ],
    commitmentsFa: [
      'امکان ارسال در بسته‌بندی ثانویه بدون نام تجاری و کاملاً خنثی',
      'تعهد رازداری کامل پرسنل ناوگان تشریفات و کنسیرژ اختصاصی',
      'پلمپ امنیتی داخلی که تنها توسط تحویل‌گیرنده باز می‌شود',
    ],
    icon: <ShieldOutlinedIcon sx={{ fontSize: 28 }} />,
  },
  {
    id: 'user-rights',
    number: '04',
    titleEn: 'Comprehensive Client Rights & Permanent Deletion',
    titleFa: 'حقوق کامل کاربر و امکان حذف دائمی سوابق حساب',
    descEn:
      'Every client maintains complete sovereignty over their personal data. You possess the irrevocable right to inspect stored records, download your profile archive, or request permanent cryptographic erasure of all identifiable information.',
    descFa:
      'تمامی کاربران حق دسترسی شفاف به اطلاعات ثبت‌شده، دریافت نسخه پشتیبان سوابق یا درخواست حذف دائم و غیرقابل بازگشت تمامی داده‌های هویتی خود از پایگاه داده را دارند.',
    commitmentsEn: [
      'Real-time access to review and edit saved shipping addresses',
      'Direct self-service export of profile records and invoices',
      'Right to be forgotten: complete database purge upon concierge request',
    ],
    commitmentsFa: [
      'امکان ویرایش و بروزرسانی آنی نشانی‌ها و شماره‌های تماس',
      'امکان دریافت خروجی کامل سوابق و فاکتورها در پنل کاربری',
      'حق فراموشی: حذف کامل و بدون بازگشت حساب کاربری با تایید کنسیرژ',
    ],
    icon: <DeleteOutlineIcon sx={{ fontSize: 28 }} />,
  },
];

export function CustomerPrivacyPolicy() {
  const { currentLocale } = useLanguageContext();
  const isEn = currentLocale === 'en';
  const isRTL = currentLocale === 'fa';

  usePageTitle(() =>
    isEn
      ? `Privacy & Data Security Policy — ${SITE_NAME}`
      : `سیاست حفظ حریم خصوصی و امنیت داده‌ها — ${SITE_NAME}`
  );

  const brandWordmark = isRTL ? (
    <bdi>{SITE_NAME}</bdi>
  ) : (
    SITE_NAME
  );

  return (
    <CustomersLayout>
      <Box
        component="main"
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#070709' : '#f9f9fb',
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#f5f5f7' : '#141416',
          py: { xs: 4, md: 8 },
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 5, md: 8 },
              maxWidth: 820,
              mx: 'auto',
            }}
          >
            <Chip
              icon={<LockOutlinedIcon sx={{ fontSize: 18, color: '#c9a774 !important' }} />}
              label={
                isEn ? (
                  <span>Data Protection & Cryptographic Privacy</span>
                ) : (
                  <span>امنیت داده‌ها و حفظ حریم خصوصی کاربران</span>
                )
              }
              sx={{
                mb: 2.5,
                bgcolor: 'rgba(201, 167, 116, 0.12)',
                color: '#c9a774',
                borderColor: 'rgba(201, 167, 116, 0.35)',
                fontWeight: 600,
                fontSize: '0.8125rem',
                letterSpacing: isEn ? '0.06em' : 'normal',
                textTransform: isEn ? 'uppercase' : 'none',
              }}
              variant="outlined"
            />
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.125rem' },
                lineHeight: 1.2,
                mb: 2,
                letterSpacing: isEn ? '-0.02em' : 'normal',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              }}
            >
              {isEn ? (
                <>
                  <span style={{ color: '#c9a774' }}>{brandWordmark}</span> Privacy & Data Governance
                </>
              ) : (
                <>
                  سیاست رازداری و حفاظت از داده‌های <span style={{ color: '#c9a774' }}>{brandWordmark}</span>
                </>
              )}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.72)'
                    : 'rgba(0, 0, 0, 0.68)',
                fontSize: { xs: '0.9375rem', md: '1.0625rem' },
                lineHeight: 1.8,
              }}
            >
              {isEn
                ? 'We handle your confidential data with the same uncompromising standard applied to our streetwear curation: bank-grade encryption, zero advertising disclosures, and absolute discretion.'
                : 'حفاظت از اطلاعات هویتی و مالی شما با همان استانداردهای سازش‌ناپذیر گزینش محصولات انجام می‌شود: رمزنگاری در سطح بانکی، عدم اشتراک داده با شبکه‌های تبلیغاتی و حفظ رازداری کامل.'}
            </Typography>
          </Box>

          {/* Core Trust Badges Grid */}
          <Grid container spacing={3} sx={{ mb: { xs: 6, md: 8 } }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '20px',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#101115' : '#ffffff',
                  border: '1px solid',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <SecurityIcon sx={{ color: '#c9a774', fontSize: 26 }} />
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                    {isEn ? '256-Bit SSL Gateway' : 'رمزنگاری ۲۵۶ بیتی درگاه'}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.65)'
                        : 'rgba(0, 0, 0, 0.65)',
                    lineHeight: 1.7,
                  }}
                >
                  {isEn
                    ? 'Direct encrypted pipeline to Shaparak with zero card details saved on our database.'
                    : 'اتصال مستقیم و رمزنگاری‌شده به درگاه شاپرک بدون دسترسی سرورها به اطلاعات کارت.'}
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '20px',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#101115' : '#ffffff',
                  border: '1px solid',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <VisibilityOffOutlinedIcon sx={{ color: '#c9a774', fontSize: 26 }} />
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                    {isEn ? 'Zero Commercial Resale' : 'عدم فروش تجاری داده‌ها'}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.65)'
                        : 'rgba(0, 0, 0, 0.65)',
                    lineHeight: 1.7,
                  }}
                >
                  {isEn
                    ? 'Your personal profile and purchase volume are strictly confidential and never marketed.'
                    : 'سوابق خرید و اطلاعات شخصی شما کاملاً محرمانه بوده و در اختیار هیچ نهاد واسط قرار نمی‌گیرد.'}
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '20px',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#101115' : '#ffffff',
                  border: '1px solid',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <DeleteOutlineIcon sx={{ color: '#c9a774', fontSize: 26 }} />
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                    {isEn ? 'Right to be Forgotten' : 'حق حذف دائم حساب کاربری'}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.65)'
                        : 'rgba(0, 0, 0, 0.65)',
                    lineHeight: 1.7,
                  }}
                >
                  {isEn
                    ? 'Clients may request permanent cryptographic erasure of their stored data at any time.'
                    : 'امکان درخواست پاک‌سازی دائمی و غیرقابل بازیابی اطلاعات کاربری در هر زمان.'}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Pillars of Privacy */}
          <Box sx={{ mb: { xs: 6, md: 9 } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.5rem', sm: '1.875rem' },
                mb: 1.5,
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              }}
            >
              {isEn ? 'The Four Pillars of Privacy' : 'اصول چهارگانه رازداری و حریم خصوصی'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.6)'
                    : 'rgba(0, 0, 0, 0.6)',
                mb: 4,
              }}
            >
              {isEn
                ? 'Our comprehensive framework governing data processing, logistics, and account retention.'
                : 'چارچوب جامع ما در خصوص پردازش داده‌ها، هماهنگی‌های لجستیکی و امنیت حساب کاربری.'}
            </Typography>

            <Grid container spacing={3.5}>
              {PRIVACY_PILLARS.map((pillar) => (
                <Grid key={pillar.id} size={{ xs: 12, md: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, sm: 4 },
                      borderRadius: '24px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark' ? '#101115' : '#ffffff',
                      border: '1px solid',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'rgba(201, 167, 116, 0.12)',
                          color: '#c9a774',
                        }}
                      >
                        {pillar.icon}
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            color: '#c9a774',
                            fontSize: '0.8125rem',
                          }}
                        >
                          SECTION {pillar.number}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#ffffff'
                                : '#000000',
                          }}
                        >
                          {isEn ? pillar.titleEn : pillar.titleFa}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.72)'
                            : 'rgba(0, 0, 0, 0.68)',
                        lineHeight: 1.8,
                        mb: 3,
                        flexGrow: 1,
                      }}
                    >
                      {isEn ? pillar.descEn : pillar.descFa}
                    </Typography>

                    <Box
                      component="ul"
                      sx={{
                        p: 0,
                        m: 0,
                        listStyle: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.25,
                        pt: 2.5,
                        borderTop: '1px solid',
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.06)'
                            : 'rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      {(isEn ? pillar.commitmentsEn : pillar.commitmentsFa).map(
                        (item, idx) => (
                          <Box
                            component="li"
                            key={idx}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.25,
                              fontSize: '0.8125rem',
                              color: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? 'rgba(255, 255, 255, 0.85)'
                                  : 'rgba(0, 0, 0, 0.85)',
                            }}
                          >
                            <VerifiedUserOutlinedIcon
                              sx={{ fontSize: 16, color: '#c9a774', flexShrink: 0 }}
                            />
                            <span>{item}</span>
                          </Box>
                        )
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Privacy Questions Callout */}
          <Box
            sx={{
              p: { xs: 3, sm: 4.5 },
              borderRadius: '24px',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#101115' : '#ffffff',
              border: '1px solid rgba(201, 167, 116, 0.3)',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                mb: 1.5,
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              }}
            >
              {isEn
                ? 'Questions Regarding Data Privacy or Account Records?'
                : 'پرسشی در زمینه امنیت اطلاعات یا درخواست حذف سوابق دارید؟'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.65)'
                    : 'rgba(0, 0, 0, 0.65)',
                maxWidth: 620,
                mx: 'auto',
                mb: 3,
                lineHeight: 1.7,
              }}
            >
              {isEn
                ? 'Our Data Protection Officer and Concierge team respond directly to privacy inquiries and verified data deletion requests.'
                : 'مسئول امنیت اطلاعات و تیم کنسیرژ آماده پاسخگویی به ابهامات و انجام درخواست‌های پاک‌سازی اطلاعات کاربری هستند.'}
            </Typography>
            <Button
              component={RouterLink}
              to={CUSTOMER_ROUTES.CONTACT}
              variant="contained"
              data-testid="privacy-contact-cta"
              sx={{
                bgcolor: '#c9a774',
                color: '#000000',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: '12px',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#d8bc8c',
                },
              }}
            >
              {isEn ? 'Contact Privacy Officer' : 'مکاتبه با مسئول امنیت اطلاعات'}
            </Button>
          </Box>
        </Container>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerPrivacyPolicy;
