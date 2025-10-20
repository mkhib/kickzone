import { colors } from '@kickzone-workspace/colors';
import {
  useI18nContext,
  useLanguageContext,
} from '@kickzone-workspace/shared-i18n';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import React from 'react';

interface LanguageComponentsProps {
  LayoutComponent: React.ComponentType<{ children: React.ReactNode }>;
}

export function LanguageComponents({
  LayoutComponent,
}: LanguageComponentsProps) {
  const { currentLocale, setLocale, availableLocales, isLoading } =
    useLanguageContext();
  const { LL } = useI18nContext();
  const [selectedLanguage, setSelectedLanguage] =
    React.useState<typeof currentLocale>(currentLocale);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleLanguageChange = (event: {
    target: { value: typeof currentLocale };
  }) => {
    const newLocale = event.target.value;
    setSelectedLanguage(newLocale);

    try {
      setLocale(newLocale);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const currentLanguageInfo = availableLocales.find(
    (lang) => lang.code === currentLocale
  );

  return (
    <LayoutComponent>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: 500,
            width: '100%',
            borderRadius: 3,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          }}
        >
          <CardContent sx={{ padding: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                textAlign: 'center',
                marginBottom: 3,
                color: colors.text,
                fontWeight: 600,
              }}
            >
              {LL.navigation.languageSettings()}
            </Typography>

            {showSuccess && (
              <Alert
                severity="success"
                sx={{ marginBottom: 3 }}
                onClose={() => setShowSuccess(false)}
              >
                {LL.messages.languagePreferenceSaved()}
              </Alert>
            )}

            <Box sx={{ marginBottom: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: 2,
                  color: colors.text,
                  textAlign: 'center',
                }}
              >
                {LL.form.currentLanguage()}:{' '}
                <strong>{currentLanguageInfo?.nativeName}</strong>
              </Typography>
            </Box>

            <FormControl fullWidth sx={{ marginBottom: 3 }}>
              <InputLabel id="language-select-label">
                {LL.form.selectLanguage()}
              </InputLabel>
              <Select
                labelId="language-select-label"
                value={selectedLanguage}
                label={LL.form.selectLanguage()}
                onChange={handleLanguageChange}
                disabled={isLoading}
                sx={{
                  backgroundColor: colors.accent1,
                  borderRadius: 2,
                }}
              >
                {availableLocales.map((locale) => (
                  <MenuItem key={locale.code} value={locale.code}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1">
                        {locale.nativeName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
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
              sx={{
                textAlign: 'center',
                color: colors.text,
                marginTop: 3,
                fontStyle: 'italic',
              }}
            >
              {LL.messages.languagePreferenceSaved()}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </LayoutComponent>
  );
}

export default LanguageComponents;
