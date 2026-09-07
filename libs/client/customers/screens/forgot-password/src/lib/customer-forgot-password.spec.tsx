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

// Mock the forgot password hook
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

// Mock the i18n context
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

describe('CustomerForgotPassword', () => {
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

  it('should render successfully', () => {
    renderComponent();

    expect(screen.getByTestId('customers-layout')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Reset Your Password' })
    ).toBeInTheDocument();
  });

  it('should render form fields', () => {
    renderComponent();

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Send Reset Link' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Back to Login' })
    ).toBeInTheDocument();
  });

  it('should render helper text', () => {
    renderComponent();

    expect(
      screen.getByText(
        /Enter your email address and we will send you a link to reset your password/i
      )
    ).toBeInTheDocument();
  });

  it('should update email field when typed', () => {
    renderComponent();

    const emailInput = screen.getByLabelText(
      /Email Address/i
    ) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toBe('test@example.com');
  });

  it('should call handleForgotPassword with correct data on valid submission', async () => {
    mockHandleForgotPassword.mockResolvedValue(true);

    renderComponent();

    const emailInput = screen.getByLabelText(/Email Address/i);
    const submitButton = screen.getByRole('button', {
      name: 'Send Reset Link',
    });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleForgotPassword).toHaveBeenCalledWith(
        'test@example.com',
        'http://localhost:4200'
      );
    });
  });

  it('should show success toast on successful submission', async () => {
    mockHandleForgotPassword.mockResolvedValue(true);

    renderComponent();

    const emailInput = screen.getByLabelText(/Email Address/i);
    const submitButton = screen.getByRole('button', {
      name: 'Send Reset Link',
    });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        'Reset link sent! Check your email.',
        { severity: 'success' }
      );
    });
  });

  it('should show success message after submission', async () => {
    mockHandleForgotPassword.mockResolvedValue(true);

    renderComponent();

    const emailInput = screen.getByLabelText(/Email Address/i);
    const submitButton = screen.getByRole('button', {
      name: 'Send Reset Link',
    });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Reset link sent/i)).toBeInTheDocument();
    });
  });

  it('should show translated error toast for known errors', async () => {
    const error = new Error('User not found');
    mockHandleForgotPassword.mockRejectedValue(error);

    renderComponent();

    const emailInput = screen.getByLabelText(/Email Address/i);
    const submitButton = screen.getByRole('button', {
      name: 'Send Reset Link',
    });

    fireEvent.change(emailInput, { target: { value: 'notfound@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        'User not found. Please check your email address.',
        { severity: 'error' }
      );
    });
  });

  it('should show raw error message for unknown errors', async () => {
    const error = new Error('Some unexpected database error');
    mockHandleForgotPassword.mockRejectedValue(error);

    renderComponent();

    const emailInput = screen.getByLabelText(/Email Address/i);
    const submitButton = screen.getByRole('button', {
      name: 'Send Reset Link',
    });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        'Some unexpected database error',
        { severity: 'error' }
      );
    });
  });

  it('should not call forgot password when email is empty (HTML5 validation)', () => {
    renderComponent();

    const submitButton = screen.getByRole('button', {
      name: 'Send Reset Link',
    });
    fireEvent.click(submitButton);

    // HTML5 validation prevents submit, so forgot password should not be called
    expect(mockHandleForgotPassword).not.toHaveBeenCalled();
  });

  it('should trim email before submission', async () => {
    mockHandleForgotPassword.mockResolvedValue(true);

    renderComponent();

    const emailInput = screen.getByLabelText(/Email Address/i);
    const submitButton = screen.getByRole('button', {
      name: 'Send Reset Link',
    });

    fireEvent.change(emailInput, { target: { value: '  test@example.com  ' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleForgotPassword).toHaveBeenCalledWith(
        'test@example.com',
        'http://localhost:4200'
      );
    });
  });

  it('should show loading state when submission is in progress', () => {
    mockUseCustomersForgotPassword.mockReturnValue({
      handleForgotPassword: mockHandleForgotPassword,
      forgotPasswordLoading: true,
    });

    renderComponent();

    const submitButton = screen.getByRole('button', { name: 'Send Reset Link' });
    expect(submitButton).toBeDisabled();
    expect(screen.getByRole('progressbar', { name: 'Send Reset Link' })).toBeInTheDocument();
  });

  it('should have link to login page', () => {
    renderComponent();

    const loginLinks = screen.getAllByText(/Back to Login/i);
    const loginLink = loginLinks[0].closest('a');
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('should have correct form attributes for accessibility', () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/Email Address/i);

    expect(emailInput).toHaveAttribute('type', 'text');
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('autoComplete', 'email');
  });
});
