import {
  ProductConnection,
  SellerConnection,
  SellerInfo,
  SellerProduct,
  User,
  UserRole,
} from '@kickzone-workspace/entities';
import { RolesGuard } from '@kickzone-workspace/guards';
import {
  CreateSellerInput,
  CreateSellerProductInput,
  ProductFilterInput,
  SellerFilterInput,
  UpdateSellerInput,
  UpdateSellerProductInput,
} from '@kickzone-workspace/inputs';
import { ProductService, SellerService } from '@kickzone-workspace/services';
import { createConnection } from '@kickzone-workspace/utils';
import {
  createSellerProductSchema,
  createSellerSchema,
  updateSellerProductSchema,
  updateSellerSchema,
} from '@kickzone-workspace/validation';
import { ZodValidationPipe } from './zod-validation.pipe';
import { SetMetadata, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
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
    @Args('createSellerInput', new ZodValidationPipe(createSellerSchema))
    createSellerInput: CreateSellerInput
  ) {
    return this.sellerService.create(createSellerInput);
  }

  @Query(() => SellerConnection)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN, UserRole.CUSTOMER])
  async sellers(
    @Context() context: { req: { user?: User } },
    @Args('filter', { nullable: true }) filter?: SellerFilterInput,
    @Args('first', { type: () => Int, defaultValue: 100 }) first = 100,
    @Args('after', { type: () => String, nullable: true }) after?: string
  ) {
    // For customers, only allow querying by IDs
    const user = context.req.user;
    if (user?.role === UserRole.CUSTOMER) {
      if (!filter?.ids || filter.ids.length === 0) {
        // Customers can only query by IDs
        return {
          edges: [],
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          totalCount: 0,
        };
      }
    }

    const [sellers, totalCount] = await this.sellerService.findAll({
      ...filter,
      first,
      after,
    });
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

  @Query(() => SellerInfo, { nullable: true })
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.SELLER])
  async mySellerInfo(@Context() context: { req: { user: User } }) {
    const user = context.req.user;
    if (!user) throw new Error('Not authenticated');
    if (user.role !== UserRole.SELLER) throw new Error('Not a seller');
    return this.sellerService.findOneByUserId(user.id);
  }

  @Mutation(() => SellerInfo)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  updateSeller(
    @Args('updateSellerInput', new ZodValidationPipe(updateSellerSchema))
    updateSellerInput: UpdateSellerInput
  ) {
    return this.sellerService.update(updateSellerInput);
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
    @Args('input', new ZodValidationPipe(createSellerProductSchema))
    input: CreateSellerProductInput
  ) {
    return this.sellerService.createSellerProduct(sellerId, input, true);
  }

  @Mutation(() => SellerProduct)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  updateSellerProduct(
    @Args('sellerId', { type: () => Int }) sellerId: number,
    @Args('input', new ZodValidationPipe(updateSellerProductSchema))
    input: UpdateSellerProductInput
  ) {
    return this.sellerService.updateSellerProduct(sellerId, input, true);
  }

  // Seller-specific mutations for creating and updating their own products
  @Mutation(() => SellerProduct)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.SELLER])
  async createMySellerProduct(
    @Context() context: { req: { user: User } },
    @Args('input', new ZodValidationPipe(createSellerProductSchema))
    input: CreateSellerProductInput
  ) {
    const user = context.req.user;
    if (!user) throw new Error('Not authenticated');
    if (user.role !== UserRole.SELLER) throw new Error('Not a seller');

    const seller = await this.sellerService.findOneByUserId(user.id);
    if (!seller) throw new Error('Seller info not found');

    return this.sellerService.createSellerProduct(seller.id, input, false);
  }

  @Mutation(() => SellerProduct)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.SELLER])
  async updateMySellerProduct(
    @Context() context: { req: { user: User } },
    @Args('input', new ZodValidationPipe(updateSellerProductSchema))
    input: UpdateSellerProductInput
  ) {
    const user = context.req.user;
    if (!user) throw new Error('Not authenticated');
    if (user.role !== UserRole.SELLER) throw new Error('Not a seller');

    const seller = await this.sellerService.findOneByUserId(user.id);
    if (!seller) throw new Error('Seller info not found');

    return this.sellerService.updateSellerProduct(seller.id, input, false);
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
    @Args('id', { type: () => String }) id: string
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

  @ResolveField(() => Number)
  shippingFee(@Parent() seller: SellerInfo) {
    return seller.shippingFee;
  }
}
