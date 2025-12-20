import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import { useSellersProductManagement } from '@kickzone-workspace/sellers-products-hooks';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { PriceDisplay } from '@kickzone-workspace/price-display';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useI18nContext,
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';

const initialFormData: KickzoneGraphqlTypes.CreateSellerProductInput = {
  productInfoId: 0,
  price: 0,
  costPrice: 0,
  discount: 0,
  stockQuantity: 0,
};

export function SellersManageProductScreen() {
  const { user } = useSellersAuthContext();
  const [searchParams] = useSearchParams();
  const { showSnackbar } = useSnackbar();
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.sellerManageProduct());
  const { formatNumber, currentLocale } = useLanguageContext();
  const [formData, setFormData] =
    useState<KickzoneGraphqlTypes.CreateSellerProductInput>(initialFormData);
  const [selectedProduct, setSelectedProduct] =
    useState<KickzoneGraphqlTypes.Product | null>(null);
  const [selectedProductInfo, setSelectedProductInfo] =
    useState<KickzoneGraphqlTypes.ProductInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

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
    if (sellerProductId) {
      setIsEditing(true);
      setEditingProductId(sellerProductId);

      // Fetch the seller product data
      getSellerProductById({ variables: { id: sellerProductId } });
    } else {
      setIsEditing(false);
      setEditingProductId(null);
    }
  }, [searchParams, getSellerProductById]);

  // Handle seller product data when it's loaded
  useEffect(() => {
    if (sellerProduct && isEditing && sellerProduct.productInfo) {
      // Set the product and product info
      setSelectedProduct(sellerProduct.product);
      setSelectedProductInfo(sellerProduct.productInfo);

      // Set the form data
      const newFormData = {
        productInfoId: sellerProduct.productInfo.id,
        price: sellerProduct.price || 0,
        costPrice: sellerProduct.costPrice || 0,
        discount: sellerProduct.discount || 0,
        stockQuantity: sellerProduct.stockQuantity || 0,
      };
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
      productInfoId: 0,
    }));
  };

  const handleProductInfoChange = (
    productInfo: KickzoneGraphqlTypes.ProductInfo | null
  ) => {
    setSelectedProductInfo(productInfo);
    setFormData((prev) => ({
      ...prev,
      productInfoId: productInfo?.id || 0,
    }));
  };

  const handleInputChange = (
    field: keyof KickzoneGraphqlTypes.CreateSellerProductInput,
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
        await updateProduct(
          {
            id: editingProductId,
            productInfoId: formData.productInfoId,
            price: formData.price,
            costPrice: formData.costPrice,
            discount: formData.discount,
            stockQuantity: formData.stockQuantity,
          },
          editingProductId
        );
        showSnackbar(LL.messages.productUpdated(), {
          severity: 'success',
          duration: 4000,
        });
      } else {
        await createProduct(formData);
        showSnackbar(LL.messages.productSaved(), {
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
      formData.productInfoId > 0 &&
      formData.price > 0 &&
      formData.costPrice > 0 &&
      formData.stockQuantity > 0 &&
      formData.discount >= 0 &&
      formData.discount <= 100
    );
  };

  const isLoading =
    isManagementLoading || isProductsLoading || isSellerProductLoading;

  const finalPrice = (formData.price * (100 - formData.discount)) / 100;

  // Show loading state while products are being fetched
  if (isProductsLoading || (isEditing && isSellerProductLoading)) {
    return (
      <SellersLayout>
        <GlassmorphismContainer
          containerSx={{ maxWidth: 1200, margin: '0 auto' }}
        >
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
              {LL.products.loadingProducts()}
            </Typography>
          </Box>
        </GlassmorphismContainer>
      </SellersLayout>
    );
  }

  return (
    <SellersLayout>
      <GlassmorphismContainer
        containerSx={{ maxWidth: 1200, margin: '0 auto' }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            color: 'primary.main',
            fontWeight: 700,
            borderBottom: '3px solid',
            borderColor: 'primary.main',
            pb: 2,
          }}
        >
          {isEditing ? LL.products.editProduct() : LL.button.addNewProduct()}
        </Typography>

        {(createError ||
          updateError ||
          productsError ||
          sellerProductError) && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {createError?.message ||
              updateError?.message ||
              productsError?.message ||
              sellerProductError?.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Product Selection */}
            <Grid size={{ xs: 12 }}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  border: '2px solid',
                  borderColor: 'primary.100',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    {LL.products.selectProduct()}
                  </Typography>
                  <Autocomplete
                    options={products}
                    getOptionLabel={(option) => option.name}
                    value={selectedProduct}
                    onChange={(_, newValue) => handleProductChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={LL.button.chooseProduct()}
                        required
                        disabled={isLoading}
                      />
                    )}
                    renderOption={(props, option) => {
                      const { key, ...otherProps } = props;
                      return (
                        <Box
                          component="li"
                          key={key}
                          {...otherProps}
                          sx={{ py: 1.5 }}
                        >
                          <Box sx={{ width: '100%' }}>
                            <Typography variant="body1" fontWeight={600}>
                              {option.name}
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                gap: 0.5,
                                mt: 0.5,
                                flexWrap: 'wrap',
                              }}
                            >
                              {option.categories.map((cat) => (
                                <Chip
                                  key={cat.id}
                                  label={cat.name}
                                  size="small"
                                  sx={{
                                    backgroundColor: 'primary.50',
                                    color: 'primary.main',
                                    fontSize: '0.7rem',
                                    height: 20,
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      );
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Product Variant Selection */}
            {selectedProduct && (
              <Grid size={{ xs: 12 }}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'secondary.100',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {LL.products.selectVariant()}
                    </Typography>
                    <Autocomplete
                      options={selectedProduct.productInfos}
                      getOptionLabel={(option) =>
                        `${option.size} - ${
                          option.color?.name || LL.products.noColorSpecified()
                        } (${option.weight}kg)`
                      }
                      value={selectedProductInfo}
                      onChange={(_, newValue) =>
                        handleProductInfoChange(newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={LL.button.chooseVariant()}
                          required
                          disabled={isLoading}
                        />
                      )}
                      renderOption={(props, option) => {
                        const { key, ...otherProps } = props;
                        return (
                          <Box
                            component="li"
                            key={key}
                            {...otherProps}
                            sx={{ py: 1.5 }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                width: '100%',
                              }}
                            >
                              {option.color && (
                                <Box
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    backgroundColor: option.color.hexCode,
                                    borderRadius: '50%',
                                    border: '2px solid white',
                                    boxShadow:
                                      '0 0 0 1px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.2)',
                                  }}
                                />
                              )}
                              <Box sx={{ flex: 1 }}>
                                <Typography fontWeight={600}>
                                  {option.size} -{' '}
                                  {option.color?.name ||
                                    LL.products.noColorSpecified()}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {LL.products.weight()}:{' '}
                                  {formatNumber(option.weight)}kg
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        );
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Product Details Card */}
            {selectedProduct && selectedProductInfo && (
              <Grid size={{ xs: 12 }}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    background:
                      'linear-gradient(135deg, #f0f4f8 0%, #e8eef5 100%)',
                    border: '2px solid',
                    borderColor: 'info.200',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{ mb: 3, fontWeight: 600, color: 'info.main' }}
                    >
                      {LL.products.productDetails()}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                          >
                            {LL.form.productName()}
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {selectedProduct.name}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                          >
                            {LL.products.variant()}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              mt: 0.5,
                            }}
                          >
                            {selectedProductInfo.color && (
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  backgroundColor:
                                    selectedProductInfo.color.hexCode,
                                  borderRadius: '50%',
                                  border: '2px solid white',
                                  boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
                                }}
                              />
                            )}
                            <Typography variant="body1" fontWeight={500}>
                              {selectedProductInfo.size} -{' '}
                              {selectedProductInfo.color?.name ||
                                LL.products.noColorSpecified()}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                          >
                            {LL.products.weight()}
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {formatNumber(selectedProductInfo.weight)}kg
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                          >
                            {LL.products.categories()}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              gap: 0.5,
                              mt: 0.5,
                              flexWrap: 'wrap',
                            }}
                          >
                            {selectedProduct.categories.map((cat) => (
                              <Chip
                                key={cat.id}
                                label={cat.name}
                                size="small"
                                sx={{
                                  backgroundColor: 'success.50',
                                  color: 'success.main',
                                  fontWeight: 600,
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
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
                  <Typography
                    variant="h6"
                    sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}
                  >
                    {LL.products.pricingInformation()}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label={LL.form.price()}
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                    disabled={isLoading}
                    inputProps={{ min: 0, step: 0.01 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label={LL.form.costPrice()}
                    type="number"
                    value={formData.costPrice}
                    onChange={(e) =>
                      handleInputChange('costPrice', e.target.value)
                    }
                    required
                    disabled={isLoading}
                    inputProps={{ min: 0, step: 0.01 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label={LL.form.discount()}
                    type="number"
                    value={formData.discount}
                    onChange={(e) =>
                      handleInputChange('discount', e.target.value)
                    }
                    disabled={isLoading}
                    inputProps={{ min: 0, max: 100, step: 0.01 }}
                    helperText={LL.products.discountHelper()}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label={LL.form.stockQuantity()}
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) =>
                      handleInputChange('stockQuantity', e.target.value)
                    }
                    required
                    disabled={isLoading}
                    inputProps={{ min: 0 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>

                {/* Final Price Display */}
                <Grid size={{ xs: 12 }}>
                  <Card
                    sx={{
                      background:
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: 3,
                      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.25)',
                      color: 'white',
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                        {LL.products.finalPriceAfterDiscount()}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Typography variant="h3" sx={{ fontWeight: 700 }}>
                          ${formatNumber(finalPrice.toFixed(2))}
                        </Typography>
                        {currentLocale === 'fa' && (
                          <Box
                            sx={{
                              px: 2,
                              py: 1,
                              bgcolor: 'rgba(255,255,255,0.2)',
                              borderRadius: 2,
                              fontSize: '1.5rem',
                              fontWeight: 700,
                            }}
                          >
                            <PriceDisplay
                              priceInUSD={finalPrice}
                              showSymbol={true}
                              showOriginal={false}
                            />
                          </Box>
                        )}
                      </Box>

                      <Divider
                        sx={{ my: 2, borderColor: 'rgba(255,255,255,0.3)' }}
                      />

                      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                        <Box>
                          <Typography variant="caption" sx={{ opacity: 0.8 }}>
                            {LL.products.original()}
                          </Typography>
                          <Typography variant="h6" fontWeight={600}>
                            ${formatNumber(formData.price)}
                            {currentLocale === 'fa' && (
                              <Box
                                component="span"
                                sx={{
                                  ml: 1,
                                  fontSize: '0.9rem',
                                  opacity: 0.9,
                                }}
                              >
                                (
                                <PriceDisplay
                                  priceInUSD={formData.price}
                                  showSymbol={true}
                                  showOriginal={false}
                                />
                                )
                              </Box>
                            )}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="caption" sx={{ opacity: 0.8 }}>
                            {LL.products.discount()}
                          </Typography>
                          <Typography variant="h6" fontWeight={600}>
                            {formatNumber(formData.discount)}%
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="caption" sx={{ opacity: 0.8 }}>
                            {LL.products.savings()}
                          </Typography>
                          <Typography variant="h6" fontWeight={600}>
                            $
                            {formatNumber(
                              (formData.price - finalPrice).toFixed(2)
                            )}
                            {currentLocale === 'fa' && (
                              <Box
                                component="span"
                                sx={{
                                  ml: 1,
                                  fontSize: '0.9rem',
                                  opacity: 0.9,
                                }}
                              >
                                (
                                <PriceDisplay
                                  priceInUSD={formData.price - finalPrice}
                                  showSymbol={true}
                                  showOriginal={false}
                                />
                                )
                              </Box>
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}

            {/* Action Buttons */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'flex-end',
                  pt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={resetForm}
                  disabled={isLoading}
                  size="large"
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 4,
                  }}
                >
                  {LL.button.clear()}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!isFormValid() || isLoading}
                  size="large"
                  startIcon={isLoading ? <CircularProgress size={20} /> : null}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 4,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  {isLoading
                    ? isEditing
                      ? LL.button.updating()
                      : LL.button.creating()
                    : isEditing
                    ? LL.button.updateProduct()
                    : LL.button.addProduct()}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </GlassmorphismContainer>
    </SellersLayout>
  );
}

export default SellersManageProductScreen;
