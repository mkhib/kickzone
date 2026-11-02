import { describe, it, expect } from 'vitest';
import { buildOrderConfirmationData } from './build-order-confirmation-data';

function createMockOrder(overrides: Partial<Parameters<typeof buildOrderConfirmationData>[0][0]> = {}) {
  return {
    id: 'order-1',
    orderNumber: 'ORD-1001',
    trackingNumber: 'TRK-1001',
    customerEmail: 'test@example.com',
    customerPhone: '09121234567',
    customerName: 'Test User',
    shippingAddress: '123 Test St',
    city: 'Tehran',
    state: 'Tehran',
    zipCode: '1234567890',
    country: 'Iran',
    subtotal: 100,
    shippingCost: 10,
    total: 110,
    notes: 'Test notes',
    createdAt: '2026-01-01T00:00:00.000Z',
    items: [
      {
        productId: 'prod-1',
        productName: 'Product 1',
        productImage: '/img1.jpg',
        quantity: 2,
        unitPrice: 50,
        totalPrice: 100,
        color: '#121212',
        size: 'L',
      },
    ],
    ...overrides,
  };
}

describe('buildOrderConfirmationData', () => {
  it('returns null for empty array', () => {
    expect(buildOrderConfirmationData([])).toBeNull();
  });

  it('returns null for array with only null/undefined', () => {
    expect(buildOrderConfirmationData([null, undefined])).toBeNull();
  });

  it('builds confirmation data from a single order', () => {
    const order = createMockOrder();
    const result = buildOrderConfirmationData([order]);

    expect(result).not.toBeNull();
    expect(result?.id).toBe('order-1');
    expect(result?.orderNumber).toBe('ORD-1001');
    expect(result?.trackingNumber).toBe('TRK-1001');
    expect(result?.customerEmail).toBe('test@example.com');
    expect(result?.customerPhone).toBe('09121234567');
    expect(result?.customerName).toBe('Test User');
    expect(result?.shippingAddress).toBe('123 Test St');
    expect(result?.city).toBe('Tehran');
    expect(result?.state).toBe('Tehran');
    expect(result?.zipCode).toBe('1234567890');
    expect(result?.country).toBe('Iran');
    expect(result?.subtotal).toBe(100);
    expect(result?.shippingCost).toBe(10);
    expect(result?.total).toBe(110);
    expect(result?.notes).toBe('Test notes');
    expect(result?.createdAt).toBe('2026-01-01T00:00:00.000Z');
    expect(result?.items).toHaveLength(1);
    expect(result?.items[0].productId).toBe('prod-1');
    expect(result?.items[0].productName).toBe('Product 1');
    expect(result?.items[0].quantity).toBe(2);
    expect(result?.items[0].unitPrice).toBe(50);
    expect(result?.items[0].totalPrice).toBe(100);
    expect(result?.items[0].color).toBe('#121212');
    expect(result?.items[0].size).toBe('L');
    expect(result?.sellerOrders).toHaveLength(1);
    expect(result?.sellerOrders?.[0]).toEqual({
      id: 'order-1',
      orderNumber: 'ORD-1001',
      total: 110,
      trackingNumber: 'TRK-1001',
    });
  });

  it('concatenates items and sums totals from two seller orders', () => {
    const order1 = createMockOrder({
      id: 'order-1',
      orderNumber: 'ORD-1001',
      trackingNumber: 'TRK-1001',
      subtotal: 100,
      shippingCost: 10,
      total: 110,
      items: [
        {
          productId: 'prod-1',
          productName: 'Product 1',
          productImage: '/img1.jpg',
          quantity: 2,
          unitPrice: 50,
          totalPrice: 100,
          color: '#121212',
          size: 'L',
        },
      ],
    });

    const order2 = createMockOrder({
      id: 'order-2',
      orderNumber: 'ORD-1002',
      trackingNumber: 'TRK-1002',
      subtotal: 200,
      shippingCost: 15,
      total: 215,
      items: [
        {
          productId: 'prod-2',
          productName: 'Product 2',
          productImage: '/img2.jpg',
          quantity: 1,
          unitPrice: 200,
          totalPrice: 200,
          color: '#333333',
          size: 'M',
        },
        {
          productId: 'prod-3',
          productName: 'Product 3',
          productImage: '/img3.jpg',
          quantity: 3,
          unitPrice: 30,
          totalPrice: 90,
          color: null,
          size: null,
        },
      ],
    });

    const result = buildOrderConfirmationData([order1, order2]);

    expect(result).not.toBeNull();
    // First order's customer/address info used
    expect(result?.id).toBe('order-1');
    expect(result?.orderNumber).toBe('ORD-1001');
    expect(result?.trackingNumber).toBe('TRK-1001');
    // Items concatenated
    expect(result?.items).toHaveLength(3);
    expect(result?.items[0].productId).toBe('prod-1');
    expect(result?.items[1].productId).toBe('prod-2');
    expect(result?.items[2].productId).toBe('prod-3');
    // Totals summed
    expect(result?.subtotal).toBe(300); // 100 + 200
    expect(result?.shippingCost).toBe(25); // 10 + 15
    expect(result?.total).toBe(325); // 110 + 215
    // sellerOrders has both
    expect(result?.sellerOrders).toHaveLength(2);
    expect(result?.sellerOrders?.[0]).toEqual({
      id: 'order-1',
      orderNumber: 'ORD-1001',
      total: 110,
      trackingNumber: 'TRK-1001',
    });
    expect(result?.sellerOrders?.[1]).toEqual({
      id: 'order-2',
      orderNumber: 'ORD-1002',
      total: 215,
      trackingNumber: 'TRK-1002',
    });
  });

  it('ignores null/undefined entries in the input array', () => {
    const order = createMockOrder({ id: 'order-1', orderNumber: 'ORD-1001' });
    const result = buildOrderConfirmationData([null, order, undefined]);

    expect(result).not.toBeNull();
    expect(result?.id).toBe('order-1');
    expect(result?.orderNumber).toBe('ORD-1001');
    expect(result?.items).toHaveLength(1);
    expect(result?.sellerOrders).toHaveLength(1);
  });

  it('handles items with null color and size', () => {
    const order = createMockOrder({
      items: [
        {
          productId: 'prod-1',
          productName: 'Product 1',
          productImage: '/img1.jpg',
          quantity: 1,
          unitPrice: 50,
          totalPrice: 50,
          color: null,
          size: null,
        },
      ],
    });

    const result = buildOrderConfirmationData([order]);

    expect(result).not.toBeNull();
    expect(result?.items[0].color).toBeUndefined();
    expect(result?.items[0].size).toBeUndefined();
  });

  it('handles trackingNumber being null', () => {
    const order = createMockOrder({ trackingNumber: null as unknown as string });
    const result = buildOrderConfirmationData([order]);

    expect(result).not.toBeNull();
    expect(result?.trackingNumber).toBeNull();
    expect(result?.sellerOrders?.[0].trackingNumber).toBeNull();
  });
});