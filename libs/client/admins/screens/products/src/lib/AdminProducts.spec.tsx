import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminProducts } from './AdminProducts';

const mockLoadMore = vi.fn();
const mockRefetch = vi.fn();
const mockArchiveProduct = vi.fn();
const mockFetchSellerListings = vi.fn();
const mockOpenImageModal = vi.fn();
const mockCloseImageModal = vi.fn();
const mockOpenArchiveDialog = vi.fn();
const mockCloseArchiveDialog = vi.fn();
const mockSetSearch = vi.fn();
const mockSetCategory = vi.fn();
const mockSetSort = vi.fn();
const mockSetSortOrder = vi.fn();
const mockSetStatus = vi.fn();
const mockSetListingsProduct = vi.fn();
const mockUseProductsQuery = vi.fn();
const mockUseProducts = vi.fn();
const mockUseAdminsProductsStore = vi.fn();
const mockUseSellerListingsByProduct = vi.fn();

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

vi.mock('@kickzone-workspace/categories-hook', () => ({
  useCategoriesQuery: () => ({
    categories: [
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Clothing' },
    ],
  }),
}));

vi.mock('@kickzone-workspace/products-hook', () => ({
  useProductsQuery: () => mockUseProductsQuery(),
  useProducts: () => mockUseProducts(),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      navigation: {
        products: () => 'Products',
        sellers: () => 'Sellers',
      },
      pageTitles: {
        adminProducts: () => 'Admin Products',
      },
      products: {
        addProduct: () => 'Add Product',
        searchByName: () => 'Search by name',
        none: () => 'None',
        price: () => 'Price',
        color: () => 'Color',
        ascending: () => 'Ascending',
        descending: () => 'Descending',
        images: () => 'Images',
        archiveProduct: () => 'Archive Product',
        archiveProductConfirm: () =>
          'Are you sure you want to archive this product?',
        showingProducts: ({
          count,
          total,
        }: {
          count: number;
          total: number;
        }) => `Showing ${count} of ${total} products`,
        noSellersAvailable: () => 'No sellers available',
        errorLoadingProducts: () => 'Error loading products',
        discount: () => 'Discount',
        stock: () => 'Stock',
      },
      form: {
        category: () => 'Category',
        sortBy: () => 'Sort By',
        order: () => 'Order',
        status: () => 'Status',
      },
      table: {
        all: () => 'All',
        active: () => 'Active',
        archived: () => 'Archived',
      },
      status: {
        loading: () => 'Loading...',
      },
      button: {
        edit: () => 'Edit',
        cancel: () => 'Cancel',
        close: () => 'Close',
      },
    },
  }),
  usePageTitle: vi.fn(),
}));

vi.mock('@kickzone-workspace/admins-products-store', () => ({
  useAdminsProductsStore: () => mockUseAdminsProductsStore(),
}));

vi.mock('./adminProducts.hooks', () => ({
  useSellerListingsByProduct: () => mockUseSellerListingsByProduct(),
}));

vi.mock('./ProductImageManagementModal', () => ({
  ProductImageManagementModal: ({
    open,
    product,
  }: {
    open: boolean;
    product: { name?: string } | null;
  }) =>
    open ? (
      <div data-testid="product-image-modal">Images for {product?.name}</div>
    ) : null,
}));

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
}));

const theme = createTheme();

const products = [
  {
    id: 1,
    name: 'Test Product 1',
    archived: false,
    categories: [{ id: 1, name: 'Electronics' }],
    productInfos: [
      {
        colors: [{ id: 1, name: 'Red', hexCode: '#ff0000' }],
        images: ['/uploads/product-1.jpg'],
      },
    ],
  },
  {
    id: 2,
    name: 'Test Product 2',
    archived: true,
    categories: [{ id: 2, name: 'Clothing' }],
    productInfos: [
      {
        colors: [{ id: 2, name: 'Blue', hexCode: '#0000ff' }],
        images: [],
      },
    ],
  },
];

