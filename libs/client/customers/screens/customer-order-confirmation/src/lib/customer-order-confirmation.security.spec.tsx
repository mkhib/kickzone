import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import CustomerOrderConfirmation from './customer-order-confirmation';

const mockUseCustomersAuth = vi.hoisted(() => vi.fn(() => ({ user: null, logout: vi.fn() })));
let mockCurrentLocale = 'en';

vi.mock('@kickzone-workspace/customers-layout', () => ({
  CustomersLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="customers-layout">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/price-display', () => ({
  PriceDisplay: ({ priceInUSD }: { priceInUSD: number }) => (
    <span data-testid="price-display">{priceInUSD}</span>
  ),
}));

vi.mock('@kickzone-workspace/glassmorphism-container', () => ({
  GlassmorphismContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="glassmorphism-container">{children}</div>
  ),
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
  useLanguageContext: () => ({
    currentLocale: mockCurrentLocale,
  }),
  usePageTitle: vi.fn(),
}));

vi.mock('@kickzone-workspace/customers-auth-context', () => ({
  useCustomersAuth: mockUseCustomersAuth,
}));

const baseOrderData = {
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
  subtotal: 140,
  shippingCost: 6.3,
  total: 146.3,
  items: [
    {
      productId: 'p-1',
      productName: 'Test Product',
      quantity: 2,
      unitPrice: 50,
      totalPrice: 100,
      color: 'Black',
      size: '32x30',
    },
  ],
  createdAt: '2026-09-08T00:00:00.000Z',
};

function renderWithRouter(orderData = baseOrderData, locale = 'en') {
  mockCurrentLocale = locale;
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/', state: { orderData } }]}>
      <CustomerOrderConfirmation />
    </MemoryRouter>
  );
}

