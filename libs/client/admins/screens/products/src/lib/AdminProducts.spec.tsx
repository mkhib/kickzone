import { render, screen } from '@testing-library/react';
import { AdminProducts } from './AdminProducts';
import React from 'react';

vi.mock('@kickzone-workspace/products-hook', () => ({
  useProductsQuery: () => ({
    products: [],
    loading: false,
    error: null,
    loadMore: vi.fn(),
    hasNextPage: false,
    totalCount: 0,
    refetch: vi.fn(),
  }),
}));
vi.mock('@kickzone-workspace/categories-hook', () => ({
  useCategories: () => ({
    categoriesData: { categories: [] },
  }),
}));

describe('AdminProducts', () => {
  it('renders the Products heading', () => {
    render(<AdminProducts />);
    expect(screen.getByText('Products')).toBeInTheDocument();
  });
});
