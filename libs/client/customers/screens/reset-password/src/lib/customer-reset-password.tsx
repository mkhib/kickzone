import React, { useState } from 'react';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { useCustomersResetPassword } from '@kickzone-workspace/customers-auth-hooks';
import { getErrorMessage } from '@kickzone-workspace/translations';
import LockResetOutlined from '@mui/icons-material/LockResetOutlined';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PasswordTextField } from '@kickzone-workspace/password-field';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';

export function CustomerResetPassword() {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.resetPassword());
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { showSnackbar } = useSnackbar();
  const { handleResetPassword, resetPasswordLoading } =
    useCustomersResetPassword();
  const theme = useTheme();

  const isDark = theme.palette.mode === 'dark';
  const isRtl = theme.direction === 'rtl';

  const goldColor = isDark ? '#c5b89a' : '#7c6d48';

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
      navigate(CUSTOMER_ROUTES.HOME);
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
                color: goldColor,
                mb: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px) scale(1.03)',
                },
              }}
            >
              <LockResetOutlined sx={{ fontSize: 32 }} />
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
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
                color: isDark ? '#f0efeb' : '#1a1a19',
                textAlign: 'center',
                mb: 1,
              }}
            >
              {LL.authorization.resetPassword()}
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="body2"
              sx={{
                color: isDark ? '#a8a69f' : '#6b7280',
                textAlign: 'center',
                maxWidth: 340,
                mb: 3,
                fontSize: '0.86rem',
                lineHeight: 1.5,
              }}
            >
              {LL.authorization.enterNewPassword()}
            </Typography>

            {error && (
              <Alert
                severity="error"
                sx={{
                  width: '100%',
                  mb: 2,
                  borderRadius: '16px',
                  backgroundColor: isDark
                    ? 'rgba(239, 68, 68, 0.15)'
                    : 'rgba(239, 68, 68, 0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <PasswordTextField
                required
                fullWidth
                size="small"
                name="password"
                label={LL.form.password()}
                id="password"
                autoComplete="new-password"
                autoFocus
                value={formData.password}
                onChange={handleChange('password')}
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
                error={
                  !!error && error === LL.authorization.passwordsDoNotMatch()
                }
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                loading={resetPasswordLoading}
                sx={{
                  mt: 1.5,
                  mb: 0.5,
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
                            'linear-gradient(135deg, #ffffff 0%, rgba(210, 198, 170, 0.98) 100%)',
                          transform: 'translateY(-2px) scale(1.01)',
                          boxShadow:
                            '0 14px 34px -4px rgba(197, 184, 154, 0.6), inset 0 1px 2px 0 rgba(255, 255, 255, 0.9)',
                        },
                      }
                    : {
                        background:
                          'linear-gradient(135deg, #1f1f1d 0%, #121210 100%)',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow:
                          '0 10px 24px -4px rgba(0, 0, 0, 0.28), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
                        '&:hover': {
                          background:
                            'linear-gradient(135deg, #2c2c28 0%, #050505 100%)',
                          transform: 'translateY(-2px) scale(1.01)',
                          boxShadow:
                            '0 14px 30px -4px rgba(0, 0, 0, 0.38), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.5)',
                        },
                      }),
                }}
              >
                {LL.authorization.resetPassword()}
              </Button>

              {/* Back to Login Button */}
              <Button
                fullWidth
                component={RouterLink}
                to={CUSTOMER_ROUTES.LOGIN}
                startIcon={
                  isRtl ? (
                    <ArrowForwardRounded sx={{ fontSize: 18 }} />
                  ) : (
                    <ArrowBackRounded sx={{ fontSize: 18 }} />
                  )
                }
                sx={{
                  borderRadius: '9999px',
                  py: 1,
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  textTransform: 'none',
                  color: isDark ? '#a8a69f' : '#6b7280',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: isDark
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.04)',
                    color: isDark ? '#ffffff' : '#1a1a19',
                  },
                }}
              >
                {LL.authorization.backToLogin()}
              </Button>
            </Box>
          </GlassmorphismContainer>
        </Container>
      </Box>
    </CustomersLayout>
  );
}

export default CustomerResetPassword;
