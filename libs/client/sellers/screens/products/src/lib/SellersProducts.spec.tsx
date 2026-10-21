import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SellersProducts } from './SellersProducts';

import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

const mockSetSearch = vi.fn();
const mockSetCategory = vi.fn();
const mockSetSellersProductsSortField = vi.fn();
const mockSetStatus = vi.fn();
const mockLoadMoreSellersProducts = vi.fn();

let mockStoreState = {
  search: '',
  category: '',
  sort: '',
  sortOrder: 'asc' as const,
  status: 'ACTIVE' as const,
  setSearch: mockSetSearch,
  setCategory: mockSetCategory,
  setSellersProductsSortField: mockSetSellersProductsSortField,
  setStatus: mockSetStatus,
};

let mockHookState: {
  sellersProducts: KickzoneGraphqlTypes.Product[];
  isSellersProductsLoading: boolean;
  sellersProductsError: Error | null;
  loadMoreSellersProducts: () => void;
  hasMoreSellersProducts: boolean;
} = {
  sellersProducts: [],
  isSellersProductsLoading: false,
  sellersProductsError: null,
  loadMoreSellersProducts: mockLoadMoreSellersProducts,
  hasMoreSellersProducts: false,
};

vi.mock('@kickzone-workspace/sellers-layout', () => ({
  SellersLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sellers-layout">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/glassmorphism-container', () => ({
  GlassmorphismContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="glass-container">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/sellers-auth-context', () => ({
  useSellersAuthContext: () => ({
    canManageCatalog: true,
  }),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      pageTitles: {
        sellerProducts: () => 'Seller Products',
      },
      products: {
        myProducts: () => 'My Products',
        addProduct: () => 'Add Product',
        searchProducts: () => 'Search products',
        loadingProducts: () => 'Loading products...',
        errorLoadingProducts: () => 'Error loading products',
        noProductsFound: () => 'No products found',
        startBySelling: () => 'Start by selling your first product',
        addFirstProduct: () => 'Add First Product',
        loadMore: () => 'Load More',
        categories: () => 'Categories',
        noCategories: () => 'No Categories',
        sizes: () => 'Sizes',
        colors: () => 'Colors',
        noColor: () => 'No Color',
        weightRange: () => 'Weight Range',
        notAvailable: () => 'N/A',
        yourVariants: () => 'Your Variants',
        finalPrice: () => 'Final Price',
        units: () => 'units',
        unitsInStock: () => 'units in stock',
        variants: () => 'variants',
        boxLess: () => 'Boxless',
        productInformationTitle: () => 'Product Information',
      },
      navigation: {
        catalogManagement: () => 'Catalog Management',
      },
      form: {
        category: () => 'Category',
        sortBy: () => 'Sort By',
        status: () => 'Status',
        description: () => 'Description',
        stockQuantity: () => 'Stock Quantity',
      },
      table: {
        allCategories: () => 'All Categories',
        default: () => 'Default',
        name: () => 'Name',
        price: () => 'Price',
        dateCreated: () => 'Date Created',
        active: () => 'Active',
        archived: () => 'Archived',
        all: () => 'All',
      },
      button: {
        viewDetails: () => 'View Details',
        clear: () => 'Clear',
        close: () => 'Close',
      },
    },
  }),
  useLanguageContext: () => ({
    formatNumber: (n: number) => String(n),
    currentLocale: 'en',
  }),
  usePageTitle: vi.fn(),
}));

vi.mock('@kickzone-workspace/sellers-products-store', () => ({
  useSellersProductsStore: () => mockStoreState,
}));

vi.mock('@kickzone-workspace/sellers-products-hooks', () => ({
  useSellersProducts: () => mockHookState,
}));

vi.mock('@kickzone-workspace/price-display', () => ({
  PriceDisplay: ({ priceInUSD }: { priceInUSD: number }) => (
    <span>${priceInUSD}</span>
  ),
}));

vi.mock('@kickzone-workspace/client-shared-graphql', () => ({
  formatVariantColorNames: () => 'Black',
}));

