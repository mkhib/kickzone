import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import {
  useSearchParams,
  useParams,
  useNavigate,
  Link as RouterLink,
} from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { CustomersLayout } from '@kickzone-workspace/customers-layout';
import { CustomersProductCard } from '@kickzone-workspace/customers-product-card';
import { useProductsQuery } from '@kickzone-workspace/products-hook';
import { useCustomersCartService } from '@kickzone-workspace/customers-cart-hook';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  useI18nContext,
  useLanguageContext,
  usePageTitle,
} from '@kickzone-workspace/shared-i18n';
import {
  CUSTOMER_ROUTES,
  getCustomerBrandRoute,
} from '@kickzone-workspace/customers-routes';
import { resolveCategoryLabel, HomeCategory } from './home-selectors';

const SHOP_CATEGORIES_QUERY = gql`
  query ShopCategories {
    categories {
      id
      slug
      name
    }
  }
`;

const SHOP_BRANDS_QUERY = gql`
  query ShopBrands($onlyWithProducts: Boolean) {
    brands(onlyWithProducts: $onlyWithProducts) {
      id
      slug
      name
      isActive
    }
  }
`;

type ShopBrand = {
  id: number;
  slug: string;
  name: string;
  isActive?: boolean;
};

const filterControlSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    bgcolor: 'var(--paper)',
    color: 'var(--ink)',
    fontFamily: 'var(--font-sans)',
    '& fieldset': {
      borderColor: 'var(--hair)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--ink-3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--accent)',
    },
  },
  '& .MuiInputBase-input': {
    color: 'var(--ink)',
    fontFamily: 'var(--font-sans)',
  },
  '& .MuiInputLabel-root': {
    color: 'var(--ink-2)',
    fontFamily: 'var(--font-sans)',
    '&.Mui-focused': {
      color: 'var(--accent)',
    },
  },
  '& .MuiSelect-icon': {
    color: 'var(--ink-2)',
  },
} as const;

function normalizeSort(sortParam: string): string {
  if (sortParam === 'price_desc') return 'price_desc';
  if (sortParam === 'price_asc') return 'price_asc';
  // Accept legacy/home-page links like ?sort=new
  return 'newest';
}

function toProductsSort(selectedSort: string): {
  sort: string;
  sortOrder: 'asc' | 'desc';
} {
  if (selectedSort === 'price_asc') {
    return { sort: 'PRICE_ASC', sortOrder: 'asc' };
  }
  if (selectedSort === 'price_desc') {
    return { sort: 'PRICE_DESC', sortOrder: 'desc' };
  }
  return { sort: 'ID_DESC', sortOrder: 'desc' };
}

export function splitList(value: string): string[] {
  return uniqueList(
    value
      .split(',')
      .map((v) => v.trim().toLowerCase())
      .filter(Boolean)
  );
}

