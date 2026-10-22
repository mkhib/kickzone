import { colors } from '@kickzone-workspace/colors';
import {
  useI18nContext,
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';
import { LottieSuccessCheck } from '@kickzone-workspace/lottie-success-check';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';

interface LanguageComponentsProps {
  LayoutComponent: React.ComponentType<{ children: React.ReactNode }>;
}

export function LanguageComponents({
  LayoutComponent,
}: LanguageComponentsProps) {
  const { currentLocale, setLocale, availableLocales, isLoading } =
    useLanguageContext();
  const { LL } = useI18nContext();

  usePageTitle(() =>
    currentLocale === 'en'
      ? 'Language Settings — SAINTBALA'
      : 'تنظیمات زبان — SAINTBALA'
  );

  const [selectedLanguage, setSelectedLanguage] =
    React.useState<typeof currentLocale>(currentLocale);
  const [showSuccess, setShowSuccess] = React.useState(false);

  // Keep combobox synchronized with active locale/cookie state
  useEffect(() => {
    setSelectedLanguage(currentLocale);
  }, [currentLocale]);

  const handleLanguageChange = (event: {
    target: { value: typeof currentLocale };
  }) => {
    const newLocale = event.target.value;
    setSelectedLanguage(newLocale);

    try {
      if (typeof document !== 'undefined') {
        document.cookie = `kickzone-language-preference=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      }
      setLocale(newLocale);
      setShowSuccess(true);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const handleAnimationComplete = () => {
    setShowSuccess(false);
  };

  const currentLanguageInfo = availableLocales.find(
    (lang) => lang.code === currentLocale
  );

  return (
    <LayoutComponent>
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <GlassmorphismContainer
          wrapperSx={{ p: 0, width: '100%', maxWidth: 520 }}
          containerSx={{ p: 4, borderRadius: 3 }}
        >
          <CardContent sx={{ p: 0 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={(theme) => ({
                textAlign: 'center',
                marginBottom: 3,
                color: theme.palette.mode === 'dark' ? '#f5f5f5' : colors.text,
                fontWeight: 600,
              })}
            >
              {LL.navigation.languageSettings()}
            </Typography>

            <Box
              sx={{
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 3,
                position: 'relative',
              }}
            >
              {showSuccess && (
                <LottieSuccessCheck
                  width={50}
                  height={50}
                  onComplete={handleAnimationComplete}
                />
              )}
            </Box>

            <Box sx={{ marginBottom: 3 }}>
              <Typography
                variant="body1"
              sx={(theme) => ({
                marginBottom: 2,
                color: theme.palette.mode === 'dark' ? '#f5f5f5' : colors.text,
                textAlign: 'center',
              })}
              >
                {LL.form.currentLanguage()}:{' '}
                <strong>{currentLanguageInfo?.nativeName}</strong>
              </Typography>
            </Box>

            <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel
              id="language-select-label"
              sx={(theme) => ({
                color: theme.palette.mode === 'dark' ? '#f5f5f5' : undefined,
              })}
            >
                {LL.form.selectLanguage()}
              </InputLabel>
              <Select
                labelId="language-select-label"
                value={selectedLanguage}
                label={LL.form.selectLanguage()}
                onChange={handleLanguageChange}
                disabled={isLoading}
              sx={(theme) => ({
                color: theme.palette.mode === 'dark' ? '#f7f7f7' : undefined,
              })}
              >
                {availableLocales.map((locale) => (
                <MenuItem
                  key={locale.code}
                  value={locale.code}
                  sx={(theme) => ({
                    color:
                      theme.palette.mode === 'dark'
                        ? '#f7f7f7'
                        : theme.palette.text.primary,
                  })}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="body1"
                      sx={(theme) => ({
                        color:
                          theme.palette.mode === 'dark'
                            ? '#ffffff'
                            : theme.palette.text.primary,
                      })}
                    >
                        {locale.nativeName}
                      </Typography>
                    <Typography
                      variant="body2"
                      sx={(theme) => ({
                        color:
                          theme.palette.mode === 'dark'
                            ? 'rgba(255,255,255,0.7)'
                            : theme.palette.text.secondary,
                      })}
                    >
                        ({locale.name})
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {isLoading && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2,
                  marginTop: 2,
                }}
              >
                <CircularProgress size={20} />
                <Typography variant="body2" color="text.secondary">
                  {LL.status.changingLanguage()}
                </Typography>
              </Box>
            )}

            <Typography
              variant="body2"
              sx={(theme) => ({
                textAlign: 'center',
                color: theme.palette.mode === 'dark' ? '#f5f5f5' : colors.text,
                marginTop: 3,
                fontStyle: 'italic',
              })}
            >
              {LL.messages.languagePreferenceSaved()}
            </Typography>
          </CardContent>
        </GlassmorphismContainer>
      </Box>
    </LayoutComponent>
  );
}

export default LanguageComponents;
