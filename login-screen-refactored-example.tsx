/*
 * Example of how the login screen could be refactored using the new design system
 * This demonstrates the application of consistent design tokens and reusable components
 */

import React, { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { useCustomersLogin } from '@kickzone-workspace/customers-auth-hooks';
import { getErrorMessage } from '@kickzone-workspace/translations';

// Import our new design system components
import { Glassmorphism } from './glassmorphism';
import { Typography } from './typography';
import { Button } from './button';
import { Input } from './input';
import { LockOutlined, ArrowForwardRounded, ArrowBackRounded, PersonAddOutlined } from '@mui/icons-material';

// Import design tokens for colors if needed
import { colors } from './design-tokens';

export function CustomersLoginRefactored() {
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

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await handleLogin(formData.email, formData.password);
      showSnackbar(LL.messages.welcome(), { severity: 'success' });

      // Redirect to the page they were trying to access, or default to PRODUCTS
      const from = (location.state as { from?: string })?.from || CUSTOMER_ROUTES.PRODUCTS;
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
    <Glassmorphism
      padding={4}
      className="login-container"
      // Assuming we have access to theme context to determine dark mode
      // isDark={useTheme().palette.mode === 'dark'}
    >
      {/* Brand and Header */}
      <Typography variant="h5" className="mb-6" textAlign="center">
        {LL.authorization.signIn()}
      </Typography>

      <Typography variant="body2" className="mb-8" textAlign="center" color="textSecondary">
        {LL.authorization.welcomeBack()}
      </Typography>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label={LL.form.email()}
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange('email')}
          type="email"
          autoComplete="email"
          autoFocus
          required
        />

        <Input
          label={LL.form.password()}
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange('password')}
          type="password"
          autoComplete="current-password"
          required
        />

        {/* Forgot Password Link */}
        <div className="text-right">
          <Button
            variant="ghost"
            size="sm"
            component={RouterLink}
            to={CUSTOMER_ROUTES.FORGOT_PASSWORD}
            state={location.state}
          >
            {LL.authorization.forgotPassword()}
          </Button>
        </div>

        {/* Submit Button */}
        <Button
          variant="primary"
          type="submit"
          loading={loginLoading}
          className="w-full"
        >
          {loginLoading ? LL.authorization.signingIn() : LL.authorization.signIn()}
        </Button>

        {/* Divider or Social Login */}
        <div className="mt-8 flex items-center">
          <div className="flex-1 border-t border-borderSubtle" />
          <span className="mx-4 text-textCaption">
            {LL.authorization.orContinueWith}
          </span>
          <div className="flex-1 border-t border-borderSubtle" />
        </div>

        {/* Social Login Buttons */}
        <div className="mt-6 space-y-3">
          <Button
            variant="outline"
            startIcon={<LockOutlined sx={{ fontSize: 20 }} />}
          >
            {LL.authorization.continueWithEmail}
          </Button>

          <Button
            variant="outline"
            startIcon={<PersonAddOutlined sx={{ fontSize: 20 }} />}
            component={RouterLink}
            to={CUSTOMER_ROUTES.SIGNUP}
            state={location.state}
          >
            {LL.authorization.createAccount}
          </Button>
        </div>
      </form>
    </Glassmorphism>
  );
}

export default CustomersLoginRefactored;