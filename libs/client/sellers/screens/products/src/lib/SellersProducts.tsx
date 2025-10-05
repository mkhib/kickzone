import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import { useSellersProducts } from '@kickzone-workspace/sellers-products-hooks';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useNavigate } from 'react-router-dom';
import { useSellersProductsStore } from '@kickzone-workspace/sellers-products-store';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
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
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { SELLER_ROUTES } from '@kickzone-workspace/sellers-routes';
import { useState } from 'react';

export const SellersProducts = () => {
  const navigate = useNavigate();
  const { LL } = useI18nContext();
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

  const handleAddProduct = () => {
    navigate(SELLER_ROUTES.MANAGE_PRODUCT);
  };

  const handleEditSellerProduct = (sellerProductId: number) => {
    console.log(
      '🔍 handleEditSellerProduct called with sellerProductId:',
      sellerProductId
    );
    navigate(
      `${SELLER_ROUTES.MANAGE_PRODUCT}?sellerProductId=${sellerProductId}`
    );
  };

  const handleViewProduct = (productId: number) => {
    const product = sellersProducts.find((p) => p.id === productId);
    if (product) {
      setSelectedProductForView(product);
      setViewModalOpen(true);
    }
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedProductForView(null);
  };

  if (isSellersProductsLoading) {
    return (
      <SellersLayout>
        <Box sx={{ p: 3 }}>
          <Typography>{LL.products.loadingProducts()}</Typography>
        </Box>
      </SellersLayout>
    );
  }

  if (sellersProductsError) {
    return (
      <SellersLayout>
        <Box sx={{ p: 3 }}>
          <Typography color="error">
            {LL.products.errorLoadingProducts()}: {sellersProductsError.message}
          </Typography>
        </Box>
      </SellersLayout>
    );
  }

  return (
    <SellersLayout>
      <Box sx={{ p: 3 }}>
        {/* Header with Add Product button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            {LL.products.myProducts()}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
            sx={{ minWidth: 150 }}
          >
            {LL.products.addProduct()}
          </Button>
        </Box>

        {/* Filters */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                fullWidth
                label={LL.products.searchProducts()}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {/* TODO: Add categories from API */}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort by</InputLabel>
                <Select
                  value={sort}
                  onChange={(e) => setSellersProductsSortField(e.target.value)}
                  label="Sort by"
                >
                  <MenuItem value="">Default</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="price">Price</MenuItem>
                  <MenuItem value="createdAt">Date Created</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target
                        .value as KickzoneGraphqlTypes.ProductArchivedStatus
                    )
                  }
                  label="Status"
                >
                  <MenuItem
                    value={KickzoneGraphqlTypes.ProductArchivedStatus.Active}
                  >
                    Active
                  </MenuItem>
                  <MenuItem
                    value={KickzoneGraphqlTypes.ProductArchivedStatus.Archived}
                  >
                    Archived
                  </MenuItem>
                  <MenuItem
                    value={KickzoneGraphqlTypes.ProductArchivedStatus.All}
                  >
                    All
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={3}>
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
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 600, flex: 1 }}
                      >
                        {product.name}
                      </Typography>
                      <Chip
                        label={product.archived ? 'Archived' : 'Active'}
                        color={product.archived ? 'default' : 'success'}
                        size="small"
                      />
                    </Box>

                    <Stack spacing={1} sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Categories:</strong>{' '}
                        {product.categories
                          .map((cat: KickzoneGraphqlTypes.Category) => cat.name)
                          .join(', ') || 'No categories'}
                      </Typography>

                      {/* Show all seller's variants */}
                      {sellerProducts.length > 0 && (
                        <>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Sizes:</strong>{' '}
                            {sellerProducts
                              .map((sp) => sp.productInfo?.size)
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
                              <strong>Colors:</strong>{' '}
                            </Typography>
                            {sellerProducts
                              .map((sp) => sp.productInfo?.color)
                              .filter(Boolean)
                              .filter(
                                (color, index, arr) =>
                                  arr.findIndex(
                                    (c) => c?.name === color?.name
                                  ) === index
                              ) // Remove duplicates by color name
                              .map((color, index) => (
                                <Box
                                  key={index}
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
                                      backgroundColor: color?.hexCode || '#ccc',
                                      borderRadius: '50%',
                                      border: '1px solid #ccc',
                                    }}
                                  />
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    component="span"
                                  >
                                    {color?.name}
                                  </Typography>
                                </Box>
                              ))}
                            {sellerProducts.filter(
                              (sp) => !sp.productInfo?.color
                            ).length > 0 && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                component="span"
                              >
                                No color (
                                {
                                  sellerProducts.filter(
                                    (sp) => !sp.productInfo?.color
                                  ).length
                                }
                                )
                              </Typography>
                            )}
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Weight Range:</strong>{' '}
                            {(() => {
                              const weights = sellerProducts
                                .map((sp) => sp.productInfo?.weight)
                                .filter(Boolean)
                                .map(Number);
                              if (weights.length === 0) return 'N/A';
                              if (weights.length === 1)
                                return `${weights[0]}kg`;
                              const min = Math.min(...weights);
                              const max = Math.max(...weights);
                              return min === max
                                ? `${min}kg`
                                : `${min}-${max}kg`;
                            })()}
                          </Typography>
                        </>
                      )}

                      <Typography variant="body2" color="text.secondary">
                        <strong>Your Variants:</strong> {sellerProducts.length}
                      </Typography>

                      {/* Current Seller's Product Information */}
                      {sellerProducts.length > 0 && (
                        <Box
                          sx={{
                            mt: 1,
                            p: 1,
                            bgcolor: 'grey.50',
                            borderRadius: 1,
                          }}
                        >
                          {sellerProducts.length === 1 ? (
                            <>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                <strong>Your Price:</strong> $
                                {firstSellerProduct.price}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                <strong>Stock:</strong>{' '}
                                {firstSellerProduct.stockQuantity} units
                              </Typography>
                              {firstSellerProduct.discount > 0 && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <strong>Discount:</strong>{' '}
                                  {firstSellerProduct.discount}% |{' '}
                                  <strong>Final Price:</strong> $
                                  {(
                                    (firstSellerProduct.price *
                                      (100 - firstSellerProduct.discount)) /
                                    100
                                  ).toFixed(2)}
                                </Typography>
                              )}
                            </>
                          ) : (
                            <>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                <strong>Price Range:</strong> $
                                {Math.min(
                                  ...sellerProducts.map((sp) => sp.price)
                                )}{' '}
                                - $
                                {Math.max(
                                  ...sellerProducts.map((sp) => sp.price)
                                )}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                <strong>Total Stock:</strong>{' '}
                                {sellerProducts.reduce(
                                  (sum, sp) => sum + sp.stockQuantity,
                                  0
                                )}{' '}
                                units
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                <strong>Variants:</strong>{' '}
                                {sellerProducts.length} different pricing
                              </Typography>
                            </>
                          )}
                        </Box>
                      )}
                    </Stack>

                    {product.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {product.description}
                      </Typography>
                    )}
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'center', p: 2 }}>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => handleViewProduct(product.id)}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Load More */}
        {hasMoreSellersProducts && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button onClick={loadMoreSellersProducts} variant="outlined">
              Load More
            </Button>
          </Box>
        )}

        {/* Empty State */}
        {sellersProducts.length === 0 && !isSellersProductsLoading && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No products found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Start by adding your first product to sell
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddProduct}
            >
              Add Your First Product
            </Button>
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
          <DialogContent>
            {selectedProductForView && (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Product Information
                    </Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Name:</strong> {selectedProductForView.name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="div"
                        >
                          <strong>Status:</strong>{' '}
                          <Chip
                            label={
                              selectedProductForView.archived
                                ? 'Archived'
                                : 'Active'
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
                          <strong>Categories:</strong>{' '}
                          {selectedProductForView.categories
                            .map(
                              (cat: KickzoneGraphqlTypes.Category) => cat.name
                            )
                            .join(', ') || 'No categories'}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Your Variants:</strong>{' '}
                          {selectedProductForView.sellerProducts?.length || 0}
                        </Typography>
                      </Box>
                      {selectedProductForView.description && (
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Description:</strong>
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
                      Your Product Variants
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
                                    Your Variant {index + 1}
                                  </Typography>
                                  <Tooltip title="Edit this variant">
                                    <IconButton
                                      size="small"
                                      color="primary"
                                      onClick={() => {
                                        handleEditSellerProduct(
                                          sellerProduct.id
                                        );
                                        handleCloseViewModal();
                                      }}
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
                                    <strong>Size:</strong>{' '}
                                    {sellerProduct.productInfo.size}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <strong>Color:</strong>{' '}
                                    {sellerProduct.productInfo.color?.name ||
                                      'No color specified'}
                                    {sellerProduct.productInfo.color && (
                                      <Box
                                        component="span"
                                        sx={{
                                          display: 'inline-block',
                                          width: 16,
                                          height: 16,
                                          backgroundColor:
                                            sellerProduct.productInfo.color
                                              .hexCode,
                                          borderRadius: '50%',
                                          border: '1px solid #ccc',
                                          ml: 1,
                                          verticalAlign: 'middle',
                                        }}
                                      />
                                    )}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <strong>Weight:</strong>{' '}
                                    {sellerProduct.productInfo.weight}
                                    kg
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <strong>Your Price:</strong> $
                                    {sellerProduct.price}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <strong>Cost Price:</strong> $
                                    {sellerProduct.costPrice}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <strong>Discount:</strong>{' '}
                                    {sellerProduct.discount}%
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <strong>Final Price:</strong> $
                                    {(
                                      (sellerProduct.price *
                                        (100 - sellerProduct.discount)) /
                                      100
                                    ).toFixed(2)}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <strong>Stock:</strong>{' '}
                                    {sellerProduct.stockQuantity} units
                                  </Typography>
                                  {sellerProduct.productInfo.images &&
                                    sellerProduct.productInfo.images.length >
                                      0 && (
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        <strong>Images:</strong>{' '}
                                        {
                                          sellerProduct.productInfo.images
                                            .length
                                        }{' '}
                                        image(s)
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
            <Button onClick={handleCloseViewModal}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </SellersLayout>
  );
};

export default SellersProducts;
