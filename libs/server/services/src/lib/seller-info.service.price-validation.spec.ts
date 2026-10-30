import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { SellerService } from './seller-info.service';
import { AuthService } from './auth.service';
import {
  SellerInfo,
  SellerProduct,
  ProductInfo,
  Product,
  User,
  UserRole,
} from '@kickzone-workspace/entities';
import { CreateSellerProductInput, UpdateSellerProductInput } from '@kickzone-workspace/inputs';

describe('SellerService - Price Validation', () => {
  let service: SellerService;
  let sellerRepository: jest.Mocked<Repository<SellerInfo>>;
  let sellerProductRepository: jest.Mocked<Repository<SellerProduct>>;
  let productInfoRepository: jest.Mocked<Repository<ProductInfo>>;
  let userRepository: jest.Mocked<Repository<User>>;

  const mockSeller: SellerInfo = {
    id: 1,
    storeName: 'Test Store',
    phone: '1234567890',
    address: 'Test Address',
    shippingFee: 0,
    canManageCatalog: false,
    isActive: true,
    user: { id: 'user-1' } as User,
    sellerProducts: [],
  } as unknown as SellerInfo;

  const mockProduct: Product = {
    id: 100,
    name: 'Test Product',
    sku: 'TEST-001',
    categories: [],
    productInfos: [],
    sellerProducts: [],
    archived: false,
  } as unknown as Product;

  const mockProductInfo: ProductInfo = {
    id: 50,
    product: mockProduct,
    size: '42',
    sizeKind: 'Footwear' as any,
    weight: 350,
    colorLinks: [],
    colors: [],
    images: [],
  } as unknown as ProductInfo;

  const mockSellerProduct: SellerProduct = {
    id: 'seller-product-1',
    seller: mockSeller,
    product: mockProduct,
    productInfo: mockProductInfo,
    productInfoId: 50,
    price: 100,
    costPrice: 50,
    discount: 0,
    stockQuantity: 10,
    recommended: false,
    boxLess: false,
    setProductInfoId: jest.fn(),
  } as unknown as SellerProduct;

  beforeEach(async () => {
    const mockSellerRepo = {
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    const mockSellerProductRepo = {
      findOne: jest.fn(),
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
    };

    const mockProductInfoRepo = {
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn().mockResolvedValue([]),
      createQueryBuilder: jest.fn(),
    };

    const mockUserRepo = {
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    const mockAuthService = {
      initiatePasswordSetup: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SellerService,
        {
          provide: getRepositoryToken(SellerInfo),
          useValue: mockSellerRepo,
        },
        {
          provide: getRepositoryToken(SellerProduct),
          useValue: mockSellerProductRepo,
        },
        {
          provide: getRepositoryToken(ProductInfo),
          useValue: mockProductInfoRepo,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepo,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    service = module.get<SellerService>(SellerService);
    sellerRepository = module.get(getRepositoryToken(SellerInfo));
    sellerProductRepository = module.get(getRepositoryToken(SellerProduct));
    productInfoRepository = module.get(getRepositoryToken(ProductInfo));
    userRepository = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const validCreateInput: CreateSellerProductInput = {
    productInfoId: 50,
    price: 100,
    costPrice: 50,
    discount: 10,
    stockQuantity: 10,
    recommended: false,
    boxLess: false,
  };

  const validUpdateInput: UpdateSellerProductInput = {
    id: 'seller-product-1',
    price: 100,
    costPrice: 50,
    discount: 10,
    stockQuantity: 10,
  };

  describe('createSellerProduct - validation', () => {
    beforeEach(() => {
      sellerRepository.findOneBy.mockResolvedValue(mockSeller);
      productInfoRepository.findOne.mockResolvedValue(mockProductInfo);
      sellerProductRepository.findOne.mockResolvedValue(null); // no existing
    });

    it('rejects discount > 100 (150) with BadRequestException and does not call repositories', async () => {
      const input = { ...validCreateInput, discount: 150 };

      await expect(
        service.createSellerProduct(1, input)
      ).rejects.toThrow(BadRequestException);
      await expect(service.createSellerProduct(1, input)).rejects.toThrow(
        'Discount must be between 0 and 100'
      );

      expect(productInfoRepository.findOne).not.toHaveBeenCalled();
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
    });

    it('rejects discount < 0 (-5) with BadRequestException and does not call repositories', async () => {
      const input = { ...validCreateInput, discount: -5 };

      await expect(service.createSellerProduct(1, input)).rejects.toThrow(
        BadRequestException
      );
      await expect(service.createSellerProduct(1, input)).rejects.toThrow(
        'Discount must be between 0 and 100'
      );

      expect(productInfoRepository.findOne).not.toHaveBeenCalled();
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
    });

    it('rejects price = 0 with BadRequestException and does not call repositories', async () => {
      const input = { ...validCreateInput, price: 0 };

      await expect(service.createSellerProduct(1, input)).rejects.toThrow(
        BadRequestException
      );
      await expect(service.createSellerProduct(1, input)).rejects.toThrow(
        'Price must be a positive number'
      );

      expect(productInfoRepository.findOne).not.toHaveBeenCalled();
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
    });

    it('rejects price < 0 (-10) with BadRequestException and does not call repositories', async () => {
      const input = { ...validCreateInput, price: -10 };

      await expect(service.createSellerProduct(1, input)).rejects.toThrow(
        BadRequestException
      );
      await expect(service.createSellerProduct(1, input)).rejects.toThrow(
        'Price must be a positive number'
      );

      expect(productInfoRepository.findOne).not.toHaveBeenCalled();
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
    });

    it('rejects stockQuantity < 0 (-1) with BadRequestException and does not call repositories', async () => {
      const input = { ...validCreateInput, stockQuantity: -1 };

      await expect(service.createSellerProduct(1, input)).rejects.toThrow(
        BadRequestException
      );
      await expect(service.createSellerProduct(1, input)).rejects.toThrow(
        'Stock quantity must be a non-negative integer'
      );

      expect(productInfoRepository.findOne).not.toHaveBeenCalled();
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
    });

    it('rejects stockQuantity non-integer (1.5) with BadRequestException and does not call repositories', async () => {
      const input = { ...validCreateInput, stockQuantity: 1.5 };

      await expect(service.createSellerProduct(1, input)).rejects.toThrow(
        BadRequestException
      );
      await expect(service.createSellerProduct(1, input)).rejects.toThrow(
        'Stock quantity must be a non-negative integer'
      );

      expect(productInfoRepository.findOne).not.toHaveBeenCalled();
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
    });

    it('rejects costPrice < 0 (-1) with BadRequestException and does not call repositories', async () => {
      const input = { ...validCreateInput, costPrice: -1 };

      await expect(service.createSellerProduct(1, input)).rejects.toThrow(
        BadRequestException
      );
      await expect(service.createSellerProduct(1, input)).rejects.toThrow(
        'Cost price must be zero or greater'
      );

      expect(productInfoRepository.findOne).not.toHaveBeenCalled();
      expect(sellerProductRepository.save).not.toHaveBeenCalled();
    });

    it('accepts valid values (price 100, discount 0..100 inclusive, stock 0) and proceeds', async () => {
      const input = { ...validCreateInput, discount: 100, stockQuantity: 0 };
      sellerProductRepository.save.mockResolvedValue(mockSellerProduct);

      await expect(service.createSellerProduct(1, input)).resolves.toBeDefined();

      expect(productInfoRepository.findOne).toHaveBeenCalled();
      expect(sellerProductRepository.save).toHaveBeenCalled();
    });
  });

  describe('updateSellerProduct - validation', () => {
    beforeEach(() => {
      sellerProductRepository.findOne.mockResolvedValue(mockSellerProduct);
    });

    it('rejects discount > 100 (101) with BadRequestException and does not call save', async () => {
      const input = { ...validUpdateInput, discount: 101 };

      await expect(service.updateSellerProduct(1, input)).rejects.toThrow(
        BadRequestException
      );
      await expect(service.updateSellerProduct(1, input)).rejects.toThrow(
        'Discount must be between 0 and 100'
      );

      expect(sellerProductRepository.save).not.toHaveBeenCalled();
    });

    it('rejects price < 0 (-1) with BadRequestException and does not call save', async () => {
      const input = { ...validUpdateInput, price: -1 };

      await expect(service.updateSellerProduct(1, input)).rejects.toThrow(
        BadRequestException
      );
      await expect(service.updateSellerProduct(1, input)).rejects.toThrow(
        'Price must be a positive number'
      );

      expect(sellerProductRepository.save).not.toHaveBeenCalled();
    });

    it('accepts discount = 100 (boundary) and calls save', async () => {
      const input = { ...validUpdateInput, discount: 100 };
      sellerProductRepository.save.mockResolvedValue({
        ...mockSellerProduct,
        discount: 100,
        setProductInfoId: jest.fn(),
      });

      await expect(service.updateSellerProduct(1, input)).resolves.toBeDefined();

      expect(sellerProductRepository.save).toHaveBeenCalled();
    });

    it('accepts stockQuantity = 0 (boundary) and calls save', async () => {
      const input = { ...validUpdateInput, stockQuantity: 0 };
      sellerProductRepository.save.mockResolvedValue({
        ...mockSellerProduct,
        stockQuantity: 0,
        setProductInfoId: jest.fn(),
      });

      await expect(service.updateSellerProduct(1, input)).resolves.toBeDefined();

      expect(sellerProductRepository.save).toHaveBeenCalled();
    });

    it('throws Unauthorized for product owned by another seller (ownership check unchanged)', async () => {
      const otherSellerProduct = {
        ...mockSellerProduct,
        seller: { ...mockSeller, id: 2 },
      } as unknown as SellerProduct;
      sellerProductRepository.findOne.mockResolvedValue(otherSellerProduct);

      await expect(service.updateSellerProduct(1, validUpdateInput)).rejects.toThrow(
        'Unauthorized'
      );

      expect(sellerProductRepository.save).not.toHaveBeenCalled();
    });
  });
});