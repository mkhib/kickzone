import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CustomersHome } from './CustomersHomeScreen';

const mockUseProductsQuery = vi.fn();
const mockLoadMore = vi.fn();
const mockAddItem = vi.fn();

vi.mock('@kickzone-workspace/customers-layout', () => ({
  CustomersLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="customers-layout">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/customers-product-card', () => ({
  CustomersProductCard: ({
    product,
  }: {
    product: { id: number; name: string };
  }) => <div data-testid={`product-card-${product.id}`}>{product.name}</div>,
}));

vi.mock('@kickzone-workspace/products-hook', () => ({
  useProductsQuery: (args: unknown) => mockUseProductsQuery(args),
}));

vi.mock('@kickzone-workspace/customers-cart-hook', () => ({
  useCustomersCartService: () => ({
    addItem: mockAddItem,
  }),
}));

vi.mock('@kickzone-workspace/client-shared-graphql', () => ({
  serializeVariantColorHexes: vi.fn(),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      pageTitles: {
        home: () => 'Home',
      },
      messages: {
        homeTitleAccent: () => 'Welcome to',
        homeTitle: () => 'KICKZONE',
      },
      products: {
        searchProductsPlaceholder: () => 'Search products...',
        searchProducts: () => 'Search products',
        noProductsFound: () => 'No products found',
        ascending: () => 'Ascending',
        descending: () => 'Descending',
      },
      form: {
        sortBy: () => 'Sort By',
        order: () => 'Order',
        discount: () => 'Discount',
      },
      table: {
        price: () => 'Price',
      },
      button: {
        search: () => 'Search',
      },
    },
  }),
  useLanguageContext: () => ({
    currentLocale: 'en',
  }),
  usePageTitle: vi.fn(),
  farsiDisplayStack: 'Vazirmatn, sans-serif',
}));

describe('CustomersHomeScreen', () => {
  let observerCallback: (entries: Partial<IntersectionObserverEntry>[]) => void;
  const mockObserve = vi.fn();
  const mockDisconnect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockLoadMore.mockResolvedValue(undefined);

    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      observerCallback = callback;
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: vi.fn(),
      };
    }) as unknown as typeof IntersectionObserver;
  });

  const mockProduct = {
    id: 1,
    name: 'Nike Mercurial',
    productInfos: [{ id: 10, colors: [], images: ['img.jpg'] }],
    sellerProducts: [
      {
        id: 100,
        price: 150,
        discount: 0,
        stockQuantity: 5,
        seller: { id: 1, shippingFee: 10 },
      },
    ],
  };

  it('should render loading indicator when loading products initially', () => {
    mockUseProductsQuery.mockReturnValue({
      products: [],
      loading: true,
      loadMore: mockLoadMore,
      hasNextPage: false,
    });

    render(<CustomersHome />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render no products found message when products list is empty and not loading', () => {
    mockUseProductsQuery.mockReturnValue({
      products: [],
      loading: false,
      loadMore: mockLoadMore,
      hasNextPage: false,
    });

    render(<CustomersHome />);
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('should render products when available', () => {
    mockUseProductsQuery.mockReturnValue({
      products: [mockProduct],
      loading: false,
      loadMore: mockLoadMore,
      hasNextPage: false,
    });

    render(<CustomersHome />);
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByText('Nike Mercurial')).toBeInTheDocument();
  });

  it('should render bottom loader sentinel when hasNextPage is true', () => {
    mockUseProductsQuery.mockReturnValue({
      products: [mockProduct],
      loading: false,
      loadMore: mockLoadMore,
      hasNextPage: true,
    });

    render(<CustomersHome />);
    expect(screen.getByTestId('products-scroll-loader')).toBeInTheDocument();
    expect(mockObserve).toHaveBeenCalled();
  });

  it('should not render bottom loader sentinel when hasNextPage is false', () => {
    mockUseProductsQuery.mockReturnValue({
      products: [mockProduct],
      loading: false,
      loadMore: mockLoadMore,
      hasNextPage: false,
    });

    render(<CustomersHome />);
    expect(screen.queryByTestId('products-scroll-loader')).not.toBeInTheDocument();
  });

  it('should call loadMore when intersection observer triggers intersection', async () => {
    mockUseProductsQuery.mockReturnValue({
      products: [mockProduct],
      loading: false,
      loadMore: mockLoadMore,
      hasNextPage: true,
    });

    render(<CustomersHome />);

    expect(observerCallback).toBeDefined();
    await act(async () => {
      observerCallback([{ isIntersecting: true }]);
    });

    await waitFor(() => {
      expect(mockLoadMore).toHaveBeenCalledTimes(1);
    });
  });

  it('should call loadMore when window is scrolled near the bottom', async () => {
    mockUseProductsQuery.mockReturnValue({
      products: [mockProduct],
      loading: false,
      loadMore: mockLoadMore,
      hasNextPage: true,
    });

    render(<CustomersHome />);

    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
    Object.defineProperty(window, 'scrollY', { value: 1000, writable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 1900,
      writable: true,
    });

    fireEvent.scroll(window);

    await waitFor(() => {
      expect(mockLoadMore).toHaveBeenCalledTimes(1);
    });
  });
});
