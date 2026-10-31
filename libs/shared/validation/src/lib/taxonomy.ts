import { z } from 'zod';

export const TAXONOMY_LIMITS = {
  slug: { max: 100 },
  name: { max: 100 },
  languageCode: { max: 10 },
} as const;

/** `#rgb`, `#rrggbb` or `#rrggbbaa`. */
export const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

/** Slugs are built from names (lowercase, spaces to hyphens), so only blanks and whitespace are rejected. */
export const slugSchema = z.string().trim().min(1).max(TAXONOMY_LIMITS.slug.max).regex(/^\S+$/);
export const displayNameSchema = z.string().trim().min(1).max(TAXONOMY_LIMITS.name.max);
/** Optional translated name argument (`name`) on brand/category/color mutations. */
export const optionalDisplayNameSchema = z.string().trim().max(TAXONOMY_LIMITS.name.max).nullish();
export const hexColorSchema = z.string().trim().regex(HEX_COLOR_PATTERN);
const sortOrder = z.number().int().nullish();
const flag = z.boolean().nullish();

export const createBrandSchema = z.object({ slug: slugSchema, sortOrder });
export const updateBrandSchema = z.object({
  id: z.number().int(),
  slug: slugSchema.nullish(),
  sortOrder,
  isActive: flag,
});

export const createCategorySchema = createBrandSchema;
export const updateCategorySchema = updateBrandSchema;

export const createColorSchema = z.object({ hexCode: hexColorSchema, sortOrder });
export const updateColorSchema = z.object({ hexCode: hexColorSchema, sortOrder, isActive: flag });

export const languageCodeSchema = z
  .string()
  .trim()
  .min(2)
  .max(TAXONOMY_LIMITS.languageCode.max)
  .regex(/^[A-Za-z]{2,3}(?:[-_][A-Za-z0-9]{2,8})*$/);

export const createSiteLanguageSchema = z.object({
  code: languageCodeSchema,
  name: displayNameSchema,
  nativeName: displayNameSchema,
  isRTL: flag,
  isActive: flag,
  isDefault: flag,
});

export const updateSiteLanguageSchema = z.object({
  name: displayNameSchema.nullish(),
  nativeName: displayNameSchema.nullish(),
  isRTL: flag,
  isActive: flag,
  isDefault: flag,
});

/** Admin category modal. */
export const categoryFormSchema = z.object({ name: displayNameSchema });
/** Admin color modal. */
export const colorFormSchema = z.object({ name: displayNameSchema, hexCode: hexColorSchema });

export type CategoryFormInput = z.input<typeof categoryFormSchema>;
export type ColorFormInput = z.input<typeof colorFormSchema>;