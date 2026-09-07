import { vi, describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAdminLogin } from './useAdminLogin';

// Mock dependencies
const mockSetAdmin = vi.fn();
const mockNavigate = vi.fn();
const mockLogin = vi.fn();
const mockLogoutAdmin = vi.fn();

// Mock Apollo Client
vi.mock('@apollo/client/react', () => ({
  useMutation: vi.fn((mutation) => {
    if (mutation === 'LOGIN_MUTATION') {
      return [
        mockLogin,
        {
          loading: false,
          error: null,
        },
      ];
    }
    if (mutation === 'LOGOUT_MUTATION') {
      return [mockLogoutAdmin];
    }
    return [vi.fn(), { loading: false, error: null }];
  }),
}));

// Mock contexts
vi.mock('@kickzone-workspace/admins-contexts', () => ({
  useAdminsAuthContext: () => ({
    setAdmin: mockSetAdmin,
  }),
}));

// Mock React Router
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock GraphQL mutations
vi.mock('@kickzone-workspace/admins-graphql', () => ({
  LOGIN_MUTATION: 'LOGIN_MUTATION',
  LOGOUT_MUTATION: 'LOGOUT_MUTATION',
}));

// Mock localStorage
const mockLocalStorage = {
  setItem: vi.fn(),
  getItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('useAdminLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return login function and loading state', () => {
    const { result } = renderHook(() => useAdminLogin());

    expect(result.current.loginAdmin).toBeDefined();
    expect(result.current.adminsLoginLoading).toBe(false);
    expect(result.current.adminsLoginError).toBe(null);
    expect(result.current.logoutAdmin).toBeDefined();
  });

  it('should call login mutation with correct variables', async () => {
    const mockUser = {
      id: 1,
      name: 'Admin',
      email: 'admin@test.com',
      role: 'ADMIN',
    };

    mockLogin.mockResolvedValue({
      data: { login: mockUser },
    });

    const { result } = renderHook(() => useAdminLogin());

    await act(async () => {
      await result.current.loginAdmin({
        email: 'admin@test.com',
        password: 'password123',
      });
    });

    expect(mockLogin).toHaveBeenCalledWith({
      variables: {
        email: 'admin@test.com',
        password: 'password123',
      },
    });
  });

  it('should set admin and navigate on successful login', async () => {
    const mockUser = {
      id: 1,
      name: 'Admin',
      email: 'admin@test.com',
      role: 'ADMIN',
    };

    mockLogin.mockResolvedValue({
      data: { login: mockUser },
    });

    const { result } = renderHook(() => useAdminLogin());

    await act(async () => {
      await result.current.loginAdmin({
        email: 'admin@test.com',
        password: 'password123',
      });
    });

    expect(mockSetAdmin).toHaveBeenCalledWith(mockUser);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'admin_user',
      JSON.stringify(mockUser)
    );
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });

  it('should handle login error gracefully', async () => {
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const loginError = new Error('Login failed');

    mockLogin.mockRejectedValue(loginError);

    const { result } = renderHook(() => useAdminLogin());

    await act(async () => {
      await result.current.loginAdmin({
        email: 'admin@test.com',
        password: 'wrongpassword',
      });
    });

    expect(consoleSpy).toHaveBeenCalledWith('Login failed:', loginError);
    expect(mockSetAdmin).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should not set admin or navigate when login data is missing', async () => {
    mockLogin.mockResolvedValue({
      data: null,
    });

    const { result } = renderHook(() => useAdminLogin());

    await act(async () => {
      await result.current.loginAdmin({
        email: 'admin@test.com',
        password: 'password123',
      });
    });

    expect(mockSetAdmin).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should not set admin or navigate when login user is missing', async () => {
    mockLogin.mockResolvedValue({
      data: { login: null },
    });

    const { result } = renderHook(() => useAdminLogin());

    await act(async () => {
      await result.current.loginAdmin({
        email: 'admin@test.com',
        password: 'password123',
      });
    });

    expect(mockSetAdmin).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
