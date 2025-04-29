import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@ObjectType()
@Entity()
export class ProductInfo {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  size: string;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  costPrice: number;

  @Field()
  @Column()
  color: string;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  weight: number;

  @Field(() => Float)
  @Column('decimal', { precision: 5, scale: 2 })
  discount: number;

  @Field(() => Int)
  @Column()
  stockQuantity: number;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.productInfos)
  product: Product;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true, default: '' })
  images: string[];
}
