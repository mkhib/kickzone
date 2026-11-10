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
  ShippingPaymentMode,
} from '@kickzone-workspace/entities';
import { CreateOrderInput, UpdateOrderInput } from '@kickzone-workspace/inputs';

describe('OrderService - Price Tampering Security (E2E P1a)', () => {
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

  describe('createOrder - Price Spoofing Protection', () => {
    const baseCreateOrderInput: CreateOrderInput = {
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
          quantity: 2,
          unitPrice: 100,
          totalPrice: 200,
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
      shippingPaymentMode: ShippingPaymentMode.PAY_ON_DELIVERY,
    } as SellerInfo;

    const mockSavedOrder = {
      id: 'order-1',
      orderNumber: 'ORD-123',
      trackingNumber: 'KZ-20240101-ABC123',
      customerEmail: baseCreateOrderInput.customerEmail,
      customerPhone: baseCreateOrderInput.customerPhone,
      customerName: baseCreateOrderInput.customerName,
      shippingAddress: baseCreateOrderInput.shippingAddress,
      city: baseCreateOrderInput.city,
      state: baseCreateOrderInput.state,
      zipCode: baseCreateOrderInput.zipCode,
      country: baseCreateOrderInput.country,
      sellerId: baseCreateOrderInput.sellerId,
      status: OrderStatus.PENDING,
      stockReserved: false,
      subtotal: 0,
      shippingCost: 0,
      total: 0,
      sellerStoreName: mockSeller.storeName,
      sellerPhone: mockSeller.phone,
      sellerAddress: mockSeller.address,
      items: undefined,
      seller: mockSeller,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as Order;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('penny attack: client unitPrice 0.01 totalPrice 0.02 qty 2; catalog price 250 discount 10 stock 10; seller PAY_ON_DELIVERY -> item save unitPrice 225 totalPrice 450 originalPrice 250 discountPercentage 10; order save subtotal 450 total 450', async () => {
      const inputWithPennyPrice = {
        ...baseCreateOrderInput,
        items: [
          {
            ...baseCreateOrderInput.items[0],
            unitPrice: 0.01,
            totalPrice: 0.02,
          },
        ],
      };

      const sellerProductWithDiscount = {
        id: 'sp-1',
        price: 250,
        discount: 10,
        productInfoId: 1,
        stockQuantity: 10,
        seller: { id: 1 } as unknown as SellerProduct['seller'],
      } as SellerProduct;

      const orderWithoutItems = { ...mockSavedOrder, items: undefined } as unknown as typeof mockSavedOrder;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(sellerProductWithDiscount);
      orderRepository.save.mockResolvedValue({
        ...orderWithoutItems,
        subtotal: 450,
        total: 450,
      });
      orderItemRepository.save.mockImplementation(((items: unknown[]) =>
        Promise.resolve(items)) as never);

      const result = await service.createOrder(inputWithPennyPrice);

      expect(result.subtotal).toBe(450);
      expect(result.total).toBe(450);

      const savedOrderArg = orderRepository.save.mock.calls[0][0] as Order;
      expect(savedOrderArg.subtotal).toBe(450);
      expect(savedOrderArg.total).toBe(450);

      const savedItems = orderItemRepository.save.mock.calls[0][0] as OrderItem[];
      expect(savedItems[0].unitPrice).toBe(225);
      expect(savedItems[0].totalPrice).toBe(450);
      expect(savedItems[0].originalPrice).toBe(250);
      expect(savedItems[0].discountPercentage).toBe(10);
    });

    it('injected fields via `as unknown as CreateOrderInput` with subtotal/total 1, discountPercentage 99, stockReserved true -> saved subtotal/total still 450', async () => {
      const sellerProductWithDiscount = {
        id: 'sp-1',
        price: 250,
        discount: 10,
        productInfoId: 1,
        stockQuantity: 10,
        seller: { id: 1 } as unknown as SellerProduct['seller'],
      } as SellerProduct;

      const inputWithInjectedFields = {
        ...baseCreateOrderInput,
        subtotal: 1 as unknown as number,
        total: 1 as unknown as number,
        stockReserved: true as unknown as boolean,
        items: [
          {
            ...baseCreateOrderInput.items[0],
            unitPrice: 0.01,
            totalPrice: 0.02,
            discountPercentage: 99 as unknown as number,
          },
        ],
      };

      const orderWithoutItems = { ...mockSavedOrder, items: undefined } as unknown as typeof mockSavedOrder;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(sellerProductWithDiscount);
      orderRepository.save.mockResolvedValue({
        ...orderWithoutItems,
        subtotal: 450,
        total: 450,
      });
      orderItemRepository.save.mockImplementation(((items: unknown[]) =>
        Promise.resolve(items)) as never);

      const result = await service.createOrder(inputWithInjectedFields as CreateOrderInput);

      expect(result.subtotal).toBe(450);
      expect(result.total).toBe(450);
      expect(result.stockReserved).toBe(false);

      const savedOrderArg = orderRepository.save.mock.calls[0][0] as Order;
      expect(savedOrderArg.subtotal).toBe(450);
      expect(savedOrderArg.total).toBe(450);
      expect(savedOrderArg.stockReserved).toBe(false);

      const savedItems = orderItemRepository.save.mock.calls[0][0] as OrderItem[];
      expect(savedItems[0].unitPrice).toBe(225);
      expect(savedItems[0].totalPrice).toBe(450);
      expect(savedItems[0].originalPrice).toBe(250);
      expect(savedItems[0].discountPercentage).toBe(10);
    });

    it('rounding: catalog 33.33 discount 17 qty 3; client unitPrice 20 -> Assert unitPrice 27.66 totalPrice 82.98 subtotal 82.98', async () => {
      const inputWithRounding = {
        ...baseCreateOrderInput,
        items: [
          {
            ...baseCreateOrderInput.items[0],
            sellerProductId: 'sp-1',
            quantity: 3,
            unitPrice: 20,
            totalPrice: 60,
          },
        ],
      };

      const sellerProductRounding = {
        id: 'sp-1',
        price: 33.33,
        discount: 17,
        productInfoId: 1,
        stockQuantity: 10,
        seller: { id: 1 } as unknown as SellerProduct['seller'],
      } as SellerProduct;

      const orderWithoutItems = { ...mockSavedOrder, items: undefined } as unknown as typeof mockSavedOrder;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(sellerProductRounding);
      orderRepository.save.mockResolvedValue({
        ...orderWithoutItems,
        subtotal: 82.98,
        total: 82.98,
      });
      orderItemRepository.save.mockImplementation(((items: unknown[]) =>
        Promise.resolve(items)) as never);

      const result = await service.createOrder(inputWithRounding);

      expect(result.subtotal).toBe(82.98);
      expect(result.total).toBe(82.98);

      const savedItems = orderItemRepository.save.mock.calls[0][0] as OrderItem[];
      expect(savedItems[0].unitPrice).toBe(27.66);
      expect(savedItems[0].totalPrice).toBe(82.98);
      expect(savedItems[0].originalPrice).toBe(33.33);
      expect(savedItems[0].discountPercentage).toBe(17);
    });

    it('cross-seller: sellerId 1, product belongs to seller 2 -> BadRequestException `/Product .* does not belong to seller 1/`; no order/item save', async () => {
      const sellerProductWrongSeller = {
        id: 'sp-1',
        price: 250,
        discount: 10,
        productInfoId: 1,
        stockQuantity: 10,
        seller: { id: 2 } as unknown as SellerProduct['seller'],
      } as SellerProduct;

      const orderWithoutItems = { ...mockSavedOrder, items: undefined } as unknown as typeof mockSavedOrder;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(sellerProductWrongSeller);

      await expect(service.createOrder(baseCreateOrderInput)).rejects.toThrow(BadRequestException);
      await expect(service.createOrder(baseCreateOrderInput)).rejects.toThrow(
        /Product .* does not belong to seller 1/,
      );

      expect(orderRepository.save).not.toHaveBeenCalled();
      expect(orderItemRepository.save).not.toHaveBeenCalled();
    });

    it('split lines same sellerProductId stock 4, qtys 1+1+1+2 -> `Insufficient stock for product sp-1. Available: 4, Requested: 5` before save', async () => {
      const inputSplitLines = {
        ...baseCreateOrderInput,
        items: [
          { ...baseCreateOrderInput.items[0], sellerProductId: 'sp-1', quantity: 1, unitPrice: 100, totalPrice: 100 },
          { ...baseCreateOrderInput.items[0], sellerProductId: 'sp-1', quantity: 1, unitPrice: 100, totalPrice: 100 },
          { ...baseCreateOrderInput.items[0], sellerProductId: 'sp-1', quantity: 1, unitPrice: 100, totalPrice: 100 },
          { ...baseCreateOrderInput.items[0], sellerProductId: 'sp-1', quantity: 2, unitPrice: 100, totalPrice: 200 },
        ],
      };

      const sellerProductLowStock = {
        id: 'sp-1',
        price: 250,
        discount: 0,
        productInfoId: 1,
        stockQuantity: 4,
        seller: { id: 1 } as unknown as SellerProduct['seller'],
      } as SellerProduct;

      const orderWithoutItems = { ...mockSavedOrder, items: undefined } as unknown as typeof mockSavedOrder;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(sellerProductLowStock);

      await expect(service.createOrder(inputSplitLines)).rejects.toThrow(BadRequestException);
      await expect(service.createOrder(inputSplitLines)).rejects.toThrow(
        /Insufficient stock for product sp-1. Available: 4, Requested: 5/,
      );

      expect(orderRepository.save).not.toHaveBeenCalled();
      expect(orderItemRepository.save).not.toHaveBeenCalled();
    });

    it('qty 0,-1,1.25,NaN,Infinity -> `Quantity must be a positive integer for product`', async () => {
      const sellerProduct = {
        id: 'sp-1',
        price: 250,
        discount: 0,
        productInfoId: 1,
        stockQuantity: 10,
        seller: { id: 1 } as unknown as SellerProduct['seller'],
      } as SellerProduct;

      const orderWithoutItems = { ...mockSavedOrder, items: undefined } as unknown as typeof mockSavedOrder;
      orderRepository.create.mockReturnValue(orderWithoutItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);

      const invalidQuantities = [0, -1, 1.25, NaN, Infinity];

      for (const qty of invalidQuantities) {
        const inputInvalidQty = {
          ...baseCreateOrderInput,
          items: [{ ...baseCreateOrderInput.items[0], quantity: qty }],
        };

        await expect(service.createOrder(inputInvalidQty)).rejects.toThrow(BadRequestException);
        await expect(service.createOrder(inputInvalidQty)).rejects.toThrow(
          /Quantity must be a positive integer for product/,
        );
      }
    });
  });

  describe('updateOrder - Financial Rewrite Protection', () => {
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

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('PENDING + {subtotal:0.01}|{total:0.01}|{shippingCost:0}|{items:[]} (via unknown) -> `Order items and financial totals cannot be rewritten after order creation`; save not called', async () => {
      orderRepository.findOne.mockResolvedValue(existingOrder);

      const updateInputWithSubtotal = { subtotal: 0.01 } as unknown as UpdateOrderInput;
      const updateInputWithTotal = { total: 0.01 } as unknown as UpdateOrderInput;
      const updateInputWithShippingCost = { shippingCost: 0 } as unknown as UpdateOrderInput;
      const updateInputWithItems = { items: [] } as unknown as UpdateOrderInput;

      await expect(service.updateOrder(orderId, updateInputWithSubtotal)).rejects.toThrow(BadRequestException);
      await expect(service.updateOrder(orderId, updateInputWithSubtotal)).rejects.toThrow(
        'Order items and financial totals cannot be rewritten after order creation',
      );
      expect(orderRepository.save).not.toHaveBeenCalled();

      jest.clearAllMocks();
      orderRepository.findOne.mockResolvedValue(existingOrder);

      await expect(service.updateOrder(orderId, updateInputWithTotal)).rejects.toThrow(BadRequestException);
      await expect(service.updateOrder(orderId, updateInputWithTotal)).rejects.toThrow(
        'Order items and financial totals cannot be rewritten after order creation',
      );
      expect(orderRepository.save).not.toHaveBeenCalled();

      jest.clearAllMocks();
      orderRepository.findOne.mockResolvedValue(existingOrder);

      await expect(service.updateOrder(orderId, updateInputWithShippingCost)).rejects.toThrow(BadRequestException);
      await expect(service.updateOrder(orderId, updateInputWithShippingCost)).rejects.toThrow(
        'Order items and financial totals cannot be rewritten after order creation',
      );
      expect(orderRepository.save).not.toHaveBeenCalled();

      jest.clearAllMocks();
      orderRepository.findOne.mockResolvedValue(existingOrder);

      await expect(service.updateOrder(orderId, updateInputWithItems)).rejects.toThrow(BadRequestException);
      await expect(service.updateOrder(orderId, updateInputWithItems)).rejects.toThrow(
        'Order items and financial totals cannot be rewritten after order creation',
      );
      expect(orderRepository.save).not.toHaveBeenCalled();
    });

    it('notes update when status CONFIRMED/PROCESSING/SHIPPED/DELIVERED/CANCELLED/REFUNDED -> same BadRequestException', async () => {
      const statusesToTest: OrderStatus[] = [
        OrderStatus.CONFIRMED,
        OrderStatus.PROCESSING,
        OrderStatus.SHIPPED,
        OrderStatus.DELIVERED,
        OrderStatus.CANCELLED,
        OrderStatus.REFUNDED,
      ];

      for (const status of statusesToTest) {
        const orderWithStatus = { ...existingOrder, status };
        orderRepository.findOne.mockResolvedValue(orderWithStatus);

        const updateInputWithNotes: UpdateOrderInput = { notes: 'Updated notes' };

        await expect(service.updateOrder(orderId, updateInputWithNotes)).rejects.toThrow(BadRequestException);
        await expect(service.updateOrder(orderId, updateInputWithNotes)).rejects.toThrow(
          'Order items and financial totals cannot be rewritten after order creation',
        );
        expect(orderRepository.save).not.toHaveBeenCalled();

        jest.clearAllMocks();
      }
    });
  });
});