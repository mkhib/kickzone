import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  GET_CURRENCIES,
  GET_CURRENT_EXCHANGE_RATE,
  GET_EXCHANGE_RATE_HISTORY,
  SET_EXCHANGE_RATE,
  GET_CURRENCY_PREFERENCES,
  SET_CURRENCY_PREFERENCE,
} from '@kickzone-workspace/client-shared-graphql';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { useSnackbar } from '@kickzone-workspace/snackbar-hook';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Stack,
} from '@mui/material';

export function CurrencyManagement() {
  const { showSnackbar } = useSnackbar();
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.adminCurrency());
  const [selectedFromCurrency, setSelectedFromCurrency] = useState('USD');
  const [selectedToCurrency, setSelectedToCurrency] = useState('IRR');
  const [newRate, setNewRate] = useState('');
  const [notes, setNotes] = useState('');
  const [locale, setLocale] = useState('fa');
  const [currencyCode, setCurrencyCode] = useState('IRR');

  // Queries
  const { data: currenciesData } =
    useQuery<Pick<KickzoneGraphqlTypes.Query, 'currencies'>>(GET_CURRENCIES);

  const { data: exchangeRateData, refetch: refetchExchangeRate } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'currentExchangeRate'>,
    KickzoneGraphqlTypes.QueryCurrentExchangeRateArgs
  >(GET_CURRENT_EXCHANGE_RATE, {
    variables: {
      fromCurrencyCode: selectedFromCurrency,
      toCurrencyCode: selectedToCurrency,
    },
  });

  const { data: historyData, refetch: refetchHistory } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'exchangeRateHistory'>,
    KickzoneGraphqlTypes.QueryExchangeRateHistoryArgs
  >(GET_EXCHANGE_RATE_HISTORY, {
    variables: {
      fromCurrencyCode: selectedFromCurrency,
      toCurrencyCode: selectedToCurrency,
      limit: 10,
    },
  });

  const { data: preferencesData, refetch: refetchPreferences } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'currencyPreferences'>
  >(GET_CURRENCY_PREFERENCES);

  // Mutations
  const [setExchangeRate, { loading: settingRate }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'setExchangeRate'>,
    KickzoneGraphqlTypes.MutationSetExchangeRateArgs
  >(SET_EXCHANGE_RATE, {
    onCompleted: () => {
      refetchExchangeRate();
      refetchHistory();
      setNewRate('');
      setNotes('');
      showSnackbar('Exchange rate updated successfully!', {
        severity: 'success',
      });
    },
    onError: (error) => {
      showSnackbar(`Error: ${error.message}`, { severity: 'error' });
    },
  });

  const [setCurrencyPreference, { loading: settingPreference }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'setCurrencyPreference'>,
    KickzoneGraphqlTypes.MutationSetCurrencyPreferenceArgs
  >(SET_CURRENCY_PREFERENCE, {
    onCompleted: () => {
      refetchPreferences();
      showSnackbar('Currency preference set successfully!', {
        severity: 'success',
      });
    },
    onError: (error) => {
      showSnackbar(`Error: ${error.message}`, { severity: 'error' });
    },
  });

  const handleSetExchangeRate = () => {
    if (!newRate || isNaN(Number(newRate))) {
      showSnackbar('Please enter a valid exchange rate', { severity: 'error' });
      return;
    }

    setExchangeRate({
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
    setCurrencyPreference({
      variables: {
        locale,
        currencyCode,
      },
    });
  };

  const currencies = currenciesData?.currencies || [];
  const currentRate = exchangeRateData?.currentExchangeRate;
  const history = historyData?.exchangeRateHistory || [];
  const preferences = preferencesData?.currencyPreferences || [];

  return (
    <AdminsLayout>
      <GlassmorphismContainer
        containerSx={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ mb: 3, fontWeight: 600 }}
        >
          {LL.currency.title()}
        </Typography>

        {/* Current Exchange Rates */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              {LL.currency.currentExchangeRate()}
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <TextField
                select
                value={selectedFromCurrency}
                onChange={(e) => setSelectedFromCurrency(e.target.value)}
                size="small"
                sx={{ minWidth: 200 }}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </MenuItem>
                ))}
              </TextField>
              <Typography>→</Typography>
              <TextField
                select
                value={selectedToCurrency}
                onChange={(e) => setSelectedToCurrency(e.target.value)}
                size="small"
                sx={{ minWidth: 200 }}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            {currentRate && (
              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {LL.currency.currentRate()}: 1 {selectedFromCurrency} ={' '}
                  {currentRate.rate} {selectedToCurrency}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {LL.currency.lastUpdated()}:{' '}
                  {new Date(currentRate.effectiveDate).toLocaleString()}
                </Typography>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Set New Exchange Rate */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              {LL.currency.setNewExchangeRate()}
            </Typography>
            <Stack spacing={2}>
              <TextField
                label={`${LL.currency.newRate()} (1 ${selectedFromCurrency} = ? ${selectedToCurrency})`}
                type="number"
                value={newRate}
                onChange={(e) => setNewRate(e.target.value)}
                placeholder={LL.currency.enterExchangeRate()}
                fullWidth
                inputProps={{ step: 0.000001 }}
              />
              <TextField
                label={`${LL.currency.notes()} (${LL.optional()})`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={LL.currency.reasonForRateChange()}
                multiline
                rows={3}
                fullWidth
              />
              <Button
                variant="contained"
                onClick={handleSetExchangeRate}
                disabled={settingRate}
                sx={{ alignSelf: 'flex-start' }}
              >
                {settingRate
                  ? LL.currency.saving()
                  : LL.currency.setExchangeRate()}
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Exchange Rate History */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              {LL.currency.exchangeRateHistory()} ({selectedFromCurrency} →{' '}
              {selectedToCurrency})
            </Typography>
            {history.length === 0 ? (
              <Typography color="text.secondary">
                {LL.currency.noHistoryAvailable()}
              </Typography>
            ) : (
              <TableContainer sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {LL.currency.date()}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {LL.currency.rate()}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {LL.currency.notes()}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {LL.currency.updatedBy()}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map((rate) => (
                      <TableRow key={rate.id}>
                        <TableCell>
                          {new Date(rate.effectiveDate).toLocaleString()}
                        </TableCell>
                        <TableCell>{rate.rate}</TableCell>
                        <TableCell>{rate.notes || '-'}</TableCell>
                        <TableCell>{rate.createdBy?.name || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        {/* Currency Preferences (Locale → Currency Mapping) */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              {LL.currency.currencyPreferences()}
            </Typography>
            <Stack spacing={2}>
              <TextField
                label={LL.currency.locale()}
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                placeholder="e.g., fa, en, en-US"
                fullWidth
              />
              <TextField
                select
                label={LL.currency.currency()}
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value)}
                fullWidth
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                onClick={handleSetCurrencyPreference}
                disabled={settingPreference}
                sx={{ alignSelf: 'flex-start' }}
              >
                {settingPreference
                  ? LL.currency.saving()
                  : LL.currency.setPreference()}
              </Button>
            </Stack>

            <Typography
              variant="subtitle1"
              sx={{ mt: 3, mb: 2, fontWeight: 600 }}
            >
              {LL.currency.currentPreferences()}
            </Typography>
            {preferences.length === 0 ? (
              <Typography color="text.secondary">
                {LL.currency.noPreferencesSet()}
              </Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {LL.currency.locale()}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {LL.currency.currency()}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {LL.currency.symbol()}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {preferences.map((pref) => (
                      <TableRow key={pref.id}>
                        <TableCell>{pref.locale}</TableCell>
                        <TableCell>
                          {pref.currency.code} - {pref.currency.name}
                        </TableCell>
                        <TableCell>{pref.currency.symbol}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </GlassmorphismContainer>
    </AdminsLayout>
  );
}

export default CurrencyManagement;
