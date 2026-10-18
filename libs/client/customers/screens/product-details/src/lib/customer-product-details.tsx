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
import Search from '@mui/icons-material/Search';

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
  isApparelSizeKind,
  SizeKind,
} from '@kickzone-workspace/product-sizes';
import {
  useI18nContext,
  useLanguageContext,
  usePageTitle,
  farsiDisplayStack,
} from '@kickzone-workspace/shared-i18n';
import { useUIStore } from '@kickzone-workspace/shared-ui-store';
import '../styles/pdp-glass.css';

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
    document.body.classList.add('pdp-screen-active');
    return () => {
      document.body.classList.remove('pdp-screen-active');
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
    if (isApparelSizeKind(firstKind)) return false;

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

  // Preferred brand from product.brand.name falling back to extractBrand(name) per spec §10
  const displayBrand = useMemo(() => {
    return product?.brand?.name ?? brand;
  }, [product?.brand?.name, brand]);

  // Description binding order per spec §10:
  // descriptions.find(d => d.language.code === currentLocale)?.description -> product.description -> fallback template
  // TODO(content): fallback description is generic (see spec §10)
  const localizedDescription = useMemo(() => {
    if (!product) return '';
    const match = product.descriptions?.find(
      (d) => d.language?.code === currentLocale
    )?.description;
    if (match) return match;
    if (product.description) return product.description;
    return isRTL
      ? `شلوار زنانه ${product.name} با طرح استایل فیل‌چاپ در رنگ ${
          activeColorway?.name || 'زیتونی'
        } — الهام‌گرفته از میراث شیکاگو جردن. برش راحت و آزاد با کمر کشی و بند تنظیم‌شونده در مچ، مناسب استایل روزمره و استریت.\n\nپارچه ریپ‌استاپ سبک و مقاوم در برابر پارگی، با جیب‌های کارگو کاربردی روی ران. این مدل اورجینال نایکی/جردن است و از تأمین‌کننده معتبر سنت‌بالا عرضه می‌شود.`
      : `${product.name} delivers athletic style, relaxed comfort, and durable ripstop fabric. Engineered with adjustable waistband and cargo pockets for effortless everyday streetstyle.`;
  }, [product, currentLocale, isRTL, activeColorway]);

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
    if (!product || !activeVariant) {
      return;
    }

    const { productInfo, sellerProduct, finalPrice } = activeVariant;
    const seller = sellerProduct.seller;
    if (!seller) {
      return;
    }

    addItem({
      productId: product.id.toString(),
      productName: product.name,
      productImage: productInfo.images?.[0] || null,
      quantity: 1,
      unitPrice: finalPrice,
      color: serializeVariantColorHexes(productInfo.colors),
      size: productInfo.size || null,
      sellerId: seller.id.toString(),
      sellerName: seller.storeName || '',
      sellerShippingFee: seller.shippingFee || 0,
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
      <CustomersLayout disablePadding={true}>
        <Box
          className="pdp-lg"
          data-mode={themeMode}
          dir={isRTL ? 'rtl' : 'ltr'}
          sx={{
            minHeight: '100vh',
            fontFamily: isRTL ? farsiDisplayStack : 'var(--lg-font)',
            pt: { xs: '54px', sm: '60px', md: '64px' },
          }}
        >
          <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 }, maxWidth: 1376 }}>
            <Box sx={{ mb: 3 }}>
              <Skeleton
                variant="text"
                width={240}
                height={28}
                sx={{ bgcolor: 'var(--lg-pill-bg)' }}
              />
            </Box>
            <Grid container spacing={{ xs: 2.5, md: 4 }}>
              <Grid size={{ xs: 12, md: 6, lg: 7 }}>
                <Box
                  className="lg-card"
                  sx={{
                    borderRadius: '32px',
                    p: { xs: '6px', sm: '12px' },
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      borderRadius: { xs: '26px', sm: '24px' },
                      aspectRatio: { xs: '4 / 3.8', sm: '1 / 1' },
                      height: 'auto',
                      bgcolor: 'var(--lg-photo-well)',
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'center' }}>
                  <Skeleton variant="rounded" width={72} height={72} sx={{ borderRadius: '16px', bgcolor: 'var(--lg-pill-bg)' }} />
                  <Skeleton variant="rounded" width={72} height={72} sx={{ borderRadius: '16px', bgcolor: 'var(--lg-pill-bg)' }} />
                  <Skeleton variant="rounded" width={72} height={72} sx={{ borderRadius: '16px', bgcolor: 'var(--lg-pill-bg)' }} />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 5 }}>
                <Box
                  className="lg-card"
                  sx={{
                    borderRadius: '32px',
                    p: { xs: 2.5, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2.5,
                  }}
                >
                  <Skeleton variant="rounded" width={100} height={28} sx={{ borderRadius: '9999px', bgcolor: 'var(--lg-pill-bg)' }} />
                  <Skeleton variant="text" width="80%" height={40} sx={{ bgcolor: 'var(--lg-pill-bg)' }} />
                  <Skeleton variant="text" width="40%" height={24} sx={{ bgcolor: 'var(--lg-pill-bg)' }} />
                  <Skeleton variant="text" width="30%" height={36} sx={{ bgcolor: 'var(--lg-pill-bg)' }} />
                  <Skeleton variant="rounded" width="100%" height={48} sx={{ borderRadius: '9999px', bgcolor: 'var(--lg-pill-bg)' }} />
                  <Skeleton variant="rounded" width="100%" height={48} sx={{ borderRadius: '9999px', bgcolor: 'var(--lg-pill-bg)' }} />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </CustomersLayout>
    );
  }

  // Not Found State
  if (error || !product) {
    return (
      <CustomersLayout disablePadding={true}>
        <Box
          className="pdp-lg"
          data-mode={themeMode}
          dir={isRTL ? 'rtl' : 'ltr'}
          sx={{
            minHeight: '100vh',
            fontFamily: isRTL ? farsiDisplayStack : 'var(--lg-font)',
            pt: { xs: '54px', sm: '60px', md: '64px' },
          }}
        >
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
              className="lg-card"
              sx={{
                p: 4,
                borderRadius: '32px',
                width: '100%',
                color: 'var(--lg-ink)',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, color: 'var(--lg-ink)' }}>
                {isRTL ? 'محصول مورد نظر یافت نشد' : 'Product Not Found'}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 3, lineHeight: 1.8, color: 'var(--lg-ink-4)' }}
              >
                {isRTL
                  ? 'ممکن است این محصول حذف شده یا آدرس وارد شده نادرست باشد.'
                  : 'The requested product might have been moved or is no longer available.'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                {error && (
                  <Button
                    onClick={() => refetch()}
                    className="lg-pill"
                    sx={{
                      borderRadius: '9999px',
                      px: 3.5,
                      py: 1.2,
                      fontWeight: 600,
                      color: 'var(--lg-ink)',
                    }}
                  >
                    {isRTL ? 'تلاش مجدد' : 'Retry'}
                  </Button>
                )}
                <Button
                  component={RouterLink}
                  to={CUSTOMER_ROUTES.HOME}
                  sx={{
                    borderRadius: '9999px',
                    px: 3.5,
                    py: 1.2,
                    fontWeight: 600,
                    background: 'var(--lg-solid-bg)',
                    color: 'var(--lg-solid-ink)',
                    '&:hover': {
                      background: 'var(--lg-solid-bg-hover)',
                    },
                  }}
                >
                  {isRTL ? 'بازگشت به فروشگاه' : 'Return to Shop'}
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </CustomersLayout>
    );
  }

  return (
    <CustomersLayout disablePadding={true}>
      <Box
        className="pdp-lg"
        data-mode={themeMode}
        dir={isRTL ? 'rtl' : 'ltr'}
        sx={{
          minHeight: '100vh',
          fontFamily: isRTL ? farsiDisplayStack : 'var(--lg-font)',
          pt: { xs: '54px', sm: '60px', md: '64px' },
          pb: { xs: 'calc(96px + env(safe-area-inset-bottom))', md: 8 },
          textAlign: isRTL ? 'right' : 'left',
        }}
      >
        <Box
          component="main"
          id="main"
          sx={{
            maxWidth: 1376,
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
            pt: { xs: 1.5, md: 2.5 },
          }}
        >
          {/* Breadcrumb Navigation */}
          <Box
            component="nav"
            aria-label="breadcrumb"
            sx={{
              pt: { xs: 1.25, md: 2 },
              pb: { xs: 1.25, md: 2.5 },
              overflowX: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            <Breadcrumbs
              separator={
                <Typography
                  sx={{
                    color: 'var(--lg-ink-5)',
                    opacity: isDark ? 0.45 : 1,
                    mx: '8px',
                    fontSize: '13px',
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
                  color: 'var(--lg-ink-4)',
                  fontSize: { xs: '11.5px', md: '13px' },
                  fontWeight: 400,
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'var(--lg-ink)',
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
                    color: 'var(--lg-ink-4)',
                    fontSize: { xs: '11.5px', md: '13px' },
                    fontWeight: 400,
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'var(--lg-ink)',
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
                    color: 'var(--lg-ink-4)',
                    fontSize: { xs: '11.5px', md: '13px' },
                    fontWeight: 400,
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'var(--lg-ink)',
                    },
                  }}
                >
                  {product.categories[1].name}
                </Typography>
              )}

              <Typography
                sx={{
                  color: 'var(--lg-ink)',
                  fontSize: { xs: '11.5px', md: '13px' },
                  fontWeight: 500,
                  maxWidth: { xs: 160, sm: 300 },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <bdi dir={isRTL ? 'rtl' : 'ltr'}>{product.name}</bdi>
              </Typography>
            </Breadcrumbs>
          </Box>

          {/* Main Product Hero Grid: Gallery (7/12 on lg) and Info Card (5/12 on lg) */}
          <Grid
            container
            spacing={{ xs: 2.5, md: 4 }}
            alignItems="flex-start"
          >
            {/* COLUMN 1: Image Gallery */}
            <Grid size={{ xs: 12, md: 6, lg: 7 }}>
              <Box component="section" aria-label={product.name}>
                {/* Main Showcase Card */}
                <Box
                  className="lg-card"
                  sx={{
                    borderRadius: '32px',
                    p: { xs: '6px', sm: '12px' },
                    overflow: 'hidden',
                  }}
                >
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
                      setZoomCoord({ x, y });
                    }}
                    onClick={() => {
                      setLightboxOpen(true);
                      setLightboxZoom(1);
                    }}
                    sx={{
                      position: 'relative',
                      borderRadius: { xs: '26px', sm: '24px' },
                      overflow: 'hidden',
                      bgcolor: 'var(--lg-photo-well)',
                      backgroundImage: `radial-gradient(circle at 50% 38%, rgba(${ambientRgb}, ${
                        isDark ? 0.28 : 0.2
                      }) 0%, transparent 68%)`,
                      aspectRatio: { xs: '4 / 3.8', sm: '1 / 1' },
                      cursor: 'zoom-in',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src={activeMainImage}
                      alt={product.name}
                      loading="eager"
                      fetchPriority="high"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: { xs: 'center 12%', sm: 'center 18%' },
                        transformOrigin: isHoverZoom
                          ? `${zoomCoord.x}% ${zoomCoord.y}%`
                          : 'center center',
                        transform: isHoverZoom ? 'scale(1.35)' : 'scale(1)',
                        transition: isHoverZoom
                          ? 'transform 0.1s ease-out'
                          : 'transform 0.5s cubic-bezier(.2,.7,.1,1)',
                        pointerEvents: 'none',
                        userSelect: 'none',
                      }}
                    />

                    {/* Overlay Button: Favorite Heart */}
                    <IconButton
                      className="lg-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFavorite(!isFavorite);
                      }}
                      aria-label={
                        isFavorite
                          ? isRTL
                            ? 'حذف از علاقه‌مندی‌ها'
                            : 'Remove from favorites'
                          : isRTL
                          ? 'افزودن به علاقه‌مندی‌ها'
                          : 'Add to favorites'
                      }
                      aria-pressed={isFavorite}
                      sx={{
                        position: 'absolute',
                        top: { xs: 12, sm: 16 },
                        insetInlineStart: { xs: 12, sm: 16 },
                        width: { xs: 36, sm: 40 },
                        height: { xs: 36, sm: 40 },
                        borderRadius: '9999px',
                        color: isFavorite ? '#ef4444' : undefined,
                        '&:hover': {
                          transform: 'scale(1.05)',
                          color: '#ef4444',
                        },
                        '&:active': { transform: 'scale(0.95)' },
                      }}
                    >
                      {isFavorite ? (
                        <Favorite sx={{ fontSize: { xs: 17, sm: 18 } }} />
                      ) : (
                        <FavoriteBorder sx={{ fontSize: { xs: 17, sm: 18 } }} />
                      )}
                    </IconButton>

                    {/* Overlay Button: Zoom */}
                    <Tooltip
                      title={
                        isRTL
                          ? 'بزرگ‌نمایی تصویر (تمام‌صفحه)'
                          : 'Full Zoom View'
                      }
                      arrow
                    >
                      <IconButton
                        className="lg-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxOpen(true);
                          setLightboxZoom(1);
                        }}
                        aria-label="zoom image"
                        sx={{
                          position: 'absolute',
                          top: { xs: 12, sm: 16 },
                          insetInlineEnd: { xs: 12, sm: 16 },
                          width: { xs: 36, sm: 40 },
                          height: { xs: 36, sm: 40 },
                          borderRadius: '9999px',
                          '&:hover': { transform: 'scale(1.05)' },
                          '&:active': { transform: 'scale(0.95)' },
                        }}
                      >
                        <ZoomIn sx={{ fontSize: { xs: 18, sm: 20 } }} />
                      </IconButton>
                    </Tooltip>

                    {/* Overlay Arrows (only if galleryImages.length > 1) */}
                    {galleryImages.length > 1 && (
                      <>
                        <IconButton
                          className="lg-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            isRTL ? handleNextImage() : handlePrevImage();
                          }}
                          aria-label={isRTL ? 'تصویر بعدی' : 'previous image'}
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            insetInlineStart: { xs: 10, sm: 16 },
                            width: { xs: 32, sm: 40 },
                            height: { xs: 32, sm: 40 },
                            borderRadius: '9999px',
                            boxShadow: {
                              xs: '0 2px 10px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.35)',
                              sm: undefined,
                            },
                            '&:hover': {
                              transform: 'translateY(-50%) scale(1.05)',
                            },
                            '&:active': {
                              transform: 'translateY(-50%) scale(0.95)',
                            },
                          }}
                        >
                          {isRTL ? (
                            <ChevronRight sx={{ fontSize: { xs: 16, sm: 20 } }} />
                          ) : (
                            <ChevronLeft sx={{ fontSize: { xs: 16, sm: 20 } }} />
                          )}
                        </IconButton>
                        <IconButton
                          className="lg-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            isRTL ? handlePrevImage() : handleNextImage();
                          }}
                          aria-label={isRTL ? 'تصویر قبلی' : 'next image'}
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            insetInlineEnd: { xs: 10, sm: 16 },
                            width: { xs: 32, sm: 40 },
                            height: { xs: 32, sm: 40 },
                            borderRadius: '9999px',
                            boxShadow: {
                              xs: '0 2px 10px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.35)',
                              sm: undefined,
                            },
                            '&:hover': {
                              transform: 'translateY(-50%) scale(1.05)',
                            },
                            '&:active': {
                              transform: 'translateY(-50%) scale(0.95)',
                            },
                          }}
                        >
                          {isRTL ? (
                            <ChevronLeft sx={{ fontSize: { xs: 16, sm: 20 } }} />
                          ) : (
                            <ChevronRight sx={{ fontSize: { xs: 16, sm: 20 } }} />
                          )}
                        </IconButton>
                      </>
                    )}

                    {/* Hint Pill */}
                    <Box
                      className="lg-pill"
                      sx={{
                        position: 'absolute',
                        bottom: { xs: 12, sm: 16 },
                        left: '50%',
                        transform: 'translateX(-50%)',
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 0.75, sm: 1 },
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Search sx={{ fontSize: 14, color: 'var(--lg-ink-5)' }} />
                      <Typography
                        sx={{
                          fontSize: { xs: '11px', sm: '12px' },
                          fontWeight: 500,
                          color: 'var(--lg-ink-2)',
                          userSelect: 'none',
                        }}
                      >
                        {isRTL
                          ? 'حرکت نشانگر برای زوم یا کلیک برای نمایش بزرگ'
                          : 'Hover to zoom • Click to expand'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Thumbnails Row */}
                {galleryImages.length > 1 && (
                  <Box
                    sx={{
                      display: 'flex',
                      gap: { xs: 1.5, sm: 1.75 },
                      justifyContent: 'center',
                      mt: { xs: 1.5, sm: 2 },
                      flexWrap: 'wrap',
                    }}
                  >
                    {galleryImages.map((img, idx) => {
                      const isSelected = idx === activeImageIndex;
                      return (
                        <Box
                          component="button"
                          key={`pdp-thumb-${idx}`}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          aria-label={
                            isRTL
                              ? `مشاهده تصویر ${idx + 1}`
                              : `View photo ${idx + 1}`
                          }
                          aria-current={isSelected ? 'true' : undefined}
                          sx={{
                            width: { xs: 64, sm: 72, md: 80 },
                            height: { xs: 64, sm: 72, md: 80 },
                            borderRadius: { xs: '18px', sm: '16px' },
                            p: '2px',
                            cursor: 'pointer',
                            border: 'none',
                            background: isSelected
                              ? 'transparent'
                              : isDark
                              ? 'rgba(255,255,255,0.05)'
                              : 'rgba(255,255,255,0.5)',
                            boxShadow: isSelected
                              ? '0 0 0 2px var(--lg-ring-offset), 0 0 0 4px var(--lg-ring)'
                              : 'none',
                            outline: 'none',
                            transition: 'all 0.2s cubic-bezier(.2,.7,.1,1)',
                            '&:hover': {
                              borderColor: 'var(--lg-ink-5)',
                            },
                            '&:focus-visible': {
                              outline: '2px solid var(--focus)',
                              outlineOffset: 3,
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={img}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            sx={{
                              width: '100%',
                              height: '100%',
                              borderRadius: { xs: '14px', sm: '12px' },
                              objectFit: 'cover',
                              objectPosition: 'center 20%',
                              display: 'block',
                            }}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
            </Grid>

            {/* COLUMN 2: Product Information Card (In RTL, this renders on the left!) */}
            <Grid size={{ xs: 12, md: 6, lg: 5 }}>
              <Box
                className="lg-card"
                dir={isRTL ? 'rtl' : 'ltr'}
                sx={{
                  borderRadius: { xs: '24px', md: '32px' },
                  p: { xs: 2.5, sm: 3.5, md: 4 },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: { xs: 2.5, md: 3 },
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
                  }}
                >
                  <Box
                    className="lg-pill"
                    sx={{
                      px: 1.25,
                      py: 0.35,
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--lg-ink)',
                    }}
                  >
                    {isRTL ? 'جدید' : 'NEW'}
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'var(--lg-muted)',
                      fontWeight: 600,
                      fontSize: '0.8125rem',
                    }}
                  >
                    {displayBrand}
                    {primaryCategory && ` · ${primaryCategory.name}`}
                  </Typography>
                </Box>

                {/* Product Title & Code */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      fontFamily: isRTL ? farsiDisplayStack : 'inherit',
                      fontWeight: 800,
                      fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                      lineHeight: 1.2,
                      color: 'var(--lg-ink)',
                      letterSpacing: isRTL ? 'normal' : '-0.025em',
                      textWrap: 'balance',
                    }}
                  >
                    {product.name}
                  </Typography>

                  {product.sku && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'var(--lg-muted)',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        fontFamily: 'monospace',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {isRTL ? `کد محصول: ${product.sku}` : `Product Code: ${product.sku}`}
                    </Typography>
                  )}
                </Box>

                {/* Price Display */}
                {pricingInfo && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 1.5,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography
                      component="div"
                      sx={{
                        fontSize: { xs: '1.75rem', sm: '2rem' },
                        fontWeight: 800,
                        color: 'var(--lg-ink)',
                        letterSpacing: isRTL ? 'normal' : '-0.02em',
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
                            color: 'var(--lg-muted)',
                            fontSize: '1rem',
                            fontWeight: 500,
                          }}
                        >
                          <PriceDisplay
                            priceInUSD={pricingInfo.originalPrice}
                            showSymbol={true}
                          />
                        </Typography>

                        <Box
                          className="lg-pill"
                          sx={{
                            px: 1.25,
                            py: 0.35,
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            color: 'var(--lg-ink)',
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

                {/* Stock Pill Badge */}
                {isLowStock && (
                  <Box
                    className="lg-stock-low"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 1.75,
                      py: 0.65,
                      borderRadius: '9999px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    <Box
                      className="lg-stock-dot"
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: '#f59e0b',
                      }}
                    />
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
                      {isRTL
                        ? `تنها ${formatNumber(pricingInfo?.stockQuantity || 1)} عدد باقی مانده — همین حالا رزرو کنید`
                        : `Only ${pricingInfo?.stockQuantity} left in stock — Order now`}
                    </Typography>
                  </Box>
                )}

                {isOutOfStock && (
                  <Box
                    className="lg-stock-oos"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.85,
                      px: 1.75,
                      py: 0.65,
                      borderRadius: '9999px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
                      {isRTL ? 'ناموجود در انبار' : 'Out of Stock'}
                    </Typography>
                  </Box>
                )}

                {/* Color Selector Section */}
                {availableColorways.length > 0 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--lg-ink)',
                      }}
                    >
                      {isRTL ? 'رنگ:' : 'Color:'}{' '}
                      <Box
                        component="span"
                        sx={{
                          fontWeight: 400,
                          color: 'var(--lg-muted)',
                        }}
                      >
                        {activeColorway?.name}
                      </Box>
                    </Typography>

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
                                width: { xs: 28, sm: 32 },
                                height: { xs: 28, sm: 32 },
                                borderRadius: '50%',
                                p: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                background: 'transparent',
                                border: 'none',
                                boxShadow: isSelected
                                  ? '0 0 0 2px var(--lg-ring-offset), 0 0 0 4px var(--lg-ring)'
                                  : 'none',
                                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                '&:hover': {
                                  transform: 'scale(1.1)',
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: '50%',
                                  background: discBg,
                                  border: '1px solid var(--lg-card-border)',
                                }}
                              />
                            </Box>
                          </Tooltip>
                        );
                      })}
                    </Box>
                  </Box>
                )}

                {/* Size Selector Section */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--lg-ink)',
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
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: 'var(--lg-muted)',
                        p: 0,
                        minWidth: 0,
                        '&:hover': {
                          background: 'transparent',
                          color: 'var(--lg-ink)',
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
                            className={isSelected ? undefined : 'lg-pill'}
                            onClick={() => setSelectedSize(size)}
                            sx={{
                              width: 48,
                              height: 40,
                              borderRadius: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              fontWeight: isSelected ? 700 : 500,
                              fontSize: '0.875rem',
                              border: isSelected ? 'none' : undefined,
                              background: isSelected ? 'var(--lg-solid-bg)' : undefined,
                              color: isSelected ? 'var(--lg-solid-ink)' : 'var(--lg-ink)',
                              boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.15)' : undefined,
                              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                              '&:hover': {
                                transform: 'translateY(-1px)',
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
                      sx={{ fontSize: '0.8125rem', color: 'var(--lg-muted)' }}
                    >
                      {isRTL
                        ? 'سایزی برای این رنگ موجود نیست'
                        : 'No sizes currently available for this color'}
                    </Typography>
                  )}
                </Box>

                {/* Action Buttons (CTAs) */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: 1 }}>
                  {/* Primary CTA: Add to cart */}
                  <Button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    variant="contained"
                    fullWidth
                    startIcon={
                      isAddedRecently ? (
                        <Check sx={{ fontSize: 18 }} />
                      ) : (
                        <ShoppingBagOutlined sx={{ fontSize: 18 }} />
                      )
                    }
                    sx={{
                      height: { xs: 48, sm: 50 },
                      borderRadius: '9999px',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      letterSpacing: isRTL ? 'normal' : '-0.01em',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      background: isAddedRecently
                        ? '#10b981 !important'
                        : 'var(--lg-solid-bg) !important',
                      color: isAddedRecently
                        ? '#ffffff !important'
                        : 'var(--lg-solid-ink) !important',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        opacity: 0.94,
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.18)',
                      },
                      '&.Mui-disabled': {
                        opacity: 0.4,
                        background: 'var(--lg-pill-bg) !important',
                        color: 'var(--lg-muted) !important',
                        boxShadow: 'none',
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
                    fullWidth
                    className="lg-pill"
                    sx={{
                      height: { xs: 46, sm: 48 },
                      borderRadius: '9999px',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      letterSpacing: isRTL ? 'normal' : '-0.01em',
                      color: 'var(--lg-ink)',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        background: 'var(--lg-pill-bg-hover)',
                      },
                      '&.Mui-disabled': {
                        opacity: 0.4,
                        color: 'var(--lg-muted)',
                      },
                    }}
                  >
                    {isRTL ? 'خرید فوری' : 'Buy Now'}
                  </Button>
                </Box>

                {/* Accordions Section */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, pt: 1 }}>
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
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(0, 0, 0, 0.02)',
                      border: '1px solid var(--lg-card-border)',
                      overflow: 'hidden',
                      '&::before': { display: 'none' },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore sx={{ color: 'var(--lg-ink)' }} />}
                      sx={{ px: 2.5, minHeight: 48 }}
                    >
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--lg-ink)' }}>
                        {isRTL ? 'توضیحات' : 'Description'}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                      <Typography
                        sx={{
                          fontSize: '0.8125rem',
                          lineHeight: 1.7,
                          color: 'var(--lg-muted)',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {localizedDescription}
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
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(0, 0, 0, 0.02)',
                      border: '1px solid var(--lg-card-border)',
                      overflow: 'hidden',
                      '&::before': { display: 'none' },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore sx={{ color: 'var(--lg-ink)' }} />}
                      sx={{ px: 2.5, minHeight: 48 }}
                    >
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--lg-ink)' }}>
                        {isRTL ? 'جزئیات و جنس' : 'Details & Materials'}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" sx={{ color: 'var(--lg-muted)', fontSize: '0.8125rem' }}>
                            {isRTL ? 'برند:' : 'Brand:'}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--lg-ink)', fontSize: '0.8125rem' }}>
                            {displayBrand}
                          </Typography>
                        </Box>
                        {product.sku && (
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" sx={{ color: 'var(--lg-muted)', fontSize: '0.8125rem' }}>
                              {isRTL ? 'کد اختصاصی (SKU):' : 'SKU:'}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--lg-ink)', fontSize: '0.8125rem', fontFamily: 'monospace' }}>
                              {product.sku}
                            </Typography>
                          </Box>
                        )}
                        {/* TODO(content): Schema currently does not provide fabric composition; using fallback string per spec */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" sx={{ color: 'var(--lg-muted)', fontSize: '0.8125rem' }}>
                            {isRTL ? 'جنس پارچه:' : 'Material:'}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--lg-ink)', fontSize: '0.8125rem' }}>
                            {isRTL
                              ? '۱۰۰٪ کتان ریپ‌استاپ تنفس‌پذیر'
                              : '100% Breathable Ripstop Cotton'}
                          </Typography>
                        </Box>
                        {/* TODO(content): Schema currently does not provide care instructions; using fallback string per spec */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" sx={{ color: 'var(--lg-muted)', fontSize: '0.8125rem' }}>
                            {isRTL ? 'نحوه شستشو:' : 'Care:'}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--lg-ink)', fontSize: '0.8125rem' }}>
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
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(0, 0, 0, 0.02)',
                      border: '1px solid var(--lg-card-border)',
                      overflow: 'hidden',
                      '&::before': { display: 'none' },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore sx={{ color: 'var(--lg-ink)' }} />}
                      sx={{ px: 2.5, minHeight: 48 }}
                    >
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--lg-ink)' }}>
                        {isRTL ? 'راهنمای سایز' : 'Size Guide'}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                      <Typography
                        sx={{
                          fontSize: '0.8125rem',
                          lineHeight: 1.7,
                          color: 'var(--lg-muted)',
                          mb: 1.5,
                        }}
                      >
                        {isRTL
                          ? 'قالب این مدل کاملاً استاندارد (True to Size) است. اگر تمایل به استایل بگ و لش دارید، یک سایز بزرگ‌تر انتخاب نمایید.'
                          : 'Standard fit (True to Size). Choose your regular athletic size for a relaxed comfortable silhouette.'}
                      </Typography>
                      <Button
                        onClick={() => setSizeGuideOpen(true)}
                        className="lg-pill"
                        size="small"
                        startIcon={<StraightenOutlined sx={{ fontSize: 16 }} />}
                        sx={{
                          textTransform: 'none',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: 'var(--lg-ink)',
                          px: 2,
                          py: 0.6,
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
                  className="lg-card"
                  dir={isRTL ? 'rtl' : 'ltr'}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: { xs: '20px', md: '28px' },
                    textAlign: isRTL ? 'right' : 'left',
                  }}
                >
                  <Box
                    className="lg-pill"
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--lg-ink)',
                      flexShrink: 0,
                    }}
                  >
                    <GppGoodOutlined sx={{ fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', mb: 0.25, color: 'var(--lg-ink)' }}>
                      {isRTL ? 'اصالت کالا' : 'Authentic Guarantee'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'var(--lg-muted)', fontSize: '0.8125rem' }}
                    >
                      {isRTL ? '۱۰۰٪ اورجینال نایک و جردن' : '100% Genuine Nike & Jordan'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Feature 2: 7 Days Exchange */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box
                  className="lg-card"
                  dir={isRTL ? 'rtl' : 'ltr'}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: { xs: '20px', md: '28px' },
                    textAlign: isRTL ? 'right' : 'left',
                  }}
                >
                  <Box
                    className="lg-pill"
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--lg-ink)',
                      flexShrink: 0,
                    }}
                  >
                    <PublishedWithChangesOutlined sx={{ fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', mb: 0.25, color: 'var(--lg-ink)' }}>
                      {isRTL ? 'ضمانت تعویض ۷ روزه' : '7-Day Size Exchange'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'var(--lg-muted)', fontSize: '0.8125rem' }}
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
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    fontFamily: isRTL ? farsiDisplayStack : 'inherit',
                    color: 'var(--lg-ink)',
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
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: 'var(--lg-muted)',
                    fontFamily: isRTL ? farsiDisplayStack : 'inherit',
                    '&:hover': {
                      background: 'transparent',
                      color: 'var(--lg-ink)',
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
                      appearance="glass"
                      product={simProd}
                      onCardClick={() => {
                        navigate(getCustomerProductDetailsRoute(simProd.id));
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
                        }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>

        {/* Size Guide Dialog */}
        <Dialog
          open={sizeGuideOpen}
          onClose={() => setSizeGuideOpen(false)}
          maxWidth="md"
          fullWidth
          dir={isRTL ? 'rtl' : 'ltr'}
          PaperProps={{
            sx: {
              borderRadius: { xs: '24px', md: '28px' },
              p: { xs: 2, sm: 2.5 },
              backdropFilter: 'blur(32px)',
              background: isDark
                ? 'rgba(20, 22, 32, 0.96)'
                : 'rgba(255, 255, 255, 0.98)',
              border: '1px solid var(--lg-card-border)',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
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
              <StraightenOutlined sx={{ color: 'var(--lg-ink)' }} />
              <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--lg-ink)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                {isRTL ? 'راهنمای جامع سایز' : 'Complete Size Guide'}
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => setSizeGuideOpen(false)}
              className="lg-icon"
              sx={{ width: 36, height: 36, color: 'var(--lg-ink)' }}
            >
              <Close fontSize="small" />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ pt: 1 }}>
            <Typography
              variant="body2"
              sx={{ mb: 2, lineHeight: 1.8, color: 'var(--lg-muted)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}
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
                      ? 'var(--lg-solid-bg)'
                      : 'transparent',
                  color:
                    sizeGuideTab === 'footwear'
                      ? 'var(--lg-solid-ink)'
                      : 'var(--lg-muted)',
                  '&:hover': {
                    background:
                      sizeGuideTab === 'footwear'
                        ? 'var(--lg-solid-bg)'
                        : 'var(--lg-pill-bg-hover)',
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
                      ? 'var(--lg-solid-bg)'
                      : 'transparent',
                  color:
                    sizeGuideTab === 'apparel'
                      ? 'var(--lg-solid-ink)'
                      : 'var(--lg-muted)',
                  '&:hover': {
                    background:
                      sizeGuideTab === 'apparel'
                        ? 'var(--lg-solid-bg)'
                        : 'var(--lg-pill-bg-hover)',
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
                    ? 'rgba(255, 255, 255, 0.03)'
                    : 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '16px',
                  border: '1px solid var(--lg-card-border)',
                  maxHeight: 340,
                  overflowY: 'auto',
                }}
              >
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', color: 'var(--lg-ink)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'سایز اروپا (EU)' : 'EU Size'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', color: 'var(--lg-ink)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'طول پا (سانتی‌متر)' : 'Foot Length (CM)'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', color: 'var(--lg-ink)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'آمریکا (US)' : 'US Size'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', color: 'var(--lg-ink)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
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
                        <TableCell sx={{ fontWeight: 700, color: 'var(--lg-ink)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {isRTL ? toFarsiDigits(row.eu) : row.eu}
                        </TableCell>
                        <TableCell align="center" sx={{ color: 'var(--lg-muted)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {isRTL ? toFarsiDigits(row.cm) : row.cm}
                        </TableCell>
                        <TableCell align="center" sx={{ color: 'var(--lg-muted)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {isRTL ? toFarsiDigits(row.us) : row.us}
                        </TableCell>
                        <TableCell align="center" sx={{ color: 'var(--lg-muted)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
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
                    ? 'rgba(255, 255, 255, 0.03)'
                    : 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '16px',
                  border: '1px solid var(--lg-card-border)',
                  maxHeight: 340,
                  overflowY: 'auto',
                }}
              >
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', color: 'var(--lg-ink)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'سایز' : 'Size'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', color: 'var(--lg-ink)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'دور سینه (cm)' : 'Chest (cm)'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', color: 'var(--lg-ink)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'دور کمر (cm)' : 'Waist (cm)'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', color: 'var(--lg-ink)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                        {isRTL ? 'دور باسن (cm)' : 'Hips (cm)'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, background: isDark ? '#1a1c24' : '#f8f8fa', color: 'var(--lg-ink)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
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
                        <TableCell sx={{ fontWeight: 700, color: 'var(--lg-ink)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {row.size}
                        </TableCell>
                        <TableCell align="center" sx={{ color: 'var(--lg-muted)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {isRTL ? toFarsiDigits(row.chest) : row.chest}
                        </TableCell>
                        <TableCell align="center" sx={{ color: 'var(--lg-muted)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {isRTL ? toFarsiDigits(row.waist) : row.waist}
                        </TableCell>
                        <TableCell align="center" sx={{ color: 'var(--lg-muted)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                          {isRTL ? toFarsiDigits(row.hips) : row.hips}
                        </TableCell>
                        <TableCell align="center" sx={{ color: 'var(--lg-muted)', borderBottom: '1px solid var(--lg-card-border)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
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
                  ? 'rgba(255, 255, 255, 0.03)'
                  : 'rgba(0, 0, 0, 0.02)',
                border: '1px solid var(--lg-card-border)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.8125rem',
                  lineHeight: 1.8,
                  color: 'var(--lg-muted)',
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
                fontWeight: 600,
                fontFamily: isRTL ? farsiDisplayStack : 'inherit',
                background: 'var(--lg-solid-bg)',
                color: 'var(--lg-solid-ink)',
                '&:hover': {
                  opacity: 0.92,
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
              border: '1px solid var(--lg-card-border)',
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
              borderBottom: '1px solid var(--lg-card-border)',
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--lg-ink)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}>
                {product.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'var(--lg-muted)', fontFamily: isRTL ? farsiDisplayStack : 'inherit' }}
              >
                {isRTL
                  ? `تصویر ${toFarsiDigits(activeImageIndex + 1)} از ${toFarsiDigits(galleryImages.length)}`
                  : `Image ${activeImageIndex + 1} of ${galleryImages.length}`}
              </Typography>
            </Box>

            {/* Lightbox Controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Reset button */}
              {lightboxZoom > 1 && (
                <Tooltip title={isRTL ? 'اندازه اولیه' : 'Reset'} arrow>
                  <IconButton
                    size="small"
                    aria-label={isRTL ? 'اندازه اولیه' : 'Reset'}
                    onClick={handleResetLightbox}
                    className="lg-icon"
                    sx={{ width: 36, height: 36, color: 'var(--lg-ink)' }}
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
                  className="lg-icon"
                  sx={{ width: 36, height: 36, color: 'var(--lg-ink)' }}
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
                  className="lg-icon"
                  sx={{ width: 36, height: 36, color: 'var(--lg-ink)' }}
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
                  className="lg-icon"
                  sx={{ width: 36, height: 36, color: 'var(--lg-ink)' }}
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
                className="lg-icon"
                style={{ left: 12 }}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: 44,
                  height: 44,
                  color: 'var(--lg-ink)',
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
                className="lg-icon"
                style={{ right: 12 }}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: 44,
                  height: 44,
                  color: 'var(--lg-ink)',
                }}
              >
                <ChevronRight />
              </IconButton>
            )}

            {/* Pan guide hint when zoomed */}
            {lightboxZoom > 1 && (
              <Box
                className="lg-pill"
                sx={{
                  position: 'absolute',
                  bottom: 14,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 9,
                  px: 2,
                  py: 0.6,
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
                    color: 'var(--lg-ink)',
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
                  className={idx === activeImageIndex ? undefined : 'lg-card'}
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '12px',
                    p: 0.5,
                    cursor: 'pointer',
                    boxShadow:
                      idx === activeImageIndex
                        ? '0 0 0 2px var(--lg-ring-offset), 0 0 0 4px var(--lg-ring)'
                        : 'none',
                    background:
                      idx === activeImageIndex
                        ? 'var(--lg-card-bg)'
                        : undefined,
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
              borderRadius: '9999px',
              px: 3,
              py: 1.2,
              fontWeight: 600,
              fontSize: '0.875rem',
              backdropFilter: 'blur(24px)',
              background: '#18181b !important',
              color: '#ffffff !important',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
              '& .MuiAlert-message': {
                color: '#ffffff !important',
                fontWeight: 600,
                fontSize: '0.875rem',
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
