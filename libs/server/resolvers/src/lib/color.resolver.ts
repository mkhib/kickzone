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
import { Color } from '@kickzone-workspace/entities';
import { TranslationService, ColorService } from '@kickzone-workspace/services';
import { CreateColorInput, UpdateColorInput } from '@kickzone-workspace/inputs';

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
  async createColor(
    @Args('input') input: CreateColorInput,
    @Args('name', { nullable: true }) name?: string
  ): Promise<Color> {
    return this.colorService.createColor(input, name);
  }

  @Mutation(() => Color)
  async updateColor(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateColorInput
  ): Promise<Color> {
    return this.colorService.updateColor(id, input);
  }

  @Mutation(() => Boolean)
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
