import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { useCustomersForgotPassword } from '@kickzone-workspace/customers-auth-hooks';
import { getErrorMessage } from '@kickzone-workspace/translations';
import LockResetOutlined from '@mui/icons-material/LockResetOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

export function CustomerForgotPassword() {
  const { LL } = useI18nContext();
  const { showSnackbar } = useSnackbar();
  const { handleForgotPassword, forgotPasswordLoading } =
    useCustomersForgotPassword();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      showSnackbar(LL.errors.requiredFields(), { severity: 'error' });
      return;
    }

    try {
      const baseUrl = window.location.origin;
      await handleForgotPassword(email.trim(), baseUrl);

      setSubmitted(true);
      showSnackbar(LL.authorization.resetLinkSent(), { severity: 'success' });
    } catch (error) {
      const { translationKey, rawMessage } = getErrorMessage(error as Error);
      const errorMessage = translationKey
        ? LL.errors[translationKey]()
        : rawMessage || LL.errors.unknown();

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
            {LL.authorization.resetYourPassword()}
          </Typography>

          {submitted ? (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                {LL.authorization.resetLinkSent()}
              </Alert>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {LL.checkout.orderProcessed()}
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                component={RouterLink}
                to={CUSTOMER_ROUTES.LOGIN}
                startIcon={<ArrowBackIcon />}
                sx={{
                  borderColor: colors.main,
                  color: colors.main,
                  textDecoration: 'none',
                  '&:hover': {
                    borderColor: colors.hoverMain,
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                {LL.authorization.backToLogin()}
              </Button>
            </Box>
          ) : (
            <>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2, mb: 3, textAlign: 'center' }}
              >
                {LL.authorization.enterEmailForReset()}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1, width: '100%' }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={LL.form.email()}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={forgotPasswordLoading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: colors.main,
                    '&:hover': { backgroundColor: colors.hoverMain },
                  }}
                >
                  {forgotPasswordLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    LL.authorization.sendResetLink()
                  )}
                </Button>
                <Button
                  fullWidth
                  variant="text"
                  component={RouterLink}
                  to={CUSTOMER_ROUTES.LOGIN}
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    color: colors.main,
                    textDecoration: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  {LL.authorization.backToLogin()}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </CustomersLayout>
  );
}

export default CustomerForgotPassword;
