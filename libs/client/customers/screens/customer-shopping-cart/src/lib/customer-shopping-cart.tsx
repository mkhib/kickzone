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
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { PriceDisplay } from '@kickzone-workspace/price-display';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import types from cart store
import type { CartItem } from '@kickzone-workspace/customer-cart-store';

export function CustomerShoppingCart() {
  const { LL } = useI18nContext();
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

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      if (newQuantity <= 0) {
        await removeFromCartMutation(itemId);
        removeItem(itemId);
        addToast({
          type: 'success',
          title: 'Item removed',
          message: 'Item has been removed from your cart',
        });
      } else {
        await updateCartItemMutation(itemId, { quantity: newQuantity });
        updateItemQuantity(itemId, newQuantity);
        addToast({
          type: 'success',
          title: 'Quantity updated',
          message: 'Item quantity has been updated',
        });
      }
    } catch {
      addToast({
        type: 'error',
        title: 'Update failed',
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
                          <PriceDisplay
                            priceInUSD={item.unitPrice}
                            showSymbol={true}
                            showOriginal={false}
                          />{' '}
                          each
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
                            <PriceDisplay
                              priceInUSD={item.totalPrice}
                              showSymbol={true}
                              showOriginal={false}
                            />
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
                  {LL.checkout.clearCart()}
                </Button>
              </Box>
            </Grid>

            {/* Order Summary */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
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
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">{LL.checkout.total()}:</Typography>
                    <Typography variant="h6">
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
                <Typography variant="h6" gutterBottom>
                  {LL.checkout.shippingInformation()}
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
