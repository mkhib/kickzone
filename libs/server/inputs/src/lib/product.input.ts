import {
  InputType,
  Field,
  Int,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
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
  @IsOptional()
  @IsNumber()
  languageId?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  languageCode?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;
}

@InputType()
export class ProductVariantInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  id?: number;

  @Field()
  @IsNotEmpty({ message: 'Variant size is required' })
  @IsString()
  size: string;

  @Field(() => SizeKind, { nullable: true })
  @IsOptional()
  @IsEnum(SizeKind)
  sizeKind?: SizeKind;

  @Field(() => [Int])
  @IsArray()
  @IsNotEmpty({ message: 'Variant colors are required' })
  colorIds: number[];

  @Field(() => Float)
  @IsNumber()
  @IsPositive({ message: 'Weight must be greater than 0' })
  weight: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sku?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Price cannot be negative' })
  price?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Cost price cannot be negative' })
  costPrice?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Discount cannot be negative' })
  discount?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Stock quantity cannot be negative' })
  stockQuantity?: number;

  @Field({ nullable: true })
  @IsOptional()
  boxLess?: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  images?: string[];
}

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  sku: string;

  @Field(() => [Int])
  @IsArray()
  categoryIds: number[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  brandId?: number | null;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => [ProductDescriptionInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDescriptionInput)
  descriptions?: ProductDescriptionInput[];

  @Field(() => [ProductVariantInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantInput)
  variants?: ProductVariantInput[];
}

@InputType()
export class UpdateProductInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  sku: string;

  @Field(() => [Int])
  @IsArray()
  categoryIds: number[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  brandId?: number | null;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => [ProductDescriptionInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDescriptionInput)
  descriptions?: ProductDescriptionInput[];

  @Field(() => [ProductVariantInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantInput)
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
}
