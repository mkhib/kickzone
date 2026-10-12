import React, { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { CustomersProductCard } from '@kickzone-workspace/customers-product-card';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';

interface NewArrivalsSectionProps {
  products: {
    all: KickzoneGraphqlTypes.Product[];
    women: KickzoneGraphqlTypes.Product[];
    men: KickzoneGraphqlTypes.Product[];
  };
  exchangeRate: number;
  onAddToCart?: (product: KickzoneGraphqlTypes.Product) => void;
  onAddVariantToCart?: (variant: {
    product: KickzoneGraphqlTypes.Product;
    productInfo: KickzoneGraphqlTypes.ProductInfo;
    sellerProduct: KickzoneGraphqlTypes.SellerProduct;
  }) => void;
}

export function NewArrivalsSection({
  products,
  exchangeRate,
  onAddToCart,
  onAddVariantToCart,
}: NewArrivalsSectionProps) {
  const { LL } = useI18nContext();
  const [activeTab, setActiveTab] = useState<'all' | 'women' | 'men'>('all');
  const isPhone = useMediaQuery('(max-width: 760px)');

  const tabs = useMemo(
    () => [
      { id: 'all' as const, label: LL.home.newArrivals.all() },
      { id: 'women' as const, label: LL.home.newArrivals.women() },
      { id: 'men' as const, label: LL.home.newArrivals.men() },
    ],
    [LL]
  );

  const displayList =
    activeTab === 'women'
      ? products.women
      : activeTab === 'men'
      ? products.men
      : products.all;

  return (
    <Box
      id="new"
      component="section"
      aria-labelledby="new-arrivals-title"
      sx={{
        width: 'min(var(--wrap, 1180px), 100% - 2 * clamp(20px, 4vw, 48px))',
        mx: 'auto',
        pt: 'clamp(72px, 9vw, 120px)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <Box
        className="rv"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'flex-end' },
          gap: 2,
          mb: '32px',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--accent)',
              letterSpacing: '0.02em',
              mb: 0.5,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {LL.home.newArrivals.kicker()}
          </Typography>
          <Typography
            id="new-arrivals-title"
            component="h2"
            sx={{
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 800,
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {LL.home.newArrivals.title()}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 2, sm: 3 },
            flexWrap: 'wrap',
          }}
        >
          <Box
            role="tablist"
            aria-label={LL.home.newArrivals.filterAria()}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              p: '4px',
              borderRadius: '999px',
              background: 'color-mix(in srgb, var(--ink) 6%, transparent)',
            }}
          >
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <Box
                  key={tab.id}
                  component="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab.id)}
                  sx={{
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: isSelected ? 600 : 500,
                    fontFamily: 'var(--font-sans)',
                    px: '18px',
                    py: '8px',
                    borderRadius: '999px',
                    background: isSelected ? 'var(--paper)' : 'transparent',
                    color: isSelected ? 'var(--ink)' : 'var(--ink-2)',
                    boxShadow: isSelected
                      ? '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px -6px rgba(0,0,0,0.18)'
                      : 'none',
                    transition: 'all 0.25s var(--ease)',
                    '&:hover': {
                      color: 'var(--ink)',
                    },
                  }}
                >
                  {tab.label}
                </Box>
              );
            })}
          </Box>

          <Box
            component={RouterLink}
            to="/shop?sort=newest"
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--accent)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              fontFamily: 'var(--font-sans)',
              transition: 'opacity 0.2s',
              '&:hover': {
                opacity: 0.75,
              },
            }}
          >
            <span>{LL.home.newArrivals.viewAll()}</span>
            <span>←</span>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: isPhone ? '12px' : '28px 24px',
        }}
      >
        {displayList.map((product, idx) => (
          <CustomersProductCard
            key={product.id}
            product={product}
            variant={isPhone ? 'compact' : 'standard'}
            exchangeRate={exchangeRate}
            index={idx}
            onAddToCart={onAddToCart}
            onAddVariantToCart={onAddVariantToCart}
          />
        ))}
      </Box>
    </Box>
  );
}
