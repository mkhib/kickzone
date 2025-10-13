import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import { Search, ShoppingCart } from '@mui/icons-material';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import {
  useCustomersProducts,
  useCustomersCategories,
  useCustomersColors,
} from '@kickzone-workspace/customers-product-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useCustomersCartService } from '@kickzone-workspace/customers-cart-hook';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';

export function CustomerProducts() {
  const { LL } = useI18nContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { addItem } = useCustomersCartService();

  // Helper function to get pricing info for a product
  const getPricingInfo = (product: KickzoneGraphqlTypes.Product) => {
    console.log('🔍 Product data for stock check:', {
      productId: product.id,
      productName: product.name,
      sellerProducts: product.sellerProducts,
      sellerProductsLength: product.sellerProducts?.length || 0,
    });

    if (!product.sellerProducts || product.sellerProducts.length === 0) {
      console.log('❌ No seller products found for product:', product.name);
      return null;
    }

    // Get the first available seller product
    const sellerProduct = product.sellerProducts[0];
    console.log('📦 First seller product data:', {
      sellerProductId: sellerProduct.id,
      price: sellerProduct.price,
      discount: sellerProduct.discount,
      stockQuantity: sellerProduct.stockQuantity,
      sellerName: sellerProduct.seller?.storeName,
      seller: sellerProduct.seller,
    });

    const originalPrice = sellerProduct.price;
    const discount = sellerProduct.discount;
    const finalPrice =
      discount > 0
        ? originalPrice - (originalPrice * discount) / 100
        : originalPrice;

    const pricingInfo = {
      originalPrice,
      finalPrice,
      discount,
      stockQuantity: sellerProduct.stockQuantity,
      sellerName:
        sellerProduct.seller?.storeName || LL.products.unknownSeller(),
    };

    console.log('💰 Calculated pricing info:', pricingInfo);
    console.log('📊 Stock check result:', {
      stockQuantity: pricingInfo.stockQuantity,
      isOutOfStock: pricingInfo.stockQuantity <= 0,
    });

    return pricingInfo;
  };

  const filter: KickzoneGraphqlTypes.ProductFilterInput = {
    searchTerm: searchTerm || undefined,
    categoryId: selectedCategory ? parseInt(selectedCategory) : undefined,
    productInfoFilter: selectedColor
      ? { colorId: [parseInt(selectedColor)] }
      : undefined,
    onlyWithSellers: true, // Only show products that have sellers
    onlyInStock: true, // Only show products that are in stock
  };

  const {
    products,
    totalCount,
    loading: productsLoading,
    error: productsError,
  } = useCustomersProducts({
    first: itemsPerPage,
    after:
      currentPage > 1
        ? btoa(`cursor:${(currentPage - 1) * itemsPerPage}`)
        : undefined,
    filter,
  });

  // Debug: Log raw products data
  console.log('📦 Raw products data from API:', {
    products,
    productsLength: products?.length || 0,
    productsLoading,
    productsError,
  });

  const { categories } = useCustomersCategories();
  const { colors } = useCustomersColors();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
    setCurrentPage(1);
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    setSelectedColor(event.target.value as string);
    setCurrentPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (
    product: KickzoneGraphqlTypes.Product,
    productInfo: KickzoneGraphqlTypes.ProductInfo
  ) => {
    // Find the sellerProduct that matches this productInfo
    const sellerProduct = product.sellerProducts?.find(
      (sp) => sp.productInfoId === productInfo.id
    );

    if (!sellerProduct || !sellerProduct.seller) {
      console.error('No seller product found for this product info');
      return;
    }

    // Check stock availability
    if (sellerProduct.stockQuantity <= 0) {
      console.error('Product out of stock');
      return;
    }

    // Calculate final price after discount
    const finalPrice =
      sellerProduct.discount > 0
        ? sellerProduct.price -
          (sellerProduct.price * sellerProduct.discount) / 100
        : sellerProduct.price;

    addItem({
      productId: product.id.toString(),
      productName: product.name,
      productImage: productInfo.images?.[0] || null,
      quantity: 1,
      unitPrice: finalPrice,
      color: productInfo.color?.name || null,
      size: productInfo.size || null,
      sellerId: sellerProduct.seller.id.toString(),
      sellerName: sellerProduct.seller.storeName,
      productInfoId: productInfo.id.toString(),
      sellerProductId: sellerProduct.id.toString(),
    });
  };

  if (productsLoading) {
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

  if (productsError) {
    return (
      <CustomersLayout>
        <Alert severity="error">
          Error loading products: {productsError.message}
        </Alert>
      </CustomersLayout>
    );
  }

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <CustomersLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {LL.navigation.products()}
        </Typography>

        {/* Filters */}
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <TextField
            placeholder={LL.products.searchProductsPlaceholder()}
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200 }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>{LL.form.category()}</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label={LL.form.category()}
            >
              <MenuItem value="">{LL.products.allCategories()}</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>{LL.form.color()}</InputLabel>
            <Select
              value={selectedColor}
              onChange={handleColorChange}
              label={LL.form.color()}
            >
              <MenuItem value="">{LL.products.allCategories()}</MenuItem>
              {colors.map((color) => (
                <MenuItem key={color.id} value={color.id.toString()}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: color.hexCode,
                        border: '1px solid #ccc',
                        borderRadius: '50%',
                      }}
                    />
                    {color.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {products.map((product) => {
            const pricingInfo = getPricingInfo(product);
            const hasNoSellers = Boolean(
              !product.sellerProducts || product.sellerProducts.length === 0
            );
            const isOutOfStock = pricingInfo
              ? pricingInfo.stockQuantity <= 0
              : false;

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: isOutOfStock ? 0.6 : 1,
                  }}
                >
                  {product.productInfos[0]?.images?.[0] && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.productInfos[0]?.images?.[0]}
                      alt={product.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {product.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {product.description}
                    </Typography>

                    {/* Pricing Information */}
                    {hasNoSellers ? (
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {LL.products.noSellersAvailable()}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="warning.main"
                          sx={{ fontWeight: 'bold' }}
                        >
                          {LL.products.checkBackLater()}
                        </Typography>
                      </Box>
                    ) : pricingInfo ? (
                      <Box sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          {pricingInfo.discount > 0 && (
                            <Typography
                              variant="body2"
                              sx={{
                                textDecoration: 'line-through',
                                color: 'text.secondary',
                              }}
                            >
                              ${pricingInfo.originalPrice.toFixed(2)}
                            </Typography>
                          )}
                          <Typography
                            variant="h6"
                            color={
                              pricingInfo.discount > 0 ? 'error' : 'primary'
                            }
                            sx={{ fontWeight: 'bold' }}
                          >
                            ${pricingInfo.finalPrice.toFixed(2)}
                          </Typography>
                          {pricingInfo.discount > 0 && (
                            <Chip
                              label={`${pricingInfo.discount}% OFF`}
                              size="small"
                              color="error"
                              variant="outlined"
                            />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {LL.products.by()} {pricingInfo.sellerName}
                        </Typography>
                        <Typography
                          variant="body2"
                          color={isOutOfStock ? 'error' : 'success.main'}
                          sx={{ fontWeight: 'bold' }}
                        >
                          {isOutOfStock
                            ? LL.products.outOfStock()
                            : `${
                                pricingInfo.stockQuantity
                              } ${LL.products.left()}`}
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {LL.products.priceNotAvailable()}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="warning.main"
                          sx={{ fontWeight: 'bold' }}
                        >
                          {LL.products.contactSeller()}
                        </Typography>
                      </Box>
                    )}

                    <Box sx={{ mb: 2 }}>
                      {product.categories.map((category) => (
                        <Chip
                          key={category.id}
                          label={category.name}
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>

                    <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                      {LL.products.availableVariants()}:{' '}
                      {product.productInfos.length}
                    </Typography>

                    <Box
                      sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}
                    >
                      {product.productInfos.slice(0, 3).map((info) => (
                        <Box
                          key={info.id}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          {info.color && (
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                backgroundColor: info.color.hexCode,
                                border: '1px solid #ccc',
                                borderRadius: '50%',
                              }}
                            />
                          )}
                          <Typography variant="caption">{info.size}</Typography>
                        </Box>
                      ))}
                      {product.productInfos.length > 3 && (
                        <Typography variant="caption">
                          +{product.productInfos.length - 3}{' '}
                          {LL.products.more()}
                        </Typography>
                      )}
                    </Box>

                    <Button
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      onClick={() =>
                        handleAddToCart(product, product.productInfos[0])
                      }
                      disabled={hasNoSellers || isOutOfStock}
                      fullWidth
                      sx={{
                        backgroundColor:
                          hasNoSellers || isOutOfStock
                            ? 'grey.400'
                            : 'primary.main',
                        '&:hover': {
                          backgroundColor:
                            hasNoSellers || isOutOfStock
                              ? 'grey.400'
                              : 'primary.dark',
                        },
                      }}
                    >
                      {hasNoSellers
                        ? LL.products.noSellers()
                        : isOutOfStock
                        ? LL.products.outOfStock()
                        : LL.products.addToCart()}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}

        {products.length === 0 && !productsLoading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              {LL.products.noProductsFound()}
            </Typography>
          </Box>
        )}
      </Box>
    </CustomersLayout>
  );
}

export default CustomerProducts;
