-- Seed basic catalog categories (idempotent)
-- Categories table + EN/FA name translations

INSERT INTO categories (slug, "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES
  ('men', 1, true, NOW(), NOW()),
  ('women', 2, true, NOW(), NOW()),
  ('kids', 3, true, NOW(), NOW()),
  ('unisex', 4, true, NOW(), NOW()),
  ('boys', 5, true, NOW(), NOW()),
  ('girls', 6, true, NOW(), NOW()),
  ('sneakers', 10, true, NOW(), NOW()),
  ('running', 11, true, NOW(), NOW()),
  ('football', 12, true, NOW(), NOW()),
  ('cleats', 13, true, NOW(), NOW()),
  ('training', 14, true, NOW(), NOW()),
  ('basketball', 15, true, NOW(), NOW()),
  ('casual', 16, true, NOW(), NOW()),
  ('formal', 17, true, NOW(), NOW()),
  ('boots', 18, true, NOW(), NOW()),
  ('hiking', 19, true, NOW(), NOW()),
  ('sandals', 20, true, NOW(), NOW()),
  ('slippers', 21, true, NOW(), NOW()),
  ('new-arrivals', 30, true, NOW(), NOW()),
  ('sale', 31, true, NOW(), NOW()),
  ('limited-edition', 32, true, NOW(), NOW()),
  ('accessories', 33, true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- English names
INSERT INTO translations ("entityType", "entityId", locale, "fieldName", value, "isAutoTranslated", "createdAt", "updatedAt")
SELECT 'category', c.id, 'en', 'name', v.en_name, false, NOW(), NOW()
FROM categories c
JOIN (
  VALUES
    ('men', 'Men'),
    ('women', 'Women'),
    ('kids', 'Kids'),
    ('unisex', 'Unisex'),
    ('boys', 'Boys'),
    ('girls', 'Girls'),
    ('sneakers', 'Sneakers'),
    ('running', 'Running'),
    ('football', 'Football'),
    ('cleats', 'Cleats'),
    ('training', 'Training'),
    ('basketball', 'Basketball'),
    ('casual', 'Casual'),
    ('formal', 'Formal'),
    ('boots', 'Boots'),
    ('hiking', 'Hiking'),
    ('sandals', 'Sandals'),
    ('slippers', 'Slippers'),
    ('new-arrivals', 'New Arrivals'),
    ('sale', 'Sale'),
    ('limited-edition', 'Limited Edition'),
    ('accessories', 'Accessories')
) AS v(slug, en_name) ON c.slug = v.slug
ON CONFLICT ("entityType", "entityId", locale, "fieldName") DO NOTHING;

-- Farsi names
INSERT INTO translations ("entityType", "entityId", locale, "fieldName", value, "isAutoTranslated", "createdAt", "updatedAt")
SELECT 'category', c.id, 'fa', 'name', v.fa_name, false, NOW(), NOW()
FROM categories c
JOIN (
  VALUES
    ('men', 'مردانه'),
    ('women', 'زنانه'),
    ('kids', 'بچگانه'),
    ('unisex', 'یونیسکس'),
    ('boys', 'پسرانه'),
    ('girls', 'دخترانه'),
    ('sneakers', 'اسنیکرز'),
    ('running', 'دویدن'),
    ('football', 'فوتبال'),
    ('cleats', 'استوک'),
    ('training', 'تمرینی'),
    ('basketball', 'بسکتبال'),
    ('casual', 'روزمره'),
    ('formal', 'رسمی'),
    ('boots', 'بوت'),
    ('hiking', 'کوهنوردی'),
    ('sandals', 'صندل'),
    ('slippers', 'دمپایی'),
    ('new-arrivals', 'جدید'),
    ('sale', 'حراج'),
    ('limited-edition', 'نسخه محدود'),
    ('accessories', 'لوازم جانبی')
) AS v(slug, fa_name) ON c.slug = v.slug
ON CONFLICT ("entityType", "entityId", locale, "fieldName") DO NOTHING;
