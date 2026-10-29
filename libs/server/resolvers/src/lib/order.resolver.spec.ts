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

describe('OrderResolver', () => {
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
  };
  let mockSellerService: {
    findOneByUserId: jest.Mock;
  };

  // Test data factories
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
    };
    mockSellerService = {
      findOneByUserId: jest.fn(),
    };

    resolver = new OrderResolver(
      mockOrderService as any,
      mockSellerService as any
    );
  });

  // Helper to create mock connection
  const createMockConnection = (orders: Order[] = []): OrdersConnection => ({
    edges: orders.map((order, index) => ({
      node: order,
      cursor: `cursor-${index}`,
    })),
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      endCursor: orders.length > 0 ? `cursor-${orders.length - 1}` : undefined,
    },
    totalCount: orders.length,
  });

  const createMockSellerConnection = (orders: Order[] = []): SellerOrdersConnection => ({
    edges: orders.map((order, index) => ({
      node: toSellerOrder(order),
      cursor: `cursor-${index}`,
    })),
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      endCursor: orders.length > 0 ? `cursor-${orders.length - 1}` : undefined,
    },
    totalCount: orders.length,
  });

  describe('orders query', () => {
    const mockConnection = createMockConnection([createMockOrder()]);

    beforeEach(() => {
      mockOrderService.findAll.mockResolvedValue(mockConnection);
    });

    it('rejects CUSTOMER with ForbiddenException', async () => {
      const user = createMockUser({ role: UserRole.CUSTOMER });
      await expect(resolver.orders(user, 10, undefined, undefined, undefined)).rejects.toThrow(
        ForbiddenException
      );
      expect(mockOrderService.findAll).not.toHaveBeenCalled();
    });

    it('rejects SELLER with ForbiddenException', async () => {
      const user = createMockSellerUser();
      await expect(resolver.orders(user, 10, undefined, undefined, undefined)).rejects.toThrow(
        ForbiddenException
      );
      expect(mockOrderService.findAll).not.toHaveBeenCalled();
    });

    it('allows ADMIN and calls findAll', async () => {
      const user = createMockAdminUser();
      const result = await resolver.orders(user, 10, 'cursor-1', 'seller-1', OrderStatus.CONFIRMED);

      expect(mockOrderService.findAll).toHaveBeenCalledWith(10, 'cursor-1', 'seller-1', OrderStatus.CONFIRMED);
      expect(result).toEqual(mockConnection);
    });
  });

  describe('adminSellerOrders query', () => {
    const mockConnection = createMockConnection([createMockOrder()]);

    beforeEach(() => {
      mockOrderService.findAll.mockResolvedValue(mockConnection);
    });

    it('rejects CUSTOMER with ForbiddenException', async () => {
      const user = createMockUser({ role: UserRole.CUSTOMER });
      await expect(
        resolver.adminSellerOrders(user, 'seller-1', 10, undefined, undefined)
      ).rejects.toThrow(ForbiddenException);
    });

    it('rejects SELLER with ForbiddenException', async () => {
      const user = createMockSellerUser();
      await expect(
        resolver.adminSellerOrders(user, 'seller-1', 10, undefined, undefined)
      ).rejects.toThrow(ForbiddenException);
    });

    it('allows ADMIN and calls findAll with sellerId', async () => {
      const user = createMockAdminUser();
      const result = await resolver.adminSellerOrders(user, 'seller-1', 10, 'cursor-1', OrderStatus.SHIPPED);

      expect(mockOrderService.findAll).toHaveBeenCalledWith(10, 'cursor-1', 'seller-1', OrderStatus.SHIPPED);
      expect(result).toEqual(mockConnection);
    });
  });

  describe('allSellerOrders query', () => {
    const mockConnection = createMockConnection([createMockOrder()]);

    beforeEach(() => {
      mockOrderService.findAll.mockResolvedValue(mockConnection);
    });

    it('rejects CUSTOMER with ForbiddenException', async () => {
      const user = createMockUser({ role: UserRole.CUSTOMER });
      await expect(resolver.allSellerOrders(user, 10, undefined, undefined)).rejects.toThrow(
        ForbiddenException
      );
    });

    it('rejects SELLER with ForbiddenException', async () => {
      const user = createMockSellerUser();
      await expect(resolver.allSellerOrders(user, 10, undefined, undefined)).rejects.toThrow(
        ForbiddenException
      );
    });

    it('allows ADMIN and calls findAll without sellerId', async () => {
      const user = createMockAdminUser();
      const result = await resolver.allSellerOrders(user, 10, 'cursor-1', OrderStatus.DELIVERED);

      expect(mockOrderService.findAll).toHaveBeenCalledWith(10, 'cursor-1', undefined, OrderStatus.DELIVERED);
      expect(result).toEqual(mockConnection);
    });
  });

  describe('myOrders query', () => {
    const mockOrder = createMockOrder({ customerEmail: 'customer@example.com' });
    const mockConnection = createMockConnection([mockOrder]);

    beforeEach(() => {
      mockOrderService.getOrdersByCustomerEmail.mockResolvedValue(mockConnection);
    });

    describe('JWT Shape & Role Matrix', () => {
      it('succeeds for CUSTOMER with { sub, userType: "customer", email } (lowercase userType, sub instead of id)', async () => {
        const user = { sub: 'u-1', userType: 'customer', email: 'customer@example.com' } as any;
        const result = await resolver.myOrders(user, 10, undefined);

        expect(mockOrderService.getOrdersByCustomerEmail).toHaveBeenCalledWith('customer@example.com', 10, undefined);
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(mockOrder);
      });

      it('throws NotFoundException for SELLER with { sub, userType: "seller" }', async () => {
        const user = { sub: 's-1', userType: 'seller' } as any;
        await expect(resolver.myOrders(user, 10, undefined)).rejects.toThrow(NotFoundException);
        await expect(resolver.myOrders(user, 10, undefined)).rejects.toThrow('Sellers should use mySellerOrders query instead');
        expect(mockOrderService.getOrdersByCustomerEmail).not.toHaveBeenCalled();
      });

      it('throws NotFoundException for ADMIN with { id, role: "ADMIN" }', async () => {
        const user = { id: 'a-1', role: 'ADMIN' } as any;
        await expect(resolver.myOrders(user, 10, undefined)).rejects.toThrow(NotFoundException);
        await expect(resolver.myOrders(user, 10, undefined)).rejects.toThrow('Sellers should use mySellerOrders query instead');
        expect(mockOrderService.getOrdersByCustomerEmail).not.toHaveBeenCalled();
      });

      it('throws NotFoundException for UNKNOWN role', async () => {
        const user = { sub: 'u-1', userType: 'INVALID' } as any;
        await expect(resolver.myOrders(user, 10, undefined)).rejects.toThrow(NotFoundException);
        await expect(resolver.myOrders(user, 10, undefined)).rejects.toThrow('Sellers should use mySellerOrders query instead');
      });

      it('throws NotFoundException for null user', async () => {
        await expect(resolver.myOrders(null as any, 10, undefined)).rejects.toThrow(NotFoundException);
      });

      it('throws NotFoundException for empty object user', async () => {
        await expect(resolver.myOrders({} as any, 10, undefined)).rejects.toThrow(NotFoundException);
      });
    });
  });

  describe('mySellerOrders query', () => {
    const mockOrder = createMockOrder({ id: 'order-1', status: OrderStatus.PENDING });
    const mockOrderDelivered = createMockOrder({ id: 'order-2', status: OrderStatus.DELIVERED });
    const mockSellerInfo = createMockSellerInfo({ id: 1, user: { id: 'seller-user-1' } as any });
    const mockSellerConnection = createMockSellerConnection([mockOrder, mockOrderDelivered]);

    beforeEach(() => {
      mockOrderService.getOrdersBySeller.mockResolvedValue(mockSellerConnection);
      mockSellerService.findOneByUserId.mockResolvedValue(mockSellerInfo);
    });

    it('rejects CUSTOMER with NotFoundException', async () => {
      const user = createMockUser({ role: UserRole.CUSTOMER });
      await expect(resolver.mySellerOrders(user, 10, undefined, undefined)).rejects.toThrow(
        NotFoundException
      );
      await expect(resolver.mySellerOrders(user, 10, undefined, undefined)).rejects.toThrow(
        'Only sellers can access seller orders'
      );
      expect(mockOrderService.getOrdersBySeller).not.toHaveBeenCalled();
    });

    it('rejects ADMIN with NotFoundException', async () => {
      const user = createMockAdminUser();
      await expect(resolver.mySellerOrders(user, 10, undefined, undefined)).rejects.toThrow(
        NotFoundException
      );
      expect(mockOrderService.getOrdersBySeller).not.toHaveBeenCalled();
    });

    it('allows SELLER and calls getOrdersBySeller without status', async () => {
      const user = createMockSellerUser({ id: 'seller-user-1' });
      const result = await resolver.mySellerOrders(user, 10, 'cursor-1', undefined);

      expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('seller-user-1');
      expect(mockOrderService.getOrdersBySeller).toHaveBeenCalledWith('1', 10, 'cursor-1', undefined);
      expect(result).toEqual(mockSellerConnection);
    });

    it('allows SELLER and calls getOrdersBySeller with status filter', async () => {
      const user = createMockSellerUser({ id: 'seller-user-1' });
      const result = await resolver.mySellerOrders(user, 10, 'cursor-1', OrderStatus.DELIVERED);

      expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('seller-user-1');
      expect(mockOrderService.getOrdersBySeller).toHaveBeenCalledWith('1', 10, 'cursor-1', OrderStatus.DELIVERED);
      expect(result).toEqual(mockSellerConnection);
    });

    it('maps nodes with toSellerOrder (redacts customer PII)', async () => {
      const user = createMockSellerUser({ id: 'seller-user-1' });
      const result = await resolver.mySellerOrders(user, 10, undefined, undefined);

      // Verify the connection structure and that nodes are SellerOrder (no customer PII)
      expect(result.edges).toHaveLength(2);
      expect(result.edges[0].node).toBeDefined();
      expect((result.edges[0].node as any).customerEmail).toBeUndefined();
      expect((result.edges[0].node as any).customerPhone).toBeUndefined();
      expect((result.edges[0].node as any).customerName).toBeUndefined();
      expect((result.edges[0].node as any).shippingAddress).toBeUndefined();
    });

    it('throws NotFoundException when SELLER has no seller profile', async () => {
      const user = createMockSellerUser({ id: 'seller-user-1' });
      mockSellerService.findOneByUserId.mockResolvedValue(null);

      await expect(resolver.mySellerOrders(user, 10, undefined, undefined)).rejects.toThrow(
        NotFoundException
      );
      await expect(resolver.mySellerOrders(user, 10, undefined, undefined)).rejects.toThrow(
        'Seller not found for this user'
      );
    });

    describe('JWT Shape, Status Filter, & PII Redaction Matrix', () => {
      const mockOrderProcessing = createMockOrder({ id: 'order-1', status: OrderStatus.PROCESSING });
      const mockOrderPending = createMockOrder({ id: 'order-2', status: OrderStatus.PENDING });
      const mockSellerInfo = createMockSellerInfo({ id: 42, user: { id: 'seller-user-42' } as any });
      const mockSellerConnection = createMockSellerConnection([mockOrderProcessing, mockOrderPending]);

      beforeEach(() => {
        mockOrderService.getOrdersBySeller.mockResolvedValue(mockSellerConnection);
        mockSellerService.findOneByUserId.mockResolvedValue(mockSellerInfo);
      });

      it('succeeds for SELLER with { sub, userType: "seller" } (lowercase userType and sub claim)', async () => {
        const user = { sub: 'seller-user-42', userType: 'seller' } as any;
        const result = await resolver.mySellerOrders(user, 10, undefined, undefined);

        expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('seller-user-42');
        expect(mockOrderService.getOrdersBySeller).toHaveBeenCalledWith('42', 10, undefined, undefined);
        expect(result).toEqual(mockSellerConnection);
      });

      it('forwards status filter (PROCESSING) to getOrdersBySeller', async () => {
        const user = { sub: 'seller-user-42', userType: 'seller' } as any;
        await resolver.mySellerOrders(user, 10, undefined, OrderStatus.PROCESSING);

        expect(mockOrderService.getOrdersBySeller).toHaveBeenCalledWith('42', 10, undefined, OrderStatus.PROCESSING);
      });

      it('forwards undefined status to getOrdersBySeller', async () => {
        const user = { sub: 'seller-user-42', userType: 'seller' } as any;
        await resolver.mySellerOrders(user, 10, undefined, undefined);

        expect(mockOrderService.getOrdersBySeller).toHaveBeenCalledWith('42', 10, undefined, undefined);
      });

      it('strips customer PII via toSellerOrder', async () => {
        const user = { sub: 'seller-user-42', userType: 'seller' } as any;
        const result = await resolver.mySellerOrders(user, 10, undefined, undefined);

        expect(result.edges).toHaveLength(2);
        result.edges.forEach((edge) => {
          expect((edge.node as any).customerEmail).toBeUndefined();
          expect((edge.node as any).customerPhone).toBeUndefined();
          expect((edge.node as any).customerName).toBeUndefined();
          expect((edge.node as any).shippingAddress).toBeUndefined();
        });
      });

      it('throws NotFoundException for CUSTOMER with { sub, userType: "customer" }', async () => {
        const user = { sub: 'c-1', userType: 'customer' } as any;
        await expect(resolver.mySellerOrders(user, 10, undefined, undefined)).rejects.toThrow(NotFoundException);
        await expect(resolver.mySellerOrders(user, 10, undefined, undefined)).rejects.toThrow('Only sellers can access seller orders');
        expect(mockOrderService.getOrdersBySeller).not.toHaveBeenCalled();
      });

      it('throws NotFoundException for null user', async () => {
        await expect(resolver.mySellerOrders(null as any, 10, undefined, undefined)).rejects.toThrow(NotFoundException);
        await expect(resolver.mySellerOrders(null as any, 10, undefined, undefined)).rejects.toThrow('Only sellers can access seller orders');
      });

      it('throws NotFoundException for empty object user', async () => {
        await expect(resolver.mySellerOrders({} as any, 10, undefined, undefined)).rejects.toThrow(NotFoundException);
        await expect(resolver.mySellerOrders({} as any, 10, undefined, undefined)).rejects.toThrow('Only sellers can access seller orders');
      });

      it('throws NotFoundException when sellerService.findOneByUserId returns null', async () => {
        const user = { sub: 'seller-user-42', userType: 'seller' } as any;
        mockSellerService.findOneByUserId.mockResolvedValue(null);

        await expect(resolver.mySellerOrders(user, 10, undefined, undefined)).rejects.toThrow(NotFoundException);
        await expect(resolver.mySellerOrders(user, 10, undefined, undefined)).rejects.toThrow('Seller not found for this user');
      });
    });
  });

  describe('order query', () => {
    const mockOrder = createMockOrder({ customerEmail: 'customer@example.com', sellerId: 1 });
    const mockSellerOrder = toSellerOrder(mockOrder);
    const mockSellerInfo = createMockSellerInfo({ id: 1, user: { id: 'seller-user-1' } as any });

    beforeEach(() => {
      mockOrderService.findOne.mockResolvedValue(mockOrder);
      mockSellerService.findOneByUserId.mockResolvedValue(mockSellerInfo);
    });

    describe('ADMIN role', () => {
      it('allows ADMIN to read any order', async () => {
        const user = createMockAdminUser();
        const result = await resolver.order(user, 'order-1');

        expect(mockOrderService.findOne).toHaveBeenCalledWith('order-1');
        expect(result).toEqual(mockOrder);
      });
    });

    describe('SELLER role', () => {
      it('allows SELLER to read own order and returns redacted SellerOrder', async () => {
        const user = createMockSellerUser({ id: 'seller-user-1' });
        const result = await resolver.order(user, 'order-1');

        expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('seller-user-1');
        expect(result).toEqual(mockSellerOrder);
        // Verify customer PII is not present
        expect((result as any).customerEmail).toBeUndefined();
        expect((result as any).customerPhone).toBeUndefined();
        expect((result as any).customerName).toBeUndefined();
        expect((result as any).shippingAddress).toBeUndefined();
      });

      it('throws ForbiddenException when SELLER tries to read another seller order', async () => {
        const user = createMockSellerUser({ id: 'other-seller-user' });
        const otherSellerInfo = createMockSellerInfo({ id: 999, user: { id: 'other-seller-user' } as any });
        mockSellerService.findOneByUserId.mockResolvedValue(otherSellerInfo);

        await expect(resolver.order(user, 'order-1')).rejects.toThrow(
          ForbiddenException
        );
        await expect(resolver.order(user, 'order-1')).rejects.toThrow(
          'You do not have permission to view this order'
        );
      });

      it('throws ForbiddenException when SELLER has no seller profile', async () => {
        const user = createMockSellerUser({ id: 'seller-user-1' });
        mockSellerService.findOneByUserId.mockResolvedValue(null);

        await expect(resolver.order(user, 'order-1')).rejects.toThrow(
          ForbiddenException
        );
        await expect(resolver.order(user, 'order-1')).rejects.toThrow(
          'You do not have permission to view this order'
        );
      });
    });

    describe('CUSTOMER role', () => {
      it('allows CUSTOMER to read own order', async () => {
        const user = createMockUser({ email: 'customer@example.com' });
        const result = await resolver.order(user, 'order-1');

        expect(result).toEqual(mockOrder);
      });

      it('throws ForbiddenException when CUSTOMER tries to read another customer order', async () => {
        const user = createMockUser({ email: 'other@example.com' });
        await expect(resolver.order(user, 'order-1')).rejects.toThrow(
          ForbiddenException
        );
        await expect(resolver.order(user, 'order-1')).rejects.toThrow(
          'You do not have permission to view this order'
        );
      });
    });

    describe('UNKNOWN role', () => {
      it('throws ForbiddenException for unknown role', async () => {
        const user = { id: 'user-1', userType: 'INVALID' };
        await expect(resolver.order(user, 'order-1')).rejects.toThrow(
          ForbiddenException
        );
        await expect(resolver.order(user, 'order-1')).rejects.toThrow('Access denied');
      });
    });

    describe('JWT Shape { sub, userType } Claims', () => {
      const mockOrder = createMockOrder({ customerEmail: 'customer@example.com', sellerId: 1 });
      const mockSellerOrder = toSellerOrder(mockOrder);
      const mockSellerInfo = createMockSellerInfo({ id: 1, user: { id: 's-user' } as any });

      beforeEach(() => {
        mockOrderService.findOne.mockResolvedValue(mockOrder);
        mockSellerService.findOneByUserId.mockResolvedValue(mockSellerInfo);
      });

      it('allows SELLER with { sub, userType: "seller" } owning order to receive redacted SellerOrder', async () => {
        const user = { sub: 's-user', userType: 'seller' } as any;
        const result = await resolver.order(user, 'order-1');

        expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('s-user');
        expect(result).toEqual(mockSellerOrder);
        expect((result as any).customerEmail).toBeUndefined();
        expect((result as any).customerPhone).toBeUndefined();
        expect((result as any).customerName).toBeUndefined();
        expect((result as any).shippingAddress).toBeUndefined();
      });

      it('throws ForbiddenException for non-owner SELLER with { sub, userType: "seller" }', async () => {
        const user = { sub: 'other-s-user', userType: 'seller' } as any;
        const otherSellerInfo = createMockSellerInfo({ id: 999, user: { id: 'other-s-user' } as any });
        mockSellerService.findOneByUserId.mockResolvedValue(otherSellerInfo);

        await expect(resolver.order(user, 'order-1')).rejects.toThrow(ForbiddenException);
        await expect(resolver.order(user, 'order-1')).rejects.toThrow('You do not have permission to view this order');
      });

      it('allows CUSTOMER with { sub, userType: "customer", email } to read own order', async () => {
        const user = { sub: 'c-user', userType: 'customer', email: 'customer@example.com' } as any;
        const result = await resolver.order(user, 'order-1');

        expect(result).toEqual(mockOrder);
      });

      it('throws ForbiddenException for CUSTOMER with { sub, userType: "customer" } reading another customer order', async () => {
        const user = { sub: 'other-c-user', userType: 'customer', email: 'other@example.com' } as any;
        await expect(resolver.order(user, 'order-1')).rejects.toThrow(ForbiddenException);
        await expect(resolver.order(user, 'order-1')).rejects.toThrow('You do not have permission to view this order');
      });

      it('allows ADMIN with { sub, userType: "admin" } to read any order', async () => {
        const user = { sub: 'a-user', userType: 'admin' } as any;
        const result = await resolver.order(user, 'order-1');

        expect(result).toEqual(mockOrder);
      });
    });
  });

  describe('updateOrderStatus mutation', () => {
    const mockOrder = createMockOrder({ sellerId: 1 });
    const updatedOrder = createMockOrder({ status: OrderStatus.CONFIRMED });
    const updatedSellerOrder = toSellerOrder(updatedOrder);
    const mockSellerInfo = createMockSellerInfo({ id: 1, user: { id: 'seller-user-1' } as any });

    beforeEach(() => {
      mockOrderService.findOne.mockResolvedValue(mockOrder);
      mockOrderService.updateOrderStatus.mockResolvedValue(updatedOrder);
      mockSellerService.findOneByUserId.mockResolvedValue(mockSellerInfo);
    });

    it('rejects CUSTOMER with ForbiddenException', async () => {
      const user = createMockUser({ role: UserRole.CUSTOMER });
      await expect(
        resolver.updateOrderStatus(user, { id: 'order-1', status: OrderStatus.CONFIRMED })
      ).rejects.toThrow(ForbiddenException);
      await expect(
        resolver.updateOrderStatus(user, { id: 'order-1', status: OrderStatus.CONFIRMED })
      ).rejects.toThrow('Customers are not allowed to update order status');
    });

    it('rejects SELLER trying to update another seller order', async () => {
      const user = createMockSellerUser({ id: 'other-seller-user' });
      const otherSellerInfo = createMockSellerInfo({ id: 999, user: { id: 'other-seller-user' } as any });
      mockSellerService.findOneByUserId.mockResolvedValue(otherSellerInfo);

      await expect(
        resolver.updateOrderStatus(user, { id: 'order-1', status: OrderStatus.CONFIRMED })
      ).rejects.toThrow(ForbiddenException);
      await expect(
        resolver.updateOrderStatus(user, { id: 'order-1', status: OrderStatus.CONFIRMED })
      ).rejects.toThrow('You can only update status for your own seller orders');
    });

    it('rejects SELLER with no seller profile', async () => {
      const user = createMockSellerUser({ id: 'seller-user-1' });
      mockSellerService.findOneByUserId.mockResolvedValue(null);

      await expect(
        resolver.updateOrderStatus(user, { id: 'order-1', status: OrderStatus.CONFIRMED })
      ).rejects.toThrow(ForbiddenException);
    });

    it('allows SELLER to update own order and returns redacted SellerOrder', async () => {
      const user = createMockSellerUser({ id: 'seller-user-1' });
      const result = await resolver.updateOrderStatus(user, {
        id: 'order-1',
        status: OrderStatus.CONFIRMED,
      });

      expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('seller-user-1');
      expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith('order-1', OrderStatus.CONFIRMED);
      expect(result).toEqual(updatedSellerOrder);
      // Verify customer PII is not present
      expect((result as any).customerEmail).toBeUndefined();
    });

    it('allows ADMIN to update any order and returns full Order', async () => {
      const user = createMockAdminUser();
      const result = await resolver.updateOrderStatus(user, {
        id: 'order-1',
        status: OrderStatus.SHIPPED,
      });

      expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith('order-1', OrderStatus.SHIPPED);
      expect(result).toEqual(updatedOrder);
    });

    it('rejects UNKNOWN role', async () => {
      const user = { id: 'user-1', userType: 'INVALID' };
      await expect(
        resolver.updateOrderStatus(user, { id: 'order-1', status: OrderStatus.CONFIRMED })
      ).rejects.toThrow(ForbiddenException);
    });

    describe('JWT Shape { sub, userType } Claims', () => {
      const mockOrder = createMockOrder({ sellerId: 1 });
      const updatedOrder = createMockOrder({ status: OrderStatus.CONFIRMED });
      const updatedSellerOrder = toSellerOrder(updatedOrder);
      const mockSellerInfo = createMockSellerInfo({ id: 1, user: { id: 's-user' } as any });

      beforeEach(() => {
        mockOrderService.findOne.mockResolvedValue(mockOrder);
        mockOrderService.updateOrderStatus.mockResolvedValue(updatedOrder);
        mockSellerService.findOneByUserId.mockResolvedValue(mockSellerInfo);
      });

      it('allows SELLER with { sub, userType: "seller" } owning order to update status and receive redacted SellerOrder', async () => {
        const user = { sub: 's-user', userType: 'seller' } as any;
        const result = await resolver.updateOrderStatus(user, {
          id: 'order-1',
          status: OrderStatus.CONFIRMED,
        });

        expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('s-user');
        expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith('order-1', OrderStatus.CONFIRMED);
        expect(result).toEqual(updatedSellerOrder);
        expect((result as any).customerEmail).toBeUndefined();
      });

      it('allows ADMIN with { sub, userType: "admin" } to update any order and receive full Order', async () => {
        const user = { sub: 'a-user', userType: 'admin' } as any;
        const result = await resolver.updateOrderStatus(user, {
          id: 'order-1',
          status: OrderStatus.SHIPPED,
        });

        expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith('order-1', OrderStatus.SHIPPED);
        expect(result).toEqual(updatedOrder);
        expect((result as any).customerEmail).toBeDefined();
      });

      it('throws ForbiddenException for SELLER with { sub, userType: "seller" } not owning order', async () => {
        const user = { sub: 'other-s-user', userType: 'seller' } as any;
        const otherSellerInfo = createMockSellerInfo({ id: 999, user: { id: 'other-s-user' } as any });
        mockSellerService.findOneByUserId.mockResolvedValue(otherSellerInfo);

        await expect(
          resolver.updateOrderStatus(user, { id: 'order-1', status: OrderStatus.CONFIRMED })
        ).rejects.toThrow(ForbiddenException);
        await expect(
          resolver.updateOrderStatus(user, { id: 'order-1', status: OrderStatus.CONFIRMED })
        ).rejects.toThrow('You can only update status for your own seller orders');
      });

      it('throws ForbiddenException for CUSTOMER with { sub, userType: "customer" }', async () => {
        const user = { sub: 'c-user', userType: 'customer' } as any;
        await expect(
          resolver.updateOrderStatus(user, { id: 'order-1', status: OrderStatus.CONFIRMED })
        ).rejects.toThrow(ForbiddenException);
        await expect(
          resolver.updateOrderStatus(user, { id: 'order-1', status: OrderStatus.CONFIRMED })
        ).rejects.toThrow('Customers are not allowed to update order status');
      });
    });
  });

  describe('cancelPendingOrder mutation', () => {
    const mockOrder = createMockOrder({ customerEmail: 'customer@example.com', sellerId: 1 });
    const mockSellerInfo = createMockSellerInfo({ id: 1, user: { id: 'seller-user-1' } as any });

    beforeEach(() => {
      mockOrderService.findOne.mockResolvedValue(mockOrder);
      mockOrderService.cancelPendingOrder.mockResolvedValue(true);
      mockSellerService.findOneByUserId.mockResolvedValue(mockSellerInfo);
    });

    describe('CUSTOMER role', () => {
      it('allows CUSTOMER to cancel own PENDING order', async () => {
        const user = createMockUser({ email: 'customer@example.com' });
        const result = await resolver.cancelPendingOrder(user, 'order-1');

        expect(mockOrderService.cancelPendingOrder).toHaveBeenCalledWith('order-1');
        expect(result).toBe(true);
      });

      it('throws ForbiddenException when CUSTOMER tries to cancel another customer order', async () => {
        const user = createMockUser({ email: 'other@example.com' });
        await expect(resolver.cancelPendingOrder(user, 'order-1')).rejects.toThrow(
          ForbiddenException
        );
        await expect(resolver.cancelPendingOrder(user, 'order-1')).rejects.toThrow(
          'You do not have permission to cancel this order'
        );
      });

      it('throws BadRequestException when CUSTOMER tries to cancel CONFIRMED order', async () => {
        const confirmedOrder = createMockOrder({ status: OrderStatus.CONFIRMED, customerEmail: 'customer@example.com' });
        mockOrderService.findOne.mockResolvedValue(confirmedOrder);

        const user = createMockUser({ email: 'customer@example.com' });
        await expect(resolver.cancelPendingOrder(user, 'order-1')).rejects.toThrow(
          BadRequestException
        );
        await expect(resolver.cancelPendingOrder(user, 'order-1')).rejects.toThrow(
          'Only pending orders can be cancelled'
        );
      });
    });

    describe('SELLER role', () => {
      it('allows SELLER to cancel own PENDING order', async () => {
        const user = createMockSellerUser({ id: 'seller-user-1' });
        const result = await resolver.cancelPendingOrder(user, 'order-1');

        expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('seller-user-1');
        expect(mockOrderService.cancelPendingOrder).toHaveBeenCalledWith('order-1');
        expect(result).toBe(true);
      });

      it('throws ForbiddenException when SELLER tries to cancel another seller order', async () => {
        const user = createMockSellerUser({ id: 'other-seller-user' });
        const otherSellerInfo = createMockSellerInfo({ id: 999, user: { id: 'other-seller-user' } as any });
        mockSellerService.findOneByUserId.mockResolvedValue(otherSellerInfo);

        await expect(resolver.cancelPendingOrder(user, 'order-1')).rejects.toThrow(
          ForbiddenException
        );
      });

      it('throws ForbiddenException when SELLER has no seller profile', async () => {
        const user = createMockSellerUser({ id: 'seller-user-1' });
        mockSellerService.findOneByUserId.mockResolvedValue(null);

        await expect(resolver.cancelPendingOrder(user, 'order-1')).rejects.toThrow(
          ForbiddenException
        );
      });
    });

    describe('ADMIN role', () => {
      it('allows ADMIN to cancel any PENDING order', async () => {
        const user = createMockAdminUser();
        const result = await resolver.cancelPendingOrder(user, 'order-1');

        expect(mockOrderService.cancelPendingOrder).toHaveBeenCalledWith('order-1');
        expect(result).toBe(true);
      });
    });

    describe('JWT Shape { sub, userType } Claims', () => {
      const mockOrder = createMockOrder({ customerEmail: 'buyer@example.com', sellerId: 1 });
      const mockSellerInfo = createMockSellerInfo({ id: 1, user: { id: 's-user' } as any });

      beforeEach(() => {
        mockOrderService.findOne.mockResolvedValue(mockOrder);
        mockOrderService.cancelPendingOrder.mockResolvedValue(true);
        mockSellerService.findOneByUserId.mockResolvedValue(mockSellerInfo);
      });

      it('allows SELLER with { sub, userType: "seller" } owning PENDING order to cancel', async () => {
        const user = { sub: 's-user', userType: 'seller' } as any;
        const result = await resolver.cancelPendingOrder(user, 'order-1');

        expect(mockSellerService.findOneByUserId).toHaveBeenCalledWith('s-user');
        expect(mockOrderService.cancelPendingOrder).toHaveBeenCalledWith('order-1');
        expect(result).toBe(true);
      });

      it('allows CUSTOMER with { sub, userType: "customer", email } to cancel own PENDING order', async () => {
        const user = { sub: 'c-user', userType: 'customer', email: 'buyer@example.com' } as any;
        const result = await resolver.cancelPendingOrder(user, 'order-1');

        expect(mockOrderService.cancelPendingOrder).toHaveBeenCalledWith('order-1');
        expect(result).toBe(true);
      });

      it('throws BadRequestException for non-PENDING order (CONFIRMED) for SELLER', async () => {
        const confirmedOrder = createMockOrder({ status: OrderStatus.CONFIRMED, sellerId: 1 });
        mockOrderService.findOne.mockResolvedValue(confirmedOrder);

        const user = { sub: 's-user', userType: 'seller' } as any;
        await expect(resolver.cancelPendingOrder(user, 'order-1')).rejects.toThrow(BadRequestException);
        await expect(resolver.cancelPendingOrder(user, 'order-1')).rejects.toThrow('Only pending orders can be cancelled');
      });

      it('throws BadRequestException for non-PENDING order (CONFIRMED) for CUSTOMER', async () => {
        const confirmedOrder = createMockOrder({ status: OrderStatus.CONFIRMED, customerEmail: 'buyer@example.com' });
        mockOrderService.findOne.mockResolvedValue(confirmedOrder);

        const user = { sub: 'c-user', userType: 'customer', email: 'buyer@example.com' } as any;
        await expect(resolver.cancelPendingOrder(user, 'order-1')).rejects.toThrow(BadRequestException);
        await expect(resolver.cancelPendingOrder(user, 'order-1')).rejects.toThrow('Only pending orders can be cancelled');
      });

      it('throws ForbiddenException for SELLER with { sub, userType: "seller" } not owning order', async () => {
        const user = { sub: 'other-s-user', userType: 'seller' } as any;
        const otherSellerInfo = createMockSellerInfo({ id: 999, user: { id: 'other-s-user' } as any });
        mockSellerService.findOneByUserId.mockResolvedValue(otherSellerInfo);

        await expect(resolver.cancelPendingOrder(user, 'order-1')).rejects.toThrow(ForbiddenException);
      });

      it('throws ForbiddenException for CUSTOMER with { sub, userType: "customer" } not owning order', async () => {
        const user = { sub: 'other-c-user', userType: 'customer', email: 'other@example.com' } as any;
        await expect(resolver.cancelPendingOrder(user, 'order-1')).rejects.toThrow(ForbiddenException);
        await expect(resolver.cancelPendingOrder(user, 'order-1')).rejects.toThrow('You do not have permission to cancel this order');
      });
    });
  });

  describe('updateOrder mutation', () => {
    const mockOrder = createMockOrder();
    const updateInput = {
      customerName: 'Jane Doe',
      notes: 'Updated notes',
    };

    beforeEach(() => {
      mockOrderService.findOne.mockResolvedValue(mockOrder);
      mockOrderService.updateOrder.mockResolvedValue({ ...mockOrder, ...updateInput });
    });

    it('rejects CUSTOMER with ForbiddenException', async () => {
      const user = createMockUser({ role: UserRole.CUSTOMER });
      await expect(
        resolver.updateOrder(user, 'order-1', updateInput as any)
      ).rejects.toThrow(ForbiddenException);
    });

    it('rejects SELLER with ForbiddenException', async () => {
      const user = createMockSellerUser();
      await expect(
        resolver.updateOrder(user, 'order-1', updateInput as any)
      ).rejects.toThrow(ForbiddenException);
    });

    it('allows ADMIN to update order (non-financial fields)', async () => {
      const user = createMockAdminUser();
      const result = await resolver.updateOrder(user, 'order-1', updateInput as any);

      expect(mockOrderService.updateOrder).toHaveBeenCalledWith('order-1', updateInput);
      expect(result.customerName).toBe('Jane Doe');
    });

    it('throws BadRequestException when ADMIN tries to update items', async () => {
      const user = createMockAdminUser();
      const inputWithItems = {
        ...updateInput,
        items: [{ productId: 'prod-1', quantity: 1, unitPrice: 50, totalPrice: 50 }],
      };

      await expect(
        resolver.updateOrder(user, 'order-1', inputWithItems as any)
      ).rejects.toThrow(BadRequestException);
      await expect(
        resolver.updateOrder(user, 'order-1', inputWithItems as any)
      ).rejects.toThrow('Order items and financial totals cannot be rewritten after order creation');
    });

    it('throws BadRequestException when ADMIN tries to update CONFIRMED order', async () => {
      const confirmedOrder = createMockOrder({ status: OrderStatus.CONFIRMED });
      mockOrderService.findOne.mockResolvedValue(confirmedOrder);

      const user = createMockAdminUser();
      await expect(
        resolver.updateOrder(user, 'order-1', updateInput as any)
      ).rejects.toThrow(BadRequestException);
      await expect(
        resolver.updateOrder(user, 'order-1', updateInput as any)
      ).rejects.toThrow('Order items and financial totals cannot be rewritten after order creation');
    });
  });

  describe('deleteOrder mutation', () => {
    beforeEach(() => {
      mockOrderService.deleteOrder.mockResolvedValue(undefined);
      mockOrderService.updateOrderStatus.mockResolvedValue(undefined);
    });

    it('rejects CUSTOMER with ForbiddenException', async () => {
      const user = createMockUser({ role: UserRole.CUSTOMER });
      await expect(resolver.deleteOrder(user, 'order-1')).rejects.toThrow(ForbiddenException);
    });

    it('rejects SELLER with ForbiddenException', async () => {
      const user = createMockSellerUser();
      await expect(resolver.deleteOrder(user, 'order-1')).rejects.toThrow(ForbiddenException);
    });

    it('allows ADMIN to delete PENDING order directly', async () => {
      const pendingOrder = createMockOrder({ status: OrderStatus.PENDING });
      mockOrderService.findOne.mockResolvedValue(pendingOrder);

      const user = createMockAdminUser();
      const result = await resolver.deleteOrder(user, 'order-1');

      expect(mockOrderService.findOne).toHaveBeenCalledWith('order-1');
      expect(mockOrderService.updateOrderStatus).not.toHaveBeenCalled();
      expect(mockOrderService.deleteOrder).toHaveBeenCalledWith('order-1');
      expect(result).toBe(true);
    });

    it('allows ADMIN to delete CANCELLED order directly', async () => {
      const cancelledOrder = createMockOrder({ status: OrderStatus.CANCELLED });
      mockOrderService.findOne.mockResolvedValue(cancelledOrder);

      const user = createMockAdminUser();
      await resolver.deleteOrder(user, 'order-1');

      expect(mockOrderService.updateOrderStatus).not.toHaveBeenCalled();
      expect(mockOrderService.deleteOrder).toHaveBeenCalledWith('order-1');
    });

    it('cancels CONFIRMED order before deletion to restore stock', async () => {
      const confirmedOrder = createMockOrder({ status: OrderStatus.CONFIRMED });
      mockOrderService.findOne.mockResolvedValue(confirmedOrder);

      const user = createMockAdminUser();
      await resolver.deleteOrder(user, 'order-1');

      expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith('order-1', OrderStatus.CANCELLED);
      expect(mockOrderService.deleteOrder).toHaveBeenCalledWith('order-1');
    });

    it('cancels PROCESSING order before deletion to restore stock', async () => {
      const processingOrder = createMockOrder({ status: OrderStatus.PROCESSING });
      mockOrderService.findOne.mockResolvedValue(processingOrder);

      const user = createMockAdminUser();
      await resolver.deleteOrder(user, 'order-1');

      expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith('order-1', OrderStatus.CANCELLED);
      expect(mockOrderService.deleteOrder).toHaveBeenCalledWith('order-1');
    });

    it('cancels SHIPPED order before deletion to restore stock', async () => {
      const shippedOrder = createMockOrder({ status: OrderStatus.SHIPPED });
      mockOrderService.findOne.mockResolvedValue(shippedOrder);

      const user = createMockAdminUser();
      await resolver.deleteOrder(user, 'order-1');

      expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith('order-1', OrderStatus.CANCELLED);
      expect(mockOrderService.deleteOrder).toHaveBeenCalledWith('order-1');
    });

    it('cancels order with stockReserved flag before deletion', async () => {
      const orderWithReservedStock = createMockOrder({ status: OrderStatus.PENDING });
      (orderWithReservedStock as any).stockReserved = true;
      mockOrderService.findOne.mockResolvedValue(orderWithReservedStock);

      const user = createMockAdminUser();
      await resolver.deleteOrder(user, 'order-1');

      expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith('order-1', OrderStatus.CANCELLED);
      expect(mockOrderService.deleteOrder).toHaveBeenCalledWith('order-1');
    });

    describe('Stock Restoration Guard - Call Order Verification', () => {
      const verifyCallOrder = async (order: Order) => {
        mockOrderService.findOne.mockResolvedValue(order);
        mockOrderService.updateOrderStatus.mockResolvedValue(undefined);
        mockOrderService.deleteOrder.mockResolvedValue(undefined);

        const user = createMockAdminUser();
        await resolver.deleteOrder(user, 'order-1');

        const updateCalls = mockOrderService.updateOrderStatus.mock.invocationCallOrder;
        const deleteCalls = mockOrderService.deleteOrder.mock.invocationCallOrder;

        expect(updateCalls).toBeDefined();
        expect(deleteCalls).toBeDefined();
        expect(updateCalls[0]).toBeLessThan(deleteCalls[0]);
        expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith('order-1', OrderStatus.CANCELLED);
        expect(mockOrderService.deleteOrder).toHaveBeenCalledWith('order-1');
      };

      it('calls updateOrderStatus BEFORE deleteOrder for CONFIRMED order', async () => {
        await verifyCallOrder(createMockOrder({ status: OrderStatus.CONFIRMED }));
      });

      it('calls updateOrderStatus BEFORE deleteOrder for PROCESSING order', async () => {
        await verifyCallOrder(createMockOrder({ status: OrderStatus.PROCESSING }));
      });

      it('calls updateOrderStatus BEFORE deleteOrder for SHIPPED order', async () => {
        await verifyCallOrder(createMockOrder({ status: OrderStatus.SHIPPED }));
      });

      it('calls updateOrderStatus BEFORE deleteOrder for PENDING order with stockReserved=true', async () => {
        const order = createMockOrder({ status: OrderStatus.PENDING });
        (order as any).stockReserved = true;
        await verifyCallOrder(order);
      });

      it('does NOT call updateOrderStatus for PENDING order with stockReserved=false', async () => {
        const order = createMockOrder({ status: OrderStatus.PENDING });
        (order as any).stockReserved = false;
        mockOrderService.findOne.mockResolvedValue(order);
        mockOrderService.deleteOrder.mockResolvedValue(undefined);

        const user = createMockAdminUser();
        await resolver.deleteOrder(user, 'order-1');

        expect(mockOrderService.updateOrderStatus).not.toHaveBeenCalled();
        expect(mockOrderService.deleteOrder).toHaveBeenCalledWith('order-1');
      });

      it('does NOT call updateOrderStatus for PENDING order with stockReserved=undefined', async () => {
        const order = createMockOrder({ status: OrderStatus.PENDING });
        (order as any).stockReserved = undefined;
        mockOrderService.findOne.mockResolvedValue(order);
        mockOrderService.deleteOrder.mockResolvedValue(undefined);

        const user = createMockAdminUser();
        await resolver.deleteOrder(user, 'order-1');

        expect(mockOrderService.updateOrderStatus).not.toHaveBeenCalled();
        expect(mockOrderService.deleteOrder).toHaveBeenCalledWith('order-1');
      });

      it('does NOT call updateOrderStatus for DELIVERED order', async () => {
        const order = createMockOrder({ status: OrderStatus.DELIVERED });
        (order as any).stockReserved = false;
        mockOrderService.findOne.mockResolvedValue(order);
        mockOrderService.deleteOrder.mockResolvedValue(undefined);

        const user = createMockAdminUser();
        await resolver.deleteOrder(user, 'order-1');

        expect(mockOrderService.updateOrderStatus).not.toHaveBeenCalled();
        expect(mockOrderService.deleteOrder).toHaveBeenCalledWith('order-1');
      });
    });
  });

  describe('getUserId helper', () => {
    it('extracts id from user.id', () => {
      const user = { id: 'user-123' };
      expect((resolver as any).getUserId(user)).toBe('user-123');
    });

    it('extracts id from user.sub when id is missing', () => {
      const user = { sub: 'sub-456' };
      expect((resolver as any).getUserId(user)).toBe('sub-456');
    });

    it('returns empty string when both id and sub are missing', () => {
      const user = {};
      expect((resolver as any).getUserId(user)).toBe('');
    });
  });

  describe('getUserRole helper', () => {
    it('returns ADMIN for role ADMIN', () => {
      expect((resolver as any).getUserRole({ role: UserRole.ADMIN })).toBe('ADMIN');
    });

    it('returns SELLER for role SELLER', () => {
      expect((resolver as any).getUserRole({ role: UserRole.SELLER })).toBe('SELLER');
    });

    it('returns CUSTOMER for role CUSTOMER', () => {
      expect((resolver as any).getUserRole({ role: UserRole.CUSTOMER })).toBe('CUSTOMER');
    });

    it('normalizes lowercase role', () => {
      expect((resolver as any).getUserRole({ role: 'admin' })).toBe('ADMIN');
      expect((resolver as any).getUserRole({ role: 'seller' })).toBe('SELLER');
      expect((resolver as any).getUserRole({ role: 'customer' })).toBe('CUSTOMER');
    });

    it('uses userType when role is missing', () => {
      expect((resolver as any).getUserRole({ userType: 'ADMIN' })).toBe('ADMIN');
      expect((resolver as any).getUserRole({ userType: 'seller' })).toBe('SELLER');
    });

    it('returns UNKNOWN for invalid role', () => {
      expect((resolver as any).getUserRole({ role: 'INVALID' })).toBe('UNKNOWN');
      expect((resolver as any).getUserRole({})).toBe('UNKNOWN');
    });
  });

  describe('assertAdmin helper', () => {
    it('does not throw for ADMIN', () => {
      const user = createMockAdminUser();
      expect(() => (resolver as any).assertAdmin(user)).not.toThrow();
    });

    it('throws ForbiddenException for SELLER', () => {
      const user = createMockSellerUser();
      expect(() => (resolver as any).assertAdmin(user)).toThrow(ForbiddenException);
    });

    it('throws ForbiddenException for CUSTOMER', () => {
      const user = createMockUser({ role: UserRole.CUSTOMER });
      expect(() => (resolver as any).assertAdmin(user)).toThrow(ForbiddenException);
    });

    it('throws ForbiddenException for UNKNOWN', () => {
      const user = { role: 'INVALID' };
      expect(() => (resolver as any).assertAdmin(user)).toThrow(ForbiddenException);
    });
  });
});