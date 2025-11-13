import * as React from 'react';
import Button from '@mui/material/Button';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';

interface TranslateToOtherLanguagesButtonProps {
  onClick: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
}

export function TranslateToOtherLanguagesButton({
  onClick,
  size = 'small',
  variant = 'outlined',
}: TranslateToOtherLanguagesButtonProps) {
  const { LL } = useI18nContext();

  return (
    <Button size={size} variant={variant} onClick={onClick}>
      {LL.admin.translationManagement.translateToOtherLanguages()}
    </Button>
  );
}
