import { vi, describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAdminsCustomers } from './useAdminsCustomers';
import { useQuery } from '@apollo/client/react';

vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
}));

vi.mock('./adminsCustomers.graphql', () => ({
  GET_CUSTOMERS: 'GET_CUSTOMERS',
  CUSTOMER_FIELDS: 'CUSTOMER_FIELDS',
}));

describe('useAdminsCustomers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return customers data, loading state, error and refetch function', () => {
    const mockCustomersData = {
      customers: {
        edges: [
          {
            node: {
              id: '123',
              name: 'Alice',
              lastName: 'Smith',
              username: 'alicesmith',
              email: 'alice@example.com',
              role: 'CUSTOMER',
              customerProfile: {
                id: 'p1',
                phone: '1234567890',
                address: '123 Main St',
                city: 'Cityville',
              },
            },
            cursor: '123',
          },
        ],
        pageInfo: {
          hasNextPage: false,
          endCursor: '123',
        },
        totalCount: 1,
      },
    };

    const mockRefetch = vi.fn();

    vi.mocked(useQuery).mockReturnValue({
      data: mockCustomersData,
      loading: false,
      error: null,
      refetch: mockRefetch,
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsCustomers());

    expect(result.current.customers).toEqual(mockCustomersData.customers);
    expect(result.current.isLoadingCustomers).toBe(false);
    expect(result.current.customersError).toBe(null);
    expect(result.current.refetchCustomers).toBe(mockRefetch);

    expect(useQuery).toHaveBeenCalledWith('GET_CUSTOMERS', {
      variables: {
        first: 100,
        after: undefined,
        searchTerm: undefined,
      },
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    });
  });

  it('should pass options to variables when provided', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() =>
      useAdminsCustomers({ first: 25, after: 'cursor-1', searchTerm: 'alice' })
    );

    expect(result.current.isLoadingCustomers).toBe(true);
    expect(useQuery).toHaveBeenCalledWith('GET_CUSTOMERS', {
      variables: {
        first: 25,
        after: 'cursor-1',
        searchTerm: 'alice',
      },
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    });
  });

  it('should handle error state', () => {
    const mockError = new Error('Failed to load customers');
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      loading: false,
      error: mockError,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useQuery>);

    const { result } = renderHook(() => useAdminsCustomers());

    expect(result.current.customersError).toBe(mockError);
    expect(result.current.isLoadingCustomers).toBe(false);
  });
});
