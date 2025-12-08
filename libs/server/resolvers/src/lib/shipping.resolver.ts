import {
  Resolver,
  Query,
  Args,
  Float,
  InputType,
  Field,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import {
  ShippingCalculationService,
  SellerShippingInfo,
} from '@kickzone-workspace/services';
import { GraphqlAuthGuard } from '@kickzone-workspace/guards';
import { ObjectType } from '@nestjs/graphql';

@InputType()
export class SellerShippingInfoInput {
  @Field(() => String)
  sellerId: string;

  @Field(() => Float)
  shippingFee: number;

  @Field(() => String, { nullable: true })
  sellerName?: string;
}

@ObjectType()
export class ShippingCalculationResult {
  @Field(() => Float)
  totalShippingCost: number;

  @Field(() => Boolean)
  freeShippingApplied: boolean;

  @Field(() => String)
  strategyUsed: string;

  @Field(() => [SellerShippingBreakdown], { nullable: true })
  shippingBreakdown?: SellerShippingBreakdown[];
}

@ObjectType()
export class SellerShippingBreakdown {
  @Field(() => String)
  sellerId: string;

  @Field(() => String, { nullable: true })
  sellerName?: string;

  @Field(() => Float)
  originalFee: number;

  @Field(() => Float)
  appliedFee: number;
}

@Resolver()
export class ShippingResolver {
  constructor(
    private readonly shippingCalculationService: ShippingCalculationService
  ) {}

  /**
   * Calculate shipping cost for a cart
   * Used by frontend to display accurate shipping costs
   */
  @Query(() => ShippingCalculationResult)
  @UseGuards(GraphqlAuthGuard)
  async calculateShippingCost(
    @Args('cartSubtotal', { type: () => Float }) cartSubtotal: number,
    @Args('sellerShippingFees', { type: () => [SellerShippingInfoInput] })
    sellerShippingFees: SellerShippingInfoInput[]
  ): Promise<ShippingCalculationResult> {
    const result = await this.shippingCalculationService.calculateShippingCost(
      cartSubtotal,
      sellerShippingFees.map((f) => ({
        sellerId: f.sellerId,
        shippingFee: f.shippingFee,
        sellerName: f.sellerName,
      }))
    );

    return {
      totalShippingCost: result.totalShippingCost,
      freeShippingApplied: result.freeShippingApplied,
      strategyUsed: result.strategyUsed,
      shippingBreakdown: result.shippingBreakdown.map((item) => ({
        sellerId: String(item.sellerId),
        sellerName: item.sellerName,
        originalFee: item.originalFee,
        appliedFee: item.appliedFee,
      })),
    };
  }
}
