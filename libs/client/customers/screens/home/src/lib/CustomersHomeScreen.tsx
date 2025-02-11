import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CssBaseline,
  Box,
} from '@mui/material';

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

export function Home() {
  return (
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
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
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
  );
}

export default Home;
