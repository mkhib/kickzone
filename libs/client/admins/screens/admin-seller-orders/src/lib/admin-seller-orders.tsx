import React, { useMemo, useState } from 'react';
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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FilterList from '@mui/icons-material/FilterList';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import {
  useAdminsOrders,
  useAdminsSellers,
} from '@kickzone-workspace/admins-orders-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { OrderStatusChip } from '@kickzone-workspace/order-status-chip';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

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

  const { sellers, loading: sellersLoading } = useAdminsSellers();

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(
      (status as KickzoneGraphqlTypes.OrderStatus) || undefined
    );
  };

  const handleSellerFilter = (sellerId: string | null) => {
    setSelectedSellerId(sellerId);
  };

  const handleStatusChange = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setStatusDialogOpen(true);
  };

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

  const columns: MRT_ColumnDef<Order>[] = [
    {
      accessorKey: 'orderNumber',
      header: 'Order #',
      size: 100,
      Cell: ({ cell }) => `#${cell.getValue<string>()}`,
    },
    {
      accessorKey: 'trackingNumber',
      header: 'Tracking',
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
      header: 'Customer',
      size: 150,
    },
    {
      accessorKey: 'customerEmail',
      header: 'Email',
      size: 200,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 120,
      Cell: ({ cell }) => (
        <OrderStatusChip status={cell.getValue<string>()} size="small" />
      ),
      filterFn: 'equals',
    },
    {
      accessorKey: 'total',
      header: 'Total',
      size: 100,
      Cell: ({ cell }) => `$${cell.getValue<number>().toFixed(2)}`,
    },
    {
      accessorKey: 'createdAt',
      header: 'Order Date',
      size: 150,
      Cell: ({ cell }) => formatDate(cell.getValue<string>()),
      sortingFn: 'datetime',
    },
    {
      id: 'actions',
      header: 'Actions',
      size: 120,
      Cell: ({ row }) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleStatusChange(row.original)}
        >
          Change Status
        </Button>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: filteredOrders,
    enableRowSelection: false,
    enableColumnOrdering: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      density: 'compact',
    },
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      },
    }),
    renderDetailPanel: ({ row }) => (
      <Box sx={{ p: 2, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          Order Details
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
            <Typography variant="subtitle2" color="text.secondary">
              Customer Information
            </Typography>
            <Typography variant="body2">
              <strong>Name:</strong> {row.original.customerName}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> {row.original.customerEmail}
            </Typography>
            <Typography variant="body2">
              <strong>Phone:</strong> {row.original.customerPhone}
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> {row.original.shippingAddress}
            </Typography>
            <Typography variant="body2">
              {row.original.city}, {row.original.state} {row.original.zipCode}
            </Typography>
            <Typography variant="body2">{row.original.country}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Order Summary
            </Typography>
            <Typography variant="body2">
              <strong>Subtotal:</strong> ${row.original.subtotal.toFixed(2)}
            </Typography>
            <Typography variant="body2">
              <strong>Shipping:</strong> ${row.original.shippingCost.toFixed(2)}
            </Typography>
            <Typography variant="body2">
              <strong>Total:</strong> ${row.original.total.toFixed(2)}
            </Typography>
            {row.original.notes && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Notes:</strong> {row.original.notes}
              </Typography>
            )}
          </Box>
        </Box>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Order Items ({row.original.items.length})
        </Typography>
        {row.original.items.map((item: KickzoneGraphqlTypes.OrderItem) => (
          <Box
            key={item.id}
            sx={{ display: 'flex', gap: 2, mb: 1, alignItems: 'center' }}
          >
            {item.productImage && (
              <Box
                component="img"
                src={item.productImage}
                alt={item.productName}
                sx={{
                  width: 40,
                  height: 40,
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />
            )}
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight="medium">
                {item.productName}
              </Typography>
              {(item.color || item.size) && (
                <Typography variant="caption" color="text.secondary">
                  {[item.color, item.size].filter(Boolean).join(' - ')}
                </Typography>
              )}
            </Box>
            <Typography variant="body2">Qty: {item.quantity}</Typography>
            <Typography variant="body2" fontWeight="medium">
              ${item.totalPrice.toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={selectedStatus || ''}
            onChange={(e) => handleStatusFilter(e.target.value)}
            label="Filter by Status"
            size="small"
          >
            <MenuItem value="">All Orders</MenuItem>
            <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Pending}>
              Pending
            </MenuItem>
            <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Confirmed}>
              Confirmed
            </MenuItem>
            <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Processing}>
              Processing
            </MenuItem>
            <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Shipped}>
              Shipped
            </MenuItem>
            <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Delivered}>
              Delivered
            </MenuItem>
            <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Cancelled}>
              Cancelled
            </MenuItem>
            <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Refunded}>
              Refunded
            </MenuItem>
          </Select>
        </FormControl>

        <Autocomplete<KickzoneGraphqlTypes.SellerInfo>
          sx={{ minWidth: 300 }}
          options={sellers}
          size="small"
          getOptionLabel={(seller) =>
            `${seller.storeName} (${seller.user.email})`
          }
          value={
            sellers.find((s) => s.id.toString() === selectedSellerId) || null
          }
          onChange={(_, newValue) => {
            handleSellerFilter(newValue ? newValue.id.toString() : null);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter by Seller"
              slotProps={{
                input: {
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <FilterList sx={{ ml: 1, color: 'text.secondary' }} />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                },
              }}
            />
          )}
        />
      </Box>
    ),
    state: {
      isLoading: ordersLoading || sellersLoading,
    },
  });

  if (ordersError) {
    return (
      <AdminsLayout>
        <Alert severity="error">
          Error loading orders: {ordersError.message}
        </Alert>
      </AdminsLayout>
    );
  }

  return (
    <AdminsLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          All Seller Orders
        </Typography>

        <MaterialReactTable table={table} />

        {/* Status Change Dialog */}
        <Dialog
          open={statusDialogOpen}
          onClose={() => setStatusDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Change Order Status</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>New Status</InputLabel>
              <Select
                value={newStatus}
                onChange={(e) =>
                  setNewStatus(
                    e.target.value as KickzoneGraphqlTypes.OrderStatus
                  )
                }
                label="New Status"
              >
                <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Pending}>
                  Pending
                </MenuItem>
                <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Confirmed}>
                  Confirmed
                </MenuItem>
                <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Processing}>
                  Processing
                </MenuItem>
                <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Shipped}>
                  Shipped
                </MenuItem>
                <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Delivered}>
                  Delivered
                </MenuItem>
                <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Cancelled}>
                  Cancelled
                </MenuItem>
                <MenuItem value={KickzoneGraphqlTypes.OrderStatus.Refunded}>
                  Refunded
                </MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleUpdateStatus}>
              Update Status
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminsLayout>
  );
}

export default AdminSellerOrders;
