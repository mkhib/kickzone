import { vi, describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAdminsOrders, useAdminsSellers } from './admins-orders-hook';
import { useQuery } from '@apollo/client/react';

// Mock Apollo Client
vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
}));

// Mock GraphQL queries
vi.mock('@kickzone-workspace/admins-graphql', () => ({
  GET_SELLERS_QUERY: 'GET_SELLERS_QUERY',
  GET_ALL_ORDERS_QUERY: 'GET_ALL_ORDERS_QUERY',
}));

describe('useAdminsOrders', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return orders data with default parameters', () => {
    const mockOrdersData = {
      orders: [
        {
          id: '1',
          status: 'PENDING',
          total: 100,
        },
      ],
    };

    vi.mocked(useQuery).mockReturnValue({
      data: mockOrdersData,
      loading: false,
      error: null,
      refetch: vi.fn(),
      fetchMore: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsOrders());

    expect(result.current.orders).toEqual(mockOrdersData.orders);
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
        sellerId: undefined,
        status: undefined,
      },
      fetchPolicy: 'cache-and-network',
    });
  });

  it('should use custom parameters when provided', () => {
    const customParams = {
      first: 20,
      after: 'cursor123',
      sellerId: 'seller1',
      status: 'COMPLETED' as any,
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
      orders: [{ id: '1' }, { id: '2' }],
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
        after: '2',
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

  it('should not call fetchMore when orders array is empty', () => {
    const mockFetchMore = vi.fn();
    const mockOrdersData = {
      orders: [],
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

    expect(mockFetchMore).not.toHaveBeenCalled();
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

    renderHook(() => useAdminsSellers());

    expect(useQuery).toHaveBeenCalledWith('GET_SELLERS_QUERY', {
      variables: { first: 100, after: undefined, filter: undefined },
      fetchPolicy: 'cache-and-network',
    });
  });

  it('should use custom parameters when provided', () => {
    const customParams = {
      first: 50,
      after: 'cursor123',
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

  it('should call fetchMore when loadMore is called with valid pageInfo', () => {
    const mockFetchMore = vi.fn();
    const mockSellersData = {
      sellers: {
        edges: [],
        pageInfo: {
          hasNextPage: true,
          endCursor: 'cursor123',
        },
        totalCount: 0,
      },
    };

    vi.mocked(useQuery).mockReturnValue({
      data: mockSellersData,
      loading: false,
      error: null,
      refetch: vi.fn(),
      fetchMore: mockFetchMore,
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsSellers());

    result.current.loadMore();

    expect(mockFetchMore).toHaveBeenCalledWith({
      variables: {
        after: 'cursor123',
      },
    });
  });

  it('should not call fetchMore when hasNextPage is false', () => {
    const mockFetchMore = vi.fn();
    const mockSellersData = {
      sellers: {
        edges: [],
        pageInfo: {
          hasNextPage: false,
          endCursor: 'cursor123',
        },
        totalCount: 0,
      },
    };

    vi.mocked(useQuery).mockReturnValue({
      data: mockSellersData,
      loading: false,
      error: null,
      refetch: vi.fn(),
      fetchMore: mockFetchMore,
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsSellers());

    result.current.loadMore();

    expect(mockFetchMore).not.toHaveBeenCalled();
  });

  it('should not call fetchMore when endCursor is missing', () => {
    const mockFetchMore = vi.fn();
    const mockSellersData = {
      sellers: {
        edges: [],
        pageInfo: {
          hasNextPage: true,
          endCursor: null,
        },
        totalCount: 0,
      },
    };

    vi.mocked(useQuery).mockReturnValue({
      data: mockSellersData,
      loading: false,
      error: null,
      refetch: vi.fn(),
      fetchMore: mockFetchMore,
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsSellers());

    result.current.loadMore();

    expect(mockFetchMore).not.toHaveBeenCalled();
  });
});
