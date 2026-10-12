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
  bottomBar?: React.ReactNode;
};

export interface ILayoutProps {
  isLoading?: boolean;
  disablePadding?: boolean;
}

export function Layout({
  header,
  body,
  footer,
  isLoading = false,
  disablePadding = false,
  loadingComponent,
  bottomBar,
}: LayoutProps) {
  const { handleClose, open, message, severity, progress } = useSnackbar();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        // Ensure the layout doesn't interfere with the gradient background
        background: 'transparent',
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar + 1,
        }}
      >
        {header}
      </Box>
      <Box
        sx={{
          flex: 1,
          pt: disablePadding ? 0 : 10,
          px: disablePadding ? 0 : { xs: 2, sm: 3, md: 4 },
          pb: disablePadding ? 0 : bottomBar ? { xs: 11, sm: 4 } : 4,
        }}
      >
        {disablePadding ? (
          isLoading ? loadingComponent : body
        ) : (
          <Grid container spacing={2}>
            <Grid size={12} component="div">
              {isLoading ? loadingComponent : body}
            </Grid>
          </Grid>
        )}
      </Box>
      <Box sx={{ pb: bottomBar ? { xs: 9, sm: 0 } : 0 }}>{footer}</Box>
      {bottomBar && (
        <Box
          component="aside"
          sx={{
            display: { xs: 'block', sm: 'none' },
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: (theme) => theme.zIndex.appBar,
          }}
        >
          {bottomBar}
        </Box>
      )}
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
