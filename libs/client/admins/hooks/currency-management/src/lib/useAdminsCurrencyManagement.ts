import { useEffect, useState } from 'react';
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

  // Start empty so MUI Select does not warn before currencies load.
  const [selectedFromCurrency, setSelectedFromCurrency] = useState('');
  const [selectedToCurrency, setSelectedToCurrency] = useState('');
  const [newRate, setNewRate] = useState('');
  const [notes, setNotes] = useState('');
  const [locale, setLocale] = useState('fa');
  const [currencyCode, setCurrencyCode] = useState('');

  const currenciesQuery =
    useQuery<Pick<KickzoneGraphqlTypes.Query, 'currencies'>>(GET_CURRENCIES);

  const currencies = currenciesQuery.data?.currencies ?? [];
  const hasCurrencyPair = Boolean(selectedFromCurrency && selectedToCurrency);

  useEffect(() => {
    if (!currencies.length) {
      return;
    }

    const codes = new Set(currencies.map((currency) => currency.code));
    const base =
      currencies.find((currency) => currency.isBaseCurrency) ?? currencies[0];
    const secondary =
      currencies.find((currency) => currency.code !== base.code) ?? base;

    if (!codes.has(selectedFromCurrency)) {
      setSelectedFromCurrency(base.code);
    }
    if (!codes.has(selectedToCurrency)) {
      setSelectedToCurrency(secondary.code);
    }
    if (!codes.has(currencyCode)) {
      setCurrencyCode(secondary.code);
    }
  }, [currencies, selectedFromCurrency, selectedToCurrency, currencyCode]);

  const exchangeRateQuery = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'currentExchangeRate'>,
    KickzoneGraphqlTypes.QueryCurrentExchangeRateArgs
  >(GET_CURRENT_EXCHANGE_RATE, {
    variables: {
      fromCurrencyCode: selectedFromCurrency,
      toCurrencyCode: selectedToCurrency,
    },
    skip: !hasCurrencyPair,
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
    skip: !hasCurrencyPair,
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

  const currentRate = exchangeRateQuery.data?.currentExchangeRate;
  const history = historyQuery.data?.exchangeRateHistory ?? [];
  const preferences = preferencesQuery.data?.currencyPreferences ?? [];

  const handleSetExchangeRate = () => {
    if (!hasCurrencyPair) {
      return;
    }

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
    if (!currencyCode) {
      return;
    }

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
