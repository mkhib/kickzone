import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { useCustomersResetPassword } from '@kickzone-workspace/customers-auth-hooks';
import { getErrorMessage } from '@kickzone-workspace/translations';
import LockResetOutlined from '@mui/icons-material/LockResetOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { colors } from '@kickzone-workspace/colors';

export function CustomerResetPassword() {
  const { LL } = useI18nContext();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { showSnackbar } = useSnackbar();
  const { handleResetPassword, resetPasswordLoading } =
    useCustomersResetPassword();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      setError('');
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError(LL.authorization.passwordsDoNotMatch());
      return;
    }

    if (!token) {
      setError(LL.authorization.invalidToken());
      return;
    }

    try {
      await handleResetPassword(token, formData.password);
      showSnackbar(LL.authorization.passwordResetSuccess(), {
        severity: 'success',
      });
      navigate(CUSTOMER_ROUTES.PRODUCTS);
    } catch (error) {
      const { translationKey, rawMessage } = getErrorMessage(error as Error);
      const errorMessage = translationKey
        ? LL.errors[translationKey]()
        : rawMessage || LL.authorization.invalidToken();

      setError(errorMessage);
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
          <LockResetOutlined sx={{ fontSize: 40, color: colors.main }} />
          <Typography
            component="h1"
            variant="h5"
            sx={{ mt: 2, mb: 1, color: colors.text }}
          >
            {LL.authorization.resetPassword()}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, textAlign: 'center' }}
          >
            {LL.authorization.enterNewPassword()}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={LL.form.password()}
              type="password"
              id="password"
              autoComplete="new-password"
              autoFocus
              value={formData.password}
              onChange={handleChange('password')}
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
              error={
                !!error && error === LL.authorization.passwordsDoNotMatch()
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={resetPasswordLoading}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: colors.main,
                '&:hover': { backgroundColor: colors.hoverMain },
              }}
            >
              {resetPasswordLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                LL.authorization.resetPassword()
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </CustomersLayout>
  );
}

export default CustomerResetPassword;
