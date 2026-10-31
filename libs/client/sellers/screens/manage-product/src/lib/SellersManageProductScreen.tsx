import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import { useSellersProductManagement } from '@kickzone-workspace/sellers-products-hooks';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { PriceDisplay } from '@kickzone-workspace/price-display';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import { getLtrTextFieldProps } from '@kickzone-workspace/language-components';
import { formatVariantColorNames } from '@kickzone-workspace/client-shared-graphql';
import { formatSizeLabel, isPantsSizeKind, SizeKind } from '@kickzone-workspace/product-sizes';
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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  sellerProductFormSchema,
  type SellerProductFormInput,
} from '@kickzone-workspace/validation';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import {
  useI18nContext,
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';
import { SELLER_ROUTES } from '@kickzone-workspace/sellers-routes';
import { SellersDefineProductFlow } from './SellersDefineProductFlow';
import { alpha } from '@mui/material/styles';

const displayVariantSize = (info: { size: string; sizeKind?: string | null }): string =>
  isPantsSizeKind(info.sizeKind) ? formatSizeLabel(SizeKind.Pants, info.size) || info.size : info.size;

const initialFormData: KickzoneGraphqlTypes.CreateSellerProductInput = {
  productInfoId: 0,
  price: 0,
  costPrice: 0,
  discount: 0,
  stockQuantity: 0,
  boxLess: false,
};

export function SellersManageProductScreen() {
  const { user, canManageCatalog, sellerInfoLoading } = useSellersAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { showSnackbar } = useSnackbar();
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.sellerManageProduct());
  const { formatNumber, currentLocale } = useLanguageContext();
  const [formData, setFormData] =
    useState<KickzoneGraphqlTypes.CreateSellerProductInput>(initialFormData);
  const productForm = useForm<SellerProductFormInput>({
    values: formData,
    resolver: zodResolver(sellerProductFormSchema),
    mode: 'onSubmit',
  });
  const productErrors = productForm.formState.errors;
  const [selectedProduct, setSelectedProduct] =
    useState<KickzoneGraphqlTypes.Product | null>(null);
  const [selectedProductInfo, setSelectedProductInfo] =
    useState<KickzoneGraphqlTypes.ProductInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const defineRequested = searchParams.get('define') === '1';
  const mode: 'existing' | 'define' =
    canManageCatalog && !isEditing && defineRequested ? 'define' : 'existing';

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

  useEffect(() => {
    if (sellerInfoLoading || canManageCatalog || !defineRequested) {
      return;
    }
    setSearchParams({}, { replace: true });
  }, [sellerInfoLoading, canManageCatalog, defineRequested, setSearchParams]);

  // Handle seller product data when it's loaded
  useEffect(() => {
    if (sellerProduct && isEditing && sellerProduct.productInfo) {
      // Set the product and product info
      setSelectedProduct(sellerProduct.product);
      setSelectedProductInfo(sellerProduct.productInfo);

      // Set the form data
      const newFormData = {
        productInfoId: sellerProduct.productInfo.id,
        price: sellerProduct.price ?? 0,
        costPrice: sellerProduct.costPrice ?? 0,
        discount: sellerProduct.discount ?? 0,
        stockQuantity: sellerProduct.stockQuantity ?? 0,
        boxLess: sellerProduct.boxLess ?? false,
      };
      setFormData(newFormData);
    }
  }, [sellerProduct, isEditing, sellerProductError, isSellerProductLoading]);

  const productOptions = useMemo(() => {
    if (
      isEditing &&
      selectedProduct &&
      !products.some((p) => p.id === selectedProduct.id)
    ) {
      return [selectedProduct, ...products];
    }
    return products;
  }, [isEditing, selectedProduct, products]);

  const variantOptions = useMemo(() => {
    const list = selectedProduct?.productInfos || [];
    if (
      isEditing &&
      selectedProductInfo &&
      !list.some((info) => info.id === selectedProductInfo.id)
    ) {
      return [selectedProductInfo, ...list];
    }
    return list;
  }, [isEditing, selectedProductInfo, selectedProduct?.productInfos]);

  const resetForm = () => {
    setFormData(initialFormData);
    setSelectedProduct(null);
    setSelectedProductInfo(null);
    setIsEditing(false);
    setEditingProductId(null);
  };

  const handleCreateDefinedListings = async (
    listings: KickzoneGraphqlTypes.CreateSellerProductInput[]
  ) => {
    for (const listing of listings) {
      await createProduct(listing);
    }
    showSnackbar(LL.messages.listingsSaved(), {
      severity: 'success',
      duration: 4000,
    });
    resetForm();
    setSearchParams({}, { replace: true });
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
    value: string | number | boolean
  ) => {
    let parsed: any = value;
    if (typeof value === 'string') {
      if (field === 'stockQuantity') {
        parsed = value === '' ? 0 : parseInt(value, 10);
        if (isNaN(parsed) || parsed < 0) parsed = 0;
      } else if (
        field === 'price' ||
        field === 'costPrice' ||
        field === 'discount'
      ) {
        parsed = value === '' ? 0 : parseFloat(value);
        if (isNaN(parsed) || parsed < 0) parsed = 0;
      }
    }
    setFormData((prev) => ({
      ...prev,
      [field]: parsed,
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

    if (!(await productForm.trigger())) return;

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
            boxLess: formData.boxLess ?? false,
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

  const isFormValid = () => sellerProductFormSchema.safeParse(formData).success;

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
            color: 'text.primary',
            fontWeight: 600,
            borderBottom: '1px solid',
            borderColor: 'divider',
            pb: 2,
          }}
        >
          {isEditing ? LL.products.editProduct() : LL.button.addNewProduct()}
        </Typography>

        {canManageCatalog && !isEditing && (
          <Box sx={{ mb: 3 }}>
            <ToggleButtonGroup exclusive fullWidth value={mode} color="primary">
              <ToggleButton
                value="existing"
                component={RouterLink}
                to={SELLER_ROUTES.MANAGE_PRODUCT}
                replace
                sx={{ textTransform: 'none' }}
              >
                {LL.products.sellExistingProduct()}
              </ToggleButton>
              <ToggleButton
                value="define"
                component={RouterLink}
                to={`${SELLER_ROUTES.MANAGE_PRODUCT}?define=1`}
                replace
                sx={{ textTransform: 'none' }}
              >
                {LL.products.defineNewProduct()}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}

        {canManageCatalog && !isEditing && mode === 'define' ? (
          <SellersDefineProductFlow
            onCreateListings={handleCreateDefinedListings}
            isSubmitting={isManagementLoading}
          />
        ) : (
          <>
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
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: '0 4px 12px rgba(26,26,25,0.08)',
                      },
                      transition: 'all 0.3s',
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                        {LL.products.selectProduct()}
                      </Typography>
                      <Autocomplete
                        options={productOptions}
                        getOptionLabel={(option) => option.name}
                        value={selectedProduct}
                        onChange={(_, newValue) =>
                          handleProductChange(newValue)
                        }
                        isOptionEqualToValue={(option, value) =>
                          option?.id === value?.id
                        }
                        disabled={isEditing || isLoading}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={LL.button.chooseProduct()}
                            required
                            disabled={isEditing || isLoading}
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
                        <Typography
                          variant="h6"
                          sx={{ mb: 2, fontWeight: 600 }}
                        >
                          {LL.products.selectVariant()}
                        </Typography>
                        <Autocomplete
                          options={variantOptions}
                          getOptionLabel={(option) =>
                            `${displayVariantSize(option)} - ${formatVariantColorNames(
                              option.colors,
                              LL.products.noColorSpecified()
                            )} (${option.weight}kg)`
                          }
                          value={selectedProductInfo}
                          onChange={(_, newValue) =>
                            handleProductInfoChange(newValue)
                          }
                          isOptionEqualToValue={(option, value) =>
                            option?.id === value?.id
                          }
                          disabled={isEditing || isLoading}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={LL.button.chooseVariant()}
                              required
                              disabled={isEditing || isLoading}
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
                                  {option.colors?.map((color) => (
                                    <Box
                                      key={color.id}
                                      sx={{
                                        width: 24,
                                        height: 24,
                                        backgroundColor: color.hexCode,
                                        borderRadius: '50%',
                                        border: '2px solid white',
                                        boxShadow:
                                          '0 0 0 1px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.2)',
                                      }}
                                    />
                                  ))}
                                  <Box sx={{ flex: 1 }}>
                                    <Typography fontWeight={600}>
                                      {displayVariantSize(option)} -{' '}
                                      {formatVariantColorNames(
                                        option.colors,
                                        LL.products.noColorSpecified()
                                      )}
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
                      sx={(theme) => ({
                        borderRadius: 2,
                        border: '2px solid',
                        borderColor: 'info.200',
                        background:
                          'linear-gradient(135deg, #f0f4f8 0%, #e8eef5 100%)',
                        ...theme.applyStyles('dark', {
                          background: `linear-gradient(135deg, ${alpha(
                            theme.palette.info.main,
                            0.14
                          )} 0%, ${alpha(theme.palette.info.main, 0.04)} 100%)`,
                        }),
                      })}
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
                                {selectedProductInfo.colors?.map((color) => (
                                  <Box
                                    key={color.id}
                                    sx={{
                                      width: 20,
                                      height: 20,
                                      backgroundColor: color.hexCode,
                                      borderRadius: '50%',
                                      border: '2px solid white',
                                      boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
                                    }}
                                  />
                                ))}
                                <Typography variant="body1" fontWeight={500}>
                                  {displayVariantSize(selectedProductInfo)} -{' '}
                                  {formatVariantColorNames(
                                    selectedProductInfo.colors,
                                    LL.products.noColorSpecified()
                                  )}
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
                        error={Boolean(productErrors.price)}
                        onChange={(e) =>
                          handleInputChange('price', e.target.value)
                        }
                        required
                        disabled={isLoading}
                        {...getLtrTextFieldProps({
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          },
                        })}
                        slotProps={{
                          htmlInput: { dir: 'ltr', min: 0, step: 0.01 },
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label={LL.form.costPrice()}
                        type="number"
                        value={formData.costPrice}
                        error={Boolean(productErrors.costPrice)}
                        onChange={(e) =>
                          handleInputChange('costPrice', e.target.value)
                        }
                        required
                        disabled={isLoading}
                        {...getLtrTextFieldProps({
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          },
                        })}
                        slotProps={{
                          htmlInput: { dir: 'ltr', min: 0, step: 0.01 },
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
                        helperText={LL.products.discountHelper()}
                        {...getLtrTextFieldProps({
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          },
                        })}
                        slotProps={{
                          htmlInput: {
                            dir: 'ltr',
                            min: 0,
                            max: 100,
                            step: 0.01,
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
                        error={Boolean(productErrors.stockQuantity)}
                        onChange={(e) =>
                          handleInputChange('stockQuantity', e.target.value)
                        }
                        required
                        disabled={isLoading}
                        {...getLtrTextFieldProps({
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          },
                        })}
                        slotProps={{
                          htmlInput: { dir: 'ltr', min: 0 },
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.boxLess ?? false}
                            onChange={(e) =>
                              handleInputChange('boxLess', e.target.checked)
                            }
                            disabled={isLoading}
                            color="primary"
                          />
                        }
                        label={LL.products.boxLess()}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        {LL.products.boxLessHelper()}
                      </Typography>
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
                          <Typography
                            variant="h5"
                            sx={{ mb: 2, fontWeight: 700 }}
                          >
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

                          <Box
                            sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}
                          >
                            <Box>
                              <Typography
                                variant="caption"
                                sx={{ opacity: 0.8 }}
                              >
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
                              <Typography
                                variant="caption"
                                sx={{ opacity: 0.8 }}
                              >
                                {LL.products.discount()}
                              </Typography>
                              <Typography variant="h6" fontWeight={600}>
                                {formatNumber(formData.discount)}%
                              </Typography>
                            </Box>

                            <Box>
                              <Typography
                                variant="caption"
                                sx={{ opacity: 0.8 }}
                              >
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
                      color="primary"
                      disabled={!isFormValid()}
                      loading={isLoading}
                      size="large"
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 4,
                        boxShadow: 'none',
                        '&:hover': {
                          boxShadow: 'none',
                        },
                      }}
                    >
                      {isEditing
                        ? LL.button.updateProduct()
                        : LL.button.addProduct()}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </GlassmorphismContainer>
    </SellersLayout>
  );
}

export default SellersManageProductScreen;
