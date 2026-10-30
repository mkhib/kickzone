import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SellerOrdersScreen } from './seller-orders-screen';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import type { useSellerOrders as UseSellerOrdersFn } from '@kickzone-workspace/orders-hook';

// Mock the hooks and components (mirrored from existing spec)
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

describe('SellerOrdersScreen - Pants Size Display', () => {
  const createMockOrder = (itemSize: string | undefined, itemColor?: string) => ({
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
        productName: 'Test Pants',
        quantity: 1,
        unitPrice: 100,
        totalPrice: 100,
        size: itemSize,
        color: itemColor,
        productImage: undefined,
      },
    ],
    notes: 'Test note',
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const expandOrder = async () => {
    // Find and click the accordion summary button to expand
    const accordionButton = screen.getByRole('button', { name: /ORD-123/ });
    accordionButton.click();
    
    // Wait for accordion to expand (aria-expanded becomes true)
    await waitFor(() => {
      expect(accordionButton).toHaveAttribute('aria-expanded', 'true');
    });
  };

  it('renders pants size "32x34" as "W32/L34" and does NOT show raw "32x34"', async () => {
    const orderWithPantsSize = createMockOrder('32x34', 'Black');
    mockUseSellerOrders.mockReturnValue({
      orders: [orderWithPantsSize],
      loading: false,
      error: null,
      updateOrderStatus: jest.fn().mockResolvedValue(undefined),
      updateStatusLoading: false,
    });

    renderWithTheme(<SellerOrdersScreen />);
    await expandOrder();

    // Check that formatted pants size "W32/L34" is rendered (use regex for flexible matching)
    expect(screen.getByText(/W32\/L34/)).toBeInTheDocument();

    // Check that raw "32x34" is NOT in the document
    expect(screen.queryByText('32x34')).not.toBeInTheDocument();
  });

  it('renders regular apparel size "M" unchanged (no "W" + digit label)', async () => {
    const orderWithApparelSize = createMockOrder('M', 'Blue');
    mockUseSellerOrders.mockReturnValue({
      orders: [orderWithApparelSize],
      loading: false,
      error: null,
      updateOrderStatus: jest.fn().mockResolvedValue(undefined),
      updateStatusLoading: false,
    });

    renderWithTheme(<SellerOrdersScreen />);
    await expandOrder();

    // Check that "Blue - M" is rendered (color + unchanged size)
    expect(screen.getByText('Blue - M')).toBeInTheDocument();

    // Check that no "W" + digit label appears (e.g., "W" followed by number)
    const allText = screen.getByTestId('sellers-layout').textContent || '';
    // Verify no pants-style label like "W32/L34" appears for apparel size
    expect(allText).not.toMatch(/W\d+\/L\d+/);
  });

  it('renders regular apparel size "L" unchanged (no "W" + digit label)', async () => {
    const orderWithApparelSize = createMockOrder('L', 'Red');
    mockUseSellerOrders.mockReturnValue({
      orders: [orderWithApparelSize],
      loading: false,
      error: null,
      updateOrderStatus: jest.fn().mockResolvedValue(undefined),
      updateStatusLoading: false,
    });

    renderWithTheme(<SellerOrdersScreen />);
    await expandOrder();

    // Check that "Red - L" is rendered (color + unchanged size)
    expect(screen.getByText('Red - L')).toBeInTheDocument();

    // Check that no "W" + digit label appears
    const allText = screen.getByTestId('sellers-layout').textContent || '';
    expect(allText).not.toMatch(/W\d+\/L\d+/);
  });

  it('renders pants size "30x32" as "W30/L32"', async () => {
    const orderWithPantsSize = createMockOrder('30x32', 'Grey');
    mockUseSellerOrders.mockReturnValue({
      orders: [orderWithPantsSize],
      loading: false,
      error: null,
      updateOrderStatus: jest.fn().mockResolvedValue(undefined),
      updateStatusLoading: false,
    });

    renderWithTheme(<SellerOrdersScreen />);
    await expandOrder();

    expect(screen.getByText(/W30\/L32/)).toBeInTheDocument();
    expect(screen.queryByText('30x32')).not.toBeInTheDocument();
  });

  it('renders pants size with color as "Color - W32/L34"', async () => {
    const orderWithPantsSize = createMockOrder('32x34', 'Navy');
    mockUseSellerOrders.mockReturnValue({
      orders: [orderWithPantsSize],
      loading: false,
      error: null,
      updateOrderStatus: jest.fn().mockResolvedValue(undefined),
      updateStatusLoading: false,
    });

    renderWithTheme(<SellerOrdersScreen />);
    await expandOrder();

    // Should show "Navy - W32/L34" (color + formatted size)
    expect(screen.getByText(/Navy - W32\/L34/)).toBeInTheDocument();
    expect(screen.queryByText('32x34')).not.toBeInTheDocument();
  });

  it('renders apparel size with color as "Color - M"', async () => {
    const orderWithApparelSize = createMockOrder('M', 'Green');
    mockUseSellerOrders.mockReturnValue({
      orders: [orderWithApparelSize],
      loading: false,
      error: null,
      updateOrderStatus: jest.fn().mockResolvedValue(undefined),
      updateStatusLoading: false,
    });

    renderWithTheme(<SellerOrdersScreen />);
    await expandOrder();

    // Should show "Green - M" (color + unchanged size)
    expect(screen.getByText(/Green - M/)).toBeInTheDocument();
    const allText = screen.getByTestId('sellers-layout').textContent || '';
    expect(allText).not.toMatch(/W\d+\/L\d+/);
  });
});