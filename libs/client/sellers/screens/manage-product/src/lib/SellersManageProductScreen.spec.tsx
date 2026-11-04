import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { SellersManageProductScreen } from './SellersManageProductScreen';
import { useSellersProductManagement } from '@kickzone-workspace/sellers-products-hooks';

const mockUpdateProduct = vi.fn();
const mockCreateProduct = vi.fn();
const mockGetSellerProductById = vi.fn();
const mockShowSnackbar = vi.fn();

const createDefaultSellerProductManagementState = (overrides = {}) => ({
  products: [],
  sellerProduct: {
    id: 'sp-123',
    price: 150,
    costPrice: 100,
    discount: 10,
    stockQuantity: 5,
    boxLess: false,
    productInfo: {
      id: 101,
      size: '42',
      weight: 0.8,
      colors: [{ id: 1, name: 'Red', hexCode: '#ff0000' }],
    },
    product: {
      id: 999,
      name: 'Archived Shoe',
      sku: 'ARC-001',
      archived: true,
      categories: [{ id: 1, name: 'Shoes' }],
      productInfos: [
        {
          id: 101,
          size: '42',
          weight: 0.8,
          colors: [{ id: 1, name: 'Red', hexCode: '#ff0000' }],
        },
      ],
    },
    isManagementLoading: false,
    isProductsLoading: false,
    isSellerProductLoading: false,
    productsError: null,
    sellerProductError: null,
    createError: null,
    updateError: null,
    createProduct: mockCreateProduct,
    updateProduct: mockUpdateProduct,
    getSellerProductById: mockGetSellerProductById,
    ...overrides,
  },
});

let mockSellerProductManagementState = createDefaultSellerProductManagementState();

vi.mock('@kickzone-workspace/sellers-auth-context', () => ({
  useSellersAuthContext: () => ({
    user: { id: 1 },
    canManageCatalog: false,
    sellerInfoLoading: false,
  }),
}));

vi.mock('@kickzone-workspace/sellers-layout', () => ({
  SellersLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@kickzone-workspace/sellers-products-hooks', () => ({
  useSellersProductManagement: () => mockSellerProductManagementState,
}));

vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbar: () => ({
    showSnackbar: mockShowSnackbar,
  }),
}));

vi.mock('@kickzone-workspace/price-display', () => ({
  PriceDisplay: () => <span>price</span>,
}));

vi.mock('@kickzone-workspace/glassmorphism-container', () => ({
  GlassmorphismContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/language-components', () => ({
  getLtrTextFieldProps: () => ({}),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      pageTitles: { sellerManageProduct: () => 'Manage Product' },
      products: {
        loadingProducts: () => 'Loading products',
        editProduct: () => 'Edit Product',
        sellExistingProduct: () => 'Sell Existing',
        defineNewProduct: () => 'Define New',
        selectProduct: () => 'Select Product',
        selectVariant: () => 'Select Variant',
        productDetails: () => 'Product Details',
        pricingInformation: () => 'Pricing Information',
        discountHelper: () => 'Discount Helper',
        boxLess: () => 'Boxless',
        boxLessHelper: () => 'Boxless Helper',
        finalPriceAfterDiscount: () => 'Final Price',
        original: () => 'Original',
        weight: () => 'Weight',
        categories: () => 'Categories',
        variant: () => 'Variant',
        discount: () => 'Discount',
        savings: () => 'Savings',
        noColorSpecified: () => 'No color',
      },
      form: {
        productName: () => 'Product Name',
        stockQuantity: () => 'Stock Quantity',
        price: () => 'Price',
        costPrice: () => 'Cost Price',
        discount: () => 'Discount',
        category: () => 'Category',
      },
      button: {
        addNewProduct: () => 'Add New Product',
        chooseProduct: () => 'Choose Product',
        chooseVariant: () => 'Choose Variant',
        updateProduct: () => 'Update Product',
        addProduct: () => 'Add Product',
        clear: () => 'Clear',
      },
      messages: {
        productUpdated: () => 'Product updated successfully',
        productSaved: () => 'Product saved successfully',
        listingsSaved: () => 'Listings saved successfully',
      },
    },
  }),
  useLanguageContext: () => ({
    formatNumber: (n: number | string) => String(n),
    currentLocale: 'en',
  }),
  usePageTitle: vi.fn(),
}));

