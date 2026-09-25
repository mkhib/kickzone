/**
 * Database Seed Script for Currencies
 *
 * This script initializes the database with:
 * - USD (US Dollar) as the base currency
 * - IRR row used for Farsi display / ZarinPal (amounts stored as Toman / تومان)
 * - Initial exchange rate: 1 USD = 50,000 Toman (adjust as needed)
 * - Currency preferences: fa → IRR, en → USD
 *
 * Run this script once after setting up the database:
 * ts-node server/src/lib/seed-currencies.ts
 */

import { DataSource } from 'typeorm';
import { Currency } from '../../../libs/server/entities/src/lib/currency.entity';
import { ExchangeRate } from '../../../libs/server/entities/src/lib/exchange-rate.entity';
import { CurrencyPreference } from '../../../libs/server/entities/src/lib/currency-preference.entity';

async function seedCurrencies() {
  // Create database connection
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'kickzone',
    entities: [Currency, ExchangeRate, CurrencyPreference],
    synchronize: false,
  });

  await dataSource.initialize();
  console.log('✅ Database connected');

  const currencyRepo = dataSource.getRepository(Currency);
  const exchangeRateRepo = dataSource.getRepository(ExchangeRate);
  const preferenceRepo = dataSource.getRepository(CurrencyPreference);

  try {
    // 1. Create USD (Base Currency)
    let usd = await currencyRepo.findOne({ where: { code: 'USD' } });
    if (!usd) {
      usd = currencyRepo.create({
        code: 'USD',
        name: 'US Dollar',
        symbol: '$',
        decimalPlaces: 2,
        isActive: true,
        isBaseCurrency: true,
      });
      await currencyRepo.save(usd);
      console.log('✅ Created USD currency');
    } else {
      console.log('ℹ️  USD currency already exists');
    }

    // 2. Create IRR row used for Farsi display / ZarinPal amounts.
    // NOTE: We label the code IRR but store values as Toman (تومان), matching
    // ZarinPal's IRT unit. Do not treat these amounts as Rials.
    let irr = await currencyRepo.findOne({ where: { code: 'IRR' } });
    if (!irr) {
      irr = currencyRepo.create({
        code: 'IRR',
        name: 'Iranian Toman (stored as IRR)',
        symbol: 'تومان',
        decimalPlaces: 0, // No decimal places for Toman
        isActive: true,
        isBaseCurrency: false,
      });
      await currencyRepo.save(irr);
      console.log('✅ Created IRR currency (Toman amounts)');
    } else {
      console.log('ℹ️  IRR currency already exists');
    }

    // 3. Set initial exchange rate (USD → Toman under IRR code)
    // NOTE: Adjust this rate according to current market rates
    const existingRate = await exchangeRateRepo.findOne({
      where: {
        fromCurrencyId: usd.id,
        toCurrencyId: irr.id,
      },
    });

    if (!existingRate) {
      const exchangeRate = exchangeRateRepo.create({
        fromCurrencyId: usd.id,
        toCurrencyId: irr.id,
        rate: 50000, // 1 USD = 50,000 Toman (adjust as needed)
        effectiveDate: new Date(),
        notes: 'Initial exchange rate - seed data (Toman under IRR code)',
      });
      await exchangeRateRepo.save(exchangeRate);
      console.log(
        '✅ Created initial USD→IRR exchange rate: 1 USD = 50,000 Toman'
      );
    } else {
      console.log('ℹ️  Exchange rate already exists');
    }

    // 4. Set currency preferences
    // Farsi (fa) → Iranian Rial
    let faPreference = await preferenceRepo.findOne({
      where: { locale: 'fa' },
    });
    if (!faPreference) {
      faPreference = preferenceRepo.create({
        locale: 'fa',
        currencyId: irr.id,
        isActive: true,
      });
      await preferenceRepo.save(faPreference);
      console.log('✅ Created preference: fa → IRR');
    } else {
      console.log('ℹ️  Farsi preference already exists');
    }

    // English (en) → US Dollar
    let enPreference = await preferenceRepo.findOne({
      where: { locale: 'en' },
    });
    if (!enPreference) {
      enPreference = preferenceRepo.create({
        locale: 'en',
        currencyId: usd.id,
        isActive: true,
      });
      await preferenceRepo.save(enPreference);
      console.log('✅ Created preference: en → USD');
    } else {
      console.log('ℹ️  English preference already exists');
    }

    console.log('\n✅ Currency seeding completed successfully!');
    console.log('\nSummary:');
    console.log('- Base currency: USD');
    console.log('- Available currencies: USD, IRR');
    console.log('- Exchange rate: 1 USD = 50,000 Toman');
    console.log('- Locale preferences: fa→IRR, en→USD');
  } catch (error) {
    console.error('❌ Error seeding currencies:', error);
  } finally {
    await dataSource.destroy();
    console.log('\n✅ Database connection closed');
  }
}

// Run the seed function
seedCurrencies().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
