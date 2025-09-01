import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Order } from '@kickzone-workspace/entities';
import { PageInfo } from '@kickzone-workspace/utils';

@ObjectType()
export class OrderEdge {
  @Field(() => Order)
  node: Order;

  @Field(() => String)
  cursor: string;
}

@ObjectType()
export class OrdersConnection {
  @Field(() => [OrderEdge])
  edges: OrderEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
