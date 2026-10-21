import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import VerifiedIcon from '@mui/icons-material/Verified';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import {
  useLanguageContext,
  usePageTitle,
  SITE_NAME,
} from '@kickzone-workspace/shared-i18n';

interface ShippingMethod {
  id: string;
  titleEn: string;
  titleFa: string;
  timelineEn: string;
  timelineFa: string;
  costEn: string;
  costFa: string;
  descEn: string;
  descFa: string;
  featuresEn: string[];
  featuresFa: string[];
  icon: React.ReactNode;
}

const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'vip-tehran',
    titleEn: 'VIP Concierge Hand-Delivery',
    titleFa: 'ارسال اختصاصی اکسپرس و تشریفات (تهران)',
    timelineEn: 'Same-Day (Within 3 Hours)',
    timelineFa: 'تحویل همان روز (حداکثر ۳ ساعت)',
    costEn: 'Complimentary on orders > $150',
    costFa: 'رایگان برای سفارش‌های بالای ۱۰ میلیون تومان',
    descEn:
      'Dedicated SAINTBALA private courier delivering directly to your residence in branded climate-controlled transport.',
    descFa:
      'ارسال مستقیم با پیک اختصاصی و تشریفاتی SAINTBALA با بسته‌بندی لوکس ضدضربه در سراسر مناطق ۲۲‌گانه تهران.',
    featuresEn: [
      'Real-time GPS courier tracking via SMS',
      'Flexible 2-hour delivery window selection',
      'Try-on while courier waits (up to 15 mins)',
    ],
    featuresFa: [
      'رهگیری زنده موقعیت پیک با پیامک اختصاصی',
      'امکان انتخاب بازه زمانی ۲ ساعته برای تحویل',
      'امکان پرو در حضور سفیر تشریفات (تا ۱۵ دقیقه)',
    ],
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 32 }} />,
  },
  {
    id: 'express-air',
    titleEn: 'Express Armored Air Cargo',
    titleFa: 'ارسال هوایی سفارشی و بیمه‌شده (سراسر ایران)',
    timelineEn: '24 to 48 Business Hours',
    timelineFa: '۲۴ الی ۴۸ ساعت کاری',
    costEn: 'Subsidized Tiered Shipping',
    costFa: 'تعرفه ویژه با تخفیف پلکانی',
    descEn:
      'Express priority air freight to all provincial capitals and major cities across Iran via certified high-security logistics.',
    descFa:
      'حمل سریع هوایی و زمینی به تمامی مراکز استان‌ها و شهرستان‌های کشور با سریع‌ترین ناوگان پستی و باربری امنیتی.',
    featuresEn: [
      'Full 100% declared transit insurance',
      'Tamper-evident outer security seal',
      'SMS tracking notifications at each transit depot',
    ],
    featuresFa: [
      'پوشش ۱۰۰٪ بیمه ارزش کامل کالا تا زمان تحویل',
      'پلمپ امنیتی ثانویه کارتن جهت جلوگیری از دستکاری',
      'ارسال پیامک کد رهگیری رسمی پستی و تیپاکس',
    ],
    icon: <FlightTakeoffIcon sx={{ fontSize: 32 }} />,
  },
  {
    id: 'showroom-pickup',
    titleEn: 'Private Showroom & Vault Pickup',
    titleFa: 'تحویل حضوری در شوروم اختصاصی (تهران)',
    timelineEn: 'Ready within 2 Hours',
    timelineFa: 'آماده‌سازی ظرف ۲ ساعت کاری',
    costEn: 'Complimentary Always',
    costFa: 'همواره کاملاً رایگان',
    descEn:
      'Collect your authenticated piece directly from our VIP Vault Showroom in District 1, Tehran, with complimentary espresso & private styling.',
    descFa:
      'دریافت حضوری و مستقیم سفارش در شوروم اختصاصی خیابان ولیعصر همراه با پذیرایی و مشاوره استایلینگ لوکس.',
    featuresEn: [
      'In-person authenticity inspection with our master',
      'On-site size comparison and exchanges',
      'Private styling and VIP fitting suite',
    ],
    featuresFa: [
      'بررسی حضوری پلمپ و اصالت کالا با کارشناس',
      'امکان مقایسه سایز و تعویض در لحظه',
      'استفاده از اتاق پرو VIP و مشاوره تخصصی',
    ],
    icon: <StorefrontOutlinedIcon sx={{ fontSize: 32 }} />,
  },
];

