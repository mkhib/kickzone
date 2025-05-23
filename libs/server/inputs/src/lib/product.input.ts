import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { ProductInfoFilterInput } from './product-info-filter.input';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field(() => Float)
  discount: number;

  @Field(() => [Int])
  categoryIds: number[];

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class CreateProductInfoInput {
  @Field(() => Int)
  productId: number;

  @Field()
  size: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  costPrice: number;

  @Field(() => Int)
  colorId: number;

  @Field(() => Float)
  weight: number;

  @Field(() => Float)
  discount: number;

  @Field(() => Int)
  stockQuantity: number;
}

@InputType()
export class ProductFilterInput {
  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  searchTerm?: string;

  @Field(() => ProductInfoFilterInput, { nullable: true })
  productInfoFilter?: ProductInfoFilterInput;

  @Field({ nullable: true })
  first?: number;

  @Field({ nullable: true })
  after?: string;

  @Field(() => Int, { nullable: true })
  categoryId?: number;

  @Field({ nullable: true })
  sort?: string;

  @Field({ nullable: true })
  sortOrder?: 'asc' | 'desc';
}
