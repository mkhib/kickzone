import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';

const products = [
  {
    id: 1,
    name: 'Product 1',
    image: '/path/to/image1.jpg',
    description: 'Description of Product 1',
  },
  {
    id: 2,
    name: 'Product 2',
    image: '/path/to/image2.jpg',
    description: 'Description of Product 2',
  },
  // Add more products as needed
];

export function CustomersHome() {
  return (
    <CustomersLayout>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 4, color: '#333333' }}
          >
            Welcome to Kickzone
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {products.map((product) => (
              <Grid
                component="div"
                key={product.id}
                size={{ lg: 6, xl: 6, xs: 12, sm: 12, md: 6 }}
              >
                <Card sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </CustomersLayout>
  );
}

export default CustomersHome;
