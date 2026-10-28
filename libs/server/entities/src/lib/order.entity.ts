import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { SellerInfo } from './seller-info.entity';

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

  @Field(() => Boolean, { defaultValue: false })
  @Column({ type: 'boolean', default: false })
  stockReserved!: boolean;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  shippingCost: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

// Payment metadata for verification
@Field(() => Float, { nullable: true })
@Column('decimal', { precision: 12, scale: 2, nullable: true })
paymentAmount?: number | null;

@Field(() => String, { nullable: true })
@Column({ nullable: true })
paymentCurrency?: string | null;

@Field(() => String, { nullable: true })
@Column({ nullable: true })
paymentAuthority?: string | null;

  // Seller snapshot fields - preserve seller info at order time
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  sellerStoreName?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  sellerPhone?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  sellerAddress?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  notes?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  trackingNumber?: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  paymentVerifiedAt?: Date | null;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Int)
  @Column()
  sellerId: number;

  @ManyToOne(() => SellerInfo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sellerId' })
  seller: SellerInfo;

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

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  sellerProductId?: string;

  // Product pricing snapshot fields - preserve pricing details at order time
  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  originalPrice?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  discountPercentage?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  productInfoId?: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
