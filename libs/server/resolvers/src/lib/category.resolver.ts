import {
  ResolveField,
  Parent,
  Context,
  Resolver,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Category } from '@kickzone-workspace/entities';
import { CatalogGuard } from '@kickzone-workspace/guards';
import {
  TranslationService,
  ProductService,
} from '@kickzone-workspace/services';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '@kickzone-workspace/inputs';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    private translationService: TranslationService,
    private productService: ProductService
  ) {}

  @Mutation(() => Category)
  @UseGuards(CatalogGuard)
  async createCategory(
    @Args('input') input: CreateCategoryInput,
    @Args('name', { nullable: true }) name?: string
  ): Promise<Category> {
    return this.productService.createCategory(input, name);
  }

  @Mutation(() => Category)
  @UseGuards(CatalogGuard)
  async updateCategory(
    @Args('input') input: UpdateCategoryInput,
    @Args('name', { nullable: true }) name?: string,
    @Context() context?: { req: { locale?: string } }
  ): Promise<Category> {
    return this.productService.updateCategory(
      input,
      name,
      context?.req?.locale || 'en'
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(CatalogGuard)
  async deleteCategory(
    @Args('id', { type: () => Int }) id: number
  ): Promise<boolean> {
    await this.productService.deleteCategory(id);
    return true;
  }

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
