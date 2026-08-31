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
          backgroundColor: isDark ? '#0b0b0f' : '#f5f5f5',
          borderTop: isDark
            ? '1px solid rgba(255, 255, 255, 0.12)'
            : '1px solid #e0e0e0',
          color: isDark ? '#f5f5f5' : 'inherit',
          padding: 2,
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
