export enum SizeKind {
  Apparel = 'APPAREL',
  Footwear = 'FOOTWEAR',
  Pants = 'PANTS',
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

function isValidPantsDimension(value: number | string | null | undefined): boolean {
  if (typeof value === 'number') {
    return Number.isInteger(value) && value >= 1 && value <= 99;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!/^[1-9]\d?$/.test(trimmed)) {
      return false;
    }
    const num = Number(trimmed);
    return Number.isInteger(num) && num >= 1 && num <= 99;
  }
  return false;
}

export function parsePantsSize(
  raw: string | null | undefined,
): { waist: number; inseam: number } | null {
  if (typeof raw !== 'string') {
    return null;
  }
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }
  const match =
    /^(?:[wW]\s*)?([1-9]\d?)(?:\s*[xX×*/]\s*(?:[lL]\s*)?|\s+[lL]\s*|\s*-\s*[lL]\s*)([1-9]\d?)$/.exec(
      trimmed,
    );
  if (!match) {
    return null;
  }
  const [, waistRaw, inseamRaw] = match;
  if (!isValidPantsDimension(waistRaw) || !isValidPantsDimension(inseamRaw)) {
    return null;
  }
  return {
    waist: Number(waistRaw),
    inseam: Number(inseamRaw),
  };
}

/** Canonical pants composite: "waistxinseam" e.g. "32x34". */
export function formatPantsSize(
  waist: number | string | null | undefined,
  inseam: number | string | null | undefined,
): string {
  if (!isValidPantsDimension(waist) || !isValidPantsDimension(inseam)) {
    return '';
  }
  const w = Number(String(waist).trim());
  const l = Number(String(inseam).trim());
  return `${w}x${l}`;
}

export function isApparelSizeCode(code: string): code is ApparelSizeCode {
  return (APPAREL_SIZES as readonly string[]).includes(code.toUpperCase());
}

export function isFootwearEuCode(code: string): boolean {
  return FOOTWEAR_EU_SIZES.includes(normalizeFootwearEuCode(code));
}

export function isApparelSizeKind(kind?: SizeKind | string | null): boolean {
  return String(kind ?? '').trim().toUpperCase() === SizeKind.Apparel;
}

export function isFootwearSizeKind(kind?: SizeKind | string | null): boolean {
  return String(kind ?? '').trim().toUpperCase() === SizeKind.Footwear;
}

export function isPantsSizeKind(kind?: SizeKind | string | null): boolean {
  return String(kind ?? '').trim().toUpperCase() === SizeKind.Pants;
}

export function normalizeSizeCode(
  kind: SizeKind | string,
  raw: string
): string | null {
  const trimmed = String(raw ?? '').trim();
  if (!trimmed) {
    return null;
  }
  if (isApparelSizeKind(kind)) {
    const upper = trimmed.toUpperCase();
    return isApparelSizeCode(upper) ? upper : null;
  }
  if (isPantsSizeKind(kind)) {
    const parsed = parsePantsSize(trimmed);
    return parsed ? formatPantsSize(parsed.waist, parsed.inseam) : null;
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
  kind: SizeKind | string,
  canonicalCode: string,
  system: FootwearSizeSystem = FootwearSizeSystem.Eu
): string {
  if (isApparelSizeKind(kind)) {
    return canonicalCode;
  }
  if (isPantsSizeKind(kind)) {
    const parsed = parsePantsSize(canonicalCode);
    return parsed ? `W${parsed.waist}/L${parsed.inseam}` : canonicalCode;
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
  kind: SizeKind | string,
  system: FootwearSizeSystem,
  selected: string[]
): string[] {
  if (!selected.length) {
    return [];
  }
  if (isApparelSizeKind(kind)) {
    return selected
      .map((s) => normalizeSizeCode(SizeKind.Apparel, s))
      .filter((s): s is string => !!s);
  }
  if (isPantsSizeKind(kind)) {
    return Array.from(
      new Set(
        selected
          .map((s) => normalizeSizeCode(SizeKind.Pants, s))
          .filter((s): s is string => !!s),
      ),
    );
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
  const pants = parsePantsSize(trimmed);
  if (pants) {
    return {
      sizeKind: SizeKind.Pants,
      size: formatPantsSize(pants.waist, pants.inseam),
    };
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

export function sortSizeCodes(kind: SizeKind | string, codes: string[]): string[] {
  if (isApparelSizeKind(kind)) {
    return [...codes].sort(
      (a, b) =>
        APPAREL_SIZES.indexOf(a as ApparelSizeCode) -
        APPAREL_SIZES.indexOf(b as ApparelSizeCode)
    );
  }
  if (isPantsSizeKind(kind)) {
    return [...codes].sort((a, b) => {
      const pa = parsePantsSize(a);
      const pb = parsePantsSize(b);
      if (!pa || !pb) {
        return 0;
      }
      if (pa.waist !== pb.waist) {
        return pa.waist - pb.waist;
      }
      return pa.inseam - pb.inseam;
    });
  }
  return [...codes].sort(
    (a, b) => Number(normalizeFootwearEuCode(a)) - Number(normalizeFootwearEuCode(b))
  );
}
