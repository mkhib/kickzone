import { gql } from '@apollo/client';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { resolveProductBrand } from '@kickzone-workspace/customers-product-card';
import { getCustomerBrandRoute } from '@kickzone-workspace/customers-routes';

export const HOME_PAGE_QUERY = gql`
  query HomePage {
    all: products(filter: { first: 200, onlyInStock: true, onlyWithSellers: true, archivedStatus: ACTIVE }) {
      totalCount
      edges {
        node {
          id
          name
          sku
          brandId
          brand {
            id
            slug
            name
          }
          categories {
            id
            slug
            name
          }
          productInfos {
            id
            size
            sizeKind
            images
            colors {
              id
              name
              hexCode
            }
          }
          sellerProducts {
            id
            productInfoId
            price
            discount
            stockQuantity
            seller {
              id
              shippingFee
            }
          }
        }
      }
    }
    categories {
      id
      slug
      name
    }
    rate: currentExchangeRate(fromCurrencyCode: "USD", toCurrencyCode: "IRR") {
      rate
    }
  }
`;

export interface HomePageData {
  all?: {
    totalCount: number;
    edges: Array<{
      node: KickzoneGraphqlTypes.Product;
    }>;
  };
  categories?: Array<{
    id: number;
    slug: string;
    name: string;
  }>;
  rate?: {
    rate: number;
  };
}

/**
 * Format a number into Persian digits with thousand separators
 */
export function toPersianDigits(n: number | string): string {
  const num = typeof n === 'string' ? parseFloat(n) : n;
  if (isNaN(num)) return String(n);
  return new Intl.NumberFormat('fa-IR').format(num);
}

/**
 * Format price in Toman
 */
export function formatTomanPrice(
  usdPrice: number,
  rate = 270000,
  discount = 0,
  currencyLabel = 'تومان',
  locale: 'fa' | 'en' = 'fa'
): string {
  const finalUSD = discount > 0 ? usdPrice * (1 - discount / 100) : usdPrice;
  const toman = Math.round(finalUSD * rate);
  return `${new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US').format(toman)} ${currencyLabel}`;
}

export type HomeCategory = {
  id: number;
  slug: string;
  name: string;
};

/** Resolve a category display name from API (locale-aware) with slug fallback. */
export function resolveCategoryLabel(
  slug: string,
  categories: HomeCategory[] | undefined,
  fallback: string
): string {
  const match = categories?.find(
    (c) => (c.slug || '').toLowerCase() === slug.toLowerCase()
  );
  if (match?.name) {
    return match.name;
  }
  return fallback;
}

/**
 * Check whether a product is strictly in-stock with active sellers
 */
export function isProductInStock(product: KickzoneGraphqlTypes.Product): boolean {
  if (!product.sellerProducts || product.sellerProducts.length === 0) return false;
  return product.sellerProducts.some(
    (sp) => sp.seller && (sp.stockQuantity || 0) > 0
  );
}

/**
 * Check if product belongs to women category
 */
export function isWomenProduct(product: KickzoneGraphqlTypes.Product): boolean {
  const cats = product.categories || [];
  return cats.some((c) => {
    const slug = (c.slug || '').toLowerCase();
    const name = (c.name || '').toLowerCase();
    return (
      slug === 'women' ||
      slug === 'womens' ||
      slug.includes('women') ||
      name.includes('زنانه') ||
      name.includes('women')
    );
  });
}

/**
 * Check if product belongs to men category
 */
export function isMenProduct(product: KickzoneGraphqlTypes.Product): boolean {
  if (isWomenProduct(product)) {
    return false;
  }
  const cats = product.categories || [];
  return cats.some((c) => {
    const slug = (c.slug || '').toLowerCase();
    const name = (c.name || '').toLowerCase();
    return (
      slug === 'men' ||
      slug === 'mens' ||
      /\bmen\b/i.test(slug) ||
      name.includes('مردانه') ||
      /\bmen\b/i.test(name)
    );
  });
}

/**
 * Look up a product by SKU (case-insensitive) or by ID
 */
