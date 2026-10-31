import React, { type ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CustomerResetPassword } from './customer-reset-password';
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
const mockHandleResetPassword = vi.fn();
const mockUseCustomersResetPassword = vi.fn();

vi.mock('@kickzone-workspace/customers-auth-hooks', () => ({
  useCustomersResetPassword: () => mockUseCustomersResetPassword(),
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
    if (error.message.includes('Invalid token')) {
      return { translationKey: 'invalidToken' };
    }
    return { rawMessage: error.message };
  },
}));

// Mock the i18n context with passwordTooShort
vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      pageTitles: {
        resetPassword: () => 'Reset Password',
      },
      authorization: {
        resetPassword: () => 'Reset Password',
        enterNewPassword: () => 'Enter your new password below.',
        confirmPassword: () => 'Confirm Password',
        passwordsDoNotMatch: () => 'Passwords do not match',
        passwordTooShort: () => 'Password must be at least 8 characters long',
        invalidToken: () => 'Invalid or expired reset token.',
        passwordResetSuccess: () => 'Password has been reset successfully.',
        backToLogin: () => 'Back to Login',
      },
      form: {
        password: () => 'Password',
      },
      errors: {
        invalidToken: () => 'Invalid or expired reset token. Please request a new password reset.',
        unknown: () => 'An unknown error occurred. Please try again.',
      },
      status: {
        error: () => 'Error',
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
    useParams: () => ({ token: 'valid-reset-token' }),
    Link: ({ to, children }: { to: string; children: ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  };
});

describe('CustomerResetPassword - Zod/RHF Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCustomersResetPassword.mockReturnValue({
      handleResetPassword: mockHandleResetPassword,
      resetPasswordLoading: false,
    });
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <CustomerResetPassword />
      </BrowserRouter>
    );
  };

  it('mismatch -> passwordsDoNotMatch text, handleResetPassword NOT called', async () => {
    renderComponent();

    const passwordInputs = screen.getAllByLabelText(/^Password/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const submitButton = screen.getByRole('button', { name: 'Reset Password' });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'different' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });

    expect(mockHandleResetPassword).not.toHaveBeenCalled();
  });

  it('7-char matching -> passwordTooShort text, handleResetPassword NOT called', async () => {
    renderComponent();

    const passwordInputs = screen.getAllByLabelText(/^Password/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const submitButton = screen.getByRole('button', { name: 'Reset Password' });

    fireEvent.change(passwordInput, { target: { value: 'short7c' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'short7c' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
    });

    expect(mockHandleResetPassword).not.toHaveBeenCalled();
  });

  it('valid -> handleResetPassword(token, pw) once', async () => {
    mockHandleResetPassword.mockResolvedValue({});

    renderComponent();

    const passwordInputs = screen.getAllByLabelText(/^Password/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const submitButton = screen.getByRole('button', { name: 'Reset Password' });

    fireEvent.change(passwordInput, { target: { value: 'validPassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'validPassword123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleResetPassword).toHaveBeenCalledTimes(1);
      expect(mockHandleResetPassword).toHaveBeenCalledWith(
        'valid-reset-token',
        'validPassword123'
      );
    });
  });
});