import React, { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { CustomersProductCard } from '@kickzone-workspace/customers-product-card';
import { useProductsQuery } from '@kickzone-workspace/products-hook';
import { serializeVariantColorHexes } from '@kickzone-workspace/client-shared-graphql';
import { getCustomerProductDetailsRoute } from '@kickzone-workspace/customers-routes';
import {
  useI18nContext,
  useLanguageContext,
  usePageTitle,
  farsiDisplayStack,
} from '@kickzone-workspace/shared-i18n';
import { useCustomersCartService } from '@kickzone-workspace/customers-cart-hook';

// Material-UI Components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ClearIcon from '@mui/icons-material/Clear';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SellIcon from '@mui/icons-material/Sell';
import WorkspacePremiumOutlined from '@mui/icons-material/WorkspacePremiumOutlined';
import GppGoodOutlined from '@mui/icons-material/GppGoodOutlined';
import LocalShippingOutlined from '@mui/icons-material/LocalShippingOutlined';
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined';
import ArrowDownwardRounded from '@mui/icons-material/ArrowDownwardRounded';
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined';

const SEARCH_DEBOUNCE_MS = 400;

type QuickFilter = 'all' | 'recommended' | 'discount' | 'boxless';

export function CustomersHome() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [quickFilter, setQuickFilter] = useState<QuickFilter>('all');

  const { LL } = useI18nContext();
  const { currentLocale } = useLanguageContext();
  const isRTL = currentLocale === 'fa';
  usePageTitle(() => LL.pageTitles.home());

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const goldColor = isDark ? '#c5b89a' : '#7c6d48';
  const goldLight = isDark ? '#ddd4bf' : '#9a8b65';

  const { products, loading, loadMore, hasNextPage } = useProductsQuery({
    search,
    sort,
    sortOrder,
    pageSize: 12,
    onlyWithSellers: true,
    onlyInStock: true,
  });

  const { addItem } = useCustomersCartService();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const catalogSectionRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasNextPage) return;
    setIsLoadingMore(true);
    try {
      await loadMore();
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasNextPage, loadMore]);

  // Infinite scroll: observe the loader element near the bottom
  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { rootMargin: '250px' }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [handleLoadMore, hasNextPage]);

  // Fallback scroll listener in case IntersectionObserver doesn't trigger
  useEffect(() => {
    if (!hasNextPage) return;

    const handleScroll = () => {
      if (isLoadingMore) return;
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 350;
      if (scrollPosition >= threshold) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleLoadMore, hasNextPage, isLoadingMore]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const rawHomeProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (!product.productInfos || !product.sellerProducts) {
          return false;
        }
        return product.sellerProducts.some(
          (sp) => sp.seller && sp.stockQuantity > 0
        );
      })
      .map((product) => {
        const isRecommended = Boolean(
          product.sellerProducts?.some(
            (sp) =>
              (sp as unknown as { recommended?: boolean })?.recommended
          )
        );
        const isBoxLess = Boolean(
          product.sellerProducts?.some(
            (sp) =>
              (sp as unknown as { boxLess?: boolean })?.boxLess
          )
        );
        const hasDiscount = Boolean(
          product.sellerProducts?.some((sp) => sp.discount > 0)
        );

        return {
          product,
          isRecommended,
          isBoxLess,
          hasDiscount,
          key: `product-${product.id}`,
        };
      });
  }, [products]);

  // Apply in-memory quick filter (All / Recommended / Discounted / Boxless)
  const homeProducts = useMemo(() => {
    if (quickFilter === 'recommended') {
      return rawHomeProducts.filter((p) => p.isRecommended);
    }
    if (quickFilter === 'discount') {
      return rawHomeProducts.filter((p) => p.hasDiscount);
    }
    if (quickFilter === 'boxless') {
      return rawHomeProducts.filter((p) => p.isBoxLess);
    }
    return rawHomeProducts;
  }, [rawHomeProducts, quickFilter]);

  const applySearchNow = useCallback(() => {
    setSearch(searchInput.trim());
  }, [searchInput]);

  const handleClearSearch = useCallback(() => {
    setSearchInput('');
    setSearch('');
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applySearchNow();
      }
    },
    [applySearchNow]
  );

  const scrollToCatalog = useCallback(() => {
    if (catalogSectionRef.current) {
      catalogSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, []);

  const handleAddToCart = useCallback(
    (variant: {
      product: KickzoneGraphqlTypes.Product;
      productInfo: KickzoneGraphqlTypes.ProductInfo;
      sellerProduct: KickzoneGraphqlTypes.SellerProduct;
    }) => {
      const { product, productInfo, sellerProduct } = variant;

      if (!sellerProduct.seller) {
        return;
      }

      const originalPrice = sellerProduct.price;
      const discount = sellerProduct.discount;
      const finalPrice =
        discount > 0
          ? originalPrice - (originalPrice * discount) / 100
          : originalPrice;

      addItem({
        productId: product.id.toString(),
        productName: product.name,
        productImage: productInfo.images?.[0] || null,
        quantity: 1,
        unitPrice: finalPrice,
        color: serializeVariantColorHexes(productInfo.colors),
        size: productInfo.size || null,
        sellerId: sellerProduct.seller.id.toString(),
        sellerName: '',
        sellerShippingFee: sellerProduct.seller.shippingFee || 0,
        productInfoId: productInfo.id.toString(),
        sellerProductId: sellerProduct.id.toString(),
        availableStock: sellerProduct.stockQuantity,
      });
    },
    [addItem]
  );

  const OrderIcon = sortOrder === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon;

  return (
    <CustomersLayout>
      <CssBaseline />

      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          pb: { xs: 8, md: 10 },
        }}
      >
        {/* Ambient liquid lighting glow orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '2%', md: '5%' },
            right: { xs: '-8%', md: '10%' },
            width: { xs: 300, sm: 460, md: 540 },
            height: { xs: 300, sm: 460, md: 540 },
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(197, 184, 154, 0.16) 0%, rgba(197, 184, 154, 0.02) 65%, transparent 70%)'
              : 'radial-gradient(circle, rgba(230, 215, 185, 0.6) 0%, rgba(240, 230, 205, 0.22) 60%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'floatOrb 15s ease-in-out infinite alternate',
            '@keyframes floatOrb': {
              '0%': { transform: 'translate(0, 0) scale(1)' },
              '100%': { transform: 'translate(-35px, 40px) scale(1.08)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '35%', md: '45%' },
            left: { xs: '-10%', md: '8%' },
            width: { xs: 280, sm: 420, md: 480 },
            height: { xs: 280, sm: 420, md: 480 },
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(140, 120, 80, 0.13) 0%, rgba(100, 85, 55, 0.02) 65%, transparent 70%)'
              : 'radial-gradient(circle, rgba(245, 230, 215, 0.55) 0%, rgba(240, 220, 200, 0.2) 60%, transparent 70%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'floatOrb2 18s ease-in-out infinite alternate',
            '@keyframes floatOrb2': {
              '0%': { transform: 'translate(0, 0) scale(1)' },
              '100%': { transform: 'translate(40px, -30px) scale(1.06)' },
            },
          }}
        />

        {/* Hero Editorial Showcase Banner */}
        <Container
          maxWidth="xl"
          sx={{
            pt: { xs: 2, md: 3.5 },
            pb: { xs: 2.5, md: 3.5 },
            px: { xs: 2, sm: 3, md: 4 },
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Fade in timeout={900}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: { xs: '28px', md: '36px' },
                overflow: 'hidden',
                minHeight: { xs: 340, sm: 420, md: 480 },
                backdropFilter: 'blur(30px) saturate(190%)',
                WebkitBackdropFilter: 'blur(30px) saturate(190%)',
                border: isDark
                  ? '1px solid rgba(240, 239, 235, 0.14)'
                  : '1px solid rgba(255, 255, 255, 0.9)',
                boxShadow: isDark
                  ? '0 30px 70px -15px rgba(0, 0, 0, 0.7), inset 0 1px 2px 0 rgba(255, 255, 255, 0.15)'
                  : '0 24px 60px -15px rgba(180, 165, 140, 0.25), 0 2px 6px 0 rgba(0, 0, 0, 0.02), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95)',
                backgroundColor: isDark ? '#121210' : '#181715',
              }}
            >
              {/* High-res cinematic banner backdrop with dark contrast vignette */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url(/banner-image.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.95) contrast(1.08)',
                  transform: isRTL ? 'scale(1.02)' : 'scale(-1.02, 1)',
                  transition: 'transform 0.6s ease',
                }}
              />

              {/* Dynamic luxury gradient mesh overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: isRTL
                    ? 'linear-gradient(270deg, rgba(16, 16, 15, 0.88) 0%, rgba(16, 16, 15, 0.65) 45%, rgba(16, 16, 15, 0.18) 100%)'
                    : 'linear-gradient(90deg, rgba(16, 16, 15, 0.88) 0%, rgba(16, 16, 15, 0.65) 45%, rgba(16, 16, 15, 0.18) 100%)',
                }}
              />

              {/* Specular top edge highlight line */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: '10%',
                  right: '10%',
                  height: '1px',
                  background: isDark
                    ? 'linear-gradient(90deg, transparent 0%, rgba(197, 184, 154, 0.7) 50%, transparent 100%)'
                    : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.85) 50%, transparent 100%)',
                  filter: 'blur(0.5px)',
                  zIndex: 2,
                }}
              />

              <Box
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  height: '100%',
                  minHeight: { xs: 340, sm: 420, md: 480 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  px: { xs: 3, sm: 5, md: 7 },
                  py: { xs: 4, sm: 5, md: 6 },
                  maxWidth: { xs: '100%', md: '64%' },
                  textAlign: isRTL ? 'right' : 'left',
                }}
              >
                {/* Brand & Atelier Tier Glass Pill */}
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.2,
                    px: 2,
                    py: 0.6,
                    mb: { xs: 2, sm: 2.5 },
                    borderRadius: '9999px',
                    width: 'fit-content',
                    background:
                      'linear-gradient(135deg, rgba(197, 184, 154, 0.22) 0%, rgba(197, 184, 154, 0.08) 100%)',
                    border: '1px solid rgba(197, 184, 154, 0.45)',
                    boxShadow:
                      '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    alignSelf: isRTL ? 'flex-start' : 'flex-start',
                  }}
                >
                  <WorkspacePremiumOutlined
                    sx={{ fontSize: 16, color: '#f5ecd6' }}
                  />
                  <Typography
                    sx={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#f5ecd6',
                    }}
                  >
                    SAINTBALA • ÉDITIONS ATELIER
                  </Typography>
                </Box>

                {/* Main Hero Headline */}
                <Box sx={{ mb: 1.5 }}>
                  {(() => {
                    const accent = (
                      <Typography
                        component="p"
                        sx={{
                          m: 0,
                          color: '#c5b89a',
                          lineHeight: 1.15,
                          ...(isRTL
                            ? {
                                mt: { xs: 0.8, md: 1 },
                                fontFamily: farsiDisplayStack,
                                fontWeight: 700,
                                fontSize: {
                                  xs: '1.9rem',
                                  sm: '2.4rem',
                                  md: '2.9rem',
                                },
                                letterSpacing: '0.01em',
                              }
                            : {
                                mb: { xs: 0.5, md: 0.75 },
                                fontWeight: 300,
                                fontSize: {
                                  xs: '1.2rem',
                                  sm: '1.4rem',
                                  md: '1.65rem',
                                },
                                letterSpacing: '0.28em',
                                textTransform: 'uppercase',
                              }),
                        }}
                      >
                        {LL.messages.homeTitleAccent()}
                      </Typography>
                    );
                    const brand = (
                      <Typography
                        component="h1"
                        sx={{
                          m: 0,
                          fontWeight: 800,
                          fontSize: {
                            xs: '2.6rem',
                            sm: '3.4rem',
                            md: '4.4rem',
                          },
                          letterSpacing: { xs: '0.04em', md: '0.08em' },
                          color: '#fbf9f5',
                          lineHeight: 1.05,
                          fontFamily:
                            '"Manrope", "Helvetica Neue", Helvetica, Arial, sans-serif',
                        }}
                      >
                        {LL.messages.homeTitle()}
                      </Typography>
                    );

                    return isRTL ? (
                      <>
                        {brand}
                        {accent}
                      </>
                    ) : (
                      <>
                        {accent}
                        {brand}
                      </>
                    );
                  })()}
                </Box>

                {/* Subtitle / Atelier Tagline */}
                <Typography
                  sx={{
                    color: 'rgba(245, 245, 242, 0.78)',
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.05rem' },
                    lineHeight: 1.6,
                    maxWidth: 540,
                    mb: { xs: 3, md: 3.5 },
                  }}
                >
                  {isRTL
                    ? 'کلکسیون اختصاصی کفش و پوشاک ورزشی مدرن با اصالت تضمین‌شده و خدمات بسته‌بندی آتلیه'
                    : 'Bespoke curation of high-performance footwear and apparel, verified for authenticity and delivered with atelier care.'}
                </Typography>

                {/* Action CTAs & Highlights */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Explore Collection Button */}
                  <Button
                    onClick={scrollToCatalog}
                    variant="contained"
                    endIcon={
                      <ArrowDownwardRounded
                        sx={{
                          fontSize: 18,
                          transition: 'transform 0.25s ease',
                        }}
                      />
                    }
                    sx={{
                      borderRadius: '9999px',
                      px: 3.5,
                      py: 1.25,
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      letterSpacing: isRTL ? 0 : '0.02em',
                      textTransform: 'none',
                      background:
                        'linear-gradient(135deg, rgba(197, 184, 154, 0.95) 0%, rgba(181, 171, 147, 0.95) 100%)',
                      color: '#121210',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow:
                        '0 8px 24px -2px rgba(197, 184, 154, 0.45), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(16px)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': {
                        background:
                          'linear-gradient(135deg, #ffffff 0%, rgba(220, 210, 190, 0.95) 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow:
                          '0 12px 30px -4px rgba(197, 184, 154, 0.6), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95)',
                      },
                    }}
                  >
                    {isRTL ? 'مشاهده محصولات' : 'Explore Collection'}
                  </Button>

                  {/* Curated Picks Quick Pill */}
                  <Button
                    onClick={() => {
                      setQuickFilter(quickFilter === 'recommended' ? 'all' : 'recommended');
                      scrollToCatalog();
                    }}
                    variant="outlined"
                    startIcon={
                      <AutoAwesomeOutlined
                        sx={{
                          fontSize: 18,
                          color: '#e6dfd1',
                        }}
                      />
                    }
                    sx={{
                      borderRadius: '9999px',
                      px: 2.8,
                      py: 1.2,
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      textTransform: 'none',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      borderColor: 'rgba(255, 255, 255, 0.22)',
                      color: '#ffffff',
                      backdropFilter: 'blur(16px)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.16)',
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {isRTL ? 'پیشنهادهای ویژه' : "Master's Picks"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Fade>

          {/* Luxury Feature Micro-Cards Grid */}
          <Grid
            container
            spacing={2}
            sx={{
              mt: { xs: 1, md: 1.5 },
              justifyContent: 'center',
            }}
          >
            {[
              {
                icon: <GppGoodOutlined sx={{ fontSize: 20, color: goldColor }} />,
                title: isRTL ? 'اصالت ۱۰۰٪ تضمین‌شده' : '100% Certified Authentic',
                sub: isRTL ? 'بررسی اصالت کارشناسی' : 'Inspected & Guaranteed',
              },
              {
                icon: <LocalShippingOutlined sx={{ fontSize: 20, color: goldColor }} />,
                title: isRTL ? 'ارسال سریع اختصاصی' : 'Bespoke Express Shipping',
                sub: isRTL ? 'تحویل فوری در بسته‌بندی امن' : 'Fast, Tracked & Insured',
              },
              {
                icon: <Inventory2Outlined sx={{ fontSize: 20, color: goldColor }} />,
                title: isRTL ? 'بسته‌بندی لوکس آتلیه' : 'Atelier Bespoke Packaging',
                sub: isRTL ? 'جعبه و کاور محافظتی درجه یک' : 'Premium Collector Box',
              },
              {
                icon: <WorkspacePremiumOutlined sx={{ fontSize: 20, color: goldColor }} />,
                title: isRTL ? 'پشتیبانی اختصاصی مشتری' : 'Dedicated VIP Support',
                sub: isRTL ? 'پاسخگویی سریع ۲۴/۷' : 'Round-the-clock Care',
              },
            ].map((feature, idx) => (
              <Grid key={`feature-${idx}`} size={{ xs: 6, sm: 6, md: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: { xs: 1.75, sm: 2 },
                    borderRadius: '20px',
                    background: isDark
                      ? 'rgba(26, 26, 24, 0.55)'
                      : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: isDark
                      ? '1px solid rgba(240, 239, 235, 0.08)'
                      : '1px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: isDark
                      ? '0 8px 24px -4px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                      : '0 8px 20px -4px rgba(180, 165, 140, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      borderColor: isDark
                        ? 'rgba(197, 184, 154, 0.3)'
                        : 'rgba(197, 184, 154, 0.5)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isDark
                        ? 'rgba(197, 184, 154, 0.12)'
                        : 'rgba(197, 184, 154, 0.18)',
                      border: isDark
                        ? '1px solid rgba(197, 184, 154, 0.2)'
                        : '1px solid rgba(197, 184, 154, 0.3)',
                      flexShrink: 0,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Box sx={{ overflow: 'hidden' }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '0.78rem', sm: '0.84rem' },
                        color: isDark ? '#f4f4f2' : '#181816',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.7rem',
                        color: isDark ? '#a19f97' : '#6b6962',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                      }}
                    >
                      {feature.sub}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Master Catalog Section */}
        <Container
          ref={catalogSectionRef}
          maxWidth="xl"
          sx={{
            py: { xs: 2.5, md: 3.5 },
            px: { xs: 2, sm: 3, md: 4 },
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Floating Liquid Glass Control Bar (Search, Filters, Sort) */}
          <Box
            sx={{
              p: { xs: 2, sm: 2.5, md: 3 },
              mb: { xs: 3, md: 4 },
              borderRadius: { xs: '24px', md: '30px' },
              background: isDark
                ? 'linear-gradient(145deg, rgba(28, 28, 24, 0.8) 0%, rgba(20, 20, 18, 0.72) 100%)'
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 248, 244, 0.82) 100%)',
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              border: isDark
                ? '1px solid rgba(240, 239, 235, 0.12)'
                : '1px solid rgba(255, 255, 255, 0.95)',
              boxShadow: isDark
                ? '0 20px 50px -10px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)'
                : '0 20px 50px -10px rgba(180, 165, 140, 0.2), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95)',
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 2, md: 2.5 },
            }}
          >
            {/* Top Row: Search Input + Sorting */}
            <Grid container spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
              {/* Search Bar */}
              <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                <TextField
                  variant="outlined"
                  placeholder={LL.products.searchProductsPlaceholder()}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '9999px',
                      minHeight: 46,
                      backgroundColor: isDark
                        ? 'rgba(255, 255, 255, 0.04)'
                        : 'rgba(0, 0, 0, 0.02)',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        borderColor: isDark
                          ? 'rgba(197, 184, 154, 0.45)'
                          : 'rgba(143, 132, 104, 0.45)',
                      },
                      '&.Mui-focused': {
                        borderColor: isDark ? '#c5b89a' : '#7c6d48',
                        boxShadow: isDark
                          ? '0 0 16px rgba(197, 184, 154, 0.2)'
                          : '0 0 16px rgba(143, 132, 104, 0.2)',
                      },
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon
                            sx={{ color: goldColor, fontSize: 20 }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end" sx={{ gap: 0.5 }}>
                          {searchInput.length > 0 && (
                            <IconButton
                              size="small"
                              aria-label="clear search"
                              onClick={handleClearSearch}
                              edge="end"
                              sx={{
                                color: isDark ? '#a19f97' : '#6b6962',
                                '&:hover': {
                                  color: isDark ? '#ffffff' : '#000000',
                                },
                              }}
                            >
                              <ClearIcon fontSize="small" />
                            </IconButton>
                          )}
                          <IconButton
                            size="small"
                            aria-label={LL.button.search()}
                            onClick={applySearchNow}
                            edge="end"
                            sx={{
                              backgroundColor: isDark
                                ? 'rgba(197, 184, 154, 0.15)'
                                : 'rgba(143, 132, 104, 0.12)',
                              color: goldColor,
                              '&:hover': {
                                backgroundColor: isDark
                                  ? 'rgba(197, 184, 154, 0.3)'
                                  : 'rgba(143, 132, 104, 0.22)',
                              },
                            }}
                          >
                            <SearchIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>

              {/* Sort By Select */}
              <Grid size={{ xs: 6, sm: 6, md: 3, lg: 3 }}>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '9999px',
                      minHeight: 46,
                      backgroundColor: isDark
                        ? 'rgba(255, 255, 255, 0.04)'
                        : 'rgba(0, 0, 0, 0.02)',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(0, 0, 0, 0.08)',
                    },
                  }}
                >
                  <InputLabel id="home-sort-label">
                    {LL.form.sortBy()}
                  </InputLabel>
                  <Select
                    labelId="home-sort-label"
                    value={sort}
                    label={LL.form.sortBy()}
                    onChange={(e) => setSort(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start" sx={{ ml: 1 }}>
                        <SortIcon sx={{ color: goldColor, fontSize: 18 }} />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="price">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SellIcon sx={{ fontSize: 16, color: goldColor }} />
                        {LL.table.price()}
                      </Box>
                    </MenuItem>
                    <MenuItem value="discount">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalOfferIcon sx={{ fontSize: 16, color: goldColor }} />
                        {LL.form.discount()}
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Order Select */}
              <Grid size={{ xs: 6, sm: 6, md: 3, lg: 3 }}>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '9999px',
                      minHeight: 46,
                      backgroundColor: isDark
                        ? 'rgba(255, 255, 255, 0.04)'
                        : 'rgba(0, 0, 0, 0.02)',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(0, 0, 0, 0.08)',
                    },
                  }}
                >
                  <InputLabel id="home-order-label">
                    {LL.form.order()}
                  </InputLabel>
                  <Select
                    labelId="home-order-label"
                    value={sortOrder}
                    label={LL.form.order()}
                    onChange={(e) =>
                      setSortOrder(e.target.value as 'asc' | 'desc')
                    }
                    startAdornment={
                      <InputAdornment position="start" sx={{ ml: 1 }}>
                        <OrderIcon sx={{ color: goldColor, fontSize: 18 }} />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="asc">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                        {LL.products.ascending()}
                      </Box>
                    </MenuItem>
                    <MenuItem value="desc">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ArrowDownwardIcon sx={{ fontSize: 16 }} />
                        {LL.products.descending()}
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Bottom Row: Quick Filter Capsule Pills */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                flexWrap: 'wrap',
                pt: 0.5,
                borderTop: isDark
                  ? '1px solid rgba(255, 255, 255, 0.06)'
                  : '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: isDark ? '#a19f97' : '#6b6962',
                  fontWeight: 600,
                  fontSize: '0.74rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  mr: 0.5,
                }}
              >
                {isRTL ? 'فیلتر سریع:' : 'Quick Filters:'}
              </Typography>

              {[
                { id: 'all' as QuickFilter, label: isRTL ? 'همه محصولات' : 'All Products' },
                {
                  id: 'recommended' as QuickFilter,
                  label: isRTL ? 'پیشنهاد ویژه' : "Master's Pick",
                  icon: <AutoAwesomeOutlined sx={{ fontSize: 14 }} />,
                },
                {
                  id: 'discount' as QuickFilter,
                  label: isRTL ? 'دارای تخفیف' : 'On Sale',
                  icon: <LocalOfferIcon sx={{ fontSize: 14 }} />,
                },
                {
                  id: 'boxless' as QuickFilter,
                  label: isRTL ? 'بدون جعبه (Box-less)' : 'Box-less',
                  icon: <Inventory2Outlined sx={{ fontSize: 14 }} />,
                },
              ].map((pill) => {
                const isActive = quickFilter === pill.id;
                return (
                  <Chip
                    key={pill.id}
                    label={pill.label}
                    icon={pill.icon}
                    onClick={() => setQuickFilter(pill.id)}
                    sx={{
                      borderRadius: '9999px',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.8rem',
                      px: 1,
                      py: 0.5,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      backgroundColor: isActive
                        ? isDark
                          ? 'rgba(197, 184, 154, 0.25)'
                          : 'rgba(143, 132, 104, 0.18)'
                        : isDark
                        ? 'rgba(255, 255, 255, 0.04)'
                        : 'rgba(0, 0, 0, 0.03)',
                      color: isActive
                        ? isDark
                          ? '#ffffff'
                          : '#181816'
                        : isDark
                        ? '#a19f97'
                        : '#6b6962',
                      border: isActive
                        ? isDark
                          ? '1px solid rgba(197, 184, 154, 0.55)'
                          : '1px solid rgba(143, 132, 104, 0.45)'
                        : '1px solid transparent',
                      boxShadow: isActive
                        ? isDark
                          ? '0 2px 10px rgba(197, 184, 154, 0.2)'
                          : '0 2px 8px rgba(143, 132, 104, 0.15)'
                        : 'none',
                      '&:hover': {
                        backgroundColor: isActive
                          ? isDark
                            ? 'rgba(197, 184, 154, 0.32)'
                            : 'rgba(143, 132, 104, 0.24)'
                          : isDark
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.06)',
                        color: isDark ? '#ffffff' : '#181816',
                      },
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          {/* Catalog Section Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
              mb: 3,
              px: { xs: 0.5, sm: 1 },
            }}
          >
            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textTransform: 'uppercase',
                  letterSpacing: '0.22em',
                  fontWeight: 700,
                  fontSize: '0.74rem',
                  color: goldColor,
                  mb: 0.5,
                }}
              >
                {isRTL ? 'کلکسیون اختصاصی آتلیه' : 'BESPOKE CURATION'}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.4rem', sm: '1.75rem' },
                  color: isDark ? '#f4f4f2' : '#181816',
                  letterSpacing: isRTL ? 0 : '-0.02em',
                }}
              >
                {quickFilter === 'recommended'
                  ? isRTL
                    ? 'پیشنهادهای ویژه آتلیه'
                    : "Master's Curated Picks"
                  : quickFilter === 'discount'
                  ? isRTL
                    ? 'محصولات دارای تخفیف ویژه'
                    : 'Exclusive Special Offers'
                  : quickFilter === 'boxless'
                  ? isRTL
                    ? 'مدل‌های بدون جعبه (Box-less)'
                    : 'Box-less Certified Editions'
                  : isRTL
                  ? 'جدیدترین مدل‌ها و محصولات موجود'
                  : 'Latest Arrivals & Catalog'}
              </Typography>
            </Box>

            {/* Active Items Counter Pill */}
            {!loading && (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 0.6,
                  borderRadius: '9999px',
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.04)',
                  border: isDark
                    ? '1px solid rgba(255, 255, 255, 0.08)'
                    : '1px solid rgba(0, 0, 0, 0.06)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: isDark ? '#d4d4d0' : '#4b4843',
                  }}
                >
                  {isRTL
                    ? `${homeProducts.length} مدل موجود`
                    : `${homeProducts.length} Items Available`}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Products Grid / Loading / Empty states */}
          {loading && homeProducts.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                minHeight: { xs: 300, md: 420 },
                p: 4,
                borderRadius: '28px',
                background: isDark
                  ? 'rgba(26, 26, 24, 0.45)'
                  : 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(20px)',
                border: isDark
                  ? '1px solid rgba(255, 255, 255, 0.06)'
                  : '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <CircularProgress
                size={44}
                sx={{ color: goldColor }}
                role="progressbar"
              />
              <Typography
                sx={{
                  fontSize: '0.88rem',
                  color: isDark ? '#a19f97' : '#6b6962',
                  fontWeight: 500,
                }}
              >
                {isRTL
                  ? 'در حال آماده‌سازی کلکسیون آتلیه...'
                  : 'Loading curated catalog...'}
              </Typography>
            </Box>
          ) : homeProducts.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                minHeight: { xs: 300, md: 420 },
                p: 5,
                borderRadius: '28px',
                background: isDark
                  ? 'rgba(26, 26, 24, 0.45)'
                  : 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(20px)',
                border: isDark
                  ? '1px solid rgba(255, 255, 255, 0.08)'
                  : '1px solid rgba(0, 0, 0, 0.06)',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isDark
                    ? 'rgba(197, 184, 154, 0.12)'
                    : 'rgba(143, 132, 104, 0.12)',
                  color: goldColor,
                  mb: 1,
                }}
              >
                <SearchIcon sx={{ fontSize: 36 }} />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: isDark ? '#f4f4f2' : '#181816',
                }}
              >
                {LL.products.noProductsFound()}
              </Typography>
              {search && (
                <Typography
                  variant="body2"
                  sx={{ color: isDark ? '#a19f97' : '#6b6962', maxWidth: 400 }}
                >
                  {LL.products.searchProducts()}: "{search}"
                </Typography>
              )}
              <Button
                variant="outlined"
                onClick={() => {
                  handleClearSearch();
                  setQuickFilter('all');
                }}
                sx={{
                  mt: 1,
                  borderRadius: '9999px',
                  px: 3,
                  py: 1,
                  borderColor: goldColor,
                  color: goldColor,
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: goldLight,
                    backgroundColor: isDark
                      ? 'rgba(197, 184, 154, 0.1)'
                      : 'rgba(143, 132, 104, 0.08)',
                  },
                }}
              >
                {isRTL ? 'مشاهده همه محصولات' : 'Reset All Filters'}
              </Button>
            </Box>
          ) : (
            <>
              <Fade in timeout={800}>
                <Grid
                  container
                  spacing={{ xs: 2, sm: 2.5, md: 3 }}
                  sx={{
                    ...(homeProducts.length === 1
                      ? { justifyContent: 'center' }
                      : {}),
                    pb: { xs: 2, md: 3 },
                  }}
                >
                  {homeProducts.map((item, index) => {
                    return (
                      <Grid
                        key={item.key}
                        size={
                          homeProducts.length === 1
                            ? { xs: 12, sm: 8, md: 6, lg: 4 }
                            : { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }
                        }
                        sx={{
                          animation: `fadeInUp 0.6s ease-out ${Math.min(
                            (index % 12) * 0.07,
                            0.5
                          )}s both`,
                          '@keyframes fadeInUp': {
                            '0%': {
                              opacity: 0,
                              transform: 'translateY(24px)',
                            },
                            '100%': {
                              opacity: 1,
                              transform: 'translateY(0)',
                            },
                          },
                        }}
                      >
                        <CustomersProductCard
                          product={item.product}
                          isRecommended={item.isRecommended}
                          isBoxLess={item.isBoxLess}
                          onCardClick={(prod) =>
                            navigate(getCustomerProductDetailsRoute(prod.id))
                          }
                          onAddToCart={(prod) => {
                            const firstInfo = prod.productInfos?.[0];
                            const sp = prod.sellerProducts?.find(
                              (s) => s.productInfoId === firstInfo?.id
                            );
                            if (firstInfo && sp) {
                              handleAddToCart({
                                product: prod,
                                productInfo: firstInfo,
                                sellerProduct: sp,
                              });
                            }
                          }}
                          onAddVariantToCart={handleAddToCart}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Fade>

              {hasNextPage && (
                <Box
                  ref={loaderRef}
                  data-testid="products-scroll-loader"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 5,
                    minHeight: 70,
                  }}
                >
                  <CircularProgress size={34} sx={{ color: goldColor }} />
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>
    </CustomersLayout>
  );
}

export default CustomersHome;
