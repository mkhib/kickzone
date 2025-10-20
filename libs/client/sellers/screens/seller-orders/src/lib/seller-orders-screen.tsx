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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ExpandMore } from '@mui/icons-material';
import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import { useSellerOrders } from '@kickzone-workspace/orders-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  useI18nContext,
  useLanguageContext,
} from '@kickzone-workspace/shared-i18n';

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

export function SellerOrdersScreen() {
  const { LL } = useI18nContext();
  const { currentLocale, formatNumber } = useLanguageContext();

  const [expandedOrder, setExpandedOrder] = useState<string | false>(false);
  const [selectedStatus, setSelectedStatus] = useState<
    KickzoneGraphqlTypes.OrderStatus | undefined
  >(undefined);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<KickzoneGraphqlTypes.OrderStatus>(
    KickzoneGraphqlTypes.OrderStatus.Pending
  );

  // Translate order status
  const getStatusLabel = (status: KickzoneGraphqlTypes.OrderStatus): string => {
    switch (status) {
      case KickzoneGraphqlTypes.OrderStatus.Pending:
        return LL.orders.pending();
      case KickzoneGraphqlTypes.OrderStatus.Confirmed:
        return LL.orders.confirmed();
      case KickzoneGraphqlTypes.OrderStatus.Processing:
        return LL.orders.processing();
      case KickzoneGraphqlTypes.OrderStatus.Shipped:
        return LL.orders.shipped();
      case KickzoneGraphqlTypes.OrderStatus.Delivered:
        return LL.orders.delivered();
      case KickzoneGraphqlTypes.OrderStatus.Cancelled:
        return LL.orders.cancelled();
      case KickzoneGraphqlTypes.OrderStatus.Refunded:
        return LL.orders.refunded();
      default:
        return status;
    }
  };

  // Format date according to locale
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(currentLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
    updateOrderStatus,
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
          {LL.orders.errorLoadingOrders()}: {ordersError.message}
        </Alert>
      </SellersLayout>
    );
  }

  return (
    <SellersLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {LL.orders.myOrders()}
        </Typography>

        {/* Status Filter */}
        <Box sx={{ mb: 3 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>{LL.button.filterByStatus()}</InputLabel>
            <Select
              value={selectedStatus || ''}
              onChange={(e) => handleStatusFilter(e.target.value)}
              label={LL.button.filterByStatus()}
            >
              <MenuItem value="">{LL.table.allOrders()}</MenuItem>
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
        </Box>

        {orders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              {LL.orders.noOrdersFound()}
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
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      sx={{ width: '100%', pr: 2 }}
                    >
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontSize: { xs: '0.95rem', sm: '1.1rem' } }}
                          noWrap
                        >
                          {LL.orders.orderNumber()} #
                          {formatNumber(order.orderNumber)}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                        <Chip
                          label={getStatusLabel(order.status)}
                          color={getStatusColor(order.status)}
                          size="small"
                          sx={{ maxWidth: '100%', fontSize: '0.75rem' }}
                        />
                      </Grid>
                      <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                          noWrap
                        >
                          {formatDate(order.createdAt)}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 6, sm: 6, md: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontSize: { xs: '0.95rem', sm: '1.1rem' } }}
                          noWrap
                        >
                          ${formatNumber(order.total.toFixed(2))}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 6, sm: 6, md: 3 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                          noWrap
                        >
                          {formatNumber(order.items.length)}{' '}
                          {order.items.length !== 1
                            ? LL.orders.items()
                            : LL.orders.item()}
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
                            {LL.orders.customerInformation()}
                          </Typography>
                          <Typography variant="body2">
                            <strong>{LL.form.fullName()}:</strong>{' '}
                            {order.customerName}
                          </Typography>
                          <Typography variant="body2">
                            <strong>{LL.form.email()}:</strong>{' '}
                            {order.customerEmail}
                          </Typography>
                          <Typography variant="body2">
                            <strong>{LL.form.phone()}:</strong>{' '}
                            {order.customerPhone}
                          </Typography>
                          <Typography variant="body2">
                            <strong>{LL.form.address()}:</strong>{' '}
                            {order.shippingAddress}
                          </Typography>
                          <Typography variant="body2">
                            {order.city}, {order.state}{' '}
                            {formatNumber(order.zipCode)}
                          </Typography>
                          <Typography variant="body2">
                            {order.country}
                          </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                          <Typography variant="h6" gutterBottom>
                            {LL.orders.orderManagement()}
                          </Typography>

                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" gutterBottom>
                              <strong>{LL.form.status()}:</strong>{' '}
                              {getStatusLabel(order.status)}
                            </Typography>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleStatusChange(order.id)}
                              sx={{ mr: 1 }}
                            >
                              {LL.orders.changeStatus()}
                            </Button>
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" gutterBottom>
                              <strong>{LL.orders.trackingNumber()}:</strong>
                            </Typography>
                            <Box
                              sx={{
                                p: 1.5,
                                bgcolor: 'grey.100',
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'grey.300',
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  fontFamily: 'monospace',
                                  fontWeight: 600,
                                  letterSpacing: 1,
                                }}
                              >
                                {order.trackingNumber || LL.orders.notSet()}
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
                            <Typography>{LL.checkout.subtotal()}:</Typography>
                            <Typography>
                              ${formatNumber(order.subtotal.toFixed(2))}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                            }}
                          >
                            <Typography>{LL.checkout.shipping()}:</Typography>
                            <Typography>
                              ${formatNumber(order.shippingCost.toFixed(2))}
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
                            <Typography variant="h6">
                              {LL.checkout.total()}:
                            </Typography>
                            <Typography variant="h6">
                              ${formatNumber(order.total.toFixed(2))}
                            </Typography>
                          </Box>
                          {order.notes && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="body2">
                                <strong>{LL.orders.customerNotes()}:</strong>{' '}
                                {order.notes}
                              </Typography>
                            </Box>
                          )}
                        </Grid>
                      </Grid>

                      {/* Order Items */}
                      <Typography variant="h6" gutterBottom>
                        {LL.orders.orderItems()}
                      </Typography>
                      <TableContainer component={Paper} variant="outlined">
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>{LL.table.product()}</TableCell>
                              <TableCell>{LL.table.quantity()}</TableCell>
                              <TableCell>{LL.table.unitPrice()}</TableCell>
                              <TableCell>{LL.table.total()}</TableCell>
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
                                  <TableCell>
                                    {formatNumber(item.quantity)}
                                  </TableCell>
                                  <TableCell>
                                    ${formatNumber(item.unitPrice.toFixed(2))}
                                  </TableCell>
                                  <TableCell>
                                    ${formatNumber(item.totalPrice.toFixed(2))}
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
      </Box>
    </SellersLayout>
  );
}

export default SellerOrdersScreen;
