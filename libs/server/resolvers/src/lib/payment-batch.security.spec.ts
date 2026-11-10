import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PaymentResolver } from './payment.resolver';
import { OrderResolver } from './order.resolver';
import { PaymentService, OrderService, CurrencyService, SellerService } from '@kickzone-workspace/services';
import { OrderStatus, Order } from '@kickzone-workspace/entities';
import { ZarinPalPaymentRequestInput } from './payment.resolver';
import type { OptionalAuthenticatedUser } from '@kickzone-workspace/decorators';

describe('PaymentBatch Security Tests', () => {
  let paymentResolver: PaymentResolver;
  let orderResolver: OrderResolver;
  let paymentService: jest.Mocked<PaymentService>;
  let orderService: jest.Mocked<OrderService>;
  let currencyService: jest.Mocked<CurrencyService>;

  const mockPaymentService = {
    requestPayment: jest.fn(),
    verifyPayment: jest.fn(),
    getGatewayUrl: jest.fn(),
  };

  const mockOrderService = {
    findOne: jest.fn(),
    findOrdersByPaymentAuthority: jest.fn(),
    setPaymentIntent: jest.fn(),
    confirmOrderPayment: jest.fn(),
    cancelPendingOrder: jest.fn(),
    recalculateBatchOrdersShipping: jest.fn(),
    getOrdersBySeller: jest.fn(),
    findOneByUserId: jest.fn(),
  };

  const mockCurrencyService = {
    getCurrentExchangeRate: jest.fn(),
  };

  const mockSellerService = {
    findOneByUserId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentResolver,
        OrderResolver,
        { provide: PaymentService, useValue: mockPaymentService },
        { provide: OrderService, useValue: mockOrderService },
        { provide: CurrencyService, useValue: mockCurrencyService },
        { provide: SellerService, useValue: mockSellerService },
      ],
    }).compile();

    paymentResolver = module.get<PaymentResolver>(PaymentResolver);
    orderResolver = module.get<OrderResolver>(OrderResolver);
    paymentService = module.get(PaymentService);
    orderService = module.get(OrderService);
    currencyService = module.get(CurrencyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const createPaymentRequestInput = (overrides: Partial<ZarinPalPaymentRequestInput> = {}): ZarinPalPaymentRequestInput => ({
    amount: 50000,
    callback_url: 'https://example.com/payment/callback',
    description: 'Test Order Payment',
    currency: 'IRT',
    mobile: '09123456789',
    email: 'test@example.com',
    order_id: undefined, // Explicitly undefined by default for batch tests
    orderIds: undefined,
    ...overrides,
  });

  const createMockOrder = (overrides: Partial<{
    id: string;
    status: OrderStatus;
    total: number;
    shippingCost: number;
    paymentAuthority: string | null;
    paymentAmount: number | null;
    paymentCurrency: string | null;
    customerEmail: string | null;
    notes: string | null;
    orderNumber: string;
    customerId: string | null;
    items: unknown[];
  }> = {}) => ({
    id: 'order-123',
    status: OrderStatus.PENDING,
    total: 100,
    shippingCost: 0,
    paymentAuthority: null,
    paymentAmount: null,
    paymentCurrency: null,
    customerEmail: 'test@example.com',
    notes: null,
    orderNumber: 'ORD-123',
    customerId: 'cust-1',
    items: [],
    ...overrides,
  });

  const mockFindOneById = (...orders: Array<ReturnType<typeof createMockOrder>>): void => {
    const map = new Map(orders.map((order) => [order.id, order]));
    orderService.findOne.mockImplementation((id: string) => {
      const found = map.get(id);
      if (!found) {
        return Promise.reject(new NotFoundException(`Order with ID ${id} not found`));
      }
      return Promise.resolve(found as never);
    });
  };

  // ============================================================
  // 1. Cross-batch / mixed GuestToken
  // ============================================================
  describe('Cross-batch / mixed GuestToken', () => {
    const guestToken1 = '11111111-1111-4111-8111-111111111111';
    const guestToken2 = '22222222-2222-4222-8222-222222222222';

    describe('PaymentResolver.requestZarinPalPayment', () => {
      it('should reject two guest orders with different guest tokens', async () => {
        const order1 = createMockOrder({
          id: 'order-1',
          customerEmail: 'same@example.com',
          notes: `[GuestToken: ${guestToken1}]`,
        });
        const order2 = createMockOrder({
          id: 'order-2',
          customerEmail: 'same@example.com',
          notes: `[GuestToken: ${guestToken2}]`,
        });

        mockFindOneById(order1, order2);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 60000 } as never);

        const input = createPaymentRequestInput({
          amount: 12000000,
          callback_url: 'https://example.com/callback',
          orderIds: ['order-1', 'order-2'],
        } as never);

        await expect(paymentResolver.requestZarinPalPayment(input)).rejects.toThrow('All orders in a batch must share the same guest checkout token');

        expect(orderService.recalculateBatchOrdersShipping).not.toHaveBeenCalled();
        expect(paymentService.requestPayment).not.toHaveBeenCalled();
        expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
      });

      it('should reject mixed authenticated + guest with same email', async () => {
        const orderAuth = createMockOrder({
          id: 'order-auth',
          customerEmail: 'same@example.com',
          notes: 'Regular note',
        });
        const orderGuest = createMockOrder({
          id: 'order-guest',
          customerEmail: 'same@example.com',
          notes: `[GuestToken: ${guestToken1}]`,
        });

        mockFindOneById(orderAuth, orderGuest);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 60000 } as never);

        const input = createPaymentRequestInput({
          amount: 12000000,
          callback_url: 'https://example.com/callback',
          orderIds: ['order-auth', 'order-guest'],
        } as never);

        await expect(paymentResolver.requestZarinPalPayment(input)).rejects.toThrow('All orders in a batch must share the same guest checkout token');
      });
    });

    describe('OrderResolver.recalculateBatchOrdersShipping', () => {
      it('should reject two guest orders with different guest tokens', async () => {
        const order1 = createMockOrder({
          id: 'order-1',
          customerEmail: 'same@example.com',
          notes: `[GuestToken: ${guestToken1}]`,
        });
        const order2 = createMockOrder({
          id: 'order-2',
          customerEmail: 'same@example.com',
          notes: `[GuestToken: ${guestToken2}]`,
        });

        mockFindOneById(order1, order2);

        await expect(
          orderResolver.recalculateBatchOrdersShipping(['order-1', 'order-2'], undefined, guestToken1)
        ).rejects.toThrow('All orders in a batch must share the same guest checkout token');

        expect(orderService.recalculateBatchOrdersShipping).not.toHaveBeenCalled();
      });

      it('should reject mixed authenticated + guest with same email', async () => {
        const orderAuth = createMockOrder({
          id: 'order-auth',
          customerEmail: 'same@example.com',
          notes: 'Regular note',
        });
        const orderGuest = createMockOrder({
          id: 'order-guest',
          customerEmail: 'same@example.com',
          notes: `[GuestToken: ${guestToken1}]`,
        });

        mockFindOneById(orderAuth, orderGuest);

        // Provide a user with matching email to pass the auth check
        const user: OptionalAuthenticatedUser = { id: 'user-1', email: 'same@example.com' };

        await expect(
          orderResolver.recalculateBatchOrdersShipping(['order-auth', 'order-guest'], user, guestToken1)
        ).rejects.toThrow('All orders in a batch must share the same guest checkout token');
      });
    });
  });

  // ============================================================
  // 2. Mixed customer emails
  // ============================================================
  describe('Mixed customer emails', () => {
    const guestToken = 'token-1';

    describe('PaymentResolver.requestZarinPalPayment', () => {
      it('should reject orders with different emails even with same guest token', async () => {
        const order1 = createMockOrder({
          id: 'order-1',
          customerEmail: 'a@example.com',
          notes: `[GuestToken: ${guestToken}]`,
        });
        const order2 = createMockOrder({
          id: 'order-2',
          customerEmail: 'b@example.com',
          notes: `[GuestToken: ${guestToken}]`,
        });

        mockFindOneById(order1, order2);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 60000 } as never);

        const input = createPaymentRequestInput({
          amount: 12000000,
          callback_url: 'https://example.com/callback',
          orderIds: ['order-1', 'order-2'],
        } as never);

        await expect(paymentResolver.requestZarinPalPayment(input)).rejects.toThrow('All orders in a batch must belong to the same customer');
      });

      it('should ACCEPT case-insensitive emails with same guest token (happy path)', async () => {
        const order1 = createMockOrder({
          id: 'order-1',
          customerEmail: 'Buyer@Example.com',
          notes: `[GuestToken: ${guestToken}]`,
        });
        const order2 = createMockOrder({
          id: 'order-2',
          customerEmail: 'buyer@example.com',
          notes: `[GuestToken: ${guestToken}]`,
        });

        mockFindOneById(order1, order2);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 60000 } as never);
        orderService.recalculateBatchOrdersShipping.mockImplementation(async (orders: Order[]) => {
          for (const order of orders) {
            order.total = 100;
            order.shippingCost = 0;
          }
          return orders;
        });
        paymentService.requestPayment.mockResolvedValue({
          data: { code: 100, message: 'Success', authority: 'A00000000000000000000000000000000000000', fee_type: 'Merchant', fee: 0 },
          errors: [],
        } as never);
        orderService.setPaymentIntent.mockResolvedValue(undefined as never);

        const input = createPaymentRequestInput({
          amount: 12000000,
          callback_url: 'https://example.com/callback',
          orderIds: ['order-1', 'order-2'],
        } as never);

        const result = await paymentResolver.requestZarinPalPayment(input, undefined, guestToken);

        expect(result.authority).toBe('A00000000000000000000000000000000000000');
        expect(paymentService.requestPayment).toHaveBeenCalled();
        expect(orderService.setPaymentIntent).toHaveBeenCalledTimes(2);
      });
    });

    describe('OrderResolver.recalculateBatchOrdersShipping', () => {
      it('should reject orders with different emails even with same guest token', async () => {
        const order1 = createMockOrder({
          id: 'order-1',
          customerEmail: 'a@example.com',
          notes: `[GuestToken: ${guestToken}]`,
        });
        const order2 = createMockOrder({
          id: 'order-2',
          customerEmail: 'b@example.com',
          notes: `[GuestToken: ${guestToken}]`,
        });

        mockFindOneById(order1, order2);

        const user: OptionalAuthenticatedUser = { id: 'user-1', email: 'a@example.com' };

        await expect(
          orderResolver.recalculateBatchOrdersShipping(['order-1', 'order-2'], user, guestToken)
        ).rejects.toThrow('All orders in a batch must belong to the same customer');
      });

      it('should ACCEPT case-insensitive emails with same guest token (happy path)', async () => {
        const order1 = createMockOrder({
          id: 'order-1',
          customerEmail: 'Buyer@Example.com',
          notes: `[GuestToken: ${guestToken}]`,
        });
        const order2 = createMockOrder({
          id: 'order-2',
          customerEmail: 'buyer@example.com',
          notes: `[GuestToken: ${guestToken}]`,
        });

        mockFindOneById(order1, order2);
        orderService.recalculateBatchOrdersShipping.mockResolvedValue([order1, order2] as never);

        const user: OptionalAuthenticatedUser = { id: 'user-1', email: 'buyer@example.com' };

        const result = await orderResolver.recalculateBatchOrdersShipping(['order-1', 'order-2'], user, guestToken);

        expect(result).toHaveLength(2);
        expect(orderService.recalculateBatchOrdersShipping).toHaveBeenCalled();
      });
    });
  });

  // ============================================================
  // 3. Non-pending & partially-paid batch rejection
  // ============================================================
  describe('Non-pending & partially-paid batch rejection', () => {
    const nonPendingStatuses = [
      OrderStatus.CONFIRMED,
      OrderStatus.PROCESSING,
      OrderStatus.SHIPPED,
      OrderStatus.DELIVERED,
      OrderStatus.CANCELLED,
      OrderStatus.REFUNDED,
    ] as const;

    describe('PaymentResolver.requestZarinPalPayment', () => {
      for (const status of nonPendingStatuses) {
        it(`should reject batch when 2nd order is ${status}`, async () => {
          const orderPending1 = createMockOrder({ id: 'order-pending-1', total: 50 });
          const orderNonPending = createMockOrder({ id: 'order-non-pending', total: 50, status });
          const orderPending2 = createMockOrder({ id: 'order-pending-2', total: 50 });

        mockFindOneById(orderPending1, orderNonPending, orderPending2);
          currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 60000 } as never);

          const input = createPaymentRequestInput({
            amount: 9000000,
            callback_url: 'https://example.com/callback',
            orderIds: ['order-pending-1', 'order-non-pending', 'order-pending-2'],
          } as never);

          await expect(paymentResolver.requestZarinPalPayment(input)).rejects.toThrow('Order(s) order-non-pending are not in PENDING status and cannot be paid');

          expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
          expect(paymentService.requestPayment).not.toHaveBeenCalled();
        });
      }
    });

    describe('OrderResolver.recalculateBatchOrdersShipping', () => {
      for (const status of nonPendingStatuses) {
        it(`should reject batch when 2nd order is ${status}`, async () => {
          const orderPending1 = createMockOrder({ id: 'order-pending-1', customerEmail: 'test@example.com' });
          const orderNonPending = createMockOrder({ id: 'order-non-pending', status, customerEmail: 'test@example.com' });
          const orderPending2 = createMockOrder({ id: 'order-pending-2', customerEmail: 'test@example.com' });

        mockFindOneById(orderPending1, orderNonPending, orderPending2);

          // Provide a user with matching email to pass the auth check
          const user: OptionalAuthenticatedUser = { id: 'user-1', email: 'test@example.com' };

          await expect(
            orderResolver.recalculateBatchOrdersShipping(['order-pending-1', 'order-non-pending', 'order-pending-2'], user, undefined)
          ).rejects.toThrow(`Order order-non-pending is not in PENDING status`);

          expect(orderService.recalculateBatchOrdersShipping).not.toHaveBeenCalled();
        });
      }
    });
  });

  // ============================================================
  // 4. Order ID normalization, dedup, missing orders
  // ============================================================
  describe('Order ID normalization, dedup, missing orders', () => {
    describe('PaymentResolver.requestZarinPalPayment', () => {
      it('should deduplicate orderIds and order_id, call findOne exactly twice, sum totals once each, setPaymentIntent once per unique order', async () => {
        const order1 = createMockOrder({ id: 'order-1', total: 50 });
        const order2 = createMockOrder({ id: 'order-2', total: 50 });

        mockFindOneById(order1, order2);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 60000 } as never);
        orderService.recalculateBatchOrdersShipping.mockImplementation(async (orders: Order[]) => {
          for (const order of orders) {
            order.total = order.id === 'order-1' ? 50 : 50;
            order.shippingCost = 0;
          }
          return orders;
        });
        paymentService.requestPayment.mockResolvedValue({
          data: { code: 100, message: 'Success', authority: 'A00000000000000000000000000000000000000', fee_type: 'Merchant', fee: 0 },
          errors: [],
        } as never);
        orderService.setPaymentIntent.mockResolvedValue(undefined as never);

        const input = createPaymentRequestInput({
          amount: 6000000,
          callback_url: 'https://example.com/callback',
          order_id: 'order-1',
          orderIds: ['order-1', '  ', '', 'order-2', 'order-1'],
        } as never);

        await paymentResolver.requestZarinPalPayment(input);

        expect(orderService.findOne).toHaveBeenCalledTimes(2);
        expect(orderService.findOne).toHaveBeenCalledWith('order-1');
        expect(orderService.findOne).toHaveBeenCalledWith('order-2');
        expect(orderService.setPaymentIntent).toHaveBeenCalledTimes(2);
      });

      it('should reject when order_id is whitespace and orderIds are empty/whitespace', async () => {
        const input = createPaymentRequestInput({
          amount: 100000,
          callback_url: 'https://example.com/callback',
          order_id: '   ',
          orderIds: ['', '  '],
        } as never);

        await expect(paymentResolver.requestZarinPalPayment(input)).rejects.toThrow('At least one orderId is required');
      });

      it('should use multi-form error message for non-pending in 3-order batch', async () => {
        const orderPending1 = createMockOrder({ id: 'order-pending-1', total: 50 });
        const orderNonPending = createMockOrder({ id: 'order-non-pending', total: 50, status: OrderStatus.CONFIRMED });
        const orderPending2 = createMockOrder({ id: 'order-pending-2', total: 50 });

        mockFindOneById(orderPending1, orderNonPending, orderPending2);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 60000 } as never);

        const input = createPaymentRequestInput({
          amount: 9000000,
          callback_url: 'https://example.com/callback',
          orderIds: ['order-pending-1', 'order-non-pending', 'order-pending-2'],
        } as never);

        await expect(paymentResolver.requestZarinPalPayment(input)).rejects.toThrow('Order(s) order-non-pending are not in PENDING status and cannot be paid');
      });
    });
  });

  // ============================================================
  // 5. callback_url protocol validation before any DB lookup
  // ============================================================
  describe('callback_url protocol validation before any DB lookup', () => {
    const invalidCallbackUrls = [
      { value: 'javascript:alert(1)', expectedMessage: 'Invalid callback_url protocol' },
      { value: 'data:text/html,<script>alert(1)</script>', expectedMessage: 'Invalid callback_url protocol' },
      { value: 'ftp://files.example.com/cb', expectedMessage: 'Invalid callback_url protocol' },
      { value: 'file:///etc/passwd', expectedMessage: 'Invalid callback_url protocol' },
      { value: '//evil.com/cb', expectedMessage: 'Invalid callback_url' },
      { value: '', expectedMessage: 'Invalid callback_url' },
    ];

    for (const { value, expectedMessage } of invalidCallbackUrls) {
      it(`should throw "${expectedMessage}" for callback_url="${value}" before calling findOne`, async () => {
        const input = createPaymentRequestInput({
          amount: 50000,
          callback_url: value,
          order_id: 'order-1',
        } as never);

        await expect(paymentResolver.requestZarinPalPayment(input)).rejects.toThrow(expectedMessage);

        // Verify no DB lookup was performed
        expect(orderService.findOne).not.toHaveBeenCalled();
      });
    }
  });
});
