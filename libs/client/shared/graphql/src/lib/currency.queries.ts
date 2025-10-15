import { gql } from '@apollo/client';

export const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      id
      code
      name
      symbol
      decimalPlaces
      isActive
      isBaseCurrency
    }
  }
`;

export const GET_CURRENCY_BY_CODE = gql`
  query GetCurrencyByCode($code: String!) {
    currencyByCode(code: $code) {
      id
      code
      name
      symbol
      decimalPlaces
      isActive
      isBaseCurrency
    }
  }
`;

export const GET_CURRENT_EXCHANGE_RATE = gql`
  query GetCurrentExchangeRate(
    $fromCurrencyCode: String!
    $toCurrencyCode: String!
  ) {
    currentExchangeRate(
      fromCurrencyCode: $fromCurrencyCode
      toCurrencyCode: $toCurrencyCode
    ) {
      id
      rate
      effectiveDate
      fromCurrency {
        code
        symbol
      }
      toCurrency {
        code
        symbol
        decimalPlaces
      }
    }
  }
`;

export const GET_EXCHANGE_RATE_HISTORY = gql`
  query GetExchangeRateHistory(
    $fromCurrencyCode: String!
    $toCurrencyCode: String!
    $limit: Int
  ) {
    exchangeRateHistory(
      fromCurrencyCode: $fromCurrencyCode
      toCurrencyCode: $toCurrencyCode
      limit: $limit
    ) {
      id
      rate
      effectiveDate
      notes
      createdAt
      createdBy {
        name
        email
      }
    }
  }
`;

export const GET_CURRENCY_PREFERENCES = gql`
  query GetCurrencyPreferences {
    currencyPreferences {
      id
      locale
      currency {
        code
        name
        symbol
        decimalPlaces
      }
      isActive
    }
  }
`;

export const GET_CURRENCY_PREFERENCE_BY_LOCALE = gql`
  query GetCurrencyPreferenceByLocale($locale: String!) {
    currencyPreferenceByLocale(locale: $locale) {
      id
      locale
      currency {
        code
        name
        symbol
        decimalPlaces
      }
      isActive
    }
  }
`;
