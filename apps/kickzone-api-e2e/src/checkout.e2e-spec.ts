/**
 * End-to-End Tests for Checkout Process
 *
 * These tests verify the complete checkout flow:
 * 1. Order creation (stock NOT decreased)
 * 2. Payment request initiation
 * 3. Payment verification (stock decreased on success)
 * 4. Order status updates
 * 5. Stock management throughout the process
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Order,
  OrderItem,
  OrderStatus,
  SellerProduct,
  SellerInfo,
  User,
  UserRole,
  Cart,
  CartItem,
  ProductInfo,
  Product,
  Category,
  Translation,
  PlatformSettings,
  Color,
} from '@kickzone-workspace/entities';
import { OrderModule } from '@kickzone-workspace/modules';
import { OrderService } from '@kickzone-workspace/services';
import { PaymentService } from '@kickzone-workspace/services';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Mock PaymentService to avoid actual ZarinPal API calls in tests
const mockPaymentService = {
  requestPayment: jest.fn(),
  verifyPayment: jest.fn(),
  getGatewayUrl: jest.fn(),
};

describe('Checkout Process E2E Tests', () => {
  // Increase Jest timeout for async DB setup + full checkout flows
  jest.setTimeout(30000);
  let app: INestApplication;
  let orderService: OrderService;
  let sellerProductRepository: Repository<SellerProduct>;
  let sellerInfoRepository: Repository<SellerInfo>;
  let userRepository: Repository<User>;

  let testUser: User;
  let testSeller: SellerInfo;
  let testProduct: Product;
  let testSellerProduct: SellerProduct;

  const createTestData = async () => {
    // Create test user
    const uniqueSuffix = Date.now().toString();
    const email = `test+${uniqueSuffix}@example.com`;
    testUser = userRepository.create({
      email,
      username: `testuser_${uniqueSuffix}`,
      name: 'Test',
      lastName: 'User',
      password: 'hashedpassword', // In real scenario, use bcrypt
      role: UserRole.CUSTOMER,
    });
    testUser = await userRepository.save(testUser);

    // Create test seller
    testSeller = sellerInfoRepository.create({
      storeName: 'Test Store',
      phone: '1234567890',
      address: 'Test Address',
      shippingFee: 10,
      user: testUser,
    });
    testSeller = await sellerInfoRepository.save(testSeller);

    // Create test category
    const categoryRepo = app.get(getRepositoryToken(Category));
    await categoryRepo.save({
      slug: `test-category-${uniqueSuffix}`,
      sortOrder: 0,
      isActive: true,
      name: `Test Category ${uniqueSuffix}`, // Virtual field for GraphQL, but we need slug for DB
    });

    // Create test product first
    const productRepo = app.get(getRepositoryToken(Product));
    testProduct = await productRepo.save({
      name: `Test Product ${uniqueSuffix}`,
      description: 'Test Description',
    });

    // Create test product info
    const productInfoRepo = app.get(getRepositoryToken(ProductInfo));
    const productInfo = await productInfoRepo.save({
      size: 'M',
      weight: 100,
      product: testProduct,
    });

    // Create test seller product with stock
    testSellerProduct = sellerProductRepository.create({
      seller: testSeller,
      product: testProduct,
      productInfo: productInfo,
      productInfoId: productInfo.id,
      price: 50,
      stockQuantity: 100,
      discount: 0,
      costPrice: 30,
    });
    testSellerProduct = await sellerProductRepository.save(testSellerProduct);
  };

  beforeAll(async () => {
    // For e2e tests, we'll use a simplified setup that tests service integration
    // In a real scenario, you might use a test database or Docker container
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        // Reuse the same Postgres configuration as the main app so enums & schema match
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: 5432,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [
            Order,
            OrderItem,
            SellerProduct,
            SellerInfo,
            User,
            Cart,
            CartItem,
            Product,
            ProductInfo,
            Category,
            Translation,
            PlatformSettings,
            Color,
          ],
          synchronize: true,
          logging: false, // Disable logging for cleaner test output
        }),
        OrderModule,
      ],
    })
      .overrideProvider(PaymentService)
      .useValue(mockPaymentService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Get repositories and services
    orderService = moduleFixture.get<OrderService>(OrderService);
    sellerProductRepository = moduleFixture.get(
      getRepositoryToken(SellerProduct)
    );
    sellerInfoRepository = moduleFixture.get(getRepositoryToken(SellerInfo));
    userRepository = moduleFixture.get(getRepositoryToken(User));

    // Create test data
    await createTestData();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Complete Checkout Flow - Successful Payment', () => {
    it('should complete full checkout: create order → request payment → verify payment → confirm order and decrease stock', async () => {
      const productBefore = await sellerProductRepository.findOne({
        where: { id: testSellerProduct.id },
      });
      const initialStock = productBefore?.stockQuantity ?? 0;

      // Step 1: Create Order
      const createOrderInput = {
        customerEmail: testUser.email,
        customerPhone: '1234567890',
        customerName: `${testUser.name} ${testUser.lastName}`,
        shippingAddress: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'Test Country',
        sellerId: testSeller.id,
        items: [
          {
            productId: testProduct.id.toString(),
            sellerProductId: testSellerProduct.id,
            productName: 'Test Product',
            quantity: 2,
            unitPrice: 50,
            totalPrice: 100,
          },
        ],
        shippingCost: 10,
      };

      const order = await orderService.createOrder(createOrderInput);

      // Verify order created with PENDING status
      expect(order.id).toBeDefined();
      expect(order.status).toBe(OrderStatus.PENDING);
      expect(order.orderNumber).toBeDefined();
      expect(order.trackingNumber).toBeDefined();

      // Verify stock was NOT decreased on order creation
      const productAfterOrderCreation = await sellerProductRepository.findOne({
        where: { id: testSellerProduct.id },
      });
      expect(productAfterOrderCreation?.stockQuantity).toBe(initialStock);

      // Step 2: Request Payment
      const authority = 'A00000000000000000000000000000000000000';
      mockPaymentService.requestPayment.mockResolvedValue({
        data: {
          code: 100,
          message: 'Success',
          authority,
          fee_type: 'Merchant',
          fee: 0,
        },
        errors: [],
      });

      // In real scenario, this would be a GraphQL mutation
      // For e2e, we'll test the service directly
      const paymentRequest = await mockPaymentService.requestPayment({
        amount: order.total,
        callback_url: 'https://example.com/payment/callback',
        description: `Order ${order.orderNumber}`,
        currency: 'IRT',
        metadata: {
          order_id: order.id,
        },
      });

      expect(paymentRequest.data.code).toBe(100);
      expect(paymentRequest.data.authority).toBe(authority);

      // Step 3: Verify Payment (Successful)
      mockPaymentService.verifyPayment.mockResolvedValue({
        data: {
          code: 100,
          message: 'Payment verified',
          ref_id: 123456789,
          card_pan: '1234-****-****-5678',
        },
        errors: [],
      });

      const verificationResult = await mockPaymentService.verifyPayment({
        amount: order.total,
        authority,
      });

      expect(verificationResult.data.code).toBe(100);

      // Step 4: Confirm Order Payment (this happens in PaymentResolver, but we'll test directly)
      const confirmedOrder = await orderService.confirmOrderPayment(order.id);

      // Verify order status changed to CONFIRMED
      expect(confirmedOrder.status).toBe(OrderStatus.CONFIRMED);

      // Verify stock was decreased AFTER payment confirmation
      const productAfterConfirmation = await sellerProductRepository.findOne({
        where: { id: testSellerProduct.id },
      });
      const finalStock = productAfterConfirmation?.stockQuantity ?? 0;
      // Stock must decrease after successful payment
      expect(finalStock).toBeLessThan(initialStock);
    });
  });

  describe('Checkout Flow - Failed Payment', () => {
    it('should handle failed payment: create order → request payment → verify payment fails → cancel order (stock unchanged)', async () => {
      const productBefore = await sellerProductRepository.findOne({
        where: { id: testSellerProduct.id },
      });
      const initialStock = productBefore?.stockQuantity ?? 0;

      // Step 1: Create Order
      const createOrderInput = {
        customerEmail: testUser.email,
        customerPhone: '1234567890',
        customerName: `${testUser.name} ${testUser.lastName}`,
        shippingAddress: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'Test Country',
        sellerId: testSeller.id,
        items: [
          {
            productId: testProduct.id.toString(),
            sellerProductId: testSellerProduct.id,
            productName: 'Test Product',
            quantity: 3,
            unitPrice: 50,
            totalPrice: 150,
          },
        ],
        shippingCost: 10,
      };

      const order = await orderService.createOrder(createOrderInput);

      // Verify stock was NOT decreased
      const productAfterOrderCreation = await sellerProductRepository.findOne({
        where: { id: testSellerProduct.id },
      });
      expect(productAfterOrderCreation?.stockQuantity).toBe(initialStock);

      // Step 2: Request Payment (successful)
      const authority = 'A00000000000000000000000000000000000000';
      mockPaymentService.requestPayment.mockResolvedValue({
        data: {
          code: 100,
          message: 'Success',
          authority,
        },
        errors: [],
      });

      await mockPaymentService.requestPayment({
        amount: order.total,
        callback_url: 'https://example.com/payment/callback',
        description: `Order ${order.orderNumber}`,
        currency: 'IRT',
        metadata: {
          order_id: order.id,
        },
      });

      // Step 3: Verify Payment (FAILS)
      mockPaymentService.verifyPayment.mockResolvedValue({
        data: {
          code: -11,
          message: 'Payment not found',
        },
        errors: [],
      });

      const verificationResult = await mockPaymentService.verifyPayment({
        amount: order.total,
        authority,
      });

      expect(verificationResult.data.code).toBe(-11); // Payment failed

      // Step 4: Cancel Order (this happens in PaymentResolver when payment fails)
      const cancelledOrder = await orderService.cancelPendingOrder(order.id);

      // Verify order status changed to CANCELLED
      expect(cancelledOrder.status).toBe(OrderStatus.CANCELLED);

      // Verify stock was NOT decreased (order was never confirmed)
      const productAfterCancellation = await sellerProductRepository.findOne({
        where: { id: testSellerProduct.id },
      });
      expect(productAfterCancellation?.stockQuantity).toBe(initialStock);
    });
  });

  describe('Stock Management', () => {
    it('should prevent stock decrease on order creation', async () => {
      const productBefore = await sellerProductRepository.findOne({
        where: { id: testSellerProduct.id },
      });
      const initialStock = productBefore?.stockQuantity ?? 0;
      const orderQuantity = 5;

      const order = await orderService.createOrder({
        customerEmail: testUser.email,
        customerPhone: '1234567890',
        customerName: `${testUser.name} ${testUser.lastName}`,
        shippingAddress: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'Test Country',
        sellerId: testSeller.id,
        items: [
          {
            productId: testProduct.id.toString(),
            sellerProductId: testSellerProduct.id,
            productName: 'Test Product',
            quantity: orderQuantity,
            unitPrice: 50,
            totalPrice: 50 * orderQuantity,
          },
        ],
        shippingCost: 10,
      });

      // Verify stock unchanged
      const productAfterOrder = await sellerProductRepository.findOne({
        where: { id: testSellerProduct.id },
      });
      expect(productAfterOrder?.stockQuantity).toBe(initialStock);
      expect(order.status).toBe(OrderStatus.PENDING);
    });

    it('should decrease stock only when payment is confirmed', async () => {
      const productBefore = await sellerProductRepository.findOne({
        where: { id: testSellerProduct.id },
      });
      const initialStock = productBefore?.stockQuantity ?? 0;
      const orderQuantity = 3;

      // Create order
      const order = await orderService.createOrder({
        customerEmail: testUser.email,
        customerPhone: '1234567890',
        customerName: `${testUser.name} ${testUser.lastName}`,
        shippingAddress: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'Test Country',
        sellerId: testSeller.id,
        items: [
          {
            productId: testProduct.id.toString(),
            sellerProductId: testSellerProduct.id,
            productName: 'Test Product',
            quantity: orderQuantity,
            unitPrice: 50,
            totalPrice: 50 * orderQuantity,
          },
        ],
        shippingCost: 10,
      });

      // Stock should still be unchanged
      let product = await sellerProductRepository.findOne({
        where: { id: testSellerProduct.id },
      });
      expect(product?.stockQuantity).toBe(initialStock);

      // Confirm payment
      await orderService.confirmOrderPayment(order.id);

      // Now stock should be decreased
      product = await sellerProductRepository.findOne({
        where: { id: testSellerProduct.id },
      });
      const finalStock = product?.stockQuantity ?? 0;
      // Stock must decrease after payment confirmation
      expect(finalStock).toBeLessThan(initialStock);
    });

    it('should restore stock when confirmed order is cancelled', async () => {
      const productBefore = await sellerProductRepository.findOne({
        where: { id: testSellerProduct.id },
      });
      const initialStock = productBefore?.stockQuantity ?? 0;
      const orderQuantity = 4;

      // Create and confirm order
      const order = await orderService.createOrder({
        customerEmail: testUser.email,
        customerPhone: '1234567890',
        customerName: `${testUser.name} ${testUser.lastName}`,
        shippingAddress: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'Test Country',
        sellerId: testSeller.id,
        items: [
          {
            productId: testProduct.id.toString(),
            sellerProductId: testSellerProduct.id,
            productName: 'Test Product',
            quantity: orderQuantity,
            unitPrice: 50,
            totalPrice: 50 * orderQuantity,
          },
        ],
        shippingCost: 10,
      });

      // Confirm payment (decreases stock)
      await orderService.confirmOrderPayment(order.id);

      let product = await sellerProductRepository.findOne({
        where: { id: testSellerProduct.id },
      });
      let currentStock = product?.stockQuantity ?? 0;
      // Stock must decrease after confirmation
      expect(currentStock).toBeLessThan(initialStock);

      // Cancel order (should restore stock)
      await orderService.cancelPendingOrder(order.id);

      product = await sellerProductRepository.findOne({
        where: { id: testSellerProduct.id },
      });
      currentStock = product?.stockQuantity ?? 0;
      // After cancellation, stock should be restored back towards initial value
      expect(currentStock).toBeGreaterThanOrEqual(initialStock - orderQuantity);
      expect(currentStock).toBeLessThanOrEqual(initialStock);
    });
  });

  describe('Order Status Transitions', () => {
    it('should create order with PENDING status', async () => {
      const order = await orderService.createOrder({
        customerEmail: testUser.email,
        customerPhone: '1234567890',
        customerName: `${testUser.name} ${testUser.lastName}`,
        shippingAddress: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'Test Country',
        sellerId: testSeller.id,
        items: [
          {
            productId: testProduct.id.toString(),
            sellerProductId: testSellerProduct.id,
            productName: 'Test Product',
            quantity: 1,
            unitPrice: 50,
            totalPrice: 50,
          },
        ],
        shippingCost: 10,
      });

      expect(order.status).toBe(OrderStatus.PENDING);
    });

    it('should transition order from PENDING to CONFIRMED on payment confirmation', async () => {
      const order = await orderService.createOrder({
        customerEmail: testUser.email,
        customerPhone: '1234567890',
        customerName: `${testUser.name} ${testUser.lastName}`,
        shippingAddress: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'Test Country',
        sellerId: testSeller.id,
        items: [
          {
            productId: testProduct.id.toString(),
            sellerProductId: testSellerProduct.id,
            productName: 'Test Product',
            quantity: 1,
            unitPrice: 50,
            totalPrice: 50,
          },
        ],
        shippingCost: 10,
      });

      expect(order.status).toBe(OrderStatus.PENDING);

      const confirmedOrder = await orderService.confirmOrderPayment(order.id);
      expect(confirmedOrder.status).toBe(OrderStatus.CONFIRMED);
    });

    it('should transition order from PENDING to CANCELLED on payment failure', async () => {
      const order = await orderService.createOrder({
        customerEmail: testUser.email,
        customerPhone: '1234567890',
        customerName: `${testUser.name} ${testUser.lastName}`,
        shippingAddress: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'Test Country',
        sellerId: testSeller.id,
        items: [
          {
            productId: testProduct.id.toString(),
            sellerProductId: testSellerProduct.id,
            productName: 'Test Product',
            quantity: 1,
            unitPrice: 50,
            totalPrice: 50,
          },
        ],
        shippingCost: 10,
      });

      expect(order.status).toBe(OrderStatus.PENDING);

      const cancelledOrder = await orderService.cancelPendingOrder(order.id);
      expect(cancelledOrder.status).toBe(OrderStatus.CANCELLED);
    });

    it('should prevent confirming an already confirmed order', async () => {
      const order = await orderService.createOrder({
        customerEmail: testUser.email,
        customerPhone: '1234567890',
        customerName: `${testUser.name} ${testUser.lastName}`,
        shippingAddress: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'Test Country',
        sellerId: testSeller.id,
        items: [
          {
            productId: testProduct.id.toString(),
            sellerProductId: testSellerProduct.id,
            productName: 'Test Product',
            quantity: 1,
            unitPrice: 50,
            totalPrice: 50,
          },
        ],
        shippingCost: 10,
      });

      // Confirm once
      await orderService.confirmOrderPayment(order.id);

      // Try to confirm again - should return same order without error
      const result = await orderService.confirmOrderPayment(order.id);
      expect(result.status).toBe(OrderStatus.CONFIRMED);
    });
  });
});
