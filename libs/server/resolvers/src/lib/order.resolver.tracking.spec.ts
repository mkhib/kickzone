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
import { OrdersConnection, OrderEdge, SellerOrdersConnection } from '@kickzone-workspace/inputs';
import { ForbiddenException, BadRequestException, NotFoundException } from '@nestjs/common';

describe('OrderResolver - updateOrderTracking', () => {
  let resolver: OrderResolver;
  let mockOrderService: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    updateOrder: jest.Mock;
    updateOrderStatus: jest.Mock;
    deleteOrder: jest.Mock;
    cancelPendingOrder: jest.Mock;
    getOrdersBySeller: jest.Mock;
    getOrdersByCustomerEmail: jest.Mock;
    updateTrackingNumber: jest.Mock;
  };
  let mockSellerService: {
    findOneByUserId: jest.Mock;
  };

  // Test data factories (mirrored from order.resolver.spec.ts)
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
    user: {} as any,
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
      findAll: jest.fn(),
      findOne: jest.fn(),
      updateOrder: jest.fn(),
      updateOrderStatus: jest.fn(),
      deleteOrder: jest.fn(),
      cancelPendingOrder: jest.fn(),
      getOrdersBySeller: jest.fn(),
      getOrdersByCustomerEmail: jest.fn(),
      updateTrackingNumber: jest.fn(),
    };
    mockSellerService = {
      findOneByUserId: jest.fn(),
    };

    resolver = new OrderResolver(
      mockOrderService as any,
      mockSellerService as any
    );
  });

  describe('updateOrderTracking mutation', () => {
    const mockSellerInfo = createMockSellerInfo({ id: 1, user: { id: 'seller-user-1' } as any });

    beforeEach(() => {
      mockSellerService.findOneByUserId.mockResolvedValue(mockSellerInfo);
    });

    it('rejects CUSTOMER with ForbiddenException', async () => {
      const user = createMockUser({ role: UserRole.CUSTOMER });
      const order = createMockOrder({ status: OrderStatus.CONFIRMED });
      mockOrderService.findOne.mockResolvedValue(order);

      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow(ForbiddenException);
      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow('Customers are not allowed to update tracking');
      expect(mockOrderService.findOne).toHaveBeenCalledWith('order-1');
      expect(mockOrderService.updateTrackingNumber).not.toHaveBeenCalled();
    });

    it('rejects SELLER not owning order with ForbiddenException and does not call updateTrackingNumber', async () => {
      const user = createMockSellerUser({ id: 'other-seller-user' });
      const otherSellerInfo = createMockSellerInfo({ id: 999, user: { id: 'other-seller-user' } as any });
      mockSellerService.findOneByUserId.mockResolvedValue(otherSellerInfo);
      const order = createMockOrder({ status: OrderStatus.CONFIRMED, sellerId: 1 });
      mockOrderService.findOne.mockResolvedValue(order);

      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow(ForbiddenException);
      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow('You can only update tracking for your own seller orders');
      expect(mockOrderService.findOne).toHaveBeenCalledWith('order-1');
      expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('other-seller-user');
      expect(mockOrderService.updateTrackingNumber).not.toHaveBeenCalled();
    });

    it('rejects SELLER with no profile with ForbiddenException', async () => {
      const user = createMockSellerUser({ id: 'seller-user-1' });
      mockSellerService.findOneByUserId.mockResolvedValue(null);
      const order = createMockOrder({ status: OrderStatus.CONFIRMED, sellerId: 1 });
      mockOrderService.findOne.mockResolvedValue(order);

      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow(ForbiddenException);
      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow('You can only update tracking for your own seller orders');
      expect(mockOrderService.updateTrackingNumber).not.toHaveBeenCalled();
    });

    it('allows SELLER owning a CONFIRMED order, calls updateTrackingNumber with trimmed value, returns redacted SellerOrder', async () => {
      const user = createMockSellerUser({ id: 'seller-user-1' });
      const order = createMockOrder({ status: OrderStatus.CONFIRMED, sellerId: 1, trackingNumber: '' });
      const updatedOrder = createMockOrder({ status: OrderStatus.CONFIRMED, sellerId: 1, trackingNumber: 'TRK123' });
      const updatedSellerOrder = toSellerOrder(updatedOrder);
      mockOrderService.findOne.mockResolvedValue(order);
      mockOrderService.updateTrackingNumber.mockResolvedValue(updatedOrder);

      const result = await resolver.updateOrderTracking(user, 'order-1', '  TRK123  ');

      expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('seller-user-1');
      expect(mockOrderService.findOne).toHaveBeenCalledWith('order-1');
      expect(mockOrderService.updateTrackingNumber).toHaveBeenCalledWith('order-1', 'TRK123');
      expect(result).toEqual(updatedSellerOrder);
      expect((result as any).customerEmail).toBeUndefined();
      expect((result as any).customerPhone).toBeUndefined();
      expect((result as any).customerName).toBeUndefined();
      expect((result as any).shippingAddress).toBeUndefined();
    });

    it('allows ADMIN on SHIPPED order, returns full Order', async () => {
      const user = createMockAdminUser();
      const order = createMockOrder({ status: OrderStatus.SHIPPED, sellerId: 1, trackingNumber: '' });
      const updatedOrder = createMockOrder({ status: OrderStatus.SHIPPED, sellerId: 1, trackingNumber: 'TRK123' });
      mockOrderService.findOne.mockResolvedValue(order);
      mockOrderService.updateTrackingNumber.mockResolvedValue(updatedOrder);

      const result = await resolver.updateOrderTracking(user, 'order-1', 'TRK123');

      expect(mockOrderService.findOne).toHaveBeenCalledWith('order-1');
      expect(mockOrderService.updateTrackingNumber).toHaveBeenCalledWith('order-1', 'TRK123');
      expect(result).toEqual(updatedOrder);
      expect((result as any).customerEmail).toBeDefined();
    });

    it('rejects PENDING order with BadRequestException and does not call updateTrackingNumber', async () => {
      const user = createMockAdminUser();
      const order = createMockOrder({ status: OrderStatus.PENDING });
      mockOrderService.findOne.mockResolvedValue(order);

      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow(BadRequestException);
      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow('Tracking can only be set on confirmed, processing or shipped orders');
      expect(mockOrderService.updateTrackingNumber).not.toHaveBeenCalled();
    });

    it('rejects DELIVERED order with BadRequestException and does not call updateTrackingNumber', async () => {
      const user = createMockAdminUser();
      const order = createMockOrder({ status: OrderStatus.DELIVERED });
      mockOrderService.findOne.mockResolvedValue(order);

      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow(BadRequestException);
      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow('Tracking can only be set on confirmed, processing or shipped orders');
      expect(mockOrderService.updateTrackingNumber).not.toHaveBeenCalled();
    });

    it('rejects CANCELLED order with BadRequestException and does not call updateTrackingNumber', async () => {
      const user = createMockAdminUser();
      const order = createMockOrder({ status: OrderStatus.CANCELLED });
      mockOrderService.findOne.mockResolvedValue(order);

      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow(BadRequestException);
      expect(mockOrderService.updateTrackingNumber).not.toHaveBeenCalled();
    });

    it('rejects REFUNDED order with BadRequestException and does not call updateTrackingNumber', async () => {
      const user = createMockAdminUser();
      const order = createMockOrder({ status: OrderStatus.REFUNDED });
      mockOrderService.findOne.mockResolvedValue(order);

      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow(BadRequestException);
      expect(mockOrderService.updateTrackingNumber).not.toHaveBeenCalled();
    });

    it('rejects empty tracking number with BadRequestException', async () => {
      const user = createMockAdminUser();
      const order = createMockOrder({ status: OrderStatus.CONFIRMED });
      mockOrderService.findOne.mockResolvedValue(order);

      await expect(
        resolver.updateOrderTracking(user, 'order-1', '')
      ).rejects.toThrow(BadRequestException);
      await expect(
        resolver.updateOrderTracking(user, 'order-1', '')
      ).rejects.toThrow('Tracking number must be 1-100 characters');
      expect(mockOrderService.updateTrackingNumber).not.toHaveBeenCalled();
    });

    it('rejects whitespace-only tracking number with BadRequestException', async () => {
      const user = createMockAdminUser();
      const order = createMockOrder({ status: OrderStatus.CONFIRMED });
      mockOrderService.findOne.mockResolvedValue(order);

      await expect(
        resolver.updateOrderTracking(user, 'order-1', '   ')
      ).rejects.toThrow(BadRequestException);
      await expect(
        resolver.updateOrderTracking(user, 'order-1', '   ')
      ).rejects.toThrow('Tracking number must be 1-100 characters');
      expect(mockOrderService.updateTrackingNumber).not.toHaveBeenCalled();
    });

    it('rejects 101-character tracking number with BadRequestException', async () => {
      const user = createMockAdminUser();
      const order = createMockOrder({ status: OrderStatus.CONFIRMED });
      mockOrderService.findOne.mockResolvedValue(order);
      const longTracking = 'A'.repeat(101);

      await expect(
        resolver.updateOrderTracking(user, 'order-1', longTracking)
      ).rejects.toThrow(BadRequestException);
      await expect(
        resolver.updateOrderTracking(user, 'order-1', longTracking)
      ).rejects.toThrow('Tracking number must be 1-100 characters');
      expect(mockOrderService.updateTrackingNumber).not.toHaveBeenCalled();
    });

    it('accepts 100-character tracking number', async () => {
      const user = createMockAdminUser();
      const order = createMockOrder({ status: OrderStatus.CONFIRMED });
      const updatedOrder = createMockOrder({ status: OrderStatus.CONFIRMED, trackingNumber: 'A'.repeat(100) });
      mockOrderService.findOne.mockResolvedValue(order);
      mockOrderService.updateTrackingNumber.mockResolvedValue(updatedOrder);

      const result = await resolver.updateOrderTracking(user, 'order-1', 'A'.repeat(100));

      expect(mockOrderService.updateTrackingNumber).toHaveBeenCalledWith('order-1', 'A'.repeat(100));
      expect(result.trackingNumber).toBe('A'.repeat(100));
    });

    it('allows SELLER with JWT shape { sub, userType: "seller" } owning order', async () => {
      const user = { sub: 'seller-user-1', userType: 'seller' } as any;
      const order = createMockOrder({ status: OrderStatus.PROCESSING, sellerId: 1 });
      const updatedOrder = createMockOrder({ status: OrderStatus.PROCESSING, sellerId: 1, trackingNumber: 'TRK123' });
      const updatedSellerOrder = toSellerOrder(updatedOrder);
      mockOrderService.findOne.mockResolvedValue(order);
      mockOrderService.updateTrackingNumber.mockResolvedValue(updatedOrder);

      const result = await resolver.updateOrderTracking(user, 'order-1', '  TRK123  ');

      expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('seller-user-1');
      expect(mockOrderService.updateTrackingNumber).toHaveBeenCalledWith('order-1', 'TRK123');
      expect(result).toEqual(updatedSellerOrder);
      expect((result as any).customerEmail).toBeUndefined();
    });

    it('rejects UNKNOWN role with ForbiddenException', async () => {
      const user = { id: 'user-1', userType: 'INVALID' } as any;
      const order = createMockOrder({ status: OrderStatus.CONFIRMED });
      mockOrderService.findOne.mockResolvedValue(order);

      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow(ForbiddenException);
      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow('Customers are not allowed to update tracking');
      expect(mockOrderService.updateTrackingNumber).not.toHaveBeenCalled();
    });

    it('rejects SELLER with JWT shape { sub, userType: "seller" } not owning order', async () => {
      const user = { sub: 'other-s-user', userType: 'seller' } as any;
      const otherSellerInfo = createMockSellerInfo({ id: 999, user: { id: 'other-s-user' } as any });
      mockSellerService.findOneByUserId.mockResolvedValue(otherSellerInfo);
      const order = createMockOrder({ status: OrderStatus.CONFIRMED, sellerId: 1 });
      mockOrderService.findOne.mockResolvedValue(order);

      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow(ForbiddenException);
      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow('You can only update tracking for your own seller orders');
      expect(mockOrderService.updateTrackingNumber).not.toHaveBeenCalled();
    });

    it('rejects CUSTOMER with JWT shape { sub, userType: "customer" }', async () => {
      const user = { sub: 'c-user', userType: 'customer', email: 'customer@example.com' } as any;
      const order = createMockOrder({ status: OrderStatus.CONFIRMED });
      mockOrderService.findOne.mockResolvedValue(order);

      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow(ForbiddenException);
      await expect(
        resolver.updateOrderTracking(user, 'order-1', 'TRK123')
      ).rejects.toThrow('Customers are not allowed to update tracking');
      expect(mockOrderService.updateTrackingNumber).not.toHaveBeenCalled();
    });

    it('allows ADMIN with JWT shape { sub, userType: "admin" } on CONFIRMED order', async () => {
      const user = { sub: 'a-user', userType: 'admin' } as any;
      const order = createMockOrder({ status: OrderStatus.CONFIRMED });
      const updatedOrder = createMockOrder({ status: OrderStatus.CONFIRMED, trackingNumber: 'TRK123' });
      mockOrderService.findOne.mockResolvedValue(order);
      mockOrderService.updateTrackingNumber.mockResolvedValue(updatedOrder);

      const result = await resolver.updateOrderTracking(user, 'order-1', 'TRK123');

      expect(mockOrderService.updateTrackingNumber).toHaveBeenCalledWith('order-1', 'TRK123');
      expect(result).toEqual(updatedOrder);
      expect((result as any).customerEmail).toBeDefined();
    });
  });
});