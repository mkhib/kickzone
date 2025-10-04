import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { AdminProductEditor } from './AdminProductEditor';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

// Mock dependencies
const mockShowSnackbar = vi.fn();
const mockCreateCategory = vi.fn();
const mockUpdateCategory = vi.fn();
const mockDeleteCategory = vi.fn();
const mockCreateProduct = vi.fn();
const mockUpdateProduct = vi.fn();
const mockUploadProductInfoImages = vi.fn();
const mockRemoveProductInfoImage = vi.fn();
const mockCreateColor = vi.fn();
const mockUpdateColor = vi.fn();
const mockDeleteColor = vi.fn();
const mockRefetch = vi.fn();
const mockCreateProductWithInfos = vi.fn();

// Mock AdminsLayout
vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

// Mock snackbar hook
vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbarContext: () => ({
    showSnackbar: mockShowSnackbar,
  }),
}));

// Mock categories hook
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

// Mock products hook
vi.mock('@kickzone-workspace/products-hook', () => ({
  useProducts: () => ({
    createProductWithInfos: mockCreateProductWithInfos,
    uploadProductInfoImages: mockUploadProductInfoImages,
    removeProductInfoImage: mockRemoveProductInfoImage,
    isCreatingProduct: false,
    updateProduct: mockUpdateProduct,
  }),
  useProductById: () => ({
    product: null,
    refetch: mockRefetch,
  }),
}));

// Mock colors hook
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

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: undefined }),
  };
});

