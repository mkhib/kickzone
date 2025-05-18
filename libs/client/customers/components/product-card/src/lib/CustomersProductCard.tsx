import React, { useCallback } from 'react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const PRODUCT_IMAGE_PLACEHOLDER =
  'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F10%2Fair-jordan-1-high-og-rebellionaire-closer-look-release-info-555088-036-000.jpg?w=960&cbr=1&q=90&fit=max';

interface ProductCardProps {
  product: KickzoneGraphqlTypes.Product;
  onAddToCart: (product: KickzoneGraphqlTypes.Product) => void;
}

export const CustomersProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const firstInfo = product.productInfos?.[0];
  const image = firstInfo?.images?.[0] || PRODUCT_IMAGE_PLACEHOLDER;

  const handleAddToCartClick = useCallback(() => {
    onAddToCart(product);
  }, [onAddToCart, product]);

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: 4,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.03)',
          boxShadow: '0 16px 40px 0 rgba(31, 38, 135, 0.18)',
        },
        background: 'linear-gradient(135deg, #f8fafc 80%, #e3eafc 100%)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 380,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={product.name}
        sx={{
          objectFit: 'cover',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          background: '#f0f0f0',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: 600, color: '#222' }}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.categories?.map((cat) => cat.name).join(', ')}
        </Typography>
        {firstInfo && (
          <>
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{ fontWeight: 500 }}
            >
              ${firstInfo.price?.toFixed(2)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Color: {firstInfo.color ? firstInfo.color.name : 'N/A'}
            </Typography>
          </>
        )}
      </CardContent>
      <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          sx={{
            borderRadius: 3,
            fontWeight: 600,
            boxShadow: 'none',
            textTransform: 'none',
            background: 'linear-gradient(90deg, #4f8cff 60%, #3358ff 100%)',
          }}
          onClick={handleAddToCartClick}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default CustomersProductCard;
