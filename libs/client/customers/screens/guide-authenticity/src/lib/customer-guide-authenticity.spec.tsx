import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import CustomerGuideAuthenticity from './customer-guide-authenticity';

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

describe('CustomerGuideAuthenticity Screen', () => {
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

  it('renders all authenticity inspection steps and guarantee banner in English', () => {
    mockLocale = 'en';
    renderWithProviders(<CustomerGuideAuthenticity />);

    expect(screen.getAllByText('SAINTBALA').length).toBeGreaterThan(0);
    expect(
      screen.getByText('100% Verified Authenticity Guarantee')
    ).toBeInTheDocument();

    // Checkpoints
    expect(
      screen.getByText('Authorized Provenance & Sourcing')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Macro Material & Stitching Inspection')
    ).toBeInTheDocument();
    expect(
      screen.getByText('SKU, Wash-Tag & Packaging Audit')
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Tamper-Evident.*Security Seal/i).length
    ).toBeGreaterThan(0);

    // Guarantee banner
    expect(
      screen.getByTestId('authenticity-guarantee-banner')
    ).toBeInTheDocument();

    const shopCta = screen.getByTestId('authenticity-shop-cta');
    expect(shopCta).toBeInTheDocument();
    expect(shopCta).toHaveStyle({ minHeight: '44px' });
  });

  it('renders all authenticity sections in Persian (fa) with uppercase English brand wordmark', () => {
    mockLocale = 'fa';
    renderWithProviders(<CustomerGuideAuthenticity />);

    expect(screen.getAllByText('SAINTBALA').length).toBeGreaterThan(0);
    expect(
      screen.getByText('اصالت مبدا و زنجیره تامین معتبر')
    ).toBeInTheDocument();
    expect(
      screen.getByText('بررسی موشکافانه الیاف، دوخت و متریال')
    ).toBeInTheDocument();
    expect(
      screen.getByText('بررسی شناسنامه، برچسب شستشو و بسته‌بندی')
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/پلمپ امنیتی اختصاصی و ضدجعل/i).length
    ).toBeGreaterThan(0);
  });
});
