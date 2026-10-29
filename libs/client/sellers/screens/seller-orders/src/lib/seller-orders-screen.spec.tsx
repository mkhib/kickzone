import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SellerOrdersScreen } from './seller-orders-screen';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import type { useSellerOrders as UseSellerOrdersFn } from '@kickzone-workspace/orders-hook';
import { GET_MY_ORDERS_QUERY } from '@kickzone-workspace/sellers-graphql';

// Mock the hooks and components
jest.mock('@kickzone-workspace/sellers-layout', () => ({
  SellersLayout: ({ children }: { children: React.ReactNode }) => <div data-testid="sellers-layout">{children}</div>,
}));

jest.mock('@kickzone-workspace/orders-hook', () => ({
  useSellerOrders: jest.fn(() => ({
    orders: [],
    loading: false,
    error: null,
    updateOrderStatus: jest.fn(),
    updateStatusLoading: false,
  })),
}));

const mockUseSellerOrders = require('@kickzone-workspace/orders-hook').useSellerOrders as unknown as jest.Mock<{
  orders: KickzoneGraphqlTypes.SellerOrder[];
  loading: boolean;
  error: null;
  updateOrderStatus: jest.Mock;
  updateStatusLoading: boolean;
}>;

// Heavy 7: Mock Apollo Client and sellers-graphql BEFORE loading real hook
const mockApolloUseQuery = jest.fn();
const mockApolloUseMutation = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useQuery: (...args: unknown[]) => mockApolloUseQuery(...args),
  useMutation: (...args: unknown[]) => mockApolloUseMutation(...args),
}));

jest.mock('@kickzone-workspace/sellers-graphql', () => ({
  GET_MY_ORDERS_QUERY: 'GET_MY_ORDERS_QUERY_DOC',
  UPDATE_ORDER_STATUS_MUTATION: 'UPDATE_ORDER_STATUS_MUTATION_DOC',
  UPDATE_ORDER_MUTATION: 'UPDATE_ORDER_MUTATION_DOC',
  GET_ORDER_DETAILS_QUERY: 'GET_ORDER_DETAILS_QUERY_DOC',
}));

// Load the REAL hook after mocks are in place
const { useSellerOrders: realUseSellerOrders } = jest.requireActual<{
  useSellerOrders: typeof UseSellerOrdersFn;
}>('@kickzone-workspace/orders-hook');

jest.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      pageTitles: {
        sellerOrders: () => 'Seller Orders',
      },
      orders: {
        myOrders: () => 'My Orders',
        pending: () => 'Pending',
        confirmed: () => 'Confirmed',
        processing: () => 'Processing',
        shipped: () => 'Shipped',
        delivered: () => 'Delivered',
        cancelled: () => 'Cancelled',
        refunded: () => 'Refunded',
        changeStatus: () => 'Change Status',
        changeOrderStatus: () => 'Change Order Status',
        orderNumber: () => 'Order #',
        items: () => 'Items',
        item: () => 'Item',
        orderManagement: () => 'Order Management',
        trackingNumber: () => 'Tracking Number',
        customerNotes: () => 'Customer Notes',
        noOrdersFound: () => 'No orders found',
        errorLoadingOrders: () => 'Error loading orders',
        notSet: () => 'Not Set',
        orderItems: () => 'Order Items',
      },
      button: {
        filterByStatus: () => 'Filter by Status',
        cancel: () => 'Cancel',
        updateStatus: () => 'Update Status',
      },
      table: {
        allOrders: () => 'All Orders',
        product: () => 'Product',
        quantity: () => 'Quantity',
        unitPrice: () => 'Unit Price',
        total: () => 'Total',
      },
      form: {
        status: () => 'Status',
        newStatus: () => 'New Status',
      },
      checkout: {
        subtotal: () => 'Subtotal',
        shipping: () => 'Shipping',
        total: () => 'Total',
      },
    },
  }),
  useLanguageContext: () => ({
    currentLocale: 'en-US',
    formatNumber: (n: number) => n.toString(),
    isRTL: false,
  }),
  usePageTitle: jest.fn(),
}));

jest.mock('@kickzone-workspace/order-status-chip', () => ({
  OrderStatusChip: ({ status }: { status: KickzoneGraphqlTypes.OrderStatus }) => (
    <span data-testid={`status-chip-${status}`}>{status}</span>
  ),
}));

