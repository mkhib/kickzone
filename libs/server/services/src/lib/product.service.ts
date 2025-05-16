import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product, ProductInfo, Category } from '@kickzone-workspace/entities';
import {
  CreateProductInput,
  CreateProductInfoInput,
  CreateCategoryInput,
  ProductFilterInput,
} from '@kickzone-workspace/inputs';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductInfo)
    private readonly productInfoRepository: Repository<ProductInfo>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async getProducts(filter?: ProductFilterInput): Promise<[Product[], number]> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productInfos', 'productInfo')
      .leftJoinAndSelect('product.categories', 'category');

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
      query.andWhere('product.name LIKE :searchTerm', {
        searchTerm: `%${filter.searchTerm}%`,
      });
    }

    if (filter?.productInfoFilter) {
      const { size, price, costPrice, color, weight, discount, stockQuantity } =
        filter.productInfoFilter;
      if (size) query.andWhere('productInfo.size IN (:...size)', { size });
      if (price) query.andWhere('productInfo.price IN (:...price)', { price });
      if (costPrice)
        query.andWhere('productInfo.costPrice IN (:...costPrice)', {
          costPrice,
        });
      if (color) query.andWhere('productInfo.color IN (:...color)', { color });
      if (weight)
        query.andWhere('productInfo.weight IN (:...weight)', { weight });
      if (discount)
        query.andWhere('productInfo.discount IN (:...discount)', { discount });
      if (stockQuantity)
        query.andWhere('productInfo.stockQuantity IN (:...stockQuantity)', {
          stockQuantity,
        });
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
      discount: input.discount,
      categories,
    });
    return this.productRepository.save(product);
  }

  async createProductInfo(input: CreateProductInfoInput) {
    const product = await this.productRepository.findOneBy({
      id: input.productId,
    });
    if (!product) {
      throw new Error('Product not found');
    }
    const productInfo = this.productInfoRepository.create({
      product,
      size: input.size,
      price: input.price,
      costPrice: input.costPrice,
      color: input.color,
      weight: input.weight,
      discount: input.discount,
      stockQuantity: input.stockQuantity,
    });
    return this.productInfoRepository.save(productInfo);
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

  async updateProduct(
    id: number,
    name: string,
    discount: number,
    categoryIds: number[]
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    // Check for duplicate name (excluding current product)
    const existing = await this.productRepository.findOne({ where: { name } });
    if (existing && existing.id !== id) {
      throw new Error('A product with this name already exists.');
    }
    const categories = await this.categoryRepository.findBy({
      id: In(categoryIds),
    });
    product.name = name;
    product.discount = discount;
    product.categories = categories;
    return this.productRepository.save(product);
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['productInfos', 'categories'],
    });
  }
}
