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
          product: { id: 1, name: 'Oversized Hoodie' },
          productInfos: [
            {
              id: 201,
              size: '4XL',
              sizeKind: 'Apparel',
              weight: 1,
              colors: [{ id: 1, name: 'Black', hexCode: '#000000' }],
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

describe('SellersDefineProductFlow', () => {
  it('shows inventory fields after the catalog product is created', async () => {
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

    expect(screen.getByText('Oversized Hoodie')).toBeInTheDocument();
    expect(screen.getByText('Set stock')).toBeInTheDocument();
    expect(screen.getByText('4XL - Black (1kg)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Product' })).toBeInTheDocument();
  });

  it('displays 4XL variant correctly when AdminProductEditor creates apparel product with 4XL size', async () => {
    const user = userEvent.setup();
    const onCreateListings = vi.fn().mockResolvedValue(undefined);

    render(
      <SellersDefineProductFlow
        onCreateListings={onCreateListings}
        isSubmitting={false}
      />
    );

    expect(screen.getByText('Define then stock')).toBeInTheDocument();
    // The mocked AdminProductEditor in the vi.mock block returns a 4XL variant
    await user.click(screen.getByRole('button', { name: 'Save catalog product' }));

    expect(screen.getByText('Oversized Hoodie')).toBeInTheDocument();
    expect(screen.getByText('Set stock')).toBeInTheDocument();
    // 4XL should be displayed as-is (not formatted like pants)
    expect(screen.getByText('4XL - Black (1kg)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Product' })).toBeInTheDocument();
  });
});
