import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import {
  useAdminsSellers,
  useAdminsSellersQuery,
} from '@kickzone-workspace/admins-sellers-hooks';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import {
  useI18nContext,
  useLanguageContext,
  useTableLocalization,
} from '@kickzone-workspace/shared-i18n';
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
  const { LL } = useI18nContext();
  const { isRTL } = useLanguageContext();
  const tableLocalization = useTableLocalization();
  const [filter, setFilter] = useState<SellerFilterInput>({
    isActive: true,
  });

  const { createSeller, updateSeller, toggleSellerActive } =
    useAdminsSellers(filter);

  const { sellers, isLoadingSellers, sellersError, refetchSellers } =
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

  // Refetch sellers when filter changes
  useEffect(() => {
    refetchSellers();
  }, [filter, refetchSellers]);

  // Handle query errors (non-auth errors)
  useEffect(() => {
    if (sellersError) {
      console.error('Sellers query error:', sellersError);

      // Only show snackbar for non-authentication errors
      // Authentication errors are handled by Apollo client error link
      if (
        !sellersError.message.includes('Forbidden') &&
        !sellersError.message.includes('Unauthorized') &&
        !sellersError.message.includes('Authentication')
      ) {
        showSnackbar(`Error loading sellers: ${sellersError.message}`, {
          severity: 'error',
        });
      }
    }
  }, [sellersError, showSnackbar]);

  const columns: MRT_ColumnDef<Seller>[] = useMemo(() => {
    const dataColumns: MRT_ColumnDef<Seller>[] = [
      {
        accessorKey: 'user.name',
        header: LL.table.name(),
        Cell: ({ cell }) => (
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {cell.getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: 'user.lastName',
        header: LL.table.lastName(),
        Cell: ({ cell }) => (
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {cell.getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: 'user.username',
        header: LL.table.username(),
        Cell: ({ cell }) => (
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {cell.getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: 'user.email',
        header: LL.table.email(),
        Cell: ({ cell }) => (
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {cell.getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: 'storeName',
        header: LL.table.storeName(),
        Cell: ({ cell }) => (
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {cell.getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: 'phone',
        header: LL.table.phone(),
        Cell: ({ cell }) => (
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {cell.getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: 'address',
        header: LL.table.address(),
        Cell: ({ cell }) => (
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {cell.getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: 'isActive',
        header: LL.table.status(),
        Cell: ({ row }) => (
          <Box
            sx={{
              color: row.original.isActive ? 'success.main' : 'error.main',
              fontWeight: 'bold',
              textAlign: isRTL ? 'right' : 'left',
            }}
          >
            {row.original.isActive ? LL.table.active() : LL.table.inactive()}
          </Box>
        ),
      },
    ];

    const actionsColumn: MRT_ColumnDef<Seller> = {
      id: 'actions',
      header: LL.table.actions(),
      Cell: ({ row }) => (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: isRTL ? 'flex-end' : 'flex-start',
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
        >
          <Tooltip title={LL.button.edit()}>
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
    };

    // For RTL languages, put actions column last (right side)
    // For LTR languages, put actions column last (right side) as well
    return [...dataColumns, actionsColumn];
  }, [LL, isRTL]);

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
    enableRowActions: false, // Disable built-in row actions to prevent duplicate actions column
    enableColumnOrdering: false, // Disable manual column ordering to respect our order
    localization: tableLocalization,
    muiTableHeadCellProps: {
      sx: {
        textAlign: isRTL ? 'right' : 'left',
      },
    },
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
          {LL.button.addSeller()}
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
          {filter.isActive ? LL.button.showInactive() : LL.button.showActive()}
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
        label={LL.table.name()}
        value={formData.name || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        required
        name="lastName"
        label={LL.table.lastName()}
        value={formData.lastName || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        required
        name="username"
        label={LL.table.username()}
        value={formData.username || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        required
        name="email"
        label={LL.table.email()}
        type="email"
        value={formData.email || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        required
        name="storeName"
        label={LL.table.storeName()}
        value={formData.storeName || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        required
        name="phone"
        label={LL.table.phone()}
        value={formData.phone || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        required
        name="address"
        label={LL.table.address()}
        value={formData.address || ''}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
    </>
  );

  return (
    <AdminsLayout>
      <GlassmorphismContainer fullHeight>
        <MaterialReactTable
          table={table}
          key={`seller-table-${isRTL ? 'rtl' : 'ltr'}`}
        />

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
              {LL.authorization.confirmAction()}{' '}
              <strong>{selectedSeller?.user.username}</strong>
            </Typography>
            <TextField
              fullWidth
              label={LL.authorization.enterUsername()}
              value={usernameConfirmation}
              onChange={handleUsernameConfirmationChange}
              error={usernameConfirmation !== '' && !isDeleteEnabled}
              helperText={
                usernameConfirmation !== '' && !isDeleteEnabled
                  ? LL.authorization.usernameMismatch()
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
