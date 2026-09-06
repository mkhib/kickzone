import React, { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { useCustomersLogin } from '@kickzone-workspace/customers-auth-hooks';
import { getErrorMessage } from '@kickzone-workspace/translations';
import LockOutlined from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { PasswordTextField } from '@kickzone-workspace/password-field';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import { colors } from '@kickzone-workspace/colors';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import { getLtrTextFieldProps } from '@kickzone-workspace/language-components';

export function CustomersLogin() {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.login());
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar } = useSnackbar();
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

      showSnackbar(LL.messages.welcome(), { severity: 'success' });

      // Redirect to the page they were trying to access, or default to PRODUCTS
      const from =
        (location.state as { from?: string })?.from || CUSTOMER_ROUTES.PRODUCTS;
      navigate(from, { replace: true });
    } catch (error) {
      const { translationKey, rawMessage } = getErrorMessage(error as Error);
      const errorMessage = translationKey
        ? LL.errors[translationKey]()
        : rawMessage || LL.authorization.wrongEmailOrPassword();

      showSnackbar(errorMessage, { severity: 'error' });
    }
  };

  return (
    <CustomersLayout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <GlassmorphismContainer
          wrapperSx={{ p: 0, mt: 8, mb: 8 }}
          containerSx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            p: 4,
            width: '100%',
          }}
        >
          <LockOutlined sx={{ fontSize: 40, color: colors.main }} />
          <Typography
            component="h1"
            variant="h5"
            sx={{
              mt: 2,
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#ffffff' : colors.text,
            }}
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
              {...getLtrTextFieldProps()}
            />
            <PasswordTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={LL.form.password()}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange('password')}
            />
            <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
              <Grid component="div">
                <Link
                  component={RouterLink}
                  to={CUSTOMER_ROUTES.FORGOT_PASSWORD}
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': { color: 'primary.dark' },
                  }}
                >
                  {LL.authorization.forgotPassword()}
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading={loginLoading}
              sx={{
                mt: 1,
                mb: 2,
                backgroundColor: colors.main,
                '&:hover': { backgroundColor: colors.hoverMain },
              }}
            >
              {LL.authorization.signIn()}
            </Button>
            <Grid container justifyContent="flex-end" component="div">
              <Grid component="div">
                <Link
                  component={RouterLink}
                  to={CUSTOMER_ROUTES.SIGNUP}
                  state={location.state}
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': { color: 'primary.dark' },
                  }}
                >
                  {LL.authorization.dontHaveAccount()}{' '}
                  {LL.authorization.signUp()}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </GlassmorphismContainer>
      </Container>
    </CustomersLayout>
  );
}

export default CustomersLogin;
