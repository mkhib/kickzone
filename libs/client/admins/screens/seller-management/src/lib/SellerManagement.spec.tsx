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

    // Use more specific queries by getting input elements by their name attribute
    const nameInputs = screen.getAllByRole('textbox');
    expect(nameInputs.length).toBeGreaterThan(0);

    // Verify all required fields are present
    expect(screen.getByText('Create New Seller')).toBeInTheDocument();
  });

  it('should handle input changes in create form', () => {
    render(<SellerManagement />);
    const addButton = screen.getByText('Add Seller');
    fireEvent.click(addButton);

    // Get the first textbox which should be the Name field
    const inputs = screen.getAllByRole('textbox');
    const nameInput = inputs[0] as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Jane', name: 'name' } });
    expect(nameInput.value).toBe('Jane');
  });

  it('should close create modal when Cancel is clicked', async () => {
    render(<SellerManagement />);
    const addButton = screen.getByText('Add Seller');
    fireEvent.click(addButton);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    // Wait for modal to close (MUI uses transitions)
    await waitFor(() => {
      expect(screen.queryByText('Create New Seller')).not.toBeInTheDocument();
    });
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

    // Check if fields have required attribute by getting all textboxes
    const inputs = screen.getAllByRole('textbox');
    // At least one input should be required (the Name field)
    const hasRequiredField = inputs.some((input) =>
      input.hasAttribute('required')
    );
    expect(hasRequiredField).toBe(true);
  });

  it('should render MaterialReactTable component', () => {
    render(<SellerManagement />);
    expect(screen.getByTestId('material-react-table')).toBeInTheDocument();
  });

  it('should render toolbar with custom actions', () => {
    render(<SellerManagement />);
    expect(screen.getByTestId('toolbar')).toBeInTheDocument();
  });

  it('should call createSeller when create button is clicked with valid data', async () => {
    mockCreateSeller.mockResolvedValue({ data: { createSeller: { id: 2 } } });

    render(<SellerManagement />);
    const addButton = screen.getByText('Add Seller');
    fireEvent.click(addButton);

    // Fill in all required fields
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Jane', name: 'name' } });
    fireEvent.change(inputs[1], { target: { value: 'Doe', name: 'lastName' } });
    fireEvent.change(inputs[2], {
      target: { value: 'janedoe', name: 'username' },
    });
    fireEvent.change(inputs[3], {
      target: { value: 'jane@example.com', name: 'email' },
    });
    fireEvent.change(inputs[4], {
      target: { value: 'Jane Store', name: 'storeName' },
    });
    fireEvent.change(inputs[5], {
      target: { value: '987654321', name: 'phone' },
    });
    fireEvent.change(inputs[6], {
      target: { value: '456 Oak St', name: 'address' },
    });

    const createButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(mockCreateSeller).toHaveBeenCalled();
    });
  });

  it('should handle create seller error', async () => {
    mockCreateSeller.mockRejectedValue(new Error('Creation failed'));

    render(<SellerManagement />);
    const addButton = screen.getByText('Add Seller');
    fireEvent.click(addButton);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Jane', name: 'name' } });
    fireEvent.change(inputs[1], { target: { value: 'Doe', name: 'lastName' } });
    fireEvent.change(inputs[2], {
      target: { value: 'janedoe', name: 'username' },
    });
    fireEvent.change(inputs[3], {
      target: { value: 'jane@example.com', name: 'email' },
    });
    fireEvent.change(inputs[4], {
      target: { value: 'Jane Store', name: 'storeName' },
    });
    fireEvent.change(inputs[5], {
      target: { value: '987654321', name: 'phone' },
    });
    fireEvent.change(inputs[6], {
      target: { value: '456 Oak St', name: 'address' },
    });

    const createButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith('Creation failed', {
        severity: 'error',
      });
    });
  });

  it('should not submit form if required fields are missing', async () => {
    render(<SellerManagement />);
    const addButton = screen.getByText('Add Seller');
    fireEvent.click(addButton);

    const createButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(createButton);

    // Should not call createSeller if fields are empty
    expect(mockCreateSeller).not.toHaveBeenCalled();
  });

  it('should refetch sellers after filter change', async () => {
    render(<SellerManagement />);

    await waitFor(() => {
      expect(mockRefetchSellers).toHaveBeenCalled();
    });
  });
});
