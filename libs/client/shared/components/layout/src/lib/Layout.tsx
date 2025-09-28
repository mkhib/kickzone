import React from 'react';
import Grid from '@mui/material/Grid';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { Snackbar } from '@kickzone-workspace/snackbar';
import Box from '@mui/material/Box';

type LayoutProps = ILayoutProps & {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
  loadingComponent?: React.ReactNode;
};

export interface ILayoutProps {
  isLoading?: boolean;
}

export function Layout({
  header,
  body,
  footer,
  isLoading = false,
  loadingComponent,
}: LayoutProps) {
  const { handleClose, open, message, severity, progress } = useSnackbar();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        {header}
      </Box>
      <Box sx={{ flex: 1, pt: 8 }}>
        {' '}
        {/* Add top padding to account for fixed header */}
        <Grid container spacing={2}>
          <Grid size={12} component="div">
            {isLoading ? loadingComponent : body}
          </Grid>
        </Grid>
      </Box>
      <Box>{footer}</Box>
      <Snackbar
        open={open}
        message={message}
        severity={severity}
        progress={progress}
        onClose={handleClose}
      />
    </Box>
  );
}

export default Layout;
