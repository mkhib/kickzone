import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import SecurityIcon from '@mui/icons-material/Security';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { ShetabBadgeSvg, ShaparakBadgeSvg, SslBadgeSvg } from './TrustBadgeIcons';
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

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    ariaLabel: 'SAINTBALA Instagram',
    href: 'https://instagram.com/saintbala',
    icon: <InstagramIcon sx={{ fontSize: 20 }} />,
  },
  {
    name: 'Telegram',
    ariaLabel: 'SAINTBALA Telegram',
    href: 'https://t.me/saintbala_official',
    icon: <TelegramIcon sx={{ fontSize: 20 }} />,
  },
  {
    name: 'WhatsApp',
    ariaLabel: 'SAINTBALA Concierge WhatsApp',
    href: 'https://wa.me/989120008888',
    icon: <WhatsAppIcon sx={{ fontSize: 20 }} />,
  },
  {
    name: 'Twitter / X',
    ariaLabel: 'SAINTBALA Twitter / X',
    href: 'https://twitter.com/saintbala',
    icon: <TwitterIcon sx={{ fontSize: 20 }} />,
  },
];

export function CustomersFooter({
  variant = 'default',
}: CustomersFooterProps = {}) {
  const { LL } = useI18nContext();
  const { currentLocale } = useLanguageContext();
  const isEn = currentLocale === 'en';
  const isRTL = currentLocale === 'fa';
  const year =
    currentLocale === 'fa'
      ? new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
          year: 'numeric',
        }).format(new Date())
      : String(new Date().getFullYear());

  const brandWordmark = isRTL ? (
    <bdi>{SITE_NAME}</bdi>
  ) : (
    SITE_NAME
  );

  // Trust Badges Component
  const renderTrustBadges = () => (
    <Box
      data-testid="footer-trust-badges"
      sx={{
        py: 3.5,
        borderTop: '1px solid #1a1a1e',
        borderBottom: '1px solid #1a1a1e',
        my: { xs: 4, md: 5 },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: { xs: 2, sm: 2.5, md: 3 },
          alignItems: 'stretch',
        }}
      >
        {/* Badge 1: Shetab Bank Card Network */}
        <Box
          data-testid="badge-shetab"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: { xs: 1.5, sm: 2 },
            borderRadius: '14px',
            bgcolor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            transition: 'border-color 0.2s ease',
            '&:hover': {
              borderColor: '#c9a774',
            },
          }}
        >
          <ShetabBadgeSvg size={42} />
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.8125rem',
                color: '#ffffff',
                lineHeight: 1.2,
                mb: 0.25,
              }}
            >
              {isEn ? 'Shetab Bank Cards' : 'شبکه کارت‌های شتاب'}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.6875rem',
                color: 'rgba(255, 255, 255, 0.55)',
              }}
            >
              {isEn ? 'All Banking Cards Supported' : 'پشتیبانی از تمامی بانک‌ها'}
            </Typography>
          </Box>
        </Box>

        {/* Badge 2: Shaparak Certified Electronic Gateway */}
        <Box
          data-testid="badge-shaparak"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: { xs: 1.5, sm: 2 },
            borderRadius: '14px',
            bgcolor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            transition: 'border-color 0.2s ease',
            '&:hover': {
              borderColor: '#c9a774',
            },
          }}
        >
          <ShaparakBadgeSvg size={42} />
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.8125rem',
                color: '#ffffff',
                lineHeight: 1.2,
                mb: 0.25,
              }}
            >
              {isEn ? 'Shaparak Gateway' : 'درگاه رسمی شاپرک'}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.6875rem',
                color: 'rgba(255, 255, 255, 0.55)',
              }}
            >
              {isEn ? 'Central Bank Certified' : 'تاییدیه بانک مرکزی و شاپرک'}
            </Typography>
          </Box>
        </Box>

        {/* Badge 3: 256-Bit SSL Encryption */}
        <Box
          data-testid="badge-ssl"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: { xs: 1.5, sm: 2 },
            borderRadius: '14px',
            bgcolor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            transition: 'border-color 0.2s ease',
            '&:hover': {
              borderColor: '#c9a774',
            },
          }}
        >
          <SslBadgeSvg size={42} />
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.8125rem',
                color: '#ffffff',
                lineHeight: 1.2,
                mb: 0.25,
              }}
            >
              {isEn ? '256-Bit SSL Security' : 'رمزنگاری ۲۵۶ بیتی SSL'}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.6875rem',
                color: 'rgba(255, 255, 255, 0.55)',
              }}
            >
              {isEn ? 'Encrypted Checkout Pipeline' : 'پرداخت کاملاً ایزوله و امن'}
            </Typography>
          </Box>
        </Box>

        {/* Badge 4: 100% Authenticity Guarantee */}
        <Box
          data-testid="badge-authenticity"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: { xs: 1.5, sm: 2 },
            borderRadius: '14px',
            bgcolor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            transition: 'border-color 0.2s ease',
            '&:hover': {
              borderColor: '#c9a774',
            },
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: '10px',
              bgcolor: 'rgba(201, 167, 116, 0.12)',
              color: '#c9a774',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <VerifiedIcon sx={{ fontSize: 24 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.8125rem',
                color: '#ffffff',
                lineHeight: 1.2,
                mb: 0.25,
              }}
            >
              {isEn ? '100% Authentic Guarantee' : 'ضمانت قطعی اصالت'}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.6875rem',
                color: 'rgba(255, 255, 255, 0.55)',
              }}
            >
              {isEn ? 'Tamper-Evident Security Seal' : 'همراه با پلمپ امنیتی سریال‌دار'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  // Direct Contact & Social Component for Brand Column
  const renderContactAndSocials = () => (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
      {/* Phone */}
      <Box
        component="a"
        href="tel:+982191008888"
        data-testid="footer-contact-phone"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.25,
          color: 'rgba(255, 255, 255, 0.85)',
          textDecoration: 'none',
          fontSize: '13px',
          transition: 'color 0.2s ease',
          '&:hover': { color: '#c9a774' },
        }}
      >
        <PhoneInTalkOutlinedIcon sx={{ fontSize: 17, color: '#c9a774' }} />
        <span>
          <bdi>+98 21 9100 8888</bdi>
        </span>
      </Box>

      {/* Email */}
      <Box
        component="a"
        href="mailto:concierge@saintbala.com"
        data-testid="footer-contact-email"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.25,
          color: 'rgba(255, 255, 255, 0.85)',
          textDecoration: 'none',
          fontSize: '13px',
          transition: 'color 0.2s ease',
          '&:hover': { color: '#c9a774' },
        }}
      >
        <EmailOutlinedIcon sx={{ fontSize: 17, color: '#c9a774' }} />
        <span>
          <bdi>concierge@saintbala.com</bdi>
        </span>
      </Box>

      {/* Working Hours */}
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.25,
          color: 'rgba(255, 255, 255, 0.65)',
          fontSize: '12.5px',
        }}
      >
        <AccessTimeOutlinedIcon sx={{ fontSize: 17, color: '#c9a774' }} />
        <span>
          {isEn
            ? 'Sat – Thu: 10:00 – 21:00 (IRDT)'
            : 'شنبه تا پنج‌شنبه: ۱۰:۰۰ الی ۲۱:۰۰'}
        </span>
      </Box>

      {/* Social Links Row */}
      <Box
        data-testid="footer-social-links"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mt: 1.5,
        }}
      >
        {SOCIAL_LINKS.map((soc) => (
          <Box
            key={soc.name}
            component="a"
            href={soc.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={soc.ariaLabel}
            sx={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255, 255, 255, 0.75)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'rgba(201, 167, 116, 0.15)',
                borderColor: '#c9a774',
                color: '#c9a774',
                transform: 'translateY(-2px)',
              },
            }}
          >
            {soc.icon}
          </Box>
        ))}
      </Box>
    </Box>
  );

  const glassLinkStyle: React.CSSProperties = {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '14px',
    fontFamily: 'var(--font-sans)',
    transition: 'color 0.2s ease',
  };

  const currentLinkStyle = variant === 'glass' ? glassLinkStyle : linkStyle;

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        bgcolor: '#000000',
        background: '#000000',
        borderTop: '1px solid #1a1a1e',
        pt: { xs: 5, sm: 6, md: 8 },
        pb: { xs: 3, sm: 4.5, md: 6 },
        px: { xs: 2.5, sm: 4, md: 6 },
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
              sm: 'repeat(2, 1fr)',
              md: '3.5fr repeat(4, 2fr)',
            },
            gap: { xs: '32px 20px', md: '36px' },
            pb: { xs: 3, md: 5 },
          }}
        >
          {/* Brand Block */}
          <Box
            sx={{
              gridColumn: {
                xs: 'span 2',
                md: 'span 1',
              },
              pr: { md: 3 },
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
              {brandWordmark}
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.7,
                maxWidth: 320,
                mt: 1,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {LL.home.footer.tagline()}
            </Typography>

            {/* Concierge Details & Social Links */}
            {renderContactAndSocials()}
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
                gap: 1.25,
              }}
            >
              <li>
                <RouterLink to={CUSTOMER_ROUTES.HOME} style={currentLinkStyle}>
                  {LL.navigation.home()}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to={getCustomerShopRoute({ category: 'women' })}
                  style={currentLinkStyle}
                >
                  {LL.home.footer.women()}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to={getCustomerShopRoute({ category: 'men' })}
                  style={currentLinkStyle}
                >
                  {LL.home.footer.men()}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to={getCustomerShopRoute({ category: 'hoodies' })}
                  style={currentLinkStyle}
                >
                  {LL.home.footer.hoodies()}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to={getCustomerShopRoute({ category: 'pants' })}
                  style={currentLinkStyle}
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
                gap: 1.25,
              }}
            >
              <li>
                <RouterLink to={getCustomerBrandRoute('nike')} style={currentLinkStyle}>
                  Nike
                </RouterLink>
              </li>
              <li>
                <RouterLink to={getCustomerBrandRoute('jordan')} style={currentLinkStyle}>
                  Jordan
                </RouterLink>
              </li>
              <li>
                <RouterLink to={getCustomerBrandRoute('adidas')} style={currentLinkStyle}>
                  Adidas
                </RouterLink>
              </li>
            </Box>
          </Box>

          {/* Help & Policies Column (Updated with all policies & contact) */}
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
              {isEn ? 'Client Services' : 'خدمات و قوانین'}
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
                <RouterLink
                  to={CUSTOMER_ROUTES.CONTACT}
                  style={currentLinkStyle}
                  data-testid="footer-link-contact"
                >
                  {isEn ? 'Contact Concierge' : 'تماس با پشتیبانی'}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to={CUSTOMER_ROUTES.GUIDE_AUTHENTICITY}
                  style={currentLinkStyle}
                  data-testid="footer-link-authenticity"
                >
                  {LL.home.footer.authenticity()}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to={CUSTOMER_ROUTES.SHIPPING_RETURNS}
                  style={currentLinkStyle}
                  data-testid="footer-link-shipping-returns"
                >
                  {isEn ? 'Shipping & Returns' : 'ارسال و بازگشت کالا'}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to={CUSTOMER_ROUTES.GUIDE_PAYMENT}
                  style={currentLinkStyle}
                  data-testid="footer-link-payment"
                >
                  {LL.home.footer.payment()}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to={CUSTOMER_ROUTES.PRIVACY_POLICY}
                  style={currentLinkStyle}
                  data-testid="footer-link-privacy-policy"
                >
                  {isEn ? 'Privacy Policy' : 'سیاست حفظ حریم خصوصی'}
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
                gap: 1.25,
              }}
            >
              <li>
                <RouterLink to="/login" style={currentLinkStyle}>
                  {LL.home.footer.loginWithEmail()}
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/cart" style={currentLinkStyle}>
                  {LL.home.footer.cart()}
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/favorites" style={currentLinkStyle}>
                  {LL.home.footer.favorites()}
                </RouterLink>
              </li>
            </Box>
          </Box>
        </Box>

        {/* Payment & Security Trust Badges Bar */}
        {renderTrustBadges()}

        {/* Bottom Row */}
        <Box
          sx={{
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
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {LL.home.footer.copyright({ year })}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '11px', md: '13px' },
              color: 'rgba(255, 255, 255, 0.7)',
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
