import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';
import CustomerOrderConfirmation from './customer-order-confirmation';

vi.mock('@kickzone-workspace/customers-layout', () => ({
  CustomersLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="customers-layout">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/price-display', () => ({
  PriceDisplay: ({ priceInUSD }: { priceInUSD: number }) => (
    <span>{priceInUSD}</span>
  ),
}));

vi.mock('@kickzone-workspace/glassmorphism-container', () => ({
  GlassmorphismContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="glassmorphism-container">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/customers-auth-context', () => ({
  useCustomersAuth: () => ({ user: null, logout: vi.fn() }),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      pageTitles: { orderConfirmation: () => 'Order Confirmation' },
      orderConfirmation: {
        title: () => 'Order confirmed',
        thankYouMessage: () => 'Thank you',
        orderSummary: () => 'Order Summary',
        shippingAddress: () => 'Shipping Address',
        emailConfirmation: () => 'Email confirmation sent',
        viewOrders: () => 'View Orders',
        continueShopping: () => 'Continue Shopping',
        createAccountPrompt: () => 'Create account for faster tracking',
        createAccountDescription: () => 'Save your info for future orders',
      },
      orders: {
        trackingNumber: () => 'Tracking Number',
        orderItems: () => 'Order Items',
      },
      checkout: {
        subtotal: () => 'Subtotal',
        shipping: () => 'Shipping',
        total: () => 'Total',
      },
      table: {
        product: () => 'Product',
        quantity: () => 'Quantity',
        unitPrice: () => 'Unit Price',
        total: () => 'Total',
      },
      form: {
        email: () => 'Email',
        phone: () => 'Phone',
      },
      button: {
        signUp: () => 'Sign Up',
      },
    },
  }),
  usePageTitle: vi.fn(),
}));

const orderData = {
  id: '1',
  orderNumber: 'ORD-001',
  trackingNumber: 'TRK-001',
  customerEmail: 'customer@example.com',
  customerPhone: '1234567890',
  customerName: 'Jane Customer',
  shippingAddress: '123 Test St',
  city: 'Tehran',
  state: 'Tehran',
  zipCode: '12345',
  country: 'Iran',
  subtotal: 80,
  shippingCost: 10,
  total: 90,
  items: [
    {
      productId: 'p-1',
      productName: 'Test Product',
      quantity: 1,
      unitPrice: 80,
      totalPrice: 80,
    },
  ],
  createdAt: '2026-09-08T00:00:00.000Z',
};

const baseItem = {
  productId: 'p-1',
  productName: 'Test Product',
  quantity: 1,
  unitPrice: 80,
  totalPrice: 80,
};

describe('CustomerOrderConfirmation pants size formatting', () => {
  it('T1: formats canonical pants size 32x34 as W32/L34', () => {
    const testOrderData = {
      ...orderData,
      items: [
        { ...baseItem, color: 'Black', size: '32x34' },
      ],
    };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { orderData: testOrderData } }]}>
        <CustomerOrderConfirmation />
      </MemoryRouter>
    );

    expect(screen.getByText(/Black.*W32\/L34/)).toBeInTheDocument();
    expect(screen.queryByText('32x34')).not.toBeInTheDocument();
  });

  it('T2: leaves footwear size 42 unchanged', () => {
    const testOrderData = {
      ...orderData,
      items: [
        { ...baseItem, color: 'Blue', size: '42' },
      ],
    };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { orderData: testOrderData } }]}>
        <CustomerOrderConfirmation />
      </MemoryRouter>
    );

    expect(screen.getByText(/Blue.*42/)).toBeInTheDocument();
    expect(screen.queryByText('W42')).not.toBeInTheDocument();
  });

  it('T3: leaves apparel size XL unchanged', () => {
    const testOrderData = {
      ...orderData,
      items: [
        { ...baseItem, color: 'Green', size: 'XL' },
      ],
    };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { orderData: testOrderData } }]}>
        <CustomerOrderConfirmation />
      </MemoryRouter>
    );

    expect(screen.getByText(/Green.*XL/)).toBeInTheDocument();
    expect(screen.queryByText(/W\d+\/L\d+/)).not.toBeInTheDocument();
  });

  it('T4: leaves lookalike 32/34 untouched', () => {
    const testOrderData = {
      ...orderData,
      items: [
        { ...baseItem, color: 'Gray', size: '32/34' },
      ],
    };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { orderData: testOrderData } }]}>
        <CustomerOrderConfirmation />
      </MemoryRouter>
    );

    expect(screen.getByText(/Gray.*32\/34/)).toBeInTheDocument();
    expect(screen.queryByText('W32/L34')).not.toBeInTheDocument();
  });

  it('T5: renders color only when size is null, no dangling separator', () => {
    const testOrderData = {
      ...orderData,
      items: [
        { ...baseItem, color: 'Red', size: null },
      ],
    };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { orderData: testOrderData } }]}>
        <CustomerOrderConfirmation />
      </MemoryRouter>
    );

    // The text node should equal 'Red' exactly (no trailing ' • ')
    const redText = screen.getByText('Red');
    expect(redText.textContent).toBe('Red');
  });
});