import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import {
  Product,
  ProductInfo,
  Category,
  Color,
} from '@kickzone-workspace/entities';
import {
  CreateProductInput,
  CreateProductInfoInput,
  CreateCategoryInput,
  ProductFilterInput,
  UpdateProductInput,
} from '@kickzone-workspace/inputs';

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
    private readonly colorRepository: Repository<Color>
  ) {}

  async getProducts(filter?: ProductFilterInput): Promise<[Product[], number]> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productInfos', 'productInfo')
      .leftJoinAndSelect('productInfo.color', 'color')
      .leftJoinAndSelect('product.categories', 'category')
      .orderBy('productInfo.id', 'ASC');

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
        query.addOrderBy('productInfo.price', order);
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

  async createCategory(input: CreateCategoryInput) {
    // Check for duplicate category name
    const existing = await this.categoryRepository.findOneBy({
      name: input.name,
    });
    if (existing) {
      throw new Error('A category with this name already exists.');
    }
    const category = this.categoryRepository.create({ name: input.name });
    return this.categoryRepository.save(category);
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
      relations: ['productInfos', 'categories', 'productInfos.color'],
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
      .where('sellerProduct.sellerId = :sellerId', { sellerId })
      .orderBy('productInfo.id', 'ASC');

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
        query.addOrderBy('productInfo.price', order);
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
