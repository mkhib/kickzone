import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import CustomerGuidePayment from './customer-guide-payment';

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

const theme = createTheme({ palette: { mode: 'dark' } });

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('CustomerGuidePayment Screen', () => {
  beforeEach(() => {
    mockLocale = 'en';
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it('renders all payment security pillars, FAQs, and CTAs in English', () => {
    mockLocale = 'en';
    renderWithProviders(<CustomerGuidePayment />);

    expect(screen.getAllByText('SAINTBALA').length).toBeGreaterThan(0);
    expect(
      screen.getByText('Payment & Gateway Security Guide')
    ).toBeInTheDocument();

    // Pillars
    expect(
      screen.getByText('Supported Payment Methods')
    ).toBeInTheDocument();
    expect(
      screen.getByText('256-Bit SSL & Gateway Security')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Order Settlement Verification')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Automated Refund Safeguards')
    ).toBeInTheDocument();

    // FAQs
    expect(screen.getByTestId('payment-faqs')).toBeInTheDocument();
    expect(
      screen.getByText(/What happens if money was deducted from my account/i)
    ).toBeInTheDocument();

    // Recovery/Navigation CTA
    const shopCta = screen.getByTestId('payment-shop-cta');
    expect(shopCta).toBeInTheDocument();
    expect(shopCta).toHaveStyle({ minHeight: '44px' });

    const ordersCta = screen.getByTestId('payment-orders-cta');
    expect(ordersCta).toBeInTheDocument();
    expect(ordersCta).toHaveStyle({ minHeight: '44px' });
  });

  it('renders all payment guide sections in Persian (fa) with uppercase English brand wordmark', () => {
    mockLocale = 'fa';
    renderWithProviders(<CustomerGuidePayment />);

    expect(screen.getAllByText('SAINTBALA').length).toBeGreaterThan(0);
    expect(
      screen.getByText('روش‌های پرداخت پشتیبانی‌شده')
    ).toBeInTheDocument();
    expect(
      screen.getByText('امنیت درگاه و رمزنگاری ۲۵۶ بیتی')
    ).toBeInTheDocument();
    expect(
      screen.getByText('راستی‌آزمایی و تسویه آنی سفارش')
    ).toBeInTheDocument();
    expect(
      screen.getByText('تضمین بازگشت وجه خودکار بانکی')
    ).toBeInTheDocument();
    expect(
      screen.getByText('پرسش‌های متداول و راهنمای رفع خطای پرداخت')
    ).toBeInTheDocument();
  });
});
