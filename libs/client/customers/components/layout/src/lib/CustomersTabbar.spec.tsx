import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CustomersTabbar } from './CustomersTabbar';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

const mockUseCustomersAuth = vi.fn();
const mockUseCartItemCount = vi.fn();
const mockNavigate = vi.fn();
let mockPathname = '/home';

vi.mock('@kickzone-workspace/customers-auth-context', () => ({
  useCustomersAuth: () => mockUseCustomersAuth(),
}));

vi.mock('@kickzone-workspace/customer-cart-store', () => ({
  useCartItemCount: () => mockUseCartItemCount(),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      navigation: {
        home: () => 'Home',
        shoppingCart: () => 'Cart',
        profile: () => 'Profile',
        orders: () => 'Orders',
      },
      orders: {
        myOrders: () => 'My Orders',
      },
      button: {
        login: () => 'Login',
      },
    },
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...actual,
    useLocation: () => ({
      pathname: mockPathname,
    }),
    useNavigate: () => mockNavigate,
  };
});

const theme = createTheme();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('CustomersTabbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPathname = '/home';
    mockUseCartItemCount.mockReturnValue(3);

    // Set mobile viewport by default
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes('max-width: 599.95px') || query.includes('(max-width:599.95px)'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it('renders all customer tabs when user is authenticated on mobile', () => {
    mockUseCustomersAuth.mockReturnValue({
      user: { id: '1', name: 'John Doe', email: 'john@example.com' },
      logout: vi.fn(),
    });

    renderWithProviders(<CustomersTabbar />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('My Orders')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument(); // Cart badge
  });

  it('renders guest tabs (Home, Cart, Login) when user is not authenticated', () => {
    mockUseCustomersAuth.mockReturnValue({
      user: null,
      logout: vi.fn(),
    });

    renderWithProviders(<CustomersTabbar />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('My Orders')).not.toBeInTheDocument();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  it('filters tabs based on handledInTabbarIds prop', () => {
    mockUseCustomersAuth.mockReturnValue({
      user: { id: '1', name: 'John Doe' },
      logout: vi.fn(),
    });

    renderWithProviders(
      <CustomersTabbar handledInTabbarIds={['home', 'cart']} />
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.queryByText('My Orders')).not.toBeInTheDocument();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  it('navigates when tab is clicked', () => {
    mockUseCustomersAuth.mockReturnValue({
      user: { id: '1', name: 'John Doe' },
      logout: vi.fn(),
    });

    renderWithProviders(<CustomersTabbar />);

    fireEvent.click(screen.getByText('Cart'));
    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });

  it('does not render on desktop viewport', () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false, // Desktop
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    mockUseCustomersAuth.mockReturnValue({
      user: null,
      logout: vi.fn(),
    });

    const { container } = renderWithProviders(<CustomersTabbar />);
    expect(container.firstChild).toBeNull();
  });
});
