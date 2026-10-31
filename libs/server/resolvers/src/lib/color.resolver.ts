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
import { Color } from '@kickzone-workspace/entities';
import { CatalogGuard } from '@kickzone-workspace/guards';
import { TranslationService, ColorService } from '@kickzone-workspace/services';
import { CreateColorInput, UpdateColorInput } from '@kickzone-workspace/inputs';

import {
  createColorSchema,
  optionalDisplayNameSchema,
  updateColorSchema,
} from '@kickzone-workspace/validation';
import { ZodValidationPipe } from './zod-validation.pipe';

@Resolver(() => Color)
export class ColorResolver {
  constructor(
    private translationService: TranslationService,
    private colorService: ColorService
  ) {}

  // Queries
  @Query(() => [Color])
  async colors(): Promise<Color[]> {
    return this.colorService.getColors();
  }

  @Query(() => Color, { nullable: true })
  async color(
    @Args('id', { type: () => Int }) id: number
  ): Promise<Color | null> {
    return this.colorService.getColorById(id);
  }

  // Mutations
  @Mutation(() => Color)
  @UseGuards(CatalogGuard)
  async createColor(
    @Args('input', new ZodValidationPipe(createColorSchema)) input: CreateColorInput,
    @Args(
      'name',
      { nullable: true },
      new ZodValidationPipe(optionalDisplayNameSchema)
    )
    name?: string
  ): Promise<Color> {
    return this.colorService.createColor(input, name);
  }

  @Mutation(() => Color)
  @UseGuards(CatalogGuard)
  async updateColor(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', new ZodValidationPipe(updateColorSchema)) input: UpdateColorInput,
    @Args(
      'name',
      { nullable: true },
      new ZodValidationPipe(optionalDisplayNameSchema)
    )
    name?: string,
    @Context() context?: { req: { locale?: string } }
  ): Promise<Color> {
    return this.colorService.updateColor(
      id,
      input,
      name,
      context?.req?.locale || 'en'
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(CatalogGuard)
  async deleteColor(
    @Args('id', { type: () => Int }) id: number
  ): Promise<boolean> {
    return this.colorService.deleteColor(id);
  }

  @ResolveField(() => String)
  async name(
    @Parent() color: Color,
    @Context() context: { req: { locale?: string } }
  ): Promise<string> {
    const locale = context.req.locale || 'en';

    return this.translationService.getTranslation(
      'color',
      color.id,
      locale,
      'name',
      color.hexCode // Fallback to hex code if no translation
    );
  }
}
