import { Category, UserRole } from '@kickzone-workspace/entities';
import { RolesGuard } from '@kickzone-workspace/guards';
import { CategoryService, ProductService } from '@kickzone-workspace/services';
import { SetMetadata, UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

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
  async createCategory(@Args('input') input: CreateCategoryInput) {
    return this.categoryService.createCategory(input.name);
  }

  @Mutation(() => Category)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async updateCategory(@Args('input') input: UpdateCategoryInput) {
    return this.categoryService.updateCategory(input.id, input.name);
  }
}
