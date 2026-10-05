import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Fade from '@mui/material/Fade';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';

// Icons
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Check from '@mui/icons-material/Check';
import GppGoodOutlined from '@mui/icons-material/GppGoodOutlined';
import PublishedWithChangesOutlined from '@mui/icons-material/PublishedWithChangesOutlined';
import StraightenOutlined from '@mui/icons-material/StraightenOutlined';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ZoomIn from '@mui/icons-material/ZoomIn';
import ZoomOut from '@mui/icons-material/ZoomOut';
import Close from '@mui/icons-material/Close';
import RestartAlt from '@mui/icons-material/RestartAlt';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';

// Project imports
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import {
  CustomersProductCard,
  getMultiColorDiscBackground,
} from '@kickzone-workspace/customers-product-card';
import {
  useProductById,
  useProductsQuery,
  resolveProductImageUrl,
} from '@kickzone-workspace/products-hook';
import { useCustomersCartService } from '@kickzone-workspace/customers-cart-hook';
import {
  CUSTOMER_ROUTES,
  getCustomerProductDetailsRoute,
} from '@kickzone-workspace/customers-routes';
import { PriceDisplay } from '@kickzone-workspace/price-display';
import {
  formatVariantColorNames,
  serializeVariantColorHexes,
} from '@kickzone-workspace/client-shared-graphql';
import {
  sortSizeCodes,
  isFootwearSizeKind,
  SizeKind,
} from '@kickzone-workspace/product-sizes';
import {
  useI18nContext,
  useLanguageContext,
  usePageTitle,
  farsiDisplayStack,
} from '@kickzone-workspace/shared-i18n';
import { useUIStore } from '@kickzone-workspace/shared-ui-store';

const PRODUCT_IMAGE_PLACEHOLDER =
  'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F10%2Fair-jordan-1-high-og-rebellionaire-closer-look-release-info-555088-036-000.jpg?w=960&cbr=1&q=90&fit=max';

// Extract brand name from product name
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

// Compute soft ambient tint RGB for glow background matching product variant color
function getProductAmbientTint(
  colors?: Array<{ hexCode: string; name?: string }> | null
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

    if (firstHex.startsWith('#') && firstHex.length >= 7) {
      const r = parseInt(firstHex.slice(1, 3), 16);
      const g = parseInt(firstHex.slice(3, 5), 16);
      const b = parseInt(firstHex.slice(5, 7), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        return `${r}, ${g}, ${b}`;
      }
    }
  }

  return '168, 152, 112'; // Quiet luxury champagne brass tint
}

// Convert numbers or strings containing numbers to Persian digits
export const toFarsiDigits = (val: string | number): string => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(val).replace(/\d/g, (d) => farsiDigits[parseInt(d, 10)]);
};

