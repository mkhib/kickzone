import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  SellerInfo,
  SellerProduct,
  ProductInfo,
} from '@kickzone-workspace/entities';
import {
  CreateSellerInput,
  UpdateSellerInput,
  CreateSellerProductInput,
  UpdateSellerProductInput,
} from '@kickzone-workspace/inputs';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(SellerInfo)
    private sellerRepository: Repository<SellerInfo>,
    @InjectRepository(SellerProduct)
    private sellerProductRepository: Repository<SellerProduct>,
    @InjectRepository(ProductInfo)
    private productInfoRepository: Repository<ProductInfo>
  ) {}

  create(createSellerInput: CreateSellerInput): Promise<SellerInfo> {
    const newSeller = this.sellerRepository.create(createSellerInput);
    return this.sellerRepository.save(newSeller);
  }

  findAll(): Promise<SellerInfo[]> {
    return this.sellerRepository.find();
  }

  findOne(id: number): Promise<SellerInfo | null> {
    return this.sellerRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateSellerInput: UpdateSellerInput
  ): Promise<SellerInfo | null> {
    await this.sellerRepository.update(id, updateSellerInput);
    return this.findOne(id);
  }

  async createSellerProduct(
    sellerId: number,
    input: CreateSellerProductInput
  ): Promise<SellerProduct> {
    const productInfo = await this.productInfoRepository.findOneBy({
      id: input.productInfoId,
    });
    if (!productInfo) throw new Error('Product variant not found');
    const sellerProduct = this.sellerProductRepository.create({
      seller: { id: sellerId } as any,
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
