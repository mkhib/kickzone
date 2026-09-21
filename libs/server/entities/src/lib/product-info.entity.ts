import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { Product } from './product.entity';
import { Color } from './color.entity';
import { ProductInfoColor } from './product-info-color.entity';

@ObjectType()
@Entity()
export class ProductInfo {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  size: string;

  @OneToMany(() => ProductInfoColor, (link) => link.productInfo, {
    cascade: true,
    eager: true,
  })
  colorLinks: Relation<ProductInfoColor>[];

  /** Ordered colors for this variant (resolved from colorLinks). */
  @Field(() => [Color])
  colors: Color[];

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  weight: number;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.productInfos)
  product: Product;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true, default: '' })
  images: string[];
}
