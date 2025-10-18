import {
  useCartError,
  useCartItems,
  useCartLoading,
  useCartTotal,
  useClearCart,
  useRemoveItem,
  useUpdateItemQuantity,
} from '@kickzone-workspace/customer-cart-store';
import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import { useCustomersCartMutations } from '@kickzone-workspace/customers-cart-hook';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import {
  GET_MY_PROFILE,
  UPDATE_MY_PROFILE,
} from '@kickzone-workspace/customers-graphql';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { PriceDisplay } from '@kickzone-workspace/price-display';
import {
  useI18nContext,
  useLanguageContext,
} from '@kickzone-workspace/shared-i18n';
import { useUIStore } from '@kickzone-workspace/shared-ui-store';
import { Add, Delete, Remove, ShoppingCartCheckout } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client/react';

// Import types from cart store
import type { CartItem } from '@kickzone-workspace/customer-cart-store';

// Utility to convert numbers to locale format (supports Farsi digits)
const formatNumber = (num: number | string, locale: string): string => {
  return Number(num).toLocaleString(locale);
};

export function CustomerShoppingCart() {
  const { LL } = useI18nContext();
  const { currentLocale } = useLanguageContext();
  const steps = [
    LL.checkout.reviewCart(),
    LL.checkout.shippingInformation(),
    LL.checkout.orderSummary(),
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    notes: '',
  });
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  // Use cart store
  const cartItems = useCartItems();
  const cartLoading = useCartLoading();
  const cartError = useCartError();
  const cartTotal = useCartTotal();
  const removeItem = useRemoveItem();
  const updateItemQuantity = useUpdateItemQuantity();
  const clearCartAction = useClearCart();

  // Use UI store for notifications
  const addToast = useUIStore((state) => state.addToast);

  // Use auth context and navigation
  const { user } = useCustomersAuth();
  const navigate = useNavigate();

  // Use custom cart mutations hook
  const {
    updateCartItem: updateCartItemMutation,
    removeFromCart: removeFromCartMutation,
    clearCart: clearCartMutation,
    createOrder: createOrderMutation,
  } = useCustomersCartMutations();

  // Load customer profile
  const { data: profileData } = useQuery<{
    myProfile: {
      id: string;
      phone?: string;
      address?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
    };
  }>(GET_MY_PROFILE, {
    skip: !user,
  });

  const [updateProfileMutation] = useMutation<
    {
      updateMyProfile: {
        id: string;
        phone?: string;
        address?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
      };
    },
    {
      input: {
        phone?: string;
        address?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
      };
    }
  >(UPDATE_MY_PROFILE);

  // Load profile data into shipping form when available
  useEffect(() => {
    if (profileData?.myProfile && user) {
      setShippingInfo((prev) => ({
        customerName: user.name || prev.customerName,
        customerEmail: user.email || prev.customerEmail,
        customerPhone: profileData.myProfile.phone || prev.customerPhone,
        shippingAddress: profileData.myProfile.address || prev.shippingAddress,
        city: profileData.myProfile.city || prev.city,
        state: profileData.myProfile.state || prev.state,
        zipCode: profileData.myProfile.zipCode || prev.zipCode,
        country: profileData.myProfile.country || prev.country,
        notes: prev.notes,
      }));
    }
  }, [profileData, user]);

  const handleQuantityChange = async (
    itemId: string,
    newQuantity: number,
    availableStock: number
  ) => {
    // Validate positive quantity
    if (newQuantity <= 0) {
      try {
        await removeFromCartMutation(itemId);
        removeItem(itemId);
        addToast({
          type: 'success',
          title: 'Item removed',
          message: 'Item has been removed from your cart',
        });
      } catch {
        addToast({
          type: 'error',
          title: LL.status.error(),
          message: 'Failed to remove item',
        });
      }
      return;
    }

    // Validate stock limit
    if (newQuantity > availableStock) {
      addToast({
        type: 'error',
        title: 'Stock Limit',
        message: `Only ${formatNumber(
          availableStock,
          currentLocale
        )} items available in stock`,
      });
      return;
    }

    try {
      // Update local store first for immediate UI feedback
      updateItemQuantity(itemId, newQuantity);

      // Then sync with server if logged in
      if (user) {
        await updateCartItemMutation(itemId, { quantity: newQuantity });
      }

      addToast({
        type: 'success',
        title: 'Quantity updated',
        message: 'Item quantity has been updated',
      });
    } catch {
      addToast({
        type: 'error',
        title: LL.status.error(),
        message: 'Failed to update item quantity',
      });
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCartMutation(itemId);
      removeItem(itemId);
      addToast({
        type: 'success',
        title: 'Item removed',
        message: 'Item has been removed from your cart',
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Remove failed',
        message: 'Failed to remove item from cart',
      });
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCartMutation();
      clearCartAction();
      addToast({
        type: 'success',
        title: 'Cart cleared',
        message: 'All items have been removed from your cart',
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Clear failed',
        message: 'Failed to clear cart',
      });
    }
  };

  const handleCheckout = () => {
    // Check if user is authenticated
    if (!user) {
      setAuthDialogOpen(true);
      return;
    }
    setCheckoutDialogOpen(true);
  };

  const handleShippingInfoChange = (field: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handlePlaceOrder = async () => {
    try {
      // Save customer profile for future orders
      if (user) {
        await updateProfileMutation({
          variables: {
            input: {
              phone: shippingInfo.customerPhone,
              address: shippingInfo.shippingAddress,
              city: shippingInfo.city,
              state: shippingInfo.state,
              zipCode: shippingInfo.zipCode,
              country: shippingInfo.country,
            },
          },
        });
      }

      // Group items by seller
      const itemsBySeller = cartItems.reduce(
        (acc: Record<string, CartItem[]>, item: CartItem) => {
          if (!acc[item.sellerId]) {
            acc[item.sellerId] = [];
          }
          acc[item.sellerId].push(item);
          return acc;
        },
        {} as Record<string, CartItem[]>
      );

      // Create orders for each seller
      const orderPromises = Object.entries(itemsBySeller || {}).map(
        ([sellerId, items]) =>
          createOrderMutation({
            ...shippingInfo,
            sellerId,
            // Map cart items to order items, using sellerProductId as productId for stock management
            items: items.map((item) => ({
              productId: item.sellerProductId, // Use sellerProductId for stock management
              productName: item.productName,
              productImage: item.productImage,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              totalPrice: item.totalPrice,
              color: item.color,
              size: item.size,
            })),
          })
      );

      await Promise.all(orderPromises);
      await clearCartMutation();
      setCheckoutDialogOpen(false);
      setActiveStep(0);
      // Cart will be cleared by the mutation
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (cartLoading) {
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

  if (cartError) {
    return (
      <CustomersLayout>
        <Alert severity="error">Error loading cart: {cartError}</Alert>
      </CustomersLayout>
    );
  }

  const hasItems = cartItems.length > 0;

  return (
    <CustomersLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {LL.checkout.shoppingCart()}
        </Typography>

        {!hasItems ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              {LL.checkout.yourCartIsEmpty()}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              href={CUSTOMER_ROUTES.PRODUCTS}
            >
              {LL.checkout.continueShopping()}
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Cart Items */}
            <Grid size={{ xs: 12, md: 8 }}>
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  sx={{
                    mb: 2,
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid size={{ xs: 12, sm: 3, md: 2 }}>
                        {item.productImage && (
                          <CardMedia
                            component="img"
                            height="100"
                            image={item.productImage}
                            alt={item.productName}
                            sx={{
                              objectFit: 'cover',
                              borderRadius: 2,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            }}
                          />
                        )}
                      </Grid>
                      <Grid size={{ xs: 12, sm: 9, md: 10 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: '#1a1a1a',
                            }}
                          >
                            {item.productName}
                          </Typography>

                          {(item.color || item.size) && (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                flexWrap: 'wrap',
                              }}
                            >
                              {item.color && (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      color: '#666',
                                      fontWeight: 600,
                                      textTransform: 'uppercase',
                                      fontSize: '0.75rem',
                                    }}
                                  >
                                    {LL.products.color()}
                                  </Typography>
                                  <Box
                                    sx={{
                                      width: 24,
                                      height: 24,
                                      backgroundColor: item.color,
                                      borderRadius: '50%',
                                      border: '2px solid white',
                                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                    }}
                                  />
                                </Box>
                              )}
                              {item.size && (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      color: '#666',
                                      fontWeight: 600,
                                      textTransform: 'uppercase',
                                      fontSize: '0.75rem',
                                    }}
                                  >
                                    {LL.products.size()}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: 700,
                                      color: '#1a1a1a',
                                    }}
                                  >
                                    {formatNumber(item.size, currentLocale)}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          )}

                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 0.5,
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                background:
                                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                              }}
                            >
                              <PriceDisplay
                                priceInUSD={item.unitPrice}
                                showSymbol={true}
                                showOriginal={false}
                              />
                              <Typography
                                component="span"
                                variant="body2"
                                sx={{
                                  ml: 0.5,
                                  color: '#999',
                                  fontWeight: 400,
                                }}
                              >
                                {LL.products.units()}
                              </Typography>
                            </Typography>

                            {item.availableStock < 10 && (
                              <Typography
                                variant="caption"
                                sx={{
                                  color:
                                    item.availableStock < 5
                                      ? '#f5576c'
                                      : '#ff9800',
                                  fontWeight: 600,
                                }}
                              >
                                {formatNumber(
                                  item.availableStock,
                                  currentLocale
                                )}{' '}
                                {LL.products.left()}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 2,
                            mt: 2,
                            pt: 2,
                            borderTop: '1px solid rgba(0,0,0,0.08)',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              background:
                                'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                              borderRadius: 3,
                              p: 0.5,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.quantity - 1,
                                  item.availableStock
                                )
                              }
                              sx={{
                                background: 'white',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                '&:hover': {
                                  background: '#f8f9fa',
                                },
                              }}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                            <Typography
                              sx={{
                                minWidth: 40,
                                textAlign: 'center',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                              }}
                            >
                              {formatNumber(item.quantity, currentLocale)}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.quantity + 1,
                                  item.availableStock
                                )
                              }
                              disabled={item.quantity >= item.availableStock}
                              sx={{
                                background: 'white',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                '&:hover': {
                                  background: '#f8f9fa',
                                },
                                '&.Mui-disabled': {
                                  background: '#f0f0f0',
                                  opacity: 0.5,
                                },
                              }}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 800,
                                background:
                                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                              }}
                            >
                              <PriceDisplay
                                priceInUSD={item.totalPrice}
                                showSymbol={true}
                                showOriginal={false}
                              />
                            </Typography>

                            <IconButton
                              onClick={() => handleRemoveItem(item.id)}
                              sx={{
                                color: '#f5576c',
                                '&:hover': {
                                  background: 'rgba(245, 87, 108, 0.1)',
                                },
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}

              <Box
                sx={{
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleClearCart}
                  sx={{
                    borderRadius: 3,
                    borderColor: '#f5576c',
                    color: '#f5576c',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: '#f5576c',
                      background: 'rgba(245, 87, 108, 0.08)',
                    },
                  }}
                >
                  {LL.checkout.clearCart()}
                </Button>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: '#667eea',
                    fontSize: '0.95rem',
                  }}
                >
                  {formatNumber(cartItems.length, currentLocale)}{' '}
                  {cartItems.length === 1
                    ? LL.table.product()
                    : LL.navigation.products()}
                </Typography>
              </Box>
            </Grid>

            {/* Order Summary */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  background:
                    'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                  position: 'sticky',
                  top: 20,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      mb: 3,
                      color: '#1a1a1a',
                    }}
                  >
                    {LL.checkout.orderSummary()}
                  </Typography>
                  <Divider sx={{ my: 2 }} />

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
                        priceInUSD={cartTotal}
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
                        priceInUSD={0}
                        showSymbol={true}
                        showOriginal={false}
                      />
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 3,
                      p: 2,
                      borderRadius: 3,
                      background:
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {LL.checkout.total()}:
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      <PriceDisplay
                        priceInUSD={cartTotal}
                        showSymbol={true}
                        showOriginal={false}
                      />
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<ShoppingCartCheckout />}
                    onClick={handleCheckout}
                    sx={{
                      borderRadius: 3,
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: '1rem',
                      textTransform: 'none',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.35)',
                      background:
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 35px rgba(102, 126, 234, 0.45)',
                        background:
                          'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                      },
                    }}
                  >
                    {LL.checkout.proceedToCheckout()}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Checkout Dialog */}
        <Dialog
          open={checkoutDialogOpen}
          onClose={() => setCheckoutDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>{LL.checkout.orderSummary()}</DialogTitle>
          <DialogContent>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  {LL.checkout.reviewCart()}
                </Typography>
                {cartItems.map((item: CartItem) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      py: 1,
                    }}
                  >
                    <Typography>
                      {item.productName} x {item.quantity}
                    </Typography>
                    <Typography>
                      <PriceDisplay
                        priceInUSD={item.totalPrice}
                        showSymbol={true}
                        showOriginal={false}
                      />
                    </Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">{LL.checkout.total()}:</Typography>
                  <Typography variant="h6">
                    <PriceDisplay
                      priceInUSD={cartTotal}
                      showSymbol={true}
                      showOriginal={false}
                    />
                  </Typography>
                </Box>
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                    mb: 3,
                  }}
                >
                  {LL.checkout.shippingInformation()}
                </Typography>
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.fullName()}
                      value={shippingInfo.customerName}
                      onChange={(e) =>
                        handleShippingInfoChange('customerName', e.target.value)
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.email()}
                      type="email"
                      value={shippingInfo.customerEmail}
                      onChange={(e) =>
                        handleShippingInfoChange(
                          'customerEmail',
                          e.target.value
                        )
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.phone()}
                      value={shippingInfo.customerPhone}
                      onChange={(e) =>
                        handleShippingInfoChange(
                          'customerPhone',
                          e.target.value
                        )
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.country()}
                      value={shippingInfo.country}
                      onChange={(e) =>
                        handleShippingInfoChange('country', e.target.value)
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.address()}
                      value={shippingInfo.shippingAddress}
                      onChange={(e) =>
                        handleShippingInfoChange(
                          'shippingAddress',
                          e.target.value
                        )
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.city()}
                      value={shippingInfo.city}
                      onChange={(e) =>
                        handleShippingInfoChange('city', e.target.value)
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.state()}
                      value={shippingInfo.state}
                      onChange={(e) =>
                        handleShippingInfoChange('state', e.target.value)
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      required
                      label={LL.form.zipCode()}
                      value={shippingInfo.zipCode}
                      onChange={(e) =>
                        handleShippingInfoChange('zipCode', e.target.value)
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label={LL.form.notes()}
                      multiline
                      rows={3}
                      value={shippingInfo.notes}
                      onChange={(e) =>
                        handleShippingInfoChange('notes', e.target.value)
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  {LL.checkout.orderSummary()}
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  {LL.checkout.demoCheckout()}
                </Alert>
                <Typography variant="body1" gutterBottom>
                  {LL.checkout.orderProcessed()}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCheckoutDialogOpen(false)}>
              {LL.button.cancel()}
            </Button>
            {activeStep > 0 && (
              <Button onClick={handleBack}>{LL.button.back()}</Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={handleNext}>
                {LL.button.next()}
              </Button>
            ) : (
              <Button variant="contained" onClick={handlePlaceOrder}>
                {LL.button.placeOrder()}
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Authentication Required Dialog */}
        <Dialog
          open={authDialogOpen}
          onClose={() => setAuthDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{LL.checkout.authenticationRequired()}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              {LL.checkout.authenticationMessage()}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAuthDialogOpen(false)}>
              {LL.button.cancel()}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setAuthDialogOpen(false);
                navigate(CUSTOMER_ROUTES.LOGIN);
              }}
            >
              {LL.checkout.loginRegister()}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerShoppingCart;
