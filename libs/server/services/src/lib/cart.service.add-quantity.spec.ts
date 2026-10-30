import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeepPartial, SaveOptions } from 'typeorm';
import { CartService } from './cart.service';
import { Cart, CartItem, SellerProduct } from '@kickzone-workspace/entities';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('CartService - addToCart quantity validation', () => {
  let service: CartService;
  let cartRepository: jest.Mocked<Repository<Cart>>;
  let cartItemRepository: jest.Mocked<Repository<CartItem>>;
  let sellerProductRepository: jest.Mocked<Repository<SellerProduct>>;

  const mockSellerProduct = (overrides: Partial<SellerProduct> = {}): SellerProduct => ({
    id: 'sp-1',
    price: 99.95,
    discount: 10,
    stockQuantity: 100,
    product: { id: 1, name: 'Test Product' } as any,
    productInfo: {
      id: 'pi-1',
      images: ['image.jpg'],
      colorLinks: [],
      size: 'M',
    } as any,
    seller: { id: 's-1', storeName: 'Test Store' } as any,
    productInfoId: 1,
    ...overrides,
  }) as any;

  const mockCart = (overrides: Partial<Cart> = {}): Cart => ({
    id: 'cart-1',
    userId: 'user-1',
    subtotal: 0,
    total: 0,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    user: { id: 'user-1' } as any,
    ...overrides,
  }) as any;

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
  }) as any;

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

  describe('addToCart quantity validation', () => {
    it('should reject quantity 0 with BadRequestException and not call repositories', async () => {
      const cart = mockCart({ items: [] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct());
      cartItemRepository.save.mockImplementation((item: DeepPartial<CartItem>, _options?: SaveOptions) => Promise.resolve(item as DeepPartial<CartItem> & CartItem));
      jest.spyOn(service as any, 'recalculateCartTotals').mockResolvedValue(undefined);

      await expect(
        service.addToCart('user-1', { sellerProductId: 'sp-1', quantity: 0 })
      ).rejects.toThrow(BadRequestException);

      expect(sellerProductRepository.findOne).not.toHaveBeenCalled();
      expect(cartItemRepository.save).not.toHaveBeenCalled();
    });

    it('should reject negative quantity (-5) with BadRequestException and not call repositories', async () => {
      const cart = mockCart({ items: [] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct());
      cartItemRepository.save.mockImplementation((item: DeepPartial<CartItem>, _options?: SaveOptions) => Promise.resolve(item as DeepPartial<CartItem> & CartItem));
      jest.spyOn(service as any, 'recalculateCartTotals').mockResolvedValue(undefined);

      await expect(
        service.addToCart('user-1', { sellerProductId: 'sp-1', quantity: -5 })
      ).rejects.toThrow(BadRequestException);

      expect(sellerProductRepository.findOne).not.toHaveBeenCalled();
      expect(cartItemRepository.save).not.toHaveBeenCalled();
    });

    it('should reject fractional quantity (1.5) with BadRequestException and not call repositories', async () => {
      const cart = mockCart({ items: [] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct());
      cartItemRepository.save.mockImplementation((item: DeepPartial<CartItem>, _options?: SaveOptions) => Promise.resolve(item as DeepPartial<CartItem> & CartItem));
      jest.spyOn(service as any, 'recalculateCartTotals').mockResolvedValue(undefined);

      await expect(
        service.addToCart('user-1', { sellerProductId: 'sp-1', quantity: 1.5 })
      ).rejects.toThrow(BadRequestException);

      expect(sellerProductRepository.findOne).not.toHaveBeenCalled();
      expect(cartItemRepository.save).not.toHaveBeenCalled();
    });

    it('should accept quantity 1 for in-stock product and save cart item with quantity 1', async () => {
      const sellerProduct = mockSellerProduct({ stockQuantity: 100 });

      const cart = mockCart({ items: [] });
      cartRepository.findOne.mockResolvedValue(cart);
      cartRepository.save.mockResolvedValue(cart);
      sellerProductRepository.findOne.mockResolvedValue(sellerProduct);
      cartItemRepository.save.mockImplementation((item: DeepPartial<CartItem>, _options?: SaveOptions) => Promise.resolve(item as DeepPartial<CartItem> & CartItem));
      jest.spyOn(service as any, 'recalculateCartTotals').mockResolvedValue(undefined);

      const result = await service.addToCart('user-1', {
        sellerProductId: 'sp-1',
        quantity: 1,
      });

      expect(sellerProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'sp-1' },
        relations: [
          'product',
          'productInfo',
          'productInfo.colorLinks',
          'productInfo.colorLinks.color',
          'seller',
        ],
      });

      const savedItem = cartItemRepository.save.mock.calls[0][0];
      expect(savedItem.quantity).toBe(1);
      expect(savedItem.unitPrice).toBe(89.96); // 99.95 - (99.95 * 10 / 100) = 89.955 -> 89.96
      expect(savedItem.totalPrice).toBe(89.96); // 1 * 89.96
    });
  });
});