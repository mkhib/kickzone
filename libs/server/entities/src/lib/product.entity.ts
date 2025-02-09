import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ProductInfo } from './product-info.entity';
import { Category } from './category.entity';

@ObjectType()
@Entity()
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [ProductInfo])
  @OneToMany(() => ProductInfo, (productInfo) => productInfo.product)
  productInfos: ProductInfo[];

  @Field(() => [Category])
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];

  @Field(() => Float)
  @Column('decimal', { precision: 5, scale: 2 })
  discount: number;
}
