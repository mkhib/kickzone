import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CustomerProductDetails } from './customer-product-details';

const mockUseProductById = vi.fn();
const mockUseProductsQuery = vi.fn();
const mockAddItem = vi.fn();
const mockNavigate = vi.fn();
const mockUseParams = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => mockUseParams(),
    useNavigate: () => mockNavigate,
    Link: ({ children, to, ...props }: { children: React.ReactNode; to: string }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

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
  }) => <div data-testid={`similar-card-${product.id}`}>{product.name}</div>,
  getMultiColorDiscBackground: () => '#556b2f',
}));

vi.mock('@kickzone-workspace/products-hook', () => ({
  useProductById: (id: number) => mockUseProductById(id),
  useProductsQuery: (args: unknown) => mockUseProductsQuery(args),
  resolveProductImageUrl: (img: string) => img,
}));

vi.mock('@kickzone-workspace/customers-cart-hook', () => ({
  useCustomersCartService: () => ({
    addItem: mockAddItem,
  }),
  useWishlistSync: vi.fn(),
}));

vi.mock('@kickzone-workspace/price-display', () => ({
  PriceDisplay: ({ priceInUSD }: { priceInUSD: number }) => (
    <span data-testid="price-display">{priceInUSD.toLocaleString()} تومان</span>
  ),
}));

vi.mock('@kickzone-workspace/client-shared-graphql', () => ({
  formatVariantColorNames: (colors: Array<{ name?: string }>) =>
    colors.map((c) => c.name).filter(Boolean).join(' / ') || 'زیتونی روشن',
  serializeVariantColorHexes: (colors: Array<{ hexCode: string }>) =>
    colors.map((c) => c.hexCode).join(','),
}));

vi.mock('@kickzone-workspace/product-sizes', () => ({
  sortSizeCodes: (_kind: string, sizes: string[]) => sizes,
  isFootwearSizeKind: () => false,
  isPantsSizeKind: () => false,
  isApparelSizeKind: () => false,
  SizeKind: { Apparel: 'apparel', Footwear: 'footwear', Pants: 'pants' },
}));

let mockLanguage = {
  currentLocale: 'fa',
  formatNumber: (num: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).replace(
      /\d/g,
      (digit) => farsiDigits[parseInt(digit, 10)]
    );
  },
  isRTL: true,
};

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      navigation: {
        products: () => 'محصولات',
      },
      products: {
        addToCart: () => 'افزودن به سبد خرید',
      },
    },
  }),
  useLanguageContext: () => mockLanguage,
  usePageTitle: vi.fn(),
  saintbalaBrand: {
    dark: { background: '#0f0f0e' },
    light: { background: '#f2f1ef' },
  },
}));

vi.mock('@kickzone-workspace/shared-ui-store', () => ({
  useUIStore: (selector: (state: { theme: { mode: string } }) => unknown) =>
    selector({ theme: { mode: 'dark' } }),
}));

describe('CustomerProductDetails - no low-stock text', () => {
  const mockProduct = {
    id: 101,
    name: "Jordan Chicago Pants 'Light Olive Green'",
    sku: 'FD7212-340',
    description: 'شلوار زنانه Jordan Chicago با استایل راحت و جیب‌های کاربردی.',
    categories: [
      { id: 1, name: 'زنانه' },
      { id: 2, name: 'شلوار' },
    ],
    productInfos: [
      {
        id: 201,
        size: 'M',
        sizeKind: 'apparel',
        colors: [{ id: 1, name: 'زیتونی روشن', hexCode: '#556b2f' }],
        images: ['/olive-1.jpg', '/olive-2.jpg'],
      },
      {
        id: 202,
        size: 'S',
        sizeKind: 'apparel',
        colors: [{ id: 1, name: 'زیتونی روشن', hexCode: '#556b2f' }],
        images: ['/olive-1.jpg'],
      },
      {
        id: 203,
        size: 'L',
        sizeKind: 'apparel',
        colors: [{ id: 2, name: 'مشکی', hexCode: '#000000' }],
        images: ['/black-1.jpg'],
      },
    ],
    sellerProducts: [
      {
        id: 301,
        productInfoId: 201,
        price: 14982500,
        discount: 0,
        stockQuantity: 1,
        seller: {
          id: 1,
          storeName: 'SaintBala Official',
          shippingFee: 0,
        },
      },
      {
        id: 302,
        productInfoId: 202,
        price: 14982500,
        discount: 0,
        stockQuantity: 4,
        seller: {
          id: 1,
          storeName: 'SaintBala Official',
          shippingFee: 0,
        },
      },
      {
        id: 303,
        productInfoId: 203,
        price: 15500000,
        discount: 10,
        stockQuantity: 2,
        seller: {
          id: 1,
          storeName: 'SaintBala Official',
          shippingFee: 0,
        },
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockLanguage = {
      currentLocale: 'fa',
      formatNumber: (num: number | string) => {
        const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return String(num).replace(
          /\d/g,
          (digit) => farsiDigits[parseInt(digit, 10)]
        );
      },
      isRTL: true,
    };
    mockUseParams.mockReturnValue({ id: '101' });
    mockUseProductById.mockReturnValue({
      product: mockProduct,
      loading: false,
      error: null,
    });
    mockUseProductsQuery.mockReturnValue({
      products: [
        {
          id: 999,
          name: 'Nike Yoga Shorts',
          productInfos: [{ id: 91, images: ['/thumb.jpg'] }],
          sellerProducts: [{ id: 92, price: 3457500, stockQuantity: 3 }],
        },
      ],
    });
  });

  it('does not render low-stock text in Farsi when stock is low', () => {
    render(<CustomerProductDetails />);
    expect(screen.queryByText(/باقی مانده/)).not.toBeInTheDocument();
  });

  it('does not render low-stock text in English when stock is low', () => {
    mockLanguage = { ...mockLanguage, currentLocale: 'en', isRTL: false };
    render(<CustomerProductDetails />);
    expect(screen.queryByText(/left in stock/i)).not.toBeInTheDocument();
  });

  it('keeps the out-of-stock state when stock is zero', () => {
    mockLanguage = { ...mockLanguage, currentLocale: 'en', isRTL: false };
    mockUseProductById.mockReturnValue({
      product: {
        ...mockProduct,
        sellerProducts: mockProduct.sellerProducts.map((sp) => ({ ...sp, stockQuantity: 0 })),
      },
      loading: false,
      error: null,
    });
    render(<CustomerProductDetails />);
    expect(screen.getAllByText('Out of Stock').length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText(/left in stock/i)).not.toBeInTheDocument();
  });
});
