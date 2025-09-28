import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  SellerFilterInput,
} from '@kickzone-workspace/inputs';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';

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
    private userRepository: Repository<User>,
    private authService: AuthService
  ) {}

  async create(createSellerInput: CreateSellerInput): Promise<SellerInfo> {
    console.log(`Creating new seller with email: ${createSellerInput.email}`);

    // Check if email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createSellerInput.email },
    });
    if (existingUser) {
      console.log(`Email ${createSellerInput.email} already exists`);
      throw new Error('Email already exists');
    }

    // Create user with hashed password
    const hashedPassword = await bcrypt.hash(createSellerInput.password, 10);
    const user = this.userRepository.create({
      name: createSellerInput.name,
      lastName: createSellerInput.lastName,
      username: createSellerInput.username,
      email: createSellerInput.email,
      password: hashedPassword,
      role: UserRole.SELLER,
    });
    await this.userRepository.save(user);
    console.log(`Created user for seller: ${user.email}`);

    // Create seller info
    const newSeller = this.sellerRepository.create({
      storeName: createSellerInput.storeName,
      phone: createSellerInput.phone,
      address: createSellerInput.address,
      user,
    });
    const savedSeller = await this.sellerRepository.save(newSeller);
    console.log(`Created seller info for: ${user.email}`);

    // Initiate password setup
    try {
      const baseUrl =
        process.env['SELLERS_FRONTEND_URL'] || 'https://localhost:4500';
      await this.authService.initiatePasswordSetup(user.email, baseUrl);
      console.log(`Initiated password setup for seller: ${user.email}`);
    } catch (error) {
      console.error(
        `Failed to initiate password setup for ${user.email}:`,
        error
      );
    }

    return savedSeller;
  }

  async findAll(filter?: SellerFilterInput): Promise<[SellerInfo[], number]> {
    const query = this.sellerRepository
      .createQueryBuilder('seller')
      .leftJoinAndSelect('seller.user', 'user');

    if (filter?.searchTerm) {
      query.andWhere(
        '(LOWER(user.name) LIKE :searchTerm OR LOWER(seller.storeName) LIKE :searchTerm OR LOWER(user.email) LIKE :searchTerm)',
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

  async findOneByUserId(userId: string): Promise<SellerInfo | null> {
    return this.sellerRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'sellerProducts'],
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

    // Update user info if provided
    if (
      updateSellerInput.name ||
      updateSellerInput.username ||
      updateSellerInput.email
    ) {
      const user = seller.user;
      if (updateSellerInput.name) user.name = updateSellerInput.name;
      if (updateSellerInput.username)
        user.username = updateSellerInput.username;
      if (updateSellerInput.email) user.email = updateSellerInput.email;
      await this.userRepository.save(user);
    }

    // Update seller info
    if (updateSellerInput.storeName)
      seller.storeName = updateSellerInput.storeName;
    if (updateSellerInput.phone) seller.phone = updateSellerInput.phone;
    if (updateSellerInput.address) seller.address = updateSellerInput.address;

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
    const productInfo = await this.productInfoRepository.findOne({
      where: { id: input.productInfoId },
      relations: ['product'],
    });
    if (!productInfo) throw new Error('Product variant not found');
    if (!productInfo.product)
      throw new Error('Product not found for this variant');

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
      relations: ['seller', 'product', 'productInfo'],
    });
    if (!sellerProduct) throw new Error('Seller product not found');
    if (sellerProduct.seller.id !== sellerId) throw new Error('Unauthorized');
    Object.assign(sellerProduct, input);
    return this.sellerProductRepository.save(sellerProduct);
  }

  async findSellerProductById(
    sellerProductId: number,
    sellerId: number
  ): Promise<SellerProduct | null> {
    return this.sellerProductRepository.findOne({
      where: {
        id: sellerProductId,
        seller: { id: sellerId },
      },
      relations: [
        'product',
        'productInfo',
        'productInfo.color',
        'product.productInfos',
        'product.categories',
      ],
    });
  }
}