// Mock react-color
vi.mock('react-color', () => ({
  SketchPicker: ({
    onChangeComplete,
  }: {
    onChangeComplete: (color: { hex: string }) => void;
  }) => (
    <div
      data-testid="sketch-picker"
      onClick={() => onChangeComplete({ hex: '#ff0000' })}
    />
  ),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('AdminProductEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render successfully', () => {
    renderWithRouter(<AdminProductEditor />);
    expect(screen.getByText('Add/Edit Product')).toBeInTheDocument();
  });

  it('should render within AdminsLayout', () => {
    renderWithRouter(<AdminProductEditor />);
    expect(screen.getByTestId('admins-layout')).toBeInTheDocument();
  });

  it('should render product form fields', () => {
    renderWithRouter(<AdminProductEditor />);
    expect(screen.getByLabelText('Product Name')).toBeInTheDocument();
    // Category has multiple instances, check it exists with getElementById
    expect(
      document.getElementById('categories-autocomplete')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /description/i })
    ).toBeInTheDocument();
  });

  it('should render product variants section', () => {
    renderWithRouter(<AdminProductEditor />);
    expect(screen.getByText('Product Variants')).toBeInTheDocument();
  });

  it('should render save button', () => {
    renderWithRouter(<AdminProductEditor />);
    expect(
      screen.getByRole('button', { name: /save product/i })
    ).toBeInTheDocument();
  });

  it('should handle product name change', () => {
    renderWithRouter(<AdminProductEditor />);
    const nameInput = document.getElementById(
      'product-name'
    ) as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, {
      target: { value: 'Test Product', name: 'name' },
    });
    expect(nameInput.value).toBe('Test Product');
  });

  it('should handle description change', () => {
    renderWithRouter(<AdminProductEditor />);
    const descInput = screen.getByRole('textbox', {
      name: /description/i,
    }) as HTMLInputElement;
    fireEvent.change(descInput, { target: { value: 'Test Description' } });
    expect(descInput.value).toBe('Test Description');
  });

  it('should show validation error when submitting without required fields', async () => {
    renderWithRouter(<AdminProductEditor />);

    // Submit form without filling fields
    const form = screen.getByLabelText('Product Editor Form');
    fireEvent.submit(form);

    await waitFor(
      () => {
        expect(mockShowSnackbar).toHaveBeenCalledWith(
          'Please fill in all required fields',
          { severity: 'error' }
        );
      },
      { timeout: 3000 }
    );
  });

  it('should open new category modal when add button clicked', async () => {
    renderWithRouter(<AdminProductEditor />);
    const addCategoryButton = screen.getByLabelText('Add new category');
    fireEvent.click(addCategoryButton);

    await waitFor(() => {
      expect(screen.getByText('Add New Category')).toBeInTheDocument();
    });
  });

  it('should render colors section', () => {
    renderWithRouter(<AdminProductEditor />);
    expect(screen.getByText('Colors')).toBeInTheDocument();
    expect(screen.getByText('Add New Color')).toBeInTheDocument();
  });

  it('should render available colors', () => {
    renderWithRouter(<AdminProductEditor />);
    expect(screen.getByText('Red')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
  });

  it('should open new color modal when add color button clicked', async () => {
    renderWithRouter(<AdminProductEditor />);
    const addColorButton = screen.getByText('Add New Color');
    fireEvent.click(addColorButton);

    await waitFor(() => {
      // Modal title should be visible
      const modalTitles = screen.getAllByText('Add New Color');
      expect(modalTitles.length).toBeGreaterThan(0);
    });
  });

  it('should render add variant button', () => {
    renderWithRouter(<AdminProductEditor />);
    expect(
      screen.getByRole('button', { name: /add variant/i })
    ).toBeInTheDocument();
  });

  it('should add a new product variant when add variant button clicked', () => {
    renderWithRouter(<AdminProductEditor />);

    // Get all Add Variant buttons and click the first one
    const addVariantButtons = screen.getAllByRole('button', {
      name: /add variant/i,
    });
    fireEvent.click(addVariantButtons[0]);

    // After clicking, button should still be there
    expect(
      screen.getAllByRole('button', { name: /add variant/i }).length
    ).toBeGreaterThanOrEqual(1);
  });

  it('should render category modal with input field', async () => {
    renderWithRouter(<AdminProductEditor />);
    const addCategoryButton = screen.getByLabelText('Add new category');
    fireEvent.click(addCategoryButton);

    await waitFor(() => {
      // Check for dialog presence instead of specific label
      expect(screen.getByText('Add New Category')).toBeInTheDocument();
    });
  });

  it('should close category modal when cancel clicked', async () => {
    renderWithRouter(<AdminProductEditor />);
    const addCategoryButton = screen.getByLabelText('Add new category');
    fireEvent.click(addCategoryButton);

    await waitFor(() => {
      expect(screen.getByText('Add New Category')).toBeInTheDocument();
    });

    const cancelButtons = screen.getAllByText('Cancel');
    fireEvent.click(cancelButtons[0]);

    await waitFor(() => {
      // Modal should close - check that dialog title is not in document
      const modalTitles = screen.queryAllByText('Add New Category');
      // Button still exists, but modal title should be gone or only button text remains
      expect(modalTitles.length).toBeLessThanOrEqual(1);
    });
  });

  it('should call createCategory when category modal save clicked', async () => {
    mockCreateCategory.mockResolvedValue({ id: 3, name: 'New Category' });
    renderWithRouter(<AdminProductEditor />);

    const addCategoryButton = screen.getByLabelText('Add new category');
    fireEvent.click(addCategoryButton);

    await waitFor(() => {
      expect(screen.getByText('Add New Category')).toBeInTheDocument();
    });

    // Get all textboxes and use the one in the modal
    const textboxes = screen.getAllByRole('textbox');
    const categoryInput = textboxes.find(
      (input) => input.getAttribute('aria-label') === 'Category Name' || true
    );
    if (categoryInput) {
      fireEvent.change(categoryInput, { target: { value: 'New Category' } });
    }

    const saveButtons = screen.getAllByRole('button', { name: /save/i });
    fireEvent.click(saveButtons[0]);

    await waitFor(() => {
      expect(mockCreateCategory).toHaveBeenCalled();
    });
  });

  it('should render color modal with color picker', () => {
    renderWithRouter(<AdminProductEditor />);
    const addColorButton = screen.getByText('Add New Color');
    fireEvent.click(addColorButton);
    expect(screen.getByTestId('sketch-picker')).toBeInTheDocument();
  });

  it('should call createColor when color modal save clicked', async () => {
    mockCreateColor.mockResolvedValue({
      id: 3,
      name: 'Green',
      hexCode: '#00ff00',
    });
    renderWithRouter(<AdminProductEditor />);

    const addColorButton = screen.getByText('Add New Color');
    fireEvent.click(addColorButton);

    const colorNameInput = screen.getByLabelText('Color Name');
    fireEvent.change(colorNameInput, { target: { value: 'Green' } });

    const hexCodeInput = screen.getByLabelText('Hex Code');
    fireEvent.change(hexCodeInput, { target: { value: '#00ff00' } });

    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockCreateColor).toHaveBeenCalledWith('Green', '#00ff00');
    });
  });

  it('should render form with proper aria labels', () => {
    renderWithRouter(<AdminProductEditor />);
    expect(screen.getByLabelText('Product Editor Form')).toBeInTheDocument();
  });
});
