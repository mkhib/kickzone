# Currency Setup Guide

This guide explains how to set up and use the multi-currency feature in Kickzone.

## Initial Setup

### 1. Run the Currency Seed Script

After setting up your database, run the seed script to initialize currencies:

```bash
# Make sure your .env file has the correct database credentials
# DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME

# Run the seed script
npx ts-node server/src/lib/seed-currencies.ts
```

This will create:

- **USD** (US Dollar) - Base currency for all product prices
- **IRR** (Iranian Rial/Toman) - For Iranian market
- Initial exchange rate: 1 USD = 50,000 Toman
- Currency preferences:
  - `fa` locale → Toman (IRR)
  - `en` locale → USD

### 2. Update Exchange Rates

Exchange rates can be updated through the admin panel:

1. Navigate to **Currency Management** in the admin panel
2. Select currencies (e.g., USD → IRR)
3. Enter the new exchange rate
4. Add optional notes (e.g., "Market rate update")
5. Click "Set Exchange Rate"

## How It Works

### Backend

1. **All prices are stored in USD** in the database (`SellerProduct.price`)
2. Exchange rates are stored in the `ExchangeRate` table
3. Currency preferences map locales to currencies (`fa` → `IRR`)

### Frontend

1. **PriceDisplay Component**: Automatically converts and displays prices

   ```tsx
   import { PriceDisplay } from '@kickzone-workspace/price-display';

   <PriceDisplay priceInUSD={99.99} showOriginal={true} />;
   ```

   - For Farsi users: Shows "۴,۹۹۹,۵۰۰ تومان"
   - For English users: Shows "$99.99"

2. **Hooks**:
   - `useCurrencyForLocale()` - Get currency for current locale
   - `useConvertPrice()` - Convert prices
   - `useExchangeRate()` - Get exchange rates

### Usage Examples

```tsx
// Example 1: Display a price
import { PriceDisplay } from '@kickzone-workspace/price-display';

function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <PriceDisplay
        priceInUSD={product.price}
        showSymbol={true}
        showOriginal={false} // Don't show USD equivalent in Farsi
      />
    </div>
  );
}

// Example 2: Manual conversion
import { useConvertPrice } from '@kickzone-workspace/currency-hook';

function CustomPriceDisplay({ price }) {
  const { convertedAmount, symbol, loading } = useConvertPrice({
    amount: price,
    fromCurrency: 'USD',
    toCurrency: 'IRR', // Or get from locale
  });

  if (loading) return <span>Loading...</span>;

  return (
    <span>
      {convertedAmount} {symbol}
    </span>
  );
}
```

## Admin Panel

### Currency Management Screen

Located at: `libs/client/admins/screens/currency-management`

Features:

- View current exchange rates
- Set new exchange rates with notes
- View exchange rate history
- Manage currency preferences (locale → currency mapping)

### Adding New Currencies

To add support for additional currencies (e.g., EUR, GBP):

1. **Add Currency** (via GraphQL mutation or directly in DB):

   ```graphql
   mutation {
     createCurrency(input: { code: "EUR", name: "Euro", symbol: "€", decimalPlaces: 2, isActive: true }) {
       id
       code
     }
   }
   ```

2. **Set Exchange Rate**:

   ```graphql
   mutation {
     setExchangeRate(input: { fromCurrencyCode: "USD", toCurrencyCode: "EUR", rate: 0.92, notes: "Initial rate" }) {
       id
       rate
     }
   }
   ```

3. **Set Locale Preference** (optional):
   ```graphql
   mutation {
     setCurrencyPreference(locale: "de", currencyCode: "EUR") {
       id
     }
   }
   ```

## Important Notes

1. **Always store prices in USD** in the database
2. **Update exchange rates regularly** through the admin panel
3. **IRR uses 0 decimal places** (Toman doesn't use decimals)
4. **Historical rates** are preserved for tracking
5. **Conversion happens on the fly** on the client side

## Updating Exchange Rates

It's recommended to:

- Update exchange rates daily or weekly
- Add notes explaining rate changes
- Monitor exchange rate history for anomalies

You can automate this by:

1. Creating a scheduled job (cron) to fetch rates from an API
2. Using the `setExchangeRate` GraphQL mutation
3. Running the update with admin credentials

## Troubleshooting

### Prices not converting

- Check if exchange rate exists: Use `GET_CURRENT_EXCHANGE_RATE` query
- Verify currency preference for locale exists
- Check browser console for GraphQL errors

### Wrong currency showing

- Verify user's locale is set correctly
- Check currency preference mapping
- Ensure `useCurrencyForLocale` hook is working

### Exchange rate not updating

- Verify admin permissions
- Check if `effectiveDate` is in the past
- Refresh the page to clear cache
