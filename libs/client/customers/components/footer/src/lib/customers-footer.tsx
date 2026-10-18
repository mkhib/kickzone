import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  useI18nContext,
  useLanguageContext,
  SITE_NAME,
} from '@kickzone-workspace/shared-i18n';
import {
  CUSTOMER_ROUTES,
  getCustomerBrandRoute,
  getCustomerShopRoute,
} from '@kickzone-workspace/customers-routes';

const linkStyle: React.CSSProperties = {
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '14px',
  fontFamily: 'var(--font-sans)',
  transition: 'color 0.2s ease',
};

export interface CustomersFooterProps {
  variant?: 'default' | 'glass';
}

export function CustomersFooter({
  variant = 'default',
}: CustomersFooterProps = {}) {
  const { LL } = useI18nContext();
  const { currentLocale } = useLanguageContext();
  const isEn = currentLocale === 'en';
  const year =
    currentLocale === 'fa'
      ? new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
          year: 'numeric',
        }).format(new Date())
      : String(new Date().getFullYear());

  if (variant === 'glass') {
    const glassLinkStyle: React.CSSProperties = {
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '14px',
      fontFamily: 'var(--font-sans)',
      transition: 'color 0.2s ease',
    };

    return (
      <Box
        component="footer"
        sx={{
          width: '100%',
          bgcolor: '#000000',
          background: '#000000',
          borderTop: '1px solid #1a1a1e',
          pt: { xs: 4, sm: 6, md: 8 },
          pb: { xs: 3, sm: 4.5, md: 6 },
          px: { xs: 2, sm: 3, md: 4 },
          color: '#ffffff',
          position: 'relative',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <Box
          sx={{
            maxWidth: 1376,
            mx: 'auto',
          }}
        >
          {/* Main Footer Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                md: '4fr repeat(4, 2fr)',
              },
              gap: { xs: '24px 20px', md: '40px' },
              pb: { xs: 3, md: 7 },
              borderBottom: '1px solid #1a1a1e',
            }}
          >
            {/* Brand Block */}
            <Box
              sx={{
                gridColumn: {
                  xs: 'span 2',
                  md: 'span 1',
                },
                pr: { md: 4 },
              }}
            >
              <Typography
                component={RouterLink}
                to="/"
                className="font-saintbala"
                sx={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: '28px',
                  letterSpacing: '0.34em',
                  color: '#ffffff',
                  textDecoration: 'none',
                  mb: 1.5,
                  lineHeight: 1,
                  direction: 'ltr',
                }}
              >
                {SITE_NAME}
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#ffffff',
                  lineHeight: 1.7,
                  maxWidth: 320,
                  mt: 1.5,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {LL.home.footer.tagline()}
              </Typography>
            </Box>

            {/* Shop Column */}
            <Box>
              <Typography
                component="h4"
                sx={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#ffffff',
                  mb: 2,
                  textTransform: isEn ? 'uppercase' : 'none',
                  letterSpacing: isEn ? '0.05em' : 'normal',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {LL.home.footer.store()}
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  p: 0,
                  m: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <li>
                  <RouterLink to={CUSTOMER_ROUTES.HOME} style={glassLinkStyle}>
                    {LL.navigation.home()}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to={getCustomerShopRoute({ category: 'women' })}
                    style={glassLinkStyle}
                  >
                    {LL.home.footer.women()}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to={getCustomerShopRoute({ category: 'men' })}
                    style={glassLinkStyle}
                  >
                    {LL.home.footer.men()}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to={getCustomerShopRoute({ category: 'hoodies' })}
                    style={glassLinkStyle}
                  >
                    {LL.home.footer.hoodies()}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to={getCustomerShopRoute({ category: 'pants' })}
                    style={glassLinkStyle}
                  >
                    {LL.home.footer.pants()}
                  </RouterLink>
                </li>
              </Box>
            </Box>

            {/* Brands Column */}
            <Box>
              <Typography
                component="h4"
                sx={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#ffffff',
                  mb: 2,
                  textTransform: isEn ? 'uppercase' : 'none',
                  letterSpacing: isEn ? '0.05em' : 'normal',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {LL.home.footer.brands()}
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  p: 0,
                  m: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <li>
                  <RouterLink to={getCustomerBrandRoute('nike')} style={glassLinkStyle}>
                    Nike
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to={getCustomerBrandRoute('jordan')} style={glassLinkStyle}>
                    Jordan
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to={getCustomerBrandRoute('adidas')} style={glassLinkStyle}>
                    Adidas
                  </RouterLink>
                </li>
              </Box>
            </Box>

            {/* Help/Guide Column */}
            <Box>
              <Typography
                component="h4"
                sx={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#ffffff',
                  mb: 2,
                  textTransform: isEn ? 'uppercase' : 'none',
                  letterSpacing: isEn ? '0.05em' : 'normal',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {LL.home.footer.guide()}
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  p: 0,
                  m: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <li>
                  <RouterLink to="/guide/authenticity" style={glassLinkStyle}>
                    {LL.home.footer.authenticity()}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/guide/size-guide" style={glassLinkStyle}>
                    {LL.home.footer.sizeGuide()}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/guide/payment" style={glassLinkStyle}>
                    {LL.home.footer.payment()}
                  </RouterLink>
                </li>
              </Box>
            </Box>

            {/* Account Column */}
            <Box>
              <Typography
                component="h4"
                sx={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#ffffff',
                  mb: 2,
                  textTransform: isEn ? 'uppercase' : 'none',
                  letterSpacing: isEn ? '0.05em' : 'normal',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {LL.home.footer.account()}
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  p: 0,
                  m: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <li>
                  <RouterLink to="/login" style={glassLinkStyle}>
                    {LL.home.footer.loginWithEmail()}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/cart" style={glassLinkStyle}>
                    {LL.home.footer.cart()}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/favorites" style={glassLinkStyle}>
                    {LL.home.footer.favorites()}
                  </RouterLink>
                </li>
              </Box>
            </Box>
          </Box>

          {/* Bottom Row */}
          <Box
            sx={{
              pt: { xs: 1, md: 4 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: { xs: 'center', md: 'left' },
              gap: 1.5,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '11px', md: '13px' },
                color: '#ffffff',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {LL.home.footer.copyright({ year })}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '11px', md: '13px' },
                color: '#ffffff',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {LL.home.footer.paymentOnline()}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#000000',
        background: '#000000',
        borderTop: '1px solid #1a1a1e',
        pt: { xs: 6, md: 8 },
        color: '#ffffff',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          margin: '0 auto',
          px: { xs: 2.5, sm: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              lg: '1.6fr repeat(4, 1fr)',
            },
            gap: { xs: 4, md: 4.5 },
            mb: { xs: 6, md: 8 },
          }}
        >
          <Box
            sx={{
              gridColumn: {
                xs: 'span 2',
                sm: 'span 3',
                lg: 'span 1',
              },
              pr: { lg: 4 },
            }}
          >
            <Typography
              component={RouterLink}
              to="/"
              className="font-saintbala"
              sx={{
                display: 'inline-block',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '28px',
                letterSpacing: '0.34em',
                color: '#ffffff',
                textDecoration: 'none',
                mb: 1.5,
                lineHeight: 1,
                direction: 'ltr',
              }}
            >
              {SITE_NAME}
            </Typography>
            <Typography
              sx={{
                fontSize: '14.5px',
                color: '#ffffff',
                lineHeight: 1.8,
                maxWidth: 340,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {LL.home.footer.tagline()}
            </Typography>
          </Box>

          <Box>
            <Typography
              component="h4"
              sx={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#ffffff',
                fontFamily: 'var(--font-sans)',
                mb: 2,
              }}
            >
              {LL.home.footer.store()}
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                p: 0,
                m: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.25,
              }}
            >
              <li>
                <RouterLink to={CUSTOMER_ROUTES.HOME} style={linkStyle}>
                  {LL.navigation.home()}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to={getCustomerShopRoute({ category: 'women' })}
                  style={linkStyle}
                >
                  {LL.home.footer.women()}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to={getCustomerShopRoute({ category: 'men' })}
                  style={linkStyle}
                >
                  {LL.home.footer.men()}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to={getCustomerShopRoute({ category: 'hoodies' })}
                  style={linkStyle}
                >
                  {LL.home.footer.hoodies()}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to={getCustomerShopRoute({ category: 'pants' })}
                  style={linkStyle}
                >
                  {LL.home.footer.pants()}
                </RouterLink>
              </li>
            </Box>
          </Box>

          <Box>
            <Typography
              component="h4"
              sx={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#ffffff',
                mb: 2,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {LL.home.footer.brands()}
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                p: 0,
                m: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.25,
              }}
            >
              <li>
                <RouterLink to={getCustomerBrandRoute('nike')} style={linkStyle}>
                  Nike
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to={getCustomerBrandRoute('jordan')}
                  style={linkStyle}
                >
                  Jordan
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to={getCustomerBrandRoute('adidas')}
                  style={linkStyle}
                >
                  Adidas
                </RouterLink>
              </li>
            </Box>
          </Box>

          <Box>
            <Typography
              component="h4"
              sx={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#ffffff',
                mb: 2,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {LL.home.footer.guide()}
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                p: 0,
                m: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.25,
              }}
            >
              <li>
                <RouterLink to="/guide/authenticity" style={linkStyle}>
                  {LL.home.footer.authenticity()}
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/guide/size-guide" style={linkStyle}>
                  {LL.home.footer.sizeGuide()}
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/guide/payment" style={linkStyle}>
                  {LL.home.footer.payment()}
                </RouterLink>
              </li>
            </Box>
          </Box>

          <Box>
            <Typography
              component="h4"
              sx={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#ffffff',
                mb: 2,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {LL.home.footer.account()}
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                p: 0,
                m: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.25,
              }}
            >
              <li>
                <RouterLink to="/login" style={linkStyle}>
                  {LL.home.footer.loginWithEmail()}
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/cart" style={linkStyle}>
                  {LL.home.footer.cart()}
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/favorites" style={linkStyle}>
                  {LL.home.footer.favorites()}
                </RouterLink>
              </li>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: '1px solid #1a1a1e',
            py: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: '13px',
              color: '#ffffff',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {LL.home.footer.copyright({ year })}
          </Typography>
          <Typography
            sx={{
              fontSize: '13px',
              color: '#ffffff',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {LL.home.footer.paymentOnline()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CustomersFooter;
