import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { AdminCustomerManagement } from './admin-customer-management';

const mockRefetchCustomers = vi.fn();

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
        adminCustomers: () => 'Customer Management',
      },
      table: {
        name: () => 'Name',
        lastName: () => 'Last Name',
        username: () => 'Username',
        email: () => 'Email',
        phone: () => 'Phone',
        city: () => 'City',
        country: () => 'Country',
        actions: () => 'Actions',
        customerDetails: () => 'Customer Details',
        state: () => 'State',
        zipCode: () => 'Postal Code',
        address: () => 'Address',
      },
      tableMenu: {
        refresh: () => 'Refresh',
        sortByColumnAsc: ({ column }: { column: string }) =>
          `Sort ${column} ascending`,
        sortByColumnDesc: ({ column }: { column: string }) =>
          `Sort ${column} descending`,
        sortedByColumnAsc: ({ column }: { column: string }) =>
          `Sorted ${column} ascending`,
        sortedByColumnDesc: ({ column }: { column: string }) =>
          `Sorted ${column} descending`,
      },
      adminCustomers: {
        profileDetails: () => 'Customer Profile Details',
        noProfile: () => 'No profile details provided',
      },
    },
  }),
  useLanguageContext: () => ({
    isRTL: false,
    currentLocale: 'en',
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
  getRTLColumnProps: () => ({}),
}));

vi.mock('@kickzone-workspace/language-components', () => ({
  DialogFormContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-form-content">{children}</div>
  ),
}));

const mockCustomers = [
  {
    id: 'user-1',
    name: 'Alice',
    lastName: 'Smith',
    username: 'alicesmith',
    email: 'alice@example.com',
    role: 'CUSTOMER',
    locale: 'en',
    customerProfile: {
      id: 'prof-1',
      phone: '+123456789',
      address: '123 Elm St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'USA',
    },
  },
  {
    id: 'user-2',
    name: 'Bob',
    lastName: 'Jones',
    username: 'bobjones',
    email: 'bob@example.com',
    role: 'CUSTOMER',
    locale: 'en',
    customerProfile: null,
  },
];

vi.mock('@kickzone-workspace/admins-customers-hooks', () => ({
  useAdminsCustomers: () => ({
    customers: {
      edges: mockCustomers.map((node) => ({ node, cursor: node.id })),
      totalCount: mockCustomers.length,
      pageInfo: { hasNextPage: false, endCursor: 'user-2' },
    },
    isLoadingCustomers: false,
    customersError: null,
    refetchCustomers: mockRefetchCustomers,
  }),
}));

vi.mock('material-react-table', () => ({
  MaterialReactTable: ({
    table,
  }: {
    table: {
      options: {
        renderTopToolbarCustomActions: () => React.ReactNode;
        data: typeof mockCustomers;
        columns: Array<{
          id?: string;
          header?: string;
          Cell?: (props: { row: { original: (typeof mockCustomers)[0] } }) => React.ReactNode;
        }>;
      };
    };
  }) => (
    <div data-testid="material-react-table">
      {table.options.renderTopToolbarCustomActions()}
      <div data-testid="table-rows">
        {table.options.data.map((customer) => {
          const actionCol = table.options.columns.find((c) => c.id === 'actions');
          return (
            <div key={customer.id} data-testid={`customer-row-${customer.id}`}>
              <span>{customer.name}</span>
              <span>{customer.email}</span>
              {actionCol?.Cell && actionCol.Cell({ row: { original: customer } })}
            </div>
          );
        })}
      </div>
    </div>
  ),
  useMaterialReactTable: (options: unknown) => ({
    options,
  }),
}));

vi.mock('material-react-table/locales/fa', () => ({
  MRT_Localization_FA: {},
}));

vi.mock('material-react-table/locales/en', () => ({
  MRT_Localization_EN: {},
}));

describe('AdminCustomerManagement', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders customer management layout, table, and customer count', () => {
    render(<AdminCustomerManagement />);

    expect(screen.getByTestId('admins-layout')).toBeInTheDocument();
    expect(screen.getByTestId('glassmorphism-container')).toBeInTheDocument();
    expect(screen.getByTestId('material-react-table')).toBeInTheDocument();
    expect(screen.getByText('2 registered customers')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('triggers refetch when clicking the refresh button', () => {
    render(<AdminCustomerManagement />);

    const refreshButton = screen.getByRole('button', { name: 'Refresh' });
    fireEvent.click(refreshButton);

    expect(mockRefetchCustomers).toHaveBeenCalledTimes(1);
  });

  it('opens details modal when clicking on customer details action', () => {
    render(<AdminCustomerManagement />);

    const detailsButtons = screen.getAllByRole('button', { name: 'Customer Details' });
    expect(detailsButtons.length).toBe(2);

    fireEvent.click(detailsButtons[0]);

    expect(screen.getByText('Customer Profile Details')).toBeInTheDocument();
    expect(screen.getByText('123 Elm St')).toBeInTheDocument();
    expect(screen.getByText('Springfield')).toBeInTheDocument();
    expect(screen.getByText('+123456789')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeBtn);
  });

  it('shows info alert in modal when customer has no profile details', () => {
    render(<AdminCustomerManagement />);

    const detailsButtons = screen.getAllByRole('button', { name: 'Customer Details' });
    fireEvent.click(detailsButtons[1]); // Bob has null profile

    expect(screen.getByText('Customer Profile Details')).toBeInTheDocument();
    expect(screen.getByText('No profile details provided')).toBeInTheDocument();
  });
});
