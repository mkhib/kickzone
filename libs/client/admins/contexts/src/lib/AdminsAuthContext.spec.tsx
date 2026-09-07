import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { AdminsAuthProvider, useAdminsAuthContext } from './AdminsAuthContext';

// Mock Apollo Client
const mockUseQuery = vi.fn();
const mockUseMutation = vi.fn();

vi.mock('@apollo/client/react', () => ({
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
  useMutation: (...args: unknown[]) => mockUseMutation(...args),
}));

// Mock GraphQL queries/mutations
vi.mock('@kickzone-workspace/admins-graphql', () => ({
  ME_QUERY: 'ME_QUERY',
  LOGOUT_MUTATION: 'LOGOUT_MUTATION',
}));

// Test component that uses the context
const TestComponent = () => {
  const { admin, setAdmin, logoutAdmin } = useAdminsAuthContext();
  return (
    <div>
      <div data-testid="admin-name">{admin?.name || 'No Admin'}</div>
      <div data-testid="admin-email">{admin?.email || 'No Email'}</div>
      <button
        onClick={() =>
          setAdmin({
            id: '2',
            name: 'Jane',
            email: 'jane@test.com',
            role: 'ADMIN',
          })
        }
      >
        Set Admin
      </button>
      <button onClick={logoutAdmin}>Logout</button>
    </div>
  );
};

describe('AdminsAuthContext', () => {
  let localStorageMock: { [key: string]: string };
  const mockLogoutMutation = vi.fn();

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {};
    global.localStorage = {
      getItem: vi.fn((key: string) => localStorageMock[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete localStorageMock[key];
      }),
      clear: vi.fn(() => {
        localStorageMock = {};
      }),
      key: vi.fn(),
      length: 0,
    };

    // Default mock implementations
    mockUseMutation.mockReturnValue([mockLogoutMutation, {}]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state', () => {
    mockUseQuery.mockReturnValue({ loading: true, data: null, error: null });

    render(
      <AdminsAuthProvider>
        <TestComponent />
      </AdminsAuthProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should initialize with admin from localStorage', () => {
    const savedAdmin = {
      id: '1',
      name: 'John',
      email: 'john@test.com',
      role: 'ADMIN',
    };
    localStorageMock['admin_user'] = JSON.stringify(savedAdmin);
    mockUseQuery.mockReturnValue({ loading: false, data: null, error: null });

    render(
      <AdminsAuthProvider>
        <TestComponent />
      </AdminsAuthProvider>
    );

    expect(screen.getByTestId('admin-name')).toHaveTextContent('John');
    expect(screen.getByTestId('admin-email')).toHaveTextContent(
      'john@test.com'
    );
  });

  it('should set admin from ME_QUERY data', async () => {
    const adminData = {
      id: '1',
      name: 'Test Admin',
      email: 'admin@test.com',
      role: 'ADMIN',
    };
    mockUseQuery.mockReturnValue({
      loading: false,
      data: { me: adminData },
      error: null,
    });

    render(
      <AdminsAuthProvider>
        <TestComponent />
      </AdminsAuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('admin-name')).toHaveTextContent('Test Admin');
      expect(screen.getByTestId('admin-email')).toHaveTextContent(
        'admin@test.com'
      );
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'admin_user',
      JSON.stringify(adminData)
    );
  });

  it('should clear admin on query error', async () => {
    localStorageMock['admin_user'] = JSON.stringify({
      id: '1',
      name: 'John',
      email: 'john@test.com',
      role: 'ADMIN',
    });
    mockUseQuery.mockReturnValue({
      loading: false,
      data: null,
      error: new Error('Unauthorized'),
    });

    render(
      <AdminsAuthProvider>
        <TestComponent />
      </AdminsAuthProvider>
    );

    await waitFor(() => {
      expect(localStorage.removeItem).toHaveBeenCalledWith('admin_user');
    });
  });

  it('should call logout mutation and clear admin', async () => {
    const adminData = {
      id: '1',
      name: 'Test Admin',
      email: 'admin@test.com',
      role: 'ADMIN',
    };
    mockUseQuery.mockReturnValue({
      loading: false,
      data: { me: adminData },
      error: null,
    });
    mockLogoutMutation.mockResolvedValue({ data: { logout: true } });

    render(
      <AdminsAuthProvider>
        <TestComponent />
      </AdminsAuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('admin-name')).toHaveTextContent('Test Admin');
    });

    const logoutButton = screen.getByText('Logout');
    logoutButton.click();

    await waitFor(() => {
      expect(mockLogoutMutation).toHaveBeenCalled();
      expect(screen.getByTestId('admin-name')).toHaveTextContent('No Admin');
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith('admin_user');
  });

  it('should handle logout errors gracefully', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const adminData = {
      id: '1',
      name: 'Test Admin',
      email: 'admin@test.com',
      role: 'ADMIN',
    };
    mockUseQuery.mockReturnValue({
      loading: false,
      data: { me: adminData },
      error: null,
    });
    mockLogoutMutation.mockRejectedValue(new Error('Logout failed'));

    render(
      <AdminsAuthProvider>
        <TestComponent />
      </AdminsAuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('admin-name')).toHaveTextContent('Test Admin');
    });

    const logoutButton = screen.getByText('Logout');
    logoutButton.click();

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Logout error:',
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAdminsAuth must be used within an AdminsAuthProvider');

    consoleErrorSpy.mockRestore();
  });

  it('should provide context value to children', () => {
    mockUseQuery.mockReturnValue({ loading: false, data: null, error: null });

    render(
      <AdminsAuthProvider>
        <TestComponent />
      </AdminsAuthProvider>
    );

    expect(screen.getByTestId('admin-name')).toBeInTheDocument();
    expect(screen.getByTestId('admin-email')).toBeInTheDocument();
  });
});
