import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Cart, CartItem } from '@kickzone-workspace/entities';
import {
  AddToCartInput,
  UpdateCartItemInput,
} from '@kickzone-workspace/inputs';
import { CartService } from '@kickzone-workspace/services';
import { GraphqlAuthGuard } from '@kickzone-workspace/guards';
import { CurrentUser, type AuthenticatedUser } from '@kickzone-workspace/decorators';
import { ZodValidationPipe } from './zod-validation.pipe';
import {
  addToCartSchema,
  updateCartItemSchema,
  idSchema,
} from '@kickzone-workspace/validation';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query(() => Cart)
  @UseGuards(GraphqlAuthGuard)
  async myCart(@CurrentUser() user: AuthenticatedUser) {
    return this.cartService.getCart(user.id);
  }

  @Mutation(() => Cart)
  @UseGuards(GraphqlAuthGuard)
  async addToCart(
    @CurrentUser() user: AuthenticatedUser,
    @Args('addToCartInput', new ZodValidationPipe(addToCartSchema)) addToCartInput: AddToCartInput
  ) {
    return this.cartService.addToCart(user.id, addToCartInput);
  }

  @Mutation(() => Cart)
  @UseGuards(GraphqlAuthGuard)
  async updateCartItem(
    @CurrentUser() user: AuthenticatedUser,
    @Args('itemId', { type: () => String }, new ZodValidationPipe(idSchema)) itemId: string,
    @Args('updateInput', new ZodValidationPipe(updateCartItemSchema)) updateInput: UpdateCartItemInput
  ) {
    return this.cartService.updateCartItem(user.id, itemId, updateInput);
  }

  @Mutation(() => Cart)
  @UseGuards(GraphqlAuthGuard)
  async removeFromCart(
    @CurrentUser() user: AuthenticatedUser,
    @Args('itemId', { type: () => String }, new ZodValidationPipe(idSchema)) itemId: string
  ) {
    return this.cartService.removeFromCart(user.id, itemId);
  }

  @Mutation(() => Cart)
  @UseGuards(GraphqlAuthGuard)
  async clearCart(@CurrentUser() user: AuthenticatedUser) {
    return this.cartService.clearCart(user.id);
  }

  @ResolveField(() => [CartItem])
  async items(@Parent() cart: Cart) {
    return cart.items;
  }
}
