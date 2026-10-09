import React from 'react';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function CustomersFooter() {
  const { LL } = useI18nContext();

  return (
    <Box
      sx={(theme) => {
        const isDark = theme.palette.mode === 'dark';
        return {
          backgroundColor: isDark
            ? 'rgba(18, 18, 16, 0.78)'
            : 'rgba(250, 248, 244, 0.82)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderTop: isDark
            ? '1px solid rgba(240, 239, 235, 0.08)'
            : '1px solid rgba(0, 0, 0, 0.06)',
          color: isDark ? '#f4f4f2' : '#181816',
          py: 2.5,
          px: { xs: 2.5, md: 4 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        };
      }}
    >
      <Typography
        variant="body2"
        sx={(theme) => ({
          color: theme.palette.mode === 'dark' ? '#f5f5f5' : 'text.secondary',
        })}
      >
        © {new Date().getFullYear()} {LL.appNames.siteName()}
      </Typography>
    </Box>
  );
}

export default CustomersFooter;
