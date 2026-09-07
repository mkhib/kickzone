import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SellerManagement } from './SellerManagement';

const mockRefetchSellers = vi.fn();

vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/glassmorphism-container', () => ({
  GlassmorphismContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="glassmorphism-container">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbar: () => ({
    showSnackbar: vi.fn(),
  }),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      pageTitles: {
        adminSellers: () => 'Sellers',
      },
      table: {
        name: () => 'Name',
        lastName: () => 'Last Name',
        username: () => 'Username',
        email: () => 'Email',
        storeName: () => 'Store Name',
        phone: () => 'Phone',
        address: () => 'Address',
        status: () => 'Status',
        actions: () => 'Actions',
        active: () => 'Active',
        inactive: () => 'Inactive',
      },
      button: {
        addSeller: () => 'Add Seller',
        showInactive: () => 'Show Inactive',
        showActive: () => 'Show Active',
        edit: () => 'Edit',
      },
      authorization: {
        resendPasswordEmail: () => 'Resend Password Email',
        passwordEmailSent: () => 'Password email sent',
        deactivateSeller: () => 'Deactivate Seller',
        activateSeller: () => 'Activate Seller',
        confirmAction: () => 'Confirm action for',
        enterUsername: () => 'Enter username',
        usernameMismatch: () => 'Username mismatch',
      },
      tableMenu: {
        sortByColumnAsc: ({ column }: { column: string }) =>
          `Sort ${column} ascending`,
        sortByColumnDesc: ({ column }: { column: string }) =>
          `Sort ${column} descending`,
        sortedByColumnAsc: ({ column }: { column: string }) =>
          `Sorted ${column} ascending`,
        sortedByColumnDesc: ({ column }: { column: string }) =>
          `Sorted ${column} descending`,
      },
    },
  }),
  useLanguageContext: () => ({
    isRTL: false,
  }),
  usePageTitle: vi.fn(),
}));

vi.mock('@kickzone-workspace/rtl-table-utils', () => ({
  useTableAlignment: () => ({
    alignment: 'left',
    isFarsi: false,
    currentLocale: 'en',
  }),
  getRTLTableProps: () => ({}),
  createRTLTextColumn: (accessorKey: string, header: string) => ({
    accessorKey,
    header,
  }),
  createRTLStatusColumn: (accessorKey: string, header: string) => ({
    accessorKey,
    header,
  }),
  RTLStatusCell: ({ value }: { value: string }) => <span>{value}</span>,
  getRTLColumnProps: () => ({}),
}));

vi.mock('@kickzone-workspace/language-components', () => ({
  DialogFormContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-form-content">{children}</div>
  ),
  getLtrTextFieldProps: () => ({}),
}));

vi.mock('@kickzone-workspace/admins-sellers-hooks', () => ({
  useAdminsSellers: () => ({
    createSeller: vi.fn(),
    updateSeller: vi.fn(),
    toggleSellerActive: vi.fn(),
    initiateSellerPasswordSetup: vi.fn(),
    isCreatingSeller: false,
    isUpdatingSeller: false,
    isTogglingSellerActive: false,
  }),
  useAdminsSellersQuery: () => ({
    sellers: {
      edges: [
        {
          node: {
            id: 1,
            user: {
              name: 'John',
              lastName: 'Doe',
              username: 'johndoe',
              email: 'john@example.com',
            },
            storeName: 'Test Store',
            phone: '123456789',
            address: '123 Main St',
            isActive: true,
            canManageCatalog: true,
            shippingFee: 10,
          },
        },
      ],
    },
    isLoadingSellers: false,
    sellersError: undefined,
    refetchSellers: mockRefetchSellers,
  }),
}));

vi.mock('material-react-table', () => ({
  MaterialReactTable: ({ table }: { table: { options: { renderTopToolbarCustomActions: () => React.ReactNode } } }) => (
    <div data-testid="material-react-table">
      {table.options.renderTopToolbarCustomActions()}
    </div>
  ),
  useMaterialReactTable: (options: unknown) => ({
    options: options as { renderTopToolbarCustomActions: () => React.ReactNode },
  }),
}));

vi.mock('material-react-table/locales/fa', () => ({
  MRT_Localization_FA: {},
}));

vi.mock('material-react-table/locales/en', () => ({
  MRT_Localization_EN: {},
}));

describe('SellerManagement', () => {
  it('renders a minimal smoke view and refetches on mount', async () => {
    render(<SellerManagement />);

    expect(screen.getByTestId('admins-layout')).toBeInTheDocument();
    expect(screen.getByTestId('material-react-table')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Seller' })).toBeInTheDocument();

    await waitFor(() => {
      expect(mockRefetchSellers).toHaveBeenCalled();
    });
  });
});
