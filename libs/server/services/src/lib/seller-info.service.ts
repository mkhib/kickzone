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
      name: createSellerInput.name,
      lastName: createSellerInput.lastName,
      username: createSellerInput.username,
      email: createSellerInput.email,
      password: hashedPassword,
      role: UserRole.SELLER,
    });
    await this.userRepository.save(user);

    // Create seller info
    const newSeller = this.sellerRepository.create({
      storeName: createSellerInput.storeName,
      phone: createSellerInput.phone,
      address: createSellerInput.address,
      user,
    });
    const savedSeller = await this.sellerRepository.save(newSeller);

    // Initiate password setup
    try {
      const baseUrl =
        process.env['SELLERS_FRONTEND_URL'] || 'https://127.0.0.1:4500';
      await this.authService.initiatePasswordSetup(user.email, baseUrl);
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

    if (filter?.ids && filter.ids.length > 0) {
      query.andWhere('seller.id IN (:...ids)', { ids: filter.ids });
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
    updateSellerInput: UpdateSellerInput
  ): Promise<SellerInfo | null> {
    const seller = await this.findOne(updateSellerInput.id);
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
    if (updateSellerInput.shippingFee !== undefined)
      seller.shippingFee = updateSellerInput.shippingFee;
    if (updateSellerInput.isActive !== undefined)
      seller.isActive = updateSellerInput.isActive;

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
    input: CreateSellerProductInput,
    allowRecommended = false
  ): Promise<SellerProduct> {
    // Load productInfo with product relation
    const productInfo = await this.productInfoRepository.findOne({
      where: { id: input.productInfoId },
      relations: ['product'],
    });
    if (!productInfo) {
      throw new Error('Product variant not found');
    }
    if (!productInfo.product) {
      throw new Error('Product not found for this variant');
    }

    // Load seller
    const seller = await this.sellerRepository.findOneBy({ id: sellerId });
    if (!seller) {
      throw new Error('Seller not found');
    }

    // Check if seller already has a SellerProduct for this ProductInfo (unique constraint)
    const existingSellerProduct = await this.sellerProductRepository.findOne({
      where: {
        seller: { id: sellerId },
        productInfoId: productInfo.id,
      },
    });

    if (existingSellerProduct) {
      throw new Error(
        `You already have a listing for this product variant (${
          productInfo.size
        } - ${
          productInfo.color?.name || 'No color'
        }). Please update the existing listing instead.`
      );
    }

    // Create new SellerProduct
    const sellerProduct = this.sellerProductRepository.create({
      seller,
      product: productInfo.product,
      productInfo,
      productInfoId: productInfo.id, // Always use the actual productInfo.id
      price: input.price,
      costPrice: input.costPrice,
      discount: input.discount,
      stockQuantity: input.stockQuantity,
      recommended: allowRecommended ? input.recommended ?? false : false,
      boxLess: input.boxLess ?? false,
    });

    console.log(
      `[SellerService] Creating sellerProduct: sellerId=${sellerId}, productId=${productInfo.product.id}, productInfoId=${productInfo.id}`
    );

    try {
      const saved = await this.sellerProductRepository.save(sellerProduct);
      console.log(
        `[SellerService] ✓ SellerProduct ${saved.id} created with productInfoId=${saved.productInfoId}`
      );
      return saved;
    } catch (error: unknown) {
      // Handle unique constraint violation
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorCode = (error as { code?: string })?.code;
      if (errorCode === '23505' || errorMessage.includes('unique')) {
        throw new Error(
          `You already have a listing for this product variant. Please update the existing listing instead.`
        );
      }
      throw error;
    }
  }

  async updateSellerProduct(
    sellerId: number,
    input: UpdateSellerProductInput,
    allowRecommended = false
  ): Promise<SellerProduct> {
    const sellerProduct = await this.sellerProductRepository.findOne({
      where: { id: input.id },
      relations: ['seller', 'product', 'productInfo'],
    });
    if (!sellerProduct) throw new Error('Seller product not found');
    if (sellerProduct.seller.id !== sellerId) throw new Error('Unauthorized');

    // If productInfoId is being updated, load the productInfo relation
    if (
      input.productInfoId !== undefined &&
      input.productInfoId !== sellerProduct.productInfoId
    ) {
      const productInfo = await this.productInfoRepository.findOne({
        where: { id: input.productInfoId },
        relations: ['product'],
      });
      if (!productInfo) throw new Error('Product variant not found');
      if (!productInfo.product)
        throw new Error('Product not found for this variant');

      console.log(
        `[SellerService] Updating sellerProduct ${sellerProduct.id}: productInfoId ${sellerProduct.productInfoId} -> ${input.productInfoId}`
      );

      // Update both the relation and the ID
      sellerProduct.productInfo = productInfo;
      sellerProduct.productInfoId = productInfo.id; // Use actual productInfo.id to ensure consistency
      sellerProduct.product = productInfo.product; // Ensure product is also updated
    }

    // Update other fields
    if (input.price !== undefined) sellerProduct.price = input.price;
    if (input.costPrice !== undefined)
      sellerProduct.costPrice = input.costPrice;
    if (input.discount !== undefined) sellerProduct.discount = input.discount;
    if (input.stockQuantity !== undefined)
      sellerProduct.stockQuantity = input.stockQuantity;
    if (allowRecommended && input.recommended !== undefined) {
      sellerProduct.recommended = input.recommended;
    }
    if (input.boxLess !== undefined) {
      sellerProduct.boxLess = input.boxLess;
    }

    return this.sellerProductRepository.save(sellerProduct);
  }

  async findSellerProductById(
    sellerProductId: string,
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