interface ExchangeStep {
  step: string;
  titleEn: string;
  titleFa: string;
  descEn: string;
  descFa: string;
}

const EXCHANGE_STEPS: ExchangeStep[] = [
  {
    step: '01',
    titleEn: 'Initiate Request via Concierge',
    titleFa: 'ثبت درخواست تعویض یا استرداد',
    descEn:
      'Notify our VIP concierge within 7 calendar days of delivery via your orders dashboard or WhatsApp/Phone.',
    descFa:
      'حداکثر تا ۷ روز پس از دریافت سفارش، درخواست خود را در پنل کاربری یا از طریق تماس با کنسیرژ ثبت کنید.',
  },
  {
    step: '02',
    titleEn: 'Complimentary Courier Pickup',
    titleFa: 'هماهنگی پیک رایگان جهت دریافت کالا',
    descEn:
      'Our dedicated courier collects the piece from your address in Tehran, or a prepaid return air label is issued nationwide.',
    descFa:
      'در تهران سفیر ما کالا را از درب منزل دریافت می‌کند و برای شهرستان‌ها بارنامه پستی پیش‌پرداخت صادر می‌شود.',
  },
  {
    step: '03',
    titleEn: 'Vault Security Seal Inspection',
    titleFa: 'بررسی پلمپ امنیتی در بایگانی مرکزی',
    descEn:
      'Our authentication desk inspects the returned piece to verify the original tamper-evident SAINTBALA seal is intact and undamaged.',
    descFa:
      'بسته دریافتی توسط کارشناسان بررسی می‌شود تا سلامت و دست‌نخورده بودن پلمپ امنیتی SAINTBALA تایید گردد.',
  },
  {
    step: '04',
    titleEn: 'Instant Exchange or Immediate Refund',
    titleFa: 'ارسال فوری سایز جدید یا واریز وجه',
    descEn:
      'Your replacement size is dispatched within 2 hours, or an immediate full refund is returned to your original Shetab bank card.',
    descFa:
      'سایز جایگزین همان روز ارسال می‌شود یا وجه واریزی حداکثر ظرف ۲۴ ساعت به شماره شبای بانکی خریدار مسترد می‌گردد.',
  },
];

const FAQS = [
  {
    qEn: 'What happens if a parcel is lost or damaged in transit?',
    qFa: 'در صورت مفقودی یا آسیب احتمالی در مسیر ارسال چه اتفاقی می‌افتد؟',
    aEn:
      'Every SAINTBALA shipment carries 100% full declared value transit insurance. In the rare event of transit complications, a replacement item is dispatched immediately via express courier, or a full refund is processed within 24 hours without waiting for courier investigations.',
    aFa:
      'تمامی مرسولات دارای بیمه ارزش ۱۰۰ درصدی هستند. در صورت بروز هرگونه مشکل در مسیر ارسال، فوراً قطعه جایگزین ارسال شده یا کل مبلغ سفارش بدون اتلاف وقت به حساب شما بازگردانده می‌شود.',
  },
  {
    qEn: 'Can I exchange an item if the SAINTBALA authenticity seal is removed?',
    qFa: 'آیا در صورت جدا شدن پلمپ امنیتی کالا امکان تعویض وجود دارد؟',
    aEn:
      'No. To protect all clients from counterfeit returns, the serialized, tamper-evident SAINTBALA security seal must remain attached and undamaged. Once the seal is cut or removed, the piece is deemed final sale and ineligible for exchange or return.',
    aFa:
      'خیر. به منظور تضمین سلامت و اصالت صددرصدی کالاها برای تمامی خریداران، پلمپ امنیتی سریال‌دار SAINTBALA باید کاملاً سالم و متصل به کالا باقی بماند. در صورت برش یا دستکاری پلمپ، امکان تعویض یا مرجوعی وجود نخواهد داشت.',
  },
  {
    qEn: 'How long does a size exchange take?',
    qFa: 'فرآیند تعویض سایز چقدر زمان می‌برد؟',
    aEn:
      'For Tehran orders, size exchanges can be completed the same day with courier exchange at your door. For other provinces, exchanges are typically finalized within 48 to 72 hours.',
    aFa:
      'در تهران تعویض سایز می‌تواند در همان روز و درب منزل انجام شود. برای سایر شهرها، فرآیند تعویض معمولاً بین ۴۸ الی ۷۲ ساعت به طول می‌انجامد.',
  },
];

