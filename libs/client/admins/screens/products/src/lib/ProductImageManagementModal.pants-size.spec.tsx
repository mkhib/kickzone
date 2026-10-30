import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductImageManagementModal } from './ProductImageManagementModal';
import { useAdminsProductsStore } from '@kickzone-workspace/admins-products-store';
import { useProducts } from '@kickzone-workspace/products-hook';
import { useSnackbarContext } from '@kickzone-workspace/snackbar-hook';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

// Mock all external hooks and dependencies
vi.mock('@kickzone-workspace/admins-products-store', () => ({
  useAdminsProductsStore: vi.fn(),
}));

vi.mock('@kickzone-workspace/products-hook', () => ({
  useProducts: vi.fn(),
  resolveProductImageUrl: vi.fn((url) => url),
}));

vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbarContext: vi.fn(),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: vi.fn(),
}));

vi.mock('@kickzone-workspace/client-shared-graphql', () => ({
  formatVariantColorNames: vi.fn((colors) => colors.join(', ')),
}));

const mockProduct: KickzoneGraphqlTypes.Product = {
  id: 1,
  name: 'Test Product',
  slug: 'test-product',
  productInfos: [
    { id: 10, size: '32x34', colors: ['Black'], images: [] },
    { id: 11, size: 'M', colors: ['Red'], images: [] },
    { id: 12, size: 'L', colors: ['Blue'], images: [] },
  ],
  category: { id: 1, name: 'Pants', slug: 'pants' },
  brand: { id: 1, name: 'Test Brand', slug: 'test-brand' },
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
} as unknown as KickzoneGraphqlTypes.Product;

const mockDeleteModalState = {
  open: false,
  productInfoId: null,
  imageName: null,
  isLoading: false,
};

const createMockStore = (initialTab = 0) => ({
  currentProduct: mockProduct,
  imageModal: {
    open: true,
    selectedTab: initialTab,
    selectedFiles: {},
    uploading: {},
    selectedFilePreviews: {},
  },
  deleteModal: mockDeleteModalState,
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
});

const mockUseProducts = {
  uploadProductInfoImages: vi.fn(),
  removeProductInfoImage: vi.fn(),
};

const mockUseSnackbarContext = {
  showSnackbar: vi.fn(),
};

const mockUseI18nContext = {
  LL: {
    products: {
      manageImages: () => 'Manage Images',
      variant: () => 'Variant',
      deleteImageConfirmMessage: ({ imageName }: { imageName: string }) =>
        `Delete ${imageName}?`,
      onlyImageFilesAllowed: () => 'Only image files allowed',
      filesExceedMaxSize: () => 'Files exceed max size',
      imagesUploadedSuccessfully: () => 'Images uploaded',
      imageRemovedSuccessfully: () => 'Image removed',
      currentImages: ({ count }: { count: number }) => `Current Images (${count})`,
      noImagesUploaded: () => 'No images uploaded',
      addNewImages: () => 'Add New Images',
      selectImages: () => 'Select Images',
      uploadImages: () => 'Upload Images',
      selectedFiles: ({ count }: { count: number }) => `Selected Files (${count})`,
      imagePreviews: () => 'Image Previews',
      close: () => 'Close',
    },
    modal: {
      deleteImage: () => 'Delete Image',
    },
    button: {
      cancel: () => 'Cancel',
      delete: () => 'Delete',
    },
    status: {
      uploading: () => 'Uploading...',
    },
  },
};

const setupRender = (selectedTab = 0) => {
  const mockStore = createMockStore(selectedTab);
  (useAdminsProductsStore as vi.Mock).mockReturnValue(mockStore);
  (useProducts as vi.Mock).mockReturnValue(mockUseProducts);
  (useSnackbarContext as vi.Mock).mockReturnValue(mockUseSnackbarContext);
  (useI18nContext as vi.Mock).mockReturnValue(mockUseI18nContext);

  return render(<ProductImageManagementModal open={true} onClose={vi.fn()} product={mockProduct} />);
};

describe('ProductImageManagementModal - pants size display', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pants size "32x34" as "W32/L34" and does not show raw "32x34"', () => {
    setupRender(0);

    // The tab for 32x34 should show formatted size
    expect(screen.getByText('W32/L34 - Black')).toBeInTheDocument();

    // The panel heading for 32x34 should show formatted size (first tab is selected by default)
    expect(screen.getByText('Variant: W32/L34 - Black')).toBeInTheDocument();

    // Raw pants size code should NOT appear anywhere
    expect(screen.queryByText('32x34')).not.toBeInTheDocument();
  });

  it('renders non-pants size "M" unchanged in tab label and panel', () => {
    setupRender(1); // Select the M tab (index 1)

    // The tab for M should show unchanged size
    expect(screen.getByText('M - Red')).toBeInTheDocument();

    // The panel heading for M should show unchanged size
    expect(screen.getByText('Variant: M - Red')).toBeInTheDocument();

    // The M tab should not have W/L format
    expect(screen.getByText('M - Red').textContent).not.toMatch(/W\d+\/L\d+/);
    // The M panel should not have W/L format
    expect(screen.getByText('Variant: M - Red').textContent).not.toMatch(/W\d+\/L\d+/);
  });

  it('renders non-pants size "L" unchanged in tab label and panel', () => {
    setupRender(2); // Select the L tab (index 2)

    // The tab for L should show unchanged size
    expect(screen.getByText('L - Blue')).toBeInTheDocument();

    // The panel heading for L should show unchanged size
    expect(screen.getByText('Variant: L - Blue')).toBeInTheDocument();

    // The L tab should not have W/L format
    expect(screen.getByText('L - Blue').textContent).not.toMatch(/W\d+\/L\d+/);
    // The L panel should not have W/L format
    expect(screen.getByText('Variant: L - Blue').textContent).not.toMatch(/W\d+\/L\d+/);
  });
});