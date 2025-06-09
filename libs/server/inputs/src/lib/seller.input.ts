import { Field, InputType, Int, Float } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
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

  @Field({ nullable: true })
  @IsOptional()
  isActive?: boolean;
}

@InputType()
export class CreateSellerProductInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
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
}

@InputType()
export class UpdateSellerProductInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
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
}

@InputType()
export class SellerFilterInput {
  @Field({ nullable: true })
  searchTerm?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field(() => Int, { nullable: true })
  first?: number;

  @Field({ nullable: true })
  after?: string;
}