export function CustomerShippingReturns() {
  const { currentLocale } = useLanguageContext();
  const isEn = currentLocale === 'en';
  const isRTL = currentLocale === 'fa';

  usePageTitle(() =>
    isEn
      ? `Shipping & Returns Policy — ${SITE_NAME}`
      : `قوانین و رویه ارسال و مرجوعی کالا — ${SITE_NAME}`
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
              icon={<LocalShippingOutlinedIcon sx={{ fontSize: 18, color: '#c9a774 !important' }} />}
              label={
                isEn ? (
                  <span>Armored Logistics & 7-Day Exchange</span>
                ) : (
                  <span>ارسال ایمن و ضمانت تعویض ۷ روزه</span>
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
                  <span style={{ color: '#c9a774' }}>{brandWordmark}</span> Shipping & Return Protocol
                </>
              ) : (
                <>
                  رویه ارسال اختصاصی و ضمانت بازگشت <span style={{ color: '#c9a774' }}>{brandWordmark}</span>
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
                ? 'From our climate-controlled vault directly into your hands: discover our armored courier delivery standards and seamless size-exchange guarantee.'
                : 'از گاوصندوق مرکزی تا درب منزل شما: با بالاترین استانداردهای بسته‌بندی امنیتی، ناوگان ارسال اختصاصی و شرایط شفاف تعویض سایز آشنا شوید.'}
            </Typography>
          </Box>

          {/* CRITICAL SECURITY SEAL ALERT BANNER */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              mb: { xs: 6, md: 8 },
              borderRadius: '24px',
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(201, 167, 116, 0.16) 0%, rgba(16, 17, 21, 0.95) 100%)'
                  : 'linear-gradient(135deg, rgba(201, 167, 116, 0.22) 0%, rgba(255, 255, 255, 0.95) 100%)',
              border: '1.5px solid rgba(201, 167, 116, 0.45)',
              display: 'flex',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2.5,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '16px',
                bgcolor: 'rgba(201, 167, 116, 0.2)',
                color: '#c9a774',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <VerifiedIcon sx={{ fontSize: 32 }} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  color: '#c9a774',
                  mb: 0.5,
                }}
              >
                {isEn
                  ? 'Crucial: Tamper-Evident Security Seal Requirement'
                  : 'نکته بسیار مهم: حفظ پلمپ امنیتی ضدجعل کالا'}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.82)'
                      : 'rgba(0, 0, 0, 0.8)',
                  lineHeight: 1.7,
                }}
              >
                {isEn ? (
                  <span>
                    To protect all streetwear collectors, every piece is delivered with an individualized, serialized {brandWordmark} security tag. <strong>This tag must remain fully attached and undamaged</strong> for any size exchange or refund eligibility.
                  </span>
                ) : (
                  <span>
                    جهت اطمینان از اصالت کالکشن و محافظت از حقوق خریداران، تمامی کالاها با پلمپ امنیتی سریال‌دار {brandWordmark} ارسال می‌شوند. <strong>جهت تعویض سایز یا مرجوعی، این پلمپ باید بدون بریدگی یا دستکاری متصل به محصول باقی بماند.</strong>
                  </span>
                )}
              </Typography>
            </Box>
          </Paper>

          {/* Section 1: Shipping Methods Grid */}
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
              {isEn ? '1. Secure Shipping Methods' : '۱. روش‌ها و استانداردهای ارسال کالا'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.6)'
                    : 'rgba(0, 0, 0, 0.6)',
                mb: 3.5,
              }}
            >
              {isEn
                ? 'All shipments are dispatched with climate control, tamper-evident carton wrapping, and 100% full declared value transit insurance.'
                : 'کلیه سفارش‌ها با بسته‌بندی ضدضربه، پلمپ ثانویه امنیتی و پوشش ۱۰۰٪ بیمه حمل‌ونقل ارسال می‌گردند.'}
            </Typography>

            <Grid container spacing={3}>
              {SHIPPING_METHODS.map((method) => (
                <Grid key={method.id} size={{ xs: 12, md: 4 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, sm: 3.5 },
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
                          width: 52,
                          height: 52,
                          borderRadius: '16px',
                          bgcolor: 'rgba(201, 167, 116, 0.12)',
                          color: '#c9a774',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {method.icon}
                      </Box>
                      <Box>
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
                          {isEn ? method.titleEn : method.titleFa}
                        </Typography>
                        <Chip
                          label={isEn ? method.timelineEn : method.timelineFa}
                          size="small"
                          sx={{
                            mt: 0.5,
                            bgcolor: 'rgba(201, 167, 116, 0.15)',
                            color: '#c9a774',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                        />
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.7)'
                            : 'rgba(0, 0, 0, 0.65)',
                        lineHeight: 1.7,
                        mb: 2.5,
                        flexGrow: 1,
                      }}
                    >
                      {isEn ? method.descEn : method.descFa}
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
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.06)'
                            : 'rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      {(isEn ? method.featuresEn : method.featuresFa).map(
                        (feat, idx) => (
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
                            <AssignmentTurnedInIcon
                              sx={{ fontSize: 16, color: '#c9a774', flexShrink: 0 }}
                            />
                            <span>{feat}</span>
                          </Box>
                        )
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Section 2: 7-Day Exchange & Returns Workflow */}
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
              {isEn ? '2. The 7-Day Size Exchange Workflow' : '۲. مراحل گام‌به‌گام تعویض سایز و مرجوعی ۷ روزه'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.6)'
                    : 'rgba(0, 0, 0, 0.6)',
                mb: 3.5,
              }}
            >
              {isEn
                ? 'We ensure your piece fits with surgical precision. Follow these four simple steps.'
                : 'برای اطمینان از تناسب بی‌نقص سایز کالا با استایل شما، فرآیند تعویض در چهار مرحله انجام می‌شود.'}
            </Typography>

            <Grid container spacing={3}>
              {EXCHANGE_STEPS.map((step) => (
                <Grid key={step.step} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: '20px',
                      height: '100%',
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark' ? '#101115' : '#ffffff',
                      border: '1px solid',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '1.75rem',
                        fontWeight: 900,
                        color: '#c9a774',
                        mb: 1.5,
                        lineHeight: 1,
                        fontFamily: 'monospace',
                      }}
                    >
                      {step.step}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                      }}
                    >
                      {isEn ? step.titleEn : step.titleFa}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.68)'
                            : 'rgba(0, 0, 0, 0.65)',
                        lineHeight: 1.7,
                      }}
                    >
                      {isEn ? step.descEn : step.descFa}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Section 3: Frequently Asked Questions */}
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.5rem', sm: '1.875rem' },
                mb: 3,
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              }}
            >
              {isEn ? '3. Frequently Asked Questions' : '۳. پرسش‌های متداول در خصوص رویه ارسال و مرجوعی'}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {FAQS.map((faq, index) => (
                <Accordion
                  key={index}
                  elevation={0}
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#101115' : '#ffffff',
                    border: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.08)',
                    borderRadius: '16px !important',
                    '&:before': { display: 'none' },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#c9a774' }} />}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                      {isEn ? faq.qEn : faq.qFa}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      variant="body2"
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.72)'
                            : 'rgba(0, 0, 0, 0.7)',
                        lineHeight: 1.8,
                      }}
                    >
                      {isEn ? faq.aEn : faq.aFa}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>

          {/* Contact Concierge CTA */}
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
                ? 'Need Assistance with an Active Dispatch or Exchange?'
                : 'نیاز به راهنمایی در مورد سفارش در حال ارسال یا تعویض کالا دارید؟'}
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
                ? 'Our VIP concierge coordinates courier pickups, size availability, and address changes instantaneously.'
                : 'تیم پشتیبانی و کنسیرژ اختصاصی آماده ثبت و پیگیری سریع درخواست‌های تعویض و تغییر آدرس است.'}
            </Typography>
            <Button
              component={RouterLink}
              to={CUSTOMER_ROUTES.CONTACT}
              variant="contained"
              data-testid="shipping-returns-contact-cta"
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
              {isEn ? 'Contact VIP Concierge' : 'ارتباط با کنسیرژ و پشتیبانی'}
            </Button>
          </Box>
        </Container>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerShippingReturns;
