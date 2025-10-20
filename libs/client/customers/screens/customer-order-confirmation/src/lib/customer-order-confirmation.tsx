import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import CheckCircle from '@mui/icons-material/CheckCircle';
import LocalShipping from '@mui/icons-material/LocalShipping';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import Receipt from '@mui/icons-material/Receipt';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { PriceDisplay } from '@kickzone-workspace/price-display';

interface OrderItem {
  productId: string;
  productName: string;
  productImage?: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  color?: string | null;
  size?: string | null;
}

interface OrderData {
  id: string;
  orderNumber: string;
  trackingNumber: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  shippingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  items: OrderItem[];
  notes?: string | null;
  createdAt: string;
}

export function CustomerOrderConfirmation() {
  const { LL } = useI18nContext();
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData as OrderData | undefined;

  // If no order data, redirect to home
  React.useEffect(() => {
    if (!orderData) {
      navigate(CUSTOMER_ROUTES.HOME);
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  return (
    <CustomersLayout>
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        {/* Success Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 4,
            p: 4,
            bgcolor: 'success.50',
            borderRadius: 2,
          }}
        >
          <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {LL.orderConfirmation.title()}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {LL.orderConfirmation.thankYouMessage()}
          </Typography>

          {/* Tracking Number - Prominently Displayed */}
          <Box
            sx={{
              display: 'inline-block',
              p: 3,
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: 3,
              border: '3px solid',
              borderColor: 'primary.main',
              mt: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <LocalShipping sx={{ color: 'primary.main', fontSize: 28 }} />
              <Typography variant="h6" fontWeight="bold">
                {LL.orders.trackingNumber()}
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 800,
                letterSpacing: 2,
                color: 'primary.main',
              }}
            >
              {orderData.trackingNumber}
            </Typography>
          </Box>
        </Box>

        {/* Order Summary Card */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Receipt sx={{ color: 'primary.main' }} />
              <Typography variant="h6" fontWeight="bold">
                {LL.orderConfirmation.orderSummary()}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">
                {LL.form.email()}
              </Typography>
              <Typography variant="body1">{orderData.customerEmail}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Order Items */}
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              {LL.orders.orderItems()}
            </Typography>

            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{LL.table.product()}</TableCell>
                    <TableCell align="right">{LL.table.quantity()}</TableCell>
                    <TableCell align="right">{LL.table.unitPrice()}</TableCell>
                    <TableCell align="right">{LL.table.total()}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderData.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
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
                            <Typography variant="body2" fontWeight="medium">
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
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">
                        <PriceDisplay
                          priceInUSD={item.unitPrice}
                          showSymbol={true}
                          showOriginal={false}
                        />
                      </TableCell>
                      <TableCell align="right">
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

            {/* Totals */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ width: { xs: '100%', sm: 300 } }}>
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
                      priceInUSD={orderData.subtotal}
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
                      priceInUSD={orderData.shippingCost}
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
                  <Typography variant="h6" fontWeight="bold">
                    {LL.checkout.total()}:
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    <PriceDisplay
                      priceInUSD={orderData.total}
                      showSymbol={true}
                      showOriginal={false}
                    />
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Shipping Address Card */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              {LL.orderConfirmation.shippingAddress()}
            </Typography>
            <Typography variant="body2">{orderData.customerName}</Typography>
            <Typography variant="body2">{orderData.shippingAddress}</Typography>
            <Typography variant="body2">
              {orderData.city}, {orderData.state} {orderData.zipCode}
            </Typography>
            <Typography variant="body2">{orderData.country}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {LL.form.phone()}: {orderData.customerPhone}
            </Typography>
          </CardContent>
        </Card>

        {/* Alert Box */}
        <Alert severity="info" sx={{ mb: 3 }}>
          {LL.orderConfirmation.emailConfirmation()}
        </Alert>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<Receipt />}
            onClick={() => navigate(CUSTOMER_ROUTES.ORDERS)}
          >
            {LL.orderConfirmation.viewOrders()}
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<ShoppingBag />}
            onClick={() => navigate(CUSTOMER_ROUTES.HOME)}
          >
            {LL.orderConfirmation.continueShopping()}
          </Button>
        </Box>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerOrderConfirmation;
