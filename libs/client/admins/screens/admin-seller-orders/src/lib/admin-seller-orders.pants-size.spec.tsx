import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AdminSellerOrders } from './admin-seller-orders';

vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/glassmorphism-container', () => ({
  GlassmorphismContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="glassmorphism-container">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/language-components', () => ({
  DialogFormContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-form-content">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      pageTitles: {
        adminOrders: () => 'Seller Orders',
      },
      orders: {
        allSellerOrders: () => 'All Seller Orders',
        orderNumber: () => 'Order Number',
        tracking: () => 'Tracking',
        customer: () => 'Customer',
        email: () => 'Email',
        actions: () => 'Actions',
        changeStatus: () => 'Change Status',
        errorLoadingOrders: () => 'Error loading orders',
        orderDetails: () => 'Order Details',
        customerInformation: () => 'Customer Information',
        orderSummary: () => 'Order Summary',
        orderItems: () => 'Order Items',
        pending: () => 'Pending',
        confirmed: () => 'Confirmed',
        processing: () => 'Processing',
        shipped: () => 'Shipped',
        delivered: () => 'Delivered',
        cancelled: () => 'Cancelled',
        refunded: () => 'Refunded',
        changeOrderStatus: () => 'Change Order Status',
        orderDate: () => 'Order Date',
      },
      form: {
        status: () => 'Status',
        fullName: () => 'Full Name',
        email: () => 'Email',
        phone: () => 'Phone',
        address: () => 'Address',
        city: () => 'City',
        country: () => 'Country',
        notes: () => 'Notes',
        newStatus: () => 'New Status',
      },
      checkout: {
        total: () => 'Total',
        subtotal: () => 'Subtotal',
        shipping: () => 'Shipping',
      },
      table: {
        product: () => 'Product',
        quantity: () => 'Quantity',
        unitPrice: () => 'Unit Price',
        total: () => 'Total',
      },
      products: {
        variant: () => 'Variant',
      },
      button: {
        cancel: () => 'Cancel',
        updateStatus: () => 'Update Status',
      },
    },
  }),
  useLanguageContext: () => ({
    isRTL: false,
    currentLocale: 'en',
  }),
  usePageTitle: vi.fn(),
}));

vi.mock('@kickzone-workspace/material-data-table', () => ({
  DataTable: ({ data, config }: { data: unknown[]; config: { renderDetailPanel: (props: { row: { original: unknown } }) => React.ReactNode } }) => (
    <div data-testid="orders-table">
      {data.map((row, i) => config.renderDetailPanel({ row: { original: row } }))}
    </div>
  ),
}));

vi.mock('@kickzone-workspace/price-display', () => ({
  PriceDisplay: ({ priceInUSD }: { priceInUSD: number }) => (
    <span>{priceInUSD}</span>
  ),
}));

vi.mock('@kickzone-workspace/admins-orders-hook', () => ({
  useAdminsOrders: () => ({
    orders: [
      {
        id: 'order-1',
        orderNumber: 'ORD-1',
        trackingNumber: 'TRK-1',
        customerName: 'Jane Customer',
        customerEmail: 'jane@example.com',
        customerPhone: '123456789',
        shippingAddress: '123 Test St',
        city: 'Tehran',
        state: 'Tehran',
        zipCode: '12345',
        country: 'Iran',
        status: 'Pending',
        subtotal: 80,
        shippingCost: 10,
        total: 90,
        sellerId: 1,
        createdAt: '2026-09-08T00:00:00.000Z',
        notes: '',
        items: [
          {
            productName: 'Pants Product',
            quantity: 1,
            unitPrice: 80,
            totalPrice: 80,
            color: 'Blue',
            size: '32x34',
          },
        ],
      },
      {
        id: 'order-2',
        orderNumber: 'ORD-2',
        trackingNumber: 'TRK-2',
        customerName: 'John Customer',
        customerEmail: 'john@example.com',
        customerPhone: '987654321',
        shippingAddress: '456 Test Ave',
        city: 'Tehran',
        state: 'Tehran',
        zipCode: '12345',
        country: 'Iran',
        status: 'Confirmed',
        subtotal: 50,
        shippingCost: 5,
        total: 55,
        sellerId: 1,
        createdAt: '2026-09-09T00:00:00.000Z',
        notes: '',
        items: [
          {
            productName: 'T-Shirt Product',
            quantity: 2,
            unitPrice: 25,
            totalPrice: 50,
            color: 'Red',
            size: 'M',
          },
          {
            productName: 'Hoodie Product',
            quantity: 1,
            unitPrice: 30,
            totalPrice: 30,
            color: 'Black',
            size: 'L',
          },
        ],
      },
    ],
    loading: false,
    error: undefined,
    updateOrderStatus: vi.fn(),
    updateStatusLoading: false,
  }),
  useAdminsSellers: () => ({
    loading: false,
  }),
}));

vi.mock('@kickzone-workspace/order-status-chip', () => ({
  OrderStatusChip: ({ status }: { status: string }) => <span>{status}</span>,
}));

describe('AdminSellerOrders - pants size formatting', () => {
  it('renders pants size "32x34" as "W32/L34" and does not show raw "32x34"', () => {
    render(<AdminSellerOrders />);

    // The detail panel for order-1 (pants) should be rendered
    expect(screen.getByText(/W32\/L34/)).toBeInTheDocument();
    expect(screen.queryByText('32x34')).not.toBeInTheDocument();
    // Color should still be shown
    expect(screen.getByText('Blue - W32/L34')).toBeInTheDocument();
  });

  it('renders regular apparel sizes "M" and "L" unchanged', () => {
    render(<AdminSellerOrders />);

    // The detail panel for order-2 (apparel) should be rendered
    expect(screen.getByText('Red - M')).toBeInTheDocument();
    expect(screen.getByText('Black - L')).toBeInTheDocument();
    // No "W" prefix labels for apparel sizes (check the specific apparel variant cells)
    const apparelVariantCells = screen.getAllByText(/Red - M|Black - L/);
    apparelVariantCells.forEach(cell => {
      expect(cell.textContent).not.toMatch(/W\d+\/L\d+/);
    });
  });
});