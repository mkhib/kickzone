import { useEffect } from 'react';
import { useI18nContext } from '../lib/locales/i18n-react';

/**
 * Hook to set the page title with the site name from i18n.
 * @param titleGetter - A function that returns the translated page title (without site name)
 */
export function usePageTitle(titleGetter?: () => string) {
  const { LL } = useI18nContext();

  useEffect(() => {
    const pageTitle = titleGetter ? titleGetter() : '';
    const title = pageTitle
      ? `${LL.appNames.siteName()} - ${pageTitle}`
      : LL.appNames.siteName();
    document.title = title;
  }, [LL, titleGetter]);
}
