# Restyle the SAINTBALA product details page (PDP) in "Liquid Glass" (desktop + mobile, light + dark)

You are working in the saintbala.com codebase. The stack is React 19, Vite, MUI v5/6 (sx props), Apollo Client, Zustand, React Router v7 and typesafe-i18n. The backend is NestJS GraphQL on Postgres.
Your job is a **visual restyle of one page**: `CustomerProductDetails` (routes `/products/:id` and `/product/:id`).
The approved target design is described exactly below, so you can build it without seeing any image. Reference renders and HTML may also be attached (see §13).

**Hard rules (read before you write code)**
1. **No new features, buttons, links, tabs, icons with actions, badges, ratings, reviews, share, wishlist sync, quantity steppers, delivery info or copy.** Every visible label in this spec already exists in the current code. If you think something is missing, write it in your final report and do not add it.
2. **Keep all existing behaviour:** routes, handlers, state, GraphQL documents, cart logic (`useCustomersCartService().addItem`), stock rules, zoom/pan dialog, size-guide dialog, snackbar, page title, loading skeleton, not-found state, `PriceDisplay`, locale and theme stores.
3. **Keep existing i18n.** Where the PDP uses `LL.*` keys, keep them. Where it uses inline `u ? "fa" : "en"` ternaries (most PDP strings do), keep the exact same strings. The only i18n change allowed is the related-card bug fix in §9.2.1.
4. **Do not touch unrelated pages.** Header, footer and tab bar are shared components. Restyle them **only through an opt-in prop** passed from the PDP (§5, §9.3, §9.4). Home, cart, login, orders and profile must look exactly as they do now. The shared `CustomersProductCard` gets **only** the i18n fix from §9.2.1 plus an opt-in `appearance="glass"` look used by the PDP.
5. **Work in small, verifiable steps** (§12). After each step, run `tsc --noEmit`, lint and `vite build`. Load `/products/91` in fa and en, light and dark, at 390 and 1440 px, and compare with this spec before you continue.
6. Persian (fa, RTL) is the default locale. English (en, LTR) is the design reference. Both must work (RTL rules in §3, §5, §7 and step 6 of §12).

---

## 0. What exists today (verified in the shipped bundle, Oct 2026)

- **Component:** `CustomerProductDetails` inside `CustomersLayout` (renders `Headerbar`, `CustomersFooter` and, on mobile, `CustomersTabbar`).
- **Locale:** `useLanguageContext().currentLocale` (`"fa" | "en"`), stored in localStorage `kickzone-language-preference`. `<html data-locale="fa|en">` switches `--font-sans` (fa: Vazirmatn; en: Manrope). `farsiDisplayStack = '"El Messiri","Vazirmatn","Manrope",sans-serif'`.
- **Theme:** `useUIStore(s => s.theme.mode)` (`light|dark`, persisted as `kickzone-theme-mode`), plus `[data-theme=light|dark]` CSS variables in `index.css`: `--page --paper --ink --ink-2 --ink-3 --hair --accent --focus --ease` etc. The global `:focus-visible` uses `--focus`. `.skip-link` already exists.
- **Data:** `useProductById(id)` → `query Product($id:Int!){ product(id:$id){ ...ProductFields } }`.
  `ProductFields` = `id name sku archived description descriptions{ id productId languageId language{ id code name nativeName isRTL } description } categories{ id name slug } brand{ id name slug } brandId productInfos{ id size sizeKind colors{ id name hexCode } weight images } sellerProducts{ id productInfoId price discount stockQuantity boxLess seller{ id storeName shippingFee user{ id name } } productInfo{ ...ProductInfoFields } }`.
