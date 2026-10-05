import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSiteLanguageInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  nativeName: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isRTL?: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  isActive?: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isDefault?: boolean;
}

@InputType()
export class UpdateSiteLanguageInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  nativeName?: string;

  @Field(() => Boolean, { nullable: true })
  isRTL?: boolean;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;

  @Field(() => Boolean, { nullable: true })
  isDefault?: boolean;
}