describe('SellersProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    mockStoreState = {
      search: '',
      category: '',
      sort: '',
      sortOrder: 'asc',
      status: 'ACTIVE' as const,
      setSearch: mockSetSearch,
      setCategory: mockSetCategory,
      setSellersProductsSortField: mockSetSellersProductsSortField,
      setStatus: mockSetStatus,
    };

    mockHookState = {
      sellersProducts: [],
      isSellersProductsLoading: false,
      sellersProductsError: null,
      loadMoreSellersProducts: mockLoadMoreSellersProducts,
      hasMoreSellersProducts: false,
    };
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <SellersProducts />
      </MemoryRouter>
    );

  it('renders search input and filters even while loading', () => {
    mockHookState.isSellersProductsLoading = true;
    renderComponent();

    // Layout and container should remain mounted
    expect(screen.getByTestId('sellers-layout')).toBeInTheDocument();
    expect(screen.getByTestId('glass-container')).toBeInTheDocument();

    // Search input and filter controls must remain mounted and visible
    expect(screen.getByLabelText('Search products')).toBeInTheDocument();
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('debounces search input updates before updating the store', () => {
    renderComponent();

    const searchInput = screen.getByLabelText('Search products') as HTMLInputElement;
    expect(searchInput.value).toBe('');

    // User types "cleats"
    fireEvent.change(searchInput, { target: { value: 'cleats' } });

    // Input updates immediately for responsive typing
    expect(searchInput.value).toBe('cleats');

    // Store's setSearch should NOT have been called yet
    expect(mockSetSearch).not.toHaveBeenCalled();

    // Advance time by 300ms (less than 400ms debounce)
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(mockSetSearch).not.toHaveBeenCalled();

    // Advance remaining 100ms (total 400ms)
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(mockSetSearch).toHaveBeenCalledTimes(1);
    expect(mockSetSearch).toHaveBeenCalledWith('cleats');
  });

  it('immediately triggers search when pressing Enter key', () => {
    renderComponent();

    const searchInput = screen.getByLabelText('Search products') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'jersey' } });
    expect(mockSetSearch).not.toHaveBeenCalled();

    // Press Enter
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    expect(mockSetSearch).toHaveBeenCalledTimes(1);
    expect(mockSetSearch).toHaveBeenCalledWith('jersey');
  });

  it('clears search input and updates store immediately when clear button is clicked', () => {
    mockStoreState.search = 'shoes';
    renderComponent();

    const searchInput = screen.getByLabelText('Search products') as HTMLInputElement;
    expect(searchInput.value).toBe('shoes');

    const clearButton = screen.getByRole('button', { name: /clear/i });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);

    expect(searchInput.value).toBe('');
    expect(mockSetSearch).toHaveBeenCalledWith('');
  });

  const createMockCategory = (
    id: number,
    name: string
  ): KickzoneGraphqlTypes.Category => ({
    id,
    name,
    slug: name.toLowerCase(),
    sortOrder: 0,
    isActive: true,
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
  });

  const createMockColor = (
    id: number,
    name: string,
    hexCode: string
  ): KickzoneGraphqlTypes.Color => ({
    id,
    name,
    hexCode,
    isActive: true,
    sortOrder: 0,
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
  });

  const createMockProductInfo = (
    id: number,
    size: string,
    colors: KickzoneGraphqlTypes.Color[] = [],
    images: string[] = []
  ): KickzoneGraphqlTypes.ProductInfo => ({
    id,
    size,
    sizeKind: KickzoneGraphqlTypes.SizeKind.Footwear,
    colors,
    weight: 1,
    images,
    product: {} as KickzoneGraphqlTypes.Product,
  });

  const createMockSellerProduct = (
    id: string,
    price: number,
    discount: number,
    stockQuantity: number,
    productInfo: KickzoneGraphqlTypes.ProductInfo
  ): KickzoneGraphqlTypes.SellerProduct => ({
    id,
    price,
    discount,
    stockQuantity,
    productInfoId: productInfo.id,
    boxLess: false,
    recommended: false,
    productInfo,
    product: {} as KickzoneGraphqlTypes.Product,
  });

  it('renders products and keeps layout stable during subsequent search/loading', () => {
    const info = createMockProductInfo(1, '42', [], ['https://example.com/shoe.jpg']);
    mockHookState.sellersProducts = [
      {
        id: 1,
        name: 'Nike Mercurial',
        archived: false,
        productInfos: [info],
        description: 'Football shoes',
        categories: [createMockCategory(1, 'Shoes')],
        sellerProducts: [createMockSellerProduct('sp-1', 150, 10, 5, info)],
      },
    ];

    renderComponent();

    expect(screen.getByText('Nike Mercurial')).toBeInTheDocument();
    expect(screen.getByLabelText('Search products')).toBeInTheDocument();
  });

  it('renders deduplicated color swatches and does not render "No color" when variants have colors', () => {
    const grayColor = createMockColor(1, 'Gray', '#808080');
    const blackColor = createMockColor(2, 'Black', '#000000');
    const info1 = createMockProductInfo(1, '42', [grayColor, blackColor], ['https://example.com/shoe.jpg']);
    const info2 = createMockProductInfo(2, '43', [grayColor, blackColor], ['https://example.com/shoe2.jpg']);

    mockHookState.sellersProducts = [
      {
        id: 1,
        name: 'Nike Mercurial',
        archived: false,
        productInfos: [info1, info2],
        description: 'Football shoes',
        categories: [createMockCategory(1, 'Shoes')],
        sellerProducts: [
          createMockSellerProduct('sp-1', 150, 10, 5, info1),
          createMockSellerProduct('sp-2', 160, 0, 3, info2),
        ],
      },
    ];

    renderComponent();

    // Both "Gray" and "Black" swatches render exactly once (deduplicated)
    expect(screen.getAllByText('Gray')).toHaveLength(1);
    expect(screen.getAllByText('Black')).toHaveLength(1);

    // The "No color" text is NOT rendered
    expect(screen.queryByText(/No Color/i)).not.toBeInTheDocument();
  });
});
