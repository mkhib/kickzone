import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CurrencyManagement from './currency-management';

vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/glassmorphism-container', () => ({
  GlassmorphismContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="glassmorphism-container">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/language-components', () => ({
  getLtrTextFieldProps: () => ({}),
}));

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      pageTitles: {
        adminCurrency: () => 'Currency Management',
      },
      currency: {
        title: () => 'Currency Management',
        currentExchangeRate: () => 'Current Exchange Rate',
        currentRate: () => 'Current Rate',
        lastUpdated: () => 'Last Updated',
        setNewExchangeRate: () => 'Set New Exchange Rate',
        newRate: () => 'New Rate',
        enterExchangeRate: () => 'Enter exchange rate',
        notes: () => 'Notes',
        reasonForRateChange: () => 'Reason for rate change',
        setExchangeRate: () => 'Set Exchange Rate',
        exchangeRateHistory: () => 'Exchange Rate History',
        noHistoryAvailable: () => 'No history available',
        date: () => 'Date',
        rate: () => 'Rate',
        updatedBy: () => 'Updated By',
        currencyPreferences: () => 'Currency Preferences',
        locale: () => 'Locale',
        currency: () => 'Currency',
        setPreference: () => 'Set Preference',
        currentPreferences: () => 'Current Preferences',
        noPreferencesSet: () => 'No preferences set',
        symbol: () => 'Symbol',
      },
      optional: () => 'Optional',
    },
  }),
  usePageTitle: vi.fn(),
}));

vi.mock('@kickzone-workspace/admins-currency-management-hooks', () => ({
  useAdminsCurrencyManagement: () => ({
    selectedFromCurrency: 'USD',
    setSelectedFromCurrency: vi.fn(),
    selectedToCurrency: 'IRR',
    setSelectedToCurrency: vi.fn(),
    newRate: '42000',
    setNewRate: vi.fn(),
    notes: '',
    setNotes: vi.fn(),
    locale: 'en',
    setLocale: vi.fn(),
    currencyCode: 'USD',
    setCurrencyCode: vi.fn(),
    currencies: [
      { code: 'USD', name: 'US Dollar', symbol: '$' },
      { code: 'IRR', name: 'Iranian Rial', symbol: 'Rial' },
    ],
    currentRate: {
      rate: 42000,
      effectiveDate: '2026-09-08T00:00:00.000Z',
    },
    history: [],
    preferences: [],
    settingRate: false,
    settingPreference: false,
    handleSetExchangeRate: vi.fn(),
    handleSetCurrencyPreference: vi.fn(),
  }),
}));

describe('CurrencyManagement', () => {
  it('renders a minimal smoke view', () => {
    render(<CurrencyManagement />);

    expect(screen.getByTestId('admins-layout')).toBeInTheDocument();
    expect(screen.getAllByText('Currency Management').length).toBeGreaterThan(0);
    expect(screen.getByText('Current Exchange Rate')).toBeInTheDocument();
  });
});
