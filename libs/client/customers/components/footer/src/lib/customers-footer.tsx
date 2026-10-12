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
  color: 'var(--ink-2)',
  textDecoration: 'none',
  fontSize: '14px',
  fontFamily: 'var(--font-sans)',
};

export function CustomersFooter() {
  const { LL } = useI18nContext();
  const { currentLocale } = useLanguageContext();
  const year =
    currentLocale === 'fa'
      ? new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
          year: 'numeric',
        }).format(new Date())
      : String(new Date().getFullYear());

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'var(--paper)',
        borderTop: '1px solid var(--hair)',
        pt: { xs: 6, md: 8 },
        color: 'var(--ink)',
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
                color: 'var(--ink)',
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
                color: 'var(--ink-2)',
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
                color: 'var(--ink)',
                mb: 2,
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
                color: 'var(--ink)',
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
                color: 'var(--ink)',
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
                color: 'var(--ink)',
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
            borderTop: '1px solid var(--hair)',
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
              color: 'var(--ink-3)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {LL.home.footer.copyright({ year })}
          </Typography>
          <Typography
            sx={{
              fontSize: '13px',
              color: 'var(--ink-3)',
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
