import React from 'react';
import { Box, Typography } from '@mui/material';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';

export function AdminSellerOrders() {
  return (
    <AdminsLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          All Seller Orders
        </Typography>
        <Typography variant="body1">
          Admin seller orders screen with filtering capabilities will be
          implemented here.
        </Typography>
      </Box>
    </AdminsLayout>
  );
}

export default AdminSellerOrders;
