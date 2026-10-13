import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import {
  SellersAuthProvider,
  useSellersAuthContext,
} from './SellersAuthContext';

const mockUseQuery = vi.fn();
const mockUseMutation = vi.fn();

vi.mock('@apollo/client/react', () => ({
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
  useMutation: (...args: unknown[]) => mockUseMutation(...args),
}));

vi.mock('@kickzone-workspace/sellers-graphql', () => ({
  ME_QUERY: 'ME_QUERY',
  LOGOUT_MUTATION: 'LOGOUT_MUTATION',
  MY_SELLER_INFO_QUERY: 'MY_SELLER_INFO_QUERY',
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
  const { user, logout } = useSellersAuthContext();
  return (
    <div>
      <div data-testid="user-name">{user?.name || 'No User'}</div>
      <button onClick={() => void logout()}>Logout</button>
    </div>
  );
};

describe('SellersAuthContext', () => {
  let localStorageMock: { [key: string]: string };
  const mockLogoutMutation = vi.fn();

  beforeEach(() => {
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

    mockUseMutation.mockReturnValue([mockLogoutMutation, {}]);
    // ME query first, seller info query second
    mockUseQuery
      .mockReturnValueOnce({ loading: false, data: null, error: null })
      .mockReturnValue({ loading: false, data: null, error: null });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading while ME is loading', () => {
    mockUseQuery.mockReset();
    mockUseQuery.mockReturnValue({ loading: true, data: null, error: null });

    render(
      <SellersAuthProvider>
        <TestComponent />
      </SellersAuthProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('sets seller from ME query and persists to localStorage', async () => {
    const seller = {
      id: '1',
      name: 'Seller',
      email: 'seller@test.com',
      role: 'SELLER',
    };
    mockUseQuery.mockReset();
    mockUseQuery
      .mockReturnValueOnce({
        loading: false,
        data: { me: seller },
        error: null,
      })
      .mockReturnValue({
        loading: false,
        data: {
          mySellerInfo: {
            id: 's1',
            storeName: 'Store',
            canManageCatalog: true,
            isActive: true,
          },
        },
      });

    render(
      <SellersAuthProvider>
        <TestComponent />
      </SellersAuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toHaveTextContent('Seller');
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'seller_user',
      JSON.stringify(seller)
    );
  });

  it('clears seller when ME returns null', async () => {
    localStorageMock['seller_user'] = JSON.stringify({
      id: '1',
      name: 'Seller',
      email: 'seller@test.com',
      role: 'SELLER',
    });
    mockUseQuery.mockReset();
    mockUseQuery
      .mockReturnValueOnce({
        loading: false,
        data: { me: null },
        error: null,
      })
      .mockReturnValue({ loading: false, data: null });

    render(
      <SellersAuthProvider>
        <TestComponent />
      </SellersAuthProvider>
    );

    await waitFor(() => {
      expect(localStorage.removeItem).toHaveBeenCalledWith('seller_user');
      expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
    });
  });

  it('calls logout mutation and clears seller', async () => {
    const seller = {
      id: '1',
      name: 'Seller',
      email: 'seller@test.com',
      role: 'SELLER',
    };
    mockUseQuery.mockReset();
    mockUseQuery
      .mockReturnValueOnce({
        loading: false,
        data: { me: seller },
        error: null,
      })
      .mockReturnValue({ loading: false, data: null });
    mockLogoutMutation.mockResolvedValue({ data: { logout: true } });

    render(
      <SellersAuthProvider>
        <TestComponent />
      </SellersAuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toHaveTextContent('Seller');
    });

    screen.getByText('Logout').click();

    await waitFor(() => {
      expect(mockLogoutMutation).toHaveBeenCalled();
      expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
    });
  });

  it('throws when used outside provider', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    expect(() => render(<TestComponent />)).toThrow(
      'useSellersAuthContext must be used within an SellersAuthProvider'
    );

    consoleErrorSpy.mockRestore();
  });
});
