import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, CartItem, SellerProduct } from '@kickzone-workspace/entities';
import {
  AddToCartInput,
  UpdateCartItemInput,
} from '@kickzone-workspace/inputs';
import { serializeProductInfoColorHexes } from './product-info-colors.util';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(SellerProduct)
    private sellerProductRepository: Repository<SellerProduct>
  ) {}

  /**
   * Safely coerces any value (including Postgres numeric strings) to a finite number.
   * Returns 0 for non-finite values (NaN, Infinity, null, undefined, non-numeric strings).
   */
  private toDecimalNumber(value: unknown): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  /**
   * Rounds a monetary value to 2 decimal places to avoid floating-point drift.
   * Uses the standard "round half up" with Number.EPSILON correction.
   */
  private roundMoney(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

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
    // Validate quantity: must be a positive integer
    const quantity = Number(addToCartInput.quantity);
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new BadRequestException('Quantity must be a positive integer');
    }

    // Fetch the SellerProduct from database to get all product info
    const sellerProduct = await this.sellerProductRepository.findOne({
      where: { id: addToCartInput.sellerProductId },
      relations: [
        'product',
        'productInfo',
        'productInfo.colorLinks',
        'productInfo.colorLinks.color',
        'seller',
      ],
    });

    if (!sellerProduct) {
      throw new NotFoundException(
        `SellerProduct with ID ${addToCartInput.sellerProductId} not found`
      );
    }

    const cart = await this.getOrCreateCart(userId);

    // Check if item already exists in cart
    const existingItem = cart.items.find(
      (item) => item.sellerProductId === addToCartInput.sellerProductId
    );

    const currentQty = existingItem?.quantity || 0;
    const requestedTotal = currentQty + addToCartInput.quantity;

    // Check stock availability including what is already in the cart
    if (sellerProduct.stockQuantity < requestedTotal) {
      throw new NotFoundException(
        `Insufficient stock. Available: ${sellerProduct.stockQuantity}, Already in cart: ${currentQty}, Requested: ${addToCartInput.quantity}`
      );
    }

    // Calculate final price after discount - coerce Postgres numeric strings to numbers
    const price = this.toDecimalNumber(sellerProduct.price);
    const discount = this.toDecimalNumber(sellerProduct.discount);
    const finalPrice = this.roundMoney(
      discount > 0 ? price - (price * discount) / 100 : price
    );

    if (existingItem) {
      // Update quantity - coerce existing values
      existingItem.quantity = Math.max(
        0,
        Math.trunc(this.toDecimalNumber(existingItem.quantity)) +
          Math.max(0, Math.trunc(this.toDecimalNumber(addToCartInput.quantity)))
      );
      existingItem.unitPrice = this.roundMoney(
        this.toDecimalNumber(existingItem.unitPrice)
      );
      existingItem.totalPrice = this.roundMoney(
        this.toDecimalNumber(existingItem.quantity) *
          this.toDecimalNumber(existingItem.unitPrice)
      );
      await this.cartItemRepository.save(existingItem);
    } else {
      // Add new item with data from database
      const cartItem = new CartItem();
      cartItem.cartId = cart.id;
      cartItem.productId = sellerProduct.product.id.toString();
      cartItem.productName = sellerProduct.product.name;
      cartItem.productImage = sellerProduct.productInfo?.images?.[0];
      cartItem.quantity = Math.max(0, Math.trunc(this.toDecimalNumber(addToCartInput.quantity)));
      cartItem.unitPrice = finalPrice;
      cartItem.totalPrice = this.roundMoney(
        this.toDecimalNumber(cartItem.quantity) * finalPrice
      );
      cartItem.color = serializeProductInfoColorHexes(
        sellerProduct.productInfo?.colorLinks
      );
      cartItem.size = sellerProduct.productInfo?.size;
      cartItem.sellerId = sellerProduct.seller.id.toString();
      cartItem.sellerName = sellerProduct.seller.storeName;
      cartItem.productInfoId = sellerProduct.productInfo?.id.toString();
      cartItem.sellerProductId = sellerProduct.id;
      cartItem.availableStock = sellerProduct.stockQuantity;

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

    if (updateInput.quantity !== undefined) {
      if (cartItem.sellerProductId) {
        const sellerProduct = await this.sellerProductRepository.findOne({
          where: { id: cartItem.sellerProductId },
        });
        if (
          sellerProduct &&
          updateInput.quantity > this.toDecimalNumber(sellerProduct.stockQuantity)
        ) {
          throw new NotFoundException(
            `Insufficient stock. Available: ${this.toDecimalNumber(sellerProduct.stockQuantity)}, Requested: ${updateInput.quantity}`
          );
        }
      }
      cartItem.quantity = Math.max(0, Math.trunc(this.toDecimalNumber(updateInput.quantity)));
      cartItem.unitPrice = this.roundMoney(this.toDecimalNumber(cartItem.unitPrice));
      cartItem.totalPrice = this.roundMoney(
        this.toDecimalNumber(cartItem.quantity) *
          this.toDecimalNumber(cartItem.unitPrice)
      );
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

    // Remove all items using the entities (more reliable than delete query)
    if (cart.items && cart.items.length > 0) {
      await this.cartItemRepository.remove(cart.items);
    }

    // Reset cart totals
    cart.subtotal = 0;
    cart.total = 0;
    cart.items = []; // Clear items array
    await this.cartRepository.save(cart);

    // Verify it's actually cleared
    const freshCart = await this.getOrCreateCart(userId);

    return freshCart;
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

    const totalAmount = this.roundMoney(
      cart.items.reduce(
        (sum, item) => sum + this.toDecimalNumber(item.totalPrice),
        0
      )
    );
    const totalItems = cart.items.reduce(
      (sum, item) =>
        sum + Math.max(0, Math.trunc(this.toDecimalNumber(item.quantity))),
      0
    );

    cart.subtotal = totalAmount;
    cart.total = totalAmount; // No shipping cost for cart

    await this.cartRepository.save(cart);
  }
}
