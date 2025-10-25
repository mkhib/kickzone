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
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';

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
      <GlassmorphismContainer fullHeight>
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
          {/* Success Header with Liquid Glass Styling */}
          <Box
            sx={{
              textAlign: 'center',
              mb: 4,
              p: 4,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 4,
              background:
                'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(139, 195, 74, 0.1) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(76, 175, 80, 0.1)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)',
                animation: 'shimmer 3s infinite',
              },
              '@keyframes shimmer': {
                '0%': { transform: 'translateX(-100%)' },
                '100%': { transform: 'translateX(100%)' },
              },
            }}
          >
            <CheckCircle
              sx={{
                fontSize: 80,
                color: '#4CAF50',
                mb: 2,
                filter: 'drop-shadow(0 4px 8px rgba(76, 175, 80, 0.3))',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            />
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              {LL.orderConfirmation.title()}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 3,
                fontWeight: 500,
                fontSize: '1.1rem',
              }}
            >
              {LL.orderConfirmation.thankYouMessage()}
            </Typography>

            {/* Tracking Number with Glass Effect */}
            <Box
              sx={{
                display: 'inline-block',
                p: 4,
                position: 'relative',
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(33, 150, 243, 0.2)',
                mt: 2,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(33, 150, 243, 0.3)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 4,
                  padding: '2px',
                  background: 'linear-gradient(135deg, #2196F3, #21CBF3)',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'xor',
                  WebkitMaskComposite: 'xor',
                },
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
                <LocalShipping sx={{ color: '#2196F3', fontSize: 28 }} />
                <Typography variant="h6" fontWeight="bold" color="#2196F3">
                  {LL.orders.trackingNumber()}
                </Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  letterSpacing: 2,
                  color: '#2196F3',
                  textShadow: '0 2px 4px rgba(33, 150, 243, 0.3)',
                }}
              >
                {orderData.trackingNumber}
              </Typography>
            </Box>
          </Box>

          {/* Order Summary Card with Glass Styling */}
          <Card
            sx={{
              mb: 3,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <CardContent>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
              >
                <Receipt
                  sx={{
                    color: '#2196F3',
                    filter: 'drop-shadow(0 2px 4px rgba(33, 150, 243, 0.3))',
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    background:
                      'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {LL.orderConfirmation.orderSummary()}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  {LL.form.email()}
                </Typography>
                <Typography variant="body1">
                  {orderData.customerEmail}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Order Items */}
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                {LL.orders.orderItems()}
              </Typography>

              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ mb: 2 }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{LL.table.product()}</TableCell>
                      <TableCell align="right">{LL.table.quantity()}</TableCell>
                      <TableCell align="right">
                        {LL.table.unitPrice()}
                      </TableCell>
                      <TableCell align="right">{LL.table.total()}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderData.items.map((item, index) => (
                      <TableRow key={index}>
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

          {/* Shipping Address Card with Glass Styling */}
          <Card
            sx={{
              mb: 3,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  mb: 2,
                  background:
                    'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {LL.orderConfirmation.shippingAddress()}
              </Typography>
              <Typography variant="body2">{orderData.customerName}</Typography>
              <Typography variant="body2">
                {orderData.shippingAddress}
              </Typography>
              <Typography variant="body2">
                {orderData.city}, {orderData.state} {orderData.zipCode}
              </Typography>
              <Typography variant="body2">{orderData.country}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {LL.form.phone()}: {orderData.customerPhone}
              </Typography>
            </CardContent>
          </Card>

          {/* Alert Box with Glass Styling */}
          <Alert
            severity="info"
            sx={{
              mb: 3,
              background: 'rgba(33, 150, 243, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(33, 150, 243, 0.2)',
              borderRadius: 3,
              boxShadow: '0 4px 16px rgba(33, 150, 243, 0.1)',
              '& .MuiAlert-icon': {
                color: '#2196F3',
              },
            }}
          >
            {LL.orderConfirmation.emailConfirmation()}
          </Alert>

          {/* Action Buttons with Modern Styling */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'center',
              flexWrap: 'wrap',
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Receipt />}
              onClick={() => navigate(CUSTOMER_ROUTES.ORDERS)}
              sx={{
                borderRadius: 3,
                py: 1.5,
                px: 4,
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(33, 150, 243, 0.35)',
                backgroundImage:
                  'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
                color: '#ffffff',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(33, 150, 243, 0.45)',
                  backgroundImage:
                    'linear-gradient(135deg, #1976D2 0%, #1E88E5 100%)',
                },
              }}
            >
              {LL.orderConfirmation.viewOrders()}
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ShoppingBag />}
              onClick={() => navigate(CUSTOMER_ROUTES.HOME)}
              sx={{
                borderRadius: 3,
                py: 1.5,
                px: 4,
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                border: '2px solid #2196F3',
                color: '#2196F3',
                background: 'rgba(33, 150, 243, 0.05)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  background: 'rgba(33, 150, 243, 0.1)',
                  border: '2px solid #1976D2',
                  color: '#1976D2',
                  boxShadow: '0 8px 25px rgba(33, 150, 243, 0.2)',
                },
              }}
            >
              {LL.orderConfirmation.continueShopping()}
            </Button>
          </Box>
        </Box>
      </GlassmorphismContainer>
    </CustomersLayout>
  );
}

export default CustomerOrderConfirmation;
