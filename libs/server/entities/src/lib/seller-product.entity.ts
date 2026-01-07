// src/entities/seller-product.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Relation,
  BeforeInsert,
  BeforeUpdate,
  Index,
} from 'typeorm';
import { SellerInfo } from './seller-info.entity';
import { Product } from './product.entity';
import { ProductInfo } from './product-info.entity';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
@Entity()
@Index(['seller', 'productInfoId'], { unique: true })
export class SellerProduct {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => SellerInfo, { nullable: true })
  @ManyToOne(() => SellerInfo, (seller) => seller.sellerProducts)
  seller: SellerInfo;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.sellerProducts)
  product: Relation<Product>;

  @Field(() => ProductInfo)
  @ManyToOne(() => ProductInfo, { nullable: false })
  productInfo: ProductInfo;

  @Field(() => Int)
  @Column({ nullable: false })
  productInfoId: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 2 })
  costPrice: number;

  @Field(() => Float)
  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  discount: number;

  @Field(() => Int)
  @Column()
  stockQuantity: number;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ type: 'boolean', default: false })
  recommended: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  setProductInfoId() {
    // If productInfo relation is set but productInfoId is not, set it from the relation
    if (this.productInfo && !this.productInfoId) {
      this.productInfoId = this.productInfo.id;
      console.log(
        '🔧 Setting productInfoId:',
        this.productInfoId,
        'from productInfo:',
        this.productInfo.id
      );
    }
    // If productInfoId is set but productInfo relation is not, this is handled in the service layer
  }
}
