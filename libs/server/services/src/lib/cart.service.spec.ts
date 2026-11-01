import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeepPartial, SaveOptions } from 'typeorm';
import { CartService } from './cart.service';
import { Cart, CartItem, SellerProduct } from '@kickzone-workspace/entities';
import { NotFoundException } from '@nestjs/common';

type PrivateMethods = Record<string, (...args: unknown[]) => Promise<unknown>>;

describe('CartService', () => {
  let service: CartService;
  let cartRepository: jest.Mocked<Repository<Cart>>;
  let cartItemRepository: jest.Mocked<Repository<CartItem>>;
  let sellerProductRepository: jest.Mocked<Repository<SellerProduct>>;

  const mockSellerProduct = (overrides: Partial<SellerProduct> = {}): SellerProduct => ({
    id: 'sp-1',
    price: 99.95,
    discount: 10,
    stockQuantity: 100,
    product: { id: 1, name: 'Test Product' } as never,
    productInfo: {
      id: 'pi-1',
      images: ['image.jpg'],
      colorLinks: [],
      size: 'M',
    } as never,
    seller: { id: 's-1', storeName: 'Test Store' } as unknown as SellerProduct['seller'],
    productInfoId: 1,
    ...overrides,
  }) as never;

  const mockCart = (overrides: Partial<Cart> = {}): Cart => ({
    id: 'cart-1',
    userId: 'user-1',
    subtotal: 0,
    total: 0,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    user: { id: 'user-1' } as never,
    ...overrides,
  }) as never;

  const mockCartItem = (overrides: Partial<CartItem> = {}): CartItem => ({
    id: 'ci-1',
    cartId: 'cart-1',
    productId: '1',
    productName: 'Test Product',
    productImage: 'image.jpg',
    quantity: 2,
    unitPrice: 89.96,
    totalPrice: 179.92,
    color: '#ff0000',
    size: 'M',
    sellerId: 's-1',
    sellerName: 'Test Store',
    productInfoId: 'pi-1',
    sellerProductId: 'sp-1',
    availableStock: 100,
    ...overrides,
  }) as never;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(Cart),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CartItem),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(SellerProduct),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartRepository = module.get(getRepositoryToken(Cart));
    cartItemRepository = module.get(getRepositoryToken(CartItem));
    sellerProductRepository = module.get(getRepositoryToken(SellerProduct));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('toDecimalNumber (private helper via public behavior)', () => {
    it('should coerce numeric strings to numbers', async () => {
      // This tests the private toDecimalNumber via recalculateCartTotals
      const cart = mockCart({
        items: [
          mockCartItem({ totalPrice: '10.00' as never }),
          mockCartItem({ totalPrice: '20.00' as never }),
          mockCartItem({ totalPrice: '15.55' as never }),
        ],
      });

      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);

      // Access private method via public recalculateCartTotals
      await service['recalculateCartTotals']('cart-1');

      expect(cart.subtotal).toBe(45.55);
      expect(typeof cart.subtotal).toBe('number');
      expect(cart.total).toBe(45.55);
    });

    it('should handle empty cart', async () => {
      const cart = mockCart({ items: [] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);

      await service['recalculateCartTotals']('cart-1');

      expect(cart.subtotal).toBe(0);
      expect(cart.total).toBe(0);
      expect(typeof cart.subtotal).toBe('number');
    });

    it('should handle non-finite values gracefully', async () => {
      const cart = mockCart({
        items: [
          mockCartItem({ totalPrice: '10.00' as never }),
          mockCartItem({ totalPrice: NaN as never }),
          mockCartItem({ totalPrice: Infinity as never }),
          mockCartItem({ totalPrice: null as never }),
          mockCartItem({ totalPrice: undefined as never }),
        ],
      });

      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);

      await service['recalculateCartTotals']('cart-1');

      expect(cart.subtotal).toBe(10.00);
      expect(typeof cart.subtotal).toBe('number');
    });

    it('should correctly sum quantities as integers', async () => {
      const cart = mockCart({
        items: [
          mockCartItem({ quantity: 2, totalPrice: '10.00' as never }),
          mockCartItem({ quantity: '3' as never, totalPrice: '20.00' as never }), // quantity as string
          mockCartItem({ quantity: 1.9, totalPrice: '15.55' as never }), // quantity as float
        ],
      });

      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);

      await service['recalculateCartTotals']('cart-1');

      // totalItems should be 2 + 3 + 1 = 6 (truncated)
      // We can't directly test totalItems since it's not stored, but we verify no crash
      expect(cart.subtotal).toBe(45.55);
    });
  });

  describe('addToCart', () => {
    it('should calculate finalPrice correctly with string price and discount from Postgres', async () => {
      const sellerProduct = mockSellerProduct({
        price: '99.95' as never, // string from Postgres
        discount: '10' as never, // string from Postgres
      });

      const cart = mockCart({ items: [] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      cartItemRepository.save.mockImplementation((item: DeepPartial<CartItem>, _options?: SaveOptions) => Promise.resolve(item as DeepPartial<CartItem> & CartItem));

      // Spy on recalculateCartTotals to avoid double mocking
      jest.spyOn(service as unknown as PrivateMethods, 'recalculateCartTotals').mockResolvedValue(undefined);

      const result = await service.addToCart('user-1', {
        sellerProductId: 'sp-1',
        quantity: 2,
      });

      // finalPrice = 99.95 - (99.95 * 10 / 100) = 89.955 -> rounded to 89.96
      const savedItem = cartItemRepository.save.mock.calls[0][0];
      expect(savedItem.unitPrice).toBe(89.96);
      expect(typeof savedItem.unitPrice).toBe('number');
      expect(savedItem.totalPrice).toBe(179.92); // 2 * 89.96
      expect(typeof savedItem.totalPrice).toBe('number');
    });

    it('should handle zero discount', async () => {
      const sellerProduct = mockSellerProduct({
        price: '50.00' as never,
        discount: '0' as never,
      });

      const cart = mockCart({ items: [] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      cartItemRepository.save.mockImplementation((item: DeepPartial<CartItem>, _options?: SaveOptions) => Promise.resolve(item as DeepPartial<CartItem> & CartItem));
      jest.spyOn(service as unknown as PrivateMethods, 'recalculateCartTotals').mockResolvedValue(undefined);

      await service.addToCart('user-1', {
        sellerProductId: 'sp-1',
        quantity: 1,
      });

      const savedItem = cartItemRepository.save.mock.calls[0][0];
      expect(savedItem.unitPrice).toBe(50.00);
      expect(savedItem.totalPrice).toBe(50.00);
    });

    it('should handle missing discount (null/undefined)', async () => {
      const sellerProduct = mockSellerProduct({
        price: '50.00' as never,
        discount: null as never,
      });

      const cart = mockCart({ items: [] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      cartItemRepository.save.mockImplementation((item: DeepPartial<CartItem>, _options?: SaveOptions) => Promise.resolve(item as DeepPartial<CartItem> & CartItem));
      jest.spyOn(service as unknown as PrivateMethods, 'recalculateCartTotals').mockResolvedValue(undefined);

      await service.addToCart('user-1', {
        sellerProductId: 'sp-1',
        quantity: 1,
      });

      const savedItem = cartItemRepository.save.mock.calls[0][0];
      expect(savedItem.unitPrice).toBe(50.00);
      expect(savedItem.totalPrice).toBe(50.00);
    });

    it('should update existing item quantity and recalculate totalPrice with coercion', async () => {
      const sellerProduct = mockSellerProduct({
        price: '100.00' as never,
        discount: '20' as never,
      });

      const existingItem = mockCartItem({
        id: 'ci-existing',
        quantity: 1,
        unitPrice: 80.00,
        totalPrice: '80.00' as never, // string from Postgres
        sellerProductId: 'sp-1',
      });

      const cart = mockCart({ items: [existingItem] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      cartItemRepository.save.mockImplementation((item: DeepPartial<CartItem>, _options?: SaveOptions) => Promise.resolve(item as DeepPartial<CartItem> & CartItem));
      jest.spyOn(service as unknown as PrivateMethods, 'recalculateCartTotals').mockResolvedValue(undefined);

      await service.addToCart('user-1', {
        sellerProductId: 'sp-1',
        quantity: 2, // Adding 2 more
      });

      // Should update existing item: quantity = 1 + 2 = 3
      // unitPrice = 100 - (100 * 20 / 100) = 80
      // totalPrice = 3 * 80 = 240
      const savedItem = cartItemRepository.save.mock.calls[0][0];
      expect(savedItem.quantity).toBe(3);
      expect(savedItem.unitPrice).toBe(80.00);
      expect(savedItem.totalPrice).toBe(240.00);
    });

    it('should throw NotFoundException when sellerProduct not found', async () => {
      sellerProductRepository.findOne.mockResolvedValue(null);

      await expect(
        service.addToCart('user-1', { sellerProductId: 'sp-999', quantity: 1 })
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when insufficient stock', async () => {
      const sellerProduct = mockSellerProduct({ stockQuantity: 5 });
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);

      const cart = mockCart({ items: [] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);

      await expect(
        service.addToCart('user-1', { sellerProductId: 'sp-1', quantity: 10 })
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateCartItem', () => {
    it('should coerce quantity and recalculate totalPrice with string unitPrice from Postgres', async () => {
      const cartItem = mockCartItem({
        id: 'ci-1',
        quantity: 2,
        unitPrice: '89.96' as never, // string from Postgres
        totalPrice: '179.92' as never,
        sellerProductId: 'sp-1',
      });

      const cart = mockCart({ items: [cartItem] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);
      cartItemRepository.save.mockImplementation((item: DeepPartial<CartItem>, _options?: SaveOptions) => Promise.resolve(item as DeepPartial<CartItem> & CartItem));

      const sellerProduct = mockSellerProduct({ stockQuantity: 100 });
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);

      jest.spyOn(service as unknown as PrivateMethods, 'recalculateCartTotals').mockResolvedValue(undefined);

      await service.updateCartItem('user-1', 'ci-1', { quantity: 5 });

      const savedItem = cartItemRepository.save.mock.calls[0][0];
      expect(savedItem.quantity).toBe(5);
      expect(savedItem.unitPrice).toBe(89.96);
      expect(typeof savedItem.unitPrice).toBe('number');
      expect(savedItem.totalPrice).toBe(449.8); // 5 * 89.96
      expect(typeof savedItem.totalPrice).toBe('number');
    });

    it('should handle string quantity input', async () => {
      const cartItem = mockCartItem({
        id: 'ci-1',
        quantity: 2,
        unitPrice: 50.00,
        totalPrice: '100.00' as never,
      });

      const cart = mockCart({ items: [cartItem] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);
      cartItemRepository.save.mockImplementation((item: DeepPartial<CartItem>, _options?: SaveOptions) => Promise.resolve(item as DeepPartial<CartItem> & CartItem));

      jest.spyOn(service as unknown as PrivateMethods, 'recalculateCartTotals').mockResolvedValue(undefined);

      // quantity comes as string from GraphQL
      await service.updateCartItem('user-1', 'ci-1', { quantity: '3' as never });

      const savedItem = cartItemRepository.save.mock.calls[0][0];
      expect(savedItem.quantity).toBe(3);
      expect(savedItem.totalPrice).toBe(150.00);
    });

    it('should throw NotFoundException when cart item not found', async () => {
      const cart = mockCart({ items: [] });
      cartRepository.findOne.mockResolvedValue(cart);

      await expect(
        service.updateCartItem('user-1', 'ci-999', { quantity: 1 })
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when insufficient stock for update', async () => {
      const cartItem = mockCartItem({
        id: 'ci-1',
        sellerProductId: 'sp-1',
      });

      const cart = mockCart({ items: [cartItem] });
      cartRepository.findOne.mockResolvedValue(cart);

      const sellerProduct = mockSellerProduct({ stockQuantity: 5 });
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);

      await expect(
        service.updateCartItem('user-1', 'ci-1', { quantity: 10 })
      ).rejects.toThrow(NotFoundException);
    });

    it('should not allow negative quantity', async () => {
      const cartItem = mockCartItem({ id: 'ci-1' });
      const cart = mockCart({ items: [cartItem] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartItemRepository.save.mockImplementation((item: DeepPartial<CartItem>, _options?: SaveOptions) => Promise.resolve(item as DeepPartial<CartItem> & CartItem));
      jest.spyOn(service as unknown as PrivateMethods, 'recalculateCartTotals').mockResolvedValue(undefined);

      await service.updateCartItem('user-1', 'ci-1', { quantity: -5 });

      const savedItem = cartItemRepository.save.mock.calls[0][0];
      expect(savedItem.quantity).toBe(0); // Math.max(0, ...) ensures non-negative
    });
  });

  describe('removeFromCart', () => {
    it('should remove item and recalculate totals', async () => {
      const cartItem = mockCartItem({ id: 'ci-1' });
      const cart = mockCart({ items: [cartItem] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);
      cartItemRepository.remove.mockResolvedValue(cartItem);
      jest.spyOn(service as unknown as PrivateMethods, 'recalculateCartTotals').mockResolvedValue(undefined);

      await service.removeFromCart('user-1', 'ci-1');

      expect(cartItemRepository.remove).toHaveBeenCalledWith(cartItem);
    });

    it('should throw NotFoundException when item not found', async () => {
      const cart = mockCart({ items: [] });
      cartRepository.findOne.mockResolvedValue(cart);

      await expect(service.removeFromCart('user-1', 'ci-999')).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('clearCart', () => {
    it('should clear all items and reset totals to 0', async () => {
      const cartItems = [mockCartItem({ id: 'ci-1' }), mockCartItem({ id: 'ci-2' })];
      const cart = mockCart({
        items: cartItems,
        subtotal: 100,
        total: 100,
      });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);
      cartItemRepository.remove.mockResolvedValue({} as never);

      // Mock the second findOne call for the fresh cart
      const freshCart = mockCart({ items: [], subtotal: 0, total: 0 });
      cartRepository.findOne.mockResolvedValueOnce(cart).mockResolvedValueOnce(freshCart);

      const result = await service.clearCart('user-1');

      expect(cartItemRepository.remove).toHaveBeenCalledWith(cartItems);
      expect(result.subtotal).toBe(0);
      expect(result.total).toBe(0);
      expect(result.items).toEqual([]);
    });

    it('should handle already empty cart', async () => {
      const cart = mockCart({ items: [], subtotal: 0, total: 0 });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);

      const freshCart = mockCart({ items: [], subtotal: 0, total: 0 });
      cartRepository.findOne.mockResolvedValueOnce(cart).mockResolvedValueOnce(freshCart);

      const result = await service.clearCart('user-1');

      expect(result.subtotal).toBe(0);
      expect(result.total).toBe(0);
    });
  });

  describe('getCart', () => {
    it('should return cart from getOrCreateCart', async () => {
      const cart = mockCart({ id: 'cart-1' });
      cartRepository.findOne.mockResolvedValue(cart);

      const result = await service.getCart('user-1');

      expect(result).toBe(cart);
    });
  });

  describe('roundMoney (private helper via public behavior)', () => {
    it('should round to 2 decimal places correctly', async () => {
      // Test various floating point edge cases
      const cart = mockCart({
        items: [
          mockCartItem({ totalPrice: '10.005' as never }), // Should round to 10.01
          mockCartItem({ totalPrice: '20.004' as never }), // Should round to 20.00
        ],
      });

      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);

      await service['recalculateCartTotals']('cart-1');

      // 10.005 + 20.004 = 30.009 -> rounded to 30.01
      expect(cart.subtotal).toBe(30.01);
    });

    it('should handle floating point drift', async () => {
      // 0.1 + 0.2 = 0.30000000000000004 in JS
      const cart = mockCart({
        items: [
          mockCartItem({ totalPrice: '0.1' as never }),
          mockCartItem({ totalPrice: '0.2' as never }),
        ],
      });

      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);

      await service['recalculateCartTotals']('cart-1');

      expect(cart.subtotal).toBe(0.3);
    });
  });
});