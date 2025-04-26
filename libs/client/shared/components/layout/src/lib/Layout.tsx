import React from 'react';
import Grid from '@mui/material/Grid2';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { Snackbar } from '@kickzone-workspace/snackbar';

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
    <>
      <Grid container spacing={2}>
        <Grid size={12} component="div">
          {header}
        </Grid>
        <Grid size={12} component="div">
          {isLoading ? loadingComponent : body}
        </Grid>
        <Grid size={12} component="div">
          {footer}
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        message={message}
        severity={severity}
        progress={progress}
        onClose={handleClose}
      />
    </>
  );
}

export default Layout;
