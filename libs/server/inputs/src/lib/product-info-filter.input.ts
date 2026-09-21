import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { SizeKind } from '@kickzone-workspace/product-sizes';

@InputType()
export class ProductInfoFilterInput {
  @Field(() => [String], { nullable: true })
  size?: string[];

  @Field(() => SizeKind, { nullable: true })
  sizeKind?: SizeKind;

  @Field(() => [Float], { nullable: true })
  price?: number[];

  @Field(() => [Float], { nullable: true })
  costPrice?: number[];

  @Field(() => [Int], { nullable: true })
  colorId?: number[];

  @Field(() => [Float], { nullable: true })
  weight?: number[];

  @Field(() => [Float], { nullable: true })
  discount?: number[];

  @Field(() => [Int], { nullable: true })
  stockQuantity?: number[];
}
