import React from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
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
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import LocalShippingOutlined from '@mui/icons-material/LocalShippingOutlined';
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import ReceiptLongOutlined from '@mui/icons-material/ReceiptLongOutlined';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import PersonAddOutlined from '@mui/icons-material/PersonAddOutlined';
import { useTheme } from '@mui/material/styles';
import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';
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
  usePageTitle(() => LL.pageTitles.orderConfirmation());
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData as OrderData | undefined;
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { user } = useCustomersAuth();

  // If no order data, redirect to home
  React.useEffect(() => {
    if (!orderData) {
      navigate(CUSTOMER_ROUTES.HOME);
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const glassCardSx = {
    borderRadius: '24px',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    backdropFilter: 'blur(28px) saturate(190%)',
    WebkitBackdropFilter: 'blur(28px) saturate(190%)',
    background: isDark
      ? 'linear-gradient(145deg, rgba(28, 28, 24, 0.85) 0%, rgba(20, 20, 18, 0.75) 50%, rgba(15, 15, 14, 0.85) 100%)'
      : 'linear-gradient(145deg, rgba(255, 255, 255, 0.92) 0%, rgba(250, 248, 244, 0.8) 50%, rgba(245, 242, 236, 0.88) 100%)',
    border: isDark
      ? '1px solid rgba(240, 239, 235, 0.12)'
      : '1px solid rgba(255, 255, 255, 0.9)',
    boxShadow: isDark
      ? '0 24px 60px -15px rgba(0, 0, 0, 0.6), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.08)'
      : '0 20px 50px -15px rgba(180, 160, 130, 0.18), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    '&:hover': {
      boxShadow: isDark
        ? '0 30px 70px -12px rgba(0, 0, 0, 0.75), inset 0 1px 2px 0 rgba(197, 184, 154, 0.2)'
        : '0 25px 60px -12px rgba(140, 120, 80, 0.22), inset 0 1px 2.5px 0 rgba(255, 255, 255, 1)',
    },
  };

  return (
    <CustomersLayout>
      <Box
        sx={{
          position: 'relative',
          minHeight: 'calc(100vh - 120px)',
          overflow: 'hidden',
          pt: { xs: 3, md: 5 },
          pb: { xs: 8, md: 10 },
        }}
      >
        {/* Ambient liquid lighting glow orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            right: '10%',
            width: { xs: 260, sm: 440 },
            height: { xs: 260, sm: 440 },
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(197, 184, 154, 0.16) 0%, rgba(197, 184, 154, 0.02) 65%, transparent 70%)'
              : 'radial-gradient(circle, rgba(230, 215, 185, 0.5) 0%, rgba(240, 230, 205, 0.18) 60%, transparent 70%)',
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
            bottom: '10%',
            left: '5%',
            width: { xs: 240, sm: 400 },
            height: { xs: 240, sm: 400 },
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(140, 120, 80, 0.12) 0%, rgba(100, 85, 55, 0.02) 65%, transparent 70%)'
              : 'radial-gradient(circle, rgba(245, 230, 215, 0.45) 0%, rgba(240, 220, 200, 0.15) 60%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'floatOrb2 18s ease-in-out infinite alternate',
            '@keyframes floatOrb2': {
              '0%': { transform: 'translate(0, 0) scale(1)' },
              '100%': { transform: 'translate(35px, -25px) scale(1.06)' },
            },
          }}
        />

        <GlassmorphismContainer fullHeight>
          <Box sx={{ maxWidth: 1080, mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
            {/* Success Hero Badge with Saintbala Liquid Glass Styling */}
            <Box
              sx={{
                textAlign: 'center',
                mb: 5,
                p: { xs: 3.5, sm: 5 },
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '32px',
                backdropFilter: 'blur(30px) saturate(190%)',
                WebkitBackdropFilter: 'blur(30px) saturate(190%)',
                background: isDark
                  ? 'linear-gradient(145deg, rgba(32, 32, 28, 0.88) 0%, rgba(22, 22, 20, 0.8) 100%)'
                  : 'linear-gradient(145deg, rgba(255, 255, 255, 0.94) 0%, rgba(250, 248, 244, 0.85) 100%)',
                border: isDark
                  ? '1px solid rgba(197, 184, 154, 0.25)'
                  : '1px solid rgba(255, 255, 255, 0.95)',
                boxShadow: isDark
                  ? '0 24px 60px -15px rgba(0, 0, 0, 0.65), inset 0 1px 2px 0 rgba(197, 184, 154, 0.2)'
                  : '0 24px 60px -15px rgba(180, 160, 130, 0.2), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: { xs: 72, sm: 84 },
                  height: { xs: 72, sm: 84 },
                  borderRadius: '26px',
                  mb: 2.5,
                  backdropFilter: 'blur(16px)',
                  background: isDark
                    ? 'rgba(197, 184, 154, 0.15)'
                    : 'rgba(143, 132, 104, 0.12)',
                  border: isDark
                    ? '1px solid rgba(197, 184, 154, 0.35)'
                    : '1px solid rgba(143, 132, 104, 0.25)',
                  boxShadow: isDark
                    ? '0 10px 30px rgba(197, 184, 154, 0.25)'
                    : '0 10px 25px rgba(143, 132, 104, 0.15)',
                }}
              >
                <CheckCircleOutline
                  sx={{
                    fontSize: { xs: 42, sm: 48 },
                    color: isDark ? '#c5b89a' : '#7c6d48',
                  }}
                />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.6rem', sm: '2.1rem' },
                  letterSpacing: '-0.02em',
                  color: isDark ? '#f5f4f0' : '#141412',
                  mb: 1,
                }}
              >
                {LL.orderConfirmation.title()}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  maxWidth: 580,
                  mx: 'auto',
                  mb: 3.5,
                  fontSize: { xs: '0.95rem', sm: '1.05rem' },
                  lineHeight: 1.6,
                }}
              >
                {LL.orderConfirmation.thankYouMessage()}
              </Typography>

              {/* Tracking Number Capsule */}
              <Box
                sx={{
                  display: 'inline-flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  gap: { xs: 1, sm: 2 },
                  px: { xs: 2.5, sm: 3.5 },
                  py: 1.75,
                  borderRadius: '9999px',
                  background: isDark
                    ? 'rgba(197, 184, 154, 0.08)'
                    : 'rgba(143, 132, 104, 0.08)',
                  backdropFilter: 'blur(20px)',
                  border: isDark
                    ? '1px solid rgba(197, 184, 154, 0.25)'
                    : '1px solid rgba(143, 132, 104, 0.2)',
                  boxShadow: isDark
                    ? '0 8px 24px rgba(0, 0, 0, 0.3)'
                    : '0 8px 24px rgba(180, 160, 130, 0.12)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShippingOutlined
                    sx={{ color: isDark ? '#c5b89a' : '#7c6d48', fontSize: 22 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: isDark ? '#c5b89a' : '#7c6d48',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {LL.orders.trackingNumber()}:
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: isDark ? '#f4f4f2' : '#181816',
                    fontSize: { xs: '1rem', sm: '1.15rem' },
                  }}
                >
                  {orderData.trackingNumber}
                </Typography>
              </Box>
            </Box>

            {/* Order Summary Liquid Glass Card */}
            <Card sx={{ ...glassCardSx, mb: 3.5 }}>
              <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1.5,
                    mb: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isDark
                          ? 'rgba(197, 184, 154, 0.12)'
                          : 'rgba(143, 132, 104, 0.1)',
                        border: isDark
                          ? '1px solid rgba(197, 184, 154, 0.25)'
                          : '1px solid rgba(143, 132, 104, 0.2)',
                      }}
                    >
                      <ReceiptLongOutlined
                        sx={{
                          color: isDark ? '#c5b89a' : '#7c6d48',
                          fontSize: 22,
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1.15rem',
                          color: isDark ? '#f4f4f2' : '#181816',
                        }}
                      >
                        {LL.orderConfirmation.orderSummary()}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        #{orderData.orderNumber}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2,
                      py: 0.75,
                      borderRadius: '9999px',
                      background: isDark
                        ? 'rgba(255, 255, 255, 0.04)'
                        : 'rgba(0, 0, 0, 0.03)',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.08)'
                        : '1px solid rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <EmailOutlined sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      {orderData.customerEmail}
                    </Typography>
                  </Box>
                </Box>

                <Divider
                  sx={{
                    my: 2.5,
                    borderColor: isDark
                      ? 'rgba(240, 239, 235, 0.08)'
                      : 'rgba(0, 0, 0, 0.06)',
                  }}
                />

                {/* Order Items Table */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? '#f4f4f2' : '#181816',
                    mb: 2,
                  }}
                >
                  {LL.orders.orderItems()}
                </Typography>

                <TableContainer
                  sx={{
                    mb: 3,
                    borderRadius: '16px',
                    border: isDark
                      ? '1px solid rgba(240, 239, 235, 0.08)'
                      : '1px solid rgba(0, 0, 0, 0.06)',
                    background: isDark
                      ? 'rgba(20, 20, 18, 0.4)'
                      : 'rgba(255, 255, 255, 0.4)',
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow
                        sx={{
                          background: isDark
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(0, 0, 0, 0.02)',
                        }}
                      >
                        <TableCell sx={{ fontWeight: 600, color: 'text.secondary', borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)' }}>
                          {LL.table.product()}
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary', borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)' }}>
                          {LL.table.quantity()}
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary', borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)' }}>
                          {LL.table.unitPrice()}
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary', borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)' }}>
                          {LL.table.total()}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderData.items.map((item, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td': { borderBottom: 'none' },
                            '&:hover': {
                              background: isDark
                                ? 'rgba(255, 255, 255, 0.02)'
                                : 'rgba(0, 0, 0, 0.015)',
                            },
                          }}
                        >
                          <TableCell sx={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)' }}>
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
                                    width: 52,
                                    height: 52,
                                    objectFit: 'cover',
                                    borderRadius: '12px',
                                    border: isDark
                                      ? '1px solid rgba(255, 255, 255, 0.1)'
                                      : '1px solid rgba(0, 0, 0, 0.08)',
                                  }}
                                />
                              )}
                              <Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 600,
                                    color: isDark ? '#f4f4f2' : '#181816',
                                  }}
                                >
                                  {item.productName}
                                </Typography>
                                {(item.color || item.size) && (
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ display: 'block', mt: 0.25 }}
                                  >
                                    {[item.color, item.size]
                                      .filter(Boolean)
                                      .join(' • ')}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              fontWeight: 600,
                              color: isDark ? '#f4f4f2' : '#181816',
                              borderBottom: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)',
                            }}
                          >
                            {item.quantity}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              borderBottom: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)',
                            }}
                          >
                            <PriceDisplay
                              priceInUSD={item.unitPrice}
                              showSymbol={true}
                              showOriginal={false}
                            />
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              fontWeight: 700,
                              color: isDark ? '#c5b89a' : '#7c6d48',
                              borderBottom: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)',
                            }}
                          >
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

                {/* Totals Breakdown */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Box
                    sx={{
                      width: { xs: '100%', sm: 340 },
                      p: 2.5,
                      borderRadius: '18px',
                      background: isDark
                        ? 'rgba(197, 184, 154, 0.06)'
                        : 'rgba(143, 132, 104, 0.05)',
                      border: isDark
                        ? '1px solid rgba(197, 184, 154, 0.15)'
                        : '1px solid rgba(143, 132, 104, 0.12)',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1.25,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {LL.checkout.subtotal()}:
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
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
                        mb: 1.5,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {LL.checkout.shipping()}:
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        <PriceDisplay
                          priceInUSD={orderData.shippingCost}
                          showSymbol={true}
                          showOriginal={false}
                        />
                      </Typography>
                    </Box>
                    <Divider
                      sx={{
                        my: 1.25,
                        borderColor: isDark
                          ? 'rgba(197, 184, 154, 0.2)'
                          : 'rgba(143, 132, 104, 0.15)',
                      }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1.05rem',
                          color: isDark ? '#f4f4f2' : '#181816',
                        }}
                      >
                        {LL.checkout.total()}:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: isDark ? '#c5b89a' : '#7c6d48',
                        }}
                      >
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

            {/* Shipping Address Liquid Glass Card */}
            <Card sx={{ ...glassCardSx, mb: 3.5 }}>
              <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isDark
                        ? 'rgba(197, 184, 154, 0.12)'
                        : 'rgba(143, 132, 104, 0.1)',
                      border: isDark
                        ? '1px solid rgba(197, 184, 154, 0.25)'
                        : '1px solid rgba(143, 132, 104, 0.2)',
                    }}
                  >
                    <PlaceOutlined
                      sx={{
                        color: isDark ? '#c5b89a' : '#7c6d48',
                        fontSize: 22,
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.15rem',
                      color: isDark ? '#f4f4f2' : '#181816',
                    }}
                  >
                    {LL.orderConfirmation.shippingAddress()}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: '18px',
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.03)'
                      : 'rgba(0, 0, 0, 0.02)',
                    border: isDark
                      ? '1px solid rgba(255, 255, 255, 0.08)'
                      : '1px solid rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? '#f4f4f2' : '#181816',
                      mb: 0.5,
                    }}
                  >
                    {orderData.customerName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
                    {orderData.shippingAddress}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {orderData.city}, {orderData.state} {orderData.zipCode} • {orderData.country}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
                    <PhoneOutlined sx={{ fontSize: 16, color: isDark ? '#c5b89a' : '#7c6d48' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {LL.form.phone()}: {orderData.customerPhone}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Email Confirmation Alert */}
            <Alert
              severity="info"
              icon={<EmailOutlined sx={{ color: isDark ? '#c5b89a' : '#7c6d48' }} />}
              sx={{
                mb: 4,
                borderRadius: '20px',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                background: isDark
                  ? 'rgba(197, 184, 154, 0.08)'
                  : 'rgba(143, 132, 104, 0.07)',
                border: isDark
                  ? '1px solid rgba(197, 184, 154, 0.25)'
                  : '1px solid rgba(143, 132, 104, 0.2)',
                color: isDark ? '#f4f4f2' : '#181816',
                '& .MuiAlert-message': {
                  fontWeight: 500,
                },
              }}
            >
              {LL.orderConfirmation.emailConfirmation()}
            </Alert>

            {/* Optional Guest Account Creation Prompt */}
            {!user && (
              <Box
                sx={{
                  mb: 4,
                  p: 3,
                  borderRadius: '20px',
                  background: isDark
                    ? 'rgba(197, 184, 154, 0.08)'
                    : 'rgba(240, 235, 225, 0.6)',
                  border: isDark
                    ? '1px solid rgba(197, 184, 154, 0.3)'
                    : '1px solid rgba(143, 132, 104, 0.25)',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? '#f4f4f2' : '#181816',
                    mb: 1,
                  }}
                >
                  {LL.orderConfirmation.createAccountPrompt?.() ||
                    'برای پیگیری سریع‌تر سفارش و دسترسی به تاریخچه خرید، حساب کاربری بسازید'}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)',
                    mb: 2.5,
                  }}
                >
                  {LL.orderConfirmation.createAccountDescription?.() ||
                    'اطلاعات شما از سفارش فعلی ذخیره خواهد شد و نیازی به وارد کردن مجدد اطلاعات در خریدهای بعدی نخواهد بود.'}
                </Typography>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={`${CUSTOMER_ROUTES.SIGNUP}?email=${encodeURIComponent(
                    orderData.customerEmail || ''
                  )}&name=${encodeURIComponent(orderData.customerName || '')}`}
                  startIcon={<PersonAddOutlined />}
                  sx={{
                    borderRadius: '9999px',
                    px: 3.5,
                    py: 1,
                    fontWeight: 600,
                    borderColor: isDark ? '#c5b89a' : '#7c6d48',
                    color: isDark ? '#c5b89a' : '#7c6d48',
                    '&:hover': {
                      borderColor: isDark ? '#dfd6c0' : '#5a4e32',
                      background: isDark
                        ? 'rgba(197, 184, 154, 0.12)'
                        : 'rgba(143, 132, 104, 0.1)',
                    },
                  }}
                >
                  {LL.button.signUp()}
                </Button>
              </Box>
            )}

            {/* Action Buttons */}
            <Box
              sx={{
                display: 'flex',
                gap: 2.5,
                justifyContent: 'center',
                flexWrap: 'wrap',
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<ReceiptLongOutlined />}
                component={RouterLink}
                to={CUSTOMER_ROUTES.ORDERS}
                sx={{
                  borderRadius: '9999px',
                  py: 1.5,
                  px: 4.5,
                  fontWeight: 700,
                  fontSize: '0.98rem',
                  letterSpacing: '0.02em',
                  textTransform: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(20px) saturate(190%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(190%)',
                  transition:
                    'all 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  ...(isDark
                    ? {
                        background:
                          'linear-gradient(135deg, rgba(197, 184, 154, 0.96) 0%, rgba(181, 171, 147, 0.94) 100%)',
                        color: '#121210',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        boxShadow:
                          '0 10px 28px -4px rgba(197, 184, 154, 0.45), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.6)',
                        '&:hover': {
                          background:
                            'linear-gradient(135deg, #ffffff 0%, rgba(210, 198, 170, 0.98) 100%)',
                          transform: 'translateY(-2px) scale(1.01)',
                          boxShadow:
                            '0 14px 34px -4px rgba(197, 184, 154, 0.6), inset 0 1px 2px 0 rgba(255, 255, 255, 0.9)',
                        },
                      }
                    : {
                        background:
                          'linear-gradient(135deg, #1f1f1d 0%, #121210 100%)',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow:
                          '0 10px 24px -4px rgba(0, 0, 0, 0.28), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
                        '&:hover': {
                          background:
                            'linear-gradient(135deg, #2c2c28 0%, #050505 100%)',
                          transform: 'translateY(-2px) scale(1.01)',
                          boxShadow:
                            '0 14px 30px -4px rgba(0, 0, 0, 0.38), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.5)',
                        },
                      }),
                }}
              >
                {LL.orderConfirmation.viewOrders()}
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<ShoppingBagOutlined />}
                component={RouterLink}
                to={CUSTOMER_ROUTES.HOME}
                sx={{
                  borderRadius: '9999px',
                  py: 1.5,
                  px: 4,
                  fontWeight: 700,
                  fontSize: '0.98rem',
                  letterSpacing: '0.02em',
                  textTransform: 'none',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: isDark
                    ? '1px solid rgba(240, 239, 235, 0.22)'
                    : '1px solid rgba(24, 24, 22, 0.22)',
                  color: isDark ? '#f4f4f2' : '#181816',
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.04)'
                    : 'rgba(255, 255, 255, 0.65)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: isDark ? '#c5b89a' : '#7c6d48',
                    color: isDark ? '#c5b89a' : '#7c6d48',
                    background: isDark
                      ? 'rgba(197, 184, 154, 0.1)'
                      : 'rgba(143, 132, 104, 0.08)',
                  },
                }}
              >
                {LL.orderConfirmation.continueShopping()}
              </Button>
            </Box>
          </Box>
        </GlassmorphismContainer>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerOrderConfirmation;
