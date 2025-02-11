import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '@kickzone-workspace/customers-auth-context';

export function Headerbar() {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333333' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Kickzone
        </Typography>
        <Button color="inherit" href="/home">
          Home
        </Button>
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user.name}
            </Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button color="inherit" href="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Headerbar;
