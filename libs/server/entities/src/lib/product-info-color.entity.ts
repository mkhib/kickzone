import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
} from 'typeorm';
import { Color } from './color.entity';
import { ProductInfo } from './product-info.entity';

@ObjectType()
@Entity('product_info_color')
@Unique(['productInfo', 'position'])
export class ProductInfoColor {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductInfo, (productInfo) => productInfo.colorLinks, {
    onDelete: 'CASCADE',
  })
  productInfo: Relation<ProductInfo>;

  @Field(() => Color)
  @ManyToOne(() => Color, { eager: true, nullable: false })
  color: Relation<Color>;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  position: number;
}
