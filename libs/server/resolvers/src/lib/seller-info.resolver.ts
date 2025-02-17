import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SellerService } from '@kickzone-workspace/services';
import { SellerInfo } from '@kickzone-workspace/entities';
import {
  CreateSellerInput,
  UpdateSellerInput,
} from '@kickzone-workspace/inputs';

@Resolver(() => SellerInfo)
export class SellerResolver {
  constructor(private readonly sellerService: SellerService) {}

  @Mutation(() => SellerInfo)
  createSeller(
    @Args('createSellerInput') createSellerInput: CreateSellerInput
  ) {
    return this.sellerService.create(createSellerInput);
  }

  @Query(() => [SellerInfo], { name: 'sellers' })
  findAll() {
    return this.sellerService.findAll();
  }

  @Query(() => SellerInfo, { name: 'seller' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sellerService.findOne(id);
  }

  @Mutation(() => SellerInfo)
  updateSeller(
    @Args('updateSellerInput') updateSellerInput: UpdateSellerInput
  ) {
    return this.sellerService.update(updateSellerInput.id, updateSellerInput);
  }
}
