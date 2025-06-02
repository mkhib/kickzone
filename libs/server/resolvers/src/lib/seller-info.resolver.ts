import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SellerService } from '@kickzone-workspace/services';
import { SellerInfo } from '@kickzone-workspace/entities';
import {
  CreateSellerInput,
  UpdateSellerInput,
} from '@kickzone-workspace/inputs';
import { ProductConnection, Product } from '@kickzone-workspace/entities';
import { ProductService } from '@kickzone-workspace/services';
import {
  ProductFilterInput,
  CreateProductInfoInput,
} from '@kickzone-workspace/inputs';
import { createConnection } from '@kickzone-workspace/utils';
import { Context } from '@nestjs/graphql';
import { SellerProduct } from '@kickzone-workspace/entities';
import {
  CreateSellerProductInput,
  UpdateSellerProductInput,
} from '@kickzone-workspace/inputs';

@Resolver(() => SellerInfo)
export class SellerResolver {
  constructor(
    private readonly sellerService: SellerService,
    private readonly productService: ProductService
  ) {}

  @Mutation(() => SellerInfo)
  createSeller(
    @Args('createSellerInput') createSellerInput: CreateSellerInput
  ) {
    return this.sellerService.create(createSellerInput);
  }

  @Query(() => [SellerInfo], { name: 'sellers' })
  findAll() {
    return this.sellerService.findAll();
  }

  @Query(() => SellerInfo, { name: 'seller' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sellerService.findOne(id);
  }

  @Mutation(() => SellerInfo)
  updateSeller(
    @Args('updateSellerInput') updateSellerInput: UpdateSellerInput
  ) {
    return this.sellerService.update(updateSellerInput.id, updateSellerInput);
  }

  @Query(() => ProductConnection)
  async sellerProducts(
    @Args('filter', { nullable: true }) filter: ProductFilterInput,
    @Context() context: any
  ): Promise<ProductConnection> {
    const user = context.req.user;
    if (!user?.sellerInfo?.id) throw new Error('Not a seller');
    const sellerId = user.sellerInfo.id;
    const [products, totalCount] = await this.productService.getSellerProducts(
      sellerId,
      filter
    );
    return createConnection(
      products,
      totalCount,
      filter?.first || 10,
      filter?.after
    );
  }

  @Mutation(() => Product)
  async createSellerProductVariant(
    @Args('input') input: CreateProductInfoInput,
    @Context() context: any
  ): Promise<Product> {
    const user = context.req.user;
    if (!user?.sellerInfo?.id) throw new Error('Not a seller');
    // You may want to add logic to ensure the product belongs to this seller
    return this.productService.createProductInfo(input);
  }

  @Mutation(() => SellerProduct)
  async createSellerProduct(
    @Args('input') input: CreateSellerProductInput,
    @Context() context: any
  ): Promise<SellerProduct> {
    const user = context.req.user;
    if (!user?.sellerInfo?.id) throw new Error('Not a seller');
    return this.sellerService.createSellerProduct(user.sellerInfo.id, input);
  }

  @Mutation(() => SellerProduct)
  async updateSellerProduct(
    @Args('input') input: UpdateSellerProductInput,
    @Context() context: any
  ): Promise<SellerProduct> {
    const user = context.req.user;
    if (!user?.sellerInfo?.id) throw new Error('Not a seller');
    return this.sellerService.updateSellerProduct(user.sellerInfo.id, input);
  }
}
