import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CustomersHome } from './CustomersHomeScreen';
import { CustomersShopScreen } from './CustomersShopScreen';
import { HomePageData, selectHomePageData } from './home-selectors';
import { NewArrivalsSection } from './components/NewArrivalsSection';

const mockAddItem = vi.fn();
const mockUseProductsQuery = vi.fn();

vi.mock('@kickzone-workspace/customers-cart-hook', () => ({
  useCustomersCartService: () => ({
    addItem: mockAddItem,
  }),
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
) => ({
  id,
  sku,
  name,
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
});

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

describe('CustomersHomeScreen - Campaign v4', () => {
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

  it('renders all primary sections of the Campaign v4 design', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CustomersHome initialData={mockHomePageData} />
      </MemoryRouter>
    );

    expect(screen.getByText('Rise Above')).toBeInTheDocument();
    expect(screen.getByText('۱۰۰٪ اورجینال')).toBeInTheDocument();
    expect(screen.queryByText('ضمانت تعویض ۷ روزه')).not.toBeInTheDocument();
    expect(
      screen.getAllByText('پرداخت آنلاین با زرین‌پال').length
    ).toBeGreaterThanOrEqual(1);

    expect(screen.getByText('دسته‌بندی‌ها')).toBeInTheDocument();
    expect(screen.queryByText('جردن قرمز')).not.toBeInTheDocument();
    expect(screen.getByText('انتخاب‌های SAINTBALA')).toBeInTheDocument();
    expect(screen.getByText('پرداخت امن')).toBeInTheDocument();
  });

  it('strictly contains no forbidden claims or terms', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <CustomersHome initialData={mockHomePageData} />
      </MemoryRouter>
    );

    const forbiddenWords = [
      'ارسال رایگان',
      'تحویل',
      'پرفروش',
      'تخفیف',
      'کفش',
      'ست‌ها',
      'ضمانت تعویض ۷ روزه',
      'سه نام، یک قول',
    ];
    const pageText = container.textContent || '';

    forbiddenWords.forEach((word) => {
      expect(pageText).not.toContain(word);
    });
  });

  it('filters new arrivals when tabs are clicked', async () => {
    const pageData = selectHomePageData(mockHomePageData);
    render(
      <MemoryRouter initialEntries={['/']}>
        <NewArrivalsSection
          products={pageData.newArrivals}
          exchangeRate={pageData.exchangeRate}
        />
      </MemoryRouter>
    );

    const allTab = screen.getByRole('tab', { name: 'همه' });
    const womenTab = screen.getByRole('tab', { name: 'زنانه' });
    const menTab = screen.getByRole('tab', { name: 'مردانه' });

    expect(allTab).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(womenTab);
    expect(womenTab).toHaveAttribute('aria-selected', 'true');
    expect(allTab).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(menTab);
    expect(menTab).toHaveAttribute('aria-selected', 'true');
  });

  it('passes category filter to the products query on /shop', () => {
    render(
      <MemoryRouter initialEntries={['/shop?category=women']}>
        <CustomersShopScreen />
      </MemoryRouter>
    );

    expect(mockUseProductsQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        category: 'women',
        onlyInStock: true,
        onlyWithSellers: true,
        sort: 'ID_DESC',
      })
    );
    expect(screen.getByRole('heading', { name: /محصولات زنانه/ })).toBeInTheDocument();
    expect(screen.queryByText('فروشگاه SAINTBALA')).not.toBeInTheDocument();
  });
});
