import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('translations')
@Index(['entityType', 'entityId', 'locale', 'fieldName'], { unique: true })
@Index(['entityType', 'entityId'])
@Index(['locale'])
@Index(['entityType', 'locale'])
export class Translation {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 50 })
  entityType: string; // 'category', 'color', 'brand', 'product', 'productInfo'

  @Field(() => Int)
  @Column()
  entityId: number;

  @Field()
  @Column({ length: 10 })
  locale: string; // 'en', 'fa', 'ar', 'es', etc.

  @Field()
  @Column({ length: 50 })
  fieldName: string; // 'name', 'description', 'metaTitle', 'metaDescription'

  @Field()
  @Column('text')
  value: string;

  @Field()
  @Column({ default: false })
  isAutoTranslated: boolean;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  translatedBy?: number; // User ID who provided manual translation

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
