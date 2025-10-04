import React from 'react';
import { describe, it, expect, vi } from 'vitest';

// Mock all dependencies
vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbarContext: () => ({
    showSnackbar: vi.fn(),
  }),
}));

vi.mock('@kickzone-workspace/categories-hook', () => ({
  useCategories: () => ({
    createCategory: vi.fn(),
    updateCategory: vi.fn(),
    deleteCategory: vi.fn(),
    isCreatingCategory: false,
    isUpdatingCategory: false,
    isDeletingCategory: false,
  }),
  useCategoriesQuery: () => ({
    categories: [],
    getCategoriesLoading: false,
  }),
}));

vi.mock('@kickzone-workspace/products-hook', () => ({
  useProducts: () => ({
    createProductWithInfos: vi.fn(),
    uploadProductInfoImages: vi.fn(),
    removeProductInfoImage: vi.fn(),
    isCreatingProduct: false,
    updateProduct: vi.fn(),
  }),
  useProductById: () => ({
    product: null,
    refetch: vi.fn(),
  }),
}));

vi.mock('@kickzone-workspace/colors-hook', () => ({
  useColors: () => ({
    colors: [],
    createColor: vi.fn(),
    updateColor: vi.fn(),
    deleteColor: vi.fn(),
    loading: false,
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: undefined }),
  };
});

vi.mock('react-color', () => ({
  SketchPicker: () => <div data-testid="sketch-picker" />,
}));

import * as exports from './index';

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
