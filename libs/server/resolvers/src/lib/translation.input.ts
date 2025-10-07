import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class TranslationInput {
  @Field()
  entityType: string;

  @Field(() => Int)
  entityId: number;

  @Field()
  locale: string;

  @Field()
  fieldName: string;

  @Field()
  value: string;

  @Field({ nullable: true, defaultValue: false })
  isAutoTranslated?: boolean;

  @Field(() => Int, { nullable: true })
  translatedBy?: number;
}

@InputType()
export class BulkTranslationInput {
  @Field()
  entityType: string;

  @Field(() => [Int])
  entityIds: number[];

  @Field()
  sourceLocale: string;

  @Field(() => [String])
  targetLocales: string[];
}
