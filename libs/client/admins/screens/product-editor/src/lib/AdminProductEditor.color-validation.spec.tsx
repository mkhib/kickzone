import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminProductEditor } from './AdminProductEditor';

const mockShowSnackbar = vi.fn();
const mockCreateCategory = vi.fn();
const mockUpdateCategory = vi.fn();
const mockDeleteCategory = vi.fn();
const mockCreateProductWithInfos = vi.fn();
const mockUploadProductInfoImages = vi.fn();
const mockRemoveProductInfoImage = vi.fn();
const mockUpdateProduct = vi.fn();
const mockCreateColor = vi.fn();
const mockUpdateColor = vi.fn();
const mockDeleteColor = vi.fn();
const mockRefetchProduct = vi.fn();
const mockUseParams = vi.fn<[], { id?: string }>(() => ({ id: undefined }));
const mockUseProductById = vi.fn(
  (..._args: unknown[]): { product: unknown; refetch?: unknown; loading?: boolean; error?: unknown } => ({
    product: null,
    refetch: mockRefetchProduct,
  })
);

vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/glassmorphism-container', () => ({
  GlassmorphismContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="glass-container">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbarContext: () => ({
    showSnackbar: mockShowSnackbar,
  }),
}));

vi.mock('@kickzone-workspace/categories-hook', () => ({
  useCategories: () => ({
    createCategory: mockCreateCategory,
    updateCategory: mockUpdateCategory,
    deleteCategory: mockDeleteCategory,
    isCreatingCategory: false,
    isUpdatingCategory: false,
    isDeletingCategory: false,
  }),
  useCategoriesQuery: () => ({
    categories: [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ],
    getCategoriesLoading: false,
  }),
}));

vi.mock('@kickzone-workspace/brands-hook', () => ({
  useBrandsQuery: () => ({
    brands: [
      { id: 1, name: 'Brand 1', slug: 'brand-1' },
      { id: 2, name: 'Brand 2', slug: 'brand-2' },
    ],
    getBrandsLoading: false,
    refetchBrands: vi.fn(),
  }),
  useBrands: () => ({
    createBrand: vi.fn(),
    updateBrand: vi.fn(),
    deleteBrand: vi.fn(),
    isCreatingBrand: false,
    isUpdatingBrand: false,
    isDeletingBrand: false,
  }),
}));

vi.mock('@kickzone-workspace/products-hook', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@kickzone-workspace/products-hook')>();
  return {
    ...actual,
    useProducts: () => ({
      createProductWithInfos: mockCreateProductWithInfos,
      uploadProductInfoImages: mockUploadProductInfoImages,
      removeProductInfoImage: mockRemoveProductInfoImage,
      isCreatingProduct: false,
      updateProduct: mockUpdateProduct,
    }),
    useProductById: (...args: unknown[]) => mockUseProductById(...args),
  };
});

vi.mock('@kickzone-workspace/colors-hook', () => ({
  useColors: () => ({
    colors: [
      { id: 1, name: 'Red', hexCode: '#ff0000' },
      { id: 2, name: 'Blue', hexCode: '#0000ff' },
    ],
    createColor: mockCreateColor,
    updateColor: mockUpdateColor,
    deleteColor: mockDeleteColor,
    loading: false,
  }),
}));

