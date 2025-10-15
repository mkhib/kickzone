/**
 * Simple JavaScript seed script for currencies
 * Run with: node server/src/lib/seed-currencies.js
 */

const { Client } = require('pg');
require('dotenv').config();

async function seedCurrencies() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'kickzone',
  });

  try {
    await client.connect();
    console.log('✅ Database connected');

    // 1. Create USD (Base Currency)
    await client.query(`
      INSERT INTO currency (code, name, symbol, "decimalPlaces", "isActive", "isBaseCurrency", "createdAt", "updatedAt")
      VALUES ('USD', 'US Dollar', '$', 2, true, true, NOW(), NOW())
      ON CONFLICT (code) DO UPDATE SET "isBaseCurrency" = true
      RETURNING *
    `);
    console.log('✅ Created/Updated USD currency');

    // 2. Create IRR (Iranian Rial/Toman)
    await client.query(`
      INSERT INTO currency (code, name, symbol, "decimalPlaces", "isActive", "isBaseCurrency", "createdAt", "updatedAt")
      VALUES ('IRR', 'Iranian Rial', 'تومان', 0, true, false, NOW(), NOW())
      ON CONFLICT (code) DO NOTHING
      RETURNING *
    `);
    console.log('✅ Created IRR currency');

    // 3. Get currency IDs
    const currencies = await client.query(
      "SELECT * FROM currency WHERE code IN ('USD', 'IRR')"
    );
    const usd = currencies.rows.find((c) => c.code === 'USD');
    const irr = currencies.rows.find((c) => c.code === 'IRR');

    // 4. Set initial exchange rate (1 USD = 50,000 Toman)
    const existingRate = await client.query(
      `
      SELECT * FROM exchange_rate 
      WHERE "fromCurrencyId" = $1 AND "toCurrencyId" = $2
    `,
      [usd.id, irr.id]
    );

    if (existingRate.rows.length === 0) {
      await client.query(
        `
        INSERT INTO exchange_rate ("fromCurrencyId", "toCurrencyId", rate, "effectiveDate", "createdAt", notes)
        VALUES ($1, $2, 50000, NOW(), NOW(), 'Initial exchange rate - seed data')
      `,
        [usd.id, irr.id]
      );
      console.log(
        '✅ Created initial USD→IRR exchange rate: 1 USD = 50,000 Toman'
      );
    } else {
      console.log('ℹ️  Exchange rate already exists');
    }

    // 5. Set currency preferences
    // Farsi (fa) → Iranian Rial
    await client.query(
      `
      INSERT INTO currency_preference (locale, "currencyId", "isActive", "createdAt", "updatedAt")
      VALUES ('fa', $1, true, NOW(), NOW())
      ON CONFLICT (locale) DO UPDATE SET "currencyId" = $1
    `,
      [irr.id]
    );
    console.log('✅ Set preference: fa → IRR');

    // English (en) → US Dollar
    await client.query(
      `
      INSERT INTO currency_preference (locale, "currencyId", "isActive", "createdAt", "updatedAt")
      VALUES ('en', $1, true, NOW(), NOW())
      ON CONFLICT (locale) DO UPDATE SET "currencyId" = $1
    `,
      [usd.id]
    );
    console.log('✅ Set preference: en → USD');

    console.log('\n✅ Currency seeding completed successfully!');
    console.log('\nSummary:');
    console.log('- Base currency: USD');
    console.log('- Available currencies: USD, IRR');
    console.log('- Exchange rate: 1 USD = 50,000 Toman');
    console.log('- Locale preferences: fa→IRR, en→USD');
  } catch (error) {
    console.error('❌ Error seeding currencies:', error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n✅ Database connection closed');
  }
}

seedCurrencies();
