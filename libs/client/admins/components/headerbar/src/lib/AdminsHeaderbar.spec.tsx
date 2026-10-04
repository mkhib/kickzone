import { render, screen, fireEvent } from '@testing-library/react';
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

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
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

  it('should render successfully', () => {
    renderWithProviders(<AdminsHeaderbar />);
    expect(screen.getByText('SAINTBALA Admin Panel')).toBeInTheDocument();
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

  it('should show navigation buttons when logged in', () => {
    renderWithProviders(<AdminsHeaderbar />);
    expect(screen.getAllByText('Add New Product').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Products').length).toBeGreaterThan(0);
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
    fireEvent.click(screen.getByLabelText('menu'));
    expect(screen.getByText('Sellers')).toBeInTheDocument();
  });

  it('should show drawer navigation items', () => {
    renderWithProviders(<AdminsHeaderbar />);
    fireEvent.click(screen.getByLabelText('menu'));

    expect(screen.getAllByText('Add New Product').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Products').length).toBeGreaterThan(0);
    expect(screen.getByText('Sellers')).toBeInTheDocument();
    expect(screen.getByText('Customers')).toBeInTheDocument();
    expect(screen.getByText('All Seller Orders')).toBeInTheDocument();
    expect(screen.getByText('Currency')).toBeInTheDocument();
  });

  it('should show login button when admin is not logged in', () => {
    mockUseAdminsAuthContext.mockReturnValue({
      admin: null,
      setAdmin: mockSetAdmin,
      logoutAdmin: mockLogoutAdmin,
    });

    renderWithProviders(<AdminsHeaderbar />);

    expect(screen.getAllByText('Login')).toHaveLength(2);
    expect(screen.queryByRole('menuitem', { name: 'Logout' })).not.toBeInTheDocument();
    expect(screen.queryByText('Test Admin')).not.toBeInTheDocument();
  });

  it('should handle mobile viewport behavior', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    });
    window.dispatchEvent(new Event('resize'));

    renderWithProviders(<AdminsHeaderbar />);
    expect(screen.getByText('SAINTBALA')).toBeInTheDocument();
  });

  it('should handle desktop viewport behavior', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });
    window.dispatchEvent(new Event('resize'));

    renderWithProviders(<AdminsHeaderbar />);
    expect(screen.getByText('SAINTBALA Admin Panel')).toBeInTheDocument();
  });
});