vi.mock('@kickzone-workspace/site-languages-hook', () => ({
  useSiteLanguages: () => ({
    siteLanguages: [
      {
        id: '1',
        code: 'fa',
        name: 'Persian',
        nativeName: 'فارسی',
        isRTL: true,
        isActive: true,
        isDefault: true,
      },
      {
        id: '2',
        code: 'en',
        name: 'English',
        nativeName: 'English',
        isRTL: false,
        isActive: true,
        isDefault: false,
      },
    ],
    loading: false,
    error: undefined,
    refetch: vi.fn(),
  }),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      pageTitles: {
        adminProductEditor: () => 'Admin Product Editor',
        sellerManageProduct: () => 'Seller Manage Product',
      },
      products: {
        addProduct: () => 'Add Product',
        editProduct: () => 'Edit Product',
        productDetails: () => 'Product Details',
        productVariants: () => 'Product Variants',
        addVariant: () => 'Add Variant',
        saveProduct: () => 'Save Product',
        colors: () => 'Colors',
        size: () => 'Size',
        sizeKind: () => 'Size type',
        sizeKindApparel: () => 'Apparel',
        sizeKindFootwear: () => 'Footwear',
        sizeKindPants: () => 'Pants',
        pantsSizeHint: () => 'Format: waist x length (e.g., 32x34)',
        waist: () => 'Waist',
        inseam: () => 'Inseam',
        waistPlaceholder: () => '32',
        inseamPlaceholder: () => '34',
        selectSize: () => 'Select size',
        weight: () => 'Weight',
        selectImages: () => 'Select Images',
        selectedImagesNotUploaded: () => 'Selected images not uploaded',
        uploadImages: () => 'Upload Images',
        uploadedImages: () => 'Uploaded Images',
        selectedImage: () => 'Selected Image',
        uploadedImage: () => 'Uploaded Image',
      },
      form: {
        productName: () => 'Product Name',
        sku: () => 'SKU',
        category: () => 'Category',
        categoryName: () => 'Category Name',
        brand: () => 'Brand',
        description: () => 'Description',
        color: () => 'Color',
      },
      button: {
        cancel: () => 'Cancel',
        save: () => 'Save',
        delete: () => 'Delete',
      },
      categories: {
        addCategory: () => 'Add New Category',
        editCategory: () => 'Edit Category',
        deleteCategory: () => 'Delete Category',
        deleteCategoryConfirm: ({ name }: { name: string }) =>
          `Delete ${name}?`,
        manageCategories: () => 'Manage Categories',
        searchCategories: () => 'Search categories...',
      },
      modal: {
        deleteImage: () => 'Delete Image',
        deleteImageConfirm: ({ imageType }: { imageType: string }) =>
          `Delete ${imageType}?`,
      },
      status: {
        uploading: () => 'Uploading...',
      },
      colorManagement: {
        addNewColor: () => 'Add New Color',
        editColor: () => 'Edit Color',
        deleteColor: () => 'Delete Color',
        colorName: () => 'Color Name',
        hexCode: () => 'Hex Code',
        deleteColorConfirm: ({ name }: { name: string }) =>
          `Delete ${name}?`,
        manageColors: () => 'Manage Colors',
        searchColors: () => 'Search colors...',
      },
    },
  }),
  usePageTitle: vi.fn(),
}));

vi.mock('@kickzone-workspace/language-components', () => ({
  DialogFormContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-form-content">{children}</div>
  ),
  getLtrTextFieldProps: (sx?: Record<string, unknown>) =>
    sx ? { sx } : {},
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...actual,
    useParams: () => mockUseParams(),
  };
});

vi.mock('react-color', () => ({
  SketchPicker: ({
    onChangeComplete,
  }: {
    onChangeComplete: (color: { hex: string }) => void;
  }) => (
    <button
      data-testid="sketch-picker"
      onClick={() => onChangeComplete({ hex: '#00ff00' })}
      type="button"
    >
      Pick
    </button>
  ),
}));

const renderEditor = () =>
  render(
    <MemoryRouter>
      <AdminProductEditor />
    </MemoryRouter>
  );

describe('AdminProductEditor color modal shared Zod validation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseParams.mockReturnValue({ id: undefined });
    mockUseProductById.mockReturnValue({ product: null, refetch: mockRefetchProduct });
  });

  const openNewColor = () => {
    renderEditor();
    fireEvent.click(screen.getByRole('button', { name: 'Manage Colors' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add New Color' }));
  };

  it('does not create a color without a name', async () => {
    openNewColor();
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(screen.getByLabelText('Color Name')).toHaveAttribute('aria-invalid', 'true'));
    expect(mockCreateColor).not.toHaveBeenCalled();
  });

  it('does not create a color with an invalid hex code', async () => {
    openNewColor();
    fireEvent.change(screen.getByLabelText('Color Name'), { target: { value: 'Green' } });
    fireEvent.change(screen.getByLabelText('Hex Code'), { target: { value: 'green' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(screen.getByLabelText('Hex Code')).toHaveAttribute('aria-invalid', 'true'));
    expect(mockCreateColor).not.toHaveBeenCalled();
  });

  it('creates a color with a valid name and hex code', async () => {
    openNewColor();
    fireEvent.change(screen.getByLabelText('Color Name'), { target: { value: 'Green' } });
    fireEvent.change(screen.getByLabelText('Hex Code'), { target: { value: '#00ff00' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(mockCreateColor).toHaveBeenCalledWith('Green', '#00ff00'));
  });
});
