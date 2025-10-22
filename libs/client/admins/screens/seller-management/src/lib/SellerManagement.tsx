import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import {
  useAdminsSellers,
  useAdminsSellersQuery,
} from '@kickzone-workspace/admins-sellers-hooks';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { ChangeEvent, useMemo, useState, useEffect } from 'react';

type Seller = NonNullable<KickzoneGraphqlTypes.SellerInfo>;
type CreateSellerInput = KickzoneGraphqlTypes.CreateSellerInput;
type SellerFilterInput = KickzoneGraphqlTypes.SellerFilterInput;

export const SellerManagement = () => {
  const [filter, setFilter] = useState<SellerFilterInput>({
    isActive: true,
  });

  const { createSeller, updateSeller, toggleSellerActive } =
    useAdminsSellers(filter);

  const { sellers, isLoadingSellers, refetchSellers } =
    useAdminsSellersQuery(filter);
  const sellersData = useMemo(
    () => sellers?.edges?.map((edge) => edge.node) || [],
    [sellers]
  );

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [formData, setFormData] = useState<Partial<CreateSellerInput>>({});
  const [usernameConfirmation, setUsernameConfirmation] = useState('');
  const [needsReconfirmation, setNeedsReconfirmation] = useState(false);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    refetchSellers();
  }, [filter, refetchSellers]);

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
              onClick={() => {
                setSelectedSeller(row.original);
                setDeleteModalOpen(true);
                setUsernameConfirmation('');
                setNeedsReconfirmation(false);
              }}
              color={row.original.isActive ? 'error' : 'success'}
            >
              {row.original.isActive ? <PersonOffIcon /> : <GroupAddIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const handleDeleteConfirm = async () => {
    if (!selectedSeller) return;

    if (!needsReconfirmation) {
      setNeedsReconfirmation(true);
      return;
    }

    try {
      await toggleSellerActive({ variables: { id: selectedSeller.id } });
      setDeleteModalOpen(false);
      setSelectedSeller(null);
      setUsernameConfirmation('');
      setNeedsReconfirmation(false);
      showSnackbar('Seller status updated successfully', {
        severity: 'success',
      });
      refetchSellers();
    } catch (err) {
      const error = err as Error;

      showSnackbar(error.message, {
        severity: 'error',
      });
    }
  };

  const handleUsernameConfirmationChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setUsernameConfirmation(e.target.value);
  };

  const isDeleteEnabled =
    selectedSeller && usernameConfirmation === selectedSeller.user.username;

  const table = useMaterialReactTable({
    columns,
    data: sellersData,
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
    } catch (err) {
      const error = err as Error;

      showSnackbar(error.message, {
        severity: 'error',
      });
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
    } catch (err) {
      const error = err as Error;

      showSnackbar(error.message, {
        severity: 'error',
      });
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
        required
        name="name"
        label="Name"
        value={formData.name || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        required
        name="lastName"
        label="Last Name"
        value={formData.lastName || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        required
        name="username"
        label="Username"
        value={formData.username || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        required
        name="email"
        label="Email"
        type="email"
        value={formData.email || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        required
        name="storeName"
        label="Store Name"
        value={formData.storeName || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        required
        name="phone"
        label="Phone"
        value={formData.phone || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        required
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
      <GlassmorphismContainer fullHeight>
        <MaterialReactTable table={table} />

        {/* Create Modal */}
        <Dialog
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Create New Seller</DialogTitle>
          <DialogContent sx={{ pt: 3, pb: 2 }}>{renderForm()}</DialogContent>
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
        <Dialog
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Seller</DialogTitle>
          <DialogContent sx={{ pt: 3, pb: 2 }}>{renderForm()}</DialogContent>
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

        {/* Delete Confirmation Modal */}
        <Dialog
          open={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedSeller(null);
            setUsernameConfirmation('');
            setNeedsReconfirmation(false);
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {needsReconfirmation
              ? `Final Confirmation to ${
                  selectedSeller?.isActive ? 'Deactivate' : 'Activate'
                }`
              : `Confirm ${
                  selectedSeller?.isActive ? 'Deactivation' : 'Activation'
                }`}
          </DialogTitle>
          <DialogContent>
            <Alert
              severity={selectedSeller?.isActive ? 'error' : 'success'}
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {selectedSeller?.isActive
                  ? 'Warning: This action will deactivate the seller account!'
                  : 'This action will reactivate the seller account.'}
              </Typography>
              <Typography>
                You are about to{' '}
                {selectedSeller?.isActive ? 'deactivate' : 'activate'} the
                seller account for{' '}
                <strong>{selectedSeller?.user.username}</strong>.
              </Typography>
            </Alert>
            <Typography sx={{ mb: 2 }}>
              To confirm this action, please type the seller's username:{' '}
              <strong>{selectedSeller?.user.username}</strong>
            </Typography>
            <TextField
              fullWidth
              label="Enter username"
              value={usernameConfirmation}
              onChange={handleUsernameConfirmationChange}
              error={usernameConfirmation !== '' && !isDeleteEnabled}
              helperText={
                usernameConfirmation !== '' && !isDeleteEnabled
                  ? 'Username does not match'
                  : ''
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setDeleteModalOpen(false);
                setSelectedSeller(null);
                setUsernameConfirmation('');
                setNeedsReconfirmation(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              color={selectedSeller?.isActive ? 'error' : 'success'}
              disabled={!isDeleteEnabled}
            >
              {needsReconfirmation
                ? 'Reconfirm'
                : selectedSeller?.isActive
                ? 'Deactivate Anyway'
                : 'Activate Anyway'}
            </Button>
          </DialogActions>
        </Dialog>
      </GlassmorphismContainer>
    </AdminsLayout>
  );
};

export default SellerManagement;
