import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { PaymentResolver } from './payment.resolver';
import { PaymentService, OrderService, CurrencyService } from '@kickzone-workspace/services';
import { OrderStatus } from '@kickzone-workspace/entities';
import { ZarinPalPaymentRequestInput } from './payment.resolver';

describe('PaymentResolver Unit Tests', () => {
  let resolver: PaymentResolver;
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
  };

  const mockCurrencyService = {
    getCurrentExchangeRate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentResolver,
        { provide: PaymentService, useValue: mockPaymentService },
        { provide: OrderService, useValue: mockOrderService },
        { provide: CurrencyService, useValue: mockCurrencyService },
      ],
    }).compile();

    resolver = module.get<PaymentResolver>(PaymentResolver);
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
    order_id: 'order-123',
    ...overrides,
  });

  const createMockOrder = (overrides: Partial<{
    id: string;
    status: OrderStatus;
    total: number;
    paymentAuthority: string | null;
    paymentAmount: number | null;
    paymentCurrency: string | null;
  }> = {}) => ({
    id: 'order-123',
    status: OrderStatus.PENDING,
    total: 80, // USD
    paymentAuthority: null,
    paymentAmount: null,
    paymentCurrency: null,
    ...overrides,
  });

  describe('requestZarinPalPayment', () => {
    describe('Tampered Amount Tests', () => {
      it('should reject when client sends amount=80 for $80 order with rate 60000 (expected 4800000)', async () => {
        const input = createPaymentRequestInput({ amount: 80, order_id: 'order-123' });
        const mockOrder = createMockOrder({ total: 80 });

        orderService.findOne.mockResolvedValue(mockOrder as never);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 60000 } as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Payment amount does not match order total'
        );

        expect(paymentService.requestPayment).not.toHaveBeenCalled();
        expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
      });

      it('should reject when client sends amount=1000 for $2000 order with rate 50000 (expected 100000000)', async () => {
        const input = createPaymentRequestInput({ amount: 1000, order_id: 'order-456' });
        const mockOrder = createMockOrder({ id: 'order-456', total: 2000 });

        orderService.findOne.mockResolvedValue(mockOrder as never);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 50000 } as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Payment amount does not match order total'
        );

        expect(paymentService.requestPayment).not.toHaveBeenCalled();
        expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
      });

      it('should reject when client sends amount=0', async () => {
        const input = createPaymentRequestInput({ amount: 0, order_id: 'order-123' });
        const mockOrder = createMockOrder({ total: 80 });

        orderService.findOne.mockResolvedValue(mockOrder as never);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 60000 } as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Payment amount does not match order total'
        );
      });
    });

    describe('Missing / Unseeded Exchange Rate Tests (Fail-Closed)', () => {
      it('should reject when CurrencyService returns null (no exchange rate configured)', async () => {
        const input = createPaymentRequestInput({ amount: 4800000, order_id: 'order-123' });
        const mockOrder = createMockOrder({ total: 80 });

        orderService.findOne.mockResolvedValue(mockOrder as never);
        currencyService.getCurrentExchangeRate.mockResolvedValue(null);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Exchange rate is not configured or invalid. Cannot process ZarinPal payment.'
        );

        expect(paymentService.requestPayment).not.toHaveBeenCalled();
        expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
      });

      it('should reject when CurrencyService returns rate = 1', async () => {
        const input = createPaymentRequestInput({ amount: 4800000, order_id: 'order-123' });
        const mockOrder = createMockOrder({ total: 80 });

        orderService.findOne.mockResolvedValue(mockOrder as never);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 1 } as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Exchange rate is not configured or invalid. Cannot process ZarinPal payment.'
        );
      });

      it('should reject when CurrencyService returns rate = 0', async () => {
        const input = createPaymentRequestInput({ amount: 4800000, order_id: 'order-123' });
        const mockOrder = createMockOrder({ total: 80 });

        orderService.findOne.mockResolvedValue(mockOrder as never);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 0 } as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Exchange rate is not configured or invalid. Cannot process ZarinPal payment.'
        );
      });

      it('should reject when CurrencyService returns negative rate', async () => {
        const input = createPaymentRequestInput({ amount: 4800000, order_id: 'order-123' });
        const mockOrder = createMockOrder({ total: 80 });

        orderService.findOne.mockResolvedValue(mockOrder as never);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: -100 } as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Exchange rate is not configured or invalid. Cannot process ZarinPal payment.'
        );
      });

      it('should reject when CurrencyService returns NaN rate', async () => {
        const input = createPaymentRequestInput({ amount: 4800000, order_id: 'order-123' });
        const mockOrder = createMockOrder({ total: 80 });

        orderService.findOne.mockResolvedValue(mockOrder as never);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: NaN } as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Exchange rate is not configured or invalid. Cannot process ZarinPal payment.'
        );
      });

      it('should reject when CurrencyService returns Infinity rate', async () => {
        const input = createPaymentRequestInput({ amount: 4800000, order_id: 'order-123' });
        const mockOrder = createMockOrder({ total: 80 });

        orderService.findOne.mockResolvedValue(mockOrder as never);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: Infinity } as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Exchange rate is not configured or invalid. Cannot process ZarinPal payment.'
        );
      });
    });

    describe('Non-Pending Order Tests', () => {
      it('should reject when order status is CONFIRMED', async () => {
        const input = createPaymentRequestInput({ order_id: 'order-123' });
        const mockOrder = createMockOrder({ status: OrderStatus.CONFIRMED });

        orderService.findOne.mockResolvedValue(mockOrder as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Order order-123 is not in PENDING status and cannot be paid'
        );

        expect(currencyService.getCurrentExchangeRate).not.toHaveBeenCalled();
      });

      it('should reject when order status is CANCELLED', async () => {
        const input = createPaymentRequestInput({ order_id: 'order-123' });
        const mockOrder = createMockOrder({ status: OrderStatus.CANCELLED });

        orderService.findOne.mockResolvedValue(mockOrder as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Order order-123 is not in PENDING status and cannot be paid'
        );
      });

      it('should reject when order status is SHIPPED', async () => {
        const input = createPaymentRequestInput({ order_id: 'order-123' });
        const mockOrder = createMockOrder({ status: OrderStatus.SHIPPED });

        orderService.findOne.mockResolvedValue(mockOrder as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Order order-123 is not in PENDING status and cannot be paid'
        );
      });

      it('should reject when order does not exist', async () => {
        const input = createPaymentRequestInput({ order_id: 'nonexistent' });

        orderService.findOne.mockResolvedValue(undefined as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow('Order not found');
      });
    });

    describe('Valid Server-Computed Amount Tests', () => {
      it('should succeed with valid order, valid rate, and matching client amount', async () => {
        const input = createPaymentRequestInput({ amount: 4800000, order_id: 'order-123' });
        const mockOrder = createMockOrder({ total: 80 });
        const authority = 'A00000000000000000000000000000000000000';

        orderService.findOne.mockResolvedValue(mockOrder as never);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 60000 } as never);
        paymentService.requestPayment.mockResolvedValue({
          data: { code: 100, message: 'Success', authority, fee_type: 'Merchant', fee: 0 },
          errors: [],
        } as never);
        orderService.setPaymentIntent.mockResolvedValue(undefined as never);

        const result = await resolver.requestZarinPalPayment(input);

        expect(currencyService.getCurrentExchangeRate).toHaveBeenCalledWith('USD', 'IRR');
        expect(paymentService.requestPayment).toHaveBeenCalledWith(
          expect.objectContaining({ amount: 4800000 })
        );
        expect(orderService.setPaymentIntent).toHaveBeenCalledWith(
          expect.objectContaining({
            orderId: 'order-123',
            authority,
            amount: 4800000,
          })
        );
        expect(result.authority).toBe(authority);
        expect(result.code).toBe(100);
      });

      it('should use server-computed amount even when client sends no amount', async () => {
        const input = createPaymentRequestInput({ order_id: 'order-123' });
        delete (input as unknown as Record<string, unknown>)['amount'];
        const mockOrder = createMockOrder({ total: 100 });
        const authority = 'A00000000000000000000000000000000000001';

        orderService.findOne.mockResolvedValue(mockOrder as never);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 55000 } as never);
        paymentService.requestPayment.mockResolvedValue({
          data: { code: 100, message: 'Success', authority, fee_type: 'Merchant', fee: 0 },
          errors: [],
        } as never);
        orderService.setPaymentIntent.mockResolvedValue(undefined as never);

        const result = await resolver.requestZarinPalPayment(input);

        expect(paymentService.requestPayment).toHaveBeenCalledWith(
          expect.objectContaining({ amount: 5500000 }) // 100 * 55000
        );
        expect(orderService.setPaymentIntent).toHaveBeenCalledWith(
          expect.objectContaining({ amount: 5500000 })
        );
        expect(result.authority).toBe(authority);
      });

      it('should allow small rounding tolerance (within 0.1% or 1 Toman)', async () => {
        const input = createPaymentRequestInput({ amount: 4800005, order_id: 'order-123' }); // Off by 5 Tomans (within 0.1% of 4,800,000)
        const mockOrder = createMockOrder({ total: 80 });
        const authority = 'A00000000000000000000000000000000000002';

        orderService.findOne.mockResolvedValue(mockOrder as never);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 60000 } as never);
        paymentService.requestPayment.mockResolvedValue({
          data: { code: 100, message: 'Success', authority, fee_type: 'Merchant', fee: 0 },
          errors: [],
        } as never);
        orderService.setPaymentIntent.mockResolvedValue(undefined as never);

        const result = await resolver.requestZarinPalPayment(input);

        expect(paymentService.requestPayment).toHaveBeenCalledWith(
          expect.objectContaining({ amount: 4800000 }) // Server uses expectedAmount, not client amount
        );
        expect(result.authority).toBe(authority);
      });

      it('should compute correct amount for different order totals and rates', async () => {
        const testCases = [
          { total: 10, rate: 60000, expected: 600000 },
          { total: 150.5, rate: 58000, expected: 8729000 }, // 150.5 * 58000 = 8,729,000
          { total: 0.01, rate: 65000, expected: 650 }, // Minimum order
          { total: 9999.99, rate: 62000, expected: 619999380 }, // Large order
        ];

        for (const { total, rate, expected } of testCases) {
          jest.clearAllMocks();
          const input = createPaymentRequestInput({ amount: expected, order_id: `order-${total}` });
          const mockOrder = createMockOrder({ id: `order-${total}`, total });
          const authority = `A${Math.random().toString(36).substring(2, 15)}`;

          orderService.findOne.mockResolvedValue(mockOrder as never);
          currencyService.getCurrentExchangeRate.mockResolvedValue({ rate } as never);
          paymentService.requestPayment.mockResolvedValue({
            data: { code: 100, message: 'Success', authority, fee_type: 'Merchant', fee: 0 },
            errors: [],
          } as never);
          orderService.setPaymentIntent.mockResolvedValue(undefined as never);

          const result = await resolver.requestZarinPalPayment(input);

          expect(paymentService.requestPayment).toHaveBeenCalledWith(
            expect.objectContaining({ amount: expected })
          );
          expect(result.authority).toBe(authority);
        }
      });

      it('should reject when order total is not finite', async () => {
        const input = createPaymentRequestInput({ order_id: 'order-123' });
        const mockOrder = createMockOrder({ total: NaN });

        orderService.findOne.mockResolvedValue(mockOrder as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Order total is invalid or missing'
        );
      });

      it('should reject when order total is zero', async () => {
        const input = createPaymentRequestInput({ order_id: 'order-123' });
        const mockOrder = createMockOrder({ total: 0 });

        orderService.findOne.mockResolvedValue(mockOrder as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Order total is invalid or missing'
        );
      });

      it('should reject when order total is negative', async () => {
        const input = createPaymentRequestInput({ order_id: 'order-123' });
        const mockOrder = createMockOrder({ total: -100 });

        orderService.findOne.mockResolvedValue(mockOrder as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Order total is invalid or missing'
        );
      });
    });
  });

  describe('cancelPendingZarinPalOrder', () => {
    const authority = 'A00000123';
    const orderId = 'order-123';

    const createPendingOrder = (overrides: Partial<{
      id: string;
      status: OrderStatus;
      paymentAuthority: string | null;
    }> = {}) => ({
      id: orderId,
      status: OrderStatus.PENDING,
      paymentAuthority: authority,
      ...overrides,
    });

    const createCancelledOrder = (overrides: Partial<{
      id: string;
      status: OrderStatus;
      paymentAuthority: string | null;
    }> = {}) => ({
      id: orderId,
      status: OrderStatus.CANCELLED,
      paymentAuthority: authority,
      ...overrides,
    });

    const createConfirmedOrder = (overrides: Partial<{
      id: string;
      status: OrderStatus;
      paymentAuthority: string | null;
    }> = {}) => ({
      id: orderId,
      status: OrderStatus.CONFIRMED,
      paymentAuthority: authority,
      ...overrides,
    });

    beforeEach(() => {
      orderService.findOrdersByPaymentAuthority.mockResolvedValue([]);
      orderService.findOne.mockResolvedValue(createPendingOrder() as never);
      orderService.cancelPendingOrder.mockResolvedValue(createCancelledOrder() as never);
    });

    describe('Guest Cancel with Valid authority Test', () => {
      it('should succeed when unauthenticated guest calls with valid authority and orderId', async () => {
        const pendingOrder = createPendingOrder();
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([pendingOrder] as never);
        orderService.findOne.mockResolvedValue(pendingOrder as never);
        orderService.cancelPendingOrder.mockResolvedValue(createCancelledOrder() as never);

        const result = await resolver.cancelPendingZarinPalOrder(orderId, authority);

        expect(orderService.findOrdersByPaymentAuthority).toHaveBeenCalledWith(authority);
        expect(orderService.findOne).toHaveBeenCalledWith(orderId);
        expect(orderService.cancelPendingOrder).toHaveBeenCalledWith(orderId);
        expect(result).toBe(true);
      });

      it('should succeed when unauthenticated guest calls with authority only (no orderId in sessionStorage)', async () => {
        const pendingOrder = createPendingOrder();
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([pendingOrder] as never);
        orderService.cancelPendingOrder.mockResolvedValue(createCancelledOrder() as never);

        const result = await resolver.cancelPendingZarinPalOrder(undefined, authority);

        expect(orderService.findOrdersByPaymentAuthority).toHaveBeenCalledWith(authority);
        expect(orderService.findOne).not.toHaveBeenCalled();
        expect(orderService.cancelPendingOrder).toHaveBeenCalledWith(orderId);
        expect(result).toBe(true);
      });
    });

    describe('Unauthenticated Caller With Mismatched / Missing authority Test', () => {
      it('should reject when caller passes orderId with wrong authority', async () => {
        const pendingOrder = createPendingOrder({ paymentAuthority: authority });
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([pendingOrder] as never);
        orderService.findOne.mockResolvedValue(pendingOrder as never);

        await expect(resolver.cancelPendingZarinPalOrder(orderId, 'WRONG_AUTHORITY')).rejects.toThrow(
          'Order does not match the provided payment authority'
        );

        expect(orderService.cancelPendingOrder).not.toHaveBeenCalled();
      });

      it('should reject when caller passes orderId without authority', async () => {
        await expect(resolver.cancelPendingZarinPalOrder(orderId, undefined)).rejects.toThrow(
          'Payment authority is required to cancel a pending order'
        );

        expect(orderService.findOrdersByPaymentAuthority).not.toHaveBeenCalled();
        expect(orderService.cancelPendingOrder).not.toHaveBeenCalled();
      });

      it('should reject when caller passes empty authority string', async () => {
        await expect(resolver.cancelPendingZarinPalOrder(orderId, '')).rejects.toThrow(
          'Payment authority is required to cancel a pending order'
        );

        expect(orderService.cancelPendingOrder).not.toHaveBeenCalled();
      });

      it('should reject when caller passes authority with no matching order', async () => {
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([]);

        await expect(resolver.cancelPendingZarinPalOrder(undefined, 'NONEXISTENT_AUTHORITY')).rejects.toThrow(
          'No matching order found for payment authority'
        );

        expect(orderService.cancelPendingOrder).not.toHaveBeenCalled();
      });
    });

    describe('Already CONFIRMED Order Test', () => {
      it('should reject when authority belongs to a CONFIRMED order', async () => {
        const confirmedOrder = createConfirmedOrder();
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([confirmedOrder] as never);

        await expect(resolver.cancelPendingZarinPalOrder(undefined, authority)).rejects.toThrow(
          `Cannot cancel order ${orderId} with status ${OrderStatus.CONFIRMED}. Only PENDING orders can be cancelled.`
        );

        expect(orderService.cancelPendingOrder).not.toHaveBeenCalled();
      });

      it('should reject when orderId + authority belongs to a CONFIRMED order', async () => {
        const confirmedOrder = createConfirmedOrder();
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([confirmedOrder] as never);
        orderService.findOne.mockResolvedValue(confirmedOrder as never);

        await expect(resolver.cancelPendingZarinPalOrder(orderId, authority)).rejects.toThrow(
          `Cannot cancel order ${orderId} with status ${OrderStatus.CONFIRMED}. Only PENDING orders can be cancelled.`
        );

        expect(orderService.cancelPendingOrder).not.toHaveBeenCalled();
      });
    });

    describe('Idempotent Repeat CANCELLED Test', () => {
      it('should succeed idempotently when order is already CANCELLED (authority only)', async () => {
        const cancelledOrder = createCancelledOrder();
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([cancelledOrder] as never);

        const result = await resolver.cancelPendingZarinPalOrder(undefined, authority);

        expect(orderService.cancelPendingOrder).not.toHaveBeenCalled();
        expect(result).toBe(true);
      });

      it('should succeed idempotently when order is already CANCELLED (orderId + authority)', async () => {
        const cancelledOrder = createCancelledOrder();
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([cancelledOrder] as never);
        orderService.findOne.mockResolvedValue(cancelledOrder as never);

        const result = await resolver.cancelPendingZarinPalOrder(orderId, authority);

        expect(orderService.cancelPendingOrder).not.toHaveBeenCalled();
        expect(result).toBe(true);
      });
    });

    describe('Multiple Orders with Same Authority', () => {
      it('should cancel all PENDING orders sharing the same authority', async () => {
        const order1 = createPendingOrder({ id: 'order-1' });
        const order2 = createPendingOrder({ id: 'order-2', paymentAuthority: authority });
        const order3 = createCancelledOrder({ id: 'order-3', paymentAuthority: authority });

        orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2, order3] as never);
        orderService.cancelPendingOrder
          .mockResolvedValueOnce(createCancelledOrder({ id: 'order-1' }) as never)
          .mockResolvedValueOnce(createCancelledOrder({ id: 'order-2' }) as never);

        const result = await resolver.cancelPendingZarinPalOrder(undefined, authority);

        expect(orderService.cancelPendingOrder).toHaveBeenCalledTimes(2);
        expect(orderService.cancelPendingOrder).toHaveBeenCalledWith('order-1');
        expect(orderService.cancelPendingOrder).toHaveBeenCalledWith('order-2');
        expect(result).toBe(true);
      });
    });
  });

  describe('Multi-Seller Batch orderIds Tests', () => {
    const createMockOrder = (overrides: Partial<{
      id: string;
      status: OrderStatus;
      total: number;
      customerId: string | null;
      customerEmail: string | null;
      paymentAuthority: string | null;
      paymentAmount: number | null;
      paymentCurrency: string | null;
      orderNumber: string;
    }> = {}) => ({
      id: 'order-123',
      status: OrderStatus.PENDING,
      total: 80,
      customerId: 'cust-A',
      customerEmail: 'test@example.com',
      paymentAuthority: null,
      paymentAmount: null,
      paymentCurrency: null,
      orderNumber: 'ORD-123',
      ...overrides,
    });

    const authority = 'A00000000000000000000000000000000000000';
    const refId = 123456;

    beforeEach(() => {
      jest.clearAllMocks();
      orderService.findOrdersByPaymentAuthority.mockResolvedValue([]);
      orderService.setPaymentIntent.mockResolvedValue(undefined as never);
      orderService.confirmOrderPayment.mockResolvedValue(undefined as never);
      orderService.cancelPendingOrder.mockResolvedValue(undefined as never);
    });

    describe('requestZarinPalPayment - Multi-Seller Batch', () => {
      it('should request payment once for batch total and bind authority to all orders', async () => {
        const order1 = createMockOrder({ id: 'order-1', total: 40, orderNumber: 'ORD-001' });
        const order2 = createMockOrder({ id: 'order-2', total: 60, orderNumber: 'ORD-002' });

        orderService.findOne
          .mockResolvedValueOnce(order1 as never)
          .mockResolvedValueOnce(order2 as never);

        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 60000 } as never);

        paymentService.requestPayment.mockResolvedValue({
          data: { code: 100, message: 'Success', authority, fee_type: 'Merchant', fee: 0 },
          errors: [],
        } as never);

        const input = {
          amount: 6000000, // (40 + 60) * 60000 = 6,000,000
          callback_url: 'https://example.com/callback',
          description: 'Test',
          currency: 'IRT',
          orderIds: ['order-1', 'order-2'],
        } as never;

        const result = await resolver.requestZarinPalPayment(input);

        expect(paymentService.requestPayment).toHaveBeenCalledTimes(1);
        expect(paymentService.requestPayment).toHaveBeenCalledWith(
          expect.objectContaining({ amount: 6000000 })
        );

        // setPaymentIntent should be called for BOTH orders with the shared authority
        expect(orderService.setPaymentIntent).toHaveBeenCalledTimes(2);
        expect(orderService.setPaymentIntent).toHaveBeenCalledWith(
          expect.objectContaining({
            orderId: 'order-1',
            authority,
            amount: 6000000,
          })
        );
        expect(orderService.setPaymentIntent).toHaveBeenCalledWith(
          expect.objectContaining({
            orderId: 'order-2',
            authority,
            amount: 6000000,
          })
        );

        expect(result.authority).toBe(authority);
        expect(result.code).toBe(100);
      });

      it('should reject when orders belong to different customers (cross-customer spoofing)', async () => {
        const order1 = createMockOrder({ id: 'order-1', customerId: 'cust-A', customerEmail: 'a@test.com' });
        const order2 = createMockOrder({ id: 'order-2', customerId: 'cust-B', customerEmail: 'b@test.com' });

        orderService.findOne
          .mockResolvedValueOnce(order1 as never)
          .mockResolvedValueOnce(order2 as never);

        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 60000 } as never);

        const input = {
          amount: 6000000,
          callback_url: 'https://example.com/callback',
          description: 'Test',
          currency: 'IRT',
          orderIds: ['order-1', 'order-2'],
        } as never;

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'All orders in a batch must belong to the same customer'
        );

        expect(paymentService.requestPayment).not.toHaveBeenCalled();
        expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
      });

      it('should reject when any order is not PENDING', async () => {
        const order1 = createMockOrder({ id: 'order-1', status: OrderStatus.PENDING });
        const order2 = createMockOrder({ id: 'order-2', status: OrderStatus.CONFIRMED });

        orderService.findOne
          .mockResolvedValueOnce(order1 as never)
          .mockResolvedValueOnce(order2 as never);

        const input = {
          amount: 6000000,
          callback_url: 'https://example.com/callback',
          description: 'Test',
          currency: 'IRT',
          orderIds: ['order-1', 'order-2'],
        } as never;

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Order(s) order-2 are not in PENDING status and cannot be paid'
        );

        expect(paymentService.requestPayment).not.toHaveBeenCalled();
      });

      it('should reject when any order does not exist', async () => {
        const order1 = createMockOrder({ id: 'order-1' });

        orderService.findOne
          .mockResolvedValueOnce(order1 as never)
          .mockResolvedValueOnce(null as never);

        const input = {
          amount: 6000000,
          callback_url: 'https://example.com/callback',
          description: 'Test',
          currency: 'IRT',
          orderIds: ['order-1', 'order-nonexistent'],
        } as never;

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Order(s) not found: order-nonexistent'
        );
      });

      it('should work with single orderId (backward compatibility)', async () => {
        const order1 = createMockOrder({ id: 'order-1', total: 100 });

        orderService.findOne.mockResolvedValue(order1 as never);
        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 55000 } as never);
        paymentService.requestPayment.mockResolvedValue({
          data: { code: 100, message: 'Success', authority, fee_type: 'Merchant', fee: 0 },
          errors: [],
        } as never);

        const input = {
          amount: 5500000,
          callback_url: 'https://example.com/callback',
          description: 'Test',
          currency: 'IRT',
          order_id: 'order-1',
        } as never;

        const result = await resolver.requestZarinPalPayment(input);

        expect(orderService.findOne).toHaveBeenCalledTimes(1);
        expect(orderService.setPaymentIntent).toHaveBeenCalledTimes(1);
        expect(result.authority).toBe(authority);
      });

      it('should deduplicate orderIds and order_id', async () => {
        const order1 = createMockOrder({ id: 'order-1', total: 50 });
        const order2 = createMockOrder({ id: 'order-2', total: 50 });

        orderService.findOne
          .mockResolvedValueOnce(order1 as never)
          .mockResolvedValueOnce(order2 as never);

        currencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 60000 } as never);
        paymentService.requestPayment.mockResolvedValue({
          data: { code: 100, message: 'Success', authority, fee_type: 'Merchant', fee: 0 },
          errors: [],
        } as never);

        const input = {
          amount: 6000000,
          callback_url: 'https://example.com/callback',
          description: 'Test',
          currency: 'IRT',
          order_id: 'order-1',
          orderIds: ['order-1', 'order-2', 'order-1'], // duplicates
        } as never;

        await resolver.requestZarinPalPayment(input);

        // Should only call findOne twice (deduplicated)
        expect(orderService.findOne).toHaveBeenCalledTimes(2);
        expect(orderService.setPaymentIntent).toHaveBeenCalledTimes(2);
      });

      it('should reject when no orderIds provided', async () => {
        const input = {
          amount: 100000,
          callback_url: 'https://example.com/callback',
          description: 'Test',
          currency: 'IRT',
        } as never;

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'At least one orderId is required'
        );
      });
    });

    describe('verifyZarinPalPayment - Multi-Seller Batch', () => {
      it('should confirm ALL sibling orders when payment succeeds', async () => {
        const order1 = createMockOrder({
          id: 'order-1',
          paymentAuthority: authority,
          paymentAmount: 6000000,
          paymentCurrency: 'IRT',
          orderNumber: 'ORD-001',
        });
        const order2 = createMockOrder({
          id: 'order-2',
          paymentAuthority: authority,
          paymentAmount: 6000000,
          paymentCurrency: 'IRT',
          orderNumber: 'ORD-002',
        });

        orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as never);

        paymentService.verifyPayment.mockResolvedValue({
          data: { code: 100, message: 'Success', ref_id: refId },
          errors: [],
        } as never);

        const input = {
          amount: 6000000,
          authority,
          order_id: 'order-1',
        } as never;

        const result = await resolver.verifyZarinPalPayment(input);

        expect(orderService.findOrdersByPaymentAuthority).toHaveBeenCalledWith(authority);
        expect(orderService.confirmOrderPayment).toHaveBeenCalledTimes(2);
        expect(orderService.confirmOrderPayment).toHaveBeenCalledWith('order-1');
        expect(orderService.confirmOrderPayment).toHaveBeenCalledWith('order-2');

        // Verify response includes all order IDs
        expect(result.orderIds).toEqual(['order-1', 'order-2']);
        expect(result.orderId).toBe('order-1');
        expect(result.orderNumber).toBe('ORD-001, ORD-002');
        expect(result.ref_id).toBe(refId);
        expect(result.success).toBe(true);
      });

      it('should return success: false with refId when gateway returns 100 but confirmOrderPayment throws (insufficient stock)', async () => {
        const order1 = createMockOrder({
          id: 'order-1',
          paymentAuthority: authority,
          paymentAmount: 6000000,
          paymentCurrency: 'IRT',
          orderNumber: 'ORD-001',
        });

        orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1] as never);

        paymentService.verifyPayment.mockResolvedValue({
          data: { code: 100, message: 'Success', ref_id: refId },
          errors: [],
        } as never);

        const stockError = new BadRequestException('Insufficient stock');
        orderService.confirmOrderPayment.mockRejectedValue(stockError);

        const input = {
          amount: 6000000,
          authority,
          order_id: 'order-1',
        } as never;

        const result = await resolver.verifyZarinPalPayment(input);

        expect(orderService.findOrdersByPaymentAuthority).toHaveBeenCalledWith(authority);
        expect(orderService.confirmOrderPayment).toHaveBeenCalledTimes(1);
        expect(orderService.confirmOrderPayment).toHaveBeenCalledWith('order-1');

        // CRITICAL: Must return success: false when confirmOrderPayment throws
        expect(result.success).toBe(false);
        expect(result.code).toBe(100);
        expect(result.ref_id).toBe(refId);
        expect(result.orderId).toBe('order-1');
        expect(result.orderNumber).toBe('ORD-001');
        expect(result.message).toContain('Insufficient stock');
        expect(result.message).toContain(String(refId));
      });

      it('should return success: true idempotently when gateway returns 101 and all orders are already CONFIRMED with stock reserved', async () => {
        const order1 = createMockOrder({
          id: 'order-1',
          status: OrderStatus.CONFIRMED,
          paymentAuthority: authority,
          paymentAmount: 6000000,
          paymentCurrency: 'IRT',
          orderNumber: 'ORD-001',
        });
        const order2 = createMockOrder({
          id: 'order-2',
          status: OrderStatus.CONFIRMED,
          paymentAuthority: authority,
          paymentAmount: 6000000,
          paymentCurrency: 'IRT',
          orderNumber: 'ORD-002',
        });
        // Simulate stockReserved flag being true (or not false)
        (order1 as unknown as Record<string, unknown>)['stockReserved'] = true;
        (order2 as unknown as Record<string, unknown>)['stockReserved'] = true;

        orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as never);

        paymentService.verifyPayment.mockResolvedValue({
          data: { code: 101, message: 'Already verified', ref_id: refId },
          errors: [],
        } as never);

        const input = {
          amount: 6000000,
          authority,
          order_id: 'order-1',
        } as never;

        const result = await resolver.verifyZarinPalPayment(input);

        expect(orderService.findOrdersByPaymentAuthority).toHaveBeenCalledWith(authority);
        // Should NOT call confirmOrderPayment for already-confirmed orders with stock reserved
        expect(orderService.confirmOrderPayment).not.toHaveBeenCalled();

        expect(result.success).toBe(true);
        expect(result.code).toBe(101);
        expect(result.ref_id).toBe(refId);
        expect(result.orderIds).toEqual(['order-1', 'order-2']);
      });
