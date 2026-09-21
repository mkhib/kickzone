import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import {
  Product,
  ProductInfo,
  ProductInfoColor,
  Category,
  Color,
  SellerProduct,
} from '@kickzone-workspace/entities';
import {
  CreateProductInput,
  CreateProductInfoInput,
  CreateCategoryInput,
  UpdateCategoryInput,
  ProductFilterInput,
  UpdateProductInput,
} from '@kickzone-workspace/inputs';
import {
  inferSizeKindFromRaw,
  normalizeSizeCode,
  SizeKind,
} from '@kickzone-workspace/product-sizes';
import { TranslationService } from './translation.service';

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
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    @InjectRepository(SellerProduct)
    private readonly sellerProductRepository: Repository<SellerProduct>,
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
      .leftJoinAndSelect('product.categories', 'category');

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

    query.orderBy('productInfo.id', 'ASC').addOrderBy('colorLink.position', 'ASC');

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

    if (filter?.categoryIds?.length) {
      query.andWhere('category.id IN (:...categoryIds)', {
        categoryIds: filter.categoryIds,
      });
    } else if (filter?.categoryId) {
      query.andWhere('category.id = :categoryId', {
        categoryId: filter.categoryId,
      });
    } else if (filter?.category) {
      query.andWhere('category.name = :category', {
        category: filter.category,
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
      query.skip(parseInt(filter.after, 10));
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

  async createProduct(input: CreateProductInput) {
    const sku = input.sku.trim();
    if (!sku) {
      throw new Error('SKU is required.');
    }
    // Check for duplicate product name
    const existing = await this.productRepository.findOneBy({
      name: input.name,
    });
    if (existing) {
      throw new Error('A product with this name already exists.');
    }
    const existingSku = await this.productRepository.findOneBy({ sku });
    if (existingSku) {
      throw new Error('A product with this SKU already exists.');
    }
    const categories = await this.categoryRepository.findBy({
      id: In(input.categoryIds),
    });
    const product = this.productRepository.create({
      name: input.name,
      sku,
      categories,
      description: input.description === '' ? null : input.description,
    });
    return this.productRepository.save(product);
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

  async updateProduct(input: UpdateProductInput): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: input.id },
    });
    if (!product) {
      throw new Error(`Product with ID ${input.id} not found`);
    }
    const sku = input.sku.trim();
    if (!sku) {
      throw new Error('SKU is required.');
    }
    // Check for duplicate name (excluding current product)
    const existing = await this.productRepository.findOne({
      where: { name: input.name },
    });
    if (existing && existing.id !== input.id) {
      throw new Error('A product with this name already exists.');
    }
    const existingSku = await this.productRepository.findOne({
      where: { sku },
    });
    if (existingSku && existingSku.id !== input.id) {
      throw new Error('A product with this SKU already exists.');
    }
    const categories = await this.categoryRepository.findBy({
      id: In(input.categoryIds),
    });
    product.name = input.name;
    product.sku = sku;
    product.categories = categories;
    product.description = input.description === '' ? null : input.description;
    return this.productRepository.save(product);
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id },
      relations: [
        'productInfos',
        'categories',
        'productInfos.colorLinks',
        'productInfos.colorLinks.color',
        'sellerProducts',
      ],
      order: {
        productInfos: {
          id: 'ASC',
        },
      },
    });
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

    if (filter?.categoryIds?.length) {
      query.andWhere('category.id IN (:...categoryIds)', {
        categoryIds: filter.categoryIds,
      });
    } else if (filter?.categoryId) {
      query.andWhere('category.id = :categoryId', {
        categoryId: filter.categoryId,
      });
    } else if (filter?.category) {
      query.andWhere('category.name = :category', {
        category: filter.category,
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
      query.skip(parseInt(filter.after, 10));
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
}
