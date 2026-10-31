import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { AdminsFooter } from './admins-footer';
import { BrowserRouter } from 'react-router-dom';

// Any LL key not listed explicitly falls back to a function returning its key path,
// so the render smoke test does not break each time the footer uses a new translation.
const { withKeyFallback } = vi.hoisted(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const withKeyFallback = (base: any, path = ''): any =>
    new Proxy(typeof base === 'function' ? base : () => path, {
      get: (_t, k) =>
        typeof k === 'symbol'
          ? undefined
          : withKeyFallback(
              base && typeof base === 'object' ? base[k] : undefined,
              path ? `${path}.${String(k)}` : String(k)
            ),
    });
  return { withKeyFallback };
});
// Mock the i18n context
vi.mock('@kickzone-workspace/shared-i18n', () => ({
  SITE_NAME: 'SAINTBALA',
  useI18nContext: () => ({
    LL: withKeyFallback({
      appNames: {
        siteName: () => 'SAINTBALA',
      },
      navigation: {
        adminPanel: () => 'Admin Panel',
        languageSettings: () => 'Language Settings',
      },
      form: {
        currentLanguage: () => 'Current Language',
      },
    }),
  }),
  useLanguageContext: () => ({
    currentLocale: 'en',
    availableLocales: [{ code: 'en', name: 'English', nativeName: 'English' }],
  }),
}));

test('renders AdminsFooter', () => {
  const { container } = render(
    <BrowserRouter>
      <AdminsFooter />
    </BrowserRouter>
  );
  expect(container).toBeTruthy();
});
