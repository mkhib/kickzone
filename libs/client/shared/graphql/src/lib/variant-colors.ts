import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

type ColorLike = Pick<KickzoneGraphqlTypes.Color, 'name' | 'hexCode'> & {
  id?: number;
};

export const MAX_COLORS_PER_VARIANT = 3;

export function formatVariantColorNames(
  colors?: ColorLike[] | null,
  fallback = ''
): string {
  if (!colors?.length) {
    return fallback;
  }
  return colors.map((c) => c.name || c.hexCode).join(' / ');
}

export function serializeVariantColorHexes(
  colors?: ColorLike[] | null
): string | null {
  if (!colors?.length) {
    return null;
  }
  return colors.map((c) => c.hexCode).join(',');
}

export function parseColorHexes(color?: string | null): string[] {
  if (!color) {
    return [];
  }
  return color
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}
