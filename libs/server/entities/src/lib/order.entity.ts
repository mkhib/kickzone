import {
  Field,
  ObjectType,
  ID,
  Int,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
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

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});

@ObjectType()
@Entity('orders')
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  orderNumber: string;

  @Field(() => String)
  @Column()
  customerEmail: string;

  @Field(() => String)
  @Column()
  customerPhone: string;

  @Field(() => String)
  @Column()
  customerName: string;

  @Field(() => String)
  @Column()
  shippingAddress: string;

  @Field(() => String)
  @Column()
  city: string;

  @Field(() => String)
  @Column()
  state: string;

  @Field(() => String)
  @Column()
  zipCode: string;

  @Field(() => String)
  @Column()
  country: string;

  @Field(() => OrderStatus)
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  shippingCost: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  notes?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  trackingNumber?: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @Column()
  sellerId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];
}

@ObjectType()
@Entity('order_items')
export class OrderItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  orderId: string;

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

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
