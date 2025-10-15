import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Currency {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 3 })
  @Index()
  code: string; // e.g., 'USD', 'IRR', 'GBP'

  @Field()
  @Column()
  name: string; // e.g., 'US Dollar', 'Iranian Rial', 'British Pound'

  @Field()
  @Column()
  symbol: string; // e.g., '$', 'تومان', '£'

  @Field(() => Int)
  @Column({ default: 0 })
  decimalPlaces: number; // For proper rounding (0 for IRR/Toman, 2 for USD)

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @Column({ default: false })
  isBaseCurrency: boolean; // USD will be the base currency

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
