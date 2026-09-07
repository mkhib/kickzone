import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import * as exports from './index';

vi.mock('./lib/SellerManagement', () => ({
  SellerManagement: (_props: { children?: React.ReactNode }) => (
    <div data-testid="seller-management">Seller Management</div>
  ),
  default: () => (
    <div data-testid="seller-management-default">Seller Management</div>
  ),
}));

describe('seller-management exports', () => {
  it('should export SellerManagement', () => {
    expect(exports).toHaveProperty('SellerManagement');
    expect(typeof exports.SellerManagement).toBe('function');
  });
});
