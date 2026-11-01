import { vi, describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAdminsOrders, useAdminsSellers } from './admins-orders-hook';
import { useMutation, useQuery } from '@apollo/client/react';

// Mock Apollo Client
vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
}));

// Mock GraphQL queries
vi.mock('@kickzone-workspace/admins-graphql', () => ({
  GET_SELLERS_QUERY: 'GET_SELLERS_QUERY',
  GET_ALL_ORDERS_QUERY: 'GET_ALL_ORDERS_QUERY',
  UPDATE_ORDER_STATUS_MUTATION: 'UPDATE_ORDER_STATUS_MUTATION',
}));

describe('useAdminsOrders', () => {
  const mockUpdateOrderStatusMutation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useMutation).mockReturnValue([
      mockUpdateOrderStatusMutation,
      { loading: false },
    ] as unknown as ReturnType<typeof useMutation>);
  });

  it('should return orders data with default parameters', () => {
    const mockOrdersData = {
      allSellerOrders: {
        edges: [
          {
            node: {
              id: '1',
              status: 'PENDING',
              total: 100,
            },
          },
        ],
        pageInfo: {
          endCursor: 'cursor123',
        },
      },
    };

    vi.mocked(useQuery).mockReturnValue({
      data: mockOrdersData,
      loading: false,
      error: null,
      refetch: vi.fn(),
      fetchMore: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsOrders());

    expect(result.current.orders).toEqual([
      mockOrdersData.allSellerOrders.edges[0].node,
    ]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.refetch).toBeDefined();
    expect(result.current.loadMore).toBeDefined();
  });

  it('should use default parameters when none provided', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: vi.fn(),
      fetchMore: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    renderHook(() => useAdminsOrders());

    expect(useQuery).toHaveBeenCalledWith('GET_ALL_ORDERS_QUERY', {
      variables: {
        first: 10,
        after: undefined,
        status: undefined,
      },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    });
  });

  it('should use custom parameters when provided', () => {
    const customParams = {
      first: 20,
      after: 'cursor123',
      status: 'COMPLETED' as unknown as NonNullable<Parameters<typeof useAdminsOrders>[0]>['status'],
    };

    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: vi.fn(),
      fetchMore: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    renderHook(() => useAdminsOrders(customParams));

    expect(useQuery).toHaveBeenCalledWith('GET_ALL_ORDERS_QUERY', {
      variables: customParams,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    });
  });

  it('should handle loading state', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: vi.fn(),
      fetchMore: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsOrders());

    expect(result.current.loading).toBe(true);
  });

  it('should handle error state', () => {
    const mockError = new Error('Query failed');
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: false,
      error: mockError,
      refetch: vi.fn(),
      fetchMore: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsOrders());

    expect(result.current.error).toBe(mockError);
  });

  it('should return empty array when no orders data', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: vi.fn(),
      fetchMore: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsOrders());

    expect(result.current.orders).toEqual([]);
  });

  it('should call fetchMore when loadMore is called with valid data', () => {
    const mockFetchMore = vi.fn();
    const mockOrdersData = {
      allSellerOrders: {
        edges: [{ node: { id: '1' } }, { node: { id: '2' } }],
        pageInfo: {
          endCursor: 'cursor-2',
        },
      },
    };

    vi.mocked(useQuery).mockReturnValue({
      data: mockOrdersData,
      loading: false,
      error: null,
      refetch: vi.fn(),
      fetchMore: mockFetchMore,
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsOrders());

    result.current.loadMore();

    expect(mockFetchMore).toHaveBeenCalledWith({
      variables: {
        after: 'cursor-2',
      },
    });
  });

  it('should not call fetchMore when no orders data', () => {
    const mockFetchMore = vi.fn();

    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: vi.fn(),
      fetchMore: mockFetchMore,
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsOrders());

    result.current.loadMore();

    expect(mockFetchMore).not.toHaveBeenCalled();
  });

  it('should call updateOrderStatus mutation with expected variables', async () => {
    mockUpdateOrderStatusMutation.mockResolvedValue({
      data: {
        updateOrderStatus: { id: '1', status: 'COMPLETED' },
      },
    });
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: vi.fn(),
      fetchMore: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsOrders());

    await act(async () => {
      await result.current.updateOrderStatus('1', 'COMPLETED' as unknown as Parameters<ReturnType<typeof useAdminsOrders>['updateOrderStatus']>[1]);
    });

    expect(mockUpdateOrderStatusMutation).toHaveBeenCalledWith({
      variables: {
        updateOrderStatusInput: {
          id: '1',
          status: 'COMPLETED',
        },
      },
    });
    expect(useMutation).toHaveBeenCalledWith('UPDATE_ORDER_STATUS_MUTATION', {
      refetchQueries: [
        {
          query: 'GET_ALL_ORDERS_QUERY',
          variables: {
            first: 10,
            after: undefined,
            status: undefined,
          },
        },
      ],
    });
  });
});

describe('useAdminsSellers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return sellers data with default parameters', () => {
    const mockSellersData = {
      sellers: {
        edges: [
          {
            node: {
              id: '1',
              user: { name: 'John', lastName: 'Doe' },
              storeName: 'Test Store',
            },
          },
        ],
        pageInfo: {
          hasNextPage: true,
          endCursor: 'cursor123',
        },
        totalCount: 1,
      },
    };

    vi.mocked(useQuery).mockReturnValue({
      data: mockSellersData,
      loading: false,
      error: null,
      refetch: vi.fn(),
      fetchMore: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsSellers());

    expect(result.current.sellers).toEqual([
      mockSellersData.sellers.edges[0].node,
    ]);
    expect(result.current.pageInfo).toEqual(mockSellersData.sellers.pageInfo);
    expect(result.current.totalCount).toBe(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.refetch).toBeDefined();
  });

  it('should use default parameters when none provided', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: vi.fn(),
      fetchMore: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    renderHook(() => useAdminsSellers());

    expect(useQuery).toHaveBeenCalledWith('GET_SELLERS_QUERY', {
      variables: { filter: undefined },
      fetchPolicy: 'cache-and-network',
    });
  });

  it('should use custom parameters when provided', () => {
    const customParams = {
      filter: { isActive: true },
    };

    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: vi.fn(),
      fetchMore: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    renderHook(() => useAdminsSellers(customParams));

    expect(useQuery).toHaveBeenCalledWith('GET_SELLERS_QUERY', {
      variables: customParams,
      fetchPolicy: 'cache-and-network',
    });
  });

  it('should handle loading state', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: vi.fn(),
      fetchMore: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsSellers());

    expect(result.current.loading).toBe(true);
  });

  it('should handle error state', () => {
    const mockError = new Error('Query failed');
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: false,
      error: mockError,
      refetch: vi.fn(),
      fetchMore: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsSellers());

    expect(result.current.error).toBe(mockError);
  });

  it('should return empty array and zero count when no sellers data', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: vi.fn(),
      fetchMore: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsSellers());

    expect(result.current.sellers).toEqual([]);
    expect(result.current.totalCount).toBe(0);
  });
});
