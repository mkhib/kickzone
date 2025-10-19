import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AddToCartInput {
  @Field(() => String)
  sellerProductId: string;

  @Field(() => Int)
  quantity: number;
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
