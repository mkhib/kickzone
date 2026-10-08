-- Add clothingSize and shoeSize columns to customer_profiles table
ALTER TABLE customer_profiles ADD COLUMN IF NOT EXISTS "clothingSize" VARCHAR(50);
ALTER TABLE customer_profiles ADD COLUMN IF NOT EXISTS "shoeSize" VARCHAR(50);
