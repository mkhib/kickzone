import { useEffect } from 'react';
import { useI18nContext } from '../lib/locales/i18n-react';

/**
 * Hook to set the page title with the site name from i18n.
 */
export function usePageTitle(suffix = '') {
  const { LL } = useI18nContext();

  useEffect(() => {
    const title = `${LL.appNames.siteName()}${suffix ? ` ${suffix}` : ''}`;
    document.title = title;
  }, [LL, suffix]);
}
