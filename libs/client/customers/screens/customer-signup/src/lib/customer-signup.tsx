import React, { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { useCustomersRegister } from '@kickzone-workspace/customers-auth-hooks';
import { getErrorMessage } from '@kickzone-workspace/translations';
import PersonAddOutlined from '@mui/icons-material/PersonAddOutlined';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { PasswordTextField } from '@kickzone-workspace/password-field';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import { getLtrTextFieldProps } from '@kickzone-workspace/language-components';

export function CustomerSignup() {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.signup());
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar } = useSnackbar();
  const { handleRegister, registerLoading } = useCustomersRegister();
  const theme = useTheme();

  const isDark = theme.palette.mode === 'dark';
  const isRtl = theme.direction === 'rtl';

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
    } else if (formData.password.length < 8) {
      newErrors.password = LL.authorization.passwordTooShort();
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

      // Redirect to the page they were trying to access, or default to home
      const from =
        (location.state as { from?: string })?.from || CUSTOMER_ROUTES.HOME;
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
      <Box
        sx={{
          minHeight: 'calc(100vh - 120px)',
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: { xs: 8, sm: 10 },
          pb: { xs: 8, sm: 10 },
          px: 2,
          overflow: 'hidden',
        }}
      >
        {/* Ambient liquid lighting glow orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '5%', md: '10%' },
            right: { xs: '-5%', md: '15%' },
            width: { xs: 260, sm: 400, md: 480 },
            height: { xs: 260, sm: 400, md: 480 },
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(197, 184, 154, 0.15) 0%, rgba(197, 184, 154, 0.02) 65%, transparent 70%)'
              : 'radial-gradient(circle, rgba(230, 215, 185, 0.55) 0%, rgba(240, 230, 205, 0.2) 60%, transparent 70%)',
            filter: 'blur(70px)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'floatOrb 14s ease-in-out infinite alternate',
            '@keyframes floatOrb': {
              '0%': { transform: 'translate(0, 0) scale(1)' },
              '100%': { transform: 'translate(-30px, 35px) scale(1.08)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: '5%', md: '8%' },
            left: { xs: '-5%', md: '12%' },
            width: { xs: 240, sm: 380, md: 440 },
            height: { xs: 240, sm: 380, md: 440 },
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(140, 120, 80, 0.12) 0%, rgba(100, 85, 55, 0.02) 65%, transparent 70%)'
              : 'radial-gradient(circle, rgba(245, 230, 215, 0.5) 0%, rgba(240, 220, 200, 0.18) 60%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'floatOrb2 16s ease-in-out infinite alternate',
            '@keyframes floatOrb2': {
              '0%': { transform: 'translate(0, 0) scale(1)' },
              '100%': { transform: 'translate(35px, -25px) scale(1.06)' },
            },
          }}
        />

        <Container
          component="main"
          maxWidth="xs"
          sx={{ position: 'relative', zIndex: 1, p: 0 }}
        >
          <CssBaseline />
          <GlassmorphismContainer
            wrapperSx={{
              p: 0,
              width: '100%',
              maxWidth: 460,
              mx: 'auto',
            }}
            containerSx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '28px !important',
              p: { xs: 3, sm: 4.5 },
              width: '100%',
              backgroundColor: isDark
                ? 'rgba(24, 24, 22, 0.82) !important'
                : 'rgba(255, 255, 255, 0.88) !important',
              backgroundImage: isDark
                ? 'linear-gradient(145deg, rgba(28, 28, 24, 0.85) 0%, rgba(20, 20, 18, 0.75) 50%, rgba(15, 15, 14, 0.85) 100%) !important'
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.92) 0%, rgba(250, 248, 244, 0.80) 50%, rgba(245, 242, 236, 0.88) 100%) !important',
              border: isDark
                ? '1px solid rgba(240, 239, 235, 0.12) !important'
                : '1px solid rgba(255, 255, 255, 0.9) !important',
              backdropFilter: 'blur(28px) saturate(190%) !important',
              WebkitBackdropFilter: 'blur(28px) saturate(190%) !important',
              boxShadow: isDark
                ? '0 24px 64px -12px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 2px 0 rgba(255, 255, 255, 0.14), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.3) !important'
                : '0 24px 60px -12px rgba(180, 165, 140, 0.25), 0 0 0 1px rgba(143, 132, 104, 0.1), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 1px 0 rgba(143, 132, 104, 0.08) !important',
            }}
          >
            {/* Specular top edge highlight */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: '12%',
                right: '12%',
                height: '1px',
                background: isDark
                  ? 'linear-gradient(90deg, transparent 0%, rgba(197, 184, 154, 0.6) 50%, transparent 100%)'
                  : 'linear-gradient(90deg, transparent 0%, rgba(143, 132, 104, 0.45) 50%, transparent 100%)',
                filter: 'blur(0.5px)',
              }}
            />

            {/* Floating Liquid Glass Icon Badge */}
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isDark
                  ? 'linear-gradient(135deg, rgba(197, 184, 154, 0.22) 0%, rgba(197, 184, 154, 0.06) 100%)'
                  : 'linear-gradient(135deg, rgba(168, 152, 112, 0.22) 0%, rgba(168, 152, 112, 0.08) 100%)',
                border: isDark
                  ? '1px solid rgba(197, 184, 154, 0.4)'
                  : '1px solid rgba(143, 132, 104, 0.35)',
                boxShadow: isDark
                  ? '0 12px 28px -4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(197, 184, 154, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3)'
                  : '0 10px 24px -4px rgba(168, 152, 112, 0.25), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                color: isDark ? '#c5b89a' : '#7c6d48',
                mb: 2,
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px) scale(1.03)',
                  boxShadow: isDark
                    ? '0 14px 32px -4px rgba(197, 184, 154, 0.3), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.4)'
                    : '0 12px 28px -4px rgba(168, 152, 112, 0.35), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95)',
                },
              }}
            >
              <PersonAddOutlined sx={{ fontSize: 30 }} />
            </Box>

            {/* Brand Sub-label */}
            <Typography
              variant="caption"
              sx={{
                textTransform: 'uppercase',
                letterSpacing: '0.24em',
                fontWeight: 700,
                fontSize: '0.72rem',
                color: isDark ? '#c5b89a' : '#8f8468',
                mb: 0.75,
              }}
            >
              SAINTBALA
            </Typography>

            {/* Main Title Heading */}
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: isRtl ? 0 : '-0.02em',
                fontSize: { xs: '1.6rem', sm: '1.8rem' },
                color: isDark ? '#f0efeb' : '#1a1a19',
                textAlign: 'center',
                mb: 1,
              }}
            >
              {LL.authorization.createAccount()}
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="body2"
              sx={{
                color: isDark ? '#a8a69f' : '#6b7280',
                textAlign: 'center',
                maxWidth: 320,
                mb: 3,
                fontSize: '0.86rem',
                lineHeight: 1.5,
              }}
            >
              {isRtl
                ? 'برای تجربه خرید سفارشی و خدمات لوکس به ما بپیوندید'
                : 'Join the bespoke experience and explore our curated collections.'}
            </Typography>

            {/* Liquid Frosted Tab Switcher */}
            <Box
              sx={{
                width: '100%',
                p: '4px',
                mb: 3,
                borderRadius: '9999px',
                display: 'flex',
                backgroundColor: isDark
                  ? 'rgba(255, 255, 255, 0.04)'
                  : 'rgba(0, 0, 0, 0.04)',
                border: isDark
                  ? '1px solid rgba(240, 239, 235, 0.08)'
                  : '1px solid rgba(26, 26, 25, 0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <Button
                component={RouterLink}
                to={CUSTOMER_ROUTES.LOGIN}
                state={location.state}
                disableRipple
                sx={{
                  flex: 1,
                  py: 0.85,
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  letterSpacing: '0.01em',
                  transition: 'all 0.25s ease',
                  backgroundColor: 'transparent',
                  color: isDark ? '#a8a69f' : '#6b7280',
                  border: '1px solid transparent',
                  '&:hover': {
                    backgroundColor: isDark
                      ? 'rgba(255, 255, 255, 0.04)'
                      : 'rgba(0, 0, 0, 0.03)',
                    color: isDark ? '#f0efeb' : '#1a1a19',
                  },
                }}
              >
                {LL.authorization.signIn()}
              </Button>

              <Button
                component={RouterLink}
                to={CUSTOMER_ROUTES.SIGNUP}
                state={location.state}
                disableRipple
                sx={{
                  flex: 1,
                  py: 0.85,
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  letterSpacing: '0.01em',
                  transition: 'all 0.25s ease',
                  backgroundColor: isDark
                    ? 'rgba(197, 184, 154, 0.22)'
                    : 'rgba(255, 255, 255, 0.95)',
                  color: isDark ? '#ffffff' : '#1a1a19',
                  boxShadow: isDark
                    ? '0 4px 12px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.25)'
                    : '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
                  border: isDark
                    ? '1px solid rgba(197, 184, 154, 0.45)'
                    : '1px solid rgba(26, 26, 25, 0.1)',
                }}
              >
                {LL.authorization.createAccount()}
              </Button>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: '100%',
                mt: 0.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <TextField
                required
                fullWidth
                size="small"
                id="name"
                label={LL.form.fullName()}
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleChange('name')}
                error={!!errors.name}
                helperText={errors.name}
              />

              <TextField
                required
                fullWidth
                size="small"
                id="email"
                label={LL.form.email()}
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange('email')}
                error={!!errors.email}
                helperText={errors.email}
                {...getLtrTextFieldProps()}
              />

              <PasswordTextField
                required
                fullWidth
                size="small"
                name="password"
                label={LL.form.password()}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange('password')}
                error={!!errors.password}
                helperText={errors.password}
              />

              <PasswordTextField
                required
                fullWidth
                size="small"
                name="confirmPassword"
                label={LL.authorization.confirmPassword()}
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                loading={registerLoading}
                endIcon={
                  !registerLoading &&
                  (isRtl ? (
                    <ArrowBackRounded
                      sx={{
                        fontSize: 18,
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  ) : (
                    <ArrowForwardRounded
                      sx={{
                        fontSize: 18,
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  ))
                }
                sx={{
                  mt: 1.5,
                  mb: 1,
                  py: 1.4,
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.94rem',
                  letterSpacing: isRtl ? 0 : '0.03em',
                  textTransform: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(20px) saturate(190%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(190%)',
                  transition:
                    'all 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  ...(isDark
                    ? {
                        background:
                          'linear-gradient(135deg, rgba(197, 184, 154, 0.96) 0%, rgba(181, 171, 147, 0.94) 100%)',
                        color: '#121210',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        boxShadow:
                          '0 10px 28px -4px rgba(197, 184, 154, 0.45), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.6)',
                        '&:hover': {
                          background:
                            'linear-gradient(135deg, #ddd4bf 0%, #c5b89a 100%)',
                          boxShadow:
                            '0 14px 34px -4px rgba(197, 184, 154, 0.6), inset 0 1px 2px 0 rgba(255, 255, 255, 0.8)',
                          transform: 'translateY(-2px)',
                          '& .MuiButton-endIcon': {
                            transform: isRtl
                              ? 'translateX(-3px)'
                              : 'translateX(3px)',
                          },
                        },
                      }
                    : {
                        background:
                          'linear-gradient(135deg, #1a1a19 0%, #2a2a28 100%)',
                        color: '#faf9f7',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow:
                          '0 10px 28px -4px rgba(26, 26, 25, 0.32), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.3)',
                        '&:hover': {
                          background:
                            'linear-gradient(135deg, #2e2e2c 0%, #3e3e3b 100%)',
                          boxShadow:
                            '0 14px 34px -4px rgba(26, 26, 25, 0.45), inset 0 1px 2px 0 rgba(255, 255, 255, 0.4)',
                          transform: 'translateY(-2px)',
                          '& .MuiButton-endIcon': {
                            transform: isRtl
                              ? 'translateX(-3px)'
                              : 'translateX(3px)',
                          },
                        },
                      }),
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  '&.Mui-disabled': {
                    opacity: 0.65,
                  },
                }}
              >
                {LL.authorization.createAccount()}
              </Button>
            </Box>
          </GlassmorphismContainer>
        </Container>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerSignup;
