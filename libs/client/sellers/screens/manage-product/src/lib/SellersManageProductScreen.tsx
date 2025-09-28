import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import {
  useSellersProductManagement,
  type SellerProductFormData,
} from '@kickzone-workspace/sellers-products-hooks';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const initialFormData: SellerProductFormData = {
  productId: null,
  productInfoId: null,
  price: 0,
  costPrice: 0,
  discount: 0,
  stockQuantity: 0,
};

export function SellersManageProductScreen() {
  const { user } = useSellersAuthContext();
  const [searchParams] = useSearchParams();
  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] =
    useState<SellerProductFormData>(initialFormData);
  const [selectedProduct, setSelectedProduct] =
    useState<KickzoneGraphqlTypes.Product | null>(null);
  const [selectedProductInfo, setSelectedProductInfo] =
    useState<KickzoneGraphqlTypes.ProductInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // Use the new hook
  const {
    products,
    sellerProduct,
    isManagementLoading,
    isProductsLoading,
    isSellerProductLoading,
    productsError,
    sellerProductError,
    createError,
    updateError,
    createProduct,
    updateProduct,
    getSellerProductById,
  } = useSellersProductManagement();

  // Handle URL parameters for editing - fetch seller product data
  useEffect(() => {
    const sellerProductId = searchParams.get('sellerProductId');
    console.log('🔍 URL sellerProductId:', sellerProductId);
    if (sellerProductId) {
      const sellerProductIdNum = parseInt(sellerProductId, 10);
      console.log('🔍 Parsed sellerProductId:', sellerProductIdNum);
      setIsEditing(true);
      setEditingProductId(sellerProductIdNum);

      // Fetch the seller product data
      console.log(
        '🔍 Calling getSellerProductById with id:',
        sellerProductIdNum
      );
      getSellerProductById({ variables: { id: sellerProductIdNum } });
    } else {
      setIsEditing(false);
      setEditingProductId(null);
    }
  }, [searchParams, getSellerProductById]);

  // Handle seller product data when it's loaded
  useEffect(() => {
    console.log('🔍 sellerProduct data:', sellerProduct);
    console.log('🔍 isEditing:', isEditing);
    console.log('🔍 sellerProductError:', sellerProductError);
    console.log('🔍 isSellerProductLoading:', isSellerProductLoading);

    if (sellerProduct && isEditing && sellerProduct.productInfo) {
      console.log('🔍 Setting form data with sellerProduct:', sellerProduct);
      // Set the product and product info
      setSelectedProduct(sellerProduct.product);
      setSelectedProductInfo(sellerProduct.productInfo);

      // Set the form data
      const newFormData = {
        productId: sellerProduct.product.id,
        productInfoId: sellerProduct.productInfo.id,
        price: sellerProduct.price || 0,
        costPrice: sellerProduct.costPrice || 0,
        discount: sellerProduct.discount || 0,
        stockQuantity: sellerProduct.stockQuantity || 0,
      };
      console.log('🔍 New form data:', newFormData);
      setFormData(newFormData);
    }
  }, [sellerProduct, isEditing, sellerProductError, isSellerProductLoading]);

  const resetForm = () => {
    setFormData(initialFormData);
    setSelectedProduct(null);
    setSelectedProductInfo(null);
    setIsEditing(false);
    setEditingProductId(null);
  };

  const handleProductChange = (
    product: KickzoneGraphqlTypes.Product | null
  ) => {
    setSelectedProduct(product);
    setSelectedProductInfo(null);
    setFormData((prev) => ({
      ...prev,
      productId: product?.id || null,
      productInfoId: null,
    }));
  };

  const handleProductInfoChange = (
    productInfo: KickzoneGraphqlTypes.ProductInfo | null
  ) => {
    setSelectedProductInfo(productInfo);
    setFormData((prev) => ({
      ...prev,
      productInfoId: productInfo?.id || null,
    }));
  };

  const handleInputChange = (
    field: keyof SellerProductFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: typeof value === 'string' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      console.error('User not authenticated');
      return;
    }

    if (!formData.productInfoId) {
      console.error('No product variant selected');
      return;
    }

    try {
      if (isEditing && editingProductId) {
        await updateProduct(formData, editingProductId);
        showSnackbar('Product updated successfully!', {
          severity: 'success',
          duration: 4000,
        });
      } else {
        await createProduct(formData);
        showSnackbar('Product created successfully!', {
          severity: 'success',
          duration: 4000,
        });
        // Reset form after successful creation
        resetForm();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Error handling is already done by the error states in the hook
    }
  };

  const isFormValid = () => {
    return (
      formData.productInfoId &&
      formData.price > 0 &&
      formData.costPrice > 0 &&
      formData.stockQuantity > 0 &&
      formData.discount >= 0 &&
      formData.discount <= 100
    );
  };

  const isLoading =
    isManagementLoading || isProductsLoading || isSellerProductLoading;

  // Show loading state while products are being fetched
  if (isProductsLoading || (isEditing && isSellerProductLoading)) {
    return (
      <SellersLayout>
        <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 200,
              }}
            >
              <CircularProgress size={40} />
              <Typography variant="h6" sx={{ ml: 2 }}>
                Loading products...
              </Typography>
            </Box>
          </Paper>
        </Box>
      </SellersLayout>
    );
  }

  return (
    <SellersLayout>
      <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </Typography>

          {(createError ||
            updateError ||
            productsError ||
            sellerProductError) && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {createError?.message ||
                updateError?.message ||
                productsError?.message ||
                sellerProductError?.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Product Selection */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Select Product
                </Typography>
                <Autocomplete
                  options={products}
                  getOptionLabel={(option) => option.name}
                  value={selectedProduct}
                  onChange={(_, newValue) => handleProductChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a product"
                      required
                      disabled={isLoading}
                    />
                  )}
                  renderOption={(props, option) => {
                    const { key, ...otherProps } = props;
                    return (
                      <Box component="li" key={key} {...otherProps}>
                        <Box>
                          <Typography variant="body1">{option.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.categories
                              .map((cat) => cat.name)
                              .join(', ')}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  }}
                />
              </Grid>

              {/* Product Variant Selection */}
              {selectedProduct && (
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Select Variant
                  </Typography>
                  <Autocomplete
                    options={selectedProduct.productInfos}
                    getOptionLabel={(option) =>
                      `${option.size} - ${option.color?.name || 'No Color'} (${
                        option.weight
                      }kg)`
                    }
                    value={selectedProductInfo}
                    onChange={(_, newValue) =>
                      handleProductInfoChange(newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Choose a variant"
                        required
                        disabled={isLoading}
                      />
                    )}
                    renderOption={(props, option) => {
                      const { key, ...otherProps } = props;
                      return (
                        <Box component="li" key={key} {...otherProps}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            {option.color && (
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  backgroundColor: option.color.hexCode,
                                  borderRadius: '50%',
                                  border: '1px solid #ccc',
                                }}
                              />
                            )}
                            <Typography>
                              {option.size} - {option.color?.name || 'No Color'}{' '}
                              ({option.weight}
                              kg)
                            </Typography>
                          </Box>
                        </Box>
                      );
                    }}
                  />
                </Grid>
              )}

              {/* Product Details Card */}
              {selectedProduct && selectedProductInfo && (
                <Grid size={{ xs: 12 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Product Details
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Typography variant="body2" color="text.secondary">
                            Product: {selectedProduct.name}
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Typography variant="body2" color="text.secondary">
                            Variant: {selectedProductInfo.size} -{' '}
                            {selectedProductInfo.color?.name || 'No Color'}
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Typography variant="body2" color="text.secondary">
                            Weight: {selectedProductInfo.weight}kg
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Typography variant="body2" color="text.secondary">
                            Categories:{' '}
                            {selectedProduct.categories
                              .map((cat) => cat.name)
                              .join(', ')}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {/* Pricing and Stock Form */}
              {selectedProductInfo && (
                <>
                  <Grid size={{ xs: 12 }}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Pricing & Stock
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Price ($)"
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange('price', e.target.value)
                      }
                      required
                      disabled={isLoading}
                      inputProps={{ min: 0, step: 0.01 }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Cost Price ($)"
                      type="number"
                      value={formData.costPrice}
                      onChange={(e) =>
                        handleInputChange('costPrice', e.target.value)
                      }
                      required
                      disabled={isLoading}
                      inputProps={{ min: 0, step: 0.01 }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Discount (%)"
                      type="number"
                      value={formData.discount}
                      onChange={(e) =>
                        handleInputChange('discount', e.target.value)
                      }
                      disabled={isLoading}
                      inputProps={{ min: 0, max: 100, step: 0.01 }}
                      helperText="Enter discount percentage (0-100)"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Stock Quantity"
                      type="number"
                      value={formData.stockQuantity}
                      onChange={(e) =>
                        handleInputChange('stockQuantity', e.target.value)
                      }
                      required
                      disabled={isLoading}
                      inputProps={{ min: 0 }}
                    />
                  </Grid>

                  {/* Final Price Display */}
                  <Grid size={{ xs: 12 }}>
                    <Card
                      variant="outlined"
                      sx={{ backgroundColor: 'primary.50' }}
                    >
                      <CardContent>
                        <Typography variant="h6" color="primary">
                          Final Price: $
                          {(
                            (formData.price * (100 - formData.discount)) /
                            100
                          ).toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Original: ${formData.price} | Discount:{' '}
                          {formData.discount}%
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              )}

              {/* Action Buttons */}
              <Grid size={{ xs: 12 }}>
                <Box
                  sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}
                >
                  <Button
                    variant="outlined"
                    onClick={resetForm}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isFormValid() || isLoading}
                    startIcon={
                      isLoading ? <CircularProgress size={20} /> : null
                    }
                  >
                    {isLoading
                      ? isEditing
                        ? 'Updating...'
                        : 'Creating...'
                      : isEditing
                      ? 'Update Product'
                      : 'Add Product'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </SellersLayout>
  );
}

export default SellersManageProductScreen;
