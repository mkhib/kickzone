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
export class ProductDescriptionInput {
  @Field(() => Int, { nullable: true })
  languageId?: number;

  @Field({ nullable: true })
  languageCode?: string;

  @Field()
  description: string;
}

@InputType()
export class ProductVariantInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  size: string;

  @Field(() => SizeKind, { nullable: true })
  sizeKind?: SizeKind;

  @Field(() => [Int])
  colorIds: number[];

  @Field(() => Float)
  weight: number;

  @Field({ nullable: true })
  sku?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => Float, { nullable: true })
  costPrice?: number;

  @Field(() => Float, { nullable: true })
  discount?: number;

  @Field(() => Int, { nullable: true })
  stockQuantity?: number;

  @Field({ nullable: true })
  boxLess?: boolean;

  @Field(() => [String], { nullable: true })
  images?: string[];
}

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  sku: string;

  @Field(() => [Int])
  categoryIds: number[];

  @Field(() => Int, { nullable: true })
  brandId?: number | null;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [ProductDescriptionInput], { nullable: true })
  descriptions?: ProductDescriptionInput[];

  @Field(() => [ProductVariantInput], { nullable: true })
  variants?: ProductVariantInput[];
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

  @Field(() => Int, { nullable: true })
  brandId?: number | null;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [ProductDescriptionInput], { nullable: true })
  descriptions?: ProductDescriptionInput[];

  @Field(() => [ProductVariantInput], { nullable: true })
  variants?: ProductVariantInput[];
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

  @Field(() => [String], { nullable: true })
  categorySlugs?: string[];

  @Field({ nullable: true })
  brand?: string;

  @Field(() => [String], { nullable: true })
  brands?: string[];

  @Field(() => [Int], { nullable: true })
  ids?: number[];

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

  @Field({ nullable: true })
  onlyDiscounted?: boolean;
}
