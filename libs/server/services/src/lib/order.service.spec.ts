import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, EntityManager, DataSource, FindOptionsWhere } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  Order,
  OrderItem,
  OrderStatus,
  SellerProduct,
  SellerInfo,
} from '@kickzone-workspace/entities';
import { CreateOrderInput, UpdateOrderInput } from '@kickzone-workspace/inputs';

describe('OrderService', () => {
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

  describe('createOrder', () => {
    const createOrderInput: CreateOrderInput = {
      customerEmail: 'customer@example.com',
      customerPhone: '1234567890',
      customerName: 'John Doe',
      shippingAddress: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      sellerId: 1,
      items: [
        {
          productId: 'product-1',
          sellerProductId: 'seller-product-1',
          productName: 'Test Product',
          quantity: 2,
          unitPrice: 50,
          totalPrice: 100,
        },
      ],
      shippingCost: 10,
    };

    const mockSeller: SellerInfo = {
      id: 1,
      storeName: 'Test Store',
      phone: '9876543210',
      address: 'Seller Address',
      shippingFee: 15,
    } as SellerInfo;

    const mockSellerProduct: SellerProduct = {
      id: 'seller-product-1',
      price: 50,
      discount: 0,
      productInfoId: 1,
      stockQuantity: 100,
      seller: { id: 1 } as any,
    } as SellerProduct;

    const mockSavedOrder = {
      id: 'order-1',
      orderNumber: 'ORD-123',
      trackingNumber: 'KZ-20240101-ABC123',
      customerEmail: createOrderInput.customerEmail,
      customerPhone: createOrderInput.customerPhone,
      customerName: createOrderInput.customerName,
      shippingAddress: createOrderInput.shippingAddress,
      city: createOrderInput.city,
      state: createOrderInput.state,
      zipCode: createOrderInput.zipCode,
      country: createOrderInput.country,
      sellerId: createOrderInput.sellerId,
      status: OrderStatus.PENDING,
      stockReserved: false,
      subtotal: 100,
      shippingCost: 10,
      total: 110,
      sellerStoreName: mockSeller.storeName,
      sellerPhone: mockSeller.phone,
      sellerAddress: mockSeller.address,
      items: undefined,
      seller: mockSeller,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any;

    const mockOrderItem: OrderItem = {
      id: 'item-1',
      orderId: 'order-1',
      productId: 'product-1',
      sellerProductId: 'seller-product-1',
      productName: 'Test Product',
      quantity: 2,
      unitPrice: 50,
      totalPrice: 100,
      originalPrice: 50,
      discountPercentage: 0,
      productInfoId: 1,
    } as OrderItem;

    it('should create an order successfully with stockReserved = false', async () => {
      const orderWithoutItems = { ...mockSavedOrder, items: undefined } as any;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);
      orderRepository.save.mockResolvedValue({ ...orderWithoutItems } as any);
      orderItemRepository.save.mockResolvedValue([mockOrderItem] as any);

      const result = await service.createOrder(createOrderInput);

      expect(orderRepository.create).toHaveBeenCalledWith(
        expect.not.objectContaining({ items: expect.any(Array) }),
      );
      expect(sellerInfoRepository.findOne).toHaveBeenCalledWith({
        where: { id: createOrderInput.sellerId },
      });
      expect(orderRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ items: undefined }),
      );
      expect(orderItemRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toBeDefined();
      expect(result.orderNumber).toBeDefined();
      expect(result.trackingNumber).toBeDefined();
      expect(result.status).toBe(OrderStatus.PENDING);
      expect(result.stockReserved).toBe(false);
      expect(result.items).toHaveLength(1);
    });

    it('should throw NotFoundException if seller does not exist', async () => {
      orderRepository.create.mockReturnValue(mockSavedOrder);
      sellerInfoRepository.findOne.mockResolvedValue(null);

      await expect(service.createOrder(createOrderInput)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.createOrder(createOrderInput)).rejects.toThrow(
        `Seller with ID ${createOrderInput.sellerId} not found`,
      );
    });

    it('should calculate subtotal and total correctly', async () => {
      const inputWithTwoItems = {
        ...createOrderInput,
        items: [
          { ...createOrderInput.items[0], sellerProductId: 'seller-product-1', totalPrice: 100 },
          { ...createOrderInput.items[0], productId: 'product-2', sellerProductId: 'seller-product-2', totalPrice: 50 },
        ],
      };
      // Catalog prices: product-1 = 50, product-2 = 25 (different from client prices)
      const sellerProduct1 = { ...mockSellerProduct, id: 'seller-product-1', price: 50, discount: 0, seller: { id: 1 } as any } as SellerProduct;
      const sellerProduct2 = { ...mockSellerProduct, id: 'seller-product-2', price: 25, discount: 0, seller: { id: 1 } as any } as SellerProduct;
      const mockOrderItem1 = { ...mockOrderItem, totalPrice: 100, id: 'item-1', unitPrice: 50 } as OrderItem;
      const mockOrderItem2 = { ...mockOrderItem, productId: 'product-2', totalPrice: 50, id: 'item-2', unitPrice: 25 } as OrderItem;
      const orderWithoutItems = {
        ...mockSavedOrder,
        items: undefined,
        subtotal: 150, // 50*2 + 25*2 = 100 + 50 = 150
        total: 160,
      } as any;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne
        .mockResolvedValueOnce(sellerProduct1)
        .mockResolvedValueOnce(sellerProduct2);
      orderRepository.save.mockResolvedValue(orderWithoutItems);
      orderItemRepository.save.mockResolvedValue([mockOrderItem1, mockOrderItem2] as any);

      const result = await service.createOrder(inputWithTwoItems);

      expect(result.subtotal).toBe(150);
      expect(result.total).toBe(160);
      expect(result.items).toHaveLength(2);
    });

    it('should use provided shipping cost over seller shipping fee', async () => {
      const inputWithShipping = {
        ...createOrderInput,
        shippingCost: 20,
      };
      const orderWithoutItems = { ...mockSavedOrder, items: undefined } as any;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);
      orderRepository.save.mockResolvedValue({
        ...orderWithoutItems,
        shippingCost: 20,
        total: 120,
      });
      orderItemRepository.save.mockResolvedValue([mockOrderItem] as any);

      const result = await service.createOrder(inputWithShipping);

      expect(result.shippingCost).toBe(20);
      expect(result.total).toBe(120);
    });

    it('should use seller shipping fee when shipping cost is not provided', async () => {
      const inputWithoutShipping = {
        ...createOrderInput,
        shippingCost: undefined,
      };
      const orderWithoutItems = { ...mockSavedOrder, items: undefined } as any;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);
      orderRepository.save.mockResolvedValue({
        ...orderWithoutItems,
        shippingCost: 15,
        total: 115,
      });
      orderItemRepository.save.mockResolvedValue([mockOrderItem] as any);

      const result = await service.createOrder(inputWithoutShipping);

      expect(result.shippingCost).toBe(15);
      expect(result.total).toBe(115);
    });

    it('should preserve seller snapshot information', async () => {
      const orderWithoutItems = { ...mockSavedOrder, items: undefined } as any;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);
      orderRepository.save.mockResolvedValue(orderWithoutItems);
      orderItemRepository.save.mockResolvedValue([mockOrderItem] as any);

      const result = await service.createOrder(createOrderInput);

      expect(result.sellerStoreName).toBe(mockSeller.storeName);
      expect(result.sellerPhone).toBe(mockSeller.phone);
      expect(result.sellerAddress).toBe(mockSeller.address);
    });

    it('should NOT decrease stock when creating order', async () => {
      const orderWithoutItems = { ...mockSavedOrder, items: undefined } as any;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);
      orderRepository.save.mockResolvedValue(orderWithoutItems);
      orderItemRepository.save.mockResolvedValue([] as any);

      await service.createOrder(createOrderInput);

      expect(sellerProductRepository.save).not.toHaveBeenCalled();
      expect(mockSellerProduct.stockQuantity).toBe(100);
    });

    it('should preserve product pricing snapshot in order items', async () => {
      const sellerProductWithDiscount = {
        ...mockSellerProduct,
        price: 60,
        discount: 10,
        seller: { id: 1 } as any,
      } as SellerProduct;
      const orderWithoutItems = { ...mockSavedOrder, items: undefined } as any;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(
        sellerProductWithDiscount,
      );
      orderRepository.save.mockResolvedValue(orderWithoutItems);
      orderItemRepository.save.mockImplementation(((items: any[]) =>
        Promise.resolve(items)) as any);

      await service.createOrder(createOrderInput);

      expect(orderItemRepository.save).toHaveBeenCalledTimes(1);
      const savedItems = orderItemRepository.save.mock.calls[0][0] as any[];
      expect(Array.isArray(savedItems)).toBe(true);
      expect(savedItems.length).toBe(1);
      expect(savedItems[0]).toHaveProperty('originalPrice', 60);
      expect(savedItems[0]).toHaveProperty('discountPercentage', 10);
      expect(savedItems[0]).toHaveProperty('orderId', mockSavedOrder.id);
    });

    it('should insert each order item only once (no cascade + manual save duplication)', async () => {
      const inputWithTwoItems: CreateOrderInput = {
        ...createOrderInput,
        items: [
          {
            productId: 'product-1',
            sellerProductId: 'seller-product-1',
            productName: 'Test Product 1',
            quantity: 1,
            unitPrice: 50,
            totalPrice: 50,
          },
          {
            productId: 'product-2',
            sellerProductId: 'seller-product-2',
            productName: 'Test Product 2',
            quantity: 2,
            unitPrice: 30,
            totalPrice: 60,
          },
        ],
      };

      const sellerProduct2 = { ...mockSellerProduct, id: 'seller-product-2', seller: { id: 1 } as any } as SellerProduct;

      const orderWithoutItems = {
        ...mockSavedOrder,
        items: undefined,
        subtotal: 110,
        total: 120,
      } as any;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne
        .mockResolvedValueOnce(mockSellerProduct)
        .mockResolvedValueOnce(sellerProduct2);
      orderRepository.save.mockResolvedValue({ ...orderWithoutItems } as any);
      orderItemRepository.save.mockImplementation(((items: any[]) =>
        Promise.resolve(items.map((i: any, idx: number) => ({ ...i, id: `item-${idx + 1}` })))) as any);

      const result = await service.createOrder(inputWithTwoItems);

      const savedOrderArg = orderRepository.save.mock.calls[0][0] as Order;
      expect(savedOrderArg.items).toBeUndefined();

      expect(orderItemRepository.save).toHaveBeenCalledTimes(1);

      expect(result.items).toHaveLength(2);
      expect(result.items[0].quantity).toBe(1);
      expect(result.items[1].quantity).toBe(2);
    });

    it('should override client prices with catalog prices (price tampering protection)', async () => {
      // Client sends unitPrice: 10, totalPrice: 20 but catalog price is 50
      const inputWithTamperedPrices = {
        ...createOrderInput,
        items: [
          {
            ...createOrderInput.items[0],
            unitPrice: 10,
            totalPrice: 20,
          },
        ],
      };
      const sellerProductWithHigherPrice = {
        ...mockSellerProduct,
        price: 50,
        discount: 0,
      } as SellerProduct;

      const orderWithoutItems = { ...mockSavedOrder, items: undefined } as any;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(sellerProductWithHigherPrice);
      orderRepository.save.mockResolvedValue({
        ...orderWithoutItems,
        subtotal: 100, // 50 * 2 = 100 (catalog price)
        total: 110,
      });
      orderItemRepository.save.mockImplementation(((items: any[]) =>
        Promise.resolve(items)) as any);

      const result = await service.createOrder(inputWithTamperedPrices);

      expect(result.subtotal).toBe(100); // Catalog price, not client's 20
      expect(result.total).toBe(110);
      const savedItems = orderItemRepository.save.mock.calls[0][0] as any[];
      expect(savedItems[0].unitPrice).toBe(50); // Catalog unit price
      expect(savedItems[0].totalPrice).toBe(100); // Catalog total price
    });

    it('should apply discount when computing catalog price', async () => {
      const sellerProductWithDiscount = {
        ...mockSellerProduct,
        price: 100,
        discount: 20, // 20% off
        seller: { id: 1 } as any,
      } as SellerProduct;

      const orderWithoutItems = { ...mockSavedOrder, items: undefined } as any;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(sellerProductWithDiscount);
      orderRepository.save.mockResolvedValue({
        ...orderWithoutItems,
        subtotal: 160, // 80 * 2 = 160 (after 20% discount)
        total: 170,
      });
      orderItemRepository.save.mockImplementation(((items: any[]) =>
        Promise.resolve(items)) as any);

      const result = await service.createOrder(createOrderInput);

      expect(result.subtotal).toBe(160);
      expect(result.total).toBe(170);
      const savedItems = orderItemRepository.save.mock.calls[0][0] as any[];
      expect(savedItems[0].unitPrice).toBe(80); // 100 * 0.8 = 80
      expect(savedItems[0].totalPrice).toBe(160); // 80 * 2 = 160
      expect(savedItems[0].originalPrice).toBe(100);
      expect(savedItems[0].discountPercentage).toBe(20);
    });

    it('should reject cross-seller ownership (product belongs to different seller)', async () => {
      const sellerProductWrongSeller = {
        ...mockSellerProduct,
        seller: { id: 999 } as any, // Different seller
      } as SellerProduct;

      orderRepository.create.mockReturnValue({ ...mockSavedOrder, items: undefined } as any);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(sellerProductWrongSeller);

      await expect(service.createOrder(createOrderInput)).rejects.toThrow(BadRequestException);
      await expect(service.createOrder(createOrderInput)).rejects.toThrow(
        /does not belong to seller 1/,
      );
    });

    it('should reject zero quantity', async () => {
      const inputZeroQty = {
        ...createOrderInput,
        items: [{ ...createOrderInput.items[0], quantity: 0 }],
      };

      orderRepository.create.mockReturnValue({ ...mockSavedOrder, items: undefined } as any);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);

      await expect(service.createOrder(inputZeroQty)).rejects.toThrow(BadRequestException);
      await expect(service.createOrder(inputZeroQty)).rejects.toThrow(
        /Quantity must be a positive integer/,
      );
    });

    it('should reject negative quantity', async () => {
      const inputNegativeQty = {
        ...createOrderInput,
        items: [{ ...createOrderInput.items[0], quantity: -1 }],
      };

      orderRepository.create.mockReturnValue({ ...mockSavedOrder, items: undefined } as any);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);

      await expect(service.createOrder(inputNegativeQty)).rejects.toThrow(BadRequestException);
      await expect(service.createOrder(inputNegativeQty)).rejects.toThrow(
        /Quantity must be a positive integer/,
      );
    });

    it('should reject non-integer quantity', async () => {
      const inputFloatQty = {
        ...createOrderInput,
        items: [{ ...createOrderInput.items[0], quantity: 2.5 }],
      };

      orderRepository.create.mockReturnValue({ ...mockSavedOrder, items: undefined } as any);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);

      await expect(service.createOrder(inputFloatQty)).rejects.toThrow(BadRequestException);
      await expect(service.createOrder(inputFloatQty)).rejects.toThrow(
        /Quantity must be a positive integer/,
      );
    });

    it('should reject negative shipping cost', async () => {
      const inputNegativeShipping = {
        ...createOrderInput,
        shippingCost: -5,
      };

      orderRepository.create.mockReturnValue({ ...mockSavedOrder, items: undefined } as any);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);

      await expect(service.createOrder(inputNegativeShipping)).rejects.toThrow(BadRequestException);
      await expect(service.createOrder(inputNegativeShipping)).rejects.toThrow(
        /Shipping cost cannot be negative/,
      );
    });

    it('should reject insufficient stock at create', async () => {
      const sellerProductLowStock = {
        ...mockSellerProduct,
        stockQuantity: 1, // Only 1 in stock
        seller: { id: 1 } as any,
      } as SellerProduct;

      const inputExceedsStock = {
        ...createOrderInput,
        items: [{ ...createOrderInput.items[0], quantity: 5 }],
      };

      orderRepository.create.mockReturnValue({ ...mockSavedOrder, items: undefined } as any);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(sellerProductLowStock);

      await expect(service.createOrder(inputExceedsStock)).rejects.toThrow(BadRequestException);
      await expect(service.createOrder(inputExceedsStock)).rejects.toThrow(
        /Insufficient stock for product seller-product-1. Available: 1, Requested: 5/,
      );
    });

    it('should reject missing sellerProductId', async () => {
      const inputMissingSellerProductId = {
        ...createOrderInput,
        items: [{ ...createOrderInput.items[0], sellerProductId: undefined }],
      };

      orderRepository.create.mockReturnValue({ ...mockSavedOrder, items: undefined } as any);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);

      await expect(service.createOrder(inputMissingSellerProductId)).rejects.toThrow(BadRequestException);
      await expect(service.createOrder(inputMissingSellerProductId)).rejects.toThrow(
        /sellerProductId is required/,
      );
    });

    it('should reject non-existent sellerProduct', async () => {
      orderRepository.create.mockReturnValue({ ...mockSavedOrder, items: undefined } as any);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(null);

      await expect(service.createOrder(createOrderInput)).rejects.toThrow(NotFoundException);
      await expect(service.createOrder(createOrderInput)).rejects.toThrow(
        /SellerProduct with ID seller-product-1 not found/,
      );
    });
  });

  describe('findOne', () => {
    const orderId = 'order-1';
    const mockOrder: Order = {
      id: orderId,
      orderNumber: 'ORD-123',
      status: OrderStatus.PENDING,
      stockReserved: false,
      items: [],
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
      subtotal: 0,
      shippingCost: 0,
      total: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Order;

    it('should return an order by id', async () => {
      orderRepository.findOne.mockResolvedValue(mockOrder);

      const result = await service.findOne(orderId);

      expect(orderRepository.findOne).toHaveBeenCalledWith({
        where: { id: orderId },
        relations: ['items', 'seller'],
      });
      expect(result).toEqual(mockOrder);
    });

    it('should throw NotFoundException if order does not exist', async () => {
      orderRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(orderId)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(orderId)).rejects.toThrow(
        `Order with ID ${orderId} not found`,
      );
    });
  });

  describe('findAll', () => {
    const mockOrders: Order[] = [
      {
        id: 'order-1',
        orderNumber: 'ORD-1',
        createdAt: new Date('2024-01-01'),
      } as Order,
      {
        id: 'order-2',
        orderNumber: 'ORD-2',
        createdAt: new Date('2024-01-02'),
      } as Order,
    ];

    beforeEach(() => {
      mockQueryBuilder.getMany.mockResolvedValue(mockOrders);
      mockQueryBuilder.getCount.mockResolvedValue(2);
    });

    it('should return paginated orders', async () => {
      const result = await service.findAll(10);

      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalled();
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        'order.createdAt',
        'DESC',
      );
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(11);
      expect(result.edges).toHaveLength(2);
      expect(result.totalCount).toBe(2);
    });

    it('should filter by sellerId', async () => {
      await service.findAll(10, undefined, '1');

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'order.sellerId = :sellerId',
        { sellerId: 1 },
      );
    });

    it('should throw BadRequestException for invalid sellerId', async () => {
      await expect(service.findAll(10, undefined, 'invalid')).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.findAll(10, undefined, 'invalid')).rejects.toThrow(
        'Invalid sellerId',
      );
    });

    it('should filter by status', async () => {
      await service.findAll(10, undefined, undefined, OrderStatus.PENDING);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'order.status = :status',
        { status: OrderStatus.PENDING },
      );
    });

    it('should handle pagination cursor', async () => {
      const cursor = Buffer.from(new Date().toISOString()).toString('base64');
      await service.findAll(10, cursor);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalled();
    });

    it('should indicate hasNextPage when more items exist', async () => {
      const manyOrders = Array.from({ length: 11 }, (_, i) => ({
        id: `order-${i}`,
        createdAt: new Date(),
      })) as Order[];
      mockQueryBuilder.getMany.mockResolvedValue(manyOrders);

      const result = await service.findAll(10);

      expect(result.pageInfo.hasNextPage).toBe(true);
    });

    it('should apply id DESC tie-breaker ordering for deterministic pagination', async () => {
      await service.findAll(10);

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        'order.createdAt',
        'DESC',
      );
      expect(mockQueryBuilder.addOrderBy).toHaveBeenCalledWith(
        'order.id',
        'DESC',
      );
    });

    it('should filter by both sellerId and status', async () => {
      await service.findAll(10, undefined, '1', OrderStatus.DELIVERED);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'order.sellerId = :sellerId',
        { sellerId: 1 },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'order.status = :status',
        { status: OrderStatus.DELIVERED },
      );
    });
  });

  describe('updateOrder', () => {
    const orderId = 'order-1';
    const existingOrder: Order = {
      id: orderId,
      orderNumber: 'ORD-123',
      subtotal: 100,
      shippingCost: 10,
      total: 110,
      stockReserved: false,
      items: [],
      status: OrderStatus.PENDING,
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
    } as Order;

    const updateInput: UpdateOrderInput = {
      customerName: 'Updated Name',
    };

    it('should update order successfully', async () => {
      orderRepository.findOne.mockResolvedValue(existingOrder);
      orderRepository.save.mockResolvedValue({
        ...existingOrder,
        ...updateInput,
      } as Order);

      const result = await service.updateOrder(orderId, updateInput);

      expect(orderRepository.findOne).toHaveBeenCalledWith({
        where: { id: orderId },
        relations: ['items', 'seller'],
      });
      expect(result).toEqual({ ...existingOrder, ...updateInput });
    });

    it('should update order items and recalculate totals', async () => {
      const updateInputWithItems: UpdateOrderInput = {
        items: [
          {
            productId: 'product-1',
            productName: 'Product 1',
            quantity: 3,
            unitPrice: 50,
            totalPrice: 150,
          },
          {
            productId: 'product-2',
            productName: 'Product 2',
            quantity: 1,
            unitPrice: 30,
            totalPrice: 30,
          },
        ],
      };

      orderRepository.findOne.mockResolvedValue(existingOrder);
      orderItemRepository.delete.mockResolvedValue({ affected: 0 } as any);
      orderItemRepository.save.mockResolvedValue([] as any);
      orderRepository.save.mockResolvedValue({
        ...existingOrder,
        subtotal: 180,
        total: 190,
      } as Order);

      const result = await service.updateOrder(orderId, updateInputWithItems);

      expect(orderItemRepository.delete).toHaveBeenCalledWith({
        orderId,
      });
      expect(orderItemRepository.save).toHaveBeenCalled();
      expect(result.subtotal).toBe(180);
      expect(result.total).toBe(190);
    });
  });

  describe('updateOrderStatus', () => {
    const orderId = 'order-1';
    const mockOrderItems: OrderItem[] = [
      {
        id: 'item-1',
        productId: 'product-1',
        sellerProductId: 'seller-product-1',
        quantity: 2,
      } as OrderItem,
    ];

    it('should update order status successfully PENDING -> CONFIRMED with stock decrease', async () => {
      const sellerProduct: SellerProduct = {
        id: 'seller-product-1',
        stockQuantity: 10,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      sellerProductRepository.save.mockResolvedValue({
        ...sellerProduct,
        stockQuantity: 8,
      } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.CONFIRMED,
      );

      expect(sellerProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'seller-product-1' },
        lock: { mode: 'pessimistic_write' },
      });
      expect(sellerProductRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          stockQuantity: 8,
        }),
      );
      expect(result.status).toBe(OrderStatus.CONFIRMED);
      expect(result.stockReserved).toBe(true);
    });

    it('should restore stock when cancelling a CONFIRMED order (stockReserved = true)', async () => {
      const sellerProduct: SellerProduct = {
        id: 'seller-product-1',
        stockQuantity: 8,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      sellerProductRepository.save.mockResolvedValue({
        ...sellerProduct,
        stockQuantity: 10,
      } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CANCELLED,
        stockReserved: false,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.CANCELLED,
      );

      expect(sellerProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'seller-product-1' },
        lock: { mode: 'pessimistic_write' },
      });
      expect(sellerProductRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          stockQuantity: 10,
        }),
      );
      expect(result.status).toBe(OrderStatus.CANCELLED);
      expect(result.stockReserved).toBe(false);
    });

    it('should NOT restore stock when cancelling a PENDING order (stockReserved = false)', async () => {
      const sellerProduct: SellerProduct = {
        id: 'seller-product-1',
        stockQuantity: 10,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CANCELLED,
        stockReserved: false,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.CANCELLED,
      );

      expect(sellerProductRepository.findOne).not.toHaveBeenCalled();
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
      expect(result.status).toBe(OrderStatus.CANCELLED);
      expect(result.stockReserved).toBe(false);
    });

    it('should restore stock when refunding a CONFIRMED order (stockReserved = true)', async () => {
      const sellerProduct: SellerProduct = {
        id: 'seller-product-1',
        stockQuantity: 8,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      sellerProductRepository.save.mockResolvedValue({
        ...sellerProduct,
        stockQuantity: 10,
      } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.REFUNDED,
        stockReserved: false,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.REFUNDED,
      );

      expect(sellerProductRepository.save).toHaveBeenCalled();
      expect(result.status).toBe(OrderStatus.REFUNDED);
      expect(result.stockReserved).toBe(false);
    });

    it('should not restore stock when order was already cancelled', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.CANCELLED,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      orderRepository.save.mockResolvedValue(order);

      await service.updateOrderStatus(orderId, OrderStatus.CANCELLED);

      expect(sellerProductRepository.save).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for invalid transition CANCELLED -> DELIVERED', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.CANCELLED,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(
        service.updateOrderStatus(orderId, OrderStatus.DELIVERED),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.updateOrderStatus(orderId, OrderStatus.DELIVERED),
      ).rejects.toThrow('Invalid status transition from CANCELLED to DELIVERED');
    });

    it('should throw BadRequestException for invalid transition REFUNDED -> CANCELLED', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.REFUNDED,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(
        service.updateOrderStatus(orderId, OrderStatus.CANCELLED),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.updateOrderStatus(orderId, OrderStatus.CANCELLED),
      ).rejects.toThrow('Invalid status transition from REFUNDED to CANCELLED');
    });

    it('should throw BadRequestException for invalid transition PENDING -> PROCESSING', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(
        service.updateOrderStatus(orderId, OrderStatus.PROCESSING),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.updateOrderStatus(orderId, OrderStatus.PROCESSING),
      ).rejects.toThrow('Invalid status transition from PENDING to PROCESSING');
    });

    it('should allow PENDING -> CONFIRMED transition', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CONFIRMED,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.CONFIRMED,
      );

      expect(result.status).toBe(OrderStatus.CONFIRMED);
    });

    it('should allow PENDING -> CANCELLED transition', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CANCELLED,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.CANCELLED,
      );

      expect(result.status).toBe(OrderStatus.CANCELLED);
    });

    it('should allow CONFIRMED -> PROCESSING transition', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.PROCESSING,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.PROCESSING,
      );

      expect(result.status).toBe(OrderStatus.PROCESSING);
    });

    it('should allow CONFIRMED -> CANCELLED transition with stock restore', async () => {
      const sellerProduct: SellerProduct = {
        id: 'seller-product-1',
        stockQuantity: 8,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      sellerProductRepository.save.mockResolvedValue({
        ...sellerProduct,
        stockQuantity: 10,
      } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CANCELLED,
        stockReserved: false,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.CANCELLED,
      );

      expect(result.status).toBe(OrderStatus.CANCELLED);
      expect(result.stockReserved).toBe(false);
    });

    it('should allow CONFIRMED -> REFUNDED transition with stock restore', async () => {
      const sellerProduct: SellerProduct = {
        id: 'seller-product-1',
        stockQuantity: 8,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      sellerProductRepository.save.mockResolvedValue({
        ...sellerProduct,
        stockQuantity: 10,
      } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.REFUNDED,
        stockReserved: false,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.REFUNDED,
      );

      expect(result.status).toBe(OrderStatus.REFUNDED);
      expect(result.stockReserved).toBe(false);
    });

    it('should allow PROCESSING -> SHIPPED transition', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PROCESSING,
        stockReserved: true,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.SHIPPED,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.SHIPPED,
      );

      expect(result.status).toBe(OrderStatus.SHIPPED);
    });

    it('should allow PROCESSING -> REFUNDED transition with stock restore', async () => {
      const sellerProduct: SellerProduct = {
        id: 'seller-product-1',
        stockQuantity: 8,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        status: OrderStatus.PROCESSING,
        stockReserved: true,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      sellerProductRepository.save.mockResolvedValue({
        ...sellerProduct,
        stockQuantity: 10,
      } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.REFUNDED,
        stockReserved: false,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.REFUNDED,
      );

      expect(result.status).toBe(OrderStatus.REFUNDED);
      expect(result.stockReserved).toBe(false);
    });

    it('should allow SHIPPED -> DELIVERED transition', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.SHIPPED,
        stockReserved: true,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.DELIVERED,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.DELIVERED,
      );

      expect(result.status).toBe(OrderStatus.DELIVERED);
    });

    it('should allow SHIPPED -> REFUNDED transition with stock restore', async () => {
      const sellerProduct: SellerProduct = {
        id: 'seller-product-1',
        stockQuantity: 8,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        status: OrderStatus.SHIPPED,
        stockReserved: true,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      sellerProductRepository.save.mockResolvedValue({
        ...sellerProduct,
        stockQuantity: 10,
      } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.REFUNDED,
        stockReserved: false,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.REFUNDED,
      );

      expect(result.status).toBe(OrderStatus.REFUNDED);
      expect(result.stockReserved).toBe(false);
    });

    it('should allow DELIVERED -> REFUNDED transition with stock restore', async () => {
      const sellerProduct: SellerProduct = {
        id: 'seller-product-1',
        stockQuantity: 8,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        status: OrderStatus.DELIVERED,
        stockReserved: true,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      sellerProductRepository.save.mockResolvedValue({
        ...sellerProduct,
        stockQuantity: 10,
      } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.REFUNDED,
        stockReserved: false,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.REFUNDED,
      );

      expect(result.status).toBe(OrderStatus.REFUNDED);
      expect(result.stockReserved).toBe(false);
    });

    it('should return order idempotently if status unchanged', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.CONFIRMED,
      );

      expect(result).toEqual(order);
      expect(orderRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('deleteOrder', () => {
    const orderId = 'order-1';
    const mockOrderItems: OrderItem[] = [
      {
        id: 'item-1',
        productId: 'product-1',
        sellerProductId: 'seller-product-1',
        quantity: 2,
      } as OrderItem,
    ];

    it('should delete an order and restore stock if stockReserved = true', async () => {
      const sellerProduct: SellerProduct = {
        id: 'seller-product-1',
        stockQuantity: 8,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        orderNumber: 'ORD-123',
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      sellerProductRepository.save.mockResolvedValue({
        ...sellerProduct,
        stockQuantity: 10,
      } as SellerProduct);
      orderRepository.remove.mockResolvedValue(order);

      await service.deleteOrder(orderId);

      expect(orderRepository.findOne).toHaveBeenCalledWith({
        where: { id: orderId },
        relations: ['items'],
      });
      expect(sellerProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'seller-product-1' },
        lock: { mode: 'pessimistic_write' },
      });
      expect(sellerProductRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          stockQuantity: 10,
        }),
      );
      expect(orderRepository.remove).toHaveBeenCalledWith(order);
    });

    it('should delete an order without restoring stock if stockReserved = false', async () => {
      const order: Order = {
        id: orderId,
        orderNumber: 'ORD-123',
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      orderRepository.remove.mockResolvedValue(order);

      await service.deleteOrder(orderId);

      expect(sellerProductRepository.findOne).not.toHaveBeenCalled();
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
      expect(orderRepository.remove).toHaveBeenCalledWith(order);
    });

    it('should throw NotFoundException if order does not exist', async () => {
      orderRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteOrder(orderId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.deleteOrder(orderId)).rejects.toThrow(
        `Order with ID ${orderId} not found`,
      );
    });
  });

  describe('confirmOrderPayment', () => {
    const orderId = 'order-1';
    const mockOrderItems: OrderItem[] = [
      {
        id: 'item-1',
        productId: 'product-1',
        sellerProductId: 'seller-product-1',
        productName: 'Test Product',
        quantity: 2,
      } as OrderItem,
    ];

    const mockSellerProduct: SellerProduct = {
      id: 'seller-product-1',
      stockQuantity: 100,
    } as SellerProduct;

    it('should confirm payment and decrease stock for PENDING order', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);
      sellerProductRepository.save.mockResolvedValue({
        ...mockSellerProduct,
        stockQuantity: 98,
      } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
      });

      const result = await service.confirmOrderPayment(orderId);

      expect(sellerProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'seller-product-1' },
        lock: { mode: 'pessimistic_write' },
      });
      expect(sellerProductRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          stockQuantity: 98,
        }),
      );
      expect(result.status).toBe(OrderStatus.CONFIRMED);
      expect(result.stockReserved).toBe(true);
    });

    it('should return order without changes if already CONFIRMED and stockReserved', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      const result = await service.confirmOrderPayment(orderId);

      expect(result).toEqual(order);
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
      expect(orderRepository.save).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if order is not PENDING', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.CANCELLED,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        'Cannot confirm payment for order in status CANCELLED',
      );
    });

    it('should throw NotFoundException if seller product does not exist', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(null);

      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        'SellerProduct with ID seller-product-1 not found',
      );
    });

    it('should throw BadRequestException if insufficient stock', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: [
          {
            ...mockOrderItems[0],
            quantity: 150,
          },
        ],
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);

      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        'Insufficient stock',
      );
    });

    it('should use productId as fallback if sellerProductId is not provided', async () => {
      const orderItemsWithoutSellerProductId: OrderItem[] = [
        {
          id: 'item-1',
          productId: 'product-1',
          sellerProductId: undefined,
          productName: 'Test Product',
          quantity: 2,
        } as OrderItem,
      ];

      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: orderItemsWithoutSellerProductId,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);
      sellerProductRepository.save.mockResolvedValue({
        ...mockSellerProduct,
        stockQuantity: 98,
      } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
      } as Order);

      await service.confirmOrderPayment(orderId);

      expect(sellerProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'product-1' },
        lock: { mode: 'pessimistic_write' },
      });
    });

    it('should decrement stock only once per line item when confirmOrderPayment is called', async () => {
      const orderItems: OrderItem[] = [
        {
          id: 'item-1',
          productId: 'product-1',
          sellerProductId: 'seller-product-1',
          productName: 'Test Product',
          quantity: 3,
        } as OrderItem,
      ];

      const sellerProduct: SellerProduct = {
        id: 'seller-product-1',
        stockQuantity: 10,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: orderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      // findOne is called twice: once for stock check, once for actual decrement
      sellerProductRepository.findOne
        .mockResolvedValueOnce(sellerProduct)  // stock check
        .mockResolvedValueOnce(sellerProduct as any);  // actual decrement
      sellerProductRepository.save.mockResolvedValue({
        ...sellerProduct,
        stockQuantity: 7,
      } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
      } as Order);

      const result = await service.confirmOrderPayment(orderId);

      expect(sellerProductRepository.findOne).toHaveBeenCalledTimes(2);
      expect(sellerProductRepository.save).toHaveBeenCalledTimes(1);
      expect(sellerProductRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          stockQuantity: 7,
        }),
      );
      expect(result.status).toBe(OrderStatus.CONFIRMED);
    });

    it('should throw BadRequestException for negative quantity', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: [
          {
            ...mockOrderItems[0],
            quantity: -3,
          },
        ],
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        'Order item quantity must be a positive integer',
      );
    });

    it('should throw BadRequestException for zero quantity', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: [
          {
            ...mockOrderItems[0],
            quantity: 0,
          },
        ],
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        'Order item quantity must be a positive integer',
      );
    });

    it('should throw BadRequestException for non-integer quantity', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: [
          {
            ...mockOrderItems[0],
            quantity: 2.5,
          },
        ],
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        'Order item quantity must be a positive integer',
      );
    });

    it('should fail atomically when multi-item stock check fails - no partial deduction', async () => {
      const orderItems: OrderItem[] = [
        {
          id: 'item-1',
          productId: 'product-1',
          sellerProductId: 'seller-product-1',
          productName: 'Product 1',
          quantity: 2,
        } as OrderItem,
        {
          id: 'item-2',
          productId: 'product-2',
          sellerProductId: 'seller-product-2',
          productName: 'Product 2',
          quantity: 3,
        } as OrderItem,
      ];

      const sellerProduct1: SellerProduct = {
        id: 'seller-product-1',
        stockQuantity: 5,
      } as SellerProduct;

      const sellerProduct2: SellerProduct = {
        id: 'seller-product-2',
        stockQuantity: 1,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: orderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      // 4 calls to findOne: 2 for stock check (sorted: seller-product-1, seller-product-2), 
      // 2 for actual decrement (same order)
      sellerProductRepository.findOne
        .mockResolvedValueOnce(sellerProduct1)  // check stock for product 1
        .mockResolvedValueOnce(sellerProduct2)  // check stock for product 2 (fails here)
        .mockResolvedValueOnce(sellerProduct1)  // would be called for decrement product 1 (not reached)
        .mockResolvedValueOnce(sellerProduct2); // would be called for decrement product 2 (not reached)

      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        'Insufficient stock for product seller-product-2',
      );

      expect(sellerProductRepository.save).not.toHaveBeenCalled();
    });

    it('should sort sellerProductIds to prevent deadlocks', async () => {
      const orderItems: OrderItem[] = [
        {
          id: 'item-1',
          productId: 'product-1',
          sellerProductId: 'seller-product-b',
          productName: 'Product B',
          quantity: 1,
        } as OrderItem,
        {
          id: 'item-2',
          productId: 'product-2',
          sellerProductId: 'seller-product-a',
          productName: 'Product A',
          quantity: 1,
        } as OrderItem,
      ];

      const sellerProductA: SellerProduct = {
        id: 'seller-product-a',
        stockQuantity: 10,
      } as SellerProduct;

      const sellerProductB: SellerProduct = {
        id: 'seller-product-b',
        stockQuantity: 10,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: orderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne
        .mockResolvedValueOnce(sellerProductA)
        .mockResolvedValueOnce(sellerProductB);
      sellerProductRepository.save
        .mockResolvedValueOnce({ ...sellerProductA, stockQuantity: 9 } as SellerProduct)
        .mockResolvedValueOnce({ ...sellerProductB, stockQuantity: 9 } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
      } as Order);

      await service.confirmOrderPayment(orderId);

      const findOneCalls = sellerProductRepository.findOne.mock.calls;
      const firstCallWhere = findOneCalls[0][0].where as FindOptionsWhere<SellerProduct>;
      const secondCallWhere = findOneCalls[1][0].where as FindOptionsWhere<SellerProduct>;
      expect(firstCallWhere.id).toBe('seller-product-a');
      expect(secondCallWhere.id).toBe('seller-product-b');
    });
  });

  describe('cancelPendingOrder', () => {
    const orderId = 'order-1';
    const mockOrderItems: OrderItem[] = [
      {
        id: 'item-1',
        productId: 'product-1',
        sellerProductId: 'seller-product-1',
        quantity: 2,
      } as OrderItem,
    ];

    it('should cancel PENDING order without restoring stock (stockReserved = false)', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        stockReserved: false,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CANCELLED,
        stockReserved: false,
      });

      const result = await service.cancelPendingOrder(orderId);

      expect(sellerProductRepository.save).not.toHaveBeenCalled();
      expect(result.status).toBe(OrderStatus.CANCELLED);
      expect(result.stockReserved).toBe(false);
    });

    it('should throw BadRequestException when trying to cancel CONFIRMED order', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.CONFIRMED,
        stockReserved: true,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(service.cancelPendingOrder(orderId)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.cancelPendingOrder(orderId)).rejects.toThrow(
        'Only PENDING orders can be cancelled',
      );
    });

    it('should throw NotFoundException if order does not exist', async () => {
      orderRepository.findOne.mockResolvedValue(null);

      await expect(service.cancelPendingOrder(orderId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getOrdersByCustomerEmail', () => {
    const customerEmail = 'customer@example.com';
    const mockOrders: Order[] = [
      {
        id: 'order-1',
        orderNumber: 'ORD-1',
        customerEmail,
        createdAt: new Date('2024-01-01'),
      } as Order,
    ];

    beforeEach(() => {
      mockQueryBuilder.getMany.mockResolvedValue(mockOrders);
      orderRepository.count.mockResolvedValue(1);
    });

    it('should return orders filtered by customer email', async () => {
      const result = await service.getOrdersByCustomerEmail(customerEmail, 10);

      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'order.customerEmail = :customerEmail',
        { customerEmail },
      );
      expect(result.edges).toHaveLength(1);
      expect(result.totalCount).toBe(1);
    });

    it('should handle pagination with cursor', async () => {
      const cursor = Buffer.from(new Date().toISOString()).toString('base64');
      await service.getOrdersByCustomerEmail(customerEmail, 10, cursor);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalled();
    });
  });

  describe('getOrdersBySeller', () => {
    it('should call findAll with sellerId', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll').mockResolvedValue({
        edges: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          endCursor: undefined,
        },
        totalCount: 0,
      });

      await service.getOrdersBySeller('1', 10);

      expect(findAllSpy).toHaveBeenCalledWith(10, undefined, '1', undefined);

      findAllSpy.mockRestore();
    });

    it('should call findAll with sellerId and status filter', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll').mockResolvedValue({
        edges: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          endCursor: undefined,
        },
        totalCount: 0,
      });

      await service.getOrdersBySeller('1', 10, undefined, OrderStatus.DELIVERED);

      expect(findAllSpy).toHaveBeenCalledWith(10, undefined, '1', OrderStatus.DELIVERED);

      findAllSpy.mockRestore();
    });

    it('should call findAll with sellerId and undefined status (no filter)', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll').mockResolvedValue({
        edges: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          endCursor: undefined,
        },
        totalCount: 0,
      });

      await service.getOrdersBySeller('1', 10, undefined, undefined);

      expect(findAllSpy).toHaveBeenCalledWith(10, undefined, '1', undefined);

      findAllSpy.mockRestore();
    });
  });

  describe('getOrdersByStatus', () => {
    it('should call findAll with status', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll').mockResolvedValue({
        edges: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          endCursor: undefined,
        },
        totalCount: 0,
      });

      await service.getOrdersByStatus(OrderStatus.PENDING, 10);

      expect(findAllSpy).toHaveBeenCalledWith(
        10,
        undefined,
        undefined,
        OrderStatus.PENDING,
      );

      findAllSpy.mockRestore();
    });
  });

  describe('findOrdersByPaymentAuthority', () => {
    const authority = 'test-authority-123';

    it('should return all orders matching a paymentAuthority', async () => {
      const mockOrders: Order[] = [
        {
          id: 'order-1',
          orderNumber: 'ORD-1',
          paymentAuthority: authority,
          items: [],
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
          status: OrderStatus.PENDING,
          stockReserved: false,
          subtotal: 100,
          shippingCost: 10,
          total: 110,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date(),
        } as Order,
        {
          id: 'order-2',
          orderNumber: 'ORD-2',
          paymentAuthority: authority,
          items: [],
          seller: {} as SellerInfo,
          customerEmail: 'test@example.com',
          customerPhone: '1234567890',
          customerName: 'Test User',
          shippingAddress: '123 Test St',
          city: 'Test City',
          state: 'Test State',
          zipCode: '12345',
          country: 'Test Country',
          sellerId: 2,
          status: OrderStatus.PENDING,
          stockReserved: false,
          subtotal: 200,
          shippingCost: 15,
          total: 215,
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date(),
        } as Order,
      ];

      orderRepository.find.mockResolvedValue(mockOrders);

      const result = await service.findOrdersByPaymentAuthority(authority);

      expect(orderRepository.find).toHaveBeenCalledWith({
        where: { paymentAuthority: authority },
        relations: ['items', 'items.sellerProduct', 'customer', 'seller'],
        order: { id: 'ASC' },
      });
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('order-1');
      expect(result[1].id).toBe('order-2');
    });

    it('should return empty array for empty authority string', async () => {
      const result = await service.findOrdersByPaymentAuthority('');

      expect(result).toEqual([]);
      expect(orderRepository.find).not.toHaveBeenCalled();
    });

    it('should return empty array when no orders match authority', async () => {
      orderRepository.find.mockResolvedValue([]);

      const result = await service.findOrdersByPaymentAuthority('non-existent');

      expect(result).toEqual([]);
      expect(orderRepository.find).toHaveBeenCalledWith({
        where: { paymentAuthority: 'non-existent' },
        relations: ['items', 'items.sellerProduct', 'customer', 'seller'],
        order: { id: 'ASC' },
      });
    });
  });
});