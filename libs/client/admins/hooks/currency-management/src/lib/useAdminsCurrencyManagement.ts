import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  GET_CURRENCIES,
  GET_CURRENT_EXCHANGE_RATE,
  GET_EXCHANGE_RATE_HISTORY,
  SET_EXCHANGE_RATE,
  GET_CURRENCY_PREFERENCES,
  SET_CURRENCY_PREFERENCE,
} from '@kickzone-workspace/client-shared-graphql';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';

export const useAdminsCurrencyManagement = () => {
  const { showSnackbar } = useSnackbar();
  const { LL } = useI18nContext();

  const [selectedFromCurrency, setSelectedFromCurrency] = useState('USD');
  const [selectedToCurrency, setSelectedToCurrency] = useState('IRR');
  const [newRate, setNewRate] = useState('');
  const [notes, setNotes] = useState('');
  const [locale, setLocale] = useState('fa');
  const [currencyCode, setCurrencyCode] = useState('IRR');

  const currenciesQuery =
    useQuery<Pick<KickzoneGraphqlTypes.Query, 'currencies'>>(GET_CURRENCIES);

  const exchangeRateQuery = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'currentExchangeRate'>,
    KickzoneGraphqlTypes.QueryCurrentExchangeRateArgs
  >(GET_CURRENT_EXCHANGE_RATE, {
    variables: {
      fromCurrencyCode: selectedFromCurrency,
      toCurrencyCode: selectedToCurrency,
    },
  });

  const historyQuery = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'exchangeRateHistory'>,
    KickzoneGraphqlTypes.QueryExchangeRateHistoryArgs
  >(GET_EXCHANGE_RATE_HISTORY, {
    variables: {
      fromCurrencyCode: selectedFromCurrency,
      toCurrencyCode: selectedToCurrency,
      limit: 10,
    },
  });

  const preferencesQuery = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'currencyPreferences'>
  >(GET_CURRENCY_PREFERENCES);

  const [setExchangeRateMutation, { loading: settingRate }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'setExchangeRate'>,
    KickzoneGraphqlTypes.MutationSetExchangeRateArgs
  >(SET_EXCHANGE_RATE, {
    onCompleted: () => {
      exchangeRateQuery.refetch();
      historyQuery.refetch();
      setNewRate('');
      setNotes('');
      const rateUpdateText =
        LL.currency.rateUpdateSuccess?.() ?? LL.currency.setExchangeRate();
      showSnackbar(rateUpdateText, { severity: 'success' });
    },
    onError: (error) => {
      showSnackbar(`Error: ${error.message}`, { severity: 'error' });
    },
  });

  const [setCurrencyPreferenceMutation, { loading: settingPreference }] =
    useMutation<
      Pick<KickzoneGraphqlTypes.Mutation, 'setCurrencyPreference'>,
      KickzoneGraphqlTypes.MutationSetCurrencyPreferenceArgs
    >(SET_CURRENCY_PREFERENCE, {
      onCompleted: () => {
        preferencesQuery.refetch();
        showSnackbar(
          LL.currency.preferenceUpdateSuccess?.() ??
            LL.currency.setPreference(),
          {
            severity: 'success',
          }
        );
      },
      onError: (error) => {
        showSnackbar(`Error: ${error.message}`, { severity: 'error' });
      },
    });

  const currencies = currenciesQuery.data?.currencies ?? [];
  const currentRate = exchangeRateQuery.data?.currentExchangeRate;
  const history = historyQuery.data?.exchangeRateHistory ?? [];
  const preferences = preferencesQuery.data?.currencyPreferences ?? [];

  const handleSetExchangeRate = () => {
    if (!newRate || isNaN(Number(newRate))) {
      showSnackbar(LL.currency.enterExchangeRate(), { severity: 'error' });
      return;
    }

    setExchangeRateMutation({
      variables: {
        input: {
          fromCurrencyCode: selectedFromCurrency,
          toCurrencyCode: selectedToCurrency,
          rate: parseFloat(newRate),
          notes: notes || null,
        },
      },
    });
  };

  const handleSetCurrencyPreference = () => {
    setCurrencyPreferenceMutation({
      variables: {
        locale,
        currencyCode,
      },
    });
  };

  return {
    // state
    selectedFromCurrency,
    setSelectedFromCurrency,
    selectedToCurrency,
    setSelectedToCurrency,
    newRate,
    setNewRate,
    notes,
    setNotes,
    locale,
    setLocale,
    currencyCode,
    setCurrencyCode,
    // queries data
    currencies,
    currentRate,
    history,
    preferences,
    // loading states
    settingRate,
    settingPreference,
    loadingCurrencies: currenciesQuery.loading,
    loadingCurrentRate: exchangeRateQuery.loading,
    loadingHistory: historyQuery.loading,
    loadingPreferences: preferencesQuery.loading,
    // actions
    handleSetExchangeRate,
    handleSetCurrencyPreference,
  };
};
