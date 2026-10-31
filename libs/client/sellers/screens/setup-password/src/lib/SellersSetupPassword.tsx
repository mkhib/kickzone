import { SellersLayout } from '@kickzone-workspace/sellers-layout';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSetupPassword } from '@kickzone-workspace/sellers-auth-hooks';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';
import { PasswordTextField } from '@kickzone-workspace/password-field';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  sellerSetupPasswordFormSchema,
  type SellerSetupPasswordFormValues,
} from '@kickzone-workspace/validation';

export const SellersSetupPassword = () => {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.sellerSetupPassword());
  const { token } = useParams();
  const [error, setError] = useState('');
  const { setupPassword, setupPasswordLoading, setupPasswordError } =
    useSetupPassword();

  const {
    register,
    handleSubmit,
  } = useForm<SellerSetupPasswordFormValues>({
    resolver: zodResolver(sellerSetupPasswordFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onValidSubmit = async (values: SellerSetupPasswordFormValues) => {
    if (token) {
      setupPassword(token, values.password);
    }
  };

  const onInvalidSubmit = (errors: Record<string, unknown>) => {
    // Check for confirmPassword mismatch first (priority)
    const confirmPasswordError = errors.confirmPassword as
      | { type?: string; message?: string }
      | undefined;
    if (
      confirmPasswordError &&
      confirmPasswordError.type === 'custom' &&
      confirmPasswordError.message === 'passwordsDoNotMatch'
    ) {
      setError(LL.authorization.passwordsDoNotMatch());
      return;
    }

    // Check for password issues (too_small, etc.)
    const passwordError = errors.password as
      | { type?: string; message?: string }
      | undefined;
    if (passwordError && passwordError.type === 'too_small') {
      setError(LL.authorization.passwordTooShort());
      return;
    }

    // Fallback
    setError(LL.errors.requiredFields());
  };

  return (
    <SellersLayout>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 2,
              backgroundColor: 'background.paper',
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <LockOutlinedIcon sx={{ color: 'white' }} />
            </Box>

            <Typography
              component="h1"
              variant="h5"
              sx={{ mb: 3, fontWeight: 600 }}
            >
              {LL.authorization.setupPasswordTitle()}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, textAlign: 'center' }}
            >
              {LL.authorization.setupPasswordDescription()}
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
              noValidate
              sx={{ width: '100%' }}
            >
              <Grid container spacing={2}>
                <Grid size={12}>
                  <PasswordTextField
                    required
                    fullWidth
                    label={LL.authorization.newPassword()}
                    {...register('password', { onChange: () => setError('') })}
                  />
                </Grid>
                <Grid size={12}>
                  <PasswordTextField
                    required
                    fullWidth
                    label={LL.authorization.confirmNewPassword()}
                    error={!!error && error === LL.authorization.passwordsDoNotMatch()}
                    {...register('confirmPassword', { onChange: () => setError('') })}
                  />
                </Grid>
              </Grid>

              {(error || setupPasswordError) && (
                <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                  {error || setupPasswordError?.message}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={setupPasswordLoading}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                {setupPasswordLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  LL.authorization.setPassword()
                )}
              </Button>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2, textAlign: 'center' }}
              >
                {LL.authorization.passwordRequirements()}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </SellersLayout>
  );
};

export default SellersSetupPassword;