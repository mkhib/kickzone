import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Order, OrderItem, OrderStatus } from './order.entity';
import { ShippingPaymentMode } from './seller-info.entity';

const GUEST_TOKEN_TAG_RE = /\s*\[GuestToken:\s*[^\]]+\]/g;

export function stripGuestTokenFromNotes(notes?: string | null): string | undefined {
  if (notes === undefined || notes === null) {
    return undefined;
  }
  const cleaned = notes.replace(GUEST_TOKEN_TAG_RE, '').trim();
  return cleaned;
}

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

  @Field(() => String, { defaultValue: 'vip' })
  shippingMethod?: string;

  @Field(() => ShippingPaymentMode, {
    defaultValue: ShippingPaymentMode.PAY_ON_DELIVERY,
  })
  shippingPaymentMode?: ShippingPaymentMode;

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
    shippingMethod: order.shippingMethod || 'vip',
    shippingPaymentMode:
      order.shippingPaymentMode || ShippingPaymentMode.PAY_ON_DELIVERY,
    total: order.total,
    notes: stripGuestTokenFromNotes(order.notes),
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

