import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import { useSellersProducts } from '@kickzone-workspace/sellers-products-hooks';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { Link as RouterLink } from 'react-router-dom';
import { useSellersProductsStore } from '@kickzone-workspace/sellers-products-store';
import {
  useI18nContext,
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';
import { PriceDisplay } from '@kickzone-workspace/price-display';
import { formatVariantColorNames } from '@kickzone-workspace/client-shared-graphql';
import { formatSizeLabel, isPantsSizeKind, SizeKind } from '@kickzone-workspace/product-sizes';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { SELLER_ROUTES } from '@kickzone-workspace/sellers-routes';
import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { useState, useEffect } from 'react';

const displayVariantSize = (info?: { size?: string | null; sizeKind?: string | null } | null): string =>
  !info?.size ? '' : isPantsSizeKind(info.sizeKind) ? formatSizeLabel(SizeKind.Pants, info.size) || info.size : info.size;

const SEARCH_DEBOUNCE_MS = 400;

export const SellersProducts = () => {
  const { canManageCatalog } = useSellersAuthContext();
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.sellerProducts());
  const { formatNumber } = useLanguageContext();
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProductForView, setSelectedProductForView] =
    useState<KickzoneGraphqlTypes.Product | null>(null);

  const {
    search,
    category,
    sort,
    sortOrder,
    status,
    setSearch,
    setCategory,
    setSellersProductsSortField,
    setStatus,
  } = useSellersProductsStore();

  const [searchInput, setSearchInput] = useState(search);

  // Sync local searchInput if search in store changes externally (e.g. resetFilters)
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Debounce search update to avoid firing queries on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== search) {
        setSearch(searchInput);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchInput, search, setSearch]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchInput !== search) {
        setSearch(searchInput);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearch('');
  };

  const {
    sellersProducts,
    isSellersProductsLoading,
    sellersProductsError,
    loadMoreSellersProducts,
    hasMoreSellersProducts,
  } = useSellersProducts({
    search,
    categoryId: category ? Number(category) : undefined,
    sort,
    sortOrder,
    archivedStatus: status,
  });

  // Log product variants for debugging
  useEffect(() => {
    if (sellersProducts && sellersProducts.length > 0) {
      console.log('[SellersPanel] Products with variants:', {
        totalProducts: sellersProducts.length,
        products: sellersProducts.map((product) => {
          // Expand products into variants - each variant is a combination of productInfo + sellerProduct
          const variants: Array<{
            productInfo: KickzoneGraphqlTypes.ProductInfo;
            sellerProduct: KickzoneGraphqlTypes.SellerProduct;
            variantKey: string;
          }> = [];

          product.productInfos?.forEach((productInfo) => {
            // Match by productInfoId OR by productInfo relation (fallback for old data)
            const sellerProduct = product.sellerProducts?.find(
              (sp) =>
                sp.productInfoId === productInfo.id ||
                sp.productInfo?.id === productInfo.id
            );
            if (sellerProduct) {
              variants.push({
                productInfo,
                sellerProduct,
                variantKey: `${product.id}-${productInfo.id}`,
              });
            }
          });

          return {
            id: product.id,
            name: product.name,
            productInfosCount: product.productInfos?.length || 0,
            sellerProductsCount: product.sellerProducts?.length || 0,
            variantsCount: variants.length,
            variants: variants.map((v) => ({
              variantKey: v.variantKey,
              productInfo: {
                id: v.productInfo.id,
                size: v.productInfo.size,
                color: formatVariantColorNames(v.productInfo.colors),
                weight: v.productInfo.weight,
              },
              sellerProduct: {
                id: v.sellerProduct.id,
                productInfoId: v.sellerProduct.productInfoId,
                price: v.sellerProduct.price,
                discount: v.sellerProduct.discount,
                stockQuantity: v.sellerProduct.stockQuantity,
              },
            })),
            unmatchedProductInfos:
              product.productInfos?.filter(
                (pi) =>
                  !product.sellerProducts?.some(
                    (sp) =>
                      sp.productInfoId === pi.id || sp.productInfo?.id === pi.id
                  )
              ).length || 0,
            unmatchedSellerProducts:
              product.sellerProducts?.filter(
                (sp) =>
                  !product.productInfos?.some(
                    (pi) =>
                      pi.id === sp.productInfoId || pi.id === sp.productInfo?.id
                  )
              ).length || 0,
          };
        }),
      });
    }
  }, [sellersProducts]);

  const editSellerProductHref = (sellerProductId: string | number) =>
    `${SELLER_ROUTES.MANAGE_PRODUCT}?sellerProductId=${sellerProductId}`;

  const handleViewProduct = (productId: number) => {
    const product = sellersProducts.find((p) => p.id === productId);
    if (product) {
      // Log detailed variants for the selected product
      const variants: Array<{
        productInfo: KickzoneGraphqlTypes.ProductInfo;
        sellerProduct: KickzoneGraphqlTypes.SellerProduct;
        variantKey: string;
      }> = [];

      product.productInfos?.forEach((productInfo) => {
        // Match by productInfoId OR by productInfo relation (fallback for old data)
        const sellerProduct = product.sellerProducts?.find(
          (sp) =>
            sp.productInfoId === productInfo.id ||
            sp.productInfo?.id === productInfo.id
        );
        if (sellerProduct) {
          variants.push({
            productInfo,
            sellerProduct,
            variantKey: `${product.id}-${productInfo.id}`,
          });
        }
      });

      console.log(
        `[SellersPanel] Product "${product.name}" (ID: ${product.id}) variants:`,
        {
          productId: product.id,
          productName: product.name,
          productInfosCount: product.productInfos?.length || 0,
          sellerProductsCount: product.sellerProducts?.length || 0,
          variantsCount: variants.length,
          variants: variants.map((v) => ({
            variantKey: v.variantKey,
            productInfo: {
              id: v.productInfo.id,
              size: v.productInfo.size,
              colors: v.productInfo.colors,
              weight: v.productInfo.weight,
              images: v.productInfo.images,
            },
            sellerProduct: {
              id: v.sellerProduct.id,
              productInfoId: v.sellerProduct.productInfoId,
              price: v.sellerProduct.price,
              costPrice: v.sellerProduct.costPrice,
              discount: v.sellerProduct.discount,
              stockQuantity: v.sellerProduct.stockQuantity,
              sellerId: v.sellerProduct.seller?.id,
            },
          })),
          unmatchedProductInfos: product.productInfos
            ?.filter(
              (pi) =>
                !product.sellerProducts?.some(
                  (sp) =>
                    sp.productInfoId === pi.id || sp.productInfo?.id === pi.id
                )
            )
            .map((pi) => ({
              id: pi.id,
              size: pi.size,
              color: formatVariantColorNames(pi.colors),
            })),
          unmatchedSellerProducts: product.sellerProducts
            ?.filter(
              (sp) =>
                !product.productInfos?.some(
                  (pi) =>
                    pi.id === sp.productInfoId || pi.id === sp.productInfo?.id
                )
            )
            .map((sp) => ({
              id: sp.id,
              productInfoId: sp.productInfoId,
              productInfoRelationId: sp.productInfo?.id,
              price: sp.price,
              stockQuantity: sp.stockQuantity,
            })),
        }
      );

      setSelectedProductForView(product);
      setViewModalOpen(true);
    }
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedProductForView(null);
  };

  return (
    <SellersLayout>
      <GlassmorphismContainer fullHeight>
        {/* Header with Add Product button */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            {LL.products.myProducts()}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            {canManageCatalog && (
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                component={RouterLink}
                to={`${SELLER_ROUTES.MANAGE_PRODUCT}?define=1`}
                sx={{
                  minWidth: { sm: 150 },
                  width: { xs: '100%', sm: 'auto' },
                }}
              >
                {LL.navigation.catalogManagement()}
              </Button>
            )}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component={RouterLink}
              to={SELLER_ROUTES.MANAGE_PRODUCT}
              sx={{
                minWidth: { sm: 150 },
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              {LL.products.addProduct()}
            </Button>
          </Stack>
        </Box>

        {/* Filters */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                fullWidth
                label={LL.products.searchProducts()}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: searchInput ? (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={LL.button.clear() || 'Clear'}
                          onClick={handleClearSearch}
                          edge="end"
                          size="small"
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ) : null,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>{LL.form.category()}</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label={LL.form.category()}
                >
                  <MenuItem value="">{LL.table.allCategories()}</MenuItem>
                  {/* TODO: Add categories from API */}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>{LL.form.sortBy()}</InputLabel>
                <Select
                  value={sort}
                  onChange={(e) => setSellersProductsSortField(e.target.value)}
                  label={LL.form.sortBy()}
                >
                  <MenuItem value="">{LL.table.default()}</MenuItem>
                  <MenuItem value="name">{LL.table.name()}</MenuItem>
                  <MenuItem value="price">{LL.table.price()}</MenuItem>
                  <MenuItem value="createdAt">
                    {LL.table.dateCreated()}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>{LL.form.status()}</InputLabel>
                <Select
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target
                        .value as KickzoneGraphqlTypes.ProductArchivedStatus
                    )
                  }
                  label={LL.form.status()}
                >
                  <MenuItem
                    value={KickzoneGraphqlTypes.ProductArchivedStatus.Active}
                  >
                    {LL.table.active()}
                  </MenuItem>
                  <MenuItem
                    value={KickzoneGraphqlTypes.ProductArchivedStatus.Archived}
                  >
                    {LL.table.archived()}
                  </MenuItem>
                  <MenuItem
                    value={KickzoneGraphqlTypes.ProductArchivedStatus.All}
                  >
                    {LL.table.all()}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Error State (when no products) */}
        {sellersProductsError && sellersProducts.length === 0 && (
          <Box sx={{ py: 4 }}>
            <Alert severity="error">
              {LL.products.errorLoadingProducts()}: {sellersProductsError.message}
            </Alert>
          </Box>
        )}

        {/* Error Alert (when products are displayed) */}
        {sellersProductsError && sellersProducts.length > 0 && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {LL.products.errorLoadingProducts()}: {sellersProductsError.message}
          </Alert>
        )}

        {/* Initial Loading State */}
        {isSellersProductsLoading && sellersProducts.length === 0 && !sellersProductsError && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 10,
              gap: 2,
            }}
          >
            <CircularProgress />
            <Typography color="text.secondary">
              {LL.products.loadingProducts()}
            </Typography>
          </Box>
        )}

        {/* Subsequent / Filter Loading Progress */}
        {isSellersProductsLoading && sellersProducts.length > 0 && (
          <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />
        )}

        {/* Products Grid */}
        {sellersProducts.length > 0 && (
          <Grid
            container
            spacing={3}
            sx={{
              opacity: isSellersProductsLoading ? 0.6 : 1,
              transition: 'opacity 0.2s ease-in-out',
            }}
          >
          {sellersProducts.map((product: KickzoneGraphqlTypes.Product) => {
            // Since the backend filters by seller ID, sellerProducts should only contain current seller's products
            const sellerProducts = product.sellerProducts || [];
            const firstSellerProduct = sellerProducts[0];

            return (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    borderRadius: 2,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                    },
                  }}
                  onClick={() => handleViewProduct(product.id)}
                >
                  {/* Product Image */}
                  {firstSellerProduct?.productInfo?.images?.[0] && (
                    <Box
                      sx={{
                        position: 'relative',
                        paddingTop: '75%',
                        backgroundColor: '#f5f5f5',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        component="img"
                        src={firstSellerProduct.productInfo.images[0]}
                        alt={product.name}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                      <Chip
                        label={
                          product.archived
                            ? LL.table.archived()
                            : LL.table.active()
                        }
                        color={product.archived ? 'default' : 'success'}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  )}

                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 1.5,
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                          fontWeight: 700,
                          flex: 1,
                          fontSize: '1.1rem',
                          color: 'text.primary',
                        }}
                      >
                        {product.name}
                      </Typography>
                      {!firstSellerProduct?.productInfo?.images?.[0] && (
                        <Chip
                          label={
                            product.archived
                              ? LL.table.archived()
                              : LL.table.active()
                          }
                          color={product.archived ? 'default' : 'success'}
                          size="small"
                        />
                      )}
                    </Box>

                    <Stack spacing={1} sx={{ mb: 2 }}>
                      {product.description && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>{LL.form.description()}:</strong>{' '}
                          {product.description.length > 100
                            ? `${product.description.substring(0, 100)}...`
                            : product.description}
                        </Typography>
                      )}

                      <Typography variant="body2" color="text.secondary">
                        <strong>{LL.products.categories()}:</strong>{' '}
                        {product.categories
                          .map((cat: KickzoneGraphqlTypes.Category) => cat.name)
                          .join(', ') || LL.products.noCategories()}
                      </Typography>

                      {/* Show all seller's variants */}
                      {sellerProducts.length > 0 && (
                        <>
                          <Typography variant="body2" color="text.secondary">
                            <strong>{LL.products.sizes()}:</strong>{' '}
                            {sellerProducts
                              .map((sp) => displayVariantSize(sp.productInfo))
                              .filter(Boolean)
                              .join(', ')}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              flexWrap: 'wrap',
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              component="span"
                            >
                              <strong>{LL.products.colors()}:</strong>{' '}
                            </Typography>
                            {sellerProducts
                              .flatMap((sp) => sp.productInfo?.colors ?? [])
                              .filter(
                                (color, index, arr) =>
                                  arr.findIndex((c) =>
                                    c.id != null && color.id != null
                                      ? c.id === color.id
                                      : c.name === color.name
                                  ) === index
                              )
                              .map((color, index) => (
                                <Box
                                  key={color.id ?? color.name ?? index}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                  }}
                                >
                                  <Box
                                    component="span"
                                    sx={{
                                      display: 'inline-block',
                                      width: 12,
                                      height: 12,
                                      backgroundColor: color.hexCode || '#ccc',
                                      borderRadius: '50%',
                                      border: '1px solid #ccc',
                                    }}
                                  />
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    component="span"
                                  >
                                    {color.name}
                                  </Typography>
                                </Box>
                              ))}
                            {sellerProducts.filter(
                              (sp) => !sp.productInfo?.colors?.length
                            ).length > 0 && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                component="span"
                              >
                                {LL.products.noColor()} (
                                {formatNumber(
                                  sellerProducts.filter(
                                    (sp) => !sp.productInfo?.colors?.length
                                  ).length
                                )}
                                )
                              </Typography>
                            )}
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            <strong>{LL.products.weightRange()}:</strong>{' '}
                            {(() => {
                              const weights = sellerProducts
                                .map((sp) => sp.productInfo?.weight)
                                .filter(Boolean)
                                .map(Number);
                              if (weights.length === 0)
                                return LL.products.notAvailable();
                              if (weights.length === 1)
                                return `${formatNumber(weights[0])}kg`;
                              const min = Math.min(...weights);
                              const max = Math.max(...weights);
                              return min === max
                                ? `${formatNumber(min)}kg`
                                : `${formatNumber(min)}-${formatNumber(max)}kg`;
                            })()}
                          </Typography>
                        </>
                      )}

                      <Typography variant="body2" color="text.secondary">
                        <strong>{LL.products.yourVariants()}:</strong>{' '}
                        {formatNumber(sellerProducts.length)}
                      </Typography>

                      {/* Current Seller's Product Information */}
                      {sellerProducts.length > 0 && (
                        <Box
                          sx={{
                            mt: 2,
                            p: 2,
                            bgcolor: 'primary.50',
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'primary.100',
                          }}
                        >
                          {sellerProducts.length === 1 ? (
                            <>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  mb: 1,
                                }}
                              >
                                <Typography
                                  variant="h5"
                                  sx={{
                                    fontWeight: 700,
                                    color: 'primary.main',
                                  }}
                                >
                                  <PriceDisplay
                                    priceInUSD={firstSellerProduct.price}
                                    showOriginal={true}
                                  />
                                </Typography>
                                {firstSellerProduct.discount > 0 && (
                                  <Chip
                                    label={`-${formatNumber(
                                      firstSellerProduct.discount
                                    )}%`}
                                    color="error"
                                    size="small"
                                    sx={{ fontWeight: 600 }}
                                  />
                                )}
                              </Box>
                              {firstSellerProduct.discount > 0 && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ display: 'block', mb: 1 }}
                                >
                                  {LL.products.finalPrice()}:{' '}
                                  <PriceDisplay
                                    priceInUSD={
                                      (firstSellerProduct.price *
                                        (100 - firstSellerProduct.discount)) /
                                      100
                                    }
                                    showOriginal={true}
                                  />
                                </Typography>
                              )}
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.5,
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {LL.form.stockQuantity()}:
                                </Typography>
                                <Chip
                                  label={`${formatNumber(
                                    firstSellerProduct.stockQuantity
                                  )} ${LL.products.units()}`}
                                  size="small"
                                  color={
                                    firstSellerProduct.stockQuantity > 10
                                      ? 'success'
                                      : firstSellerProduct.stockQuantity > 0
                                      ? 'warning'
                                      : 'error'
                                  }
                                  variant="outlined"
                                />
                                {firstSellerProduct.boxLess && (
                                  <Chip
                                    label={LL.products.boxLess()}
                                    size="small"
                                    color="info"
                                    variant="outlined"
                                  />
                                )}
                              </Box>
                            </>
                          ) : (
                            <>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 700,
                                  color: 'primary.main',
                                  mb: 1,
                                }}
                              >
                                <PriceDisplay
                                  priceInUSD={Math.min(
                                    ...sellerProducts.map((sp) => sp.price)
                                  )}
                                  showOriginal={true}
                                />{' '}
                                -{' '}
                                <PriceDisplay
                                  priceInUSD={Math.max(
                                    ...sellerProducts.map((sp) => sp.price)
                                  )}
                                  showOriginal={true}
                                />
                              </Typography>
                              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                <Chip
                                  label={`${formatNumber(
                                    sellerProducts.reduce(
                                      (sum, sp) => sum + sp.stockQuantity,
                                      0
                                    )
                                  )} ${LL.products.unitsInStock()}`}
                                  size="small"
                                  color="success"
                                  variant="outlined"
                                />
                                <Chip
                                  label={`${formatNumber(
                                    sellerProducts.length
                                  )} ${LL.products.variants()}`}
                                  size="small"
                                  color="info"
                                  variant="outlined"
                                />
                              </Stack>
                            </>
                          )}
                        </Box>
                      )}
                    </Stack>
                  </CardContent>

                  <CardActions
                    sx={{
                      justifyContent: 'center',
                      p: 2,
                      borderTop: '1px solid #e0e0e0',
                    }}
                  >
                    <Button
                      size="small"
                      startIcon={<ViewIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProduct(product.id);
                      }}
                      sx={{ textTransform: 'none' }}
                    >
                      {LL.button.viewDetails()}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        )}

        {/* Load More */}
        {hasMoreSellersProducts && sellersProducts.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              onClick={loadMoreSellersProducts}
              variant="outlined"
              size="large"
              disabled={isSellersProductsLoading}
              sx={{ minWidth: 200, textTransform: 'none' }}
            >
              {LL.products.loadMore()}
            </Button>
          </Box>
        )}

        {/* Empty State */}
        {sellersProducts.length === 0 &&
          !isSellersProductsLoading &&
          !sellersProductsError && (
          <Box
            sx={(theme) => {
              const isDark = theme.palette.mode === 'dark';
              return {
                textAlign: 'center',
                py: 10,
                px: 3,
                backgroundColor: isDark
                  ? 'transparent'
                  : theme.palette.action.hover,
                borderRadius: 3,
                border: `2px dashed ${theme.palette.divider}`,
              };
            }}
          >
            <Box
              sx={(theme) => ({
                width: 120,
                height: 120,
                margin: '0 auto 24px',
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(197, 184, 154, 0.12)'
                    : 'rgba(143, 132, 104, 0.12)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              })}
            >
              <AddIcon sx={{ fontSize: 60, color: 'primary.main' }} />
            </Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 1.5, color: 'text.primary' }}
            >
              {LL.products.noProductsFound()}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 500, margin: '0 auto 32px' }}
            >
              {LL.products.startBySelling()}
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              alignItems="stretch"
              flexWrap="wrap"
              useFlexGap
              sx={{ width: '100%', maxWidth: 480, mx: 'auto' }}
            >
              {canManageCatalog && (
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<AddIcon />}
                  component={RouterLink}
                  to={`${SELLER_ROUTES.MANAGE_PRODUCT}?define=1`}
                  sx={{
                    textTransform: 'none',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  {LL.navigation.catalogManagement()}
                </Button>
              )}
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                component={RouterLink}
                to={SELLER_ROUTES.MANAGE_PRODUCT}
                sx={{
                  textTransform: 'none',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  width: { xs: '100%', sm: 'auto' },
                }}
              >
                {LL.products.addFirstProduct()}
              </Button>
            </Stack>
          </Box>
        )}

        {/* View Product Modal */}
        <Dialog
          open={viewModalOpen}
          onClose={handleCloseViewModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">
                {selectedProductForView?.name}
              </Typography>
              <IconButton onClick={handleCloseViewModal} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers sx={{ pt: 2 }}>
            {selectedProductForView && (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {LL.products.productInformationTitle()}
                    </Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          <strong>{LL.table.name()}:</strong>{' '}
                          {selectedProductForView.name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="div"
                        >
                          <strong>{LL.form.status()}:</strong>{' '}
                          <Chip
                            label={
                              selectedProductForView.archived
                                ? LL.table.archived()
                                : LL.table.active()
                            }
                            color={
                              selectedProductForView.archived
                                ? 'default'
                                : 'success'
                            }
                            size="small"
                          />
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          <strong>{LL.products.categories()}:</strong>{' '}
                          {selectedProductForView.categories
                            .map(
                              (cat: KickzoneGraphqlTypes.Category) => cat.name
                            )
                            .join(', ') || LL.products.noCategories()}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          <strong>{LL.products.yourVariants()}:</strong>{' '}
                          {formatNumber(
                            selectedProductForView.sellerProducts?.length || 0
                          )}
                        </Typography>
                      </Box>
                      {selectedProductForView.description && (
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            <strong>{LL.form.description()}:</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {selectedProductForView.description}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {LL.products.yourProductVariantsTitle()}
                    </Typography>
                    <Stack spacing={2}>
                      {selectedProductForView.sellerProducts?.map(
                        (sellerProduct, index) => {
                          if (!sellerProduct.productInfo) {
                            return null;
                          }

                          return (
                            <Card key={sellerProduct.id} variant="outlined">
                              <CardContent sx={{ p: 2 }}>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    mb: 1,
                                  }}
                                >
                                  <Typography variant="subtitle2">
                                    {LL.products.yourVariant()}{' '}
                                    {formatNumber(index + 1)}
                                  </Typography>
                                  <Tooltip title={LL.button.editVariant()}>
                                    <IconButton
                                      size="small"
                                      color="primary"
                                      component={RouterLink}
                                      to={editSellerProductHref(
                                        sellerProduct.id
                                      )}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                                <Stack spacing={1}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <strong>{LL.products.size()}:</strong>{' '}
                                    {displayVariantSize(sellerProduct.productInfo)}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <strong>{LL.products.color()}:</strong>{' '}
                                    {formatVariantColorNames(
                                      sellerProduct.productInfo.colors,
                                      LL.products.noColorSpecified()
                                    )}
                                    {sellerProduct.productInfo.colors?.length >
                                      0 && (
                                      <Box
                                        component="span"
                                        sx={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: 0.5,
                                          ml: 1,
                                          verticalAlign: 'middle',
                                        }}
                                      >
                                        {sellerProduct.productInfo.colors.map(
                                          (color) => (
                                            <Box
                                              key={color.id}
                                              sx={{
                                                width: 16,
                                                height: 16,
                                                backgroundColor: color.hexCode,
                                                borderRadius: '50%',
                                                border: '1px solid #ccc',
                                              }}
                                            />
                                          )
                                        )}
                                      </Box>
                                    )}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <strong>{LL.products.weight()}:</strong>{' '}
                                    {formatNumber(
                                      sellerProduct.productInfo.weight
                                    )}
                                    kg
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <strong>{LL.products.yourPrice()}:</strong>{' '}
                                    <PriceDisplay
                                      priceInUSD={sellerProduct.price}
                                      showOriginal={true}
                                    />
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <strong>{LL.products.costPrice()}:</strong>{' '}
                                    <PriceDisplay
                                      priceInUSD={sellerProduct.costPrice || 0}
                                      showOriginal={true}
                                    />
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <strong>{LL.products.discount()}:</strong>{' '}
                                    {formatNumber(sellerProduct.discount)}%
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <strong>{LL.products.finalPrice()}:</strong>{' '}
                                    <PriceDisplay
                                      priceInUSD={
                                        (sellerProduct.price *
                                          (100 - sellerProduct.discount)) /
                                        100
                                      }
                                      showOriginal={true}
                                    />
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <strong>{LL.products.stock()}:</strong>{' '}
                                    {formatNumber(sellerProduct.stockQuantity)}{' '}
                                    {LL.products.units()}
                                  </Typography>
                                  {sellerProduct.boxLess && (
                                    <Chip
                                      label={LL.products.boxLess()}
                                      size="small"
                                      color="info"
                                      variant="outlined"
                                    />
                                  )}
                                  {sellerProduct.productInfo.images &&
                                    sellerProduct.productInfo.images.length >
                                      0 && (
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        <strong>{LL.products.images()}:</strong>{' '}
                                        {formatNumber(
                                          sellerProduct.productInfo.images
                                            .length
                                        )}{' '}
                                        {LL.products.image()}(s)
                                      </Typography>
                                    )}
                                </Stack>
                              </CardContent>
                            </Card>
                          );
                        }
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewModal}>{LL.button.close()}</Button>
          </DialogActions>
        </Dialog>
      </GlassmorphismContainer>
    </SellersLayout>
  );
};

export default SellersProducts;
