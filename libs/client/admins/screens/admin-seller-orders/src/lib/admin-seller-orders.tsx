import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from '@mui/material';
import { ExpandMore, FilterList } from '@mui/icons-material';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import {
  useAdminsOrders,
  useAdminsSellers,
} from '@kickzone-workspace/admins-orders-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { OrderStatusChip } from '@kickzone-workspace/order-status-chip';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function AdminSellerOrders() {
  const [expandedOrder, setExpandedOrder] = useState<string | false>(false);
  const [selectedStatus, setSelectedStatus] = useState<
    KickzoneGraphqlTypes.OrderStatus | undefined
  >(undefined);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<KickzoneGraphqlTypes.OrderStatus>(
    KickzoneGraphqlTypes.OrderStatus.Pending
  );

  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
    updateOrderStatus,
    loadMore,
  } = useAdminsOrders({
    first: 50,
    status: selectedStatus,
  });

  const { sellers, loading: sellersLoading } = useAdminsSellers();

  const handleExpandOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? false : orderId);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(
      (status as KickzoneGraphqlTypes.OrderStatus) || undefined
    );
  };

  const handleSellerFilter = (sellerId: string | null) => {
    setSelectedSellerId(sellerId);
  };

  const handleStatusChange = (orderId: string) => {
    setSelectedOrderId(orderId);
    setStatusDialogOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrderId || !newStatus) return;

    try {
      await updateOrderStatus(selectedOrderId, newStatus);
      setStatusDialogOpen(false);
      setSelectedOrderId(null);
      setNewStatus(KickzoneGraphqlTypes.OrderStatus.Pending);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Filter orders by seller if seller filter is applied
  const filteredOrders = selectedSellerId
    ? orders.filter(
        (order: KickzoneGraphqlTypes.Order) =>
          order.sellerId === parseInt(selectedSellerId, 10)
      )
    : orders;

  if (ordersLoading || sellersLoading) {
    return (
      <AdminsLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </AdminsLayout>
    );
  }

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

        {/* Filters */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={selectedStatus || ''}
              onChange={(e) => handleStatusFilter(e.target.value)}
              label="Filter by Status"
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

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Showing {filteredOrders.length} orders
        </Typography>

        {filteredOrders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No orders found
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredOrders.map((order: KickzoneGraphqlTypes.Order) => (
              <Card key={order.id}>
                <Accordion
                  expanded={expandedOrder === order.id}
                  onChange={() => handleExpandOrder(order.id)}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography variant="h6">
                          Order #{order.orderNumber}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 2 }}>
                        <OrderStatusChip status={order.status} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(order.createdAt)}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 2 }}>
                        <Typography variant="h6">
                          ${order.total.toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          {order.items.length} item
                          {order.items.length !== 1 ? 's' : ''}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Box sx={{ width: '100%' }}>
                      {/* Order Details */}
                      <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Typography variant="h6" gutterBottom>
                            Customer Information
                          </Typography>
                          <Typography variant="body2">
                            <strong>Name:</strong> {order.customerName}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Email:</strong> {order.customerEmail}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Phone:</strong> {order.customerPhone}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Address:</strong> {order.shippingAddress}
                          </Typography>
                          <Typography variant="body2">
                            {order.city}, {order.state} {order.zipCode}
                          </Typography>
                          <Typography variant="body2">
                            {order.country}
                          </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                          <Typography variant="h6" gutterBottom>
                            Order Management
                          </Typography>

                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" gutterBottom>
                              <strong>Status:</strong> {order.status}
                            </Typography>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleStatusChange(order.id)}
                              sx={{ mr: 1 }}
                            >
                              Change Status
                            </Button>
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" gutterBottom>
                              <strong>Tracking Number:</strong>
                            </Typography>
                            <Box
                              sx={{
                                p: 1.5,
                                bgcolor: 'primary.50',
                                borderRadius: 1,
                                border: '2px solid',
                                borderColor: 'primary.main',
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  fontFamily: 'monospace',
                                  fontWeight: 700,
                                  letterSpacing: 1,
                                  color: 'primary.main',
                                }}
                              >
                                {order.trackingNumber || 'Not set'}
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                            }}
                          >
                            <Typography>Subtotal:</Typography>
                            <Typography>
                              ${order.subtotal.toFixed(2)}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                            }}
                          >
                            <Typography>Shipping:</Typography>
                            <Typography>
                              ${order.shippingCost.toFixed(2)}
                            </Typography>
                          </Box>
                          <Divider sx={{ my: 1 }} />
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                            }}
                          >
                            <Typography variant="h6">Total:</Typography>
                            <Typography variant="h6">
                              ${order.total.toFixed(2)}
                            </Typography>
                          </Box>
                          {order.notes && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="body2">
                                <strong>Customer Notes:</strong> {order.notes}
                              </Typography>
                            </Box>
                          )}
                        </Grid>
                      </Grid>

                      {/* Order Items */}
                      <Typography variant="h6" gutterBottom>
                        Order Items
                      </Typography>
                      <TableContainer component={Paper} variant="outlined">
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Product</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Unit Price</TableCell>
                              <TableCell>Total</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.items.map(
                              (item: KickzoneGraphqlTypes.OrderItem) => (
                                <TableRow key={item.id}>
                                  <TableCell>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                      }}
                                    >
                                      {item.productImage && (
                                        <Box
                                          component="img"
                                          src={item.productImage}
                                          alt={item.productName}
                                          sx={{
                                            width: 50,
                                            height: 50,
                                            objectFit: 'cover',
                                            borderRadius: 1,
                                          }}
                                        />
                                      )}
                                      <Box>
                                        <Typography
                                          variant="body2"
                                          fontWeight="medium"
                                        >
                                          {item.productName}
                                        </Typography>
                                        {(item.color || item.size) && (
                                          <Typography
                                            variant="caption"
                                            color="text.secondary"
                                          >
                                            {[item.color, item.size]
                                              .filter(Boolean)
                                              .join(' - ')}
                                          </Typography>
                                        )}
                                      </Box>
                                    </Box>
                                  </TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>
                                    ${item.unitPrice.toFixed(2)}
                                  </TableCell>
                                  <TableCell>
                                    ${item.totalPrice.toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Card>
            ))}
          </Box>
        )}

        {/* Load More Button */}
        {filteredOrders.length > 0 && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button variant="outlined" onClick={loadMore}>
              Load More Orders
            </Button>
          </Box>
        )}

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
