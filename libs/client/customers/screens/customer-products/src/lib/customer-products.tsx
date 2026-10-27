import React, { useMemo, useState } from 'react';
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
import Autocomplete from '@mui/material/Autocomplete';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Search from '@mui/icons-material/Search';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import {
  useCustomersProducts,
  useCustomersCategories,
  useCustomersColors,
  useDistinctProductSizes,
} from '@kickzone-workspace/customers-product-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useCustomersCartService } from '@kickzone-workspace/customers-cart-hook';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import {
  formatVariantColorNames,
  serializeVariantColorHexes,
} from '@kickzone-workspace/client-shared-graphql';
import { PriceDisplay } from '@kickzone-workspace/price-display';
import {
  euToUs,
  expandFilterSizes,
  formatSizeLabel,
  FootwearSizeSystem,
  isFootwearSizeKind,
  isPantsSizeKind,
  SizeKind,
  sortSizeCodes,
} from '@kickzone-workspace/product-sizes';

export function CustomerProducts() {
  const { LL } = useI18nContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<
    KickzoneGraphqlTypes.Category[]
  >([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [sizeFilterKind, setSizeFilterKind] = useState<SizeKind>(
    SizeKind.Apparel
  );
  const [footwearSystem, setFootwearSystem] = useState<FootwearSizeSystem>(
    FootwearSizeSystem.Eu
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { addItem } = useCustomersCartService();

  const resetPage = () => setCurrentPage(1);

  const getPricingInfo = (product: KickzoneGraphqlTypes.Product) => {
    if (!product.sellerProducts || product.sellerProducts.length === 0) {
      return null;
    }

    const sellerProduct = product.sellerProducts[0];

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
    };

    return pricingInfo;
  };

  const canonicalFilterSizes = useMemo(
    () =>
      expandFilterSizes(sizeFilterKind, footwearSystem, selectedSizes),
    [sizeFilterKind, footwearSystem, selectedSizes]
  );

  const productInfoFilter = useMemo<
    KickzoneGraphqlTypes.ProductInfoFilterInput | undefined
  >(
    () =>
      selectedColor || canonicalFilterSizes.length
        ? {
            ...(selectedColor
              ? { colorId: [parseInt(selectedColor, 10)] }
              : {}),
            ...(canonicalFilterSizes.length
              ? {
                  size: canonicalFilterSizes,
                  sizeKind: sizeFilterKind,
                }
              : {}),
          }
        : undefined,
    [selectedColor, canonicalFilterSizes, sizeFilterKind]
  );

  const filter = useMemo<KickzoneGraphqlTypes.ProductFilterInput>(
    () => ({
      searchTerm: searchTerm || undefined,
      categoryIds: selectedCategories.length
        ? selectedCategories.map((category) => category.id)
        : undefined,
      productInfoFilter,
      onlyWithSellers: true, // Only show products that have sellers
      onlyInStock: true, // Only show products that are in stock
    }),
    [productInfoFilter, searchTerm, selectedCategories]
  );

  const afterCursor = useMemo(
    () =>
      currentPage > 1
        ? btoa(`cursor:${(currentPage - 1) * itemsPerPage}`)
        : undefined,
    [currentPage, itemsPerPage]
  );

  const {
    products,
    totalCount,
    loading: productsLoading,
    error: productsError,
  } = useCustomersProducts({
    first: itemsPerPage,
    after: afterCursor,
    filter,
  });

  const { categories } = useCustomersCategories();
  const { colors } = useCustomersColors();
  const { sizes: catalogSizes } = useDistinctProductSizes(sizeFilterKind);
  const safeColors: KickzoneGraphqlTypes.Color[] = (colors ?? []).filter(
    (color): color is KickzoneGraphqlTypes.Color =>
      Boolean(
        color &&
          typeof color.id === 'number' &&
          typeof color.hexCode === 'string' &&
          typeof color.name === 'string'
      )
  );

  const availableSizes = useMemo(() => {
    const sorted = sortSizeCodes(sizeFilterKind, catalogSizes);
    if (
      sizeFilterKind === SizeKind.Footwear &&
      footwearSystem === FootwearSizeSystem.Us
    ) {
      const usCodes = new Set<string>();
      for (const eu of sorted) {
        const us = euToUs(eu);
        if (us) {
          usCodes.add(us);
        }
      }
      return Array.from(usCodes).sort((a, b) => Number(a) - Number(b));
    }
    return sorted;
  }, [catalogSizes, sizeFilterKind, footwearSystem]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    resetPage();
  };

  const handleCategoryChange = (
    _event: React.SyntheticEvent,
    value: KickzoneGraphqlTypes.Category[]
  ) => {
    setSelectedCategories(value);
    resetPage();
  };

  const handleSizeChange = (_event: React.SyntheticEvent, value: string[]) => {
    setSelectedSizes(value);
    resetPage();
  };

  const handleSizeKindChange = (
    _event: React.MouseEvent<HTMLElement>,
    next: SizeKind | null
  ) => {
    if (!next) {
      return;
    }
    setSizeFilterKind(next);
    setSelectedSizes([]);
    resetPage();
  };

  const handleFootwearSystemChange = (
    _event: React.MouseEvent<HTMLElement>,
    next: FootwearSizeSystem | null
  ) => {
    if (!next) {
      return;
    }
    setFootwearSystem(next);
    setSelectedSizes([]);
    resetPage();
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    setSelectedColor(event.target.value as string);
    resetPage();
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
      color: serializeVariantColorHexes(productInfo.colors),
      size: productInfo.size || null,
      sellerId: sellerProduct.seller.id.toString(),
      sellerName: '', // Not displayed to customers
      sellerShippingFee: sellerProduct.seller.shippingFee || 0,
      productInfoId: productInfo.id.toString(),
      sellerProductId: sellerProduct.id.toString(),
      availableStock: sellerProduct.stockQuantity,
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

          <Autocomplete
            multiple
            options={categories}
            value={selectedCategories}
            onChange={handleCategoryChange}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label={LL.form.category()}
                placeholder={LL.products.allCategories()}
              />
            )}
            sx={{ minWidth: 220 }}
          />

          <ToggleButtonGroup
            exclusive
            size="small"
            value={sizeFilterKind}
            onChange={handleSizeKindChange}
            aria-label={LL.products.sizeKind()}
          >
            <ToggleButton value={SizeKind.Apparel}>
              {LL.products.sizeKindApparel()}
            </ToggleButton>
            <ToggleButton value={SizeKind.Footwear}>
              {LL.products.sizeKindFootwear()}
            </ToggleButton>
            <ToggleButton value={SizeKind.Pants}>
              {LL.products.sizeKindPants()}
            </ToggleButton>
          </ToggleButtonGroup>

          {(sizeFilterKind === SizeKind.Footwear || sizeFilterKind === SizeKind.Pants) ? (
            <ToggleButtonGroup
              exclusive
              size="small"
              value={footwearSystem}
              onChange={handleFootwearSystemChange}
              aria-label={LL.products.size()}
            >
              <ToggleButton value={FootwearSizeSystem.Eu}>
                {LL.products.sizeSystemEu()}
              </ToggleButton>
              <ToggleButton value={FootwearSizeSystem.Us}>
                {LL.products.sizeSystemUs()}
              </ToggleButton>
            </ToggleButtonGroup>
          ) : null}

          <Autocomplete
            multiple
            options={availableSizes}
            value={selectedSizes}
            onChange={handleSizeChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label={LL.products.size()}
                placeholder={LL.products.size()}
              />
            )}
            sx={{ minWidth: 180 }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>{LL.form.color()}</InputLabel>
            <Select
              value={selectedColor}
              onChange={handleColorChange}
              label={LL.form.color()}
            >
              <MenuItem value="">{LL.products.allCategories()}</MenuItem>
              {safeColors.map((color) => (
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
            const primaryInfo = product.productInfos[0];
            const canAddToCart = Boolean(
              primaryInfo && !hasNoSellers && !isOutOfStock
            );

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
                  {primaryInfo?.images?.[0] && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={primaryInfo.images?.[0]}
                      alt={product.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {product.name}
                    </Typography>

                    {product.sku && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {LL.products.itemCodeSku()}: {product.sku}
                      </Typography>
                    )}

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
                              <PriceDisplay
                                priceInUSD={pricingInfo.originalPrice}
                                showSymbol={true}
                                showOriginal={false}
                              />
                            </Typography>
                          )}
                          <Typography
                            variant="h6"
                            color={
                              pricingInfo.discount > 0 ? 'error' : 'primary'
                            }
                            sx={{ fontWeight: 'bold' }}
                          >
                            <PriceDisplay
                              priceInUSD={pricingInfo.finalPrice}
                              showSymbol={true}
                              showOriginal={false}
                            />
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
                          {info.colors?.map((color) => (
                            <Box
                              key={color.id}
                              sx={{
                                width: 16,
                                height: 16,
                                backgroundColor: color.hexCode,
                                border: '1px solid #ccc',
                                borderRadius: '50%',
                              }}
                              title={color.name}
                            />
                          ))}
                          <Typography variant="caption">
                            {formatSizeLabel(
                              info.sizeKind ?? SizeKind.Apparel,
                              info.size,
                              FootwearSizeSystem.Eu
                            )}
                            {isFootwearSizeKind(info.sizeKind) &&
                            euToUs(info.size)
                              ? ` (${LL.products.usEquivalent({
                                  us: euToUs(info.size)!,
                                })})`
                              : ''}
                            {info.colors?.length
                              ? ` · ${formatVariantColorNames(info.colors)}`
                              : ''}
                          </Typography>
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
                        primaryInfo && handleAddToCart(product, primaryInfo)
                      }
                      disabled={!canAddToCart}
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
