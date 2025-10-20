import React, { useState } from 'react';
import { useQuery } from '@apollo/client/react';
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
import { ExpandMore } from '@mui/icons-material';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { GET_MY_ORDERS_QUERY } from '@kickzone-workspace/customers-graphql';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  color: string | null;
  size: string | null;
}

interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  shippingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  status: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  notes: string | null;
  trackingNumber: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

interface OrdersData {
  myOrders: Order[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'CONFIRMED':
      return 'info';
    case 'PROCESSING':
      return 'primary';
    case 'SHIPPED':
      return 'secondary';
    case 'DELIVERED':
      return 'success';
    case 'CANCELLED':
      return 'error';
    case 'REFUNDED':
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

export function CustomerOrders() {
  const { LL } = useI18nContext();
  const [expandedOrder, setExpandedOrder] = useState<string | false>(false);

  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useQuery<OrdersData>(GET_MY_ORDERS_QUERY, {
    variables: { first: 50 },
    fetchPolicy: 'cache-and-network',
  });

  const handleExpandOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? false : orderId);
  };

  if (ordersLoading) {
    return (
      <CustomersLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </CustomersLayout>
    );
  }

  if (ordersError) {
    return (
      <CustomersLayout>
        <Alert severity="error">
          Error loading orders: {ordersError.message}
        </Alert>
      </CustomersLayout>
    );
  }

  const orders = ordersData?.myOrders || [];

  return (
    <CustomersLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Orders
        </Typography>

        {orders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              You haven't placed any orders yet
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }} href="/products">
              Start Shopping
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {orders.map((order) => (
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
                          color={
                            getStatusColor(order.status) as
                              | 'default'
                              | 'primary'
                              | 'secondary'
                              | 'error'
                              | 'info'
                              | 'success'
                              | 'warning'
                          }
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
                            Shipping Information
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
                          {order.trackingNumber && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="body2" gutterBottom>
                                <strong>{LL.orders.trackingNumber()}:</strong>
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
                                  {order.trackingNumber}
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                          <Typography variant="h6" gutterBottom>
                            Order Summary
                          </Typography>
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
                                <strong>Notes:</strong> {order.notes}
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
                            {order.items.map((item) => (
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
                            ))}
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
      </Box>
    </CustomersLayout>
  );
}

export default CustomerOrders;
