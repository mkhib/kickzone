import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import {
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';

export function CustomerNotFound() {
  const { currentLocale } = useLanguageContext();
  const isEn = currentLocale === 'en';

  usePageTitle(() => (isEn ? 'Page Not Found — SAINTBALA' : 'صفحه یافت نشد — SAINTBALA'));

  const content = {
    badge: isEn ? 'ERROR 404' : 'خطای ۴۰۴',
    title: isEn ? 'Page Not Found' : 'صفحه مورد نظر یافت نشد',
    description: isEn
      ? 'The piece, runway archive, or collection you are looking for does not exist or may have been relocated.'
      : 'مجموعه، آرشیو یا صفحه درخواستی شما در دسترس نیست یا نشانی آن تغییر یافته است.',
    exploreCatalog: isEn ? 'Explore Catalog' : 'مشاهده محصولات',
    returnHome: isEn ? 'Return to Home' : 'بازگشت به صفحه اصلی',
  };

  return (
    <CustomersLayout>
      <Box
        data-testid="customer-not-found-screen"
        sx={{
          minHeight: '68vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 8, md: 12 },
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              p: { xs: 3.5, sm: 6 },
              borderRadius: '24px',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(13, 14, 20, 0.72)'
                  : 'rgba(255, 255, 255, 0.78)',
              border: (theme) =>
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.10)'
                  : '1px solid rgba(0, 0, 0, 0.08)',
              backdropFilter: 'blur(36px) saturate(190%)',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 26px 58px -10px rgba(0, 0, 0, 0.7)'
                  : '0 18px 45px -10px rgba(0, 0, 0, 0.06)',
            }}
          >
            {/* Wordmark */}
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
                mb: 2,
              }}
            >
              <bdi>SAINTBALA</bdi>
            </Typography>

            {/* Giant 404 Stylized Display */}
            <Typography
              component="div"
              sx={{
                fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                fontSize: { xs: '5.5rem', sm: '7.5rem' },
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(180deg, #ffffff 0%, rgba(201, 167, 116, 0.5) 100%)'
                    : 'linear-gradient(180deg, #1d1d1f 0%, rgba(138, 106, 61, 0.6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                userSelect: 'none',
              }}
            >
              404
            </Typography>

            {/* Title */}
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                fontWeight: 700,
                fontSize: { xs: '1.4rem', sm: '1.75rem' },
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                mb: 1.5,
              }}
            >
              {content.title}
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#a8a8ae' : '#5c5c61',
                maxWidth: '440px',
                lineHeight: 1.7,
                mb: 4,
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              {content.description}
            </Typography>

            {/* Action buttons with minHeight: 44px */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Button
                component={RouterLink}
                to={CUSTOMER_ROUTES.SHOP}
                variant="contained"
                data-testid="not-found-catalog-btn"
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
                  fontSize: '0.92rem',
                  letterSpacing: '0.02em',
                  '&:hover': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#d8bc8c' : '#2e2e2c',
                  },
                }}
              >
                {content.exploreCatalog}
              </Button>

              <Button
                component={RouterLink}
                to={CUSTOMER_ROUTES.HOME}
                variant="outlined"
                data-testid="not-found-home-btn"
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
                  fontSize: '0.92rem',
                  '&:hover': {
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#c9a774' : '#8a6a3d',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(201, 167, 116, 0.08)'
                        : 'rgba(138, 106, 61, 0.06)',
                  },
                }}
              >
                {content.returnHome}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerNotFound;
