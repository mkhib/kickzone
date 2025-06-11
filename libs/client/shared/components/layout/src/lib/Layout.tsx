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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box>{header}</Box>
      <Box>
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
