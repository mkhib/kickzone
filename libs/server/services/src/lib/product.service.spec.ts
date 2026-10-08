import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ProductService } from './product.service';
import {
  Category,
  Color,
  OrderItem,
  Product,
  ProductInfo,
  ProductInfoColor,
  SellerProduct,
  ProductDescription,
  SiteLanguage,
} from '@kickzone-workspace/entities';
import { TranslationService } from './translation.service';
import { SizeKind } from '@kickzone-workspace/product-sizes';
import { CreateProductInfoInput } from '@kickzone-workspace/inputs';

describe('ProductService - Color Handling', () => {
  let service: ProductService;
  let productRepo: jest.Mocked<Repository<Product>>;
  let productInfoRepo: jest.Mocked<Repository<ProductInfo>>;
  let productInfoColorRepo: jest.Mocked<Repository<ProductInfoColor>>;
  let colorRepo: jest.Mocked<Repository<Color>>;
  let categoryRepo: jest.Mocked<Repository<Category>>;
  let sellerProductRepo: jest.Mocked<Repository<SellerProduct>>;
  let orderItemRepo: jest.Mocked<Repository<OrderItem>>;

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

    const mockSellerProductRepo = {
      findOne: jest.fn(),
      find: jest.fn(),
      count: jest.fn(),
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
          provide: getRepositoryToken(SellerProduct),
          useValue: mockSellerProductRepo,
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
    categoryRepo = module.get(getRepositoryToken(Category));
    sellerProductRepo = module.get(getRepositoryToken(SellerProduct));
    orderItemRepo = module.get(getRepositoryToken(OrderItem));
  });

  describe('createProductInfo with multiple colors', () => {
    it('sets ALL chosen colors from input to the product variant, not just the first one', async () => {
      const mockProduct: Product = {
        id: 100,
        name: 'Running Shoes',
        sku: 'RUN-001',
        categories: [],
        productInfos: [],
        sellerProducts: [],
        archived: false,
      };

      const input: CreateProductInfoInput = {
        productId: 100,
        size: '42',
        sizeKind: SizeKind.Footwear,
        colorIds: [1, 2, 3], // 3 colors chosen from input
        weight: 350,
      };

      productRepo.findOneBy.mockResolvedValue(mockProduct);
      colorRepo.findBy.mockResolvedValue(mockColors);

      const createdProductInfo: ProductInfo = {
        id: 50,
        product: mockProduct,
        size: '42',
        sizeKind: SizeKind.Footwear,
        weight: 350,
        colorLinks: [],
        colors: [],
        images: [],
      };

      productInfoRepo.create.mockReturnValue(createdProductInfo);
      productInfoRepo.save.mockResolvedValue(createdProductInfo);

      const expectedLinks: Partial<ProductInfoColor>[] = [
        { productInfo: createdProductInfo, color: mockColors[0], position: 0 },
        { productInfo: createdProductInfo, color: mockColors[1], position: 1 },
        { productInfo: createdProductInfo, color: mockColors[2], position: 2 },
      ];

      // getProductById mock after creating variant
      const fullProduct: Product = {
        ...mockProduct,
        productInfos: [
          {
            ...createdProductInfo,
            colorLinks: expectedLinks as ProductInfoColor[],
          },
        ],
      };
      productRepo.findOne.mockResolvedValue(fullProduct);

      const result = await service.createProductInfo(input);

      // Verify all colors were queried via repository
      expect(colorRepo.findBy).toHaveBeenCalledWith({
        id: In([1, 2, 3]),
      });

      // Verify productInfoColor was deleted for old links
      expect(productInfoColorRepo.delete).toHaveBeenCalledWith({
        productInfo: { id: 50 },
      });

      // Verify create was called for EACH color in order
      expect(productInfoColorRepo.create).toHaveBeenCalledTimes(3);
      expect(productInfoColorRepo.create).toHaveBeenNthCalledWith(1, {
        productInfo: createdProductInfo,
        color: mockColors[0],
        position: 0,
      });
      expect(productInfoColorRepo.create).toHaveBeenNthCalledWith(2, {
        productInfo: createdProductInfo,
        color: mockColors[1],
        position: 1,
      });
      expect(productInfoColorRepo.create).toHaveBeenNthCalledWith(3, {
        productInfo: createdProductInfo,
        color: mockColors[2],
        position: 2,
      });

      // Verify save was called with all 3 links, NOT just the first one
      expect(productInfoColorRepo.save).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ position: 0, color: mockColors[0] }),
          expect.objectContaining({ position: 1, color: mockColors[1] }),
          expect.objectContaining({ position: 2, color: mockColors[2] }),
        ])
      );
      const savedLinksArg = productInfoColorRepo.save.mock.calls[0][0] as ProductInfoColor[];
      expect(savedLinksArg).toHaveLength(3);

      // Verify result has the variant with all color links
      expect(result.productInfos[0].colorLinks).toHaveLength(3);
    });

    it('preserves the exact submitted order of chosen colors', async () => {
      const mockProduct: Product = {
        id: 100,
        name: 'Running Shoes',
        sku: 'RUN-002',
        categories: [],
        productInfos: [],
        sellerProducts: [],
        archived: false,
      };

      // Submitted in reverse order: [3, 1]
      const input: CreateProductInfoInput = {
        productId: 100,
        size: 'L',
        sizeKind: SizeKind.Apparel,
        colorIds: [3, 1],
        weight: 200,
      };

      productRepo.findOneBy.mockResolvedValue(mockProduct);
      colorRepo.findBy.mockResolvedValue([mockColors[0], mockColors[2]]);

      const createdProductInfo: ProductInfo = {
        id: 51,
        product: mockProduct,
        size: 'L',
        sizeKind: SizeKind.Apparel,
        weight: 200,
        colorLinks: [],
        colors: [],
        images: [],
      };

      productInfoRepo.create.mockReturnValue(createdProductInfo);
      productInfoRepo.save.mockResolvedValue(createdProductInfo);
      productRepo.findOne.mockResolvedValue(mockProduct);

      await service.createProductInfo(input);

      expect(productInfoColorRepo.create).toHaveBeenNthCalledWith(1, {
        productInfo: createdProductInfo,
        color: mockColors[2], // ID 3 is first
        position: 0,
      });
      expect(productInfoColorRepo.create).toHaveBeenNthCalledWith(2, {
        productInfo: createdProductInfo,
        color: mockColors[0], // ID 1 is second
        position: 1,
      });
    });

    it('deduplicates duplicate chosen colors from input while keeping order', async () => {
      const mockProduct: Product = {
        id: 100,
        name: 'T-Shirt',
        sku: 'TSHIRT-001',
        categories: [],
        productInfos: [],
        sellerProducts: [],
        archived: false,
      };

      const input: CreateProductInfoInput = {
        productId: 100,
        size: 'M',
        sizeKind: SizeKind.Apparel,
        colorIds: [1, 2, 1], // duplicate 1
        weight: 150,
      };

      productRepo.findOneBy.mockResolvedValue(mockProduct);
      colorRepo.findBy.mockResolvedValue([mockColors[0], mockColors[1]]);

      const createdProductInfo: ProductInfo = {
        id: 52,
        product: mockProduct,
        size: 'M',
        sizeKind: SizeKind.Apparel,
        weight: 150,
        colorLinks: [],
        colors: [],
        images: [],
      };

      productInfoRepo.create.mockReturnValue(createdProductInfo);
      productInfoRepo.save.mockResolvedValue(createdProductInfo);
      productRepo.findOne.mockResolvedValue(mockProduct);

      await service.createProductInfo(input);

      expect(productInfoColorRepo.create).toHaveBeenCalledTimes(2);
      expect(productInfoColorRepo.create).toHaveBeenNthCalledWith(1, {
        productInfo: createdProductInfo,
        color: mockColors[0],
        position: 0,
      });
      expect(productInfoColorRepo.create).toHaveBeenNthCalledWith(2, {
        productInfo: createdProductInfo,
        color: mockColors[1],
        position: 1,
      });
    });

    it('throws error when colorIds is empty', async () => {
      productRepo.findOneBy.mockResolvedValue({ id: 100 } as Product);

      const input: CreateProductInfoInput = {
        productId: 100,
        size: 'M',
        sizeKind: SizeKind.Apparel,
        colorIds: [],
        weight: 150,
      };

      await expect(service.createProductInfo(input)).rejects.toThrow(
        'At least one color is required.'
      );
    });

    it('throws error when one or more chosen color IDs do not exist in database', async () => {
      productRepo.findOneBy.mockResolvedValue({ id: 100 } as Product);
      colorRepo.findBy.mockResolvedValue([mockColors[0]]); // only found 1 of 2

      const input: CreateProductInfoInput = {
        productId: 100,
        size: 'M',
        sizeKind: SizeKind.Apparel,
        colorIds: [1, 999],
        weight: 150,
      };

      await expect(service.createProductInfo(input)).rejects.toThrow(
        'One or more colors were not found.'
      );
    });
  });

  describe('updateProductInfo with multiple colors', () => {
    it('updates and sets ALL chosen colors for an existing variant', async () => {
      const existingProductInfo: ProductInfo = {
        id: 60,
        size: 'S',
        sizeKind: SizeKind.Apparel,
        weight: 100,
        colorLinks: [],
        colors: [],
        images: [],
        product: { id: 100 } as Product,
      };

      productInfoRepo.findOne.mockResolvedValue(existingProductInfo);
      colorRepo.findBy.mockResolvedValue([mockColors[0], mockColors[1]]);
      productInfoRepo.save.mockResolvedValue(existingProductInfo);

      await service.updateProductInfo(60, 'M', [1, 2], 200);

      expect(productInfoColorRepo.delete).toHaveBeenCalledWith({
        productInfo: { id: 60 },
      });
      expect(productInfoColorRepo.create).toHaveBeenCalledTimes(2);
      expect(productInfoColorRepo.save).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ color: mockColors[0], position: 0 }),
          expect.objectContaining({ color: mockColors[1], position: 1 }),
        ])
      );
    });
  });
});
