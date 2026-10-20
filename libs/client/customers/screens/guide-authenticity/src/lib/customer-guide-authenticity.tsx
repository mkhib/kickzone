import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';
import SearchIcon from '@mui/icons-material/Search';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import {
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';

interface VerificationStep {
  id: string;
  number: string;
  titleEn: string;
  titleFa: string;
  descEn: string;
  descFa: string;
  checkpointEn: string;
  checkpointFa: string;
  icon: React.ReactNode;
}

const VERIFICATION_STEPS: VerificationStep[] = [
  {
    id: 'sourcing',
    number: '01',
    titleEn: 'Authorized Provenance & Sourcing',
    titleFa: 'اصالت مبدا و زنجیره تامین معتبر',
    descEn:
      'Every garment and sneaker is acquired strictly from authorized European boutiques, official flagship fashion houses, and certified global distribution networks with full chain-of-custody documentation.',
    descFa:
      'تمامی پوشاک و اسنیکرها منحصراً از بوتیک‌های تاییدشده اروپایی، نمایندگی‌های رسمی برندها و شبکه‌های توزیع بین‌المللی همراه با اسناد کامل ترخیص و زنجیره تامین تامین می‌شوند.',
    checkpointEn: 'Verified Invoices & Boutique Origin',
    checkpointFa: 'تطبیق فاکتور رسمی و مبدا تاییدشده',
    icon: <SecurityIcon sx={{ fontSize: 28 }} />,
  },
  {
    id: 'macro-inspection',
    number: '02',
    titleEn: 'Macro Material & Stitching Inspection',
    titleFa: 'بررسی موشکافانه الیاف، دوخت و متریال',
    descEn:
      'Our authentication masters analyze stitch density, thread tensile strength, leather grain depth, seam symmetry, and premium textile blend ratios against rigorous factory master specifications.',
    descFa:
      'کارشناسان راستی‌آزمایی ما تراکم دوخت، مقاومت نخ، بافت چرم طبیعی، تقارن درزها و ترکیب الیاف لوکس را با مشخصات مرجع کارخانه‌ای هر برند بررسی و مقایسه می‌کنند.',
    checkpointEn: 'Precision Fiber & Seam Density Audit',
    checkpointFa: 'سنجش تراکم الیاف و ظرافت دوخت',
    icon: <SearchIcon sx={{ fontSize: 28 }} />,
  },
  {
    id: 'tags-packaging',
    number: '03',
    titleEn: 'SKU, Wash-Tag & Packaging Audit',
    titleFa: 'بررسی شناسنامه، برچسب شستشو و بسته‌بندی',
    descEn:
      'We verify font weights, micro-printed security fibers, serialized barcodes, care label stitch-in methodologies, and authentic accessories including dust bags and presentation boxes.',
    descFa:
      'فونت‌ها، الیاف امنیتی میکروسکوپی، بارکد سریال، نحوه دوخت اتیکت شستشو و بسته‌بندی اورجینال شامل جعبه و کاور محافظ به‌طور کامل تطبیق داده می‌شوند.',
    checkpointEn: 'Serial Number & Typography Match',
    checkpointFa: 'تطبیق بارکد سریال و فونت اختصاصی',
    icon: <QrCode2Icon sx={{ fontSize: 28 }} />,
  },
  {
    id: 'security-seal',
    number: '04',
    titleEn: 'Tamper-Evident SAINTBALA Security Seal',
    titleFa: 'پلمپ امنیتی اختصاصی و ضدجعل SAINTBALA',
    descEn:
      'Upon passing our multi-point authentication, every piece receives an individualized, tamper-evident SAINTBALA security seal. This serialized tag guarantees permanent authenticity and vault tracking.',
    descFa:
      'پس از تایید کامل، قطعه مورد نظر به پلمپ امنیتی اختصاصی و ضدجعل SAINTBALA با شماره سریال ثبت‌شده متصل می‌گردد که ضامن اصالت دائمی و ثبت در بایگانی مرکزی است.',
    checkpointEn: 'Serialized Tamper-Evident Seal Attached',
    checkpointFa: 'پلمپ سریال‌دار اختصاصی متصل شد',
    icon: <VerifiedIcon sx={{ fontSize: 28 }} />,
  },
];

export function CustomerGuideAuthenticity() {
  const { currentLocale } = useLanguageContext();
  const isEn = currentLocale === 'en';
  const isRTL = currentLocale === 'fa';

  usePageTitle(() =>
    isEn
      ? 'Authenticity Verification Guide — SAINTBALA'
      : 'راهنمای اصالت و راستی‌آزمایی کالا — SAINTBALA'
  );

  return (
    <CustomersLayout>
      <Box
        data-testid="customer-guide-authenticity-screen"
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
              maxWidth: 780,
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
              <bdi>SAINTBALA</bdi> {isEn ? 'VERIFICATION PROTOCOL' : 'پروتکل اصالت‌سنجی'}
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
                '100% Verified Authenticity Guarantee'
              ) : (
                <span>
                  ضمانت ۱۰۰٪ اصالت و راستی‌آزمایی در <bdi>SAINTBALA</bdi>
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
                'Every garment, sneaker, and accessory presented on SAINTBALA undergoes exhaustive physical examination by our seasoned master authenticators. Zero counterfeits. Absolute peace of mind.'
              ) : (
                <span>
                  تمام پوشاک، کفش‌ها و اکسسوری‌های موجود در پلتفرم{' '}
                  <bdi>SAINTBALA</bdi> پیش از ارسال، تحت چند مرحله بازرسی دقیق
                  توسط کارشناسان تخصصی راستی‌آزمایی قرار می‌گیرند.
                </span>
              )}
            </Typography>
          </Box>

          {/* Inspection Checkpoints Multi-Step Breakdown */}
          <Box sx={{ mb: { xs: 8, md: 12 } }}>
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
                ? 'The 4-Tier SAINTBALA Authentication Process'
                : 'مراحل ۴ گانه راستی‌آزمایی کالا'}
            </Typography>

            <Grid container spacing={3}>
              {VERIFICATION_STEPS.map((step) => {
                const title = isEn ? step.titleEn : step.titleFa;
                const desc = isEn ? step.descEn : step.descFa;
                const checkpoint = isEn ? step.checkpointEn : step.checkpointFa;

                return (
                  <Grid size={{ xs: 12, md: 6 }} key={step.id}>
                    <Paper
                      elevation={0}
                      data-testid={`authenticity-step-${step.id}`}
                      sx={{
                        p: { xs: 3, sm: 4 },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '20px',
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(13, 14, 20, 0.72)'
                            : 'rgba(255, 255, 255, 0.85)',
                        border: (theme) =>
                          theme.palette.mode === 'dark'
                            ? '1px solid rgba(201, 167, 116, 0.22)'
                            : '1px solid rgba(138, 106, 61, 0.18)',
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
                      {/* Step Header */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mb: 2.5,
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
                          }}
                        >
                          {step.icon}
                        </Box>

                        <Typography
                          sx={{
                            fontFamily: '"Manrope", sans-serif',
                            fontSize: '1.4rem',
                            fontWeight: 800,
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(201, 167, 116, 0.5)'
                                : 'rgba(138, 106, 61, 0.4)',
                          }}
                        >
                          {step.number}
                        </Typography>
                      </Box>

                      {/* Step Title */}
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
                        {step.id === 'security-seal' && isRTL ? (
                          <span>
                            پلمپ امنیتی اختصاصی و ضدجعل <bdi>SAINTBALA</bdi>
                          </span>
                        ) : step.id === 'security-seal' && isEn ? (
                          <span>
                            Tamper-Evident <bdi>SAINTBALA</bdi> Security Seal
                          </span>
                        ) : (
                          title
                        )}
                      </Typography>

                      {/* Step Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#d2d2d7'
                              : '#525252',
                          lineHeight: 1.7,
                          mb: 3,
                          flex: 1,
                        }}
                      >
                        {desc}
                      </Typography>

                      {/* Visual Figure / Checkpoint Badge */}
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.2,
                          bgcolor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.04)'
                              : 'rgba(0, 0, 0, 0.03)',
                          border: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '1px dashed rgba(201, 167, 116, 0.3)'
                              : '1px dashed rgba(138, 106, 61, 0.3)',
                        }}
                      >
                        <CheckCircleOutlineIcon
                          sx={{
                            color: '#10b981',
                            fontSize: 20,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                            fontWeight: 600,
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#ffffff'
                                : '#1d1d1f',
                          }}
                        >
                          {checkpoint}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* 100% Authenticity Guarantee Banner */}
          <Paper
            elevation={0}
            data-testid="authenticity-guarantee-banner"
            sx={{
              p: { xs: 4, sm: 6 },
              borderRadius: '24px',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(201, 167, 116, 0.15) 0%, rgba(11, 11, 12, 0.95) 100%)'
                  : 'linear-gradient(135deg, rgba(246, 245, 242, 0.95) 0%, rgba(251, 250, 248, 1) 100%)',
              border: '2px solid rgba(201, 167, 116, 0.4)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
              mb: { xs: 6, md: 8 },
              textAlign: 'center',
            }}
          >
            <Chip
              icon={<VerifiedIcon style={{ color: '#000000' }} />}
              label={
                isEn
                  ? '100% MONEY-BACK LIFETIME GUARANTEE'
                  : 'ضمانت مادام‌العمر ۱۰۰٪ بازگشت وجه'
              }
              sx={{
                bgcolor: '#c9a774',
                color: '#000000',
                fontWeight: 800,
                fontSize: '0.8rem',
                letterSpacing: '0.05em',
                px: 1.5,
                py: 2,
                borderRadius: '9999px',
                mb: 3,
              }}
            />

            <Typography
              component="h2"
              variant="h4"
              sx={{
                fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                fontWeight: 800,
                fontSize: { xs: '1.5rem', sm: '2rem' },
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                mb: 2,
              }}
            >
              {isEn ? (
                'Our Word. Our Vault. Our Guarantee.'
              ) : (
                <span>
                  تعهد قطعی اصالت کالا در <bdi>SAINTBALA</bdi>
                </span>
              )}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#d2d2d7' : '#525252',
                maxWidth: 680,
                mx: 'auto',
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              {isEn ? (
                'If an item purchased through SAINTBALA is ever proven unauthentic by an authorized brand flagship, we offer an immediate 100% refund, covering all logistics costs. No caveats, no friction.'
              ) : (
                <span>
                  در صورت اثبات هرگونه مغایرت اصالت کالای خریداری‌شده از سوی
                  نمایندگی رسمی برند، وجه پرداختی شما بدون قید و شرط و با تقبل
                  کامل هزینه‌های بازگشت مسترد خواهد شد.
                </span>
              )}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                justifyContent: 'center',
              }}
            >
              <Button
                component={RouterLink}
                to={CUSTOMER_ROUTES.SHOP}
                variant="contained"
                data-testid="authenticity-shop-cta"
                startIcon={<ShoppingBagOutlinedIcon />}
                sx={{
                  minHeight: '44px',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#c9a774' : '#1d1d1f',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
                  fontWeight: 700,
                  px: 4,
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  '&:hover': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#d8bc8c' : '#2e2e2c',
                  },
                }}
              >
                {isEn ? 'Shop Authenticated Pieces' : 'مشاهده محصولات تاییدشده'}
              </Button>

              <Button
                component={RouterLink}
                to={CUSTOMER_ROUTES.CONTACT}
                variant="outlined"
                data-testid="authenticity-contact-cta"
                startIcon={<SupportAgentOutlinedIcon />}
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
                  fontSize: '0.95rem',
                  '&:hover': {
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#c9a774' : '#8a6a3d',
                  },
                }}
              >
                {isEn ? 'Contact Concierge' : 'ارتباط با پشتیبانی'}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerGuideAuthenticity;
