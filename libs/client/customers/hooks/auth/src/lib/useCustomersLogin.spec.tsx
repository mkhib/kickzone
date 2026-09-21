import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useCustomersLogin } from './useCustomersLogin';

const mockSetAuthUser = vi.fn();
const mockLogin = vi.fn();
const mockAddToCart = vi.fn();
const mockUseCartItems = vi.fn(() => []);

vi.mock('@apollo/client/react', () => ({
  useMutation: vi.fn(() => {
    // First call is login, second is addToCart — track by call order via wrappers
    return [vi.fn(), { loading: false }];
  }),
}));

vi.mock('@kickzone-workspace/customers-auth-context', () => ({
  useCustomersAuth: () => ({
    login: mockSetAuthUser,
  }),
}));

vi.mock('@kickzone-workspace/customer-cart-store', () => ({
  useCartItems: () => mockUseCartItems(),
}));

vi.mock('@kickzone-workspace/customers-graphql', () => ({
  ADD_TO_CART_MUTATION: 'ADD_TO_CART_MUTATION',
}));

vi.mock('@apollo/client', () => ({
  gql: (strings: TemplateStringsArray) => strings.join(''),
}));

import { useMutation } from '@apollo/client/react';

describe('useCustomersLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCartItems.mockReturnValue([]);
    mockLogin.mockReset();
    mockAddToCart.mockReset();

    let call = 0;
    vi.mocked(useMutation).mockImplementation(() => {
      call += 1;
      if (call === 1) {
        return [mockLogin, { loading: false }] as never;
      }
      return [mockAddToCart, { loading: false }] as never;
    });
  });

  it('returns handleLogin and loading state', () => {
    const { result } = renderHook(() => useCustomersLogin());
    expect(result.current.handleLogin).toBeTypeOf('function');
    expect(result.current.loginLoading).toBe(false);
  });

  it('sets auth user for a customer login', async () => {
    mockLogin.mockResolvedValue({
      data: {
        login: {
          id: '1',
          name: 'Cust',
          email: 'c@test.com',
          role: KickzoneGraphqlTypes.UserRole.Customer,
        },
      },
    });

    const { result } = renderHook(() => useCustomersLogin());
    await act(async () => {
      await result.current.handleLogin('c@test.com', 'secret');
    });

    expect(mockLogin).toHaveBeenCalledWith({
      variables: { email: 'c@test.com', password: 'secret' },
    });
    expect(mockSetAuthUser).toHaveBeenCalled();
  });

  it('rejects non-customer accounts', async () => {
    mockLogin.mockResolvedValue({
      data: {
        login: {
          id: '1',
          name: 'Admin',
          email: 'a@test.com',
          role: KickzoneGraphqlTypes.UserRole.Admin,
        },
      },
    });

    const { result } = renderHook(() => useCustomersLogin());
    await expect(
      act(async () => {
        await result.current.handleLogin('a@test.com', 'secret');
      })
    ).rejects.toThrow(/not a customer account/i);
    expect(mockSetAuthUser).not.toHaveBeenCalled();
  });

  it('syncs local cart items after successful login', async () => {
    mockUseCartItems.mockReturnValue([
      { sellerProductId: 'sp-1', quantity: 2 },
      { sellerProductId: 'sp-2', quantity: 1 },
    ]);
    mockLogin.mockResolvedValue({
      data: {
        login: {
          id: '1',
          name: 'Cust',
          email: 'c@test.com',
          role: KickzoneGraphqlTypes.UserRole.Customer,
        },
      },
    });
    mockAddToCart.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useCustomersLogin());
    await act(async () => {
      await result.current.handleLogin('c@test.com', 'secret');
    });

    expect(mockAddToCart).toHaveBeenCalledTimes(2);
    expect(mockAddToCart).toHaveBeenCalledWith({
      variables: {
        addToCartInput: { sellerProductId: 'sp-1', quantity: 2 },
      },
    });
  });
});
