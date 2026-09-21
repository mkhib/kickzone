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
              id: 11,
              size: '42',
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

    expect(screen.getByText('Air Max')).toBeInTheDocument();
    expect(screen.getByText('Set stock')).toBeInTheDocument();
    expect(screen.getByText('42 - Red (1kg)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Product' })).toBeInTheDocument();
  });
});
