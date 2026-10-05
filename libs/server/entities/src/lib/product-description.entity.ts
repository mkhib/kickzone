import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Product } from './product.entity';
import { SiteLanguage } from './site-language.entity';

@ObjectType()
@Entity('product_descriptions')
@Index(['productId', 'languageId'], { unique: true })
@Index(['productId'])
@Index(['languageId'])
export class ProductDescription {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.descriptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Relation<Product>;

  @Field(() => Int)
  @Column()
  productId: number;

  @Field(() => SiteLanguage)
  @ManyToOne(() => SiteLanguage, (lang) => lang.productDescriptions, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'languageId' })
  language: Relation<SiteLanguage>;

  @Field(() => Int)
  @Column()
  languageId: number;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
