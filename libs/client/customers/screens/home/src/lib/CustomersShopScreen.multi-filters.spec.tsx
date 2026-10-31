import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CustomersShopScreen, splitList, uniqueList } from './CustomersShopScreen';

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

const mockQueryData: { current: unknown } = { current: undefined };

vi.mock('@apollo/client/react', () => ({
  useQuery: () => ({ data: mockQueryData.current, loading: false }),
  useMutation: () => [
    vi.fn().mockResolvedValue({ data: { subscribeNewsletter: true } }),
    { loading: false },
  ],
}));

type ProductsArgs = {
  category?: string;
  categorySlugs?: string[];
  brand?: string;
  brands?: string[];
  onlyDiscounted?: boolean;
};

const slugs = [
  'women',
  'men',
  'hoodies',
  'pants',
  'sneakers',
  'sale',
  'caps',
  'bags',
  'socks',
  'jackets',
  'shorts',
  't-shirts',
];
const categoriesData = {
  categories: slugs.map((slug, i) => ({ id: i + 1, slug, name: `cat-${slug}` })),
  brands: [
    { id: 1, slug: 'nike', name: 'Nike', isActive: true },
    { id: 2, slug: 'jordan', name: 'Jordan', isActive: true },
  ],
};

const mainCall = () =>
  (mockUseProductsQuery.mock.calls as Array<[ProductsArgs]>)
    .map(([args]) => args)
    .filter((args) => !args.onlyDiscounted)
    .at(-1);

const setDiscounted = (hasDiscounted: boolean) => {
  mockUseProductsQuery.mockImplementation((args: ProductsArgs) => ({
    products: args.onlyDiscounted && hasDiscounted ? [{ id: 1 }] : [],
    loading: false,
    loadMore: vi.fn(),
    hasNextPage: false,
  }));
};

const renderAt = (url: string) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <CustomersShopScreen />
    </MemoryRouter>
  );

describe('CustomersShopScreen - multi-select filters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockQueryData.current = categoriesData;
    setDiscounted(true);
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it('splitList and uniqueList parse comma lists, lowercased and de-duplicated', () => {
    expect(splitList('Men, t-shirts,,MEN')).toEqual(['men', 't-shirts']);
    expect(splitList('')).toEqual([]);
    expect(uniqueList(['a', '', 'a', 'b'])).toEqual(['a', 'b']);
  });

  it('sends categorySlugs when several categories are selected', () => {
    renderAt('/shop?category=men,t-shirts');
    expect(mainCall()).toEqual(
      expect.objectContaining({
        categorySlugs: ['men', 't-shirts'],
        category: undefined,
      })
    );
  });

  it('keeps the single category filter for one category', () => {
    renderAt('/shop?category=men');
    expect(mainCall()).toEqual(
      expect.objectContaining({ category: 'men', categorySlugs: undefined })
    );
  });

  it('sends brands when several brands are selected', () => {
    renderAt('/shop?brands=nike,jordan');
    expect(mainCall()).toEqual(
      expect.objectContaining({ brands: ['nike', 'jordan'], brand: undefined })
    );
  });

  it('shows every category chip, including t-shirts beyond the old 10-chip cap', () => {
    renderAt('/shop');
    expect(screen.getByText('cat-t-shirts')).toBeInTheDocument();
    expect(screen.getByText('cat-shorts')).toBeInTheDocument();
  });

  it('marks every selected category chip as active', () => {
    renderAt('/shop?category=men,t-shirts');
    expect(screen.getByText('cat-men').closest('a')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('cat-t-shirts').closest('a')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('cat-women').closest('a')).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggling a chip adds or removes it from the category list in the link', () => {
    renderAt('/shop?category=men');
    const tshirtHref = screen.getByText('cat-t-shirts').closest('a')?.getAttribute('href') || '';
    expect(decodeURIComponent(tshirtHref)).toContain('category=men,t-shirts');
    const menHref = screen.getByText('cat-men').closest('a')?.getAttribute('href') || '';
    expect(menHref).not.toContain('category=');
  });

  it('hides the sale chip when no products are discounted', () => {
    setDiscounted(false);
    renderAt('/shop');
    expect(screen.queryByText('cat-sale')).not.toBeInTheDocument();
  });

  it('shows the sale chip when discounted products exist', () => {
    setDiscounted(true);
    renderAt('/shop');
    expect(screen.getByText('cat-sale')).toBeInTheDocument();
  });
});
