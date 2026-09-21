-- Seed basic catalog colors (idempotent)
-- Colors table + EN/FA name translations

INSERT INTO colors ("hexCode", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES
  ('#000000', 1, true, NOW(), NOW()),
  ('#FFFFFF', 2, true, NOW(), NOW()),
  ('#808080', 3, true, NOW(), NOW()),
  ('#C0C0C0', 4, true, NOW(), NOW()),
  ('#FF0000', 5, true, NOW(), NOW()),
  ('#0000FF', 6, true, NOW(), NOW()),
  ('#000080', 7, true, NOW(), NOW()),
  ('#008000', 8, true, NOW(), NOW()),
  ('#FFFF00', 9, true, NOW(), NOW()),
  ('#FFA500', 10, true, NOW(), NOW()),
  ('#800080', 11, true, NOW(), NOW()),
  ('#FFC0CB', 12, true, NOW(), NOW()),
  ('#A52A2A', 13, true, NOW(), NOW()),
  ('#F5F5DC', 14, true, NOW(), NOW()),
  ('#FFD700', 15, true, NOW(), NOW())
ON CONFLICT ("hexCode") DO NOTHING;

-- English names
INSERT INTO translations ("entityType", "entityId", locale, "fieldName", value, "isAutoTranslated", "createdAt", "updatedAt")
SELECT 'color', c.id, 'en', 'name', v.en_name, false, NOW(), NOW()
FROM colors c
JOIN (
  VALUES
    ('#000000', 'Black'),
    ('#FFFFFF', 'White'),
    ('#808080', 'Gray'),
    ('#C0C0C0', 'Silver'),
    ('#FF0000', 'Red'),
    ('#0000FF', 'Blue'),
    ('#000080', 'Navy'),
    ('#008000', 'Green'),
    ('#FFFF00', 'Yellow'),
    ('#FFA500', 'Orange'),
    ('#800080', 'Purple'),
    ('#FFC0CB', 'Pink'),
    ('#A52A2A', 'Brown'),
    ('#F5F5DC', 'Beige'),
    ('#FFD700', 'Gold')
) AS v(hex, en_name) ON c."hexCode" = v.hex
ON CONFLICT ("entityType", "entityId", locale, "fieldName") DO NOTHING;

-- Farsi names
INSERT INTO translations ("entityType", "entityId", locale, "fieldName", value, "isAutoTranslated", "createdAt", "updatedAt")
SELECT 'color', c.id, 'fa', 'name', v.fa_name, false, NOW(), NOW()
FROM colors c
JOIN (
  VALUES
    ('#000000', 'مشکی'),
    ('#FFFFFF', 'سفید'),
    ('#808080', 'خاکستری'),
    ('#C0C0C0', 'نقره‌ای'),
    ('#FF0000', 'قرمز'),
    ('#0000FF', 'آبی'),
    ('#000080', 'سرمه‌ای'),
    ('#008000', 'سبز'),
    ('#FFFF00', 'زرد'),
    ('#FFA500', 'نارنجی'),
    ('#800080', 'بنفش'),
    ('#FFC0CB', 'صورتی'),
    ('#A52A2A', 'قهوه‌ای'),
    ('#F5F5DC', 'بژ'),
    ('#FFD700', 'طلایی')
) AS v(hex, fa_name) ON c."hexCode" = v.hex
ON CONFLICT ("entityType", "entityId", locale, "fieldName") DO NOTHING;
