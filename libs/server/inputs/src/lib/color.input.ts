import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateColorInput {
  @Field()
  hexCode: string;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  sortOrder?: number;
}

@InputType()
export class UpdateColorInput {
  @Field()
  hexCode: string;

  @Field(() => Int, { nullable: true })
  sortOrder?: number;

  @Field({ nullable: true })
  isActive?: boolean;
}
