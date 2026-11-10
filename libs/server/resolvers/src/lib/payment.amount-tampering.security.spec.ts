import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { PaymentResolver } from './payment.resolver';
import { PaymentService, OrderService, CurrencyService } from '@kickzone-workspace/services';
import { OrderStatus, Order } from '@kickzone-workspace/entities';
import { ZarinPalPaymentRequestInput } from './payment.resolver';

describe('PaymentResolver - Amount Tampering Security Tests', () => {
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
    recalculateBatchOrdersShipping: jest.fn(),
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
    shippingCost: number;
    paymentAuthority: string | null;
    paymentAmount: number | null;
    paymentCurrency: string | null;
    customerEmail: string | null;
    notes: string | null;
    orderNumber: string;
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
    ...overrides,
  });

  describe('requestZarinPalPayment - Single-Order ZarinPal Amount Tampering', () => {
    const orderId = 'order-1';
    const rate = 60000;
    const orderTotalUsd = 100;
    const expectedBatchAmount = Math.round(orderTotalUsd * rate); // 6,000,000

    beforeEach(() => {
      jest.clearAllMocks();
      const mockOrder = createMockOrder({ id: orderId, total: orderTotalUsd, shippingCost: 0 });
      orderService.findOne.mockResolvedValue(mockOrder as never);
      currencyService.getCurrentExchangeRate.mockResolvedValue({ rate } as never);
    });

    it('should reject client amount 5993999 (below tolerance) with BadRequestException', async () => {
      const input = createPaymentRequestInput({ amount: 5993999, order_id: orderId });

      await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
        BadRequestException
      );
      await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
        'Payment amount does not match order total'
      );

      expect(paymentService.requestPayment).not.toHaveBeenCalled();
      expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
    });

    it('should reject client amount 6006001 (above tolerance) with BadRequestException', async () => {
      const input = createPaymentRequestInput({ amount: 6006001, order_id: orderId });

      await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
        BadRequestException
      );
      await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
        'Payment amount does not match order total'
      );

      expect(paymentService.requestPayment).not.toHaveBeenCalled();
      expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
    });

    it('should accept client amount 5994000 (within lower tolerance) and use server amount 6000000', async () => {
      const authority = 'A00000000000000000000000000000000000001';
      const input = createPaymentRequestInput({ amount: 5994000, order_id: orderId });

      paymentService.requestPayment.mockResolvedValue({
        data: { code: 100, message: 'Success', authority, fee_type: 'Merchant', fee: 0 },
        errors: [],
      } as never);
      orderService.setPaymentIntent.mockResolvedValue(undefined as never);

      const result = await resolver.requestZarinPalPayment(input);

      expect(paymentService.requestPayment).toHaveBeenCalledWith(
        expect.objectContaining({ amount: expectedBatchAmount })
      );
      expect(orderService.setPaymentIntent).toHaveBeenCalledWith(
        expect.objectContaining({ amount: expectedBatchAmount })
      );
      expect(result.authority).toBe(authority);
    });

    it('should reject client amount 100 (raw USD instead of Toman) with BadRequestException', async () => {
      const input = createPaymentRequestInput({ amount: 100, order_id: orderId });

      await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
        BadRequestException
      );
      await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
        'Payment amount does not match order total'
      );

      expect(paymentService.requestPayment).not.toHaveBeenCalled();
      expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
    });
  });

  describe('requestZarinPalPayment - Multi-Seller Batch Amount Tampering', () => {
    const orderId1 = 'order-1';
    const orderId2 = 'order-2';
    const rate = 60000;
    const combinedTotalUsd = 160;
    const expectedBatchAmount = Math.round(combinedTotalUsd * rate); // 9,600,000

    const baseOrder1 = createMockOrder({
      id: orderId1,
      total: 100,
      shippingCost: 0,
      customerEmail: 'customer@example.com',
      orderNumber: 'ORD-001',
    });
    const baseOrder2 = createMockOrder({
      id: orderId2,
      total: 60,
      shippingCost: 10,
      customerEmail: 'customer@example.com',
      orderNumber: 'ORD-002',
    });

    beforeEach(() => {
      jest.clearAllMocks();
      // Mock recalculateBatchOrdersShipping to mutate orders as specified and return them
      orderService.recalculateBatchOrdersShipping.mockImplementation(async (orders: Order[]) => {
        for (const order of orders) {
          if (order.id === orderId1) {
            order.shippingCost = 0;
            order.total = 100;
          } else if (order.id === orderId2) {
            order.shippingCost = 10;
            order.total = 60;
          }
        }
        return orders;
      });
      // Mock findOne to return the base orders (they will be mutated by recalculateBatchOrdersShipping)
      orderService.findOne
        .mockResolvedValueOnce(baseOrder1 as never)
        .mockResolvedValueOnce(baseOrder2 as never);
      currencyService.getCurrentExchangeRate.mockResolvedValue({ rate } as never);
    });

    const createBatchInput = (amount: number): ZarinPalPaymentRequestInput => ({
      amount,
      callback_url: 'https://example.com/callback',
      description: 'Batch Payment',
      currency: 'IRT',
      orderIds: [orderId1, orderId2],
    } as never);

    it('should reject client amount 10200000 (above tolerance) with BadRequestException', async () => {
      const input = createBatchInput(10200000);

      await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
        BadRequestException
      );
      await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
        'Payment amount does not match batch order total'
      );

      expect(paymentService.requestPayment).not.toHaveBeenCalled();
      expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
    });

    it('should reject client amount 9000000 (below tolerance) with BadRequestException', async () => {
      const input = createBatchInput(9000000);

      await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
        BadRequestException
      );
      await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
        'Payment amount does not match batch order total'
      );

      expect(paymentService.requestPayment).not.toHaveBeenCalled();
      expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
    });

    it('should reject client amount 9599989 (below tolerance by 1) with BadRequestException', async () => {
      const input = createBatchInput(9599989);

      await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
        BadRequestException
      );
      await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
        'Payment amount does not match batch order total'
      );

      expect(paymentService.requestPayment).not.toHaveBeenCalled();
      expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
    });

    it('should accept client amount 9599990 (within tolerance) and use server amount 9600000 for both orders', async () => {
      const authority = 'A00000000000000000000000000000000000002';
      const input = createBatchInput(9599990);

      paymentService.requestPayment.mockResolvedValue({
        data: { code: 100, message: 'Success', authority, fee_type: 'Merchant', fee: 0 },
        errors: [],
      } as never);
      orderService.setPaymentIntent.mockResolvedValue(undefined as never);

      const result = await resolver.requestZarinPalPayment(input);

      expect(paymentService.requestPayment).toHaveBeenCalledWith(
        expect.objectContaining({ amount: expectedBatchAmount })
      );
      expect(orderService.setPaymentIntent).toHaveBeenCalledTimes(2);
      expect(orderService.setPaymentIntent).toHaveBeenCalledWith(
        expect.objectContaining({ orderId: orderId1, amount: expectedBatchAmount })
      );
      expect(orderService.setPaymentIntent).toHaveBeenCalledWith(
        expect.objectContaining({ orderId: orderId2, amount: expectedBatchAmount })
      );
      expect(result.authority).toBe(authority);
    });
  });

  describe('requestZarinPalPayment - Fail-Closed FX Rate Guards', () => {
    const orderId = 'order-1';
    const baseOrder = createMockOrder({ id: orderId, total: 100 });

    beforeEach(() => {
      jest.clearAllMocks();
      orderService.findOne.mockResolvedValue(baseOrder as never);
    });

    const invalidRates = [
      { description: 'null', value: null },
      { description: 'undefined', value: undefined },
      { description: 'rate 0', value: { rate: 0 } },
      { description: 'rate 1', value: { rate: 1 } },
      { description: 'negative rate', value: { rate: -50000 } },
      { description: 'NaN rate', value: { rate: NaN } },
      { description: 'Infinity rate', value: { rate: Infinity } },
      { description: 'invalid string rate', value: { rate: 'invalid' } },
    ];

    for (const { description, value } of invalidRates) {
      it(`should reject when CurrencyService returns ${description} with BadRequestException`, async () => {
        const input = createPaymentRequestInput({ amount: 6000000, order_id: orderId });
        // Cast via as never to simulate invalid returns (mirrors existing test patterns)
        currencyService.getCurrentExchangeRate.mockResolvedValue(value as never);

        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          BadRequestException
        );
        await expect(resolver.requestZarinPalPayment(input)).rejects.toThrow(
          'Exchange rate is not configured or invalid. Cannot process ZarinPal payment.'
        );

        expect(paymentService.requestPayment).not.toHaveBeenCalled();
        expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
      });
    }
  });
});