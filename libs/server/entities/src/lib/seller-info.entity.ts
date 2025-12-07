import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Relation,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { SellerProduct } from './seller-product.entity';
import { Connection, Edge, PageInfo } from '@kickzone-workspace/utils';

@ObjectType()
@Entity()
export class SellerInfo {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  storeName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address?: string;

  @Field({ defaultValue: true })
  @Column({ default: true })
  isActive: boolean;

  @Field(() => Float, { defaultValue: 0 })
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  shippingFee: number;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn()
  user: Relation<User>;

  @OneToMany(() => SellerProduct, (sellerProduct) => sellerProduct.seller)
  sellerProducts: SellerProduct[];
}

@ObjectType()
export class SellerEdge implements Edge<SellerInfo> {
  @Field(() => SellerInfo)
  node: SellerInfo;

  @Field()
  cursor: string;
}

@ObjectType()
export class SellerConnection implements Connection<SellerInfo> {
  @Field(() => [SellerEdge])
  edges: SellerEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
