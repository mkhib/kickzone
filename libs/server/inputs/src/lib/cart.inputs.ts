import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class AddToCartInput {
  @Field(() => String)
  sellerProductId: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
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
