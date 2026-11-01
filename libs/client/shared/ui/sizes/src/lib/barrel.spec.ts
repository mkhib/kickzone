import { describe, expect, it } from 'vitest';
import * as barrel from '../index';

describe('sizes barrel', () => {
  it('exposes the real size constants (no scaffold component)', () => {
    expect(barrel.HEADER_HEIGHT).toBe(64);
    expect(barrel.DRAWER_WIDTH).toBe(300);
    expect(typeof barrel.Z_INDEX).toBe('object');
    expect('Sizes' in barrel).toBe(false);
  });
});