export function CustomerProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const parsedId = id ? parseInt(id, 10) : NaN;
  const productId = !isNaN(parsedId) && parsedId > 0 ? parsedId : undefined;

  const { LL } = useI18nContext();
  const { currentLocale, formatNumber } = useLanguageContext();
  const isRTL = currentLocale === 'fa';
  const themeMode = useUIStore((s) => s.theme.mode);
  const isDark = themeMode === 'dark';

  const { product, loading, error, refetch } = useProductById(productId);
  const { addItem } = useCustomersCartService();

  useEffect(() => {
    if (error) {
      console.error('[CustomerProductDetails] Error fetching product:', error);
    }
  }, [error]);

  // Selected State
  const [selectedColorwayKey, setSelectedColorwayKey] = useState<string | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [sizeGuideTab, setSizeGuideTab] = useState<'footwear' | 'apparel'>('footwear');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    'description'
  );

  // Image Zoom & Lightbox State
  const [isHoverZoom, setIsHoverZoom] = useState(false);
  const [zoomCoord, setZoomCoord] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [lightboxPan, setLightboxPan] = useState({ x: 0, y: 0 });
  const [isLightboxDragging, setIsLightboxDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const addedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (addedTimerRef.current) {
        clearTimeout(addedTimerRef.current);
      }
    };
  }, []);

  // Update page title
  usePageTitle(() => product?.name || LL.navigation.products());

  // Extract brand & category
  const brand = useMemo(() => {
    return product ? extractBrand(product.name) : 'Nike';
  }, [product]);

  const primaryCategory = useMemo(() => {
    return product?.categories?.[0] || null;
  }, [product]);

  // Query similar products in the same category or general catalog
  const { products: similarCatalogProducts } = useProductsQuery({
    search: '',
    categoryId: primaryCategory?.id,
    pageSize: 6,
    onlyWithSellers: true,
    onlyInStock: true,
  });

  const similarProducts = useMemo(() => {
    return similarCatalogProducts
      .filter((p) => p.id !== productId && p.sellerProducts && p.productInfos)
      .slice(0, 4);
  }, [similarCatalogProducts, productId]);

  // Available variants with at least one in-stock seller
  const availableVariants = useMemo(() => {
    if (!product?.productInfos || !product?.sellerProducts) {
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

  // Group variants by unique colorways
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
        : (product?.productInfos || []).map((pi) => ({
            productInfo: pi,
            sellerProduct: (product?.sellerProducts || [])[0],
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
  }, [availableVariants, product?.productInfos, product?.sellerProducts]);

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

  // Variants matching selected colorway
  const activeColorwayVariants = useMemo(() => {
    if (availableColorways.length === 0) {
      return availableVariants;
    }
    const match = availableColorways.find((c) => c.key === selectedColorwayKey);
    return match ? match.variants : availableVariants;
  }, [availableColorways, selectedColorwayKey, availableVariants]);

  // Available in-stock sizes for active colorway
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

  // Determine if product is footwear or apparel
  const isFootwear = useMemo(() => {
    const firstKind = activeColorwayVariants[0]?.productInfo.sizeKind;
    if (isFootwearSizeKind(firstKind)) return true;
    if (firstKind === SizeKind.Apparel || firstKind === 'apparel') return false;

    const catName = (product?.categories?.[0]?.name || '').toLowerCase();
    if (
      catName.includes('شلوار') ||
      catName.includes('pant') ||
      catName.includes('لباس') ||
      catName.includes('هودی') ||
      catName.includes('hoodie') ||
      catName.includes('تیشرت') ||
      catName.includes('shirt') ||
      catName.includes('apparel')
    ) {
      return false;
    }

    const prodName = (product?.name || '').toLowerCase();
    if (
      prodName.includes('pant') ||
      prodName.includes('شلوار') ||
      prodName.includes('hoodie') ||
      prodName.includes('هودی') ||
      prodName.includes('jacket') ||
      prodName.includes('کاپشن')
    ) {
      return false;
    }

    return (
      catName.includes('کفش') ||
      catName.includes('کتونی') ||
      catName.includes('shoe') ||
      catName.includes('sneaker') ||
      /jordan\s*\d|dunk|air\s*max|yeezy|blazer|pegasus|vomero|samba|gazelle/i.test(prodName)
    );
  }, [activeColorwayVariants, product]);

  // Sync size guide default tab when dialog opens
  useEffect(() => {
    if (sizeGuideOpen) {
      setSizeGuideTab(isFootwear ? 'footwear' : 'apparel');
    }
  }, [sizeGuideOpen, isFootwear]);

  // Default selected size
  useEffect(() => {
    if (availableSizes.length > 0) {
      if (!selectedSize || !availableSizes.includes(selectedSize)) {
        setSelectedSize(availableSizes[0]);
      }
    } else {
      setSelectedSize(null);
    }
  }, [availableSizes, selectedSize]);

  // Active variant based on size & colorway
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
    return activeColorwayVariants[0] || null;
  }, [activeColorwayVariants, selectedSize, availableVariants]);

  // Extract gallery images for active colorway
  const galleryImages = useMemo(() => {
    const imgs: string[] = [];

    // Primary: images from active colorway variants
    activeColorwayVariants.forEach((v) => {
      (v.productInfo.images || []).forEach((img) => {
        if (img && !imgs.includes(img)) {
          imgs.push(img);
        }
      });
    });

    // Secondary fallback: all product images
    if (imgs.length === 0 && product?.productInfos) {
      product.productInfos.forEach((pi) => {
        (pi.images || []).forEach((img) => {
          if (img && !imgs.includes(img)) {
            imgs.push(img);
          }
        });
      });
    }

    if (imgs.length === 0) {
      return [PRODUCT_IMAGE_PLACEHOLDER];
    }

    return imgs.map((img) => resolveProductImageUrl(img));
  }, [activeColorwayVariants, product?.productInfos]);

  // Reset active image index when colorway changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedColorwayKey]);

  const activeMainImage =
    galleryImages[activeImageIndex] ||
    galleryImages[0] ||
    PRODUCT_IMAGE_PLACEHOLDER;

  const ambientRgb = useMemo(() => {
    return getProductAmbientTint(activeColorway?.colors);
  }, [activeColorway]);

  // Stock and Pricing calculations
  const pricingInfo = useMemo(() => {
    if (activeVariant) {
      return {
        originalPrice: activeVariant.originalPrice,
        finalPrice: activeVariant.finalPrice,
        discount: activeVariant.discount,
        stockQuantity: activeVariant.stockQuantity,
      };
    }

    const firstSellerProduct = product?.sellerProducts?.[0];
    if (firstSellerProduct) {
      const originalPrice = firstSellerProduct.price;
      const discount = firstSellerProduct.discount || 0;
      const finalPrice =
        discount > 0
          ? originalPrice - (originalPrice * discount) / 100
          : originalPrice;
      return {
        originalPrice,
        finalPrice,
        discount,
        stockQuantity: firstSellerProduct.stockQuantity || 0,
      };
    }

    return null;
  }, [activeVariant, product]);

  const isLowStock =
    pricingInfo != null &&
    pricingInfo.stockQuantity > 0 &&
    pricingInfo.stockQuantity <= 5;
  const isOutOfStock = pricingInfo == null || pricingInfo.stockQuantity === 0;

  // Add to cart handler
  const handleAddToCart = useCallback(() => {
    if (!product || !activeVariant || !activeVariant.sellerProduct.seller) {
      return;
    }

    const { productInfo, sellerProduct, finalPrice } = activeVariant;

    addItem({
      productId: product.id.toString(),
      productName: product.name,
      productImage: productInfo.images?.[0] || null,
      quantity: 1,
      unitPrice: finalPrice,
      color: serializeVariantColorHexes(productInfo.colors),
      size: productInfo.size || null,
      sellerId: sellerProduct.seller.id.toString(),
      sellerName: sellerProduct.seller.storeName || '',
      sellerShippingFee: sellerProduct.seller.shippingFee || 0,
      productInfoId: productInfo.id.toString(),
      sellerProductId: sellerProduct.id.toString(),
      availableStock: sellerProduct.stockQuantity,
    });

    setIsAddedRecently(true);
    setSnackbarOpen(true);
    if (addedTimerRef.current) {
      clearTimeout(addedTimerRef.current);
    }
    addedTimerRef.current = setTimeout(() => {
      setIsAddedRecently(false);
    }, 2400);
  }, [product, activeVariant, addItem]);

  // Instant purchase / Buy now handler
  const handleBuyNow = useCallback(() => {
    handleAddToCart();
    navigate(CUSTOMER_ROUTES.CART);
  }, [handleAddToCart, navigate]);

  const handleResetLightbox = useCallback(() => {
    setLightboxZoom(1);
    setLightboxPan({ x: 0, y: 0 });
    setIsLightboxDragging(false);
  }, []);

  const handlePrevImage = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
    handleResetLightbox();
  }, [galleryImages.length, handleResetLightbox]);

  const handleNextImage = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
    handleResetLightbox();
  }, [galleryImages.length, handleResetLightbox]);

  const handleLightboxMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (lightboxZoom <= 1) return;
      e.preventDefault();
      setIsLightboxDragging(true);
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        panX: lightboxPan.x,
        panY: lightboxPan.y,
      };
    },
    [lightboxZoom, lightboxPan]
  );

  const handleLightboxMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isLightboxDragging || lightboxZoom <= 1) return;
      e.preventDefault();
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setLightboxPan({
        x: dragStartRef.current.panX + dx,
        y: dragStartRef.current.panY + dy,
      });
    },
    [isLightboxDragging, lightboxZoom]
  );

  const handleLightboxMouseUp = useCallback(() => {
    setIsLightboxDragging(false);
  }, []);

  const handleLightboxTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (lightboxZoom <= 1 || e.touches.length !== 1) return;
      const touch = e.touches[0];
      setIsLightboxDragging(true);
      dragStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        panX: lightboxPan.x,
        panY: lightboxPan.y,
      };
    },
    [lightboxZoom, lightboxPan]
  );

  const handleLightboxTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isLightboxDragging || lightboxZoom <= 1 || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const dx = touch.clientX - dragStartRef.current.x;
      const dy = touch.clientY - dragStartRef.current.y;
      setLightboxPan({
        x: dragStartRef.current.panX + dx,
        y: dragStartRef.current.panY + dy,
      });
    },
    [isLightboxDragging, lightboxZoom]
  );

  const handleLightboxTouchEnd = useCallback(() => {
    setIsLightboxDragging(false);
  }, []);

  // Loading Skeleton State
  if (loading) {
    return (
      <CustomersLayout>
        <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
          <Box sx={{ mb: 3 }}>
            <Skeleton variant="text" width={240} height={28} />
          </Box>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Skeleton
                variant="rectangular"
                height={540}
                sx={{ borderRadius: '28px' }}
              />
              <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'center' }}>
                <Skeleton variant="rounded" width={72} height={72} />
                <Skeleton variant="rounded" width={72} height={72} />
                <Skeleton variant="rounded" width={72} height={72} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Skeleton
                variant="rectangular"
                height={540}
                sx={{ borderRadius: '28px' }}
              />
            </Grid>
          </Grid>
        </Container>
      </CustomersLayout>
    );
  }

  // Not Found State
  if (error || !product) {
    return (
      <CustomersLayout>
        <Container
          maxWidth="sm"
          dir={isRTL ? 'rtl' : 'ltr'}
          sx={{
            py: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              p: 4,
              borderRadius: '28px',
              backdropFilter: 'blur(20px)',
              background: isDark
                ? 'rgba(26, 28, 36, 0.75)'
                : 'rgba(255, 255, 255, 0.85)',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.12)'
                : '1px solid rgba(0, 0, 0, 0.08)',
              width: '100%',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
              {isRTL ? 'محصول مورد نظر یافت نشد' : 'Product Not Found'}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.8 }}
            >
              {isRTL
                ? 'ممکن است این محصول حذف شده یا آدرس وارد شده نادرست باشد.'
                : 'The requested product might have been moved or is no longer available.'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              {error && (
                <Button
                  variant="outlined"
                  onClick={() => refetch()}
                  sx={{
                    borderRadius: '9999px',
                    px: 3.5,
                    py: 1.2,
                    fontWeight: 700,
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)',
                    color: isDark ? '#ffffff' : '#121210',
                  }}
                >
                  {isRTL ? 'تلاش مجدد' : 'Retry'}
                </Button>
              )}
              <Button
                variant="contained"
                component={RouterLink}
                to={CUSTOMER_ROUTES.HOME}
                sx={{
                  borderRadius: '9999px',
                  px: 3.5,
                  py: 1.2,
                  fontWeight: 700,
                  background: isDark ? '#c5b89a' : '#1a1a19',
                  color: isDark ? '#121210' : '#ffffff',
                  '&:hover': {
                    background: isDark ? '#ddd4bf' : '#333331',
                  },
                }}
              >
                {isRTL ? 'بازگشت به فروشگاه' : 'Return to Shop'}
              </Button>
            </Box>
          </Box>
        </Container>
      </CustomersLayout>
    );
  }

  return (
    <CustomersLayout>
      <Box
        dir={isRTL ? 'rtl' : 'ltr'}
        sx={{
          minHeight: '100vh',
          pb: 10,
          textAlign: isRTL ? 'right' : 'left',
          background: isDark
            ? `radial-gradient(ellipse at 80% 20%, rgba(${ambientRgb}, 0.16) 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, rgba(138, 128, 205, 0.08) 0%, transparent 60%), #0f0f0e`
            : `radial-gradient(ellipse at 80% 20%, rgba(${ambientRgb}, 0.12) 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, rgba(215, 135, 160, 0.08) 0%, transparent 60%), #f5f4f1`,
        }}
      >
        <Container maxWidth="xl" sx={{ pt: { xs: 2.5, md: 3.5 }, px: { xs: 2, sm: 3, md: 4 } }}>
          {/* Breadcrumb Navigation */}
          <Box
            dir={isRTL ? 'rtl' : 'ltr'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              mb: { xs: 2.5, md: 3.5 },
            }}
          >
            <Breadcrumbs
              separator={
                <Typography
                  sx={{
                    color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                    fontSize: '0.8rem',
                    userSelect: 'none',
                  }}
                >
                  /
                </Typography>
              }
              aria-label="breadcrumb"
            >
              <Typography
                component={RouterLink}
                to={CUSTOMER_ROUTES.HOME}
                sx={{
                  color: isDark ? '#a8a69f' : '#6b7280',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  '&:hover': {
                    color: isDark ? '#ffffff' : '#111827',
                  },
                }}
              >
                {isRTL ? 'فروشگاه' : 'Store'}
              </Typography>

              {product.categories && product.categories.length > 0 && (
                <Typography
                  component={RouterLink}
                  to={CUSTOMER_ROUTES.HOME}
                  sx={{
                    color: isDark ? '#a8a69f' : '#6b7280',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    '&:hover': {
                      color: isDark ? '#ffffff' : '#111827',
                    },
                  }}
                >
                  {product.categories[0].name}
                </Typography>
              )}

              {product.categories && product.categories.length > 1 && (
                <Typography
                  component={RouterLink}
                  to={CUSTOMER_ROUTES.HOME}
                  sx={{
                    color: isDark ? '#a8a69f' : '#6b7280',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    '&:hover': {
                      color: isDark ? '#ffffff' : '#111827',
                    },
                  }}
                >
                  {product.categories[1].name}
                </Typography>
              )}

              <Typography
                sx={{
                  color: isDark ? '#f0efeb' : '#1f2937',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  maxWidth: { xs: 180, sm: 300 },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {product.name}
              </Typography>
            </Breadcrumbs>
          </Box>

          {/* Main Hero Grid */}
          <Grid
            container
            spacing={{ xs: 3, md: 4, lg: 5 }}
            direction={{ xs: 'column', md: 'row' }}
            sx={{
              alignItems: 'flex-start',
            }}
          >
            {/* COLUMN 1: Image Showcase (In RTL, this renders on the right in visual layout!) */}
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              {/* Main Showcase Card with Interactive Pan Zoom */}
              <Box
                onMouseEnter={() => setIsHoverZoom(true)}
                onMouseLeave={() => {
                  setIsHoverZoom(false);
                  setZoomCoord({ x: 50, y: 50 });
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  if (!rect.width || !rect.height) return;
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setZoomCoord({
                    x: Math.max(0, Math.min(100, x)),
                    y: Math.max(0, Math.min(100, y)),
                  });
                }}
                onClick={() => setLightboxOpen(true)}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: 380, sm: 480, md: 580, lg: 640 },
                  borderRadius: { xs: '24px', md: '32px' },
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isHoverZoom ? 'zoom-in' : 'pointer',
                  backdropFilter: 'blur(28px) saturate(190%)',
                  WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                  border: isDark
                    ? '1px solid rgba(255, 255, 255, 0.14)'
                    : '1px solid rgba(255, 255, 255, 0.85)',
                  background: isDark
                    ? `radial-gradient(circle at 50% 38%, rgba(${ambientRgb}, 0.28) 0%, transparent 68%), linear-gradient(180deg, rgba(28, 30, 38, 0.8) 0%, rgba(16, 17, 24, 0.9) 100%)`
                    : `radial-gradient(circle at 50% 38%, rgba(${ambientRgb}, 0.2) 0%, transparent 68%), linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(246, 247, 252, 0.75) 100%)`,
                  boxShadow: isDark
                    ? '0 25px 60px -15px rgba(0, 0, 0, 0.65), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)'
                    : '0 20px 50px -15px rgba(0, 0, 0, 0.08), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95)',
                }}
              >
                {/* Floating Wishlist Button */}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFavorite(!isFavorite);
                  }}
                  size="small"
                  aria-label="favorite"
                  sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    zIndex: 10,
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(16px)',
                    border: isDark
                      ? '1px solid rgba(255, 255, 255, 0.2)'
                      : '1px solid rgba(255, 255, 255, 0.95)',
                    boxShadow: isDark
                      ? '0 4px 16px rgba(0, 0, 0, 0.4)'
                      : '0 4px 14px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      background: isDark
                        ? 'rgba(255, 255, 255, 0.22)'
                        : 'rgba(255, 255, 255, 1)',
                    },
                  }}
                >
                  {isFavorite ? (
                    <Favorite sx={{ fontSize: 22, color: '#ef4444' }} />
                  ) : (
                    <FavoriteBorder
                      sx={{
                        fontSize: 22,
                        color: isDark ? 'rgba(255, 255, 255, 0.85)' : '#475569',
                      }}
                    />
                  )}
                </IconButton>

                {/* Floating Fullscreen / Lightbox Zoom Button */}
                <Tooltip title={isRTL ? 'بزرگ‌نمایی تصویر (تمام‌صفحه)' : 'Full Zoom View'} arrow>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxOpen(true);
                    }}
                    size="small"
                    aria-label="zoom image"
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      zIndex: 10,
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      background: isDark
                        ? 'rgba(255, 255, 255, 0.12)'
                        : 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(16px)',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.2)'
                        : '1px solid rgba(255, 255, 255, 0.95)',
                      boxShadow: isDark
                        ? '0 4px 16px rgba(0, 0, 0, 0.4)'
                        : '0 4px 14px rgba(0, 0, 0, 0.08)',
                      color: isDark ? '#ffffff' : '#1a1a19',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        background: isDark
                          ? 'rgba(255, 255, 255, 0.22)'
                          : 'rgba(255, 255, 255, 1)',
                      },
                    }}
                  >
                    <ZoomIn sx={{ fontSize: 22 }} />
                  </IconButton>
                </Tooltip>

                {/* Main Product Image with Interactive Pan Zoom */}
                <Fade in key={activeMainImage} timeout={400}>
                  <Box
                    component="img"
                    src={activeMainImage}
                    alt={product.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      p: { xs: 3, sm: 4, md: 5 },
                      userSelect: 'none',
                      pointerEvents: 'none',
                      transformOrigin: `${zoomCoord.x}% ${zoomCoord.y}%`,
                      transform: isHoverZoom ? 'scale(2.4)' : 'scale(1)',
                      transition: isHoverZoom
                        ? 'transform 0.08s ease-out'
                        : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      willChange: 'transform',
                    }}
                  />
                </Fade>

                {/* Subtle Zoom Hint Pill */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'none',
                    opacity: isHoverZoom ? 0 : 0.88,
                    transition: 'opacity 0.25s ease',
                    borderRadius: '9999px',
                    px: 2,
                    py: 0.6,
                    backdropFilter: 'blur(14px)',
                    background: isDark
                      ? 'rgba(20, 22, 28, 0.72)'
                      : 'rgba(255, 255, 255, 0.88)',
                    border: isDark
                      ? '1px solid rgba(255, 255, 255, 0.14)'
                      : '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                    zIndex: 6,
                  }}
                >
                  <ZoomIn sx={{ fontSize: 16, color: isDark ? '#c5b89a' : '#8f8468' }} />
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: isDark ? '#f4f4f5' : '#18181b',
                    }}
                  >
                    {isRTL ? 'حرکت نشانگر برای زوم یا کلیک برای نمایش بزرگ' : 'Hover to zoom • Click to expand'}
                  </Typography>
                </Box>

                {/* Left Carousel Chevron */}
                {galleryImages.length > 1 && (
                  <IconButton
                    onClick={handlePrevImage}
                    aria-label="previous image"
                    style={{ left: 18 }}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: isDark
                        ? 'rgba(28, 30, 38, 0.65)'
                        : 'rgba(255, 255, 255, 0.75)',
                      backdropFilter: 'blur(16px)',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.16)'
                        : '1px solid rgba(0, 0, 0, 0.06)',
                      boxShadow: '0 4px 18px rgba(0, 0, 0, 0.15)',
                      color: isDark ? '#ffffff' : '#1a1a19',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-50%) scale(1.1)',
                        background: isDark
                          ? 'rgba(255, 255, 255, 0.22)'
                          : 'rgba(255, 255, 255, 0.95)',
                      },
                    }}
                  >
                    <ChevronLeft fontSize="medium" />
                  </IconButton>
                )}

                {/* Right Carousel Chevron */}
                {galleryImages.length > 1 && (
                  <IconButton
                    onClick={handleNextImage}
                    aria-label="next image"
                    style={{ right: 18 }}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: isDark
                        ? 'rgba(28, 30, 38, 0.65)'
                        : 'rgba(255, 255, 255, 0.75)',
                      backdropFilter: 'blur(16px)',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.16)'
                        : '1px solid rgba(0, 0, 0, 0.06)',
                      boxShadow: '0 4px 18px rgba(0, 0, 0, 0.15)',
                      color: isDark ? '#ffffff' : '#1a1a19',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-50%) scale(1.1)',
                        background: isDark
                          ? 'rgba(255, 255, 255, 0.22)'
                          : 'rgba(255, 255, 255, 0.95)',
                      },
                    }}
                  >
                    <ChevronRight fontSize="medium" />
                  </IconButton>
                )}
              </Box>

              {/* Thumbnails Row */}
              {galleryImages.length > 1 && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1.5,
                    mt: 2.5,
                    px: 1,
                    overflowX: 'auto',
                    py: 0.5,
                  }}
                >
                  {galleryImages.map((imgUrl, idx) => {
                    const isSelected = idx === activeImageIndex;
                    return (
                      <Box
                        key={`thumb-${idx}`}
                        component="button"
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        aria-label={`View photo ${idx + 1}`}
                        sx={{
                          width: { xs: 64, sm: 76 },
                          height: { xs: 64, sm: 76 },
                          borderRadius: '18px',
                          overflow: 'hidden',
                          p: 0.5,
                          cursor: 'pointer',
                          border: isSelected
                            ? isDark
                              ? '2px solid #c5b89a'
                              : '2px solid #1a1a19'
                            : isDark
                            ? '1px solid rgba(255, 255, 255, 0.12)'
                            : '1px solid rgba(0, 0, 0, 0.08)',
                          background: isDark
                            ? 'rgba(26, 28, 36, 0.65)'
                            : 'rgba(255, 255, 255, 0.85)',
                          backdropFilter: 'blur(12px)',
                          boxShadow: isSelected
                            ? isDark
                              ? '0 0 16px rgba(197, 184, 154, 0.35)'
                              : '0 4px 14px rgba(0, 0, 0, 0.12)'
                            : 'none',
                          transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                          '&:hover': {
                            transform: 'scale(1.06)',
                            border: isDark
                              ? '1px solid rgba(255, 255, 255, 0.35)'
                              : '1px solid rgba(0, 0, 0, 0.25)',
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={imgUrl}
                          alt=""
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: '12px',
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Grid>

            {/* COLUMN 2: Product Information Card (In RTL, this renders on the left!) */}
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Box
                dir={isRTL ? 'rtl' : 'ltr'}
                sx={{
                  borderRadius: { xs: '24px', md: '32px' },
                  p: { xs: 2.5, sm: 3.5, md: 4 },
                  backdropFilter: 'blur(28px) saturate(190%)',
                  WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                  border: isDark
                    ? '1px solid rgba(255, 255, 255, 0.14)'
                    : '1px solid rgba(255, 255, 255, 0.85)',
                  background: isDark
                    ? 'linear-gradient(180deg, rgba(28, 30, 38, 0.75) 0%, rgba(16, 17, 24, 0.85) 100%)'
                    : 'linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(246, 247, 252, 0.75) 100%)',
                  boxShadow: isDark
                    ? '0 25px 60px -15px rgba(0, 0, 0, 0.65), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)'
                    : '0 20px 50px -15px rgba(0, 0, 0, 0.08), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95)',
                  textAlign: isRTL ? 'right' : 'left',
                }}
              >
                {/* Meta Row: Badge & Brand • Category */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    flexWrap: 'wrap',
                    mb: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      borderRadius: '9999px',
                      px: 1.3,
                      py: 0.35,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backdropFilter: 'blur(16px)',
                      background: isDark
                        ? 'linear-gradient(180deg, rgba(197, 184, 154, 0.2) 0%, rgba(197, 184, 154, 0.06) 100%)'
                        : 'linear-gradient(180deg, rgba(168, 152, 112, 0.2) 0%, rgba(168, 152, 112, 0.06) 100%)',
                      border: isDark
                        ? '1px solid rgba(197, 184, 154, 0.38)'
                        : '1px solid rgba(143, 132, 104, 0.4)',
                      color: isDark ? '#c5b89a' : '#7c6d48',
                    }}
                  >
                    {isRTL ? 'جدید' : 'NEW'}
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: isDark ? '#d4d4d8' : '#4b5563',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                    }}
                  >
                    {brand}
                  </Typography>

                  {primaryCategory && (
                    <>
                      <Box
                        component="span"
                        sx={{
                          opacity: 0.45,
                          fontSize: '0.75rem',
                          color: isDark ? '#ffffff' : '#000000',
                        }}
                      >
                        •
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDark ? '#a1a1aa' : '#64748b',
                          fontWeight: 500,
                          fontSize: '0.85rem',
                        }}
                      >
                        {primaryCategory.name}
                      </Typography>
                    </>
                  )}
                </Box>

                {/* Product Title */}
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontFamily: isRTL ? farsiDisplayStack : 'inherit',
                    fontWeight: 800,
                    fontSize: { xs: '1.45rem', sm: '1.85rem', md: '2.1rem' },
                    lineHeight: 1.25,
                    color: isDark ? '#ffffff' : '#0f172a',
                    letterSpacing: isRTL ? 0 : '-0.02em',
                    mb: 0.75,
                  }}
                >
                  {product.name}
                </Typography>

                {/* SKU Code */}
                {product.sku && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDark ? '#9ca3af' : '#64748b',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      mb: 2.5,
                    }}
                  >
                    {isRTL ? `کد محصول: ${product.sku}` : `Product Code: ${product.sku}`}
                  </Typography>
                )}

                {/* Price Display Block */}
                {pricingInfo && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 1.5,
                      mb: 1.5,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography
                      component="div"
                      sx={{
                        fontSize: { xs: '1.75rem', sm: '2.1rem' },
                        fontWeight: 800,
                        color: isDark ? '#ffffff' : '#0f172a',
                        letterSpacing: isRTL ? 0 : '-0.01em',
                      }}
                    >
                      <PriceDisplay
                        priceInUSD={pricingInfo.finalPrice}
                        showSymbol={true}
                      />
                    </Typography>

                    {pricingInfo.discount > 0 && (
                      <>
                        <Typography
                          component="span"
                          sx={{
                            textDecoration: 'line-through',
                            color: isDark ? '#71717a' : '#94a3b8',
                            fontSize: '1.05rem',
                            fontWeight: 500,
                          }}
                        >
                          <PriceDisplay
                            priceInUSD={pricingInfo.originalPrice}
                            showSymbol={true}
                          />
                        </Typography>

                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            borderRadius: '9999px',
                            px: 1.25,
                            py: 0.35,
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            letterSpacing: '0.025em',
                            backdropFilter: 'blur(22px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(22px) saturate(200%)',
                            background: isDark
                              ? 'linear-gradient(135deg, rgba(235, 110, 55, 0.38) 0%, rgba(197, 135, 80, 0.22) 50%, rgba(245, 135, 65, 0.34) 100%)'
                              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 238, 228, 0.62) 50%, rgba(255, 255, 255, 0.72) 100%)',
                            border: isDark
                              ? '1px solid rgba(255, 155, 110, 0.6)'
                              : '1px solid rgba(235, 110, 55, 0.32)',
                            color: isDark ? '#ffffff' : '#000000',
                            textShadow: isDark
                              ? '0 1px 3px rgba(0, 0, 0, 0.85), 0 0 8px rgba(235, 110, 55, 0.4)'
                              : 'none',
                            boxShadow: isDark
                              ? '0 6px 18px -3px rgba(220, 75, 45, 0.4), inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.65), inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.35)'
                              : '0 4px 16px -2px rgba(220, 75, 45, 0.14), 0 2px 6px -1px rgba(0, 0, 0, 0.04), inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.03)',
                          }}
                        >
                          {isRTL
                            ? `${formatNumber(pricingInfo.discount)}٪ تخفیف`
                            : `${pricingInfo.discount}% OFF`}
                        </Box>
                      </>
                    )}
                  </Box>
                )}

                {/* Low Stock Indicator */}
                {isLowStock && (
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.85,
                      px: 1.5,
                      py: 0.6,
                      borderRadius: '9999px',
                      background: isDark
                        ? 'rgba(245, 158, 11, 0.14)'
                        : 'rgba(217, 119, 6, 0.1)',
                      border: isDark
                        ? '1px solid rgba(245, 158, 11, 0.35)'
                        : '1px solid rgba(217, 119, 6, 0.3)',
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: '#f59e0b',
                        boxShadow: '0 0 8px #f59e0b',
                        animation: 'pulse 1.8s infinite',
                        '@keyframes pulse': {
                          '0%': { transform: 'scale(0.95)', opacity: 0.8 },
                          '50%': { transform: 'scale(1.2)', opacity: 1 },
                          '100%': { transform: 'scale(0.95)', opacity: 0.8 },
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: isDark ? '#fcd34d' : '#b45309',
                      }}
                    >
                      {isRTL
                        ? `تنها ${formatNumber(pricingInfo?.stockQuantity || 1)} عدد باقی مانده — همین حالا رزرو کنید`
                        : `Only ${pricingInfo?.stockQuantity} left in stock — Order now`}
                    </Typography>
                  </Box>
                )}

                {isOutOfStock && (
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.85,
                      px: 1.5,
                      py: 0.6,
                      borderRadius: '9999px',
                      background: isDark
                        ? 'rgba(239, 68, 68, 0.14)'
                        : 'rgba(220, 38, 38, 0.1)',
                      border: isDark
                        ? '1px solid rgba(239, 68, 68, 0.35)'
                        : '1px solid rgba(220, 38, 38, 0.3)',
                      mb: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: isDark ? '#fca5a5' : '#b91c1c',
                      }}
                    >
                      {isRTL ? 'ناموجود در انبار' : 'Out of Stock'}
                    </Typography>
                  </Box>
                )}

                {/* Color Selector */}
                {availableColorways.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1.25,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: isDark ? '#e4e4e7' : '#374151',
                        }}
                      >
                        {isRTL ? 'رنگ:' : 'Color:'}{' '}
                        <Box
                          component="span"
                          sx={{
                            fontWeight: 700,
                            color: isDark ? '#ffffff' : '#111827',
                          }}
                        >
                          {activeColorway?.name}
                        </Box>
                      </Typography>
                    </Box>

                    {/* Circular Color Swatches */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                      {availableColorways.map((colway) => {
                        const isSelected = colway.key === selectedColorwayKey;
                        const discBg = getMultiColorDiscBackground(colway.colors);

                        return (
                          <Tooltip key={colway.key} title={colway.name} arrow>
                            <Box
                              component="button"
                              type="button"
                              onClick={() => setSelectedColorwayKey(colway.key)}
                              aria-label={colway.name}
                              sx={{
                                width: 38,
                                height: 38,
                                borderRadius: '50%',
                                p: '3px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                background: 'transparent',
                                border: isSelected
                                  ? isDark
                                    ? '2px solid #ffffff'
                                    : '2px solid #1a1a19'
                                  : isDark
                                  ? '1px solid rgba(255, 255, 255, 0.2)'
                                  : '1px solid rgba(0, 0, 0, 0.15)',
                                transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                '&:hover': {
                                  transform: 'scale(1.12)',
                                  border: isDark
                                    ? '2px solid rgba(255, 255, 255, 0.6)'
                                    : '2px solid rgba(0, 0, 0, 0.5)',
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: '50%',
                                  background: discBg,
                                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.35)',
                                }}
                              />
                            </Box>
                          </Tooltip>
                        );
                      })}
                    </Box>
                  </Box>
                )}

                {/* Size Selector */}
                <Box sx={{ mb: 3.5 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 1.25,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: isDark ? '#e4e4e7' : '#374151',
                      }}
                    >
                      {isRTL ? 'سایز' : 'Size'}
                    </Typography>

                    {/* Size Guide Trigger */}
                    <Button
                      onClick={() => setSizeGuideOpen(true)}
                      size="small"
                      startIcon={<StraightenOutlined sx={{ fontSize: 16 }} />}
                      sx={{
                        textTransform: 'none',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: isDark ? '#c5b89a' : '#8f8468',
                        p: 0,
                        minWidth: 0,
                        '&:hover': {
                          background: 'transparent',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {isRTL ? 'راهنمای سایز' : 'Size Guide'}
                    </Button>
                  </Box>

                  {/* Size Pills */}
                  {availableSizes.length > 0 ? (
                    <Box sx={{ display: 'flex', gap: 1.25, flexWrap: 'wrap' }}>
                      {availableSizes.map((size) => {
                        const isSelected = size === selectedSize;
                        return (
                          <Box
                            key={size}
                            component="button"
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            sx={{
                              minWidth: { xs: 44, sm: 52 },
                              height: 42,
                              px: 1.75,
                              borderRadius: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              fontWeight: 700,
                              fontSize: '0.88rem',
                              border: isSelected
                                ? isDark
                                  ? '1px solid #c5b89a'
                                  : '1px solid #1a1a19'
                                : isDark
                                ? '1px solid rgba(255, 255, 255, 0.12)'
                                : '1px solid rgba(0, 0, 0, 0.1)',
                              background: isSelected
                                ? isDark
                                  ? '#c5b89a'
                                  : '#1a1a19'
                                : isDark
                                ? 'rgba(255, 255, 255, 0.05)'
                                : 'rgba(0, 0, 0, 0.03)',
                              color: isSelected
                                ? isDark
                                  ? '#121210'
                                  : '#ffffff'
                                : isDark
                                ? '#d4d4d8'
                                : '#1f2937',
                              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                              boxShadow: isSelected
                                ? isDark
                                  ? '0 4px 14px rgba(197, 184, 154, 0.35)'
                                  : '0 4px 12px rgba(0, 0, 0, 0.15)'
                                : 'none',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                border: isDark
                                  ? '1px solid rgba(255, 255, 255, 0.35)'
                                  : '1px solid rgba(0, 0, 0, 0.3)',
                              },
                            }}
                          >
                            {size}
                          </Box>
                        );
                      })}
                    </Box>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: '0.82rem' }}
                    >
                      {isRTL
                        ? 'سایزی برای این رنگ موجود نیست'
                        : 'No sizes currently available for this color'}
                    </Typography>
                  )}
                </Box>

                {/* Action Buttons (CTAs) */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                  {/* Primary CTA: Add to cart */}
                  <Button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    variant="contained"
                    fullWidth
                    startIcon={
                      isAddedRecently ? (
                        <Check sx={{ fontSize: 20 }} />
                      ) : (
                        <ShoppingBagOutlined sx={{ fontSize: 20 }} />
                      )
                    }
                    sx={{
                      height: 52,
                      borderRadius: '9999px',
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: '1rem',
                      letterSpacing: isRTL ? 0 : '0.02em',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      background: isAddedRecently
                        ? '#10b981'
                        : isDark
                        ? 'linear-gradient(135deg, rgba(197, 184, 154, 0.32) 0%, rgba(197, 184, 154, 0.18) 100%)'
                        : 'linear-gradient(135deg, #1a1a19 0%, #2b2b29 100%)',
                      border: isDark
                        ? '1px solid rgba(197, 184, 154, 0.45)'
                        : '1px solid #1a1a19',
                      color: isDark ? '#f0efeb' : '#ffffff',
                      boxShadow: isDark
                        ? '0 10px 30px -8px rgba(197, 184, 154, 0.25)'
                        : '0 10px 25px -8px rgba(0, 0, 0, 0.25)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        background: isAddedRecently
                          ? '#059669'
                          : isDark
                          ? 'linear-gradient(135deg, rgba(197, 184, 154, 0.45) 0%, rgba(197, 184, 154, 0.28) 100%)'
                          : 'linear-gradient(135deg, #2e2e2c 0%, #3f3f3c 100%)',
                        boxShadow: isDark
                          ? '0 14px 35px -8px rgba(197, 184, 154, 0.35)'
                          : '0 14px 30px -8px rgba(0, 0, 0, 0.35)',
                      },
                      '&.Mui-disabled': {
                        background: isDark
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.08)',
                        border: 'none',
                        color: isDark ? '#71717a' : '#9ca3af',
                      },
                    }}
                  >
                    {isAddedRecently
                      ? isRTL
                        ? 'به سبد خرید افزوده شد'
                        : 'Added to Cart'
                      : isOutOfStock
                      ? isRTL
                        ? 'ناموجود'
                        : 'Out of Stock'
                      : isRTL
                      ? 'افزودن به سبد خرید'
                      : 'Add to Cart'}
                  </Button>

                  {/* Secondary CTA: Instant Checkout / Buy Now */}
                  <Button
                    onClick={handleBuyNow}
                    disabled={isOutOfStock}
                    variant="outlined"
                    fullWidth
                    sx={{
                      height: 50,
                      borderRadius: '9999px',
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: '0.98rem',
                      letterSpacing: isRTL ? 0 : '0.02em',
                      background: isDark
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.03)',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.16)'
                        : '1px solid rgba(0, 0, 0, 0.12)',
                      color: isDark ? '#ffffff' : '#1a1a19',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        background: isDark
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.06)',
                        border: isDark
                          ? '1px solid rgba(255, 255, 255, 0.35)'
                          : '1px solid rgba(0, 0, 0, 0.25)',
                      },
                    }}
                  >
                    {isRTL ? 'خرید فوری' : 'Buy Now'}
                  </Button>
                </Box>

                {/* Accordions Section */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {/* 1. Description Accordion */}
                  <Accordion
                    expanded={expandedAccordion === 'description'}
                    onChange={(_, isExpanded) =>
                      setExpandedAccordion(isExpanded ? 'description' : false)
                    }
                    disableGutters
                    elevation={0}
                    sx={{
                      borderRadius: '16px !important',
                      background: isDark
                        ? 'rgba(255, 255, 255, 0.04)'
                        : 'rgba(0, 0, 0, 0.02)',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.08)'
                        : '1px solid rgba(0, 0, 0, 0.06)',
                      '&::before': { display: 'none' },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMore
                          sx={{
                            color: isDark ? '#ffffff' : '#1a1a19',
                          }}
                        />
                      }
                      sx={{ px: 2.5, minHeight: 52 }}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: '0.92rem' }}>
                        {isRTL ? 'توضیحات' : 'Description'}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                      <Typography
                        sx={{
                          fontSize: '0.85rem',
                          lineHeight: 1.85,
                          color: isDark ? '#d4d4d8' : '#4b5563',
                        }}
                      >
                        {product.description ||
                          (isRTL
                            ? `شلوار زنانه ${product.name} با طرح استایل فیل‌چاپ در رنگ ${activeColorway?.name || 'زیتونی'} — الهام‌گرفته از میراث شیکاگو جردن. برش راحت و آزاد با کمر کشی و بند تنظیم‌شونده در مچ، مناسب استایل روزمره و استریت.\n\nپارچه ریپ‌استاپ سبک و مقاوم در برابر پارگی، با جیب‌های کارگو کاربردی روی ران. این مدل اورجینال نایکی/جردن است و از تأمین‌کننده معتبر سنت‌بالا عرضه می‌شود.`
                            : `${product.name} delivers athletic style, relaxed comfort, and durable ripstop fabric. Engineered with adjustable waistband and cargo pockets for effortless everyday streetstyle.`)}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* 2. Details & Materials Accordion */}
                  <Accordion
                    expanded={expandedAccordion === 'details'}
                    onChange={(_, isExpanded) =>
                      setExpandedAccordion(isExpanded ? 'details' : false)
                    }
                    disableGutters
                    elevation={0}
                    sx={{
                      borderRadius: '16px !important',
                      background: isDark
                        ? 'rgba(255, 255, 255, 0.04)'
                        : 'rgba(0, 0, 0, 0.02)',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.08)'
                        : '1px solid rgba(0, 0, 0, 0.06)',
                      '&::before': { display: 'none' },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMore
                          sx={{
                            color: isDark ? '#ffffff' : '#1a1a19',
                          }}
                        />
                      }
                      sx={{ px: 2.5, minHeight: 52 }}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: '0.92rem' }}>
                        {isRTL ? 'جزئیات و جنس' : 'Details & Materials'}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            {isRTL ? 'برند:' : 'Brand:'}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {brand}
                          </Typography>
                        </Box>
                        {product.sku && (
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">
                              {isRTL ? 'کد اختصاصی (SKU):' : 'SKU:'}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {product.sku}
                            </Typography>
                          </Box>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            {isRTL ? 'جنس پارچه:' : 'Material:'}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {isRTL
                              ? '۱۰۰٪ کتان ریپ‌استاپ تنفس‌پذیر'
                              : '100% Breathable Ripstop Cotton'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            {isRTL ? 'نحوه شستشو:' : 'Care:'}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {isRTL
                              ? 'شستشو با ماشین در دمای ۳۰ درجه'
                              : 'Machine wash cold (30°C)'}
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>

                  {/* 3. Size Guide Accordion */}
                  <Accordion
                    expanded={expandedAccordion === 'sizing'}
                    onChange={(_, isExpanded) =>
                      setExpandedAccordion(isExpanded ? 'sizing' : false)
                    }
                    disableGutters
                    elevation={0}
                    sx={{
                      borderRadius: '16px !important',
                      background: isDark
                        ? 'rgba(255, 255, 255, 0.04)'
                        : 'rgba(0, 0, 0, 0.02)',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.08)'
                        : '1px solid rgba(0, 0, 0, 0.06)',
                      '&::before': { display: 'none' },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMore
                          sx={{
                            color: isDark ? '#ffffff' : '#1a1a19',
                          }}
                        />
                      }
                      sx={{ px: 2.5, minHeight: 52 }}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: '0.92rem' }}>
                        {isRTL ? 'راهنمای سایز' : 'Size Guide'}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                      <Typography
                        sx={{
                          fontSize: '0.85rem',
                          lineHeight: 1.85,
                          color: isDark ? '#d4d4d8' : '#4b5563',
                          mb: 1.5,
                        }}
                      >
                        {isRTL
                          ? 'قالب این مدل کاملاً استاندارد (True to Size) است. اگر تمایل به استایل بگ و لش دارید، یک سایز بزرگ‌تر انتخاب نمایید.'
                          : 'Standard fit (True to Size). Choose your regular athletic size for a relaxed comfortable silhouette.'}
                      </Typography>
                      <Button
                        onClick={() => setSizeGuideOpen(true)}
                        variant="outlined"
                        size="small"
                        startIcon={<StraightenOutlined />}
                        sx={{
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontSize: '0.8rem',
                          borderColor: isDark
                            ? 'rgba(197, 184, 154, 0.4)'
                            : 'rgba(143, 132, 104, 0.4)',
                          color: isDark ? '#c5b89a' : '#7c6d48',
                        }}
                      >
                        {isRTL ? 'مشاهده جدول ابعاد دقیق' : 'View Full Measurement Chart'}
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Value Propositions Highlight Bar */}
          <Box sx={{ mt: { xs: 5, md: 7 }, mb: { xs: 6, md: 8 } }}>
            <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
              {/* Feature 1: Authenticity */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box
                  dir={isRTL ? 'rtl' : 'ltr'}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2.5,
                    borderRadius: '20px',
                    backdropFilter: 'blur(20px)',
                    background: isDark
                      ? 'rgba(26, 28, 36, 0.65)'
                      : 'rgba(255, 255, 255, 0.75)',
                    border: isDark
                      ? '1px solid rgba(255, 255, 255, 0.12)'
                      : '1px solid rgba(255, 255, 255, 0.85)',
                    boxShadow: isDark
                      ? '0 10px 30px rgba(0, 0, 0, 0.35)'
                      : '0 8px 24px rgba(0, 0, 0, 0.05)',
                    textAlign: isRTL ? 'right' : 'left',
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isDark
                        ? 'rgba(197, 184, 154, 0.18)'
                        : 'rgba(168, 152, 112, 0.15)',
                      color: isDark ? '#c5b89a' : '#8f8468',
                      flexShrink: 0,
                    }}
                  >
                    <GppGoodOutlined />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.25 }}>
                      {isRTL ? 'اصالت کالا' : 'Authentic Guarantee'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: isDark ? '#a1a1aa' : '#64748b', fontSize: '0.8rem' }}
                    >
                      {isRTL ? '۱۰۰٪ اورجینال نایک و جردن' : '100% Genuine Nike & Jordan'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Feature 2: 7 Days Exchange */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box
                  dir={isRTL ? 'rtl' : 'ltr'}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2.5,
                    borderRadius: '20px',
                    backdropFilter: 'blur(20px)',
                    background: isDark
                      ? 'rgba(26, 28, 36, 0.65)'
                      : 'rgba(255, 255, 255, 0.75)',
                    border: isDark
                      ? '1px solid rgba(255, 255, 255, 0.12)'
                      : '1px solid rgba(255, 255, 255, 0.85)',
                    boxShadow: isDark
                      ? '0 10px 30px rgba(0, 0, 0, 0.35)'
                      : '0 8px 24px rgba(0, 0, 0, 0.05)',
                    textAlign: isRTL ? 'right' : 'left',
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isDark
                        ? 'rgba(197, 184, 154, 0.18)'
                        : 'rgba(168, 152, 112, 0.15)',
                      color: isDark ? '#c5b89a' : '#8f8468',
                      flexShrink: 0,
                    }}
                  >
                    <PublishedWithChangesOutlined />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.25 }}>
                      {isRTL ? 'ضمانت تعویض ۷ روزه' : '7-Day Size Exchange'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: isDark ? '#a1a1aa' : '#64748b', fontSize: '0.8rem' }}
                    >
                      {isRTL
                        ? 'امکان تعویض سریع سایز و مدل'
                        : 'Hassle-free size & model exchange'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Similar Products Section */}
          {similarProducts.length > 0 && (
            <Box sx={{ mt: { xs: 6, md: 8 } }}>
              <Box
                dir={isRTL ? 'rtl' : 'ltr'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  mb: 3.5,
                  width: '100%',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    fontFamily: isRTL ? farsiDisplayStack : 'inherit',
                    color: isDark ? '#ffffff' : '#0f172a',
                    textAlign: isRTL ? 'right' : 'left',
                  }}
                >
                  {isRTL ? 'پیشنهادهای مشابه' : 'You May Also Like'}
                </Typography>

                <Button
                  component={RouterLink}
                  to={CUSTOMER_ROUTES.HOME}
                  endIcon={
                    isRTL ? (
                      <ArrowBack sx={{ fontSize: 18 }} />
                    ) : (
                      <ArrowForward sx={{ fontSize: 18 }} />
                    )
                  }
                  sx={{
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: isDark ? '#c5b89a' : '#8f8468',
                    fontFamily: isRTL ? farsiDisplayStack : 'inherit',
                    '&:hover': {
                      background: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {isRTL ? 'مشاهده همه' : 'View All'}
                </Button>
              </Box>

              <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                {similarProducts.map((simProd) => (
                  <Grid key={simProd.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <CustomersProductCard
                      product={simProd}
                      onCardClick={() => {
                        navigate(getCustomerProductDetailsRoute(simProd.id));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      onAddToCart={(prod) => {
                        const firstInfo = prod.productInfos?.[0];
                        const sp = prod.sellerProducts?.find(
                          (s) =>
                            (s.productInfoId === firstInfo?.id ||
                              s.productInfo?.id === firstInfo?.id) &&
                            s.seller &&
                            s.stockQuantity > 0
                        );
                        if (firstInfo && sp && sp.seller) {
                          const unitPrice =
                            sp.discount > 0
                              ? sp.price - (sp.price * sp.discount) / 100
                              : sp.price;
                          addItem({
                            productId: prod.id.toString(),
                            productName: prod.name,
                            productImage: firstInfo.images?.[0] || null,
                            quantity: 1,
                            unitPrice,
                            color: serializeVariantColorHexes(firstInfo.colors),
                            size: firstInfo.size || null,
                            sellerId: sp.seller.id.toString(),
                            sellerName: sp.seller.storeName || '',
                            sellerShippingFee: sp.seller.shippingFee || 0,
                            productInfoId: firstInfo.id.toString(),
                            sellerProductId: sp.id.toString(),
                            availableStock: sp.stockQuantity,
                          });
                          setSnackbarOpen(true);
                        } else {
                          navigate(getCustomerProductDetailsRoute(prod.id));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Container>

        {/* Size Guide Dialog */}
        <Dialog
          open={sizeGuideOpen}
          onClose={() => setSizeGuideOpen(false)}
          maxWidth="md"
          fullWidth
          dir={isRTL ? 'rtl' : 'ltr'}
          PaperProps={{
            sx: {
              borderRadius: '24px',
              p: { xs: 2, sm: 2.5 },
              backdropFilter: 'blur(24px)',
              background: isDark
                ? 'rgba(24, 26, 34, 0.97)'
                : 'rgba(255, 255, 255, 0.98)',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.16)'
                : '1px solid rgba(0, 0, 0, 0.1)',
              fontFamily: isRTL ? farsiDisplayStack : 'inherit',
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: 800,
              fontSize: '1.25rem',
              pb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: isRTL ? farsiDisplayStack : 'inherit',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <StraightenOutlined sx={{ color: isDark ? '#c5b89a' : '#8f8468' }} />
              <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                {isRTL ? 'راهنمای جامع سایز' : 'Complete Size Guide'}
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => setSizeGuideOpen(false)}
              sx={{ color: isDark ? '#a1a1aa' : '#71717a' }}
            >
              <Close fontSize="small" />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ pt: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, lineHeight: 1.8, fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}
            >
              {isRTL
                ? 'برای اطمینان کامل از انتخاب سایز مناسب، لطفاً ابعاد جدول زیر را با اندازه‌های دقیق خود مقایسه فرمایید.'
                : 'Compare dimensions below with your measurements for an optimal athletic fit.'}
            </Typography>

            {/* Category Toggle Buttons: Footwear vs Apparel */}
            <Box
              sx={{
                display: 'inline-flex',
                p: 0.5,
                borderRadius: '14px',
                background: isDark
                  ? 'rgba(255, 255, 255, 0.06)'
                  : 'rgba(0, 0, 0, 0.04)',
                mb: 2.5,
                gap: 0.5,
              }}
            >
              <Button
                size="small"
                onClick={() => setSizeGuideTab('footwear')}
                sx={{
                  borderRadius: '10px',
                  px: 2.5,
                  py: 0.7,
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontFamily: isRTL ? farsiDisplayStack : 'inherit',
                  background:
                    sizeGuideTab === 'footwear'
                      ? isDark
                        ? '#c5b89a'
                        : '#1a1a19'
                      : 'transparent',
                  color:
                    sizeGuideTab === 'footwear'
                      ? isDark
                        ? '#121210'
                        : '#ffffff'
                      : isDark
                      ? '#d4d4d8'
                      : '#52525b',
                  '&:hover': {
                    background:
                      sizeGuideTab === 'footwear'
                        ? isDark
                          ? '#ddd4bf'
                          : '#333331'
                        : isDark
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.06)',
                  },
                }}
              >
                {isRTL ? 'کفش و کتونی' : 'Footwear'}
              </Button>
              <Button
                size="small"
                onClick={() => setSizeGuideTab('apparel')}
                sx={{
                  borderRadius: '10px',
                  px: 2.5,
                  py: 0.7,
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontFamily: isRTL ? farsiDisplayStack : 'inherit',
                  background:
                    sizeGuideTab === 'apparel'
                      ? isDark
                        ? '#c5b89a'
                        : '#1a1a19'
                      : 'transparent',
                  color:
                    sizeGuideTab === 'apparel'
                      ? isDark
                        ? '#121210'
                        : '#ffffff'
                      : isDark
                      ? '#d4d4d8'
                      : '#52525b',
                  '&:hover': {
                    background:
                      sizeGuideTab === 'apparel'
                        ? isDark
                          ? '#ddd4bf'
                          : '#333331'
                        : isDark
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.06)',
                  },
                }}
              >
                {isRTL ? 'پوشاک و هودی' : 'Apparel'}
              </Button>
            </Box>

            {/* Footwear Table */}
            {sizeGuideTab === 'footwear' && (
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.04)'
                    : 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '16px',
                  border: isDark
                    ? '1px solid rgba(255, 255, 255, 0.08)'
                    : '1px solid rgba(0, 0, 0, 0.06)',
                  maxHeight: 340,
                  overflowY: 'auto',
                }}
              >
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'سایز اروپا (EU)' : 'EU Size'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'طول پا (سانتی‌متر)' : 'Foot Length (CM)'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'آمریکا (US)' : 'US Size'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'انگلستان (UK)' : 'UK Size'}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { eu: '38.5', cm: '24.0', us: '6.0', uk: '5.5' },
                      { eu: '39', cm: '24.5', us: '6.5', uk: '6.0' },
                      { eu: '40', cm: '25.0', us: '7.0', uk: '6.0' },
                      { eu: '40.5', cm: '25.5', us: '7.5', uk: '6.5' },
                      { eu: '41', cm: '26.0', us: '8.0', uk: '7.0' },
                      { eu: '42', cm: '26.5', us: '8.5', uk: '7.5' },
                      { eu: '42.5', cm: '27.0', us: '9.0', uk: '8.0' },
                      { eu: '43', cm: '27.5', us: '9.5', uk: '8.5' },
                      { eu: '44', cm: '28.0', us: '10.0', uk: '9.0' },
                      { eu: '44.5', cm: '28.5', us: '10.5', uk: '9.5' },
                      { eu: '45', cm: '29.0', us: '11.0', uk: '10.0' },
                      { eu: '45.5', cm: '29.5', us: '11.5', uk: '10.5' },
                      { eu: '46', cm: '30.0', us: '12.0', uk: '11.0' },
                    ].map((row) => (
                      <TableRow key={row.eu} hover>
                        <TableCell sx={{ fontWeight: 700, color: isDark ? '#c5b89a' : '#8f8468', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {isRTL ? toFarsiDigits(row.eu) : row.eu}
                        </TableCell>
                        <TableCell align="center" sx={{ fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {isRTL ? toFarsiDigits(row.cm) : row.cm}
                        </TableCell>
                        <TableCell align="center" sx={{ fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {isRTL ? toFarsiDigits(row.us) : row.us}
                        </TableCell>
                        <TableCell align="center" sx={{ fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {isRTL ? toFarsiDigits(row.uk) : row.uk}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* Apparel Table */}
            {sizeGuideTab === 'apparel' && (
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.04)'
                    : 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '16px',
                  border: isDark
                    ? '1px solid rgba(255, 255, 255, 0.08)'
                    : '1px solid rgba(0, 0, 0, 0.06)',
                  maxHeight: 340,
                  overflowY: 'auto',
                }}
              >
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'سایز' : 'Size'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'دور سینه (cm)' : 'Chest (cm)'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'دور کمر (cm)' : 'Waist (cm)'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'دور باسن (cm)' : 'Hips (cm)'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'قد شلوار (cm)' : 'Length (cm)'}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { size: 'XS', chest: '82-87', waist: '66-71', hips: '86-91', len: '98' },
                      { size: 'S', chest: '88-93', waist: '72-77', hips: '92-97', len: '100' },
                      { size: 'M', chest: '94-99', waist: '78-83', hips: '98-103', len: '102' },
                      { size: 'L', chest: '100-105', waist: '84-89', hips: '104-109', len: '104' },
                      { size: 'XL', chest: '106-111', waist: '90-95', hips: '110-115', len: '106' },
                      { size: 'XXL', chest: '112-118', waist: '96-102', hips: '116-122', len: '108' },
                    ].map((row) => (
                      <TableRow key={row.size} hover>
                        <TableCell sx={{ fontWeight: 700, color: isDark ? '#c5b89a' : '#8f8468', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {row.size}
                        </TableCell>
                        <TableCell align="center" sx={{ fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {isRTL ? toFarsiDigits(row.chest) : row.chest}
                        </TableCell>
                        <TableCell align="center" sx={{ fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {isRTL ? toFarsiDigits(row.waist) : row.waist}
                        </TableCell>
                        <TableCell align="center" sx={{ fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {isRTL ? toFarsiDigits(row.hips) : row.hips}
                        </TableCell>
                        <TableCell align="center" sx={{ fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {isRTL ? toFarsiDigits(row.len) : row.len}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* Measurement Hint Tip */}
            <Box
              sx={{
                mt: 2.5,
                p: 2,
                borderRadius: '14px',
                background: isDark
                  ? 'rgba(197, 184, 154, 0.08)'
                  : 'rgba(168, 152, 112, 0.08)',
                border: isDark
                  ? '1px solid rgba(197, 184, 154, 0.2)'
                  : '1px solid rgba(143, 132, 104, 0.2)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.82rem',
                  lineHeight: 1.8,
                  color: isDark ? '#e4e4e7' : '#334155',
                  fontFamily: isRTL ? farsiDisplayStack : 'inherit',
                }}
              >
                {isRTL
                  ? '💡 راهنمای اندازه‌گیری: برای انتخاب دقیق‌ترین سایز کفش، پاشنه تا نوک بلندترین انگشت را روی یک برگه اندازه بگیرید. در صورت تردید بین دو سایز، انتخاب نیم‌سایز بزرگ‌تر برای راحتی بیشتر پیشنهاد می‌شود.'
                  : '💡 Pro Tip: Measure your foot from heel to longest toe on paper. If in between two sizes, we recommend sizing up half a size for athletic comfort.'}
              </Typography>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button
              onClick={() => setSizeGuideOpen(false)}
              variant="contained"
              sx={{
                borderRadius: '9999px',
                px: 3.5,
                py: 1,
                fontWeight: 700,
                fontFamily: isRTL ? farsiDisplayStack : 'inherit',
                background: isDark ? '#c5b89a' : '#1a1a19',
                color: isDark ? '#121210' : '#ffffff',
                '&:hover': {
                  background: isDark ? '#ddd4bf' : '#333331',
                },
              }}
            >
              {isRTL ? 'متوجه شدم' : 'Close'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Fullscreen / High-Res Lightbox Zoom Dialog */}
        <Dialog
          open={lightboxOpen}
          onClose={() => {
            setLightboxOpen(false);
            setLightboxZoom(1);
          }}
          maxWidth="lg"
          fullWidth
          dir={isRTL ? 'rtl' : 'ltr'}
          PaperProps={{
            sx: {
              borderRadius: '28px',
              p: { xs: 2, sm: 3 },
              backdropFilter: 'blur(32px)',
              background: isDark
                ? 'rgba(15, 17, 23, 0.96)'
                : 'rgba(255, 255, 255, 0.98)',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.16)'
                : '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden',
              fontFamily: isRTL ? farsiDisplayStack : 'inherit',
            },
          }}
        >
          {/* Header Bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pb: 2,
              borderBottom: isDark
                ? '1px solid rgba(255, 255, 255, 0.08)'
                : '1px solid rgba(0, 0, 0, 0.06)',
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                {product.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: isDark ? '#a1a1aa' : '#71717a', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}
              >
                {isRTL
                  ? `تصویر ${toFarsiDigits(activeImageIndex + 1)} از ${toFarsiDigits(galleryImages.length)}`
                  : `Image ${activeImageIndex + 1} of ${galleryImages.length}`}
              </Typography>
            </Box>

            {/* Lightbox Controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Reset button appears on the other side of the buttons so ZoomIn, ZoomOut, and Close never shift position */}
              {lightboxZoom > 1 && (
                <Tooltip title={isRTL ? 'اندازه اولیه' : 'Reset'} arrow>
                  <IconButton
                    size="small"
                    aria-label={isRTL ? 'اندازه اولیه' : 'Reset'}
                    onClick={handleResetLightbox}
                    sx={{
                      color: isDark ? '#c5b89a' : '#8f8468',
                      background: isDark
                        ? 'rgba(197, 184, 154, 0.16)'
                        : 'rgba(143, 132, 104, 0.12)',
                      border: isDark
                        ? '1px solid rgba(197, 184, 154, 0.35)'
                        : '1px solid rgba(143, 132, 104, 0.3)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: isDark
                          ? 'rgba(197, 184, 154, 0.28)'
                          : 'rgba(143, 132, 104, 0.22)',
                      },
                    }}
                  >
                    <RestartAlt fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title={isRTL ? 'بزرگ‌نمایی' : 'Zoom In'} arrow>
                <IconButton
                  size="small"
                  aria-label={isRTL ? 'بزرگ‌نمایی' : 'Zoom In'}
                  onClick={() => setLightboxZoom((z) => Math.min(3, +(z + 0.5).toFixed(1)))}
                  sx={{
                    color: isDark ? '#ffffff' : '#1a1a19',
                    background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <ZoomIn fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title={isRTL ? 'کوچک‌نمایی' : 'Zoom Out'} arrow>
                <IconButton
                  size="small"
                  aria-label={isRTL ? 'کوچک‌نمایی' : 'Zoom Out'}
                  onClick={() =>
                    setLightboxZoom((z) => {
                      const next = Math.max(1, +(z - 0.5).toFixed(1));
                      if (next === 1) setLightboxPan({ x: 0, y: 0 });
                      return next;
                    })
                  }
                  sx={{
                    color: isDark ? '#ffffff' : '#1a1a19',
                    background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <ZoomOut fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title={isRTL ? 'بستن' : 'Close'} arrow>
                <IconButton
                  size="small"
                  aria-label={isRTL ? 'بستن' : 'Close'}
                  onClick={() => {
                    setLightboxOpen(false);
                    handleResetLightbox();
                  }}
                  sx={{
                    color: isDark ? '#ffffff' : '#1a1a19',
                    background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Large Image Stage */}
          <Box
            onMouseDown={handleLightboxMouseDown}
            onMouseMove={handleLightboxMouseMove}
            onMouseUp={handleLightboxMouseUp}
            onMouseLeave={handleLightboxMouseUp}
            onTouchStart={handleLightboxTouchStart}
            onTouchMove={handleLightboxTouchMove}
            onTouchEnd={handleLightboxTouchEnd}
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: { xs: 320, sm: 460, md: 540 },
              maxHeight: '68vh',
              overflow: 'hidden',
              py: 2,
              cursor:
                lightboxZoom > 1
                  ? isLightboxDragging
                    ? 'grabbing'
                    : 'grab'
                  : 'default',
              userSelect: 'none',
              touchAction: lightboxZoom > 1 ? 'none' : 'auto',
            }}
          >
            {/* Prev Image */}
            {galleryImages.length > 1 && (
              <IconButton
                onClick={handlePrevImage}
                aria-label="previous image"
                style={{ left: 8 }}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(10px)',
                  color: isDark ? '#ffffff' : '#18181b',
                  '&:hover': {
                    background: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)',
                  },
                }}
              >
                <ChevronLeft />
              </IconButton>
            )}

            {/* Image with zoom level and pan translation */}
            <Box
              component="img"
              src={activeMainImage}
              alt={product.name}
              draggable={false}
              sx={{
                maxWidth: '100%',
                maxHeight: '64vh',
                objectFit: 'contain',
                transform: `translate(${lightboxPan.x}px, ${lightboxPan.y}px) scale(${lightboxZoom})`,
                transformOrigin: 'center center',
                transition: isLightboxDragging ? 'none' : 'transform 0.22s ease-out',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />

            {/* Next Image */}
            {galleryImages.length > 1 && (
              <IconButton
                onClick={handleNextImage}
                aria-label="next image"
                style={{ right: 8 }}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(10px)',
                  color: isDark ? '#ffffff' : '#18181b',
                  '&:hover': {
                    background: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)',
                  },
                }}
              >
                <ChevronRight />
              </IconButton>
            )}

            {/* Pan guide hint when zoomed */}
            {lightboxZoom > 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 14,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 9,
                  px: 2,
                  py: 0.6,
                  borderRadius: '9999px',
                  backdropFilter: 'blur(16px)',
                  background: isDark ? 'rgba(0, 0, 0, 0.68)' : 'rgba(255, 255, 255, 0.88)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.8,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: isDark ? '#e4e4e7' : '#1f2937',
                    fontFamily: isRTL ? farsiDisplayStack : 'inherit',
                  }}
                >
                  {isRTL
                    ? 'برای جابجایی تصویر کلیک کنید و بکشید'
                    : 'Click & drag to pan around image'}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Modal Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                justifyContent: 'center',
                pt: 2,
                overflowX: 'auto',
              }}
            >
              {galleryImages.map((img, idx) => (
                <Box
                  key={`modal-thumb-${idx}`}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setLightboxZoom(1);
                  }}
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '12px',
                    p: 0.5,
                    cursor: 'pointer',
                    border:
                      idx === activeImageIndex
                        ? '2px solid #c5b89a'
                        : isDark
                        ? '1px solid rgba(255, 255, 255, 0.12)'
                        : '1px solid rgba(0, 0, 0, 0.08)',
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.04)'
                      : 'rgba(0, 0, 0, 0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    opacity: idx === activeImageIndex ? 1 : 0.65,
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <Box
                    component="img"
                    src={img}
                    alt=""
                    sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Dialog>

        {/* Feedback Snackbar - Fixed high-contrast dark glass pill in both light & dark mode */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            dir={isRTL ? 'rtl' : 'ltr'}
            icon={<CheckCircleOutline sx={{ color: '#34d399 !important', fontSize: 22 }} />}
            sx={{
              borderRadius: '20px',
              px: 2.8,
              py: 1.2,
              fontWeight: 700,
              fontSize: '0.92rem',
              backdropFilter: 'blur(24px)',
              background: '#18181b !important',
              color: '#ffffff !important',
              border: isDark
                ? '1px solid rgba(197, 184, 154, 0.35)'
                : '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
              '& .MuiAlert-message': {
                color: '#ffffff !important',
                fontWeight: 700,
                fontSize: '0.92rem',
                fontFamily: isRTL ? farsiDisplayStack : 'inherit',
              },
              '& .MuiAlert-action': {
                color: '#a1a1aa !important',
              },
              '& .MuiAlert-action button': {
                color: '#d4d4d8 !important',
              },
              fontFamily: isRTL ? farsiDisplayStack : 'inherit',
            }}
          >
            {isRTL
              ? `${product.name} به سبد خرید افزوده شد.`
              : `${product.name} added to your cart.`}
          </Alert>
        </Snackbar>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerProductDetails;
