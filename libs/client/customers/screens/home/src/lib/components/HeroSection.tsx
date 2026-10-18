import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useUIStore } from '@kickzone-workspace/shared-ui-store';
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

  const inkOnPhoto = themeMode === 'dark' ? '#f5f5f7' : '#ffffff';

  const scrim = (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background:
          themeMode === 'dark'
            ? 'linear-gradient(to top, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.15) 28%, transparent 52%), linear-gradient(rgba(0,0,0,0.08), transparent 18%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.10) 28%, transparent 52%), linear-gradient(rgba(0,0,0,0.04), transparent 18%)',
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
        aria-label="Rise Above"
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
                    ? 'brightness(0.95) saturate(0.96)'
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
                  ? 'brightness(0.95) saturate(0.96)'
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
                    ? 'brightness(0.95) saturate(0.96)'
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
            component="h1"
            sx={{
              fontSize: isPhone
                ? 'clamp(52px, 15vw, 72px)'
                : 'clamp(56px, 9.2vw, 136px)',
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-sans)',
              color: inkOnPhoto,
            }}
          >
            <bdi dir="ltr">Rise Above</bdi>
          </Typography>
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
                  themeMode === 'dark'
                    ? 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.24) 0%, transparent 55%)',
              }}
            />
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
                  themeMode === 'dark'
                    ? 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.24) 0%, transparent 55%)',
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
}

export default HeroSection;
