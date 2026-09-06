import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { colors } from '@kickzone-workspace/colors';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';
import LockOutlined from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { PasswordTextField } from '@kickzone-workspace/password-field';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useAdminLogin } from '@kickzone-workspace/admins-auth-hooks';
import { mapApolloErrorToTranslationKey } from '@kickzone-workspace/translations';
import { getLtrTextFieldProps } from '@kickzone-workspace/language-components';

export function AdminsLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAdmin, adminsLoginLoading, adminsLoginError } = useAdminLogin();
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.adminLogin());

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                {LL.errors[mapApolloErrorToTranslationKey(adminsLoginError)]()}
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </AdminsLayout>
  );
}

export default AdminsLogin;