it('does NOT treat CONFIRMED orders with stockReserved=undefined as idempotently reserved (matches entity default false)', async () => {
        const order1 = createMockOrder({
          id: 'order-1',
          status: OrderStatus.CONFIRMED,
          paymentAuthority: authority,
          paymentAmount: 6000000,
          paymentCurrency: 'IRT',
          orderNumber: 'ORD-001',
        });
        (order1 as unknown as Record<string, unknown>)['stockReserved'] = undefined;
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1] as never);
        paymentService.verifyPayment.mockResolvedValue({
          data: { code: 101, message: 'Already verified', ref_id: refId },
          errors: [],
        } as never);
        const result = await resolver.verifyZarinPalPayment({ amount: 6000000, authority, order_id: 'order-1' } as never);
        // Already-CONFIRMED orders are never re-confirmed; result is still a gateway success
        expect(orderService.confirmOrderPayment).not.toHaveBeenCalled();
        expect(result.success).toBe(true);
        expect(result.code).toBe(101);
      });

      it('should retry confirmOrderPayment when gateway returns 101 but order is still PENDING (previous attempt failed)', async () => {
        const order1 = createMockOrder({
          id: 'order-1',
          status: OrderStatus.PENDING, // Still PENDING because previous confirmOrderPayment failed
          paymentAuthority: authority,
          paymentAmount: 6000000,
          paymentCurrency: 'IRT',
          orderNumber: 'ORD-001',
        });

        orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1] as never);

        paymentService.verifyPayment.mockResolvedValue({
          data: { code: 101, message: 'Already verified', ref_id: refId },
          errors: [],
        } as never);

        // First call succeeds (simulating retry success)
        orderService.confirmOrderPayment.mockResolvedValue(undefined as never);

        const input = {
          amount: 6000000,
          authority,
          order_id: 'order-1',
        } as never;

        const result = await resolver.verifyZarinPalPayment(input);

        expect(orderService.findOrdersByPaymentAuthority).toHaveBeenCalledWith(authority);
        expect(orderService.confirmOrderPayment).toHaveBeenCalledTimes(1);
        expect(orderService.confirmOrderPayment).toHaveBeenCalledWith('order-1');

        expect(result.success).toBe(true);
        expect(result.code).toBe(101);
        expect(result.ref_id).toBe(refId);
      });

      it('should return success: false when gateway returns 101, order is PENDING, and confirmOrderPayment still throws', async () => {
        const order1 = createMockOrder({
          id: 'order-1',
          status: OrderStatus.PENDING,
          paymentAuthority: authority,
          paymentAmount: 6000000,
          paymentCurrency: 'IRT',
          orderNumber: 'ORD-001',
        });

        orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1] as never);

        paymentService.verifyPayment.mockResolvedValue({
          data: { code: 101, message: 'Already verified', ref_id: refId },
          errors: [],
        } as never);

        const stockError = new BadRequestException('Insufficient stock on retry');
        orderService.confirmOrderPayment.mockRejectedValue(stockError);

        const input = {
          amount: 6000000,
          authority,
          order_id: 'order-1',
        } as never;

        const result = await resolver.verifyZarinPalPayment(input);

        expect(orderService.findOrdersByPaymentAuthority).toHaveBeenCalledWith(authority);
        expect(orderService.confirmOrderPayment).toHaveBeenCalledTimes(1);

        // Should return success: false with refId
        expect(result.success).toBe(false);
        expect(result.code).toBe(101);
        expect(result.ref_id).toBe(refId);
        expect(result.message).toContain('Insufficient stock on retry');
        expect(result.message).toContain(String(refId));
      });

      it('should confirm orders in deterministic order (id ASC)', async () => {
        const order1 = createMockOrder({ id: 'order-b', paymentAuthority: authority, paymentAmount: 3000000 });
        const order2 = createMockOrder({ id: 'order-a', paymentAuthority: authority, paymentAmount: 3000000 });

        // Return in non-sorted order to test sorting
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as never);

        paymentService.verifyPayment.mockResolvedValue({
          data: { code: 100, message: 'Success', ref_id: refId },
          errors: [],
        } as never);

        const input = {
          amount: 6000000,
          authority,
          order_id: 'order-b',
        } as never;

        await resolver.verifyZarinPalPayment(input);

        // Should confirm in ASC order: order-a, then order-b
        const confirmCalls = orderService.confirmOrderPayment.mock.calls;
        expect(confirmCalls[0][0]).toBe('order-a');
        expect(confirmCalls[1][0]).toBe('order-b');
      });

      it('should cancel ALL sibling orders when payment fails (non-100/101)', async () => {
        const order1 = createMockOrder({ id: 'order-1', paymentAuthority: authority, paymentAmount: 6000000 });
        const order2 = createMockOrder({ id: 'order-2', paymentAuthority: authority, paymentAmount: 6000000 });

        orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as never);

        paymentService.verifyPayment.mockResolvedValue({
          data: { code: -51, message: 'Payment failed' },
          errors: [],
        } as never);

        const input = {
          amount: 6000000,
          authority,
          order_id: 'order-1',
        } as never;

        const result = await resolver.verifyZarinPalPayment(input);

        expect(orderService.cancelPendingOrder).toHaveBeenCalledTimes(2);
        expect(orderService.cancelPendingOrder).toHaveBeenCalledWith('order-1');
        expect(orderService.cancelPendingOrder).toHaveBeenCalledWith('order-2');

        expect(result.code).toBe(-51);
      });

      it('should only confirm PENDING orders, skip already confirmed ones', async () => {
        const order1 = createMockOrder({ id: 'order-1', status: OrderStatus.PENDING, paymentAuthority: authority, paymentAmount: 6000000 });
        const order2 = createMockOrder({ id: 'order-2', status: OrderStatus.CONFIRMED, paymentAuthority: authority, paymentAmount: 6000000 });

        orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as never);

        paymentService.verifyPayment.mockResolvedValue({
          data: { code: 100, message: 'Success', ref_id: refId },
          errors: [],
        } as never);

        const input = {
          amount: 6000000,
          authority,
          order_id: 'order-1',
        } as never;

        await resolver.verifyZarinPalPayment(input);

        // Should only confirm order-1 (PENDING), not order-2 (CONFIRMED)
        expect(orderService.confirmOrderPayment).toHaveBeenCalledTimes(1);
        expect(orderService.confirmOrderPayment).toHaveBeenCalledWith('order-1');
      });

      it('should rollback earlier confirmed orders when a later order fails in multi-order batch', async () => {
        // order-1 succeeds, order-2 fails with insufficient stock
        const order1 = createMockOrder({
          id: 'order-1',
          paymentAuthority: authority,
          paymentAmount: 6000000,
          paymentCurrency: 'IRT',
          orderNumber: 'ORD-001',
        });
        const order2 = createMockOrder({
          id: 'order-2',
          paymentAuthority: authority,
          paymentAmount: 6000000,
          paymentCurrency: 'IRT',
          orderNumber: 'ORD-002',
        });

        orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as never);

        paymentService.verifyPayment.mockResolvedValue({
          data: { code: 100, message: 'Success', ref_id: refId },
          errors: [],
        } as never);

        // First call (order-1) succeeds, second call (order-2) throws
        orderService.confirmOrderPayment
          .mockResolvedValueOnce(undefined as never)
          .mockRejectedValueOnce(new BadRequestException('Insufficient stock for order-2'));

        // Add updateOrderStatus mock for rollback verification
        orderService.updateOrderStatus = jest.fn().mockResolvedValue(undefined as never);

        const input = {
          amount: 6000000,
          authority,
          order_id: 'order-1',
        } as never;

        const result = await resolver.verifyZarinPalPayment(input);

        expect(orderService.findOrdersByPaymentAuthority).toHaveBeenCalledWith(authority);
        expect(orderService.confirmOrderPayment).toHaveBeenCalledTimes(2);
        expect(orderService.confirmOrderPayment).toHaveBeenCalledWith('order-1');
        expect(orderService.confirmOrderPayment).toHaveBeenCalledWith('order-2');

        // CRITICAL: Must return success: false with refId
        expect(result.success).toBe(false);
        expect(result.code).toBe(100);
        expect(result.ref_id).toBe(refId);
        expect(result.message).toContain('Insufficient stock for order-2');
        expect(result.message).toContain(String(refId));

        // Verify rollback was called for order-1
        expect(orderService.updateOrderStatus).toHaveBeenCalledTimes(1);
        expect(orderService.updateOrderStatus).toHaveBeenCalledWith('order-1', OrderStatus.CANCELLED);
      });

      it('should reject when no orders found for authority', async () => {
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([]);

        const input = {
          amount: 6000000,
          authority: 'NONEXISTENT',
          order_id: 'order-1',
        } as never;

        await expect(resolver.verifyZarinPalPayment(input)).rejects.toThrow(
          'No orders found for this payment authority'
        );
      });

      it('should reject when authority does not match order', async () => {
        const order1 = createMockOrder({ id: 'order-1', paymentAuthority: 'DIFFERENT_AUTHORITY' });

        orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1] as never);

        const input = {
          amount: 6000000,
          authority,
          order_id: 'order-1',
        } as never;

        await expect(resolver.verifyZarinPalPayment(input)).rejects.toThrow(
          'Payment authority does not match the order payment intent'
        );
      });

      it('should throw when findOrdersByPaymentAuthority returns empty array', async () => {
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([]);

        const input = {
          amount: 6000000,
          authority,
          order_id: 'order-1',
        } as never;

        await expect(resolver.verifyZarinPalPayment(input)).rejects.toThrow(
          'No orders found for this payment authority'
        );
      });

      describe('Pre-verify Stock Check - Fail Closed Before Gateway', () => {
        const createMockOrderWithItems = (overrides: Partial<{
          id: string;
          status: OrderStatus;
          paymentAuthority: string | null;
          paymentAmount: number | null;
          paymentCurrency: string | null;
          orderNumber: string;
          items: Array<{
            quantity: number;
            sellerProduct: { id: string; stockQuantity: number };
          }>;
        }> = {}) => ({
          id: 'order-123',
          status: OrderStatus.PENDING,
          paymentAuthority: authority,
          paymentAmount: 6000000,
          paymentCurrency: 'IRT',
          orderNumber: 'ORD-123',
          items: [],
          ...overrides,
        });

        it('should return success:false with ref_id when pre-verify stock check fails across batch (order-2 insufficient stock), confirmOrderPayment called 0 times', async () => {
          // order-1 has sufficient stock (sp-1 qty 1, stock 5)
          // order-2 has insufficient stock (sp-2 qty 3, stock 1)
          const order1 = createMockOrderWithItems({
            id: 'order-1',
            orderNumber: 'ORD-001',
            items: [
              { quantity: 1, sellerProduct: { id: 'sp-1', stockQuantity: 5 } },
            ],
          });
          const order2 = createMockOrderWithItems({
            id: 'order-2',
            orderNumber: 'ORD-002',
            items: [
              { quantity: 3, sellerProduct: { id: 'sp-2', stockQuantity: 1 } },
            ],
          });

          orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as never);

          paymentService.verifyPayment.mockResolvedValue({
            data: { code: 100, message: 'Success', ref_id: 111222 },
            errors: [],
          } as never);

          const input = {
            amount: 6000000,
            authority,
            order_id: 'order-1',
          } as never;

          await expect(resolver.verifyZarinPalPayment(input)).rejects.toThrow(
            'Insufficient stock for product sp-2: required 3, available 1'
          );
          expect(paymentService.verifyPayment).not.toHaveBeenCalled();
          expect(orderService.confirmOrderPayment).not.toHaveBeenCalled();
        });

        it('should return success:false with ref_id when aggregated stock check fails (two orders share same sellerProductId, combined qty > stock)', async () => {
          // order-1 requests qty 2 of sp-1 (stock 3)
          // order-2 requests qty 2 of sp-1 (stock 3) -> combined 4 > 3
          const order1 = createMockOrderWithItems({
            id: 'order-1',
            orderNumber: 'ORD-001',
            items: [
              { quantity: 2, sellerProduct: { id: 'sp-1', stockQuantity: 3 } },
            ],
          });
          const order2 = createMockOrderWithItems({
            id: 'order-2',
            orderNumber: 'ORD-002',
            items: [
              { quantity: 2, sellerProduct: { id: 'sp-1', stockQuantity: 3 } },
            ],
          });

          orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as never);

          paymentService.verifyPayment.mockResolvedValue({
            data: { code: 100, message: 'Success', ref_id: 222333 },
            errors: [],
          } as never);

          const input = {
            amount: 6000000,
            authority,
            order_id: 'order-1',
          } as never;

          await expect(resolver.verifyZarinPalPayment(input)).rejects.toThrow(
            'Insufficient stock for product sp-1: required 4, available 3'
          );
          expect(paymentService.verifyPayment).not.toHaveBeenCalled();
          expect(orderService.confirmOrderPayment).not.toHaveBeenCalled();
        });

        it('should rollback confirmed siblings when later order fails confirmOrderPayment (3-order batch, id ASC sort)', async () => {
          // Input orders: order-3, order-1, order-2 (unsorted)
          // After sort: order-1, order-2, order-3
          // order-1 confirms, order-2 confirms, order-3 throws
          const order1 = createMockOrderWithItems({
            id: 'order-1',
            orderNumber: 'ORD-001',
            paymentAmount: 150000,
            items: [{ quantity: 1, sellerProduct: { id: 'sp-x', stockQuantity: 10 } }],
          });
          const order2 = createMockOrderWithItems({
            id: 'order-2',
            orderNumber: 'ORD-002',
            paymentAmount: 150000,
            items: [{ quantity: 1, sellerProduct: { id: 'sp-x', stockQuantity: 10 } }],
          });
          const order3 = createMockOrderWithItems({
            id: 'order-3',
            orderNumber: 'ORD-003',
            paymentAmount: 150000,
            items: [{ quantity: 1, sellerProduct: { id: 'sp-3', stockQuantity: 10 } }],
          });

          // Return in unsorted order to test id ASC sorting
          orderService.findOrdersByPaymentAuthority.mockResolvedValue([order3, order1, order2] as never);

          paymentService.verifyPayment.mockResolvedValue({
            data: { code: 100, message: 'Verified', ref_id: 777888 },
            errors: [],
          } as never);

          // order-1 succeeds, order-2 succeeds, order-3 throws
          orderService.confirmOrderPayment
            .mockResolvedValueOnce(undefined as never) // order-1
            .mockResolvedValueOnce(undefined as never) // order-2
            .mockRejectedValueOnce(new BadRequestException('Insufficient stock for product sp-3 during lock'));

          // Mock updateOrderStatus for rollback verification
          orderService.updateOrderStatus = jest.fn().mockResolvedValue(undefined as never);

          const input = {
            amount: 150000,
            authority,
            order_id: 'order-1',
          } as never;

          const result = await resolver.verifyZarinPalPayment(input);

          // Confirm calls should be in id ASC order: order-1, order-2, order-3
          expect(orderService.confirmOrderPayment).toHaveBeenNthCalledWith(1, 'order-1');
          expect(orderService.confirmOrderPayment).toHaveBeenNthCalledWith(2, 'order-2');
          expect(orderService.confirmOrderPayment).toHaveBeenNthCalledWith(3, 'order-3');

          // Rollback should be called for BOTH order-1 and order-2
          expect(orderService.updateOrderStatus).toHaveBeenCalledTimes(2);
          expect(orderService.updateOrderStatus).toHaveBeenNthCalledWith(1, 'order-1', OrderStatus.CANCELLED);
          expect(orderService.updateOrderStatus).toHaveBeenNthCalledWith(2, 'order-2', OrderStatus.CANCELLED);

          // Must return success: false with ref_id
          expect(result.success).toBe(false);
          expect(result.code).toBe(100);
          expect(result.ref_id).toBe(777888);
          expect(result.message).toContain('777888');
        });

        it('should survive rollback failure (updateOrderStatus rejects) and still return success:false with ref_id', async () => {
          const order1 = createMockOrderWithItems({
            id: 'order-1',
            orderNumber: 'ORD-001',
            paymentAmount: 100000,
            items: [{ quantity: 1, sellerProduct: { id: 'sp-1', stockQuantity: 10 } }],
          });
          const order2 = createMockOrderWithItems({
            id: 'order-2',
            orderNumber: 'ORD-002',
            paymentAmount: 100000,
            items: [{ quantity: 1, sellerProduct: { id: 'sp-2', stockQuantity: 10 } }],
          });

          orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as never);

          paymentService.verifyPayment.mockResolvedValue({
            data: { code: 100, message: 'Verified', ref_id: 444555 },
            errors: [],
          } as never);

          // order-1 confirms, order-2 throws
          orderService.confirmOrderPayment
            .mockResolvedValueOnce(undefined as never) // order-1
            .mockRejectedValueOnce(new Error('Confirmation DB failure'));

          // updateOrderStatus for rollback ALSO rejects (DB connection lost)
          orderService.updateOrderStatus = jest.fn().mockRejectedValue(new Error('Rollback DB connection lost'));

          const input = {
            amount: 100000,
            authority,
            order_id: 'order-1',
          } as never;

          const result = await resolver.verifyZarinPalPayment(input);

          // Should NOT throw unhandled error
          // Should have attempted rollback for order-1
          expect(orderService.updateOrderStatus).toHaveBeenCalledWith('order-1', OrderStatus.CANCELLED);

          // Must return success: false with ref_id and original error message
          expect(result.success).toBe(false);
          expect(result.code).toBe(100);
          expect(result.ref_id).toBe(444555);
          expect(result.message).toContain('Confirmation DB failure');
        });
      });
    });

    describe('cancelPendingZarinPalOrder - Multi-Seller Batch', () => {
      it('should cancel all PENDING sibling orders sharing the same authority', async () => {
        const order1 = createMockOrder({ id: 'order-1', paymentAuthority: authority });
        const order2 = createMockOrder({ id: 'order-2', paymentAuthority: authority });
        const order3 = createMockOrder({ id: 'order-3', status: OrderStatus.CANCELLED, paymentAuthority: authority });

        orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2, order3] as never);
        orderService.cancelPendingOrder
          .mockResolvedValueOnce(createMockOrder({ id: 'order-1', status: OrderStatus.CANCELLED }) as never)
          .mockResolvedValueOnce(createMockOrder({ id: 'order-2', status: OrderStatus.CANCELLED }) as never);

        const result = await resolver.cancelPendingZarinPalOrder(undefined, authority);

        expect(orderService.findOrdersByPaymentAuthority).toHaveBeenCalledWith(authority);
        expect(orderService.cancelPendingOrder).toHaveBeenCalledTimes(2);
        expect(orderService.cancelPendingOrder).toHaveBeenCalledWith('order-1');
        expect(orderService.cancelPendingOrder).toHaveBeenCalledWith('order-2');
        // Should NOT cancel order-3 (already CANCELLED)
        expect(orderService.cancelPendingOrder).not.toHaveBeenCalledWith('order-3');
        expect(result).toBe(true);
      });
    });
  });
});
