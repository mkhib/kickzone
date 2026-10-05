import { DataSource } from 'typeorm';
import { SiteLanguage } from '../../../libs/server/entities/src/lib/site-language.entity';
import { BASIC_LANGUAGES } from '../../../libs/server/services/src/lib/site-language.service';

async function seedSiteLanguages() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'kickzone',
    entities: [SiteLanguage],
    synchronize: false,
  });

  await dataSource.initialize();
  console.log('✅ Database connected');

  const langRepo = dataSource.getRepository(SiteLanguage);

  try {
    for (const basic of BASIC_LANGUAGES) {
      let lang = await langRepo.findOne({ where: { code: basic.code } });
      if (!lang) {
        lang = langRepo.create(basic);
        await langRepo.save(lang);
        console.log(`✅ Created site language: ${basic.name} (${basic.code})`);
      } else {
        console.log(`ℹ️  Site language ${basic.code} already exists`);
      }
    }
    console.log('✅ Site languages seeding complete');
  } catch (err) {
    console.error('❌ Error seeding site languages:', err);
  } finally {
    await dataSource.destroy();
  }
}

seedSiteLanguages().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
