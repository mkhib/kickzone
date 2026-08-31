import { Field, InputType, Int, Float } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
} from 'class-validator';

@InputType()
export class CreateSellerInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  storeName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  shippingFee?: number;

  @Field({ nullable: true })
  @IsOptional()
  canManageCatalog?: boolean;
}

@InputType()
export class UpdateSellerInput {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  username?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  storeName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  shippingFee?: number;

  @Field({ nullable: true })
  @IsOptional()
  isActive?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  canManageCatalog?: boolean;
}

@InputType()
export class CreateSellerProductInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  productInfoId: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  costPrice: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  stockQuantity: number;

  @Field({ nullable: true })
  @IsOptional()
  recommended?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  boxLess?: boolean;
}

@InputType()
export class UpdateSellerProductInput {
  @Field(() => String)
  @IsNotEmpty()
  id: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  productInfoId?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  price?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  costPrice?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  stockQuantity?: number;

  @Field({ nullable: true })
  @IsOptional()
  recommended?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  boxLess?: boolean;
}

@InputType()
export class SellerFilterInput {
  @Field({ nullable: true })
  searchTerm?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field(() => [Int], { nullable: true })
  ids?: number[];

  @Field(() => Int, { nullable: true })
  first?: number;

  @Field({ nullable: true })
  after?: string;
}
