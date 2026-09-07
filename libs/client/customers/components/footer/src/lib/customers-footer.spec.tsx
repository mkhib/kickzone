import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { CustomersFooter } from './customers-footer';
import { BrowserRouter } from 'react-router-dom';

// Mock the i18n context
vi.mock('@kickzone-workspace/shared-i18n', async () => {
  const actual = await vi.importActual<
    typeof import('@kickzone-workspace/shared-i18n')
  >('@kickzone-workspace/shared-i18n');
  return {
    ...actual,
    useI18nContext: () => ({
      LL: {
        appNames: {
          siteName: () => actual.SITE_NAME,
        },
        navigation: {
          languageSettings: () => 'Language Settings',
        },
        form: {
          currentLanguage: () => 'Current Language',
        },
      },
    }),
    useLanguageContext: () => ({
      currentLocale: 'en',
      availableLocales: [
        { code: 'en', name: 'English', nativeName: 'English' },
      ],
    }),
  };
});

test('renders CustomersFooter', () => {
  const { container } = render(
    <BrowserRouter>
      <CustomersFooter />
    </BrowserRouter>
  );
  expect(container).toBeTruthy();
});
