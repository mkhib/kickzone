import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CustomersLayout } from './CustomersLayout';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('@kickzone-workspace/customers-auth-context', () => ({
  useCustomersAuth: () => ({
    user: null,
    logout: vi.fn(),
  }),
}));

vi.mock('@kickzone-workspace/customer-cart-store', () => ({
  useCartItemCount: () => 0,
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      appNames: { siteName: () => 'KickZone' },
      navigation: {
        home: () => 'Home',
        shoppingCart: () => 'Cart',
        profile: () => 'Profile',
      },
      orders: { myOrders: () => 'My Orders' },
      button: { login: () => 'Login', logout: () => 'Logout' },
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
      toggleTheme: vi.fn(),
    }),
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

const theme = createTheme();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('CustomersLayout', () => {
  beforeEach(() => {
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
  });

  it('renders children, headerbar, tabbar, and footer', () => {
    renderWithProviders(
      <CustomersLayout>
        <div data-testid="page-content">Hello Customer Content</div>
      </CustomersLayout>
    );

    expect(screen.getByTestId('page-content')).toBeInTheDocument();
    expect(screen.getAllByText('KickZone').length).toBeGreaterThan(0);
    expect(screen.getByLabelText('Mobile Bottom Tabbar')).toBeInTheDocument();
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Cart').length).toBeGreaterThan(0);
  });
});
