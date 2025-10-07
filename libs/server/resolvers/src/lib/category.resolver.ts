import { ResolveField, Parent, Context, Resolver } from '@nestjs/graphql';
import { Category } from '@kickzone-workspace/entities';
import { TranslationService } from '@kickzone-workspace/services';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private translationService: TranslationService) {}

  @ResolveField(() => String)
  async name(
    @Parent() category: Category,
    @Context() context: { req: { locale?: string } }
  ): Promise<string> {
    const locale = context.req.locale || 'en';

    return this.translationService.getTranslation(
      'category',
      category.id,
      locale,
      'name',
      category.slug // Fallback to slug if no translation
    );
  }
}
