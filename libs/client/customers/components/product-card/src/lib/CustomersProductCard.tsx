import React, { useCallback, useState, useMemo } from 'react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  useI18nContext,
  useLanguageContext,
} from '@kickzone-workspace/shared-i18n';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VerifiedIcon from '@mui/icons-material/Verified';
import { PriceDisplay } from '@kickzone-workspace/price-display';

const PRODUCT_IMAGE_PLACEHOLDER =
  'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F10%2Fair-jordan-1-high-og-rebellionaire-closer-look-release-info-555088-036-000.jpg?w=960&cbr=1&q=90&fit=max';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const resolveImageUrl = (img?: string | null) => {
  if (!img) return null;
  if (img.startsWith('http://') || img.startsWith('https://')) return img;
  if (img.startsWith('//')) return `https:${img}`;
  if (img.startsWith('/')) {
    const base =
      API_BASE_URL && API_BASE_URL.startsWith('http')
        ? API_BASE_URL
        : typeof window !== 'undefined'
        ? window.location.origin
        : '';
    return `${base}${img}`;
  }
  return img;
};

// Utility to convert numbers to locale format (supports Farsi digits)
const formatNumber = (num: number | string, locale: string): string => {
  return Number(num).toLocaleString(locale);
};

interface ProductCardProps {
  product: KickzoneGraphqlTypes.Product;
  onAddToCart: (product: KickzoneGraphqlTypes.Product) => void;
  /**
   * Force show a discount badge (percentage). Falls back to product discount.
   */
  discountOverride?: number;
  /**
   * Force low-stock state. Falls back to stock quantity threshold.
   */
  lowStockOverride?: boolean;
  /**
   * Threshold for low stock when using product data. Default: 10.
   */
  lowStockThreshold?: number;
  /**
   * Show a recommended badge.
   */
  isRecommended?: boolean;
}

