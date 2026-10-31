import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { colors } from '@kickzone-workspace/colors';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';
import { mapApolloErrorToTranslationKey } from '@kickzone-workspace/translations';
import LockOutlined from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { PasswordTextField } from '@kickzone-workspace/password-field';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAdminLogin } from '@kickzone-workspace/admins-auth-hooks';
import { getLtrTextFieldProps } from '@kickzone-workspace/language-components';
import type { FieldError } from 'react-hook-form';
import {
  adminLoginFormSchema,
  type AdminLoginFormValues,
} from '@kickzone-workspace/validation';

export function AdminsLogin() {
  const { loginAdmin, adminsLoginLoading, adminsLoginError } = useAdminLogin();
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.adminLogin());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const fieldErrorText = (error: FieldError | undefined): string => {
    if (!error || !error.type) return '';
    return LL.errors.requiredFields();
  };

  const onValidSubmit = async (values: AdminLoginFormValues) => {
    loginAdmin({ email: values.email, password: values.password });
  };

  const getDisplayError = () => {
    if (!adminsLoginError) return null;
    return LL.errors[mapApolloErrorToTranslationKey(adminsLoginError)]();
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
            {LL.authorization.signIn()}
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onValidSubmit)} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={LL.form.email()}
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email ? fieldErrorText(errors.email) : undefined}
              {...register('email')}
              {...getLtrTextFieldProps()}
            />
            <PasswordTextField
              margin="normal"
              required
              fullWidth
              label={LL.form.password()}
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password ? fieldErrorText(errors.password) : undefined}
              {...register('password')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading={adminsLoginLoading}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: colors.main,
                '&:hover': { backgroundColor: colors.hoverMain },
              }}
            >
              {LL.authorization.signIn()}
            </Button>
            {adminsLoginError && (
              <Typography color="error" sx={{ mt: 2 }}>
                {getDisplayError()}
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </AdminsLayout>
  );
}

export default AdminsLogin;