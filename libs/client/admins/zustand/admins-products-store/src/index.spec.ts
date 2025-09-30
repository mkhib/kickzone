import { describe, it, expect, vi } from 'vitest';

// Mock URL.createObjectURL and revokeObjectURL
global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = vi.fn();

import * as exports from './index';

describe('admins-products-store exports', () => {
  it('should export useAdminsProductsStore', () => {
    expect(exports).toHaveProperty('useAdminsProductsStore');
    expect(typeof exports.useAdminsProductsStore).toBe('function');
  });

  it('should be able to call useAdminsProductsStore', () => {
    const { useAdminsProductsStore } = exports;
    const state = useAdminsProductsStore.getState();
    expect(state).toHaveProperty('currentProduct');
    expect(state).toHaveProperty('imageModal');
    expect(state).toHaveProperty('deleteModal');
  });
});
