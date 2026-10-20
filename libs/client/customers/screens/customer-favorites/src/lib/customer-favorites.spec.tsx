import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import CustomerFavorites from './customer-favorites';
import {
  useWishlistStore,
  WishlistItem,
} from '@kickzone-workspace/customer-wishlist-store';

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

const mockItem: WishlistItem = {
  id: 42,
  name: 'Structured Technical Trench',
  brand: 'SAINTBALA',
  price: 890,
  productCode: 'SB-TR-042',
  primaryImage: 'https://images.example.com/trench.jpg',
};

describe('CustomerFavorites Screen', () => {
  beforeEach(() => {
    mockLocale = 'en';
    useWishlistStore.setState({
      items: [],
      isLoading: false,
      error: null,
      lastUpdated: null,
    });

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

  it('renders refined empty state when wishlist has zero saved items', () => {
    renderWithProviders(<CustomerFavorites />);

    expect(screen.getAllByText('SAINTBALA').length).toBeGreaterThan(0);
    expect(screen.getByTestId('favorites-empty-state')).toBeInTheDocument();
    expect(screen.getByText('Your Curation is Empty')).toBeInTheDocument();

    const cta = screen.getByTestId('favorites-shop-cta');
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveTextContent('Explore Catalog');
    expect(cta).toHaveAttribute('href', '/shop');
    expect(cta).toHaveStyle({ minHeight: '44px' });
  });

  it('renders localized empty state in Persian (fa) with English brand wordmark', () => {
    mockLocale = 'fa';
    renderWithProviders(<CustomerFavorites />);

    expect(screen.getAllByText('SAINTBALA').length).toBeGreaterThan(0);
    expect(screen.getByText('لیست علاقه‌مندی‌های شما خالی است')).toBeInTheDocument();
    expect(screen.getByText('مشاهده محصولات')).toBeInTheDocument();
  });

  it('renders saved product cards when populated and allows removing an item', () => {
    useWishlistStore.getState().addItem(mockItem);

    renderWithProviders(<CustomerFavorites />);

    expect(screen.getByText('Structured Technical Trench')).toBeInTheDocument();
    expect(screen.getByText('$890')).toBeInTheDocument();

    const viewBtn = screen.getByTestId('view-favorite-btn-42');
    expect(viewBtn).toBeInTheDocument();
    expect(viewBtn).toHaveAttribute('href', '/products/42');
    expect(viewBtn).toHaveStyle({ minHeight: '44px' });

    const removeBtn = screen.getByTestId('remove-favorite-btn-42');
    fireEvent.click(removeBtn);

    expect(useWishlistStore.getState().items).toHaveLength(0);
  });

  it('allows clearing all favorites at once', () => {
    useWishlistStore.getState().addItem(mockItem);
    useWishlistStore.getState().addItem({ ...mockItem, id: 43, name: 'Runner' });

    renderWithProviders(<CustomerFavorites />);

    expect(screen.getByTestId('clear-favorites-btn')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('clear-favorites-btn'));

    expect(useWishlistStore.getState().items).toHaveLength(0);
  });
});