export const CustomersProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  discountOverride,
  lowStockOverride,
  lowStockThreshold = 10,
  isRecommended = true,
}) => {
  const { LL } = useI18nContext();
  const { currentLocale } = useLanguageContext();
  const isRTL = currentLocale === 'fa';
  const [variantDialogOpen, setVariantDialogOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );

  const firstInfo = product.productInfos?.[0];
  const sellerImage = product.sellerProducts?.find(
    (sp) => sp.productInfo?.images?.[0]
  )?.productInfo?.images?.[0];
  const rawImage =
    firstInfo?.images?.[0] ||
    sellerImage ||
    product.productInfos?.find((pi) => pi.images?.[0])?.images?.[0];
  const image = resolveImageUrl(rawImage) || PRODUCT_IMAGE_PLACEHOLDER;

  // Get all available variants with their pricing
  // For each ProductInfo, find the cheapest available sellerProduct
  const availableVariants = useMemo(() => {
    if (!product.productInfos || !product.sellerProducts) {
      return [];
    }

    return product.productInfos
      .map((productInfo) => {
        // Find ALL sellerProducts for this ProductInfo (multiple sellers can offer the same variant)
        const allSellerProducts =
          product.sellerProducts?.filter(
            (sp) =>
              (sp.productInfoId === productInfo.id ||
                sp.productInfo?.id === productInfo.id) &&
              sp.seller &&
              sp.stockQuantity > 0
          ) || [];

        if (allSellerProducts.length === 0) {
          return null;
        }

        // Calculate final price (after discount) for each sellerProduct
        const sellerProductsWithPrice = allSellerProducts.map((sp) => {
          const originalPrice = sp.price;
          const discount = sp.discount || 0;
          const finalPrice =
            discount > 0
              ? originalPrice - (originalPrice * discount) / 100
              : originalPrice;

          return {
            sellerProduct: sp,
            originalPrice,
            finalPrice,
            discount,
            stockQuantity: sp.stockQuantity,
          };
        });

        // Sort by final price (cheapest first), then by stock quantity (more stock first as tiebreaker)
        sellerProductsWithPrice.sort((a, b) => {
          if (a.finalPrice !== b.finalPrice) {
            return a.finalPrice - b.finalPrice;
          }
          // If prices are equal, prefer seller with more stock
          return b.stockQuantity - a.stockQuantity;
        });

        // Select the cheapest available sellerProduct
        const bestSellerProduct = sellerProductsWithPrice[0];
        const allPrices = sellerProductsWithPrice.map((sp) => sp.finalPrice);
        const minPrice = Math.min(...allPrices);
        const maxPrice = Math.max(...allPrices);
        const hasMultipleSellers = sellerProductsWithPrice.length > 1;
        const hasPriceVariation = minPrice !== maxPrice;

        return {
          productInfo,
          sellerProduct: bestSellerProduct.sellerProduct,
          originalPrice: bestSellerProduct.originalPrice,
          finalPrice: bestSellerProduct.finalPrice,
          discount: bestSellerProduct.discount,
          stockQuantity: bestSellerProduct.stockQuantity,
          // Additional info for display
          hasMultipleSellers,
          hasPriceVariation,
          priceRange: hasPriceVariation
            ? { min: minPrice, max: maxPrice }
            : null,
          totalSellers: sellerProductsWithPrice.length,
        };
      })
      .filter((v): v is NonNullable<typeof v> => v !== null);
  }, [product]);

  // Get best pricing info (lowest price) for display
  const getBestPricingInfo = useMemo(() => {
    if (availableVariants.length === 0) {
      return null;
    }

    // Find the variant with the lowest final price
    const bestVariant = availableVariants.reduce((best, current) =>
      current.finalPrice < best.finalPrice ? current : best
    );

    return {
      originalPrice: bestVariant.originalPrice,
      finalPrice: bestVariant.finalPrice,
      discount: bestVariant.discount,
      stockQuantity: bestVariant.stockQuantity,
      hasMultipleVariants: availableVariants.length > 1,
      priceRange:
        availableVariants.length > 1
          ? {
              min: Math.min(...availableVariants.map((v) => v.finalPrice)),
              max: Math.max(...availableVariants.map((v) => v.finalPrice)),
            }
          : null,
    };
  }, [availableVariants]);

  const pricingInfo = getBestPricingInfo;
  const hasNoSellers = Boolean(
    !product.sellerProducts || product.sellerProducts.length === 0
  );
  const isOutOfStock = pricingInfo ? pricingInfo.stockQuantity <= 0 : false;
  const hasMultipleVariants = pricingInfo?.hasMultipleVariants || false;
  const displayDiscount =
    discountOverride !== undefined
      ? discountOverride
      : pricingInfo?.discount || 0;
  const displayLowStock =
    typeof lowStockOverride === 'boolean'
      ? lowStockOverride
      : Boolean(
          pricingInfo &&
            pricingInfo.stockQuantity > 0 &&
            pricingInfo.stockQuantity <= lowStockThreshold
        );
  const tagBaseSx = {
    display: 'flex',
    alignItems: 'center',
    gap: 0.75,
    borderRadius: 2,
    px: 2.4,
    py: 1,
    fontWeight: 800,
    fontSize: '0.78rem',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    border: '1px solid rgba(0,0,0,0.12)',
    backgroundColor: 'rgba(0,0,0,0.04)',
    color: '#f3f4f6',
    flexShrink: 0,
  } as const;

  const handleAddToCartClick = useCallback(() => {
    if (hasMultipleVariants) {
      // If multiple variants, open dialog to select
      setSelectedVariantId(
        availableVariants[0]?.productInfo.id.toString() || null
      );
      setVariantDialogOpen(true);
    } else {
      // Single variant, add directly
      onAddToCart(product);
    }
  }, [onAddToCart, product, hasMultipleVariants, availableVariants]);

  const handleVariantConfirm = useCallback(() => {
    if (!selectedVariantId) return;

    const selectedVariant = availableVariants.find(
      (v) => v.productInfo.id.toString() === selectedVariantId
    );

    if (selectedVariant) {
      // Create a modified product object with only the selected variant
      const productWithSelectedVariant: KickzoneGraphqlTypes.Product = {
        ...product,
        productInfos: [selectedVariant.productInfo],
        sellerProducts: [selectedVariant.sellerProduct],
      };
      onAddToCart(productWithSelectedVariant);
      setVariantDialogOpen(false);
    }
  }, [selectedVariantId, availableVariants, product, onAddToCart]);

  return (
    <Card
      sx={(theme) => {
        const isDark = theme.palette.mode === 'dark';
        return {
          width: '100%',
          height: '100%',
          borderRadius: 6,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: isDark
            ? '0 16px 48px rgba(0,0,0,0.45)'
            : '0 18px 48px rgba(0,0,0,0.16)',
          transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
          background: isDark
            ? 'linear-gradient(180deg, rgba(18,18,24,0.96) 0%, rgba(24,24,32,0.9) 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #f6f7fb 100%)',
          border: isDark
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(0,0,0,0.04)',
          color: isDark ? '#f3f3f3' : '#111',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: isDark
              ? '0 22px 62px rgba(0,0,0,0.55)'
              : '0 22px 62px rgba(0,0,0,0.22)',
            '& .product-image': {
              transform: 'scale(1.04)',
            },
          },
        };
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: 300,
          overflow: 'hidden',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(160deg, rgba(20,20,28,0.9) 0%, rgba(12,12,18,0.92) 100%)'
              : 'linear-gradient(160deg, #eceff6 0%, #dfe3ee 100%)',
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={product.name}
          className="product-image"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.55) 100%)'
                : 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.45) 100%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 18,
            left: 18,
            right: 18,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            gap: 1,
            pointerEvents: 'none',
          }}
        >
          {isRecommended && (
            <Box
              sx={{
                ...tagBaseSx,
                background: 'linear-gradient(180deg, #2f2f2f 0%, #262626 100%)',
                border: '1px solid #c6a555',
                color: '#f1f1f1',
                boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
                order: 0,
                pointerEvents: 'auto',
                px: 2.4,
                py: 1.1,
                borderRadius: 2,
                letterSpacing: 1.3,
                justifyContent: 'center',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                width: '100%',
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 1,
                paddingRight: 1,
                flexWrap: 'nowrap',
                whiteSpace: 'nowrap',
                gap: 0.75,
              }}
            >
              <VerifiedIcon
                sx={{
                  fontSize: 19,
                  color: '#d7c48f',
                  opacity: 0.95,
                  mr: isRTL ? 0 : 0,
                  ml: isRTL ? 0 : 0,
                }}
              />
              {"Master's Pick"}
            </Box>
          )}
          {displayLowStock && (
            <Box
              sx={{
                ...tagBaseSx,
                background: '#ffc58f',
                border: '1px solid #e3a96d',
                color: '#3d2a12',
                order: 2,
                pointerEvents: 'auto',
                boxShadow: '0 8px 18px rgba(0,0,0,0.25)',
              }}
            >
              <InventoryIcon sx={{ fontSize: 18 }} />
              {formatNumber(
                pricingInfo?.stockQuantity || 0,
                currentLocale
              )}{' '}
              {LL.products.left()}
            </Box>
          )}
          {displayDiscount > 0 && (
            <Box
              sx={{
                ...tagBaseSx,
                background: '#f5e6c9',
                border: '1px solid #e3cfa3',
                color: '#2c2414',
                boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                order: 1,
                pointerEvents: 'auto',
              }}
            >
              <LocalOfferIcon sx={{ fontSize: 18 }} />-
              {formatNumber(displayDiscount, currentLocale)}%
            </Box>
          )}
        </Box>
      </Box>

      <CardContent
        sx={(theme) => ({
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          pb: 2,
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(18,18,24,0.9) 0%, rgba(22,22,30,0.92) 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(246,247,251,1) 100%)',
        })}
      >
        <Typography
          variant="h6"
          component="div"
          sx={(theme) => ({
            fontWeight: 800,
            color: theme.palette.mode === 'dark' ? '#f4f4f6' : '#0f1015',
            mb: 1,
            fontSize: { xs: '1.15rem', md: '1.28rem' },
            lineHeight: 1.25,
            minHeight: 52,
          })}
        >
          {product.name}
        </Typography>

        {product.categories && product.categories.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {product.categories.slice(0, 2).map((cat) => (
              <Chip
                key={cat.id}
                label={cat.name}
                size="small"
                sx={{
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(0,0,0,0.04)',
                  border: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '1px solid rgba(255,255,255,0.08)'
                      : '1px solid rgba(0,0,0,0.06)',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#f2f2f4' : '#111827',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  height: 24,
                  letterSpacing: 0.4,
                  '& .MuiChip-label': { px: 1.25 },
                }}
              />
            ))}
          </Box>
        )}

        {/* Pricing Information */}
        {hasNoSellers ? (
          <Box
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 3,
              background: 'rgba(255, 86, 86, 0.08)',
              border: '1px solid rgba(255, 86, 86, 0.15)',
            }}
          >
            <Typography
              variant="body2"
              sx={(theme) => ({
                fontWeight: 700,
                color: theme.palette.mode === 'dark' ? '#ffb3b3' : '#b43a3a',
                textAlign: 'center',
              })}
            >
              {LL.products.noSellersAvailable()}
            </Typography>
          </Box>
        ) : pricingInfo ? (
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 1.5,
                mb: 1.5,
                flexWrap: 'wrap',
              }}
            >
              {pricingInfo.discount > 0 && (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: 'line-through',
                    color: '#7a7f8b',
                    fontSize: '0.95rem',
                  }}
                >
                  <PriceDisplay
                    priceInUSD={pricingInfo.originalPrice}
                    showSymbol={true}
                    showOriginal={false}
                  />
                </Typography>
              )}
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    color: isRecommended ? '#c8b37a' : '#0f1015',
                    letterSpacing: 0.2,
                  }}
                >
                  {pricingInfo.priceRange ? (
                    <>
                      <PriceDisplay
                        priceInUSD={pricingInfo.priceRange.min}
                        showSymbol={true}
                        showOriginal={false}
                      />
                      {' - '}
                      <PriceDisplay
                        priceInUSD={pricingInfo.priceRange.max}
                        showSymbol={true}
                        showOriginal={false}
                      />
                    </>
                  ) : (
                    <PriceDisplay
                      priceInUSD={pricingInfo.finalPrice}
                      showSymbol={true}
                      showOriginal={false}
                    />
                  )}
                </Typography>
                {pricingInfo.priceRange && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#6b7280',
                      fontSize: '0.78rem',
                      mt: 0.5,
                      display: 'block',
                    }}
                  >
                    {LL.products.multipleVariants() ||
                      'Multiple variants available'}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 3,
              background: 'rgba(255, 199, 102, 0.08)',
              border: '1px solid rgba(255, 199, 102, 0.18)',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: '#9c7a26',
                textAlign: 'center',
              }}
            >
              {LL.products.priceNotAvailable()}
            </Typography>
          </Box>
        )}

        {firstInfo && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mt: 'auto',
              pt: 2,
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {firstInfo.color && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="caption"
                  sx={(theme) => ({
                    color:
                      theme.palette.mode === 'dark' ? '#f3f3f3' : '#374151',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    fontSize: '0.72rem',
                  })}
                >
                  {LL.products.color()}
                </Typography>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: firstInfo.color.hexCode,
                    borderRadius: '50%',
                    border: '2px solid white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                />
              </Box>
            )}
            {firstInfo.size && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="caption"
                  sx={(theme) => ({
                    color:
                      theme.palette.mode === 'dark' ? '#f3f3f3' : '#374151',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    fontSize: '0.72rem',
                  })}
                >
                  {LL.products.size()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={(theme) => ({
                    fontWeight: 800,
                    color:
                      theme.palette.mode === 'dark' ? '#ffffff' : '#0f1015',
                  })}
                >
                  {formatNumber(firstInfo.size, currentLocale)}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>

      <Box sx={{ p: 3, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          disabled={hasNoSellers || isOutOfStock}
          onClick={handleAddToCartClick}
          sx={{
            borderRadius: 14,
            py: 1.4,
            fontWeight: 900,
            fontSize: '0.95rem',
            letterSpacing: 1,
            textTransform: 'uppercase',
            boxShadow:
              hasNoSellers || isOutOfStock
                ? 'none'
                : '0 14px 32px rgba(233, 200, 132, 0.35)',
            background:
              hasNoSellers || isOutOfStock
                ? 'linear-gradient(135deg, #2b2d33 0%, #23242a 100%)'
                : 'linear-gradient(135deg, #e6d6a8 0%, #cdb87d 50%, #e6d6a8 100%)',
            color: hasNoSellers || isOutOfStock ? '#9ca3af' : '#1b1b1b',
            border:
              hasNoSellers || isOutOfStock
                ? '1px solid rgba(255,255,255,0.08)'
                : '1px solid #c2aa6b',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform:
                hasNoSellers || isOutOfStock ? 'none' : 'translateY(-2px)',
              boxShadow:
                hasNoSellers || isOutOfStock
                  ? 'none'
                  : '0 18px 38px rgba(233, 200, 132, 0.45)',
              background:
                hasNoSellers || isOutOfStock
                  ? 'linear-gradient(135deg, #2b2d33 0%, #23242a 100%)'
                  : 'linear-gradient(135deg, #f0e3b9 0%, #d6c285 60%, #f0e3b9 100%)',
            },
            '&:disabled': {
              color: '#9ca3af',
              opacity: 0.85,
            },
          }}
        >
          {hasNoSellers
            ? LL.products.noSellers()
            : isOutOfStock
            ? LL.products.outOfStock()
            : LL.products.addToCart()}
        </Button>
      </Box>

      {/* Variant Selection Dialog */}
      <Dialog
        open={variantDialogOpen}
        onClose={() => setVariantDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {LL.products.selectVariant() || 'Select Variant'}
        </DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ mb: 2 }}>
              {product.name}
            </FormLabel>
            <RadioGroup
              value={selectedVariantId || ''}
              onChange={(e) => setSelectedVariantId(e.target.value)}
            >
              {availableVariants.map((variant) => {
                const variantKey = variant.productInfo.id.toString();
                return (
                  <FormControlLabel
                    key={variantKey}
                    value={variantKey}
                    control={<Radio />}
                    label={
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          width: '100%',
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              mb: 0.5,
                            }}
                          >
                            {variant.productInfo.color && (
                              <>
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor:
                                      variant.productInfo.color.hexCode,
                                    borderRadius: '50%',
                                    border: '1px solid #ccc',
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={(theme) => ({
                                    color:
                                      theme.palette.mode === 'dark'
                                        ? '#f7f7f7'
                                        : theme.palette.text.primary,
                                    fontWeight: 600,
                                  })}
                                >
                                  {variant.productInfo.color.name}
                                </Typography>
                              </>
                            )}
                            {variant.productInfo.size && (
                              <Typography
                                variant="body2"
                                sx={(theme) => ({
                                  ml: variant.productInfo.color ? 1 : 0,
                                  color:
                                    theme.palette.mode === 'dark'
                                      ? '#f7f7f7'
                                      : theme.palette.text.primary,
                                  fontWeight: 700,
                                })}
                              >
                                Size: {variant.productInfo.size}
                              </Typography>
                            )}
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            {variant.discount > 0 && (
                              <Typography
                                variant="body2"
                                sx={{
                                  textDecoration: 'line-through',
                                  color: '#999',
                                  mr: 1,
                                }}
                              >
                                <PriceDisplay
                                  priceInUSD={variant.originalPrice}
                                  showSymbol={true}
                                  showOriginal={false}
                                />
                              </Typography>
                            )}
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                color:
                                  variant.discount > 0 ? '#f5576c' : '#667eea',
                              }}
                            >
                              <PriceDisplay
                                priceInUSD={variant.finalPrice}
                                showSymbol={true}
                                showOriginal={false}
                              />
                            </Typography>
                          </Box>
                          <Typography
                            variant="caption"
                            sx={(theme) => ({
                              color:
                                theme.palette.mode === 'dark'
                                  ? '#e6e6e6'
                                  : '#666',
                              display: 'block',
                              mt: 0.5,
                            })}
                          >
                            Stock: {variant.stockQuantity}
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      p: 1.5,
                      mb: 1,
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVariantDialogOpen(false)}>
            {LL.button.cancel()}
          </Button>
          <Button
            onClick={handleVariantConfirm}
            variant="contained"
            disabled={!selectedVariantId}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {LL.products.addToCart()}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CustomersProductCard;
