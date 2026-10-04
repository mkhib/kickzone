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

  it('renders products and keeps layout stable during subsequent search/loading', () => {
    mockHookState.sellersProducts = [
      {
        id: 1,
        name: 'Nike Mercurial',
        description: 'Football shoes',
        categories: [{ id: 1, name: 'Shoes' }],
        sellerProducts: [
          {
            id: 'sp-1',
            price: 150,
            discount: 10,
            stockQuantity: 5,
            productInfo: {
              id: 1,
              size: '42',
              images: ['https://example.com/shoe.jpg'],
            },
          },
        ],
      },
    ];

    renderComponent();

    expect(screen.getByText('Nike Mercurial')).toBeInTheDocument();
    expect(screen.getByLabelText('Search products')).toBeInTheDocument();
  });
});
