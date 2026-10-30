import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { OrderStatus } from '@kickzone-workspace/entities';
import { Min, IsInt, ArrayMinSize, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateOrderItemInput {
  @Field(() => String)
  productId: string;

  @Field(() => String, { nullable: true })
  sellerProductId?: string;

  @Field(() => String)
  productName: string;

  @Field(() => String, { nullable: true })
  productImage?: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  quantity: number;

  @Field(() => Float)
  @Min(0)
  unitPrice: number;

  @Field(() => Float)
  @Min(0)
  totalPrice: number;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  size?: string;
}

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  customerEmail: string;

  @Field(() => String)
  customerPhone: string;

  @Field(() => String)
  customerName: string;

  @Field(() => String)
  shippingAddress: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  zipCode: string;

  @Field(() => String)
  country: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  sellerId: number;

  @Field(() => [CreateOrderItemInput])
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemInput)
  items: CreateOrderItemInput[];

  @Field(() => String, { nullable: true })
  notes?: string;

  // Optional: Override shipping cost (calculated by smart shipping logic)
  // If not provided, will use seller's shippingFee
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @Min(0)
  shippingCost?: number;
}

@InputType()
export class UpdateOrderItemInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String)
  productId: string;

  @Field(() => String, { nullable: true })
  sellerProductId?: string;

  @Field(() => String)
  productName: string;

  @Field(() => String, { nullable: true })
  productImage?: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  quantity: number;

  @Field(() => Float)
  @Min(0)
  unitPrice: number;

  @Field(() => Float)
  @Min(0)
  totalPrice: number;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  size?: string;
}

@InputType()
export class UpdateOrderInput {
  @Field(() => String, { nullable: true })
  customerEmail?: string;

  @Field(() => String, { nullable: true })
  customerPhone?: string;

  @Field(() => String, { nullable: true })
  customerName?: string;

  @Field(() => String, { nullable: true })
  shippingAddress?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  state?: string;

  @Field(() => String, { nullable: true })
  zipCode?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => [UpdateOrderItemInput], { nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderItemInput)
  items?: UpdateOrderItemInput[];

  @Field(() => String, { nullable: true })
  notes?: string;

  @Field(() => String, { nullable: true })
  trackingNumber?: string;
}

@InputType()
export class UpdateOrderStatusInput {
  @Field(() => String)
  id: string;

  @Field(() => OrderStatus)
  status: OrderStatus;
}

@InputType()
export class OrdersFilterInput {
  @Field(() => String, { nullable: true })
  sellerId?: string;

  @Field(() => OrderStatus, { nullable: true })
  status?: OrderStatus;

  @Field(() => String, { nullable: true })
  customerEmail?: string;

  @Field(() => String, { nullable: true })
  orderNumber?: string;
}

@InputType()
export class OrdersPaginationInput {
  @Field(() => Int, { defaultValue: 10 })
  first: number;

  @Field(() => String, { nullable: true })
  after?: string;
}
