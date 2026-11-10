import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource, FindOneOptions, DeepPartial } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { OrderService } from './order.service';
import { ShippingCalculationService, applyShippingMethodMultiplier } from './shipping-calculation.service';
import {
  Order,
  OrderItem,
  OrderStatus,
  SellerProduct,
  SellerInfo,
  ShippingPaymentMode,
  ShippingStrategy,
  PlatformSettings,
} from '@kickzone-workspace/entities';

describe('OrderService - Shipping Security (E2E P5)', () => {
  let service: OrderService;
  let orderRepository: jest.Mocked<Repository<Order>>;
  let orderItemRepository: jest.Mocked<Repository<OrderItem>>;
  let sellerProductRepository: jest.Mocked<Repository<SellerProduct>>;
  let sellerInfoRepository: jest.Mocked<Repository<SellerInfo>>;
  let platformSettingsRepository: jest.Mocked<Repository<PlatformSettings>>;
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

  const mockPlatformSettingsRepository = {
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
        ShippingCalculationService,
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
          provide: getRepositoryToken(PlatformSettings),
          useValue: mockPlatformSettingsRepository,
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
    platformSettingsRepository = module.get(getRepositoryToken(PlatformSettings));

    orderRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(mockQueryBuilder);

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const createMockSeller = (overrides: Partial<SellerInfo> = {}): SellerInfo => ({
    id: 1,
    storeName: 'Test Store',
    phone: '9876543210',
    address: 'Seller Address',
    shippingFee: 15,
    shippingPaymentMode: ShippingPaymentMode.PAY_ON_DELIVERY,
    ...overrides,
  } as SellerInfo);

  const createMockSellerProduct = (overrides: Partial<SellerProduct> = {}): SellerProduct => ({
    id: 'sp-1',
    price: 100,
    discount: 0,
    productInfoId: 1,
    stockQuantity: 10,
    seller: { id: 1 } as SellerProduct['seller'],
    ...overrides,
  } as SellerProduct);

  const createBaseOrderInput = (overrides: Record<string, unknown> = {}): Record<string, unknown> => ({
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
        sellerProductId: 'sp-1',
        productName: 'Test Product',
        quantity: 1,
        unitPrice: 100,
        totalPrice: 100,
      },
    ],
    shippingCost: 10,
    ...overrides,
  });

  const createMockSavedOrder = (overrides: Record<string, unknown> = {}): Order => ({
    id: 'order-1',
    orderNumber: 'ORD-123',
    trackingNumber: 'KZ-20240101-ABC123',
    customerEmail: 'customer@example.com',
    customerPhone: '1234567890',
    customerName: 'John Doe',
    shippingAddress: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    sellerId: 1,
    status: OrderStatus.PENDING,
    stockReserved: false,
    subtotal: 100,
    shippingCost: 0,
    total: 100,
    sellerStoreName: 'Test Store',
    sellerPhone: '9876543210',
    sellerAddress: 'Seller Address',
    items: [],
    seller: createMockSeller(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  } as Order);

  function createMockOrderForBatch(
    id: string,
    sellerId: number,
    subtotal: number,
    shippingPaymentMode: ShippingPaymentMode,
    shippingMethod = 'vip',
    shippingCost = 0,
    attachSeller = false,
    sellerOverrides: Partial<SellerInfo> = {},
    overrides: Record<string, unknown> = {}
  ): Order {
    const s = createMockSeller({ id: sellerId, shippingPaymentMode, ...sellerOverrides });
    return {
      id,
      orderNumber: `ORD-${id}`,
      trackingNumber: `KZ-${id}`,
      customerEmail: 'customer@example.com',
      customerPhone: '1234567890',
      customerName: 'John Doe',
      shippingAddress: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      sellerId,
      status: OrderStatus.PENDING,
      stockReserved: false,
      subtotal,
      shippingCost,
      total: subtotal + shippingCost,
      sellerStoreName: s.storeName,
      sellerPhone: s.phone,
      sellerAddress: s.address,
      shippingMethod,
      shippingPaymentMode,
      items: [],
      seller: attachSeller ? s : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides,
    } as Order;
  }

  function createPlatformSettings(overrides: Partial<PlatformSettings> = {}): PlatformSettings {
    return {
      id: 1,
      shippingStrategy: ShippingStrategy.TIERED_DISCOUNT,
      freeShippingEnabled: false,
      freeShippingThreshold: 500,
      additionalSellerDiscount: 0.5,
      additionalSellerFixedFee: undefined,
      maxShippingCap: 15,
      maxShippingCapEnabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides,
    } as PlatformSettings;
  }

  function setupCatalogMocks(
    seller: SellerInfo,
    sellerProduct: SellerProduct,
    savedOrder: Order
  ) {
    orderRepository.create.mockReturnValue(savedOrder);
    sellerInfoRepository.findOne.mockResolvedValue(seller);
    sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
    orderRepository.save.mockResolvedValue(savedOrder);
    orderItemRepository.save.mockImplementation(((items: unknown[]) =>
      Promise.resolve(items)) as never);
  }

  function mockSellerInfoFind(sellerMap: Map<number, SellerInfo>) {
    sellerInfoRepository.findOne.mockImplementation(
      async (options: FindOneOptions<SellerInfo>) => {
        const where = options.where as { id: number | string } | undefined;
        if (!where?.id) return null;
        const id = Number(where.id);
        return sellerMap.get(id) ?? null;
      }
    );
  }

  function mockPlatformSettingsFind(settings: PlatformSettings) {
    platformSettingsRepository.findOne.mockResolvedValue(settings);
  }

  function mockOrderSave(_orders: Order[]) {
    orderRepository.save.mockImplementation(async (order: DeepPartial<Order>) => order as Order);
  }

  describe('1. Invalid shippingMethod injection on createOrder and recalculateBatchOrdersShipping', () => {
    const invalidMethods = [
      'free',
      'overnight',
      '0',
      '__proto__',
      'vip; DROP TABLE orders',
    ];

    for (const method of invalidMethods) {
      it(`createOrder with shippingMethod '${method}' throws "Invalid shipping method: ${method}"`, async () => {
        const seller = createMockSeller({ shippingPaymentMode: ShippingPaymentMode.PAY_ONLINE });
        const sellerProduct = createMockSellerProduct();
        const savedOrder = createMockSavedOrder({ shippingMethod: 'vip' });

        setupCatalogMocks(seller, sellerProduct, savedOrder);

        const input = createBaseOrderInput({ shippingMethod: method });

        await expect(service.createOrder(input as never)).rejects.toThrow(BadRequestException);
        await expect(service.createOrder(input as never)).rejects.toThrow(
          `Invalid shipping method: ${method}`,
        );
      });
    }

    it('recalculateBatchOrdersShipping with existing order having corrupted shippingMethod "hacked" throws "Invalid shipping method: hacked"', async () => {
      const order = createMockOrderForBatch(
        'order-1',
        1,
        100,
        ShippingPaymentMode.PAY_ONLINE,
        'hacked',
        15
      );

      const seller = createMockSeller({ id: 1, shippingPaymentMode: ShippingPaymentMode.PAY_ONLINE, shippingFee: 15 });
      const settings = createPlatformSettings({
        freeShippingEnabled: false,
        maxShippingCapEnabled: false,
        shippingStrategy: ShippingStrategy.FULL_SUM,
      });

      sellerInfoRepository.findOne.mockResolvedValue(seller);
      mockPlatformSettingsFind(settings);
      orderRepository.save.mockResolvedValue(order);

      await expect(service.recalculateBatchOrdersShipping([order])).rejects.toThrow(BadRequestException);
      await expect(service.recalculateBatchOrdersShipping([order])).rejects.toThrow(
        'Invalid shipping method: hacked',
      );
    });

    const normalizationCases = [
      { input: undefined, expected: 'vip' },
      { input: null, expected: 'vip' },
      { input: '', expected: 'vip' },
      { input: '  VIP  ', expected: 'vip' },
      { input: 'Express', expected: 'express' },
      { input: 'PICKUP', expected: 'pickup' },
    ];

    for (const { input, expected } of normalizationCases) {
      it(`createOrder with shippingMethod ${JSON.stringify(input)} normalizes to '${expected}'`, async () => {
        const seller = createMockSeller({ shippingPaymentMode: ShippingPaymentMode.PAY_ONLINE });
        const sellerProduct = createMockSellerProduct();
        const savedOrder = createMockSavedOrder({ shippingMethod: expected });

        setupCatalogMocks(seller, sellerProduct, savedOrder);

        const inputObj = createBaseOrderInput({ shippingMethod: input as string });

        const result = await service.createOrder(inputObj as never);

        expect(result.shippingMethod).toBe(expected);
      });

      it(`recalculateBatchOrdersShipping with shippingMethod ${JSON.stringify(input)} normalizes to '${expected}'`, async () => {
        const order = createMockOrderForBatch(
          'order-1',
          1,
          100,
          ShippingPaymentMode.PAY_ONLINE,
          input as string,
          15
        );

        const seller = createMockSeller({ id: 1, shippingPaymentMode: ShippingPaymentMode.PAY_ONLINE, shippingFee: 15 });
        const settings = createPlatformSettings({
          freeShippingEnabled: false,
          maxShippingCapEnabled: false,
          shippingStrategy: ShippingStrategy.FULL_SUM,
        });

        sellerInfoRepository.findOne.mockResolvedValue(seller);
        mockPlatformSettingsFind(settings);
        orderRepository.save.mockResolvedValue(order);

        const result = await service.recalculateBatchOrdersShipping([order]);

        expect(result[0].shippingMethod).toBe(expected);
      });
    }
  });

  describe('2. Deterministic seller ordering & tiered discount anti-gaming in recalculateBatchOrdersShipping', () => {
    const seller1 = createMockSeller({ id: 1, shippingFee: 50, shippingPaymentMode: ShippingPaymentMode.PAY_ON_DELIVERY });
    const seller2 = createMockSeller({ id: 2, shippingFee: 20, shippingPaymentMode: ShippingPaymentMode.PAY_ONLINE });
    const seller3 = createMockSeller({ id: 3, shippingFee: 10, shippingPaymentMode: ShippingPaymentMode.PAY_ONLINE });

    const settings = createPlatformSettings({
      freeShippingEnabled: false,
      shippingStrategy: ShippingStrategy.TIERED_DISCOUNT,
      additionalSellerDiscount: 0.5,
      maxShippingCapEnabled: false,
    });

    const orderSeller1 = createMockOrderForBatch(
      'order-s1',
      1,
      100,
      ShippingPaymentMode.PAY_ON_DELIVERY,
      'vip',
      0,
      false,
      { shippingFee: 50 }
    );
    const orderSeller2 = createMockOrderForBatch(
      'order-s2',
      2,
      100,
      ShippingPaymentMode.PAY_ONLINE,
      'vip',
      20,
      false,
      { shippingFee: 20 }
    );
    const orderSeller3 = createMockOrderForBatch(
      'order-s3',
      3,
      100,
      ShippingPaymentMode.PAY_ONLINE,
      'express',
      5,
      false,
      { shippingFee: 10 }
    );

    function setupBatchMocks(
      orders: Order[],
      sellerMap: Map<number, SellerInfo>
    ) {
      mockSellerInfoFind(sellerMap);
      mockPlatformSettingsFind(settings);
      mockOrderSave(orders);
    }

    it('permutation [orderSeller3, orderSeller1, orderSeller2] - deterministic ordering and tiered discount', async () => {
      const orders = [orderSeller3, orderSeller1, orderSeller2];
      const sellerMap = new Map<number, SellerInfo>([
        [1, seller1],
        [2, seller2],
        [3, seller3],
      ]);

      setupBatchMocks(orders, sellerMap);

      const result = await service.recalculateBatchOrdersShipping(orders);

      // orderSeller1 (COD) gets shippingCost: 0, total: subtotal, no first-seller slot
      const r1 = result.find((o) => o.sellerId === 1);
      expect(r1).toBeDefined();
      expect(r1!.shippingCost).toBe(0);
      expect(r1!.total).toBe(100);
      expect(r1!.shippingPaymentMode).toBe(ShippingPaymentMode.PAY_ON_DELIVERY);

      // orderSeller2 (lowest online sellerId=2) ALWAYS gets first-seller slot (baseFee = 20)
      const r2 = result.find((o) => o.sellerId === 2);
      expect(r2).toBeDefined();
      expect(r2!.shippingCost).toBe(20); // vip multiplier = 1
      expect(r2!.total).toBe(120);
      expect(r2!.shippingPaymentMode).toBe(ShippingPaymentMode.PAY_ONLINE);

      // orderSeller3 (sellerId=3) ALWAYS gets 50% tier (baseFee = 10 * 0.5 = 5), express multiplier = 0.45
      const r3 = result.find((o) => o.sellerId === 3);
      expect(r3).toBeDefined();
      expect(r3!.shippingCost).toBe(2.25); // applyShippingMethodMultiplier(5, 'express') = Math.round(5 * 0.45 * 100) / 100 = 2.25
      expect(r3!.total).toBe(102.25);
      expect(r3!.shippingPaymentMode).toBe(ShippingPaymentMode.PAY_ONLINE);
    });

    it('permutation [orderSeller2, orderSeller3, orderSeller1] - deterministic ordering and tiered discount', async () => {
      const orders = [orderSeller2, orderSeller3, orderSeller1];
      const sellerMap = new Map<number, SellerInfo>([
        [1, seller1],
        [2, seller2],
        [3, seller3],
      ]);

      setupBatchMocks(orders, sellerMap);

      const result = await service.recalculateBatchOrdersShipping(orders);

      // orderSeller1 (COD) gets shippingCost: 0, total: subtotal, no first-seller slot
      const r1 = result.find((o) => o.sellerId === 1);
      expect(r1).toBeDefined();
      expect(r1!.shippingCost).toBe(0);
      expect(r1!.total).toBe(100);
      expect(r1!.shippingPaymentMode).toBe(ShippingPaymentMode.PAY_ON_DELIVERY);

      // orderSeller2 (lowest online sellerId=2) ALWAYS gets first-seller slot (baseFee = 20)
      const r2 = result.find((o) => o.sellerId === 2);
      expect(r2).toBeDefined();
      expect(r2!.shippingCost).toBe(20);
      expect(r2!.total).toBe(120);
      expect(r2!.shippingPaymentMode).toBe(ShippingPaymentMode.PAY_ONLINE);

      // orderSeller3 (sellerId=3) ALWAYS gets 50% tier (baseFee = 10 * 0.5 = 5), express multiplier = 0.45
      const r3 = result.find((o) => o.sellerId === 3);
      expect(r3).toBeDefined();
      expect(r3!.shippingCost).toBe(2.25);
      expect(r3!.total).toBe(102.25);
      expect(r3!.shippingPaymentMode).toBe(ShippingPaymentMode.PAY_ONLINE);
    });
  });

  describe('3. Free-shipping threshold anti-gaming (COD subtotal excluded from online threshold)', () => {
    const settings = createPlatformSettings({
      freeShippingEnabled: true,
      freeShippingThreshold: 100,
      shippingStrategy: ShippingStrategy.FULL_SUM,
      maxShippingCapEnabled: false,
    });

    function setupFreeShippingMocks(
      orders: Order[],
      sellerMap: Map<number, SellerInfo>
    ) {
      mockSellerInfoFind(sellerMap);
      mockPlatformSettingsFind(settings);
      mockOrderSave(orders);
    }

    it('mixed batch: COD subtotal 90 + online subtotal 30 = combined 120 >= 100 but onlineSubtotal 30 < 100 -> online does NOT get free shipping', async () => {
      const orderCod = createMockOrderForBatch(
        'order-cod',
        1,
        90,
        ShippingPaymentMode.PAY_ON_DELIVERY,
        'vip',
        0
      );
      const orderOnline = createMockOrderForBatch(
        'order-online',
        2,
        30,
        ShippingPaymentMode.PAY_ONLINE,
        'vip',
        12
      );

      const sellerCod = createMockSeller({ id: 1, shippingFee: 10, shippingPaymentMode: ShippingPaymentMode.PAY_ON_DELIVERY });
      const sellerOnline = createMockSeller({ id: 2, shippingFee: 12, shippingPaymentMode: ShippingPaymentMode.PAY_ONLINE });

      const orders = [orderCod, orderOnline];
      const sellerMap = new Map<number, SellerInfo>([
        [1, sellerCod],
        [2, sellerOnline],
      ]);

      setupFreeShippingMocks(orders, sellerMap);

      const result = await service.recalculateBatchOrdersShipping(orders);

      // orderCod stays shippingCost: 0, total: 90
      const rCod = result.find((o) => o.sellerId === 1);
      expect(rCod).toBeDefined();
      expect(rCod!.shippingCost).toBe(0);
      expect(rCod!.total).toBe(90);
      expect(rCod!.shippingPaymentMode).toBe(ShippingPaymentMode.PAY_ON_DELIVERY);

      // orderOnline does NOT get free shipping: shippingCost: 12, total: 42
      const rOnline = result.find((o) => o.sellerId === 2);
      expect(rOnline).toBeDefined();
      expect(rOnline!.shippingCost).toBe(12);
      expect(rOnline!.total).toBe(42);
      expect(rOnline!.shippingPaymentMode).toBe(ShippingPaymentMode.PAY_ONLINE);
    });

    it('when onlineSubtotal >= 100 (orderOnline.subtotal 100), online gets free shipping: shippingCost: 0, total: 100', async () => {
      const orderCod = createMockOrderForBatch(
        'order-cod',
        1,
        90,
        ShippingPaymentMode.PAY_ON_DELIVERY,
        'vip',
        0
      );
      const orderOnline = createMockOrderForBatch(
        'order-online',
        2,
        100,
        ShippingPaymentMode.PAY_ONLINE,
        'vip',
        12
      );

      const sellerCod = createMockSeller({ id: 1, shippingFee: 10, shippingPaymentMode: ShippingPaymentMode.PAY_ON_DELIVERY });
      const sellerOnline = createMockSeller({ id: 2, shippingFee: 12, shippingPaymentMode: ShippingPaymentMode.PAY_ONLINE });

      const orders = [orderCod, orderOnline];
      const sellerMap = new Map<number, SellerInfo>([
        [1, sellerCod],
        [2, sellerOnline],
      ]);

      setupFreeShippingMocks(orders, sellerMap);

      const result = await service.recalculateBatchOrdersShipping(orders);

      // orderCod stays shippingCost: 0, total: 90
      const rCod = result.find((o) => o.sellerId === 1);
      expect(rCod).toBeDefined();
      expect(rCod!.shippingCost).toBe(0);
      expect(rCod!.total).toBe(90);

      // orderOnline gets free shipping: shippingCost: 0, total: 100
      const rOnline = result.find((o) => o.sellerId === 2);
      expect(rOnline).toBeDefined();
      expect(rOnline!.shippingCost).toBe(0);
      expect(rOnline!.total).toBe(100);
      expect(rOnline!.shippingPaymentMode).toBe(ShippingPaymentMode.PAY_ONLINE);
    });
  });

  describe('4. Live SellerInfo mode switch during recalculateBatchOrdersShipping', () => {
    const settings = createPlatformSettings({
      freeShippingEnabled: false,
      maxShippingCapEnabled: false,
      shippingStrategy: ShippingStrategy.FULL_SUM,
    });

    function setupModeSwitchMocks(
      orders: Order[],
      sellerMap: Map<number, SellerInfo>
    ) {
      mockSellerInfoFind(sellerMap);
      mockPlatformSettingsFind(settings);
      mockOrderSave(orders);
    }

    it('order-1 was PAY_ONLINE (shippingCost: 15, total: 115, subtotal 100) but Seller 1 now PAY_ON_DELIVERY -> recalc sets PAY_ON_DELIVERY, shippingCost: 0, total: 100, and saves', async () => {
      const order1 = createMockOrderForBatch(
        'order-1',
        1,
        100,
        ShippingPaymentMode.PAY_ONLINE,
        'vip',
        15
      );

      const orders = [order1];
      const sellerMap = new Map<number, SellerInfo>([
        [1, createMockSeller({ id: 1, shippingFee: 15, shippingPaymentMode: ShippingPaymentMode.PAY_ON_DELIVERY })],
      ]);

      setupModeSwitchMocks(orders, sellerMap);

      const result = await service.recalculateBatchOrdersShipping(orders);

      const r1 = result[0];
      expect(r1.shippingPaymentMode).toBe(ShippingPaymentMode.PAY_ON_DELIVERY);
      expect(r1.shippingCost).toBe(0);
      expect(r1.total).toBe(100);
      expect(orderRepository.save).toHaveBeenCalledTimes(1);
    });

    it('order-2 stored as PAY_ON_DELIVERY (shippingCost: 0) but Seller 2 now PAY_ONLINE with shippingFee: 10 and shippingMethod: vip -> recalc sets PAY_ONLINE, shippingCost: 10, total: 110, and saves', async () => {
      const order2 = createMockOrderForBatch(
        'order-2',
        2,
        100,
        ShippingPaymentMode.PAY_ON_DELIVERY,
        'vip',
        0
      );

      const orders = [order2];
      const sellerMap = new Map<number, SellerInfo>([
        [2, createMockSeller({ id: 2, shippingFee: 10, shippingPaymentMode: ShippingPaymentMode.PAY_ONLINE })],
      ]);

      setupModeSwitchMocks(orders, sellerMap);

      const result = await service.recalculateBatchOrdersShipping(orders);

      const r2 = result[0];
      expect(r2.shippingPaymentMode).toBe(ShippingPaymentMode.PAY_ONLINE);
      expect(r2.shippingCost).toBe(10);
      expect(r2.total).toBe(110);
      expect(orderRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('5. Idempotent no-op save', () => {
    const settings = createPlatformSettings({
      freeShippingEnabled: false,
      maxShippingCapEnabled: false,
      shippingStrategy: ShippingStrategy.FULL_SUM,
    });

    function setupIdempotentMocks(
      orders: Order[],
      sellerMap: Map<number, SellerInfo>
    ) {
      mockSellerInfoFind(sellerMap);
      mockPlatformSettingsFind(settings);
      mockOrderSave(orders);
    }

    it('when recalculateBatchOrdersShipping called on orders already matching server calculation, orderRepository.save is NOT called', async () => {
      // Orders already have correct calculated values
      const orderCod = createMockOrderForBatch(
        'order-cod',
        1,
        100,
        ShippingPaymentMode.PAY_ON_DELIVERY,
        'vip',
        0,
        false,
        { shippingFee: 10 }
      );
      const orderOnline = createMockOrderForBatch(
        'order-online',
        2,
        100,
        ShippingPaymentMode.PAY_ONLINE,
        'vip',
        20,
        false,
        { shippingFee: 20 }
      );

      const orders = [orderCod, orderOnline];
      const sellerMap = new Map<number, SellerInfo>([
        [1, createMockSeller({ id: 1, shippingFee: 10, shippingPaymentMode: ShippingPaymentMode.PAY_ON_DELIVERY })],
        [2, createMockSeller({ id: 2, shippingFee: 20, shippingPaymentMode: ShippingPaymentMode.PAY_ONLINE })],
      ]);

      setupIdempotentMocks(orders, sellerMap);

      const result = await service.recalculateBatchOrdersShipping(orders);

      // Verify values unchanged
      expect(result[0].shippingCost).toBe(0);
      expect(result[0].total).toBe(100);
      expect(result[1].shippingCost).toBe(20);
      expect(result[1].total).toBe(120);

      // save should NOT be called
      expect(orderRepository.save).not.toHaveBeenCalled();
    });
  });
});