import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CustomerProfile } from '@kickzone-workspace/entities';
import { CustomerProfileService } from '@kickzone-workspace/services';
import { GraphqlAuthGuard } from '@kickzone-workspace/guards';
import { CurrentUser } from '@kickzone-workspace/decorators';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerProfileInput {
  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  zipCode?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  clothingSize?: string;

  @Field({ nullable: true })
  shoeSize?: string;
}

@Resolver(() => CustomerProfile)
export class CustomerProfileResolver {
  constructor(
    private readonly customerProfileService: CustomerProfileService
  ) {}

  @Query(() => CustomerProfile)
  @UseGuards(GraphqlAuthGuard)
  async myProfile(
    @CurrentUser() user: { id: string }
  ): Promise<CustomerProfile> {
    return this.customerProfileService.getOrCreateProfile(user.id);
  }

  @Mutation(() => CustomerProfile)
  @UseGuards(GraphqlAuthGuard)
  async updateMyProfile(
    @CurrentUser() user: { id: string },
    @Args('input') input: UpdateCustomerProfileInput
  ): Promise<CustomerProfile> {
    return this.customerProfileService.updateProfile(user.id, input);
  }
}
