import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PaymentService } from '@kickzone-workspace/services';
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
}

@ObjectType()
export class GatewayUrlResponse {
  @Field()
  url: string;
}

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => ZarinPalPaymentResponse)
  @UseGuards(GraphqlAuthGuard)
  async requestZarinPalPayment(
    @CurrentUser() user: any,
    @Args('input') input: ZarinPalPaymentRequestInput
  ) {
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

    return {
      code: response.data.code,
      message: response.data.message,
      authority: response.data.authority,
      fee_type: response.data.fee_type,
      fee: response.data.fee,
    };
  }

  @Mutation(() => ZarinPalVerificationResponse)
  @UseGuards(GraphqlAuthGuard)
  async verifyZarinPalPayment(
    @CurrentUser() user: any,
    @Args('input') input: ZarinPalVerificationRequestInput
  ) {
    const response = await this.paymentService.verifyPayment({
      amount: input.amount,
      authority: input.authority,
    });

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
    @CurrentUser() user: any,
    @Args('authority') authority: string
  ) {
    return {
      url: this.paymentService.getGatewayUrl(authority),
    };
  }
}
