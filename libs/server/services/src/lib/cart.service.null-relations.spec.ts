import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeepPartial, SaveOptions } from 'typeorm';
import { CartService } from './cart.service';
import { Cart, CartItem, SellerProduct } from '@kickzone-workspace/entities';
import { NotFoundException } from '@nestjs/common';

type PrivateMethods = Record<string, (...args: unknown[]) => Promise<unknown>>;

describe('CartService - null relation guards', () => {
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

  describe('addToCart with missing product relation', () => {
    it('should reject with NotFoundException when sellerProduct.product is null', async () => {
      const sellerProduct = mockSellerProduct({ product: null as never });

      const cart = mockCart({ items: [] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      cartItemRepository.save.mockImplementation((item: DeepPartial<CartItem>, _options?: SaveOptions) => Promise.resolve(item as DeepPartial<CartItem> & CartItem));
      jest.spyOn(service as unknown as PrivateMethods, 'recalculateCartTotals').mockResolvedValue(undefined);

      await expect(
        service.addToCart('user-1', { sellerProductId: 'sp-1', quantity: 1 })
      ).rejects.toThrow(NotFoundException);

      await expect(
        service.addToCart('user-1', { sellerProductId: 'sp-1', quantity: 1 })
      ).rejects.toThrow('Product for SellerProduct sp-1 not found');

      // Verify it's not a TypeError
      try {
        await service.addToCart('user-1', { sellerProductId: 'sp-1', quantity: 1 });
      } catch (e) {
        expect(e).not.toBeInstanceOf(TypeError);
        expect(e).toBeInstanceOf(NotFoundException);
      }

      // cartItemRepository.save should NOT be called
      expect(cartItemRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('addToCart with missing seller relation', () => {
    it('should reject with NotFoundException when sellerProduct.seller is null', async () => {
      const sellerProduct = mockSellerProduct({ seller: null as never });

      const cart = mockCart({ items: [] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      cartItemRepository.save.mockImplementation((item: DeepPartial<CartItem>, _options?: SaveOptions) => Promise.resolve(item as DeepPartial<CartItem> & CartItem));
      jest.spyOn(service as unknown as PrivateMethods, 'recalculateCartTotals').mockResolvedValue(undefined);

      await expect(
        service.addToCart('user-1', { sellerProductId: 'sp-1', quantity: 1 })
      ).rejects.toThrow(NotFoundException);

      await expect(
        service.addToCart('user-1', { sellerProductId: 'sp-1', quantity: 1 })
      ).rejects.toThrow('Seller for SellerProduct sp-1 not found');

      // Verify it's not a TypeError
      try {
        await service.addToCart('user-1', { sellerProductId: 'sp-1', quantity: 1 });
      } catch (e) {
        expect(e).not.toBeInstanceOf(TypeError);
        expect(e).toBeInstanceOf(NotFoundException);
      }

      // cartItemRepository.save should NOT be called
      expect(cartItemRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('addToCart with valid product and seller', () => {
    it('should add item successfully when both product and seller are present', async () => {
      const sellerProduct = mockSellerProduct({ stockQuantity: 100 });

      const cart = mockCart({ items: [] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      cartItemRepository.save.mockImplementation((item: DeepPartial<CartItem>, _options?: SaveOptions) => Promise.resolve(item as DeepPartial<CartItem> & CartItem));
      jest.spyOn(service as unknown as PrivateMethods, 'recalculateCartTotals').mockResolvedValue(undefined);

      const result = await service.addToCart('user-1', {
        sellerProductId: 'sp-1',
        quantity: 1,
      });

      // cartItemRepository.save should be called
      expect(cartItemRepository.save).toHaveBeenCalled();

      const savedItem = cartItemRepository.save.mock.calls[0][0];
      expect(savedItem.quantity).toBe(1);
      expect(savedItem.unitPrice).toBe(89.96); // 99.95 - (99.95 * 10 / 100) = 89.955 -> 89.96
      expect(savedItem.totalPrice).toBe(89.96); // 1 * 89.96
      expect(savedItem.productId).toBe('1');
      expect(savedItem.productName).toBe('Test Product');
      expect(savedItem.sellerId).toBe('s-1');
      expect(savedItem.sellerName).toBe('Test Store');
    });
  });
});