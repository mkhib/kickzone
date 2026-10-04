import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { useAdminsCustomers } from '@kickzone-workspace/admins-customers-hooks';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import {
  useI18nContext,
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';
import {
  useTableAlignment,
  getRTLTableProps,
  createRTLTextColumn,
  getRTLColumnProps,
} from '@kickzone-workspace/rtl-table-utils';
import { DialogFormContent } from '@kickzone-workspace/language-components';
import { MRT_Localization_FA } from 'material-react-table/locales/fa';
import { MRT_Localization_EN } from 'material-react-table/locales/en';
import type { MRT_Localization } from 'material-react-table';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useMemo, useState, useEffect } from 'react';

type Customer = NonNullable<KickzoneGraphqlTypes.User>;

export const AdminCustomerManagement = () => {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.adminCustomers());
  const { isRTL } = useLanguageContext();
  const { alignment, isFarsi, currentLocale } = useTableAlignment();
  const { showSnackbar } = useSnackbar();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const { customers, isLoadingCustomers, customersError, refetchCustomers } =
    useAdminsCustomers();

  // Convert Western numerals to Farsi numerals
  const toFarsiNumber = (num: number | string): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).replace(/\d/g, (digit) => farsiDigits[parseInt(digit, 10)]);
  };

  const formatNumbersInString = (str: string): string => {
    if (currentLocale !== 'fa') return str;
    return str.replace(/\d+/g, (match) => toFarsiNumber(match));
  };

  const baseLocalization =
    currentLocale === 'fa'
      ? MRT_Localization_FA
      : MRT_Localization_EN;

  const tableLocalization: Partial<MRT_Localization> = {
    ...baseLocalization,
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

  const customersData = useMemo(
    () => (customers?.edges?.map((edge) => edge.node) || []) as Customer[],
    [customers]
  );

  const totalCount = customers?.totalCount ?? customersData.length;

  useEffect(() => {
    if (customersError) {
      if (
        !customersError.message.includes('Forbidden') &&
        !customersError.message.includes('Unauthorized') &&
        !customersError.message.includes('Authentication')
      ) {
        showSnackbar(`Error loading customers: ${customersError.message}`, {
          severity: 'error',
        });
      }
    }
  }, [customersError, showSnackbar]);

  const handleOpenDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsModalOpen(false);
    setSelectedCustomer(null);
  };

  const columns: MRT_ColumnDef<Customer>[] = useMemo(() => {
    const dataColumns: MRT_ColumnDef<Customer>[] = [
      createRTLTextColumn<Customer>('name', LL.table.name(), { alignment }),
      createRTLTextColumn<Customer>('lastName', LL.table.lastName(), {
        alignment,
      }),
      createRTLTextColumn<Customer>('username', LL.table.username(), {
        alignment,
      }),
      createRTLTextColumn<Customer>('email', LL.table.email(), {
        alignment,
      }),
      {
        accessorKey: 'customerProfile.phone',
        header: LL.table.phone(),
        ...getRTLColumnProps(alignment),
        Cell: ({ row }) => row.original.customerProfile?.phone || '-',
      },
      {
        accessorKey: 'customerProfile.city',
        header: LL.table.city(),
        ...getRTLColumnProps(alignment),
        Cell: ({ row }) => row.original.customerProfile?.city || '-',
      },
      {
        accessorKey: 'customerProfile.country',
        header: LL.table.country(),
        ...getRTLColumnProps(alignment),
        Cell: ({ row }) => row.original.customerProfile?.country || '-',
      },
    ];

    const actionsColumn: MRT_ColumnDef<Customer> = {
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
          <Tooltip title={LL.table.customerDetails()}>
            <IconButton
              aria-label={LL.table.customerDetails()}
              onClick={() => handleOpenDetails(row.original)}
              color="primary"
              size="small"
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    };

    return [...dataColumns, actionsColumn];
  }, [LL, alignment, isRTL]);

  const table = useMaterialReactTable<Customer>({
    columns,
    data: customersData,
    state: { isLoading: isLoadingCustomers },
    enableRowActions: false,
    enableColumnOrdering: false,
    localization: tableLocalization,
    ...getRTLTableProps({ alignment, isFarsi }),
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        <Button
          color="primary"
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={() => refetchCustomers()}
          disabled={isLoadingCustomers}
        >
          {LL.tableMenu.refresh()}
        </Button>
        <Chip
          icon={<PeopleIcon />}
          label={
            currentLocale === 'fa'
              ? `${toFarsiNumber(totalCount)} مشتری ثبت‌نام شده`
              : `${totalCount} registered customer${totalCount === 1 ? '' : 's'}`
          }
          color="primary"
          variant="filled"
          sx={{ fontWeight: 600 }}
        />
      </Box>
    ),
  });

  return (
    <AdminsLayout>
      <GlassmorphismContainer fullHeight>
        <MaterialReactTable
          table={table}
          key={`customer-table-${isRTL ? 'rtl' : 'ltr'}`}
        />

        {/* Customer Details Modal */}
        <Dialog
          open={detailsModalOpen}
          onClose={handleCloseDetails}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon color="primary" />
            <Typography variant="h6" component="span" fontWeight="bold">
              {LL.adminCustomers.profileDetails()}
            </Typography>
          </DialogTitle>
          <DialogFormContent>
            {selectedCustomer && (
              <Stack spacing={3} sx={{ mt: 1 }}>
                {/* Account Information Card */}
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <PersonIcon fontSize="small" />
                    Account Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        {LL.table.name()}
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {selectedCustomer.name}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        {LL.table.lastName()}
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {selectedCustomer.lastName || '-'}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        {LL.table.username()}
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {selectedCustomer.username}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        {LL.table.email()}
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {selectedCustomer.email}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        ID
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {selectedCustomer.id}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        Role
                      </Typography>
                      <Box sx={{ mt: 0.5 }}>
                        <Chip
                          label={selectedCustomer.role}
                          size="small"
                          color="info"
                          variant="outlined"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Profile & Address Information Card */}
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <HomeIcon fontSize="small" />
                    Profile & Shipping Address
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  {selectedCustomer.customerProfile ? (
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="caption" color="text.secondary">
                          {LL.table.phone()}
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {selectedCustomer.customerProfile.phone || '-'}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="caption" color="text.secondary">
                          {LL.table.country()}
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {selectedCustomer.customerProfile.country || '-'}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="caption" color="text.secondary">
                          {LL.table.city()}
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {selectedCustomer.customerProfile.city || '-'}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="caption" color="text.secondary">
                          {LL.table.state()}
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {selectedCustomer.customerProfile.state || '-'}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="caption" color="text.secondary">
                          {LL.table.zipCode()}
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {selectedCustomer.customerProfile.zipCode || '-'}
                        </Typography>
                      </Grid>
                      <Grid size={12}>
                        <Typography variant="caption" color="text.secondary">
                          {LL.table.address()}
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {selectedCustomer.customerProfile.address || '-'}
                        </Typography>
                      </Grid>
                    </Grid>
                  ) : (
                    <Alert severity="info" variant="outlined" sx={{ mt: 1 }}>
                      {LL.adminCustomers.noProfile()}
                    </Alert>
                  )}
                </Paper>
              </Stack>
            )}
          </DialogFormContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleCloseDetails} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </GlassmorphismContainer>
    </AdminsLayout>
  );
};

export default AdminCustomerManagement;
