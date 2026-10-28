import { Test, TestingModule } from '@nestjs/testing';
import { PaymentResolver } from './payment.resolver';
import { PaymentService, OrderService, CurrencyService } from '@kickzone-workspace/services';
import { OrderStatus } from '@kickzone-workspace/entities';
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
});

