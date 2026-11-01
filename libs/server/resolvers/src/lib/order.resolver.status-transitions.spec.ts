import { OrderResolver } from './order.resolver';
import {
  Order,
  OrderItem,
  OrderStatus,
  User,
  UserRole,
  toSellerOrder,
  SellerOrder,
  SellerInfo,
} from '@kickzone-workspace/entities';
import { ForbiddenException, BadRequestException, NotFoundException } from '@nestjs/common';

describe('OrderResolver - Seller Status Transitions', () => {
  let resolver: OrderResolver;
  let mockOrderService: {
    findOne: jest.Mock;
    updateOrderStatus: jest.Mock;
  };
  let mockSellerService: {
    findOneByUserId: jest.Mock;
  };

  // Test data factories (re-declared locally per spec)
  const createMockSellerInfo = (overrides: Partial<SellerInfo> = {}): SellerInfo => ({
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
    user: {} as never,
    sellerProducts: [],
    ...overrides,
  });

  const createMockOrder = (overrides: Partial<Order> = {}): Order => ({
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
      } as OrderItem,
    ],
    seller: createMockSellerInfo(),
    ...overrides,
  });

  const createMockSellerUser = (overrides: Partial<User> = {}): User =>
    createMockUser({
      id: 'seller-user-1',
      email: 'seller@example.com',
      username: 'seller',
      role: UserRole.SELLER,
      ...overrides,
    });

  const createMockAdminUser = (overrides: Partial<User> = {}): User =>
    createMockUser({
      id: 'admin-user-1',
      email: 'admin@example.com',
      username: 'admin',
      role: UserRole.ADMIN,
      ...overrides,
    });

  const createMockUser = (overrides: Partial<User> = {}): User => ({
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

  const createMockSellerOrder = (overrides: Partial<SellerOrder> = {}): SellerOrder => ({
    id: 'order-1',
    orderNumber: 'ORD-123',
    status: OrderStatus.PENDING,
    subtotal: 100,
    shippingCost: 10,
    total: 110,
    notes: 'Test order',
    trackingNumber: 'TRACK-123',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    sellerId: 1,
    sellerStoreName: 'Test Store',
    sellerPhone: '09123456789',
    sellerAddress: 'Seller Address',
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
      } as OrderItem,
    ],
    ...overrides,
  });

  beforeEach(() => {
    mockOrderService = {
      findOne: jest.fn(),
      updateOrderStatus: jest.fn(),
    };
    mockSellerService = {
      findOneByUserId: jest.fn(),
    };

    resolver = new OrderResolver(
      mockOrderService as never,
      mockSellerService as never
    );
  });

  describe('updateOrderStatus - Seller allowed transitions', () => {
    const mockSellerInfo = createMockSellerInfo({ id: 1, user: { id: 'seller-user-1' } as never });

    beforeEach(() => {
      mockSellerService.findOneByUserId.mockResolvedValue(mockSellerInfo);
    });

    // Valid forward transitions: CONFIRMED->PROCESSING, PROCESSING->SHIPPED, SHIPPED->DELIVERED
    it.each([
      ['CONFIRMED -> PROCESSING', OrderStatus.CONFIRMED, OrderStatus.PROCESSING],
      ['PROCESSING -> SHIPPED', OrderStatus.PROCESSING, OrderStatus.SHIPPED],
      ['SHIPPED -> DELIVERED', OrderStatus.SHIPPED, OrderStatus.DELIVERED],
    ])('allows owning SELLER to move %s', async (_, fromStatus, toStatus) => {
      const order = createMockOrder({ status: fromStatus });
      const updatedOrder = createMockOrder({ status: toStatus });
      // SellerOrder should not have customerEmail
      const updatedSellerOrder = toSellerOrder(updatedOrder);

      mockOrderService.findOne.mockResolvedValue(order);
      mockOrderService.updateOrderStatus.mockResolvedValue(updatedOrder);

      const user = createMockSellerUser({ id: 'seller-user-1' });
      const result = await resolver.updateOrderStatus(user, { id: 'order-1', status: toStatus });

      expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('seller-user-1');
      expect(mockOrderService.findOne).toHaveBeenCalledWith('order-1');
      expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith('order-1', toStatus);
      // Result should be redacted SellerOrder (no customerEmail)
      expect(result).toEqual(updatedSellerOrder);
      expect((result as unknown as Record<string, unknown>)['customerEmail']).toBeUndefined();
    });
  });

  describe('updateOrderStatus - Seller rejected transitions', () => {
    const mockSellerInfo = createMockSellerInfo({ id: 1, user: { id: 'seller-user-1' } as never });

    beforeEach(() => {
      mockSellerService.findOneByUserId.mockResolvedValue(mockSellerInfo);
    });

    // Rejected transitions for owning SELLER
    it.each([
      ['PENDING -> CONFIRMED', OrderStatus.PENDING, OrderStatus.CONFIRMED],
      ['PENDING -> CANCELLED', OrderStatus.PENDING, OrderStatus.CANCELLED],
      ['CONFIRMED -> CANCELLED', OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      ['CONFIRMED -> REFUNDED', OrderStatus.CONFIRMED, OrderStatus.REFUNDED],
      ['SHIPPED -> REFUNDED', OrderStatus.SHIPPED, OrderStatus.REFUNDED],
      ['DELIVERED -> REFUNDED', OrderStatus.DELIVERED, OrderStatus.REFUNDED],
      ['CONFIRMED -> SHIPPED (skip)', OrderStatus.CONFIRMED, OrderStatus.SHIPPED],
      ['PROCESSING -> CONFIRMED (backwards)', OrderStatus.PROCESSING, OrderStatus.CONFIRMED],
      ['CONFIRMED -> CONFIRMED (no-op)', OrderStatus.CONFIRMED, OrderStatus.CONFIRMED],
      ['DELIVERED -> PROCESSING (backwards)', OrderStatus.DELIVERED, OrderStatus.PROCESSING],
    ])('rejects owning SELLER %s with BadRequestException and does not call service', async (_, fromStatus, toStatus) => {
      const order = createMockOrder({ status: fromStatus });

      mockOrderService.findOne.mockResolvedValue(order);

      const user = createMockSellerUser({ id: 'seller-user-1' });

      await expect(
        resolver.updateOrderStatus(user, { id: 'order-1', status: toStatus })
      ).rejects.toThrow(BadRequestException);

      await expect(
        resolver.updateOrderStatus(user, { id: 'order-1', status: toStatus })
      ).rejects.toThrow(`Sellers can only move orders through fulfilment steps (CONFIRMED->PROCESSING->SHIPPED->DELIVERED); ${fromStatus} -> ${toStatus} is not allowed`);

      expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('seller-user-1');
      expect(mockOrderService.findOne).toHaveBeenCalledWith('order-1');
      expect(mockOrderService.updateOrderStatus).not.toHaveBeenCalled();
    });
  });

  describe('updateOrderStatus - Non-owning seller rejected', () => {
    it('rejects non-owning SELLER on CONFIRMED->PROCESSING with ForbiddenException', async () => {
      const order = createMockOrder({ status: OrderStatus.CONFIRMED, sellerId: 1 });
      const otherSellerInfo = createMockSellerInfo({ id: 999, user: { id: 'other-seller-user' } as never });

      mockOrderService.findOne.mockResolvedValue(order);
      mockSellerService.findOneByUserId.mockResolvedValue(otherSellerInfo);

      const user = createMockSellerUser({ id: 'other-seller-user' });

      await expect(
        resolver.updateOrderStatus(user, { id: 'order-1', status: OrderStatus.PROCESSING })
      ).rejects.toThrow(ForbiddenException);

      await expect(
        resolver.updateOrderStatus(user, { id: 'order-1', status: OrderStatus.PROCESSING })
      ).rejects.toThrow('You can only update status for your own seller orders');

      expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('other-seller-user');
      expect(mockOrderService.findOne).toHaveBeenCalledWith('order-1');
      expect(mockOrderService.updateOrderStatus).not.toHaveBeenCalled();
    });
  });

  describe('updateOrderStatus - JWT shape { sub, userType: "seller" }', () => {
    const mockSellerInfo = createMockSellerInfo({ id: 1, user: { id: 's-user' } as never });

    beforeEach(() => {
      mockSellerService.findOneByUserId.mockResolvedValue(mockSellerInfo);
    });

    it('allows owning SELLER with { sub, userType: "seller" } CONFIRMED->PROCESSING', async () => {
      const order = createMockOrder({ status: OrderStatus.CONFIRMED, sellerId: 1 });
      const updatedOrder = createMockOrder({ status: OrderStatus.PROCESSING });
      const updatedSellerOrder = toSellerOrder(updatedOrder);

      mockOrderService.findOne.mockResolvedValue(order);
      mockOrderService.updateOrderStatus.mockResolvedValue(updatedOrder);

      const user = { sub: 's-user', userType: 'seller' } as never;
      const result = await resolver.updateOrderStatus(user, { id: 'order-1', status: OrderStatus.PROCESSING });

      expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('s-user');
      expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith('order-1', OrderStatus.PROCESSING);
      expect(result).toEqual(updatedSellerOrder);
      expect((result as unknown as Record<string, unknown>)['customerEmail']).toBeUndefined();
    });
  });

  describe('updateOrderStatus - ADMIN unchanged', () => {
    const mockOrder = createMockOrder({ sellerId: 1 });
    const mockSellerInfo = createMockSellerInfo({ id: 1, user: { id: 'seller-user-1' } as never });

    beforeEach(() => {
      mockOrderService.findOne.mockResolvedValue(mockOrder);
      mockSellerService.findOneByUserId.mockResolvedValue(mockSellerInfo);
    });

    it.each([
      ['PENDING -> CONFIRMED', OrderStatus.PENDING, OrderStatus.CONFIRMED],
      ['CONFIRMED -> REFUNDED', OrderStatus.CONFIRMED, OrderStatus.REFUNDED],
      ['PENDING -> CANCELLED', OrderStatus.PENDING, OrderStatus.CANCELLED],
      ['DELIVERED -> REFUNDED', OrderStatus.DELIVERED, OrderStatus.REFUNDED],
    ])('allows ADMIN %s (service called, full Order returned)', async (_, fromStatus, toStatus) => {
      const order = createMockOrder({ status: fromStatus });
      const updatedOrder = createMockOrder({ status: toStatus });

      mockOrderService.findOne.mockResolvedValue(order);
      mockOrderService.updateOrderStatus.mockResolvedValue(updatedOrder);

      const user = createMockAdminUser();
      const result = await resolver.updateOrderStatus(user, { id: 'order-1', status: toStatus });

      expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith('order-1', toStatus);
      expect(result).toEqual(updatedOrder);
      expect((result as unknown as Record<string, unknown>)['customerEmail']).toBeDefined(); // Full Order returned for ADMIN
    });
  });
});