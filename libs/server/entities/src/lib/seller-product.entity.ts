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

@Entity()
export class SellerProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SellerInfo, (seller) => seller.sellerProducts)
  seller: SellerInfo;

  @ManyToOne(() => Product, (product) => product.sellerProducts)
  product: Relation<Product>;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  discount: number;

  @Column()
  stockQuantity: number;
}
