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
import { JwtAuthGuard } from '@kickzone-workspace/guards';
import { CurrentUser } from '@kickzone-workspace/decorators';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query(() => Cart)
  @UseGuards(JwtAuthGuard)
  async myCart(@CurrentUser() user: any) {
    return this.cartService.getCart(user.id);
  }

  @Mutation(() => Cart)
  @UseGuards(JwtAuthGuard)
  async addToCart(
    @CurrentUser() user: any,
    @Args('addToCartInput') addToCartInput: AddToCartInput
  ) {
    return this.cartService.addToCart(user.id, addToCartInput);
  }

  @Mutation(() => Cart)
  @UseGuards(JwtAuthGuard)
  async updateCartItem(
    @CurrentUser() user: any,
    @Args('itemId', { type: () => String }) itemId: string,
    @Args('updateInput') updateInput: UpdateCartItemInput
  ) {
    return this.cartService.updateCartItem(user.id, itemId, updateInput);
  }

  @Mutation(() => Cart)
  @UseGuards(JwtAuthGuard)
  async removeFromCart(
    @CurrentUser() user: any,
    @Args('itemId', { type: () => String }) itemId: string
  ) {
    return this.cartService.removeFromCart(user.id, itemId);
  }

  @Mutation(() => Cart)
  @UseGuards(JwtAuthGuard)
  async clearCart(@CurrentUser() user: any) {
    return this.cartService.clearCart(user.id);
  }

  @ResolveField(() => [CartItem])
  async items(@Parent() cart: Cart) {
    return cart.items;
  }
}
