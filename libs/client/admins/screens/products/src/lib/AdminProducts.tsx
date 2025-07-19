import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { useCategoriesQuery } from '@kickzone-workspace/categories-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  useProductsQuery,
  useProducts,
} from '@kickzone-workspace/products-hook';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Grid2 from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArchiveIcon from '@mui/icons-material/Archive';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ProductImageManagementModal } from './ProductImageManagementModal';

export function AdminProducts() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [status, setStatus] =
    useState<KickzoneGraphqlTypes.ProductArchivedStatus>(
      KickzoneGraphqlTypes.ProductArchivedStatus.Active
    );
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [productToArchive, setProductToArchive] =
    useState<KickzoneGraphqlTypes.Product | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedProductForImages, setSelectedProductForImages] =
    useState<KickzoneGraphqlTypes.Product | null>(null);
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
    setProductToArchive(product);
    setArchiveDialogOpen(true);
  };

  const handleArchiveConfirm = async () => {
    if (productToArchive) {
      await archiveProduct(productToArchive.id);
      setArchiveDialogOpen(false);
      setProductToArchive(null);
      refetch();
    }
  };

  const handleArchiveCancel = () => {
    setArchiveDialogOpen(false);
    setProductToArchive(null);
  };

  const handleOpenImageModal = (product: KickzoneGraphqlTypes.Product) => {
    setSelectedProductForImages(product);
    setImageModalOpen(true);
  };
  const handleCloseImageModal = () => {
    setImageModalOpen(false);
    setSelectedProductForImages(null);
  };

  return (
    <AdminsLayout>
      <Box sx={{ p: { xs: 1, md: 4 } }}>
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
          <Typography variant="h4">Products</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products/new')}
          >
            Add Product
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            label="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
          />
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(String(e.target.value))}
            >
              <MenuItem value="">All</MenuItem>
              {categories?.map((c: KickzoneGraphqlTypes.Category) => (
                <MenuItem key={c.id} value={String(c.id)}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sort}
              label="Sort By"
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="color">Color</MenuItem>
              {/* Add more sort options as needed */}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Order</InputLabel>
            <Select
              value={sortOrder}
              label="Order"
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 140 }} size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) =>
                setStatus(
                  e.target.value as KickzoneGraphqlTypes.ProductArchivedStatus
                )
              }
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="ARCHIVED">Archived</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {loading && !products.length ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">Error loading products</Typography>
        ) : (
          <>
            <Grid2 container spacing={2}>
              {filteredProducts.map((product: KickzoneGraphqlTypes.Product) => {
                const info = product.productInfos[0];
                return (
                  <Grid2 key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography variant="body2">
                          Status: {product.archived ? 'Archived' : 'Active'}
                        </Typography>
                        <Typography variant="body2">
                          Color: {info?.color?.name ?? 'N/A'}
                        </Typography>
                        <Typography variant="body2">
                          Categories:{' '}
                          {product.categories
                            .map(
                              (cat: KickzoneGraphqlTypes.Category) => cat.name
                            )
                            .join(', ')}
                        </Typography>
                        {/* Show more product info as needed */}
                      </CardContent>
                      <CardActions>
                        <Button
                          variant="outlined"
                          onClick={() =>
                            navigate(`/products/edit/${product.id}`)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleOpenImageModal(product)}
                        >
                          Images
                        </Button>
                        {!product.archived && (
                          <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<ArchiveIcon />}
                            onClick={() => handleArchiveClick(product)}
                          >
                            Archive
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  </Grid2>
                );
              })}
            </Grid2>
            {hasNextPage && <div ref={loaderRef} style={{ height: 40 }} />}
            <Box mt={2} textAlign="center">
              <Typography variant="caption">
                Showing {products.length} of {totalCount} products
              </Typography>
            </Box>
            <Dialog open={archiveDialogOpen} onClose={handleArchiveCancel}>
              <DialogTitle>Archive Product</DialogTitle>
              <DialogContent>
                Are you sure you want to archive this product?
              </DialogContent>
              <DialogActions>
                <Button onClick={handleArchiveCancel}>Cancel</Button>
                <Button
                  onClick={handleArchiveConfirm}
                  color="secondary"
                  variant="contained"
                >
                  Archive
                </Button>
              </DialogActions>
            </Dialog>
            <ProductImageManagementModal
              open={imageModalOpen}
              onClose={handleCloseImageModal}
              product={selectedProductForImages}
            />
          </>
        )}
      </Box>
    </AdminsLayout>
  );
}

export default AdminProducts;
