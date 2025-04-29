import { OperationVariables, QueryResult, useQuery } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { AdminsAuthProvider } from '@kickzone-workspace/admins-contexts';
import { useCategories } from '@kickzone-workspace/categories-hook';
import { useProducts } from '@kickzone-workspace/products-hook';
import { useSnackbarContext } from '@kickzone-workspace/snackbar-hook';
import { AlertColor } from '@mui/material';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminProductEditor } from './AdminProductEditor';

// Mock the hooks
vi.mock('@kickzone-workspace/categories-hook');
vi.mock('@kickzone-workspace/products-hook');
vi.mock('@kickzone-workspace/snackbar-hook');

// Mock Apollo Client
vi.mock('@apollo/client', async () => {
  const actual = await vi.importActual('@apollo/client');
  return {
    ...actual,
    useQuery: vi.fn(),
    useMutation: vi.fn(() => [vi.fn()]),
    gql: (strings: TemplateStringsArray) => strings[0],
  };
});

// Create a mock snackbar context
const mockSnackbarValue = {
  showSnackbar: vi.fn(),
  handleClose: vi.fn(),
  open: false,
  message: '',
  severity: 'info' as AlertColor,
  progress: 0,
  state: {
    open: false,
    message: '',
    severity: 'info' as AlertColor,
    progress: 0,
  },
};

// Mock the snackbar hooks
vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbarContext: vi.fn(() => mockSnackbarValue),
  useSnackbar: vi.fn(() => mockSnackbarValue),
}));

const mockCategories = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
];

const mockUseProducts = {
  createProduct: vi.fn().mockResolvedValue({ product: { id: 1 } }),
  isCreatingProduct: false,
  uploadProductImages: vi.fn().mockResolvedValue([]),
  isUploadingImages: false,
  removeProductImage: vi.fn().mockResolvedValue(undefined),
} as unknown as ReturnType<typeof useProducts>;

const mockUseCategories = {
  categoriesData: { categories: mockCategories },
  categoriesLoading: false,
  categoriesError: undefined,
  createCategory: vi.fn(),
  updateCategory: vi.fn(),
  isCreatingCategory: false,
  isUpdatingCategory: false,
} as unknown as ReturnType<typeof useCategories>;

// Mock the auth context
vi.mock('@kickzone-workspace/admins-contexts', () => ({
  AdminsAuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAdminsAuthContext: () => ({
    admin: {
      id: 1,
      name: 'Test Admin',
      email: 'test@test.com',
      role: 'ADMIN',
    },
    loading: false,
    error: null,
    isAuthenticated: true,
  }),
}));

const mockMeData = {
  me: {
    id: '1',
    name: 'Test Admin',
    email: 'admin@test.com',
    role: 'ADMIN',
  },
};

// Mock useQuery for ME_QUERY with proper type
vi.mocked(useQuery).mockReturnValue({
  loading: false,
  data: mockMeData,
  error: undefined,
  client: {} as any,
  observable: {} as any,
  networkStatus: 7,
  called: true,
  refetch: vi.fn(),
  fetchMore: vi.fn(),
  startPolling: vi.fn(),
  stopPolling: vi.fn(),
  subscribeToMore: vi.fn(),
  updateQuery: vi.fn(),
} as unknown as QueryResult<unknown, OperationVariables>);

// Mock react-router-dom
vi.mock('react-router-dom', () => {
  const actual = require('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => children,
    useLocation: () => ({
      pathname: '/product-editor',
      search: '',
      hash: '',
      state: null,
    }),
  };
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter initialEntries={['/product-editor']}>
      <MockedProvider mocks={[]} addTypename={false}>
        <AdminsAuthProvider>{ui}</AdminsAuthProvider>
      </MockedProvider>
    </MemoryRouter>
  );
};

