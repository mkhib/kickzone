import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { useUIStore } from '@kickzone-workspace/shared-ui-store';
import { useCustomersLogin } from '@kickzone-workspace/customers-auth-hooks';
import { getErrorMessage } from '@kickzone-workspace/translations';
import LockOutlined from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { colors } from '@kickzone-workspace/colors';

export function CustomersLogin() {
  const { LL } = useI18nContext();
  const navigate = useNavigate();
  const addToast = useUIStore((state) => state.addToast);
  const { handleLogin, loginLoading } = useCustomersLogin();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await handleLogin(formData.email, formData.password);
      addToast({
        type: 'success',
        title: LL.authorization.signIn(),
        message: LL.messages.welcome(),
      });
      navigate(CUSTOMER_ROUTES.PRODUCTS);
    } catch (error) {
      const { translationKey, rawMessage } = getErrorMessage(error as Error);
      const errorMessage = translationKey
        ? LL.errors[translationKey]()
        : rawMessage || LL.authorization.wrongEmailOrPassword();

      addToast({
        type: 'error',
        title: LL.status.error(),
        message: errorMessage,
      });
    }
  };

  return (
    <CustomersLayout>
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
            {LL.authorization.signIn()}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={LL.form.email()}
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange('email')}
              sx={{ backgroundColor: colors.accent1, borderRadius: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={LL.form.password()}
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange('password')}
              sx={{ backgroundColor: colors.accent1, borderRadius: 1 }}
            />
            <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
              <Grid component="div">
                <Link
                  component={RouterLink}
                  to={CUSTOMER_ROUTES.FORGOT_PASSWORD}
                  variant="body2"
                  sx={{ color: colors.main, textDecoration: 'none' }}
                >
                  {LL.authorization.forgotPassword()}?
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loginLoading}
              sx={{
                mt: 1,
                mb: 2,
                backgroundColor: colors.main,
                '&:hover': { backgroundColor: colors.hoverMain },
              }}
            >
              {loginLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                LL.authorization.signIn()
              )}
            </Button>
            <Grid container justifyContent="flex-end" component="div">
              <Grid component="div">
                <Link
                  component={RouterLink}
                  to={CUSTOMER_ROUTES.SIGNUP}
                  variant="body2"
                  sx={{ color: colors.main, textDecoration: 'none' }}
                >
                  {LL.authorization.dontHaveAccount()}{' '}
                  {LL.authorization.signUp()}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </CustomersLayout>
  );
}

export default CustomersLogin;
