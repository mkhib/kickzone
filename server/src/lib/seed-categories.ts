/**
 * Database Seed Script for Basic Categories
 *
 * Inserts common catalog categories with English and Farsi names.
 * Safe to re-run (skips existing slugs, only adds missing translations).
 *
 * Prefer letting the API seed these on startup (CategoryService.onModuleInit).
 * Use this script only if you need to seed without starting the API:
 *   npx ts-node server/src/lib/seed-categories.ts
 */

import { DataSource } from 'typeorm';
import { Category } from '../../../libs/server/entities/src/lib/category.entity';
import { Translation } from '../../../libs/server/entities/src/lib/translation.entity';
import { BASIC_CATEGORIES } from '../../../libs/server/services/src/lib/category.service';

async function seedCategories() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'kickzone',
    entities: [Category, Translation],
    synchronize: false,
  });

  await dataSource.initialize();
  console.log('✅ Database connected');

  const categoryRepo = dataSource.getRepository(Category);
  const translationRepo = dataSource.getRepository(Translation);

  try {
    let created = 0;

    for (const basic of BASIC_CATEGORIES) {
      let category = await categoryRepo.findOne({
        where: { slug: basic.slug },
      });

      if (!category) {
        category = await categoryRepo.save(
          categoryRepo.create({
            slug: basic.slug,
            sortOrder: basic.sortOrder,
            isActive: true,
          })
        );
        created += 1;
        console.log(`✅ Created category ${basic.name.en} (${basic.slug})`);
      } else {
        console.log(
          `ℹ️  Category ${basic.name.en} (${basic.slug}) already exists`
        );
      }

      for (const [locale, value] of [
        ['en', basic.name.en],
        ['fa', basic.name.fa],
      ] as const) {
        const existing = await translationRepo.findOne({
          where: {
            entityType: 'category',
            entityId: category.id,
            locale,
            fieldName: 'name',
          },
        });
        if (!existing) {
          await translationRepo.save(
            translationRepo.create({
              entityType: 'category',
              entityId: category.id,
              locale,
              fieldName: 'name',
              value,
              isAutoTranslated: false,
            })
          );
        }
      }
    }

    console.log(`\n✅ Category seeding completed (${created} new categor(y/ies))`);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
  } finally {
    await dataSource.destroy();
    console.log('\n✅ Database connection closed');
  }
}

seedCategories().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
