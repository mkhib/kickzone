import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { OrderStatus, type OrderItem } from '@kickzone-workspace/entities';

/** OrderItem with the sellerProduct relation loaded (not declared on the entity class). */
type OrderItemWithSellerProduct = OrderItem & {
  sellerProduct?: { id?: string; stockQuantity?: number } | null;
};
import { PaymentService, OrderService, CurrencyService } from '@kickzone-workspace/services';
import { GraphqlAuthGuard } from '@kickzone-workspace/guards';
import { CurrentUser, type OptionalAuthenticatedUser } from '@kickzone-workspace/decorators';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@ObjectType()
export class ZarinPalPaymentResponse {
  @Field(() => Int)
  code: number;

  @Field()
  message: string;

  @Field()
  authority: string;

  @Field({ nullable: true })
  fee_type?: string;

  @Field(() => Int, { nullable: true })
  fee?: number;
}

@ObjectType()
export class ZarinPalVerificationResponse {
  @Field(() => Int)
  code: number;

  @Field()
  message: string;

  @Field(() => Int, { nullable: true })
  ref_id?: number;

  @Field({ nullable: true })
  card_pan?: string;

  @Field({ nullable: true })
  card_hash?: string;

  @Field({ nullable: true })
  fee_type?: string;

  @Field(() => Int, { nullable: true })
  fee?: number;

  @Field(() => [String], { nullable: true })
  orderIds?: string[];

  @Field({ nullable: true })
  orderId?: string;

  @Field({ nullable: true })
  orderNumber?: string;

  @Field(() => Boolean, { nullable: true })
  success?: boolean;
}

@InputType()
export class ZarinPalPaymentRequestInput {
  @Field(() => Int)
  amount: number;

  @Field()
  callback_url: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  currency?: string;

  @Field({ nullable: true })
  mobile?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  order_id?: string;

  @Field(() => [String], { nullable: true })
  orderIds?: string[];
}

@InputType()
export class ZarinPalVerificationRequestInput {
  @Field(() => Int)
  amount: number;

  @Field()
  authority: string;

  @Field({ nullable: true })
  order_id?: string; // Optional: if provided, order status will be updated
}

@ObjectType()
export class GatewayUrlResponse {
  @Field()
  url: string;
}

