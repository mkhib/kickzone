import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { CustomersFooter } from './customers-footer';
import { BrowserRouter } from 'react-router-dom';

// Mock the i18n context
vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      appNames: {
        kickzone: () => 'Kickzone',
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
    availableLocales: [{ code: 'en', name: 'English', nativeName: 'English' }],
  }),
}));

test('renders CustomersFooter', () => {
  const { container } = render(
    <BrowserRouter>
      <CustomersFooter />
    </BrowserRouter>
  );
  expect(container).toBeTruthy();
});
