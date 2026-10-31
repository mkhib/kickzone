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

describe('CustomerProductDetails Screen', () => {
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

  it('renders loading state properly', () => {
    mockUseProductById.mockReturnValue({
      product: null,
      loading: true,
      error: null,
    });

    render(<CustomerProductDetails />);
    expect(screen.getByTestId('customers-layout')).toBeInTheDocument();
  });

  it('renders not found state when product does not exist', () => {
    mockUseProductById.mockReturnValue({
      product: null,
      loading: false,
      error: new Error('Not found'),
    });

    render(<CustomerProductDetails />);
    expect(screen.getByText('محصول مورد نظر یافت نشد')).toBeInTheDocument();
    expect(screen.getByText('بازگشت به فروشگاه')).toBeInTheDocument();
  });

  it('renders product details faithfully to designs', () => {
    render(<CustomerProductDetails />);

    // Title & SKU
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: "Jordan Chicago Pants 'Light Olive Green'",
      })
    ).toBeInTheDocument();
    expect(screen.getByText('کد محصول: FD7212-340')).toBeInTheDocument();

    // Brand & Category
    expect(screen.getAllByText('Jordan').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('زنانه').length).toBeGreaterThanOrEqual(1);

    // Action buttons
    expect(screen.getByText('افزودن به سبد خرید')).toBeInTheDocument();
    expect(screen.queryByText('خرید فوری')).not.toBeInTheDocument();

    // Value propositions (Fast delivery removed, Authenticity and Exchange remain)
    expect(screen.getByText('اصالت کالا')).toBeInTheDocument();
    expect(screen.queryByText('ارسال سریع')).not.toBeInTheDocument();
    expect(screen.getByText('ضمانت تعویض ۷ روزه')).toBeInTheDocument();

    // Accordions (Shipping, exchange, and size guide removed)
    expect(screen.getByText('توضیحات')).toBeInTheDocument();
    expect(screen.getByText('جزئیات و جنس')).toBeInTheDocument();
    expect(screen.queryByText('راهنمای سایز')).not.toBeInTheDocument();
    expect(screen.queryByText('ارسال و شرایط تعویض')).not.toBeInTheDocument();
  });

  it('allows selecting sizes and calls addItem when Add to Cart is clicked', async () => {
    render(<CustomerProductDetails />);

    // Select size 'S'
    const sizeSButton = screen.getByText('S');
    fireEvent.click(sizeSButton);

    // Click Add to Cart
    const addToCartButton = screen.getByText('افزودن به سبد خرید');
    fireEvent.click(addToCartButton);

    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({
        productId: '101',
        productName: "Jordan Chicago Pants 'Light Olive Green'",
        size: 'S',
      })
    );

    // Temporary success text
    await waitFor(() => {
      expect(screen.getByText('به سبد خرید افزوده شد')).toBeInTheDocument();
    });
  });

  it('renders similar products section', () => {
    render(<CustomerProductDetails />);

    expect(screen.getByText('پیشنهادهای مشابه')).toBeInTheDocument();
    expect(screen.getByTestId('similar-card-999')).toBeInTheDocument();
  });

  it('manages Lightbox zoom and conditionally displays the reset button', async () => {
    render(<CustomerProductDetails />);

    // Open lightbox via main image zoom button
    const expandButton = screen.getByLabelText('zoom image');
    fireEvent.click(expandButton);

    // Lightbox modal should be open
    expect(screen.getByLabelText('بزرگ‌نمایی')).toBeInTheDocument();
    expect(screen.getByLabelText('کوچک‌نمایی')).toBeInTheDocument();
    expect(screen.getByLabelText('بستن')).toBeInTheDocument();

    // At 1x zoom, the Reset button must NOT be present
    expect(screen.queryByLabelText('اندازه اولیه')).not.toBeInTheDocument();

    // Click Zoom In
    const zoomInBtn = screen.getByLabelText('بزرگ‌نمایی');
    fireEvent.click(zoomInBtn);

    // Now zoom > 1, Reset button appears on the other side of the controls
    expect(screen.getByLabelText('اندازه اولیه')).toBeInTheDocument();

    // Click Reset button to return to 1x zoom
    const resetBtn = screen.getByLabelText('اندازه اولیه');
    fireEvent.click(resetBtn);

    // Reset button should disappear again
    expect(screen.queryByLabelText('اندازه اولیه')).not.toBeInTheDocument();

    // Close Lightbox
    const closeBtn = screen.getByLabelText('بستن');
    fireEvent.click(closeBtn);
  });

  it('renders customer reviews section with populated default reviews in Persian', () => {
    render(<CustomerProductDetails />);

    expect(screen.getByTestId('customer-reviews-section')).toBeInTheDocument();
    expect(
      screen.getByText('دیدگاه‌های خریداران و ارزیابی کیفیت')
    ).toBeInTheDocument();
    expect(screen.getByText('Kaveh R.')).toBeInTheDocument();
    expect(screen.getByText('Elena S.')).toBeInTheDocument();
    expect(screen.getAllByText('خریدار تأیید شده').length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText('Exceptional drape and heavyweight craftsmanship')
    ).toBeInTheDocument();
    expect(screen.getByTestId('write-review-btn')).toBeInTheDocument();
  });

  it('renders customer reviews in English when locale is en', () => {
    mockLanguage = {
      currentLocale: 'en',
      formatNumber: (n: number | string) => String(n),
      isRTL: false,
    };

    render(<CustomerProductDetails />);

    expect(
      screen.getByText('Customer Reviews & Verified Impressions')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Verified Buyer').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/True to Size/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId('write-review-btn')).toHaveTextContent('Write a Review');
  });

  it('renders high-trust empty state when product has zero reviews', () => {
    localStorage.setItem('saintbala_reviews_101', '[]');

    render(<CustomerProductDetails />);

    expect(screen.getByTestId('reviews-empty-state')).toBeInTheDocument();
    expect(
      screen.getByText('اولین نفری باشید که نظر خود را درباره این اثر ثبت می‌کند')
    ).toBeInTheDocument();
    expect(screen.getByTestId('write-review-empty-btn')).toBeInTheDocument();
  });

  it('allows customer to write and submit a review interactively', async () => {
    localStorage.setItem('saintbala_reviews_101', '[]');

    render(<CustomerProductDetails />);

    // In empty state, click "Write a Review" button
    const openBtn = screen.getByTestId('write-review-empty-btn');
    fireEvent.click(openBtn);

    // Form inputs should now be visible
    const authorInput = screen.getByTestId('review-author-input');
    const titleInput = screen.getByTestId('review-title-input');
    const commentInput = screen.getByTestId('review-comment-input');

    fireEvent.change(authorInput, { target: { value: 'Amir H.' } });
    fireEvent.change(titleInput, { target: { value: 'Masterpiece Streetwear' } });
    fireEvent.change(commentInput, {
      target: {
        value: 'The material thickness and precision of the stitching are peerless.',
      },
    });

    const submitBtn = screen.getByTestId('submit-review-btn');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Amir H.')).toBeInTheDocument();
      expect(screen.getByText('Masterpiece Streetwear')).toBeInTheDocument();
      expect(
        screen.getByText(
          'The material thickness and precision of the stitching are peerless.'
        )
      ).toBeInTheDocument();
      expect(screen.getByText('دیدگاه شما با موفقیت ثبت شد.')).toBeInTheDocument();
    });
  });

  it('allows user to click helpful button on a review', () => {
    render(<CustomerProductDetails />);

    const helpfulBtn = screen.getByTestId('helpful-btn-rev-101-1');
    expect(helpfulBtn).toHaveTextContent('مفید بود (۸)');

    fireEvent.click(helpfulBtn);
    expect(helpfulBtn).toHaveTextContent('مفید بود (۹)');

    // Clicking again should not increment further
    fireEvent.click(helpfulBtn);
    expect(helpfulBtn).toHaveTextContent('مفید بود (۹)');
  });
});

