import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class ProductInfoFilterInput {
  @Field(() => [String], { nullable: true })
  size?: string[];

  @Field(() => [Float], { nullable: true })
  price?: number[];

  @Field(() => [Float], { nullable: true })
  costPrice?: number[];

  @Field(() => [String], { nullable: true })
  color?: string[];

  @Field(() => [Float], { nullable: true })
  weight?: number[];

  @Field(() => [Float], { nullable: true })
  discount?: number[];

  @Field(() => [Int], { nullable: true })
  stockQuantity?: number[];
}
