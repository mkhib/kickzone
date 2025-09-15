import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Grid,
  Divider,
  IconButton,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { Delete, Add, Remove, ShoppingCartCheckout } from '@mui/icons-material';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import {
  GET_MY_CART_QUERY,
  UPDATE_CART_ITEM_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  CLEAR_CART_MUTATION,
  CREATE_ORDER_MUTATION,
} from '@kickzone-workspace/customers-graphql';

interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  color: string | null;
  size: string | null;
  sellerId: string;
}

interface Cart {
  id: string;
  subtotal: number;
  total: number;
  items: CartItem[];
}

interface CartData {
  myCart: Cart;
}

const steps = ['Review Cart', 'Shipping Information', 'Order Summary'];

export function CustomerShoppingCart() {
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

  const {
    data: cartData,
    loading: cartLoading,
    error: cartError,
    refetch,
  } = useQuery<CartData>(GET_MY_CART_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  const [updateCartItem] = useMutation(UPDATE_CART_ITEM_MUTATION);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART_MUTATION);
  const [clearCart] = useMutation(CLEAR_CART_MUTATION);
  const [createOrder] = useMutation(CREATE_ORDER_MUTATION);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart({ variables: { itemId } });
    } else {
      await updateCartItem({
        variables: {
          itemId,
          updateInput: { quantity: newQuantity },
        },
      });
    }
    refetch();
  };

  const handleRemoveItem = async (itemId: string) => {
    await removeFromCart({ variables: { itemId } });
    refetch();
  };

  const handleClearCart = async () => {
    await clearCart();
    refetch();
  };

  const handleCheckout = () => {
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
      // Group items by seller
      const itemsBySeller = cartData?.myCart.items.reduce(
        (acc: Record<string, CartItem[]>, item: CartItem) => {
          if (!acc[item.sellerId]) {
            acc[item.sellerId] = [];
          }
          acc[item.sellerId].push({
            id: item.id,
            productId: item.productId,
            productName: item.productName,
            productImage: item.productImage,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            color: item.color,
            size: item.size,
            sellerId: item.sellerId,
          });
          return acc;
        },
        {} as Record<string, CartItem[]>
      );

      // Create orders for each seller
      const orderPromises = Object.entries(itemsBySeller || {}).map(
        ([sellerId, items]) =>
          createOrder({
            variables: {
              createOrderInput: {
                ...shippingInfo,
                sellerId,
                items,
              },
            },
          })
      );

      await Promise.all(orderPromises);
      await clearCart();
      setCheckoutDialogOpen(false);
      setActiveStep(0);
      refetch();
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
        <Alert severity="error">Error loading cart: {cartError.message}</Alert>
      </CustomersLayout>
    );
  }

  const cart = cartData?.myCart;
  const hasItems = cart && cart.items.length > 0;

  return (
    <CustomersLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>

        {!hasItems ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Your cart is empty
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }} href="/products">
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Cart Items */}
            <Grid size={{ xs: 12, md: 8 }}>
              {cart.items.map((item) => (
                <Card key={item.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 3, sm: 2 }}>
                        {item.productImage && (
                          <CardMedia
                            component="img"
                            height="80"
                            image={item.productImage}
                            alt={item.productName}
                            sx={{ objectFit: 'cover', borderRadius: 1 }}
                          />
                        )}
                      </Grid>
                      <Grid size={{ xs: 9, sm: 10 }}>
                        <Typography variant="h6" gutterBottom>
                          {item.productName}
                        </Typography>
                        {(item.color || item.size) && (
                          <Typography variant="body2" color="text.secondary">
                            {[item.color, item.size]
                              .filter(Boolean)
                              .join(' - ')}
                          </Typography>
                        )}
                        <Typography variant="h6" color="primary">
                          ${item.unitPrice.toFixed(2)} each
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mt: 2,
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                            >
                              <Remove />
                            </IconButton>
                            <TextField
                              size="small"
                              value={item.quantity}
                              onChange={(e) => {
                                const newQuantity =
                                  parseInt(e.target.value) || 0;
                                handleQuantityChange(item.id, newQuantity);
                              }}
                              inputProps={{
                                min: 0,
                                style: { textAlign: 'center' },
                              }}
                              sx={{ width: 80 }}
                            />
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                            >
                              <Add />
                            </IconButton>
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{ flexGrow: 1, textAlign: 'right' }}
                          >
                            ${item.totalPrice.toFixed(2)}
                          </Typography>
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              </Box>
            </Grid>

            {/* Order Summary */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Order Summary
                  </Typography>
                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography>Subtotal:</Typography>
                    <Typography>${cart.subtotal.toFixed(2)}</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography>Shipping:</Typography>
                    <Typography>$0.00</Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6">
                      ${cart.total.toFixed(2)}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<ShoppingCartCheckout />}
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
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
          <DialogTitle>Checkout</DialogTitle>
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
                  Review Your Cart
                </Typography>
                {cart?.items.map((item) => (
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
                    <Typography>${item.totalPrice.toFixed(2)}</Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">
                    ${cart?.total.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Shipping Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={shippingInfo.customerName}
                      onChange={(e) =>
                        handleShippingInfoChange('customerName', e.target.value)
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={shippingInfo.customerEmail}
                      onChange={(e) =>
                        handleShippingInfoChange(
                          'customerEmail',
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={shippingInfo.customerPhone}
                      onChange={(e) =>
                        handleShippingInfoChange(
                          'customerPhone',
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Address"
                      value={shippingInfo.shippingAddress}
                      onChange={(e) =>
                        handleShippingInfoChange(
                          'shippingAddress',
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="City"
                      value={shippingInfo.city}
                      onChange={(e) =>
                        handleShippingInfoChange('city', e.target.value)
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="State"
                      value={shippingInfo.state}
                      onChange={(e) =>
                        handleShippingInfoChange('state', e.target.value)
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="ZIP Code"
                      value={shippingInfo.zipCode}
                      onChange={(e) =>
                        handleShippingInfoChange('zipCode', e.target.value)
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Country"
                      value={shippingInfo.country}
                      onChange={(e) =>
                        handleShippingInfoChange('country', e.target.value)
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Notes (Optional)"
                      multiline
                      rows={3}
                      value={shippingInfo.notes}
                      onChange={(e) =>
                        handleShippingInfoChange('notes', e.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  This is a demo checkout. No payment is required.
                </Alert>
                <Typography variant="body1" gutterBottom>
                  Your order will be processed and you will receive a
                  confirmation email.
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCheckoutDialogOpen(false)}>Cancel</Button>
            {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button variant="contained" onClick={handlePlaceOrder}>
                Place Order
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerShoppingCart;
