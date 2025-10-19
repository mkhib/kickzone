import React from 'react';
import {
  useI18nContext,
  useLanguageContext,
} from '@kickzone-workspace/shared-i18n';
import { Box, Typography, Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';
import { SELLER_ROUTES } from '@kickzone-workspace/sellers-routes';

export function SellersFooter() {
  const { LL } = useI18nContext();
  const { currentLocale, availableLocales } = useLanguageContext();
  const navigate = useNavigate();

  const currentLanguage = availableLocales.find(
    (lang) => lang.code === currentLocale
  );

  const handleLanguageSettingsClick = () => {
    navigate(SELLER_ROUTES.LANGUAGE_SETTINGS);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        borderTop: '1px solid #e0e0e0',
        padding: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2024 {LL.appNames.kickzone()} - {LL.navigation.sellersPortal()}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {LL.form.currentLanguage()}:{' '}
          <strong>{currentLanguage?.nativeName}</strong>
        </Typography>

        <Button
          variant="outlined"
          size="small"
          startIcon={<LanguageIcon />}
          onClick={handleLanguageSettingsClick}
          sx={{
            textTransform: 'none',
            fontSize: '0.875rem',
          }}
        >
          {LL.navigation.languageSettings()}
        </Button>
      </Box>
    </Box>
  );
}

export default SellersFooter;
