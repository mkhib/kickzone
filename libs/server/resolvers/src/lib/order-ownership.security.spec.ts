import { Test, TestingModule } from '@nestjs/testing';
import { OrderResolver } from './order.resolver';
import { PaymentResolver } from './payment.resolver';
import { ForbiddenException, BadRequestException, NotFoundException } from '@nestjs/common';
import { OrderStatus, toSellerOrder } from '@kickzone-workspace/entities';
import { AuthenticatedUser, OptionalAuthenticatedUser } from '@kickzone-workspace/decorators';
import { OrderService, SellerService, PaymentService, CurrencyService } from '@kickzone-workspace/services';
import { User, UserRole } from '@kickzone-workspace/entities';

describe('Order & Payment Resolver - Ownership Security (P2)', () => {
  let orderResolver: OrderResolver;
  let paymentResolver: PaymentResolver;
  let mockOrderService: {
    findOne: jest.Mock;
    findAll: jest.Mock;
    updateOrderStatus: jest.Mock;
    cancelPendingOrder: jest.Mock;
    getOrdersByCustomerEmail: jest.Mock;
    getOrdersBySeller: jest.Mock;
    recalculateBatchOrdersShipping: jest.Mock;
    findOrdersByPaymentAuthority: jest.Mock;
    setPaymentIntent: jest.Mock;
    confirmOrderPayment: jest.Mock;
    updateTrackingNumber: jest.Mock;
  };
  let mockSellerService: {
    findOneByUserId: jest.Mock;
  };
  let mockPaymentService: {
    requestPayment: jest.Mock;
    verifyPayment: jest.Mock;
    getGatewayUrl: jest.Mock;
  };
  let mockCurrencyService: {
    getCurrentExchangeRate: jest.Mock;
  };

  const createMockSellerInfo = (overrides: Partial<{
    id: number;
    user: { id: string };
  }> = {}) => ({
    id: 1,
    storeName: 'Test Store',
    phone: '09123456789',
    address: 'Seller Address',
    city: 'Tehran',
    state: 'Tehran',
    zipCode: '12345',
    country: 'Iran',
    businessName: 'Test Business',
    isActive: true,
    canManageCatalog: true,
    shippingFee: 10,
    user: { id: 'seller-user-1' } as never,
    sellerProducts: [],
    ...overrides,
  });

  const createMockOrder = (overrides: Partial<{
    id: string;
    customerEmail: string;
    sellerId: number;
    status: OrderStatus;
    notes: string | undefined;
    paymentVerifiedAt: Date | null;
    paymentAuthority: string | null;
  }> = {}) => ({
    id: 'order-1',
    orderNumber: 'ORD-123',
    customerEmail: 'customer@example.com',
    customerPhone: '1234567890',
    customerName: 'John Doe',
    shippingAddress: '123 Main St',
    city: 'Tehran',
    state: 'Tehran',
    zipCode: '12345',
    country: 'Iran',
    status: OrderStatus.PENDING,
    subtotal: 100,
    shippingCost: 10,
    total: 110,
    sellerId: 1,
    sellerStoreName: 'Test Store',
    sellerPhone: '09123456789',
    sellerAddress: 'Seller Address',
    notes: 'Test order',
    trackingNumber: 'TRACK-123',
    stockReserved: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    items: [
      {
        id: 'item-1',
        orderId: 'order-1',
        productId: 'prod-1',
        productName: 'Product 1',
        quantity: 2,
        unitPrice: 50,
        totalPrice: 100,
        sellerProductId: 'seller-prod-1',
      } as never,
    ],
    seller: undefined as never,
    paymentVerifiedAt: null,
    paymentAuthority: null,
    ...overrides,
  });

  const createMockSellerUser = (overrides: Partial<AuthenticatedUser> = {}): AuthenticatedUser => ({
    sub: 'seller-user-1',
    userType: 'seller',
    id: 'seller-user-1',
    email: 'seller@example.com',
    role: 'SELLER',
    ...overrides,
  });

  const createMockCustomerUser = (overrides: Partial<AuthenticatedUser> = {}): AuthenticatedUser => ({
    sub: 'customer-user-1',
    userType: 'customer',
    id: 'customer-user-1',
    email: 'customer@example.com',
    role: 'CUSTOMER',
    ...overrides,
  });

  const createMockAdminUser = (overrides: Partial<AuthenticatedUser> = {}): AuthenticatedUser => ({
    sub: 'admin-user-1',
    userType: 'admin',
    id: 'admin-user-1',
    email: 'admin@example.com',
    role: 'ADMIN',
    ...overrides,
  });

  const createMockUserEntity = (overrides: Partial<User> = {}): User => ({
    id: 'user-1',
    name: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'hashed',
    role: UserRole.CUSTOMER,
    locale: 'en',
    ...overrides,
  });

  beforeEach(async () => {
    mockOrderService = {
      findOne: jest.fn(),
      findAll: jest.fn(),
      updateOrderStatus: jest.fn(),
      cancelPendingOrder: jest.fn(),
      getOrdersByCustomerEmail: jest.fn(),
      getOrdersBySeller: jest.fn(),
      recalculateBatchOrdersShipping: jest.fn(),
      findOrdersByPaymentAuthority: jest.fn(),
      setPaymentIntent: jest.fn(),
      confirmOrderPayment: jest.fn(),
      updateTrackingNumber: jest.fn(),
    };
    mockSellerService = {
      findOneByUserId: jest.fn(),
    };
    mockPaymentService = {
      requestPayment: jest.fn(),
      verifyPayment: jest.fn(),
      getGatewayUrl: jest.fn(),
    };
    mockCurrencyService = {
      getCurrentExchangeRate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderResolver,
        PaymentResolver,
        { provide: OrderService, useValue: mockOrderService },
        { provide: SellerService, useValue: mockSellerService },
        { provide: PaymentService, useValue: mockPaymentService },
        { provide: CurrencyService, useValue: mockCurrencyService },
      ],
    }).compile();

    orderResolver = module.get<OrderResolver>(OrderResolver);
    paymentResolver = module.get<PaymentResolver>(PaymentResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('OrderResolver - Empty / blank / whitespace email collisions', () => {
    describe('order query', () => {
      const guestOrder = createMockOrder({ id: 'order-guest', customerEmail: '' });
      beforeEach(() => {
        mockOrderService.findOne.mockResolvedValue(guestOrder);
      });

      it('throws ForbiddenException when JWT email is empty string', async () => {
        const user = { sub: 'u-1', userType: 'customer', email: '' } as never;
        await expect(orderResolver.order(user, 'order-guest')).rejects.toThrow(ForbiddenException);
        await expect(orderResolver.order(user, 'order-guest')).rejects.toThrow(
          'You do not have permission to view this order'
        );
      });

      it('throws ForbiddenException when JWT email is whitespace', async () => {
        const user = { sub: 'u-1', userType: 'customer', email: '   ' } as never;
        await expect(orderResolver.order(user, 'order-guest')).rejects.toThrow(ForbiddenException);
        await expect(orderResolver.order(user, 'order-guest')).rejects.toThrow(
          'You do not have permission to view this order'
        );
      });
    });

    describe('cancelPendingOrder mutation', () => {
      const guestOrder = createMockOrder({ id: 'order-guest', customerEmail: '' });
      beforeEach(() => {
        mockOrderService.findOne.mockResolvedValue(guestOrder);
      });

      it('throws ForbiddenException when JWT email is empty string', async () => {
        const user = { sub: 'u-1', userType: 'customer', email: '' } as never;
        await expect(orderResolver.cancelPendingOrder(user, 'order-guest')).rejects.toThrow(ForbiddenException);
        await expect(orderResolver.cancelPendingOrder(user, 'order-guest')).rejects.toThrow(
          'You do not have permission to cancel this order'
        );
      });
    });

    describe('myOrders query', () => {
      it('returns [] and does NOT call getOrdersByCustomerEmail when JWT email is whitespace', async () => {
        const user = { sub: 'u-1', userType: 'customer', email: '   ' } as never;
        const result = await orderResolver.myOrders(user, 10);
        expect(result).toEqual([]);
        expect(mockOrderService.getOrdersByCustomerEmail).not.toHaveBeenCalled();
      });
    });

    describe('recalculateBatchOrdersShipping mutation', () => {
      const guestOrder = createMockOrder({ id: 'order-guest', customerEmail: '', notes: undefined });
      beforeEach(() => {
        mockOrderService.findOne.mockResolvedValue(guestOrder);
      });

      it('throws ForbiddenException when JWT email is empty and notes have no guest token', async () => {
        const user = { sub: 'u-1', userType: 'customer', email: '' } as never;
        await expect(
          orderResolver.recalculateBatchOrdersShipping(['order-guest'], user, undefined)
        ).rejects.toThrow(ForbiddenException);
        await expect(
          orderResolver.recalculateBatchOrdersShipping(['order-guest'], user, undefined)
        ).rejects.toThrow('Not allowed to recalculate shipping for this order batch');
      });
    });
  });

  describe('OrderResolver - Cross-customer & cross-seller IDOR', () => {
    const orderAlice = createMockOrder({ id: 'order-alice', customerEmail: 'alice@example.com', sellerId: 1 });
    const orderBob = createMockOrder({ id: 'order-bob', customerEmail: 'bob@example.com', sellerId: 2 });
    const orderSeller2 = createMockOrder({ id: 'order-seller-2', customerEmail: 'buyer@example.com', sellerId: 2 });
    const orderSeller1 = createMockOrder({
      id: 'order-seller-1',
      customerEmail: 'buyer@example.com',
      sellerId: 1,
      notes: 'Leave at door [GuestToken: 550e8400-e29b-41d4-a716-446655440000]',
    });
    const sellerInfo1 = createMockSellerInfo({ id: 1, user: { id: 'seller-user-1' } as never });
    const sellerInfo2 = createMockSellerInfo({ id: 2, user: { id: 'seller-user-2' } as never });

    beforeEach(() => {
      mockSellerService.findOneByUserId.mockResolvedValue(sellerInfo1);
    });

    describe('Customer cross-ownership (Alice vs Bob)', () => {
      const userAlice = { sub: 'u-alice', userType: 'customer', email: 'alice@example.com' } as never;
      const userBob = { sub: 'u-bob', userType: 'customer', email: 'bob@example.com' } as never;

      beforeEach(() => {
        mockOrderService.findOne.mockReset();
        mockOrderService.cancelPendingOrder.mockResolvedValue(true);
        mockOrderService.recalculateBatchOrdersShipping.mockResolvedValue([orderAlice]);
      });

      it('Alice cannot order Bob order', async () => {
        mockOrderService.findOne.mockResolvedValue(orderBob);
        await expect(orderResolver.order(userAlice, 'order-bob')).rejects.toThrow(ForbiddenException);
        await expect(orderResolver.order(userAlice, 'order-bob')).rejects.toThrow(
          'You do not have permission to view this order'
        );
      });

      it('Alice cannot cancelPendingOrder Bob order', async () => {
        mockOrderService.findOne.mockResolvedValue(orderBob);
        await expect(orderResolver.cancelPendingOrder(userAlice, 'order-bob')).rejects.toThrow(ForbiddenException);
        await expect(orderResolver.cancelPendingOrder(userAlice, 'order-bob')).rejects.toThrow(
          'You do not have permission to cancel this order'
        );
      });

      it('Alice cannot recalculateBatchOrdersShipping Bob order', async () => {
        mockOrderService.findOne.mockResolvedValue(orderBob);
        await expect(
          orderResolver.recalculateBatchOrdersShipping(['order-bob'], userAlice)
        ).rejects.toThrow(ForbiddenException);
        await expect(
          orderResolver.recalculateBatchOrdersShipping(['order-bob'], userAlice)
        ).rejects.toThrow('Not allowed to recalculate shipping for this order batch');
      });
    });

    describe('Legitimate case-insensitive trimmed match', () => {
      const userAliceTrimmed = {
        sub: 'u-alice',
        userType: 'customer',
        email: '  ALICE@Example.COM ',
      } as never;

      beforeEach(() => {
        mockOrderService.findOne.mockResolvedValue(orderAlice);
        mockOrderService.cancelPendingOrder.mockResolvedValue(true);
        mockOrderService.recalculateBatchOrdersShipping.mockResolvedValue([orderAlice]);
      });

      it('allows order with trimmed case-insensitive email match', async () => {
        const result = await orderResolver.order(userAliceTrimmed, 'order-alice');
        expect(result).toEqual(orderAlice);
      });

      it('allows cancelPendingOrder with trimmed case-insensitive email match', async () => {
        const result = await orderResolver.cancelPendingOrder(userAliceTrimmed, 'order-alice');
        expect(result).toBe(true);
        expect(mockOrderService.cancelPendingOrder).toHaveBeenCalledWith('order-alice');
      });

      it('allows recalculateBatchOrdersShipping with trimmed case-insensitive email match', async () => {
        const result = await orderResolver.recalculateBatchOrdersShipping(
          ['order-alice'],
          userAliceTrimmed
        );
        expect(result).toEqual([orderAlice]);
        expect(mockOrderService.recalculateBatchOrdersShipping).toHaveBeenCalled();
      });
    });

    describe('Seller cross-ownership (Seller A vs Seller B)', () => {
      const userSeller1 = createMockSellerUser({ id: 'seller-user-1' });
      const userSeller2 = createMockSellerUser({ id: 'seller-user-2' });

      beforeEach(() => {
        mockSellerService.findOneByUserId.mockResolvedValue(sellerInfo1);
      });

      it('Seller A calling order on Seller B order throws ForbiddenException', async () => {
        mockOrderService.findOne.mockResolvedValue(orderSeller2);
        mockSellerService.findOneByUserId.mockResolvedValue(sellerInfo1);
        await expect(orderResolver.order(userSeller1, 'order-seller-2')).rejects.toThrow(ForbiddenException);
        await expect(orderResolver.order(userSeller1, 'order-seller-2')).rejects.toThrow(
          'You do not have permission to view this order'
        );
      });

      it('Seller A calling updateOrderStatus on Seller B order throws ForbiddenException', async () => {
        mockOrderService.findOne.mockResolvedValue(orderSeller2);
        mockSellerService.findOneByUserId.mockResolvedValue(sellerInfo1);
        mockOrderService.updateOrderStatus.mockResolvedValue(orderSeller2);
        await expect(
          orderResolver.updateOrderStatus(userSeller1, { id: 'order-seller-2', status: OrderStatus.PROCESSING })
        ).rejects.toThrow(ForbiddenException);
        await expect(
          orderResolver.updateOrderStatus(userSeller1, { id: 'order-seller-2', status: OrderStatus.PROCESSING })
        ).rejects.toThrow('You can only update status for your own seller orders');
      });

      it('Seller A calling cancelPendingOrder on Seller B order throws ForbiddenException', async () => {
        mockOrderService.findOne.mockResolvedValue(orderSeller2);
        mockSellerService.findOneByUserId.mockResolvedValue(sellerInfo1);
        await expect(orderResolver.cancelPendingOrder(userSeller1, 'order-seller-2')).rejects.toThrow(ForbiddenException);
        await expect(orderResolver.cancelPendingOrder(userSeller1, 'order-seller-2')).rejects.toThrow(
          'You do not have permission to cancel this order'
        );
      });

      it('Seller A calling updateOrderTracking on Seller B order throws ForbiddenException', async () => {
        mockOrderService.findOne.mockResolvedValue(orderSeller2);
        mockSellerService.findOneByUserId.mockResolvedValue(sellerInfo1);
        mockOrderService.updateTrackingNumber.mockResolvedValue(orderSeller2);
        await expect(
          orderResolver.updateOrderTracking(userSeller1, 'order-seller-2', 'TRK-999')
        ).rejects.toThrow(ForbiddenException);
        await expect(
          orderResolver.updateOrderTracking(userSeller1, 'order-seller-2', 'TRK-999')
        ).rejects.toThrow('You can only update tracking for your own seller orders');
      });
    });

    describe('Seller PII & GuestToken redaction on own orders', () => {
      const userSeller1 = createMockSellerUser({ id: 'seller-user-1' });
      // Use CONFIRMED order for updateOrderStatus (seller can only move CONFIRMED->PROCESSING)
      // and updateOrderTracking (tracking only on confirmed/processing/shipped)
      const orderSeller1Confirmed = createMockOrder({
        id: 'order-seller-1',
        customerEmail: 'buyer@example.com',
        sellerId: 1,
        status: OrderStatus.CONFIRMED,
        notes: 'Leave at door [GuestToken: 550e8400-e29b-41d4-a716-446655440000]',
      });
      const mockSellerOrder = toSellerOrder(orderSeller1Confirmed);

      beforeEach(() => {
        mockOrderService.findOne.mockResolvedValue(orderSeller1Confirmed);
        mockSellerService.findOneByUserId.mockResolvedValue(sellerInfo1);
        mockOrderService.updateOrderStatus.mockResolvedValue(orderSeller1Confirmed);
        mockOrderService.updateTrackingNumber.mockResolvedValue(orderSeller1Confirmed);
        mockOrderService.getOrdersBySeller.mockResolvedValue({
          edges: [{ cursor: 'c1', node: orderSeller1Confirmed }],
          pageInfo: { hasNextPage: false, hasPreviousPage: false, endCursor: 'c1' },
          totalCount: 1,
        });
      });

      it('order returns SellerOrder with customer PII stripped and GuestToken stripped from notes', async () => {
        const result = await orderResolver.order(userSeller1, 'order-seller-1');
        expect(result).toEqual(mockSellerOrder);
        const resultRecord = result as unknown as Record<string, unknown>;
        expect(resultRecord['customerName']).toBeUndefined();
        expect(resultRecord['customerEmail']).toBeUndefined();
        expect(resultRecord['customerPhone']).toBeUndefined();
        expect(resultRecord['shippingAddress']).toBeUndefined();
        expect(resultRecord['city']).toBeUndefined();
        expect(resultRecord['state']).toBeUndefined();
        expect(resultRecord['zipCode']).toBeUndefined();
        expect(resultRecord['country']).toBeUndefined();
        expect(result.notes).toBe('Leave at door');
      });

      it('mySellerOrders returns SellerOrder with customer PII stripped and GuestToken stripped from notes', async () => {
        const userEntity = createMockUserEntity({
          id: 'seller-user-1',
          email: 'seller@example.com',
          role: UserRole.SELLER,
        });
        const result = await orderResolver.mySellerOrders(userEntity, 10, undefined, undefined);
        expect(result.edges).toHaveLength(1);
        const sellerOrder = result.edges[0].node;
        const sellerOrderRecord = sellerOrder as unknown as Record<string, unknown>;
        expect(sellerOrderRecord['customerName']).toBeUndefined();
        expect(sellerOrderRecord['customerEmail']).toBeUndefined();
        expect(sellerOrderRecord['customerPhone']).toBeUndefined();
        expect(sellerOrderRecord['shippingAddress']).toBeUndefined();
        expect(sellerOrderRecord['city']).toBeUndefined();
        expect(sellerOrderRecord['state']).toBeUndefined();
        expect(sellerOrderRecord['zipCode']).toBeUndefined();
        expect(sellerOrderRecord['country']).toBeUndefined();
        expect(sellerOrder.notes).toBe('Leave at door');
      });

      it('updateOrderStatus returns SellerOrder with customer PII stripped and GuestToken stripped from notes', async () => {
        const result = await orderResolver.updateOrderStatus(userSeller1, {
          id: 'order-seller-1',
          status: OrderStatus.PROCESSING,
        });
        const resultRecord = result as unknown as Record<string, unknown>;
        expect(resultRecord['customerName']).toBeUndefined();
        expect(resultRecord['customerEmail']).toBeUndefined();
        expect(resultRecord['customerPhone']).toBeUndefined();
        expect(resultRecord['shippingAddress']).toBeUndefined();
        expect(resultRecord['city']).toBeUndefined();
        expect(resultRecord['state']).toBeUndefined();
        expect(resultRecord['zipCode']).toBeUndefined();
        expect(resultRecord['country']).toBeUndefined();
        expect(result.notes).toBe('Leave at door');
      });

      it('updateOrderTracking returns SellerOrder with customer PII stripped and GuestToken stripped from notes', async () => {
        const result = await orderResolver.updateOrderTracking(userSeller1, 'order-seller-1', 'TRK-999');
        const resultRecord = result as unknown as Record<string, unknown>;
        expect(resultRecord['customerName']).toBeUndefined();
        expect(resultRecord['customerEmail']).toBeUndefined();
        expect(resultRecord['customerPhone']).toBeUndefined();
        expect(resultRecord['shippingAddress']).toBeUndefined();
        expect(resultRecord['city']).toBeUndefined();
        expect(resultRecord['state']).toBeUndefined();
        expect(resultRecord['zipCode']).toBeUndefined();
        expect(resultRecord['country']).toBeUndefined();
        expect(result.notes).toBe('Leave at door');
      });
    });
  });

  describe('PaymentResolver.cancelPendingZarinPalOrder - Guest token attacks (Path 2, authority undefined)', () => {
    const orderId = 'order-1';
    const customerEmail = 'victim@example.com';
    const validGuestToken = '550e8400-e29b-41d4-a716-446655440000';
    const orderWithGuestToken = createMockOrder({
      id: orderId,
      customerEmail,
      status: OrderStatus.PENDING,
      notes: `Fast delivery [GuestToken: ${validGuestToken}]`,
      paymentVerifiedAt: null,
    });

    beforeEach(() => {
      mockOrderService.findOne.mockResolvedValue(orderWithGuestToken);
      mockOrderService.cancelPendingOrder.mockResolvedValue(true);
    });

    it('throws BadRequestException for guestToken with closing bracket', async () => {
      await expect(
        paymentResolver.cancelPendingZarinPalOrder(orderId, undefined, { id: 'u1', email: 'attacker@example.com' }, '550e8400-e29b-41d4]')
      ).rejects.toThrow(BadRequestException);
      await expect(
        paymentResolver.cancelPendingZarinPalOrder(orderId, undefined, { id: 'u1', email: 'attacker@example.com' }, '550e8400-e29b-41d4]')
      ).rejects.toThrow('Invalid guest token format');
      expect(mockOrderService.cancelPendingOrder).not.toHaveBeenCalled();
    });

    it('throws ForbiddenException for prefix of valid token', async () => {
      await expect(
        paymentResolver.cancelPendingZarinPalOrder(orderId, undefined, { id: 'u1', email: 'attacker@example.com' }, '550e8400-e29b-41')
      ).rejects.toThrow(ForbiddenException);
      await expect(
        paymentResolver.cancelPendingZarinPalOrder(orderId, undefined, { id: 'u1', email: 'attacker@example.com' }, '550e8400-e29b-41')
      ).rejects.toThrow('Not allowed to cancel this order');
      expect(mockOrderService.cancelPendingOrder).not.toHaveBeenCalled();
    });

    it('throws ForbiddenException for suffix of valid token', async () => {
      await expect(
        paymentResolver.cancelPendingZarinPalOrder(orderId, undefined, { id: 'u1', email: 'attacker@example.com' }, '41d4-a716-446655440000')
      ).rejects.toThrow(ForbiddenException);
      await expect(
        paymentResolver.cancelPendingZarinPalOrder(orderId, undefined, { id: 'u1', email: 'attacker@example.com' }, '41d4-a716-446655440000')
      ).rejects.toThrow('Not allowed to cancel this order');
      expect(mockOrderService.cancelPendingOrder).not.toHaveBeenCalled();
    });

    it('throws ForbiddenException for short token (< 16 chars) even if present in notes', async () => {
      const orderWithShortToken = createMockOrder({
        id: orderId,
        customerEmail,
        status: OrderStatus.PENDING,
        notes: 'Fast delivery [GuestToken: short123]',
        paymentVerifiedAt: null,
      });
      mockOrderService.findOne.mockResolvedValue(orderWithShortToken);

      await expect(
        paymentResolver.cancelPendingZarinPalOrder(orderId, undefined, { id: 'u1', email: 'attacker@example.com' }, 'short123')
      ).rejects.toThrow(ForbiddenException);
      await expect(
        paymentResolver.cancelPendingZarinPalOrder(orderId, undefined, { id: 'u1', email: 'attacker@example.com' }, 'short123')
      ).rejects.toThrow('Not allowed to cancel this order');
      expect(mockOrderService.cancelPendingOrder).not.toHaveBeenCalled();
    });

    it('converts NotFoundException to ForbiddenException when order does not exist', async () => {
      mockOrderService.findOne.mockRejectedValue(new NotFoundException('Order not found'));

      await expect(
        paymentResolver.cancelPendingZarinPalOrder('non-existent-id', undefined, { id: 'u1', email: 'attacker@example.com' })
      ).rejects.toThrow(ForbiddenException);
      await expect(
        paymentResolver.cancelPendingZarinPalOrder('non-existent-id', undefined, { id: 'u1', email: 'attacker@example.com' })
      ).rejects.toThrow('Not allowed to cancel this order');
      expect(mockOrderService.cancelPendingOrder).not.toHaveBeenCalled();
    });

    it('throws BadRequestException when order is PENDING but paymentVerifiedAt is set', async () => {
      const orderPaid = createMockOrder({
        id: orderId,
        customerEmail,
        status: OrderStatus.PENDING,
        notes: `Fast delivery [GuestToken: ${validGuestToken}]`,
        paymentVerifiedAt: new Date(),
      });
      mockOrderService.findOne.mockResolvedValue(orderPaid);

      await expect(
        paymentResolver.cancelPendingZarinPalOrder(orderId, undefined, { id: 'u1', email: customerEmail }, undefined)
      ).rejects.toThrow(BadRequestException);
      await expect(
        paymentResolver.cancelPendingZarinPalOrder(orderId, undefined, { id: 'u1', email: customerEmail }, undefined)
      ).rejects.toThrow(`Cannot cancel order ${orderId} with status ${OrderStatus.PENDING}. Only unpaid PENDING orders can be cancelled.`);
      expect(mockOrderService.cancelPendingOrder).not.toHaveBeenCalled();
    });
  });

  describe('recalculateBatchOrdersShipping - Guest token vs authenticated user', () => {
    const orderId = 'order-1';
    const customerEmail = 'victim@example.com';
    const validGuestToken = '550e8400-e29b-41d4-a716-446655440000';
    const orderWithGuestToken = createMockOrder({
      id: orderId,
      customerEmail,
      status: OrderStatus.PENDING,
      notes: `Fast delivery [GuestToken: ${validGuestToken}]`,
    });

    beforeEach(() => {
      mockOrderService.findOne.mockResolvedValue(orderWithGuestToken);
      mockOrderService.recalculateBatchOrdersShipping.mockResolvedValue([orderWithGuestToken]);
    });

    it('throws ForbiddenException when logged in as email owner WITHOUT guestToken', async () => {
      const user = { sub: 'u-1', userType: 'customer', email: customerEmail } as never;
      await expect(
        orderResolver.recalculateBatchOrdersShipping([orderId], user, undefined)
      ).rejects.toThrow(ForbiddenException);
      await expect(
        orderResolver.recalculateBatchOrdersShipping([orderId], user, undefined)
      ).rejects.toThrow('Invalid guest token for batch shipping recalculation');
    });

    it('throws ForbiddenException when wrong guestToken provided', async () => {
      const user = { sub: 'u-1', userType: 'customer', email: customerEmail } as never;
      await expect(
        orderResolver.recalculateBatchOrdersShipping([orderId], user, 'wrong-token-123456')
      ).rejects.toThrow(ForbiddenException);
      await expect(
        orderResolver.recalculateBatchOrdersShipping([orderId], user, 'wrong-token-123456')
      ).rejects.toThrow('Invalid guest token for batch shipping recalculation');
    });
  });
});