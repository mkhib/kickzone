import React from 'react';
import {
  useI18nContext,
  useLanguageContext,
} from '@kickzone-workspace/shared-i18n';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';

export function AdminsFooter() {
  const { LL } = useI18nContext();
  const { currentLocale, availableLocales } = useLanguageContext();
  const navigate = useNavigate();

  const currentLanguage = availableLocales.find(
    (lang) => lang.code === currentLocale
  );

  const handleLanguageSettingsClick = () => {
    navigate('/language-settings');
  };

  return (
    <Box
      sx={(theme) => {
        const isDark = theme.palette.mode === 'dark';
        return {
          backgroundColor: isDark ? '#0b0b0f' : '#f5f5f5',
          borderTop: isDark
            ? '1px solid rgba(255, 255, 255, 0.12)'
            : '1px solid #e0e0e0',
          color: isDark ? '#f5f5f5' : 'inherit',
          padding: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        };
      }}
    >
      <Typography
        variant="body2"
        sx={(theme) => ({
          color: theme.palette.mode === 'dark' ? '#f5f5f5' : 'text.secondary',
        })}
      >
        © 2024 {LL.appNames.siteName()} {LL.navigation.adminPanel()}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography
          variant="body2"
          sx={(theme) => ({
            color: theme.palette.mode === 'dark' ? '#f5f5f5' : 'text.secondary',
          })}
        >
          {LL.form.currentLanguage()}:{' '}
          <strong>{currentLanguage?.nativeName}</strong>
        </Typography>

        <Button
          variant="outlined"
          size="small"
          startIcon={<LanguageIcon />}
          onClick={handleLanguageSettingsClick}
          sx={(theme) => ({
            textTransform: 'none',
            fontSize: '0.875rem',
            color: theme.palette.mode === 'dark' ? '#f5f5f5' : undefined,
            borderColor:
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.3)'
                : undefined,
            '&:hover': {
              borderColor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.5)'
                  : undefined,
            },
          })}
        >
          {LL.navigation.languageSettings()}
        </Button>
      </Box>
    </Box>
  );
}

export default AdminsFooter;
