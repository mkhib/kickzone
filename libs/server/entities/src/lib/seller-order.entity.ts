import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Order, OrderItem, OrderStatus } from './order.entity';

@ObjectType()
export class SellerOrder {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  orderNumber: string;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => Float)
  subtotal: number;

  @Field(() => Float)
  shippingCost: number;

  @Field(() => Float)
  total: number;

  @Field(() => String, { nullable: true })
  notes?: string;

  @Field(() => String, { nullable: true })
  trackingNumber?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int)
  sellerId: number;

  // Seller snapshot fields
  @Field(() => String, { nullable: true })
  sellerStoreName?: string;

  @Field(() => String, { nullable: true })
  sellerPhone?: string;

  @Field(() => String, { nullable: true })
  sellerAddress?: string;

  @Field(() => [OrderItem])
  items: OrderItem[];
}

// Helper function to convert Order to SellerOrder (removes customer PII)
export function toSellerOrder(order: Order): SellerOrder {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    subtotal: order.subtotal,
    shippingCost: order.shippingCost,
    total: order.total,
    notes: order.notes,
    trackingNumber: order.trackingNumber,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    sellerId: order.sellerId,
    sellerStoreName: order.sellerStoreName,
    sellerPhone: order.sellerPhone,
    sellerAddress: order.sellerAddress,
    items: order.items || [],
  };
}

