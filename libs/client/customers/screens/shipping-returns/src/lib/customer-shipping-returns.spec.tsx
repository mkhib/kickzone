import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import CustomerShippingReturns from './customer-shipping-returns';

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

describe('CustomerShippingReturns Screen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocale = 'en';
  });

  const renderComponent = () => {
    const theme = createTheme({ palette: { mode: 'dark' } });
    return render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CustomerShippingReturns />
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  it('renders shipping methods and security seal requirement in English', () => {
    renderComponent();

    expect(
      screen.getByText(/Shipping & Return Protocol/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText('VIP Concierge Hand-Delivery')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Express Armored Air Cargo')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Private Showroom & Vault Pickup')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Crucial: Tamper-Evident Security Seal Requirement/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The 7-Day Size Exchange Workflow/i)
    ).toBeInTheDocument();
  });

  it('renders in Persian (fa) with proper RTL branding and Persian texts', () => {
    mockLocale = 'fa';
    renderComponent();

    expect(
      screen.getByText(/رویه ارسال اختصاصی و ضمانت بازگشت/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText('ارسال اختصاصی اکسپرس و تشریفات (تهران)')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/نکته بسیار مهم: حفظ پلمپ امنیتی ضدجعل کالا/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/مراحل گام‌به‌گام تعویض سایز و مرجوعی ۷ روزه/i)
    ).toBeInTheDocument();
  });

  it('has working CTA button to contact concierge', () => {
    renderComponent();

    const contactCta = screen.getByTestId('shipping-returns-contact-cta');
    expect(contactCta).toBeInTheDocument();
    expect(contactCta.getAttribute('href')).toBe('/contact');
  });
});
