import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Color, ProductInfo } from '@kickzone-workspace/entities';
import { orderedColorsFromLinks } from '@kickzone-workspace/services';

@Resolver(() => ProductInfo)
export class ProductInfoResolver {
  @ResolveField(() => [Color])
  colors(@Parent() productInfo: ProductInfo): Color[] {
    return orderedColorsFromLinks(productInfo.colorLinks);
  }
}
