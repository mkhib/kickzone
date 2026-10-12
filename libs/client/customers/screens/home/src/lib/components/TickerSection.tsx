import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';

export function TickerSection() {
  const { LL } = useI18nContext();

  const items = useMemo(
    () => [
      { isBrand: false, text: LL.home.trust.authenticityLine() },
      { isBrand: false, text: LL.home.trust.paymentLine() },
      { isBrand: false, text: LL.home.hero.collection() },
    ],
    [LL]
  );

  const renderItemContent = (item: (typeof items)[0], keyPrefix: string) => (
    <Box
      key={`${keyPrefix}-${item.text}`}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '24px',
        mx: '16px',
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <span>{item.text}</span>
      <Box
        sx={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          flexShrink: 0,
        }}
      />
    </Box>
  );

  return (
    <Box
      component="section"
      role="region"
      aria-label={LL.home.trust.ariaLabel()}
      className="ticker-mask"
      sx={{
        height: '48px',
        backgroundColor: 'var(--ink)',
        color: 'var(--page)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        fontSize: '14px',
        fontWeight: 500,
        position: 'relative',
        userSelect: 'none',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <Box className="ticker-track">
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          {items.map((item) => renderItemContent(item, 'copy1'))}
        </Box>

        <Box
          aria-hidden="true"
          sx={{ display: 'inline-flex', alignItems: 'center' }}
        >
          {items.map((item) => renderItemContent(item, 'copy2'))}
        </Box>
      </Box>
    </Box>
  );
}

export default TickerSection;
