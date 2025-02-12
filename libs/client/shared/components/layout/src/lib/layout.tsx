import Grid from '@mui/material/Grid2';

interface LayoutProps {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
}

export function Layout({ header, body, footer }: LayoutProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={12} component="div">
        {header}
      </Grid>
      <Grid size={12} component="div">
        {body}
      </Grid>
      <Grid size={12} component="div">
        {footer}
      </Grid>
    </Grid>
  );
}

export default Layout;
