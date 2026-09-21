/**
 * Database Seed Script for Basic Colors
 *
 * Inserts common catalog colors with English and Farsi names.
 * Safe to re-run (skips existing hex codes, upserts translations).
 *
 * Prefer letting the API seed these on startup (ColorService.onModuleInit).
 * Use this script only if you need to seed without starting the API:
 *   npx ts-node server/src/lib/seed-colors.ts
 */

import { DataSource } from 'typeorm';
import { Color } from '../../../libs/server/entities/src/lib/color.entity';
import { Translation } from '../../../libs/server/entities/src/lib/translation.entity';
import { BASIC_COLORS } from '../../../libs/server/services/src/lib/color.service';

function normalizeHex(hexCode: string): string {
  const trimmed = hexCode.trim();
  return trimmed.startsWith('#')
    ? trimmed.toUpperCase()
    : `#${trimmed.toUpperCase()}`;
}

async function seedColors() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'kickzone',
    entities: [Color, Translation],
    synchronize: false,
  });

  await dataSource.initialize();
  console.log('✅ Database connected');

  const colorRepo = dataSource.getRepository(Color);
  const translationRepo = dataSource.getRepository(Translation);

  try {
    let created = 0;

    for (const basic of BASIC_COLORS) {
      const hexCode = normalizeHex(basic.hexCode);
      let color = await colorRepo.findOne({ where: { hexCode } });

      if (!color) {
        color = await colorRepo.save(
          colorRepo.create({
            hexCode,
            sortOrder: basic.sortOrder,
            isActive: true,
          })
        );
        created += 1;
        console.log(`✅ Created color ${basic.name.en} (${hexCode})`);
      } else {
        console.log(`ℹ️  Color ${basic.name.en} (${hexCode}) already exists`);
      }

      for (const [locale, value] of [
        ['en', basic.name.en],
        ['fa', basic.name.fa],
      ] as const) {
        const existing = await translationRepo.findOne({
          where: {
            entityType: 'color',
            entityId: color.id,
            locale,
            fieldName: 'name',
          },
        });
        if (!existing) {
          await translationRepo.save(
            translationRepo.create({
              entityType: 'color',
              entityId: color.id,
              locale,
              fieldName: 'name',
              value,
              isAutoTranslated: false,
            })
          );
        }
      }
    }

    console.log(`\n✅ Color seeding completed (${created} new color(s))`);
  } catch (error) {
    console.error('❌ Error seeding colors:', error);
  } finally {
    await dataSource.destroy();
    console.log('\n✅ Database connection closed');
  }
}

seedColors().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
