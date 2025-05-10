import React, { useState, useMemo } from 'react';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid2 from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

// Use the correct types from codegen
type Product = KickzoneGraphqlTypes.Product;
type Category = KickzoneGraphqlTypes.Category;

// TODO: Replace with actual query hook after codegen
const useProductsQuery = () => {
  return {
    products: [] as Product[],
    categories: [] as Category[],
    loading: false,
    error: null,
  };
};

export function AdminProducts() {
  const navigate = useNavigate();
  const { products, categories, loading, error } = useProductsQuery();

  // Filters and sort state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  // Filtering and sorting logic
  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (search) {
      filtered = filtered.filter((p: Product) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter((p: Product) =>
        p.categories.some((cat) => String(cat.id) === String(category))
      );
    }
    if (sort) {
      filtered = [...filtered].sort((a: Product, b: Product) => {
        const aInfo = a.productInfos[0];
        const bInfo = b.productInfos[0];
        if (sort === 'price') return (aInfo?.price ?? 0) - (bInfo?.price ?? 0);
        if (sort === 'color')
          return (aInfo?.color || '').localeCompare(bInfo?.color || '');
        // Add more sort logic as needed
        return 0;
      });
    }
    return filtered;
  }, [products, search, category, sort]);

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
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((c: Category) => (
                <MenuItem key={c.id} value={c.id}>
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
        </Box>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">Error loading products</Typography>
        ) : (
          <Grid2 container spacing={2}>
            {filteredProducts.map((product: Product) => {
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
                        {product.categories.map((cat) => cat.name).join(', ')}
                      </Typography>
                      {/* Show more product info as needed */}
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="outlined"
                        onClick={() => navigate(`/products/edit/${product.id}`)}
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid2>
              );
            })}
          </Grid2>
        )}
      </Box>
    </AdminsLayout>
  );
}

export default AdminProducts;
