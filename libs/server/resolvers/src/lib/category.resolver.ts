import { Category, UserRole } from '@kickzone-workspace/entities';
import { RolesGuard } from '@kickzone-workspace/guards';
import { CategoryService, ProductService } from '@kickzone-workspace/services';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService
  ) {}

  @Query(() => [Category])
  async categories() {
    return this.categoryService.getCategories();
  }

  @Mutation(() => Category)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async createCategory(@Args('name') name: string) {
    return this.categoryService.createCategory(name);
  }
}
