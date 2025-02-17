import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

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
