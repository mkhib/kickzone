import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ColorService } from '@kickzone-workspace/services';
import { Color } from '@kickzone-workspace/entities';
import { RolesGuard } from '@kickzone-workspace/guards';
import { UserRole } from '@kickzone-workspace/entities';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { CreateColorInput, UpdateColorInput } from '@kickzone-workspace/inputs';

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
  async createColor(@Args('input') input: CreateColorInput): Promise<Color> {
    return this.colorService.createColor(input);
  }

  @Mutation(() => Color, { nullable: true })
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async updateColor(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateColorInput
  ): Promise<Color | null> {
    return this.colorService.updateColor(id, input);
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
