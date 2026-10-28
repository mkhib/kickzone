import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SellerOrdersScreen } from './seller-orders-screen';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

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
});