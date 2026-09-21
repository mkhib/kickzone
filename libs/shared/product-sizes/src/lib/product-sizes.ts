export enum SizeKind {
  Apparel = 'APPAREL',
  Footwear = 'FOOTWEAR',
}

export enum FootwearSizeSystem {
  Eu = 'EU',
  Us = 'US',
}

export const APPAREL_SIZES = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'XXXL',
] as const;

export type ApparelSizeCode = (typeof APPAREL_SIZES)[number];

/** EU adult unisex list: 35–50 inclusive, half steps. */
export const FOOTWEAR_EU_SIZES: string[] = (() => {
  const sizes: string[] = [];
  for (let n = 35; n <= 50; n += 0.5) {
    sizes.push(normalizeFootwearEuCode(String(n)));
  }
  return sizes;
})();

/**
 * Adult unisex EU → US men's approximation chart.
 * Half EU sizes map to the nearest listed US step.
 */
const EU_TO_US: Record<string, number> = {
  '35': 4,
  '35.5': 4.5,
  '36': 5,
  '36.5': 5.5,
  '37': 6,
  '37.5': 6.5,
  '38': 6.5,
  '38.5': 7,
  '39': 7,
  '39.5': 7.5,
  '40': 7.5,
  '40.5': 8,
  '41': 8.5,
  '41.5': 9,
  '42': 9,
  '42.5': 9.5,
  '43': 10,
  '43.5': 10.5,
  '44': 10.5,
  '44.5': 11,
  '45': 11.5,
  '45.5': 12,
  '46': 12,
  '46.5': 12.5,
  '47': 13,
  '47.5': 13.5,
  '48': 14,
  '48.5': 14.5,
  '49': 15,
  '49.5': 15.5,
  '50': 16,
};

function formatUsCode(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, '');
}

/** Unique sorted US codes derived from the chart. */
export const FOOTWEAR_US_SIZES: string[] = Array.from(
  new Set(Object.values(EU_TO_US).map(formatUsCode))
).sort((a, b) => Number(a) - Number(b));

export function normalizeFootwearEuCode(raw: string): string {
  const n = Number(String(raw).trim().replace(',', '.'));
  if (!Number.isFinite(n)) {
    return String(raw).trim();
  }
  // Drop trailing .0; keep .5
  if (Number.isInteger(n)) {
    return String(n);
  }
  const rounded = Math.round(n * 2) / 2;
  if (Number.isInteger(rounded)) {
    return String(rounded);
  }
  return rounded.toFixed(1);
}

export function isApparelSizeCode(code: string): code is ApparelSizeCode {
  return (APPAREL_SIZES as readonly string[]).includes(code.toUpperCase());
}

export function isFootwearEuCode(code: string): boolean {
  return FOOTWEAR_EU_SIZES.includes(normalizeFootwearEuCode(code));
}

export function normalizeSizeCode(
  kind: SizeKind,
  raw: string
): string | null {
  const trimmed = String(raw ?? '').trim();
  if (!trimmed) {
    return null;
  }
  if (kind === SizeKind.Apparel) {
    const upper = trimmed.toUpperCase();
    return isApparelSizeCode(upper) ? upper : null;
  }
  const eu = normalizeFootwearEuCode(trimmed);
  return isFootwearEuCode(eu) ? eu : null;
}

export function euToUs(euCode: string): string | null {
  const eu = normalizeFootwearEuCode(euCode);
  const us = EU_TO_US[eu];
  return us === undefined ? null : formatUsCode(us);
}

export function usToEuCodes(usCode: string): string[] {
  const target = Number(String(usCode).trim().replace(',', '.'));
  if (!Number.isFinite(target)) {
    return [];
  }
  return Object.entries(EU_TO_US)
    .filter(([, us]) => us === target)
    .map(([eu]) => eu);
}

export function formatSizeLabel(
  kind: SizeKind,
  canonicalCode: string,
  system: FootwearSizeSystem = FootwearSizeSystem.Eu
): string {
  if (kind === SizeKind.Apparel) {
    return canonicalCode;
  }
  if (system === FootwearSizeSystem.Us) {
    const us = euToUs(canonicalCode);
    return us ? `US ${us}` : `EU ${canonicalCode}`;
  }
  return `EU ${canonicalCode}`;
}

/**
 * Expand UI filter selections into canonical ProductInfo.size codes for SQL IN.
 * Apparel: selections are already letters.
 * Footwear: if system is US, map each US size to one or more EU codes.
 */
export function expandFilterSizes(
  kind: SizeKind,
  system: FootwearSizeSystem,
  selected: string[]
): string[] {
  if (!selected.length) {
    return [];
  }
  if (kind === SizeKind.Apparel) {
    return selected
      .map((s) => normalizeSizeCode(SizeKind.Apparel, s))
      .filter((s): s is string => !!s);
  }
  if (system === FootwearSizeSystem.Eu) {
    return selected
      .map((s) => normalizeSizeCode(SizeKind.Footwear, s))
      .filter((s): s is string => !!s);
  }
  const euCodes = new Set<string>();
  for (const us of selected) {
    for (const eu of usToEuCodes(us)) {
      euCodes.add(eu);
    }
  }
  return Array.from(euCodes);
}

export function inferSizeKindFromRaw(raw: string): {
  sizeKind: SizeKind;
  size: string;
} {
  const trimmed = String(raw ?? '').trim();
  if (!trimmed) {
    return { sizeKind: SizeKind.Apparel, size: '' };
  }
  const apparel = normalizeSizeCode(SizeKind.Apparel, trimmed);
  if (apparel) {
    return { sizeKind: SizeKind.Apparel, size: apparel };
  }
  const footwear = normalizeSizeCode(SizeKind.Footwear, trimmed);
  if (footwear) {
    return { sizeKind: SizeKind.Footwear, size: footwear };
  }
  // Numeric-ish → treat as footwear raw; otherwise apparel raw
  if (/^\d+([.,]\d+)?$/.test(trimmed)) {
    return {
      sizeKind: SizeKind.Footwear,
      size: normalizeFootwearEuCode(trimmed),
    };
  }
  return { sizeKind: SizeKind.Apparel, size: trimmed.toUpperCase() };
}

export function sortSizeCodes(kind: SizeKind, codes: string[]): string[] {
  if (kind === SizeKind.Apparel) {
    return [...codes].sort(
      (a, b) =>
        APPAREL_SIZES.indexOf(a as ApparelSizeCode) -
        APPAREL_SIZES.indexOf(b as ApparelSizeCode)
    );
  }
  return [...codes].sort(
    (a, b) => Number(normalizeFootwearEuCode(a)) - Number(normalizeFootwearEuCode(b))
  );
}
