import React, { type ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CustomerForgotPassword } from './customer-forgot-password';
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
const mockHandleForgotPassword = vi.fn();
const mockUseCustomersForgotPassword = vi.fn();

vi.mock('@kickzone-workspace/customers-auth-hooks', () => ({
  useCustomersForgotPassword: () => mockUseCustomersForgotPassword(),
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
    if (error.message.includes('User not found')) {
      return { translationKey: 'userNotFound' };
    }
    return { rawMessage: error.message };
  },
}));

// Mock the i18n context with all needed keys
vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      pageTitles: {
        forgotPassword: () => 'Forgot Password',
      },
      authorization: {
        resetYourPassword: () => 'Reset Your Password',
        enterEmailForReset: () =>
          'Enter your email address and we will send you a link to reset your password.',
        sendResetLink: () => 'Send Reset Link',
        backToLogin: () => 'Back to Login',
        resetLinkSent: () => 'Reset link sent! Check your email.',
        forgotPassword: () => 'Forgot Password',
      },
      form: {
        email: () => 'Email Address',
      },
      errors: {
        requiredFields: () => 'Please fill in all required fields',
        unknown: () => 'An unknown error occurred. Please try again.',
        userNotFound: () => 'User not found. Please check your email address.',
      },
      status: {
        error: () => 'Error',
      },
      checkout: {
        orderProcessed: () =>
          'Your order will be processed and you will receive a confirmation email.',
      },
    },
  }),
  usePageTitle: vi.fn(),
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

// Mock React Router
vi.mock('react-router-dom', async () => {
  const actual: Record<string, unknown> = await vi.importActual(
    'react-router-dom'
  );
  return {
    ...actual,
    Link: ({ to, children }: { to: string; children: ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  };
});

// Mock window.location.origin
Object.defineProperty(window, 'location', {
  value: {
    origin: 'http://localhost:4200',
  },
  writable: true,
});

describe('CustomerForgotPassword - Zod/RHF Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCustomersForgotPassword.mockReturnValue({
      handleForgotPassword: mockHandleForgotPassword,
      forgotPasswordLoading: false,
    });
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <CustomerForgotPassword />
      </BrowserRouter>
    );
  };

  it('empty submit -> requiredFields snackbar and handleForgotPassword NOT called', async () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { name: 'Send Reset Link' });
    fireEvent.click(submitButton);

    // RHF validates on submit - wait for snackbar to be called
    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        'Please fill in all required fields',
        { severity: 'error' }
      );
    });

    expect(mockHandleForgotPassword).not.toHaveBeenCalled();
  });

  it('"  ann@example.com  " -> handleForgotPassword("ann@example.com", window.location.origin) once', async () => {
    mockHandleForgotPassword.mockResolvedValue({});

    renderComponent();

    const emailInput = screen.getByLabelText(/Email Address/i);
    const submitButton = screen.getByRole('button', { name: 'Send Reset Link' });

    fireEvent.change(emailInput, { target: { value: '  ann@example.com  ' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleForgotPassword).toHaveBeenCalledTimes(1);
      expect(mockHandleForgotPassword).toHaveBeenCalledWith(
        'ann@example.com',
        'http://localhost:4200'
      );
    });
  });
});