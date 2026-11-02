/**
 * Builds order confirmation data from createOrder mutation results.
 * Pure function with no side effects - suitable for testing.
 */

import type { OrderData, OrderItem } from '@kickzone-workspace/customer-order-confirmation';

// Type for the createOrder mutation result (as returned by the server)
export interface CreateOrderResult {
  id: string;
  orderNumber: string;
  trackingNumber: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  shippingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  notes: string | null;
  createdAt: string;
  items: Array<{
    productId: string;
    productName: string;
    productImage: string | null;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    color: string | null;
    size: string | null;
  }>;
}

// Extended OrderData with optional sellerOrders for multi-seller display
export interface OrderConfirmationData extends OrderData {
  sellerOrders?: Array<{
    id: string;
    orderNumber: string;
    total: number;
    trackingNumber?: string | null;
  }>;
}

/**
 * Maps a server order item to the OrderItem type used by the confirmation page.
 */
function mapOrderItem(item: CreateOrderResult['items'][0]): OrderItem {
  return {
    productId: item.productId,
    productName: item.productName,
    productImage: item.productImage,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    totalPrice: item.totalPrice,
    color: item.color ?? undefined,
    size: item.size ?? undefined,
  };
}

/**
 * Builds order confirmation data from an array of createOrder results.
 *
 * @param orders - Array of fulfilled createOrder mutation results
 * @returns OrderConfirmationData compatible with CustomerOrderConfirmation page, or null if input is empty
 *
 * Behavior:
 * - Uses customer/address/id/orderNumber/trackingNumber/createdAt/notes from the FIRST order
 * - Concatenates all items from all orders
 * - Sums subtotal, shippingCost, total across all orders
 * - Creates sellerOrders array with one entry per order
 * - Ignores null/undefined entries in the input array
 * - Returns null for empty input (after filtering)
 */
export function buildOrderConfirmationData(
  orders: Array<CreateOrderResult | null | undefined>
): OrderConfirmationData | null {
  // Filter out null/undefined entries
  const validOrders = orders.filter((o): o is CreateOrderResult => o != null);

  if (validOrders.length === 0) {
    return null;
  }

  const firstOrder = validOrders[0];

  // Concatenate all items from all orders
  const allItems = validOrders.flatMap((order) => order.items.map(mapOrderItem));

  // Sum totals across all orders
  const subtotal = validOrders.reduce((sum, order) => sum + order.subtotal, 0);
  const shippingCost = validOrders.reduce((sum, order) => sum + order.shippingCost, 0);
  const total = validOrders.reduce((sum, order) => sum + order.total, 0);

  // Build sellerOrders array
  const sellerOrders = validOrders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    total: order.total,
    trackingNumber: order.trackingNumber ?? null,
  }));

  return {
    id: firstOrder.id,
    orderNumber: firstOrder.orderNumber,
    trackingNumber: firstOrder.trackingNumber,
    customerEmail: firstOrder.customerEmail,
    customerPhone: firstOrder.customerPhone,
    customerName: firstOrder.customerName,
    shippingAddress: firstOrder.shippingAddress,
    city: firstOrder.city,
    state: firstOrder.state,
    zipCode: firstOrder.zipCode,
    country: firstOrder.country,
    subtotal,
    shippingCost,
    total,
    items: allItems,
    notes: firstOrder.notes,
    createdAt: firstOrder.createdAt,
    sellerOrders,
  };
}