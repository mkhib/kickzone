// src/entities/seller-product.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Relation,
} from 'typeorm';
import { SellerInfo } from './seller-info.entity';
import { Product } from './product.entity';
import { ProductInfo } from './product-info.entity';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class SellerProduct {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => SellerInfo, { nullable: true })
  @ManyToOne(() => SellerInfo, (seller) => seller.sellerProducts)
  seller: SellerInfo;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.sellerProducts)
  product: Relation<Product>;

  @Field(() => ProductInfo, { nullable: true })
  @ManyToOne(() => ProductInfo)
  productInfo: ProductInfo;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  costPrice: number;

  @Field(() => Float)
  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  discount: number;

  @Field(() => Int)
  @Column()
  stockQuantity: number;
}
