import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminsLogin } from './AdminsLogin';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

const mockLoginAdmin = vi.fn();
const mockUseAdminLogin = vi.fn();

vi.mock('@kickzone-workspace/admins-auth-hooks', () => ({
  useAdminLogin: () => mockUseAdminLogin(),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      authorization: {
        signIn: () => 'Sign In',
      },
      pageTitles: {
        adminLogin: () => 'Admin Login',
      },
      form: {
        email: () => 'Email',
        password: () => 'Password',
      },
      errors: {
        'auth.invalid-credentials': () => 'Invalid credentials',
        'auth.network-error': () => 'Network error',
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
    value,
    onChange,
    ...props
  }: {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <input
      aria-label={label}
      value={value}
      onChange={onChange}
      type="password"
      {...props}
    />
  ),
}));

vi.mock('@kickzone-workspace/translations', () => ({
  mapApolloErrorToTranslationKey: (_error: unknown) =>
    'auth.invalid-credentials',
}));

vi.mock('@kickzone-workspace/colors', () => ({
  colors: {
    main: '#1976d2',
    text: '#333333',
    accent1: '#f5f5f5',
    hoverMain: '#1565c0',
  },
}));

describe('AdminsLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAdminLogin.mockReturnValue({
      loginAdmin: mockLoginAdmin,
      adminsLoginLoading: false,
      adminsLoginError: null,
    });
  });

  it('should render successfully', () => {
    render(<AdminsLogin />);

    expect(screen.getByTestId('admins-layout')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Sign In' })
    ).toBeInTheDocument();
  });

  it('should render form fields', () => {
    render(<AdminsLogin />);

    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('should update email field when typed', () => {
    render(<AdminsLogin />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should update password field when typed', () => {
    render(<AdminsLogin />);

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput).toHaveValue('password123');
  });

  it('should call loginAdmin when form is submitted', async () => {
    render(<AdminsLogin />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(mockLoginAdmin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('should show loading state when login is in progress', () => {
    mockUseAdminLogin.mockReturnValue({
      loginAdmin: mockLoginAdmin,
      adminsLoginLoading: true,
      adminsLoginError: null,
    });

    render(<AdminsLogin />);

    expect(screen.getByRole('button', { name: 'Sign In' })).toBeDisabled();
  });

  it('should show error message when login fails', () => {
    mockUseAdminLogin.mockReturnValue({
      loginAdmin: mockLoginAdmin,
      adminsLoginLoading: false,
      adminsLoginError: { message: 'Invalid credentials' },
    });

    render(<AdminsLogin />);

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});
