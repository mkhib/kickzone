import Grid from '@mui/material/Grid2';

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
  return (
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
  );
}

export default Layout;
