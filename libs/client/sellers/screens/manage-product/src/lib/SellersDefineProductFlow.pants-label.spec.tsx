import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { SellersDefineProductFlow } from './SellersDefineProductFlow';

vi.mock('@kickzone-workspace/admin-product-editor', () => ({
  AdminProductEditor: ({
    onCreated,
  }: {
    onCreated?: (result: {
      product: { id: number; name: string };
      productInfos: Array<{
        id: number;
        size: string;
        weight: number;
        sizeKind?: string | null;
        colors?: Array<{ id: number; name: string; hexCode: string }> | null;
      }>;
    }) => void;
  }) => (
    <button
      type="button"
      onClick={() =>
        onCreated?.({
          product: { id: 1, name: 'Air Max' },
          productInfos: [
            {
              id: 101,
              size: '32x34',
              sizeKind: 'Pants',
              weight: 1,
              colors: [{ id: 1, name: 'Red', hexCode: '#ff0000' }],
            },
            {
              id: 102,
              size: '42',
              sizeKind: 'Footwear',
              weight: 1,
              colors: [{ id: 1, name: 'Red', hexCode: '#ff0000' }],
            },
            {
              id: 103,
              size: 'M',
              sizeKind: 'Apparel',
              weight: 1,
              colors: [{ id: 1, name: 'Red', hexCode: '#ff0000' }],
            },
          ],
        })
      }
    >
      Save catalog product
    </button>
  ),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      products: {
        defineProductThenStock: () => 'Define then stock',
        setYourInventory: () => 'Set stock',
        skipVariantHint: () => 'Stock 0 skips',
        boxLess: () => 'Without box',
      },
      form: {
        stockQuantity: () => 'Stock',
        price: () => 'Price',
        costPrice: () => 'Cost',
        discount: () => 'Discount',
      },
      button: {
        addProduct: () => 'Add Product',
      },
    },
  }),
}));

vi.mock('@kickzone-workspace/language-components', () => ({
  getLtrTextFieldProps: () => ({}),
}));

describe('SellersDefineProductFlow pants label (P4 locked)', () => {
  it('renders text matching /W32\\/L34/ for variant A', async () => {
    const user = userEvent.setup();
    const onCreateListings = vi.fn().mockResolvedValue(undefined);

    render(
      <SellersDefineProductFlow
        onCreateListings={onCreateListings}
        isSubmitting={false}
      />
    );

    expect(screen.getByText('Define then stock')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Save catalog product' }));

    expect(screen.getByText(/W32\/L34/)).toBeInTheDocument();
  });

  it('does NOT render any text matching /\\b32x34\\b/', async () => {
    const user = userEvent.setup();
    const onCreateListings = vi.fn().mockResolvedValue(undefined);

    render(
      <SellersDefineProductFlow
        onCreateListings={onCreateListings}
        isSubmitting={false}
      />
    );

    expect(screen.getByText('Define then stock')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Save catalog product' }));

    expect(screen.queryByText(/\b32x34\b/)).not.toBeInTheDocument();
  });

  it('renders variant B label starting with \'42 - \' (unchanged footwear behavior)', async () => {
    const user = userEvent.setup();
    const onCreateListings = vi.fn().mockResolvedValue(undefined);

    render(
      <SellersDefineProductFlow
        onCreateListings={onCreateListings}
        isSubmitting={false}
      />
    );

    expect(screen.getByText('Define then stock')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Save catalog product' }));

    expect(screen.getByText(/^42 - /)).toBeInTheDocument();
  });

  it('renders variant C label starting with \'M - \' (unchanged apparel behavior)', async () => {
    const user = userEvent.setup();
    const onCreateListings = vi.fn().mockResolvedValue(undefined);

    render(
      <SellersDefineProductFlow
        onCreateListings={onCreateListings}
        isSubmitting={false}
      />
    );

    expect(screen.getByText('Define then stock')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Save catalog product' }));

    expect(screen.getByText(/^M - /)).toBeInTheDocument();
  });
});