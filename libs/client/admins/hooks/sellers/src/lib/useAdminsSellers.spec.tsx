import { vi, describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAdminsSellersQuery, useAdminsSellers } from './useAdminsSellers';
import { useQuery, useMutation } from '@apollo/client/react';

// Mock Apollo Client
vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
}));

// Mock GraphQL queries
vi.mock('./adminsSellers.graphql', () => ({
  GET_SELLERS: 'GET_SELLERS',
  CREATE_SELLER: 'CREATE_SELLER',
  UPDATE_SELLER: 'UPDATE_SELLER',
  TOGGLE_SELLER_ACTIVE: 'TOGGLE_SELLER_ACTIVE',
  INITIATE_SELLER_PASSWORD_SETUP: 'INITIATE_SELLER_PASSWORD_SETUP',
}));

const mockMutationResult = (fn: unknown) =>
  [fn, { loading: false }] as unknown as ReturnType<typeof useMutation>;

describe('useAdminsSellersQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return sellers data and loading state', () => {
    const mockSellersData = {
      sellers: {
        edges: [
          {
            node: {
              id: 1,
              user: { name: 'John', lastName: 'Doe' },
              storeName: 'Test Store',
              isActive: true,
            },
          },
        ],
      },
    };

    vi.mocked(useQuery).mockReturnValue({
      data: mockSellersData,
      loading: false,
      error: null,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsSellersQuery());

    expect(result.current.sellers).toEqual(mockSellersData.sellers);
    expect(result.current.isLoadingSellers).toBe(false);
    expect(result.current.sellersError).toBe(null);
    expect(result.current.refetchSellers).toBeDefined();
  });

  it('should use default filter when no filter provided', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    renderHook(() => useAdminsSellersQuery());

    expect(useQuery).toHaveBeenCalledWith('GET_SELLERS', {
      variables: { filter: { isActive: true } },
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    });
  });

  it('should use custom filter when provided', () => {
    const customFilter = { isActive: false };
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    renderHook(() => useAdminsSellersQuery(customFilter));

    expect(useQuery).toHaveBeenCalledWith('GET_SELLERS', {
      variables: { filter: customFilter },
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    });
  });

  it('should handle loading state', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsSellersQuery());

    expect(result.current.isLoadingSellers).toBe(true);
  });

  it('should handle error state', () => {
    const mockError = new Error('Query failed');
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: false,
      error: mockError,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsSellersQuery());

    expect(result.current.sellersError).toBe(mockError);
  });
});

describe('useAdminsSellers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return mutation functions', () => {
    const mockCreateSeller = vi.fn();
    const mockUpdateSeller = vi.fn();
    const mockToggleSellerActive = vi.fn();
    const mockInitiatePasswordSetup = vi.fn();

    vi.mocked(useMutation)
      .mockReturnValueOnce(mockMutationResult(mockCreateSeller))
      .mockReturnValueOnce(mockMutationResult(mockUpdateSeller))
      .mockReturnValueOnce(mockMutationResult(mockToggleSellerActive))
      .mockReturnValueOnce(mockMutationResult(mockInitiatePasswordSetup));

    const { result } = renderHook(() => useAdminsSellers());

    expect(result.current.createSeller).toBe(mockCreateSeller);
    expect(result.current.updateSeller).toBe(mockUpdateSeller);
    expect(result.current.toggleSellerActive).toBe(mockToggleSellerActive);
    expect(result.current.isCreatingSeller).toBe(false);
    expect(result.current.isUpdatingSeller).toBe(false);
    expect(result.current.isTogglingSellerActive).toBe(false);
  });

  it('should configure mutations with refetch queries', () => {
    const mockCreateSeller = vi.fn();
    const mockUpdateSeller = vi.fn();
    const mockToggleSellerActive = vi.fn();
    const mockInitiatePasswordSetup = vi.fn();

    vi.mocked(useMutation)
      .mockReturnValueOnce(mockMutationResult(mockCreateSeller))
      .mockReturnValueOnce(mockMutationResult(mockUpdateSeller))
      .mockReturnValueOnce(mockMutationResult(mockToggleSellerActive))
      .mockReturnValueOnce(mockMutationResult(mockInitiatePasswordSetup));

    renderHook(() => useAdminsSellers());

    expect(useMutation).toHaveBeenCalledWith('CREATE_SELLER', {
      refetchQueries: [
        {
          query: 'GET_SELLERS',
          variables: { filter: { isActive: true } },
        },
      ],
    });

    expect(useMutation).toHaveBeenCalledWith('UPDATE_SELLER', {
      refetchQueries: [
        {
          query: 'GET_SELLERS',
          variables: { filter: { isActive: true } },
        },
      ],
    });

    expect(useMutation).toHaveBeenCalledWith('TOGGLE_SELLER_ACTIVE', {
      refetchQueries: [
        {
          query: 'GET_SELLERS',
          variables: { filter: { isActive: true } },
        },
      ],
    });
  });

  it('should use custom filter for refetch queries', () => {
    const customFilter = { isActive: false };
    const mockCreateSeller = vi.fn();
    const mockUpdateSeller = vi.fn();
    const mockToggleSellerActive = vi.fn();
    const mockInitiatePasswordSetup = vi.fn();

    vi.mocked(useMutation)
      .mockReturnValueOnce(mockMutationResult(mockCreateSeller))
      .mockReturnValueOnce(mockMutationResult(mockUpdateSeller))
      .mockReturnValueOnce(mockMutationResult(mockToggleSellerActive))
      .mockReturnValueOnce(mockMutationResult(mockInitiatePasswordSetup));

    renderHook(() => useAdminsSellers(customFilter));

    expect(useMutation).toHaveBeenCalledWith('CREATE_SELLER', {
      refetchQueries: [
        {
          query: 'GET_SELLERS',
          variables: { filter: customFilter },
        },
      ],
    });
  });
});
