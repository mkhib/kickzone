import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import CustomerNotFound from './customer-not-found';

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

describe('CustomerNotFound Screen', () => {
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

  it('renders the 404 page in English with brand wordmark and catalog navigation links', () => {
    mockLocale = 'en';
    renderWithProviders(<CustomerNotFound />);

    expect(screen.getAllByText('SAINTBALA').length).toBeGreaterThan(0);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();

    const catalogBtn = screen.getByTestId('not-found-catalog-btn');
    expect(catalogBtn).toBeInTheDocument();
    expect(catalogBtn).toHaveTextContent('Explore Catalog');
    expect(catalogBtn).toHaveAttribute('href', '/shop');
    expect(catalogBtn).toHaveStyle({ minHeight: '44px' });

    const homeBtn = screen.getByTestId('not-found-home-btn');
    expect(homeBtn).toBeInTheDocument();
    expect(homeBtn).toHaveTextContent('Return to Home');
    expect(homeBtn).toHaveAttribute('href', '/');
    expect(homeBtn).toHaveStyle({ minHeight: '44px' });
  });

  it('renders the 404 page in Persian (fa) with brand wordmark in English', () => {
    mockLocale = 'fa';
    renderWithProviders(<CustomerNotFound />);

    // Brand must be SAINTBALA, not transliterated
    expect(screen.getAllByText('SAINTBALA').length).toBeGreaterThan(0);
    expect(screen.getByText('صفحه مورد نظر یافت نشد')).toBeInTheDocument();
    expect(screen.getByText('مشاهده محصولات')).toBeInTheDocument();
    expect(screen.getByText('بازگشت به صفحه اصلی')).toBeInTheDocument();
  });
});
