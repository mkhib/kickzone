import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
  Relation,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductDescription } from './product-description.entity';

@ObjectType()
@Entity('site_languages')
export class SiteLanguage {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 10 })
  @Index()
  code: string; // e.g., 'en', 'fa', 'ar'

  @Field()
  @Column({ length: 100 })
  name: string; // e.g., 'English', 'Persian'

  @Field()
  @Column({ length: 100 })
  nativeName: string; // e.g., 'English', 'فارسی'

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  isRTL: boolean;

  @Field(() => Boolean, { defaultValue: true })
  @Column({ default: true })
  isActive: boolean;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  isDefault: boolean;

  @OneToMany(
    () => ProductDescription,
    (productDescription) => productDescription.language
  )
  productDescriptions: Relation<ProductDescription>[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
