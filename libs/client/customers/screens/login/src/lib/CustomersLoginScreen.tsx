import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid2,
  Link,
  CssBaseline,
  Paper,
} from '@mui/material';
import LockOutlined from '@mui/icons-material/LockOutlined';

export function Login() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
        }}
      >
        <LockOutlined sx={{ fontSize: 40, color: '#FF4500' }} />
        <Typography
          component="h1"
          variant="h5"
          sx={{ mt: 2, color: '#333333' }}
        >
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#FF4500',
              '&:hover': { backgroundColor: '#E63E00' },
            }}
          >
            Sign In
          </Button>
          <Grid2 container justifyContent="flex-end" component="div">
            <Grid2 component="div">
              <Link href="#" variant="body2" sx={{ color: '#FF4500' }}>
                Don't have an account? Sign Up
              </Link>
            </Grid2>
          </Grid2>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
