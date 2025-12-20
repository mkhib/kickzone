import React from 'react';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function CustomersFooter() {
  const { LL } = useI18nContext();

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        borderTop: '1px solid #e0e0e0',
        padding: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 {LL.appNames.siteName()}
      </Typography>
    </Box>
  );
}

export default CustomersFooter;
