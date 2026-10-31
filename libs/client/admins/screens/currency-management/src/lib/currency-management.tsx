import { AdminsLayout } from '@kickzone-workspace/admins-layout';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';
import { GlassmorphismContainer } from '@kickzone-workspace/glassmorphism-container';
import { getLtrTextFieldProps } from '@kickzone-workspace/language-components';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { useAdminsCurrencyManagement } from '@kickzone-workspace/admins-currency-management-hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  exchangeRateFormSchema,
  type ExchangeRateFormInput,
} from '@kickzone-workspace/validation';

export function CurrencyManagement() {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.adminCurrency());
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const cardSx = {
    mb: 3,
    backgroundColor: isDark
      ? 'rgba(20, 20, 24, 0.9)'
      : 'rgba(255, 255, 255, 0.92)',
    border: `1px solid ${
      isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
    }`,
    boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.45)' : undefined,
  };

  const {
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
    currencies,
    currentRate,
    history,
    preferences,
    settingRate,
    settingPreference,
    handleSetExchangeRate,
    handleSetCurrencyPreference,
  } = useAdminsCurrencyManagement();

  const rateForm = useForm<ExchangeRateFormInput>({
    values: { rate: newRate, notes },
    resolver: zodResolver(exchangeRateFormSchema),
    mode: 'onSubmit',
  });
  const rateError = rateForm.formState.errors.rate;
  const submitExchangeRate = async () => {
    if (!(await rateForm.trigger())) return;
    handleSetExchangeRate();
  };

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
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            {LL.currency.currentExchangeRate()}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <TextField
              select
              value={selectedFromCurrency}
              onChange={(e) => setSelectedFromCurrency(e.target.value)}
              size="small"
              sx={{ minWidth: 200 }}
              disabled={currencies.length === 0}
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
              disabled={currencies.length === 0}
            >
              {currencies.map((currency) => (
                <MenuItem key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          {currentRate && (
            <Stack spacing={0.5} sx={{ mt: 2 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary' }}
              >
                {LL.currency.currentRate()}: 1 {selectedFromCurrency} ={' '}
                {currentRate.rate} {selectedToCurrency}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: isDark ? 'rgba(255,255,255,0.65)' : 'text.secondary',
                }}
              >
                {LL.currency.lastUpdated()}:{' '}
                {new Date(currentRate.effectiveDate).toLocaleString()}
              </Typography>
            </Stack>
          )}
        </Box>

        {/* Set New Exchange Rate */}
        <Card sx={cardSx}>
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
                error={Boolean(rateError)}
                helperText={rateError ? LL.currency.enterExchangeRate() : undefined}
                fullWidth
                {...getLtrTextFieldProps()}
                slotProps={{
                  htmlInput: { dir: 'ltr', step: 0.000001 },
                }}
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
                onClick={submitExchangeRate}
                loading={settingRate}
                disabled={currencies.length === 0 || !selectedFromCurrency || !selectedToCurrency}
                sx={{ alignSelf: 'flex-start' }}
              >
                {LL.currency.setExchangeRate()}
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
                {...getLtrTextFieldProps()}
              />
              <TextField
                select
                label={LL.currency.currency()}
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value)}
                fullWidth
                disabled={currencies.length === 0}
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
                loading={settingPreference}
                disabled={currencies.length === 0 || !currencyCode}
                sx={{ alignSelf: 'flex-start' }}
              >
                {LL.currency.setPreference()}
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
