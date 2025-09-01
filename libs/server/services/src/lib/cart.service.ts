import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, CartItem } from '@kickzone-workspace/entities';
import {
  AddToCartInput,
  UpdateCartItemInput,
} from '@kickzone-workspace/inputs';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>
  ) {}

  async getOrCreateCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['items', 'items.product'],
    });

    if (!cart) {
      cart = this.cartRepository.create({
        userId,
        subtotal: 0,
        total: 0,
      });
      await this.cartRepository.save(cart);
    }

    return cart;
  }

  async addToCart(
    userId: string,
    addToCartInput: AddToCartInput
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);

    // Check if item already exists in cart
    const existingItem = cart.items.find(
      (item) =>
        item.productId === addToCartInput.productId &&
        item.color === addToCartInput.color &&
        item.size === addToCartInput.size
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += addToCartInput.quantity;
      existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
      await this.cartItemRepository.save(existingItem);
    } else {
      // Add new item
      const cartItem = this.cartItemRepository.create({
        ...addToCartInput,
        cartId: cart.id,
        totalPrice: addToCartInput.quantity * addToCartInput.unitPrice,
      });
      await this.cartItemRepository.save(cartItem);
    }

    // Recalculate cart totals
    await this.recalculateCartTotals(cart.id);

    return this.getOrCreateCart(userId);
  }

  async updateCartItem(
    userId: string,
    itemId: string,
    updateInput: UpdateCartItemInput
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);
    const cartItem = cart.items.find((item) => item.id === itemId);

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    Object.assign(cartItem, updateInput);

    if (updateInput.quantity !== undefined) {
      cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
    }

    await this.cartItemRepository.save(cartItem);

    // Recalculate cart totals
    await this.recalculateCartTotals(cart.id);

    return this.getOrCreateCart(userId);
  }

  async removeFromCart(userId: string, itemId: string): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);
    const cartItem = cart.items.find((item) => item.id === itemId);

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartItemRepository.remove(cartItem);

    // Recalculate cart totals
    await this.recalculateCartTotals(cart.id);

    return this.getOrCreateCart(userId);
  }

  async clearCart(userId: string): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);

    await this.cartItemRepository.delete({ cartId: cart.id });

    // Reset cart totals
    cart.subtotal = 0;
    cart.total = 0;
    await this.cartRepository.save(cart);

    return cart;
  }

  async getCart(userId: string): Promise<Cart> {
    return this.getOrCreateCart(userId);
  }

  private async recalculateCartTotals(cartId: string): Promise<void> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items'],
    });

    if (!cart) return;

    cart.subtotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
    cart.total = cart.subtotal; // No shipping cost for cart

    await this.cartRepository.save(cart);
  }
}
