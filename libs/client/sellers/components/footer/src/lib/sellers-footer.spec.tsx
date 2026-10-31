import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { SellersFooter } from './sellers-footer';
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
vi.mock('@kickzone-workspace/shared-i18n', async () => {
  const actual = await vi.importActual<
    typeof import('@kickzone-workspace/shared-i18n')
  >('@kickzone-workspace/shared-i18n');
  return {
    ...actual,
    useI18nContext: () => ({
      LL: withKeyFallback({
        appNames: {
          siteName: () => actual.SITE_NAME,
        },
        navigation: {
          sellersPortal: () => 'Sellers Portal',
          languageSettings: () => 'Language Settings',
        },
        form: {
          currentLanguage: () => 'Current Language',
        },
      }),
    }),
    useLanguageContext: () => ({
      currentLocale: 'en',
      availableLocales: [
        { code: 'en', name: 'English', nativeName: 'English' },
      ],
    }),
  };
});

test('renders SellersFooter', () => {
  const { container } = render(
    <BrowserRouter>
      <SellersFooter />
    </BrowserRouter>
  );
  expect(container).toBeTruthy();
});
