import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CustomersShopScreen } from './CustomersShopScreen';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

const mockAddItem = vi.fn();
const mockUseProductsQuery = vi.fn();

vi.mock('@kickzone-workspace/customers-cart-hook', () => ({
  useCustomersCartService: () => ({
    addItem: mockAddItem,
  }),
  useWishlistSync: vi.fn(),
}));

vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbar: () => ({
    handleClose: vi.fn(),
    open: false,
    message: '',
    severity: 'info',
    progress: 0,
  }),
}));

vi.mock('@kickzone-workspace/customers-auth-context', () => ({
  useCustomersAuth: () => ({
    user: null,
    loading: false,
    logout: vi.fn(),
  }),
}));

vi.mock('@kickzone-workspace/shared-ui-store', () => ({
  useUIStore: (selector: (s: { theme: { mode: string }; toggleTheme: () => void }) => unknown) =>
    selector({ theme: { mode: 'light' }, toggleTheme: vi.fn() }),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  SITE_NAME: 'SAINTBALA',
  useI18nContext: () => ({
    LL: {
      appNames: {
        siteName: () => 'SAINTBALA',
      },
      navigation: {
        home: () => 'خانه',
        shoppingCart: () => 'سبد خرید',
        profile: () => 'حساب کاربری',
      },
      orders: {
        myOrders: () => 'سفارش‌های من',
      },
      button: {
        login: () => 'ورود',
        logout: () => 'خروج',
      },
      home: {
        nav: {
          newArrivals: () => 'تازه‌ها',
          women: () => 'زنانه',
          men: () => 'مردانه',
          brands: () => 'برندها',
          mainAria: () => 'منوی اصلی',
        },
        searchPlaceholder: () => 'جستجوی پوشاک و محصولات...',
        hero: {
          collection: () => 'کلکسیون پاییز ۱۴۰۵',
          slogan: () => 'اصل باش. اصل بپوش.',
          sloganLine1: () => 'اصل باش.',
          sloganLine2: () => 'اصل بپوش.',
          subtitle: () => 'پوشاک ورزشی اورجینال — برای بانوان و آقایان.',
          shopWomen: () => 'خرید زنانه',
          shopMen: () => 'خرید مردانه',
          women: () => 'زنانه',
          men: () => 'مردانه',
          womenAndMen: () => 'زنانه و مردانه',
          ariaLabel: () => 'کلکسیون پاییز ۱۴۰۵',
        },
        newArrivals: {
          kicker: () => 'تازه‌های فروشگاه',
          title: () => 'تازه رسیده‌ها',
          all: () => 'همه',
          women: () => 'زنانه',
          men: () => 'مردانه',
          viewAll: () => 'مشاهده‌ی همه',
          filterAria: () => 'فیلتر جنسیت تازه‌ها',
        },
        categories: {
          kicker: () => 'دسته‌بندی‌ها',
          title: () => 'از کجا شروع کنیم؟',
          women: () => 'زنانه',
          men: () => 'مردانه',
          hoodies: () => 'هودی',
          pants: () => 'شلوار',
          jordan: () => 'جردن',
          jordanTagline: () => 'میراث جامپمن، برای هر دو.',
          productCount: ({ count }: { count: string }) => `${count} محصول`,
        },
        brands: {
          kicker: () => 'برندها',
          title: () => 'برندهایی که می‌آوریم.',
          allProducts: ({ brand }: { brand: string }) => `همه‌ی محصولات ${brand}`,
          lineNike: () => 'از تک‌فلیس تا سووش؛ کلاسیک‌هایی که هر روز پوشیده می‌شوند.',
          lineJordan: () => 'میراث جامپمن، از زمین بسکتبال تا خیابان.',
          lineAdidas: () => 'سه خط، یک امضا؛ ساده و ماندگار.',
        },
        picks: {
          kicker: () => 'گزیده',
          title: () => 'انتخاب‌های SAINTBALA',
          prev: () => 'قبلی',
          next: () => 'بعدی',
        },
        trust: {
          ariaLabel: () => 'مزایای خرید از SAINTBALA',
          authenticityTitle: () => 'اصالت کالا',
          authenticityLine: () => '۱۰۰٪ اورجینال',
          paymentTitle: () => 'پرداخت امن',
          paymentLine: () => 'پرداخت آنلاین با زرین‌پال',
        },
        newsletter: {
          kicker: () => 'خبرنامه',
          title: () => 'اولین نفر باش.',
          subtitle: () => 'از رسیدن محصولات تازه باخبر شو.',
          emailLabel: () => 'ایمیل',
          emailPlaceholder: () => 'ایمیل شما',
          subscribe: () => 'عضویت',
          success: () => 'ممنون! ایمیلت ثبت شد.',
          error: () => 'خطایی رخ داد. لطفاً دوباره تلاش کنید.',
        },
        shop: {
          kicker: () => 'فروشگاه SAINTBALA',
          allProducts: () => 'تمامی محصولات',
          productsInCategory: ({ category }: { category: string }) =>
            `محصولات ${category}`,
          productsByBrand: ({ brand }: { brand: string }) =>
            `محصولات ${brand}`,
          searchPlaceholder: () => 'جستجوی مدل یا کد محصول...',
          brandLabel: () => 'برند',
          allBrands: () => 'همه برندها',
          sortLabel: () => 'مرتب‌سازی',
          newest: () => 'جدیدترین',
          cheapest: () => 'ارزان‌ترین',
          mostExpensive: () => 'گران‌ترین',
          allCategories: () => 'همه',
          clearFilters: () => 'پاک کردن فیلترها',
          noProducts: () => 'محصولی یافت نشد.',
        },
        footer: {
          tagline: () => 'پوشاک ورزشی اورجینال برای بانوان و آقایان.',
          store: () => 'فروشگاه',
          brands: () => 'برندها',
          guide: () => 'راهنما',
          account: () => 'حساب',
          newArrivals: () => 'تازه‌ها',
          women: () => 'زنانه',
          men: () => 'مردانه',
          hoodies: () => 'هودی',
          pants: () => 'شلوار',
          authenticity: () => 'اصالت کالا',
          sizeGuide: () => 'راهنمای سایز',
          payment: () => 'پرداخت با زرین‌پال',
          loginWithEmail: () => 'ورود با ایمیل',
          cart: () => 'سبد خرید',
          favorites: () => 'علاقه‌مندی‌ها',
          copyright: ({ year }: { year: string }) => `© ${year} SAINTBALA`,
          paymentOnline: () => 'پرداخت آنلاین با زرین‌پال',
        },
        currency: {
          toman: () => 'تومان',
        },
      },
    },
  }),
  useLanguageContext: () => ({
    currentLocale: 'fa',
    formatNumber: (n: number | string) => String(n),
    isRTL: true,
  }),
  usePageTitle: vi.fn(),
}));

