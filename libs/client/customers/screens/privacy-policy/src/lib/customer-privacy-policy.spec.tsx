import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import CustomerPrivacyPolicy from './customer-privacy-policy';

let mockLocale = 'en';

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  SITE_NAME: 'SAINTBALA',
  useLanguageContext: () => ({ currentLocale: mockLocale }),
  usePageTitle: vi.fn(),
  useI18nContext: () => ({
    LL: {
      appNames: { siteName: () => 'SAINTBALA' },
      home: {
        nav: { mainAria: () => 'Navigation', women: () => 'Women', men: () => 'Men' },
        footer: {
          tagline: () => 'Authentic luxury sportswear',
          store: () => 'Shop',
          women: () => 'Women',
          men: () => 'Men',
          hoodies: () => 'Hoodies',
          pants: () => 'Pants',
          brands: () => 'Brands',
          guide: () => 'Help',
          authenticity: () => 'Authenticity',
          sizeGuide: () => 'Size Guide',
          payment: () => 'Payment',
          account: () => 'Account',
          loginWithEmail: () => 'Login',
          cart: () => 'Cart',
          favorites: () => 'Favorites',
          copyright: () => '© SAINTBALA',
          paymentOnline: () => 'Online payment',
        },
        searchPlaceholder: () => 'Search...',
      },
      navigation: {
        home: () => 'Home',
        shoppingCart: () => 'Cart',
        profile: () => 'Profile',
        menu: () => 'Menu',
      },
      orders: { myOrders: () => 'My Orders' },
      button: { login: () => 'Login', logout: () => 'Logout' },
      products: { searchPlaceholder: () => 'Search...' },
    },
  }),
}));

vi.mock('@kickzone-workspace/customers-auth-context', () => ({
  useCustomersAuth: () => ({
    user: null,
    logout: vi.fn(),
  }),
}));

vi.mock('@kickzone-workspace/customer-cart-store', () => ({
  useCartItemCount: () => 0,
}));

vi.mock('@kickzone-workspace/shared-ui-store', () => ({
  useUIStore: (selector: (s: { theme: { mode: string } }) => unknown) =>
    selector({ theme: { mode: 'dark' } }),
}));

vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbar: () => ({
    open: false,
    message: '',
    severity: 'info',
    progress: 0,
    handleClose: vi.fn(),
  }),
}));

describe('CustomerPrivacyPolicy Screen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocale = 'en';
  });

  const renderComponent = () => {
    const theme = createTheme({ palette: { mode: 'dark' } });
    return render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CustomerPrivacyPolicy />
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  it('renders privacy pillars, zero card data retention, and encryption info in English', () => {
    renderComponent();

    expect(
      screen.getByText(/Privacy & Data Governance/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Zero Card Data Retention & Banking Gateway Isolation/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The Four Pillars of Privacy/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Zero Third-Party Commercial Data Sharing/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Comprehensive Client Rights & Permanent Deletion/i)
    ).toBeInTheDocument();
  });

  it('renders in Persian (fa) with proper RTL branding and Persian texts', () => {
    mockLocale = 'fa';
    renderComponent();

    expect(
      screen.getByText(/سیاست رازداری و حفاظت از داده‌های/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/عدم ذخیره‌سازی اطلاعات بانکی و ایزولاسیون کامل درگاه/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/اصول چهارگانه رازداری و حریم خصوصی/i)
    ).toBeInTheDocument();
  });

  it('has working CTA to contact privacy officer', () => {
    renderComponent();

    const contactCta = screen.getByTestId('privacy-contact-cta');
    expect(contactCta).toBeInTheDocument();
    expect(contactCta.getAttribute('href')).toBe('/contact');
  });
});
