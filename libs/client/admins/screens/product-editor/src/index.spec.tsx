import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import * as exports from './index';

vi.mock('./lib/AdminProductEditor', () => ({
  AdminProductEditor: (_props: { children?: React.ReactNode }) => (
    <div data-testid="admin-product-editor">Admin Product Editor</div>
  ),
  default: () => (
    <div data-testid="admin-product-editor-default">Admin Product Editor</div>
  ),
}));

describe('admin-product-editor exports', () => {
  it('should export AdminProductEditor', () => {
    expect(exports).toHaveProperty('AdminProductEditor');
    expect(typeof exports.AdminProductEditor).toBe('function');
  });

  it('should export default', () => {
    expect(exports).toHaveProperty('default');
    expect(typeof exports.default).toBe('function');
  });
});
