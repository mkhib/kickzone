import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  Order,
  OrderItem,
  OrderStatus,
  SellerProduct,
  SellerInfo,
} from '@kickzone-workspace/entities';
import { CreateOrderInput, UpdateOrderInput } from '@kickzone-workspace/inputs';

describe('OrderService - updateTrackingNumber', () => {
  let service: OrderService;
  let orderRepository: jest.Mocked<Repository<Order>>;
  let orderItemRepository: jest.Mocked<Repository<OrderItem>>;
  let sellerProductRepository: jest.Mocked<Repository<SellerProduct>>;
  let sellerInfoRepository: jest.Mocked<Repository<SellerInfo>>;
  let dataSource: { transaction: jest.Mock };
  let mockTransactionManager: {
    getRepository: jest.Mock;
    findOne: jest.Mock;
    save: jest.Mock;
    remove: jest.Mock;
  };

  const mockOrderRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
    count: jest.fn(),
    find: jest.fn(),
  };

  const mockOrderItemRepository = {
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockSellerProductRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockSellerInfoRepository = {
    findOne: jest.fn(),
  };

  const mockQueryBuilder = {
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
    getCount: jest.fn(),
  };

  beforeEach(async () => {
    mockTransactionManager = {
      getRepository: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    dataSource = {
      transaction: jest.fn((fn) => fn(mockTransactionManager)),
    };

    mockTransactionManager.getRepository.mockImplementation((entity: any) => {
      if (entity === Order) return orderRepository;
      if (entity === SellerProduct) return sellerProductRepository;
      return mockOrderRepository;
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
        {
          provide: getRepositoryToken(OrderItem),
          useValue: mockOrderItemRepository,
        },
        {
          provide: getRepositoryToken(SellerProduct),
          useValue: mockSellerProductRepository,
        },
        {
          provide: getRepositoryToken(SellerInfo),
          useValue: mockSellerInfoRepository,
        },
        {
          provide: dataSource.constructor,
          useValue: dataSource,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get(getRepositoryToken(Order));
    orderItemRepository = module.get(getRepositoryToken(OrderItem));
    sellerProductRepository = module.get(getRepositoryToken(SellerProduct));
    sellerInfoRepository = module.get(getRepositoryToken(SellerInfo));

    orderRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(mockQueryBuilder);

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateTrackingNumber', () => {
    const orderId = 'order-1';
    const existingOrder: Order = {
      id: orderId,
      orderNumber: 'ORD-123',
      subtotal: 100,
      shippingCost: 10,
      total: 110,
      stockReserved: false,
      items: [],
      status: OrderStatus.CONFIRMED,
      seller: {} as SellerInfo,
      customerEmail: 'test@example.com',
      customerPhone: '1234567890',
      customerName: 'Test User',
      shippingAddress: '123 Test St',
      city: 'Test City',
      state: 'Test State',
      zipCode: '12345',
      country: 'Test Country',
      sellerId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      trackingNumber: '',
    } as Order;

    it('should update tracking number and trim whitespace', async () => {
      const updatedOrder = { ...existingOrder, trackingNumber: 'TRK123' };
      orderRepository.findOne.mockResolvedValue(existingOrder);
      orderRepository.save.mockResolvedValue(updatedOrder);

      const result = await service.updateTrackingNumber(orderId, '  TRK123  ');

      expect(orderRepository.findOne).toHaveBeenCalledWith({
        where: { id: orderId },
        relations: ['items', 'seller'],
      });
      expect(orderRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ trackingNumber: 'TRK123' })
      );
      expect(result.trackingNumber).toBe('TRK123');
    });

    it('should only change trackingNumber field (status unchanged)', async () => {
      const updatedOrder = { ...existingOrder, trackingNumber: 'TRK123' };
      orderRepository.findOne.mockResolvedValue(existingOrder);
      orderRepository.save.mockResolvedValue(updatedOrder);

      const result = await service.updateTrackingNumber(orderId, 'TRK123');

      expect(result.status).toBe(OrderStatus.CONFIRMED);
      expect(result.subtotal).toBe(100);
      expect(result.shippingCost).toBe(10);
      expect(result.total).toBe(110);
      expect(result.trackingNumber).toBe('TRK123');
    });

    it('should only change trackingNumber field (items unchanged)', async () => {
      const items: OrderItem[] = [
        {
          id: 'item-1',
          orderId: orderId,
          productId: 'prod-1',
          sellerProductId: 'sp-1',
          productName: 'Product 1',
          quantity: 2,
          unitPrice: 50,
          totalPrice: 100,
        } as OrderItem,
      ];
      const orderWithItems = { ...existingOrder, items };
      const updatedOrder = { ...orderWithItems, trackingNumber: 'TRK123', items };
      orderRepository.findOne.mockResolvedValue(orderWithItems);
      orderRepository.save.mockResolvedValue(updatedOrder);

      const result = await service.updateTrackingNumber(orderId, 'TRK123');

      expect(result.items).toHaveLength(1);
      expect(result.items[0].productId).toBe('prod-1');
      expect(result.items[0].quantity).toBe(2);
    });

    it('should trim tracking number before saving', async () => {
      const updatedOrder = { ...existingOrder, trackingNumber: 'TRK123' };
      orderRepository.findOne.mockResolvedValue(existingOrder);
      orderRepository.save.mockResolvedValue(updatedOrder);

      await service.updateTrackingNumber(orderId, '  TRK123  ');

      const savedOrder = orderRepository.save.mock.calls[0][0] as Order;
      expect(savedOrder.trackingNumber).toBe('TRK123');
    });

    it('should throw NotFoundException if order does not exist', async () => {
      orderRepository.findOne.mockResolvedValue(null);

      await expect(service.updateTrackingNumber('non-existent', 'TRK123')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.updateTrackingNumber('non-existent', 'TRK123')).rejects.toThrow(
        `Order with ID non-existent not found`,
      );
      expect(orderRepository.save).not.toHaveBeenCalled();
    });

    it('should accept tracking number with whitespace (validation done in resolver)', async () => {
      // Service does not validate length/whitespace - that's done in resolver
      // Service just trims and saves
      const updatedOrder = { ...existingOrder, trackingNumber: 'TRK123' };
      orderRepository.findOne.mockResolvedValue(existingOrder);
      orderRepository.save.mockResolvedValue(updatedOrder);

      const result = await service.updateTrackingNumber(orderId, '  TRK123  ');

      expect(result.trackingNumber).toBe('TRK123');
    });

    it('should preserve all other order fields unchanged', async () => {
      const updatedOrder = { ...existingOrder, trackingNumber: 'NEW-TRK' };
      orderRepository.findOne.mockResolvedValue(existingOrder);
      orderRepository.save.mockResolvedValue(updatedOrder);

      const result = await service.updateTrackingNumber(orderId, 'NEW-TRK');

      // Verify all original fields are preserved
      expect(result.id).toBe(existingOrder.id);
      expect(result.orderNumber).toBe(existingOrder.orderNumber);
      expect(result.customerEmail).toBe(existingOrder.customerEmail);
      expect(result.customerPhone).toBe(existingOrder.customerPhone);
      expect(result.customerName).toBe(existingOrder.customerName);
      expect(result.shippingAddress).toBe(existingOrder.shippingAddress);
      expect(result.city).toBe(existingOrder.city);
      expect(result.state).toBe(existingOrder.state);
      expect(result.zipCode).toBe(existingOrder.zipCode);
      expect(result.country).toBe(existingOrder.country);
      expect(result.sellerId).toBe(existingOrder.sellerId);
      expect(result.subtotal).toBe(existingOrder.subtotal);
      expect(result.shippingCost).toBe(existingOrder.shippingCost);
      expect(result.total).toBe(existingOrder.total);
      expect(result.status).toBe(existingOrder.status);
      expect(result.stockReserved).toBe(existingOrder.stockReserved);
      expect(result.paymentAmount).toBe(existingOrder.paymentAmount);
      expect(result.paymentCurrency).toBe(existingOrder.paymentCurrency);
      expect(result.paymentAuthority).toBe(existingOrder.paymentAuthority);
      expect(result.sellerStoreName).toBe(existingOrder.sellerStoreName);
      expect(result.sellerPhone).toBe(existingOrder.sellerPhone);
      expect(result.sellerAddress).toBe(existingOrder.sellerAddress);
      expect(result.notes).toBe(existingOrder.notes);
      expect(result.createdAt).toEqual(existingOrder.createdAt);
      // updatedAt may be updated by the database
    });
  });
});