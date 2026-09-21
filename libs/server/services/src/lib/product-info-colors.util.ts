import { Color, ProductInfoColor } from '@kickzone-workspace/entities';

export const MAX_COLORS_PER_VARIANT = 3;

export function orderedColorsFromLinks(
  colorLinks?: ProductInfoColor[] | null
): Color[] {
  if (!colorLinks?.length) {
    return [];
  }
  return [...colorLinks]
    .sort((a, b) => a.position - b.position)
    .map((link) => link.color)
    .filter((color): color is Color => !!color);
}

export function serializeProductInfoColorHexes(
  colorLinks?: ProductInfoColor[] | null
): string | undefined {
  const hexes = orderedColorsFromLinks(colorLinks).map((c) => c.hexCode);
  return hexes.length ? hexes.join(',') : undefined;
}

export function formatProductInfoColorNames(
  colorLinks?: ProductInfoColor[] | null
): string {
  return orderedColorsFromLinks(colorLinks)
    .map((c) => c.name || c.hexCode)
    .join(' / ');
}
