import { describe, it, expect } from 'vitest';
import * as exports from './index';

describe('admin-routes exports', () => {
  it('should export ADMIN_ROUTES', () => {
    expect(exports).toHaveProperty('ADMIN_ROUTES');
    expect(typeof exports.ADMIN_ROUTES).toBe('object');
  });

  it('should have all route keys', () => {
    expect(exports.ADMIN_ROUTES).toHaveProperty('HOME');
    expect(exports.ADMIN_ROUTES).toHaveProperty('PRODUCTS');
    expect(exports.ADMIN_ROUTES).toHaveProperty('PRODUCTS_NEW');
    expect(exports.ADMIN_ROUTES).toHaveProperty('PRODUCTS_EDIT');
    expect(exports.ADMIN_ROUTES).toHaveProperty('SELLERS');
    expect(exports.ADMIN_ROUTES).toHaveProperty('LOGIN');
    expect(exports.ADMIN_ROUTES).toHaveProperty('UNAUTHORIZED');
    expect(exports.ADMIN_ROUTES).toHaveProperty('CONTACT');
  });
});
