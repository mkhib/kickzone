import {
  InputType,
  Field,
  Int,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { SizeKind } from '@kickzone-workspace/product-sizes';
import { ProductInfoFilterInput } from './product-info-filter.input';

export enum ProductArchivedStatus {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

registerEnumType(ProductArchivedStatus, {
  name: 'ProductArchivedStatus',
});

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  sku: string;

  @Field(() => [Int])
  categoryIds: number[];

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class UpdateProductInput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  sku: string;

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

  @Field(() => SizeKind)
  sizeKind: SizeKind;

  @Field(() => [Int])
  colorIds: number[];

  @Field(() => Float)
  weight: number;
}

@InputType()
export class ProductFilterInput {
  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  searchTerm?: string;

  @Field(() => ProductInfoFilterInput, { nullable: true })
  productInfoFilter?: ProductInfoFilterInput;

  @Field(() => [Int], { nullable: true })
  categoryIds?: number[];

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

  @Field(() => ProductArchivedStatus, { nullable: true })
  archivedStatus?: ProductArchivedStatus;

  @Field(() => Int, { nullable: true })
  sellerId?: number;

  @Field({ nullable: true })
  onlyWithSellers?: boolean;

  @Field({ nullable: true })
  onlyInStock?: boolean;
}
