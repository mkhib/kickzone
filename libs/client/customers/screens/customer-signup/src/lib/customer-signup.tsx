import React, { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { useCustomersRegister } from '@kickzone-workspace/customers-auth-hooks';
import { getErrorMessage } from '@kickzone-workspace/translations';
import PersonAddOutlined from '@mui/icons-material/PersonAddOutlined';
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

export function CustomerSignup() {
  const { LL } = useI18nContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar } = useSnackbar();
  const { handleRegister, registerLoading } = useCustomersRegister();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = LL.errors.requiredFields();
    }
    if (!formData.email.trim()) {
      newErrors.email = LL.errors.requiredFields();
    }
    if (!formData.password) {
      newErrors.password = LL.errors.requiredFields();
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = LL.authorization.passwordsDoNotMatch();
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await handleRegister(formData.name, formData.email, formData.password);
      showSnackbar(LL.authorization.registrationSuccess(), {
        severity: 'success',
      });

      // Redirect to the page they were trying to access, or default to PRODUCTS
      const from =
        (location.state as { from?: string })?.from || CUSTOMER_ROUTES.PRODUCTS;
      navigate(from, { replace: true });
    } catch (error) {
      const { translationKey, rawMessage } = getErrorMessage(error as Error);
      const errorMessage = translationKey
        ? LL.errors[translationKey]()
        : rawMessage || LL.authorization.registrationFailed();

      showSnackbar(errorMessage, { severity: 'error' });
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
            marginBottom: 8,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <PersonAddOutlined sx={{ fontSize: 40, color: colors.main }} />
          <Typography
            component="h1"
            variant="h5"
            sx={{ mt: 2, color: colors.text }}
          >
            {LL.authorization.createAccount()}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label={LL.form.fullName()}
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange('name')}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ backgroundColor: colors.accent1, borderRadius: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={LL.form.email()}
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              helperText={errors.email}
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
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange('password')}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ backgroundColor: colors.accent1, borderRadius: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label={LL.authorization.confirmPassword()}
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{ backgroundColor: colors.accent1, borderRadius: 1 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={registerLoading}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: colors.main,
                '&:hover': { backgroundColor: colors.hoverMain },
              }}
            >
              {registerLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                LL.authorization.createAccount()
              )}
            </Button>
            <Grid container justifyContent="flex-end" component="div">
              <Grid component="div">
                <Link
                  component={RouterLink}
                  to={CUSTOMER_ROUTES.LOGIN}
                  state={location.state}
                  variant="body2"
                  sx={{ color: colors.main, textDecoration: 'none' }}
                >
                  {LL.authorization.alreadyHaveAccount()}{' '}
                  {LL.authorization.signIn()}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </CustomersLayout>
  );
}

export default CustomerSignup;
