import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { CustomersProductCard } from '@kickzone-workspace/customers-product-card';
import { useProductsQuery } from '@kickzone-workspace/products-hook';
import { serializeVariantColorHexes } from '@kickzone-workspace/client-shared-graphql';
import {
  useI18nContext,
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ClearIcon from '@mui/icons-material/Clear';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SellIcon from '@mui/icons-material/Sell';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useCustomersCartService } from '@kickzone-workspace/customers-cart-hook';

const SEARCH_DEBOUNCE_MS = 400;

const filterFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    minHeight: { xs: 44, md: 48 },
  },
} as const;

export function CustomersHome() {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { LL } = useI18nContext();
  const { currentLocale } = useLanguageContext();
  const isRTL = currentLocale === 'fa';
  usePageTitle(() => LL.pageTitles.home());

  const { products, loading } = useProductsQuery({
    search,
    sort,
    sortOrder,
    pageSize: 12,
    onlyWithSellers: true,
    onlyInStock: true,
  });

  const { addItem } = useCustomersCartService();
  const heroDescription = LL.messages.homeDescription();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const productVariants = useMemo(() => {
    const variants: Array<{
      product: KickzoneGraphqlTypes.Product;
      productInfo: KickzoneGraphqlTypes.ProductInfo;
      sellerProduct: KickzoneGraphqlTypes.SellerProduct;
      isRecommended?: boolean;
      isBoxLess?: boolean;
      variantKey: string;
    }> = [];

    products.forEach((product) => {
      if (!product.productInfos || !product.sellerProducts) {
        return;
      }

      product.productInfos.forEach((productInfo) => {
        const allSellerProducts =
          product.sellerProducts?.filter(
            (sp) =>
              (sp.productInfoId === productInfo.id ||
                sp.productInfo?.id === productInfo.id) &&
              sp.seller &&
              sp.stockQuantity > 0
          ) || [];

        const sellerProductsWithPrice = allSellerProducts.map((sp) => {
          const originalPrice = sp.price;
          const discount = sp.discount || 0;
          const finalPrice =
            discount > 0
              ? originalPrice - (originalPrice * discount) / 100
              : originalPrice;

          return {
            sellerProduct: sp,
            originalPrice,
            finalPrice,
            discount,
          };
        });

        sellerProductsWithPrice.sort((a, b) => {
          if (a.finalPrice !== b.finalPrice) {
            return a.finalPrice - b.finalPrice;
          }
          return (
            (b.sellerProduct.stockQuantity || 0) -
            (a.sellerProduct.stockQuantity || 0)
          );
        });

        const bestSellerProduct = sellerProductsWithPrice[0];

        if (bestSellerProduct) {
          const isRecommended = Boolean(
            (
              bestSellerProduct.sellerProduct as unknown as {
                recommended?: boolean;
              }
            )?.recommended
          );
          const isBoxLess = Boolean(
            (
              bestSellerProduct.sellerProduct as unknown as {
                boxLess?: boolean;
              }
            )?.boxLess
          );
          variants.push({
            product,
            productInfo,
            sellerProduct: bestSellerProduct.sellerProduct,
            isRecommended,
            isBoxLess,
            variantKey: `${product.id}-${productInfo.id}`,
          });
        }
      });
    });

    return variants;
  }, [products]);

  const applySearchNow = useCallback(() => {
    setSearch(searchInput.trim());
  }, [searchInput]);

  const handleClearSearch = useCallback(() => {
    setSearchInput('');
    setSearch('');
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applySearchNow();
      }
    },
    [applySearchNow]
  );

  const handleAddToCart = useCallback(
    (variant: {
      product: KickzoneGraphqlTypes.Product;
      productInfo: KickzoneGraphqlTypes.ProductInfo;
      sellerProduct: KickzoneGraphqlTypes.SellerProduct;
    }) => {
      const { product, productInfo, sellerProduct } = variant;

      if (!sellerProduct.seller) {
        return;
      }

      const originalPrice = sellerProduct.price;
      const discount = sellerProduct.discount;
      const finalPrice =
        discount > 0
          ? originalPrice - (originalPrice * discount) / 100
          : originalPrice;

      addItem({
        productId: product.id.toString(),
        productName: product.name,
        productImage: productInfo.images?.[0] || null,
        quantity: 1,
        unitPrice: finalPrice,
        color: serializeVariantColorHexes(productInfo.colors),
        size: productInfo.size || null,
        sellerId: sellerProduct.seller.id.toString(),
        sellerName: '',
        sellerShippingFee: sellerProduct.seller.shippingFee || 0,
        productInfoId: productInfo.id.toString(),
        sellerProductId: sellerProduct.id.toString(),
        availableStock: sellerProduct.stockQuantity,
      });
    },
    [addItem]
  );

  const OrderIcon = sortOrder === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon;

  return (
    <CustomersLayout>
      <CssBaseline />

      <Box
        sx={{
          pt: { xs: 2, md: 3 },
          pb: { xs: 2.5, md: 3.5 },
          px: { xs: 1.5, sm: 2, md: 0 },
        }}
      >
        <Container maxWidth={false} disableGutters>
          <Fade in timeout={900}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: { xs: 4, md: 6 },
                overflow: 'hidden',
                minHeight: { xs: 240, sm: 300, md: 420 },
                boxShadow: '0 24px 48px rgba(0,0,0,0.18)',
                backgroundColor: '#0f0f0f',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url(/banner-image.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(1.3)',
                  transform: isRTL ? 'scale(1.02)' : 'scale(-1.02, 1)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: isRTL
                    ? 'linear-gradient(270deg, rgba(0,0,0,0.46) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.05) 100%)'
                    : 'linear-gradient(90deg, rgba(0,0,0,0.46) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.05) 100%)',
                }}
              />
              <Container
                maxWidth="lg"
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  px: { xs: 2.5, sm: 3, md: 4 },
                  py: { xs: 3.5, sm: 4, md: 6 },
                }}
              >
                <Box sx={{ maxWidth: { xs: '100%', md: '52%' } }}>
                  <Typography
                    component="h2"
                    variant="h3"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: '1.75rem', sm: '2.2rem', md: '3rem' },
                      letterSpacing: '-0.02em',
                      color: '#f0efeb',
                      mb: 1,
                      lineHeight: 1.15,
                    }}
                  >
                    <Box component="span" sx={{ color: '#c5b89a' }}>
                      {LL.messages.homeTitleAccent()}
                    </Box>{' '}
                    {LL.messages.homeTitle()}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 400,
                      fontSize: { xs: '0.95rem', sm: '1rem', md: '1.15rem' },
                      color: 'rgba(240,239,235,0.82)',
                      maxWidth: 520,
                      lineHeight: 1.55,
                    }}
                  >
                    {heroDescription}
                  </Typography>
                </Box>
              </Container>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 1, md: 2 },
          px: { xs: 1.5, sm: 2, md: 2 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2 },
            mb: { xs: 2, md: 3 },
            borderRadius: 3,
            border: (theme) =>
              theme.palette.mode === 'dark'
                ? '1px solid rgba(255,255,255,0.08)'
                : '1px solid rgba(0,0,0,0.08)',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.03)'
                : 'rgba(0,0,0,0.02)',
          }}
        >
          <Grid container spacing={{ xs: 1.5, sm: 2 }} alignItems="stretch">
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                variant="outlined"
                placeholder={LL.products.searchProductsPlaceholder()}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                fullWidth
                size="small"
                sx={filterFieldSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="primary" fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end" sx={{ gap: 0.25 }}>
                        {searchInput.length > 0 && (
                          <IconButton
                            size="small"
                            aria-label="clear search"
                            onClick={handleClearSearch}
                            edge="end"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        )}
                        <IconButton
                          size="small"
                          aria-label={LL.button.search()}
                          onClick={applySearchNow}
                          edge="end"
                          color="primary"
                        >
                          <SearchIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 6, lg: 3 }}>
              <FormControl fullWidth size="small" sx={filterFieldSx}>
                <InputLabel id="home-sort-label">{LL.form.sortBy()}</InputLabel>
                <Select
                  labelId="home-sort-label"
                  value={sort}
                  label={LL.form.sortBy()}
                  onChange={(e) => setSort(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SortIcon color="primary" fontSize="small" />
                        </InputAdornment>
                      ),
                    },
                  }}
                >
                  <MenuItem value="price">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SellIcon fontSize="small" />
                      {LL.table.price()}
                    </Box>
                  </MenuItem>
                  <MenuItem value="discount">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalOfferIcon fontSize="small" />
                      {LL.form.discount()}
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, lg: 3 }}>
              <FormControl fullWidth size="small" sx={filterFieldSx}>
                <InputLabel id="home-order-label">{LL.form.order()}</InputLabel>
                <Select
                  labelId="home-order-label"
                  value={sortOrder}
                  label={LL.form.order()}
                  onChange={(e) =>
                    setSortOrder(e.target.value as 'asc' | 'desc')
                  }
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <OrderIcon color="primary" fontSize="small" />
                        </InputAdornment>
                      ),
                    },
                  }}
                >
                  <MenuItem value="asc">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ArrowUpwardIcon fontSize="small" />
                      {LL.products.ascending()}
                    </Box>
                  </MenuItem>
                  <MenuItem value="desc">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ArrowDownwardIcon fontSize="small" />
                      {LL.products.descending()}
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: { xs: 280, md: 400 },
            }}
          >
            <CircularProgress />
          </Box>
        ) : productVariants.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              minHeight: { xs: 280, md: 400 },
              px: 2,
              textAlign: 'center',
            }}
          >
            <SearchIcon sx={{ fontSize: 48, opacity: 0.25, mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {LL.products.noProductsFound()}
            </Typography>
            {search && (
              <Typography variant="body2" color="text.secondary">
                {LL.products.searchProducts()}: "{search}"
              </Typography>
            )}
          </Box>
        ) : (
          <Fade in timeout={800}>
            <Grid
              container
              spacing={{ xs: 2, sm: 2.5, md: 3 }}
              sx={{
                ...(productVariants.length === 1
                  ? { justifyContent: 'center' }
                  : {}),
                pb: { xs: 2, md: 3 },
              }}
            >
              {productVariants.map((variant, index) => {
                const variantProduct: KickzoneGraphqlTypes.Product = {
                  ...variant.product,
                  productInfos: [variant.productInfo],
                  sellerProducts: [variant.sellerProduct],
                };

                return (
                  <Grid
                    key={variant.variantKey}
                    size={
                      productVariants.length === 1
                        ? { xs: 12, sm: 8, md: 6, lg: 4 }
                        : { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }
                    }
                    sx={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                      '@keyframes fadeInUp': {
                        '0%': {
                          opacity: 0,
                          transform: 'translateY(30px)',
                        },
                        '100%': {
                          opacity: 1,
                          transform: 'translateY(0)',
                        },
                      },
                    }}
                  >
                    <CustomersProductCard
                      product={variantProduct}
                      isRecommended={variant.isRecommended ?? false}
                      isBoxLess={variant.isBoxLess ?? false}
                      onAddToCart={() => handleAddToCart(variant)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Fade>
        )}
      </Container>
    </CustomersLayout>
  );
}

export default CustomersHome;
