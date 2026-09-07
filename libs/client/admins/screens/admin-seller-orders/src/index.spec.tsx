import { describe, it, expect, vi } from 'vitest';
import * as exports from './index';
import React from 'react';

vi.mock('./lib/admin-seller-orders', () => ({
  AdminSellerOrders: (_props: { children?: React.ReactNode }) => (
    <div data-testid="admin-seller-orders">Admin Seller Orders</div>
  ),
  default: () => (
    <div data-testid="admin-seller-orders-default">Admin Seller Orders</div>
  ),
}));

describe('admin-seller-orders exports', () => {
  it('should export AdminSellerOrders', () => {
    expect(exports).toHaveProperty('AdminSellerOrders');
    expect(typeof exports.AdminSellerOrders).toBe('function');
  });
});
