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
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';
import {
  useTableAlignment,
  getRTLTableProps,
  createRTLTextColumn,
  createRTLStatusColumn,
  RTLStatusCell,
  getRTLColumnProps,
} from '@kickzone-workspace/rtl-table-utils';
import {
  DialogFormContent,
  getLtrTextFieldProps,
} from '@kickzone-workspace/language-components';
import { MRT_Localization_FA } from 'material-react-table/locales/fa';
import { MRT_Localization_EN } from 'material-react-table/locales/en';
import type { MRT_Localization } from 'material-react-table';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { ChangeEvent, useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  sellerCreateFormSchema,
  sellerEditFormSchema,
  type SellerCreateFormInput,
  type SellerEditFormInput,
} from '@kickzone-workspace/validation';

type Seller = NonNullable<KickzoneGraphqlTypes.SellerInfo>;
type CreateSellerInput = KickzoneGraphqlTypes.CreateSellerInput;
type SellerFilterInput = KickzoneGraphqlTypes.SellerFilterInput;
type SellerFormData = Partial<CreateSellerInput> & { canManageCatalog?: boolean };

export const SellerManagement = () => {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.adminSellers());
  const { isRTL } = useLanguageContext();
  const { alignment, isFarsi, currentLocale } = useTableAlignment();

  // Convert Western numerals to Farsi numerals
  const toFarsiNumber = (num: number | string): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).replace(/\d/g, (digit) => farsiDigits[parseInt(digit)]);
  };

  // Format numbers in strings for Farsi locale
  const formatNumbersInString = (str: string): string => {
    if (currentLocale !== 'fa') return str;
    return str.replace(/\d+/g, (match) => toFarsiNumber(match));
  };

  // Use built-in MaterialReactTable localizations and merge with custom overrides
  const baseLocalization =
    currentLocale === 'fa'
      ? MRT_Localization_FA
      : currentLocale === 'en'
      ? MRT_Localization_EN
      : MRT_Localization_EN; // Fallback to English

  // Merge with custom translations and format numbers
  const tableLocalization: Partial<MRT_Localization> = {
    ...baseLocalization,
    // Override sort strings with correct Farsi word order
    // MaterialReactTable expects string templates with {column} placeholder
    sortByColumnAsc: formatNumbersInString(
      LL.tableMenu.sortByColumnAsc({ column: '{column}' })
    ),
    sortByColumnDesc: formatNumbersInString(
      LL.tableMenu.sortByColumnDesc({ column: '{column}' })
    ),
    sortedByColumnAsc: formatNumbersInString(
      LL.tableMenu.sortedByColumnAsc({ column: '{column}' })
    ),
    sortedByColumnDesc: formatNumbersInString(
      LL.tableMenu.sortedByColumnDesc({ column: '{column}' })
    ),
  };
  const [filter, setFilter] = useState<SellerFilterInput>({
    isActive: true,
  });

  const {
    createSeller,
    updateSeller,
    toggleSellerActive,
    initiateSellerPasswordSetup,
    isCreatingSeller,
    isUpdatingSeller,
    isTogglingSellerActive,
  } = useAdminsSellers(filter);

  const env = (
    import.meta as unknown as {
      env: {
        VITE_SELLERS_BASE_URL?: string;
        VITE_SELLERS_FRONTEND_URL?: string;
      };
    }
  ).env;

  const sellersPortalBaseUrl =
    env.VITE_SELLERS_BASE_URL ||
    env.VITE_SELLERS_FRONTEND_URL ||
    'https://seller.saintbala.com'; // default to prod host to avoid localhost links in prod builds

  const [resendingSellerId, setResendingSellerId] = useState<number | null>(
    null
  );

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
  const [formData, setFormData] = useState<SellerFormData>({});
  const sellerFormValues = {
    name: formData.name ?? '',
    lastName: formData.lastName ?? '',
    username: formData.username ?? '',
    email: formData.email ?? '',
    storeName: formData.storeName ?? '',
    phone: formData.phone,
    address: formData.address,
    shippingFee: formData.shippingFee,
    canManageCatalog: formData.canManageCatalog,
  };
  const createForm = useForm<SellerCreateFormInput>({
    values: sellerFormValues,
    resolver: zodResolver(sellerCreateFormSchema),
    mode: 'onSubmit',
  });
  const editForm = useForm<SellerEditFormInput>({
    values: sellerFormValues,
    resolver: zodResolver(sellerEditFormSchema),
    mode: 'onSubmit',
  });
  const sellerErrors = editModalOpen
    ? editForm.formState.errors
    : createForm.formState.errors;
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
      createRTLTextColumn<Seller>('user.name', LL.table.name(), { alignment }),
      createRTLTextColumn<Seller>('user.lastName', LL.table.lastName(), {
        alignment,
      }),
      createRTLTextColumn<Seller>('user.username', LL.table.username(), {
        alignment,
      }),
      createRTLTextColumn<Seller>('user.email', LL.table.email(), {
        alignment,
      }),
      createRTLTextColumn<Seller>('storeName', LL.table.storeName(), {
        alignment,
      }),
      createRTLTextColumn<Seller>('phone', LL.table.phone(), { alignment }),
      createRTLTextColumn<Seller>('address', LL.table.address(), { alignment }),
      {
        accessorKey: 'shippingFee',
        header: 'Shipping Fee',
        ...getRTLColumnProps(alignment),
        Cell: ({ row }) => `$${row.original.shippingFee?.toFixed(2) || '0.00'}`,
      },
      {
        ...createRTLStatusColumn<Seller>('isActive', LL.table.status(), {
          alignment,
          activeColor: 'success.main',
          inactiveColor: 'error.main',
          getIsActive: (row) => row.isActive,
        }),
        Cell: ({ row }) => {
          const statusText = row.original.isActive
            ? LL.table.active()
            : LL.table.inactive();
          return (
            <RTLStatusCell
              alignment={alignment}
              value={statusText}
              isActive={row.original.isActive}
              activeColor="success.main"
              inactiveColor="error.main"
            />
          );
        },
      },
      {
        accessorKey: 'canManageCatalog',
        header: 'Catalog Manager',
        ...getRTLColumnProps(alignment),
        Cell: ({ row }) => (row.original.canManageCatalog ? 'Yes' : 'No'),
      },
    ];

    const actionsColumn: MRT_ColumnDef<Seller> = {
      id: 'actions',
      header: LL.table.actions(),
      ...getRTLColumnProps(alignment),
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
                  shippingFee: row.original.shippingFee,
                  canManageCatalog: row.original.canManageCatalog,
                });
                setEditModalOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={LL.authorization.resendPasswordEmail()}>
            <span>
              <IconButton
                disabled={resendingSellerId === row.original.id}
                onClick={async () => {
                  setResendingSellerId(row.original.id);
                  try {
                    await initiateSellerPasswordSetup({
                      variables: {
                        email: row.original.user.email,
                        baseUrl: sellersPortalBaseUrl,
                      },
                    });
                    showSnackbar(LL.authorization.passwordEmailSent(), {
                      severity: 'success',
                    });
                  } catch (error) {
                    const err = error as Error;
                    showSnackbar(err.message, { severity: 'error' });
                  } finally {
                    setResendingSellerId(null);
                  }
                }}
              >
                <MarkEmailReadIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip
            title={
              row.original.isActive
                ? LL.authorization.deactivateSeller()
                : LL.authorization.activateSeller()
            }
          >
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
  }, [
    LL,
    isRTL,
    alignment,
    initiateSellerPasswordSetup,
    resendingSellerId,
    sellersPortalBaseUrl,
    showSnackbar,
  ]);

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

  const table = useMaterialReactTable<Seller>({
    columns,
    data: sellersData,
    state: { isLoading: isLoadingSellers },
    enableRowActions: false, // Disable built-in row actions to prevent duplicate actions column
    enableColumnOrdering: false, // Disable manual column ordering to respect our order
    localization: tableLocalization,
    ...getRTLTableProps({ alignment, isFarsi }),
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
      if (!(await createForm.trigger())) return;
      const rawFee = formData.shippingFee as number | string | undefined | null;
      const shippingFeeValue =
        rawFee === undefined || rawFee === null || rawFee === ''
          ? 0
          : Number(rawFee);

      await createSeller({
        variables: {
          createSellerInput: {
            ...formData,
            shippingFee: Number.isFinite(shippingFeeValue)
              ? shippingFeeValue
              : 0,
            canManageCatalog: formData.canManageCatalog ?? false,
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
    if (!(await editForm.trigger())) return;
    try {
      await updateSeller({
        variables: {
          updateSellerInput: {
            id: selectedSeller.id,
            name: formData.name || undefined,
            lastName: formData.lastName || undefined,
            username: formData.username || undefined,
            email: formData.email || undefined,
            storeName: formData.storeName || undefined,
            phone: formData.phone || undefined,
            address: formData.address || undefined,
            shippingFee:
              formData.shippingFee !== undefined
                ? Number(formData.shippingFee)
                : undefined,
            canManageCatalog: formData.canManageCatalog,
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
    const { name, value, type, checked } = e.target;
    setFormData((prev: SellerFormData) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
        error={Boolean(sellerErrors.name)}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        required
        name="lastName"
        label={LL.table.lastName()}
        value={formData.lastName || ''}
        error={Boolean(sellerErrors.lastName)}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        required
        name="username"
        label={LL.table.username()}
        value={formData.username || ''}
        error={Boolean(sellerErrors.username)}
        onChange={handleInputChange}
        {...getLtrTextFieldProps()}
      />
      <TextField
        fullWidth
        required
        name="email"
        label={LL.table.email()}
        type="email"
        value={formData.email || ''}
        error={Boolean(sellerErrors.email)}
        onChange={handleInputChange}
        {...getLtrTextFieldProps()}
      />
      <TextField
        fullWidth
        required
        name="storeName"
        label={LL.table.storeName()}
        value={formData.storeName || ''}
        error={Boolean(sellerErrors.storeName)}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        required
        name="phone"
        label={LL.table.phone()}
        value={formData.phone || ''}
        onChange={handleInputChange}
        {...getLtrTextFieldProps()}
      />
      <TextField
        fullWidth
        required
        name="address"
        label={LL.table.address()}
        value={formData.address || ''}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        name="shippingFee"
        label="Shipping Fee ($)"
        type="number"
        value={formData.shippingFee || ''}
        error={Boolean(sellerErrors.shippingFee)}
        onChange={handleInputChange}
        sx={getLtrTextFieldProps().sx}
        slotProps={{
          htmlInput: {
            dir: 'ltr',
            step: '0.01',
            min: '0',
          },
        }}
      />
      <FormControlLabel
        control={
          <Switch
            checked={formData.canManageCatalog ?? false}
            onChange={handleInputChange}
            name="canManageCatalog"
          />
        }
        label="Can manage catalog (define products)"
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
          onClose={() => !isCreatingSeller && setCreateModalOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Create New Seller</DialogTitle>
          <DialogFormContent>{renderForm()}</DialogFormContent>
          <DialogActions>
            <Button
              onClick={() => setCreateModalOpen(false)}
              disabled={isCreatingSeller}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateSubmit}
              variant="contained"
              color="primary"
              loading={isCreatingSeller}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Modal */}
        <Dialog
          open={editModalOpen}
          onClose={() => !isUpdatingSeller && setEditModalOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Seller</DialogTitle>
          <DialogFormContent>{renderForm()}</DialogFormContent>
          <DialogActions>
            <Button
              onClick={() => setEditModalOpen(false)}
              disabled={isUpdatingSeller}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditSubmit}
              variant="contained"
              color="primary"
              loading={isUpdatingSeller}
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
          <DialogFormContent>
            <Alert
              severity={selectedSeller?.isActive ? 'error' : 'success'}
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
            <Typography>
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
              {...getLtrTextFieldProps()}
            />
          </DialogFormContent>
          <DialogActions>
            <Button
              onClick={() => {
                setDeleteModalOpen(false);
                setSelectedSeller(null);
                setUsernameConfirmation('');
                setNeedsReconfirmation(false);
              }}
              disabled={isTogglingSellerActive}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              color={selectedSeller?.isActive ? 'error' : 'success'}
              disabled={!isDeleteEnabled}
              loading={isTogglingSellerActive}
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
