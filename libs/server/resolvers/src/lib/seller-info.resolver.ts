import {
  Product,
  ProductConnection,
  SellerInfo,
  SellerProduct,
  User,
  UserRole,
  SellerConnection,
} from '@kickzone-workspace/entities';
import { RolesGuard } from '@kickzone-workspace/guards';
import {
  CreateProductInfoInput,
  CreateSellerInput,
  CreateSellerProductInput,
  ProductFilterInput,
  SellerFilterInput,
  UpdateSellerInput,
  UpdateSellerProductInput,
} from '@kickzone-workspace/inputs';
import { ProductService, SellerService } from '@kickzone-workspace/services';
import { createConnection } from '@kickzone-workspace/utils';
import { SetMetadata, UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Context,
} from '@nestjs/graphql';

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

  @Query(() => SellerConnection)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async sellers(
    @Args('filter', { nullable: true }) filter?: SellerFilterInput
  ) {
    const [sellers, totalCount] = await this.sellerService.findAll(filter);
    // Build edges and pageInfo for SellerConnection
    const edges = sellers.map((seller) => ({
      node: seller,
      cursor: seller.id.toString(),
    }));
    const pageInfo = {
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
      hasNextPage: filter?.first ? sellers.length === filter.first : false,
    };
    return {
      edges,
      pageInfo,
      totalCount,
    };
  }

  @Query(() => SellerInfo, { nullable: true })
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sellerService.findOne(id);
  }

  @Mutation(() => SellerInfo)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  updateSeller(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateSellerInput') updateSellerInput: UpdateSellerInput
  ) {
    return this.sellerService.update(id, updateSellerInput);
  }

  @Mutation(() => SellerInfo)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  toggleSellerActive(@Args('id', { type: () => Int }) id: number) {
    return this.sellerService.toggleActive(id);
  }

  @Mutation(() => SellerProduct)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  createSellerProduct(
    @Args('sellerId', { type: () => Int }) sellerId: number,
    @Args('input') input: CreateSellerProductInput
  ) {
    return this.sellerService.createSellerProduct(sellerId, input);
  }

  @Mutation(() => SellerProduct)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  updateSellerProduct(
    @Args('sellerId', { type: () => Int }) sellerId: number,
    @Args('input') input: UpdateSellerProductInput
  ) {
    return this.sellerService.updateSellerProduct(sellerId, input);
  }

  // Seller-specific mutations for creating and updating their own products
  @Mutation(() => SellerProduct)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.SELLER])
  async createMySellerProduct(
    @Context() context: { req: { user: User } },
    @Args('input') input: CreateSellerProductInput
  ) {
    const user = context.req.user;
    if (!user) throw new Error('Not authenticated');
    if (user.role !== UserRole.SELLER) throw new Error('Not a seller');

    const seller = await this.sellerService.findOneByUserId(user.id);
    if (!seller) throw new Error('Seller info not found');

    return this.sellerService.createSellerProduct(seller.id, input);
  }

  @Mutation(() => SellerProduct)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.SELLER])
  async updateMySellerProduct(
    @Context() context: { req: { user: User } },
    @Args('input') input: UpdateSellerProductInput
  ) {
    const user = context.req.user;
    if (!user) throw new Error('Not authenticated');
    if (user.role !== UserRole.SELLER) throw new Error('Not a seller');

    const seller = await this.sellerService.findOneByUserId(user.id);
    if (!seller) throw new Error('Seller info not found');

    return this.sellerService.updateSellerProduct(seller.id, input);
  }

  // Relay-style sellerProducts for the current seller (for sellers themselves)
  @Query(() => ProductConnection)
  async sellerProductsForMe(
    @Context() context: { req: { user: User } },
    @Args('filter', { nullable: true }) filter?: ProductFilterInput
  ) {
    const user = context.req.user;
    if (!user) throw new Error('Not authenticated');
    if (user.role !== UserRole.SELLER) throw new Error('Not a seller');
    const seller = await this.sellerService.findOneByUserId(user.id);
    if (!seller) throw new Error('Seller info not found');
    const [products, totalCount] = await this.productService.getSellerProducts(
      seller.id,
      filter
    );
    return createConnection(
      products,
      totalCount,
      filter?.first || 10,
      filter?.after
    );
  }

  // Get a specific seller product by ID for editing
  @Query(() => SellerProduct, { nullable: true })
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.SELLER])
  async mySellerProductById(
    @Context() context: { req: { user: User } },
    @Args('id', { type: () => Int }) id: number
  ) {
    const user = context.req.user;
    if (!user) throw new Error('Not authenticated');
    if (user.role !== UserRole.SELLER) throw new Error('Not a seller');

    const seller = await this.sellerService.findOneByUserId(user.id);
    if (!seller) throw new Error('Seller info not found');

    return this.sellerService.findSellerProductById(id, seller.id);
  }

  @ResolveField(() => User)
  user(@Parent() seller: SellerInfo) {
    return seller.user;
  }

  // This is the only sellerProducts ResolveField for SellerInfo
  @ResolveField(() => [SellerProduct])
  sellerProducts(@Parent() seller: SellerInfo) {
    return seller.sellerProducts;
  }
}
