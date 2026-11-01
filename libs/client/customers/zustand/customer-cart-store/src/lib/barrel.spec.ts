import { describe, expect, it } from 'vitest';
import * as barrel from '../index';

describe('customer-cart-store barrel', () => {
  it('exposes the zustand cart store (no scaffold component)', () => {
    expect(typeof barrel.useCartStore).toBe('function');
    expect('CustomerCartStore' in barrel).toBe(false);
  });
});
