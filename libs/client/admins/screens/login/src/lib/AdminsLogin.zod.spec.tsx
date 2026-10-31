import React, { type ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminsLogin } from './AdminsLogin';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// Mock the layout component
vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

// Mock the auth hook
const mockLoginAdmin = vi.fn();
const mockUseAdminLogin = vi.fn();

vi.mock('@kickzone-workspace/admins-auth-hooks', () => ({
  useAdminLogin: () => mockUseAdminLogin(),
}));

// Mock the error message utility
vi.mock('@kickzone-workspace/translations', () => ({
  mapApolloErrorToTranslationKey: (_error: unknown) =>
    'auth.invalid-credentials',
}));

// Mock the i18n context
vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      pageTitles: {
        adminLogin: () => 'Admin Login',
      },
      authorization: {
        signIn: () => 'Sign In',
      },
      form: {
        email: () => 'Email',
        password: () => 'Password',
      },
      errors: {
        'auth.invalid-credentials': () => 'Invalid credentials',
        requiredFields: () => 'Please fill in all required fields',
      },
    },
  }),
  usePageTitle: vi.fn(),
}));

vi.mock('@kickzone-workspace/language-components', () => ({
  getLtrTextFieldProps: () => ({}),
}));

vi.mock('@kickzone-workspace/password-field', () => ({
  PasswordTextField: ({
    label,
    ...props
  }: {
    label: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <input
      aria-label={label}
      type="password"
      {...props}
    />
  ),
}));

vi.mock('@kickzone-workspace/colors', () => ({
  colors: {
    main: '#1976d2',
    text: '#333333',
    hoverMain: '#1565c0',
  },
}));

describe('AdminsLogin (zod/RHF validation)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAdminLogin.mockReturnValue({
      loginAdmin: mockLoginAdmin,
      adminsLoginLoading: false,
      adminsLoginError: null,
    });
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <AdminsLogin />
      </BrowserRouter>
    );
  };

  it('empty submit -> loginAdmin NOT called and requiredFields text shown', async () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(submitButton);

    // RHF validates on submit - wait for errors to appear
    await waitFor(() => {
      const errorMessages = screen.getAllByText('Please fill in all required fields');
      expect(errorMessages.length).toBeGreaterThanOrEqual(1);
    });

    // loginAdmin should NOT be called
    expect(mockLoginAdmin).not.toHaveBeenCalled();
  });

  it('"  admin@example.com  " + "abc" -> loginAdmin({ email: "admin@example.com", password: "abc" }) once', async () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: '  admin@example.com  ' } });
    fireEvent.change(passwordInput, { target: { value: 'abc' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLoginAdmin).toHaveBeenCalledTimes(1);
      expect(mockLoginAdmin).toHaveBeenCalledWith({ email: 'admin@example.com', password: 'abc' });
    });
  });
});