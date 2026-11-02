import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
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

const orderDataWithSellerOrders = {
  ...orderData,
  sellerOrders: [
    { id: '1', orderNumber: 'ORD-001', total: 90, trackingNumber: 'TRK-001' },
    { id: '2', orderNumber: 'ORD-002', total: 50, trackingNumber: 'TRK-002' },
  ],
};

describe('CustomerOrderConfirmation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { orderData } }]}>
        <CustomerOrderConfirmation />
      </MemoryRouter>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should render successfully with sellerOrders', () => {
    const { baseElement } = render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { orderData: orderDataWithSellerOrders } }]}>
        <CustomerOrderConfirmation />
      </MemoryRouter>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should return null (and redirect) when orderData is absent', () => {
    const { baseElement } = render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <CustomerOrderConfirmation />
      </MemoryRouter>
    );

    // When no orderData in state, component returns null (redirect handled by useEffect)
    expect(baseElement.querySelector('[data-testid="customers-layout"]')).toBeFalsy();
  });
});
