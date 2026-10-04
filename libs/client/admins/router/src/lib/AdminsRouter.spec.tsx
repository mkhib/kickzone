import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AdminsRouter } from './AdminsRouter';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock all the imported components
vi.mock('@kickzone-workspace/admin-product-editor', () => ({
  AdminProductEditor: () => (
    <div data-testid="admin-product-editor">Admin Product Editor</div>
  ),
}));

vi.mock('@kickzone-workspace/admin-products', () => ({
  AdminProducts: () => <div data-testid="admin-products">Admin Products</div>,
}));

vi.mock('@kickzone-workspace/admins-login', () => ({
  AdminsLogin: () => <div data-testid="admins-login">Admins Login</div>,
}));

vi.mock('@kickzone-workspace/admins-unauthorized-screen', () => ({
  AdminsUnauthorizedScreen: () => (
    <div data-testid="admins-unauthorized">Unauthorized Screen</div>
  ),
}));

vi.mock('@kickzone-workspace/admin-seller-management', () => ({
  SellerManagement: () => (
    <div data-testid="seller-management">Seller Management</div>
  ),
}));

vi.mock('@kickzone-workspace/admin-customer-management', () => ({
  AdminCustomerManagement: () => (
    <div data-testid="admin-customer-management">Customer Management</div>
  ),
}));

vi.mock('@kickzone-workspace/admin-seller-orders', () => ({
  AdminSellerOrders: () => (
    <div data-testid="admin-seller-orders">Admin Seller Orders</div>
  ),
}));

vi.mock('@kickzone-workspace/currency-management', () => ({
  CurrencyManagement: () => (
    <div data-testid="currency-management">Currency Management</div>
  ),
}));

vi.mock('@kickzone-workspace/translation-management', () => ({
  AdminTranslationManagement: () => (
    <div data-testid="translation-management">Translation Management</div>
  ),
}));

vi.mock('@kickzone-workspace/language-components', () => ({
  LanguageComponents: () => (
    <div data-testid="language-components">Language Components</div>
  ),
}));

vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

// Mock the private route component
vi.mock('@kickzone-workspace/private-route', () => ({
  createPrivateRoute: (
    acceptedRoles: string[],
    user: { role?: string | null } | null | undefined
  ) => {
    return function MockPrivateRoute() {
      if (!user) {
        return <div data-testid="navigate-to-login">Navigate to Login</div>;
      }
      if (acceptedRoles && !acceptedRoles.includes(user.role)) {
        return (
          <div data-testid="navigate-to-unauthorized">
            Navigate to Unauthorized
          </div>
        );
      }
      return (
        <div data-testid="private-route-outlet">
          <div data-testid="outlet-content">Outlet Content</div>
        </div>
      );
    };
  },
}));

// Mock the admins auth context
const mockUseAdminsAuthContext = vi.fn();

vi.mock('@kickzone-workspace/admins-contexts', () => ({
  useAdminsAuthContext: () => mockUseAdminsAuthContext(),
}));

// Mock react-router-dom
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => children,
    Outlet: () => <div data-testid="outlet-content">Outlet Content</div>,
  };
});

const renderWithRouter = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AdminsRouter />
    </MemoryRouter>
  );
};

