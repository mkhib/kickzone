import { Field, ObjectType, ID, Int, Float } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@ObjectType()
@Entity('carts')
export class Cart {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  userId: string;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  subtotal: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  items: CartItem[];
}

@ObjectType()
@Entity('cart_items')
export class CartItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  cartId: string;

  @Field(() => String)
  @Column()
  productId: string;

  @Field(() => String)
  @Column()
  productName: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  productImage?: string;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  size?: string;

  @Field(() => String)
  @Column()
  sellerId: string;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
