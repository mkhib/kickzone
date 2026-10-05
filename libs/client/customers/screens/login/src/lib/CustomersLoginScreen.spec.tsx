import React, { type ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CustomersLogin } from './CustomersLoginScreen';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// Mock the layout component
vi.mock('@kickzone-workspace/customers-layout', () => ({
  CustomersLayout: ({ children }: { children: ReactNode }) => (
    <div data-testid="customers-layout">{children}</div>
  ),
}));

// Mock the auth hook
const mockHandleLogin = vi.fn();
const mockUseCustomersLogin = vi.fn();

vi.mock('@kickzone-workspace/customers-auth-hooks', () => ({
  useCustomersLogin: () => mockUseCustomersLogin(),
}));

const mockShowSnackbar = vi.fn();
vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbar: () => ({
    showSnackbar: mockShowSnackbar,
  }),
}));

// Mock the error message utility
vi.mock('@kickzone-workspace/translations', () => ({
  getErrorMessage: (error: Error) => {
    if (error.message.includes('wrong password')) {
      return { translationKey: 'wrongEmailOrPassword' };
    }
    return { rawMessage: error.message };
  },
}));

// Mock the i18n context
vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      pageTitles: {
        login: () => 'Sign In',
      },
      messages: {
        welcome: () => 'Welcome back!',
      },
      authorization: {
        signIn: () => 'Sign In',
        signUp: () => 'Sign Up',
        dontHaveAccount: () => "Don't have an account?",
        forgotPassword: () => 'Forgot Password',
        wrongEmailOrPassword: () => 'Incorrect credentials',
        createAccount: () => 'Create Account',
      },
      form: {
        email: () => 'Email Address',
        password: () => 'Password',
      },
      errors: {
        wrongEmailOrPassword: () => 'Incorrect credentials',
      },
    },
  }),
  usePageTitle: vi.fn(),
}));

// Mock React Router
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual: Record<string, unknown> = await vi.importActual(
    'react-router-dom'
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: { from: '/checkout' } }),
    Link: ({ to, children }: { to: string; children: ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  };
});

describe('CustomersLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCustomersLogin.mockReturnValue({
      handleLogin: mockHandleLogin,
      loginLoading: false,
    });
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <CustomersLogin />
      </BrowserRouter>
    );
  };

  it('should render successfully with layout and heading', () => {
    renderComponent();

    expect(screen.getByTestId('customers-layout')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Sign In' })
    ).toBeInTheDocument();
  });

  it('should render form fields and action button', () => {
    renderComponent();

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Sign In' })
    ).toBeInTheDocument();
  });

  it('should update form fields when typed', () => {
    renderComponent();

    const emailInput = screen.getByLabelText(
      /Email Address/i
    ) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /^Password/i
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'secret123' } });

    expect(emailInput.value).toBe('user@example.com');
    expect(passwordInput.value).toBe('secret123');
  });

  it('should call handleLogin with correct data and navigate on submit', async () => {
    mockHandleLogin.mockResolvedValue({});

    renderComponent();

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'secret123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalledWith(
        'user@example.com',
        'secret123'
      );
      expect(mockShowSnackbar).toHaveBeenCalledWith('Welcome back!', {
        severity: 'success',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/checkout', { replace: true });
    });
  });

  it('should show error toast on login failure', async () => {
    const error = new Error('wrong password');
    mockHandleLogin.mockRejectedValue(error);

    renderComponent();

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'secret123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith('Incorrect credentials', {
        severity: 'error',
      });
    });
  });

  it('should show loading indicator on button when loading', () => {
    mockUseCustomersLogin.mockReturnValue({
      handleLogin: mockHandleLogin,
      loginLoading: true,
    });

    renderComponent();

    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    expect(submitButton).toBeDisabled();
    expect(
      screen.getByRole('progressbar', { name: 'Sign In' })
    ).toBeInTheDocument();
  });

  it('should have links to forgot password and signup pages', () => {
    renderComponent();

    const forgotPasswordLink = screen
      .getByText(/Forgot Password/i)
      .closest('a');
    expect(forgotPasswordLink).toHaveAttribute('href', '/forgot-password');

    const signupLink = screen.getByRole('link', { name: 'Create Account' });
    expect(signupLink).toHaveAttribute('href', '/signup');
  });

  it('should have correct input attributes for accessibility', () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/^Password/i);

    expect(emailInput).toHaveAttribute('type', 'text');
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('autoComplete', 'email');

    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
  });
});
