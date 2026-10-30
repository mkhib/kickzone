import React, { type ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CustomerSignup } from './customer-signup';
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
const mockHandleRegister = vi.fn();
const mockUseCustomersRegister = vi.fn();

vi.mock('@kickzone-workspace/customers-auth-hooks', () => ({
  useCustomersRegister: () => mockUseCustomersRegister(),
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
    if (error.message.includes('Email already exists')) {
      return { translationKey: 'emailAlreadyExists' };
    }
    return { rawMessage: error.message };
  },
}));

// Mock the i18n context with passwordTooShort
vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      pageTitles: {
        signup: () => 'Sign Up',
      },
      authorization: {
        createAccount: () => 'Create Account',
        signIn: () => 'Sign In',
        signUp: () => 'Sign Up',
        alreadyHaveAccount: () => 'Already have an account?',
        confirmPassword: () => 'Confirm Password',
        passwordsDoNotMatch: () => 'Passwords do not match',
        passwordTooShort: () => 'Password must be at least 8 characters long',
        registrationSuccess: () =>
          'Registration successful! Welcome to SAINTBALA.',
        registrationFailed: () => 'Registration failed. Please try again.',
      },
      form: {
        email: () => 'Email Address',
        password: () => 'Password',
        fullName: () => 'Full Name',
      },
      errors: {
        requiredFields: () => 'Please fill in all required fields',
        emailAlreadyExists: () =>
          'This email is already registered. Please use a different email or try logging in.',
        unknown: () => 'An unknown error occurred. Please try again.',
      },
      status: {
        error: () => 'Error',
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
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual: Record<string, unknown> = await vi.importActual(
    'react-router-dom'
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ to, children }: { to: string; children: ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  };
});

describe('CustomerSignup - Password Length Validation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCustomersRegister.mockReturnValue({
      handleRegister: mockHandleRegister,
      registerLoading: false,
    });
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <CustomerSignup />
      </BrowserRouter>
    );
  };

  it('should show passwordTooShort error and NOT call handleRegister when password is 7 characters', async () => {
    renderComponent();

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInputs = screen.getAllByLabelText(/^Password/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const submitButton = screen.getByRole('button', { name: 'Create Account' });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'short7c' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'short7c' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
    });

    expect(mockHandleRegister).not.toHaveBeenCalled();
  });

  it('should call handleRegister when password is exactly 8 characters', async () => {
    mockHandleRegister.mockResolvedValue({});

    renderComponent();

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInputs = screen.getAllByLabelText(/^Password/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const submitButton = screen.getByRole('button', { name: 'Create Account' });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'abcdefgh' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleRegister).toHaveBeenCalledWith(
        'John Doe',
        'john@example.com',
        'abcdefgh'
      );
    });
  });
});