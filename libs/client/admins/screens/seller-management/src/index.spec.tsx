import React from 'react';
import { describe, it, expect, vi } from 'vitest';

// Mock dependencies
vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbar: () => ({
    showSnackbar: vi.fn(),
  }),
}));

vi.mock('@kickzone-workspace/admins-sellers-hooks', () => ({
  useAdminsSellers: () => ({
    createSeller: vi.fn(),
    updateSeller: vi.fn(),
    toggleSellerActive: vi.fn(),
  }),
  useAdminsSellersQuery: () => ({
    sellers: { edges: [] },
    isLoadingSellers: false,
    refetchSellers: vi.fn(),
  }),
}));

vi.mock('material-react-table', () => ({
  MaterialReactTable: () => <div data-testid="material-react-table" />,
  useMaterialReactTable: () => ({}),
}));

import * as exports from './index';

describe('seller-management exports', () => {
  it('should export SellerManagement', () => {
    expect(exports).toHaveProperty('SellerManagement');
    expect(typeof exports.SellerManagement).toBe('function');
  });
});