@Resolver()
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService,
    private readonly currencyService: CurrencyService
  ) {}

  private readonly inFlightVerifications = new Map<
    string,
    Promise<ZarinPalVerificationResponse>
  >();

  private extractGuestToken(notes?: string | null): string | null {
    const match = /\[GuestToken:\s*([^\]]+)\]/.exec(notes ?? '');
    return match ? match[1].trim() : null;
  }

  @Mutation(() => ZarinPalPaymentResponse)
  async requestZarinPalPayment(
    @Args('input') input: ZarinPalPaymentRequestInput
  ) {
    // Normalize the list of order IDs from both orderId (singular) and orderIds (array)
    const targetOrderIds = Array.from(
      new Set([
        ...(input.orderIds ?? []),
        ...(input.order_id ? [input.order_id] : []),
      ].filter((id): id is string => typeof id === 'string' && id.trim().length > 0))
    );

    if (targetOrderIds.length === 0) {
      throw new BadRequestException('At least one orderId is required');
    }

    // Validate callback_url early - before any database lookups
    let parsedCallbackUrl: URL;
    try {
      parsedCallbackUrl = new URL(input.callback_url);
    } catch {
      throw new BadRequestException('Invalid callback_url');
    }
    if (
      parsedCallbackUrl.protocol !== 'http:' &&
      parsedCallbackUrl.protocol !== 'https:'
    ) {
      throw new BadRequestException('Invalid callback_url protocol');
    }

    const isSingleOrder = targetOrderIds.length === 1 && !input.orderIds;

    // Load all orders in targetOrderIds
    const loadedOrders = await Promise.all(
      targetOrderIds.map((id) =>
        this.orderService.findOne(id).catch((err: unknown) => {
          if (err instanceof NotFoundException) {
            return null;
          }
          throw err;
        })
      )
    );

    // Verify all orders exist
    const missingOrders = targetOrderIds.filter(
      (_, index) => !loadedOrders[index]
    );
    if (missingOrders.length > 0) {
      if (isSingleOrder) {
        throw new BadRequestException('Order not found');
      }
      throw new BadRequestException(
        `Order(s) not found: ${missingOrders.join(', ')}`
      );
    }

    const orders = loadedOrders.filter((o): o is NonNullable<typeof o> => Boolean(o));

    // Verify all orders are PENDING
    const nonPendingOrders = orders.filter(
      (order) => order.status !== OrderStatus.PENDING
    );
    if (nonPendingOrders.length > 0) {
      if (isSingleOrder) {
        throw new BadRequestException(
          `Order ${targetOrderIds[0]} is not in PENDING status and cannot be paid`
        );
      }
      throw new BadRequestException(
        `Order(s) ${nonPendingOrders
          .map((o) => o.id)
          .join(', ')} are not in PENDING status and cannot be paid`
      );
    }

    // Verify all orders belong to the same checkout customer/guest (by email)
    // Only for multi-order batches
    if (!isSingleOrder) {
      const firstOrder = orders[0];
      const firstCustomerEmail = String(firstOrder.customerEmail ?? '')
        .toLowerCase();
      const firstGuestToken = this.extractGuestToken(firstOrder.notes);

      for (const order of orders) {
        const customerEmail = String(order.customerEmail ?? '').toLowerCase();
        if (customerEmail !== firstCustomerEmail) {
          throw new BadRequestException(
            'All orders in a batch must belong to the same customer'
          );
        }
        const orderGuestToken = this.extractGuestToken(order.notes);
        if (firstGuestToken !== orderGuestToken) {
          throw new BadRequestException(
            'All orders in a batch must share the same guest checkout token'
          );
        }
      }
    }

    // Recompute server-authoritative shipping across the entire batch before summing totals
    if (typeof this.orderService.recalculateBatchOrdersShipping === 'function') {
      await this.orderService.recalculateBatchOrdersShipping(orders);
    }

    // Sum the USD totals across all orders in the batch
    const batchTotalUsd = orders.reduce(
      (sum, o) => sum + Number(o.total),
      0
    );

    // For single order, also validate the individual order total
    if (isSingleOrder) {
      const orderTotalUsd = Number(orders[0].total);
      if (!Number.isFinite(orderTotalUsd) || orderTotalUsd <= 0) {
        throw new BadRequestException('Order total is invalid or missing');
      }
    }

    // Fetch current USD -> IRR exchange rate (IRR represents Toman for ZarinPal)
    const rateRecord = await this.currencyService.getCurrentExchangeRate(
      'USD',
      'IRR'
    );
    const fxRate = Number(rateRecord?.rate ?? rateRecord);

    // Fail-closed FX guard: reject if rate is missing, not finite, or <= 1
    if (!Number.isFinite(fxRate) || fxRate <= 1) {
      throw new BadRequestException(
        'Exchange rate is not configured or invalid. Cannot process ZarinPal payment.'
      );
    }

    // Compute server-authoritative amount in Tomans
    const expectedBatchAmount = Math.round(batchTotalUsd * fxRate);

    // Client tampering check: if client sends amount, it must match expectedAmount within rounding tolerance
    if (input.amount != null) {
      const clientAmount = Number(input.amount);
      const tolerance = isSingleOrder
        ? Math.max(1, Math.round(expectedBatchAmount * 0.001)) // 0.1% or at least 1 Toman for single order
        : Math.max(
            10,
            targetOrderIds.length * 2
          ); // At least 10 Tomans or 2 per order for batch
      if (Math.abs(clientAmount - expectedBatchAmount) > tolerance) {
        if (isSingleOrder) {
          throw new BadRequestException('Payment amount does not match order total');
        }
        throw new BadRequestException(
          'Payment amount does not match batch order total'
        );
      }
    }

    // Always use server-computed expectedAmount for ZarinPal request
    const response = await this.paymentService.requestPayment({
      amount: expectedBatchAmount,
      callback_url: input.callback_url,
      description: input.description,
      currency: (input.currency as 'IRR' | 'IRT') || 'IRT',
      metadata: {
        mobile: input.mobile,
        email: input.email,
        order_id: targetOrderIds[0], // Primary order for metadata
      },
    });

    // Bind authority and server-computed expected amount to EVERY order in the batch
    for (const order of orders) {
      await this.orderService.setPaymentIntent({
        orderId: order.id,
        authority: response.data.authority,
        amount: expectedBatchAmount,
        currency: input.currency || 'IRT',
      });
    }

    return {
      code: response.data.code,
      message: response.data.message,
      authority: response.data.authority,
      fee_type: response.data.fee_type,
      fee: response.data.fee,
    };
  }

  @Mutation(() => ZarinPalVerificationResponse)
  async verifyZarinPalPayment(
    @Args('input') input: ZarinPalVerificationRequestInput
  ) {
    const existingInFlight = this.inFlightVerifications.get(input.authority);
    if (existingInFlight) {
      return existingInFlight;
    }
    const verificationPromise = this.executeVerifyZarinPalPayment(input).finally(
      () => {
        this.inFlightVerifications.delete(input.authority);
      }
    );
    this.inFlightVerifications.set(input.authority, verificationPromise);
    return verificationPromise;
  }

  private async executeVerifyZarinPalPayment(
    input: ZarinPalVerificationRequestInput
  ): Promise<ZarinPalVerificationResponse> {
    const orders = this.orderService.findOrdersByPaymentAuthority
      ? await this.orderService.findOrdersByPaymentAuthority(input.authority)
      : input.order_id
        ? [await this.orderService.findOne(input.order_id)].filter(
            (o): o is NonNullable<typeof o> => Boolean(o)
          )
        : [];

    if (orders.length === 0) {
      throw new BadRequestException(
        'No orders found for this payment authority'
      );
    }

    // Verify all orders have the matching authority
    for (const order of orders) {
      if (order.paymentAuthority !== input.authority) {
        throw new BadRequestException(
          'Payment authority does not match the order payment intent'
        );
      }
    }

    // Reject before calling the gateway if any order bound to this authority is already CANCELLED or REFUNDED
    const cancelledOrRefunded = orders.filter(
      (o) =>
        o.status === OrderStatus.CANCELLED || o.status === OrderStatus.REFUNDED
    );
    if (cancelledOrRefunded.length > 0) {
      throw new BadRequestException(
        `Cannot verify payment for cancelled or refunded order(s): ${cancelledOrRefunded
          .map((o) => o.id)
          .join(', ')}`
      );
    }

    // Pre-verify: ensure every PENDING order has sufficient stock on all items
    // This prevents one sibling order from confirming if another is out of stock
    const pendingOrders = orders.filter((o) => o.status === OrderStatus.PENDING);
    const stockRequirements = new Map<string, number>(); // sellerProductId -> requiredQty
    for (const order of pendingOrders) {
      for (const item of order.items ?? []) {
        const sp = (item as OrderItemWithSellerProduct).sellerProduct;
        if (sp?.id != null && typeof sp.stockQuantity === 'number') {
          const current = stockRequirements.get(sp.id) ?? 0;
          stockRequirements.set(sp.id, current + (item.quantity ?? 0));
        }
      }
    }
    for (const [sellerProductId, requiredQty] of stockRequirements.entries()) {
      // Find the sellerProduct to check current stock
      const sampleItem = pendingOrders
        .flatMap((o): OrderItemWithSellerProduct[] => o.items ?? [])
        .find((i) => i.sellerProduct?.id === sellerProductId);
      const available = sampleItem?.sellerProduct?.stockQuantity ?? 0;
      if (available < requiredQty) {
        throw new BadRequestException(
          `Insufficient stock for product ${sellerProductId}: required ${requiredQty}, available ${available}`
        );
      }
    }

    // Use the payment amount from the first order (they all share the same batch amount)
    const firstOrder = orders[0];
    if (
      firstOrder.paymentAmount === null ||
      firstOrder.paymentAmount === undefined
    ) {
      throw new BadRequestException(
        'Payment amount not recorded for this order. Please initiate payment again.'
      );
    }

    const amountToVerify = firstOrder.paymentAmount;

    const response = await this.paymentService.verifyPayment({
      amount: amountToVerify,
      authority: input.authority,
    });

    // If payment verification was successful (code 100 or 101)
    if (response.data.code === 100 || response.data.code === 101) {
      // Handle code 101 idempotently: if every order for this authority is already in a paid status
      // and has stock reserved, return success without re-decrementing stock.
      const paidStatuses = new Set<OrderStatus>([
        OrderStatus.CONFIRMED,
        OrderStatus.PROCESSING,
        OrderStatus.SHIPPED,
        OrderStatus.DELIVERED,
      ]);
      const allOrdersConfirmedAndStockReserved = orders.every(
        (o) => paidStatuses.has(o.status) && o.stockReserved === true
      );

      if (response.data.code === 101 && allOrdersConfirmedAndStockReserved) {
        // Idempotent success: already verified, stock already reserved
        return {
          code: response.data.code,
          message: response.data.message,
          ref_id: response.data.ref_id,
          card_pan: response.data.card_pan,
          card_hash: response.data.card_hash,
          fee_type: response.data.fee_type,
          fee: response.data.fee,
          orderIds: orders.map((o) => o.id),
          orderId: orders[0]?.id,
          orderNumber: orders.map((o) => o.orderNumber).join(', '),
          success: true,
        };
      }

      // Confirm ALL PENDING orders in deterministic order (id ASC)
      const pendingOrders = orders
        .filter((o) => o.status === OrderStatus.PENDING)
        .sort((a, b) => a.id.localeCompare(b.id));

      const confirmedOrderIds: string[] = [];
      for (const order of pendingOrders) {
        try {
          // Persist authority/amount before confirming to prevent tampering/replay
          await this.orderService.setPaymentIntent({
            orderId: order.id,
            authority: input.authority,
            amount: amountToVerify,
            currency: order.paymentCurrency || 'IRT',
          });

          await this.orderService.confirmOrderPayment(order.id);
          confirmedOrderIds.push(order.id);
        } catch (confirmError) {
          console.error(
            `Failed to finalize order ${order.id} after successful payment (authority: ${input.authority}, refId: ${response.data.ref_id}):`,
            confirmError
          );
          // Rollback any orders confirmed earlier in this batch
          for (const confirmedId of confirmedOrderIds) {
            try {
              if (this.orderService.updateOrderStatus) {
                await this.orderService.updateOrderStatus(confirmedId, OrderStatus.CANCELLED);
              }
            } catch (rollbackError) {
              console.error(
                `Rollback failed for order ${confirmedId}:`,
                rollbackError
              );
            }
          }
          // CRITICAL FIX: Return success: false when confirmOrderPayment throws.
          // The payment was captured by gateway (refId exists) but order confirmation/stock reservation failed.
          // Frontend must NOT clear cart and must show error with refId for support/refund.
          const errorMessage = confirmError instanceof Error
            ? `Payment was captured by gateway (Ref: ${response.data.ref_id}), but order confirmation failed: ${confirmError.message}`
            : `Payment was captured by gateway (Ref: ${response.data.ref_id}), but stock reservation failed.`;
          return {
            code: response.data.code,
            message: errorMessage,
            ref_id: response.data.ref_id,
            card_pan: response.data.card_pan,
            card_hash: response.data.card_hash,
            fee_type: response.data.fee_type,
            fee: response.data.fee,
            orderIds: orders.map((o) => o.id),
            orderId: orders[0]?.id,
            orderNumber: orders.map((o) => o.orderNumber).join(', '),
            success: false,
          };
        }
      }
    }

    // If payment verification failed (non-100/101), cancel ALL PENDING orders
    if (response.data.code !== 100 && response.data.code !== 101) {
      const pendingOrders = orders.filter(
        (o) => o.status === OrderStatus.PENDING
      );
      for (const order of pendingOrders) {
        try {
          await this.orderService.cancelPendingOrder(order.id);
        } catch (error) {
          // Log error but don't fail - payment verification response is what matters
          console.error(
            `Failed to cancel order ${order.id} after payment failure:`,
            error
          );
        }
      }
    }

    return {
      code: response.data.code,
      message: response.data.message,
      ref_id: response.data.ref_id,
      card_pan: response.data.card_pan,
      card_hash: response.data.card_hash,
      fee_type: response.data.fee_type,
      fee: response.data.fee,
      orderIds: orders.map((o) => o.id),
      orderId: orders[0]?.id,
      orderNumber: orders.map((o) => o.orderNumber).join(', '),
      success: response.data.code === 100 || response.data.code === 101,
    };
  }

  @Mutation(() => GatewayUrlResponse)
  @UseGuards(GraphqlAuthGuard)
  async getZarinPalGatewayUrl(
    @CurrentUser() _user: { id: string },
    @Args('authority') authority: string
  ) {
    return {
      url: this.paymentService.getGatewayUrl(authority),
    };
  }

  /**
   * Cancel a pending order when the buyer aborts on ZarinPal (Status=NOK).
   * Per ZarinPal docs, verify must not be called when Status is NOK.
   *
   * Two authorization paths:
   * 1. With non-empty `authority`: any caller (guest or authenticated) may cancel
   *    all PENDING orders bound to that authority. This preserves the existing
   *    guest-compatible behavior where the authority token proves possession.
   * 2. Without `authority` (empty/undefined): caller MUST provide `orderId` and be
   *    authorized as the order owner. Authorization succeeds if:
   *    - `user?.email` is non-empty and equals `order.customerEmail` (authenticated customer), OR
   *    - `guestToken` (trimmed, length >= 16) is found in `order.notes` as the literal
   *      substring `[GuestToken: <token>]` (guest who placed the order).
   *
   * @param orderId - Order ID (required when authority is not provided)
   * @param authority - ZarinPal authority token; if non-empty, authorizes via authority match
   * @param user - Current authenticated user (optional, from @CurrentUser decorator)
   * @param guestToken - Guest token for unauthenticated callers (optional)
   * @returns true if cancellation succeeded (idempotent for already-cancelled orders)
   * @throws BadRequestException if orderId missing without authority, or order not PENDING/already paid
   * @throws ForbiddenException if caller is not the order owner (without authority)
   */
  @Mutation(() => Boolean)
  async cancelPendingZarinPalOrder(
    @Args('orderId', { type: () => String, nullable: true }) orderId?: string,
    @Args('authority', { type: () => String, nullable: true }) authority?: string,
    @CurrentUser() user?: OptionalAuthenticatedUser,
    @Args('guestToken', { type: () => String, nullable: true }) guestToken?: string
  ) {
    // Path 1: Non-empty authority provided -> keep EXACT existing logic
    if (authority && authority.trim() !== '') {
      // Look up orders matching the authority
      const ordersByAuthority = await this.orderService.findOrdersByPaymentAuthority(authority);

      // If orderId was also passed, verify it matches the authority
      let matchedOrders = ordersByAuthority;
      if (orderId) {
        const orderById = await this.orderService.findOne(orderId);
        if (orderById.paymentAuthority !== authority) {
          throw new BadRequestException('Order does not match the provided payment authority');
        }
        // Ensure the orderById is in the matched list (in case findOrdersByPaymentAuthority missed it)
        if (!matchedOrders.some((o) => o.id === orderId)) {
          matchedOrders = [orderById, ...matchedOrders];
        }
      }

      if (matchedOrders.length === 0) {
        throw new BadRequestException('No matching order found for payment authority');
      }

      // Cancel each matched order that is PENDING
      for (const order of matchedOrders) {
        if (order.status === OrderStatus.CANCELLED) {
          // Idempotent: already cancelled, treat as success
          continue;
        }
        if (order.status !== OrderStatus.PENDING) {
          throw new BadRequestException(
            `Cannot cancel order ${order.id} with status ${order.status}. Only PENDING orders can be cancelled.`
          );
        }
        await this.orderService.cancelPendingOrder(order.id);
      }

      return true;
    }

    // Path 2: No authority (or empty) -> require orderId and ownership authorization
    if (!orderId || orderId.trim() === '') {
      throw new BadRequestException('Order ID is required when payment authority is not provided');
    }

    let order;
    try {
      order = await this.orderService.findOne(orderId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new ForbiddenException('Not allowed to cancel this order');
      }
      throw error;
    }

    // Validate raw guestToken format before trimming: reject brackets, CR/LF, or any whitespace
    if (
      typeof guestToken === 'string' &&
      guestToken.length > 0 &&
      /[[\]\r\n\s]/.test(guestToken)
    ) {
      throw new BadRequestException('Invalid guest token format');
    }

    // Authorization check
    const userEmail = user?.email?.trim();
    const providedGuestToken = guestToken?.trim();

    const isOwnerByEmail = Boolean(userEmail && userEmail.length > 0 && order.customerEmail?.toLowerCase() === userEmail.toLowerCase());

    const isOwnerByGuestToken = Boolean(
      providedGuestToken &&
      providedGuestToken.length >= 16 &&
      (order.notes ?? '').includes(`[GuestToken: ${providedGuestToken}]`)
    );

    if (!isOwnerByEmail && !isOwnerByGuestToken) {
      throw new ForbiddenException('Not allowed to cancel this order');
    }

    // Status checks
    if (order.status === OrderStatus.CANCELLED) {
      // Idempotent: already cancelled, treat as success
      return true;
    }

    if (order.status !== OrderStatus.PENDING || order.paymentVerifiedAt) {
      throw new BadRequestException(
        `Cannot cancel order ${order.id} with status ${order.status}. Only unpaid PENDING orders can be cancelled.`
      );
    }

    await this.orderService.cancelPendingOrder(order.id);
    return true;
  }
}
