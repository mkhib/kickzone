import { ObjectType, Field, ID, Int, Float, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ShippingStrategy {
  FULL_SUM = 'full_sum', // Sum all seller fees (current behavior)
  TIERED_DISCOUNT = 'tiered_discount', // First seller full, others discounted
  TIERED_FIXED = 'tiered_fixed', // First seller full, others fixed fee
  HIGHEST_ONLY = 'highest_only', // Only charge highest fee
  AVERAGE = 'average', // Charge average of all fees
}

registerEnumType(ShippingStrategy, {
  name: 'ShippingStrategy',
});

@ObjectType()
@Entity('platform_settings')
export class PlatformSettings {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  // Free shipping configuration
  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  freeShippingThreshold?: number;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  freeShippingEnabled: boolean;

  // Shipping strategy
  @Field(() => String)
  @Column({
    type: 'enum',
    enum: ShippingStrategy,
    default: ShippingStrategy.TIERED_DISCOUNT,
  })
  shippingStrategy: ShippingStrategy;

  // Tiered shipping configuration
  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  additionalSellerDiscount?: number; // 0.5 = 50% discount

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  additionalSellerFixedFee?: number; // Fixed fee per additional seller

  // Maximum shipping cap
  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  maxShippingCap?: number;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  maxShippingCapEnabled: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}

