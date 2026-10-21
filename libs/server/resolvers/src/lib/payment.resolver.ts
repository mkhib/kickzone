import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards, BadRequestException } from '@nestjs/common';
import { OrderStatus } from '@kickzone-workspace/entities';
import { PaymentService, OrderService } from '@kickzone-workspace/services';
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
    private readonly orderService: OrderService
  ) {}

  @Mutation(() => ZarinPalPaymentResponse)
  async requestZarinPalPayment(
    @Args('input') input: ZarinPalPaymentRequestInput
  ) {
    if (!input.order_id) {
      throw new BadRequestException('order_id is required to request payment');
    }

    // Ensure the order exists and is still pending before requesting payment
    const order = await this.orderService.findOne(input.order_id);
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException(
        `Order ${input.order_id} is not pending and cannot be paid`
      );
    }

    const response = await this.paymentService.requestPayment({
      amount: input.amount,
      callback_url: input.callback_url,
      description: input.description,
      currency: (input.currency as 'IRR' | 'IRT') || 'IRT',
      metadata: {
        mobile: input.mobile,
        email: input.email,
        order_id: input.order_id,
      },
    });

    // Bind authority and expected amount to the order to prevent tampering on verify
    await this.orderService.setPaymentIntent({
      orderId: input.order_id,
      authority: response.data.authority,
      amount: input.amount,
      currency: input.currency || 'IRT',
    });

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
    if (!input.order_id) {
      throw new BadRequestException('order_id is required to verify payment');
    }

    const order = await this.orderService.findOne(input.order_id);

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException(
        `Order ${input.order_id} is not pending and cannot be verified`
      );
    }

    if (!order.paymentAuthority) {
      throw new BadRequestException(
        'Payment authority not recorded for this order. Please initiate payment again.'
      );
    }

    if (order.paymentAuthority !== input.authority) {
      throw new BadRequestException(
        'Payment authority does not match the order payment intent'
      );
    }

    if (order.paymentAmount === null || order.paymentAmount === undefined) {
      throw new BadRequestException(
        'Payment amount not recorded for this order. Please initiate payment again.'
      );
    }

    const amountToVerify = order.paymentAmount;

    const response = await this.paymentService.verifyPayment({
      amount: amountToVerify,
      authority: input.authority,
    });

    // If payment verification was successful (code 100) and order_id is provided, confirm the order
    // This will decrease stock and update order status to CONFIRMED
    if (
      (response.data.code === 100 || response.data.code === 101) &&
      input.order_id
    ) {
      try {
        // Persist authority/amount before confirming to prevent tampering/replay
        await this.orderService.setPaymentIntent({
          orderId: input.order_id,
          authority: input.authority,
          amount: amountToVerify,
          currency: order.paymentCurrency || 'IRT',
        });

        await this.orderService.confirmOrderPayment(input.order_id);
      } catch (error) {
        console.error(
          `Failed to finalize order ${input.order_id} after successful payment:`,
          error
        );
        // Log error but don't fail payment verification - payment was successful
        // The order confirmation can be retried manually if needed
        // Still return success response since payment was verified
      }
    }

    // If payment verification failed and order_id is provided, cancel the order
    // This prevents orders from staying in PENDING status forever
    if (
      response.data.code !== 100 &&
      response.data.code !== 101 &&
      input.order_id
    ) {
      try {
        await this.orderService.cancelPendingOrder(input.order_id);
      } catch (error) {
        // Log error but don't fail - payment verification response is what matters
        console.error(
          `Failed to cancel order ${input.order_id} after payment failure:`,
          error
        );
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
   */
  @Mutation(() => Boolean)
  @UseGuards(GraphqlAuthGuard)
  async cancelPendingZarinPalOrder(
    @CurrentUser() _user: { id: string },
    @Args('orderId') orderId: string
  ) {
    await this.orderService.cancelPendingOrder(orderId);
    return true;
  }
}
