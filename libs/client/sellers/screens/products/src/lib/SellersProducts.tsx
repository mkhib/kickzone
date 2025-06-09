import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import { useSellersProducts } from '@kickzone-workspace/sellers-products-hooks';
import Grid2 from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

export const SellersProducts = () => {
  const { products, loading, error } = useSellersProducts({});

  return (
    <SellersLayout>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">Error loading products</Typography>
      ) : (
        <Grid2 container spacing={2}>
          {products.map((product: KickzoneGraphqlTypes.Product) => {
            const info = product.productInfos[0];
            return (
              <Grid2 key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    minHeight: 180,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Status:</strong>{' '}
                      {product.archived ? 'Archived' : 'Active'}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Price:</strong> N/A
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Color:</strong> {info?.color?.name ?? 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Categories:</strong>{' '}
                      {product.categories
                        .map((cat: KickzoneGraphqlTypes.Category) => cat.name)
                        .join(', ')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
      )}
    </SellersLayout>
  );
};

export default SellersProducts;
