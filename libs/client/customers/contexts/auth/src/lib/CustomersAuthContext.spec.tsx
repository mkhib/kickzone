import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import {
  CustomersAuthProvider,
  useCustomersAuth,
} from './CustomersAuthContext';

const mockUseQuery = vi.fn();
const mockUseMutation = vi.fn();

vi.mock('@apollo/client/react', () => ({
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
  useMutation: (...args: unknown[]) => mockUseMutation(...args),
}));

vi.mock('@apollo/client', () => ({
  gql: (strings: TemplateStringsArray) => strings.join(''),
}));

vi.mock('@kickzone-workspace/codegen', () => ({
  KickzoneGraphqlTypes: {
    UserRole: {
      Customer: 'CUSTOMER',
      Admin: 'ADMIN',
      Seller: 'SELLER',
    },
  },
}));

const TestComponent = () => {
  const { user, login, logout, loading } = useCustomersAuth();
  return (
    <div>
      <div data-testid="loading">{String(loading)}</div>
      <div data-testid="user-name">{user?.name || 'No User'}</div>
      <div data-testid="user-email">{user?.email || 'No Email'}</div>
      <button
        onClick={() =>
          login({
            id: '2',
            name: 'Jane',
            email: 'jane@test.com',
            role: 'CUSTOMER' as never,
          })
        }
      >
        Login
      </button>
      <button onClick={() => void logout()}>Logout</button>
    </div>
  );
};

describe('CustomersAuthContext', () => {
  const mockLogoutMutation = vi.fn();

  beforeEach(() => {
    mockUseMutation.mockReturnValue([mockLogoutMutation, {}]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('exposes loading while ME query is in flight', () => {
    mockUseQuery.mockReturnValue({ loading: true, data: undefined });

    render(
      <CustomersAuthProvider>
        <TestComponent />
      </CustomersAuthProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('true');
  });

  it('sets customer user from ME query', async () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      data: {
        me: {
          id: '1',
          name: 'Customer',
          email: 'customer@test.com',
          role: 'CUSTOMER',
        },
      },
    });

    render(
      <CustomersAuthProvider>
        <TestComponent />
      </CustomersAuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toHaveTextContent('Customer');
      expect(screen.getByTestId('user-email')).toHaveTextContent(
        'customer@test.com'
      );
    });
  });

  it('clears user when ME returns null (expired session)', async () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      data: { me: null },
    });

    render(
      <CustomersAuthProvider>
        <TestComponent />
      </CustomersAuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
    });
  });

  it('ignores non-customer roles from ME', async () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      data: {
        me: {
          id: '1',
          name: 'Admin',
          email: 'admin@test.com',
          role: 'ADMIN',
        },
      },
    });

    render(
      <CustomersAuthProvider>
        <TestComponent />
      </CustomersAuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
    });
  });

  it('allows login for customer role only', async () => {
    mockUseQuery.mockReturnValue({ loading: false, data: { me: null } });

    render(
      <CustomersAuthProvider>
        <TestComponent />
      </CustomersAuthProvider>
    );

    screen.getByText('Login').click();

    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toHaveTextContent('Jane');
    });
  });

  it('calls logout mutation and clears user', async () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      data: {
        me: {
          id: '1',
          name: 'Customer',
          email: 'customer@test.com',
          role: 'CUSTOMER',
        },
      },
    });
    mockLogoutMutation.mockResolvedValue({ data: { logout: true } });

    render(
      <CustomersAuthProvider>
        <TestComponent />
      </CustomersAuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toHaveTextContent('Customer');
    });

    screen.getByText('Logout').click();

    await waitFor(() => {
      expect(mockLogoutMutation).toHaveBeenCalled();
      expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
    });
  });

  it('clears user even when logout mutation fails', async () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      data: {
        me: {
          id: '1',
          name: 'Customer',
          email: 'customer@test.com',
          role: 'CUSTOMER',
        },
      },
    });
    mockLogoutMutation.mockRejectedValue(new Error('network'));

    render(
      <CustomersAuthProvider>
        <TestComponent />
      </CustomersAuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toHaveTextContent('Customer');
    });

    screen.getByText('Logout').click();

    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
    });
  });

  it('throws when used outside provider', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    expect(() => render(<TestComponent />)).toThrow(
      'useCustomersAuth must be used within an CustomersAuthProvider'
    );

    consoleErrorSpy.mockRestore();
  });
});