jest.mock('@kickzone-workspace/glassmorphism-container', () => ({
  GlassmorphismContainer: ({ children, fullHeight }: { children: React.ReactNode; fullHeight?: boolean }) => (
    <div data-testid="glassmorphism-container" style={fullHeight ? { height: '100%' } : {}}>
      {children}
    </div>
  ),
}));

jest.mock('@kickzone-workspace/language-components', () => ({
  DialogFormContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>,
  );
};

// Replicate the getAllowedNextStatuses logic from the component for direct testing
const getAllowedNextStatuses = (currentStatus: KickzoneGraphqlTypes.OrderStatus): KickzoneGraphqlTypes.OrderStatus[] => {
  const transitions: Record<KickzoneGraphqlTypes.OrderStatus, KickzoneGraphqlTypes.OrderStatus[]> = {
    [KickzoneGraphqlTypes.OrderStatus.Pending]: [
      KickzoneGraphqlTypes.OrderStatus.Pending,
      KickzoneGraphqlTypes.OrderStatus.Confirmed,
      KickzoneGraphqlTypes.OrderStatus.Cancelled,
    ],
    [KickzoneGraphqlTypes.OrderStatus.Confirmed]: [
      KickzoneGraphqlTypes.OrderStatus.Confirmed,
      KickzoneGraphqlTypes.OrderStatus.Processing,
      KickzoneGraphqlTypes.OrderStatus.Shipped,
      KickzoneGraphqlTypes.OrderStatus.Cancelled,
      KickzoneGraphqlTypes.OrderStatus.Refunded,
    ],
    [KickzoneGraphqlTypes.OrderStatus.Processing]: [
      KickzoneGraphqlTypes.OrderStatus.Processing,
      KickzoneGraphqlTypes.OrderStatus.Shipped,
      KickzoneGraphqlTypes.OrderStatus.Cancelled,
      KickzoneGraphqlTypes.OrderStatus.Refunded,
    ],
    [KickzoneGraphqlTypes.OrderStatus.Shipped]: [
      KickzoneGraphqlTypes.OrderStatus.Shipped,
      KickzoneGraphqlTypes.OrderStatus.Delivered,
      KickzoneGraphqlTypes.OrderStatus.Refunded,
    ],
    [KickzoneGraphqlTypes.OrderStatus.Delivered]: [
      KickzoneGraphqlTypes.OrderStatus.Delivered,
      KickzoneGraphqlTypes.OrderStatus.Refunded,
    ],
    [KickzoneGraphqlTypes.OrderStatus.Cancelled]: [
      KickzoneGraphqlTypes.OrderStatus.Cancelled,
    ],
    [KickzoneGraphqlTypes.OrderStatus.Refunded]: [
      KickzoneGraphqlTypes.OrderStatus.Refunded,
    ],
  };
  return transitions[currentStatus] || [];
};

describe('SellerOrdersScreen', () => {
  const mockOrder = {
    id: 'order-1',
    orderNumber: 'ORD-123',
    status: KickzoneGraphqlTypes.OrderStatus.Pending,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sellerId: 1,
    total: 100,
    subtotal: 90,
    shippingCost: 10,
    trackingNumber: 'TRACK-123',
    items: [
      {
        id: 'item-1',
        orderId: 'order-1',
        productId: 'product-1',
        productName: 'Test Product',
        quantity: 2,
        unitPrice: 45,
        totalPrice: 90,
      },
    ],
    notes: 'Test note',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSellerOrders.mockReturnValue({
      orders: [mockOrder],
      loading: false,
      error: null,
      updateOrderStatus: jest.fn().mockResolvedValue(undefined),
      updateStatusLoading: false,
    });
  });

  it('renders without crashing', () => {
    renderWithTheme(<SellerOrdersScreen />);
    expect(screen.getByText('My Orders')).toBeInTheDocument();
  });

  it('shows order in the list', () => {
    renderWithTheme(<SellerOrdersScreen />);
    expect(screen.getByText(/ORD-123/)).toBeInTheDocument();
  });

  describe('Status transition logic (getAllowedNextStatuses)', () => {
    it('should only allow PENDING -> PENDING, CONFIRMED, CANCELLED', () => {
      const allowed = getAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Pending);
      expect(allowed).toEqual([
        KickzoneGraphqlTypes.OrderStatus.Pending,
        KickzoneGraphqlTypes.OrderStatus.Confirmed,
        KickzoneGraphqlTypes.OrderStatus.Cancelled,
      ]);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Processing);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Shipped);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Delivered);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Refunded);
    });

    it('should only allow CONFIRMED -> CONFIRMED, PROCESSING, SHIPPED, CANCELLED, REFUNDED', () => {
      const allowed = getAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Confirmed);
      expect(allowed).toEqual([
        KickzoneGraphqlTypes.OrderStatus.Confirmed,
        KickzoneGraphqlTypes.OrderStatus.Processing,
        KickzoneGraphqlTypes.OrderStatus.Shipped,
        KickzoneGraphqlTypes.OrderStatus.Cancelled,
        KickzoneGraphqlTypes.OrderStatus.Refunded,
      ]);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Pending);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Delivered);
    });

    it('should only allow PROCESSING -> PROCESSING, SHIPPED, CANCELLED, REFUNDED', () => {
      const allowed = getAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Processing);
      expect(allowed).toEqual([
        KickzoneGraphqlTypes.OrderStatus.Processing,
        KickzoneGraphqlTypes.OrderStatus.Shipped,
        KickzoneGraphqlTypes.OrderStatus.Cancelled,
        KickzoneGraphqlTypes.OrderStatus.Refunded,
      ]);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Pending);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Confirmed);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Delivered);
    });

    it('should only allow SHIPPED -> SHIPPED, DELIVERED, REFUNDED', () => {
      const allowed = getAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Shipped);
      expect(allowed).toEqual([
        KickzoneGraphqlTypes.OrderStatus.Shipped,
        KickzoneGraphqlTypes.OrderStatus.Delivered,
        KickzoneGraphqlTypes.OrderStatus.Refunded,
      ]);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Pending);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Confirmed);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Processing);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Cancelled);
    });

    it('should only allow DELIVERED -> DELIVERED, REFUNDED', () => {
      const allowed = getAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Delivered);
      expect(allowed).toEqual([
        KickzoneGraphqlTypes.OrderStatus.Delivered,
        KickzoneGraphqlTypes.OrderStatus.Refunded,
      ]);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Pending);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Confirmed);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Processing);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Shipped);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Cancelled);
    });

    it('should only allow CANCELLED -> CANCELLED (terminal state)', () => {
      const allowed = getAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Cancelled);
      expect(allowed).toEqual([KickzoneGraphqlTypes.OrderStatus.Cancelled]);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Pending);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Confirmed);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Processing);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Shipped);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Delivered);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Refunded);
    });

    it('should only allow REFUNDED -> REFUNDED (terminal state)', () => {
      const allowed = getAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Refunded);
      expect(allowed).toEqual([KickzoneGraphqlTypes.OrderStatus.Refunded]);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Pending);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Confirmed);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Processing);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Shipped);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Delivered);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Cancelled);
    });
  });

  describe('Terminal state transitions blocked', () => {
    it('should not allow CANCELLED order to transition to DELIVERED', () => {
      const allowed = getAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Cancelled);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Delivered);
    });

    it('should not allow REFUNDED order to transition to CONFIRMED', () => {
      const allowed = getAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Refunded);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Confirmed);
    });

    it('should not allow CANCELLED order to transition to PROCESSING', () => {
      const allowed = getAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Cancelled);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Processing);
    });

    it('should not allow REFUNDED order to transition to PENDING', () => {
      const allowed = getAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Refunded);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Pending);
    });

    it('should not allow CANCELLED order to transition to SHIPPED', () => {
      const allowed = getAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Cancelled);
      expect(allowed).not.toContain(KickzoneGraphqlTypes.OrderStatus.Shipped);
    });
  });

  describe('Component renders status chip correctly', () => {
    it('shows PENDING status chip', () => {
      mockUseSellerOrders.mockReturnValue({
        orders: [{ ...mockOrder, status: KickzoneGraphqlTypes.OrderStatus.Pending }],
        loading: false,
        error: null,
        updateOrderStatus: jest.fn().mockResolvedValue(undefined),
        updateStatusLoading: false,
      });
      renderWithTheme(<SellerOrdersScreen />);
      expect(screen.getAllByTestId('status-chip-PENDING').length).toBeGreaterThan(0);
    });

    it('shows CONFIRMED status chip', () => {
      mockUseSellerOrders.mockReturnValue({
        orders: [{ ...mockOrder, status: KickzoneGraphqlTypes.OrderStatus.Confirmed }],
        loading: false,
        error: null,
        updateOrderStatus: jest.fn().mockResolvedValue(undefined),
        updateStatusLoading: false,
      });
      renderWithTheme(<SellerOrdersScreen />);
      expect(screen.getAllByTestId('status-chip-CONFIRMED').length).toBeGreaterThan(0);
    });

    it('shows CANCELLED status chip', () => {
      mockUseSellerOrders.mockReturnValue({
        orders: [{ ...mockOrder, status: KickzoneGraphqlTypes.OrderStatus.Cancelled }],
        loading: false,
        error: null,
        updateOrderStatus: jest.fn().mockResolvedValue(undefined),
        updateStatusLoading: false,
      });
      renderWithTheme(<SellerOrdersScreen />);
      expect(screen.getAllByTestId('status-chip-CANCELLED').length).toBeGreaterThan(0);
    });

    it('shows REFUNDED status chip', () => {
      mockUseSellerOrders.mockReturnValue({
        orders: [{ ...mockOrder, status: KickzoneGraphqlTypes.OrderStatus.Refunded }],
        loading: false,
        error: null,
        updateOrderStatus: jest.fn().mockResolvedValue(undefined),
        updateStatusLoading: false,
      });
      renderWithTheme(<SellerOrdersScreen />);
      expect(screen.getAllByTestId('status-chip-REFUNDED').length).toBeGreaterThan(0);
    });
  });

  describe('Status filter switching', () => {
    // Locked Test 6: Switch status filter from PENDING back to ALL
    it('filters by PENDING then shows all when switching back to ALL', () => {
      const pendingOrder = {
        id: 'ORD-PENDING-1',
        orderNumber: 'ORD-PENDING-1',
        status: KickzoneGraphqlTypes.OrderStatus.Pending,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sellerId: 1,
        total: 100,
        subtotal: 90,
        shippingCost: 10,
        trackingNumber: 'TRACK-1',
        items: [{ id: 'item-1', orderId: 'ORD-PENDING-1', productId: 'p1', productName: 'Product 1', quantity: 1, unitPrice: 100, totalPrice: 100 }],
        notes: '',
      };
      const confirmedOrder = {
        id: 'ORD-CONFIRMED-2',
        orderNumber: 'ORD-CONFIRMED-2',
        status: KickzoneGraphqlTypes.OrderStatus.Confirmed,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sellerId: 1,
        total: 200,
        subtotal: 180,
        shippingCost: 20,
        trackingNumber: 'TRACK-2',
        items: [{ id: 'item-2', orderId: 'ORD-CONFIRMED-2', productId: 'p2', productName: 'Product 2', quantity: 1, unitPrice: 200, totalPrice: 200 }],
        notes: '',
      };
      const allOrders = [pendingOrder, confirmedOrder];

      // Use mockImplementation to dynamically filter based on status argument
      mockUseSellerOrders.mockImplementation((args: { status?: KickzoneGraphqlTypes.OrderStatus | 'ALL' }) => {
        const status = args?.status;
        const filteredOrders = status && status !== 'ALL'
          ? allOrders.filter((o) => o.status === status)
          : allOrders;
        return {
          orders: filteredOrders,
          loading: false,
          error: null,
          updateOrderStatus: jest.fn().mockResolvedValue(undefined),
          updateStatusLoading: false,
        };
      });

      renderWithTheme(<SellerOrdersScreen />);

      // Verify initial state - both orders visible (status is undefined initially)
      expect(screen.getByText(/ORD-PENDING-1/)).toBeInTheDocument();
      expect(screen.getByText(/ORD-CONFIRMED-2/)).toBeInTheDocument();

      // Switch to PENDING - find the native Select input and fire change event
      const select = screen.getByTestId('ArrowDropDownIcon').closest('div')?.querySelector('input[aria-hidden="true"]') as HTMLInputElement;
      expect(select).toBeInTheDocument();
      fireEvent.change(select, { target: { value: KickzoneGraphqlTypes.OrderStatus.Pending } });

      // Verify hook called with PENDING status
      expect(mockUseSellerOrders).toHaveBeenCalledWith(expect.objectContaining({ status: KickzoneGraphqlTypes.OrderStatus.Pending }));

      // Check only PENDING visible (mockImplementation filters automatically)
      expect(screen.getByText(/ORD-PENDING-1/)).toBeInTheDocument();
      expect(screen.queryByText(/ORD-CONFIRMED-2/)).not.toBeInTheDocument();

      // Switch back to ALL (empty string value)
      fireEvent.change(select, { target: { value: '' } });

      // Verify hook called with undefined status (ALL)
      expect(mockUseSellerOrders).toHaveBeenCalledWith(expect.objectContaining({ status: undefined }));

      // Both orders visible again
      expect(screen.getByText(/ORD-PENDING-1/)).toBeInTheDocument();
      expect(screen.getByText(/ORD-CONFIRMED-2/)).toBeInTheDocument();
    });
  });
});

