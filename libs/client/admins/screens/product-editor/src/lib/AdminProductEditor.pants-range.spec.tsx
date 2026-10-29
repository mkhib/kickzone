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
  (..._args: unknown[]): { product: any; refetch?: any; loading?: boolean; error?: any } => ({
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

describe('AdminProductEditor pants range (P3 locked)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseParams.mockReturnValue({ id: undefined });
    mockUseProductById.mockReturnValue({ product: null, refetch: mockRefetchProduct });
  });

  // Helper to fill common form fields for pants variant
  const fillPantsForm = async () => {
    // Select Pants size kind
    const sizeKindSelect = screen.getByRole('combobox', { name: /Size type/i });
    fireEvent.mouseDown(sizeKindSelect);
    const pantsOption = await screen.findByRole('option', { name: /Pants/i });
    fireEvent.click(pantsOption);

    // Select color
    const colorInput = screen.getByLabelText(/Color/i);
    fireEvent.focus(colorInput);
    fireEvent.keyDown(colorInput, { key: 'ArrowDown' });
    const redOption = await screen.findByText('Red');
    fireEvent.click(redOption);

    // Fill weight
    const weightInput = screen.getByLabelText(/Weight/i);
    fireEvent.change(weightInput, { target: { value: '300' } });

    // Fill product name, sku, category
    const nameInput = screen.getByRole('textbox', { name: 'Product Name' });
    fireEvent.change(nameInput, { target: { value: 'Test Pants' } });
    const skuInput = screen.getByRole('textbox', { name: 'SKU' });
    fireEvent.change(skuInput, { target: { value: 'TEST-PANTS' } });
    const categoryInput = screen.getByRole('combobox', { name: /Category/i });
    fireEvent.focus(categoryInput);
    fireEvent.keyDown(categoryInput, { key: 'ArrowDown' });
    const categoryOption = await screen.findByText('Category 1');
    fireEvent.click(categoryOption);
  };

  it('T1 waist 0, inseam 34 -> submit -> snackbar error and no create call', async () => {
    renderEditor();
    await fillPantsForm();

    // Enter waist = 0, inseam = 34
    const waistInput = screen.getByRole('spinbutton', { name: /Waist/i });
    fireEvent.change(waistInput, { target: { value: '0' } });
    const inseamInput = screen.getByRole('spinbutton', { name: /Inseam/i });
    fireEvent.change(inseamInput, { target: { value: '34' } });

    // Submit
    fireEvent.submit(screen.getByLabelText('Product Editor Form'));

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        'Please fill in all product variant fields',
        { severity: 'error' }
      );
    });
    expect(mockCreateProductWithInfos).not.toHaveBeenCalled();
  });

  it('T2 waist 100, inseam 34 -> submit -> snackbar error and no create call', async () => {
    renderEditor();
    await fillPantsForm();

    // Enter waist = 100, inseam = 34
    const waistInput = screen.getByRole('spinbutton', { name: /Waist/i });
    fireEvent.change(waistInput, { target: { value: '100' } });
    const inseamInput = screen.getByRole('spinbutton', { name: /Inseam/i });
    fireEvent.change(inseamInput, { target: { value: '34' } });

    // Submit
    fireEvent.submit(screen.getByLabelText('Product Editor Form'));

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        'Please fill in all product variant fields',
        { severity: 'error' }
      );
    });
    expect(mockCreateProductWithInfos).not.toHaveBeenCalled();
  });

  it('T3 waist 32, inseam 150 -> submit -> snackbar error and no create call', async () => {
    renderEditor();
    await fillPantsForm();

    // Enter waist = 32, inseam = 150
    const waistInput = screen.getByRole('spinbutton', { name: /Waist/i });
    fireEvent.change(waistInput, { target: { value: '32' } });
    const inseamInput = screen.getByRole('spinbutton', { name: /Inseam/i });
    fireEvent.change(inseamInput, { target: { value: '150' } });

    // Submit
    fireEvent.submit(screen.getByLabelText('Product Editor Form'));

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        'Please fill in all product variant fields',
        { severity: 'error' }
      );
    });
    expect(mockCreateProductWithInfos).not.toHaveBeenCalled();
  });

  it('T4 waist 32.5, inseam 34 -> submit -> snackbar error and no create call', async () => {
    renderEditor();
    await fillPantsForm();

    // Enter waist = 32.5, inseam = 34
    const waistInput = screen.getByRole('spinbutton', { name: /Waist/i });
    fireEvent.change(waistInput, { target: { value: '32.5' } });
    const inseamInput = screen.getByRole('spinbutton', { name: /Inseam/i });
    fireEvent.change(inseamInput, { target: { value: '34' } });

    // Submit
    fireEvent.submit(screen.getByLabelText('Product Editor Form'));

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        'Please fill in all product variant fields',
        { severity: 'error' }
      );
    });
    expect(mockCreateProductWithInfos).not.toHaveBeenCalled();
  });

  it('T5 waist 32, inseam 34 -> create called with size 32x34 and sizeKind Pants', async () => {
    mockCreateProductWithInfos.mockResolvedValue({
      product: { id: 1, name: 'Test Pants' },
      productInfos: [{ id: 10, size: '32x34', colors: [{ id: 1 }], weight: 300 }],
    });

    renderEditor();
    await fillPantsForm();

    // Enter waist = 32, inseam = 34
    const waistInput = screen.getByRole('spinbutton', { name: /Waist/i });
    fireEvent.change(waistInput, { target: { value: '32' } });
    const inseamInput = screen.getByRole('spinbutton', { name: /Inseam/i });
    fireEvent.change(inseamInput, { target: { value: '34' } });

    // Submit
    fireEvent.submit(screen.getByLabelText('Product Editor Form'));

    await waitFor(() => {
      expect(mockCreateProductWithInfos).toHaveBeenCalledTimes(1);
      expect(mockCreateProductWithInfos).toHaveBeenCalledWith(
        expect.any(Object),
        expect.arrayContaining([
          expect.objectContaining({
            size: '32x34',
            sizeKind: 'Pants',
          }),
        ])
      );
    });
  });

  it('T6 Waist and Inseam spinbuttons have attribute min=1 and max=99', async () => {
    renderEditor();

    // Select Pants size kind
    const sizeKindSelect = screen.getByRole('combobox', { name: /Size type/i });
    fireEvent.mouseDown(sizeKindSelect);
    const pantsOption = await screen.findByRole('option', { name: /Pants/i });
    fireEvent.click(pantsOption);

    const waistInput = screen.getByRole('spinbutton', { name: /Waist/i });
    const inseamInput = screen.getByRole('spinbutton', { name: /Inseam/i });

    expect(waistInput).toHaveAttribute('min', '1');
    expect(waistInput).toHaveAttribute('max', '99');
    expect(inseamInput).toHaveAttribute('min', '1');
    expect(inseamInput).toHaveAttribute('max', '99');
  });

  it('T7 enter waist 32 and inseam 34 (hidden-size-input value 32x34), then clear waist to empty -> hidden-size-input value empty', async () => {
    renderEditor();

    // Select Pants size kind
    const sizeKindSelect = screen.getByRole('combobox', { name: /Size type/i });
    fireEvent.mouseDown(sizeKindSelect);
    const pantsOption = await screen.findByRole('option', { name: /Pants/i });
    fireEvent.click(pantsOption);

    // Enter waist = 32
    const waistInput = screen.getByRole('spinbutton', { name: /Waist/i });
    fireEvent.change(waistInput, { target: { value: '32' } });

    // Enter inseam = 34
    const inseamInput = screen.getByRole('spinbutton', { name: /Inseam/i });
    fireEvent.change(inseamInput, { target: { value: '34' } });

    // Hidden size input should have composite value
    const hiddenSize = screen.getByTestId('hidden-size-input');
    expect(hiddenSize).toHaveValue('32x34');

    // Clear waist
    fireEvent.change(waistInput, { target: { value: '' } });

    // Hidden size input should now be empty
    expect(hiddenSize).toHaveValue('');
  });
});