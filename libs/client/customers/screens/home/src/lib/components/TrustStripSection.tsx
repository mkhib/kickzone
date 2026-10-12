import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';

export function TrustStripSection() {
  const { LL } = useI18nContext();

  const items = useMemo(
    () => [
      {
        icon: (
          <VerifiedUserOutlinedIcon
            sx={{ fontSize: 28, color: 'var(--accent)' }}
          />
        ),
        title: LL.home.trust.authenticityTitle(),
        line: LL.home.trust.authenticityLine(),
      },
      {
        icon: (
          <CreditCardOutlinedIcon
            sx={{ fontSize: 28, color: 'var(--accent)' }}
          />
        ),
        title: LL.home.trust.paymentTitle(),
        line: LL.home.trust.paymentLine(),
      },
    ],
    [LL]
  );

  return (
    <Box
      component="section"
      aria-label={LL.home.trust.ariaLabel()}
      className="rv"
      sx={{
        mt: 'clamp(80px, 9vw, 120px)',
        borderTop: '1px solid var(--hair)',
        borderBottom: '1px solid var(--hair)',
        bgcolor: 'var(--paper)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        }}
      >
        {items.map((item, idx) => (
          <Box
            key={item.title}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              py: { xs: 4, md: 5 },
              px: { xs: 2.5, md: 3 },
              borderInlineStart: {
                xs: 'none',
                md: idx > 0 ? '1px solid var(--hair)' : 'none',
              },
              borderTop: {
                xs: idx > 0 ? '1px solid var(--hair)' : 'none',
                md: 'none',
              },
            }}
          >
            <Box
              sx={{
                mb: 1.5,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </Box>
            <Typography
              component="h3"
              sx={{
                fontSize: '17px',
                fontWeight: 700,
                color: 'var(--ink)',
                mb: 0.75,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {item.title}
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                color: 'var(--ink-3)',
                fontWeight: 400,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {item.line}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default TrustStripSection;
