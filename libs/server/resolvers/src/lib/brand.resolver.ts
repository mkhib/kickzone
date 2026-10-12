import {
  ResolveField,
  Parent,
  Context,
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Brand } from '@kickzone-workspace/entities';
import { CatalogGuard } from '@kickzone-workspace/guards';
import { TranslationService, BrandService } from '@kickzone-workspace/services';
import { CreateBrandInput, UpdateBrandInput } from '@kickzone-workspace/inputs';

@Resolver(() => Brand)
export class BrandResolver {
  constructor(
    private translationService: TranslationService,
    private brandService: BrandService
  ) {}

  @Query(() => [Brand])
  async brands(
    @Args('onlyWithProducts', { type: () => Boolean, nullable: true })
    onlyWithProducts?: boolean
  ): Promise<Brand[]> {
    return this.brandService.getBrands({
      onlyWithProducts: onlyWithProducts === true,
    });
  }

  @Query(() => Brand, { nullable: true })
  async brand(
    @Args('id', { type: () => Int }) id: number
  ): Promise<Brand | null> {
    return this.brandService.getBrandById(id);
  }

  @Mutation(() => Brand)
  @UseGuards(CatalogGuard)
  async createBrand(
    @Args('input') input: CreateBrandInput,
    @Args('name', { nullable: true }) name?: string
  ): Promise<Brand> {
    return this.brandService.createBrand(input, name);
  }

  @Mutation(() => Brand)
  @UseGuards(CatalogGuard)
  async updateBrand(
    @Args('input') input: UpdateBrandInput,
    @Args('name', { nullable: true }) name?: string,
    @Context() context?: { req: { locale?: string } }
  ): Promise<Brand> {
    return this.brandService.updateBrand(
      input,
      name,
      context?.req?.locale || 'en'
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(CatalogGuard)
  async deleteBrand(
    @Args('id', { type: () => Int }) id: number
  ): Promise<boolean> {
    return this.brandService.deleteBrand(id);
  }

  @ResolveField(() => String)
  async name(
    @Parent() brand: Brand,
    @Context() context: { req: { locale?: string } }
  ): Promise<string> {
    const locale = context.req.locale || 'en';

    return this.translationService.getTranslation(
      'brand',
      brand.id,
      locale,
      'name',
      brand.slug
    );
  }
}