const createStoreState = () => ({
  search: '',
  setSearch: mockSetSearch,
  category: '',
  setCategory: mockSetCategory,
  sort: '',
  setSort: mockSetSort,
  sortOrder: 'asc',
  setSortOrder: mockSetSortOrder,
  status: 'ALL',
  setStatus: mockSetStatus,
  archiveDialogOpen: false,
  productToArchive: null,
  openArchiveDialog: mockOpenArchiveDialog,
  closeArchiveDialog: mockCloseArchiveDialog,
  listingsProduct: null,
  setListingsProduct: mockSetListingsProduct,
  openImageModal: mockOpenImageModal,
  closeImageModal: mockCloseImageModal,
  currentProduct: null,
});

const renderWithProviders = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <AdminProducts />
      </ThemeProvider>
    </MemoryRouter>
  );

describe('AdminProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAdminsProductsStore.mockReturnValue(createStoreState());
    mockUseProductsQuery.mockReturnValue({
      products,
      loading: false,
      error: null,
      loadMore: mockLoadMore,
      hasNextPage: true,
      totalCount: 2,
      refetch: mockRefetch,
    });
    mockUseProducts.mockReturnValue({
      archiveProduct: mockArchiveProduct,
      isArchivingProduct: false,
    });
    mockUseSellerListingsByProduct.mockReturnValue({
      fetchSellerListings: mockFetchSellerListings,
      listingsResult: {
        data: { sellerProductsByProduct: [] },
        loading: false,
        refetch: vi.fn(),
      },
      mutateSellerProduct: vi.fn(),
    });
  });

  it('renders translated filters and product cards', () => {
    renderWithProviders();

    expect(screen.getByTestId('admins-layout')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Add Product' })).toBeInTheDocument();
    expect(screen.getByLabelText('Search by name')).toBeInTheDocument();
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('Showing 2 of 2 products')).toBeInTheDocument();
  });

  it('links to the new-product route', () => {
    renderWithProviders();

    expect(screen.getByRole('link', { name: 'Add Product' })).toHaveAttribute(
      'href',
      '/products/new'
    );
  });

  it('updates search through the products store', () => {
    renderWithProviders();

    fireEvent.change(screen.getByLabelText('Search by name'), {
      target: { value: 'shoe' },
    });

    expect(mockSetSearch).toHaveBeenCalledWith('shoe');
  });

  it('wires edit, image, seller-listing, and archive actions', async () => {
    renderWithProviders();

    fireEvent.click(screen.getAllByLabelText('Images')[0]);
    fireEvent.click(screen.getAllByLabelText('Sellers')[0]);
    fireEvent.click(screen.getAllByLabelText('Archive Product')[0]);

    expect(screen.getAllByLabelText('Edit')[0]).toHaveAttribute(
      'href',
      '/products/edit/1'
    );
    expect(mockOpenImageModal).toHaveBeenCalledWith(products[0], true);
    expect(mockSetListingsProduct).toHaveBeenCalledWith(products[0]);
    expect(mockFetchSellerListings).toHaveBeenCalledWith({
      variables: { productId: 1 },
    });
    expect(mockOpenArchiveDialog).toHaveBeenCalledWith(products[0]);
    expect(screen.getAllByLabelText('Archive Product')).toHaveLength(1);

    await waitFor(() => {
      expect(mockLoadMore).not.toHaveBeenCalled();
    });
  });

  it('renders loading and error states from the query', () => {
    mockUseProductsQuery.mockReturnValueOnce({
      products: [],
      loading: true,
      error: null,
      loadMore: mockLoadMore,
      hasNextPage: false,
      totalCount: 0,
      refetch: mockRefetch,
    });

    renderWithProviders();
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    mockUseProductsQuery.mockReturnValueOnce({
      products: [],
      loading: false,
      error: new Error('boom'),
      loadMore: mockLoadMore,
      hasNextPage: false,
      totalCount: 0,
      refetch: mockRefetch,
    });

    renderWithProviders();
    expect(screen.getByText('Error loading products')).toBeInTheDocument();
  });

  it('confirms archive when the dialog is open', async () => {
    mockUseAdminsProductsStore.mockReturnValue({
      ...createStoreState(),
      archiveDialogOpen: true,
      productToArchive: products[0],
    });

    renderWithProviders();

    fireEvent.click(screen.getByRole('button', { name: 'Archive Product' }));

    await waitFor(() => {
      expect(mockArchiveProduct).toHaveBeenCalledWith(1);
      expect(mockCloseArchiveDialog).toHaveBeenCalled();
      expect(mockRefetch).toHaveBeenCalled();
    });
  });
});
