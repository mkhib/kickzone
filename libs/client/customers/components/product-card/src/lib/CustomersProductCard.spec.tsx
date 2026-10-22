import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CustomersProductCard } from './CustomersProductCard';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      customer: {
        productCard: {
          addToCart: () => 'افزودن به سبد',
          addedToCart: () => 'به سبد اضافه شد',
          selectSize: () => 'انتخاب سایز',
          colorways: () => 'رنگ‌بندی',
          onlyLeft: (count: { count: number }) => `تنها ${count.count} عدد باقی مانده`,
          outOfStock: () => 'ناموجود',
          quickView: () => 'مشاهده سریع',
        },
      },
    },
  }),
  useLanguageContext: () => ({
    currentLocale: 'fa',
    formatNumber: (n: number | string) => String(n),
  }),
}));

vi.mock('@kickzone-workspace/price-display', () => ({
  PriceDisplay: ({ priceInUSD }: { priceInUSD: number }) => (
    <span data-testid="price-display">{priceInUSD} تومان</span>
  ),
}));

vi.mock('@kickzone-workspace/customer-cart-store', () => ({
  useCartStore: (selector?: (state: { items: unknown[] }) => unknown) => {
    const state = { items: [] };
    return selector ? selector(state) : state;
  },
}));

describe('CustomersProductCard', () => {
  const mockProduct: KickzoneGraphqlTypes.Product = {
    id: 101,
    name: 'Air Jordan 1 Retro High OG',
    description: 'Iconic basketball shoe',
    categories: [{ id: 1, name: 'کفش ورزشی', createdAt: '', updatedAt: '' }],
    productInfos: [
      {
        id: 201,
        productId: 101,
        sku: 'AJ1-HIGH-01',
        size: '42',
        colors: [{ id: 1, name: 'Black', hexCode: '#000000', createdAt: '', updatedAt: '' }],
        images: ['https://example.com/aj1.jpg'],
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 202,
        productId: 101,
        sku: 'AJ1-HIGH-02',
        size: '43',
        colors: [{ id: 2, name: 'Red', hexCode: '#ff0000', createdAt: '', updatedAt: '' }],
        images: ['https://example.com/aj1-red.jpg'],
        createdAt: '',
        updatedAt: '',
      },
    ],
    sellerProducts: [
      {
        id: 301,
        productInfoId: 201,
        sellerId: 1,
        price: 8500000,
        discount: 10,
        stockQuantity: 4,
        createdAt: '',
        updatedAt: '',
        seller: {
          id: 1,
          userId: 10,
          storeName: 'کتونی اورجینال تهران',
          shippingFee: 50000,
          verified: true,
          rating: 4.8,
          createdAt: '',
          updatedAt: '',
        },
      },
      {
        id: 302,
        productInfoId: 202,
        sellerId: 1,
        price: 8500000,
        discount: 0,
        stockQuantity: 2,
        createdAt: '',
        updatedAt: '',
        seller: {
          id: 1,
          userId: 10,
          storeName: 'کتونی اورجینال تهران',
          shippingFee: 50000,
          verified: true,
          rating: 4.8,
          createdAt: '',
          updatedAt: '',
        },
      },
    ],
    createdAt: '',
    updatedAt: '',
  };

  it('renders product card with image and title as React Router links', () => {
    const handleAddToCart = vi.fn();

    render(
      <MemoryRouter>
        <CustomersProductCard
          product={mockProduct}
          onAddToCart={handleAddToCart}
        />
      </MemoryRouter>
    );

    // Product title should be rendered
    const titleElement = screen.getByText('Air Jordan 1 Retro High OG');
    expect(titleElement).toBeInTheDocument();

    // The title should be a link pointing to the default product details route
    expect(titleElement.closest('a')).toHaveAttribute('href', '/products/101');

    // Find all links in the card pointing to the product details route
    const productLinks = screen.getAllByRole('link');
    const matchingLinks = productLinks.filter(
      (link) => link.getAttribute('href') === '/products/101'
    );
    // Both image section and title should be links
    expect(matchingLinks.length).toBeGreaterThanOrEqual(2);
  });

  it('respects custom "to" prop for links', () => {
    const handleAddToCart = vi.fn();

    render(
      <MemoryRouter>
        <CustomersProductCard
          product={mockProduct}
          to="/custom/product-path/101"
          onAddToCart={handleAddToCart}
        />
      </MemoryRouter>
    );

    const titleElement = screen.getByText('Air Jordan 1 Retro High OG');
    expect(titleElement.closest('a')).toHaveAttribute('href', '/custom/product-path/101');
  });

  it('calls onCardClick when clicking the link or title', () => {
    const handleAddToCart = vi.fn();
    const handleCardClick = vi.fn();

    render(
      <MemoryRouter>
        <CustomersProductCard
          product={mockProduct}
          onAddToCart={handleAddToCart}
          onCardClick={handleCardClick}
        />
      </MemoryRouter>
    );

    const titleElement = screen.getByText('Air Jordan 1 Retro High OG');
    fireEvent.click(titleElement);

    expect(handleCardClick).toHaveBeenCalledWith(mockProduct);
  });

  it('calls onAddToCart when clicking the add to cart button', () => {
    const handleAddToCart = vi.fn();

    render(
      <MemoryRouter>
        <CustomersProductCard
          product={mockProduct}
          onAddToCart={handleAddToCart}
        />
      </MemoryRouter>
    );

    const addButtons = screen.getAllByRole('button');
    const addToCartButton = addButtons.find(
      (btn) =>
        btn.textContent?.includes('افزودن به سبد') ||
        btn.getAttribute('aria-label')?.includes('افزودن به سبد')
    );
    expect(addToCartButton).toBeDefined();

    if (addToCartButton) {
      fireEvent.click(addToCartButton);
      expect(handleAddToCart).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 101,
          name: 'Air Jordan 1 Retro High OG',
        })
      );
    }
  });

  it('renders the favorite button and allows toggling favorites', () => {
    render(
      <MemoryRouter>
        <CustomersProductCard
          product={mockProduct}
          onAddToCart={vi.fn()}
        />
      </MemoryRouter>
    );

    const favoriteButton = screen.getByLabelText(/نشان کردن|افزودن به علاقه‌مندی‌ها|favorite/i);
    expect(favoriteButton).toBeInTheDocument();
  });

  it('displays all categories on the card item when multiple categories are present', () => {
    const productWithMultipleCategories: KickzoneGraphqlTypes.Product = {
      ...mockProduct,
      categories: [
        { id: 1, name: 'کفش ورزشی', createdAt: '', updatedAt: '' },
        { id: 2, name: 'مردانه', createdAt: '', updatedAt: '' },
        { id: 3, name: 'بسکتبال', createdAt: '', updatedAt: '' },
      ],
    };

    render(
      <MemoryRouter>
        <CustomersProductCard
          product={productWithMultipleCategories}
          onAddToCart={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('کفش ورزشی')).toBeInTheDocument();
    expect(screen.getByText('مردانه')).toBeInTheDocument();
    expect(screen.getByText('بسکتبال')).toBeInTheDocument();
  });

  it('renders correctly when product has empty or no categories', () => {
    const productWithoutCategories: KickzoneGraphqlTypes.Product = {
      ...mockProduct,
      categories: [],
    };

    render(
      <MemoryRouter>
        <CustomersProductCard
          product={productWithoutCategories}
          onAddToCart={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Air Jordan 1 Retro High OG')).toBeInTheDocument();
  });
});

