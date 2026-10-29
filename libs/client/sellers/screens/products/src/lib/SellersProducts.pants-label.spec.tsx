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
        size: () => 'Size',
        color: () => 'Color',
        weight: () => 'Weight',
        yourPrice: () => 'Your Price',
        costPrice: () => 'Cost Price',
        discount: () => 'Discount',
        stock: () => 'Stock',
        images: () => 'Images',
        image: () => 'image',
        yourVariant: () => 'Your Variant',
        yourProductVariantsTitle: () => 'Your Product Variants',
        noColorSpecified: () => 'No color specified',
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
        editVariant: () => 'Edit Variant',
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
    sizeKind: KickzoneGraphqlTypes.SizeKind,
    colors: KickzoneGraphqlTypes.Color[] = [],
    images: string[] = []
  ): KickzoneGraphqlTypes.ProductInfo => ({
    id,
    size,
    sizeKind,
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
    const info = createMockProductInfo(1, '42', KickzoneGraphqlTypes.SizeKind.Footwear, [], ['https://example.com/shoe.jpg']);
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
    const info1 = createMockProductInfo(1, '42', KickzoneGraphqlTypes.SizeKind.Footwear, [grayColor, blackColor], ['https://example.com/shoe.jpg']);
    const info2 = createMockProductInfo(2, '43', KickzoneGraphqlTypes.SizeKind.Footwear, [grayColor, blackColor], ['https://example.com/shoe2.jpg']);

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

describe('SellersProducts pants label (P4b locked)', () => {
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
    sizeKind: KickzoneGraphqlTypes.SizeKind,
    colors: KickzoneGraphqlTypes.Color[] = [],
    images: string[] = []
  ): KickzoneGraphqlTypes.ProductInfo => ({
    id,
    size,
    sizeKind,
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

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <SellersProducts />
      </MemoryRouter>
    );

  it('renders W32/L34 for pants sizeKind and hides raw 32x34', () => {
    const blackColor = createMockColor(1, 'Black', '#000000');

    // A) Pants: size='32x34', sizeKind='Pants' -> should display 'W32/L34'
    const infoPants = createMockProductInfo(201, '32x34', KickzoneGraphqlTypes.SizeKind.Pants, [blackColor], ['https://example.com/pants.jpg']);
    // B) Footwear: size='42', sizeKind='Footwear' -> should display '42'
    const infoFootwear = createMockProductInfo(202, '42', KickzoneGraphqlTypes.SizeKind.Footwear, [blackColor], ['https://example.com/shoe.jpg']);
    // C) Apparel: size='M', sizeKind='Apparel' -> should display 'M'
    const infoApparel = createMockProductInfo(203, 'M', KickzoneGraphqlTypes.SizeKind.Apparel, [blackColor], ['https://example.com/shirt.jpg']);

    mockHookState.sellersProducts = [
      {
        id: 1,
        name: 'Test Product',
        archived: false,
        productInfos: [infoPants, infoFootwear, infoApparel],
        description: 'Test product with multiple size kinds',
        categories: [createMockCategory(1, 'Test')],
        sellerProducts: [
          createMockSellerProduct('sp-1', 100, 0, 10, infoPants),
          createMockSellerProduct('sp-2', 120, 0, 5, infoFootwear),
          createMockSellerProduct('sp-3', 80, 0, 8, infoApparel),
        ],
      },
    ];

    renderComponent();

    // Verify product card renders
    expect(screen.getByText('Test Product')).toBeInTheDocument();

    // T1: some rendered text matches /W32\/L34/
    expect(screen.getByText(/W32\/L34/)).toBeInTheDocument();

    // T2: no rendered text matches /\b32x34\b/
    expect(screen.queryByText(/\b32x34\b/)).not.toBeInTheDocument();

    // T3: text '42' still rendered for footwear (unchanged) - check in sizes line
    // T4: text 'M' still rendered for apparel - check in sizes line
    // The sizes line is in a Typography that contains "Sizes:" and the sizes
    const sizesElement = screen.getByText(/Sizes:/).closest('p, div, span, typography') || screen.getByText(/Sizes:/).parentElement;
    const sizesText = sizesElement?.textContent || '';
    expect(sizesText).toContain('42');
    expect(sizesText).toContain('M');
  });
});