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
  DataTable: ({ data }: { data: unknown[] }) => (
    <div data-testid="orders-table">rows:{data.length}</div>
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
            productName: 'Test Product',
            quantity: 1,
            unitPrice: 80,
            totalPrice: 80,
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

describe('AdminSellerOrders', () => {
  it('renders a minimal smoke view', () => {
    render(<AdminSellerOrders />);

    expect(screen.getByTestId('admins-layout')).toBeInTheDocument();
    expect(screen.getByText('All Seller Orders')).toBeInTheDocument();
    expect(screen.getByTestId('orders-table')).toHaveTextContent('rows:1');
  });
});
