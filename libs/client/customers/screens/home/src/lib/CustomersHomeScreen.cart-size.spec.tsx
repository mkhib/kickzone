import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CustomersHome } from './CustomersHomeScreen';
import { HomePageData, selectHomePageData } from './home-selectors';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { PicksRailSection } from './components/PicksRailSection';

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

const mockHomePageData: HomePageData = {
  rate: { rate: 270000 },
  categories: [
    { id: 1, slug: 'women', name: 'زنانه' },
    { id: 2, slug: 'men', name: 'مردانه' },
    { id: 3, slug: 'hoodies', name: 'هودی' },
    { id: 4, slug: 'pants', name: 'شلوار' },
  ],
  all: {
    totalCount: 20,
    edges: [
      {
        node: createMockProduct(
          26,
          'DX2324-531',
          'Nike Sportswear Tech Fleece Women Hoodie',
          'women'
        ),
      },
      {
        node: createMockProduct(
          91,
          'FV7247-010',
          'Jordan Flight Heritage Men Sweatshirt',
          'men'
        ),
      },
      {
        node: createMockProduct(
          77,
          'HV0959-020',
          'Nike Solo Swoosh Men Pants',
          'men'
        ),
      },
      {
        node: createMockProduct(
          92,
          'FZ1919-366',
          'Jordan Stadium 90 Jacket',
          'men'
        ),
      },
      {
        node: createMockProduct(
          50,
          'DX0397-277',
          'Nike Sportswear Phoenix Fleece',
          'women'
        ),
      },
      {
        node: createMockProduct(
          51,
          'IF2934-010',
          'Adidas Adicolor Classics Pants',
          'men'
        ),
      },
      {
        node: createMockProduct(
          52,
          'DM3330-646',
          'Nike Club Fleece Hoodie',
          'hoodies'
        ),
      },
      {
        node: createMockProduct(
          53,
          'FD7212-340',
          'Nike Tech Woven Pants',
          'pants'
        ),
      },
      {
        node: createMockProduct(
          60,
          'FB8008-063',
          'Nike Tech Fleece Bomber Jacket',
          'men'
        ),
      },
      {
        node: createMockProduct(61, 'BV0507-100', 'Nike Air Max T-Shirt', 'men'),
      },
      {
        node: createMockProduct(
          70,
          'DQ7544-662',
          'Jordan Flight Heritage Hoodie',
          'men'
        ),
      },
      {
        node: createMockProduct(71, 'CJ0921-011', 'Jordan Jumpman Pants', 'men'),
      },
      {
        node: createMockProduct(72, 'DA9854-091', 'Jordan Flight Fleece', 'men'),
      },
      {
        node: createMockProduct(
          81,
          'FL0147',
          'Adidas Originals Sweater',
          'women'
        ),
      },
      {
        node: createMockProduct(
          101,
          'DD5094-133',
          'Nike Air Zoom Pegasus',
          'women'
        ),
      },
      {
        node: createMockProduct(
          102,
          'DC5276-596',
          'Nike Dri-FIT Run Division',
          'women'
        ),
      },
      {
        node: createMockProduct(
          103,
          'CZ8528-397',
          'Jordan Essentials Statement',
          'men'
        ),
      },
    ],
  },
};

function withSize(s: string) {
  return {
    ...mockHomePageData,
    all: {
      ...mockHomePageData.all,
      edges: mockHomePageData.all.edges.map((e) => ({
        node: {
          ...e.node,
          productInfos: e.node.productInfos && e.node.productInfos.length > 0
            ? [{ ...e.node.productInfos[0], size: s }]
            : [{ size: s }],
        } as KickzoneGraphqlTypes.Product,
      })),
    },
  };
}

describe('CustomersHomeScreen - Cart size behavior (P5e3a)', () => {
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

  it('T1 empty size "" -> every addItem call has size === null, never "L"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CustomersHome initialData={withSize('')} />
      </MemoryRouter>
    );

    const rail = screen.getByTestId('picks-rail');
    const buttons = within(rail).getAllByRole('button', { name: CART_BUTTON_LABEL });
    fireEvent.click(buttons[0]);

    const calls = mockAddItem.mock.calls;
    expect(calls.length).toBeGreaterThanOrEqual(1);
    calls.forEach((call) => {
      const arg = call[0];
      expect(arg.size).toBeNull();
      expect(arg.size).not.toBe('L');
    });
  });

  it('T2 pants "32x34" -> every addItem call has size: "32x34"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CustomersHome initialData={withSize('32x34')} />
      </MemoryRouter>
    );

    const rail = screen.getByTestId('picks-rail');
    const buttons = within(rail).getAllByRole('button', { name: CART_BUTTON_LABEL });
    fireEvent.click(buttons[0]);

    const calls = mockAddItem.mock.calls;
    expect(calls.length).toBeGreaterThanOrEqual(1);
    calls.forEach((call) => {
      const arg = call[0];
      expect(arg.size).toBe('32x34');
    });
  });

  it('T3 footwear "42" -> every addItem call has size: "42"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CustomersHome initialData={withSize('42')} />
      </MemoryRouter>
    );

    const rail = screen.getByTestId('picks-rail');
    const buttons = within(rail).getAllByRole('button', { name: CART_BUTTON_LABEL });
    fireEvent.click(buttons[0]);

    const calls = mockAddItem.mock.calls;
    expect(calls.length).toBeGreaterThanOrEqual(1);
    calls.forEach((call) => {
      const arg = call[0];
      expect(arg.size).toBe('42');
    });
  });

  it('T4 apparel "M" -> every addItem call has size: "M" (not "L")', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CustomersHome initialData={withSize('M')} />
      </MemoryRouter>
    );

    const rail = screen.getByTestId('picks-rail');
    const buttons = within(rail).getAllByRole('button', { name: CART_BUTTON_LABEL });
    fireEvent.click(buttons[0]);

    const calls = mockAddItem.mock.calls;
    expect(calls.length).toBeGreaterThanOrEqual(1);
    calls.forEach((call) => {
      const arg = call[0];
      expect(arg.size).toBe('M');
      expect(arg.size).not.toBe('L');
    });
  });

  it('T5 rail only: PicksRailSection with empty size -> onAddItem called, second arg is undefined, never "L"', () => {
    const pageData = selectHomePageData(withSize(''));
    const mockOnAddItem = vi.fn();

    render(
      <MemoryRouter initialEntries={['/']}>
        <PicksRailSection
          products={pageData.picks}
          exchangeRate={pageData.exchangeRate}
          onAddItem={mockOnAddItem}
        />
      </MemoryRouter>
    );

    const rail = screen.getByTestId('picks-rail');
    const buttons = within(rail).getAllByRole('button', { name: CART_BUTTON_LABEL });
    fireEvent.click(buttons[0]);

    const calls = mockOnAddItem.mock.calls;
    expect(calls.length).toBeGreaterThanOrEqual(1);
    calls.forEach((call) => {
      const sizeArg = call[1];
      expect(sizeArg).toBeUndefined();
      expect(sizeArg).not.toBe('L');
    });
  });
});