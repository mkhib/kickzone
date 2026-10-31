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
        requiredFields: () => 'Please fill in all required fields',
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

describe('CustomersLogin (zod/RHF validation)', () => {
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

  it('empty submit -> handleLogin NOT called and requiredFields text shown', async () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(submitButton);

    // RHF validates on submit - wait for errors to appear
    await waitFor(() => {
      const errorMessages = screen.getAllByText('Please fill in all required fields');
      expect(errorMessages.length).toBeGreaterThanOrEqual(1);
    });

    // handleLogin should NOT be called
    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it('"  ann@example.com  " + "abc" -> handleLogin("ann@example.com","abc") once', async () => {
    mockHandleLogin.mockResolvedValue({});

    renderComponent();

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: '  ann@example.com  ' } });
    fireEvent.change(passwordInput, { target: { value: 'abc' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalledTimes(1);
      expect(mockHandleLogin).toHaveBeenCalledWith('ann@example.com', 'abc');
      expect(mockShowSnackbar).toHaveBeenCalledWith('Welcome back!', {
        severity: 'success',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/checkout', { replace: true });
    });
  });
});