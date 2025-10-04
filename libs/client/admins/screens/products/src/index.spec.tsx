import React from 'react';
import { describe, it, expect, vi } from 'vitest';

// Mock all complex dependencies
vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/products-hook', () => ({
  useProductsWithoutPagination: () => ({
    products: [],
    loading: false,
    refetch: vi.fn(),
  }),
  useProducts: () => ({
    deleteProduct: vi.fn(),
  }),
}));

vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbarContext: () => ({
    showSnackbar: vi.fn(),
  }),
}));

vi.mock('@kickzone-workspace/admins-products-store', () => ({
  useAdminsProductsStore: () => ({
    currentProduct: null,
    imageModal: {
      open: false,
      selectedTab: 0,
      selectedFiles: {},
      selectedFilePreviews: {},
      uploading: {},
    },
    deleteModal: {
      open: false,
      productInfoId: null,
      imageUrl: null,
      imageName: null,
      isLoading: false,
    },
    openImageModal: vi.fn(),
    closeImageModal: vi.fn(),
    setSelectedTab: vi.fn(),
    addSelectedFiles: vi.fn(),
    removeSelectedFile: vi.fn(),
    setUploading: vi.fn(),
    clearSelectedFiles: vi.fn(),
    openDeleteModal: vi.fn(),
    closeDeleteModal: vi.fn(),
    setDeleteModalLoading: vi.fn(),
    updateProductImages: vi.fn(),
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

import * as exports from './index';

describe('admin-products exports', () => {
  it('should export AdminProducts', () => {
    expect(exports).toHaveProperty('AdminProducts');
    expect(typeof exports.AdminProducts).toBe('function');
  });
});
