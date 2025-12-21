import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import {
  Product,
  ProductInfo,
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
import { TranslationService } from './translation.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductInfo)
    private readonly productInfoRepository: Repository<ProductInfo>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    @InjectRepository(SellerProduct)
    private readonly sellerProductRepository: Repository<SellerProduct>,
    private readonly translationService: TranslationService
  ) {}

  async getProducts(filter?: ProductFilterInput): Promise<[Product[], number]> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productInfos', 'productInfo')
      .leftJoinAndSelect('productInfo.color', 'color')
      .leftJoinAndSelect('product.categories', 'category');

    // Always use LEFT JOIN for sellerProducts to get all productInfos
    // We'll filter sellerProducts in the WHERE clause instead
    query
      .leftJoinAndSelect('product.sellerProducts', 'sellerProduct')
      .addSelect('sellerProduct.productInfoId')
      .leftJoinAndSelect('sellerProduct.seller', 'seller')
      .leftJoinAndSelect('seller.user', 'sellerUser')
      .leftJoinAndSelect('sellerProduct.productInfo', 'sellerProductInfo')
      .leftJoinAndSelect('sellerProductInfo.color', 'sellerProductColor');

    query.orderBy('productInfo.id', 'ASC');

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

    if (filter?.categoryId) {
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
        price,
        costPrice,
        colorId,
        weight,
        discount,
        stockQuantity,
      } = filter.productInfoFilter;
      if (size) query.andWhere('productInfo.size IN (:...size)', { size });
      if (price) query.andWhere('productInfo.price IN (:...price)', { price });
      if (costPrice)
        query.andWhere('productInfo.costPrice IN (:...costPrice)', {
          costPrice,
        });
      if (colorId)
        query.andWhere('productInfo.colorId IN (:...colorId)', { colorId });
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

    // Debug: Log products to see variant counts
    console.log('[ProductService] Returning products:', {
      totalProducts: processedProducts.length,
      products: processedProducts.map((p) => ({
        id: p.id,
        name: p.name,
        productInfosCount: p.productInfos?.length || 0,
        sellerProductsCount: p.sellerProducts?.length || 0,
        productInfos: p.productInfos?.map((pi) => ({
          id: pi.id,
          size: pi.size,
          color: pi.color?.name,
        })),
        sellerProducts: p.sellerProducts?.map((sp) => ({
          id: sp.id,
          productInfoId: sp.productInfoId,
          price: sp.price,
          stockQuantity: sp.stockQuantity,
          sellerId: sp.seller?.id,
        })),
      })),
      filter: {
        onlyWithSellers: filter?.onlyWithSellers,
        onlyInStock: filter?.onlyInStock,
      },
    });

    return [processedProducts, totalCount];
  }

  async createProduct(input: CreateProductInput) {
    // Check for duplicate product name
    const existing = await this.productRepository.findOneBy({
      name: input.name,
    });
    if (existing) {
      throw new Error('A product with this name already exists.');
    }
    const categories = await this.categoryRepository.findBy({
      id: In(input.categoryIds),
    });
    const product = this.productRepository.create({
      name: input.name,
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
    const color = await this.colorRepository.findOneBy({ id: input.colorId });
    if (!color) {
      throw new Error(`Color with ID ${input.colorId} not found`);
    }
    const productInfo = this.productInfoRepository.create({
      product,
      size: input.size,
      color,
      weight: input.weight,
    });
    await this.productInfoRepository.save(productInfo);
    // Return the full product with relations
    const fullProduct = await this.getProductById(product.id);
    if (!fullProduct)
      throw new Error('Product not found after creating variant');
    return fullProduct;
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

  async updateCategory(input: UpdateCategoryInput) {
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

    return this.categoryRepository.save(category);
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
    return this.categoryRepository.find();
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
    // Check for duplicate name (excluding current product)
    const existing = await this.productRepository.findOne({
      where: { name: input.name },
    });
    if (existing && existing.id !== input.id) {
      throw new Error('A product with this name already exists.');
    }
    const categories = await this.categoryRepository.findBy({
      id: In(input.categoryIds),
    });
    product.name = input.name;
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
        'productInfos.color',
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
    colorId: number,
    weight: number
  ): Promise<ProductInfo> {
    const productInfo = await this.productInfoRepository.findOne({
      where: { id },
    });
    if (!productInfo) {
      throw new Error(`ProductInfo with ID ${id} not found`);
    }
    const color = await this.colorRepository.findOneBy({ id: colorId });
    if (!color) {
      throw new Error(`Color with ID ${colorId} not found`);
    }
    productInfo.size = size;
    productInfo.color = color;
    productInfo.weight = weight;
    return this.productInfoRepository.save(productInfo);
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
      .leftJoinAndSelect('productInfo.color', 'color')
      .leftJoinAndSelect('product.categories', 'category')
      .leftJoinAndSelect(
        'product.sellerProducts',
        'sellerProduct',
        'sellerProduct.sellerId = :sellerId',
        { sellerId }
      )
      .leftJoinAndSelect('sellerProduct.productInfo', 'sellerProductInfo')
      .leftJoinAndSelect('sellerProductInfo.color', 'sellerProductColor')
      .where('sellerProduct.sellerId = :sellerId', { sellerId })
      .orderBy('productInfo.id', 'ASC')
      .addOrderBy('sellerProduct.id', 'ASC');

    if (filter?.archivedStatus && filter.archivedStatus !== 'ALL') {
      query.andWhere('product.archived = :archived', {
        archived: filter.archivedStatus === 'ARCHIVED',
      });
    }

    if (filter?.categoryId) {
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
        price,
        costPrice,
        colorId,
        weight,
        discount,
        stockQuantity,
      } = filter.productInfoFilter;
      if (size) query.andWhere('productInfo.size IN (:...size)', { size });
      if (price) query.andWhere('productInfo.price IN (:...price)', { price });
      if (costPrice)
        query.andWhere('productInfo.costPrice IN (:...costPrice)', {
          costPrice,
        });
      if (colorId)
        query.andWhere('productInfo.colorId IN (:...colorId)', { colorId });
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
}
