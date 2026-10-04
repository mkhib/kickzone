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
const mockUseParams = vi.fn<[], { id?: string }>(() => ({ id: undefined }));
const mockUseProductById = vi.fn(() => ({ product: null }));

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

describe('AdminProductEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseParams.mockReturnValue({ id: undefined });
    mockUseProductById.mockReturnValue({ product: null });
  });

  it('renders the editor shell and main fields', () => {
    renderEditor();

    expect(screen.getByTestId('admins-layout')).toBeInTheDocument();
    expect(screen.getByText('Add Product')).toBeInTheDocument();
    expect(screen.getByLabelText('Product Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Product Editor Form')).toBeInTheDocument();
    expect(screen.getByText('Product Variants')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Manage Categories' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Manage Colors' })
    ).toBeInTheDocument();
  });

  it('shows a validation error when required fields are missing', async () => {
    renderEditor();

    fireEvent.submit(screen.getByLabelText('Product Editor Form'));

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        'Please fill in all required fields',
        { severity: 'error' }
      );
    });
  });

  it('adds another variant row', () => {
    renderEditor();

    const addVariant = screen.getByRole('button', { name: 'Add Variant' });
    expect(addVariant).toBeInTheDocument();
    fireEvent.click(addVariant);
    expect(screen.getByLabelText('Product Editor Form')).toBeInTheDocument();
  });

  it('offers apparel and footwear size kind selects instead of free-text size', () => {
    renderEditor();

    expect(
      screen.getByRole('combobox', { name: /Size type/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /^Size$/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('textbox', { name: /^Size$/i })
    ).not.toBeInTheDocument();
  });

  it('opens the new category modal', async () => {
    renderEditor();

    fireEvent.click(
      screen.getByRole('button', { name: 'Manage Categories' })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add New Category' }));

    await waitFor(() => {
      expect(screen.getByLabelText('Category Name')).toBeInTheDocument();
    });
  });

  it('opens the color modal and creates a color', async () => {
    renderEditor();

    fireEvent.click(screen.getByRole('button', { name: 'Manage Colors' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add New Color' }));
    fireEvent.click(screen.getByTestId('sketch-picker'));
    fireEvent.change(screen.getByLabelText('Color Name'), {
      target: { value: 'Green' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(mockCreateColor).toHaveBeenCalledWith('Green', '#00ff00');
    });
  });

  it('loads existing product when an id is present', async () => {
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseProductById.mockReturnValue({
      product: {
        id: 1,
        name: 'Existing Product',
        sku: 'SKU-001',
        categories: [{ id: 1, name: 'Category 1' }],
        description: 'Existing Description',
        productInfos: [
          {
            id: 10,
            size: 'M',
            sizeKind: 'APPAREL',
            colors: [{ id: 1, name: 'Red', hexCode: '#ff0000' }],
            weight: 100,
            images: [],
          },
        ],
      },
    });

    renderEditor();

    await waitFor(() => {
      expect(screen.getByDisplayValue('Existing Product')).toBeInTheDocument();
      expect(screen.getByDisplayValue('SKU-001')).toBeInTheDocument();
    });
  });

  it('submits ALL chosen colors from the input to the product, not just the first one', async () => {
    mockCreateProductWithInfos.mockResolvedValue({
      product: { id: 1, name: 'Multi-Color Shoe' },
      productInfos: [
        {
          id: 10,
          size: 'M',
          colors: [
            { id: 1, name: 'Red', hexCode: '#ff0000' },
            { id: 2, name: 'Blue', hexCode: '#0000ff' },
          ],
        },
      ],
    });

    const { container } = renderEditor();

    // Fill product details
    const nameInput = container.querySelector('#product-name') as HTMLInputElement;
    fireEvent.change(nameInput, {
      target: { value: 'Multi-Color Shoe' },
    });
    const skuInput = container.querySelector('#product-sku') as HTMLInputElement;
    fireEvent.change(skuInput, {
      target: { value: 'SHOE-MULTI-01' },
    });

    // Select category
    const categoryInput = container.querySelector('#categories-autocomplete') as HTMLInputElement;
    fireEvent.focus(categoryInput);
    fireEvent.keyDown(categoryInput, { key: 'ArrowDown' });
    const categoryOption = await screen.findByText('Category 1');
    fireEvent.click(categoryOption);

    // Select size
    const sizeSelect = screen.getByRole('combobox', { name: /^Size$/i });
    fireEvent.mouseDown(sizeSelect);
    const sizeOption = await screen.findByRole('option', { name: 'M' });
    fireEvent.click(sizeOption);

    // Select first color (Red)
    const colorInput = screen.getByLabelText(/Color/i);
    fireEvent.focus(colorInput);
    fireEvent.keyDown(colorInput, { key: 'ArrowDown' });
    const redOption = await screen.findByText('Red');
    fireEvent.click(redOption);

    // Select second color (Blue)
    fireEvent.focus(colorInput);
    fireEvent.keyDown(colorInput, { key: 'ArrowDown' });
    const blueOption = await screen.findByText('Blue');
    fireEvent.click(blueOption);

    // Fill weight
    const weightInput = container.querySelector(
      'input[name="weight"]'
    ) as HTMLInputElement;
    fireEvent.change(weightInput, {
      target: { value: '300' },
    });

    // Submit form
    fireEvent.submit(screen.getByLabelText('Product Editor Form'));

    await waitFor(() => {
      expect(mockCreateProductWithInfos).toHaveBeenCalledTimes(1);
    });

    expect(mockCreateProductWithInfos).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Multi-Color Shoe',
        sku: 'SHOE-MULTI-01',
        categoryIds: [1],
      }),
      [
        expect.objectContaining({
          size: 'M',
          colorIds: [1, 2], // Verifies BOTH colors are set, not just the first one [1]
          weight: 300,
        }),
      ]
    );
  });
});

