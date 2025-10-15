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

// Mock the UI store
const mockAddToast = vi.fn();
type UIStoreState = { addToast: typeof mockAddToast };
vi.mock('@kickzone-workspace/shared-ui-store', () => ({
  useUIStore: (selector?: (state: UIStoreState) => unknown) => {
    const store: UIStoreState = { addToast: mockAddToast };
    return selector ? selector(store) : store;
  },
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

// Mock the i18n context
vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      authorization: {
        createAccount: () => 'Create Account',
        signIn: () => 'Sign In',
        signUp: () => 'Sign Up',
        alreadyHaveAccount: () => 'Already have an account?',
        confirmPassword: () => 'Confirm Password',
        passwordsDoNotMatch: () => 'Passwords do not match',
        registrationSuccess: () =>
          'Registration successful! Welcome to Kickzone.',
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

describe('CustomerSignup', () => {
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

  it('should render successfully', () => {
    renderComponent();

    expect(screen.getByTestId('customers-layout')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Create Account' })
    ).toBeInTheDocument();
  });

  it('should render all form fields', () => {
    renderComponent();

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/^Password/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Create Account' })
    ).toBeInTheDocument();
  });

  it('should update form fields when typed', () => {
    renderComponent();

    const nameInput = screen.getByLabelText(/Full Name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(
      /Email Address/i
    ) as HTMLInputElement;
    const passwordInputs = screen.getAllByLabelText(
      /^Password/i
    ) as HTMLInputElement[];
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = screen.getByLabelText(
      /Confirm Password/i
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
  });

  it('should show validation error when passwords do not match', async () => {
    renderComponent();

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInputs = screen.getAllByLabelText(/^Password/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const submitButton = screen.getByRole('button', { name: 'Create Account' });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'different' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  it('should call handleRegister with correct data on valid submission', async () => {
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
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleRegister).toHaveBeenCalledWith(
        'John Doe',
        'john@example.com',
        'password123'
      );
    });
  });

  it('should show success toast and navigate on successful registration', async () => {
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
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'success',
        title: 'Sign Up',
        message: 'Registration successful! Welcome to Kickzone.',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  it('should show translated error toast for duplicate email', async () => {
    const error = new Error('Email already exists');
    mockHandleRegister.mockRejectedValue(error);

    renderComponent();

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInputs = screen.getAllByLabelText(/^Password/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const submitButton = screen.getByRole('button', { name: 'Create Account' });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'error',
        title: 'Error',
        message:
          'This email is already registered. Please use a different email or try logging in.',
      });
    });
  });

  it('should show raw error message for unknown errors', async () => {
    const error = new Error('Some unexpected server error');
    mockHandleRegister.mockRejectedValue(error);

    renderComponent();

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInputs = screen.getAllByLabelText(/^Password/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const submitButton = screen.getByRole('button', { name: 'Create Account' });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'error',
        title: 'Error',
        message: 'Some unexpected server error',
      });
    });
  });

  it('should show loading state when registration is in progress', () => {
    mockUseCustomersRegister.mockReturnValue({
      handleRegister: mockHandleRegister,
      registerLoading: true,
    });

    renderComponent();

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should have link to login page', () => {
    renderComponent();

    const loginLink = screen.getByText(/Already have an account/i).closest('a');
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('should have correct form attributes for accessibility', () => {
    renderComponent();

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInputs = screen.getAllByLabelText(/^Password/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);

    expect(nameInput).toHaveAttribute('type', 'text');
    expect(nameInput).toHaveAttribute('required');
    expect(nameInput).toHaveAttribute('autoComplete', 'name');

    expect(emailInput).toHaveAttribute('type', 'text');
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('autoComplete', 'email');

    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('autoComplete', 'new-password');

    expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    expect(confirmPasswordInput).toHaveAttribute('required');
    expect(confirmPasswordInput).toHaveAttribute(
      'autoComplete',
      'new-password'
    );
  });
});
