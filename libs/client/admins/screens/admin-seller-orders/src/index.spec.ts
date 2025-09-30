import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Mock AdminsLayout to avoid lottie-web canvas issues
vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

import * as exports from './index';

describe('admin-seller-orders exports', () => {
  it('should export AdminSellerOrders', () => {
    expect(exports).toHaveProperty('AdminSellerOrders');
    expect(typeof exports.AdminSellerOrders).toBe('function');
  });
});
