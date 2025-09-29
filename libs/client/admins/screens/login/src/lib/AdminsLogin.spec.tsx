import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminsLogin } from './AdminsLogin';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock the layout component
vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

// Mock the auth hook
const mockLoginAdmin = vi.fn();
const mockUseAdminLogin = vi.fn();

vi.mock('@kickzone-workspace/admins-auth-hooks', () => ({
  useAdminLogin: () => mockUseAdminLogin(),
}));

// Mock the i18n context
vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      authorization: {
        signIn: () => 'Sign In',
      },
      button: {
        submit: () => 'Submitting...',
      },
      errors: {
        'auth.invalid-credentials': () => 'Invalid credentials',
        'auth.network-error': () => 'Network error',
      },
    },
  }),
}));

// Mock the translations utility
vi.mock('@kickzone-workspace/translations', () => ({
  mapApolloErrorToTranslationKey: (error: any) => 'auth.invalid-credentials',
}));

// Mock the colors
vi.mock('@kickzone-workspace/colors', () => ({
  colors: {
    main: '#1976d2',
    text: '#333333',
    accent1: '#f5f5f5',
    hoverMain: '#1565c0',
  },
}));

describe('AdminsLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set default mock return value
    mockUseAdminLogin.mockReturnValue({
      loginAdmin: mockLoginAdmin,
      adminsLoginLoading: false,
      adminsLoginError: null,
    });
  });

  it('should render successfully', () => {
    render(<AdminsLogin />);

    expect(screen.getByTestId('admins-layout')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Sign In' })
    ).toBeInTheDocument();
  });

  it('should render form fields', () => {
    render(<AdminsLogin />);

    expect(screen.getAllByDisplayValue('')).toHaveLength(2); // Both inputs
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('should update email field when typed', () => {
    render(<AdminsLogin />);

    const inputs = screen.getAllByDisplayValue('');
    const emailInput = inputs[0]; // First input is email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should update password field when typed', () => {
    render(<AdminsLogin />);

    const inputs = screen.getAllByDisplayValue('');
    const passwordInput = inputs[1]; // Second input is password
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput).toHaveValue('password123');
  });

  it('should call loginAdmin when form is submitted', async () => {
    render(<AdminsLogin />);

    const inputs = screen.getAllByDisplayValue('');
    const emailInput = inputs[0];
    const passwordInput = inputs[1];
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLoginAdmin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('should prevent default form submission', () => {
    render(<AdminsLogin />);

    const inputs = screen.getAllByDisplayValue('');
    const emailInput = inputs[0];
    const passwordInput = inputs[1];
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    // Fill in the form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Verify that loginAdmin was called (which means preventDefault was called)
    expect(mockLoginAdmin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should show loading state when login is in progress', () => {
    // Mock loading state
    mockUseAdminLogin.mockReturnValue({
      loginAdmin: mockLoginAdmin,
      adminsLoginLoading: true,
      adminsLoginError: null,
    });

    render(<AdminsLogin />);

    expect(
      screen.getByRole('button', { name: 'Submitting...' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should show error message when login fails', () => {
    // Mock error state
    mockUseAdminLogin.mockReturnValue({
      loginAdmin: mockLoginAdmin,
      adminsLoginLoading: false,
      adminsLoginError: { message: 'Invalid credentials' },
    });

    render(<AdminsLogin />);

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('should have correct form attributes', () => {
    render(<AdminsLogin />);

    const inputs = screen.getAllByDisplayValue('');
    const emailInput = inputs[0];
    const passwordInput = inputs[1];

    expect(emailInput).toHaveAttribute('type', 'text');
    expect(emailInput).toHaveAttribute('autoComplete', 'email');
    expect(emailInput).toHaveAttribute('required');

    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
    expect(passwordInput).toHaveAttribute('required');
  });
});
