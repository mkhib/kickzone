import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useProductsQuery } from '@kickzone-workspace/products-hook';
import { useCategories } from '@kickzone-workspace/categories-hook';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Grid2 from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminProducts() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const categoryIdValue = category ? Number(category) : undefined;
  const {
    products,
    loading,
    error,
    loadMore,
    hasNextPage,
    totalCount,
    refetch,
  } = useProductsQuery({ search, categoryId: categoryIdValue, sort });
  const { categoriesData } = useCategories();
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
  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (sort) {
      filtered = [...filtered].sort(
        (a: KickzoneGraphqlTypes.Product, b: KickzoneGraphqlTypes.Product) => {
          const aInfo = a.productInfos[0];
          const bInfo = b.productInfos[0];
          if (sort === 'price')
            return (aInfo?.price ?? 0) - (bInfo?.price ?? 0);
          if (sort === 'color')
            return (aInfo?.color || '').localeCompare(bInfo?.color || '');
          return 0;
        }
      );
    }
    return filtered;
  }, [products, sort]);

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
              {categoriesData?.categories.map(
                (c: KickzoneGraphqlTypes.Category) => (
                  <MenuItem key={c.id} value={String(c.id)}>
                    {c.name}
                  </MenuItem>
                )
              )}
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
                          Price: {info?.price ?? 'N/A'}
                        </Typography>
                        <Typography variant="body2">
                          Color: {info?.color ?? 'N/A'}
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
          </>
        )}
      </Box>
    </AdminsLayout>
  );
}

export default AdminProducts;
