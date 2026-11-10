import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  Order,
  OrderItem,
  OrderStatus,
  SellerProduct,
  SellerInfo,
} from '@kickzone-workspace/entities';

describe('OrderService - Payment Verification Security (E2E P4b)', () => {
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
    findBy: jest.fn(),
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

    mockTransactionManager.getRepository.mockImplementation((entity: unknown) => {
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
          provide: DataSource,
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

  describe('confirmOrderPayment - Payment Verification & Idempotency', () => {
    const orderId = 'order-1';
    const originalPaymentVerifiedAt = new Date('2026-01-01T00:00:00.000Z');

    const mockOrderItems: OrderItem[] = [
      {
        id: 'item-1',
        productId: 'product-1',
        sellerProductId: 'sp-b',
        productName: 'Test Product B',
        quantity: 2,
      } as OrderItem,
      {
        id: 'item-2',
        productId: 'product-2',
        sellerProductId: 'sp-a',
        productName: 'Test Product A',
        quantity: 1,
      } as OrderItem,
    ];

    const mockSellerProductA: SellerProduct = {
      id: 'sp-a',
      stockQuantity: 100,
    } as SellerProduct;

    const mockSellerProductB: SellerProduct = {
      id: 'sp-b',
      stockQuantity: 100,
    } as SellerProduct;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('First confirmation sets paymentVerifiedAt, stockReserved=true, status=CONFIRMED; locks Order and SellerProducts in sorted ASC id order', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: mockOrderItems,
        paymentVerifiedAt: undefined,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      // decreaseStock does 2 passes: check stock (findOne x2), then decrement (findOne x2 + save x2)
      // Sorted order: sp-a, sp-b
      const now = new Date();
      sellerProductRepository.findOne
        .mockResolvedValueOnce(mockSellerProductA) // check sp-a
        .mockResolvedValueOnce(mockSellerProductB) // check sp-b
        .mockResolvedValueOnce(mockSellerProductA) // decrement sp-a
        .mockResolvedValueOnce(mockSellerProductB); // decrement sp-b
      sellerProductRepository.save
        .mockResolvedValueOnce({ ...mockSellerProductA, stockQuantity: 99 } as SellerProduct)
        .mockResolvedValueOnce({ ...mockSellerProductB, stockQuantity: 98 } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
        paymentVerifiedAt: now,
      } as Order);

      const result = await service.confirmOrderPayment(orderId);

      expect(orderRepository.findOne).toHaveBeenCalledWith({
        where: { id: orderId },
        relations: ['items'],
        lock: { mode: 'pessimistic_write' },
      });

      const findOneCalls = sellerProductRepository.findOne.mock.calls;
      // First two calls are for stock check (sorted: sp-a, sp-b)
      const firstCallWhere = findOneCalls[0][0].where as { id: string };
      const secondCallWhere = findOneCalls[1][0].where as { id: string };
      expect(firstCallWhere.id).toBe('sp-a');
      expect(findOneCalls[0][0].lock).toEqual({ mode: 'pessimistic_write' });
      expect(secondCallWhere.id).toBe('sp-b');
      expect(findOneCalls[1][0].lock).toEqual({ mode: 'pessimistic_write' });

      expect(sellerProductRepository.save).toHaveBeenCalledTimes(2);
      expect(sellerProductRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'sp-a', stockQuantity: 99 }),
      );
      expect(sellerProductRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'sp-b', stockQuantity: 98 }),
      );

      const savedOrderArg = orderRepository.save.mock.calls[0][0] as Order;
      expect(savedOrderArg.status).toBe(OrderStatus.CONFIRMED);
      expect(savedOrderArg.stockReserved).toBe(true);
      expect(savedOrderArg.paymentVerifiedAt).toBeInstanceOf(Date);
      expect(result.paymentVerifiedAt).toBeInstanceOf(Date);
      expect(result.status).toBe(OrderStatus.CONFIRMED);
      expect(result.stockReserved).toBe(true);
    });

    it('Repeat confirmOrderPayment does not overwrite paymentVerifiedAt or re-decrement stock', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
        paymentVerifiedAt: originalPaymentVerifiedAt,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      const result = await service.confirmOrderPayment(orderId);

      expect(result).toEqual(order);
      expect(result.paymentVerifiedAt).toEqual(originalPaymentVerifiedAt);
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
      expect(orderRepository.save).not.toHaveBeenCalled();
    });

    it('Rejects confirmOrderPayment on CANCELLED status', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.CANCELLED,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(BadRequestException);
      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        'Cannot confirm payment for order in status CANCELLED',
      );
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
      expect(orderRepository.save).not.toHaveBeenCalled();
    });

    it('Rejects confirmOrderPayment on REFUNDED status', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.REFUNDED,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(BadRequestException);
      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        'Cannot confirm payment for order in status REFUNDED',
      );
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
      expect(orderRepository.save).not.toHaveBeenCalled();
    });

    it('Rejects confirmOrderPayment on PROCESSING status', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PROCESSING,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(BadRequestException);
      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        'Cannot confirm payment for order in status PROCESSING',
      );
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
      expect(orderRepository.save).not.toHaveBeenCalled();
    });

    it('Rejects confirmOrderPayment on SHIPPED status', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.SHIPPED,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(BadRequestException);
      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        'Cannot confirm payment for order in status SHIPPED',
      );
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
      expect(orderRepository.save).not.toHaveBeenCalled();
    });

    it('Rejects confirmOrderPayment on DELIVERED status', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.DELIVERED,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(BadRequestException);
      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        'Cannot confirm payment for order in status DELIVERED',
      );
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
      expect(orderRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('setPaymentIntent - Non-PENDING Status Rejection', () => {
    const orderId = 'order-1';
    const preExistingAuthority = 'AUTH_OLD';
    const preExistingAmount = 500;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Rejects setPaymentIntent on CONFIRMED status without overwriting authority/amount', async () => {
      const order = {
        id: orderId,
        orderNumber: 'ORD-123',
        trackingNumber: 'KZ-20240101-ABC123',
        customerEmail: 'test@example.com',
        customerPhone: '1234567890',
        customerName: 'Test User',
        shippingAddress: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'Test Country',
        sellerId: 1,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
        subtotal: 100,
        shippingCost: 10,
        total: 110,
        sellerStoreName: 'Test Store',
        paymentAuthority: preExistingAuthority,
        paymentAmount: preExistingAmount,
        paymentCurrency: 'IRT',
        items: [],
        seller: {} as SellerInfo,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(
        service.setPaymentIntent({ orderId, authority: 'A_NEW', amount: 1 }),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.setPaymentIntent({ orderId, authority: 'A_NEW', amount: 1 }),
      ).rejects.toThrow(
        'Cannot create payment intent for order with status CONFIRMED',
      );

      expect(orderRepository.save).not.toHaveBeenCalled();
      expect(order.paymentAuthority).toBe(preExistingAuthority);
      expect(order.paymentAmount).toBe(preExistingAmount);
    });

    it('Rejects setPaymentIntent on CANCELLED status without overwriting authority/amount', async () => {
      const order = {
        id: orderId,
        orderNumber: 'ORD-123',
        trackingNumber: 'KZ-20240101-ABC123',
        customerEmail: 'test@example.com',
        customerPhone: '1234567890',
        customerName: 'Test User',
        shippingAddress: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'Test Country',
        sellerId: 1,
        status: OrderStatus.CANCELLED,
        stockReserved: false,
        subtotal: 100,
        shippingCost: 10,
        total: 110,
        sellerStoreName: 'Test Store',
        paymentAuthority: preExistingAuthority,
        paymentAmount: preExistingAmount,
        paymentCurrency: 'IRT',
        items: [],
        seller: {} as SellerInfo,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(
        service.setPaymentIntent({ orderId, authority: 'A_NEW', amount: 1 }),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.setPaymentIntent({ orderId, authority: 'A_NEW', amount: 1 }),
      ).rejects.toThrow(
        'Cannot create payment intent for order with status CANCELLED',
      );

      expect(orderRepository.save).not.toHaveBeenCalled();
      expect(order.paymentAuthority).toBe(preExistingAuthority);
      expect(order.paymentAmount).toBe(preExistingAmount);
    });
  });
});