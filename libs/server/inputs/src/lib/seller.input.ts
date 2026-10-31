import { Field, InputType, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateSellerInput {
  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  storeName: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field(() => Float, { nullable: true })
  shippingFee?: number;

  @Field({ nullable: true })
  canManageCatalog?: boolean;
}

@InputType()
export class UpdateSellerInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  storeName?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field(() => Float, { nullable: true })
  shippingFee?: number;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  canManageCatalog?: boolean;
}

@InputType()
export class CreateSellerProductInput {
  @Field(() => Int)
  productInfoId: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  costPrice: number;

  @Field(() => Float)
  discount: number;

  @Field(() => Int)
  stockQuantity: number;

  @Field({ nullable: true })
  recommended?: boolean;

  @Field({ nullable: true })
  boxLess?: boolean;
}

@InputType()
export class UpdateSellerProductInput {
  @Field(() => String)
  id: string;

  @Field(() => Int, { nullable: true })
  productInfoId?: number;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => Float, { nullable: true })
  costPrice?: number;

  @Field(() => Float, { nullable: true })
  discount?: number;

  @Field(() => Int, { nullable: true })
  stockQuantity?: number;

  @Field({ nullable: true })
  recommended?: boolean;

  @Field({ nullable: true })
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
