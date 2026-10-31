import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Headerbar } from './CustomersHeaderbar';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

const mockUseCustomersAuth = vi.fn();
const mockUseCartItemCount = vi.fn();
const mockLogout = vi.fn();
const mockToggleTheme = vi.fn();

vi.mock('@kickzone-workspace/customers-auth-context', () => ({
  useCustomersAuth: () => mockUseCustomersAuth(),
}));

vi.mock('@kickzone-workspace/customer-cart-store', () => ({
  useCartItemCount: () => mockUseCartItemCount(),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  SITE_NAME: 'SAINTBALA',
  useLanguageContext: () => ({
    currentLocale: 'en',
    availableLocales: [{ code: 'en', name: 'English', nativeName: 'English' }],
    changeLanguage: vi.fn(),
  }),
  useI18nContext: () => ({
    LL: {
      home: {
        nav: {
          mainAria: () => 'Main navigation',
          women: () => 'Women',
          men: () => 'Men',
        },
        searchPlaceholder: () => 'Search...',
      },
      appNames: {
        siteName: () => 'KickZone',
      },
      navigation: {
        home: () => 'Home',
        shoppingCart: () => 'Cart',
        profile: () => 'Profile',
      },
      orders: {
        myOrders: () => 'My Orders',
      },
      button: {
        login: () => 'Login',
        logout: () => 'Logout',
      },
    },
  }),
}));

vi.mock('@kickzone-workspace/shared-ui-store', () => ({
  useUIStore: (
    selector: (state: {
      theme: { mode: string };
      toggleTheme: () => void;
    }) => unknown
  ) =>
    selector({
      theme: { mode: 'light' },
      toggleTheme: mockToggleTheme,
    }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...actual,
    useLocation: () => ({
      pathname: '/home',
    }),
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

const setupMobileViewport = () => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches:
      query.includes('max-width: 599.95px') ||
      query.includes('(max-width:599.95px)'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

const setupDesktopViewport = () => {
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

describe('CustomersHeaderbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCartItemCount.mockReturnValue(2);
  });

  describe('Desktop viewport', () => {
    beforeEach(() => {
      setupDesktopViewport();
    });

    it('always shows the menu button on desktop', () => {
      mockUseCustomersAuth.mockReturnValue({
        user: null,
        logout: mockLogout,
      });

      renderWithProviders(<Headerbar />);

      expect(screen.getByLabelText('menu')).toBeInTheDocument();
      expect(screen.getAllByText('KickZone').length).toBeGreaterThan(0);
    });

    it('shows desktop login button when not logged in', () => {
      mockUseCustomersAuth.mockReturnValue({
        user: null,
        logout: mockLogout,
      });

      renderWithProviders(<Headerbar />);

      expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
    });

    it('shows user name and menu when logged in on desktop', () => {
      mockUseCustomersAuth.mockReturnValue({
        user: { id: '1', name: 'Alice Smith', email: 'alice@example.com' },
        logout: mockLogout,
      });

      renderWithProviders(<Headerbar />);

      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    });
  });

  describe('Mobile viewport', () => {
    beforeEach(() => {
      setupMobileViewport();
    });

    it('hides header menu button on mobile when all items are handled in the tabbar', () => {
      // Guest where every visible item is handled in the tabbar. Favorites is a drawer-only
      // item for guests (not in the default guest tabbar), so it must be listed here too.
      mockUseCustomersAuth.mockReturnValue({
        user: null,
        logout: mockLogout,
      });

      renderWithProviders(
        <Headerbar handledInTabbarIds={['home', 'cart', 'favorites', 'login']} />
      );

      // Menu button should NOT be rendered!
      expect(screen.queryByLabelText('menu')).not.toBeInTheDocument();
    });

    it('shows header menu button on mobile when unhandled items exist', () => {
      // User is logged in: Logout is not in default tabbar
      mockUseCustomersAuth.mockReturnValue({
        user: { id: '1', name: 'Bob Smith', email: 'bob@example.com' },
        logout: mockLogout,
      });

      renderWithProviders(<Headerbar />);

      // Menu button SHOULD be rendered
      expect(screen.getByLabelText('menu')).toBeInTheDocument();

      // Click menu button to open drawer
      fireEvent.click(screen.getByLabelText('menu'));

      // Unhandled items should be shown in drawer
      expect(screen.getByText('Logout')).toBeInTheDocument();
      expect(screen.getAllByText('Bob Smith').length).toBeGreaterThan(0);

      // Tabs already in bottom tabbar should not be duplicated in mobile drawer
      expect(screen.queryByText('My Orders')).not.toBeInTheDocument();
      expect(screen.queryByText('Language Settings')).not.toBeInTheDocument();
    });

    it('shows header menu button on mobile when custom drawerItems are passed', () => {
      mockUseCustomersAuth.mockReturnValue({
        user: null,
        logout: mockLogout,
      });

      renderWithProviders(
        <Headerbar
          handledInTabbarIds={['home', 'cart', 'login']}
          drawerItems={<div data-testid="custom-drawer-item">Help & Support</div>}
        />
      );

      // Even though all default nav items are handled, custom drawerItems is unhandled!
      expect(screen.getByLabelText('menu')).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('menu'));
      expect(screen.getByTestId('custom-drawer-item')).toBeInTheDocument();
      expect(screen.getByText('Help & Support')).toBeInTheDocument();
    });

    it('shows unhandled items in drawer when tabbar only handles subset', () => {
      mockUseCustomersAuth.mockReturnValue({
        user: { id: '1', name: 'Bob Smith', email: 'bob@example.com' },
        logout: mockLogout,
      });

      // Tabbar only handles home and cart
      renderWithProviders(
        <Headerbar handledInTabbarIds={['home', 'cart']} />
      );

      expect(screen.getByLabelText('menu')).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('menu'));

      // Orders and Profile were not handled in tabbar, so they must be in header menu!
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('My Orders')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('calls logout when logout button in drawer is clicked', () => {
      mockUseCustomersAuth.mockReturnValue({
        user: { id: '1', name: 'Bob Smith', email: 'bob@example.com' },
        logout: mockLogout,
      });

      renderWithProviders(<Headerbar />);

      fireEvent.click(screen.getByLabelText('menu'));
      fireEvent.click(screen.getByText('Logout'));

      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });
});
