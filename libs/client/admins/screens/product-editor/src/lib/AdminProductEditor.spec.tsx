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

describe('AdminProductEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseParams.mockReturnValue({ id: undefined });
    mockUseProductById.mockReturnValue({ product: null, refetch: mockRefetchProduct });
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
      refetch: mockRefetchProduct,
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

  it('allows defining product descriptions in multiple languages (English and Farsi)', async () => {
    mockCreateProductWithInfos.mockResolvedValue({
      product: { id: 2, name: 'Multilingual Shoe' },
      productInfos: [
        {
          id: 20,
          size: 'M',
          colors: [{ id: 1, name: 'Red', hexCode: '#ff0000' }],
        },
      ],
    });

    const { container } = renderEditor();

    // Verify tabs for languages are present
    expect(screen.getByRole('tab', { name: /فارسی/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /English/i })).toBeInTheDocument();

    // Fill Farsi description on active default tab
    const farsiDescInput = screen.getByTestId('product-description-fa');
    fireEvent.change(farsiDescInput, {
      target: { value: 'کفش ورزشی عالی' },
    });

    // Switch to English tab
    const englishTab = screen.getByRole('tab', { name: /English/i });
    fireEvent.click(englishTab);

    // Fill English description
    const englishDescInput = screen.getByTestId('product-description-en');
    fireEvent.change(englishDescInput, {
      target: { value: 'Great athletic shoe' },
    });

    // Fill required product details
    const nameInput = container.querySelector(
      '#product-name'
    ) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Multilingual Shoe' } });
    const skuInput = container.querySelector(
      '#product-sku'
    ) as HTMLInputElement;
    fireEvent.change(skuInput, { target: { value: 'SHOE-MULTI-LANG' } });

    // Select category
    const categoryInput = container.querySelector(
      '#categories-autocomplete'
    ) as HTMLInputElement;
    fireEvent.focus(categoryInput);
    fireEvent.keyDown(categoryInput, { key: 'ArrowDown' });
    const categoryOption = await screen.findByText('Category 1');
    fireEvent.click(categoryOption);

    // Select size
    const sizeSelect = screen.getByRole('combobox', { name: /^Size$/i });
    fireEvent.mouseDown(sizeSelect);
    const sizeOption = await screen.findByRole('option', { name: 'M' });
    fireEvent.click(sizeOption);

    // Select color
    const colorInput = screen.getByLabelText(/Color/i);
    fireEvent.focus(colorInput);
    fireEvent.keyDown(colorInput, { key: 'ArrowDown' });
    const redOption = await screen.findByText('Red');
    fireEvent.click(redOption);

    // Fill weight
    const weightInput = container.querySelector(
      'input[name="weight"]'
    ) as HTMLInputElement;
    fireEvent.change(weightInput, { target: { value: '250' } });

    // Submit form
    fireEvent.submit(screen.getByLabelText('Product Editor Form'));

    await waitFor(() => {
      expect(mockCreateProductWithInfos).toHaveBeenCalledTimes(1);
    });

    expect(mockCreateProductWithInfos).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Multilingual Shoe',
        sku: 'SHOE-MULTI-LANG',
        categoryIds: [1],
        descriptions: expect.arrayContaining([
          expect.objectContaining({
            languageId: 1,
            languageCode: 'fa',
            description: 'کفش ورزشی عالی',
          }),
          expect.objectContaining({
            languageId: 2,
            languageCode: 'en',
            description: 'Great athletic shoe',
          }),
        ]),
      }),
      expect.any(Array)
    );
  });

  it('dispatches the correct variant payload when adding a new variant to an existing product, calls refetch, and only shows success on confirmed server response', async () => {
    mockUseParams.mockReturnValue({ id: '10' });
    const existingProduct = {
      id: 10,
      name: 'SAINTBALA Luxury Hoodie',
      sku: 'SB-HOOD-LUX',
      categories: [{ id: 1, name: 'Category 1' }],
      description: 'Existing Description',
      productInfos: [
        {
          id: 101,
          size: 'M',
          sizeKind: 'APPAREL',
          colors: [{ id: 1, name: 'Red', hexCode: '#ff0000' }],
          weight: 500,
          images: ['https://cdn.saintbala.com/existing.jpg'],
        },
      ],
    };
    mockUseProductById.mockReturnValue({
      product: existingProduct,
      refetch: mockRefetchProduct,
    });

    mockUpdateProduct.mockResolvedValueOnce({
      id: 10,
      name: 'SAINTBALA Luxury Hoodie',
      sku: 'SB-HOOD-LUX',
      productInfos: [
        {
          id: 101,
          size: 'M',
          sizeKind: 'APPAREL',
          colors: [{ id: 1, name: 'Red', hexCode: '#ff0000' }],
          weight: 500,
          images: ['https://cdn.saintbala.com/existing.jpg'],
        },
        {
          id: 202,
          size: 'L',
          sizeKind: 'APPAREL',
          colors: [{ id: 2, name: 'Blue', hexCode: '#0000ff' }],
          weight: 550,
          images: [],
        },
      ],
    });

    renderEditor();

    await waitFor(() => {
      expect(
        screen.getByDisplayValue('SAINTBALA Luxury Hoodie')
      ).toBeInTheDocument();
    });

    // Add a new variant row
    const addVariant = screen.getByRole('button', { name: 'Add Variant' });
    fireEvent.click(addVariant);

    // Find all size selects (should now be 2)
    const sizeSelects = screen.getAllByRole('combobox', { name: /^Size$/i });
    expect(sizeSelects).toHaveLength(2);
    fireEvent.mouseDown(sizeSelects[1]);
    const sizeOption = await screen.findByRole('option', { name: 'L' });
    fireEvent.click(sizeOption);

    // Select color for the second variant
    const colorInputs = screen.getAllByLabelText(/Color/i);
    fireEvent.focus(colorInputs[1]);
    fireEvent.keyDown(colorInputs[1], { key: 'ArrowDown' });
    const blueOption = await screen.findByText('Blue');
    fireEvent.click(blueOption);

    // Fill weight for the second variant
    const weightInputs = screen.getAllByLabelText(/Weight/i);
    fireEvent.change(weightInputs[1], {
      target: { value: '550' },
    });

    // Submit form
    fireEvent.submit(screen.getByLabelText('Product Editor Form'));

    await waitFor(() => {
      expect(mockUpdateProduct).toHaveBeenCalledTimes(1);
    });

    expect(mockUpdateProduct).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 10,
        name: 'SAINTBALA Luxury Hoodie',
        sku: 'SB-HOOD-LUX',
        variants: [
          expect.objectContaining({
            id: 101,
            size: 'M',
            colorIds: [1],
            weight: 500,
          }),
          expect.objectContaining({
            id: undefined, // New variant has no server ID yet
            size: 'L',
            colorIds: [2],
            weight: 550,
          }),
        ],
      })
    );

    // Verify refetch was invoked and success notification was shown
    expect(mockRefetchProduct).toHaveBeenCalledTimes(1);
    expect(mockShowSnackbar).toHaveBeenCalledWith(
      'Product updated successfully',
      { severity: 'success' }
    );
  });

  it('displays an error notification when server updateProduct rejects and does not falsely report success', async () => {
    mockUseParams.mockReturnValue({ id: '10' });
    mockUseProductById.mockReturnValue({
      product: {
        id: 10,
        name: 'SAINTBALA Luxury Hoodie',
        sku: 'SB-HOOD-LUX',
        categories: [{ id: 1, name: 'Category 1' }],
        productInfos: [],
      },
      refetch: mockRefetchProduct,
    });

    mockUpdateProduct.mockRejectedValueOnce(
      new Error('Stock quantity cannot be negative.')
    );

    renderEditor();

    await waitFor(() => {
      expect(
        screen.getByDisplayValue('SAINTBALA Luxury Hoodie')
      ).toBeInTheDocument();
    });

    fireEvent.submit(screen.getByLabelText('Product Editor Form'));

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        'Stock quantity cannot be negative.',
        { severity: 'error' }
      );
    });

    expect(mockShowSnackbar).not.toHaveBeenCalledWith(
      'Product updated successfully',
      expect.anything()
    );
  });
});

