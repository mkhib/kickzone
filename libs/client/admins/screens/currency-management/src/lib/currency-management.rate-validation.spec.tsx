import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CurrencyManagement from './currency-management';

const mockRate = vi.hoisted(() => ({ value: '42000' }));
const mockSetRate = vi.hoisted(() => vi.fn());

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
    newRate: mockRate.value,
    setNewRate: vi.fn(),
    notes: '',
    setNotes: vi.fn(),
    locale: 'en',
    setLocale: vi.fn(),
    currencyCode: 'USD',
    setCurrencyCode: vi.fn(),
    currencies: [
      { code: 'USD', name: 'US Dollar', symbol: '$', isBaseCurrency: true },
      { code: 'IRR', name: 'Iranian Rial', symbol: 'Rial', isBaseCurrency: false },
    ],
    currentRate: {
      rate: 42000,
      effectiveDate: '2026-09-08T00:00:00.000Z',
    },
    history: [],
    preferences: [],
    settingRate: false,
    settingPreference: false,
    handleSetExchangeRate: mockSetRate,
    handleSetCurrencyPreference: vi.fn(),
  }),
}));

describe('CurrencyManagement exchange rate shared Zod validation', () => {
  beforeEach(() => {
    mockSetRate.mockClear();
  });

  it.each(['', 'abc', '0', '-5'])('does not submit the invalid rate %j', async (rate) => {
    mockRate.value = rate;
    render(<CurrencyManagement />);
    fireEvent.click(screen.getByRole('button', { name: "Set Exchange Rate" }));
    await waitFor(() =>
      expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-invalid', 'true')
    );
    expect(mockSetRate).not.toHaveBeenCalled();
  });

  it('submits a valid positive rate', async () => {
    mockRate.value = '58000.5';
    render(<CurrencyManagement />);
    fireEvent.click(screen.getByRole('button', { name: "Set Exchange Rate" }));
    await waitFor(() => expect(mockSetRate).toHaveBeenCalledTimes(1));
  });
});
