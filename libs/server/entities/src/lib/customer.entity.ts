import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@ObjectType()
@Entity('customer_profiles')
export class CustomerProfile {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  userId: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  address?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  state?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  zipCode?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  country?: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
