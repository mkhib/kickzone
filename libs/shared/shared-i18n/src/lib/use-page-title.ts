import { useEffect, useRef } from 'react';
import { useI18nContext } from '../lib/locales/i18n-react';

/**
 * Hook to set the page title with the site name from i18n.
 * @param titleGetter - A function that returns the translated page title (without site name)
 */
export function usePageTitle(titleGetter?: () => string): void {
  const { LL } = useI18nContext();
  const siteName = LL.appNames.siteName();
  const prevTitleRef = useRef<string>('');

  useEffect(() => {
    const rawTitle = titleGetter ? titleGetter() : '';
    // Strip any trailing/leading duplicate brand suffix (— SAINTBALA, - SAINTBALA, | SAINTBALA)
    const cleanTitle = rawTitle
      .replace(/\s*[\u2014\u2013\-|]\s*SAINTBALA\s*$/i, '')
      .replace(/^SAINTBALA\s*[\u2014\u2013\-|]\s*/i, '')
      .replace(/^SAINTBALA$/i, '')
      .trim();

    const title = cleanTitle
      ? `${siteName} - ${cleanTitle}`
      : siteName;

    if (title !== prevTitleRef.current) {
      document.title = title;
      prevTitleRef.current = title;
    }
  }, [LL, titleGetter, siteName]);
}
