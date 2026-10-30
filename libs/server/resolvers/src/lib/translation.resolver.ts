import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TranslationService } from '@kickzone-workspace/services';
import { Translation } from '@kickzone-workspace/entities';
import { CatalogGuard } from '@kickzone-workspace/guards';
import { TranslationInput, BulkTranslationInput } from './translation.input';

@Resolver(() => Translation)
export class TranslationResolver {
  constructor(private translationService: TranslationService) {}

  @Query(() => String)
  async getTranslation(
    @Args('entityType') entityType: string,
    @Args('entityId', { type: () => Int }) entityId: number,
    @Args('locale') locale: string,
    @Args('fieldName') fieldName: string,
    @Args('fallback', { nullable: true }) fallback?: string,
    @Context() context?: { req: { locale?: string } }
  ): Promise<string> {
    const requestLocale = context?.req?.locale || locale;
    return this.translationService.getTranslation(
      entityType,
      entityId,
      requestLocale,
      fieldName,
      fallback
    );
  }

  @Mutation(() => Translation)
  @UseGuards(CatalogGuard)
  async setTranslation(
    @Args('input') input: TranslationInput
  ): Promise<Translation> {
    return this.translationService.setTranslation(input);
  }

  @Mutation(() => Boolean)
  @UseGuards(CatalogGuard)
  async bulkTranslateEntities(
    @Args('input') input: BulkTranslationInput
  ): Promise<boolean> {
    await this.translationService.bulkTranslateEntities(input);
    return true;
  }

  @Query(() => [Translation])
  async getEntityTranslations(
    @Args('entityType') entityType: string,
    @Args('entityId', { type: () => Int }) entityId: number
  ): Promise<Translation[]> {
    const translationsMap = await this.translationService.getEntityTranslations(
      entityType,
      entityId
    );
    const translations: Translation[] = [];

    translationsMap.forEach((localeMap, fieldName) => {
      localeMap.forEach((value, locale) => {
        translations.push({
          id: 0, // This will be set by the actual database entity
          entityType,
          entityId,
          locale,
          fieldName,
          value,
          isAutoTranslated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Translation);
      });
    });

    return translations;
  }

  @Mutation(() => Boolean)
  @UseGuards(CatalogGuard)
  async deleteEntityTranslations(
    @Args('entityType') entityType: string,
    @Args('entityId', { type: () => Int }) entityId: number
  ): Promise<boolean> {
    await this.translationService.deleteEntityTranslations(
      entityType,
      entityId
    );
    return true;
  }

  @Query(() => String)
  async getTranslationWithFallback(
    @Args('entityType') entityType: string,
    @Args('entityId', { type: () => Int }) entityId: number,
    @Args('locale') locale: string,
    @Args('fieldName') fieldName: string,
    @Args('fallback') fallback: string,
    @Context() context?: { req: { locale?: string } }
  ): Promise<string> {
    const requestLocale = context?.req?.locale || locale;
    return this.translationService.getTranslation(
      entityType,
      entityId,
      requestLocale,
      fieldName,
      fallback
    );
  }
}
