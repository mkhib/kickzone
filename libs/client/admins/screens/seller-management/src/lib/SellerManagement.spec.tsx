import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { SellerManagement } from './SellerManagement';

// Mock dependencies
const mockShowSnackbar = vi.fn();
const mockCreateSeller = vi.fn();
const mockUpdateSeller = vi.fn();
const mockToggleSellerActive = vi.fn();
const mockRefetchSellers = vi.fn();

// Mock AdminsLayout
vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

// Mock snackbar hook
vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbar: () => ({
    showSnackbar: mockShowSnackbar,
  }),
}));

// Mock admins sellers hooks
vi.mock('@kickzone-workspace/admins-sellers-hooks', () => ({
  useAdminsSellers: () => ({
    createSeller: mockCreateSeller,
    updateSeller: mockUpdateSeller,
    toggleSellerActive: mockToggleSellerActive,
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
          },
        },
      ],
    },
    isLoadingSellers: false,
    refetchSellers: mockRefetchSellers,
  }),
}));

// Mock material-react-table
vi.mock('material-react-table', () => ({
  MaterialReactTable: ({ table }: { table: unknown }) => (
    <div data-testid="material-react-table">
      <div data-testid="toolbar">
        {(
          table as {
            options: { renderTopToolbarCustomActions: () => React.ReactNode };
          }
        ).options.renderTopToolbarCustomActions()}
      </div>
    </div>
  ),
  useMaterialReactTable: ({
    columns,
    renderTopToolbarCustomActions,
  }: {
    columns: unknown[];
    renderTopToolbarCustomActions: () => React.ReactNode;
  }) => ({
    options: { columns, renderTopToolbarCustomActions },
  }),
}));

describe('SellerManagement', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render successfully', () => {
    render(<SellerManagement />);
    expect(screen.getByTestId('material-react-table')).toBeInTheDocument();
  });

  it('should render within AdminsLayout', () => {
    render(<SellerManagement />);
    expect(screen.getByTestId('admins-layout')).toBeInTheDocument();
  });

  it('should render Add Seller button', () => {
    render(<SellerManagement />);
    expect(screen.getByText('Add Seller')).toBeInTheDocument();
  });

  it('should render Show Inactive button when filter is active', () => {
    render(<SellerManagement />);
    expect(screen.getByText('Show Inactive')).toBeInTheDocument();
  });

  it('should open create modal when Add Seller button is clicked', () => {
    render(<SellerManagement />);
    const addButton = screen.getByText('Add Seller');
    fireEvent.click(addButton);
    expect(screen.getByText('Create New Seller')).toBeInTheDocument();
  });

  it('should toggle filter when Show Inactive button is clicked', () => {
    render(<SellerManagement />);
    const toggleButton = screen.getByText('Show Inactive');
    fireEvent.click(toggleButton);
    expect(screen.getByText('Show Active')).toBeInTheDocument();
  });

  it('should render form fields in create modal', () => {
    render(<SellerManagement />);
    const addButton = screen.getByText('Add Seller');
    fireEvent.click(addButton);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Store Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
  });

  it('should handle input changes in create form', () => {
    render(<SellerManagement />);
    const addButton = screen.getByText('Add Seller');
    fireEvent.click(addButton);

    const nameInput = screen.getByLabelText(/^Name$/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Jane' } });
    expect(nameInput.value).toBe('Jane');
  });

  it('should close create modal when Cancel is clicked', () => {
    render(<SellerManagement />);
    const addButton = screen.getByText('Add Seller');
    fireEvent.click(addButton);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(screen.queryByText('Create New Seller')).not.toBeInTheDocument();
  });

  it('should render create and cancel buttons in create modal', () => {
    render(<SellerManagement />);
    const addButton = screen.getByText('Add Seller');
    fireEvent.click(addButton);

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  it('should have required fields marked in form', () => {
    render(<SellerManagement />);
    const addButton = screen.getByText('Add Seller');
    fireEvent.click(addButton);

    // Check if fields have required attribute
    const nameInput = screen.getByLabelText(/^Name$/i);
    expect(nameInput).toBeRequired();
  });

  it('should render MaterialReactTable component', () => {
    render(<SellerManagement />);
    expect(screen.getByTestId('material-react-table')).toBeInTheDocument();
  });

  it('should render toolbar with custom actions', () => {
    render(<SellerManagement />);
    expect(screen.getByTestId('toolbar')).toBeInTheDocument();
  });
});
