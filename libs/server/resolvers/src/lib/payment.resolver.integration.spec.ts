import { Test, TestingModule } from '@nestjs/testing';
import { PaymentResolver } from './payment.resolver';
import { PaymentService, OrderService, CurrencyService } from '@kickzone-workspace/services';
import { OrderStatus } from '@kickzone-workspace/entities';
import { BadRequestException } from '@nestjs/common';
import {
  ZarinPalPaymentRequestInput,
  ZarinPalVerificationRequestInput,
} from './payment.resolver';

describe('PaymentResolver Integration Tests', () => {
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
    confirmOrderPayment: jest.fn(),
    cancelPendingOrder: jest.fn(),
    findOne: jest.fn(),
    setPaymentIntent: jest.fn(),
    findOrdersByPaymentAuthority: jest.fn(),
    updateOrderStatus: jest.fn(),
  };

  const mockCurrencyService = {
    getCurrentExchangeRate: jest.fn().mockResolvedValue({ rate: 1000 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentResolver,
        {
          provide: PaymentService,
          useValue: mockPaymentService,
        },
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
        {
          provide: CurrencyService,
          useValue: mockCurrencyService,
        },
      ],
    }).compile();

    resolver = module.get<PaymentResolver>(PaymentResolver);
    paymentService = module.get(PaymentService);
    orderService = module.get(OrderService);
    currencyService = module.get(CurrencyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockCurrencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 1000 });
  });

  describe('Full Payment Flow Integration', () => {
    const orderId = 'order-123';
    const authority = 'A00000000000000000000000000000000000000';
    const amount = 100000; // 100,000 Toman

    const paymentRequestInput: ZarinPalPaymentRequestInput = {
      amount,
      callback_url: 'https://example.com/payment/callback',
      description: 'Test Order Payment',
      currency: 'IRT',
      mobile: '09123456789',
      email: 'test@example.com',
      order_id: orderId,
    };

    const mockOrder = {
      id: orderId,
      status: OrderStatus.PENDING,
      total: 100, // USD, so 100 * 1000 = 100000 IRT amount
      paymentAuthority: authority,
      paymentAmount: amount,
      paymentCurrency: 'IRT',
      items: [
        {
          id: 'item-1',
          productId: 'product-1',
          sellerProductId: 'seller-product-1',
          quantity: 2,
        },
      ],
    };

    describe('Successful Payment Flow', () => {
      it('should complete full payment flow: request → verify → confirm order', async () => {
        orderService.findOne.mockResolvedValue(mockOrder as any);
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([mockOrder] as any);
        orderService.setPaymentIntent.mockResolvedValue(undefined as any);

        // Step 1: Request payment
        paymentService.requestPayment.mockResolvedValue({
          data: {
            code: 100,
            message: 'Success',
            authority,
            fee_type: 'Merchant',
            fee: 0,
          },
          errors: [],
        } as any);

        const requestResult = await resolver.requestZarinPalPayment(paymentRequestInput);

        expect(paymentService.requestPayment).toHaveBeenCalledWith({
          amount: paymentRequestInput.amount,
          callback_url: paymentRequestInput.callback_url,
          description: paymentRequestInput.description,
          currency: 'IRT',
          metadata: {
            mobile: paymentRequestInput.mobile,
            email: paymentRequestInput.email,
            order_id: paymentRequestInput.order_id,
          },
        });
        expect(requestResult.code).toBe(100);
        expect(requestResult.authority).toBe(authority);

        // Step 2: Verify payment (successful)
        const verificationInput: ZarinPalVerificationRequestInput = {
          amount,
          authority,
          order_id: orderId,
        };

        const confirmedOrder = {
          ...mockOrder,
          status: OrderStatus.CONFIRMED,
        };

        paymentService.verifyPayment.mockResolvedValue({
          data: {
            code: 100,
            message: 'Payment verified',
            ref_id: 123456789,
            card_pan: '1234-****-****-5678',
            fee_type: 'Merchant',
            fee: 0,
          },
          errors: [],
        } as any);

        orderService.findOne.mockResolvedValue(mockOrder as any);
        orderService.setPaymentIntent.mockResolvedValue(undefined as any);
        orderService.confirmOrderPayment.mockResolvedValue(
          confirmedOrder as any
        );

        const verifyResult = await resolver.verifyZarinPalPayment(verificationInput);

        expect(paymentService.verifyPayment).toHaveBeenCalledWith({
          amount: verificationInput.amount,
          authority: verificationInput.authority,
        });
        expect(verifyResult.code).toBe(100);
        expect(verifyResult.ref_id).toBe(123456789);

        // Verify order was confirmed (stock decreased)
        expect(orderService.confirmOrderPayment).toHaveBeenCalledWith(orderId);
        expect(orderService.confirmOrderPayment).toHaveBeenCalledTimes(1);
      });

      it('should handle payment verification code 101 (already verified)', async () => {
        const verificationInput: ZarinPalVerificationRequestInput = {
          amount,
          authority,
          order_id: orderId,
        };

        paymentService.verifyPayment.mockResolvedValue({
          data: {
            code: 101,
            message: 'Payment already verified',
            ref_id: 123456789,
          },
          errors: [],
        } as any);

        orderService.findOne.mockResolvedValue(mockOrder as any);
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([mockOrder] as any);
        orderService.setPaymentIntent.mockResolvedValue(undefined as any);
        orderService.confirmOrderPayment.mockResolvedValue({
          ...mockOrder,
          status: OrderStatus.CONFIRMED,
        } as any);

        const verifyResult = await resolver.verifyZarinPalPayment(verificationInput);

        expect(verifyResult.code).toBe(101);
        // Order should still be confirmed even with code 101
        expect(orderService.confirmOrderPayment).toHaveBeenCalledWith(orderId);
      });
    });

    describe('Failed Payment Flow', () => {
      it('should cancel order when payment verification fails', async () => {
        const verificationInput: ZarinPalVerificationRequestInput = {
          amount,
          authority,
          order_id: orderId,
        };

        // Payment verification fails
        paymentService.verifyPayment.mockResolvedValue({
          data: {
            code: -11,
            message: 'Payment not found',
          },
          errors: [],
        } as any);

        orderService.findOne.mockResolvedValue(mockOrder as any);
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([mockOrder] as any);
        orderService.setPaymentIntent.mockResolvedValue(undefined as any);
        orderService.cancelPendingOrder.mockResolvedValue({
          ...mockOrder,
          status: OrderStatus.CANCELLED,
        } as any);

        const verifyResult = await resolver.verifyZarinPalPayment(verificationInput);

        expect(verifyResult.code).toBe(-11);
        // Order should be cancelled
        expect(orderService.cancelPendingOrder).toHaveBeenCalledWith(orderId);
        expect(orderService.cancelPendingOrder).toHaveBeenCalledTimes(1);
        // Order should NOT be confirmed
        expect(orderService.confirmOrderPayment).not.toHaveBeenCalled();
      });

      it('should cancel order when payment verification returns non-success code', async () => {
        const verificationInput: ZarinPalVerificationRequestInput = {
          amount,
          authority,
          order_id: orderId,
        };

        // Payment verification fails with different error code
        paymentService.verifyPayment.mockResolvedValue({
          data: {
            code: -10,
            message: 'Invalid amount',
          },
          errors: [],
        } as any);

        orderService.findOne.mockResolvedValue(mockOrder as any);
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([mockOrder] as any);
        orderService.setPaymentIntent.mockResolvedValue(undefined as any);
        orderService.cancelPendingOrder.mockResolvedValue({
          ...mockOrder,
          status: OrderStatus.CANCELLED,
        } as any);

        const verifyResult = await resolver.verifyZarinPalPayment(verificationInput);

        expect(verifyResult.code).toBe(-10);
        expect(orderService.cancelPendingOrder).toHaveBeenCalledWith(orderId);
        expect(orderService.confirmOrderPayment).not.toHaveBeenCalled();
      });
    });

    describe('Payment Flow Without Order ID', () => {
      it('should reject verification when order_id is not provided', async () => {
        const verificationInput: ZarinPalVerificationRequestInput = {
          amount,
          authority,
          // order_id is undefined
        };

        paymentService.verifyPayment.mockResolvedValue({
          data: {
            code: 100,
            message: 'Payment verified',
            ref_id: 123456789,
          },
          errors: [],
        } as any);

        orderService.findOrdersByPaymentAuthority.mockResolvedValue([] as any);

        await expect(
          resolver.verifyZarinPalPayment(verificationInput)
        ).rejects.toThrow('No orders found for this payment authority');

        expect(orderService.confirmOrderPayment).not.toHaveBeenCalled();
        expect(orderService.cancelPendingOrder).not.toHaveBeenCalled();
      });
    });

    describe('Error Handling in Order Confirmation', () => {
      it('should return success: false with ref_id when order confirmation fails but payment was verified', async () => {
        const verificationInput: ZarinPalVerificationRequestInput = {
          amount,
          authority,
          order_id: orderId,
        };

        paymentService.verifyPayment.mockResolvedValue({
          data: {
            code: 100,
            message: 'Payment verified',
            ref_id: 123456789,
          },
          errors: [],
        } as any);

        orderService.findOne.mockResolvedValue(mockOrder as any);
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([mockOrder] as any);
        orderService.setPaymentIntent.mockResolvedValue(undefined as any);

        // Order confirmation fails
        orderService.confirmOrderPayment.mockRejectedValue(
          new Error('Order confirmation failed')
        );

        const verifyResult = await resolver.verifyZarinPalPayment(verificationInput);

        // Payment was captured but order confirmation failed - returns code 100 but success: false
        expect(verifyResult.code).toBe(100);
        expect(verifyResult.ref_id).toBe(123456789);
        expect(verifyResult.success).toBe(false);
        expect(verifyResult.message).toContain('Order confirmation failed');
        // Order confirmation was attempted
        expect(orderService.confirmOrderPayment).toHaveBeenCalledWith(orderId);
      });

      it('should still return failure if order cancellation fails but payment failed', async () => {
        const verificationInput: ZarinPalVerificationRequestInput = {
          amount,
          authority,
          order_id: orderId,
        };

        // Payment verification fails
        paymentService.verifyPayment.mockResolvedValue({
          data: {
            code: -11,
            message: 'Payment not found',
          },
          errors: [],
        } as any);

        orderService.findOne.mockResolvedValue(mockOrder as any);
        orderService.findOrdersByPaymentAuthority.mockResolvedValue([mockOrder] as any);
        orderService.setPaymentIntent.mockResolvedValue(undefined as any);

        // Order cancellation fails
        orderService.cancelPendingOrder.mockRejectedValue(
          new Error('Order cancellation failed')
        );

        const verifyResult = await resolver.verifyZarinPalPayment(verificationInput);

        // Payment verification should still return failure
        expect(verifyResult.code).toBe(-11);
        // Order cancellation was attempted
        expect(orderService.cancelPendingOrder).toHaveBeenCalledWith(orderId);
      });
    });

    describe('Gateway URL Generation', () => {
      it('should return correct gateway URL for given authority', async () => {
        const authority = 'A00000000000000000000000000000000000000';
        const expectedUrl = `https://sandbox.zarinpal.com/pg/StartPay/${authority}`;

        paymentService.getGatewayUrl.mockReturnValue(expectedUrl);

        const result = await resolver.getZarinPalGatewayUrl(
          { id: 'user-1' } as any,
          authority
        );

        expect(paymentService.getGatewayUrl).toHaveBeenCalledWith(authority);
        expect(result.url).toBe(expectedUrl);
      });
    });
  });

  describe('Payment Request Integration', () => {
    const createPendingOrder = (
      orderId: string,
      total: number,
      paymentCurrency: 'IRT' | 'IRR' = 'IRT'
    ) => ({
      id: orderId,
      status: OrderStatus.PENDING,
      total: total / 1000, // USD, so total * 1000 = paymentAmount (IRT)
      paymentAuthority: 'A00000000000000000000000000000000000000',
      paymentAmount: total,
      paymentCurrency,
      items: [],
    });

    it('should handle payment request with all optional fields', async () => {
      const input: ZarinPalPaymentRequestInput = {
        amount: 50000,
        callback_url: 'https://example.com/callback',
        description: 'Order #123',
        currency: 'IRT',
        mobile: '09123456789',
        email: 'customer@example.com',
        order_id: 'order-123',
      };

      paymentService.requestPayment.mockResolvedValue({
        data: {
          code: 100,
          message: 'Success',
          authority: 'A00000000000000000000000000000000000000',
          fee_type: 'Merchant',
          fee: 0,
        },
        errors: [],
      } as any);

      orderService.findOne.mockResolvedValue({
        ...createPendingOrder(input.order_id!, input.amount),
      } as any);
      orderService.setPaymentIntent.mockResolvedValue(undefined as any);

      const result = await resolver.requestZarinPalPayment(input);

      expect(paymentService.requestPayment).toHaveBeenCalledWith({
        amount: input.amount,
        callback_url: input.callback_url,
        description: input.description,
        currency: 'IRT',
        metadata: {
          mobile: input.mobile,
          email: input.email,
          order_id: input.order_id,
        },
      });
      expect(result.code).toBe(100);
      expect(result.authority).toBeDefined();
    });

    it('should handle payment request with minimal required fields', async () => {
      const input: ZarinPalPaymentRequestInput = {
        amount: 50000,
        callback_url: 'https://example.com/callback',
        description: 'Order #123',
        order_id: 'order-456',
      };

      paymentService.requestPayment.mockResolvedValue({
        data: {
          code: 100,
          message: 'Success',
          authority: 'A00000000000000000000000000000000000000',
        },
      } as any);

      orderService.findOne.mockResolvedValue({
        ...createPendingOrder(input.order_id!, input.amount),
      } as any);
      orderService.setPaymentIntent.mockResolvedValue(undefined as any);

      const result = await resolver.requestZarinPalPayment(input);

      expect(paymentService.requestPayment).toHaveBeenCalledWith({
        amount: input.amount,
        callback_url: input.callback_url,
        description: input.description,
        currency: 'IRT', // Default currency
        metadata: {
          mobile: undefined,
          email: undefined,
          order_id: input.order_id,
        },
      });
      expect(result.code).toBe(100);
    });

    it('should use IRR currency when specified', async () => {
      const input: ZarinPalPaymentRequestInput = {
        amount: 5000000,
        callback_url: 'https://example.com/callback',
        description: 'Order #123',
        currency: 'IRR',
        order_id: 'order-789',
      };

      paymentService.requestPayment.mockResolvedValue({
        data: {
          code: 100,
          message: 'Success',
          authority: 'A00000000000000000000000000000000000000',
        },
      } as any);

      orderService.findOne.mockResolvedValue({
        ...createPendingOrder(input.order_id!, input.amount, 'IRR'),
      } as any);
      orderService.setPaymentIntent.mockResolvedValue(undefined as any);

      await resolver.requestZarinPalPayment(input);

      expect(paymentService.requestPayment).toHaveBeenCalledWith(
        expect.objectContaining({
          currency: 'IRR',
        })
      );
    });
  });

  describe('Multi-Seller Batch Payment Flow (requestZarinPalPayment → verifyZarinPalPayment)', () => {
    const authority = 'A00000000000000000000000000000000000000';

    const createBatchOrder = (
      orderId: string,
      totalUsd: number,
      customerEmail: string,
      status: OrderStatus = OrderStatus.PENDING,
      items: any[] = [
        {
          id: `item-${orderId}`,
          productId: `product-${orderId}`,
          sellerProductId: `seller-product-${orderId}`,
          quantity: 1,
          sellerProduct: { id: `seller-product-${orderId}`, stockQuantity: 10 },
        },
      ]
    ) => ({
      id: orderId,
      status,
      total: totalUsd, // USD
      paymentAuthority: authority,
      paymentAmount: totalUsd * 1000, // IRT
      paymentCurrency: 'IRT',
      customerEmail,
      items,
      orderNumber: `ORD-${orderId}`,
    });

    const basePaymentInput: ZarinPalPaymentRequestInput = {
      amount: 100000, // 100 USD * 1000 = 100000 IRT
      callback_url: 'https://example.com/payment/callback',
      description: 'Batch Payment for Multiple Orders',
      currency: 'IRT',
      mobile: '09123456789',
      email: 'buyer@example.com',
      orderIds: ['order-1', 'order-2'],
    };

    beforeEach(() => {
      mockCurrencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 1000 });
    });

    it('should request and verify batch payment for orders with same customer email (case-insensitive)', async () => {
      const order1 = createBatchOrder('order-1', 60, 'Buyer@Example.com');
      const order2 = createBatchOrder('order-2', 40, 'buyer@example.com');

      // Step 1: Request batch payment
      orderService.findOne
        .mockResolvedValueOnce(order1 as any)
        .mockResolvedValueOnce(order2 as any);
      orderService.setPaymentIntent.mockResolvedValue(undefined as any);

      paymentService.requestPayment.mockResolvedValue({
        data: {
          code: 100,
          message: 'Success',
          authority,
          fee_type: 'Merchant',
          fee: 0,
        },
        errors: [],
      } as any);

      const requestResult = await resolver.requestZarinPalPayment(basePaymentInput);

      expect(requestResult.code).toBe(100);
      expect(requestResult.authority).toBe(authority);

      // setPaymentIntent should be called for BOTH orders with expectedBatchAmount
      expect(orderService.setPaymentIntent).toHaveBeenCalledTimes(2);
      expect(orderService.setPaymentIntent).toHaveBeenCalledWith(
        expect.objectContaining({
          orderId: 'order-1',
          authority,
          amount: 100000, // (60 + 40) * 1000 = 100000 IRT
        })
      );
      expect(orderService.setPaymentIntent).toHaveBeenCalledWith(
        expect.objectContaining({
          orderId: 'order-2',
          authority,
          amount: 100000,
        })
      );

      // Step 2: Verify batch payment (successful)
      const verificationInput: ZarinPalVerificationRequestInput = {
        amount: 100000,
        authority,
        // order_id not provided - should find by authority
      };

      paymentService.verifyPayment.mockResolvedValue({
        data: {
          code: 100,
          message: 'Payment verified',
          ref_id: 999888,
          card_pan: '1234-****-****-5678',
          fee_type: 'Merchant',
          fee: 0,
        },
        errors: [],
      } as any);

      orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as any);
      orderService.setPaymentIntent.mockResolvedValue(undefined as any);
      orderService.confirmOrderPayment
        .mockResolvedValueOnce({ ...order1, status: OrderStatus.CONFIRMED } as any)
        .mockResolvedValueOnce({ ...order2, status: OrderStatus.CONFIRMED } as any);

      const verifyResult = await resolver.verifyZarinPalPayment(verificationInput);

      // verifyPayment is called with firstOrder.paymentAmount (order-1's individual amount: 60 * 1000 = 60000)
      expect(paymentService.verifyPayment).toHaveBeenCalledWith({
        amount: 60000,
        authority,
      });

      // Both orders confirmed in deterministic id ASC order
      expect(orderService.confirmOrderPayment).toHaveBeenCalledTimes(2);
      expect(orderService.confirmOrderPayment).toHaveBeenNthCalledWith(1, 'order-1');
      expect(orderService.confirmOrderPayment).toHaveBeenNthCalledWith(2, 'order-2');

      expect(verifyResult.code).toBe(100);
      expect(verifyResult.ref_id).toBe(999888);
      expect(verifyResult.success).toBe(true);
      expect(verifyResult.orderIds).toEqual(['order-1', 'order-2']);
      expect(verifyResult.orderId).toBe('order-1');
      expect(verifyResult.orderNumber).toContain('order-1');
      expect(verifyResult.orderNumber).toContain('order-2');
    });

    it('should reject batch payment when orderIds belong to different customer emails', async () => {
      const order1 = createBatchOrder('order-1', 60, 'buyer1@example.com');
      const order2 = createBatchOrder('order-2', 40, 'buyer2@example.com');

      orderService.findOne
        .mockResolvedValueOnce(order1 as any)
        .mockResolvedValueOnce(order2 as any);

      await expect(resolver.requestZarinPalPayment(basePaymentInput)).rejects.toThrow(
        'All orders in a batch must belong to the same customer'
      );

      expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
      expect(paymentService.requestPayment).not.toHaveBeenCalled();
    });

    it('should reject batch payment when one order is missing', async () => {
      const order1 = createBatchOrder('order-1', 60, 'buyer@example.com');
      // order-2 is missing (returns null)

      orderService.findOne
        .mockResolvedValueOnce(order1 as any)
        .mockResolvedValueOnce(null as any);

      await expect(resolver.requestZarinPalPayment(basePaymentInput)).rejects.toThrow(
        'Order(s) not found: order-2'
      );

      expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
      expect(paymentService.requestPayment).not.toHaveBeenCalled();
    });

    it('should reject batch payment when one order is not PENDING', async () => {
      const order1 = createBatchOrder('order-1', 60, 'buyer@example.com');
      const order2 = createBatchOrder('order-2', 40, 'buyer@example.com', OrderStatus.CONFIRMED);

      orderService.findOne
        .mockResolvedValueOnce(order1 as any)
        .mockResolvedValueOnce(order2 as any);

      await expect(resolver.requestZarinPalPayment(basePaymentInput)).rejects.toThrow(
        "Order(s) order-2 are not in PENDING status and cannot be paid"
      );

      expect(orderService.setPaymentIntent).not.toHaveBeenCalled();
      expect(paymentService.requestPayment).not.toHaveBeenCalled();
    });

    it('should reject batch payment when client amount deviates beyond tolerance', async () => {
      const order1 = createBatchOrder('order-1', 60, 'buyer@example.com');
      const order2 = createBatchOrder('order-2', 40, 'buyer@example.com');

      orderService.findOne
        .mockResolvedValueOnce(order1 as any)
        .mockResolvedValueOnce(order2 as any);
      orderService.setPaymentIntent.mockResolvedValue(undefined as any);

      // Expected: (60 + 40) * 1000 = 100000 IRT
      // Tolerance: max(10, 2 * 2) = 10 Tomans
      // Client sends 100050 (diff = 50 > 10) - should reject
      const badInput: ZarinPalPaymentRequestInput = {
        ...basePaymentInput,
        amount: 100050,
      };

      await expect(resolver.requestZarinPalPayment(badInput)).rejects.toThrow(
        'Payment amount does not match batch order total'
      );

      expect(paymentService.requestPayment).not.toHaveBeenCalled();
    });

    it('should accept batch payment when client amount is within tolerance', async () => {
      const order1 = createBatchOrder('order-1', 60, 'buyer@example.com');
      const order2 = createBatchOrder('order-2', 40, 'buyer@example.com');

      orderService.findOne
        .mockResolvedValueOnce(order1 as any)
        .mockResolvedValueOnce(order2 as any);
      orderService.setPaymentIntent.mockResolvedValue(undefined as any);

      // Expected: 100000, Tolerance: 10
      // Client sends 100005 (diff = 5 <= 10) - should accept
      const goodInput: ZarinPalPaymentRequestInput = {
        ...basePaymentInput,
        amount: 100005,
      };

      paymentService.requestPayment.mockResolvedValue({
        data: {
          code: 100,
          message: 'Success',
          authority,
          fee_type: 'Merchant',
          fee: 0,
        },
        errors: [],
      } as any);

      const requestResult = await resolver.requestZarinPalPayment(goodInput);

      expect(requestResult.code).toBe(100);
      expect(paymentService.requestPayment).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: 100000, // Server uses server-computed amount
        })
      );
    });
  });

  describe('FX Rate Fail-Closed Integration', () => {
    const singleOrderInput: ZarinPalPaymentRequestInput = {
      amount: 100000,
      callback_url: 'https://example.com/callback',
      description: 'Single Order Payment',
      currency: 'IRT',
      order_id: 'order-single',
    };

    const createPendingOrder = (orderId: string, totalUsd: number) => ({
      id: orderId,
      status: OrderStatus.PENDING,
      total: totalUsd,
      paymentAuthority: 'A00000000000000000000000000000000000000',
      paymentAmount: totalUsd * 1000,
      paymentCurrency: 'IRT',
      customerEmail: 'buyer@example.com',
      items: [],
    });

    beforeEach(() => {
      orderService.findOne.mockResolvedValue(
        createPendingOrder(singleOrderInput.order_id!, 100) as any
      );
      orderService.setPaymentIntent.mockResolvedValue(undefined as any);
    });

    it('should reject requestZarinPalPayment when getCurrentExchangeRate returns rate: 0', async () => {
      mockCurrencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 0 });

      await expect(resolver.requestZarinPalPayment(singleOrderInput)).rejects.toThrow(
        'Exchange rate is not configured or invalid. Cannot process ZarinPal payment.'
      );
    });

    it('should reject requestZarinPalPayment when getCurrentExchangeRate returns rate: 1', async () => {
      mockCurrencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 1 });

      await expect(resolver.requestZarinPalPayment(singleOrderInput)).rejects.toThrow(
        'Exchange rate is not configured or invalid. Cannot process ZarinPal payment.'
      );
    });

    it('should reject requestZarinPalPayment when getCurrentExchangeRate returns rate: -500', async () => {
      mockCurrencyService.getCurrentExchangeRate.mockResolvedValue({ rate: -500 });

      await expect(resolver.requestZarinPalPayment(singleOrderInput)).rejects.toThrow(
        'Exchange rate is not configured or invalid. Cannot process ZarinPal payment.'
      );
    });

    it('should reject requestZarinPalPayment when getCurrentExchangeRate returns rate: NaN', async () => {
      mockCurrencyService.getCurrentExchangeRate.mockResolvedValue({ rate: NaN });

      await expect(resolver.requestZarinPalPayment(singleOrderInput)).rejects.toThrow(
        'Exchange rate is not configured or invalid. Cannot process ZarinPal payment.'
      );
    });

    it('should reject requestZarinPalPayment when getCurrentExchangeRate returns null', async () => {
      mockCurrencyService.getCurrentExchangeRate.mockResolvedValue(null as any);

      await expect(resolver.requestZarinPalPayment(singleOrderInput)).rejects.toThrow(
        'Exchange rate is not configured or invalid. Cannot process ZarinPal payment.'
      );
    });
  });

  describe('High7 Fail-Closed + Sibling Rollback Integration', () => {
    const authority = 'A00000000000000000000000000000000000000';

    const createOrderForRollback = (
      orderId: string,
      totalUsd: number,
      sellerProductId: string,
      stockQuantity: number
    ) => ({
      id: orderId,
      status: OrderStatus.PENDING,
      total: totalUsd,
      paymentAuthority: authority,
      paymentAmount: totalUsd * 1000,
      paymentCurrency: 'IRT',
      customerEmail: 'buyer@example.com',
      items: [
        {
          id: `item-${orderId}`,
          productId: `product-${orderId}`,
          sellerProductId,
          quantity: 1,
          sellerProduct: { id: sellerProductId, stockQuantity },
        },
      ],
      orderNumber: `ORD-${orderId}`,
    });

    const verificationInput: ZarinPalVerificationRequestInput = {
      amount: 100000,
      authority,
      // order_id not provided
    };

    beforeEach(() => {
      mockCurrencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 1000 });
    });

    it('should reject verification during pre-verify stock check when sibling order has insufficient stock', async () => {
      const order1 = createOrderForRollback('order-1', 60, 'sp-1', 10);
      const order2 = createOrderForRollback('order-2', 40, 'sp-2', 0); // Out of stock

      // Find orders by authority returns both orders
      orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as any);
      orderService.setPaymentIntent.mockResolvedValue(undefined as any);

      // Payment verification would succeed (code 100) but pre-verify stock check fails first
      paymentService.verifyPayment.mockResolvedValue({
        data: {
          code: 100,
          message: 'Payment verified',
          ref_id: 999888,
          card_pan: '1234-****-****-5678',
          fee_type: 'Merchant',
          fee: 0,
        },
        errors: [],
      } as any);

      // Should throw BadRequestException during pre-verify stock check
      await expect(resolver.verifyZarinPalPayment(verificationInput)).rejects.toThrow(
        'Insufficient stock for product sp-2: required 1, available 0'
      );

      // verifyPayment should NOT be called because pre-verify stock check fails first
      expect(paymentService.verifyPayment).not.toHaveBeenCalled();
      expect(orderService.confirmOrderPayment).not.toHaveBeenCalled();
      expect(orderService.updateOrderStatus).not.toHaveBeenCalled();
    });

    it('should roll back order-1 when order-2 confirmation fails with insufficient stock (stock available during pre-check but fails at confirmation)', async () => {
      const order1 = createOrderForRollback('order-1', 60, 'sp-1', 10);
      const order2 = createOrderForRollback('order-2', 40, 'sp-2', 10); // Stock available during pre-check

      // Find orders by authority returns both orders
      orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as any);
      orderService.setPaymentIntent.mockResolvedValue(undefined as any);

      // Payment verification succeeds (code 100)
      paymentService.verifyPayment.mockResolvedValue({
        data: {
          code: 100,
          message: 'Payment verified',
          ref_id: 999888,
          card_pan: '1234-****-****-5678',
          fee_type: 'Merchant',
          fee: 0,
        },
        errors: [],
      } as any);

      // order-1 confirms successfully, order-2 fails with insufficient stock at confirmation time
      orderService.confirmOrderPayment
        .mockResolvedValueOnce({ ...order1, status: OrderStatus.CONFIRMED } as any)
        .mockRejectedValueOnce(new Error('Insufficient stock for product sp-2'));

      // Rollback via updateOrderStatus for order-1
      orderService.updateOrderStatus.mockResolvedValue({ ...order1, status: OrderStatus.CANCELLED } as any);

      const verifyResult = await resolver.verifyZarinPalPayment(verificationInput);

      // Payment was captured but order confirmation failed for order-2
      expect(verifyResult.code).toBe(100);
      expect(verifyResult.ref_id).toBe(999888);
      expect(verifyResult.success).toBe(false);
      expect(verifyResult.message).toContain('Insufficient stock');

      // order-1 was confirmed then rolled back
      expect(orderService.confirmOrderPayment).toHaveBeenCalledTimes(2);
      expect(orderService.confirmOrderPayment).toHaveBeenNthCalledWith(1, 'order-1');
      expect(orderService.confirmOrderPayment).toHaveBeenNthCalledWith(2, 'order-2');

      // Rollback called for order-1
      expect(orderService.updateOrderStatus).toHaveBeenCalledWith('order-1', OrderStatus.CANCELLED);

      // Response includes all order info
      expect(verifyResult.orderIds).toEqual(['order-1', 'order-2']);
      expect(verifyResult.orderId).toBe('order-1');
    });
  });

  describe('Code 101 Idempotency Integration', () => {
    const authority = 'A00000000000000000000000000000000000000';

    const createConfirmedOrder = (orderId: string, totalUsd: number, stockReserved = true) => ({
      id: orderId,
      status: OrderStatus.CONFIRMED,
      total: totalUsd,
      paymentAuthority: authority,
      paymentAmount: totalUsd * 1000,
      paymentCurrency: 'IRT',
      customerEmail: 'buyer@example.com',
      stockReserved,
      items: [],
      orderNumber: `ORD-${orderId}`,
    });

    const createPendingOrder = (orderId: string, totalUsd: number) => ({
      id: orderId,
      status: OrderStatus.PENDING,
      total: totalUsd,
      paymentAuthority: authority,
      paymentAmount: totalUsd * 1000,
      paymentCurrency: 'IRT',
      customerEmail: 'buyer@example.com',
      items: [
        {
          id: `item-${orderId}`,
          productId: `product-${orderId}`,
          sellerProductId: `seller-product-${orderId}`,
          quantity: 1,
          sellerProduct: { id: `seller-product-${orderId}`, stockQuantity: 10 },
        },
      ],
      orderNumber: `ORD-${orderId}`,
    });

    const verificationInput: ZarinPalVerificationRequestInput = {
      amount: 100000,
      authority,
    };

    beforeEach(() => {
      mockCurrencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 1000 });
    });

    it('should return success: true without calling confirmOrderPayment when all orders already CONFIRMED with stockReserved', async () => {
      const order1 = createConfirmedOrder('order-1', 60, true);
      const order2 = createConfirmedOrder('order-2', 40, true);

      orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as any);

      paymentService.verifyPayment.mockResolvedValue({
        data: {
          code: 101,
          message: 'Payment already verified',
          ref_id: 999888,
        },
        errors: [],
      } as any);

      const verifyResult = await resolver.verifyZarinPalPayment(verificationInput);

      // confirmOrderPayment should NOT be called
      expect(orderService.confirmOrderPayment).not.toHaveBeenCalled();

      expect(verifyResult.code).toBe(101);
      expect(verifyResult.success).toBe(true);
      expect(verifyResult.ref_id).toBe(999888);
      expect(verifyResult.orderIds).toEqual(['order-1', 'order-2']);
    });

    it('should call confirmOrderPayment ONLY for PENDING order when mixed CONFIRMED and PENDING with code 101', async () => {
      const order1 = createConfirmedOrder('order-1', 60, true); // Already confirmed
      const order2 = createPendingOrder('order-2', 40); // Still pending

      orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as any);
      orderService.setPaymentIntent.mockResolvedValue(undefined as any);
      orderService.confirmOrderPayment.mockResolvedValue({ ...order2, status: OrderStatus.CONFIRMED } as any);

      paymentService.verifyPayment.mockResolvedValue({
        data: {
          code: 101,
          message: 'Payment already verified',
          ref_id: 999888,
        },
        errors: [],
      } as any);

      const verifyResult = await resolver.verifyZarinPalPayment(verificationInput);

      // confirmOrderPayment should be called ONLY for order-2
      expect(orderService.confirmOrderPayment).toHaveBeenCalledTimes(1);
      expect(orderService.confirmOrderPayment).toHaveBeenCalledWith('order-2');

      expect(verifyResult.code).toBe(101);
      expect(verifyResult.success).toBe(true);
      expect(verifyResult.ref_id).toBe(999888);
      expect(verifyResult.orderIds).toEqual(['order-1', 'order-2']);
    });
  });

  describe('Guest & Authenticated cancelPendingZarinPalOrder Integration', () => {
    const authority = 'A00000000000000000000000000000000000000';

    const createOrder = (
      orderId: string,
      status: OrderStatus = OrderStatus.PENDING,
      paymentAuthority: string = authority
    ) => ({
      id: orderId,
      status,
      total: 100,
      paymentAuthority,
      paymentAmount: 100000,
      paymentCurrency: 'IRT',
      customerEmail: 'buyer@example.com',
      items: [],
      orderNumber: `ORD-${orderId}`,
    });

    beforeEach(() => {
      mockCurrencyService.getCurrentExchangeRate.mockResolvedValue({ rate: 1000 });
    });

    it('should cancel all PENDING sibling orders matching authority when Status=NOK', async () => {
      const order1 = createOrder('order-1');
      const order2 = createOrder('order-2');
      // order3 is not included - only PENDING orders should be in the matched list for cancellation

      orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as any);
      orderService.cancelPendingOrder
        .mockResolvedValueOnce({ ...order1, status: OrderStatus.CANCELLED } as any)
        .mockResolvedValueOnce({ ...order2, status: OrderStatus.CANCELLED } as any);

      const result = await resolver.cancelPendingZarinPalOrder(undefined, authority);

      expect(result).toBe(true);
      expect(orderService.cancelPendingOrder).toHaveBeenCalledTimes(2);
      expect(orderService.cancelPendingOrder).toHaveBeenNthCalledWith(1, 'order-1');
      expect(orderService.cancelPendingOrder).toHaveBeenNthCalledWith(2, 'order-2');
    });

    it('should be idempotent for already-CANCELLED orders', async () => {
      const order1 = createOrder('order-1', OrderStatus.CANCELLED);
      const order2 = createOrder('order-2', OrderStatus.CANCELLED);

      orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1, order2] as any);

      const result = await resolver.cancelPendingZarinPalOrder(undefined, authority);

      expect(result).toBe(true);
      expect(orderService.cancelPendingOrder).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when authority is empty string', async () => {
      await expect(resolver.cancelPendingZarinPalOrder(undefined, '')).rejects.toThrow(
        BadRequestException
      );
      await expect(resolver.cancelPendingZarinPalOrder(undefined, '   ')).rejects.toThrow(
        BadRequestException
      );
    });

    it('should throw BadRequestException when orderId has different paymentAuthority', async () => {
      const orderByAuthority = createOrder('order-1', OrderStatus.PENDING, authority);
      const orderById = createOrder('order-2', OrderStatus.PENDING, 'DIFFERENT_AUTHORITY');

      orderService.findOrdersByPaymentAuthority.mockResolvedValue([orderByAuthority] as any);
      orderService.findOne.mockResolvedValue(orderById as any);

      await expect(
        resolver.cancelPendingZarinPalOrder('order-2', authority)
      ).rejects.toThrow('Order does not match the provided payment authority');
    });

    it('should throw BadRequestException when order is already CONFIRMED', async () => {
      const order1 = createOrder('order-1', OrderStatus.CONFIRMED);

      orderService.findOrdersByPaymentAuthority.mockResolvedValue([order1] as any);

      await expect(
        resolver.cancelPendingZarinPalOrder(undefined, authority)
      ).rejects.toThrow(
        `Cannot cancel order order-1 with status ${OrderStatus.CONFIRMED}. Only PENDING orders can be cancelled.`
      );
    });
  });
});

