import React, { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
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
import ExpandMore from '@mui/icons-material/ExpandMore';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { GET_MY_ORDERS_QUERY } from '@kickzone-workspace/customers-graphql';
import {
  useI18nContext,
  useLanguageContext,
} from '@kickzone-workspace/shared-i18n';
import { PriceDisplay } from '@kickzone-workspace/price-display';
import { OrderStatusChip } from '@kickzone-workspace/order-status-chip';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';

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

export function CustomerOrders() {
  const { LL } = useI18nContext();
  const { currentLocale } = useLanguageContext();
  const [expandedOrder, setExpandedOrder] = useState<string | false>(false);

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
          {LL.orders.errorLoadingOrders()}: {ordersError.message}
        </Alert>
      </CustomersLayout>
    );
  }

  const orders = ordersData?.myOrders || [];

  return (
    <CustomersLayout>
      <GlassmorphismContainer fullHeight>
        <Typography variant="h4" gutterBottom>
          {LL.orders.myOrders()}
        </Typography>

        {orders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              {LL.orders.noOrdersFound()}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              href={CUSTOMER_ROUTES.HOME}
            >
              {LL.checkout.continueShopping()}
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
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          {LL.orders.trackingNumber()}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: 1,
                          }}
                        >
                          {order.trackingNumber || LL.orders.notSet()}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <OrderStatusChip status={order.status} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(order.createdAt)}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography variant="h6">
                          <PriceDisplay
                            priceInUSD={order.total}
                            showSymbol={true}
                            showOriginal={false}
                          />
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          {order.items.length}{' '}
                          {order.items.length === 1
                            ? LL.orders.item()
                            : LL.orders.items()}
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
                            {LL.orderConfirmation.shippingAddress()}
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
                            {LL.orderConfirmation.orderSummary()}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                            }}
                          >
                            <Typography>{LL.checkout.subtotal()}:</Typography>
                            <Typography>
                              <PriceDisplay
                                priceInUSD={order.subtotal}
                                showSymbol={true}
                                showOriginal={false}
                              />
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
                              <PriceDisplay
                                priceInUSD={order.shippingCost}
                                showSymbol={true}
                                showOriginal={false}
                              />
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
                              <PriceDisplay
                                priceInUSD={order.total}
                                showSymbol={true}
                                showOriginal={false}
                              />
                            </Typography>
                          </Box>
                          {order.notes && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="body2">
                                <strong>{LL.form.notes()}:</strong>{' '}
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
                                  <PriceDisplay
                                    priceInUSD={item.unitPrice}
                                    showSymbol={true}
                                    showOriginal={false}
                                  />
                                </TableCell>
                                <TableCell>
                                  <PriceDisplay
                                    priceInUSD={item.totalPrice}
                                    showSymbol={true}
                                    showOriginal={false}
                                  />
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
      </GlassmorphismContainer>
    </CustomersLayout>
  );
}

export default CustomerOrders;
