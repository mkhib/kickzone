import { ConnectionType, EdgeType } from '@kickzone-workspace/utils';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Category } from './category.entity';
import { ProductInfo } from './product-info.entity';
import { SellerProduct } from './seller-product.entity';

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

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Field(() => [SellerProduct])
  @OneToMany(() => SellerProduct, (sellerProduct) => sellerProduct.product)
  sellerProducts: Relation<SellerProduct>[];

  @Field({ defaultValue: false })
  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
    comment: 'For partitioning',
  })
  archived: boolean;
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