- **Related products:** `useProductsQuery({ search:"", categoryId: product.categories[0].id, pageSize:6, onlyWithSellers:true, onlyInStock:true })`, which excludes the current id, keeps items that have `sellerProducts` and `productInfos`, and takes 4. They render with `CustomersProductCard` in a MUI `Grid` (`xs:12, sm:6, md:4, lg:3`).
- **Derived values already in the component (keep them):**
  - `extractBrand(name)` gives the brand.
  - Variant grouping by colour set (`Fe`), the selected colour key (`S`), sizes in stock (`Ne`, sorted by `sortSizeCodes`), the selected size (`C`) and the selected variant (`Ie`).
  - Price object `He {originalPrice, finalPrice, discount, stockQuantity}`.
  - `tt` = low stock (1 to 5 left).
  - `Je` = out of stock (no offer, or stock 0).
  - Image list `Ce` (de-duplicated images of the selected colour's variants, falling back to all variants, then `PRODUCT_IMAGE_PLACEHOLDER`) and the current index `R`.
  - `getProductAmbientTint(colors)` gives an RGB tint for the gallery backdrop.
- **Existing PDP strings (en / fa). These are the only texts you may show:**

| Element | English | Persian |
|---|---|---|
| Breadcrumb root | Store | فروشگاه |
| Breadcrumb middle | `categories[0].name`, `categories[1].name` (from API) | same |
| Breadcrumb last | product name (ellipsis) | same |
| Hint pill | Hover to zoom • Click to expand | حرکت نشانگر برای زوم یا کلیک برای نمایش بزرگ |
| Zoom tooltip | Full Zoom View | بزرگ‌نمایی تصویر (تمام‌صفحه) |
| Badge | NEW | جدید |
| Meta line | `{brand} · {categories[0].name}` (e.g. "Jordan · Men") | same |
| SKU | `Product Code: {sku}` | `کد محصول: {sku}` |
| Discount pill (only if discount > 0) | `{n}% OFF` + struck original price | `{n}٪ تخفیف` |
| Low stock (1–5) | `Only {n} left in stock — Order now` | `تنها {n} عدد باقی مانده — همین حالا رزرو کنید` |
| Out of stock | Out of Stock | ناموجود در انبار |
| Colour label | `Color: {colour names}` | `رنگ: {colour names}` (+ swatch Tooltip with the names) |
| Size label | Size | سایز |
| Size guide link | Size Guide | راهنمای سایز |
| No sizes | No sizes currently available for this color | سایزی برای این رنگ موجود نیست |
| Primary | Add to Cart / Added to Cart / Out of Stock | افزودن به سبد خرید / به سبد خرید افزوده شد / ناموجود |
| Secondary | Buy Now | خرید فوری |
| Accordions | Description · Details & Materials · Size Guide | توضیحات · جزئیات و جنس · راهنمای سایز |
| Details rows | Brand: · SKU: · Material: · Care: | برند: · کد اختصاصی (SKU): · جنس پارچه: · نحوه شستشو: |
| Size guide body | "Standard fit (True to Size)…" + button "View Full Measurement Chart" | existing fa text + «مشاهده جدول ابعاد دقیق» |
| Trust 1 | Authentic Guarantee / 100% Genuine Nike & Jordan | اصالت کالا / ۱۰۰٪ اورجینال نایک و جردن |
| Trust 2 | 7-Day Size Exchange / Hassle-free size & model exchange | existing fa strings |
| Related header | You May Also Like · View All → (links to `CUSTOMER_ROUTES.HOME`) | پیشنهادهای مشابه · مشاهده همه ← |
| Not found | Product Not Found / Retry / Return to Shop | existing fa strings |

- **Header (live, en):**
  - Desktop: menu button, SAINTBALA wordmark, nav "Home · Women · Men" (centre), search icon, "Login", cart icon with count badge, theme toggle.
  - Mobile: wordmark, search, Login, cart and badge, theme toggle. No menu button and no nav.
  - Skip link «رفتن به محتوا» / "Skip to content".
- **Footer (live, en):**
  - "SAINTBALA" wordmark and the tagline "Authentic sportswear for women and men."
  - 4 columns:
    - **Shop:** Home, Women, Men, Hoodies, Pants
    - **Brands:** Nike, Jordan, Adidas
    - **Help:** Authenticity, Size guide, Pay with Zarinpal
    - **Account:** Sign in with email, Cart, Favorites
  - Bottom row: "© {year} SAINTBALA" and "Online payment with Zarinpal". Keep whatever the component renders.
- **Mobile tab bar (live, guest):** Home, Shopping Cart, Login, each an icon with a label. Logged-in users see the existing logged-in items. Keep the logic.

---

## 1. Design concept (one paragraph)

The look is Apple-style "Liquid Glass": a soft ambient colour mesh is fixed behind the page, and every surface floats above it as frosted, refractive glass. Surfaces use heavy backdrop blur with saturation boost, a 1 px light rim, an inner top specular highlight (inset white line) and a very soft long drop shadow. The palette is monochrome: near-black ink on light, white ink on dark. Colour only appears in the product photos, the amber low-stock signal and colour dots. Corners are large and continuous (24–32 px). Type is SF-Pro-like, tight and bold for headings, with generous whitespace. **No bronze/gold accent on this page** (the old `#c5b89a` / `#8f8468` accents in the PDP are replaced by the monochrome tokens below). The global `--accent` variable stays untouched for other pages.

---

## 2. Design tokens

Create **`src/styles/pdp-glass.css`** (import it once from the PDP module, not globally). Put every token on a scope class `.pdp-lg` that wraps the PDP. Theme switches through the existing `[data-theme]` attribute: use `[data-theme=dark] .pdp-lg`, or `.pdp-lg[data-mode=dark]` if `data-theme` is not on `<html>`, so check which applies.
Use these tokens from MUI `sx` as `var(--lg-…)`. Do not hard-code colours in components.

### 2.1 Colours, light
```css
.pdp-lg {
  --lg-canvas: #F9F9FA;
  --lg-mesh:
    radial-gradient(at 10% 12%, rgba(255,237,226,.70) 0, transparent 55%),
    radial-gradient(at 90% 15%, rgba(232,238,255,.75) 0, transparent 60%),
    radial-gradient(at 50% 45%, rgba(253,246,240,.80) 0, transparent 70%),
    radial-gradient(at 15% 75%, rgba(243,234,255,.65) 0, transparent 60%),
    radial-gradient(at 85% 85%, rgba(228,245,245,.60) 0, transparent 55%);
  --lg-ink: #171717;          /* titles, price, primary labels */
  --lg-ink-2: #262626;        /* body labels (Color:, Size, chip text) */
  --lg-ink-3: #525252;        /* secondary text: values, nav, footer links, accordion body */
  --lg-ink-4: #5c5c61;        /* tertiary: breadcrumb, trust subtitles, meta line */
  --lg-ink-5: #6e6e73;        /* quietest: SKU lines, card meta, separators. Never lighter than this on light. */
  --lg-hair: rgba(0,0,0,.08);

  /* glass recipe: card (big surfaces) */
  --lg-card-bg: rgba(255,255,255,.68);
  --lg-card-border: rgba(255,255,255,.75);
  --lg-card-shadow: 0 18px 45px -10px rgba(0,0,0,.035), inset 0 1.5px 1.5px rgba(255,255,255,.90);
  --lg-card-shadow-hover: 0 26px 58px -10px rgba(0,0,0,.07), 0 2px 4px rgba(0,0,0,.03), inset 0 2px 2px #fff;
  --lg-card-blur: blur(36px) saturate(190%);

  /* glass recipe: pill (chips, secondary buttons, icon wells) */
  --lg-pill-bg: rgba(255,255,255,.55);
  --lg-pill-border: rgba(255,255,255,.80);
  --lg-pill-shadow: 0 4px 16px -2px rgba(0,0,0,.04), inset 0 1px 1px rgba(255,255,255,.95);
  --lg-pill-blur: blur(20px) saturate(180%);

  /* glass recipe: icon buttons floating on the photo */
  --lg-icon-bg: rgba(255,255,255,.75);
  --lg-icon-border: rgba(255,255,255,.90);
  --lg-icon-shadow: 0 4px 14px -1px rgba(0,0,0,.06), inset 0 1px 1px #fff;
  --lg-icon-ink: #404040;  --lg-icon-ink-hover: #000;
  --lg-icon-blur: blur(16px);

  /* solid controls */
  --lg-solid-bg: #171717; --lg-solid-bg-hover: #000; --lg-solid-ink: #fff;
  --lg-photo-well: #f5f5f5;           /* behind product photos */

  /* low stock (amber) */
  --lg-stock-bg: rgba(255,251,235,.80);  --lg-stock-border: rgba(253,230,138,.60);
  --lg-stock-dot: #f59e0b;               --lg-stock-ink: #78350f;
  --lg-stock-ink-card: #92400e;
  /* out of stock (keep existing red semantics) */
  --lg-oos-bg: rgba(220,38,38,.10); --lg-oos-border: rgba(220,38,38,.30); --lg-oos-ink: #b91c1c;

  /* accordions */
  --lg-acc-open-bg: rgba(255,255,255,.50); --lg-acc-open-border: rgba(255,255,255,.80);
  --lg-acc-bg: rgba(255,255,255,.40);      --lg-acc-border: rgba(255,255,255,.70);
  --lg-acc-bg-hover: rgba(255,255,255,.55);

  /* related card colour chip (sits on photos, must stay readable) */
  --lg-chip-bg: rgba(255,255,255,.88); --lg-chip-ink: #1d1d1f; --lg-chip-border: rgba(0,0,0,.08);
  --lg-chip-dot-ring: rgba(0,0,0,.15);

  /* footer */
  --lg-footer-bg: rgba(255,255,255,.45); --lg-footer-border: rgba(255,255,255,.60);
  --lg-footer-divider: rgba(229,229,229,.50);

  /* ring for selected thumbnail / swatch */
  --lg-ring: #171717; --lg-ring-offset: #F9F9FA;
}
```

### 2.2 Colours, dark
```css
[data-theme=dark] .pdp-lg {
  --lg-canvas: #08090d;
  --lg-mesh:
    radial-gradient(at 10% 12%, rgba(45,30,68,.45) 0, transparent 55%),
    radial-gradient(at 90% 15%, rgba(26,42,74,.45) 0, transparent 60%),
    radial-gradient(at 50% 45%, rgba(18,22,38,.60) 0, transparent 70%),
    radial-gradient(at 15% 75%, rgba(35,24,52,.40) 0, transparent 60%),
    radial-gradient(at 85% 85%, rgba(18,36,46,.35) 0, transparent 55%);
  --lg-ink: #ffffff; --lg-ink-2: #e5e5e5; --lg-ink-3: #d4d4d4; --lg-ink-4: #a8a8ae; --lg-ink-5: #9a9aa0;
  --lg-hair: rgba(255,255,255,.10);

  --lg-card-bg: rgba(20,22,32,.65);  --lg-card-border: rgba(255,255,255,.12);
  --lg-card-shadow: 0 18px 45px -10px rgba(0,0,0,.45), inset 0 1px 1.5px rgba(255,255,255,.25);
  --lg-card-shadow-hover: 0 26px 58px -10px rgba(0,0,0,.65), inset 0 1.5px 2px rgba(255,255,255,.35);

  --lg-pill-bg: rgba(255,255,255,.08); --lg-pill-border: rgba(255,255,255,.16);
  --lg-pill-shadow: 0 4px 16px -2px rgba(0,0,0,.30), inset 0 1px 1px rgba(255,255,255,.20);

  /* icon buttons on the (light, studio) photo: smoked glass with white glyph for contrast */
  --lg-icon-bg: rgba(16,16,20,.62); --lg-icon-border: rgba(255,255,255,.22);
  --lg-icon-shadow: 0 4px 14px -1px rgba(0,0,0,.35), inset 0 1px 1px rgba(255,255,255,.25);
  --lg-icon-ink: #fff; --lg-icon-ink-hover: #fff;

  --lg-solid-bg: #ffffff; --lg-solid-bg-hover: #f5f5f5; --lg-solid-ink: #0a0a0c;
  --lg-photo-well: #171717;

  --lg-stock-bg: rgba(69,26,3,.40); --lg-stock-border: rgba(245,158,11,.30);
  --lg-stock-dot: #fbbf24;          --lg-stock-ink: #fde68a; --lg-stock-ink-card: #fcd34d;
  --lg-oos-bg: rgba(239,68,68,.14); --lg-oos-border: rgba(239,68,68,.35); --lg-oos-ink: #fca5a5;

  --lg-acc-open-bg: rgba(255,255,255,.04); --lg-acc-open-border: rgba(255,255,255,.12);
  --lg-acc-bg: rgba(255,255,255,.02);      --lg-acc-border: rgba(255,255,255,.10);
  --lg-acc-bg-hover: rgba(255,255,255,.06);

  --lg-chip-bg: rgba(18,18,22,.72); --lg-chip-ink: #f5f5f7; --lg-chip-border: rgba(255,255,255,.18);
  --lg-chip-dot-ring: rgba(255,255,255,.55);   /* so a black dot stays visible on the dark chip */

  --lg-footer-bg: rgba(8,9,13,.80); --lg-footer-border: rgba(255,255,255,.10);
  --lg-footer-divider: rgba(255,255,255,.10);

  --lg-ring: #ffffff; --lg-ring-offset: #08090d;
}
```

### 2.3 Glass utility classes (in the same file)
```css
.pdp-lg { background: var(--lg-mesh), var(--lg-canvas); background-attachment: fixed; color: var(--lg-ink); min-height: 100vh; }
.lg-card { background: var(--lg-card-bg); -webkit-backdrop-filter: var(--lg-card-blur); backdrop-filter: var(--lg-card-blur);
           border: 1px solid var(--lg-card-border); box-shadow: var(--lg-card-shadow); }
.lg-pill { background: var(--lg-pill-bg); -webkit-backdrop-filter: var(--lg-pill-blur); backdrop-filter: var(--lg-pill-blur);
           border: 1px solid var(--lg-pill-border); box-shadow: var(--lg-pill-shadow); }
.lg-icon { background: var(--lg-icon-bg); -webkit-backdrop-filter: var(--lg-icon-blur); backdrop-filter: var(--lg-icon-blur);
           border: 1px solid var(--lg-icon-border); box-shadow: var(--lg-icon-shadow); color: var(--lg-icon-ink); }

/* fallback: no backdrop-filter support → raise opacity so text stays readable */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .pdp-lg { --lg-card-bg: rgba(255,255,255,.94); --lg-pill-bg: rgba(255,255,255,.90); --lg-icon-bg: rgba(255,255,255,.95); }
  [data-theme=dark] .pdp-lg { --lg-card-bg: rgba(20,22,32,.96); --lg-pill-bg: rgba(40,42,54,.92); --lg-icon-bg: rgba(16,16,20,.90); }
}
/* user asked for less transparency → near-solid surfaces, no blur */
@media (prefers-reduced-transparency: reduce) {
  .lg-card, .lg-pill, .lg-icon { -webkit-backdrop-filter: none; backdrop-filter: none; }
  .pdp-lg { --lg-card-bg: #fff; --lg-pill-bg: #f4f4f5; --lg-icon-bg: #fff; background: var(--lg-canvas); }
  [data-theme=dark] .pdp-lg { --lg-card-bg: #14161f; --lg-pill-bg: #1f2230; --lg-icon-bg: #14161f; }
}
@media (prefers-contrast: more) {
  .pdp-lg { --lg-card-border: rgba(0,0,0,.25); --lg-ink-4: #404040; --lg-ink-5: #525252; }
  [data-theme=dark] .pdp-lg { --lg-card-border: rgba(255,255,255,.40); --lg-ink-4: #d4d4d4; --lg-ink-5: #c4c4c4; }
}
```
Mobile blur budget: at `max-width: 599px`, use `--lg-card-blur: blur(28px) saturate(190%)`. Do not nest more than 2 blurred layers on top of each other: inner accordions and chips sitting **inside** a `.lg-card` use plain translucent backgrounds without their own backdrop-filter, as listed per component below.

### 2.4 Radii, spacing, elevation
- **Radii:**
  - Main glass surfaces (gallery frame, info card): **32 px**
  - Photo inside the gallery: **24 px** (desktop), **26 px** (mobile)
  - Header capsule, trust cards, related cards: **28 px**
  - Related-card photo: **16 px** desktop, **22 px** mobile
  - Accordions and thumbnails: **16 px** (mobile thumbnails 18 px outer / 14 px inner)
  - Size chip: **12 px** (mobile 14 px)
  - Pills, buttons and round icon buttons: **9999 px**
- **Spacing:** 4 px grid.
  - Page side padding: **32 px** at ≥ 900 px, **24 px** from 600 to 899 px, **16 px** below 600 px.
  - Content max width: **1376 px**, centred.
  - Column gap: **32 px**. Info card internal vertical gap: **24 px** (desktop), **16 px** (mobile).
- **Motion:** `transition: 200–300ms cubic-bezier(.2,.7,.1,1)` (`var(--ease)`). Hover lift is `scale(1.05)` on icon buttons, image zoom is `scale(1.05)` over 500 ms, and the active press is `scale(.99)` on big buttons and `scale(.95)` on icons.

---

## 3. Typography

- **English stack (PDP only):** `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", "Manrope", "Segoe UI", Roboto, sans-serif`. Apple devices get SF Pro, others fall back to the already-loaded Manrope. **Do not add new web-font downloads.** Set it as `--lg-font` on `.pdp-lg` when `currentLocale === "en"`.
- **Persian:** `--lg-font: "Vazirmatn", system-ui, sans-serif` for body. Headings (H1, section titles, price) use the existing `farsiDisplayStack` or Vazirmatn 800, whichever the page already uses. Persian rules:
  - `letter-spacing: 0` everywhere (never negative tracking on Arabic script).
  - Line-height +0.15 versus English.
  - No `text-transform: uppercase` (it does nothing for Persian; the English "NEW" badge stays uppercase).
- **Scale (English; Persian uses the same sizes, weights shift as noted):**

| Role | Desktop | Mobile | Weight | Tracking | Line-height |
|---|---|---|---|---|---|
| H1 product name | 34 px | 20 px | 700 (fa 800) | −0.02em | 1.2 / 1.25 |
| Price | 30 px | 26 px | 700 (mobile 800) | −0.02em | 1 |
| Section title "You May Also Like" | 24 px | 17 px | 700 | −0.02em | 1.2 |
| Body / labels (Color:, Size) | 14 px | 13 px | 500 (value 400) | 0 | 1.4 |
| Accordion title | 14 px | 13.5 px | 600 (open: 700 on mobile) | 0 | 1.3 |
| Accordion body | 13 px | 12.5 px | 400 | 0 | 1.65 |
| Buttons | 15 px | 14 px | 500 desktop / 600 mobile | 0 | 1 |
| Breadcrumb | 13 px | 11.5 px | 400 (last item 500) | −0.01em | 1 |
| SKU line | 12 px, monospace (`ui-monospace, SFMono-Regular, Menlo, monospace`) | 12 px, sans 500 | 400 | 0 | 1.3 |
| Stock pill | 12 px | 11.5 px | 600 / 500 | 0 | 1 |
| Badge "NEW" | 11 px, uppercase | 10.5 px | 600 | 0 | 1 |
| Card name | 14 px, 1 line, ellipsis | 14 px, wraps | 700 | 0 | 1.35 |
| Card meta / SKU / stock | 12 / 11 / 11 px | 11 / 11 / 10.5 px | 500 | 0 | 1.3 |
| Card price | 16 px | 18 px | 700 / 800 | −0.01em | 1 |
| Footer heading | 13 px, uppercase on desktop, tracking .05em (en only) | 13 px bold, normal case | 700 | | |
| Footer link | 14 px | 13 px | 400 / 500 | | 1.6 |

- Numbers inside Persian text use the existing `formatNumber` (Persian digits). SKUs and product names stay LTR inside `<bdi dir="ltr">`.
- **Wordmark:** keep the site's existing SAINTBALA wordmark component and font (`.font-saintbala`). Do not change the logo.

---

## 4. Page shell and breakpoints

Wrap the PDP's returned tree (inside `CustomersLayout`) in `<Box className="pdp-lg" dir={u?"rtl":"ltr"} sx={{fontFamily:"var(--lg-font)"}}>`. This replaces the current per-page `background` radial gradient on the outer Box. The mesh comes from `.pdp-lg`. Keep the product ambient tint (`getProductAmbientTint`), but **only inside the gallery photo well** as a radial gradient (`radial-gradient(circle at 50% 38%, rgba(${tint}, .20) 0%, transparent 68%)` over `--lg-photo-well`; use .28 in dark).

Breakpoints use the MUI defaults (`sm 600, md 900, lg 1200`):

| Range | Layout |
|---|---|
| **< 600 (mobile, design at 390)** | Single column. Order: header → breadcrumb → gallery → thumbnails → info card → trust cards (stacked) → related (1 per row) → footer. A floating bottom tab bar sits above everything; reserve `padding-bottom: calc(96px + env(safe-area-inset-bottom))` on the page. |
| **600–899** | Single column, max width 640 px, centred. Related cards 2 per row. Trust cards side by side. |
| **900–1199** | Two columns, gallery 6/12 and info 6/12. Related cards 2 per row (md) as today, or 3 if the current Grid says `md:4`. Keep the existing Grid sizes `xs:12, sm:6, md:4, lg:3`. |
| **≥ 1200 (design at 1440)** | Two columns, **gallery 7/12 and info 5/12**, gap 32, `align-items:flex-start`. The info card is **not** sticky (the design is not). Related cards 4 per row. |

There must be no horizontal overflow at any width from 320 to 1920. Test 320, 360, 390, 768, 1024, 1280, 1440 and 1920.

---

## 5. Header (opt-in glass variant: `CustomersLayout glassHeader` → `Headerbar variant="glass"`)

Only the PDP passes the prop. The default rendering stays as it is.

- **Desktop (≥ 900):**
  - The header is `position: sticky; top: 0; z-index: 50; padding: 14px 32px`. Inside it is a **floating capsule** `.lg-card`, max width 1376, radius 28, padding 12 × 28, `display:flex; justify-content:space-between; align-items:center`.
  - **Start group (gap 24):** the menu button (existing icon, 24 px, colour `--lg-ink-2`, hover `--lg-ink`), then the wordmark.
  - **Centre:** nav "Home · Women · Men", 14 px, 500, tracking .025em, gap 40, colour `--lg-ink-3`, hover `--lg-ink`. **No active/bold state** (the live site has none).
  - **End group (gap 24):** search icon button, "Login" text link (14 px, 500), cart icon (24 px) with the count badge, then the theme toggle icon.
    - Badge: 16 × 16 circle, 10 px, 700, offset −6/−8 px at the top-end corner. Light: `bg #171717`, white text. Dark: `bg #fff`, `#171717` text.
  - Keep the existing user menu when logged in. It renders in the same slot as Login.
- **Mobile (< 900):**
  - A full-width sticky bar, not a capsule: padding 12 × 16, `background: rgba(255,255,255,.78)` / dark `rgba(12,14,21,.82)`, `backdrop-filter: blur(36px) saturate(200%)`.
  - Bottom rim: `box-shadow: inset 0 -1px 0 rgba(255,255,255,.8), 0 8px 24px -8px rgba(15,23,42,.06)`. Dark: `inset 0 -1px 0 rgba(255,255,255,.12), 0 10px 30px -5px rgba(0,0,0,.7)`.
  - Start: wordmark. End (gap 12): search, "Login" (12 px, 500), cart and badge (14 × 14, 9 px), theme toggle. Icon hit areas are at least 40 × 40, even though the glyphs are 20–22 px.
- **Skip link:** keep the existing `.skip-link` («رفتن به محتوا» / "Skip to content"), targeting the PDP `<main id="main">`.
- **RTL:** the order mirrors automatically with flex plus `dir`. Use logical properties (`insetInlineStart`, `marginInlineEnd`); never `left/right`.

## 6. Breadcrumb
- `<nav aria-label="breadcrumb">` using the existing MUI `Breadcrumbs`. Padding: 16 px top and 20 px bottom (desktop), 10 px vertical (mobile).
- Items: "Store" / categories[0].name / categories[1].name / product name (existing links and targets).
- Colours: links `--lg-ink-4`, hover `--lg-ink`; separator "/" with `margin-inline: 8px` in `--lg-ink-5` at 45% opacity in dark; the last item `--lg-ink`, 500, single line with ellipsis (max 300 px desktop, 130–180 px mobile).
- Mobile: the row scrolls horizontally if needed (`overflow-x:auto`, no scrollbar). It never wraps.

## 7. Gallery (left column)
- **Frame:** `.lg-card`, radius 32, padding 12 (mobile 6), `overflow:hidden`.
- **Photo well:** radius 24 (mobile 26), `background: var(--lg-photo-well)` plus the ambient tint.
  - Desktop: **aspect-ratio 1 / 1**.
  - Mobile: **aspect-ratio 4 / 3.8**. This keeps the stock pill above the floating tab bar on a 390 × 844 first screen.
  - This replaces the fixed heights `380/480/580/640`.
- **Image:** `object-fit: cover; object-position: center 18%` (mobile `center 12%`). Faces must never be cropped.
  - Keep the existing hover-zoom behaviour (mouse position → transform-origin, `cursor: zoom-in`) and click → the full-screen zoom dialog.
  - Idle hover `scale(1.05)` over 500 ms. `alt = product.name`.
- **Overlay buttons** (`.lg-icon`, 40 × 40 desktop / 36 × 36 mobile, round, glyph 16–18 px):
  - **Heart** at the top-start corner (inset 16 / 12). It keeps the existing local toggle (`A` state) and `aria-label` "favorite" (localise as the code does now). When pressed, use the filled heart icon in `#ef4444`, `aria-pressed`. Hover `scale(1.05)`; light-mode hover glyph `#ef4444`.
  - **Zoom** at the top-end corner. Same style, keeps its Tooltip ("Full Zoom View"), and opens the dialog.
  - **Prev / Next arrows** at the vertical centre, inset 16 / 10, shown **only if `Ce.length > 1`** (existing rule). Arrow icons flip in RTL (prev points right in fa). `aria-label` "previous image" / "next image".
  - Mobile arrows are 32 × 32 with stronger contrast: light `rgba(255,255,255,.88)` with a `#111` glyph, dark `rgba(10,12,18,.58)` with a white glyph, plus `box-shadow: 0 2px 10px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.35)`.
- **Hint pill:** centred at the bottom (inset 16 / 12), `.lg-pill` (dark: a translucent white pill), padding 8 × 16 (mobile 6 × 12).
  - A 14 px magnifier icon in `--lg-ink-5`, then the text "Hover to zoom • Click to expand", 12 px (mobile 11 px), 500, `--lg-ink-2`. `pointer-events:none`, `white-space:nowrap`.
  - Keep showing it on touch devices too (the live site does). Persian uses the existing fa string.
- **Thumbnails:** a row under the frame, gap 14 px (mobile 12 px), centred, shown **only if `Ce.length > 1`**.
  - Desktop: 80 × 80 buttons (72 at 600–899). Mobile: 64 × 64.
  - Each is a `<button aria-label="View photo N">` with radius 16 (mobile 18), padding 2, and the image inside at radius 12 (mobile 14) with `object-fit:cover; object-position:center 20%`.
  - **Selected:** `outline: 2px solid var(--lg-ring); outline-offset: 2px` (or `box-shadow: 0 0 0 2px var(--lg-ring-offset), 0 0 0 4px var(--lg-ring)`), plus `aria-current="true"`.
  - **Unselected:** `.lg-card` look (no own blur on mobile: `background: rgba(255,255,255,.5)` / dark `rgba(255,255,255,.05)`), hover border `--lg-ink-5`.
  - **Focus-visible:** the global focus ring.
  - The click sets `R` (existing).
- **Zoom dialog and size-guide dialog:** keep the logic. Restyle the Paper with `.lg-card` tokens (radius 28; the background goes near-solid: light `rgba(255,255,255,.96)`, dark `rgba(20,22,32,.96)`). Toolbar icon buttons use `.lg-pill`. Modal thumbnails use the selected ring from above. Keep the existing texts ("Close", zoom in/out, "drag to pan around image").

## 8. Info card (right column; mobile: below the gallery)

The container is `.lg-card`, radius 32, padding **36** (≥ 900) / **20** (mobile; top padding 16), `display:flex; flex-direction:column; gap:24px` (mobile 16).

1. **Badge row** (gap 12, align center):
   - The **NEW** badge: `.lg-pill`, padding 4 × 12, radius 9999, 11 px, 600, uppercase (en), colour `--lg-ink-2`. Mobile variant: `background: #f5f5f5; border: 1px solid rgba(229,229,229,.6)` (dark: `rgba(255,255,255,.08)` with border `rgba(255,255,255,.16)`).
   - Show the badge exactly when the current code shows it.
   - Then the meta text "{brand} · {categories[0].name}", 13 px, 500, `--lg-ink-4`. Keep the existing separator rendering.
2. **Title block** (gap 6):
   - H1 product name (scale in §3), `--lg-ink`, `text-wrap: balance`.
   - The SKU line "Product Code: FV7247-010", 12 px monospace, `--lg-ink-5` (only if `sku`).
3. **Price:** `PriceDisplay` of `He.finalPrice` (§3 scale). If `He.discount > 0`, show the existing struck original price (17 px, `--lg-ink-5`, line-through) and the existing `% OFF` pill. Restyle that pill as `.lg-pill` with `--lg-ink-2` text and keep its text.
4. **Low-stock pill** (only when `tt`):
   - Inline-flex, gap 8, padding 6 × 14, radius 9999, `bg --lg-stock-bg`, `1px solid --lg-stock-border`, a soft shadow.
   - An 8 px dot in `--lg-stock-dot` with the existing pulse animation (disabled under reduced motion).
   - The text "Only {n} left in stock — Order now", 12 px, 600, `--lg-stock-ink`.
   - **Out-of-stock pill** (when `Je`): same shape with the `--lg-oos-*` tokens and the existing text.
5. **Colour** (only if colour groups exist; gap 12):
   - The label "Color:" / «رنگ:» (14 px, 500, `--lg-ink-2`) followed by the colour names (400, `--lg-ink-3`). Keep the existing swatch Tooltip (colour names).
   - Swatches: 32 × 32 round buttons (mobile 28). Fill is the `hexCode`; multi-colour sets use the existing multi-colour disc background.
   - A 1 px inner border (`rgba(0,0,0,.15)`; dark `rgba(255,255,255,.2)`).
   - **Selected:** `box-shadow: 0 0 0 2px var(--lg-ring-offset), 0 0 0 4px var(--lg-ring)`, `aria-pressed="true"`, `aria-label="{colour names}"`.
   - **Unselected:** hover ring `--lg-ink-5`. The click sets `S` (existing).
6. **Size:**
   - Header row with `justify-content: space-between`: "Size" (14 px, 500, `--lg-ink-2`), then the **Size Guide** text button (13 px, 500, `--lg-ink-3`, a 14 px ruler icon `StraightenOutlined` before it, hover `--lg-ink` + underline). It opens the existing size-guide dialog.
   - Chips: gap 10, wrap.
     - Size: min-width 48, height 40 (mobile 40 × 40), radius 12 (mobile 14), 14 px, 600.
     - **Selected:** `bg --lg-solid-bg`, `color --lg-solid-ink`, `box-shadow: 0 1px 2px rgba(0,0,0,.08)`, `aria-pressed="true"`.
     - **Unselected:** `.lg-pill` look with `--lg-ink-2` text. Hover: border `--lg-ink-5`.
     - Sizes that are out of stock are not rendered (existing rule: `Ne` only holds in-stock sizes).
   - If there are no sizes, show the existing "No sizes currently available for this color" text in 13 px `--lg-ink-4`.
7. **Actions** (gap 12, top margin 8):
   - **Add to Cart** (primary). Full width, height 48 (mobile 50, padding 14 × 24), radius 9999.
     - `bg --lg-solid-bg`, `color --lg-solid-ink`, 15 px 500 (mobile 14 px 600).
     - A leading 16 px bag icon (`ShoppingBagOutlined`), gap 10, `box-shadow: 0 4px 6px -1px rgba(0,0,0,.1)`.
     - Mobile light adds `0 10px 15px -3px rgba(10,10,10,.2)`.
     - Hover: `--lg-solid-bg-hover`. Active: `scale(.99)`.
     - **Added state** (`O`): keep the existing green `#10b981` background, white text, the Check icon and "Added to Cart".
     - **Disabled** (`Je`): `background: rgba(0,0,0,.08)` / dark `rgba(255,255,255,.08)`, colour `#737373` / `#a1a1aa`, no shadow, `cursor:not-allowed`, text "Out of Stock".
   - **Buy Now** (secondary). Same size, `.lg-pill` (dark: translucent white), text `--lg-ink`, 15 px 500.
     - Hover: light `rgba(255,255,255,.80)`, dark `rgba(255,255,255,.15)`. Active: `scale(.99)`.
     - Disabled when `Je`, with the same muted colours as above.
     - It keeps the existing handler (add, then navigate to `/cart`).
8. **Accordions** (top margin 8, gap 10). Keep the MUI `Accordion` and the existing single-open state `H` (Description is open by default).
   - Each item has radius 16 (mobile 18), `overflow:hidden`, no MUI `::before` line, `elevation 0`, and **no own backdrop-filter**.
   - **Closed:** `bg --lg-acc-bg`, `1px solid --lg-acc-border`, hover `--lg-acc-bg-hover`.
   - **Open:** `bg --lg-acc-open-bg`, border `--lg-acc-open-border`, `box-shadow: 0 1px 2px rgba(0,0,0,.04)`.
   - **Summary:** padding 16 × 20 (mobile 14), min-height 52. Title per §3 in `--lg-ink`. The chevron is 16 px in `--lg-ink-5`; it points up when open and down when closed (MUI `expandIcon` rotation). Keep `aria-expanded` and `aria-controls` (MUI does this). Focus-visible shows the global ring.
   - **Details:** padding `0 20px 20px`, 13 px / 1.65, `--lg-ink-3`.
   - **Description content (bind as in §10):** the locale description → `product.description` → the existing fallback text.
   - **Details & Materials content:** keep the existing 4 label/value rows (Brand, SKU, Material, Care). Labels are `--lg-ink-4`, values are 600 `--lg-ink-2`, and each row is `justify-content:space-between` with a gap of 8. See §10 about the hard-coded Material/Care values.
   - **Size Guide content:** the existing paragraph, plus the existing outlined button "View Full Measurement Chart". Restyle that button as `.lg-pill` (radius 9999, 13 px 500, `--lg-ink`, ruler icon). It opens the same dialog.

## 9. Below the fold

### 9.1 Trust cards
- Section padding: 36 px top and 48 px bottom (mobile 16 / 8). Grid: 2 columns at ≥ 600 (gap 24), stacked below 600 (gap 10).
- Each card is `.lg-card`, radius 28 (mobile 24), padding 20 × 24 (mobile 14), `display:flex; align-items:center; gap:16`.
- **Icon well:** 48 × 48 (mobile 40 × 40), radius 16 (mobile round).
  - Desktop: `.lg-pill` with a `--lg-ink-2` glyph, 24 px (existing icons: `GppGoodOutlined`, plus the existing exchange icon).
  - Mobile: tinted wells.
    - Authentic: `bg rgba(16,185,129,.10)`, `border rgba(16,185,129,.20)`, glyph `#065f46` (dark: `#6ee7b7`).
    - Exchange: `bg rgba(59,130,246,.10)`, `border rgba(59,130,246,.20)`, glyph `#1e40af` (dark: `#93c5fd`).
- Text: the title (15 px / mobile 13.5 px, 600–700, `--lg-ink`) and the subtitle (13 px / 11.5 px, `--lg-ink-4`). Use the existing strings.

### 9.2 "You May Also Like"
- Section padding-bottom: 80 px (mobile 24).
- Header row: the title (§3) and the **View All →** link (14 px / 12 px, 600, `--lg-ink-2`, hover `--lg-ink`, a 16 px arrow after it that mirrors in RTL; existing target `CUSTOMER_ROUTES.HOME`). Margin-bottom 28 px (mobile 14 px).
- Grid: the existing MUI Grid sizes, spacing 24 px (mobile 14 px vertical).
- **Related card** (a `CustomersProductCard` with a new opt-in prop `appearance="glass"`; default appearance unchanged):
  - **Shell:** `.lg-card`, radius 28 (mobile 32), padding 16 (mobile 12), `display:flex; flex-direction:column; justify-content:space-between; height:100%`.
    - Hover (pointer devices): `box-shadow: var(--lg-card-shadow-hover)`, photo `scale(1.05)` over 300 ms, and the existing secondary-photo swap if the card has it.
    - The whole card is clickable (existing `onCardClick` → navigate to the product + scroll to top). Keyboard: the card title or image is an `<a>`/`<Link>`, so Enter works.
  - **Photo well:** `aspect-ratio 1/1` (mobile 4/4.2), radius 16 (mobile 22), `bg --lg-photo-well`, image `object-fit:cover`. Keep each product's existing image source. If the product has no image, use the existing placeholder. Use `loading="lazy" decoding="async"`.
  - **Colour chip:** pinned at the top-end corner of the photo (inset 10). `background --lg-chip-bg`, `color --lg-chip-ink`, `1px solid --lg-chip-border`, `backdrop-filter: blur(14px) saturate(160%)`, radius 9999, padding 4 × 10, 11 px, 500, gap 6.
    - A 10 px dot in the colour `hexCode` with `box-shadow: 0 0 0 1px var(--lg-chip-dot-ring)` (white needs the ring on light; black needs it on dark).
    - The colour name comes from the API colour name (or the existing fallback, localised; see §9.2.1). The chip must be readable on white t-shirts in both themes.
  - **Text block** (margin-top 14, gap 4, mobile padding-inline 4):
    - Meta line "{brand} · {gender}" (12 px, 500, `--lg-ink-5`).
    - Name (14 px, 700, `--lg-ink`; desktop 1 line with ellipsis plus `title={name}`; mobile wraps).
    - "Product Code: {sku}" (11 px; desktop monospace, mobile sans 500; `--lg-ink-5`).
  - **Price row** (margin-top 12, `justify-content:space-between; align-items:baseline`):
    - The price (existing `formatToman` / `PriceDisplay` logic), 16 px 700 (mobile 18 px 800), `--lg-ink`.
    - At the end: the "Size" label (11 px, 500, `--lg-ink-4`), then the size chip(s) (11–12 px, 600, padding 2 × 8, radius 6). Light chip: `bg #f5f5f5`, `border #e5e5e5`, text `#262626`. Dark chip: `bg rgba(255,255,255,.10)`, `border rgba(255,255,255,.10)`, text `#e5e5e5`. The selected chip uses the existing selection logic.
  - **Stock note** (only when the existing condition holds, `stockQuantity === 1`): margin-top 8, a 6 px dot in `--lg-stock-dot`, then "Only 1 left in stock" in 11 px 500 `--lg-stock-ink-card`.
    - Mobile variant: a tiny pill (`bg rgba(245,158,11,.10)`, `border rgba(245,158,11,.20)`, padding 4 × 10).
    - Cards without the note reserve the same 18 px so the buttons line up on desktop.
  - **Add to Cart:** margin-top 16 (mobile 12), full width, height 40, radius 9999, `.lg-pill`, 13 px 500 (mobile 12 px 600), `--lg-ink`, a 14 px bag icon.
    - Hover: light `bg #171717` with white text; dark `bg #fff` with `#171717` text.
    - Added state: the existing "added" text and accent. Use `#10b981` for the added background to match the PDP primary.
    - Keep the existing `onAddToCart` (adds the first in-stock variant, or navigates).
#### 9.2.1 Bug fix (required): the related cards show Persian text in English mode.** `CustomersProductCard` hard-codes these strings. Make each one locale-aware with `useLanguageContext().currentLocale`, add keys to **both** the `fa` and `en` typesafe-i18n locale files (e.g. under `products.card.*`), and run the typesafe-i18n generator. **The Persian output must stay byte-identical.**

| Hard-coded fa | en |
|---|---|
| «مردانه» / «زنانه» (gender label from `men`/`women` slugs) | Men / Women (reuse `LL.home.categories.men/women`) |
| `TYPE_MAP` values («هودی», «تی‌شرت», «شلوار»…) in the meta line | In **en**, render the meta line as `{brand} · {gender}` only (this matches the approved design "Nike · Men"). In **fa**, keep the current `{brand} · {type} {gender}`. |
| «کد محصول » | Product Code: |
| «سایز» | Size (reuse `LL.products.size`) |
| «تنها ۱ عدد باقی مانده» | Only 1 left in stock (build it from the count with `formatNumber`, so fa still renders «تنها ۱ عدد باقی مانده») |
| «افزودن به سبد خرید» / «افزودن به سبد» | Add to Cart (reuse `LL.products.addToCart`) |
| «به سبد اضافه شد» / «اضافه شد» | Added to Cart |
| `aria-label` «افزودن به علاقه‌مندی‌ها» / «حذف از علاقه‌مندی‌ها» | Add to favorites / Remove from favorites |
| `aria-label` «افزودن به سبد» and the `سایز {R} · افزودن به سبد` template | Add to cart / Size {R} · Add to cart |
| colour fallback «اورجینال» | Original (reuse `LL.products.original`) |
| alt template `${type} ${brand} — ${color}، روی مدل` | in en: `${brand} ${name}` (the product name, LTR) |

  Also wrap Latin product names and SKUs in `<bdi dir="ltr">` in both locales (already done for names). This fix applies wherever `CustomersProductCard` is used. That is intended, and it is the only change other pages receive.

### 9.3 Footer (opt-in `CustomersFooter variant="glass"` from the PDP)
- Full width. `background --lg-footer-bg`, `backdrop-filter: blur(40px)`, `border-top: 1px solid --lg-footer-border`. Padding: 64 px top and 48 px bottom (mobile 32 / 24). Inner max width 1376, side padding as the page.
- **Desktop:** a 12-column grid with gap 40 and padding-bottom 56, separated from the bottom row by a `1px --lg-footer-divider` line.
  - The brand block spans 4 columns: the wordmark (existing component), then the tagline (14 px, `--lg-ink-4`, max-width 320, margin-top 12).
  - The 4 link columns span 2 columns each, gap 14:
    - Heading: 13 px, 700, `--lg-ink`. Uppercase with .05em tracking in **en only**.
    - Links: 14 px, `--lg-ink-3`, hover `--lg-ink`, vertical gap 8.
- **Mobile:** brand block on top, then the 4 columns as a 2 × 2 grid (gap 24 × 20), headings in normal case.
- **Bottom row:** padding-top 32 (mobile 8, with a top hairline `--lg-hair`), 13 px (mobile 11 px), `--lg-ink-4`. Desktop: `justify-content:space-between` ("© {year} SAINTBALA" at the start, "Online payment with Zarinpal" at the end). Mobile: centred and stacked.
- Use the footer's existing strings and links. Do not add or remove any.

### 9.4 Mobile bottom tab bar (opt-in `CustomersTabbar variant="glass"`; shown < 900 only, as today)
- A floating capsule: `position:fixed; inset-inline:0; margin-inline:auto; bottom: calc(12px + env(safe-area-inset-bottom)); width: calc(100% - 32px); max-width: 358px; z-index: 50`.
- Surface: radius 28, padding 10 × 24, `display:flex; justify-content:space-between`.
  - Light: `background rgba(255,255,255,.82)`, `backdrop-filter: blur(40px) saturate(210%)`, `border 1px solid rgba(255,255,255,.7)`, `box-shadow: inset 0 1.5px 2px rgba(255,255,255,.95), 0 20px 40px -10px rgba(0,0,0,.12), 0 1px 3px rgba(0,0,0,.04)`.
  - Dark: `background rgba(16,18,27,.86)`, `border rgba(255,255,255,.18)`, `box-shadow: inset 0 1.5px 2px rgba(255,255,255,.25), 0 20px 45px -8px rgba(0,0,0,.8), 0 1px 3px rgba(0,0,0,.6)`.
- **Items** (the existing ones and their existing logic and labels): a vertical stack with a 22 px icon, a 4 px gap and a 10 px 500 label.
  - Active route: `--lg-ink`, plus `aria-current="page"`. Inactive: `--lg-ink-5` (dark `#a1a1a6`). Hover/press: `--lg-ink`, `scale(.95)`.
  - Hit area at least 48 × 44. Keep the cart badge if the current tab bar shows one.

---

## 10. Data binding (existing fields only)

| UI | Source (existing) | Notes |
|---|---|---|
| Name, H1, breadcrumb last, page title | `product.name` | LTR `<bdi>` inside fa |
| Product Code | `product.sku` | hidden if null |
| Brand (meta, Details) | existing `extractBrand(name)` | `product.brand.name` is now fetched by `ProductFields`; you **may** prefer `product.brand?.name ?? extractBrand(name)`, which uses an existing field and is not new UI |
| Meta second part, breadcrumb | `categories[0].name`, `categories[1].name` | as now |
| Price, discount | `He` (cheapest in-stock offer of the selected variant) through `PriceDisplay` | en shows USD ("70.00 $"), fa shows Toman with the existing exchange-rate logic |
| Low stock / OOS | `tt` (1–5) / `Je` | as now |
| Colours | `productInfos[].colors{name,hexCode}` grouped (`Fe`) | names come from the API |
| Sizes | `Ne` (in-stock sizes of the selected colour) | as now |
| Gallery | `Ce` from `productInfos[].images` | relative `/uploads/...` paths, prefixed as now |
| Description | **new binding order:** `descriptions.find(d => d.language.code === currentLocale)?.description` → `product.description` → the existing fallback template | all of these are existing fields; today every product has null/empty descriptions, so the fallback shows |
| Related | `useProductsQuery({categoryId: categories[0].id, pageSize:6, onlyInStock, onlyWithSellers})` → filter → 4 | unchanged |

**Flag in your report and do not "fix" by inventing content:**
- `description` and `descriptions` are empty for all products. The **fallback description template is generic and wrong for many items.** For example, product 91 is a hoodie, and its English text says "durable ripstop fabric… adjustable waistband and cargo pockets"; the fa fallback starts with «شلوار زنانه». Keep it unchanged (the owner must decide) and add a `// TODO(content)` comment.
- **Details & Materials:**
  - Brand and SKU are real data.
  - **"Material: 100% Breathable Ripstop Cotton" and "Care: Machine wash cold (30°C)" are hard-coded for every product**, and there is no backend field for them (no `specs`/`material`/`care` on `Product`). Keep them and flag them. Do not add fields.
  - Note: in an earlier headless capture this panel looked empty. In code it renders these 4 rows.
- There is no wishlist backend. The PDP heart is a local toggle only; keep it that way.
- Most products have one size and one image per variant. Product 91 (FV7247-010) has 4 images and is the visual test case. Test 1-image products too: no arrows and no thumbnails, but the hint pill stays.

---

## 11. Accessibility and performance

- **Contrast:** AA for all text on its actual glass surface in both themes. Small text (≤ 12 px) must be ≥ 4.5:1. On light, never use greys lighter than `#6e6e73` for text. On dark, never use greys darker than `#9a9aa0`.
  - Check these specifically: the SKU line, card meta, breadcrumb, footer bottom row, the hint pill over the photo, the colour chip over white garments, and the dark gallery arrows over the light studio photo.
- **Semantics:**
  - One `<h1>`. The section titles are `<h2>`, and the trust and card titles are `<h3>`.
  - Breadcrumb `<nav aria-label>`, gallery `<section aria-label="Product images">` (localise only if a key exists; otherwise reuse the product name).
  - Thumbnails, swatches and size chips are real `<button>`s with `aria-pressed`/`aria-current`. Accordions use MUI semantics.
  - Decorative icons get `aria-hidden`. Icon-only buttons keep their existing `aria-label`s.
- **Keyboard:**
  - The gallery arrows also respond to ←/→ when the gallery has focus (mirrored in RTL). This is optional. If added, it is not a new visible control.
  - Focus is always visible (the global `--focus` ring, 2 px, offset 3). The dialogs trap focus (MUI).
- **Touch targets** are at least 40 px (44 px preferred on mobile).
- **Motion:** under `prefers-reduced-motion: reduce`, disable the image hover-scale, the stock-dot pulse, the card hover-scale and the button scale transitions. Instant state changes only.
- **Transparency:** honour `prefers-reduced-transparency` and add the `@supports not (backdrop-filter)` fallback (§2.3). Firefox ESR or older Android must still be readable.
- **Performance:**
  - Keep backdrop-filter to the fixed surfaces listed (header, gallery frame, info card, trust cards, related cards, chips, tab bar, footer). Never put it on every list row or on large scrolling lists.
  - `background-attachment: fixed` is janky on iOS. On `(hover: none)` devices, use a `position:fixed; inset:0; z-index:-1` pseudo-element on `.pdp-lg` that carries the mesh instead.
  - Images: `loading="eager" fetchpriority="high"` on the main photo, `lazy` on thumbnails and related cards, explicit `width`/`height` or `aspect-ratio` to avoid CLS.
  - Add no new dependencies. The bundle size increase from CSS must stay under ~6 KB.
  - Lighthouse mobile on `/products/91`: CLS < 0.05, no new long tasks.

## 12. Work plan (small, verifiable steps; commit after each)

1. **Tokens.** Add `pdp-glass.css` and the `.pdp-lg` wrapper. Remove the page's old background gradient and the bronze accents in the PDP. Verify that the page renders with the mesh in both themes and that nothing else changed.
2. **Gallery** (frame, photo well, overlay buttons, hint, thumbnails, dialogs). Verify on product 91 (4 photos) and on a 1-photo product.
3. **Info card** (badge, title, SKU, price, stock/OOS, colour, size, buttons with all states, accordions). Verify the add-to-cart → snackbar → "Added to Cart" flow, Buy Now → `/cart`, and an out-of-stock product (pick or mock `stockQuantity:0` in a story/test; do not edit data).
4. **Trust and related section**, plus the `CustomersProductCard appearance="glass"` and **i18n fix 9.2.1**. Verify that the en cards show no Persian at all, that the fa cards are unchanged, and that the home page cards look identical except for the language fix.
5. **Header, footer and tab bar glass variants (opt-in).** Verify that home, cart and login are unchanged (screenshot diff), and that the PDP mobile first screen (390 × 844) shows the photo, the thumbnails, the info card top and **the low-stock pill above the floating tab bar**.
6. **RTL pass (fa):** mirrored layout, Vazirmatn, Persian digits, flipped arrows and chevrons, no negative tracking.
7. **Accessibility and performance pass** (§11), and the acceptance checklist (§14).
Do not refactor unrelated code. If a change would touch another page, stop and put it in the report instead.

## 13. Reference files to attach / place in the repo

Copy these into `design-reference/pdp/` (not imported by the app). Read the HTML for exact values; Tailwind classes map to the tokens above.
- **Desktop 1440, @2x renders:** `final-desktop-light-top.png` (1440 × 900 first screen), `final-desktop-dark-top.png`, `final-desktop-light-full.png`, `final-desktop-dark-full.png`.
- **Mobile 390, @3x renders:** `final-light-top.png` (390 × 844 first screen), `final-dark-top.png`, `final-light-full.png`, `final-dark-full.png`.
- **HTML references (static, Tailwind CDN):** `pdp-desktop-light-fixed.html`, `pdp-desktop-dark-fixed.html`, `pdp-light-fixed.html`, `pdp-dark-fixed.html`, and the `img/` folder they use. These are mock-ups: their markup is not production code, their links are `#`, and the accordions are static.
- **Current-state captures for comparison:** `live-pdp-desktop.jpg`, `live-pdp-mobile.jpg`.
If the images are not attached, this document is the source of truth.

## 14. Acceptance checklist (verify every item and report pass/fail)

**Content and behaviour**
- [ ] Every visible text on `/products/91` (en) is one of the strings in §0 or data from the API. There are no new buttons, links, badges or labels.
- [ ] fa and en, light and dark all render. Switching locale or theme updates the page live without reload, as today.
- [ ] Add to Cart, Added state, snackbar, Buy Now → /cart, out-of-stock disabled states, size/colour selection, the heart toggle, the zoom dialog (zoom/pan/close/thumbnails), the size-guide dialog and accordion single-open all work as before.
- [ ] The related cards link to the product and scroll to top. Their Add to Cart works. "View All" goes to Home.
- [ ] **No Persian text in English mode anywhere on the PDP**, including the related cards and their aria-labels. The Persian output of `CustomersProductCard` is unchanged.
- [ ] The description uses the locale `descriptions` entry when present. Otherwise the behaviour is unchanged.
- [ ] Other routes (/, /cart, /login, /orders, /profile) are pixel-identical to before (apart from the card language fix).

**Visual**
- [ ] The mesh background, glass cards with rim and specular highlight, and soft shadows match the tokens in both themes.
- [ ] Desktop 1440: the floating header capsule, a 7/5 split, the square gallery with 4 thumbnails, and the info card with all sections. The first screen shows the photo, title, price, stock pill, colour, size, Add to Cart and Buy Now.
- [ ] Mobile 390 × 844: the full-width glass header, the gallery at 4/3.8, 64 px thumbnails, and the info card. **The stock pill is fully visible above the floating tab bar on load.**
- [ ] The related colour chip is readable on white and black garments in both themes. The black dot is visible on dark.
- [ ] The dark gallery arrows and icons are clearly visible on the light studio photo.
- [ ] RTL: everything is mirrored (heart/zoom corners swap, arrows flip, the View All arrow flips, the chip moves to the top-left corner), Vazirmatn is used, and the digits are Persian.
- [ ] No horizontal scroll at 320–1920 px. No layout shift when images load.

**Quality**
- [ ] AA contrast passes (spot-check with devtools) in both themes.
- [ ] Keyboard-only: you can reach and operate every control, the focus ring is visible, and the dialogs trap and restore focus.
- [ ] Reduced motion, reduced transparency and the no-backdrop-filter fallback were all verified.
- [ ] `tsc`, lint, `vite build` and the existing tests pass. No new dependencies. No console errors.
- [ ] Your final report lists the files changed, screenshots (390 and 1440, en/fa, light/dark), and the flagged content issues from §10.
