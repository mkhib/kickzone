import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Color } from './color.entity';

@ObjectType()
@Entity()
export class ProductInfo {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  size: string;

  @Field(() => Color, { nullable: true })
  @ManyToOne(() => Color, { nullable: true, eager: true })
  color: Color;

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
