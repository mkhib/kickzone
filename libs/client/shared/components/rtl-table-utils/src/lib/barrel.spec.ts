import { describe, expect, it } from 'vitest';
import * as barrel from '../index';

describe('rtl-table-utils barrel', () => {
  it('exposes the real RTL table helpers (no scaffold component)', () => {
    expect(typeof barrel.getRTLTableProps).toBe('function');
    expect(typeof barrel.getRTLColumnProps).toBe('function');
    expect(typeof barrel.createRTLTextColumn).toBe('function');
    expect(typeof barrel.useTableAlignment).toBe('function');
    expect(typeof barrel.RTLTextCell).toBe('function');
    expect('RtlTableUtils' in barrel).toBe(false);
  });
});
