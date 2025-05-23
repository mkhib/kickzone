import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateColorInput {
  @Field()
  name: string;

  @Field()
  hexCode: string;
}

@InputType()
export class UpdateColorInput {
  @Field()
  name: string;

  @Field()
  hexCode: string;
}
