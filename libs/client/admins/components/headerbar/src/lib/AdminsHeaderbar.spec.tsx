import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdminsHeaderbar } from './AdminsHeaderbar';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock the admins auth context
const mockSetAdmin = vi.fn();
const mockLogoutAdmin = vi.fn();
const mockUseAdminsAuthContext = vi.fn();

vi.mock('@kickzone-workspace/admins-contexts', () => ({
  useAdminsAuthContext: () => mockUseAdminsAuthContext(),
}));

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => children,
  useLocation: () => ({
    pathname: '/products',
  }),
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

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

    // Set default mock return value for logged in admin
    mockUseAdminsAuthContext.mockReturnValue({
      admin: {
        id: '1',
        name: 'Test Admin',
        email: 'admin@test.com',
        role: 'admin',
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
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should show navigation buttons when logged in', () => {
    renderWithProviders(<AdminsHeaderbar />);
    expect(screen.getAllByText('Add New Product')).toHaveLength(2); // One in header, one in drawer
    expect(screen.getAllByText('Products')).toHaveLength(2); // One in header, one in drawer
  });

  it('should call logout functions when logout button is clicked', () => {
    renderWithProviders(<AdminsHeaderbar />);
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(mockLogoutAdmin).toHaveBeenCalled();
    expect(mockSetAdmin).toHaveBeenCalledWith(null);
  });

  it('should toggle drawer when menu button is clicked', () => {
    renderWithProviders(<AdminsHeaderbar />);
    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);

    // Check if drawer is open by looking for close button (CloseIcon)
    expect(screen.getByTestId('CloseIcon')).toBeInTheDocument();
  });

  it('should show drawer navigation items', () => {
    renderWithProviders(<AdminsHeaderbar />);
    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);

    // Check that all navigation items are present (they appear in both header and drawer)
    expect(screen.getAllByText('Add New Product')).toHaveLength(2);
    expect(screen.getAllByText('Products')).toHaveLength(2);
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Sellers')).toBeInTheDocument();
  });

  it('should have close button in drawer when opened', () => {
    renderWithProviders(<AdminsHeaderbar />);
    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);

    // Verify drawer is open and close button is present
    expect(screen.getByTestId('CloseIcon')).toBeInTheDocument();
  });

  it('should have navigation items in drawer', () => {
    renderWithProviders(<AdminsHeaderbar />);
    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);

    // Verify all navigation items are present in the drawer
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Sellers')).toBeInTheDocument();

    // Check that Products appears in drawer (ListItemButton version)
    const productsButtons = screen.getAllByText('Products');
    expect(productsButtons.length).toBeGreaterThan(0);
  });

  it('should show login button when admin is not logged in', () => {
    // Override the mock to return no admin
    mockUseAdminsAuthContext.mockReturnValue({
      admin: null,
      setAdmin: mockSetAdmin,
      logoutAdmin: mockLogoutAdmin,
    });

    renderWithProviders(<AdminsHeaderbar />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Admin')).not.toBeInTheDocument();
  });

  it('should handle mobile viewport behavior', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600, // Mobile width
    });

    // Trigger resize event
    window.dispatchEvent(new Event('resize'));

    renderWithProviders(<AdminsHeaderbar />);

    // Should still render successfully on mobile
    expect(screen.getByText('SAINTBALA Admin Panel')).toBeInTheDocument();
  });

  it('should handle desktop viewport behavior', () => {
    // Mock desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200, // Desktop width
    });

    // Trigger resize event
    window.dispatchEvent(new Event('resize'));

    renderWithProviders(<AdminsHeaderbar />);

    // Should render successfully on desktop
    expect(screen.getByText('SAINTBALA Admin Panel')).toBeInTheDocument();
  });
});
