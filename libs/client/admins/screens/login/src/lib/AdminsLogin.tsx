import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { colors } from '@kickzone-workspace/colors';
import LockOutlined from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid2 from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useAdminLogin } from './useAdminLogin';

export function AdminsLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAdmin, adminsLoginLoading, adminsLoginError } = useAdminLogin();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginAdmin({ email, password });
  };

  return (
    <AdminsLayout>
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
          <LockOutlined sx={{ fontSize: 40, color: colors.main }} />
          <Typography
            component="h1"
            variant="h5"
            sx={{ mt: 2, color: colors.text }}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ backgroundColor: colors.accent1, borderRadius: 1 }}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ backgroundColor: colors.accent1, borderRadius: 1 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={adminsLoginLoading}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: colors.main,
                '&:hover': { backgroundColor: colors.hoverMain },
              }}
            >
              {adminsLoginLoading ? 'Logging in...' : 'Sign In'}
            </Button>
            {adminsLoginError && (
              <Typography color="error" sx={{ mt: 2 }}>
                {adminsLoginError.message}
              </Typography>
            )}
            <Grid2 container justifyContent="flex-end" component="div">
              <Grid2 component="div">
                <Link href="#" variant="body2" sx={{ color: colors.main }}>
                  Don't have an account? Sign Up
                </Link>
              </Grid2>
            </Grid2>
          </Box>
        </Paper>
      </Container>
    </AdminsLayout>
  );
}

export default AdminsLogin;
