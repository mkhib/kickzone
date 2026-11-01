import { describe, expect, it } from 'vitest';
import * as barrel from '../index';

describe('validations barrel', () => {
  it('exposes the real shipping validation API (no scaffold component)', () => {
    expect(typeof barrel.validateShippingInfo).toBe('function');
    expect(typeof barrel.createShippingInfoSchema).toBe('function');
    expect('ShippingValidation' in barrel).toBe(false);
  });
});
