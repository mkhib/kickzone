import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, In, FindOneOptions } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import {
  Brand,
  Category,
  Color,
  OrderItem,
  Product,
  ProductInfo,
  ProductInfoColor,
  SellerInfo,
  SellerProduct,
  ProductDescription,
  SiteLanguage,
  User,
  UserRole,
} from '@kickzone-workspace/entities';
import { TranslationService } from './translation.service';
import { SizeKind } from '@kickzone-workspace/product-sizes';
import {
  CreateProductInput,
  CreateProductInfoInput,
  UpdateProductInput,
  ProductVariantInput,
} from '@kickzone-workspace/inputs';

describe('ProductService - Pants Size Persistence', () => {
  let service: ProductService;
  let productRepo: jest.Mocked<Repository<Product>>;
  let productInfoRepo: jest.Mocked<Repository<ProductInfo>>;
  let productInfoColorRepo: jest.Mocked<Repository<ProductInfoColor>>;
  let colorRepo: jest.Mocked<Repository<Color>>;
  let sellerProductRepo: jest.Mocked<Repository<SellerProduct>>;
  let sellerInfoRepo: jest.Mocked<Repository<SellerInfo>>;
  let categoryRepo: jest.Mocked<Repository<Category>>;
  let brandRepo: jest.Mocked<Repository<Brand>>;

  const mockColors: Color[] = [
    { id: 1, name: 'Red', hexCode: '#ff0000', translations: [] } as unknown as Color,
    { id: 2, name: 'Blue', hexCode: '#0000ff', translations: [] } as unknown as Color,
    { id: 3, name: 'Green', hexCode: '#00ff00', translations: [] } as unknown as Color,
  ];

  beforeEach(async () => {
    const mockProductRepo = {
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    const mockProductInfoRepo = {
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn().mockResolvedValue([]),
      createQueryBuilder: jest.fn(),
    };

    const mockProductInfoColorRepo = {
      delete: jest.fn().mockResolvedValue({ affected: 1, raw: [] }),
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((links) => Promise.resolve(links)),
    };

    const mockColorRepo = {
      findBy: jest.fn(),
      findOneBy: jest.fn(),
    };

    const mockCategoryRepo = {
      findBy: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const mockBrandRepo = {
      findOneBy: jest.fn(),
      findOne: jest.fn(),
      findBy: jest.fn(),
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
    };

    const mockSellerProductRepo = {
      findOne: jest.fn(),
      find: jest.fn(),
      count: jest.fn(),
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    const mockSellerInfoRepo = {
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
    };

    const mockOrderItemRepo = {
      count: jest.fn(),
    };

    const mockTranslationService = {
      translateEntity: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepo,
        },
        {
          provide: getRepositoryToken(ProductInfo),
          useValue: mockProductInfoRepo,
        },
        {
          provide: getRepositoryToken(ProductInfoColor),
          useValue: mockProductInfoColorRepo,
        },
        {
          provide: getRepositoryToken(Color),
          useValue: mockColorRepo,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepo,
        },
        {
          provide: getRepositoryToken(Brand),
          useValue: mockBrandRepo,
        },
        {
          provide: getRepositoryToken(SellerProduct),
          useValue: mockSellerProductRepo,
        },
        {
          provide: getRepositoryToken(SellerInfo),
          useValue: mockSellerInfoRepo,
        },
        {
          provide: getRepositoryToken(OrderItem),
          useValue: mockOrderItemRepo,
        },
        {
          provide: getRepositoryToken(ProductDescription),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
        {
          provide: getRepositoryToken(SiteLanguage),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: TranslationService,
          useValue: mockTranslationService,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepo = module.get(getRepositoryToken(Product));
    productInfoRepo = module.get(getRepositoryToken(ProductInfo));
    productInfoColorRepo = module.get(getRepositoryToken(ProductInfoColor));
    colorRepo = module.get(getRepositoryToken(Color));
    sellerProductRepo = module.get(getRepositoryToken(SellerProduct));
    sellerInfoRepo = module.get(getRepositoryToken(SellerInfo));
    categoryRepo = module.get(getRepositoryToken(Category));
    brandRepo = module.get(getRepositoryToken(Brand));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct with Pants variants', () => {
    it('creates a product with a Pants variant and persists canonical WxL size', async () => {
      const sellerUser = {
        id: 10,
        role: UserRole.SELLER,
        username: 'seller_test',
      } as unknown as User;

      const sellerInfo = {
        id: 1,
        user: { id: 10 },
        storeName: 'Test Store',
      } as unknown as SellerInfo;

      const mockProduct: Product = {
        id: 100,
        name: 'Test Pants',
        sku: 'PANTS-001',
        categories: [],
        productInfos: [],
        sellerProducts: [],
        archived: false,
        sellerId: 1,
        seller: sellerInfo,
      } as unknown as Product;

      sellerInfoRepo.findOne.mockResolvedValue(sellerInfo);
      sellerInfoRepo.findOneBy.mockResolvedValue(sellerInfo);
      colorRepo.findBy.mockResolvedValue([mockColors[0]]);

      const createdVariant: ProductInfo = {
        id: 501,
        size: '32x34',
        sizeKind: SizeKind.Pants,
        weight: 500,
        images: [],
        product: mockProduct,
        colorLinks: [
          {
            id: 1,
            position: 0,
            color: mockColors[0],
            productInfo: null as unknown as ProductInfo,
          } as ProductInfoColor,
        ],
        colors: [mockColors[0]],
      };

      productInfoRepo.create.mockReturnValue(createdVariant);
      productInfoRepo.save.mockResolvedValue(createdVariant);
      productRepo.save.mockResolvedValue(mockProduct);

      const refreshedProduct: Product = {
        ...mockProduct,
        productInfos: [createdVariant],
      };

      productRepo.findOne.mockImplementation(
        async (options?: FindOneOptions<Product>) => {
          const relations = options?.relations as string[] | undefined;
          const where = options?.where as { id?: number } | undefined;
          if (relations?.includes('descriptions')) {
            return refreshedProduct;
          }
          if (where?.id === 100) {
            return mockProduct;
          }
          return null;
        }
      );

      const createInput: CreateProductInput = {
        name: 'Test Pants',
        sku: 'PANTS-001',
        categoryIds: [],
        variants: [
          {
            size: 'W32/L34',
            sizeKind: SizeKind.Pants,
            colorIds: [1],
            weight: 500,
          },
        ],
      };

      await service.createProduct(createInput, sellerUser);

      expect(productInfoRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          size: '32x34',
          sizeKind: SizeKind.Pants,
        })
      );
    });
  });

  describe('createProductInfo with Pants variants', () => {
    it('creates a ProductInfo with Pants sizeKind and canonical WxL size', async () => {
      const mockProduct: Product = {
        id: 100,
        name: 'Test Pants',
        sku: 'PANTS-001',
        categories: [],
        productInfos: [],
        sellerProducts: [],
        archived: false,
      };

      const input: CreateProductInfoInput = {
        productId: 100,
        size: '32 x 34',
        sizeKind: SizeKind.Pants,
        colorIds: [1],
        weight: 500,
      };

      productRepo.findOneBy.mockResolvedValue(mockProduct);
      colorRepo.findBy.mockResolvedValue([mockColors[0]]);

      const createdProductInfo: ProductInfo = {
        id: 50,
        product: mockProduct,
        size: '32x34',
        sizeKind: SizeKind.Pants,
        weight: 500,
        colorLinks: [],
        colors: [],
        images: [],
      };

      productInfoRepo.create.mockReturnValue(createdProductInfo);
      productInfoRepo.save.mockResolvedValue(createdProductInfo);
      productRepo.findOne.mockResolvedValue(mockProduct);

      await service.createProductInfo(input);

      expect(productInfoRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          size: '32x34',
          sizeKind: SizeKind.Pants,
        })
      );
    });
  });

  describe('updateProduct with Pants variants', () => {
    it('updates an existing Pants variant and persists canonical WxL size', async () => {
      const adminUser = {
        id: 1,
        role: UserRole.ADMIN,
        username: 'admin',
      } as unknown as User;

      const existingVariant: ProductInfo = {
        id: 60,
        size: '30x32',
        sizeKind: SizeKind.Pants,
        weight: 400,
        colorLinks: [],
        colors: [],
        images: [],
        product: { id: 100 } as Product,
      };

      const targetProduct: Product = {
        id: 100,
        name: 'Test Pants',
        sku: 'PANTS-001',
        categories: [],
        productInfos: [existingVariant],
        sellerProducts: [],
        archived: false,
      } as unknown as Product;

      productRepo.findOne.mockImplementation(
        async (options?: FindOneOptions<Product>) => {
          const where = options?.where as { id?: number } | undefined;
          if (where?.id === 100) {
            return targetProduct;
          }
          return null;
        }
      );
      colorRepo.findBy.mockResolvedValue([mockColors[0]]);

      productInfoRepo.save.mockResolvedValue({
        ...existingVariant,
        size: '34x32',
        sizeKind: SizeKind.Pants,
      });

      const updateInput: UpdateProductInput = {
        id: 100,
        name: 'Test Pants',
        sku: 'PANTS-001',
        categoryIds: [],
        variants: [
          {
            id: 60,
            size: '34/32',
            sizeKind: SizeKind.Pants,
            colorIds: [1],
            weight: 450,
          },
        ],
      };

      await service.updateProduct(updateInput, adminUser);

      expect(productInfoRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 60,
          size: '34x32',
          sizeKind: SizeKind.Pants,
        })
      );
    });
  });

  describe('createProduct with invalid Pants sizes', () => {
    const invalidPantsSizes = [
      '0x34',
      '32x100',
      '32.5x34',
      'M',
      '-32x34',
    ];

    for (const invalidSize of invalidPantsSizes) {
      it(`rejects "${invalidSize}" with correct pants error message and does not persist`, async () => {
        const adminUser = {
          id: 1,
          role: UserRole.ADMIN,
          username: 'admin',
        } as unknown as User;

        const targetProduct: Product = {
          id: 400,
          name: 'Test Pants',
          sku: 'PANTS-001',
          categories: [],
          productInfos: [],
          sellerProducts: [],
          archived: false,
        } as unknown as Product;

        productRepo.findOne.mockImplementation(
          async (options?: FindOneOptions<Product>) => {
            const where = options?.where as { id?: number } | undefined;
            if (where?.id === 400) {
              return targetProduct;
            }
            return null;
          }
        );

        const createInput: CreateProductInput = {
          name: 'Test Pants',
          sku: 'PANTS-001',
          categoryIds: [],
          variants: [
            {
              size: invalidSize,
              sizeKind: SizeKind.Pants,
              colorIds: [1],
              weight: 500,
            },
          ],
        };

        await expect(service.createProduct(createInput, adminUser)).rejects.toThrow(
          'Invalid pants size. Use waist and inseam between 1 and 99 (e.g. 32x34).'
        );

        expect(productInfoRepo.save).not.toHaveBeenCalled();
      });
    }
  });

  describe('createProductInfo with invalid Pants size', () => {
    it('rejects 999x34 with correct pants error message', async () => {
      const mockProduct: Product = {
        id: 100,
        name: 'Test Pants',
        sku: 'PANTS-001',
        categories: [],
        productInfos: [],
        sellerProducts: [],
        archived: false,
      };

      const input: CreateProductInfoInput = {
        productId: 100,
        size: '999x34',
        sizeKind: SizeKind.Pants,
        colorIds: [1],
        weight: 500,
      };

      productRepo.findOneBy.mockResolvedValue(mockProduct);

      await expect(service.createProductInfo(input)).rejects.toThrow(
        'Invalid pants size. Use waist and inseam between 1 and 99 (e.g. 32x34).'
      );
    });
  });

  describe('Apparel and Footwear invalid sizes unchanged', () => {
    it('rejects invalid Apparel size with existing apparel message', async () => {
      const adminUser = {
        id: 1,
        role: UserRole.ADMIN,
        username: 'admin',
      } as unknown as User;

      const targetProduct: Product = {
        id: 400,
        name: 'Test Shirt',
        sku: 'SHIRT-001',
        categories: [],
        productInfos: [],
        sellerProducts: [],
        archived: false,
      } as unknown as Product;

      productRepo.findOne.mockImplementation(
        async (options?: FindOneOptions<Product>) => {
          const where = options?.where as { id?: number } | undefined;
          if (where?.id === 400) {
            return targetProduct;
          }
          return null;
        }
      );

      const createInput: CreateProductInput = {
        name: 'Test Shirt',
        sku: 'SHIRT-001',
        categoryIds: [],
        variants: [
          {
            size: 'ZZZ',
            sizeKind: SizeKind.Apparel,
            colorIds: [1],
            weight: 200,
          },
        ],
      };

      await expect(service.createProduct(createInput, adminUser)).rejects.toThrow(
        'Invalid apparel size. Use XS–XXXL.'
      );
    });

    it('rejects invalid Footwear size with existing footwear message', async () => {
      const adminUser = {
        id: 1,
        role: UserRole.ADMIN,
        username: 'admin',
      } as unknown as User;

      const targetProduct: Product = {
        id: 400,
        name: 'Test Shoes',
        sku: 'SHOES-001',
        categories: [],
        productInfos: [],
        sellerProducts: [],
        archived: false,
      } as unknown as Product;

      productRepo.findOne.mockImplementation(
        async (options?: FindOneOptions<Product>) => {
          const where = options?.where as { id?: number } | undefined;
          if (where?.id === 400) {
            return targetProduct;
          }
          return null;
        }
      );

      const createInput: CreateProductInput = {
        name: 'Test Shoes',
        sku: 'SHOES-001',
        categoryIds: [],
        variants: [
          {
            size: '99',
            sizeKind: SizeKind.Footwear,
            colorIds: [1],
            weight: 350,
          },
        ],
      };

      await expect(service.createProduct(createInput, adminUser)).rejects.toThrow(
        'Invalid footwear size. Use an EU size from 35 to 50 (including .5).'
      );
    });
  });

  describe('getDistinctProductSizes with Pants sizeKind', () => {
    it('adds where clause for Pants sizeKind', async () => {
      const mockQb = {
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([
          { size: '32x34' },
          { size: '34x32' },
        ]),
      } as unknown as ReturnType<Repository<ProductInfo>['createQueryBuilder']>;

      productInfoRepo.createQueryBuilder.mockReturnValue(mockQb);

      const result = await service.getDistinctProductSizes(SizeKind.Pants);

      expect(mockQb.andWhere).toHaveBeenCalledWith(
        'productInfo.sizeKind = :sizeKind',
        { sizeKind: SizeKind.Pants }
      );
      expect(result).toEqual(['32x34', '34x32']);
    });
  });
});