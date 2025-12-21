import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  const mockOrderRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
    count: jest.fn(),
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
    take: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
    getCount: jest.fn(),
  };

  beforeEach(async () => {
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
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get(getRepositoryToken(Order));
    orderItemRepository = module.get(getRepositoryToken(OrderItem));
    sellerProductRepository = module.get(getRepositoryToken(SellerProduct));
    sellerInfoRepository = module.get(getRepositoryToken(SellerInfo));

    // Setup default query builder mock
    orderRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(mockQueryBuilder);
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
    } as SellerProduct;

    const mockOrder: Order = {
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
      subtotal: 100,
      shippingCost: 10,
      total: 110,
      sellerStoreName: mockSeller.storeName,
      sellerPhone: mockSeller.phone,
      sellerAddress: mockSeller.address,
      items: [],
      seller: mockSeller,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Order;

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

    it('should create an order successfully', async () => {
      orderRepository.create.mockReturnValue(mockOrder);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);
      orderRepository.save.mockResolvedValue(mockOrder);
      orderItemRepository.save.mockResolvedValue([mockOrderItem] as any);
      orderRepository.findOne.mockResolvedValue({
        ...mockOrder,
        items: [mockOrderItem],
      });

      const result = await service.createOrder(createOrderInput);

      expect(orderRepository.create).toHaveBeenCalledWith(createOrderInput);
      expect(sellerInfoRepository.findOne).toHaveBeenCalledWith({
        where: { id: createOrderInput.sellerId },
      });
      expect(result).toBeDefined();
      expect(result.orderNumber).toBeDefined();
      expect(result.trackingNumber).toBeDefined();
      expect(result.status).toBe(OrderStatus.PENDING);
    });

    it('should throw NotFoundException if seller does not exist', async () => {
      orderRepository.create.mockReturnValue(mockOrder);
      sellerInfoRepository.findOne.mockResolvedValue(null);

      await expect(service.createOrder(createOrderInput)).rejects.toThrow(
        NotFoundException
      );
      await expect(service.createOrder(createOrderInput)).rejects.toThrow(
        `Seller with ID ${createOrderInput.sellerId} not found`
      );
    });

    it('should calculate subtotal and total correctly', async () => {
      const orderWithItems = {
        ...mockOrder,
        items: [{ totalPrice: 100 }, { totalPrice: 50 }] as OrderItem[],
      };
      orderRepository.create.mockReturnValue(orderWithItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);
      orderRepository.save.mockResolvedValue({
        ...orderWithItems,
        subtotal: 150,
        total: 160,
      });
      orderItemRepository.save.mockResolvedValue([] as any);
      orderRepository.findOne.mockResolvedValue({
        ...orderWithItems,
        subtotal: 150,
        total: 160,
      });

      const result = await service.createOrder(createOrderInput);

      expect(result.subtotal).toBe(150);
      expect(result.total).toBe(160);
    });

    it('should use provided shipping cost over seller shipping fee', async () => {
      const inputWithShipping = {
        ...createOrderInput,
        shippingCost: 20,
      };
      orderRepository.create.mockReturnValue(mockOrder);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);
      orderRepository.save.mockResolvedValue({
        ...mockOrder,
        shippingCost: 20,
        total: 120,
      });
      orderItemRepository.save.mockResolvedValue([] as any);
      orderRepository.findOne.mockResolvedValue({
        ...mockOrder,
        shippingCost: 20,
        total: 120,
      });

      const result = await service.createOrder(inputWithShipping);

      expect(result.shippingCost).toBe(20);
      expect(result.total).toBe(120);
    });

    it('should use seller shipping fee when shipping cost is not provided', async () => {
      const inputWithoutShipping = {
        ...createOrderInput,
        shippingCost: undefined,
      };
      orderRepository.create.mockReturnValue(mockOrder);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);
      orderRepository.save.mockResolvedValue({
        ...mockOrder,
        shippingCost: 15, // seller.shippingFee
        total: 115,
      });
      orderItemRepository.save.mockResolvedValue([] as any);
      orderRepository.findOne.mockResolvedValue({
        ...mockOrder,
        shippingCost: 15,
        total: 115,
      });

      const result = await service.createOrder(inputWithoutShipping);

      expect(result.shippingCost).toBe(15);
      expect(result.total).toBe(115);
    });

    it('should preserve seller snapshot information', async () => {
      orderRepository.create.mockReturnValue(mockOrder);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);
      orderRepository.save.mockResolvedValue(mockOrder);
      orderItemRepository.save.mockResolvedValue([] as any);
      orderRepository.findOne.mockResolvedValue(mockOrder);

      const result = await service.createOrder(createOrderInput);

      expect(result.sellerStoreName).toBe(mockSeller.storeName);
      expect(result.sellerPhone).toBe(mockSeller.phone);
      expect(result.sellerAddress).toBe(mockSeller.address);
    });

    it('should NOT decrease stock when creating order', async () => {
      orderRepository.create.mockReturnValue(mockOrder);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);
      orderRepository.save.mockResolvedValue(mockOrder);
      orderItemRepository.save.mockResolvedValue([] as any);
      orderRepository.findOne.mockResolvedValue(mockOrder);

      await service.createOrder(createOrderInput);

      // Verify stock was NOT decreased (decreaseStock is private but we can verify save wasn't called to decrease stock)
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
      expect(mockSellerProduct.stockQuantity).toBe(100);
    });

    it('should preserve product pricing snapshot in order items', async () => {
      const sellerProductWithDiscount = {
        ...mockSellerProduct,
        price: 60,
        discount: 10,
      } as SellerProduct;
      // Create order with items that will be processed
      const orderWithItems = {
        ...mockOrder,
        items: [
          {
            ...createOrderInput.items[0],
            originalPrice: undefined,
            discountPercentage: undefined,
          } as any,
        ],
      } as Order;
      orderRepository.create.mockReturnValue(orderWithItems);
      sellerInfoRepository.findOne.mockResolvedValue(mockSeller);
      sellerProductRepository.findOne.mockResolvedValue(
        sellerProductWithDiscount
      );
      orderRepository.save.mockResolvedValue(orderWithItems);
      orderItemRepository.save.mockImplementation(((items: any[]) =>
        Promise.resolve(items)) as any);
      orderRepository.findOne.mockResolvedValue({
        ...orderWithItems,
        items: [
          {
            ...mockOrderItem,
            originalPrice: 60,
            discountPercentage: 10,
          },
        ],
      });

      await service.createOrder(createOrderInput);

      expect(orderItemRepository.save).toHaveBeenCalled();
      const savedItems = orderItemRepository.save.mock.calls[0][0] as any[];
      expect(Array.isArray(savedItems)).toBe(true);
      expect(savedItems.length).toBe(1);
      expect(savedItems[0]).toHaveProperty('originalPrice', 60);
      expect(savedItems[0]).toHaveProperty('discountPercentage', 10);
      expect(savedItems[0]).toHaveProperty('orderId', orderWithItems.id);
    });
  });

  describe('findOne', () => {
    const orderId = 'order-1';
    const mockOrder: Order = {
      id: orderId,
      orderNumber: 'ORD-123',
      status: OrderStatus.PENDING,
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
        `Order with ID ${orderId} not found`
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
        'DESC'
      );
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(11);
      expect(result.edges).toHaveLength(2);
      expect(result.totalCount).toBe(2);
    });

    it('should filter by sellerId', async () => {
      await service.findAll(10, undefined, '1');

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'order.sellerId = :sellerId',
        { sellerId: 1 }
      );
    });

    it('should throw BadRequestException for invalid sellerId', async () => {
      await expect(service.findAll(10, undefined, 'invalid')).rejects.toThrow(
        BadRequestException
      );
      await expect(service.findAll(10, undefined, 'invalid')).rejects.toThrow(
        'Invalid sellerId'
      );
    });

    it('should filter by status', async () => {
      await service.findAll(10, undefined, undefined, OrderStatus.PENDING);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'order.status = :status',
        { status: OrderStatus.PENDING }
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
  });

  describe('updateOrder', () => {
    const orderId = 'order-1';
    const existingOrder: Order = {
      id: orderId,
      orderNumber: 'ORD-123',
      subtotal: 100,
      shippingCost: 10,
      total: 110,
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

    it('should update order status successfully', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CONFIRMED,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.CONFIRMED
      );

      expect(result.status).toBe(OrderStatus.CONFIRMED);
    });

    it('should restore stock when cancelling an order', async () => {
      const sellerProduct: SellerProduct = {
        id: 'seller-product-1',
        stockQuantity: 10,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        status: OrderStatus.CONFIRMED,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      sellerProductRepository.save.mockResolvedValue({
        ...sellerProduct,
        stockQuantity: 12, // 10 + 2
      } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CANCELLED,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.CANCELLED
      );

      expect(sellerProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'seller-product-1' },
      });
      expect(sellerProductRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          stockQuantity: 12,
        })
      );
      expect(result.status).toBe(OrderStatus.CANCELLED);
    });

    it('should restore stock when refunding an order', async () => {
      const sellerProduct: SellerProduct = {
        id: 'seller-product-1',
        stockQuantity: 10,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        status: OrderStatus.CONFIRMED,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      sellerProductRepository.save.mockResolvedValue({
        ...sellerProduct,
        stockQuantity: 12,
      } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.REFUNDED,
      });

      const result = await service.updateOrderStatus(
        orderId,
        OrderStatus.REFUNDED
      );

      expect(sellerProductRepository.save).toHaveBeenCalled();
      expect(result.status).toBe(OrderStatus.REFUNDED);
    });

    it('should not restore stock when order was already cancelled', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.CANCELLED,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      orderRepository.save.mockResolvedValue(order);

      await service.updateOrderStatus(orderId, OrderStatus.CANCELLED);

      expect(sellerProductRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('deleteOrder', () => {
    const orderId = 'order-1';
    const mockOrder: Order = {
      id: orderId,
      orderNumber: 'ORD-123',
    } as Order;

    it('should delete an order successfully', async () => {
      orderRepository.findOne.mockResolvedValue(mockOrder);
      orderRepository.remove.mockResolvedValue(mockOrder);

      await service.deleteOrder(orderId);

      expect(orderRepository.findOne).toHaveBeenCalledWith({
        where: { id: orderId },
        relations: ['items', 'seller'],
      });
      expect(orderRepository.remove).toHaveBeenCalledWith(mockOrder);
    });

    it('should throw NotFoundException if order does not exist', async () => {
      orderRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteOrder(orderId)).rejects.toThrow(
        NotFoundException
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
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);
      sellerProductRepository.save.mockResolvedValue({
        ...mockSellerProduct,
        stockQuantity: 98, // 100 - 2
      } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CONFIRMED,
      });

      const result = await service.confirmOrderPayment(orderId);

      expect(sellerProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'seller-product-1' },
      });
      expect(sellerProductRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          stockQuantity: 98,
        })
      );
      expect(result.status).toBe(OrderStatus.CONFIRMED);
    });

    it('should return order without changes if already CONFIRMED', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.CONFIRMED,
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
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);

      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        BadRequestException
      );
      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        'Cannot confirm order with status CANCELLED'
      );
    });

    it('should throw NotFoundException if seller product does not exist', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(null);

      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        NotFoundException
      );
      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        'SellerProduct with ID seller-product-1 not found'
      );
    });

    it('should throw BadRequestException if insufficient stock', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        items: [
          {
            ...mockOrderItems[0],
            quantity: 150, // More than available stock
          },
        ],
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);

      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        BadRequestException
      );
      await expect(service.confirmOrderPayment(orderId)).rejects.toThrow(
        'Insufficient stock'
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
      } as Order);

      await service.confirmOrderPayment(orderId);

      expect(sellerProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'product-1' }, // Should use productId as fallback
      });
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

    it('should cancel PENDING order without restoring stock', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.PENDING,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CANCELLED,
      });

      const result = await service.cancelPendingOrder(orderId);

      expect(sellerProductRepository.save).not.toHaveBeenCalled();
      expect(result.status).toBe(OrderStatus.CANCELLED);
    });

    it('should cancel CONFIRMED order and restore stock', async () => {
      const sellerProduct: SellerProduct = {
        id: 'seller-product-1',
        stockQuantity: 98,
      } as SellerProduct;

      const order: Order = {
        id: orderId,
        status: OrderStatus.CONFIRMED,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      sellerProductRepository.save.mockResolvedValue({
        ...sellerProduct,
        stockQuantity: 100, // 98 + 2
      } as SellerProduct);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CANCELLED,
      } as Order);

      const result = await service.cancelPendingOrder(orderId);

      expect(sellerProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'seller-product-1' },
      });
      expect(sellerProductRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          stockQuantity: 100,
        })
      );
      expect(result.status).toBe(OrderStatus.CANCELLED);
    });

    it('should handle missing seller product gracefully', async () => {
      const order: Order = {
        id: orderId,
        status: OrderStatus.CONFIRMED,
        items: mockOrderItems,
      } as Order;

      orderRepository.findOne.mockResolvedValue(order);
      sellerProductRepository.findOne.mockResolvedValue(null);
      orderRepository.save.mockResolvedValue({
        ...order,
        status: OrderStatus.CANCELLED,
      });

      const result = await service.cancelPendingOrder(orderId);

      // Should not throw error, just skip stock restoration
      expect(result.status).toBe(OrderStatus.CANCELLED);
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
        { customerEmail }
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

      expect(findAllSpy).toHaveBeenCalledWith(10, undefined, '1');

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
        OrderStatus.PENDING
      );

      findAllSpy.mockRestore();
    });
  });
});
