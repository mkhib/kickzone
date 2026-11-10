import { Test, TestingModule } from '@nestjs/testing';
import { PaymentResolver } from './payment.resolver';
import { PaymentService, OrderService, CurrencyService } from '@kickzone-workspace/services';
import { OrderStatus, OrderItem } from '@kickzone-workspace/entities';
import { ZarinPalVerificationRequestInput } from './payment.resolver';

describe('PaymentResolver - verifyZarinPalPayment Security Tests', () => {
  let resolver: PaymentResolver;
  let paymentService: jest.Mocked<PaymentService>;
  let orderService: jest.Mocked<OrderService>;

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
    updateOrderStatus: jest.fn(),
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Helper to create order with all required fields
  const createMockOrder = (overrides: Partial<{
    id: string;
    status: OrderStatus;
    total: number;
    paymentAuthority: string | null;
    paymentAmount: number | null;
    paymentCurrency: string | null;
    orderNumber: string;
    customerEmail: string | null;
    notes: string | null;
    items: (OrderItem & { sellerProduct?: { id: string; stockQuantity: number } | null })[];
    stockReserved: boolean | undefined;
  }> = {}) => ({
    id: 'order-123',
    status: OrderStatus.PENDING,
    total: 80,
    paymentAuthority: null,
    paymentAmount: null,
    paymentCurrency: null,
    orderNumber: 'ORD-123',
    customerEmail: 'test@example.com',
    notes: null,
    items: [],
    stockReserved: undefined,
    ...overrides,
  });

  // Type for orders map keyed by id
  type OrdersMap = Map<string, ReturnType<typeof createMockOrder>>;

  // Create orders map for mockImplementation
  const makeOrdersMap = (orders: ReturnType<typeof createMockOrder>[]): OrdersMap => {
    const map = new Map<string, ReturnType<typeof createMockOrder>>();
    for (const o of orders) {
      map.set(o.id, o);
    }
    return map;
  };

  describe('1. Client-sent input.amount ignored; server uses stored order.paymentAmount', () => {
    const authority = 'A00000000000000000000000000000000000099';

    it('should call verifyPayment with stored paymentAmount (9500000), ignoring client amount (1000)', async () => {
      const ordersMap = makeOrdersMap([
        createMockOrder({
          id: 'order-1',
          paymentAuthority: authority,
          paymentAmount: 9500000,
          paymentCurrency: 'IRT',
          orderNumber: 'ORD-001',
          status: OrderStatus.PENDING,
        }),
      ]);

      orderService.findOrdersByPaymentAuthority.mockResolvedValue(Array.from(ordersMap.values()) as never);
      orderService.findOne.mockImplementation((id: string) => Promise.resolve(ordersMap.get(id) ?? null) as never);

      paymentService.verifyPayment.mockResolvedValue({
        data: { code: 100, message: 'Verified', ref_id: 999111 },
        errors: [],
      } as never);

      orderService.setPaymentIntent.mockResolvedValue(undefined as never);
      orderService.confirmOrderPayment.mockResolvedValue(undefined as never);

      const input: ZarinPalVerificationRequestInput = {
        amount: 1000, // client tries to override
        authority,
        order_id: 'order-1',
      };

      await resolver.verifyZarinPalPayment(input);

      expect(paymentService.verifyPayment).toHaveBeenCalledTimes(1);
      expect(paymentService.verifyPayment).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: 9500000, // server uses stored paymentAmount
          authority,
        })
      );
    });

    it('should throw BadRequestException when paymentAmount is null', async () => {
      const ordersMap = makeOrdersMap([
        createMockOrder({
          id: 'order-1',
          paymentAuthority: authority,
          paymentAmount: null,
          paymentCurrency: 'IRT',
          status: OrderStatus.PENDING,
        }),
      ]);

      orderService.findOrdersByPaymentAuthority.mockResolvedValue(Array.from(ordersMap.values()) as never);
      orderService.findOne.mockImplementation((id: string) => Promise.resolve(ordersMap.get(id) ?? null) as never);

      const input: ZarinPalVerificationRequestInput = {
        amount: 1000,
        authority,
        order_id: 'order-1',
      };

      await expect(resolver.verifyZarinPalPayment(input)).rejects.toThrow(
        'Payment amount not recorded for this order. Please initiate payment again.'
      );

      expect(paymentService.verifyPayment).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when paymentAmount is undefined', async () => {
      const ordersMap = makeOrdersMap([
        createMockOrder({
          id: 'order-1',
          paymentAuthority: authority,
          paymentAmount: undefined,
          paymentCurrency: 'IRT',
          status: OrderStatus.PENDING,
        }),
      ]);

      orderService.findOrdersByPaymentAuthority.mockResolvedValue(Array.from(ordersMap.values()) as never);
      orderService.findOne.mockImplementation((id: string) => Promise.resolve(ordersMap.get(id) ?? null) as never);

      const input: ZarinPalVerificationRequestInput = {
        amount: 1000,
        authority,
        order_id: 'order-1',
      };

      await expect(resolver.verifyZarinPalPayment(input)).rejects.toThrow(
        'Payment amount not recorded for this order. Please initiate payment again.'
      );

      expect(paymentService.verifyPayment).not.toHaveBeenCalled();
    });
  });

  describe('2. Forged / unbound authority & cancelled/refunded sibling poisoning', () => {
    it('should throw BadRequestException when findOrdersByPaymentAuthority returns empty array (forged authority)', async () => {
      const forgedAuthority = 'A_FORGED';

      orderService.findOrdersByPaymentAuthority.mockResolvedValue([] as never);

      const input: ZarinPalVerificationRequestInput = {
        amount: 5000000,
        authority: forgedAuthority,
        order_id: 'order-1',
      };

      await expect(resolver.verifyZarinPalPayment(input)).rejects.toThrow(
        'No orders found for this payment authority'
      );

      expect(paymentService.verifyPayment).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when order paymentAuthority does not match input authority (spoofed authority)', async () => {
      const realAuthority = 'A_REAL';
      const spoofedAuthority = 'A_SPOOFED';

      const ordersMap = makeOrdersMap([
        createMockOrder({
          id: 'order-1',
          paymentAuthority: realAuthority, // order bound to A_REAL
          paymentAmount: 5000000,
          paymentCurrency: 'IRT',
          status: OrderStatus.PENDING,
        }),
      ]);

      orderService.findOrdersByPaymentAuthority.mockResolvedValue(Array.from(ordersMap.values()) as never);
      orderService.findOne.mockImplementation((id: string) => Promise.resolve(ordersMap.get(id) ?? null) as never);

      const input: ZarinPalVerificationRequestInput = {
        amount: 5000000,
        authority: spoofedAuthority, // caller sends A_SPOOFED
        order_id: 'order-1',
      };

      await expect(resolver.verifyZarinPalPayment(input)).rejects.toThrow(
        'Payment authority does not match the order payment intent'
      );

      expect(paymentService.verifyPayment).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for cancelled/refunded siblings BEFORE verifyPayment', async () => {
      const authority = 'A_BATCH';
      const ordersMap = makeOrdersMap([
        createMockOrder({
          id: 'order-1',
          paymentAuthority: authority,
          paymentAmount: 5000000,
          paymentCurrency: 'IRT',
          status: OrderStatus.PENDING,
          orderNumber: 'ORD-001',
        }),
        createMockOrder({
          id: 'order-2',
          paymentAuthority: authority,
          paymentAmount: 5000000,
          paymentCurrency: 'IRT',
          status: OrderStatus.CANCELLED,
          orderNumber: 'ORD-002',
        }),
        createMockOrder({
          id: 'order-3',
          paymentAuthority: authority,
          paymentAmount: 5000000,
          paymentCurrency: 'IRT',
          status: OrderStatus.REFUNDED,
          orderNumber: 'ORD-003',
        }),
      ]);

      orderService.findOrdersByPaymentAuthority.mockResolvedValue(Array.from(ordersMap.values()) as never);
      orderService.findOne.mockImplementation((id: string) => Promise.resolve(ordersMap.get(id) ?? null) as never);

      const input: ZarinPalVerificationRequestInput = {
        amount: 5000000,
        authority,
        order_id: 'order-1',
      };

      await expect(resolver.verifyZarinPalPayment(input)).rejects.toThrow(
        'Cannot verify payment for cancelled or refunded order(s): order-2, order-3'
      );

      expect(paymentService.verifyPayment).not.toHaveBeenCalled();
    });
  });

  describe('3. Concurrent verification serialization (inFlightVerifications)', () => {
    it('should serialize 5 concurrent calls, call verifyPayment once, confirmOrderPayment twice, return same result', async () => {
      const authority = 'A_CONCURRENT';
      const ordersMap = makeOrdersMap([
        createMockOrder({
          id: 'order-1',
          paymentAuthority: authority,
          paymentAmount: 5000000,
          paymentCurrency: 'IRT',
          status: OrderStatus.PENDING,
          orderNumber: 'ORD-001',
        }),
        createMockOrder({
          id: 'order-2',
          paymentAuthority: authority,
          paymentAmount: 5000000,
          paymentCurrency: 'IRT',
          status: OrderStatus.PENDING,
          orderNumber: 'ORD-002',
        }),
      ]);

      orderService.findOrdersByPaymentAuthority.mockResolvedValue(Array.from(ordersMap.values()) as never);
      orderService.findOne.mockImplementation((id: string) => Promise.resolve(ordersMap.get(id) ?? null) as never);

      // Deferred promise for verifyPayment
      let resolveVerify: (value: unknown) => void = () => {
        throw new Error('resolveVerify not initialized');
      };
      const verifyPromise = new Promise((resolve) => {
        resolveVerify = resolve;
      });
      paymentService.verifyPayment.mockReturnValue(verifyPromise as never);

      orderService.setPaymentIntent.mockResolvedValue(undefined as never);
      orderService.confirmOrderPayment.mockResolvedValue(undefined as never);

      const input: ZarinPalVerificationRequestInput = {
        amount: 5000000,
        authority,
        // no order_id to test batch behavior
      };

      // Fire 5 simultaneous calls before resolving
      const calls = Array.from({ length: 5 }, () => resolver.verifyZarinPalPayment(input));

      // Resolve the deferred gateway promise
      resolveVerify({
        data: { code: 100, message: 'Verified', ref_id: 999111 },
        errors: [],
      });

      const results = await Promise.all(calls);

      // verifyPayment called exactly once
      expect(paymentService.verifyPayment).toHaveBeenCalledTimes(1);

      // confirmOrderPayment called exactly once per order (2 times total)
      expect(orderService.confirmOrderPayment).toHaveBeenCalledTimes(2);
      expect(orderService.confirmOrderPayment).toHaveBeenCalledWith('order-1');
      expect(orderService.confirmOrderPayment).toHaveBeenCalledWith('order-2');

      // All 5 callers get the same successful result
      for (const result of results) {
        expect(result.success).toBe(true);
        expect(result.ref_id).toBe(999111);
        expect(result.code).toBe(100);
      }
    });

    it('should return code 101 without calling confirmOrderPayment when both orders are CONFIRMED with stockReserved after first verification', async () => {
      const authority = 'A_CONCURRENT';
      const ordersMap = makeOrdersMap([
        createMockOrder({
          id: 'order-1',
          paymentAuthority: authority,
          paymentAmount: 5000000,
          paymentCurrency: 'IRT',
          status: OrderStatus.CONFIRMED,
          orderNumber: 'ORD-001',
          stockReserved: true,
        }),
        createMockOrder({
          id: 'order-2',
          paymentAuthority: authority,
          paymentAmount: 5000000,
          paymentCurrency: 'IRT',
          status: OrderStatus.CONFIRMED,
          orderNumber: 'ORD-002',
          stockReserved: true,
        }),
      ]);

      orderService.findOrdersByPaymentAuthority.mockResolvedValue(Array.from(ordersMap.values()) as never);
      orderService.findOne.mockImplementation((id: string) => Promise.resolve(ordersMap.get(id) ?? null) as never);

      paymentService.verifyPayment.mockResolvedValue({
        data: { code: 101, message: 'Already verified', ref_id: 999111 },
        errors: [],
      } as never);

      orderService.setPaymentIntent.mockResolvedValue(undefined as never);
      orderService.confirmOrderPayment.mockResolvedValue(undefined as never);

      const input: ZarinPalVerificationRequestInput = {
        amount: 5000000,
        authority,
      };

      const result = await resolver.verifyZarinPalPayment(input);

      expect(paymentService.verifyPayment).toHaveBeenCalledTimes(1);
      expect(orderService.confirmOrderPayment).not.toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.code).toBe(101);
      expect(result.ref_id).toBe(999111);
    });
  });

  describe('4. ZarinPal code: 101 state matrix', () => {
    const authority = 'A_101_MATRIX';

    it('should return success: true, code: 101 without confirmOrderPayment when all orders are paid (CONFIRMED/PROCESSING/SHIPPED/DELIVERED) with stockReserved: true', async () => {
      const statuses: OrderStatus[] = [
        OrderStatus.CONFIRMED,
        OrderStatus.PROCESSING,
        OrderStatus.SHIPPED,
        OrderStatus.DELIVERED,
      ];

      for (const status of statuses) {
        jest.clearAllMocks();

        const ordersMap = makeOrdersMap([
          createMockOrder({
            id: 'order-1',
            paymentAuthority: authority,
            paymentAmount: 5000000,
            paymentCurrency: 'IRT',
            status,
            orderNumber: 'ORD-001',
            stockReserved: true,
          }),
        ]);

        orderService.findOrdersByPaymentAuthority.mockResolvedValue(Array.from(ordersMap.values()) as never);
        orderService.findOne.mockImplementation((id: string) => Promise.resolve(ordersMap.get(id) ?? null) as never);

        paymentService.verifyPayment.mockResolvedValue({
          data: { code: 101, message: 'Already verified', ref_id: 111222 },
          errors: [],
        } as never);

        orderService.setPaymentIntent.mockResolvedValue(undefined as never);
        orderService.confirmOrderPayment.mockResolvedValue(undefined as never);

        const input: ZarinPalVerificationRequestInput = {
          amount: 5000000,
          authority,
          order_id: 'order-1',
        };

        const result = await resolver.verifyZarinPalPayment(input);

        expect(orderService.confirmOrderPayment).not.toHaveBeenCalled();
        expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
        expect(result.success).toBe(true);
        expect(result.code).toBe(101);
        expect(result.ref_id).toBe(111222);
      }
    });

    it('should call confirmOrderPayment ONLY for PENDING order in partial recovery (order-1 CONFIRMED+stockReserved, order-2 PENDING)', async () => {
      const ordersMap = makeOrdersMap([
        createMockOrder({
          id: 'order-1',
          paymentAuthority: authority,
          paymentAmount: 5000000,
          paymentCurrency: 'IRT',
          status: OrderStatus.CONFIRMED,
          orderNumber: 'ORD-001',
          stockReserved: true,
        }),
        createMockOrder({
          id: 'order-2',
          paymentAuthority: authority,
          paymentAmount: 5000000,
          paymentCurrency: 'IRT',
          status: OrderStatus.PENDING,
          orderNumber: 'ORD-002',
          stockReserved: false,
        }),
      ]);

      orderService.findOrdersByPaymentAuthority.mockResolvedValue(Array.from(ordersMap.values()) as never);
      orderService.findOne.mockImplementation((id: string) => Promise.resolve(ordersMap.get(id) ?? null) as never);

      paymentService.verifyPayment.mockResolvedValue({
        data: { code: 101, message: 'Already verified', ref_id: 333444 },
        errors: [],
      } as never);

      orderService.setPaymentIntent.mockResolvedValue(undefined as never);
      orderService.confirmOrderPayment.mockResolvedValue(undefined as never);

      const input: ZarinPalVerificationRequestInput = {
        amount: 5000000,
        authority,
        order_id: 'order-1',
      };

      const result = await resolver.verifyZarinPalPayment(input);

      // confirmOrderPayment called ONLY for order-2 (PENDING)
      expect(orderService.confirmOrderPayment).toHaveBeenCalledTimes(1);
      expect(orderService.confirmOrderPayment).toHaveBeenCalledWith('order-2');

      // setPaymentIntent called only for order-2
      expect(orderService.setPaymentIntent).toHaveBeenCalledTimes(1);
      expect(orderService.setPaymentIntent).toHaveBeenCalledWith(
        expect.objectContaining({ orderId: 'order-2' })
      );

      expect(result.success).toBe(true);
      expect(result.code).toBe(101);
      expect(result.ref_id).toBe(333444);
    });
  });

  describe('5. Non-100/101 gateway failure', () => {
    it('should call cancelPendingOrder for all PENDING orders, return success: false with code even if cancelPendingOrder rejects', async () => {
      const authority = 'A_FAIL';
      const ordersMap = makeOrdersMap([
        createMockOrder({
          id: 'order-1',
          paymentAuthority: authority,
          paymentAmount: 5000000,
          paymentCurrency: 'IRT',
          status: OrderStatus.PENDING,
          orderNumber: 'ORD-001',
        }),
        createMockOrder({
          id: 'order-2',
          paymentAuthority: authority,
          paymentAmount: 5000000,
          paymentCurrency: 'IRT',
          status: OrderStatus.PENDING,
          orderNumber: 'ORD-002',
        }),
      ]);

      orderService.findOrdersByPaymentAuthority.mockResolvedValue(Array.from(ordersMap.values()) as never);
      orderService.findOne.mockImplementation((id: string) => Promise.resolve(ordersMap.get(id) ?? null) as never);

      paymentService.verifyPayment.mockResolvedValue({
        data: { code: -51, message: 'Session expired' },
        errors: [],
      } as never);

      // First cancelPendingOrder succeeds, second rejects
      orderService.cancelPendingOrder
        .mockResolvedValueOnce(undefined as never)
        .mockRejectedValueOnce(new Error('DB error'));

      const input: ZarinPalVerificationRequestInput = {
        amount: 5000000,
        authority,
        order_id: 'order-1',
      };

      const result = await resolver.verifyZarinPalPayment(input);

      // cancelPendingOrder called for both PENDING orders
      expect(orderService.cancelPendingOrder).toHaveBeenCalledTimes(2);
      expect(orderService.cancelPendingOrder).toHaveBeenCalledWith('order-1');
      expect(orderService.cancelPendingOrder).toHaveBeenCalledWith('order-2');

      // verifyZarinPalPayment still returns the gateway response
      expect(result.code).toBe(-51);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Session expired');
    });
  });
});