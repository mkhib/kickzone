import { render, screen, fireEvent, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdminsHeaderbar } from './AdminsHeaderbar';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

const mockSetAdmin = vi.fn();
const mockLogoutAdmin = vi.fn();
const mockUseAdminsAuthContext = vi.fn();
const mockToggleTheme = vi.fn();

vi.mock('@kickzone-workspace/admins-contexts', () => ({
  useAdminsAuthContext: () => mockUseAdminsAuthContext(),
}));

// Any LL key not listed explicitly falls back to a function returning its key path,
// so tests do not break each time the headerbar uses a new translation key.
const { withKeyFallback } = vi.hoisted(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const withKeyFallback = (base: any, path = ''): any =>
    new Proxy(typeof base === 'function' ? base : () => path, {
      get: (_t, k) =>
        typeof k === 'symbol'
          ? undefined
          : withKeyFallback(
              base && typeof base === 'object' ? base[k] : undefined,
              path ? `${path}.${String(k)}` : String(k)
            ),
    });
  return { withKeyFallback };
});
vi.mock('@kickzone-workspace/shared-i18n', () => ({
  SITE_NAME: 'SAINTBALA',
  useI18nContext: () => ({
    LL: withKeyFallback({
      appNames: { siteName: () => 'SAINTBALA' },
      navigation: {
        adminPanel: () => 'Admin Panel',
        products: () => 'Products',
        sellers: () => 'Sellers',
        customers: () => 'Customers',
        translations: () => 'Translations',
        languageSettings: () => 'Language Settings',
      },
      button: {
        addNewProduct: () => 'Add New Product',
        logout: () => 'Logout',
        login: () => 'Login',
      },
      orders: { allSellerOrders: () => 'All Seller Orders' },
      currency: { title: () => 'Currency' },
    }),
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
      pathname: '/products',
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

describe('AdminsHeaderbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseAdminsAuthContext.mockReturnValue({
      admin: {
        id: '1',
        name: 'Test Admin',
        email: 'admin@test.com',
        role: 'ADMIN',
      },
      setAdmin: mockSetAdmin,
      logoutAdmin: mockLogoutAdmin,
    });
  });

  // jsdom has no matchMedia; stub it so useMediaQuery sees a mobile (true) or desktop (false) viewport.
  const originalMatchMedia = window.matchMedia;
  const setViewportMatches = (matches: boolean) => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  };

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('should render successfully with the site wordmark linking home', () => {
    renderWithProviders(<AdminsHeaderbar />);
    const wordmark = screen.getByRole('link', { name: 'SAINTBALA' });
    expect(wordmark).toBeInTheDocument();
    expect(wordmark).toHaveAttribute('href', '/');
  });

  it('should display admin name when logged in', () => {
    renderWithProviders(<AdminsHeaderbar />);
    expect(screen.getByText('Test Admin')).toBeInTheDocument();
  });

  it('should show logout button when logged in', () => {
    renderWithProviders(<AdminsHeaderbar />);
    fireEvent.click(screen.getByText('Test Admin'));
    expect(screen.getByRole('menuitem', { name: 'Logout' })).toBeInTheDocument();
  });

  it('should show the main navigation links when logged in', () => {
    renderWithProviders(<AdminsHeaderbar />);
    const nav = screen.getByRole('navigation', { name: 'home.nav.mainAria' });
    expect(within(nav).getByRole('link', { name: 'Products' })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'All Seller Orders' })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'Sellers' })).toBeInTheDocument();
  });

  it('should call logout functions when logout button is clicked', () => {
    renderWithProviders(<AdminsHeaderbar />);
    fireEvent.click(screen.getByText('Test Admin'));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Logout' }));

    expect(mockLogoutAdmin).toHaveBeenCalled();
    expect(mockSetAdmin).toHaveBeenCalledWith(null);
  });

  it('should toggle drawer when menu button is clicked', () => {
    renderWithProviders(<AdminsHeaderbar />);
    // Customers is a drawer-only item, so it is absent until the drawer opens
    expect(screen.queryByText('Customers')).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('menu'));
    expect(screen.getByText('Customers')).toBeInTheDocument();
  });

  it('should show drawer navigation items', () => {
    renderWithProviders(<AdminsHeaderbar />);
    fireEvent.click(screen.getByLabelText('menu'));

    // Drawer-only items
    expect(screen.getByText('Add New Product')).toBeInTheDocument();
    expect(screen.getByText('Customers')).toBeInTheDocument();
    expect(screen.getByText('Currency')).toBeInTheDocument();
    expect(screen.getByText('Translations')).toBeInTheDocument();
    // Items shown both in the main nav and in the drawer
    expect(screen.getAllByText('Products')).toHaveLength(2);
    expect(screen.getAllByText('All Seller Orders')).toHaveLength(2);
    expect(screen.getAllByText('Sellers')).toHaveLength(2);
  });

  it('should show a single login button when admin is not logged in', () => {
    mockUseAdminsAuthContext.mockReturnValue({
      admin: null,
      setAdmin: mockSetAdmin,
      logoutAdmin: mockLogoutAdmin,
    });

    renderWithProviders(<AdminsHeaderbar />);

    expect(screen.getAllByText('Login')).toHaveLength(1);
    expect(screen.queryByRole('menuitem', { name: 'Logout' })).not.toBeInTheDocument();
    expect(screen.queryByText('Test Admin')).not.toBeInTheDocument();
  });

  it('should handle mobile viewport behavior', () => {
    setViewportMatches(true);
    renderWithProviders(<AdminsHeaderbar />);

    expect(screen.getByRole('link', { name: 'SAINTBALA' })).toBeInTheDocument();
    // Centre navigation is hidden on narrow screens
    expect(screen.queryByRole('navigation', { name: 'home.nav.mainAria' })).not.toBeInTheDocument();
    // Logged-in admin still has items not covered by the tabbar, so the menu button stays
    expect(screen.getByLabelText('menu')).toBeInTheDocument();
  });

  it('should hide the menu button on mobile when every item is handled by the tabbar', () => {
    setViewportMatches(true);
    mockUseAdminsAuthContext.mockReturnValue({
      admin: null,
      setAdmin: mockSetAdmin,
      logoutAdmin: mockLogoutAdmin,
    });
    // Logged out, the only visible item is login, which the default tabbar handles
    renderWithProviders(<AdminsHeaderbar />);
    expect(screen.queryByLabelText('menu')).not.toBeInTheDocument();
  });

  it('should handle desktop viewport behavior', () => {
    setViewportMatches(false);
    renderWithProviders(<AdminsHeaderbar />);

    expect(screen.getByRole('link', { name: 'SAINTBALA' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'home.nav.mainAria' })).toBeInTheDocument();
    // The menu button is always available on desktop
    expect(screen.getByLabelText('menu')).toBeInTheDocument();
  });
});
