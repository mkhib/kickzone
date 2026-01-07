import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { useCategoriesQuery } from '@kickzone-workspace/categories-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  useProductsQuery,
  useProducts,
} from '@kickzone-workspace/products-hook';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ProductImageManagementModal } from './ProductImageManagementModal';
import { useTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import {
  useSellerListingsByProduct,
  AdminSellerListing,
} from './adminProducts.hooks';
import { useAdminsProductsStore } from '@kickzone-workspace/admins-products-store';

export function AdminProducts() {
  const navigate = useNavigate();
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.adminProducts());
  const {
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    sortOrder,
    setSortOrder,
    status,
    setStatus,
    archiveDialogOpen,
    productToArchive,
    openArchiveDialog,
    closeArchiveDialog,
    listingsProduct,
    setListingsProduct,
    openImageModal,
    closeImageModal,
    currentProduct,
  } = useAdminsProductsStore();
  const imageModalOpen = Boolean(currentProduct);
  const {
    fetchSellerListings,
    listingsResult: {
      data: listingsData,
      loading: listingsLoading,
      refetch: refetchListings,
    },
    mutateSellerProduct,
  } = useSellerListingsByProduct();
  const sellerListings: AdminSellerListing[] =
    listingsData?.sellerProductsByProduct || [];
  const categoryIdValue = category ? Number(category) : undefined;
  const {
    products,
    loading,
    error,
    loadMore,
    hasNextPage,
    totalCount,
    refetch,
  } = useProductsQuery({
    search,
    categoryId: categoryIdValue,
    sort,
    sortOrder,
    archivedStatus: status,
  });
  const { categories } = useCategoriesQuery();
  const { archiveProduct } = useProducts();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:4000';

  // Infinite scroll: observe the loader div
  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore, hasNextPage]);

  // Filtering and sorting logic (client-side sort only)
  const filteredProducts = products;

  const handleArchiveClick = (product: KickzoneGraphqlTypes.Product) => {
    openArchiveDialog(product);
  };

  const handleArchiveConfirm = async () => {
    if (productToArchive) {
      await archiveProduct(productToArchive.id);
      closeArchiveDialog();
      refetch();
    }
  };

  const handleArchiveCancel = () => {
    closeArchiveDialog();
  };

  const handleOpenImageModal = (product: KickzoneGraphqlTypes.Product) => {
    openImageModal(product, true);
  };
  const handleCloseImageModal = () => {
    closeImageModal();
  };

  const handleOpenListings = (product: KickzoneGraphqlTypes.Product) => {
    setListingsProduct(product);
    fetchSellerListings({ variables: { productId: Number(product.id) } });
  };

  const handleToggleRecommended = async (
    sellerProductId: string,
    sellerId: number | undefined,
    recommended: boolean
  ) => {
    if (sellerId === undefined || sellerId === null) return;
    await mutateSellerProduct({
      variables: {
        sellerId,
        input: { id: sellerProductId, recommended },
      },
    });
    if (listingsProduct && refetchListings) {
      refetchListings({ productId: Number(listingsProduct.id) });
    }
  };

  return (
    <AdminsLayout>
      <GlassmorphismContainer fullHeight>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {LL.navigation.products()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products/new')}
          >
            {LL.products.addProduct()}
          </Button>
        </Box>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              label={LL.products.searchByName()}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>{LL.form.category()}</InputLabel>
              <Select
                value={category}
                label={LL.form.category()}
                onChange={(e) => setCategory(String(e.target.value))}
              >
                <MenuItem value="">{LL.table.all()}</MenuItem>
                {categories?.map((c: KickzoneGraphqlTypes.Category) => (
                  <MenuItem key={c.id} value={String(c.id)}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>{LL.form.sortBy()}</InputLabel>
              <Select
                value={sort}
                label={LL.form.sortBy()}
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="">{LL.products.none()}</MenuItem>
                <MenuItem value="price">{LL.products.price()}</MenuItem>
                <MenuItem value="color">{LL.products.color()}</MenuItem>
                {/* Add more sort options as needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>{LL.form.order()}</InputLabel>
              <Select
                value={sortOrder}
                label={LL.form.order()}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              >
                <MenuItem value="asc">{LL.products.ascending()}</MenuItem>
                <MenuItem value="desc">{LL.products.descending()}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>{LL.form.status()}</InputLabel>
              <Select
                value={status}
                label={LL.form.status()}
                onChange={(e) =>
                  setStatus(
                    e.target.value as KickzoneGraphqlTypes.ProductArchivedStatus
                  )
                }
              >
                <MenuItem value="ALL">{LL.table.all()}</MenuItem>
                <MenuItem value="ACTIVE">{LL.table.active()}</MenuItem>
                <MenuItem value="ARCHIVED">{LL.table.archived()}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {loading && !products.length ? (
          <Typography>{LL.status.loading()}</Typography>
        ) : error ? (
          <Typography color="error">
            {LL.products.errorLoadingProducts()}
          </Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {filteredProducts.map((product: KickzoneGraphqlTypes.Product) => {
                const info = product.productInfos[0];
                const firstImage = info?.images?.[0];
                const imageUrl = firstImage?.startsWith('/uploads/')
                  ? `${API_BASE_URL}${firstImage}`
                  : firstImage;

                return (
                  <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        borderRadius: 2,
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
                        },
                        ...(product.archived && {
                          opacity: 0.7,
                          backgroundColor: 'action.disabledBackground',
                        }),
                      }}
                    >
                      {/* Product Image */}
                      <Box
                        sx={{
                          position: 'relative',
                          paddingTop: '100%', // 1:1 aspect ratio
                          backgroundColor: 'grey.100',
                          overflow: 'hidden',
                        }}
                      >
                        {imageUrl ? (
                          <Box
                            component="img"
                            src={imageUrl}
                            alt={product.name}
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'text.disabled',
                            }}
                          >
                            <ImageIcon sx={{ fontSize: 60 }} />
                          </Box>
                        )}

                        {/* Status Badge */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            backgroundColor: product.archived
                              ? 'error.main'
                              : 'success.main',
                            color: 'white',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                          }}
                        >
                          {product.archived
                            ? LL.table.archived()
                            : LL.table.active()}
                        </Box>

                        {/* Color Indicator */}
                        {info?.color && (
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 12,
                              left: 12,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            }}
                          >
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                backgroundColor: info.color.hexCode,
                                border: '2px solid white',
                                boxShadow: '0 0 4px rgba(0,0,0,0.2)',
                              }}
                            />
                            <Typography
                              variant="caption"
                              fontWeight={600}
                              sx={{ color: '#000' }}
                            >
                              {info.color.name}
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      {/* Card Content */}
                      <CardContent sx={{ flexGrow: 1, p: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            minHeight: '3em',
                          }}
                        >
                          {product.name}
                        </Typography>

                        {/* Categories */}
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 0.5,
                            mb: 1,
                          }}
                        >
                          {product.categories
                            .slice(0, 2)
                            .map((cat: KickzoneGraphqlTypes.Category) => (
                              <Box
                                key={cat.id}
                                sx={{
                                  backgroundColor:
                                    theme.palette.mode === 'dark'
                                      ? 'rgba(255,255,255,0.08)'
                                      : 'primary.50',
                                  color:
                                    theme.palette.mode === 'dark'
                                      ? theme.palette.text.primary
                                      : 'primary.main',
                                  px: 1,
                                  py: 0.25,
                                  borderRadius: 0.5,
                                  fontSize: '0.7rem',
                                  fontWeight: 500,
                                }}
                              >
                                {cat.name}
                              </Box>
                            ))}
                          {product.categories.length > 2 && (
                            <Box
                              sx={{
                                backgroundColor:
                                  theme.palette.mode === 'dark'
                                    ? 'rgba(255,255,255,0.08)'
                                    : 'grey.200',
                                color: theme.palette.text.secondary,
                                px: 1,
                                py: 0.25,
                                borderRadius: 0.5,
                                fontSize: '0.7rem',
                                fontWeight: 500,
                              }}
                            >
                              +{product.categories.length - 2}
                            </Box>
                          )}
                        </Box>

                        {/* Product Variants */}
                        <Typography variant="caption" color="text.secondary">
                          {product.productInfos.length}{' '}
                          {product.productInfos.length === 1
                            ? 'variant'
                            : 'variants'}
                        </Typography>
                      </CardContent>

                      {/* Action Buttons */}
                      <CardActions
                        sx={{
                          justifyContent: 'space-around',
                          borderTop: '1px solid',
                          borderColor: 'divider',
                          p: 1.5,
                          gap: 1,
                        }}
                      >
                        <Tooltip title={LL.button.edit()}>
                          <IconButton
                            size="medium"
                            onClick={() =>
                              navigate(`/products/edit/${product.id}`)
                            }
                            sx={{
                              color: 'primary.main',
                              '&:hover': {
                                backgroundColor: 'primary.50',
                              },
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title={LL.products.images()}>
                          <IconButton
                            size="medium"
                            onClick={() => handleOpenImageModal(product)}
                            sx={{
                              color: 'info.main',
                              '&:hover': {
                                backgroundColor: 'info.50',
                              },
                            }}
                          >
                            <ImageIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title={LL.navigation.sellers()}>
                          <IconButton
                            size="medium"
                            onClick={() => handleOpenListings(product)}
                            sx={{
                              color: 'secondary.main',
                              '&:hover': {
                                backgroundColor: 'secondary.50',
                              },
                            }}
                          >
                            <StorefrontIcon />
                          </IconButton>
                        </Tooltip>

                        {!product.archived && (
                          <Tooltip title={LL.products.archiveProduct()}>
                            <IconButton
                              size="medium"
                              onClick={() => handleArchiveClick(product)}
                              sx={{
                                color: 'error.main',
                                '&:hover': {
                                  backgroundColor: 'error.50',
                                },
                              }}
                            >
                              <ArchiveIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            {hasNextPage && <div ref={loaderRef} style={{ height: 40 }} />}
            <Box mt={2} textAlign="center">
              <Typography variant="caption">
                {LL.products.showingProducts({
                  count: products.length,
                  total: totalCount,
                })}
              </Typography>
            </Box>
            <Dialog open={archiveDialogOpen} onClose={handleArchiveCancel}>
              <DialogTitle>{LL.products.archiveProduct()}</DialogTitle>
              <DialogContent>
                {LL.products.archiveProductConfirm()}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleArchiveCancel}>
                  {LL.button.cancel()}
                </Button>
                <Button
                  onClick={handleArchiveConfirm}
                  color="secondary"
                  variant="contained"
                >
                  {LL.products.archiveProduct()}
                </Button>
              </DialogActions>
            </Dialog>
            <ProductImageManagementModal
              open={imageModalOpen}
              onClose={handleCloseImageModal}
              product={currentProduct || null}
              onProductUpdated={() => {
                refetch()
                  .then((result) => {
                    // Update the selected product with the latest data
                    if (currentProduct && result.data?.products?.edges) {
                      const updatedProduct = result.data.products.edges.find(
                        (edge) => edge.node.id === currentProduct.id
                      )?.node;
                      if (updatedProduct) {
                        openImageModal(updatedProduct, false);
                      }
                    }
                  })
                  .catch((error) => {
                    // Handle refetch error silently
                  });
              }}
            />
            <Dialog
              open={Boolean(listingsProduct)}
              onClose={() => setListingsProduct(null)}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle>
                Seller listings — {listingsProduct?.name}
              </DialogTitle>
              <DialogContent dividers>
                {listingsLoading && (
                  <Typography>{LL.status.loading()}</Typography>
                )}
                {!listingsLoading &&
                  listingsData?.sellerProductsByProduct?.length === 0 && (
                    <Typography>{LL.products.noSellersAvailable()}</Typography>
                  )}
                {!listingsLoading && sellerListings.length > 0 && (
                  <Stack spacing={1.5}>
                    {sellerListings.map((sp, idx) => (
                      <Box
                        key={sp.id}
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '1.5fr 1fr 1fr 0.8fr 0.8fr',
                          gap: 1,
                          alignItems: 'center',
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                          p: 1,
                          backgroundColor:
                            idx % 2 === 0
                              ? 'background.default'
                              : 'action.hover',
                        }}
                      >
                        <Typography sx={{ fontWeight: 700 }}>
                          {sp.seller?.user?.name || 'Seller'}
                        </Typography>
                        <Typography>
                          {LL.products.price()}: {sp.price}
                        </Typography>
                        <Typography>
                          {LL.products.discount()}: {sp.discount}%
                        </Typography>
                        <Typography>
                          {LL.products.stock()}: {sp.stockQuantity}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="body2">Recommended</Typography>
                          <Switch
                            checked={sp.recommended}
                            onChange={(e) =>
                              handleToggleRecommended(
                                sp.id,
                                sp.seller?.id,
                                e.target.checked
                              )
                            }
                          />
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setListingsProduct(null)}>
                  {LL.button.close()}
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </GlassmorphismContainer>
    </AdminsLayout>
  );
}

export default AdminProducts;
