import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import { useUIStore } from '@kickzone-workspace/shared-ui-store';
import { resolveProductBrand } from '@kickzone-workspace/customers-product-card';
import {
  CUSTOMER_ROUTES,
  getCustomerShopRoute,
} from '@kickzone-workspace/customers-routes';

const API_BASE_URL =
  (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_API_BASE_URL || '';

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

const productImage = (product?: KickzoneGraphqlTypes.Product | null) =>
  resolveImageUrl(
    product?.productInfos?.[0]?.images?.[0] ||
      product?.sellerProducts?.[0]?.productInfo?.images?.[0]
  );

interface HeroSectionProps {
  rightProduct?: KickzoneGraphqlTypes.Product | null;
  centerProduct?: KickzoneGraphqlTypes.Product | null;
  leftProduct?: KickzoneGraphqlTypes.Product | null;
  rightImage?: string;
  centerImage?: string;
  leftImage?: string;
}

export function HeroSection({
  rightProduct,
  centerProduct,
  leftProduct,
  rightImage = '/assets/hero/hero-right-women.jpg',
  centerImage = '/assets/hero/hero-center-jordan.jpg',
  leftImage = '/assets/hero/hero-left-men.jpg',
}: HeroSectionProps) {
  const { LL } = useI18nContext();
  const themeMode = useUIStore((s) => s.theme.mode);
  const isPhone = useMediaQuery('(max-width: 760px)');
  const [hoveredPanel, setHoveredPanel] = useState<'right' | 'center' | 'left' | null>(null);

  const rightImg = productImage(rightProduct) || rightImage;
  const centerImg = productImage(centerProduct) || centerImage;
  const leftImg = productImage(leftProduct) || leftImage;

  const rightLink = rightProduct
    ? `/product/${rightProduct.id}`
    : getCustomerShopRoute({ category: 'women' });
  const centerLink = centerProduct
    ? `/product/${centerProduct.id}`
    : CUSTOMER_ROUTES.SHOP;
  const leftLink = leftProduct
    ? `/product/${leftProduct.id}`
    : getCustomerShopRoute({ category: 'men' });

  const rightBrand = rightProduct
    ? resolveProductBrand(rightProduct)
    : 'Nike';
  const centerBrand = centerProduct
    ? resolveProductBrand(centerProduct)
    : 'Jordan';
  const leftBrand = leftProduct ? resolveProductBrand(leftProduct) : 'Nike';

  const inkOnPhoto = themeMode === 'dark' ? '#f5f5f7' : '#ffffff';
  const chipBg =
    themeMode === 'dark' ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 0.22)';

  const panelTag = (
    brand: string,
    label: string,
    phone = false
  ) => (
    <Box
      sx={{
        position: 'absolute',
        top: phone ? 66 : 76,
        insetInlineStart: phone ? 16 : 22,
        zIndex: 2,
        fontSize: '12px',
        fontWeight: 500,
        fontFamily: 'var(--font-sans)',
        px: 1.5,
        py: 0.75,
        borderRadius: '999px',
        background: chipBg,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        color: inkOnPhoto,
      }}
    >
      <bdi dir="ltr" style={{ fontWeight: 700, letterSpacing: '0.14em' }}>
        {brand}
      </bdi>{' '}
      · {label}
    </Box>
  );

  const scrim = (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background:
          themeMode === 'dark'
            ? 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.4) 32%, transparent 58%), linear-gradient(rgba(0,0,0,0.28), transparent 22%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.3) 32%, transparent 58%), linear-gradient(rgba(0,0,0,0.14), transparent 22%)',
        pointerEvents: 'none',
      }}
    />
  );

  return (
    <>
      <Box
        id="hero"
        className="hero-campaign"
        component="section"
        aria-label={LL.home.hero.ariaLabel()}
        data-theme-mode={themeMode}
        sx={{
          position: 'relative',
          height: isPhone ? '92svh' : '100svh',
          minHeight: isPhone ? undefined : '620px',
          maxHeight: isPhone ? undefined : '1000px',
          overflow: 'clip',
          width: '100%',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: isPhone ? '1fr' : '1fr 1.42fr 1fr',
            gap: isPhone ? 0 : '3px',
            height: '100%',
            width: '100%',
          }}
        >
          {!isPhone && (
            <Box
              component={RouterLink}
              to={rightLink}
              onMouseEnter={() => setHoveredPanel('right')}
              onMouseLeave={() => setHoveredPanel(null)}
              sx={{
                position: 'relative',
                height: '100%',
                overflow: 'hidden',
                textDecoration: 'none',
                filter:
                  hoveredPanel && hoveredPanel !== 'right'
                    ? 'brightness(0.82) saturate(0.9)'
                    : 'none',
                transition: 'filter 0.4s var(--ease)',
              }}
            >
              <Box
                component="img"
                className="hero-panel-img"
                src={rightImg}
                alt=""
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: '50% 18%',
                  transform:
                    'scale(calc(1.04 + var(--t, 0) * 0.10)) translateY(calc(var(--t, 0) * 6%))',
                  transition: 'transform 0.4s var(--ease), filter 0.35s var(--ease)',
                }}
              />
              {panelTag(rightBrand, LL.home.hero.women())}
              {scrim}
            </Box>
          )}

          <Box
            component={RouterLink}
            to={centerLink}
            onMouseEnter={() => setHoveredPanel('center')}
            onMouseLeave={() => setHoveredPanel(null)}
            sx={{
              position: 'relative',
              height: '100%',
              overflow: 'hidden',
              textDecoration: 'none',
              filter:
                hoveredPanel && hoveredPanel !== 'center'
                  ? 'brightness(0.82) saturate(0.9)'
                  : 'none',
              transition: 'filter 0.4s var(--ease)',
            }}
          >
            <Box
              component="img"
              className="hero-panel-img"
              src={centerImg}
              fetchPriority="high"
              alt=""
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '50% 12%',
                transform:
                  'scale(calc(1.04 + var(--t, 0) * 0.10)) translateY(calc(var(--t, 0) * 6%))',
                transition: 'transform 0.4s var(--ease), filter 0.35s var(--ease)',
              }}
            />
            {panelTag(centerBrand, LL.home.hero.womenAndMen(), isPhone)}
            {scrim}
          </Box>

          {!isPhone && (
            <Box
              component={RouterLink}
              to={leftLink}
              onMouseEnter={() => setHoveredPanel('left')}
              onMouseLeave={() => setHoveredPanel(null)}
              sx={{
                position: 'relative',
                height: '100%',
                overflow: 'hidden',
                textDecoration: 'none',
                filter:
                  hoveredPanel && hoveredPanel !== 'left'
                    ? 'brightness(0.82) saturate(0.9)'
                    : 'none',
                transition: 'filter 0.4s var(--ease)',
              }}
            >
              <Box
                component="img"
                className="hero-panel-img"
                src={leftImg}
                alt=""
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: '50% 18%',
                  transform:
                    'scale(calc(1.04 + var(--t, 0) * 0.10)) translateY(calc(var(--t, 0) * 6%))',
                  transition: 'transform 0.4s var(--ease), filter 0.35s var(--ease)',
                }}
              />
              {panelTag(leftBrand, LL.home.hero.men())}
              {scrim}
            </Box>
          )}
        </Box>

        <Box
          className="hero-copy"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            pb: 'clamp(48px, 8vh, 88px)',
            px: { xs: 2.5, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            opacity: 'calc(1 - var(--t, 0) * 1.6)',
            transform: 'translateY(calc(var(--t, 0) * -60px))',
            transition: 'opacity 0.3s var(--ease), transform 0.3s var(--ease)',
            pointerEvents: 'none',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 500,
              opacity: 0.9,
              letterSpacing: '0.02em',
              fontFamily: 'var(--font-sans)',
              color: inkOnPhoto,
            }}
          >
            {LL.home.hero.collection()}
          </Typography>

          <Typography
            component="h1"
            sx={{
              mt: '14px',
              fontSize: isPhone
                ? 'clamp(52px, 15vw, 72px)'
                : 'clamp(56px, 9.2vw, 136px)',
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-sans)',
              color: inkOnPhoto,
              maxWidth: isPhone ? '8em' : 'none',
            }}
          >
            {isPhone ? (
              <>
                {LL.home.hero.sloganLine1()}
                <br />
                {LL.home.hero.sloganLine2()}
              </>
            ) : (
              LL.home.hero.slogan()
            )}
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              fontWeight: 400,
              lineHeight: 1.8,
              opacity: 0.92,
              maxWidth: '34em',
              fontFamily: 'var(--font-sans)',
              color: inkOnPhoto,
            }}
          >
            {LL.home.hero.subtitle()}
          </Typography>

          <Box
            sx={{
              mt: '28px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              justifyContent: 'center',
              width: isPhone ? '100%' : 'auto',
              pointerEvents: 'auto',
            }}
          >
            <Button
              component={RouterLink}
              to="/shop?category=women"
              variant="contained"
              sx={{
                flex: isPhone ? 1 : 'none',
                height: 50,
                px: '28px',
                borderRadius: '999px',
                background: themeMode === 'dark' ? '#f5f5f7' : '#ffffff',
                color: '#111111',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                textTransform: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                transition: 'all 0.2s var(--ease)',
                '&:hover': {
                  background: themeMode === 'dark' ? '#e8e8ea' : '#f2f2f2',
                  transform: 'scale(1.02)',
                },
                '&:active': { transform: 'scale(0.97)' },
              }}
            >
              {LL.home.hero.shopWomen()}
            </Button>

            <Button
              component={RouterLink}
              to="/shop?category=men"
              variant="outlined"
              sx={{
                flex: isPhone ? 1 : 'none',
                height: 50,
                px: '28px',
                borderRadius: '999px',
                background:
                  themeMode === 'dark'
                    ? 'rgba(245, 245, 247, 0.12)'
                    : 'rgba(255, 255, 255, 0.14)',
                border:
                  themeMode === 'dark'
                    ? '1px solid rgba(245, 245, 247, 0.45)'
                    : '1px solid rgba(255, 255, 255, 0.55)',
                backdropFilter: 'blur(14px) saturate(160%)',
                WebkitBackdropFilter: 'blur(14px) saturate(160%)',
                color: inkOnPhoto,
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                textTransform: 'none',
                transition: 'all 0.2s var(--ease)',
                '&:hover': {
                  background:
                    themeMode === 'dark'
                      ? 'rgba(245, 245, 247, 0.2)'
                      : 'rgba(255, 255, 255, 0.22)',
                  borderColor: inkOnPhoto,
                  transform: 'scale(1.02)',
                },
                '&:active': { transform: 'scale(0.97)' },
              }}
            >
              {LL.home.hero.shopMen()}
            </Button>
          </Box>
        </Box>
      </Box>

      {isPhone && (
        <Box
          className="hero-duo"
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3px',
            width: '100%',
            background: themeMode === 'dark' ? '#0a0a0a' : '#1a1917',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <Box
            component={RouterLink}
            to="/shop?category=women"
            sx={{
              position: 'relative',
              aspectRatio: '4 / 5',
              overflow: 'hidden',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              className="hero-panel-img"
              src={rightImg}
              alt=""
              loading="lazy"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'filter 0.35s var(--ease)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)',
              }}
            />
            <Typography
              sx={{
                position: 'absolute',
                bottom: 16,
                insetInlineStart: 16,
                color: inkOnPhoto,
                fontSize: '20px',
                fontWeight: 800,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {LL.home.hero.women()}
            </Typography>
          </Box>

          <Box
            component={RouterLink}
            to="/shop?category=men"
            sx={{
              position: 'relative',
              aspectRatio: '4 / 5',
              overflow: 'hidden',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              className="hero-panel-img"
              src={leftImg}
              alt=""
              loading="lazy"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'filter 0.35s var(--ease)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)',
              }}
            />
            <Typography
              sx={{
                position: 'absolute',
                bottom: 16,
                insetInlineStart: 16,
                color: inkOnPhoto,
                fontSize: '20px',
                fontWeight: 800,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {LL.home.hero.men()}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
