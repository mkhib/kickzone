import React, { type ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SellersLogin } from './SellersLogin';
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
const mockLoginSeller = vi.fn();
const mockUseSellerLogin = vi.fn();

vi.mock('@kickzone-workspace/sellers-auth-hooks', () => ({
  useSellerLogin: () => mockUseSellerLogin(),
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
        sellerLogin: () => 'Seller Sign In',
      },
      authorization: {
        signIn: () => 'Sign In',
      },
      form: {
        email: () => 'Email Address',
        password: () => 'Password',
      },
      errors: {
        wrongEmailOrPassword: () => 'Incorrect credentials',
        requiredFields: () => 'Please fill in all required fields',
        unknown: () => 'Unknown error',
      },
    },
  }),
  usePageTitle: vi.fn(),
}));

describe('SellersLogin (zod/RHF validation)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSellerLogin.mockReturnValue({
      loginSeller: mockLoginSeller,
      sellersLoginLoading: false,
      sellersLoginError: null,
    });
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <SellersLogin />
      </BrowserRouter>
    );
  };

  it('empty submit -> loginSeller NOT called and requiredFields text shown', async () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(submitButton);

    // RHF validates on submit - wait for errors to appear
    await waitFor(() => {
      const errorMessages = screen.getAllByText('Please fill in all required fields');
      expect(errorMessages.length).toBeGreaterThanOrEqual(1);
    });

    // loginSeller should NOT be called
    expect(mockLoginSeller).not.toHaveBeenCalled();
  });

  it('"  ann@example.com  " + "abc" -> loginSeller({ email: "ann@example.com", password: "abc" }) once (legacy short password allowed)', async () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: '  ann@example.com  ' } });
    fireEvent.change(passwordInput, { target: { value: 'abc' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLoginSeller).toHaveBeenCalledTimes(1);
      expect(mockLoginSeller).toHaveBeenCalledWith({ email: 'ann@example.com', password: 'abc' });
    });
  });
});