export function findProduct(
  products: KickzoneGraphqlTypes.Product[],
  skuOrId: string | number
): KickzoneGraphqlTypes.Product | undefined {
  if (typeof skuOrId === 'number') {
    return products.find((p) => p.id === skuOrId);
  }
  const clean = skuOrId.trim().toUpperCase();
  // match SKU
  const bySku = products.find(
    (p) => (p.sku || '').trim().toUpperCase() === clean
  );
  if (bySku) return bySku;
  // match ID string
  const numId = parseInt(clean, 10);
  if (!isNaN(numId)) {
    return products.find((p) => p.id === numId);
  }
  return undefined;
}

/**
 * Derives all required home page sections data
 */
export function selectHomePageData(data?: HomePageData | null) {
  const rawList = data?.all?.edges?.map((e) => e.node) || [];
  // Filter only products that are in stock
  const allInStock = rawList.filter(isProductInStock);

  const exchangeRate = data?.rate?.rate || 270000;

  // 1. Curated Hero Products
  // Right: DX2324-531 or id 26
  const heroRight =
    findProduct(allInStock, 'DX2324-531') ||
    findProduct(allInStock, 26) ||
    allInStock.find(isWomenProduct);

  // Center: FV7247-010 or id 91
  const heroCenter =
    findProduct(allInStock, 'FV7247-010') ||
    findProduct(allInStock, 91) ||
    allInStock[0];

  // Left: HV0959-020 or id 77
  const heroLeft =
    findProduct(allInStock, 'HV0959-020') ||
    findProduct(allInStock, 77) ||
    allInStock.find(isMenProduct);

  // Set of IDs used in hero
  const heroIds = new Set<number>(
    [heroRight?.id, heroCenter?.id, heroLeft?.id].filter(
      (id): id is number => typeof id === 'number'
    )
  );

  // Category Bento Items
  // Big Jordan: FZ1919-366
  const bentoJordan = findProduct(allInStock, 'FZ1919-366');
  // Women: DX0397-277
  const bentoWomen = findProduct(allInStock, 'DX0397-277');
  // Men: IF2934-010
  const bentoMen = findProduct(allInStock, 'IF2934-010');
  // Hoodies: DM3330-646
  const bentoHoodies = findProduct(allInStock, 'DM3330-646');
  // Pants: FD7212-340
  const bentoPants = findProduct(allInStock, 'FD7212-340');

  // Counts live compute per category
  let jordanCount = 0;
  let womenCount = 0;
  let menCount = 0;
  let hoodiesCount = 0;
  let pantsCount = 0;

  allInStock.forEach((p) => {
    const brandName = resolveProductBrand(p).toLowerCase();
    if (brandName === 'jordan' || p.brand?.slug === 'jordan') jordanCount++;

    const cats = p.categories || [];
    let isPWomen = false;
    let isPHoodie = false;
    let isPPant = false;

    cats.forEach((c) => {
      const slug = (c.slug || '').toLowerCase();
      const name = (c.name || '').toLowerCase();
      if (
        slug === 'women' ||
        slug === 'womens' ||
        slug.includes('women') ||
        name.includes('زنانه') ||
        name.includes('women')
      ) {
        isPWomen = true;
      }
      if (
        slug.includes('hoodie') ||
        name.includes('hoodie') ||
        name.includes('هودی')
      ) {
        isPHoodie = true;
      }
      if (
        slug.includes('pant') ||
        name.includes('pant') ||
        name.includes('شلوار')
      ) {
        isPPant = true;
      }
    });

    const isPMen =
      !isPWomen &&
      cats.some((c) => {
        const slug = (c.slug || '').toLowerCase();
        const name = (c.name || '').toLowerCase();
        return (
          slug === 'men' ||
          slug === 'mens' ||
          /\bmen\b/i.test(slug) ||
          name.includes('مردانه') ||
          /\bmen\b/i.test(name)
        );
      });

    if (isPWomen) womenCount++;
    if (isPMen) menCount++;
    if (isPHoodie) hoodiesCount++;
    if (isPPant) pantsCount++;
  });

  const bentoData = {
    jordan: { product: bentoJordan, count: jordanCount },
    women: { product: bentoWomen, count: womenCount },
    men: { product: bentoMen, count: menCount },
    hoodies: { product: bentoHoodies, count: hoodiesCount },
    pants: { product: bentoPants, count: pantsCount },
  };

  // 4. Brand Blocks
  // Nike
  const nikeMedia = findProduct(allInStock, 'FB8008-063');
  const nikeMini = [
    findProduct(allInStock, 'DX2324-531'),
    findProduct(allInStock, 'BV0507-100'),
  ].filter((p): p is KickzoneGraphqlTypes.Product => Boolean(p));

  // Jordan
  const jordanMedia = findProduct(allInStock, 'DQ7544-662');
  const jordanMini = [
    findProduct(allInStock, 'CJ0921-011'),
    findProduct(allInStock, 'DA9854-091'),
  ].filter((p): p is KickzoneGraphqlTypes.Product => Boolean(p));

  // Adidas (FL0147 only; HM2137 is out of stock so never show it)
  const adidasMedia = findProduct(allInStock, 'FL0147');
  const adidasMini = [findProduct(allInStock, 'FL0147')].filter(
    (p): p is KickzoneGraphqlTypes.Product => Boolean(p)
  );

  const brandBlocksData = [
    {
      brand: 'NIKE',
      mediaProduct: nikeMedia,
      lineKey: 'nike' as const,
      miniProducts: nikeMini,
      link: getCustomerBrandRoute('nike'),
    },
    {
      brand: 'JORDAN',
      mediaProduct: jordanMedia,
      lineKey: 'jordan' as const,
      miniProducts: jordanMini,
      link: getCustomerBrandRoute('jordan'),
    },
    {
      brand: 'ADIDAS',
      mediaProduct: adidasMedia,
      lineKey: 'adidas' as const,
      miniProducts: adidasMini,
      link: getCustomerBrandRoute('adidas'),
    },
  ];

  const brandBlockIds = new Set<number>();
  brandBlocksData.forEach((b) => {
    if (b.mediaProduct?.id) brandBlockIds.add(b.mediaProduct.id);
    b.miniProducts.forEach((p) => brandBlockIds.add(p.id));
  });

  // New Arrivals (Newest by highest product id first)
  // Exclude products used in hero and brand blocks
  const excludedIds = new Set<number>([
    ...Array.from(heroIds),
    ...Array.from(brandBlockIds),
  ]);

  const sortedByIdDesc = [...allInStock].sort((a, b) => b.id - a.id);

  const availableWomen = sortedByIdDesc.filter(
    (p) => isWomenProduct(p) && !excludedIds.has(p.id)
  );
  const availableMen = sortedByIdDesc.filter(
    (p) => isMenProduct(p) && !excludedIds.has(p.id)
  );

  const newestWomen4 = availableWomen.slice(0, 4);
  const newestMen4 = availableMen.slice(0, 4);

  // Interleave women, men, women, men... (8 total)
  const interleaved8: KickzoneGraphqlTypes.Product[] = [];
  const maxLen = Math.max(newestWomen4.length, newestMen4.length);
  for (let i = 0; i < maxLen; i++) {
    if (newestWomen4[i]) interleaved8.push(newestWomen4[i]);
    if (newestMen4[i]) interleaved8.push(newestMen4[i]);
  }

  const newArrivals = {
    all: interleaved8,
    women: newestWomen4,
    men: newestMen4,
  };

  // 6. Picks Rail Products (max 10 in-stock in specified order)
  const picksOrderSKUs = [
    'DD5094-133',
    'DC5276-596',
    'CZ8528-397',
    'DR1025-247',
    'CN3000-100',
    'DZ6026-448',
    'CK0160-010',
    'DQ6304-010',
    '682852-355',
    'DR6171-063',
  ];

  const usedSoFar = new Set<number>([
    ...Array.from(excludedIds),
    ...interleaved8.map((p) => p.id),
  ]);

  const picksList: KickzoneGraphqlTypes.Product[] = [];
  picksOrderSKUs.forEach((sku) => {
    const found = findProduct(allInStock, sku);
    if (found && !usedSoFar.has(found.id)) {
      picksList.push(found);
      usedSoFar.add(found.id);
    }
  });

  // Fill up to 10 if fewer remain
  if (picksList.length < 10) {
    for (const p of sortedByIdDesc) {
      if (!usedSoFar.has(p.id)) {
        picksList.push(p);
        usedSoFar.add(p.id);
        if (picksList.length >= 10) break;
      }
    }
  }

  return {
    exchangeRate,
    categories: (data?.categories || []) as HomeCategory[],
    hero: {
      right: heroRight,
      center: heroCenter,
      left: heroLeft,
    },
    bento: bentoData,
    brandBlocks: brandBlocksData,
    newArrivals,
    picks: picksList,
  };
}
