import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import type { useSellerOrders as UseSellerOrdersFn } from './useSellerOrders';
import { UPDATE_ORDER_TRACKING_MUTATION, UPDATE_ORDER_MUTATION } from '@kickzone-workspace/sellers-graphql';

// Mock Apollo Client
const mockApolloUseQuery = vi.fn();
const mockApolloUseMutation = vi.fn();

vi.mock('@apollo/client/react', () => ({
  useQuery: (...args: unknown[]) => mockApolloUseQuery(...args),
  useMutation: (...args: unknown[]) => mockApolloUseMutation(...args),
}));

// Mock sellers-graphql exports
vi.mock('@kickzone-workspace/sellers-graphql', () => ({
  GET_MY_ORDERS_QUERY: 'GET_MY_ORDERS_QUERY_DOC',
  UPDATE_ORDER_STATUS_MUTATION: 'UPDATE_ORDER_STATUS_MUTATION_DOC',
  UPDATE_ORDER_MUTATION: 'UPDATE_ORDER_MUTATION_DOC',
  UPDATE_ORDER_TRACKING_MUTATION: 'UPDATE_ORDER_TRACKING_MUTATION_DOC',
  GET_ORDER_DETAILS_QUERY: 'GET_ORDER_DETAILS_QUERY_DOC',
}));

// Load the REAL hook after mocks are in place
const { useSellerOrders: realUseSellerOrders } = await vi.importActual<{
  useSellerOrders: typeof UseSellerOrdersFn;
}>('@kickzone-workspace/orders-hook');

describe('useSellerOrders - updateTrackingNumber', () => {
  const mockRefetch = vi.fn();
  const mockFetchMore = vi.fn();

  beforeEach(() => {
    mockApolloUseQuery.mockReset();
    mockApolloUseMutation.mockReset();
    mockRefetch.mockReset();
    mockFetchMore.mockReset();
  });

  it('calls UPDATE_ORDER_TRACKING_MUTATION with correct variables and returns updated order', async () => {
    const mockUpdateOrderTrackingMutate = vi.fn().mockResolvedValue({
      data: {
        updateOrderTracking: {
          id: 'order-1',
          trackingNumber: 'TRK1',
          updatedAt: '2024-01-15T10:30:00Z',
        },
      },
    });

    mockApolloUseMutation
      .mockReturnValueOnce([vi.fn(), { loading: false }]) // updateOrderStatus
      .mockReturnValueOnce([mockUpdateOrderTrackingMutate, { loading: false }]); // updateOrderTracking

    mockApolloUseQuery.mockReturnValue({
      data: { mySellerOrders: { edges: [], pageInfo: { hasNextPage: false, endCursor: null } } },
      loading: false,
      error: undefined,
      refetch: mockRefetch,
      fetchMore: mockFetchMore,
    });

    const { result } = renderHook(() => realUseSellerOrders({ first: 10, status: 'ALL' }));

    let returnedOrder: KickzoneGraphqlTypes.Order | undefined;

    await act(async () => {
      returnedOrder = await result.current.updateTrackingNumber('order-1', 'TRK1');
    });

    // Assert UPDATE_ORDER_TRACKING_MUTATION was called with correct variables
    expect(mockUpdateOrderTrackingMutate).toHaveBeenCalledWith({
      variables: { id: 'order-1', trackingNumber: 'TRK1' },
    });

    // Assert UPDATE_ORDER_MUTATION's mutate fn was NOT called
    // The second call to useMutation should be for UPDATE_ORDER_TRACKING_MUTATION
    const trackingMutationCall = mockApolloUseMutation.mock.calls[1];
    expect(trackingMutationCall[0]).toBe(UPDATE_ORDER_TRACKING_MUTATION);

    // The first call to useMutation should be for UPDATE_ORDER_STATUS_MUTATION
    const statusMutationCall = mockApolloUseMutation.mock.calls[0];
    expect(statusMutationCall[0]).toBe('UPDATE_ORDER_STATUS_MUTATION_DOC');

    // Verify the returned order
    expect(returnedOrder).toEqual({
      id: 'order-1',
      trackingNumber: 'TRK1',
      updatedAt: '2024-01-15T10:30:00Z',
    });

    // Assert hook result still exposes updateTrackingNumber and updateOrderLoading
    expect(typeof result.current.updateTrackingNumber).toBe('function');
    expect(typeof result.current.updateOrderLoading).toBe('boolean');
  });

  it('does not call UPDATE_ORDER_MUTATION when updateTrackingNumber is invoked', async () => {
    const mockUpdateOrderTrackingMutate = vi.fn().mockResolvedValue({
      data: {
        updateOrderTracking: {
          id: 'order-2',
          trackingNumber: 'TRK2',
          updatedAt: '2024-01-15T11:00:00Z',
        },
      },
    });

    mockApolloUseMutation
      .mockReturnValueOnce([vi.fn(), { loading: false }]) // updateOrderStatus
      .mockReturnValueOnce([mockUpdateOrderTrackingMutate, { loading: false }]); // updateOrderTracking

    mockApolloUseQuery.mockReturnValue({
      data: { mySellerOrders: { edges: [], pageInfo: { hasNextPage: false, endCursor: null } } },
      loading: false,
      error: undefined,
      refetch: mockRefetch,
      fetchMore: mockFetchMore,
    });

    const { result } = renderHook(() => realUseSellerOrders({ first: 10, status: 'ALL' }));

    await act(async () => {
      await result.current.updateTrackingNumber('order-2', 'TRK2');
    });

    // Verify UPDATE_ORDER_TRACKING_MUTATION was used (second useMutation call)
    expect(mockApolloUseMutation).toHaveBeenCalledTimes(2);
    expect(mockApolloUseMutation.mock.calls[1][0]).toBe(UPDATE_ORDER_TRACKING_MUTATION);

    // Verify UPDATE_ORDER_MUTATION was NOT used for tracking
    const allMutationDocs = mockApolloUseMutation.mock.calls.map((call) => call[0]);
    expect(allMutationDocs).not.toContain(UPDATE_ORDER_MUTATION);
    expect(allMutationDocs).not.toContain('UPDATE_ORDER_MUTATION_DOC');

    // Assert hook result still exposes updateTrackingNumber and updateOrderLoading
    expect(typeof result.current.updateTrackingNumber).toBe('function');
    expect(typeof result.current.updateOrderLoading).toBe('boolean');
  });
});