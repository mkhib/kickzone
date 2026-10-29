import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CustomerProductDetails } from './customer-product-details';
import { toFarsiDigits } from './customer-product-details';

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

vi.mock('@kickzone-workspace/product-sizes', async () =>
  await vi.importActual<typeof import('@kickzone-workspace/product-sizes')>('@kickzone-workspace/product-sizes')
);

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

describe('CustomerProductDetails Pants Size Formatting', () => {
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
        colors: [{ id: 1, name: 'زيتونی روشن', hexCode: '#556b2f' }],
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

  // T1 pants fa: infos 201 '32x34', 202 '30x32', 203 '34x32', all sizeKind: 'PANTS', colour id 1.
  // Expect getByText(toFarsiDigits('W32/L34')), getByText(toFarsiDigits('W30/L32'));
  // document.body.textContent contains neither '32x34' nor toFarsiDigits('32x34').
  it('T1: renders pants sizes as W32/L34 in Persian locale', () => {
    const pantsProduct = {
      ...mockProduct,
      productInfos: [
        {
          id: 201,
          size: '32x34',
          sizeKind: 'PANTS',
          colors: [{ id: 1, name: 'زیتونی روشن', hexCode: '#556b2f' }],
          images: ['/olive-1.jpg'],
        },
        {
          id: 202,
          size: '30x32',
          sizeKind: 'PANTS',
          colors: [{ id: 1, name: 'زیتونی روشن', hexCode: '#556b2f' }],
          images: ['/olive-1.jpg'],
        },
        {
          id: 203,
          size: '34x32',
          sizeKind: 'PANTS',
          colors: [{ id: 1, name: 'زیتونی روشن', hexCode: '#556b2f' }],
          images: ['/olive-1.jpg'],
        },
      ],
      sellerProducts: [
        {
          id: 301,
          productInfoId: 201,
          price: 14982500,
          discount: 0,
          stockQuantity: 1,
          seller: { id: 1, storeName: 'SaintBala Official', shippingFee: 0 },
        },
        {
          id: 302,
          productInfoId: 202,
          price: 14982500,
          discount: 0,
          stockQuantity: 4,
          seller: { id: 1, storeName: 'SaintBala Official', shippingFee: 0 },
        },
        {
          id: 303,
          productInfoId: 203,
          price: 15500000,
          discount: 10,
          stockQuantity: 2,
          seller: { id: 1, storeName: 'SaintBala Official', shippingFee: 0 },
        },
      ],
    };

    mockUseProductById.mockReturnValue({
      product: pantsProduct,
      loading: false,
      error: null,
    });

    render(<CustomerProductDetails />);

    expect(screen.getByText(toFarsiDigits('W32/L34'))).toBeInTheDocument();
    expect(screen.getByText(toFarsiDigits('W30/L32'))).toBeInTheDocument();
    expect(screen.getByText(toFarsiDigits('W34/L32'))).toBeInTheDocument();

    const bodyText = document.body.textContent || '';
    expect(bodyText).not.toContain('32x34');
    expect(bodyText).not.toContain(toFarsiDigits('32x34'));
    expect(bodyText).not.toContain('30x32');
    expect(bodyText).not.toContain(toFarsiDigits('30x32'));
    expect(bodyText).not.toContain('34x32');
    expect(bodyText).not.toContain(toFarsiDigits('34x32'));
  });

  // T2 pants en: set mockLanguage = { ...mockLanguage, currentLocale: 'en', isRTL: false } before render;
  // expect getByText('W32/L34'), no '32x34' in body text.
  it('T2: renders pants sizes as W32/L34 in English locale', () => {
    const pantsProduct = {
      ...mockProduct,
      productInfos: [
        {
          id: 201,
          size: '32x34',
          sizeKind: 'PANTS',
          colors: [{ id: 1, name: 'Light Olive', hexCode: '#556b2f' }],
          images: ['/olive-1.jpg'],
        },
        {
          id: 202,
          size: '30x32',
          sizeKind: 'PANTS',
          colors: [{ id: 1, name: 'Light Olive', hexCode: '#556b2f' }],
          images: ['/olive-1.jpg'],
        },
        {
          id: 203,
          size: '34x32',
          sizeKind: 'PANTS',
          colors: [{ id: 1, name: 'Light Olive', hexCode: '#556b2f' }],
          images: ['/olive-1.jpg'],
        },
      ],
      sellerProducts: [
        {
          id: 301,
          productInfoId: 201,
          price: 14982500,
          discount: 0,
          stockQuantity: 1,
          seller: { id: 1, storeName: 'SaintBala Official', shippingFee: 0 },
        },
        {
          id: 302,
          productInfoId: 202,
          price: 14982500,
          discount: 0,
          stockQuantity: 4,
          seller: { id: 1, storeName: 'SaintBala Official', shippingFee: 0 },
        },
        {
          id: 303,
          productInfoId: 203,
          price: 15500000,
          discount: 10,
          stockQuantity: 2,
          seller: { id: 1, storeName: 'SaintBala Official', shippingFee: 0 },
        },
      ],
    };

    mockUseProductById.mockReturnValue({
      product: pantsProduct,
      loading: false,
      error: null,
    });

    mockLanguage = {
      ...mockLanguage,
      currentLocale: 'en',
      isRTL: false,
      formatNumber: (n: number | string) => String(n),
    };

    render(<CustomerProductDetails />);

    expect(screen.getByText('W32/L34')).toBeInTheDocument();
    expect(screen.getByText('W30/L32')).toBeInTheDocument();
    expect(screen.getByText('W34/L32')).toBeInTheDocument();

    const bodyText = document.body.textContent || '';
    expect(bodyText).not.toContain('32x34');
    expect(bodyText).not.toContain('30x32');
    expect(bodyText).not.toContain('34x32');
  });

  // T3 pants selection payload raw: (fa) click getByText(toFarsiDigits('W30/L32')),
  // click the add-to-cart button exactly as the existing test at ~277-300 does;
  // expect mockAddItem called with expect.objectContaining({ size: '30x32' }).
  it('T3: sends raw size code (30x32) in addItem payload when selecting formatted pants size', async () => {
    const pantsProduct = {
      ...mockProduct,
      productInfos: [
        {
          id: 201,
          size: '32x34',
          sizeKind: 'PANTS',
          colors: [{ id: 1, name: 'زیتونی روشن', hexCode: '#556b2f' }],
          images: ['/olive-1.jpg'],
        },
        {
          id: 202,
          size: '30x32',
          sizeKind: 'PANTS',
          colors: [{ id: 1, name: 'زیتونی روشن', hexCode: '#556b2f' }],
          images: ['/olive-1.jpg'],
        },
        {
          id: 203,
          size: '34x32',
          sizeKind: 'PANTS',
          colors: [{ id: 1, name: 'زیتونی روشن', hexCode: '#556b2f' }],
          images: ['/olive-1.jpg'],
        },
      ],
      sellerProducts: [
        {
          id: 301,
          productInfoId: 201,
          price: 14982500,
          discount: 0,
          stockQuantity: 1,
          seller: { id: 1, storeName: 'SaintBala Official', shippingFee: 0 },
        },
        {
          id: 302,
          productInfoId: 202,
          price: 14982500,
          discount: 0,
          stockQuantity: 4,
          seller: { id: 1, storeName: 'SaintBala Official', shippingFee: 0 },
        },
        {
          id: 303,
          productInfoId: 203,
          price: 15500000,
          discount: 10,
          stockQuantity: 2,
          seller: { id: 1, storeName: 'SaintBala Official', shippingFee: 0 },
        },
      ],
    };

    mockUseProductById.mockReturnValue({
      product: pantsProduct,
      loading: false,
      error: null,
    });

    render(<CustomerProductDetails />);

    // Select size 'W30/L32' (displayed as Persian digits)
    const sizeButton = screen.getByText(toFarsiDigits('W30/L32'));
    fireEvent.click(sizeButton);

    // Click Add to Cart
    const addToCartButton = screen.getByText('افزودن به سبد خرید');
    fireEvent.click(addToCartButton);

    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({
        productId: '101',
        productName: "Jordan Chicago Pants 'Light Olive Green'",
        size: '30x32', // Raw size code, not formatted
      })
    );

    await waitFor(() => {
      expect(screen.getByText('به سبد خرید افزوده شد')).toBeInTheDocument();
    });
  });

  // T4 apparel unchanged: the original mockProduct (M/S/L, sizeKind 'APPAREL' overridden from 'apparel')
  // -> getByText('S'), getByText('M') present; body text has no 'W' + digit label (/W\d/ not matched).
  it('T4: renders apparel sizes unchanged (S, M, L)', () => {
    const apparelProduct = {
      ...mockProduct,
      productInfos: [
        {
          id: 201,
          size: 'M',
          sizeKind: 'APPAREL',
          colors: [{ id: 1, name: 'زیتونی روشن', hexCode: '#556b2f' }],
          images: ['/olive-1.jpg'],
        },
        {
          id: 202,
          size: 'S',
          sizeKind: 'APPAREL',
          colors: [{ id: 1, name: 'زیتونی روشن', hexCode: '#556b2f' }],
          images: ['/olive-1.jpg'],
        },
        {
          id: 203,
          size: 'L',
          sizeKind: 'APPAREL',
          colors: [{ id: 1, name: 'زیتونی روشن', hexCode: '#556b2f' }],
          images: ['/olive-1.jpg'],
        },
      ],
      sellerProducts: [
        {
          id: 301,
          productInfoId: 201,
          price: 14982500,
          discount: 0,
          stockQuantity: 1,
          seller: { id: 1, storeName: 'SaintBala Official', shippingFee: 0 },
        },
        {
          id: 302,
          productInfoId: 202,
          price: 14982500,
          discount: 0,
          stockQuantity: 4,
          seller: { id: 1, storeName: 'SaintBala Official', shippingFee: 0 },
        },
        {
          id: 303,
          productInfoId: 203,
          price: 15500000,
          discount: 10,
          stockQuantity: 2,
          seller: { id: 1, storeName: 'SaintBala Official', shippingFee: 0 },
        },
      ],
    };

    mockUseProductById.mockReturnValue({
      product: apparelProduct,
      loading: false,
      error: null,
    });

    render(<CustomerProductDetails />);

    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('L')).toBeInTheDocument();

    const bodyText = document.body.textContent || '';
    expect(bodyText).not.toMatch(/W\d/);
  });

  // T5 footwear unchanged: sizes '42','43' sizeKind 'FOOTWEAR' (fa) ->
  // getByText(toFarsiDigits('42')) present; body text not matching /W[۰-۹0-9]/.
  it('T5: renders footwear sizes unchanged (42, 43) in Persian locale', () => {
    const footwearProduct = {
      ...mockProduct,
      productInfos: [
        {
          id: 201,
          size: '42',
          sizeKind: 'FOOTWEAR',
          colors: [{ id: 1, name: 'زیتونی روشن', hexCode: '#556b2f' }],
          images: ['/olive-1.jpg'],
        },
        {
          id: 202,
          size: '43',
          sizeKind: 'FOOTWEAR',
          colors: [{ id: 1, name: 'زیتونی روشن', hexCode: '#556b2f' }],
          images: ['/olive-1.jpg'],
        },
        {
          id: 203,
          size: '44',
          sizeKind: 'FOOTWEAR',
          colors: [{ id: 1, name: 'زیتونی روشن', hexCode: '#556b2f' }],
          images: ['/olive-1.jpg'],
        },
      ],
      sellerProducts: [
        {
          id: 301,
          productInfoId: 201,
          price: 14982500,
          discount: 0,
          stockQuantity: 1,
          seller: { id: 1, storeName: 'SaintBala Official', shippingFee: 0 },
        },
        {
          id: 302,
          productInfoId: 202,
          price: 14982500,
          discount: 0,
          stockQuantity: 4,
          seller: { id: 1, storeName: 'SaintBala Official', shippingFee: 0 },
        },
        {
          id: 303,
          productInfoId: 203,
          price: 15500000,
          discount: 10,
          stockQuantity: 2,
          seller: { id: 1, storeName: 'SaintBala Official', shippingFee: 0 },
        },
      ],
    };

    mockUseProductById.mockReturnValue({
      product: footwearProduct,
      loading: false,
      error: null,
    });

    render(<CustomerProductDetails />);

    expect(screen.getByText(toFarsiDigits('42'))).toBeInTheDocument();
    expect(screen.getByText(toFarsiDigits('43'))).toBeInTheDocument();
    expect(screen.getByText(toFarsiDigits('44'))).toBeInTheDocument();

    const bodyText = document.body.textContent || '';
    expect(bodyText).not.toMatch(/W[۰-۹0-9]/);
  });
});