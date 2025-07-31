import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import Grid2 from '@mui/material/Grid';
import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import {
  useSellersProductManagement,
  type SellerProductFormData,
} from '@kickzone-workspace/sellers-products-hooks';
import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

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
    isManagementLoading,
    isProductsLoading,
    isCreateLoading,
    isUpdateLoading,
    productsError,
    createError,
    updateError,
    createProduct,
    updateProduct,
  } = useSellersProductManagement();

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

    const variables = {
      input: {
        productInfoId: formData.productInfoId,
        price: formData.price,
        costPrice: formData.costPrice,
        discount: formData.discount,
        stockQuantity: formData.stockQuantity,
      },
    };

    if (isEditing && editingProductId) {
      await updateProduct(formData, editingProductId);
    } else {
      await createProduct(formData);
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

  const isLoading = isManagementLoading;

  return (
    <SellersLayout>
      <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </Typography>

          {(createError || updateError || productsError) && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {createError?.message ||
                updateError?.message ||
                productsError?.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={3}>
              {/* Product Selection */}
              <Grid2 size={{ xs: 12 }}>
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
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Box>
                        <Typography variant="body1">{option.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.categories.map((cat) => cat.name).join(', ')}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                />
              </Grid2>

              {/* Product Variant Selection */}
              {selectedProduct && (
                <Grid2 size={{ xs: 12 }}>
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
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
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
                            {option.size} - {option.color?.name || 'No Color'} (
                            {option.weight}
                            kg)
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  />
                </Grid2>
              )}

              {/* Product Details Card */}
              {selectedProduct && selectedProductInfo && (
                <Grid2 size={{ xs: 12 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Product Details
                      </Typography>
                      <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                          <Typography variant="body2" color="text.secondary">
                            Product: {selectedProduct.name}
                          </Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                          <Typography variant="body2" color="text.secondary">
                            Variant: {selectedProductInfo.size} -{' '}
                            {selectedProductInfo.color?.name || 'No Color'}
                          </Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                          <Typography variant="body2" color="text.secondary">
                            Weight: {selectedProductInfo.weight}kg
                          </Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                          <Typography variant="body2" color="text.secondary">
                            Categories:{' '}
                            {selectedProduct.categories
                              .map((cat) => cat.name)
                              .join(', ')}
                          </Typography>
                        </Grid2>
                      </Grid2>
                    </CardContent>
                  </Card>
                </Grid2>
              )}

              {/* Pricing and Stock Form */}
              {selectedProductInfo && (
                <>
                  <Grid2 size={{ xs: 12 }}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Pricing & Stock
                    </Typography>
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6 }}>
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
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6 }}>
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
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6 }}>
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
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6 }}>
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
                  </Grid2>

                  {/* Final Price Display */}
                  <Grid2 size={{ xs: 12 }}>
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
                  </Grid2>
                </>
              )}

              {/* Action Buttons */}
              <Grid2 size={{ xs: 12 }}>
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
                      ? 'Saving...'
                      : isEditing
                      ? 'Update Product'
                      : 'Add Product'}
                  </Button>
                </Box>
              </Grid2>
            </Grid2>
          </form>
        </Paper>
      </Box>
    </SellersLayout>
  );
}

export default SellersManageProductScreen;