describe('AdminProductEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock URL methods
    const mockCreateObjectURL = vi.fn((file) => `mock-url-${file.name}`);
    const mockRevokeObjectURL = vi.fn();

    global.URL.createObjectURL = mockCreateObjectURL;
    global.URL.revokeObjectURL = mockRevokeObjectURL;

    vi.mocked(useCategories).mockReturnValue(mockUseCategories);
    vi.mocked(useProducts).mockReturnValue(mockUseProducts);
    vi.mocked(useSnackbarContext).mockReturnValue(mockSnackbarValue);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<AdminProductEditor />);
    expect(baseElement).toBeTruthy();
  });

  it('should render all form fields', () => {
    renderWithProviders(<AdminProductEditor />);

    expect(
      screen.getByRole('textbox', { name: /product name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: /^discount/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: /categories/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /size/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /color/i })).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: /^price$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: /cost price/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: /weight/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: /stock quantity/i })
    ).toBeInTheDocument();
  });

  it('should handle image upload', async () => {
    const productId = 1;
    const mockCreateProduct = vi
      .fn()
      .mockResolvedValue({ product: { id: productId } });
    const mockUploadImages = vi.fn().mockResolvedValue([{ url: 'test.png' }]);

    vi.mocked(useProducts).mockReturnValue({
      ...mockUseProducts,
      createProduct: mockCreateProduct,
      uploadProductImages: mockUploadImages,
      isCreatingProduct: false,
      isUploadingImages: false,
    } as unknown as ReturnType<typeof useProducts>);

    renderWithProviders(<AdminProductEditor />);

    // Fill in required fields using userEvent.type
    const productNameInput = screen.getByRole('textbox', {
      name: /product name/i,
    });
    const sizeInput = screen.getByRole('textbox', { name: /size/i });
    const colorInput = screen.getByRole('textbox', { name: /color/i });
    const priceInput = screen.getByRole('spinbutton', { name: /^price$/i });
    const costPriceInput = screen.getByRole('spinbutton', {
      name: /cost price/i,
    });
    const weightInput = screen.getByRole('spinbutton', { name: /weight/i });
    const stockInput = screen.getByRole('spinbutton', {
      name: /stock quantity/i,
    });
    const discountInput = screen.getByRole('spinbutton', {
      name: /^discount/i,
    });

    await userEvent.clear(productNameInput);
    await userEvent.clear(sizeInput);
    await userEvent.clear(colorInput);
    await userEvent.clear(priceInput);
    await userEvent.clear(costPriceInput);
    await userEvent.clear(weightInput);
    await userEvent.clear(stockInput);
    await userEvent.clear(discountInput);

    await userEvent.type(productNameInput, 'Test Product');
    await userEvent.type(sizeInput, 'M');
    await userEvent.type(colorInput, 'Red');
    await userEvent.type(priceInput, '100');
    await userEvent.type(costPriceInput, '80');
    await userEvent.type(weightInput, '1');
    await userEvent.type(stockInput, '10');
    await userEvent.type(discountInput, '0');

    // Submit form to create product
    const form = screen.getByRole('form');
    await userEvent.click(
      screen.getByRole('button', { name: /save product/i })
    );

    await waitFor(() => {
      expect(mockCreateProduct).toHaveBeenCalled();
      expect(mockSnackbarValue.showSnackbar).toHaveBeenCalledWith(
        'Product created successfully',
        expect.objectContaining({ severity: 'success' })
      );
    });

    // Now upload image
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText(/upload images/i, {
      selector: 'input[type="file"]',
    });

    await userEvent.upload(input, file);

    await waitFor(() => {
      expect(mockUploadImages).toHaveBeenCalledWith(productId, [file]);
    });
  });

  it('should handle multiple image uploads', async () => {
    const productId = 1;
    const mockCreateProduct = vi
      .fn()
      .mockResolvedValue({ product: { id: productId } });
    const mockUploadImages = vi
      .fn()
      .mockResolvedValue(['test1.png', 'test2.png']);

    vi.mocked(useProducts).mockReturnValue({
      ...mockUseProducts,
      createProduct: mockCreateProduct,
      uploadProductImages: mockUploadImages,
      isCreatingProduct: false,
      isUploadingImages: false,
    } as unknown as ReturnType<typeof useProducts>);

    renderWithProviders(<AdminProductEditor />);

    // Fill in required fields using userEvent
    await userEvent.type(
      screen.getByRole('textbox', { name: /product name/i }),
      'Test Product'
    );
    await userEvent.type(screen.getByRole('textbox', { name: /size/i }), 'M');
    await userEvent.type(
      screen.getByRole('textbox', { name: /color/i }),
      'Red'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /^price$/i }),
      '100'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /cost price/i }),
      '80'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /weight/i }),
      '1'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /stock quantity/i }),
      '10'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /^discount/i }),
      '0'
    );

    // Submit form to create product
    const form = screen.getByRole('form');
    await userEvent.click(
      screen.getByRole('button', { name: /save product/i })
    );

    await waitFor(() => {
      expect(mockCreateProduct).toHaveBeenCalled();
    });

    // Now upload images
    const files = [
      new File(['test1'], 'test1.png', { type: 'image/png' }),
      new File(['test2'], 'test2.png', { type: 'image/png' }),
    ];
    const input = screen.getByLabelText(/upload images/i, {
      selector: 'input[type="file"]',
    });

    await userEvent.upload(input, files);

    await waitFor(() => {
      expect(mockUploadImages).toHaveBeenCalledWith(productId, files);
    });
  });

  it('should handle image removal', async () => {
    const productId = 1;
    const mockCreateProduct = vi
      .fn()
      .mockResolvedValue({ product: { id: productId } });
    const mockUploadImages = vi.fn().mockResolvedValue(['test.png']);
    const mockRemoveImage = vi.fn().mockResolvedValue(true);

    vi.mocked(useProducts).mockReturnValue({
      ...mockUseProducts,
      createProduct: mockCreateProduct,
      uploadProductImages: mockUploadImages,
      removeProductImage: mockRemoveImage,
      isCreatingProduct: false,
      isUploadingImages: false,
    } as unknown as ReturnType<typeof useProducts>);

    renderWithProviders(<AdminProductEditor />);

    // Fill in required fields
    await userEvent.type(screen.getByLabelText('Product Name'), 'Test Product');
    await userEvent.type(screen.getByLabelText('Size'), 'M');
    await userEvent.type(screen.getByLabelText('Color'), 'Red');
    await userEvent.type(screen.getByLabelText('Price'), '100');
    await userEvent.type(screen.getByLabelText('Cost Price'), '50');
    await userEvent.type(screen.getByLabelText('Weight (kg)'), '1');
    await userEvent.type(screen.getByLabelText('Stock Quantity'), '10');
    await userEvent.type(screen.getByLabelText('Discount (%)'), '0');

    // Submit form to create product
    const form = screen.getByRole('form');
    await userEvent.click(
      screen.getByRole('button', { name: /save product/i })
    );

    await waitFor(() => {
      expect(mockCreateProduct).toHaveBeenCalled();
    });

    // Upload an image
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText(/upload images/i, {
      selector: 'input[type="file"]',
    });

    await userEvent.upload(input, [file]);

    await waitFor(() => {
      expect(mockUploadImages).toHaveBeenCalledWith(productId, [file]);
    });

    // Remove the image
    const deleteButton = screen.getByLabelText('Delete image');
    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockRemoveImage).toHaveBeenCalledWith(productId, 'test.png');
    });
  });

  it('should show error message when image upload fails', async () => {
    const productId = 1;
    const mockCreateProduct = vi
      .fn()
      .mockResolvedValue({ product: { id: productId } });
    const mockUploadImages = vi
      .fn()
      .mockRejectedValue(new Error('Upload failed'));

    vi.mocked(useProducts).mockReturnValue({
      ...mockUseProducts,
      createProduct: mockCreateProduct,
      uploadProductImages: mockUploadImages,
      isCreatingProduct: false,
      isUploadingImages: false,
    } as unknown as ReturnType<typeof useProducts>);

    renderWithProviders(<AdminProductEditor />);

    // Fill in required fields using userEvent
    await userEvent.type(
      screen.getByRole('textbox', { name: /product name/i }),
      'Test Product'
    );
    await userEvent.type(screen.getByRole('textbox', { name: /size/i }), 'M');
    await userEvent.type(
      screen.getByRole('textbox', { name: /color/i }),
      'Red'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /^price$/i }),
      '100'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /cost price/i }),
      '80'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /weight/i }),
      '1'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /stock quantity/i }),
      '10'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /^discount/i }),
      '0'
    );

    // Submit form to create product
    const form = screen.getByRole('form');
    await userEvent.click(
      screen.getByRole('button', { name: /save product/i })
    );

    await waitFor(() => {
      expect(mockCreateProduct).toHaveBeenCalled();
    });

    // Now try to upload image
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText(/upload images/i, {
      selector: 'input[type="file"]',
    });

    await userEvent.upload(input, [file]);

    await waitFor(() => {
      expect(mockUploadImages).toHaveBeenCalledWith(productId, [file]);
      expect(mockSnackbarValue.showSnackbar).toHaveBeenCalledWith(
        'Upload failed',
        expect.objectContaining({ severity: 'error' })
      );
    });
  });

  it('should handle form submission with images', async () => {
    const productId = 1;
    mockUseProducts.createProduct = vi
      .fn()
      .mockResolvedValue({ product: { id: productId } });
    mockUseProducts.uploadProductImages = vi
      .fn()
      .mockResolvedValue([{ url: 'test.png' }]);

    renderWithProviders(<AdminProductEditor />);

    // Fill in form fields using userEvent
    await userEvent.type(
      screen.getByRole('textbox', { name: /product name/i }),
      'Test Product'
    );
    await userEvent.type(screen.getByRole('textbox', { name: /size/i }), 'M');
    await userEvent.type(
      screen.getByRole('textbox', { name: /color/i }),
      'Red'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /^price$/i }),
      '100'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /cost price/i }),
      '80'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /weight/i }),
      '1'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /stock quantity/i }),
      '10'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /^discount/i }),
      '0'
    );

    // Submit the form
    await userEvent.click(
      screen.getByRole('button', { name: /save product/i })
    );

    await waitFor(() => {
      expect(mockUseProducts.createProduct).toHaveBeenCalled();
    });

    // Upload an image
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText(/upload images/i, {
      selector: 'input[type="file"]',
    });
    await userEvent.upload(input, [file]);

    await waitFor(() => {
      expect(mockUseProducts.uploadProductImages).toHaveBeenCalledWith(
        productId,
        [file]
      );
    });
  });

  it('should show loading state while creating product', async () => {
    mockUseProducts.createProduct = vi.fn().mockResolvedValue({ id: 1 });
    mockUseProducts.isCreatingProduct = true;

    renderWithProviders(<AdminProductEditor />);

    const submitButton = screen.getByRole('button', { name: /save product/i });
    expect(submitButton).toBeDisabled();
  });

  it('should handle category selection', async () => {
    renderWithProviders(<AdminProductEditor />);

    // Click on the category input to open the dropdown
    const categoryInput = screen.getByLabelText('Categories');
    await userEvent.click(categoryInput);

    // Wait for the listbox to be visible
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Click the first category option
    const firstOption = screen.getByRole('option', { name: /category 1/i });
    await userEvent.click(firstOption);

    // Verify the selected category is displayed
    expect(screen.getByDisplayValue('Category 1')).toBeInTheDocument();
  });

  it('should handle category creation', async () => {
    const mockCreateCategory = vi
      .fn()
      .mockResolvedValue({ id: 3, name: 'New Category' });
    mockUseCategories.createCategory = mockCreateCategory;
    renderWithProviders(<AdminProductEditor />);

    const addCategoryButton = screen.getByRole('button', { name: /add new/i });
    await userEvent.click(addCategoryButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/add new category/i)).toBeInTheDocument();
    });
  });
});