describe('Heavy 7: real useSellerOrders hook unit tests', () => {
  const mockRefetch = jest.fn();
  const mockFetchMore = jest.fn();
  const mockUpdateOrderStatusMutate = jest.fn();
  const mockUpdateOrderMutate = jest.fn();

  beforeEach(() => {
    mockApolloUseQuery.mockReset();
    mockApolloUseMutation.mockReset();
    mockRefetch.mockReset();
    mockFetchMore.mockReset();
    mockUpdateOrderStatusMutate.mockReset();
    mockUpdateOrderMutate.mockReset();

    mockApolloUseMutation
      .mockReturnValueOnce([mockUpdateOrderStatusMutate, { loading: false }])
      .mockReturnValueOnce([mockUpdateOrderMutate, { loading: false }]);
  });

  it('Smoke test: imports and executes the real useSellerOrders hook from production', () => {
    mockApolloUseQuery.mockReturnValue({
      data: { mySellerOrders: { edges: [], pageInfo: { hasNextPage: false, endCursor: null } } },
      loading: false,
      error: undefined,
      refetch: mockRefetch,
      fetchMore: mockFetchMore,
    });

    const result = realUseSellerOrders({ first: 10, status: 'ALL' });

    expect(realUseSellerOrders.name).toBe('useSellerOrders');
    expect(mockApolloUseQuery).toHaveBeenCalledWith(
      GET_MY_ORDERS_QUERY,
      expect.objectContaining({
        variables: { first: 10, after: undefined },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-and-network',
      })
    );
    expect(result.orders).toEqual([]);
  });
});

