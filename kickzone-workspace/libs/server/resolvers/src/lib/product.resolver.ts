import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from '@kickzone-workspace/services';
import { Product, ProductInfo, Category } from '@kickzone-workspace/entities';
import {
  CreateProductInput,
  CreateProductInfoInput,
  CreateCategoryInput,
  ProductFilterInput,
} from '@kickzone-workspace/inputs';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async products(
    @Args('filter', { nullable: true }) filter?: ProductFilterInput
  ) {
    return this.productService.getProducts(filter);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('input') input: CreateProductInput
  ): Promise<Product> {
    return this.productService.createProduct(input);
  }

  @Mutation(() => ProductInfo)
  async createProductInfo(
    @Args('input') input: CreateProductInfoInput
  ): Promise<ProductInfo> {
    return this.productService.createProductInfo(input);
  }

  @Mutation(() => Category)
  async createCategory(
    @Args('input') input: CreateCategoryInput
  ): Promise<Category> {
    return this.productService.createCategory(input);
  }

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return this.productService.getCategories();
  }
}
