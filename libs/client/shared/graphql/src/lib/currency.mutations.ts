import { gql } from '@apollo/client';

export const CREATE_CURRENCY = gql`
  mutation CreateCurrency($input: CreateCurrencyInput!) {
    createCurrency(input: $input) {
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

export const UPDATE_CURRENCY = gql`
  mutation UpdateCurrency($id: Int!, $input: UpdateCurrencyInput!) {
    updateCurrency(id: $id, input: $input) {
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

export const SET_EXCHANGE_RATE = gql`
  mutation SetExchangeRate($input: SetExchangeRateInput!) {
    setExchangeRate(input: $input) {
      id
      rate
      effectiveDate
      notes
      fromCurrency {
        code
        name
        symbol
      }
      toCurrency {
        code
        name
        symbol
      }
    }
  }
`;

export const SET_CURRENCY_PREFERENCE = gql`
  mutation SetCurrencyPreference($locale: String!, $currencyCode: String!) {
    setCurrencyPreference(locale: $locale, currencyCode: $currencyCode) {
      id
      locale
      currency {
        code
        name
        symbol
        decimalPlaces
      }
    }
  }
`;

export const DELETE_CURRENCY_PREFERENCE = gql`
  mutation DeleteCurrencyPreference($id: Int!) {
    deleteCurrencyPreference(id: $id)
  }
`;
