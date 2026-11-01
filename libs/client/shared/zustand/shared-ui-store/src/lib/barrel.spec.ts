import { describe, expect, it } from 'vitest';
import * as barrel from '../index';

describe('shared-ui-store barrel', () => {
  it('exposes the zustand UI store (no scaffold component)', () => {
    expect(typeof barrel.useUIStore).toBe('function');
    expect(typeof barrel.useUIActions).toBe('function');
    expect('SharedUiStore' in barrel).toBe(false);
  });
});
