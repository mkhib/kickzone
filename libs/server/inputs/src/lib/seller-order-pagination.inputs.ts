import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SellerOrder } from '@kickzone-workspace/entities';
import { PageInfo } from '@kickzone-workspace/utils';

@ObjectType()
export class SellerOrderEdge {
  @Field(() => SellerOrder)
  node: SellerOrder;

  @Field(() => String)
  cursor: string;
}

@ObjectType()
export class SellerOrdersConnection {
  @Field(() => [SellerOrderEdge])
  edges: SellerOrderEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
