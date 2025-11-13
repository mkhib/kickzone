import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { SellersFooter } from './sellers-footer';
import { BrowserRouter } from 'react-router-dom';

// Mock the i18n context
vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      appNames: {
        kickzone: () => 'Kickzone',
      },
      navigation: {
        sellersPortal: () => 'Sellers Portal',
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

test('renders SellersFooter', () => {
  const { container } = render(
    <BrowserRouter>
      <SellersFooter />
    </BrowserRouter>
  );
  expect(container).toBeTruthy();
});
