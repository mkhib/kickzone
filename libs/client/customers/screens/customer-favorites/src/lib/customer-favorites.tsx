import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import {
  CUSTOMER_ROUTES,
  getCustomerProductDetailsRoute,
} from '@kickzone-workspace/customers-routes';
import {
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';
import {
  useWishlistItems,
  useRemoveFromWishlist,
  useClearWishlist,
  WishlistItem,
} from '@kickzone-workspace/customer-wishlist-store';

export function CustomerFavorites() {
  const { currentLocale } = useLanguageContext();
  const isEn = currentLocale === 'en';
  const isRTL = currentLocale === 'fa';

  usePageTitle(() => (isEn ? 'Favorites — SAINTBALA' : 'علاقه‌مندی‌ها — SAINTBALA'));

  // Defensive array guard: always guaranteed to be an array
  const rawItems = useWishlistItems();
  const items: WishlistItem[] = Array.isArray(rawItems) ? rawItems : [];

  const removeItem = useRemoveFromWishlist();
  const clearWishlist = useClearWishlist();

  const labels = {
    title: isEn ? 'Saved Pieces' : 'مجموعه علاقه‌مندی‌ها',
    count: isEn
      ? `${items.length} ${items.length === 1 ? 'Piece' : 'Pieces'}`
      : `${items.length} محصول`,
    clearAll: isEn ? 'Clear All' : 'پاک کردن همه',
    emptyTitle: isEn ? 'Your Curation is Empty' : 'لیست علاقه‌مندی‌های شما خالی است',
    emptyDescription: isEn
      ? 'Pieces and collections you mark with a heart will appear here for seamless comparison and acquisition.'
      : 'محصولات و قطعاتی که در این بخش نشان می‌کنید، برای بررسی و سفارش آسان در دسترس شما قرار می‌گیرند.',
    exploreCatalog: isEn ? 'Explore Catalog' : 'مشاهده محصولات',
    viewProduct: isEn ? 'View Piece' : 'مشاهده جزئیات',
    removeAria: isEn ? 'Remove from favorites' : 'حذف از علاقه‌مندی‌ها',
    sku: isEn ? 'SKU:' : 'کد:',
  };

  return (
    <CustomersLayout>
      <Box
        data-testid="customer-favorites-screen"
        sx={{
          minHeight: '70vh',
          py: { xs: 4, md: 8 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          {/* Header Bar */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2,
              mb: 5,
              pb: 3,
              borderBottom: (theme) =>
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.10)'
                  : '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <Box>
              <Typography
                component="div"
                sx={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#c9a774' : '#8a6a3d',
                  mb: 0.5,
                }}
              >
                <bdi>SAINTBALA</bdi> {isEn ? 'CURATION' : 'انتخاب‌ها'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{
                    fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: '1.6rem', sm: '2.1rem' },
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                  }}
                >
                  {labels.title}
                </Typography>
                {items.length > 0 && (
                  <Chip
                    label={labels.count}
                    size="small"
                    sx={{
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(201, 167, 116, 0.16)'
                          : 'rgba(138, 106, 61, 0.12)',
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#c9a774' : '#8a6a3d',
                      fontWeight: 700,
                      borderRadius: '9999px',
                    }}
                  />
                )}
              </Box>
            </Box>

            {items.length > 0 && (
              <Button
                variant="text"
                data-testid="clear-favorites-btn"
                onClick={clearWishlist}
                startIcon={<DeleteOutlineIcon />}
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#a8a8ae' : '#6e6e73',
                  textTransform: 'none',
                  minHeight: '44px',
                  px: 2,
                  '&:hover': {
                    color: '#ef4444',
                    bgcolor: 'rgba(239, 68, 68, 0.08)',
                  },
                }}
              >
                {labels.clearAll}
              </Button>
            )}
          </Box>

          {/* Empty State */}
          {items.length === 0 ? (
            <Box
              data-testid="favorites-empty-state"
              sx={{
                py: { xs: 8, md: 12 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: { xs: 3, sm: 6 },
                borderRadius: '24px',
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(13, 14, 20, 0.65)'
                    : 'rgba(255, 255, 255, 0.75)',
                border: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.08)'
                    : '1px solid rgba(0, 0, 0, 0.06)',
                backdropFilter: 'blur(30px)',
              }}
            >
              {/* Icon container */}
              <Box
                sx={{
                  width: { xs: 68, sm: 84 },
                  height: { xs: 68, sm: 84 },
                  borderRadius: '50%',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(201, 167, 116, 0.12)'
                      : 'rgba(138, 106, 61, 0.10)',
                  border: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '1px solid rgba(201, 167, 116, 0.25)'
                      : '1px solid rgba(138, 106, 61, 0.20)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#c9a774' : '#8a6a3d',
                  mb: 3,
                }}
              >
                <FavoriteIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
              </Box>

              <Typography
                component="h2"
                variant="h5"
                sx={{
                  fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#ffffff' : '#1d1d1f',
                  mb: 1.5,
                }}
              >
                {labels.emptyTitle}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#a8a8ae' : '#5c5c61',
                  maxWidth: '460px',
                  lineHeight: 1.7,
                  mb: 4,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                {isRTL ? (
                  <span>
                    محصولات و قطعاتی که در <bdi>SAINTBALA</bdi> نشان می‌کنید، در
                    این بخش برای مقایسه و خرید آسان نمایش داده می‌شوند.
                  </span>
                ) : (
                  labels.emptyDescription
                )}
              </Typography>

              <Button
                component={RouterLink}
                to={CUSTOMER_ROUTES.SHOP}
                variant="contained"
                data-testid="favorites-shop-cta"
                startIcon={<ShoppingBagOutlinedIcon />}
                sx={{
                  minHeight: '44px',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#c9a774' : '#1d1d1f',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
                  fontWeight: 700,
                  px: 4,
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '0 6px 20px rgba(201, 167, 116, 0.35)'
                      : '0 4px 14px rgba(0, 0, 0, 0.15)',
                  '&:hover': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#d8bc8c' : '#2e2e2c',
                  },
                }}
              >
                {labels.exploreCatalog}
              </Button>
            </Box>
          ) : (
            /* Populated Favorites Grid */
            <Grid container spacing={3} data-testid="favorites-grid">
              {items.map((item) => {
                const productUrl = getCustomerProductDetailsRoute(item.id);
                const hasImage = Boolean(item.primaryImage);

                return (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={String(item.id)}>
                    <Card
                      elevation={0}
                      data-testid={`favorite-card-${item.id}`}
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '16px',
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(13, 14, 20, 0.72)'
                            : 'rgba(255, 255, 255, 0.85)',
                        border: (theme) =>
                          theme.palette.mode === 'dark'
                            ? '1px solid rgba(255, 255, 255, 0.10)'
                            : '1px solid rgba(0, 0, 0, 0.08)',
                        backdropFilter: 'blur(20px)',
                        transition:
                          'transform 0.25s ease, box-shadow 0.25s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '0 16px 36px rgba(0, 0, 0, 0.6)'
                              : '0 12px 30px rgba(0, 0, 0, 0.08)',
                        },
                      }}
                    >
                      {/* Image / Thumbnail Container */}
                      <Box sx={{ position: 'relative', pt: '100%', bgcolor: '#141416' }}>
                        {hasImage ? (
                          <CardMedia
                            component="img"
                            image={item.primaryImage as string}
                            alt={item.name}
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
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#141416'
                                  : '#f0efe9',
                              color: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#c9a774'
                                  : '#8a6a3d',
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: '"Manrope", sans-serif',
                                fontWeight: 800,
                                letterSpacing: '0.2em',
                                fontSize: '13px',
                              }}
                            >
                              <bdi>SAINTBALA</bdi>
                            </Typography>
                          </Box>
                        )}

                        {/* Remove Action Button */}
                        <IconButton
                          aria-label={labels.removeAria}
                          onClick={() => removeItem(item.id)}
                          data-testid={`remove-favorite-btn-${item.id}`}
                          sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            bgcolor: 'rgba(0, 0, 0, 0.6)',
                            color: '#ef4444',
                            backdropFilter: 'blur(8px)',
                            width: 36,
                            height: 36,
                            '&:hover': {
                              bgcolor: 'rgba(0, 0, 0, 0.85)',
                              transform: 'scale(1.08)',
                            },
                          }}
                        >
                          <FavoriteIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      {/* Content */}
                      <CardContent
                        sx={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          p: 2.5,
                        }}
                      >
                        <Typography
                          component="div"
                          sx={{
                            fontFamily: '"Manrope", sans-serif',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#c9a774'
                                : '#8a6a3d',
                            mb: 0.5,
                          }}
                        >
                          {item.brand || <bdi>SAINTBALA</bdi>}
                        </Typography>

                        <Typography
                          component="h2"
                          variant="subtitle1"
                          sx={{
                            fontFamily: '"Manrope", "Vazirmatn", sans-serif',
                            fontWeight: 700,
                            fontSize: '1rem',
                            lineHeight: 1.4,
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#ffffff'
                                : '#1d1d1f',
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {item.name}
                        </Typography>

                        {item.productCode && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#8e8e93'
                                  : '#6e6e73',
                              fontFamily: 'monospace',
                              mb: 1.5,
                            }}
                          >
                            {labels.sku} {item.productCode}
                          </Typography>
                        )}

                        <Box sx={{ mt: 'auto', pt: 1 }}>
                          {typeof item.price === 'number' && (
                            <Typography
                              sx={{
                                fontFamily: '"Manrope", sans-serif',
                                fontWeight: 800,
                                fontSize: '1.15rem',
                                color: (theme) =>
                                  theme.palette.mode === 'dark'
                                    ? '#ffffff'
                                    : '#1d1d1f',
                                mb: 2,
                              }}
                            >
                              ${item.price.toLocaleString()}
                            </Typography>
                          )}

                          <Button
                            component={RouterLink}
                            to={productUrl}
                            variant="outlined"
                            fullWidth
                            data-testid={`view-favorite-btn-${item.id}`}
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                              minHeight: '44px',
                              borderRadius: '8px',
                              borderColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? 'rgba(201, 167, 116, 0.4)'
                                  : 'rgba(0, 0, 0, 0.2)',
                              color: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#f5f5f7'
                                  : '#1d1d1f',
                              fontWeight: 600,
                              textTransform: 'none',
                              '&:hover': {
                                borderColor: (theme) =>
                                  theme.palette.mode === 'dark'
                                    ? '#c9a774'
                                    : '#8a6a3d',
                                bgcolor: (theme) =>
                                  theme.palette.mode === 'dark'
                                    ? 'rgba(201, 167, 116, 0.08)'
                                    : 'rgba(138, 106, 61, 0.06)',
                              },
                            }}
                          >
                            {labels.viewProduct}
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Container>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerFavorites;
