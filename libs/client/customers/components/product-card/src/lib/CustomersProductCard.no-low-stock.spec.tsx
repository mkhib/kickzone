import React from 'react';
import { render, screen } from '@testing-library/react';
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

const product: KickzoneGraphqlTypes.Product = {
  id: 101,
  name: 'Air Jordan 1 Retro High OG',
  description: 'Iconic basketball shoe',
  categories: [{ id: 1, name: 'Shoes', createdAt: '', updatedAt: '' }],
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
  ],
  sellerProducts: [
    {
      id: 301,
      productInfoId: 201,
      sellerId: 1,
      price: 8500000,
      discount: 0,
      stockQuantity: 1,
      createdAt: '',
      updatedAt: '',
      seller: {
        id: 1,
        userId: 10,
        storeName: 'Store',
        shippingFee: 0,
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

describe('CustomersProductCard - no low-stock text', () => {
  it('does not render any low-stock text when only one item is in stock', () => {
    render(
      <MemoryRouter>
        <CustomersProductCard product={product} onAddToCart={vi.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText('Air Jordan 1 Retro High OG')).toBeInTheDocument();
    expect(screen.queryByText(/باقی مانده/)).not.toBeInTheDocument();
    expect(screen.queryByText(/left in stock/i)).not.toBeInTheDocument();
  });
});
