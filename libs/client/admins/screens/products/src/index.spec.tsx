import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import * as exports from './index';

vi.mock('./lib/AdminProducts', () => ({
  AdminProducts: (_props: { children?: React.ReactNode }) => (
    <div data-testid="admin-products">Admin Products</div>
  ),
  default: () => <div data-testid="admin-products-default">Admin Products</div>,
}));

describe('admin-products exports', () => {
  it('should export AdminProducts', () => {
    expect(exports).toHaveProperty('AdminProducts');
    expect(typeof exports.AdminProducts).toBe('function');
  });
});
