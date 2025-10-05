import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { useCategoriesQuery } from '@kickzone-workspace/categories-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  useProductsQuery,
  useProducts,
} from '@kickzone-workspace/products-hook';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
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
  const { LL } = useI18nContext();
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
          <Typography variant="h4">{LL.navigation.products()}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products/new')}
          >
            {LL.products.addProduct()}
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            label={LL.products.searchByName()}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
          />
          <FormControl sx={{ minWidth: 120 }} size="small">
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
          <FormControl sx={{ minWidth: 120 }} size="small">
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
          <FormControl sx={{ minWidth: 120 }} size="small">
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
          <FormControl sx={{ minWidth: 140 }} size="small">
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
        </Box>
        {loading && !products.length ? (
          <Typography>{LL.status.loading()}</Typography>
        ) : error ? (
          <Typography color="error">
            {LL.products.errorLoadingProducts()}
          </Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {filteredProducts.map((product: KickzoneGraphqlTypes.Product) => {
                const info = product.productInfos[0];
                return (
                  <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography variant="body2">
                          {LL.form.status()}:{' '}
                          {product.archived
                            ? LL.table.archived()
                            : LL.table.active()}
                        </Typography>
                        <Typography variant="body2">
                          {LL.products.color()}: {info?.color?.name ?? 'N/A'}
                        </Typography>
                        <Typography variant="body2">
                          {LL.products.categories()}:{' '}
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
                          {LL.button.edit()}
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleOpenImageModal(product)}
                        >
                          {LL.products.images()}
                        </Button>
                        {!product.archived && (
                          <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<ArchiveIcon />}
                            onClick={() => handleArchiveClick(product)}
                          >
                            {LL.products.archiveProduct()}
                          </Button>
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
                Showing {products.length} of {totalCount} products
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
              product={selectedProductForImages}
              onProductUpdated={() => {
                refetch()
                  .then((result) => {
                    // Update the selected product with the latest data
                    if (
                      selectedProductForImages &&
                      result.data?.products?.edges
                    ) {
                      const updatedProduct = result.data.products.edges.find(
                        (edge) => edge.node.id === selectedProductForImages.id
                      )?.node;
                      if (updatedProduct) {
                        setSelectedProductForImages(updatedProduct);
                      }
                    }
                  })
                  .catch((error) => {
                    // Handle refetch error silently
                  });
              }}
            />
          </>
        )}
      </Box>
    </AdminsLayout>
  );
}

export default AdminProducts;
