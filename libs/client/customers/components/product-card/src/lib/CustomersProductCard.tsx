import React, { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  useI18nContext,
  useLanguageContext,
} from '@kickzone-workspace/shared-i18n';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { PriceDisplay } from '@kickzone-workspace/price-display';
import { formatVariantColorNames } from '@kickzone-workspace/client-shared-graphql';
import {
  sortSizeCodes,
  isFootwearSizeKind,
  SizeKind,
} from '@kickzone-workspace/product-sizes';
import { useCartStore } from '@kickzone-workspace/customer-cart-store';

const PRODUCT_IMAGE_PLACEHOLDER =
  'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F10%2Fair-jordan-1-high-og-rebellionaire-closer-look-release-info-555088-036-000.jpg?w=960&cbr=1&q=90&fit=max';

const API_BASE_URL =
  (import.meta as unknown as { env?: Record<string, string> }).env
    ?.VITE_API_BASE_URL || '';

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

// Utility to convert numbers to locale format (supports Farsi digits while preserving non-numeric strings like apparel sizes)
const formatNumber = (num: number | string, locale: string): string => {
  const n = Number(num);
  if (Number.isNaN(n)) {
    return String(num);
  }
  return n.toLocaleString(locale);
};

// Extract recognizable athletic brands from product title or fallback
function extractBrand(productName: string, fallback = 'Nike'): string {
  const normalized = (productName || '').trim();
  const brands = [
    'Nike',
    'Jordan',
    'Adidas',
    'Puma',
    'New Balance',
    'Under Armour',
    'Reebok',
    'Asics',
    'Converse',
    'Vans',
  ];
  for (const b of brands) {
    if (new RegExp(`^${b}\\b`, 'i').test(normalized)) {
      return b;
    }
  }
  const firstWord = normalized.split(/\s+/)[0];
  if (firstWord && /^[A-Za-z]+$/.test(firstWord)) {
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();
  }
  return fallback;
}

/**
 * Generates CSS background for a single circular disc.
 * - 1 color: solid color
 * - 2 colors: 50/50 sharp diagonal split
 * - 3+ colors: sharp conic-gradient pie slices
 */
export function getMultiColorDiscBackground(
  colors?: Array<{ hexCode: string }> | null
): string {
  if (!colors || colors.length === 0) return 'transparent';
  const cleanHexes = colors
    .map((c) => (c.hexCode || '').trim())
    .filter(Boolean);
  if (cleanHexes.length === 0) return 'transparent';
  if (cleanHexes.length === 1) return cleanHexes[0];
  if (cleanHexes.length === 2) {
    return `linear-gradient(135deg, ${cleanHexes[0]} 0%, ${cleanHexes[0]} 50%, ${cleanHexes[1]} 50%, ${cleanHexes[1]} 100%)`;
  }
  const count = cleanHexes.length;
  const slice = 360 / count;
  const stops = cleanHexes.map((hex, i) => {
    const start = (i * slice).toFixed(1);
    const end = ((i + 1) * slice).toFixed(1);
    return `${hex} ${start}deg ${end}deg`;
  });
  return `conic-gradient(${stops.join(', ')})`;
}

// Compute soft ambient glow RGB matching product colors/character
function getAmbientTint(
  colors?: Array<{ hexCode: string; name?: string }> | null,
  productId?: number | string
): string {
  if (colors && colors.length > 0) {
    const firstHex = (colors[0].hexCode || '').toLowerCase().trim();
    const firstName = (colors[0].name || '').toLowerCase().trim();

    // Olive / Green / Khaki
    if (
      firstHex.includes('556b2f') ||
      firstHex.includes('4b5320') ||
      firstHex.includes('6b8e23') ||
      firstName.includes('زیتون') ||
      firstName.includes('olive') ||
      firstName.includes('green') ||
      firstName.includes('سبز')
    ) {
      return '95, 135, 90';
    }
    // Black / Dark Slate -> soft violet/indigo glow
    if (
      firstHex === '#000000' ||
      firstHex === '#000' ||
      firstHex === '#111' ||
      firstHex === '#111111' ||
      firstName.includes('مشکی') ||
      firstName.includes('black') ||
      firstName.includes('تیره')
    ) {
      return '138, 128, 205';
    }
    // White / Off-white -> cool ice blue
    if (
      firstHex === '#ffffff' ||
      firstHex === '#fff' ||
      firstName.includes('سفید') ||
      firstName.includes('white')
    ) {
      return '170, 205, 240';
    }
    // Teal / Mint / Cyan
    if (
      firstName.includes('teal') ||
      firstName.includes('mint') ||
      firstName.includes('فیروزه') ||
      firstName.includes('سبز روشن')
    ) {
      return '80, 190, 175';
    }
    // Rose / Peach / Plum / Camo
    if (
      firstName.includes('rose') ||
      firstName.includes('pink') ||
      firstName.includes('صورتی') ||
      firstName.includes('camo') ||
      firstName.includes('چریک')
    ) {
      return '215, 135, 160';
    }

    // Try hex parsing
    if (firstHex.startsWith('#') && firstHex.length >= 7) {
      const r = parseInt(firstHex.slice(1, 3), 16);
      const g = parseInt(firstHex.slice(3, 5), 16);
      const b = parseInt(firstHex.slice(5, 7), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        return `${r}, ${g}, ${b}`;
      }
    }
  }

  // Fallback palette cycling by productId
  const palette = [
    '170, 205, 240', // cool blue
    '138, 128, 205', // soft violet
    '95, 135, 90',   // olive green
    '80, 190, 175',  // teal/mint
    '215, 135, 160', // soft rose
  ];
  const idNum =
    typeof productId === 'number'
      ? productId
      : parseInt(String(productId || '0'), 10) || 0;
  return palette[Math.abs(idNum) % palette.length];
}

