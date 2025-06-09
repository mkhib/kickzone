import { ObjectType, Field, Int } from '@nestjs/graphql';
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

@ObjectType()
@Entity()
export class SellerInfo {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  email: string;

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

  @OneToOne(() => User, (user) => user.sellerInfo)
  @JoinColumn()
  user: Relation<User>;

  @OneToMany(() => SellerProduct, (sellerProduct) => sellerProduct.seller)
  sellerProducts: SellerProduct[];
}