vi.mock('@kickzone-workspace/products-hook', () => ({
  useProductsQuery: (args: unknown) => mockUseProductsQuery(args),
}));

vi.mock('@apollo/client/react', () => ({
  useQuery: () => ({ data: undefined, loading: false }),
  useMutation: () => [
    vi.fn().mockResolvedValue({ data: { subscribeNewsletter: true } }),
    { loading: false },
  ],
}));

const createMockProduct = (
  id: number,
  sku: string,
  name: string,
  category: 'women' | 'men' | 'hoodies' | 'pants' = 'men'
): KickzoneGraphqlTypes.Product =>
  ({
    id,
    sku,
    name,
    archived: false,
    categories: [
      {
        id: category === 'women' ? 1 : category === 'men' ? 2 : 3,
        slug: category,
        name:
          category === 'women'
            ? 'زنانه'
            : category === 'men'
            ? 'مردانه'
            : category,
      },
    ],
    productInfos: [
      {
        id: id * 10,
        size: 'L',
        sizeKind: 'ALPHA',
        images: ['/images/sample.jpg'],
        colors: [{ id: 1, name: 'مشکی', hexCode: '#000000' }],
      },
    ],
    sellerProducts: [
      {
        id: id * 100,
        productInfoId: id * 10,
        price: 100,
        discount: 0,
        stockQuantity: 5,
        seller: { id: 1, shippingFee: 0 },
      },
    ],
  } as unknown as KickzoneGraphqlTypes.Product);

