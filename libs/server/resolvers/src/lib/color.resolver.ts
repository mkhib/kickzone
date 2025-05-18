import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ColorService } from '@kickzone-workspace/services';
import { Color } from '@kickzone-workspace/entities';
import { RolesGuard } from '@kickzone-workspace/guards';
import { UserRole } from '@kickzone-workspace/entities';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { CreateCategoryInput } from '@kickzone-workspace/inputs'; // Reusing CreateCategoryInput for now, will create specific Color input later

@Resolver(() => Color)
export class ColorResolver {
  constructor(private readonly colorService: ColorService) {}

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

  @Mutation(() => Color)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async createColor(
    @Args('input') input: CreateCategoryInput // Temporarily using this input type
  ): Promise<Color> {
    // Assuming CreateCategoryInput has a 'name' field, need to adjust once Color input is created
    // Also need to add hexCode to the input
    // For now, using a placeholder hexCode 'temp'
    return this.colorService.createColor(input.name, '#000000');
  }

  @Mutation(() => Color, { nullable: true })
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async updateColor(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: CreateCategoryInput // Temporarily using this input type
  ): Promise<Color | null> {
    // Assuming CreateCategoryInput has a 'name' field, need to adjust once Color input is created
    // Also need to add hexCode to the input
    // For now, using a placeholder hexCode 'temp'
    return this.colorService.updateColor(id, input.name, '#000000');
  }

  @Mutation(() => Boolean)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async deleteColor(
    @Args('id', { type: () => Int }) id: number
  ): Promise<boolean> {
    return this.colorService.deleteColor(id);
  }
}
