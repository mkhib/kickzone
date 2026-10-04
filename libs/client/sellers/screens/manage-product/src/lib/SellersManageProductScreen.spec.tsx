import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { SellersManageProductScreen } from './SellersManageProductScreen';

const mockUpdateProduct = vi.fn();
const mockCreateProduct = vi.fn();
const mockGetSellerProductById = vi.fn();
const mockShowSnackbar = vi.fn();

const mockSellerProduct = {
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
};

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
  useSellersProductManagement: () => ({
    products: [], // active products query returns empty (e.g. product is archived)
    sellerProduct: mockSellerProduct,
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
  }),
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
});
