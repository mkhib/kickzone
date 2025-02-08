import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService, CategoryService } from '@kickzone-workspace/services';
import { Category } from '@kickzone-workspace/entities';

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
  async createCategory(@Args('name') name: string) {
    return this.categoryService.createCategory(name);
  }
}
