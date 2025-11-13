import { useLanguageContext } from '@kickzone-workspace/shared-i18n';

/**
 * Hook that provides RTL alignment utilities for MaterialReactTable
 * @returns Object with alignment, isFarsi, and isRTL values
 */
export function useTableAlignment() {
  const { isRTL, currentLocale } = useLanguageContext();
  const isFarsi = currentLocale === 'fa';
  const alignment: 'left' | 'right' | 'center' = isFarsi ? 'right' : 'left';

  return {
    alignment,
    isFarsi,
    isRTL,
    currentLocale,
  };
}
