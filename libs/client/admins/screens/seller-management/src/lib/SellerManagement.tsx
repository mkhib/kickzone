import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import {
  useAdminsSellers,
  useAdminsSellersQuery,
} from '@kickzone-workspace/admins-sellers-hooks';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { ChangeEvent } from 'react';

type Seller = NonNullable<KickzoneGraphqlTypes.SellerInfo>;
type CreateSellerInput = KickzoneGraphqlTypes.CreateSellerInput;
type SellerFilterInput = KickzoneGraphqlTypes.SellerFilterInput;

export const SellerManagement = () => {
  const [filter, setFilter] = useState<SellerFilterInput>({
    isActive: true,
  });

  const { createSeller, updateSeller, toggleSellerActive } =
    useAdminsSellers(filter);

  const { sellers, isLoadingSellers } = useAdminsSellersQuery(filter);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [formData, setFormData] = useState<Partial<CreateSellerInput>>({});

  const columns: MRT_ColumnDef<Seller>[] = [
    {
      accessorKey: 'user.name',
      header: 'Name',
    },
    {
      accessorKey: 'user.lastName',
      header: 'Last Name',
    },
    {
      accessorKey: 'user.username',
      header: 'Username',
    },
    {
      accessorKey: 'user.email',
      header: 'Email',
    },
    {
      accessorKey: 'storeName',
      header: 'Store Name',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'address',
      header: 'Address',
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      Cell: ({ row }) => (
        <Box
          sx={{
            color: row.original.isActive ? 'success.main' : 'error.main',
            fontWeight: 'bold',
          }}
        >
          {row.original.isActive ? 'Active' : 'Inactive'}
        </Box>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                setSelectedSeller(row.original);
                setFormData({
                  name: row.original.user.name,
                  lastName: row.original.user.lastName || '',
                  username: row.original.user.username,
                  email: row.original.user.email,
                  storeName: row.original.storeName,
                  phone: row.original.phone,
                  address: row.original.address,
                });
                setEditModalOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={row.original.isActive ? 'Deactivate' : 'Activate'}>
            <IconButton
              onClick={() =>
                toggleSellerActive({ variables: { id: row.original.id } })
              }
              color={row.original.isActive ? 'error' : 'success'}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: sellers as Seller[],
    state: { isLoading: isLoadingSellers },
    enableRowActions: true,
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          color="primary"
          onClick={() => {
            setFormData({});
            setCreateModalOpen(true);
          }}
          startIcon={<AddIcon />}
          variant="contained"
        >
          Add Seller
        </Button>
        <Button
          color={filter.isActive ? 'error' : 'success'}
          onClick={() =>
            setFilter((prev: SellerFilterInput) => ({
              ...prev,
              isActive: !prev.isActive,
            }))
          }
          variant="outlined"
        >
          {filter.isActive ? 'Show Inactive' : 'Show Active'}
        </Button>
      </Box>
    ),
  });

  const handleCreateSubmit = async () => {
    try {
      if (
        !formData.name ||
        !formData.lastName ||
        !formData.username ||
        !formData.email ||
        !formData.storeName
      ) {
        return;
      }
      await createSeller({
        variables: {
          createSellerInput: {
            ...formData,
            password: 'defaultPassword123',
          } as CreateSellerInput,
        },
      });
      setCreateModalOpen(false);
      setFormData({});
    } catch (error) {
      console.error('Error creating seller:', error);
    }
  };

  const handleEditSubmit = async () => {
    if (!selectedSeller) return;
    try {
      await updateSeller({
        variables: {
          id: selectedSeller.id,
          updateSellerInput: {
            id: selectedSeller.id,
            name: formData.name || undefined,
            lastName: formData.lastName || undefined,
            username: formData.username || undefined,
            email: formData.email || undefined,
            storeName: formData.storeName || undefined,
            phone: formData.phone || undefined,
            address: formData.address || undefined,
          },
        },
      });
      setEditModalOpen(false);
      setSelectedSeller(null);
      setFormData({});
    } catch (error) {
      console.error('Error updating seller:', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<CreateSellerInput>) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderForm = () => (
    <>
      <TextField
        fullWidth
        name="name"
        label="Name"
        value={formData.name || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        name="lastName"
        label="Last Name"
        value={formData.lastName || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        name="username"
        label="Username"
        value={formData.username || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        name="email"
        label="Email"
        type="email"
        value={formData.email || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        name="storeName"
        label="Store Name"
        value={formData.storeName || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        name="phone"
        label="Phone"
        value={formData.phone || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        name="address"
        label="Address"
        value={formData.address || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
    </>
  );

  return (
    <AdminsLayout>
      <Box sx={{ p: 2 }}>
        <MaterialReactTable table={table} />
      </Box>

      {/* Create Modal */}
      <Dialog open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <DialogTitle>Create New Seller</DialogTitle>
        <DialogContent>{renderForm()}</DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateModalOpen(false)}>Cancel</Button>
          <Button
            onClick={handleCreateSubmit}
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Seller</DialogTitle>
        <DialogContent>{renderForm()}</DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </AdminsLayout>
  );
};

export default SellerManagement;