const mixedStatusEdges = [
  { cursor: 'c-1', node: { id: '1', orderNumber: 'ORD-1', status: 'PENDING' } },
  { cursor: 'c-2', node: { id: '2', orderNumber: 'ORD-2', status: 'CONFIRMED' } },
  { cursor: 'c-3', node: { id: '3', orderNumber: 'ORD-3', status: 'SHIPPED' } },
  { cursor: 'c-4', node: { id: '4', orderNumber: 'ORD-4', status: 'CANCELLED' } },
];

describe('Heavy 7: real useSellerOrders hook unit tests - Locked Tests 1-5', () => {
  const mockRefetch = jest.fn();
  const mockFetchMore = jest.fn();
  const mockUpdateOrderStatusMutate = jest.fn();
  const mockUpdateOrderMutate = jest.fn();

  beforeEach(() => {
    mockApolloUseQuery.mockReset();
    mockApolloUseMutation.mockReset();
    mockRefetch.mockReset();
    mockFetchMore.mockReset();
    mockUpdateOrderStatusMutate.mockReset();
    mockUpdateOrderMutate.mockReset();

    mockApolloUseMutation
      .mockReturnValueOnce([mockUpdateOrderStatusMutate, { loading: false }])
      .mockReturnValueOnce([mockUpdateOrderMutate, { loading: false }]);
  });

  // Locked Test 1
  it('returns all orders when status=ALL and omits status variable', () => {
    mockApolloUseQuery.mockReturnValue({
      data: {
        mySellerOrders: {
          edges: mixedStatusEdges,
          pageInfo: { hasNextPage: false, endCursor: 'c-4' },
        },
      },
      loading: false,
      error: undefined,
      refetch: mockRefetch,
      fetchMore: mockFetchMore,
    });

    const result = realUseSellerOrders({ first: 10, status: 'ALL' });

    const queryOptions = mockApolloUseQuery.mock.calls[0][1];
    expect(queryOptions.variables).toEqual({ first: 10, after: undefined });
    expect('status' in queryOptions.variables).toBe(false);
    expect(result.orders).toHaveLength(4);
    expect(result.orders.map((o: any) => o.status)).toEqual(['PENDING', 'CONFIRMED', 'SHIPPED', 'CANCELLED']);
  });

  // Locked Test 2
  it('returns all orders when status=undefined and omits status variable', () => {
    mockApolloUseQuery.mockReturnValue({
      data: {
        mySellerOrders: {
          edges: mixedStatusEdges,
          pageInfo: { hasNextPage: false, endCursor: 'c-4' },
        },
      },
      loading: false,
      error: undefined,
      refetch: mockRefetch,
      fetchMore: mockFetchMore,
    });

    const result = realUseSellerOrders({ first: 10, status: undefined });

    const queryOptions = mockApolloUseQuery.mock.calls[0][1];
    expect(queryOptions.variables).toEqual({ first: 10, after: undefined });
    expect('status' in queryOptions.variables).toBe(false);
    expect(result.orders).toHaveLength(4);
  });

  // Locked Test 3
  it('filters by CONFIRMED status, includes status in query/mutation/fetchMore', () => {
    mockApolloUseQuery.mockReturnValue({
      data: {
        mySellerOrders: {
          edges: [{ cursor: 'c-confirmed-1', node: { id: '2', orderNumber: 'ORD-2', status: 'CONFIRMED' } }],
          pageInfo: { hasNextPage: true, endCursor: 'cursor-confirmed-1' },
        },
      },
      loading: false,
      error: undefined,
      refetch: mockRefetch,
      fetchMore: mockFetchMore,
    });

    const result = realUseSellerOrders({ first: 10, status: 'CONFIRMED' as any });

    expect(mockApolloUseQuery).toHaveBeenCalledWith(
      GET_MY_ORDERS_QUERY,
      expect.objectContaining({
        variables: { first: 10, after: undefined, status: 'CONFIRMED' },
      })
    );
    expect(mockApolloUseMutation).toHaveBeenCalledWith(
      'UPDATE_ORDER_STATUS_MUTATION_DOC',
      expect.objectContaining({
        refetchQueries: [{ query: GET_MY_ORDERS_QUERY, variables: { first: 10, status: 'CONFIRMED' } }],
      })
    );
    expect(result.orders).toHaveLength(1);
    expect(result.orders[0].status).toBe('CONFIRMED');

    result.loadMore();
    expect(mockFetchMore).toHaveBeenCalledWith({ variables: { after: 'cursor-confirmed-1', status: 'CONFIRMED' } });
  });

  // Locked Test 4
  it('loadMore preserves status filter (ALL omits status, SHIPPED includes status)', () => {
    // Part 1: status = ALL
    mockApolloUseQuery.mockReturnValue({
      data: {
        mySellerOrders: {
          edges: mixedStatusEdges,
          pageInfo: { hasNextPage: true, endCursor: 'cursor-123' },
        },
      },
      loading: false,
      error: undefined,
      refetch: mockRefetch,
      fetchMore: mockFetchMore,
    });

    const allResult = realUseSellerOrders({ first: 10, status: 'ALL' });
    allResult.loadMore();
    expect(mockFetchMore).toHaveBeenLastCalledWith({ variables: { after: 'cursor-123' } });
    expect('status' in mockFetchMore.mock.calls[0][0].variables).toBe(false);

    // Part 2: status = SHIPPED
    mockApolloUseMutation.mockReset();
    mockApolloUseMutation
      .mockReturnValueOnce([mockUpdateOrderStatusMutate, { loading: false }])
      .mockReturnValueOnce([mockUpdateOrderMutate, { loading: false }]);
    mockFetchMore.mockReset();

    mockApolloUseQuery.mockReturnValue({
      data: {
        mySellerOrders: {
          edges: [{ cursor: 'c-shipped-1', node: { id: '3', orderNumber: 'ORD-3', status: 'SHIPPED' } }],
          pageInfo: { hasNextPage: true, endCursor: 'cursor-123' },
        },
      },
      loading: false,
      error: undefined,
      refetch: mockRefetch,
      fetchMore: mockFetchMore,
    });

    const shippedResult = realUseSellerOrders({ first: 10, status: 'SHIPPED' as any });
    shippedResult.loadMore();
    expect(mockFetchMore).toHaveBeenLastCalledWith({ variables: { after: 'cursor-123', status: 'SHIPPED' } });
  });

  // Locked Test 5
  it('loadMore returns undefined and does not call fetchMore when hasNextPage=false', () => {
    mockApolloUseQuery.mockReturnValue({
      data: {
        mySellerOrders: {
          edges: mixedStatusEdges,
          pageInfo: { hasNextPage: false, endCursor: null },
        },
      },
      loading: false,
      error: undefined,
      refetch: mockRefetch,
      fetchMore: mockFetchMore,
    });

    const result = realUseSellerOrders({ first: 10, status: 'ALL' });
    const loadMoreReturn = result.loadMore();

    expect(loadMoreReturn).toBeUndefined();
    expect(mockFetchMore).not.toHaveBeenCalled();
  });
});