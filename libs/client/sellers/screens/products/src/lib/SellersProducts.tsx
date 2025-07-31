import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import { useSellersProducts } from '@kickzone-workspace/sellers-products-hooks';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useNavigate } from 'react-router-dom';
import { useSellersProductsStore } from '@kickzone-workspace/sellers-products-store';
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
import Grid2 from '@mui/material/Grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { SELLER_ROUTES } from '@kickzone-workspace/shared-routes';

export const SellersProducts = () => {
  const navigate = useNavigate();
  const {
    search,
    category,
    sort,
    sortOrder,
    status,
    setSearch,
    setCategory,
    setSellersProductsSortField,
    setSellersProductsSortOrder,
    setStatus,
  } = useSellersProductsStore();

  const {
    sellersProducts,
    isSellersProductsLoading,
    sellersProductsError,
    loadMoreSellersProducts,
    hasMoreSellersProducts,
    totalSellersProductsCount,
    refetchSellersProducts,
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

  const handleEditProduct = (productId: number) => {
    navigate(`${SELLER_ROUTES.MANAGE_PRODUCT}?productId=${productId}`);
  };

  const handleViewProduct = (productId: number) => {
    // TODO: Implement view product details
    console.log('View product:', productId);
  };

  if (isSellersProductsLoading) {
    return (
      <SellersLayout>
        <Box sx={{ p: 3 }}>
          <Typography>Loading your products...</Typography>
        </Box>
      </SellersLayout>
    );
  }

  if (sellersProductsError) {
    return (
      <SellersLayout>
        <Box sx={{ p: 3 }}>
          <Typography color="error">
            Error loading products: {sellersProductsError.message}
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
            My Products
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
            sx={{ minWidth: 150 }}
          >
            Add Product
          </Button>
        </Box>

        {/* Filters */}
        <Box sx={{ mb: 3 }}>
          <Grid2 container spacing={2} alignItems="center">
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                fullWidth
                label="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
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
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
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
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
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
            </Grid2>
          </Grid2>
        </Box>

        {/* Products Grid */}
        <Grid2 container spacing={3}>
          {sellersProducts.map((product: KickzoneGraphqlTypes.Product) => {
            const firstProductInfo = product.productInfos[0];
            return (
              <Grid2 key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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

                      {firstProductInfo && (
                        <>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Size:</strong> {firstProductInfo.size}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Color:</strong>{' '}
                            {firstProductInfo.color?.name || 'No color'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Weight:</strong> {firstProductInfo.weight}kg
                          </Typography>
                        </>
                      )}

                      <Typography variant="body2" color="text.secondary">
                        <strong>Variants:</strong> {product.productInfos.length}
                      </Typography>
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

                  <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                    <Box>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => handleViewProduct(product.id)}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box>
                      <Tooltip title="Edit Product">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardActions>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>

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
      </Box>
    </SellersLayout>
  );
};

export default SellersProducts;
