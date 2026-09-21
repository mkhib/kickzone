-- Migrate ProductInfo from single colorId FK to ordered product_info_color rows.
-- Run before or after deploying multi-color support if you have existing variants.
-- Safe to re-run (skips when join rows already exist for a product_info).

-- Create join table if TypeORM synchronize has not already
CREATE TABLE IF NOT EXISTS product_info_color (
  id SERIAL PRIMARY KEY,
  "productInfoId" INTEGER NOT NULL REFERENCES product_info(id) ON DELETE CASCADE,
  "colorId" INTEGER NOT NULL REFERENCES colors(id),
  position INTEGER NOT NULL DEFAULT 0,
  UNIQUE ("productInfoId", position)
);

-- Backfill from legacy product_info.colorId when that column still exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'product_info' AND column_name = 'colorId'
  ) THEN
    INSERT INTO product_info_color ("productInfoId", "colorId", position)
    SELECT pi.id, pi."colorId", 0
    FROM product_info pi
    WHERE pi."colorId" IS NOT NULL
      AND NOT EXISTS (
        SELECT 1 FROM product_info_color pic WHERE pic."productInfoId" = pi.id
      );

    ALTER TABLE product_info DROP COLUMN IF EXISTS "colorId";
  END IF;
END $$;