describe('CustomerOrderConfirmation - Security & Edge Cases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCurrentLocale = 'en';
    mockUseCustomersAuth.mockImplementation(() => ({ user: null, logout: vi.fn() }));
  });

  describe('1. Authoritative orderData totals (no client re-summing)', () => {
    it('renders server subtotal, shippingCost, and total exactly as provided (ignores item sum)', () => {
      renderWithRouter();

      const priceDisplays = screen.getAllByTestId('price-display');
      // Order: item unitPrice (50), item totalPrice (100), subtotal (140), shippingCost (6.3), total (146.3)
      expect(priceDisplays[2]).toHaveTextContent('140');
      expect(priceDisplays[3]).toHaveTextContent('6.3');
      expect(priceDisplays[4]).toHaveTextContent('146.3');
    });
  });

  describe('2. Pay-on-delivery notice matrix (en and fa)', () => {
    it('single order PAY_ONLINE with undefined sellerOrders: notice is null', () => {
      renderWithRouter({ ...baseOrderData, shippingPaymentMode: 'PAY_ONLINE', sellerOrders: undefined });

      expect(screen.queryByTestId('pay-on-delivery-notice')).toBeNull();
    });

    it('single order PAY_ON_DELIVERY with currentLocale=en: notice text matches exactly', () => {
      renderWithRouter({ ...baseOrderData, shippingPaymentMode: 'PAY_ON_DELIVERY', sellerOrders: undefined }, 'en');

      const notice = screen.getByTestId('pay-on-delivery-notice');
      expect(notice).toHaveTextContent('Shipping is paid on delivery when you receive the parcel by post');
    });

    it('single order PAY_ON_DELIVERY with currentLocale=fa: notice text matches exactly', () => {
      renderWithRouter({ ...baseOrderData, shippingPaymentMode: 'PAY_ON_DELIVERY', sellerOrders: undefined }, 'fa');

      const notice = screen.getByTestId('pay-on-delivery-notice');
      expect(notice).toHaveTextContent('«هزینه ارسال هنگام تحویل مرسوله پستی پرداخت می‌شود»');
    });

    it('undefined shippingPaymentMode (default case) with currentLocale=en: notice IS rendered', () => {
      renderWithRouter({ ...baseOrderData, shippingPaymentMode: undefined, sellerOrders: undefined }, 'en');

      const notice = screen.getByTestId('pay-on-delivery-notice');
      expect(notice).toHaveTextContent('Shipping is paid on delivery when you receive the parcel by post');
    });

    it('mixed batch: top-level PAY_ONLINE but one sellerOrders PAY_ON_DELIVERY: notice IS rendered', () => {
      const orderData = {
        ...baseOrderData,
        shippingPaymentMode: 'PAY_ONLINE',
        sellerOrders: [
          { id: '1', orderNumber: 'ORD-1', total: 50, shippingPaymentMode: 'PAY_ONLINE' },
          { id: '2', orderNumber: 'ORD-2', total: 80, shippingPaymentMode: 'PAY_ON_DELIVERY' },
        ],
      };
      renderWithRouter(orderData, 'en');

      expect(screen.getByTestId('pay-on-delivery-notice')).toBeInTheDocument();
    });

    it('all-online batch: top-level PAY_ONLINE and all sellerOrders PAY_ONLINE: notice is null', () => {
      const orderData = {
        ...baseOrderData,
        shippingPaymentMode: 'PAY_ONLINE',
        sellerOrders: [
          { id: '1', orderNumber: 'ORD-1', total: 50, shippingPaymentMode: 'PAY_ONLINE' },
          { id: '2', orderNumber: 'ORD-2', total: 80, shippingPaymentMode: 'PAY_ONLINE' },
        ],
      };
      renderWithRouter(orderData, 'en');

      expect(screen.queryByTestId('pay-on-delivery-notice')).toBeNull();
    });
  });

  describe('3. Guest vs authenticated signup URL encoding', () => {
    it('guest (user: null): Sign Up link href is correctly URL-encoded with special chars', () => {
      mockUseCustomersAuth.mockImplementation(() => ({ user: null, logout: vi.fn() }));
      const orderData = {
        ...baseOrderData,
        customerEmail: 'ali+test@example.com',
        customerName: 'Ali & Reza <script>',
      };
      renderWithRouter(orderData);

      const signUpLink = screen.getByRole('link', { name: /sign up/i });
      expect(signUpLink).toHaveAttribute('href', '/signup?email=ali%2Btest%40example.com&name=Ali%20%26%20Reza%20%3Cscript%3E');
    });

    it('authenticated user: guest prompt and Sign Up button are NOT rendered', () => {
      mockUseCustomersAuth.mockImplementation(() => ({ user: { id: 'u-1', email: 'ali@example.com' }, logout: vi.fn() }));
      renderWithRouter();

      expect(screen.queryByRole('link', { name: /sign up/i })).not.toBeInTheDocument();
      expect(screen.queryByText(/create account for faster tracking/i)).not.toBeInTheDocument();
    });
  });

  describe('4. Missing orderData guard and pants size formatting', () => {
    it('location.state is {}: component renders nothing (no customers-layout) and redirects to /', () => {
      const { baseElement } = render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: {} }]}>
          <CustomerOrderConfirmation />
        </MemoryRouter>
      );

      expect(baseElement.querySelector('[data-testid="customers-layout"]')).toBeFalsy();
    });

    it('location.state is null: component renders nothing (no customers-layout) and redirects to /', () => {
      const { baseElement } = render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: null }]}>
          <CustomerOrderConfirmation />
        </MemoryRouter>
      );

      expect(baseElement.querySelector('[data-testid="customers-layout"]')).toBeFalsy();
    });

    it('location.state is undefined: component renders nothing (no customers-layout) and redirects to /', () => {
      const { baseElement } = render(
        <MemoryRouter initialEntries={[{ pathname: '/' }]}>
          <CustomerOrderConfirmation />
        </MemoryRouter>
      );

      expect(baseElement.querySelector('[data-testid="customers-layout"]')).toBeFalsy();
    });

    it('pants size "32x30" formats as "W32/L30" (not raw)', () => {
      renderWithRouter();

      // The size appears in the order items table, joined with color as "Black • W32/L30"
      expect(screen.getByText((content) => content.includes('W32/L30'))).toBeInTheDocument();
    });

    it('non-pants size "XL" renders unchanged', () => {
      const orderData = {
        ...baseOrderData,
        items: [
          {
            ...baseOrderData.items[0],
            size: 'XL',
          },
        ],
      };
      renderWithRouter(orderData);

      expect(screen.getByText((content) => content.includes('XL'))).toBeInTheDocument();
    });

    it('non-pants size "42" renders unchanged', () => {
      const orderData = {
        ...baseOrderData,
        items: [
          {
            ...baseOrderData.items[0],
            size: '42',
          },
        ],
      };
      renderWithRouter(orderData);

      expect(screen.getByText((content) => content.includes('42'))).toBeInTheDocument();
    });
  });
});