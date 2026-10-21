import { ConnectionType, EdgeType } from '@kickzone-workspace/utils';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';
import { ProductInfo } from './product-info.entity';
import { SellerProduct } from './seller-product.entity';
import { SellerInfo } from './seller-info.entity';
import { ProductDescription } from './product-description.entity';

@ObjectType()
@Entity()
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field({ nullable: true })
  @Column({ unique: true, nullable: true })
  sku?: string | null;

  @Field(() => [ProductInfo])
  @OneToMany(() => ProductInfo, (productInfo) => productInfo.product, {
    cascade: true,
  })
  productInfos: ProductInfo[];

  @Field(() => [Category])
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];

  @Field(() => Brand, { nullable: true })
  @ManyToOne(() => Brand, (brand) => brand.products, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'brandId' })
  brand?: Brand | null;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  brandId?: number | null;

  @Field(() => SellerInfo, { nullable: true })
  @ManyToOne(() => SellerInfo, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'sellerId' })
  seller?: SellerInfo | null;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  sellerId?: number | null;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Field(() => [ProductDescription], { nullable: true })
  @OneToMany(
    () => ProductDescription,
    (productDescription) => productDescription.product,
    { cascade: true }
  )
  descriptions?: Relation<ProductDescription>[];

  @Field(() => [SellerProduct], { nullable: true })
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
