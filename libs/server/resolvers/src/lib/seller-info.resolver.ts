import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { SellerService } from '@kickzone-workspace/services';
import {
  SellerInfo,
  User,
  UserRole,
  Product,
  ProductConnection,
  SellerProduct,
} from '@kickzone-workspace/entities';
import {
  CreateSellerInput,
  UpdateSellerInput,
  CreateSellerProductInput,
  UpdateSellerProductInput,
  SellerFilterInput,
  ProductFilterInput,
  CreateProductInfoInput,
} from '@kickzone-workspace/inputs';
import { ProductService } from '@kickzone-workspace/services';
import { createConnection } from '@kickzone-workspace/utils';
import { UseGuards, SetMetadata } from '@nestjs/common';
import { RolesGuard } from '@kickzone-workspace/guards';

@Resolver(() => SellerInfo)
export class SellerResolver {
  constructor(
    private readonly sellerService: SellerService,
    private readonly productService: ProductService
  ) {}

  @Mutation(() => SellerInfo)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  createSeller(
    @Args('createSellerInput') createSellerInput: CreateSellerInput
  ) {
    return this.sellerService.create(createSellerInput);
  }

  @Query(() => [SellerInfo], { name: 'sellers' })
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async findAll(
    @Args('filter', { nullable: true })
    filter?: SellerFilterInput
  ): Promise<[SellerInfo[], number]> {
    return this.sellerService.findAll(filter);
  }

  @Query(() => SellerInfo, { name: 'seller' })
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sellerService.findOne(id);
  }

  @Mutation(() => SellerInfo)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  updateSeller(
    @Args('updateSellerInput') updateSellerInput: UpdateSellerInput
  ) {
    return this.sellerService.update(updateSellerInput.id, updateSellerInput);
  }

  @Mutation(() => SellerInfo)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  toggleSellerActive(@Args('id', { type: () => Int }) id: number) {
    return this.sellerService.toggleActive(id);
  }

  @Query(() => ProductConnection)
  async sellerProducts(
    @Args('filter', { nullable: true }) filter: ProductFilterInput,
    @Context() context: { req: { user: User } }
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
    @Context() context: { req: { user: User } }
  ): Promise<Product> {
    const user = context.req.user;
    if (!user?.sellerInfo?.id) throw new Error('Not a seller');
    return this.productService.createProductInfo(input);
  }

  @Mutation(() => SellerProduct)
  async createSellerProduct(
    @Args('input') input: CreateSellerProductInput,
    @Context() context: { req: { user: User } }
  ): Promise<SellerProduct> {
    const user = context.req.user;
    if (!user?.sellerInfo?.id) throw new Error('Not a seller');
    return this.sellerService.createSellerProduct(user.sellerInfo.id, input);
  }

  @Mutation(() => SellerProduct)
  async updateSellerProduct(
    @Args('input') input: UpdateSellerProductInput,
    @Context() context: { req: { user: User } }
  ): Promise<SellerProduct> {
    const user = context.req.user;
    if (!user?.sellerInfo?.id) throw new Error('Not a seller');
    return this.sellerService.updateSellerProduct(user.sellerInfo.id, input);
  }
}
