import React, { useMemo, useState, useCallback } from 'react';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import { DialogFormContent } from '@kickzone-workspace/language-components';
import {
  useI18nContext,
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';
import { DataTable } from '@kickzone-workspace/material-data-table';
import { type MRT_ColumnDef } from 'material-react-table';
import { PriceDisplay } from '@kickzone-workspace/price-display';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import {
  useAdminsOrders,
  useAdminsSellers,
} from '@kickzone-workspace/admins-orders-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { formatSizeLabel, SizeKind } from '@kickzone-workspace/product-sizes';
import { OrderStatusChip } from '@kickzone-workspace/order-status-chip';

type Order = KickzoneGraphqlTypes.Order;

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const CANONICAL_PANTS_SIZE_RE = /^[1-9]\d?x[1-9]\d?$/;
const displayItemSize = (size?: string | null): string => {
  if (!size) return '';
  const t = size.trim();
  return CANONICAL_PANTS_SIZE_RE.test(t)
    ? formatSizeLabel(SizeKind.Pants, t) || size
    : size;
};

export function AdminSellerOrders() {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.adminOrders());
  const { isRTL, currentLocale } = useLanguageContext();
  const [selectedStatus, setSelectedStatus] = useState<
    KickzoneGraphqlTypes.OrderStatus | undefined
  >(undefined);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<KickzoneGraphqlTypes.OrderStatus>(
    KickzoneGraphqlTypes.OrderStatus.Pending
  );

  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
    updateOrderStatus,
    updateStatusLoading,
  } = useAdminsOrders({
    first: 100,
    status: selectedStatus,
  });

  const { loading: sellersLoading } = useAdminsSellers();

  const handleStatusChange = useCallback((order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setStatusDialogOpen(true);
  }, []);

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) return;

    try {
      await updateOrderStatus(selectedOrder.id, newStatus);
      setStatusDialogOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Filter orders by seller if seller filter is applied
  const filteredOrders = useMemo(() => {
    if (!selectedSellerId) return orders;
    return orders.filter(
      (order: Order) => order.sellerId === parseInt(selectedSellerId, 10)
    );
  }, [orders, selectedSellerId]);

  const columns: MRT_ColumnDef<Order>[] = useMemo(() => {
    const dataColumns: MRT_ColumnDef<Order>[] = [
      {
        accessorKey: 'orderNumber',
        header: LL.orders.orderNumber(),
        size: 100,
        Cell: ({ cell }) => `#${cell.getValue<string>()}`,
      },
      {
        accessorKey: 'trackingNumber',
        header: LL.orders.tracking(),
        size: 150,
        Cell: ({ cell }) => (
          <Box
            sx={{
              fontFamily: 'monospace',
              fontWeight: 600,
              color: 'primary.main',
            }}
          >
            {cell.getValue<string>() || 'N/A'}
          </Box>
        ),
      },
      {
        accessorKey: 'customerName',
        header: LL.orders.customer(),
        size: 150,
        Cell: ({ cell }) => cell.getValue<string>(),
      },
      {
        accessorKey: 'customerEmail',
        header: LL.orders.email(),
        size: 200,
        Cell: ({ cell }) => cell.getValue<string>(),
      },
      {
        accessorKey: 'status',
        header: LL.form.status(),
        size: 120,
        Cell: ({ cell }) => (
          <OrderStatusChip status={cell.getValue<string>()} size="small" />
        ),
        filterFn: 'equals',
      },
      {
        accessorKey: 'total',
        header: LL.checkout.total(),
        size: 100,
        Cell: ({ cell }) => `$${cell.getValue<number>().toFixed(2)}`,
      },
      {
        accessorKey: 'createdAt',
        header: LL.orders.orderDate(),
        size: 150,
        Cell: ({ cell }) => formatDate(cell.getValue<string>()),
        sortingFn: 'datetime',
      },
    ];

    const actionsColumn: MRT_ColumnDef<Order> = {
      id: 'actions',
      header: LL.orders.actions(),
      size: 120,
      Cell: ({ row }) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: isRTL ? 'flex-end' : 'flex-start',
          }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleStatusChange(row.original)}
          >
            {LL.orders.changeStatus()}
          </Button>
        </Box>
      ),
    };

    // For RTL languages, put actions column last (right side)
    // For LTR languages, put actions column last (right side) as well
    return [...dataColumns, actionsColumn];
  }, [LL, handleStatusChange, isRTL]);

  if (ordersError) {
    return (
      <AdminsLayout>
        <Alert severity="error">
          {LL.orders.errorLoadingOrders()}: {ordersError.message}
        </Alert>
      </AdminsLayout>
    );
  }

  return (
    <AdminsLayout>
      <GlassmorphismContainer fullHeight>
        <Box style={{ direction: currentLocale === 'fa' ? 'rtl' : 'ltr' }}>
          <Typography
            variant="h4"
            gutterBottom
            style={{
              textAlign: currentLocale === 'fa' ? 'right' : 'left',
              direction: currentLocale === 'fa' ? 'rtl' : 'ltr',
            }}
          >
            {LL.orders.allSellerOrders()}
          </Typography>
        </Box>

        <DataTable
          columns={columns}
          data={filteredOrders}
          loading={ordersLoading || sellersLoading}
          error={ordersError}
          config={{
            preset: 'orders',
            renderDetailPanel: ({ row }) => (
              <Box
                sx={{
                  p: 3,
                  bgcolor: 'background.default',
                  direction: isRTL ? 'rtl' : 'ltr',
                  width: '100%',
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    textAlign: isRTL ? 'right' : 'left',
                    mb: 3,
                    fontWeight: 600,
                  }}
                >
                  {LL.orders.orderDetails()}
                </Typography>

                <Grid container spacing={3} sx={{ mb: 3 }}>
                  {/* Customer Information */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{
                          textAlign: isRTL ? 'right' : 'left',
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        {LL.orders.customerInformation()}
                      </Typography>
                      <Divider />
                      <Stack
                        spacing={1.5}
                        sx={{ direction: isRTL ? 'rtl' : 'ltr' }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            gap: 1,
                            alignItems: 'flex-start',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              minWidth: isRTL ? 'auto' : 100,
                              textAlign: isRTL ? 'right' : 'left',
                            }}
                          >
                            {isRTL
                              ? `: ${LL.form.fullName()}`
                              : `${LL.form.fullName()}:`}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textAlign: isRTL ? 'right' : 'left',
                              flex: 1,
                            }}
                          >
                            {row.original.customerName}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            gap: 1,
                            alignItems: 'flex-start',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              minWidth: isRTL ? 'auto' : 100,
                              textAlign: isRTL ? 'right' : 'left',
                            }}
                          >
                            {isRTL
                              ? `: ${LL.form.email()}`
                              : `${LL.form.email()}:`}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textAlign: isRTL ? 'right' : 'left',
                              flex: 1,
                              wordBreak: 'break-word',
                            }}
                          >
                            {row.original.customerEmail}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            gap: 1,
                            alignItems: 'flex-start',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              minWidth: isRTL ? 'auto' : 100,
                              textAlign: isRTL ? 'right' : 'left',
                            }}
                          >
                            {isRTL
                              ? `: ${LL.form.phone()}`
                              : `${LL.form.phone()}:`}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textAlign: isRTL ? 'right' : 'left',
                              flex: 1,
                            }}
                          >
                            {row.original.customerPhone || 'N/A'}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            gap: 1,
                            alignItems: 'flex-start',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              minWidth: isRTL ? 'auto' : 100,
                              textAlign: isRTL ? 'right' : 'left',
                            }}
                          >
                            {isRTL
                              ? `: ${LL.form.address()}`
                              : `${LL.form.address()}:`}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textAlign: isRTL ? 'right' : 'left',
                              flex: 1,
                            }}
                          >
                            {row.original.shippingAddress}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            gap: 1,
                            alignItems: 'flex-start',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              minWidth: isRTL ? 'auto' : 100,
                              textAlign: isRTL ? 'right' : 'left',
                            }}
                          >
                            {isRTL
                              ? `: ${LL.form.city()}`
                              : `${LL.form.city()}:`}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textAlign: isRTL ? 'right' : 'left',
                              flex: 1,
                            }}
                          >
                            {row.original.city}, {row.original.state}{' '}
                            {row.original.zipCode}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            gap: 1,
                            alignItems: 'flex-start',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              minWidth: isRTL ? 'auto' : 100,
                              textAlign: isRTL ? 'right' : 'left',
                            }}
                          >
                            {isRTL
                              ? `: ${LL.form.country()}`
                              : `${LL.form.country()}:`}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textAlign: isRTL ? 'right' : 'left',
                              flex: 1,
                            }}
                          >
                            {row.original.country}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>

                  {/* Order Summary */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{
                          textAlign: isRTL ? 'right' : 'left',
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        {LL.orders.orderSummary()}
                      </Typography>
                      <Divider />
                      <Stack
                        spacing={1.5}
                        sx={{ direction: isRTL ? 'rtl' : 'ltr' }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 2,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              textAlign: isRTL ? 'right' : 'left',
                            }}
                          >
                            {isRTL
                              ? `: ${LL.checkout.subtotal()}`
                              : `${LL.checkout.subtotal()}:`}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textAlign: isRTL ? 'left' : 'right',
                            }}
                          >
                            <PriceDisplay
                              priceInUSD={row.original.subtotal}
                              showSymbol={true}
                              showOriginal={false}
                            />
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 2,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              textAlign: isRTL ? 'right' : 'left',
                            }}
                          >
                            {isRTL
                              ? `: ${LL.checkout.shipping()}`
                              : `${LL.checkout.shipping()}:`}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textAlign: isRTL ? 'left' : 'right',
                            }}
                          >
                            <PriceDisplay
                              priceInUSD={row.original.shippingCost}
                              showSymbol={true}
                              showOriginal={false}
                            />
                          </Typography>
                        </Box>
                        <Divider />
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 2,
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 700,
                              textAlign: isRTL ? 'right' : 'left',
                            }}
                          >
                            {isRTL
                              ? `: ${LL.checkout.total()}`
                              : `${LL.checkout.total()}:`}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 700,
                              textAlign: isRTL ? 'left' : 'right',
                              color: 'primary.main',
                            }}
                          >
                            <PriceDisplay
                              priceInUSD={row.original.total}
                              showSymbol={true}
                              showOriginal={false}
                            />
                          </Typography>
                        </Box>
                        {row.original.notes && (
                          <>
                            <Divider />
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: isRTL ? 'row-reverse' : 'row',
                                gap: 1,
                                alignItems: 'flex-start',
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 600,
                                  minWidth: isRTL ? 'auto' : 100,
                                  textAlign: isRTL ? 'right' : 'left',
                                }}
                              >
                                {isRTL
                                  ? `: ${LL.form.notes()}`
                                  : `${LL.form.notes()}:`}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  textAlign: isRTL ? 'right' : 'left',
                                  flex: 1,
                                  whiteSpace: 'pre-wrap',
                                  wordBreak: 'break-word',
                                }}
                              >
                                {row.original.notes}
                              </Typography>
                            </Box>
                          </>
                        )}
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>

                {/* Order Items */}
                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{
                      textAlign: isRTL ? 'right' : 'left',
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {LL.orders.orderItems()}
                  </Typography>
                  <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{
                      maxHeight: 300,
                      direction: isRTL ? 'rtl' : 'ltr',
                    }}
                  >
                    <Table stickyHeader size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              textAlign: isRTL ? 'right' : 'left',
                              fontWeight: 600,
                            }}
                          >
                            {LL.table.product()}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: 'center',
                              fontWeight: 600,
                            }}
                          >
                            {LL.table.quantity()}
                          </TableCell>
                          {(row.original.items[0]?.color ||
                            row.original.items[0]?.size) && (
                            <TableCell
                              sx={{
                                textAlign: isRTL ? 'right' : 'left',
                                fontWeight: 600,
                              }}
                            >
                              {LL.products.variant()}
                            </TableCell>
                          )}
                          <TableCell
                            sx={{
                              textAlign: isRTL ? 'left' : 'right',
                              fontWeight: 600,
                            }}
                          >
                            {LL.table.unitPrice()}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: isRTL ? 'left' : 'right',
                              fontWeight: 600,
                            }}
                          >
                            {LL.table.total()}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.original.items.map(
                          (
                            item: KickzoneGraphqlTypes.OrderItem,
                            index: number
                          ) => (
                            <TableRow key={index} hover>
                              <TableCell
                                sx={{
                                  textAlign: isRTL ? 'right' : 'left',
                                }}
                              >
                                <Typography variant="body2" fontWeight="medium">
                                  {item.productName}
                                </Typography>
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: 'center',
                                }}
                              >
                                {item.quantity}
                              </TableCell>
                              {(item.color || item.size) && (
                                <TableCell
                                  sx={{
                                    textAlign: isRTL ? 'right' : 'left',
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {[item.color, displayItemSize(item.size)]
                                      .filter(Boolean)
                                      .join(' - ')}
                                  </Typography>
                                </TableCell>
                              )}
                              <TableCell
                                sx={{
                                  textAlign: isRTL ? 'left' : 'right',
                                }}
                              >
                                <PriceDisplay
                                  priceInUSD={item.unitPrice}
                                  showSymbol={true}
                                  showOriginal={false}
                                />
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: isRTL ? 'left' : 'right',
                                  fontWeight: 600,
                                }}
                              >
                                <PriceDisplay
                                  priceInUSD={item.totalPrice}
                                  showSymbol={true}
                                  showOriginal={false}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            ),
          }}
        />

        {/* Status Change Dialog */}
        <Dialog
          open={statusDialogOpen}
          onClose={() => setStatusDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{LL.orders.changeOrderStatus()}</DialogTitle>
          <DialogFormContent>
            <FormControl fullWidth>
              <InputLabel>{LL.form.newStatus()}</InputLabel>
              <Select
                value={newStatus}
                onChange={(e) =>
                  setNewStatus(
                    e.target.value as KickzoneGraphqlTypes.OrderStatus
                  )
                }
                label={LL.form.newStatus()}
              >
                <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Pending}>
                  {LL.orders.pending()}
                </MenuItem>
                <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Confirmed}>
                  {LL.orders.confirmed()}
                </MenuItem>
                <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Processing}>
                  {LL.orders.processing()}
                </MenuItem>
                <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Shipped}>
                  {LL.orders.shipped()}
                </MenuItem>
                <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Delivered}>
                  {LL.orders.delivered()}
                </MenuItem>
                <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Cancelled}>
                  {LL.orders.cancelled()}
                </MenuItem>
                <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Refunded}>
                  {LL.orders.refunded()}
                </MenuItem>
              </Select>
            </FormControl>
          </DialogFormContent>
          <DialogActions>
            <Button
              onClick={() => setStatusDialogOpen(false)}
              disabled={updateStatusLoading}
            >
              {LL.button.cancel()}
            </Button>
            <Button
              variant="contained"
              onClick={handleUpdateStatus}
              loading={updateStatusLoading}
            >
              {LL.button.updateStatus()}
            </Button>
          </DialogActions>
        </Dialog>
      </GlassmorphismContainer>
    </AdminsLayout>
  );
}

export default AdminSellerOrders;
