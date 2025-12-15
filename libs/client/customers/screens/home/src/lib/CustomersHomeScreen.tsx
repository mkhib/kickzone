import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { CustomersProductCard } from '@kickzone-workspace/customers-product-card';
import { useProductsQuery } from '@kickzone-workspace/products-hook';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { useCallback, useState } from 'react';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import { useCustomersCartService } from '@kickzone-workspace/customers-cart-hook';
import Button from '@mui/material/Button';

export function CustomersHome() {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { LL } = useI18nContext();

  const { products, loading } = useProductsQuery({
    search,
    sort,
    sortOrder,
    pageSize: 12,
    onlyWithSellers: true, // Only show products with sellers
    onlyInStock: true, // Only show products in stock
  });

  const { addItem } = useCustomersCartService();

  // Handle search submission (Enter key or button click)
  const handleSearch = useCallback(() => {
    setSearch(searchInput);
  }, [searchInput]);

  // Handle Enter key in search input
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
  );

  // Add to cart logic
  const handleAddToCart = useCallback(
    (product: KickzoneGraphqlTypes.Product) => {
      if (product.productInfos && product.productInfos.length > 0) {
        const productInfo = product.productInfos[0];

        // Find the sellerProduct that matches this productInfo
        const sellerProduct = product.sellerProducts?.find(
          (sp) => sp.productInfoId === productInfo.id
        );

        if (!sellerProduct || !sellerProduct.seller) {
          return;
        }

        // Check stock availability
        if (sellerProduct.stockQuantity <= 0) {
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
          color: productInfo.color?.name || null,
          size: productInfo.size || null,
          sellerId: sellerProduct.seller.id.toString(),
          sellerName: '', // Not displayed to customers
          sellerShippingFee: sellerProduct.seller.shippingFee || 0,
          productInfoId: productInfo.id.toString(),
          sellerProductId: sellerProduct.id.toString(),
          availableStock: sellerProduct.stockQuantity,
        });
      }
    },
    [addItem]
  );

  return (
    <CustomersLayout>
      <CssBaseline />

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 2, md: 3 },
          pb: { xs: 2, md: 3 },
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 1, md: 2 } }}>
          <Fade in timeout={1000}>
            <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              {/* Hero Title with Glassmorphic Background */}
              <GlassmorphismContainer
                wrapperSx={{ mb: 0.5, p: 0, mx: { xs: -1, md: -2 } }}
                containerSx={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.15)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                    animation: 'shimmer 3s ease-in-out infinite',
                  },
                }}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    mb: 1,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    background:
                      'linear-gradient(135deg, #9d4edd 0%, #7b2cbf 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {LL.messages.welcome()}
                </Typography>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    fontSize: { xs: '1.25rem', md: '1.75rem' },
                    background:
                      'linear-gradient(135deg, #9d4edd 0%, #7b2cbf 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '0.02em',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  Unlock Your Icon
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1,
                    fontWeight: 400,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    color: 'rgba(157, 78, 221, 0.8)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {LL.messages.homeDescription()}
                </Typography>
              </GlassmorphismContainer>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Products Section */}
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 1, md: 2 },
          px: { xs: 1, md: 2 },
        }}
      >
        <GlassmorphismContainer
          wrapperSx={{ p: 0, mx: { xs: -1, md: -2 } }}
          containerSx={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(15px) saturate(180%)',
            WebkitBackdropFilter: 'blur(15px) saturate(180%)',
          }}
        >
          {/* Search and Filter Bar */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              p: { xs: 1.5, md: 2 },
              pb: { xs: 2, md: 3 },
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 12, md: 5 }}>
                <TextField
                  variant="outlined"
                  placeholder={LL.form.searchProducts()}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 4,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#9d4edd' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  fullWidth
                  sx={{
                    borderRadius: 4,
                    px: 4,
                    py: 1.5,
                    background: 'linear-gradient(135deg, #9d4edd 0%, #7b2cbf 100%)',
                    boxShadow: '0 4px 15px 0 rgba(157, 78, 221, 0.4)',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%)',
                      boxShadow: '0 6px 20px 0 rgba(157, 78, 221, 0.6)',
                    },
                  }}
                >
                  {LL.button.search()}
                </Button>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
                <FormControl fullWidth>
                  <InputLabel>{LL.form.sortBy()}</InputLabel>
                  <Select
                    value={sort}
                    label={LL.form.sortBy()}
                    onChange={(e) => setSort(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <TrendingUpIcon sx={{ color: '#9d4edd', ml: 1 }} />
                      </InputAdornment>
                    }
                    sx={{
                      borderRadius: 4,
                    }}
                  >
                    <MenuItem value="price">{LL.table.price()}</MenuItem>
                    <MenuItem value="discount">{LL.form.discount()}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
                <FormControl fullWidth>
                  <InputLabel>{LL.form.order()}</InputLabel>
                  <Select
                    value={sortOrder}
                    label={LL.form.order()}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    startAdornment={
                      <InputAdornment position="start">
                        <LocalOfferIcon sx={{ color: '#9d4edd', ml: 1 }} />
                      </InputAdornment>
                    }
                    sx={{
                      borderRadius: 4,
                    }}
                  >
                    <MenuItem value="asc">{LL.products.ascending()}</MenuItem>
                    <MenuItem value="desc">{LL.products.descending()}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 400,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  borderRadius: 6,
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                  textAlign: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    border: '4px solid #9d4edd',
                    borderTopColor: 'transparent',
                    animation: 'spin 1s linear infinite',
                    mb: 2,
                    mx: 'auto',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' },
                    },
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: '#9d4edd',
                    fontWeight: 600,
                    background:
                      'linear-gradient(135deg, #9d4edd 0%, #7b2cbf 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {LL.status.loading()}
                </Typography>
              </Paper>
            </Box>
          ) : products.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 400,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  borderRadius: 6,
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    background:
                      'linear-gradient(135deg, #9d4edd 0%, #7b2cbf 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {LL.products.noProductsFound()}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(157, 78, 221, 0.7)',
                    fontWeight: 400,
                  }}
                >
                  Try adjusting your search or filters
                </Typography>
              </Paper>
            </Box>
          ) : (
            <Fade in timeout={800}>
              <Grid
                container
                spacing={{ xs: 2, sm: 3, md: 4 }}
                sx={{
                  ...(products.length === 1
                    ? { justifyContent: 'center' }
                    : {}),
                  px: { xs: 1.5, md: 2 },
                  pb: { xs: 1.5, md: 2 },
                }}
              >
                {products.map((product, index) => (
                  <Grid
                    key={product.id}
                    size={
                      products.length === 1
                        ? { xs: 12, sm: 8, md: 6, lg: 4, xl: 4 }
                        : { xs: 12, sm: 6, md: 4, lg: 3 }
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
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  </Grid>
                ))}
              </Grid>
            </Fade>
          )}
        </GlassmorphismContainer>
      </Container>
    </CustomersLayout>
  );
}

export default CustomersHome;
