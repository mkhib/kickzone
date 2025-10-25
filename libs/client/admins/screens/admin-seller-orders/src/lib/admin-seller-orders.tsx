import React, { useMemo, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import {
  useAdminsOrders,
  useAdminsSellers,
} from '@kickzone-workspace/admins-orders-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { OrderStatusChip } from '@kickzone-workspace/order-status-chip';
import {
  useI18nContext,
  useLanguageContext,
} from '@kickzone-workspace/shared-i18n';
import { DataTable } from '@kickzone-workspace/material-data-table';
import { type MRT_ColumnDef } from 'material-react-table';

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

export function AdminSellerOrders() {
  const { LL } = useI18nContext();
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
                  p: 2,
                  bgcolor: 'background.default',
                  direction: isRTL ? 'rtl' : 'ltr',
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ textAlign: isRTL ? 'right' : 'left' }}
                >
                  {LL.orders.orderDetails()}
                </Typography>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ textAlign: isRTL ? 'right' : 'left' }}
                    >
                      {LL.orders.customerInformation()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>{LL.form.fullName()}:</strong>{' '}
                      {row.original.customerName}
                    </Typography>
                    <Typography variant="body2">
                      <strong>{LL.form.email()}:</strong>{' '}
                      {row.original.customerEmail}
                    </Typography>
                    <Typography variant="body2">
                      <strong>{LL.form.phone()}:</strong>{' '}
                      {row.original.customerPhone}
                    </Typography>
                    <Typography variant="body2">
                      <strong>{LL.form.address()}:</strong>{' '}
                      {row.original.shippingAddress}
                    </Typography>
                    <Typography variant="body2">
                      {row.original.city}, {row.original.state}{' '}
                      {row.original.zipCode}
                    </Typography>
                    <Typography variant="body2">
                      {row.original.country}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ textAlign: isRTL ? 'right' : 'left' }}
                    >
                      {LL.orders.orderSummary()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>{LL.checkout.subtotal()}:</strong> $
                      {row.original.subtotal.toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>{LL.checkout.shipping()}:</strong> $
                      {row.original.shippingCost.toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>{LL.checkout.total()}:</strong> $
                      {row.original.total.toFixed(2)}
                    </Typography>
                    {row.original.notes && (
                      <Typography variant="body2">
                        <strong>{LL.form.notes()}:</strong> {row.original.notes}
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                  sx={{ textAlign: isRTL ? 'right' : 'left' }}
                >
                  {LL.orders.orderItems()}
                </Typography>
                <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                  {row.original.items.map(
                    (item: KickzoneGraphqlTypes.OrderItem, index: number) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          py: 1,
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <Typography variant="body2">
                          {item.productName} ({item.quantity}x)
                        </Typography>
                        <Typography variant="body2">
                          ${item.totalPrice.toFixed(2)}
                        </Typography>
                      </Box>
                    )
                  )}
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
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStatusDialogOpen(false)}>
              {LL.button.cancel()}
            </Button>
            <Button variant="contained" onClick={handleUpdateStatus}>
              {LL.button.updateStatus()}
            </Button>
          </DialogActions>
        </Dialog>
      </GlassmorphismContainer>
    </AdminsLayout>
  );
}

export default AdminSellerOrders;
