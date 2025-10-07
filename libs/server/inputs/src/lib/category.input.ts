import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  slug: string;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  sortOrder?: number;
}
