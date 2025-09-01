import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class AddToCartInput {
  @Field(() => String)
  productId: string;

  @Field(() => String)
  productName: string;

  @Field(() => String, { nullable: true })
  productImage?: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  unitPrice: number;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  size?: string;

  @Field(() => String)
  sellerId: string;
}

@InputType()
export class UpdateCartItemInput {
  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  size?: string;
}