export interface ProductCardProps {
  product: KickzoneGraphqlTypes.Product;
  onAddToCart: (product: KickzoneGraphqlTypes.Product) => void;
  onAddVariantToCart?: (variant: {
    product: KickzoneGraphqlTypes.Product;
    productInfo: KickzoneGraphqlTypes.ProductInfo;
    sellerProduct: KickzoneGraphqlTypes.SellerProduct;
  }) => void;
  /**
   * Force show a discount badge (percentage). Falls back to product discount.
   */
  discountOverride?: number;
  /**
   * Force low-stock state. Falls back to stock quantity threshold.
   */
  lowStockOverride?: boolean;
  /**
   * Threshold for low stock when using product data. Default: 5.
   */
  lowStockThreshold?: number;
  /**
   * Show a recommended badge (e.g. Master's Pick / نمونه).
   */
  isRecommended?: boolean;
  /**
   * Show a without-box badge.
   */
  isBoxLess?: boolean;
  /**
   * Optional favorite state
   */
  isFavorite?: boolean;
  /**
   * Callback when favorite button is toggled
   */
  onToggleFavorite?: (productId: string | number) => void;
}

export const CustomersProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddVariantToCart,
  discountOverride,
  lowStockOverride,
  lowStockThreshold = 5,
  isRecommended = false,
  isBoxLess = false,
  isFavorite: initialFavorite = false,
  onToggleFavorite,
}) => {
  const { LL } = useI18nContext();
  const { currentLocale } = useLanguageContext();
  const isRTL = currentLocale === 'fa';

  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [selectedColorwayKey, setSelectedColorwayKey] = useState<string | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const addedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear micro-animation timer on unmount
  useEffect(() => {
    return () => {
      if (addedTimerRef.current) {
        clearTimeout(addedTimerRef.current);
      }
    };
  }, []);

  // Sync external favorite prop if changed
  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  // Find all available variants that have at least one in-stock sellerProduct
  const availableVariants = useMemo(() => {
    if (!product.productInfos || !product.sellerProducts) {
      return [];
    }

    return product.productInfos
      .map((productInfo) => {
        const matchingSellers =
          product.sellerProducts?.filter(
            (sp) =>
              (sp.productInfoId === productInfo.id ||
                sp.productInfo?.id === productInfo.id) &&
              sp.seller &&
              sp.stockQuantity > 0
          ) || [];

        if (matchingSellers.length === 0) {
          return null;
        }

        // Sort by final price (cheapest first), then by stock
        const sorted = [...matchingSellers].sort((a, b) => {
          const priceA =
            a.discount > 0 ? a.price - (a.price * a.discount) / 100 : a.price;
          const priceB =
            b.discount > 0 ? b.price - (b.price * b.discount) / 100 : b.price;
          if (priceA !== priceB) {
            return priceA - priceB;
          }
          return (b.stockQuantity || 0) - (a.stockQuantity || 0);
        });

        const bestSellerProduct = sorted[0];
        const finalPrice =
          bestSellerProduct.discount > 0
            ? bestSellerProduct.price -
              (bestSellerProduct.price * bestSellerProduct.discount) / 100
            : bestSellerProduct.price;

        return {
          productInfo,
          sellerProduct: bestSellerProduct,
          originalPrice: bestSellerProduct.price,
          finalPrice,
          discount: bestSellerProduct.discount || 0,
          stockQuantity: bestSellerProduct.stockQuantity || 0,
        };
      })
      .filter((v): v is NonNullable<typeof v> => v !== null);
  }, [product]);

  // Group in-stock variants (or fallback catalog items) by unique colorway
  const availableColorways = useMemo(() => {
    const map = new Map<
      string,
      {
        key: string;
        colors: Array<{ id?: number; hexCode: string; name?: string }>;
        name: string;
        variants: typeof availableVariants;
      }
    >();

    const sourceVariants =
      availableVariants.length > 0
        ? availableVariants
        : (product.productInfos || []).map((pi) => ({
            productInfo: pi,
            sellerProduct: (product.sellerProducts || [])[0],
            originalPrice: 0,
            finalPrice: 0,
            discount: 0,
            stockQuantity: 0,
          }));

    sourceVariants.forEach((v) => {
      const colors = v.productInfo.colors || [];
      if (colors.length === 0) return;
      const key =
        colors
          .map((c) => (c.hexCode || '').toLowerCase().trim())
          .sort()
          .join(',') || `single-${v.productInfo.id}`;

      const existing = map.get(key);
      if (!existing) {
        map.set(key, {
          key,
          colors,
          name: formatVariantColorNames(colors),
          variants: [v],
        });
      } else {
        existing.variants.push(v);
      }
    });

    return Array.from(map.values());
  }, [availableVariants, product.productInfos, product.sellerProducts]);

  // Sync selected colorway
  useEffect(() => {
    if (availableColorways.length > 0) {
      if (
        !selectedColorwayKey ||
        !availableColorways.some((c) => c.key === selectedColorwayKey)
      ) {
        setSelectedColorwayKey(availableColorways[0].key);
      }
    } else {
      setSelectedColorwayKey(null);
    }
  }, [availableColorways, selectedColorwayKey]);

  // Active colorway
  const activeColorway = useMemo(() => {
    if (!selectedColorwayKey) return availableColorways[0] || null;
    return (
      availableColorways.find((c) => c.key === selectedColorwayKey) ||
      availableColorways[0] ||
      null
    );
  }, [availableColorways, selectedColorwayKey]);

  // Variants matching the currently selected colorway
  const activeColorwayVariants = useMemo(() => {
    if (availableColorways.length === 0) {
      return availableVariants;
    }
    const match = availableColorways.find((c) => c.key === selectedColorwayKey);
    return match ? match.variants : availableVariants;
  }, [availableColorways, selectedColorwayKey, availableVariants]);

  // CRITICAL REQUIREMENT: Only available in-stock sizes are shown on the cards!
  const availableSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    activeColorwayVariants.forEach((v) => {
      if (v.productInfo.size && v.stockQuantity > 0) {
        sizeSet.add(v.productInfo.size);
      }
    });

    const rawSizes = Array.from(sizeSet);
    if (rawSizes.length === 0) {
      return [];
    }

    const firstKind = activeColorwayVariants[0]?.productInfo.sizeKind;
    const kind = isFootwearSizeKind(firstKind)
      ? SizeKind.Footwear
      : SizeKind.Apparel;
    return sortSizeCodes(kind, rawSizes);
  }, [activeColorwayVariants]);

  // Ensure an available size is selected by default
  useEffect(() => {
    if (availableSizes.length > 0) {
      if (!selectedSize || !availableSizes.includes(selectedSize)) {
        setSelectedSize(availableSizes[0]);
      }
    } else {
      setSelectedSize(null);
    }
  }, [availableSizes, selectedSize]);

  // Find active variant corresponding to selected size & colorway
  const activeVariant = useMemo(() => {
    if (activeColorwayVariants.length === 0) {
      return availableVariants[0] || null;
    }
    if (selectedSize) {
      const match = activeColorwayVariants.find(
        (v) => v.productInfo.size === selectedSize
      );
      if (match) return match;
    }
    return activeColorwayVariants[0];
  }, [activeColorwayVariants, selectedSize, availableVariants]);

  // The colors of this active variant / colorway
  const variantColors = useMemo(() => {
    if (activeColorway?.colors?.length) {
      return activeColorway.colors;
    }
    if (activeVariant?.productInfo?.colors?.length) {
      return activeVariant.productInfo.colors;
    }
    return product.productInfos?.[0]?.colors || [];
  }, [activeColorway, activeVariant, product.productInfos]);

  // Product pricing and stock calculations
  const pricingInfo = useMemo(() => {
    if (!activeVariant) return null;
    return {
      originalPrice: activeVariant.originalPrice,
      finalPrice: activeVariant.finalPrice,
      discount:
        discountOverride !== undefined
          ? discountOverride
          : activeVariant.discount,
      stockQuantity: activeVariant.stockQuantity,
    };
  }, [activeVariant, discountOverride]);

  const hasNoSellers = Boolean(
    !product.sellerProducts || product.sellerProducts.length === 0
  );
  const isOutOfStock = pricingInfo ? pricingInfo.stockQuantity <= 0 : true;

  const displayLowStock =
    typeof lowStockOverride === 'boolean'
      ? lowStockOverride
      : Boolean(
          pricingInfo &&
            pricingInfo.stockQuantity > 0 &&
            pricingInfo.stockQuantity <= lowStockThreshold
        );

  // Active color name for the top right badge
  const activeColorName = useMemo(() => {
    if (activeColorway?.name) {
      return activeColorway.name;
    }
    if (variantColors.length > 0) {
      return formatVariantColorNames(variantColors);
    }
    return '';
  }, [activeColorway, variantColors]);

  // Active image: prefer image matching active variant
  const rawImage =
    activeVariant?.productInfo.images?.[0] ||
    activeColorwayVariants[0]?.productInfo.images?.[0] ||
    product.productInfos?.find((pi) => pi.images?.[0])?.images?.[0] ||
    product.sellerProducts?.find((sp) => sp.productInfo?.images?.[0])
      ?.productInfo?.images?.[0];
  const image = resolveImageUrl(rawImage) || PRODUCT_IMAGE_PLACEHOLDER;

  // Athletic brand & category
  const brand = useMemo(() => extractBrand(product.name), [product.name]);
  const categoryName = useMemo(
    () => product.categories?.[0]?.name || '',
    [product.categories]
  );

  const isFootwear = useMemo(() => {
    if (activeVariant?.productInfo?.sizeKind) {
      return isFootwearSizeKind(activeVariant.productInfo.sizeKind);
    }
    const cat = categoryName.toLowerCase();
    return (
      cat.includes('کفش') ||
      cat.includes('shoe') ||
      cat.includes('sneaker') ||
      /air\s*max|jordan\s*1|dunk/i.test(product.name)
    );
  }, [activeVariant, categoryName, product.name]);

  const cartItems = useCartStore((state) => state.items);

  // Check quantity already in cart for this specific variant
  const cartQuantityForActiveVariant = useMemo(() => {
    if (!activeVariant) return 0;
    const match = cartItems.find(
      (item) =>
        item.productId === product.id.toString() &&
        (item.productInfoId === activeVariant.productInfo.id.toString() ||
          item.sellerProductId === activeVariant.sellerProduct.id.toString())
    );
    return match?.quantity || 0;
  }, [cartItems, product.id, activeVariant]);

  const stockAvailable = pricingInfo?.stockQuantity || 0;
  const isMaxInCart =
    stockAvailable > 0 && cartQuantityForActiveVariant >= stockAvailable;

  const handleFavoriteClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsFavorite((prev) => !prev);
      onToggleFavorite?.(product.id);
    },
    [product.id, onToggleFavorite]
  );

  const handleAddToCartClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!activeVariant || isMaxInCart) return;

      if (onAddVariantToCart) {
        onAddVariantToCart({
          product,
          productInfo: activeVariant.productInfo,
          sellerProduct: activeVariant.sellerProduct,
        });
      } else {
        const productWithSelectedVariant: KickzoneGraphqlTypes.Product = {
          ...product,
          productInfos: [activeVariant.productInfo],
          sellerProducts: [activeVariant.sellerProduct],
        };
        onAddToCart(productWithSelectedVariant);
      }

      // Micro-animation feedback
      setIsAddedRecently(true);
      if (addedTimerRef.current) {
        clearTimeout(addedTimerRef.current);
      }
      addedTimerRef.current = setTimeout(() => {
        setIsAddedRecently(false);
      }, 1400);
    },
    [activeVariant, isMaxInCart, product, onAddToCart, onAddVariantToCart]
  );

  return (
    <Card
      sx={(theme) => {
        const isDark = theme.palette.mode === 'dark';
        const ambientRgb = getAmbientTint(variantColors, product.id);

        return {
          width: '100%',
          height: '100%',
          borderRadius: '28px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(24px) saturate(190%)',
          WebkitBackdropFilter: 'blur(24px) saturate(190%)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.14)'
            : '1px solid rgba(255, 255, 255, 0.75)',
          background: isDark
            ? `radial-gradient(circle at 50% 28%, rgba(${ambientRgb}, 0.22) 0%, transparent 68%), linear-gradient(180deg, rgba(26, 28, 36, 0.75) 0%, rgba(16, 17, 24, 0.85) 100%)`
            : `radial-gradient(circle at 50% 28%, rgba(${ambientRgb}, 0.16) 0%, transparent 68%), linear-gradient(180deg, rgba(255, 255, 255, 0.72) 0%, rgba(250, 251, 254, 0.58) 50%, rgba(246, 247, 252, 0.7) 100%)`,
          boxShadow: isDark
            ? '0 20px 50px -10px rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.18), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.3)'
            : '0 16px 40px -10px rgba(0, 0, 0, 0.08), 0 24px 60px -15px rgba(0, 0, 0, 0.05), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.03)',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: isDark
              ? '0 28px 65px -10px rgba(0, 0, 0, 0.65), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.25)'
              : '0 24px 50px -10px rgba(0, 0, 0, 0.12), 0 32px 70px -15px rgba(0, 0, 0, 0.08), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
            '& .product-image': {
              transform: 'scale(1.04)',
            },
          },
        };
      }}
    >
      {/* Top Left Floating Favorite / Wishlist Button (Fixed on top-left in both LTR and RTL) */}
      <IconButton
        onClick={handleFavoriteClick}
        size="small"
        aria-label="favorite"
        sx={(theme) => {
          const isDark = theme.palette.mode === 'dark';
          return {
            position: 'absolute',
            top: 14,
            left: 14,
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: isDark
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: isDark
              ? '1px solid rgba(255, 255, 255, 0.18)'
              : '1px solid rgba(255, 255, 255, 0.85)',
            boxShadow: isDark
              ? '0 4px 14px rgba(0, 0, 0, 0.35)'
              : '0 4px 14px rgba(0, 0, 0, 0.06)',
            transition: 'all 0.25s ease',
            '&:hover': {
              transform: 'scale(1.08)',
              background: isDark
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(255, 255, 255, 0.95)',
            },
          };
        }}
      >
        {isFavorite ? (
          <Favorite sx={{ fontSize: 18, color: '#ef4444' }} />
        ) : (
          <FavoriteBorder
            sx={(theme) => ({
              fontSize: 18,
              color:
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.85)'
                  : '#475569',
            })}
          />
        )}
      </IconButton>

      {/* Top Right Colors Badge (Single multi-color disc if 1 variant; multiple discs if different variant colors exist) */}
      {availableColorways.length > 0 && variantColors.length > 0 && (
        <Box
          sx={(theme) => {
            const isDark = theme.palette.mode === 'dark';
            const isMultiColorway = availableColorways.length > 1;

            return {
              position: 'absolute',
              top: 14,
              right: 14,
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 0.85,
              borderRadius: '9999px',
              px: 1.4,
              py: 0.5,
              background: isDark
                ? 'rgba(255, 255, 255, 0.12)'
                : 'rgba(255, 255, 255, 0.72)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.18)'
                : '1px solid rgba(255, 255, 255, 0.85)',
              boxShadow: isDark
                ? '0 4px 14px rgba(0, 0, 0, 0.35)'
                : '0 4px 14px rgba(0, 0, 0, 0.06)',
              direction: isRTL ? 'rtl' : 'ltr',
              pointerEvents: isMultiColorway ? 'auto' : 'none',
            };
          }}
        >
          {activeColorName && (
            <Typography
              sx={(theme) => ({
                fontSize: '0.78rem',
                fontWeight: 600,
                color: theme.palette.mode === 'dark' ? '#e4e4e7' : '#1f2937',
                lineHeight: 1,
                userSelect: 'none',
              })}
            >
              {activeColorName}
            </Typography>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            {availableColorways.map((colway) => {
              const isMultiColorway = availableColorways.length > 1;
              const isSelected = colway.key === selectedColorwayKey;

              return (
                <Box
                  key={colway.key}
                  component={isMultiColorway ? 'button' : 'span'}
                  type={isMultiColorway ? 'button' : undefined}
                  onClick={
                    isMultiColorway
                      ? (e: React.MouseEvent) => {
                          e.stopPropagation();
                          setSelectedColorwayKey(colway.key);
                        }
                      : undefined
                  }
                  title={colway.name}
                  aria-label={colway.name}
                  sx={(theme) => {
                    const isDark = theme.palette.mode === 'dark';
                    const goldColor = isDark ? '#c5b89a' : '#8f8468';

                    return {
                      width: 19,
                      height: 19,
                      p: 0,
                      borderRadius: '50%',
                      background: getMultiColorDiscBackground(colway.colors),
                      boxShadow: '0 1px 4px rgba(0,0,0,0.22)',
                      border: isDark
                        ? '1px solid rgba(255,255,255,0.35)'
                        : '1px solid rgba(0,0,0,0.15)',
                      outline:
                        isMultiColorway && isSelected
                          ? `2px solid ${goldColor}`
                          : 'none',
                      outlineOffset: '2px',
                      cursor: isMultiColorway ? 'pointer' : 'default',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform:
                        isMultiColorway && isSelected
                          ? 'scale(1.12)'
                          : 'scale(1)',
                      '&:hover': isMultiColorway
                        ? {
                            transform: 'scale(1.22)',
                            boxShadow: `0 0 8px ${goldColor}`,
                          }
                        : undefined,
                    };
                  }}
                />
              );
            })}
          </Box>
        </Box>
      )}

      {/* Product Image Section with Ethereal Progressive Gradient Blur & Fade */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 260, sm: 290, md: 320 },
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Progressive dissolve mask inspired by soft ethereal card fadiness
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)',
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
            objectFit: isFootwear ? 'contain' : 'cover',
            p: isFootwear ? { xs: 2.5, sm: 3 } : 0,
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Ethereal Frosted Blur & Ambient Tint Overlay melting image seamlessly into details */}
        <Box
          sx={(theme) => {
            const isDark = theme.palette.mode === 'dark';
            return {
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '52%',
              pointerEvents: 'none',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              maskImage:
                'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,1) 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,1) 100%)',
              background: isDark
                ? 'linear-gradient(180deg, rgba(18, 18, 24, 0) 0%, rgba(18, 18, 24, 0.25) 35%, rgba(18, 18, 24, 0.72) 75%, rgba(18, 18, 24, 0.96) 100%)'
                : 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 35%, rgba(255, 255, 255, 0.68) 75%, rgba(255, 255, 255, 0.94) 100%)',
            };
          }}
        />
      </Box>

      {/* Card Details Part */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isRTL ? 'flex-end' : 'flex-start',
          textAlign: isRTL ? 'right' : 'left',
          px: { xs: 2, sm: 2.5 },
          pt: 1,
          pb: 2.5,
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ width: '100%' }}>
          {/* Line 1: Tags • Brand • Category */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isRTL ? 'flex-end' : 'flex-start',
              gap: 0.75,
              flexWrap: 'wrap',
              mb: 0.85,
            }}
          >
            {/* Status Tag: Master's Pick / New */}
            <Box
              sx={(theme) => {
                const isDark = theme.palette.mode === 'dark';
                return {
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  borderRadius: '9999px',
                  px: 1.2,
                  py: 0.3,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  lineHeight: 1.2,
                  backdropFilter: 'blur(16px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                  background: isDark
                    ? 'linear-gradient(180deg, rgba(197, 184, 154, 0.16) 0%, rgba(197, 184, 154, 0.05) 100%)'
                    : 'linear-gradient(180deg, rgba(168, 152, 112, 0.16) 0%, rgba(168, 152, 112, 0.05) 100%)',
                  border: isDark
                    ? '1px solid rgba(197, 184, 154, 0.32)'
                    : '1px solid rgba(143, 132, 104, 0.35)',
                  color: isDark ? '#c5b89a' : '#7c6d48',
                  boxShadow: isDark
                    ? '0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
                    : '0 2px 8px rgba(168, 152, 112, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.75)',
                };
              }}
            >
              {isRecommended
                ? isRTL
                  ? 'نمونه'
                  : "Master's Pick"
                : isRTL
                ? 'جدید'
                : 'New'}
            </Box>

            {/* Discount Tag (if any) */}
            {pricingInfo && pricingInfo.discount > 0 && (
              <Box
                sx={(theme) => {
                  const isDark = theme.palette.mode === 'dark';
                  return {
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    borderRadius: '9999px',
                    px: 1.1,
                    py: 0.3,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    lineHeight: 1.2,
                    backdropFilter: 'blur(16px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    background: isDark
                      ? 'linear-gradient(180deg, rgba(239, 68, 68, 0.16) 0%, rgba(197, 184, 154, 0.06) 100%)'
                      : 'linear-gradient(180deg, rgba(220, 38, 38, 0.12) 0%, rgba(168, 152, 112, 0.06) 100%)',
                    border: isDark
                      ? '1px solid rgba(239, 68, 68, 0.38)'
                      : '1px solid rgba(220, 38, 38, 0.32)',
                    color: isDark ? '#fca5a5' : '#b91c1c',
                    boxShadow: isDark
                      ? '0 2px 8px rgba(239, 68, 68, 0.2)'
                      : '0 2px 8px rgba(220, 38, 38, 0.12)',
                  };
                }}
              >
                {isRTL
                  ? `${pricingInfo.discount}٪ تخفیف`
                  : `${pricingInfo.discount}% OFF`}
              </Box>
            )}

            {/* Box-less Tag (if any) */}
            {isBoxLess && (
              <Box
                sx={(theme) => {
                  const isDark = theme.palette.mode === 'dark';
                  return {
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    borderRadius: '9999px',
                    px: 1.1,
                    py: 0.3,
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    lineHeight: 1.2,
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    background: isDark
                      ? 'rgba(197, 184, 154, 0.08)'
                      : 'rgba(168, 152, 112, 0.08)',
                    border: isDark
                      ? '1px solid rgba(197, 184, 154, 0.22)'
                      : '1px solid rgba(143, 132, 104, 0.25)',
                    color: isDark ? '#c5b89a' : '#7c6d48',
                  };
                }}
              >
                {LL.products.boxLess()}
              </Box>
            )}

            <Typography
              component="span"
              sx={(theme) => ({
                color: theme.palette.mode === 'dark' ? '#d4d4d8' : '#4b5563',
                fontWeight: 600,
                fontSize: '0.78rem',
              })}
            >
              {brand}
            </Typography>

            {categoryName && (
              <>
                <Box
                  component="span"
                  sx={{ opacity: 0.45, fontSize: '0.7rem' }}
                >
                  •
                </Box>
                <Typography
                  component="span"
                  sx={(theme) => ({
                    color:
                      theme.palette.mode === 'dark' ? '#d4d4d8' : '#4b5563',
                    fontWeight: 600,
                    fontSize: '0.78rem',
                  })}
                >
                  {categoryName}
                </Typography>
              </>
            )}
          </Box>

          {/* Line 2: Product Name (Language-aligned title) */}
          <Typography
            variant="h6"
            component="h3"
            sx={(theme) => ({
              fontWeight: 700,
              fontSize: { xs: '1rem', sm: '1.12rem' },
              lineHeight: 1.35,
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#0f172a',
              textAlign: isRTL ? 'right' : 'left',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: { xs: '2.7em', sm: '2.7em' },
              mb: 0.5,
            })}
          >
            {product.name}
          </Typography>

          {/* Line 3: SKU / Item Code */}
          {product.sku && (
            <Typography
              variant="body2"
              sx={(theme) => ({
                color: theme.palette.mode === 'dark' ? '#9ca3af' : '#64748b',
                fontSize: '0.78rem',
                fontWeight: 500,
                textAlign: isRTL ? 'right' : 'left',
                mb: 0.75,
              })}
            >
              {isRTL ? `کد محصول ${product.sku}` : `SKU: ${product.sku}`}
            </Typography>
          )}

          {/* Line 4: Pricing */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isRTL ? 'flex-end' : 'flex-start',
              gap: 1.5,
              my: 0.5,
              minHeight: 32,
            }}
          >
            {hasNoSellers ? (
              <Typography
                variant="body2"
                sx={(theme) => ({
                  color: theme.palette.mode === 'dark' ? '#f87171' : '#dc2626',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                })}
              >
                {LL.products.noSellersAvailable()}
              </Typography>
            ) : pricingInfo ? (
              <>
                {pricingInfo.discount > 0 && (
                  <Typography
                    sx={(theme) => ({
                      textDecoration: 'line-through',
                      color:
                        theme.palette.mode === 'dark' ? '#71717a' : '#94a3b8',
                      fontSize: '0.92rem',
                      fontWeight: 500,
                    })}
                  >
                    <PriceDisplay
                      priceInUSD={pricingInfo.originalPrice}
                      showSymbol={true}
                    />
                  </Typography>
                )}
                <Typography
                  sx={(theme) => ({
                    fontWeight: 800,
                    fontSize: { xs: '1.25rem', sm: '1.38rem' },
                    color:
                      theme.palette.mode === 'dark' ? '#ffffff' : '#0f172a',
                    letterSpacing: '0.01em',
                  })}
                >
                  <PriceDisplay
                    priceInUSD={pricingInfo.finalPrice}
                    showSymbol={true}
                  />
                </Typography>
              </>
            ) : (
              <Typography
                variant="body2"
                sx={{ color: '#d97706', fontWeight: 600, fontSize: '0.85rem' }}
              >
                {LL.products.priceNotAvailable()}
              </Typography>
            )}
          </Box>

          {/* Line 5: Clean Language-Aligned Stock Indicator */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isRTL ? 'flex-end' : 'flex-start',
              mt: 0.8,
              mb: 1,
            }}
          >
            <Typography
              sx={(theme) => {
                const isDark = theme.palette.mode === 'dark';
                const goldColor = isDark ? '#c5b89a' : '#7c6d48';
                return {
                  color: goldColor,
                  fontWeight: 600,
                  fontSize: '0.76rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.6,
                  letterSpacing: '0.01em',
                };
              }}
            >
              <Box
                component="span"
                sx={(theme) => {
                  const isDark = theme.palette.mode === 'dark';
                  const goldColor = isDark ? '#c5b89a' : '#7c6d48';
                  return {
                    display: 'inline-block',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: goldColor,
                    boxShadow: isDark
                      ? '0 0 8px #c5b89a'
                      : '0 0 6px #7c6d48',
                  };
                }}
              />
              {displayLowStock
                ? isRTL
                  ? `تنها ${formatNumber(
                      pricingInfo?.stockQuantity || 0,
                      currentLocale
                    )} عدد باقی مانده`
                  : `Only ${formatNumber(
                      pricingInfo?.stockQuantity || 0,
                      currentLocale
                    )} left in stock`
                : isRTL
                ? `${formatNumber(
                    pricingInfo?.stockQuantity || 0,
                    currentLocale
                  )} عدد موجود`
                : `${formatNumber(
                    pricingInfo?.stockQuantity || 0,
                    currentLocale
                  )} in stock`}
            </Typography>
          </Box>

          {/* Line 6: Available Sizes Chips (Blurry Liquid Glass with Gold Accents) */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: isRTL ? 'flex-end' : 'flex-start',
              alignItems: 'center',
              gap: 0.75,
              mb: 1.5,
              minHeight: 32,
            }}
          >
            {availableSizes.map((size) => {
              const isSelected = size === selectedSize;
              return (
                <Box
                  key={size}
                  component="button"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  sx={(theme) => {
                    const isDark = theme.palette.mode === 'dark';
                    return {
                      cursor: 'pointer',
                      outline: 'none',
                      borderRadius: '9999px',
                      px: 1.35,
                      py: 0.45,
                      minWidth: 32,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontFamily: 'inherit',
                      backdropFilter: 'blur(12px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      ...(isSelected
                        ? {
                            background: isDark
                              ? 'linear-gradient(180deg, rgba(197, 184, 154, 0.28) 0%, rgba(197, 184, 154, 0.14) 100%)'
                              : 'linear-gradient(180deg, rgba(168, 152, 112, 0.24) 0%, rgba(168, 152, 112, 0.12) 100%)',
                            color: isDark ? '#ffffff' : '#2e2513',
                            fontWeight: 700,
                            border: isDark
                              ? '1px solid rgba(197, 184, 154, 0.75)'
                              : '1px solid rgba(143, 132, 104, 0.75)',
                            boxShadow: isDark
                              ? '0 0 14px rgba(197, 184, 154, 0.35)'
                              : '0 0 12px rgba(168, 152, 112, 0.3)',
                            transform: 'translateY(-1px)',
                          }
                        : {
                            background: isDark
                              ? 'rgba(197, 184, 154, 0.08)'
                              : 'rgba(168, 152, 112, 0.08)',
                            color: isDark ? '#d4cbb8' : '#5c4e33',
                            fontWeight: 500,
                            border: isDark
                              ? '1px solid rgba(197, 184, 154, 0.2)'
                              : '1px solid rgba(168, 152, 112, 0.25)',
                            '&:hover': {
                              background: isDark
                                ? 'rgba(197, 184, 154, 0.18)'
                                : 'rgba(168, 152, 112, 0.18)',
                              border: isDark
                                ? '1px solid rgba(197, 184, 154, 0.45)'
                                : '1px solid rgba(168, 152, 112, 0.45)',
                              color: isDark ? '#ffffff' : '#1f1a0e',
                              transform: 'translateY(-1px)',
                            },
                          }),
                    };
                  }}
                >
                  {formatNumber(size, currentLocale)}
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Line 7: Add to Cart Button (Liquid Frosted Glass Pill Button with micro-interaction) */}
        <Box sx={{ width: '100%' }}>
          <Button
            variant="contained"
            fullWidth
            disabled={hasNoSellers || isOutOfStock || isMaxInCart}
            onClick={handleAddToCartClick}
            startIcon={
              isAddedRecently ? (
                <CheckCircleOutline
                  sx={(theme) => ({
                    fontSize: 20,
                    color:
                      theme.palette.mode === 'dark' ? '#c5b89a' : '#7c6d48',
                    animation:
                      'cartCheckPop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
                    '@keyframes cartCheckPop': {
                      '0%': {
                        transform: 'scale(0.3) rotate(-25deg)',
                        opacity: 0,
                      },
                      '100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
                    },
                  })}
                />
              ) : (
                <ShoppingBagOutlined sx={{ fontSize: 19 }} />
              )
            }
            sx={(theme) => {
              const isDark = theme.palette.mode === 'dark';
              const isDisabled = hasNoSellers || isOutOfStock || isMaxInCart;

              // Gold champagne color tokens from theme
              const goldColor = isDark ? '#c5b89a' : '#7c6d48';
              const goldHover = isDark ? '#ddd4bf' : '#65583b';

              return {
                borderRadius: '9999px',
                py: { xs: 1.15, sm: 1.3 },
                fontWeight: 700,
                fontSize: { xs: '0.85rem', sm: '0.92rem' },
                letterSpacing: '0.02em',
                textTransform: 'none',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(20px) saturate(190%)',
                WebkitBackdropFilter: 'blur(20px) saturate(190%)',
                transition:
                  'all 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                ...(isDisabled
                  ? {
                      background: isDark
                        ? 'rgba(255, 255, 255, 0.04)'
                        : 'rgba(0, 0, 0, 0.04)',
                      color: isDark ? '#71717a' : '#9ca3af',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.08)'
                        : '1px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: 'none',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }
                  : isDark
                  ? {
                      // Translucent blurry liquid glass with warm gold tint in Dark Mode
                      background: isAddedRecently
                        ? 'linear-gradient(180deg, rgba(197, 184, 154, 0.25) 0%, rgba(197, 184, 154, 0.12) 100%)'
                        : 'linear-gradient(180deg, rgba(197, 184, 154, 0.13) 0%, rgba(197, 184, 154, 0.04) 100%)',
                      border: isAddedRecently
                        ? '1px solid rgba(197, 184, 154, 0.65)'
                        : '1px solid rgba(197, 184, 154, 0.28)',
                      color: isAddedRecently ? '#ffffff' : goldColor,
                      boxShadow: isAddedRecently
                        ? '0 0 24px rgba(197, 184, 154, 0.45), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.25)'
                        : '0 8px 24px -4px rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)',
                      transform: isAddedRecently ? 'scale(1.02)' : 'none',
                      '&:hover': {
                        background:
                          'linear-gradient(180deg, rgba(197, 184, 154, 0.22) 0%, rgba(197, 184, 154, 0.08) 100%)',
                        border: '1px solid rgba(197, 184, 154, 0.48)',
                        color: goldHover,
                        boxShadow:
                          '0 12px 30px -4px rgba(197, 184, 154, 0.25), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.22)',
                        transform: 'translateY(-2px)',
                      },
                    }
                  : {
                      // Translucent blurry liquid glass with warm gold tint in Light Mode
                      background: isAddedRecently
                        ? 'linear-gradient(180deg, rgba(168, 152, 112, 0.26) 0%, rgba(168, 152, 112, 0.14) 100%)'
                        : 'linear-gradient(180deg, rgba(168, 152, 112, 0.14) 0%, rgba(168, 152, 112, 0.05) 100%)',
                      border: isAddedRecently
                        ? '1px solid rgba(143, 132, 104, 0.65)'
                        : '1px solid rgba(143, 132, 104, 0.32)',
                      color: isAddedRecently ? '#3e351f' : goldColor,
                      boxShadow: isAddedRecently
                        ? '0 0 20px rgba(168, 152, 112, 0.35), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.8)'
                        : '0 8px 20px -4px rgba(168, 152, 112, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.75)',
                      transform: isAddedRecently ? 'scale(1.02)' : 'none',
                      '&:hover': {
                        background:
                          'linear-gradient(180deg, rgba(168, 152, 112, 0.22) 0%, rgba(168, 152, 112, 0.08) 100%)',
                        border: '1px solid rgba(143, 132, 104, 0.5)',
                        color: goldHover,
                        boxShadow:
                          '0 12px 26px -4px rgba(168, 152, 112, 0.22), inset 0 1px 2px 0 rgba(255, 255, 255, 0.9)',
                        transform: 'translateY(-2px)',
                      },
                    }),
                '@keyframes cartButtonBounce': {
                  '0%': { transform: 'scale(1)' },
                  '35%': { transform: 'scale(0.95)' },
                  '65%': { transform: 'scale(1.03)' },
                  '100%': { transform: 'scale(1)' },
                },
                animation: isAddedRecently
                  ? 'cartButtonBounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  : 'none',
              };
            }}
          >
            {hasNoSellers
              ? LL.products.noSellers()
              : isOutOfStock
              ? LL.products.outOfStock()
              : isMaxInCart
              ? isRTL
                ? `حداکثر (${formatNumber(stockAvailable, currentLocale)}) در سبد`
                : `Max (${stockAvailable}) in Cart`
              : isAddedRecently
              ? isRTL
                ? 'به سبد خرید افزوده شد'
                : 'Added to Cart'
              : isRTL
              ? 'افزودن به سبد خرید'
              : LL.products.addToCart()}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default CustomersProductCard;
