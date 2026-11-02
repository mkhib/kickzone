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

describe('ProductService - multi-select storefront filters', () => {
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

  const makeQueryBuilder = () => {
    const qb: Record<string, jest.Mock> = {};
    const chain = [
      'leftJoinAndSelect',
      'leftJoin',
      'addSelect',
      'where',
      'andWhere',
      'orWhere',
      'orderBy',
      'addOrderBy',
      'take',
      'skip',
      'setParameter',
      'setParameters',
    ];
    chain.forEach((m) => {
      qb[m] = jest.fn().mockReturnValue(qb);
    });
    qb['getCount'] = jest.fn().mockResolvedValue(0);
    qb['getMany'] = jest.fn().mockResolvedValue([]);
    qb['getManyAndCount'] = jest.fn().mockResolvedValue([[], 0]);
    return qb;
  };

  const whereCalls = (qb: Record<string, jest.Mock>) =>
    qb['andWhere'].mock.calls as Array<[string, Record<string, unknown>?]>;

  const allSqlCalls = (qb: Record<string, jest.Mock>) => {
    const calls: Array<[string, Record<string, unknown>?]> = [];
    calls.push(...(qb['andWhere'].mock.calls as Array<[string, Record<string, unknown>?]>));
    calls.push(...(qb['orderBy'].mock.calls as Array<[string, Record<string, unknown>?]>));
    calls.push(...(qb['addOrderBy'].mock.calls as Array<[string, Record<string, unknown>?]>));
    return calls;
  };

  it('matches products in ANY of the listed category slugs with one lowercased IN clause', async () => {
    const qb = makeQueryBuilder();
    productRepo.createQueryBuilder.mockReturnValue(qb as never);

    await service.getProducts({ categorySlugs: ['Men', 'T-Shirts'] });

    const catCalls = whereCalls(qb).filter(([sql]) => sql.includes('product_categories_categories'));
    expect(catCalls).toHaveLength(1);
    expect(catCalls[0][0]).toContain('IN (:...catSlugs)');
    expect(catCalls[0][1]).toEqual({ catSlugs: ['men', 't-shirts'] });
  });

  it('categorySlugs filter uses correct join table and column names (LOCKED)', async () => {
    const qb = makeQueryBuilder();
    productRepo.createQueryBuilder.mockReturnValue(qb as never);

    await service.getProducts({ categorySlugs: ['Men', 'T-Shirts'] });

    const catCalls = whereCalls(qb).filter(([sql]) => sql.includes('product_categories_categories'));
    expect(catCalls).toHaveLength(1);
    const sql = catCalls[0][0];
    // Must contain correct table/column names
    expect(sql).toContain('product_categories_categories');
    expect(sql).toContain('JOIN categories c');
    expect(sql).toContain('categoriesId');
    expect(sql).toContain('LOWER(c.slug) IN (:...catSlugs)');
    // Must NOT contain old/bad names
    expect(sql).not.toContain('product_category ');
    expect(sql).not.toContain('categoryId');
    expect(sql).not.toContain('c.name');
  });

  it('filters by ANY of the listed brands with a lowercased IN clause', async () => {
    const qb = makeQueryBuilder();
    productRepo.createQueryBuilder.mockReturnValue(qb as never);

    await service.getProducts({ brands: ['Nike', 'JORDAN'] });

    const brandCalls = whereCalls(qb).filter(([sql]) => sql.includes('brandSlugs'));
    expect(brandCalls).toHaveLength(1);
    expect(brandCalls[0][0]).toBe('LOWER(brand.slug) IN (:...brandSlugs)');
    expect(brandCalls[0][1]).toEqual({ brandSlugs: ['nike', 'jordan'] });
  });

  it('adds no brand or category-slug clauses when the arrays are empty', async () => {
    const qb = makeQueryBuilder();
    productRepo.createQueryBuilder.mockReturnValue(qb as never);

    await service.getProducts({ brands: [], categorySlugs: [] });

    const calls = whereCalls(qb).filter(
      ([sql]) => sql.includes('brandSlugs') || sql.includes('product_categories_categories')
    );
    expect(calls).toHaveLength(0);
  });

  it('keeps the single brand filter working', async () => {
    const qb = makeQueryBuilder();
    productRepo.createQueryBuilder.mockReturnValue(qb as never);

    await service.getProducts({ brand: 'Nike' });

    expect(qb['andWhere']).toHaveBeenCalledWith('LOWER(brand.slug) = :brandSlug', {
      brandSlug: 'nike',
    });
  });

  it('getProducts productInfoFilter does not reference removed ProductInfo columns', async () => {
    const qb = makeQueryBuilder();
    productRepo.createQueryBuilder.mockReturnValue(qb as never);

    await service.getProducts({
      productInfoFilter: {
        price: [100],
        costPrice: [50],
        discount: [10],
        stockQuantity: [5],
      },
    });

    const sqls = allSqlCalls(qb).map(([sql]) => sql);
    const forbidden = [
      'productInfo.price',
      'productInfo.costPrice',
      'productInfo.discount',
      'productInfo.stockQuantity',
    ];
    for (const f of forbidden) {
      expect(sqls.some((s) => s.includes(f))).toBe(false);
    }
    // Should use sellerProduct alias for price/costPrice/discount/stockQuantity
    const whereCallsList = whereCalls(qb);
    expect(whereCallsList.some(([sql, params]) => sql === 'sellerProduct.price IN (:...price)' && JSON.stringify(params?.['price']) === JSON.stringify([100]))).toBe(true);
    expect(whereCallsList.some(([sql, params]) => sql === 'sellerProduct.costPrice IN (:...costPrice)' && JSON.stringify(params?.['costPrice']) === JSON.stringify([50]))).toBe(true);
    expect(whereCallsList.some(([sql, params]) => sql === 'sellerProduct.discount IN (:...discount)' && JSON.stringify(params?.['discount']) === JSON.stringify([10]))).toBe(true);
    expect(whereCallsList.some(([sql, params]) => sql === 'sellerProduct.stockQuantity IN (:...stockQuantity)' && JSON.stringify(params?.['stockQuantity']) === JSON.stringify([5]))).toBe(true);
  });

  it('getProducts sort by color uses color.hexCode not color.name', async () => {
    const qb = makeQueryBuilder();
    productRepo.createQueryBuilder.mockReturnValue(qb as never);

    await service.getProducts({ sort: 'color' });

    const sqls = allSqlCalls(qb).map(([sql]) => sql);
    expect(sqls.some((s) => s.includes('color.name'))).toBe(false);
    expect(sqls.some((s) => s.includes('color.hexCode'))).toBe(true);
  });

  describe('getSellerProducts', () => {
    it('productInfoFilter does not reference removed ProductInfo columns', async () => {
      const qb = makeQueryBuilder();
      productRepo.createQueryBuilder.mockReturnValue(qb as never);

      await service.getSellerProducts(1, {
        productInfoFilter: {
          price: [100],
          costPrice: [50],
          discount: [10],
          stockQuantity: [5],
        },
      });

      const sqls = allSqlCalls(qb).map(([sql]) => sql);
      const forbidden = [
        'productInfo.price',
        'productInfo.costPrice',
        'productInfo.discount',
        'productInfo.stockQuantity',
      ];
      for (const f of forbidden) {
        expect(sqls.some((s) => s.includes(f))).toBe(false);
      }
      // Should use sellerProduct alias for price/costPrice/discount/stockQuantity
      const whereCallsList = whereCalls(qb);
      expect(whereCallsList.some(([sql, params]) => sql === 'sellerProduct.price IN (:...price)' && JSON.stringify(params?.['price']) === JSON.stringify([100]))).toBe(true);
      expect(whereCallsList.some(([sql, params]) => sql === 'sellerProduct.costPrice IN (:...costPrice)' && JSON.stringify(params?.['costPrice']) === JSON.stringify([50]))).toBe(true);
      expect(whereCallsList.some(([sql, params]) => sql === 'sellerProduct.discount IN (:...discount)' && JSON.stringify(params?.['discount']) === JSON.stringify([10]))).toBe(true);
      expect(whereCallsList.some(([sql, params]) => sql === 'sellerProduct.stockQuantity IN (:...stockQuantity)' && JSON.stringify(params?.['stockQuantity']) === JSON.stringify([5]))).toBe(true);
    });

    it('sort by color uses color.hexCode not color.name', async () => {
      const qb = makeQueryBuilder();
      productRepo.createQueryBuilder.mockReturnValue(qb as never);

      await service.getSellerProducts(1, { sort: 'color' });

      const sqls = allSqlCalls(qb).map(([sql]) => sql);
      expect(sqls.some((s) => s.includes('color.name'))).toBe(false);
      expect(sqls.some((s) => s.includes('color.hexCode'))).toBe(true);
    });
  });
});
