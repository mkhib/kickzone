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

export function CurrencyManagement() {
  const { showSnackbar } = useSnackbar();
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
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Currency Management</h1>

        {/* Current Exchange Rates */}
        <section
          style={{
            background: 'white',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: '#333',
              borderBottom: '2px solid #f0f0f0',
              paddingBottom: '0.5rem',
            }}
          >
            Current Exchange Rate
          </h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <select
              value={selectedFromCurrency}
              onChange={(e) => setSelectedFromCurrency(e.target.value)}
              style={{
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
            <span> → </span>
            <select
              value={selectedToCurrency}
              onChange={(e) => setSelectedToCurrency(e.target.value)}
              style={{
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          {currentRate && (
            <div
              style={{
                background: '#f9f9f9',
                padding: '1rem',
                borderRadius: '4px',
                borderLeft: '4px solid #4caf50',
              }}
            >
              <p>
                <strong>Current Rate:</strong> 1 {selectedFromCurrency} ={' '}
                {currentRate.rate} {selectedToCurrency}
              </p>
              <p>
                <small>
                  Last updated:{' '}
                  {new Date(currentRate.effectiveDate).toLocaleString()}
                </small>
              </p>
            </div>
          )}
        </section>

        {/* Set New Exchange Rate */}
        <section
          style={{
            background: 'white',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: '#333',
              borderBottom: '2px solid #f0f0f0',
              paddingBottom: '0.5rem',
            }}
          >
            Set New Exchange Rate
          </h2>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <label style={{ fontWeight: 500, color: '#555' }}>
                New Rate (1 {selectedFromCurrency} = ? {selectedToCurrency}):
              </label>
              <input
                type="number"
                value={newRate}
                onChange={(e) => setNewRate(e.target.value)}
                placeholder="Enter exchange rate"
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                }}
                step="0.000001"
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <label style={{ fontWeight: 500, color: '#555' }}>
                Notes (optional):
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Reason for rate change..."
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                }}
                rows={3}
              />
            </div>
            <button
              onClick={handleSetExchangeRate}
              disabled={settingRate}
              style={{
                padding: '0.75rem 1.5rem',
                background: settingRate ? '#ccc' : '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: settingRate ? 'not-allowed' : 'pointer',
                alignSelf: 'flex-start',
              }}
            >
              {settingRate ? 'Saving...' : 'Set Exchange Rate'}
            </button>
          </div>
        </section>

        {/* Exchange Rate History */}
        <section
          style={{
            background: 'white',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: '#333',
              borderBottom: '2px solid #f0f0f0',
              paddingBottom: '0.5rem',
            }}
          >
            Exchange Rate History ({selectedFromCurrency} → {selectedToCurrency}
            )
          </h2>
          <div style={{ marginTop: '1rem' }}>
            {history.length === 0 ? (
              <p>No history available</p>
            ) : (
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  marginTop: '1rem',
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        borderBottom: '1px solid #eee',
                        background: '#f5f5f5',
                        fontWeight: 600,
                        color: '#333',
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        borderBottom: '1px solid #eee',
                        background: '#f5f5f5',
                        fontWeight: 600,
                        color: '#333',
                      }}
                    >
                      Rate
                    </th>
                    <th
                      style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        borderBottom: '1px solid #eee',
                        background: '#f5f5f5',
                        fontWeight: 600,
                        color: '#333',
                      }}
                    >
                      Notes
                    </th>
                    <th
                      style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        borderBottom: '1px solid #eee',
                        background: '#f5f5f5',
                        fontWeight: 600,
                        color: '#333',
                      }}
                    >
                      Updated By
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((rate) => (
                    <tr key={rate.id} style={{ background: 'transparent' }}>
                      <td
                        style={{
                          padding: '0.75rem',
                          textAlign: 'left',
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        {new Date(rate.effectiveDate).toLocaleString()}
                      </td>
                      <td
                        style={{
                          padding: '0.75rem',
                          textAlign: 'left',
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        {rate.rate}
                      </td>
                      <td
                        style={{
                          padding: '0.75rem',
                          textAlign: 'left',
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        {rate.notes || '-'}
                      </td>
                      <td
                        style={{
                          padding: '0.75rem',
                          textAlign: 'left',
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        {rate.createdBy?.name || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Currency Preferences (Locale → Currency Mapping) */}
        <section
          style={{
            background: 'white',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: '#333',
              borderBottom: '2px solid #f0f0f0',
              paddingBottom: '0.5rem',
            }}
          >
            Currency Preferences
          </h2>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <label style={{ fontWeight: 500, color: '#555' }}>Locale:</label>
              <input
                type="text"
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                placeholder="e.g., fa, en, en-US"
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <label style={{ fontWeight: 500, color: '#555' }}>
                Currency:
              </label>
              <select
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value)}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                }}
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSetCurrencyPreference}
              disabled={settingPreference}
              style={{
                padding: '0.75rem 1.5rem',
                background: settingPreference ? '#ccc' : '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: settingPreference ? 'not-allowed' : 'pointer',
                alignSelf: 'flex-start',
              }}
            >
              {settingPreference ? 'Saving...' : 'Set Preference'}
            </button>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <h3 style={{ marginTop: '1.5rem', color: '#555' }}>
              Current Preferences
            </h3>
            {preferences.length === 0 ? (
              <p>No preferences set</p>
            ) : (
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  marginTop: '1rem',
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        borderBottom: '1px solid #eee',
                        background: '#f5f5f5',
                        fontWeight: 600,
                        color: '#333',
                      }}
                    >
                      Locale
                    </th>
                    <th
                      style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        borderBottom: '1px solid #eee',
                        background: '#f5f5f5',
                        fontWeight: 600,
                        color: '#333',
                      }}
                    >
                      Currency
                    </th>
                    <th
                      style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        borderBottom: '1px solid #eee',
                        background: '#f5f5f5',
                        fontWeight: 600,
                        color: '#333',
                      }}
                    >
                      Symbol
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {preferences.map((pref) => (
                    <tr key={pref.id}>
                      <td
                        style={{
                          padding: '0.75rem',
                          textAlign: 'left',
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        {pref.locale}
                      </td>
                      <td
                        style={{
                          padding: '0.75rem',
                          textAlign: 'left',
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        {pref.currency.code} - {pref.currency.name}
                      </td>
                      <td
                        style={{
                          padding: '0.75rem',
                          textAlign: 'left',
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        {pref.currency.symbol}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </AdminsLayout>
  );
}

export default CurrencyManagement;
