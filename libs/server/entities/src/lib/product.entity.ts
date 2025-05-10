import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  Relation,
} from 'typeorm';
import { ProductInfo } from './product-info.entity';
import { Category } from './category.entity';
import { SellerProduct } from './seller-product.entity';
import { EdgeType, ConnectionType } from '@kickzone-workspace/utils';

@ObjectType()
@Entity()
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
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

  @OneToMany(() => SellerProduct, (sellerProduct) => sellerProduct.product)
  sellerProducts: Relation<SellerProduct>[];
}

@ObjectType()
export class ProductEdge extends EdgeType<Product> {
  @Field(() => Product)
  node: Product;
}

@ObjectType()
export class ProductConnection extends ConnectionType<Product> {
  @Field(() => [ProductEdge])
  edges: ProductEdge[];
}
