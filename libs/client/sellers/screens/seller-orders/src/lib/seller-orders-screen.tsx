import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ExpandMore, Edit, Save, Cancel } from '@mui/icons-material';
import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import { useSellerOrders } from '@kickzone-workspace/sellers-hooks-orders';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

const getStatusColor = (
  status: KickzoneGraphqlTypes.OrderStatus
):
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning' => {
  switch (status) {
    case KickzoneGraphqlTypes.OrderStatus.Pending:
      return 'warning';
    case KickzoneGraphqlTypes.OrderStatus.Confirmed:
      return 'info';
    case KickzoneGraphqlTypes.OrderStatus.Processing:
      return 'primary';
    case KickzoneGraphqlTypes.OrderStatus.Shipped:
      return 'secondary';
    case KickzoneGraphqlTypes.OrderStatus.Delivered:
      return 'success';
    case KickzoneGraphqlTypes.OrderStatus.Cancelled:
      return 'error';
    case KickzoneGraphqlTypes.OrderStatus.Refunded:
      return 'default';
    default:
      return 'default';
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function SellerOrdersScreen() {
  const [expandedOrder, setExpandedOrder] = useState<string | false>(false);
  const [selectedStatus, setSelectedStatus] = useState<
    KickzoneGraphqlTypes.OrderStatus | undefined
  >(undefined);
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState('');
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
    updateTrackingNumber,
  } = useSellerOrders({
    first: 50,
    status: selectedStatus,
  });

  const handleExpandOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? false : orderId);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(
      (status as KickzoneGraphqlTypes.OrderStatus) || undefined
    );
  };

  const handleEditOrder = (orderId: string, currentTrackingNumber: string) => {
    setEditingOrder(orderId);
    setTrackingNumber(currentTrackingNumber || '');
  };

  const handleSaveTracking = async (orderId: string) => {
    try {
      await updateTrackingNumber(orderId, trackingNumber);
      setEditingOrder(null);
      setTrackingNumber('');
    } catch (error) {
      console.error('Error updating tracking number:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
    setTrackingNumber('');
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

  if (ordersLoading) {
    return (
      <SellersLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </SellersLayout>
    );
  }

  if (ordersError) {
    return (
      <SellersLayout>
        <Alert severity="error">
          Error loading orders: {ordersError.message}
        </Alert>
      </SellersLayout>
    );
  }

  return (
    <SellersLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Orders
        </Typography>

        {/* Status Filter */}
        <Box sx={{ mb: 3 }}>
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
        </Box>

        {orders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No orders found
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {orders.map((order: KickzoneGraphqlTypes.Order) => (
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
                        <Chip
                          label={order.status}
                          color={getStatusColor(order.status)}
                          size="small"
                        />
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
                            {editingOrder === order.id ? (
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                }}
                              >
                                <TextField
                                  size="small"
                                  value={trackingNumber}
                                  onChange={(e) =>
                                    setTrackingNumber(e.target.value)
                                  }
                                  placeholder="Enter tracking number"
                                />
                                <Button
                                  size="small"
                                  startIcon={<Save />}
                                  onClick={() => handleSaveTracking(order.id)}
                                >
                                  Save
                                </Button>
                                <Button
                                  size="small"
                                  startIcon={<Cancel />}
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </Button>
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                }}
                              >
                                <Typography variant="body2">
                                  {order.trackingNumber || 'Not set'}
                                </Typography>
                                <Button
                                  size="small"
                                  startIcon={<Edit />}
                                  onClick={() =>
                                    handleEditOrder(
                                      order.id,
                                      order.trackingNumber || ''
                                    )
                                  }
                                >
                                  Edit
                                </Button>
                              </Box>
                            )}
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
    </SellersLayout>
  );
}

export default SellerOrdersScreen;
