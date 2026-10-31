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

const mockUseProductById = vi.fn();
vi.mock('@kickzone-workspace/products-hook', () => ({
  useProductById: (id: number) => mockUseProductById(id),
}));

vi.mock('@kickzone-workspace/customers-cart-hook', () => ({
  useCustomersCartService: () => ({ addItem: vi.fn() }),
  useWishlistSync: vi.fn(),
}));

vi.mock('@kickzone-workspace/customers-product-card', () => ({
  CustomersProductCard: ({
    product,
    onToggleFavorite,
  }: {
    product: { id: number; name: string };
    onToggleFavorite?: (id: number) => void;
  }) => (
    <div data-testid={`shared-product-card-${product.id}`}>
      <a href={`/products/${product.id}`}>{product.name}</a>
      <button
        data-testid={`favorite-toggle-${product.id}`}
        onClick={() => onToggleFavorite?.(product.id)}
      />
    </div>
  ),
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

describe('CustomerFavorites - shared product card', () => {
  beforeEach(() => {
    mockLocale = 'en';
    mockUseProductById.mockImplementation((id: number) => ({
      product: { id, name: 'Structured Technical Trench' },
      loading: false,
      error: null,
    }));
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

  it('renders one shared product card per saved item, loading each product by id', () => {
    useWishlistStore.getState().addItem(mockItem);
    useWishlistStore.getState().addItem({ ...mockItem, id: 43, name: 'Runner' });
    renderWithProviders(<CustomerFavorites />);
    expect(screen.getByTestId('shared-product-card-42')).toBeInTheDocument();
    expect(screen.getByTestId('shared-product-card-43')).toBeInTheDocument();
    expect(mockUseProductById).toHaveBeenCalledWith(42);
    expect(mockUseProductById).toHaveBeenCalledWith(43);
    expect(screen.queryByText('$890')).not.toBeInTheDocument();
  });

  it('renders nothing for an item whose product is not loaded', () => {
    mockUseProductById.mockReturnValue({ product: undefined, loading: true, error: null });
    useWishlistStore.getState().addItem(mockItem);
    renderWithProviders(<CustomerFavorites />);
    expect(screen.queryByTestId('shared-product-card-42')).not.toBeInTheDocument();
  });

  it('removes the item when the shared card heart is toggled', () => {
    useWishlistStore.getState().addItem(mockItem);
    renderWithProviders(<CustomerFavorites />);
    fireEvent.click(screen.getByTestId('favorite-toggle-42'));
    expect(useWishlistStore.getState().items).toHaveLength(0);
  });
});
