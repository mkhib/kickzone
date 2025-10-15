-- Initial Currency Seed Data
-- Run this script to initialize currencies, exchange rates, and preferences

-- Insert USD (Base Currency)
INSERT INTO currency (code, name, symbol, "decimalPlaces", "isActive", "isBaseCurrency", "createdAt", "updatedAt")
VALUES ('USD', 'US Dollar', '$', 2, true, true, NOW(), NOW())
ON CONFLICT (code) DO NOTHING;

-- Insert IRR (Iranian Rial/Toman)
INSERT INTO currency (code, name, symbol, "decimalPlaces", "isActive", "isBaseCurrency", "createdAt", "updatedAt")
VALUES ('IRR', 'Iranian Rial', 'تومان', 0, true, false, NOW(), NOW())
ON CONFLICT (code) DO NOTHING;

-- Insert initial exchange rate: 1 USD = 50,000 Toman
-- Adjust the rate (50000) to match current market rates
INSERT INTO exchange_rate ("fromCurrencyId", "toCurrencyId", rate, "effectiveDate", "createdAt", notes)
SELECT 
    (SELECT id FROM currency WHERE code = 'USD'),
    (SELECT id FROM currency WHERE code = 'IRR'),
    50000,
    NOW(),
    NOW(),
    'Initial exchange rate - seed data'
WHERE NOT EXISTS (
    SELECT 1 FROM exchange_rate 
    WHERE "fromCurrencyId" = (SELECT id FROM currency WHERE code = 'USD')
    AND "toCurrencyId" = (SELECT id FROM currency WHERE code = 'IRR')
);

-- Set currency preference: Farsi (fa) → Iranian Rial
INSERT INTO currency_preference (locale, "currencyId", "isActive", "createdAt", "updatedAt")
SELECT 
    'fa',
    (SELECT id FROM currency WHERE code = 'IRR'),
    true,
    NOW(),
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM currency_preference WHERE locale = 'fa'
);

-- Set currency preference: English (en) → US Dollar
INSERT INTO currency_preference (locale, "currencyId", "isActive", "createdAt", "updatedAt")
SELECT 
    'en',
    (SELECT id FROM currency WHERE code = 'USD'),
    true,
    NOW(),
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM currency_preference WHERE locale = 'en'
);

-- Verify the data
SELECT 'Currencies:' as info;
SELECT * FROM currency ORDER BY code;

SELECT 'Exchange Rates:' as info;
SELECT 
    er.*,
    c1.code as from_currency,
    c2.code as to_currency
FROM exchange_rate er
JOIN currency c1 ON er."fromCurrencyId" = c1.id
JOIN currency c2 ON er."toCurrencyId" = c2.id;

SELECT 'Currency Preferences:' as info;
SELECT 
    cp.*,
    c.code as currency_code,
    c.symbol
FROM currency_preference cp
JOIN currency c ON cp."currencyId" = c.id;

