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

describe('ProductService - onlyDiscounted filter', () => {
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

  const setMetadata = () => {
    Object.defineProperty(sellerProductRepo, 'metadata', {
      value: {
        findRelationWithPropertyPath: () => ({ joinColumns: [{ databaseName: 'productId' }] }),
        findColumnWithPropertyName: () => ({ databaseName: 'discount' }),
      },
      configurable: true,
    });
  };

  it('restricts to products with a discounted seller offer when onlyDiscounted is true', async () => {
    setMetadata();
    const qb = makeQueryBuilder();
    productRepo.createQueryBuilder.mockReturnValue(qb as never);

    await service.getProducts({ onlyDiscounted: true });

    const calls = whereCalls(qb).filter(([sql]) => sql.includes('"discount" > 0'));
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toContain('sp."productId" = product.id');
  });

  it('adds no discount clause when onlyDiscounted is false or missing', async () => {
    setMetadata();
    const qb = makeQueryBuilder();
    productRepo.createQueryBuilder.mockReturnValue(qb as never);

    await service.getProducts({ onlyDiscounted: false });
    await service.getProducts({});

    expect(whereCalls(qb).filter(([sql]) => sql.includes('"discount" > 0'))).toHaveLength(0);
  });
});
