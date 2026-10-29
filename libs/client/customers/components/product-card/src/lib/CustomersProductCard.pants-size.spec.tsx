import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CustomersProductCard, toFarsiDigits } from './CustomersProductCard';
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

const baseProduct: KickzoneGraphqlTypes.Product = {
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

const txt = () => document.body.textContent ?? '';

describe('CustomersProductCard - pants size display', () => {
  it('T1: pants sizeKind shows W32/L34 format (fa locale)', () => {
    const pantsProduct: KickzoneGraphqlTypes.Product = {
      ...baseProduct,
      productInfos: [
        {
          ...baseProduct.productInfos[0],
          id: 201,
          size: '32x34',
          sizeKind: 'PANTS',
        },
        {
          ...baseProduct.productInfos[1],
          id: 202,
          size: '30x32',
          sizeKind: 'PANTS',
        },
      ],
      sellerProducts: [
        {
          ...baseProduct.sellerProducts[0],
          id: 301,
          productInfoId: 201,
        },
        {
          ...baseProduct.sellerProducts[1],
          id: 302,
          productInfoId: 202,
        },
      ],
    } as unknown as KickzoneGraphqlTypes.Product;

    render(
      <MemoryRouter>
        <CustomersProductCard product={pantsProduct} onAddToCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getAllByText(toFarsiDigits('W32/L34')).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(toFarsiDigits('W30/L32')).length).toBeGreaterThanOrEqual(1);
    expect(txt()).not.toContain('32x34');
    expect(txt()).not.toContain(toFarsiDigits('32x34'));
    expect(txt()).not.toContain('30x32');
    expect(txt()).not.toContain(toFarsiDigits('30x32'));
  });

  it('T2: footwear sizeKind unchanged (fa locale)', () => {
    const footwearProduct: KickzoneGraphqlTypes.Product = {
      ...baseProduct,
      productInfos: [
        {
          ...baseProduct.productInfos[0],
          id: 201,
          size: '42',
          sizeKind: 'FOOTWEAR',
        },
        {
          ...baseProduct.productInfos[1],
          id: 202,
          size: '43',
          sizeKind: 'FOOTWEAR',
        },
      ],
      sellerProducts: [
        {
          ...baseProduct.sellerProducts[0],
          id: 301,
          productInfoId: 201,
        },
        {
          ...baseProduct.sellerProducts[1],
          id: 302,
          productInfoId: 202,
        },
      ],
    } as unknown as KickzoneGraphqlTypes.Product;

    render(
      <MemoryRouter>
        <CustomersProductCard product={footwearProduct} onAddToCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getAllByText(toFarsiDigits('42')).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(toFarsiDigits('43')).length).toBeGreaterThanOrEqual(1);
    expect(txt()).not.toContain('W' + toFarsiDigits('42'));
    expect(txt()).not.toContain('W۴۲');
  });

  it('T3: apparel sizeKind unchanged (fa locale)', () => {
    const apparelProduct: KickzoneGraphqlTypes.Product = {
      ...baseProduct,
      productInfos: [
        {
          ...baseProduct.productInfos[0],
          id: 201,
          size: 'M',
          sizeKind: 'APPAREL',
        },
        {
          ...baseProduct.productInfos[1],
          id: 202,
          size: 'L',
          sizeKind: 'APPAREL',
        },
      ],
      sellerProducts: [
        {
          ...baseProduct.sellerProducts[0],
          id: 301,
          productInfoId: 201,
        },
        {
          ...baseProduct.sellerProducts[1],
          id: 302,
          productInfoId: 202,
        },
      ],
    } as unknown as KickzoneGraphqlTypes.Product;

    render(
      <MemoryRouter>
        <CustomersProductCard product={apparelProduct} onAddToCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getAllByText('M').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('L').length).toBeGreaterThanOrEqual(1);
  });

  it('T4: sizeKind missing (undefined) renders raw size (fa locale)', () => {
    const noKindProduct: KickzoneGraphqlTypes.Product = {
      ...baseProduct,
      productInfos: [
        {
          ...baseProduct.productInfos[0],
          id: 201,
          size: '32x34',
          sizeKind: undefined,
        },
      ],
      sellerProducts: [
        {
          ...baseProduct.sellerProducts[0],
          id: 301,
          productInfoId: 201,
        },
      ],
    } as unknown as KickzoneGraphqlTypes.Product;

    render(
      <MemoryRouter>
        <CustomersProductCard product={noKindProduct} onAddToCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getAllByText(toFarsiDigits('32x34')).length).toBeGreaterThanOrEqual(1);
  });

  it('T5: selection value stays raw for pants (fa locale)', () => {
    const pantsProduct: KickzoneGraphqlTypes.Product = {
      ...baseProduct,
      productInfos: [
        {
          ...baseProduct.productInfos[0],
          id: 201,
          size: '30x32',
          sizeKind: 'PANTS',
        },
        {
          ...baseProduct.productInfos[1],
          id: 202,
          size: '32x34',
          sizeKind: 'PANTS',
        },
      ],
      sellerProducts: [
        {
          ...baseProduct.sellerProducts[0],
          id: 301,
          productInfoId: 201,
        },
        {
          ...baseProduct.sellerProducts[1],
          id: 302,
          productInfoId: 202,
        },
      ],
    } as unknown as KickzoneGraphqlTypes.Product;

    const handleAddToCart = vi.fn();

    render(
      <MemoryRouter>
        <CustomersProductCard product={pantsProduct} onAddToCart={handleAddToCart} />
      </MemoryRouter>
    );

    // Click the first chip (W30/L32)
    const firstChip = screen.getByText(toFarsiDigits('W30/L32'));
    fireEvent.click(firstChip);

    // Click the add-to-cart button (same pattern as existing spec)
    const addButtons = screen.getAllByRole('button');
    const addToCartButton = addButtons.find(
      (btn) =>
        btn.textContent?.includes('افزودن به سبد') ||
        btn.getAttribute('aria-label')?.includes('افزودن به سبد')
    );
    expect(addToCartButton).toBeDefined();

    if (addToCartButton) {
      fireEvent.click(addToCartButton);
    }

    // Check that onAddToCart was called with raw size '30x32'
    const calls = JSON.stringify(handleAddToCart.mock.calls);
    expect(calls).toContain('30x32');
    expect(calls).not.toContain('W30/L32');
  });
});