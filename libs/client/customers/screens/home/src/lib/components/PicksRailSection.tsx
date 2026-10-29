import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { CustomersProductCard } from '@kickzone-workspace/customers-product-card';
import { getCustomerProductDetailsRoute } from '@kickzone-workspace/customers-routes';
import {
  useI18nContext,
  useLanguageContext,
} from '@kickzone-workspace/shared-i18n';

interface PicksRailSectionProps {
  products: KickzoneGraphqlTypes.Product[];
  exchangeRate: number;
  onAddItem?: (product: KickzoneGraphqlTypes.Product, size?: string) => void;
}

export function PicksRailSection({
  products,
  exchangeRate,
  onAddItem,
}: PicksRailSectionProps) {
  const { LL } = useI18nContext();
  const { isRTL } = useLanguageContext();
  const navigate = useNavigate();
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollPrev = () => {
    if (!railRef.current) return;
    const step = railRef.current.clientWidth * 0.75;
    railRef.current.scrollBy({
      left: isRTL ? step : -step,
      behavior: 'smooth',
    });
  };

  const scrollNext = () => {
    if (!railRef.current) return;
    const step = railRef.current.clientWidth * 0.75;
    railRef.current.scrollBy({
      left: isRTL ? -step : step,
      behavior: 'smooth',
    });
  };

  if (!products || products.length === 0) return null;

  return (
    <Box
      component="section"
      id="picks"
      aria-labelledby="picks-heading"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <Box
        className="rv"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          maxWidth: 1280,
          margin: '0 auto',
          px: { xs: 2.5, sm: 4, md: 6 },
          mb: { xs: 3.5, md: 5 },
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              color: 'var(--accent)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              mb: 1,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {LL.home.picks.kicker()}
          </Typography>
          <Typography
            id="picks-heading"
            component="h2"
            sx={{
              fontFamily: 'var(--font-sans)',
              fontSize: { xs: '26px', sm: '32px', md: '38px' },
              fontWeight: 800,
              color: 'var(--ink)',
              lineHeight: 1.25,
            }}
          >
            {LL.home.picks.title()}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
          }}
        >
          <IconButton
            onClick={scrollPrev}
            aria-label={LL.home.picks.prev()}
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: 'var(--paper)',
              color: 'var(--ink)',
              border: '1px solid var(--hair)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'var(--page)',
                borderColor: 'var(--ink-3)',
                transform: 'scale(1.05)',
              },
            }}
          >
            {isRTL ? (
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            ) : (
              <ArrowBackIcon sx={{ fontSize: 18 }} />
            )}
          </IconButton>

          <IconButton
            onClick={scrollNext}
            aria-label={LL.home.picks.next()}
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: 'var(--paper)',
              color: 'var(--ink)',
              border: '1px solid var(--hair)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'var(--page)',
                borderColor: 'var(--ink-3)',
                transform: 'scale(1.05)',
              },
            }}
          >
            {isRTL ? (
              <ArrowBackIcon sx={{ fontSize: 18 }} />
            ) : (
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            )}
          </IconButton>
        </Box>
      </Box>

      {/* Horizontal Rail */}
      <Box
        ref={railRef}
        data-testid="picks-rail"
        tabIndex={0}
        aria-label={LL.home.picks.title()}
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: {
            xs: '78%',
            sm: '46%',
            md: 'clamp(260px, 22vw, 300px)',
          },
          gap: { xs: '16px', md: '24px' },
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          px: {
            xs: '20px',
            md: 'max(24px, calc((100% - 1180px) / 2))',
          },
          scrollPaddingInline: {
            xs: '20px',
            md: 'max(24px, calc((100% - 1180px) / 2))',
          },
          py: 2,
          outline: 'none',
          '&:focus-visible': {
            outline: '2px solid var(--focus)',
            outlineOffset: '2px',
          },
        }}
      >
        {products.map((prod, idx) => (
          <Box
            key={prod.id}
            sx={{
              scrollSnapAlign: 'start',
              height: '100%',
              display: 'flex',
            }}
          >
            <CustomersProductCard
              appearance="glass"
              product={prod}
              exchangeRate={exchangeRate}
              index={idx}
              onCardClick={(p) => {
                navigate(getCustomerProductDetailsRoute(p.id));
              }}
              onAddToCart={(p) => {
                const size = p.productInfos?.[0]?.size || undefined;
                onAddItem?.(p, size);
              }}
              onAddVariantToCart={({ product: p, productInfo }) => {
                onAddItem?.(p, productInfo.size || undefined);
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default PicksRailSection;
