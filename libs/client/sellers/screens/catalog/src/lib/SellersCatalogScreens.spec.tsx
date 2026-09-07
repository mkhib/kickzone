import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import {
  SellersCatalogEditor,
  SellersCatalogProducts,
  SellersCatalogRoute,
} from './SellersCatalogScreens';

const mockAuth = vi.hoisted(() => ({
  canManageCatalog: false,
  sellerInfoLoading: false,
}));

vi.mock('@kickzone-workspace/sellers-auth-context', () => ({
  useSellersAuthContext: () => mockAuth,
}));

vi.mock('@kickzone-workspace/admin-products', () => ({
  AdminProducts: (props: {
    productsNewPath?: string;
    showSellerListings?: boolean;
    title?: string;
  }) => (
    <div data-testid="admin-products">
      <span>{props.title}</span>
      <span>{props.productsNewPath}</span>
      <span>{String(props.showSellerListings)}</span>
    </div>
  ),
}));

vi.mock('@kickzone-workspace/admin-product-editor', () => ({
  AdminProductEditor: () => <div data-testid="admin-product-editor" />,
}));

vi.mock('@kickzone-workspace/sellers-layout', () => ({
  SellersLayout: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      navigation: {
        catalogManagement: () => 'Catalog Management',
      },
    },
  }),
}));

describe('SellersCatalogScreens', () => {
  it('waits while seller info is loading', () => {
    mockAuth.canManageCatalog = false;
    mockAuth.sellerInfoLoading = true;

    render(
      <MemoryRouter>
        <SellersCatalogRoute />
      </MemoryRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('redirects sellers without catalog permission', () => {
    mockAuth.canManageCatalog = false;
    mockAuth.sellerInfoLoading = false;

    render(
      <MemoryRouter initialEntries={['/catalog']}>
        <Routes>
          <Route path="/catalog" element={<SellersCatalogRoute />} />
          <Route path="/unauthorized" element={<div>unauthorized</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('unauthorized')).toBeInTheDocument();
  });

  it('reuses the admin product list without seller listings', () => {
    mockAuth.canManageCatalog = true;
    mockAuth.sellerInfoLoading = false;

    render(
      <MemoryRouter>
        <SellersCatalogProducts />
      </MemoryRouter>
    );

    expect(screen.getByTestId('admin-products')).toBeInTheDocument();
    expect(screen.getByText('Catalog Management')).toBeInTheDocument();
    expect(screen.getByText('/catalog/new')).toBeInTheDocument();
    expect(screen.getByText('false')).toBeInTheDocument();
  });

  it('reuses the admin product editor', () => {
    render(
      <MemoryRouter>
        <SellersCatalogEditor />
      </MemoryRouter>
    );

    expect(screen.getByTestId('admin-product-editor')).toBeInTheDocument();
  });
});
