import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards, BadRequestException } from '@nestjs/common';
import { OrderStatus, type OrderItem } from '@kickzone-workspace/entities';

/** OrderItem with the sellerProduct relation loaded (not declared on the entity class). */
type OrderItemWithSellerProduct = OrderItem & {
  sellerProduct?: { id?: string; stockQuantity?: number } | null;
};
import { PaymentService, OrderService, CurrencyService } from '@kickzone-workspace/services';
import { GraphqlAuthGuard } from '@kickzone-workspace/guards';
import { CurrentUser } from '@kickzone-workspace/decorators';
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

    const isSingleOrder = targetOrderIds.length === 1 && !input.orderIds;

    // Load all orders in targetOrderIds
    const orders = await Promise.all(
      targetOrderIds.map((id) => this.orderService.findOne(id))
    );

    // Verify all orders exist
    const missingOrders = targetOrderIds.filter(
      (_, index) => !orders[index]
    );
    if (missingOrders.length > 0) {
      if (isSingleOrder) {
        throw new BadRequestException('Order not found');
      }
      throw new BadRequestException(
        `Order(s) not found: ${missingOrders.join(', ')}`
      );
    }

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

      for (const order of orders) {
        const customerEmail = String(order.customerEmail ?? '').toLowerCase();
        if (customerEmail !== firstCustomerEmail) {
          throw new BadRequestException(
            'All orders in a batch must belong to the same customer'
          );
        }
      }
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
    // Look up ALL orders bound to this authority
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
      // Handle code 101 idempotently: if every order for this authority is already CONFIRMED
      // and has stock reserved, return success without re-decrementing stock.
      const allOrdersConfirmedAndStockReserved = orders.every(
        (o) =>
          o.status === OrderStatus.CONFIRMED && o.stockReserved === true
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
   * Guest-compatible: authenticated users can call with orderId only.
   * Unauthenticated guests MUST provide the ZarinPal `authority` token
   * which is verified against the order's `paymentAuthority`.
   *
   * @param orderId - Optional order ID (required for authenticated callers without authority)
   * @param authority - ZarinPal authority token (required for unauthenticated callers)
   * @returns true if cancellation succeeded (idempotent for already-cancelled orders)
   */
  @Mutation(() => Boolean)
  async cancelPendingZarinPalOrder(
    @Args('orderId', { type: () => String, nullable: true }) orderId?: string,
    @Args('authority', { type: () => String, nullable: true }) authority?: string
  ) {
    // Require at least a valid non-empty authority for unauthenticated callers
    // If only orderId is provided without authority, the caller must be authenticated
    // (GraphQL context would have user), but since we removed the guard, we enforce
    // authority verification for all callers to prevent guessing orderId UUIDs.
    if (!authority || authority.trim() === '') {
      throw new BadRequestException('Payment authority is required to cancel a pending order');
    }

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
}
