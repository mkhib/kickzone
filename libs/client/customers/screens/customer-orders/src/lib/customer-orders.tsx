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
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import { useTheme } from '@mui/material/styles';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { GET_MY_ORDERS_QUERY } from '@kickzone-workspace/customers-graphql';
import {
  useI18nContext,
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';
import { PriceDisplay } from '@kickzone-workspace/price-display';
import { OrderStatusChip } from '@kickzone-workspace/order-status-chip';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

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
  usePageTitle(() => LL.pageTitles.orders());
  const { currentLocale } = useLanguageContext();
  const { user } = useCustomersAuth();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const goldColor = isDark ? '#c5b89a' : '#7c6d48';
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

  // Only fetch orders if user is a customer
  const isCustomer = user?.role === KickzoneGraphqlTypes.UserRole.Customer;

  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useQuery<OrdersData>(GET_MY_ORDERS_QUERY, {
    variables: { first: 50 },
    fetchPolicy: 'cache-and-network',
    skip: !isCustomer, // Skip query if user is not a customer
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

  // Check if user is not a customer
  if (user && !isCustomer) {
    return (
      <CustomersLayout>
        <GlassmorphismContainer fullHeight>
          <Alert severity="error">{LL.orders.onlyForCustomers()}</Alert>
        </GlassmorphismContainer>
      </CustomersLayout>
    );
  }

  if (ordersError) {
    // Check for the specific seller error message
    const isSellerError = ordersError.message.includes(
      'Sellers should use mySellerOrders query instead'
    );

    return (
      <CustomersLayout>
        <GlassmorphismContainer fullHeight>
          <Alert severity="error">
            {isSellerError
              ? LL.orders.onlyForCustomers()
              : `${LL.orders.errorLoadingOrders()}: ${ordersError.message}`}
          </Alert>
        </GlassmorphismContainer>
      </CustomersLayout>
    );
  }

  const orders = ordersData?.myOrders || [];

  return (
    <CustomersLayout>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 3, md: 5 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Ambient liquid lighting glow orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '2%', md: '5%' },
            right: { xs: '-8%', md: '10%' },
            width: { xs: 280, sm: 420, md: 500 },
            height: { xs: 280, sm: 420, md: 500 },
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(197, 184, 154, 0.15) 0%, rgba(197, 184, 154, 0.02) 65%, transparent 70%)'
              : 'radial-gradient(circle, rgba(230, 215, 185, 0.55) 0%, rgba(240, 230, 205, 0.2) 60%, transparent 70%)',
            filter: 'blur(75px)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'floatOrb 15s ease-in-out infinite alternate',
            '@keyframes floatOrb': {
              '0%': { transform: 'translate(0, 0) scale(1)' },
              '100%': { transform: 'translate(-30px, 35px) scale(1.08)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: '5%', md: '10%' },
            left: { xs: '-8%', md: '8%' },
            width: { xs: 260, sm: 400, md: 460 },
            height: { xs: 260, sm: 400, md: 460 },
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(140, 120, 80, 0.12) 0%, rgba(100, 85, 55, 0.02) 65%, transparent 70%)'
              : 'radial-gradient(circle, rgba(245, 230, 215, 0.5) 0%, rgba(240, 220, 200, 0.18) 60%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'floatOrb2 17s ease-in-out infinite alternate',
            '@keyframes floatOrb2': {
              '0%': { transform: 'translate(0, 0) scale(1)' },
              '100%': { transform: 'translate(35px, -25px) scale(1.06)' },
            },
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 1200, mx: 'auto' }}>
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textTransform: 'uppercase',
                letterSpacing: '0.24em',
                fontWeight: 700,
                fontSize: '0.74rem',
                color: goldColor,
                mb: 0.5,
              }}
            >
              SAINTBALA
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.75rem', sm: '2.2rem' },
                color: isDark ? '#f4f4f2' : '#181816',
                letterSpacing: '-0.02em',
              }}
            >
              {LL.orders.myOrders()}
            </Typography>
          </Box>

          {orders.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 6,
                px: 3,
                borderRadius: '28px',
                background: isDark
                  ? 'rgba(26, 26, 24, 0.55)'
                  : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(24px) saturate(190%)',
                WebkitBackdropFilter: 'blur(24px) saturate(190%)',
                border: isDark
                  ? '1px solid rgba(240, 239, 235, 0.1)'
                  : '1px solid rgba(255, 255, 255, 0.95)',
                boxShadow: isDark
                  ? '0 20px 50px -10px rgba(0, 0, 0, 0.5)'
                  : '0 20px 50px -10px rgba(180, 165, 140, 0.18)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isDark
                    ? 'rgba(197, 184, 154, 0.12)'
                    : 'rgba(143, 132, 104, 0.12)',
                  color: goldColor,
                }}
              >
                <ShoppingBagOutlined sx={{ fontSize: 36 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: isDark ? '#f4f4f2' : '#181816' }}
              >
                {LL.orders.noOrdersFound()}
              </Typography>
              <Button
                variant="contained"
                href={CUSTOMER_ROUTES.HOME}
                sx={{
                  mt: 1,
                  borderRadius: '9999px',
                  px: 3.5,
                  py: 1.25,
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(197, 184, 154, 0.96) 0%, rgba(181, 171, 147, 0.94) 100%)'
                    : 'linear-gradient(135deg, #1f1f1d 0%, #121210 100%)',
                  color: isDark ? '#121210' : '#ffffff',
                  boxShadow: isDark
                    ? '0 8px 24px -2px rgba(197, 184, 154, 0.45)'
                    : '0 8px 24px -2px rgba(0, 0, 0, 0.25)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {LL.checkout.continueShopping()}
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {orders.map((order) => (
                <Card
                  key={order.id}
                  sx={{
                    borderRadius: '24px',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    background: isDark
                      ? 'linear-gradient(145deg, rgba(28, 28, 24, 0.78) 0%, rgba(20, 20, 18, 0.82) 100%)'
                      : 'linear-gradient(145deg, rgba(255, 255, 255, 0.92) 0%, rgba(250, 248, 244, 0.82) 100%)',
                    border: isDark
                      ? '1px solid rgba(240, 239, 235, 0.12)'
                      : '1px solid rgba(255, 255, 255, 0.95)',
                    boxShadow: isDark
                      ? '0 16px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)'
                      : '0 14px 34px -10px rgba(180, 165, 140, 0.2), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95)',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <Accordion
                    expanded={expandedOrder === order.id}
                    onChange={() => handleExpandOrder(order.id)}
                    sx={{
                      background: 'transparent',
                      boxShadow: 'none',
                      '&:before': { display: 'none' },
                    }}
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
        </Box>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerOrders;
