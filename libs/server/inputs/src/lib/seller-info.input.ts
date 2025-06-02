import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class CreateSellerInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;
}

@InputType()
export class UpdateSellerInput extends PartialType(CreateSellerInput) {
  @Field(() => Int)
  id: number;
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
}

@InputType()
export class UpdateSellerProductInput extends PartialType(
  CreateSellerProductInput
) {
  @Field(() => Int)
  id: number;
}