describe('SellersManageProductScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSellerProductManagementState = createDefaultSellerProductManagementState();
  });

  it('allows a seller to set stock quantity to 0 when editing an existing product', async () => {
    mockUpdateProduct.mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={['/manage-product?sellerProductId=sp-123']}>
        <SellersManageProductScreen />
      </MemoryRouter>
    );

    expect(mockGetSellerProductById).toHaveBeenCalledWith({
      variables: { id: 'sp-123' },
    });

    const stockInput = await screen.findByLabelText(/stock quantity/i);
    expect(stockInput).toHaveValue(5);

    fireEvent.change(stockInput, { target: { value: '0' } });
    expect(stockInput).toHaveValue(0);

    const updateButton = screen.getByRole('button', { name: 'Update Product' });
    expect(updateButton).not.toBeDisabled();

    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockUpdateProduct).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'sp-123',
          stockQuantity: 0,
        }),
        'sp-123'
      );
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        'Product updated successfully',
        expect.anything()
      );
    });
  });

  it('displays 4XL apparel variant correctly when editing an existing product', async () => {
    mockUpdateProduct.mockResolvedValue({});

    // Mock a seller product with 4XL apparel variant
    const mockSellerProduct4XL = {
      id: 'sp-456',
      price: 200,
      costPrice: 120,
      discount: 15,
      stockQuantity: 10,
      boxLess: false,
      productInfo: {
        id: 201,
        size: '4XL',
        sizeKind: 'APPAREL',
        weight: 1.2,
        colors: [{ id: 2, name: 'Black', hexCode: '#000000' }],
      },
      product: {
        id: 100,
        name: 'Oversized Hoodie',
        sku: 'OH-001',
        archived: false,
        categories: [{ id: 1, name: 'Apparel' }],
        productInfos: [
          {
            id: 201,
            size: '4XL',
            sizeKind: 'APPAREL',
            weight: 1.2,
            colors: [{ id: 2, name: 'Black', hexCode: '#000000' }],
          },
        ],
      },
      isManagementLoading: false,
      isProductsLoading: false,
      isSellerProductLoading: false,
      productsError: null,
      sellerProductError: null,
      createError: null,
      updateError: null,
      createProduct: mockCreateProduct,
      updateProduct: mockUpdateProduct,
      getSellerProductById: mockGetSellerProductById,
    };

    mockSellerProductManagementState = createDefaultSellerProductManagementState({
      sellerProduct: mockSellerProduct4XL,
    });

    render(
      <MemoryRouter initialEntries={['/manage-product?sellerProductId=sp-456']}>
        <SellersManageProductScreen />
      </MemoryRouter>
    );

    expect(mockGetSellerProductById).toHaveBeenCalledWith({
      variables: { id: 'sp-456' },
    });

    // Wait for the product details card to appear
    await screen.findByText('Oversized Hoodie');

    // Verify the 4XL size is displayed in the product details card
    // The displayVariantSize function shows just the size for apparel
    expect(screen.getByText('4XL')).toBeInTheDocument();

    // Verify the variant dropdown shows the 4XL variant
    const variantSelect = screen.getByRole('combobox', { name: /Choose Variant/i });
    expect(variantSelect).toBeInTheDocument();
    // The variant label includes size and color
    expect(variantSelect).toHaveTextContent('4XL - Black');

    // Verify the form is populated with the 4XL variant's data
    const stockInput = await screen.findByLabelText(/stock quantity/i);
    expect(stockInput).toHaveValue(10);

    const updateButton = screen.getByRole('button', { name: 'Update Product' });
    expect(updateButton).not.toBeDisabled();
  });
});