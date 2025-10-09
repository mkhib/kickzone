import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  slug: string;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  sortOrder?: number;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => Int, { nullable: true })
  sortOrder?: number;

  @Field({ nullable: true })
  isActive?: boolean;
}