describe('AdminsRouter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when admin is not authenticated', () => {
    beforeEach(() => {
      mockUseAdminsAuthContext.mockReturnValue({
        admin: null,
      });
    });

    it('should render login screen for /login route', () => {
      renderWithRouter(['/login']);
      expect(screen.getByTestId('admins-login')).toBeInTheDocument();
    });

    it('should render unauthorized screen for /unauthorized route', () => {
      renderWithRouter(['/unauthorized']);
      expect(screen.getByTestId('admins-unauthorized')).toBeInTheDocument();
    });

    it('should redirect to login for protected routes when not authenticated', () => {
      renderWithRouter(['/']);
      expect(screen.getByTestId('navigate-to-login')).toBeInTheDocument();
    });

    it('should redirect to login for /products route when not authenticated', () => {
      renderWithRouter(['/products']);
      expect(screen.getByTestId('navigate-to-login')).toBeInTheDocument();
    });

    it('should redirect to login for /products/new route when not authenticated', () => {
      renderWithRouter(['/products/new']);
      expect(screen.getByTestId('navigate-to-login')).toBeInTheDocument();
    });

    it('should redirect to login for /products/edit/123 route when not authenticated', () => {
      renderWithRouter(['/products/edit/123']);
      expect(screen.getByTestId('navigate-to-login')).toBeInTheDocument();
    });

    it('should redirect to login for /sellers route when not authenticated', () => {
      renderWithRouter(['/sellers']);
      expect(screen.getByTestId('navigate-to-login')).toBeInTheDocument();
    });

    it('should redirect to login for /customers route when not authenticated', () => {
      renderWithRouter(['/customers']);
      expect(screen.getByTestId('navigate-to-login')).toBeInTheDocument();
    });

    it('should redirect to login for /orders, /currency, and /translations', () => {
      ['/orders', '/currency', '/translations'].forEach((route) => {
        const { unmount } = renderWithRouter([route]);
        expect(screen.getByTestId('navigate-to-login')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('when admin is authenticated with ADMIN role', () => {
    beforeEach(() => {
      mockUseAdminsAuthContext.mockReturnValue({
        admin: {
          id: '1',
          name: 'Test Admin',
          email: 'admin@test.com',
          role: 'ADMIN',
        },
      });
    });

    it('should render private route outlet for root route', () => {
      renderWithRouter(['/']);
      expect(screen.getByTestId('private-route-outlet')).toBeInTheDocument();
      expect(screen.getByTestId('outlet-content')).toBeInTheDocument();
    });

    it('should render private route outlet for /products route', () => {
      renderWithRouter(['/products']);
      expect(screen.getByTestId('private-route-outlet')).toBeInTheDocument();
      expect(screen.getByTestId('outlet-content')).toBeInTheDocument();
    });

    it('should render private route outlet for /products/new route', () => {
      renderWithRouter(['/products/new']);
      expect(screen.getByTestId('private-route-outlet')).toBeInTheDocument();
      expect(screen.getByTestId('outlet-content')).toBeInTheDocument();
    });

    it('should render private route outlet for /products/edit/123 route', () => {
      renderWithRouter(['/products/edit/123']);
      expect(screen.getByTestId('private-route-outlet')).toBeInTheDocument();
      expect(screen.getByTestId('outlet-content')).toBeInTheDocument();
    });

    it('should render private route outlet for /sellers route', () => {
      renderWithRouter(['/sellers']);
      expect(screen.getByTestId('private-route-outlet')).toBeInTheDocument();
      expect(screen.getByTestId('outlet-content')).toBeInTheDocument();
    });

    it('should render private route outlet for /customers route', () => {
      renderWithRouter(['/customers']);
      expect(screen.getByTestId('private-route-outlet')).toBeInTheDocument();
      expect(screen.getByTestId('outlet-content')).toBeInTheDocument();
    });

    it('should still render login screen for /login route even when authenticated', () => {
      renderWithRouter(['/login']);
      expect(screen.getByTestId('admins-login')).toBeInTheDocument();
    });

    it('should still render unauthorized screen for /unauthorized route even when authenticated', () => {
      renderWithRouter(['/unauthorized']);
      expect(screen.getByTestId('admins-unauthorized')).toBeInTheDocument();
    });

    it('should render language settings route', () => {
      renderWithRouter(['/language-settings']);
      expect(screen.getByTestId('language-components')).toBeInTheDocument();
    });
  });

  describe('when admin is authenticated with non-ADMIN role', () => {
    beforeEach(() => {
      mockUseAdminsAuthContext.mockReturnValue({
        admin: {
          id: '2',
          name: 'Test User',
          email: 'user@test.com',
          role: 'CUSTOMER',
        },
      });
    });

    it('should redirect to unauthorized for root route', () => {
      renderWithRouter(['/']);
      expect(
        screen.getByTestId('navigate-to-unauthorized')
      ).toBeInTheDocument();
    });

    it('should redirect to unauthorized for /products route', () => {
      renderWithRouter(['/products']);
      expect(
        screen.getByTestId('navigate-to-unauthorized')
      ).toBeInTheDocument();
    });

    it('should redirect to unauthorized for /products/new route', () => {
      renderWithRouter(['/products/new']);
      expect(
        screen.getByTestId('navigate-to-unauthorized')
      ).toBeInTheDocument();
    });

    it('should redirect to unauthorized for /products/edit/123 route', () => {
      renderWithRouter(['/products/edit/123']);
      expect(
        screen.getByTestId('navigate-to-unauthorized')
      ).toBeInTheDocument();
    });

    it('should redirect to unauthorized for /sellers route', () => {
      renderWithRouter(['/sellers']);
      expect(
        screen.getByTestId('navigate-to-unauthorized')
      ).toBeInTheDocument();
    });

    it('should still render login screen for /login route', () => {
      renderWithRouter(['/login']);
      expect(screen.getByTestId('admins-login')).toBeInTheDocument();
    });

    it('should still render unauthorized screen for /unauthorized route', () => {
      renderWithRouter(['/unauthorized']);
      expect(screen.getByTestId('admins-unauthorized')).toBeInTheDocument();
    });
  });

  describe('when admin is authenticated with SELLER role', () => {
    beforeEach(() => {
      mockUseAdminsAuthContext.mockReturnValue({
        admin: {
          id: '3',
          name: 'Test Seller',
          email: 'seller@test.com',
          role: 'SELLER',
        },
      });
    });

    it('should redirect to unauthorized for all protected routes', () => {
      const protectedRoutes = [
        '/',
        '/products',
        '/products/new',
        '/products/edit/123',
        '/sellers',
        '/customers',
      ];

      protectedRoutes.forEach((route) => {
        const { unmount } = renderWithRouter([route]);
        expect(
          screen.getByTestId('navigate-to-unauthorized')
        ).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('router configuration', () => {
    beforeEach(() => {
      mockUseAdminsAuthContext.mockReturnValue({
        admin: {
          id: '1',
          name: 'Test Admin',
          email: 'admin@test.com',
          role: 'ADMIN',
        },
      });
    });

    it('should create private route with correct roles and admin', () => {
      renderWithRouter(['/']);

      // Verify that the private route is created with ADMIN role
      expect(screen.getByTestId('private-route-outlet')).toBeInTheDocument();
    });

    it('should handle all defined routes correctly', () => {
      const protectedRoutes = [
        '/',
        '/products',
        '/products/new',
        '/products/edit/123',
        '/sellers',
        '/customers',
      ];
      const publicRoutes = ['/login', '/unauthorized'];

      // Test protected routes
      protectedRoutes.forEach((path) => {
        const { unmount } = renderWithRouter([path]);
        expect(screen.getByTestId('private-route-outlet')).toBeInTheDocument();
        unmount();
      });

      // Test public routes
      const publicRouteTests = [
        { path: '/login', expectedComponent: 'admins-login' },
        { path: '/unauthorized', expectedComponent: 'admins-unauthorized' },
      ];

      publicRouteTests.forEach(({ path, expectedComponent }) => {
        const { unmount } = renderWithRouter([path]);
        expect(screen.getByTestId(expectedComponent)).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('edge cases', () => {
    it('should handle undefined admin gracefully', () => {
      mockUseAdminsAuthContext.mockReturnValue({
        admin: undefined,
      });

      renderWithRouter(['/']);
      expect(screen.getByTestId('navigate-to-login')).toBeInTheDocument();
    });

    it('should handle admin with null role', () => {
      mockUseAdminsAuthContext.mockReturnValue({
        admin: {
          id: '1',
          name: 'Test Admin',
          email: 'admin@test.com',
          role: null,
        },
      });

      renderWithRouter(['/']);
      expect(
        screen.getByTestId('navigate-to-unauthorized')
      ).toBeInTheDocument();
    });

    it('should handle admin with empty string role', () => {
      mockUseAdminsAuthContext.mockReturnValue({
        admin: {
          id: '1',
          name: 'Test Admin',
          email: 'admin@test.com',
          role: '',
        },
      });

      renderWithRouter(['/']);
      expect(
        screen.getByTestId('navigate-to-unauthorized')
      ).toBeInTheDocument();
    });
  });

  describe('component integration', () => {
    beforeEach(() => {
      mockUseAdminsAuthContext.mockReturnValue({
        admin: {
          id: '1',
          name: 'Test Admin',
          email: 'admin@test.com',
          role: 'ADMIN',
        },
      });
    });

    it('should render BrowserRouter wrapper', () => {
      renderWithRouter(['/']);
      // The BrowserRouter is mocked to use MemoryRouter, so we can't directly test it
      // But we can verify that routing works correctly
      expect(screen.getByTestId('private-route-outlet')).toBeInTheDocument();
    });

    it('should pass correct props to createPrivateRoute', () => {
      renderWithRouter(['/']);

      // Verify that the private route receives the correct admin user
      expect(screen.getByTestId('private-route-outlet')).toBeInTheDocument();
    });

    it('should handle route parameters correctly', () => {
      renderWithRouter(['/products/edit/test-id-123']);
      expect(screen.getByTestId('private-route-outlet')).toBeInTheDocument();
    });
  });
});
