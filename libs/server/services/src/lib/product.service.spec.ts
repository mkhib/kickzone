import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, In, FindOneOptions } from 'typeorm';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
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
  CreateProductInfoInput,
  UpdateProductInput,
} from '@kickzone-workspace/inputs';

describe('ProductService - Color Handling', () => {
  let service: ProductService;
  let productRepo: jest.Mocked<Repository<Product>>;
  let productInfoRepo: jest.Mocked<Repository<ProductInfo>>;
  let productInfoColorRepo: jest.Mocked<Repository<ProductInfoColor>>;
  let colorRepo: jest.Mocked<Repository<Color>>;
  let sellerProductRepo: jest.Mocked<Repository<SellerProduct>>;
  let sellerInfoRepo: jest.Mocked<Repository<SellerInfo>>;

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
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    const mockBrandRepo = {
      findOneBy: jest.fn(),
      findOne: jest.fn(),
      findBy: jest.fn(),
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
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

  describe('updateProduct with variants (Seller and Admin persistence & security)', () => {
    it('allows a SELLER to add a new variant to their owned product and persists it with a generated ID', async () => {
      const sellerUser = {
        id: 10,
        role: UserRole.SELLER,
        username: 'seller_saintbala',
      } as unknown as User;

      const sellerInfo = {
        id: 1,
        user: { id: 10 },
        storeName: 'SAINTBALA Flagship',
      } as unknown as SellerInfo;

      const initialProduct: Product = {
        id: 100,
        name: 'SAINTBALA Heavyweight Hoodie',
        sku: 'SB-HOOD-01',
        sellerId: 1,
        seller: sellerInfo,
        categories: [],
        productInfos: [],
        sellerProducts: [],
        archived: false,
      } as unknown as Product;

      sellerInfoRepo.findOne.mockResolvedValue(sellerInfo);
      sellerInfoRepo.findOneBy.mockResolvedValue(sellerInfo);
      colorRepo.findBy.mockResolvedValue([mockColors[0]]);

      const createdVariant: ProductInfo = {
        id: 501,
        size: 'L',
        sizeKind: SizeKind.Apparel,
        weight: 650,
        images: ['https://cdn.saintbala.com/hoodie-l.jpg'],
        product: initialProduct,
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
      productRepo.save.mockResolvedValue(initialProduct);

      // getProductById mock after update
      const refreshedProduct: Product = {
        ...initialProduct,
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
            return initialProduct;
          }
          return null;
        }
      );

      const updateInput: UpdateProductInput = {
        id: 100,
        name: 'SAINTBALA Heavyweight Hoodie',
        sku: 'SB-HOOD-01',
        categoryIds: [],
        variants: [
          {
            size: 'L',
            sizeKind: SizeKind.Apparel,
            colorIds: [1],
            weight: 650,
            images: ['https://cdn.saintbala.com/hoodie-l.jpg'],
            stockQuantity: 20,
            price: 280,
            costPrice: 100,
            discount: 0,
          },
        ],
      };

      const result = await service.updateProduct(updateInput, sellerUser);

      // Assert variant has been generated with server ID
      expect(result.productInfos).toHaveLength(1);
      expect(result.productInfos[0].id).toBe(501);
      expect(result.productInfos[0].size).toBe('L');
      expect(result.productInfos[0].colors).toContainEqual(mockColors[0]);

      // Assert database persistence
      expect(productInfoRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          size: 'L',
          sizeKind: SizeKind.Apparel,
          weight: 650,
        })
      );
      expect(productInfoRepo.save).toHaveBeenCalledWith(createdVariant);
      expect(sellerProductRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          seller: sellerInfo,
          price: 280,
          stockQuantity: 20,
        })
      );
      expect(sellerProductRepo.save).toHaveBeenCalled();
    });

    it('rejects with 403 Forbidden when a SELLER attempts to add a variant to a product owned by another seller', async () => {
      const unauthorizedSellerUser = {
        id: 20,
        role: UserRole.SELLER,
        username: 'intruder_seller',
      } as unknown as User;

      const unauthorizedSellerInfo = {
        id: 2,
        user: { id: 20 },
        storeName: 'Other Store',
      } as unknown as SellerInfo;

      const productOwnedByOtherSeller: Product = {
        id: 200,
        name: 'SAINTBALA Leather Jacket',
        sku: 'SB-JKT-01',
        sellerId: 1, // Owned by seller ID 1!
        seller: { id: 1 } as SellerInfo,
        categories: [],
        productInfos: [],
        sellerProducts: [],
        archived: false,
      } as unknown as Product;

      sellerInfoRepo.findOne.mockResolvedValue(unauthorizedSellerInfo);
      productRepo.findOne.mockImplementation(
        async (options?: FindOneOptions<Product>) => {
          const where = options?.where as { id?: number } | undefined;
          if (where?.id === 200) {
            return productOwnedByOtherSeller;
          }
          return null;
        }
      );

      const updateInput: UpdateProductInput = {
        id: 200,
        name: 'SAINTBALA Leather Jacket',
        sku: 'SB-JKT-01',
        categoryIds: [],
        variants: [
          {
            size: 'M',
            sizeKind: SizeKind.Apparel,
            colorIds: [1],
            weight: 800,
          },
        ],
      };

      await expect(
        service.updateProduct(updateInput, unauthorizedSellerUser)
      ).rejects.toThrow(ForbiddenException);

      // Verify ZERO database modifications occurred
      expect(productRepo.save).not.toHaveBeenCalled();
      expect(productInfoRepo.create).not.toHaveBeenCalled();
      expect(productInfoRepo.save).not.toHaveBeenCalled();
      expect(sellerProductRepo.save).not.toHaveBeenCalled();
    });

    it('allows an ADMIN to add a new variant to any product and persists relational data cleanly', async () => {
      const adminUser = {
        id: 1,
        role: UserRole.ADMIN,
        username: 'admin',
      } as unknown as User;

      const productOwnedBySeller: Product = {
        id: 300,
        name: 'SAINTBALA Oversized Tee',
        sku: 'SB-TEE-01',
        sellerId: 99,
        seller: { id: 99 } as SellerInfo,
        categories: [],
        productInfos: [],
        sellerProducts: [],
        archived: false,
      } as unknown as Product;

      colorRepo.findBy.mockResolvedValue([mockColors[1]]);

      const adminCreatedVariant: ProductInfo = {
        id: 701,
        size: 'XL',
        sizeKind: SizeKind.Apparel,
        weight: 300,
        images: ['https://cdn.saintbala.com/tee-xl.jpg'],
        product: productOwnedBySeller,
        colorLinks: [
          {
            id: 2,
            position: 0,
            color: mockColors[1],
            productInfo: null as unknown as ProductInfo,
          } as ProductInfoColor,
        ],
        colors: [mockColors[1]],
      };

      productInfoRepo.create.mockReturnValue(adminCreatedVariant);
      productInfoRepo.save.mockResolvedValue(adminCreatedVariant);
      productRepo.save.mockResolvedValue(productOwnedBySeller);

      const refreshedProduct: Product = {
        ...productOwnedBySeller,
        productInfos: [adminCreatedVariant],
      };

      productRepo.findOne.mockImplementation(
        async (options?: FindOneOptions<Product>) => {
          const relations = options?.relations as string[] | undefined;
          const where = options?.where as { id?: number } | undefined;
          if (relations?.includes('descriptions')) {
            return refreshedProduct;
          }
          if (where?.id === 300) {
            return productOwnedBySeller;
          }
          return null;
        }
      );

      const updateInput: UpdateProductInput = {
        id: 300,
        name: 'SAINTBALA Oversized Tee',
        sku: 'SB-TEE-01',
        categoryIds: [],
        variants: [
          {
            size: 'XL',
            sizeKind: SizeKind.Apparel,
            colorIds: [2],
            weight: 300,
            images: ['https://cdn.saintbala.com/tee-xl.jpg'],
          },
        ],
      };

      const result = await service.updateProduct(updateInput, adminUser);

      // Verify admin update succeeded and variant persisted with generated ID
      expect(result.productInfos).toHaveLength(1);
      expect(result.productInfos[0].id).toBe(701);
      expect(result.productInfos[0].size).toBe('XL');
      expect(result.productInfos[0].colors).toContainEqual(mockColors[1]);
      expect(productInfoRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          size: 'XL',
          weight: 300,
        })
      );
      expect(productInfoRepo.save).toHaveBeenCalledWith(adminCreatedVariant);
    });

    it('rejects with 400 Bad Request when submitting an invalid variant and does not persist', async () => {
      const adminUser = {
        id: 1,
        role: UserRole.ADMIN,
        username: 'admin',
      } as unknown as User;

      const targetProduct: Product = {
        id: 400,
        name: 'SAINTBALA Track Pants',
        sku: 'SB-TRACK-01',
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

      // 1. Negative stock quantity
      const negativeStockInput: UpdateProductInput = {
        id: 400,
        name: 'SAINTBALA Track Pants',
        sku: 'SB-TRACK-01',
        categoryIds: [],
        variants: [
          {
            size: 'M',
            sizeKind: SizeKind.Apparel,
            colorIds: [1],
            weight: 400,
            stockQuantity: -5,
          },
        ],
      };

      await expect(
        service.updateProduct(negativeStockInput, adminUser)
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.updateProduct(negativeStockInput, adminUser)
      ).rejects.toThrow('Stock quantity cannot be negative.');

      // 2. Missing colors
      const missingColorsInput: UpdateProductInput = {
        id: 400,
        name: 'SAINTBALA Track Pants',
        sku: 'SB-TRACK-01',
        categoryIds: [],
        variants: [
          {
            size: 'M',
            sizeKind: SizeKind.Apparel,
            colorIds: [],
            weight: 400,
          },
        ],
      };

      await expect(
        service.updateProduct(missingColorsInput, adminUser)
      ).rejects.toThrow('Variant must have at least one color.');

      // 3. Negative price
      const negativePriceInput: UpdateProductInput = {
        id: 400,
        name: 'SAINTBALA Track Pants',
        sku: 'SB-TRACK-01',
        categoryIds: [],
        variants: [
          {
            size: 'M',
            sizeKind: SizeKind.Apparel,
            colorIds: [1],
            weight: 400,
            price: -50,
          },
        ],
      };

      await expect(
        service.updateProduct(negativePriceInput, adminUser)
      ).rejects.toThrow('Price cannot be negative.');

      // 4. Invalid size
      const invalidSizeInput: UpdateProductInput = {
        id: 400,
        name: 'SAINTBALA Track Pants',
        sku: 'SB-TRACK-01',
        categoryIds: [],
        variants: [
          {
            size: 'NON_EXISTENT_SIZE',
            sizeKind: SizeKind.Apparel,
            colorIds: [1],
            weight: 400,
          },
        ],
      };

      await expect(
        service.updateProduct(invalidSizeInput, adminUser)
      ).rejects.toThrow('Invalid apparel size. Use XS–XXXL.');

      // Assert no variant was persisted
      expect(productInfoRepo.save).not.toHaveBeenCalled();
    });
  });
});
