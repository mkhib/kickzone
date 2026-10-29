import {
  Injectable,
  Logger,
  OnModuleInit,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, MoreThan } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import {
  Product,
  ProductInfo,
  ProductInfoColor,
  Brand,
  Category,
  Color,
  SellerProduct,
  SellerInfo,
  OrderItem,
  ProductDescription,
  SiteLanguage,
  User,
  UserRole,
} from '@kickzone-workspace/entities';
import {
  CreateProductInput,
  CreateProductInfoInput,
  CreateCategoryInput,
  UpdateCategoryInput,
  ProductFilterInput,
  UpdateProductInput,
  ProductVariantInput,
} from '@kickzone-workspace/inputs';
import {
  inferSizeKindFromRaw,
  normalizeSizeCode,
  SizeKind,
} from '@kickzone-workspace/product-sizes';
import { parseOffset } from '@kickzone-workspace/utils';
import { TranslationService } from './translation.service';
import { orderedColorsFromLinks } from './product-info-colors.util';

@Injectable()
export class ProductService implements OnModuleInit {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductInfo)
    private readonly productInfoRepository: Repository<ProductInfo>,
    @InjectRepository(ProductInfoColor)
    private readonly productInfoColorRepository: Repository<ProductInfoColor>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    @InjectRepository(SellerProduct)
    private readonly sellerProductRepository: Repository<SellerProduct>,
    @InjectRepository(SellerInfo)
    private readonly sellerInfoRepository: Repository<SellerInfo>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(ProductDescription)
    private readonly productDescriptionRepository: Repository<ProductDescription>,
    @InjectRepository(SiteLanguage)
    private readonly siteLanguageRepository: Repository<SiteLanguage>,
    private readonly translationService: TranslationService
  ) {}

  async onModuleInit() {
    await this.normalizeLegacySizes();
  }

  /** One-time-ish backfill for rows missing sizeKind / free-text sizes. */
  private async normalizeLegacySizes(): Promise<void> {
    try {
      const infos = await this.productInfoRepository.find();
      let updated = 0;
      for (const info of infos) {
        const inferred = inferSizeKindFromRaw(info.size);
        const nextKind = info.sizeKind || inferred.sizeKind;
        const normalized =
          normalizeSizeCode(nextKind, info.size) ?? inferred.size;
        if (
          info.sizeKind !== nextKind ||
          (normalized && info.size !== normalized)
        ) {
          info.sizeKind = nextKind;
          if (normalized) {
            info.size = normalized;
          }
          await this.productInfoRepository.save(info);
          updated += 1;
        }
      }
      if (updated > 0) {
        this.logger.log(`Normalized sizeKind/size on ${updated} product infos`);
      }
    } catch (error) {
      this.logger.warn(
        `Skipped size normalization: ${(error as Error).message}`
      );
    }
  }

  async getProducts(filter?: ProductFilterInput): Promise<[Product[], number]> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productInfos', 'productInfo')
      .leftJoinAndSelect('productInfo.colorLinks', 'colorLink')
      .leftJoinAndSelect('colorLink.color', 'color')
      .leftJoinAndSelect('product.categories', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.descriptions', 'productDescription')
      .leftJoinAndSelect('productDescription.language', 'descLanguage');

    // Always use LEFT JOIN for sellerProducts to get all productInfos
    // We'll filter sellerProducts in the WHERE clause instead
    query
      .leftJoinAndSelect('product.sellerProducts', 'sellerProduct')
      .addSelect('sellerProduct.productInfoId')
      .leftJoinAndSelect('sellerProduct.seller', 'seller')
      .leftJoinAndSelect('seller.user', 'sellerUser')
      .leftJoinAndSelect('sellerProduct.productInfo', 'sellerProductInfo')
      .leftJoinAndSelect('sellerProductInfo.colorLinks', 'sellerProductColorLink')
      .leftJoinAndSelect('sellerProductColorLink.color', 'sellerProductColor');

    // Filter by seller availability - use EXISTS subquery to avoid filtering out products
    // Don't filter sellerProducts in WHERE clause - we'll filter in memory to preserve all productInfos
    // Use TypeORM's metadata to get correct foreign key column names
    if (filter?.onlyWithSellers === true) {
      const productRelation =
        this.sellerProductRepository.metadata.findRelationWithPropertyPath(
          'product'
        );
      const sellerRelation =
        this.sellerProductRepository.metadata.findRelationWithPropertyPath(
          'seller'
        );
      const productColumn =
        productRelation?.joinColumns?.[0]?.databaseName || 'productId';
      const sellerColumn =
        sellerRelation?.joinColumns?.[0]?.databaseName || 'sellerId';

      query.andWhere(
        `EXISTS (SELECT 1 FROM seller_product sp WHERE sp."${productColumn}" = product.id AND sp."${sellerColumn}" IS NOT NULL)`
      );
    }

    // Filter by stock availability - use EXISTS subquery to avoid filtering out products
    // Don't filter sellerProducts in WHERE clause - we'll filter in memory to preserve all productInfos
    // Use TypeORM's metadata to get correct column names
    if (filter?.onlyInStock === true) {
      const productRelation =
        this.sellerProductRepository.metadata.findRelationWithPropertyPath(
          'product'
        );
      const stockColumn =
        this.sellerProductRepository.metadata.findColumnWithPropertyName(
          'stockQuantity'
        )?.databaseName || 'stockQuantity';
      const productColumn =
        productRelation?.joinColumns?.[0]?.databaseName || 'productId';

      query.andWhere(
        `EXISTS (SELECT 1 FROM seller_product sp WHERE sp."${productColumn}" = product.id AND sp."${stockColumn}" > 0)`
      );
    }

    // Partitioning hint: The 'archived' column should be used for table partitioning at the DB level.
    if (filter?.archivedStatus && filter.archivedStatus !== 'ALL') {
      query.andWhere('product.archived = :archived', {
        archived: filter.archivedStatus === 'ARCHIVED',
      });
    }

    if (filter?.ids?.length) {
      query.andWhere('product.id IN (:...ids)', { ids: filter.ids });
    }

    if (filter?.categorySlugs?.length) {
      filter.categorySlugs.forEach((slug, idx) => {
        query.andWhere(
          `EXISTS (
            SELECT 1 FROM product_category pc
            JOIN category c ON pc."categoryId" = c.id
            WHERE pc."productId" = product.id
              AND (LOWER(c.slug) = :catSlug_${idx} OR LOWER(c.name) = :catSlug_${idx})
          )`,
          { [`catSlug_${idx}`]: slug.toLowerCase() }
        );
      });
    }

    if (filter?.brand) {
      query.andWhere('LOWER(brand.slug) = :brandSlug', {
        brandSlug: filter.brand.toLowerCase(),
      });
    }

    if (filter?.categoryIds?.length) {
      query.andWhere('category.id IN (:...categoryIds)', {
        categoryIds: filter.categoryIds,
      });
    } else if (filter?.categoryId) {
      query.andWhere('category.id = :categoryId', {
        categoryId: filter.categoryId,
      });
    } else if (filter?.category) {
      query.andWhere('LOWER(category.slug) = :category', {
        category: filter.category.toLowerCase(),
      });
    }

    if (filter?.searchTerm) {
      query.andWhere('LOWER(product.name) LIKE :searchTerm', {
        searchTerm: `%${filter.searchTerm.toLowerCase()}%`,
      });
    }

    if (filter?.productInfoFilter) {
      const {
        size,
        sizeKind,
        price,
        costPrice,
        colorId,
        weight,
        discount,
        stockQuantity,
      } = filter.productInfoFilter;
      if (size?.length)
        query.andWhere('productInfo.size IN (:...size)', { size });
      if (sizeKind)
        query.andWhere('productInfo.sizeKind = :sizeKind', { sizeKind });
      if (price) query.andWhere('productInfo.price IN (:...price)', { price });
      if (costPrice)
        query.andWhere('productInfo.costPrice IN (:...costPrice)', {
          costPrice,
        });
      if (colorId)
        query.andWhere(
          `EXISTS (
            SELECT 1 FROM product_info_color pic
            WHERE pic."productInfoId" = productInfo.id
              AND pic."colorId" IN (:...colorId)
          )`,
          { colorId }
        );
      if (weight)
        query.andWhere('productInfo.weight IN (:...weight)', { weight });
      if (discount)
        query.andWhere('productInfo.discount IN (:...discount)', { discount });
      if (stockQuantity)
        query.andWhere('productInfo.stockQuantity IN (:...stockQuantity)', {
          stockQuantity,
        });
    }

    // Catalog sort must be primary ORDER BY; relation ordering is secondary only.
    if (filter?.sort) {
      if (filter.sort === 'ID_DESC') {
        query.orderBy('product.id', 'DESC');
      } else if (filter.sort === 'PRICE_ASC') {
        query.orderBy('sellerProduct.price', 'ASC');
      } else if (filter.sort === 'PRICE_DESC') {
        query.orderBy('sellerProduct.price', 'DESC');
      } else {
        const order = filter.sortOrder === 'desc' ? 'DESC' : 'ASC';
        if (filter.sort === 'price') {
          query.orderBy('sellerProduct.price', order);
        } else if (filter.sort === 'id') {
          query.orderBy('product.id', order);
        } else if (filter.sort === 'discount') {
          query.orderBy('sellerProduct.discount', order);
        } else if (filter.sort === 'color') {
          query.orderBy('color.name', order);
        } else {
          query.orderBy('product.name', order);
        }
      }
      query
        .addOrderBy('productInfo.id', 'ASC')
        .addOrderBy('colorLink.position', 'ASC');
    } else {
      query
        .orderBy('productInfo.id', 'ASC')
        .addOrderBy('colorLink.position', 'ASC');
    }

    const totalCount = await query.getCount();

    if (filter?.first) {
      query.take(filter.first);
    }

    if (filter?.after) {
      const offset = parseOffset(filter.after);
      if (offset > 0) {
        query.skip(offset);
      }
    }

    // TypeORM's getMany() should handle deduplication automatically
    // but with multiple one-to-many joins, we need to be careful
    const products = await query.getMany();

    // Post-process products to filter sellerProducts based on filters
    // This ensures all productInfos are returned, but only matching sellerProducts
    const processedProducts = products.map((product) => {
      // Filter sellerProducts based on filters
      let filteredSellerProducts = product.sellerProducts || [];

      if (filter?.onlyWithSellers === true) {
        filteredSellerProducts = filteredSellerProducts.filter(
          (sp) => sp.seller != null
        );
      }

      if (filter?.onlyInStock === true) {
        filteredSellerProducts = filteredSellerProducts.filter(
          (sp) => sp.stockQuantity > 0
        );
      }

      return {
        ...product,
        sellerProducts: filteredSellerProducts,
      };
    });

    return [processedProducts, totalCount];
  }

  async createProduct(
    input: CreateProductInput,
    currentUser?: User
  ): Promise<Product> {
    const sku = input.sku?.trim();
    if (!sku) {
      throw new BadRequestException('SKU is required.');
    }
    if (!input.name || !input.name.trim()) {
      throw new BadRequestException('Product name is required.');
    }
    // Check for duplicate product name
    const existing = await this.productRepository.findOneBy({
      name: input.name.trim(),
    });
    if (existing) {
      throw new BadRequestException('A product with this name already exists.');
    }
    const existingSku = await this.productRepository.findOneBy({ sku });
    if (existingSku) {
      throw new BadRequestException('A product with this SKU already exists.');
    }
    const categories = await this.categoryRepository.findBy({
      id: In(input.categoryIds),
    });
    let brand: Brand | null = null;
    if (input.brandId != null) {
      brand = await this.brandRepository.findOneBy({ id: input.brandId });
      if (!brand) {
        throw new BadRequestException(
          `Brand with ID ${input.brandId} not found`
        );
      }
    }
    let fallbackDescription =
      input.description === '' ? null : input.description;
    if (!fallbackDescription && input.descriptions?.length) {
      const enDesc = input.descriptions.find((d) => d.languageCode === 'en');
      const faDesc = input.descriptions.find((d) => d.languageCode === 'fa');
      const firstValid = input.descriptions.find((d) => d.description?.trim());
      fallbackDescription =
        enDesc?.description ||
        faDesc?.description ||
        firstValid?.description ||
        null;
    }

    let sellerId: number | null = null;
    let currentSeller: SellerInfo | null = null;
    if (currentUser?.role === UserRole.SELLER) {
      currentSeller = await this.sellerInfoRepository.findOne({
        where: { user: { id: currentUser.id } },
      });
      if (currentSeller) {
        sellerId = currentSeller.id;
      }
    }

    const product = this.productRepository.create({
      name: input.name.trim(),
      sku,
      categories,
      brand: brand ?? undefined,
      brandId: brand?.id ?? null,
      description: fallbackDescription,
      sellerId,
      seller: currentSeller ?? undefined,
    });
    const savedProduct = await this.productRepository.save(product);

    if (input.descriptions && input.descriptions.length > 0) {
      await this.saveProductDescriptions(savedProduct.id, input.descriptions);
    } else if (input.description && input.description.trim()) {
      const defaultLang = await this.siteLanguageRepository.findOne({
        where: [{ isDefault: true, isActive: true }, { isActive: true }],
      });
      if (defaultLang) {
        await this.productDescriptionRepository.save(
          this.productDescriptionRepository.create({
            productId: savedProduct.id,
            languageId: defaultLang.id,
            description: input.description.trim(),
          })
        );
      }
    }

    if (input.variants && input.variants.length > 0) {
      for (const variant of input.variants) {
        await this.validateVariantInput(variant);
        const sizeKind = variant.sizeKind ?? SizeKind.Apparel;
        const normalizedSize = normalizeSizeCode(sizeKind, variant.size)!;
        const colors = await this.resolveOrderedColors(variant.colorIds);

        const newInfo = this.productInfoRepository.create({
          product: savedProduct,
          size: normalizedSize,
          sizeKind,
          weight: variant.weight,
          images: variant.images || [],
        });
        const savedInfo = await this.productInfoRepository.save(newInfo);
        await this.replaceProductInfoColors(savedInfo, colors);

        if (
          currentSeller &&
          (variant.price != null || variant.stockQuantity != null)
        ) {
          await this.upsertSellerProductListing(
            currentSeller.id,
            savedInfo,
            variant
          );
        }
      }
    }

    return (await this.getProductById(savedProduct.id)) || savedProduct;
  }

  async createProductInfo(input: CreateProductInfoInput): Promise<Product> {
    const product = await this.productRepository.findOneBy({
      id: input.productId,
    });
    if (!product) {
      throw new Error('Product not found');
    }
    const sizeKind = input.sizeKind ?? SizeKind.Apparel;
    const normalizedSize = normalizeSizeCode(sizeKind, input.size);
    if (!normalizedSize) {
      throw new Error(
        sizeKind === SizeKind.Apparel
          ? 'Invalid apparel size. Use XS–XXXL.'
          : sizeKind === SizeKind.Pants
            ? 'Invalid pants size. Use waist and inseam between 1 and 99 (e.g. 32x34).'
            : 'Invalid footwear size. Use an EU size from 35 to 50 (including .5).'
      );
    }
    const colors = await this.resolveOrderedColors(input.colorIds);
    const productInfo = this.productInfoRepository.create({
      product,
      size: normalizedSize,
      sizeKind,
      weight: input.weight,
    });
    const savedInfo = await this.productInfoRepository.save(productInfo);
    await this.replaceProductInfoColors(savedInfo, colors);
    // Return the full product with relations
    const fullProduct = await this.getProductById(product.id);
    if (!fullProduct)
      throw new Error('Product not found after creating variant');
    return fullProduct;
  }

  /** Distinct canonical sizes present in the catalog, optionally by kind. */
  async getDistinctProductSizes(sizeKind?: SizeKind): Promise<string[]> {
    const qb = this.productInfoRepository
      .createQueryBuilder('productInfo')
      .select('DISTINCT productInfo.size', 'size')
      .where("productInfo.size IS NOT NULL AND productInfo.size <> ''");
    if (sizeKind) {
      qb.andWhere('productInfo.sizeKind = :sizeKind', { sizeKind });
    }
    const rows = await qb.getRawMany<{ size: string }>();
    return rows.map((r) => r.size).filter(Boolean);
  }

  async createCategory(input: CreateCategoryInput, name?: string) {
    // Check for duplicate category slug
    const existing = await this.categoryRepository.findOneBy({
      slug: input.slug,
    });
    if (existing) {
      throw new Error('A category with this slug already exists.');
    }
    const category = this.categoryRepository.create({
      slug: input.slug,
      sortOrder: input.sortOrder || 0,
    });
    const savedCategory = await this.categoryRepository.save(category);

    // Create a translation entry for the category name if provided
    if (name) {
      await this.translationService.setTranslation({
        entityType: 'category',
        entityId: savedCategory.id,
        locale: 'en', // Default to English
        fieldName: 'name',
        value: name,
        isAutoTranslated: false,
      });
    }

    return savedCategory;
  }

  async updateCategory(input: UpdateCategoryInput, name?: string, locale = 'en') {
    const category = await this.categoryRepository.findOneBy({ id: input.id });
    if (!category) {
      throw new Error('Category not found');
    }

    // Check for duplicate slug if slug is being updated
    if (input.slug && input.slug !== category.slug) {
      const existing = await this.categoryRepository.findOneBy({
        slug: input.slug,
      });
      if (existing) {
        throw new Error('A category with this slug already exists.');
      }
    }

    // Update category properties
    Object.assign(category, {
      slug: input.slug || category.slug,
      sortOrder:
        input.sortOrder !== undefined ? input.sortOrder : category.sortOrder,
      isActive:
        input.isActive !== undefined ? input.isActive : category.isActive,
    });

    const saved = await this.categoryRepository.save(category);

    const trimmedName = name?.trim();
    if (trimmedName) {
      await this.translationService.setTranslation({
        entityType: 'category',
        entityId: saved.id,
        locale,
        fieldName: 'name',
        value: trimmedName,
        isAutoTranslated: false,
      });
    }

    return saved;
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new Error('Category not found');
    }

    // Check if category is being used by any products
    const productsUsingCategory = await this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.categories', 'category')
      .where('category.id = :categoryId', { categoryId: id })
      .getCount();
    if (productsUsingCategory > 0) {
      throw new Error('Cannot delete category that is being used by products');
    }

    // Delete all translations for this category
    await this.translationService.deleteEntityTranslations('category', id);

    return this.categoryRepository.remove(category);
  }

  async getCategories() {
    return this.categoryRepository.find({
      order: { sortOrder: 'ASC', id: 'ASC' },
    });
  }

  async addImagesToProductInfo(productInfoId: number, imageUrls: string[]) {
    const productInfo = await this.productInfoRepository.findOneBy({
      id: productInfoId,
    });
    if (!productInfo) {
      throw new Error('ProductInfo not found');
    }
    productInfo.images = [...(productInfo.images || []), ...imageUrls];
    return this.productInfoRepository.save(productInfo);
  }

  async removeImageFromProductInfo(productInfoId: number, imageUrl: string) {
    const productInfo = await this.productInfoRepository.findOneBy({
      id: productInfoId,
    });
    if (!productInfo) {
      throw new Error('ProductInfo not found');
    }
    productInfo.images = (productInfo.images || []).filter(
      (url) => url !== imageUrl
    );
    return this.productInfoRepository.save(productInfo);
  }

  private async validateVariantInput(
    variant: ProductVariantInput
  ): Promise<void> {
    if (!variant.size || !variant.size.trim()) {
      throw new BadRequestException('Variant size is required.');
    }
    const sizeKind = variant.sizeKind ?? SizeKind.Apparel;
    const normalizedSize = normalizeSizeCode(sizeKind, variant.size);
    if (!normalizedSize) {
      throw new BadRequestException(
        sizeKind === SizeKind.Apparel
          ? 'Invalid apparel size. Use XS–XXXL.'
          : sizeKind === SizeKind.Pants
            ? 'Invalid pants size. Use waist and inseam between 1 and 99 (e.g. 32x34).'
            : 'Invalid footwear size. Use an EU size from 35 to 50 (including .5).'
      );
    }
    if (!variant.colorIds || variant.colorIds.length === 0) {
      throw new BadRequestException('Variant must have at least one color.');
    }
    if (variant.weight == null || Number(variant.weight) <= 0) {
      throw new BadRequestException('Variant weight must be greater than 0.');
    }
    if (variant.stockQuantity != null && variant.stockQuantity < 0) {
      throw new BadRequestException('Stock quantity cannot be negative.');
    }
    if (variant.price != null && variant.price < 0) {
      throw new BadRequestException('Price cannot be negative.');
    }
    if (variant.costPrice != null && variant.costPrice < 0) {
      throw new BadRequestException('Cost price cannot be negative.');
    }
    if (
      variant.discount != null &&
      (variant.discount < 0 || variant.discount > 100)
    ) {
      throw new BadRequestException('Discount must be between 0 and 100.');
    }
  }

  private async upsertSellerProductListing(
    sellerId: number,
    productInfo: ProductInfo,
    variant: ProductVariantInput
  ) {
    const seller = await this.sellerInfoRepository.findOneBy({ id: sellerId });
    if (!seller) return;

    let sellerProduct = await this.sellerProductRepository.findOne({
      where: {
        seller: { id: sellerId },
        productInfoId: productInfo.id,
      },
    });

    if (sellerProduct) {
      if (variant.price != null) sellerProduct.price = variant.price;
      if (variant.costPrice != null) sellerProduct.costPrice = variant.costPrice;
      if (variant.discount != null) sellerProduct.discount = variant.discount;
      if (variant.stockQuantity != null)
        sellerProduct.stockQuantity = variant.stockQuantity;
      if (variant.boxLess != null) sellerProduct.boxLess = variant.boxLess;
      await this.sellerProductRepository.save(sellerProduct);
    } else if (variant.price != null || variant.stockQuantity != null) {
      sellerProduct = this.sellerProductRepository.create({
        seller,
        product: productInfo.product,
        productInfo,
        productInfoId: productInfo.id,
        price: variant.price ?? 0,
        costPrice: variant.costPrice ?? 0,
        discount: variant.discount ?? 0,
        stockQuantity: variant.stockQuantity ?? 0,
        boxLess: variant.boxLess ?? false,
      });
      await this.sellerProductRepository.save(sellerProduct);
    }
  }

  async updateProduct(
    input: UpdateProductInput,
    currentUser?: User
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: input.id },
      relations: [
        'productInfos',
        'productInfos.colorLinks',
        'productInfos.colorLinks.color',
        'sellerProducts',
        'sellerProducts.seller',
        'categories',
        'brand',
        'seller',
      ],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${input.id} not found`);
    }

    // Role-based authorization: Sellers can only modify their own products
    let currentSeller: SellerInfo | null = null;
    if (currentUser && currentUser.role === UserRole.SELLER) {
      currentSeller = await this.sellerInfoRepository.findOne({
        where: { user: { id: currentUser.id } },
      });
      if (!currentSeller) {
        throw new ForbiddenException('Seller profile not found');
      }

      // Check product ownership
      const productSellerId =
        product.sellerId ?? (product.seller ? product.seller.id : null);
      if (productSellerId != null && productSellerId !== currentSeller.id) {
        throw new ForbiddenException(
          'You do not have permission to modify a product owned by another seller.'
        );
      }

      // Check if product is associated with other sellers' listings
      if (
        productSellerId == null &&
        product.sellerProducts &&
        product.sellerProducts.length > 0 &&
        !product.sellerProducts.some(
          (sp) => sp.seller && sp.seller.id === currentSeller?.id
        )
      ) {
        throw new ForbiddenException(
          'You do not have permission to modify a product owned by another seller.'
        );
      }

      if (product.sellerId == null) {
        product.sellerId = currentSeller.id;
        product.seller = currentSeller;
      }
    }

    const sku = input.sku?.trim();
    if (!sku) {
      throw new BadRequestException('SKU is required.');
    }
    if (!input.name || !input.name.trim()) {
      throw new BadRequestException('Product name is required.');
    }

    // Check for duplicate name (excluding current product)
    const existing = await this.productRepository.findOne({
      where: { name: input.name.trim() },
    });
    if (existing && existing.id !== input.id) {
      throw new BadRequestException('A product with this name already exists.');
    }
    const existingSku = await this.productRepository.findOne({
      where: { sku },
    });
    if (existingSku && existingSku.id !== input.id) {
      throw new BadRequestException('A product with this SKU already exists.');
    }

    if (input.categoryIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(input.categoryIds),
      });
      product.categories = categories;
    }
    product.name = input.name.trim();
    product.sku = sku;

    if (input.brandId !== undefined) {
      if (input.brandId == null) {
        product.brand = null;
        product.brandId = null;
      } else {
        const brand = await this.brandRepository.findOneBy({
          id: input.brandId,
        });
        if (!brand) {
          throw new BadRequestException(
            `Brand with ID ${input.brandId} not found`
          );
        }
        product.brand = brand;
        product.brandId = brand.id;
      }
    }

    if (input.descriptions && input.descriptions.length > 0) {
      await this.saveProductDescriptions(product.id, input.descriptions);
      const enDesc = input.descriptions.find((d) => d.languageCode === 'en');
      const faDesc = input.descriptions.find((d) => d.languageCode === 'fa');
      const firstValid = input.descriptions.find((d) => d.description?.trim());
      product.description =
        enDesc?.description ||
        faDesc?.description ||
        firstValid?.description ||
        null;
    } else if (input.description !== undefined) {
      product.description =
        input.description === '' ? null : input.description;
      if (product.description) {
        const defaultLang = await this.siteLanguageRepository.findOne({
          where: [{ isDefault: true, isActive: true }, { isActive: true }],
        });
        if (defaultLang) {
          const existingDesc =
            await this.productDescriptionRepository.findOne({
              where: { productId: product.id, languageId: defaultLang.id },
            });
          if (existingDesc) {
            existingDesc.description = product.description;
            await this.productDescriptionRepository.save(existingDesc);
          } else {
            await this.productDescriptionRepository.save(
              this.productDescriptionRepository.create({
                productId: product.id,
                languageId: defaultLang.id,
                description: product.description,
              })
            );
          }
        }
      }
    }

    // Save product basic info
    await this.productRepository.save(product);

    // Handle variant updates / creation / deletion if input.variants provided
    if (input.variants !== undefined) {
      // Validate all variants first
      for (const variant of input.variants) {
        await this.validateVariantInput(variant);
      }

      const retainedIds = new Set<number>();

      for (const variant of input.variants) {
        const sizeKind = variant.sizeKind ?? SizeKind.Apparel;
        const normalizedSize =
          normalizeSizeCode(sizeKind, variant.size) ?? variant.size;
        const colors = await this.resolveOrderedColors(variant.colorIds);

        if (variant.id) {
          // Existing variant to update
          const existingInfo = product.productInfos?.find(
            (pi) => pi.id === variant.id
          );
          if (existingInfo) {
            existingInfo.size = normalizedSize;
            existingInfo.sizeKind = sizeKind;
            existingInfo.weight = variant.weight;
            if (variant.images) {
              existingInfo.images = variant.images;
            }
            await this.productInfoRepository.save(existingInfo);
            await this.replaceProductInfoColors(existingInfo, colors);
            retainedIds.add(existingInfo.id);

            if (
              currentSeller &&
              (variant.price != null || variant.stockQuantity != null)
            ) {
              await this.upsertSellerProductListing(
                currentSeller.id,
                existingInfo,
                variant
              );
            }
          }
        } else {
          // New variant to create
          const newInfo = this.productInfoRepository.create({
            product,
            size: normalizedSize,
            sizeKind,
            weight: variant.weight,
            images: variant.images || [],
          });
          const savedInfo = await this.productInfoRepository.save(newInfo);
          await this.replaceProductInfoColors(savedInfo, colors);
          retainedIds.add(savedInfo.id);

          if (
            currentSeller &&
            (variant.price != null || variant.stockQuantity != null)
          ) {
            await this.upsertSellerProductListing(
              currentSeller.id,
              savedInfo,
              variant
            );
          }
        }
      }

      // Remove deleted variants
      if (product.productInfos) {
        for (const existingInfo of product.productInfos) {
          if (!retainedIds.has(existingInfo.id)) {
            await this.productInfoColorRepository.delete({
              productInfo: { id: existingInfo.id },
            });
            await this.sellerProductRepository.delete({
              productInfoId: existingInfo.id,
            });
            await this.productInfoRepository.delete({ id: existingInfo.id });
          }
        }
      }
    }

    return (await this.getProductById(product.id)) || product;
  }

  async getProductById(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: [
        'descriptions',
        'descriptions.language',
        'productInfos',
        'categories',
        'brand',
        'seller',
        'productInfos.colorLinks',
        'productInfos.colorLinks.color',
        'sellerProducts',
        'sellerProducts.seller',
        'sellerProducts.seller.user',
        'sellerProducts.productInfo',
        'sellerProducts.productInfo.colorLinks',
        'sellerProducts.productInfo.colorLinks.color',
      ],
      order: {
        productInfos: {
          id: 'ASC',
        },
      },
    });

    if (!product) return null;

    if (product.productInfos) {
      for (const info of product.productInfos) {
        info.colors = orderedColorsFromLinks(info.colorLinks);
      }
    }

    if (product.sellerProducts) {
      product.sellerProducts = product.sellerProducts.filter(
        (sp) => sp.productInfo != null
      );
    }

    return product;
  }

  async updateProductInfo(
    id: number,
    size: string,
    colorIds: number[],
    weight: number
  ): Promise<ProductInfo> {
    const productInfo = await this.productInfoRepository.findOne({
      where: { id },
      relations: ['colorLinks', 'colorLinks.color'],
    });
    if (!productInfo) {
      throw new Error(`ProductInfo with ID ${id} not found`);
    }
    const colors = await this.resolveOrderedColors(colorIds);
    productInfo.size = size;
    productInfo.weight = weight;
    await this.productInfoRepository.save(productInfo);
    await this.replaceProductInfoColors(productInfo, colors);
    const updated = await this.productInfoRepository.findOne({
      where: { id },
      relations: ['colorLinks', 'colorLinks.color'],
    });
    if (!updated) {
      throw new Error(`ProductInfo with ID ${id} not found after update`);
    }
    return updated;
  }

  // Archive a product (set archived = true)
  async archiveProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new Error('Product not found');
    product.archived = true;
    return this.productRepository.save(product);
  }

  // Unarchive a product (set archived = false)
  async unarchiveProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new Error('Product not found');
    product.archived = false;
    return this.productRepository.save(product);
  }

  /**
   * Permanently delete a product. Allowed only when:
   * - the product is archived
   * - no seller listings have stockQuantity > 0
   * - the product is not referenced by order history
   */
  async deleteProduct(id: number): Promise<boolean> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['productInfos', 'categories'],
    });
    if (!product) {
      throw new Error('Product not found');
    }
    if (!product.archived) {
      throw new Error('Only archived products can be deleted.');
    }

    const activeListings = await this.sellerProductRepository.count({
      where: {
        product: { id },
        stockQuantity: MoreThan(0),
      },
    });
    if (activeListings > 0) {
      throw new Error(
        'Cannot delete a product that still has active seller inventory.'
      );
    }

    const orderHistoryCount = await this.orderItemRepository.count({
      where: { productId: String(id) },
    });
    if (orderHistoryCount > 0) {
      throw new Error(
        'Cannot delete a product that appears in order history.'
      );
    }

    const uploadDir = path.join(process.cwd(), 'uploads', 'products');
    for (const info of product.productInfos || []) {
      for (const imageUrl of info.images || []) {
        const imageName = path.basename(imageUrl);
        if (!imageName) continue;
        const filePath = path.join(uploadDir, imageName);
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (error) {
          this.logger.warn(
            `Failed to remove product image ${filePath}: ${(error as Error).message}`
          );
        }
      }
      await this.productInfoColorRepository.delete({
        productInfo: { id: info.id },
      });
      await this.translationService.deleteEntityTranslations(
        'productInfo',
        info.id
      );
    }

    await this.sellerProductRepository.delete({ product: { id } });
    await this.productInfoRepository.delete({ product: { id } });
    await this.translationService.deleteEntityTranslations('product', id);

    product.categories = [];
    await this.productRepository.save(product);
    await this.productRepository.delete(id);
    return true;
  }

  async getSellerProducts(
    sellerId: number,
    filter?: ProductFilterInput
  ): Promise<[Product[], number]> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productInfos', 'productInfo')
      .leftJoinAndSelect('productInfo.colorLinks', 'colorLink')
      .leftJoinAndSelect('colorLink.color', 'color')
      .leftJoinAndSelect('product.categories', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.descriptions', 'productDescription')
      .leftJoinAndSelect('productDescription.language', 'descLanguage')
      .leftJoinAndSelect(
        'product.sellerProducts',
        'sellerProduct',
        'sellerProduct.sellerId = :sellerId',
        { sellerId }
      )
      .leftJoinAndSelect('sellerProduct.productInfo', 'sellerProductInfo')
      .leftJoinAndSelect('sellerProductInfo.colorLinks', 'sellerProductColorLink')
      .leftJoinAndSelect('sellerProductColorLink.color', 'sellerProductColor')
      .where('sellerProduct.sellerId = :sellerId', { sellerId })
      .orderBy('productInfo.id', 'ASC')
      .addOrderBy('colorLink.position', 'ASC')
      .addOrderBy('sellerProduct.id', 'ASC');

    if (filter?.archivedStatus && filter.archivedStatus !== 'ALL') {
      query.andWhere('product.archived = :archived', {
        archived: filter.archivedStatus === 'ARCHIVED',
      });
    }

    if (filter?.brand) {
      query.andWhere('LOWER(brand.slug) = :brandSlug', {
        brandSlug: filter.brand.toLowerCase(),
      });
    }

    if (filter?.categoryIds?.length) {
      query.andWhere('category.id IN (:...categoryIds)', {
        categoryIds: filter.categoryIds,
      });
    } else if (filter?.categoryId) {
      query.andWhere('category.id = :categoryId', {
        categoryId: filter.categoryId,
      });
    } else if (filter?.category) {
      query.andWhere('LOWER(category.slug) = :category', {
        category: filter.category.toLowerCase(),
      });
    }

    if (filter?.searchTerm) {
      query.andWhere('LOWER(product.name) LIKE :searchTerm', {
        searchTerm: `%${filter.searchTerm.toLowerCase()}%`,
      });
    }

    if (filter?.productInfoFilter) {
      const {
        size,
        sizeKind,
        price,
        costPrice,
        colorId,
        weight,
        discount,
        stockQuantity,
      } = filter.productInfoFilter;
      if (size?.length)
        query.andWhere('productInfo.size IN (:...size)', { size });
      if (sizeKind)
        query.andWhere('productInfo.sizeKind = :sizeKind', { sizeKind });
      if (price) query.andWhere('productInfo.price IN (:...price)', { price });
      if (costPrice)
        query.andWhere('productInfo.costPrice IN (:...costPrice)', {
          costPrice,
        });
      if (colorId)
        query.andWhere(
          `EXISTS (
            SELECT 1 FROM product_info_color pic
            WHERE pic."productInfoId" = productInfo.id
              AND pic."colorId" IN (:...colorId)
          )`,
          { colorId }
        );
      if (weight)
        query.andWhere('productInfo.weight IN (:...weight)', { weight });
      if (discount)
        query.andWhere('productInfo.discount IN (:...discount)', { discount });
      if (stockQuantity)
        query.andWhere('productInfo.stockQuantity IN (:...stockQuantity)', {
          stockQuantity,
        });
    }

    if (filter?.sort) {
      const order = filter.sortOrder === 'desc' ? 'DESC' : 'ASC';
      if (filter.sort === 'price') {
        query.addOrderBy('sellerProduct.price', order);
      } else if (filter.sort === 'discount') {
        query.addOrderBy('sellerProduct.discount', order);
      } else if (filter.sort === 'color') {
        query.addOrderBy('color.name', order);
      } else {
        query.addOrderBy('product.name', order);
      }
    }

    const totalCount = await query.getCount();

    if (filter?.first) {
      query.take(filter.first);
    }

    if (filter?.after) {
      const offset = parseOffset(filter.after);
      if (offset > 0) {
        query.skip(offset);
      }
    }

    const products = await query.getMany();
    return [products, totalCount];
  }

  async getSellerProductsByProduct(
    productId: number
  ): Promise<SellerProduct[]> {
    return this.sellerProductRepository.find({
      where: { product: { id: productId } },
      relations: [
        'seller',
        'seller.user',
        'productInfo',
        'productInfo.colorLinks',
        'productInfo.colorLinks.color',
      ],
      order: {
        price: 'ASC',
        discount: 'DESC',
      },
    });
  }

  private async resolveOrderedColors(colorIds: number[]): Promise<Color[]> {
    const uniqueIds = [...new Set(colorIds.filter((id) => Number.isFinite(id)))];
    if (!uniqueIds.length) {
      throw new Error('At least one color is required.');
    }
    const colors = await this.colorRepository.findBy({ id: In(uniqueIds) });
    if (colors.length !== uniqueIds.length) {
      throw new Error('One or more colors were not found.');
    }
    const byId = new Map(colors.map((c) => [c.id, c]));
    // Preserve the submitted order (first = primary)
    return colorIds
      .map((id) => byId.get(id))
      .filter((c): c is Color => !!c)
      .filter(
        (color, index, arr) => arr.findIndex((c) => c.id === color.id) === index
      );
  }

  private async replaceProductInfoColors(
    productInfo: ProductInfo,
    colors: Color[]
  ): Promise<void> {
    await this.productInfoColorRepository.delete({
      productInfo: { id: productInfo.id },
    });
    const links = colors.map((color, position) =>
      this.productInfoColorRepository.create({
        productInfo,
        color,
        position,
      })
    );
    await this.productInfoColorRepository.save(links);
  }

  async saveProductDescriptions(
    productId: number,
    descriptions: Array<{ languageId?: number; languageCode?: string; description: string }>
  ): Promise<void> {
    for (const descInput of descriptions) {
      let lang: SiteLanguage | null = null;
      if (descInput.languageId) {
        lang = await this.siteLanguageRepository.findOne({
          where: { id: descInput.languageId },
        });
      } else if (descInput.languageCode) {
        lang = await this.siteLanguageRepository.findOne({
          where: { code: descInput.languageCode.trim().toLowerCase() },
        });
      }
      if (!lang) continue;

      const trimmed = descInput.description ? descInput.description.trim() : '';
      const existing = await this.productDescriptionRepository.findOne({
        where: { productId, languageId: lang.id },
      });

      if (!trimmed) {
        if (existing) {
          await this.productDescriptionRepository.delete(existing.id);
        }
      } else {
        if (existing) {
          existing.description = trimmed;
          await this.productDescriptionRepository.save(existing);
        } else {
          await this.productDescriptionRepository.save(
            this.productDescriptionRepository.create({
              productId,
              languageId: lang.id,
              description: trimmed,
            })
          );
        }
      }
    }
  }

  async resolveProductDescription(
    product: Product,
    locale: string
  ): Promise<string | null> {
    let descs = product.descriptions;
    if (!descs) {
      descs = await this.productDescriptionRepository.find({
        where: { productId: product.id },
        relations: ['language'],
      });
    }

    if (descs && descs.length > 0) {
      const direct = descs.find(
        (d) => d.language?.code?.toLowerCase() === locale.toLowerCase()
      );
      if (direct && direct.description?.trim()) return direct.description;

      const defaultDesc = descs.find((d) => d.language?.isDefault);
      if (defaultDesc && defaultDesc.description?.trim())
        return defaultDesc.description;

      const firstValid = descs.find((d) => d.description?.trim());
      if (firstValid) return firstValid.description;
    }

    return product.description || null;
  }

  async getProductDescriptions(
    productId: number
  ): Promise<ProductDescription[]> {
    return this.productDescriptionRepository.find({
      where: { productId },
      relations: ['language'],
      order: { id: 'ASC' },
    });
  }

  private readonly newsletterEmails = new Set<string>();

  async subscribeNewsletter(email: string): Promise<boolean> {
    const trimmed = (email || '').trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) return false;
    this.newsletterEmails.add(trimmed);
    return true;
  }
}
