import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import { useSellersProducts } from '@kickzone-workspace/sellers-products-hook';
import Grid2 from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const SellersProducts = () => {
  const { products, loading, error } = useSellersProducts({});

  return (
    <SellersLayout>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">Error loading products</Typography>
      ) : (
        <Grid2 container spacing={2}>
          {products.map((product) => {
            const info = product.productInfos[0];
            return (
              <Grid2 key={product.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2">
                      Status: {product.archived ? 'Archived' : 'Active'}
                    </Typography>
                    <Typography variant="body2">
                      Price: {info?.price ?? 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                      Color: {info?.color?.name ?? 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                      Categories:{' '}
                      {product.categories.map((cat) => cat.name).join(', ')}
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
