import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import {
  SellerInfo,
  SellerProduct,
  ProductInfo,
  User,
  UserRole,
} from '@kickzone-workspace/entities';
import {
  CreateSellerInput,
  UpdateSellerInput,
  CreateSellerProductInput,
  UpdateSellerProductInput,
} from '@kickzone-workspace/inputs';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(SellerInfo)
    private sellerRepository: Repository<SellerInfo>,
    @InjectRepository(SellerProduct)
    private sellerProductRepository: Repository<SellerProduct>,
    @InjectRepository(ProductInfo)
    private productInfoRepository: Repository<ProductInfo>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createSellerInput: CreateSellerInput): Promise<SellerInfo> {
    // Check if email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createSellerInput.email },
    });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Create user with hashed password
    const hashedPassword = await bcrypt.hash(createSellerInput.password, 10);
    const user = this.userRepository.create({
      email: createSellerInput.email,
      password: hashedPassword,
      role: UserRole.SELLER,
    });
    await this.userRepository.save(user);

    // Create seller info
    const newSeller = this.sellerRepository.create({
      ...createSellerInput,
      user,
    });
    return this.sellerRepository.save(newSeller);
  }

  async findAll(filter?: {
    searchTerm?: string;
    isActive?: boolean;
    first?: number;
    after?: string;
  }): Promise<[SellerInfo[], number]> {
    const query = this.sellerRepository
      .createQueryBuilder('seller')
      .leftJoinAndSelect('seller.user', 'user');

    if (filter?.searchTerm) {
      query.andWhere(
        '(LOWER(seller.name) LIKE :searchTerm OR LOWER(seller.lastName) LIKE :searchTerm OR LOWER(seller.storeName) LIKE :searchTerm OR LOWER(seller.email) LIKE :searchTerm)',
        { searchTerm: `%${filter.searchTerm.toLowerCase()}%` }
      );
    }

    if (filter?.isActive !== undefined) {
      query.andWhere('seller.isActive = :isActive', {
        isActive: filter.isActive,
      });
    }

    const totalCount = await query.getCount();

    if (filter?.first) {
      query.take(filter.first);
    }

    if (filter?.after) {
      query.skip(parseInt(filter.after, 10));
    }

    const sellers = await query.getMany();
    return [sellers, totalCount];
  }

  findOne(id: number): Promise<SellerInfo | null> {
    return this.sellerRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(
    id: number,
    updateSellerInput: UpdateSellerInput
  ): Promise<SellerInfo | null> {
    const seller = await this.findOne(id);
    if (!seller) {
      throw new Error('Seller not found');
    }

    // Update seller info
    Object.assign(seller, updateSellerInput);
    return this.sellerRepository.save(seller);
  }

  async toggleActive(id: number): Promise<SellerInfo | null> {
    const seller = await this.findOne(id);
    if (!seller) {
      throw new Error('Seller not found');
    }

    seller.isActive = !seller.isActive;
    return this.sellerRepository.save(seller);
  }

  async createSellerProduct(
    sellerId: number,
    input: CreateSellerProductInput
  ): Promise<SellerProduct> {
    const productInfo = await this.productInfoRepository.findOneBy({
      id: input.productInfoId,
    });
    if (!productInfo) throw new Error('Product variant not found');
    const seller = await this.sellerRepository.findOneBy({ id: sellerId });
    if (!seller) throw new Error('Seller not found');
    const sellerProduct = this.sellerProductRepository.create({
      seller,
      product: productInfo.product,
      productInfo,
      price: input.price,
      costPrice: input.costPrice,
      discount: input.discount,
      stockQuantity: input.stockQuantity,
    });
    return this.sellerProductRepository.save(sellerProduct);
  }

  async updateSellerProduct(
    sellerId: number,
    input: UpdateSellerProductInput
  ): Promise<SellerProduct> {
    const sellerProduct = await this.sellerProductRepository.findOne({
      where: { id: input.id },
      relations: ['seller'],
    });
    if (!sellerProduct) throw new Error('Seller product not found');
    if (sellerProduct.seller.id !== sellerId) throw new Error('Unauthorized');
    Object.assign(sellerProduct, input);
    return this.sellerProductRepository.save(sellerProduct);
  }
}