describe('CustomersShopScreen - cart size handling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseProductsQuery.mockReturnValue({
      products: [],
      loading: false,
      loadMore: vi.fn(),
      hasNextPage: false,
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => {
        const listeners = new Set<(e: MediaQueryListEvent) => void>();
        return {
          matches: false,
          media: query,
          onchange: null,
          addListener: (cb: (e: MediaQueryListEvent) => void) =>
            listeners.add(cb),
          removeListener: (cb: (e: MediaQueryListEvent) => void) =>
            listeners.delete(cb),
          addEventListener: (
            _type: string,
            cb: (e: MediaQueryListEvent) => void
          ) => listeners.add(cb),
          removeEventListener: (
            _type: string,
            cb: (e: MediaQueryListEvent) => void
          ) => listeners.delete(cb),
          dispatchEvent: vi.fn(),
        };
      }),
    });
  });

  const CART_BUTTON_LABEL = 'افزودن به سبد';

  it('T1: empty size string -> addItem called with size: null, never size: "L"', () => {
    const product = createMockProduct(1, 'SKU-1', 'Test Pants', 'men');
    product.productInfos = [
      {
        ...product.productInfos![0],
        size: '',
      },
    ];
    mockUseProductsQuery.mockReturnValue({
      products: [product],
      loading: false,
      loadMore: vi.fn(),
      hasNextPage: false,
    });

    render(
      <MemoryRouter initialEntries={['/shop']}>
        <CustomersShopScreen />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole('button', { name: CART_BUTTON_LABEL });
    fireEvent.click(buttons[0]);

    expect(mockAddItem).toHaveBeenCalledTimes(1);
    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({ size: null })
    );
    expect(mockAddItem).not.toHaveBeenCalledWith(
      expect.objectContaining({ size: 'L' })
    );
  });

  it('T2: pants size "32x34" -> addItem called with size: "32x34"', () => {
    const product = createMockProduct(1, 'SKU-1', 'Test Pants', 'men');
    product.productInfos = [
      {
        ...product.productInfos![0],
        size: '32x34',
        sizeKind: 'PANTS',
      },
    ];
    mockUseProductsQuery.mockReturnValue({
      products: [product],
      loading: false,
      loadMore: vi.fn(),
      hasNextPage: false,
    });

    render(
      <MemoryRouter initialEntries={['/shop']}>
        <CustomersShopScreen />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole('button', { name: CART_BUTTON_LABEL });
    fireEvent.click(buttons[0]);

    expect(mockAddItem).toHaveBeenCalledTimes(1);
    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({ size: '32x34' })
    );
  });

  it('T3: footwear size "42" -> addItem called with size: "42"', () => {
    const product = createMockProduct(1, 'SKU-1', 'Test Sneakers', 'men');
    product.productInfos = [
      {
        ...product.productInfos![0],
        size: '42',
        sizeKind: 'NUMERIC',
      },
    ];
    mockUseProductsQuery.mockReturnValue({
      products: [product],
      loading: false,
      loadMore: vi.fn(),
      hasNextPage: false,
    });

    render(
      <MemoryRouter initialEntries={['/shop']}>
        <CustomersShopScreen />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole('button', { name: CART_BUTTON_LABEL });
    fireEvent.click(buttons[0]);

    expect(mockAddItem).toHaveBeenCalledTimes(1);
    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({ size: '42' })
    );
  });

  it('T4: apparel size "M" -> addItem called with size: "M"', () => {
    const product = createMockProduct(1, 'SKU-1', 'Test Hoodie', 'men');
    product.productInfos = [
      {
        ...product.productInfos![0],
        size: 'M',
        sizeKind: 'ALPHA',
      },
    ];
    mockUseProductsQuery.mockReturnValue({
      products: [product],
      loading: false,
      loadMore: vi.fn(),
      hasNextPage: false,
    });

    render(
      <MemoryRouter initialEntries={['/shop']}>
        <CustomersShopScreen />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole('button', { name: CART_BUTTON_LABEL });
    fireEvent.click(buttons[0]);

    expect(mockAddItem).toHaveBeenCalledTimes(1);
    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({ size: 'M' })
    );
  });
});