export function uniqueList(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

export function CustomersShopScreen() {
  const { LL } = useI18nContext();
  const { isRTL, currentLocale } = useLanguageContext();
  const isEn = currentLocale === 'en';

  usePageTitle(
    useCallback(
      () => (isEn ? 'Shop & Catalog' : 'فروشگاه و محصولات'),
      [isEn]
    )
  );

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { brandSlug: brandSlugParam } = useParams<{ brandSlug?: string }>();

  const categoryParam = searchParams.get('category') || '';
  const brandFromQuery = searchParams.get('brand') || '';
  const brandParam = (brandSlugParam || brandFromQuery || '').toLowerCase();
  const brandsFromQuery = searchParams.get('brands') || '';
  const selectedCategories = useMemo(
    () => splitList(categoryParam),
    [categoryParam]
  );
  const selectedBrands = useMemo(
    () => uniqueList([brandParam, ...splitList(brandsFromQuery)]),
    [brandParam, brandsFromQuery]
  );
  const sortParam = searchParams.get('sort') || '';
  const searchParam = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(searchParam);
  const [debouncedSearch, setDebouncedSearch] = useState(searchParam);
  const [selectedSort, setSelectedSort] = useState(normalizeSort(sortParam));

  // Redirect legacy ?brand= to /brands/:slug while preserving other params
  useEffect(() => {
    if (brandSlugParam || !brandFromQuery) return;
    const next = new URLSearchParams(searchParams);
    next.delete('brand');
    const qs = next.toString();
    navigate(
      `${getCustomerBrandRoute(brandFromQuery)}${qs ? `?${qs}` : ''}`,
      { replace: true }
    );
  }, [brandSlugParam, brandFromQuery, searchParams, navigate]);

  useEffect(() => {
    setSearchInput(searchParam);
    setDebouncedSearch(searchParam);
  }, [searchParam]);

  useEffect(() => {
    setSelectedSort(normalizeSort(sortParam));
  }, [sortParam]);

  const { data: categoriesData } = useQuery<{ categories: HomeCategory[] }>(
    SHOP_CATEGORIES_QUERY,
    { fetchPolicy: 'cache-first' }
  );
  const categories = categoriesData?.categories;

  const { data: brandsData } = useQuery<
    { brands: ShopBrand[] },
    { onlyWithProducts: boolean }
  >(SHOP_BRANDS_QUERY, {
    variables: { onlyWithProducts: true },
    fetchPolicy: 'cache-first',
  });
  const brands = useMemo(
    () => (brandsData?.brands || []).filter((b) => b.isActive !== false),
    [brandsData?.brands]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const buildShopUrl = useCallback(
    (state: {
      search: string;
      sort: string;
      categories: string[];
      brands: string[];
    }) => {
      const next = new URLSearchParams(searchParams);
      ['search', 'sort', 'category', 'brand', 'brands'].forEach((key) =>
        next.delete(key)
      );
      if (state.search) next.set('search', state.search);
      if (state.sort && state.sort !== 'newest') next.set('sort', state.sort);
      if (state.categories.length > 0)
        next.set('category', state.categories.join(','));
      // A single brand keeps its SEO-friendly /brands/:slug route.
      if (state.brands.length > 1) next.set('brands', state.brands.join(','));
      const base =
        state.brands.length === 1
          ? getCustomerBrandRoute(state.brands[0])
          : CUSTOMER_ROUTES.SHOP;
      const qs = next.toString();
      return `${base}${qs ? `?${qs}` : ''}`;
    },
    [searchParams]
  );

  const syncUrl = useCallback(
    (patch: {
      search?: string;
      sort?: string;
      categories?: string[];
      brands?: string[];
    }) => {
      navigate(
        buildShopUrl({
          search: patch.search !== undefined ? patch.search : debouncedSearch,
          sort: patch.sort !== undefined ? patch.sort : selectedSort,
          categories: patch.categories ?? selectedCategories,
          brands: patch.brands ?? selectedBrands,
        }),
        { replace: true }
      );
    },
    [
      buildShopUrl,
      debouncedSearch,
      selectedSort,
      selectedCategories,
      selectedBrands,
      navigate,
    ]
  );

  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    const currentSort = normalizeSort(searchParams.get('sort') || '');
    if (currentSearch === debouncedSearch && currentSort === selectedSort) {
      return;
    }
    syncUrl({ search: debouncedSearch, sort: selectedSort });
  }, [debouncedSearch, selectedSort, searchParams, syncUrl]);

  const productsSort = toProductsSort(selectedSort);
  const { products, loading, loadMore, hasNextPage } = useProductsQuery({
    search: debouncedSearch,
    // One value keeps the original single filters; two or more use the multi-select arrays.
    category:
      selectedCategories.length === 1 ? selectedCategories[0] : undefined,
    categorySlugs:
      selectedCategories.length > 1 ? selectedCategories : undefined,
    brand: selectedBrands.length === 1 ? selectedBrands[0] : undefined,
    brands: selectedBrands.length > 1 ? selectedBrands : undefined,
    sort: productsSort.sort,
    sortOrder: productsSort.sortOrder,
    pageSize: 16,
    onlyWithSellers: true,
    onlyInStock: true,
  });

  // Lightweight probe: is any in-stock product discounted? Drives the "sale" chip.
  const { products: discountedProbe } = useProductsQuery({
    search: '',
    pageSize: 1,
    onlyWithSellers: true,
    onlyInStock: true,
    onlyDiscounted: true,
  });
  const hasDiscountedProducts = discountedProbe.length > 0;

  const { addItem } = useCustomersCartService();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasNextPage) return;
    setIsLoadingMore(true);
    try {
      await loadMore();
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasNextPage, loadMore]);

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, handleLoadMore]);

  const categoryLabel = useMemo(() => {
    if (selectedCategories.length === 0) return '';
    const fallbackMap: Record<string, string> = {
      women: LL.home.categories.women(),
      men: LL.home.categories.men(),
      hoodies: LL.home.categories.hoodies(),
      pants: LL.home.categories.pants(),
    };
    return selectedCategories
      .map((slug) =>
        resolveCategoryLabel(
          slug,
          categories,
          fallbackMap[slug.toLowerCase()] || slug
        )
      )
      .join(isEn ? ', ' : '، ');
  }, [selectedCategories, categories, LL, isEn]);

  const brandLabel = useMemo(
    () =>
      selectedBrands
        .map(
          (slug) =>
            brands.find((b) => b.slug.toLowerCase() === slug)?.name || slug
        )
        .join(isEn ? ', ' : '، '),
    [selectedBrands, brands, isEn]
  );

  const heading = selectedCategories.length > 0
    ? LL.home.shop.productsInCategory({ category: categoryLabel })
    : selectedBrands.length > 0
    ? LL.home.shop.productsByBrand({ brand: brandLabel })
    : LL.home.shop.allProducts();

  const hasActiveFilters = Boolean(
    selectedCategories.length > 0 ||
      selectedBrands.length > 0 ||
      debouncedSearch ||
      selectedSort !== 'newest'
  );

  const clearFilters = () => {
    setSearchInput('');
    setDebouncedSearch('');
    setSelectedSort('newest');
    navigate(CUSTOMER_ROUTES.SHOP, { replace: true });
  };

  const categoryChips = useMemo(() => {
    const preferred = [
      'women',
      'men',
      't-shirts',
      'hoodies',
      'pants',
      'sneakers',
      'sale',
    ];
    const bySlug = new Map(
      (categories || []).map((c) => [c.slug.toLowerCase(), c])
    );
    const ordered: HomeCategory[] = [];
    for (const slug of preferred) {
      const hit = bySlug.get(slug);
      if (hit) ordered.push(hit);
    }
    for (const c of categories || []) {
      if (!preferred.includes(c.slug.toLowerCase())) ordered.push(c);
    }
    // Hide the sale chip when nothing is discounted (unless it is already selected).
    return ordered.filter(
      (c) =>
        c.slug.toLowerCase() !== 'sale' ||
        hasDiscountedProducts ||
        selectedCategories.includes('sale')
    );
  }, [categories, hasDiscountedProducts, selectedCategories]);

  return (
    <CustomersLayout>
      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 1, md: 1.5 },
          pb: { xs: 4, md: 6 },
          fontFamily: 'var(--font-sans)',
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontFamily: 'var(--font-sans)',
            fontSize: { xs: '22px', md: '28px' },
            fontWeight: 800,
            color: 'var(--ink)',
            mb: 2.5,
          }}
        >
          {heading}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            mb: 2.5,
            alignItems: { xs: 'stretch', md: 'center' },
            justifyContent: 'space-between',
          }}
        >
          <TextField
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={LL.home.shop.searchPlaceholder()}
            variant="outlined"
            size="small"
            sx={{
              width: { xs: '100%', md: 320 },
              ...filterControlSx,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'var(--ink-3)', fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: searchInput ? (
                <InputAdornment position="end">
                  <ClearIcon
                    sx={{
                      color: 'var(--ink-3)',
                      fontSize: 18,
                      cursor: 'pointer',
                    }}
                    onClick={() => setSearchInput('')}
                  />
                </InputAdornment>
              ) : undefined,
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              width: { xs: '100%', md: 'auto' },
            }}
          >
            <FormControl
              size="small"
              sx={{
                minWidth: 160,
                width: { xs: '100%', sm: 180 },
                ...filterControlSx,
              }}
            >
              <InputLabel id="shop-brand-label">
                {LL.home.shop.brandLabel()}
              </InputLabel>
              <Select
                labelId="shop-brand-label"
                multiple
                value={selectedBrands}
                label={LL.home.shop.brandLabel()}
                renderValue={() => brandLabel || LL.home.shop.allBrands()}
                onChange={(e) => {
                  const value = e.target.value;
                  const picked =
                    typeof value === 'string' ? splitList(value) : value;
                  syncUrl({
                    brands: picked.includes('')
                      ? []
                      : uniqueList(picked.map((v) => v.toLowerCase())),
                  });
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: 'var(--paper)',
                      color: 'var(--ink)',
                      border: '1px solid var(--hair)',
                    },
                  },
                }}
              >
                <MenuItem value="">{LL.home.shop.allBrands()}</MenuItem>
                {brands.map((b) => (
                  <MenuItem key={b.id} value={b.slug.toLowerCase()}>
                    {b.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              size="small"
              sx={{
                minWidth: 160,
                width: { xs: '100%', sm: 180 },
                ...filterControlSx,
              }}
            >
              <InputLabel id="shop-sort-label">
                {LL.home.shop.sortLabel()}
              </InputLabel>
              <Select
                labelId="shop-sort-label"
                value={selectedSort}
                label={LL.home.shop.sortLabel()}
                onChange={(e) => setSelectedSort(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: 'var(--paper)',
                      color: 'var(--ink)',
                      border: '1px solid var(--hair)',
                    },
                  },
                }}
              >
                <MenuItem value="newest">{LL.home.shop.newest()}</MenuItem>
                <MenuItem value="price_asc">{LL.home.shop.cheapest()}</MenuItem>
                <MenuItem value="price_desc">
                  {LL.home.shop.mostExpensive()}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mb: 4,
            alignItems: 'center',
            justifyContent: isRTL ? 'flex-end' : 'flex-start',
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
        >
          <Chip
            label={LL.home.shop.allCategories()}
            clickable
            component={RouterLink}
            to={buildShopUrl({
              search: debouncedSearch,
              sort: selectedSort,
              categories: [],
              brands: selectedBrands,
            })}
            variant={selectedCategories.length === 0 ? 'filled' : 'outlined'}
            sx={{
              fontFamily: 'var(--font-sans)',
              bgcolor: selectedCategories.length === 0 ? 'var(--accent)' : 'transparent',
              color: selectedCategories.length === 0 ? '#fff' : 'var(--ink-2)',
              borderColor: 'var(--hair)',
              '&:hover': {
                bgcolor: selectedCategories.length === 0 ? 'var(--accent)' : 'var(--paper)',
              },
            }}
          />
          {categoryChips.map((cat) => {
            const slug = cat.slug.toLowerCase();
            const active = selectedCategories.includes(slug);
            const nextCategories = active
              ? selectedCategories.filter((c) => c !== slug)
              : [...selectedCategories, slug];
            return (
              <Chip
                key={cat.id}
                label={cat.name}
                clickable
                component={RouterLink}
                to={buildShopUrl({
                  search: debouncedSearch,
                  sort: selectedSort,
                  categories: nextCategories,
                  brands: selectedBrands,
                })}
                aria-pressed={active}
                variant={active ? 'filled' : 'outlined'}
                sx={{
                  fontFamily: 'var(--font-sans)',
                  bgcolor: active ? 'var(--accent)' : 'transparent',
                  color: active ? '#fff' : 'var(--ink-2)',
                  borderColor: 'var(--hair)',
                  '&:hover': {
                    bgcolor: active ? 'var(--accent)' : 'var(--paper)',
                  },
                }}
              />
            );
          })}
          {hasActiveFilters && (
            <Button
              size="small"
              onClick={clearFilters}
              startIcon={<ClearIcon sx={{ fontSize: 16 }} />}
              sx={{
                ml: { xs: 0, sm: 1 },
                color: 'var(--ink-2)',
                fontFamily: 'var(--font-sans)',
                textTransform: 'none',
              }}
            >
              {LL.home.shop.clearFilters()}
            </Button>
          )}
        </Box>

        {loading && products.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
            <CircularProgress sx={{ color: 'var(--accent)' }} />
          </Box>
        ) : products.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 12 }}>
            <Typography
              sx={{
                color: 'var(--ink-3)',
                fontSize: '16px',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {LL.home.shop.noProducts()}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: { xs: '16px', md: '24px' },
            }}
          >
            {products.map((product: KickzoneGraphqlTypes.Product) => (
              <CustomersProductCard
                key={product.id}
                product={product}
                variant="compact"
                onAddToCart={(p) => {
                  const sp =
                    p.sellerProducts?.find((s) => (s.stockQuantity || 0) > 0) ||
                    p.sellerProducts?.[0];
                  if (!sp) return;
                  const pInfo = p.productInfos?.[0];
                  addItem({
                    productId: String(p.id),
                    productName: p.name,
                    productImage: pInfo?.images?.[0] || null,
                    quantity: 1,
                    unitPrice: sp.price,
                    color: pInfo?.colors?.[0]?.name || null,
                    size: pInfo?.size || null,
                    sellerId: String(sp.seller?.id || 1),
                    sellerName: '',
                    sellerShippingFee: sp.seller?.shippingFee || 0,
                    productInfoId: pInfo ? String(pInfo.id) : '',
                    sellerProductId: String(sp.id),
                    availableStock: sp.stockQuantity || 1,
                  });
                }}
              />
            ))}
          </Box>
        )}

        {hasNextPage && (
          <Box
            ref={loaderRef}
            data-testid="products-scroll-loader"
            sx={{ display: 'flex', justifyContent: 'center', py: 6 }}
          >
            {isLoadingMore && (
              <CircularProgress size={28} sx={{ color: 'var(--accent)' }} />
            )}
          </Box>
        )}
      </Container>
    </CustomersLayout>
  );
}

export default CustomersShopScreen;
