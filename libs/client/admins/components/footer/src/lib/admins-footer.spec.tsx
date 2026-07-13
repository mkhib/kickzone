import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { AdminsFooter } from './admins-footer';
import { BrowserRouter } from 'react-router-dom';

// Mock the i18n context
vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
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
    },
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
