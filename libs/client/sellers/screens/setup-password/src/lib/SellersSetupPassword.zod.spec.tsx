import React, { type ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SellersSetupPassword } from './SellersSetupPassword';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// Mock the layout component
vi.mock('@kickzone-workspace/sellers-layout', () => ({
  SellersLayout: ({ children }: { children: ReactNode }) => (
    <div data-testid="sellers-layout">{children}</div>
  ),
}));

// Mock the auth hook
const mockSetupPassword = vi.fn();
const mockUseSetupPassword = vi.fn();

vi.mock('@kickzone-workspace/sellers-auth-hooks', () => ({
  useSetupPassword: () => mockUseSetupPassword(),
}));

// Mock the i18n context
vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      pageTitles: {
        sellerSetupPassword: () => 'Set Up Password',
      },
      authorization: {
        setupPasswordTitle: () => 'Set Up Your Password',
        setupPasswordDescription: () => 'Enter your new password below.',
        newPassword: () => 'New Password',
        confirmNewPassword: () => 'Confirm New Password',
        passwordsDoNotMatch: () => 'Passwords do not match',
        passwordTooShort: () => 'Password must be at least 8 characters',
        setPassword: () => 'Set Password',
        passwordRequirements: () => 'Password must be at least 8 characters',
        invalidToken: () => 'Invalid or expired token',
      },
      errors: {
        requiredFields: () => 'Please fill in all required fields',
      },
    },
  }),
  usePageTitle: vi.fn(),
}));

// Mock react-router-dom useParams
vi.mock('react-router-dom', async () => {
  const actual: Record<string, unknown> = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ token: 'tok-1' }),
  };
});

describe('SellersSetupPassword (zod/RHF validation)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSetupPassword.mockReturnValue({
      setupPassword: mockSetupPassword,
      setupPasswordLoading: false,
      setupPasswordError: null,
    });
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <SellersSetupPassword />
      </BrowserRouter>
    );
  };

  const getPasswordInput = () => {
    const inputs = screen.getAllByLabelText(/New Password/i);
    return inputs.find((input) => input.name === 'password') as HTMLInputElement;
  };
  const getConfirmPasswordInput = () => {
    const inputs = screen.getAllByLabelText(/Confirm New Password/i);
    return inputs.find((input) => input.name === 'confirmPassword') as HTMLInputElement;
  };
  const getSubmitButton = () => screen.getByRole('button', { name: 'Set Password' });

  it('mismatch -> passwordsDoNotMatch text, setupPassword NOT called', async () => {
    renderComponent();

    const passwordInput = getPasswordInput();
    const confirmPasswordInput = getConfirmPasswordInput();
    const submitButton = getSubmitButton();

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'different123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });

    expect(mockSetupPassword).not.toHaveBeenCalled();
  });

  it('7-char matching -> passwordTooShort text, setupPassword NOT called', async () => {
    renderComponent();

    const passwordInput = getPasswordInput();
    const confirmPasswordInput = getConfirmPasswordInput();
    const submitButton = getSubmitButton();

    fireEvent.change(passwordInput, { target: { value: 'pass123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'pass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });

    expect(mockSetupPassword).not.toHaveBeenCalled();
  });

  it('valid 8+ -> setupPassword(token, pw) once (mock useParams token "tok-1")', async () => {
    mockSetupPassword.mockResolvedValue({});

    renderComponent();

    const passwordInput = getPasswordInput();
    const confirmPasswordInput = getConfirmPasswordInput();
    const submitButton = getSubmitButton();

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetupPassword).toHaveBeenCalledTimes(1);
      expect(mockSetupPassword).toHaveBeenCalledWith('tok-1', 'password123');
    });
  });

  it('typing after an error clears the error text', async () => {
    renderComponent();

    const passwordInput = getPasswordInput();
    const confirmPasswordInput = getConfirmPasswordInput();
    const submitButton = getSubmitButton();

    // First submit with mismatch to trigger error
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'different123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });

    // Now type in password field - error should clear
    fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });

    await waitFor(() => {
      expect(screen.queryByText('Passwords do not match')).not.toBeInTheDocument();
    });
  });
});