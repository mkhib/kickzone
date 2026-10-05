-- Create site_languages table
CREATE TABLE IF NOT EXISTS site_languages (
  id SERIAL PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  "nativeName" VARCHAR(100) NOT NULL,
  "isRTL" BOOLEAN NOT NULL DEFAULT FALSE,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "isDefault" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Seed initial languages: Persian (fa) and English (en)
INSERT INTO site_languages (code, name, "nativeName", "isRTL", "isActive", "isDefault")
VALUES 
  ('fa', 'Persian', 'فارسی', TRUE, TRUE, TRUE),
  ('en', 'English', 'English', FALSE, TRUE, FALSE)
ON CONFLICT (code) DO NOTHING;

-- Create product_descriptions table
CREATE TABLE IF NOT EXISTS product_descriptions (
  id SERIAL PRIMARY KEY,
  "productId" INTEGER NOT NULL REFERENCES product(id) ON DELETE CASCADE,
  "languageId" INTEGER NOT NULL REFERENCES site_languages(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE ("productId", "languageId")
);

CREATE INDEX IF NOT EXISTS "IDX_product_descriptions_productId" ON product_descriptions ("productId");
CREATE INDEX IF NOT EXISTS "IDX_product_descriptions_languageId" ON product_descriptions ("languageId");

-- Backfill existing products.description into product_descriptions for default language
DO $$
DECLARE
  default_lang_id INTEGER;
BEGIN
  SELECT id INTO default_lang_id FROM site_languages WHERE "isDefault" = TRUE LIMIT 1;
  IF default_lang_id IS NULL THEN
    SELECT id INTO default_lang_id FROM site_languages WHERE code = 'fa' LIMIT 1;
  END IF;
  
  IF default_lang_id IS NOT NULL THEN
    INSERT INTO product_descriptions ("productId", "languageId", description)
    SELECT p.id, default_lang_id, p.description
    FROM product p
    WHERE p.description IS NOT NULL 
      AND TRIM(p.description) <> ''
      AND NOT EXISTS (
        SELECT 1 FROM product_descriptions pd 
        WHERE pd."productId" = p.id AND pd."languageId" = default_lang_id
      );
  END IF;
END $$;
