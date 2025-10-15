import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Currency } from './currency.entity';
import { User } from './user.entity';

@ObjectType()
@Entity()
@Index(['fromCurrencyId', 'toCurrencyId', 'effectiveDate'])
export class ExchangeRate {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Currency)
  @ManyToOne(() => Currency)
  @JoinColumn({ name: 'fromCurrencyId' })
  fromCurrency: Currency;

  @Column()
  fromCurrencyId: number;

  @Field(() => Currency)
  @ManyToOne(() => Currency)
  @JoinColumn({ name: 'toCurrencyId' })
  toCurrency: Currency;

  @Column()
  toCurrencyId: number;

  @Field(() => Float)
  @Column('decimal', { precision: 20, scale: 6 })
  rate: number; // e.g., 1 USD = 50000 IRR

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  effectiveDate: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  createdBy?: User;

  @Column({ nullable: true })
  createdById?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  notes?: string; // Optional notes about why rate was updated
}
