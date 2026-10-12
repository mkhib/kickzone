# Build the new SAINTBALA home page (v4 "Campaign") in the saintbala.com codebase

You are working in the real saintbala.com repo. Build the new customer home page described below and make it **pixel-faithful**. Write production code that fits the existing stack. Do **not** invent facts, claims or data. Every product, price, count and photo must come from the live GraphQL API.

## 0. Context you need

**Frontend**
- React 19, Vite, React Router v7 (`BrowserRouter`).
- MUI v5/6 with an RTL setup (stylis + CSSJanus).
- Apollo Client, Zustand (cart store uses `persist` and the localStorage key `cart-storage`), typesafe-i18n (`fa`/`en`).
- The theme toggle lives in `useUIStore.toggleTheme`.
- The home route is `/` (and `/home`), component `CustomersHome`. Product detail is `/product/:id` (`:id` is an integer). Login is `/login`, by **email + password**. Cart is `/cart`.

**Backend**
- NestJS with Apollo GraphQL, PostgreSQL (TypeORM is likely).
- Single endpoint `POST /graphql`. Images are relative paths like `/uploads/products/<epoch>-<SKU>.jpg`, prefixed with `VITE_API_BASE_URL`.

**Reference implementation (optional)**
- If the user has copied a folder `design-reference/` into the repo, it holds the static HTML/CSS/JS of this exact design: `home.html`, `home.css`, `home.js`, `card.css`, and `fonts/`, `img/`.
- **Treat it as the visual source of truth.** Port its CSS values and behaviour into React components. Do not iframe it.
- Its photos and prices are a static mock: it used 230,500 Toman/USD. Use the live API instead.

**Screenshots the user may attach** (match them if present):
- `home-v4-hero-light.png` and `home-v4-hero-dark.png`: hero at 1440×900, rendered @2x.
- `light-home.png` and `dark-home.png`: full page at 1440 wide.
- `phone-home.png`: full page at 390 wide. **Its phone layout has known issues that this prompt fixes (see §5); follow this prompt, not that render.**

**Facts about the data (verified)**
- 93 products, 91 in stock. Every product has exactly 2 categories: a gender (`women`/`men`) and a type.
- Almost every product has 1 size and 1 image.
- Brand is not a field. It is derived from the name prefix by the existing `extractBrand(name)`. Brand counts: Nike ≈63, Jordan 27, Adidas 2.
- Prices are in USD in `sellerProducts.price`. Display Toman = `price × currentExchangeRate(USD→IRR).rate`. The rate is currently 270000; the "IRR" currency is really Toman.
- `discount` is 0 everywhere. `recommended` is false everywhere.
- There is no sales data, no product dates, no reviews and no footwear in stock.

**Truthfulness rules (hard). Use only these claims:**
- «اصالت کالا — ۱۰۰٪ اورجینال نایکی و جردن» (authenticity names Nike and Jordan only).
- «ضمانت تعویض ۷ روزه سایز و مدل» (an **exchange**, never a "return/refund").
- «پرداخت آنلاین با زرین‌پال».

Never say: delivery times, free shipping, best-sellers/«پرفروش», discounts, "shoes in stock", ratings, or "women-only".

---

## 1. Global design tokens

Create the tokens as CSS custom properties on `:root`, mirrored in the MUI theme (palette and typography), so components can use either.

### Colours
| Token | Light | Dark |
|---|---|---|
| `--page` (body bg) | `#f6f5f2` | `#000000` |
| `--paper` (raised panels, footer, look panel, newsletter card) | `#fbfaf8` | `#0b0b0c` |
| `--ink` | `#1d1d1f` | `#f5f5f7` |
| `--ink-2` (secondary text) | `#424245` | `#d2d2d7` |
| `--ink-3` (muted) | `#6e6e73` | `#8e8e93` |
| `--hair` (hairlines) | `rgba(0,0,0,.09)` | `rgba(255,255,255,.12)` |
| `--accent` (the only accent: quiet bronze) | `#8a6a3d` | `#c9a774` |
| `--stock` / `--stock-dot` | `#7a5a2e` / `#c99a55` | `#d8bc8c` / `#c99a55` |
| `--cta-ink` (card CTA label) | `#5e4420` | `#ecd3a8` |
| `--cta-tint` / hover / active | `rgba(176,138,82,.12/.20/.28)` | `rgba(216,188,140,.10/.17/.24)` |
| `--frame` (image placeholder bg) | `#e9e8e5` | `#161617` |
| `--bar` / `--bar-solid` (header glass) | `rgba(246,245,242,.72)` / `.9` | `rgba(16,16,18,.66)` / `.86` |
| `--focus` | `#0066d6` | `#4da3ff` |

Photo overlays are **always** dark scrims with white text, in both themes.

### Theme behaviour
- Theme is set by `data-theme="light|dark"` on `<html>`. When nothing is set, follow `prefers-color-scheme`.
- Persist the choice through the existing `useUIStore` (localStorage). Apply it **before first paint** to avoid a flash: put a tiny inline script in `index.html` that reads the persisted value.

### Type
- **Font:** Vazirmatn (self-host woff2, Arabic + Latin subsets) with weights **400, 500, 600, 700, 800, 900**. Add 800/900 if they are missing.
- **Serif:** Cormorant Garamond 300/400 (Latin), used only for the SAINTBALA wordmark.
- **Stack:** `"Vazirmatn", system-ui, -apple-system, "Segoe UI", Tahoma, sans-serif`.

| Role | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Hero H1 | `clamp(56px, 9.2vw, 136px)`; phone `clamp(52px, 15vw, 72px)` | 900 | 1.02 | −0.02em |
| Section H2 | `clamp(28px, 3vw, 40px)` | 800 | 1.25 | −0.01em |
| Kicker (above H2) | 13px, colour `--accent` | 500 | — | .02em |
| Hero sub | `clamp(15px, 1.3vw, 18px)` | 400 | 1.8 | — |
| Body / panel text | 15px | 400 | 1.9 | — |
| Small / meta | 12–13px | 400–500 | 1.5 | — |
| Latin brand caps (NIKE, JORDAN, ADIDAS) | 12–13px in ticker/kicker, `clamp(34px,3.4vw,50px)` in brand blocks | 700–900 | 1 | .14–.22em (brand blocks .06em) |
| Logo «SAINTBALA» | 17px (footer 18px) Cormorant 400 | 400 | 1 | .34em |

### Spacing, radii, motion
- **Spacing:** a 4px scale (4/8/12/16/20/24/32/40/48/56/64…).
- **Section top padding:** `clamp(72px, 9vw, 120px)`.
- **Content width:** `--wrap: 1180px`. Gutters `clamp(20px, 4vw, 48px)`, so `width: min(1180px, 100% - 2*gutter)`.
- **Radii:**

| Element | Radius |
|---|---|
| ProductCard | 32px |
| Bento tiles, brand media | 24px |
| Look photos | 22px |
| Rail tiles | 20px |
| Look panel | 28px |
| Newsletter card | 32px |
| List thumbnails | 10–12px |
| Buttons, chips, tabs | 999px |

- **Easing:** `--ease: cubic-bezier(.2,.7,.1,1)`.
- **Hover image zoom:** scale 1.03–1.05 over 0.8–1.1s.
- **Buttons:** 50px tall, padding 0 28px, 15px/600 text, press `scale(.97)`.
  - `light` (used on photos): bg #fff, ink #111.
  - `ghost` (on photos): `rgba(255,255,255,.14)` bg, inset 1px `rgba(255,255,255,.55)` ring, `backdrop-filter: blur(14px) saturate(160%)`, white text.
  - `solid`: bg `--ink`, text `--page`.

---

## 2. Header (keep the current full-width, square-edged bar; restyle it)

**Bar**
- `position: fixed; inset: 0 0 auto; height: 52px`, edge to edge with **no radius**.
- Background `var(--bar)`, `backdrop-filter: saturate(180%) blur(20px)` (plus the `-webkit-` prefix), `border-bottom: 1px solid var(--hair)`.
- Content follows the 1180 grid with 3 columns: `1fr auto 1fr`.

**Content (RTL order, start → end)**
- **Start:** the logo «SAINTBALA», Latin Cormorant, `dir="ltr"`, linking to `/`.
- **Centre nav, 12.5px, `--ink-2`, hover `--ink`, gap 36px:** «تازه‌ها» (#new) · «زنانه» · «مردانه» · «برندها» (#brands) · «ست‌ها» (#look).
- **End: 36px round icon buttons with 17px stroke icons:**
  - search
  - account → `/login`, or the user menu when logged in
  - cart with the existing badge
  - theme toggle (moon / sun)

**Behaviour**
- **Condensed state:** once the hero's bottom edge passes `< 60px` from the viewport top, add `.is-condensed`. That sets height 44px and `--bar-solid`, with a 0.35s transition.
- **Dark-over-hero state:** while the header sits over the hero (not condensed):
  - Background `rgba(10,10,12,.22)` with the same blur.
  - Border `rgba(255,255,255,.14)`.
  - Logo, links and icons turn **white**.
- **Phone (≤760px):** hide the centre nav and use a 2-column grid. Keep the existing mobile drawer and the bottom `CustomersTabbar`.
- Remove any search box or chips from the home header area. Search stays in the header icon.

---

## 3. Sections (in this order)

### 01 · Hero triptych (borrowed from Nike/Jordan campaign heroes and the Alo/Acne women–men split)

**Layout**
- Container: `height: 100svh; min-height: 620px; max-height: 1000px; overflow: clip; background: #111; color: #fff`. It sits under the fixed header.
- A grid of 3 photo panels: `grid-template-columns: 1fr 1.42fr 1fr; gap: 3px`. Each panel is a link to its product.
- Each photo: `object-fit: cover; object-position: 50% 18%` (centre panel `50% 12%`).

**Panels (RTL: right → left)**

| Panel | Product | Tag text |
|---|---|---|
| Right | SKU **DX2324-531**, `NIKE W NSW FLC PO HOODIE Violet`, product id 26 | «Nike · زنانه» |
| Centre, wider | SKU **FV7247-010**, Jordan Flight Fleece hoodie (a couple), id 91 | «Jordan · زنانه و مردانه» |
| Left | SKU **HV0959-020**, Nike Tech Fleece Joggers (man on a dark backdrop), id 77 | «Nike · مردانه» |

- Load these by id with `product(id)`, in one batched query using aliases. Use `productInfos[0].images[0]`. If a product is out of stock or missing, fall back to the newest in-stock product of the same gender.

**Overlays**
- **Per-panel scrim:** `linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,.35) 32%, transparent 58%)`, plus a top scrim `linear-gradient(rgba(0,0,0,.18), transparent 22%)`.
- **Hover a panel:** the *other* panels go to `brightness(.82) saturate(.9)`.
- **Tag chip:** top 76px, inline-start 22px.
  - 12px/500, padding 6px 12px, pill shape.
  - `rgba(0,0,0,.22)` with `blur(10px)`, white text.
  - The Latin brand is 700 with .14em letter-spacing.

**Copy block**
- Absolutely positioned at the bottom, centred, with bottom padding `clamp(48px, 8vh, 88px)`.
- **Kicker:** «کلکسیون پاییز ۱۴۰۵ · NIKE · JORDAN · ADIDAS». 13px/500, opacity .9. The dots are at .55 opacity. The Latin is 12px with .16em letter-spacing.
- **H1 (new slogan):** **«اصل باش. اصل بپوش.»** Weight 900 at the sizes above, `text-shadow: 0 2px 40px rgba(0,0,0,.25)`, margin-top 14px.
- **Sub:** «پوشاک ورزشی نایکی، جردن و آدیداس — برای بانوان و آقایان.» Max-width 34em, opacity .92.
- **CTAs:** margin-top 28px, gap 12px, centred.
  - «خرید زنانه» (light button) → women listing.
  - «خرید مردانه» (ghost button) → men listing.

**Scroll effect** (see §6): `--t` goes 0 → 1 while the hero exits.
- Images: `transform: scale(1.04 + t*.10) translateY(t*6%)`.
- Copy: `opacity: 1 - t*1.6; translateY(-t*60px)`.

**Phone (≤760px)**
- Hero height `92svh`, no max-height. Only the centre panel shows, full-bleed.
- The H1 wraps to 2 lines: «اصل باش.» / «اصل بپوش.».
- The CTAs sit side by side at `flex: 1`.
- Tag at top 66px, inline-start 16px.
- **Directly under the hero**, add a 2-up strip (`.hero-duo`):
  - Two 4:5 tiles side by side with gap 3px, no radius, edge to edge.
  - They use the right and left panel photos, captioned «زنانه» / «مردانه» (20px/800 white on the bottom scrim), and link to the gender listings.
  - Show it only on phone. This replaces the hidden side panels, so nothing is lost.

### 02 · Ticker (borrowed from the Stüssy/Jordan tickers)
- **Strip:** 48px, bg `--ink`, text `--page`, 14px/500.
- **Edge fade:** `mask: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)`.
- **Items, each followed by a 5px `--accent` dot:**
  - `NIKE` · `JORDAN` · `ADIDAS` (Latin 800, .2em, 13px)
  - «اصالت کالا — ۱۰۰٪ اورجینال نایکی و جردن»
  - «ضمانت تعویض ۷ روزه سایز و مدل»
  - «پرداخت آنلاین با زرین‌پال»
  - «کلکسیون پاییز ۱۴۰۵»
- **Loop:** render the list twice (the second copy `aria-hidden`) and animate `translateX(0 → 50%)` linear over 46s. That direction works for RTL.
- Pause on hover. Under reduced motion it is static.
- Give the container an `aria-label`: «برندها و ضمانت‌ها».

### 03 · New arrivals «تازه رسیده‌ها» (`id="new"`; borrowed from Gymshark "New in" and Our Legacy per-gender arrivals)

**Header row**
- Kicker «تازه‌های فروشگاه», H2 «تازه رسیده‌ها».
- At the end: a segmented tab control «همه / زنانه / مردانه» (`role="tablist"`) and a link «مشاهده‌ی همه ←» to the full listing.
- Header row spacing: margin-bottom 32px; it stacks on narrow screens.

**Tabs**
- Track `color-mix(in srgb, var(--ink) 6%, transparent)`, padding 4px.
- Tab: 14px, padding 8px 18px.
- Selected tab: bg `--paper`, weight 600, shadow `0 1px 2px rgba(0,0,0,.08), 0 4px 12px -6px rgba(0,0,0,.18)`.

**Data**
- "Newest" = **highest product id first**. There is no date field and server sorting is ignored, so sort on the client.
- Take the 4 newest in-stock **women** products and the 4 newest in-stock **men** products, then interleave them women, men, women, men… (8 total).
- Exclude products already used in the hero, brand blocks or the look.
- Tabs filter on the client: «زنانه» shows the 4 women's items, «مردانه» the 4 men's.

**Grid**
- Desktop: 4 columns, gap 28px × 24px. ≤1100px: 3 columns.
- ≤760px: **2 columns, gap 12px, with the compact card variant (§4)**. No horizontal scrolling on phone.

**Card:** the ProductCard (§4).

### 04 · Category bento «از کجا شروع کنیم؟» (borrowed from Kith/Nike campaign grids)
- Kicker «دسته‌بندی‌ها», H2 «از کجا شروع کنیم؟».
- **Grid:** 4 columns × 2 rows, row height `clamp(240px, 22vw, 320px)`, gap 16px, radius 24px, bg `--frame`.

**Tiles (RTL: the big tile is at the right)**

| Tile | Size | Photo | Text | Link |
|---|---|---|---|---|
| Jordan | 2×2 | **FZ1919-366**, couple in green Jordan tees | Latin kicker «AIR JORDAN» (12px/700, .22em); name «جردن» (`clamp(48px,5.4vw,80px)`/900); count «{n} محصول»; line «میراث جامپمن، برای هر دو.» (16px) | brand=jordan listing |
| Women | 1×1 | **DX0397-277** | «زنانه» + «{n} محصول» | women |
| Men | 1×1 | **IF2934-010** | «مردانه» + «{n} محصول» | men |
| Hoodies | 1×1 | **DM3330-646** | «هودی» + «{n} محصول» | hoodies |
| Pants | 1×1 | **FD7212-340** | «شلوار» + «{n} محصول» | pants |

**Tile styling**
- Image cover, `object-position: 50% 22%`.
- Scrim `linear-gradient(to top, rgba(0,0,0,.55), transparent 45%)`.
- Label at bottom 20px / inline 22px: name 24px/800 white, count 13px at .85 opacity.
- Arrow button at the bottom-end: 44px circle, `rgba(255,255,255,.2)` with blur 12px. On hover it turns white with dark ink and moves 4px toward the reading direction. Use a left-pointing arrow (forward in RTL).

**Counts:** compute live as in-stock products per category (in Persian digits). Brand count comes from `extractBrand`. Reference values today: Jordan ۳۰, women ۳۳, men ۵۸, hoodies ۱۳, pants ۲۷.

**Responsive:** ≤900px → 2 columns, auto rows 220px (phone 200px). The big tile spans 2 columns × 2 rows.

### 05 · Shop the look «جردن قرمز» (`id="look"`; borrowed from Kith "Shop the Look" and Gymshark hotspots)

**Layout:** 2 columns, `1.65fr 1fr`, gap 40px. RTL puts the photos at the right and the panel at the left.

**Look board**
- A 2×2 grid at aspect-ratio 1.12, gap 12px, radius 22px.
- Photo 0 spans both rows.
- Photo 1 uses `object-position: 50% 70%`; the others use 50% 25%.

| Photo | Product | Hotspot |
|---|---|---|
| 0 | **DV1574-612**, Air Jordan Essential Holiday Fleece Crewneck Red, id 85 | left 57%, top 56% |
| 1 | **DA9820-687**, Jordan Essentials Men's Fleece Pants Gym Red, id 80 | 46% / 60% |
| 2 | **DC7485-687**, Jordan Jumpman Men's Embroidered T-Shirt Red, id 46 | 53% / 47% |

**Hotspot**
- A 30px white circle with a 10px black dot in the middle (inset 10px) and shadow `0 2px 10px rgba(0,0,0,.25)`.
- A pulsing ring (inset −7px, 1.5px white .85) animates scale .7 → 1.5 and fades out over 2.4s. Under reduced motion it is static at opacity .6.
- It is a real `<button>`. Its accessible name is the product name.

**Tooltip** (shown on hover, focus or tap, `role="tooltip"`, linked by `aria-describedby`)
- Bg `--paper`, radius 14px, padding 10px 14px, 12.5px text.
- It shows the product name (LTR) and a bold «{price} تومان».
- It sits above the dot.

**Panel** (`position: sticky; top: 88px`; static ≤900px)
- Bg `--paper`, radius 28px, padding 32px.
- Shadow `0 0 0 1px var(--hair), 0 30px 60px -40px rgba(0,0,0,.3)`.

**Panel content**
- Kicker «ست کامل», H2 «جردن قرمز».
- Paragraph «سه تکه از یک رنگ — سویشرت، شلوار فلیس و تی‌شرت جامپمن. جدا یا با هم.»
- An ordered list of 3 rows. Each row is a grid `64px 1fr auto`, gap 14px, with a hairline top border:
  - Thumbnail 64px, radius 12.
  - Type line in `--accent`, 12px/600: «سویشرت مردانه» / «شلوار مردانه» / «تی‌شرت مردانه».
  - Name: LTR, one line, ellipsis at the **end**.
  - Meta: «سایز L · {price} تومان».
  - A 40px round «+» add button.
- Total row: «جمع ست» with «{sum} تومان» in 22px/800 (reference today ≈ sum of $40 + $70 + $35 × the live rate).
- Full-width solid button «افزودن هر سه به سبد» with a bag icon.

**Interaction**
- Hovering a list row highlights its hotspot and tooltip, and vice versa. The highlighted row gets bg `color-mix(accent 8%)`.
- «+» adds that item: its first in-stock variant goes into the existing Zustand / server cart. Then the button flashes the accent colour for 1.8s.
- «افزودن هر سه به سبد» adds all in-stock items.
- If an item is out of stock, disable its «+» and label it «ناموجود», and exclude it from the total.

### 06 · Brand blocks «سه نام، یک قول: اورجینال.» (`id="brands"`; borrowed from Kith brand edits)
- Kicker «برندها».
- **Layout:** 3 columns, gap 24px. Stacked ≤900px with gap 40px.

**Each block**
- **Media:** a 4:5 link, radius 24px, bottom scrim `rgba(0,0,0,.5) → transparent 40%`. The Latin wordmark sits at bottom 18px / inline-start 22px, 900 weight.
- A Persian line (15px, `--ink-2`, line-height 1.9, min-height 3.8em).
- A mini list of products: each row is a 56px thumbnail (radius 10) + name (LTR ellipsis at the end) + bold «{price} تومان». Rows have hover background.
- A link «همه‌ی محصولات {Brand} ←».

| Block | Media photo | Line | Mini products |
|---|---|---|---|
| NIKE | **FB8008-063** (Tech Fleece bomber) | «از تک‌فلیس تا سووش؛ کلاسیک‌هایی که هر روز پوشیده می‌شوند.» | DX2324-531, BV0507-100 |
| JORDAN | **DQ7544-662** (Flight Heritage hoodie, Red Clay) | «میراث جامپمن، از زمین بسکتبال تا خیابان.» | CJ0921-011, DA9854-091 |
| ADIDAS | **FL0147** (Adidas women's sweater) | «سه خط، یک امضا؛ ساده و ماندگار.» | FL0147 only. HM2137 is out of stock, so never show out-of-stock items here. |

### 07 · Picks rail «انتخاب‌های سنت‌بالا» (borrowed from Alo "Trending now"; **not** "best-sellers")

**Header**
- Kicker «گزیده», H2 «انتخاب‌های سنت‌بالا».
- Two 40px round arrow buttons at the end, «قبلی» / «بعدی», with a hairline ring.
- In RTL, "next" scrolls toward the **left**: `scrollBy({left: -2*step})`.

**Products** (in this order, in-stock only, max 10)
- DD5094-133, DC5276-596, CZ8528-397, DR1025-247, CN3000-100, DZ6026-448, CK0160-010, DQ6304-010, 682852-355, DR6171-063.
- Skip any that are already shown elsewhere on the page. If fewer than 10 remain, fill with in-stock products not yet shown.

**Rail**
- `display: grid; grid-auto-flow: column; grid-auto-columns: clamp(200px, 19vw, 256px); gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory`, scrollbar hidden.
- Inline padding/scroll-padding `max(gutter, (100% - 1180px)/2)` so the first tile aligns with the content column.
- The rail scrolls **inside itself only**. `body` uses `overflow-x: clip`, so the page itself never scrolls sideways.
- Keyboard focusable, with an `aria-label`.

**Tile**
- Square media, radius 20, bg `--frame`.
- If the product has a second image, cross-fade to it on hover. Otherwise zoom to 1.04.
- **Quick-add button** at the bottom-end corner of the image (use container query units: `top: calc(100cqw - 52px)`):
  - 40px pill, bg `--paper`, shadow, «+» icon.
  - On hover it expands to «سایز {size} · افزودن». After adding it shows «اضافه شد» for 1.8s.
- Below the image:
  - Brand (Latin 11.5px/700, .16em, `--ink-3`).
  - Name (14px/500, 2-line clamp, LTR).
  - Price.

**Phone:** `grid-auto-columns: 44%`, gap 14px. The quick-add shows only the «+».

### 08 · Trust strip
- 3 columns separated by hairlines, with a hairline above and below. Margin-top `clamp(80px,9vw,120px)`. Each column is centred with padding 40px 24px.
- Icons are 28px stroke icons in `--accent`. Titles are 17px/700. Lines are 14px `--ink-3`.

| Icon | Title | Line |
|---|---|---|
| Shield | «اصالت کالا» | «۱۰۰٪ اورجینال نایکی و جردن» |
| Swap | «ضمانت تعویض ۷ روزه» | «تعویض سایز و مدل» |
| Card | «پرداخت امن» | «پرداخت آنلاین با زرین‌پال» |

- Phone: 1 column, with hairlines between rows.

### 09 · Newsletter
- A card: bg `--paper`, radius 32px, 1px hair ring, padding `clamp(32px,4vw,56px)`. Two columns (one column ≤900px).
- Kicker «خبرنامه», H2 «اولین نفر باش.».
- Paragraph «از رسیدن محصولات تازه‌ی نایکی، جردن و آدیداس باخبر شو.». Do not promise how often emails go out.
- **Form**
  - Email field: 50px pill with a mail icon, placeholder «ایمیل شما», `dir="ltr"`, `type="email"`, required, `autocomplete="email"`, and a visually-hidden label «ایمیل».
  - Solid button «عضویت».
  - On success show `role="status"`: «ممنون! ایمیلت ثبت شد.».
- **Backend:** there is no newsletter mutation yet. Add `subscribeNewsletter(email: String!): Boolean!` (§7). Until it exists, keep the UI behind a feature flag. **Do not fake success in production.**

### 10 · Footer
- Bg `--paper`, top hairline, padding-top 64px.
- **Grid:** `1.6fr repeat(4, 1fr)`, gap 32px.
  - ≤1100px: 3 columns, with the brand cell spanning the full row.
  - ≤760px: 2 columns.

**Columns**
- **Brand cell:** «SAINTBALA» (Cormorant, .34em) + «پوشاک ورزشی اورجینال نایکی، جردن و آدیداس برای بانوان و آقایان.»
- **«فروشگاه»:** تازه‌ها · زنانه · مردانه · هودی · شلوار
- **«برندها»:** Nike · Jordan · Adidas
- **«راهنما»:** اصالت کالا · تعویض ۷ روزه · راهنمای سایز · پرداخت با زرین‌پال
  - These pages don't exist yet. Build simple static pages that use only the verified claims, or hide the links.
- **«حساب»:** «ورود با ایمیل» (→ `/login`) · «سبد خرید» (→ `/cart`) · «علاقه‌مندی‌ها»

**Bottom of the footer**
- A giant faint wordmark «SAINTBALA»: Cormorant 300, `clamp(64px,14.5vw,216px)`, line-height .8, letter-spacing .08em, colour `color-mix(ink 9%)`, centred, `aria-hidden`, no wrap. It must not cause horizontal overflow; clip it.
- Bottom bar (hairline top, 13px `--ink-3`): «© ۱۴۰۵ سنت‌بالا» and «پرداخت آنلاین با زرین‌پال».
- No social links, phone or address (none exist).

---

## 4. ProductCard spec (port the existing glass card; one component, two sizes)

**Shell**
- `.glass` card, radius 32px, full width of its grid cell.
- Glass surface: fill `rgba(255,255,255,.30)` light / dark equivalent, `backdrop-filter: blur(26px) saturate(190%) brightness(1.04)`, with an inner rim highlight and a layered soft shadow.
- Hover: a deeper shadow, plus a specular highlight that follows the pointer through `--mx/--my`.
- Optional Chromium-only SVG edge refraction, if the existing card already has it.

**Media**
- Square image, bg `#f2f2f3` / dark `#161617`.
- The bottom of the photo fades into the card (mask gradient from 46% down to 99%), and the body rides 108px up over the fade.
- Hover zoom 1.035. If there is a second image, cross-fade to it.

**Floating glass controls** (14px inset, concentric with the corner)
- Heart toggle, `aria-pressed`, label «افزودن به علاقه‌مندی‌ها» / «حذف از علاقه‌مندی‌ها».
- Colour swatch chip: the first colour's `hexCode` disc plus its Persian `name`. Colours describe a colourway, so show only the first one, as a label.

**Body, in order**
1. **Eyebrow:** `Brand · {type} {gender}`, e.g. «Nike · هودی زنانه».
   - Types: hoodies هودی, pants شلوار, t-shirts تی‌شرت, sweatshirts سویشرت, leggings لگ, shorts شلوارک, jerseys جرسی, jackets کاپشن, tank-tops تاپ.
   - Genders: زنانه / مردانه.
2. **Title:** the English name, LTR in `<bdi dir="ltr" lang="en">`, 2-line clamp, linking to `/product/:id`.
3. **SKU line:** «کد محصول {SKU}», with the SKU in LTR.
4. **Price:** «{n} تومان», with the number in Persian digits.
5. **Size row**
   - Label «سایز» and a segmented control with the **available sizes only**.
   - If the variant stock is 1: «تنها ۱ عدد باقی مانده» with a `--stock-dot` dot.
6. **CTA:** «افزودن به سبد خرید» with a bag icon, in a bronze-tinted glass pill. After adding it shows «به سبد اضافه شد» for 1.8s.

**Compact variant (phone grid ≤760px)**
- Radius 22px.
- No SKU line, no fade overlap (the body sits below the image).
- Title 13px with a 2-line clamp.
- Size and stock on one line.
- The CTA becomes a 40px round bag button at the end of the price row.
- Minimum tap target 40px.

---

## 5. Responsive rules (and the phone fixes)

**Breakpoints:** ≥1101 desktop · 901–1100 small desktop/tablet landscape · 761–900 tablet · ≤760 phone (design at 390, test at 360).

**Hard rule: no page-level horizontal overflow at any width.**
- `html, body { overflow-x: clip }`.
- Verify that `document.documentElement.scrollWidth === innerWidth` at 360, 390, 768, 1024, 1440 and 1920.

**Phone fixes compared with the reference render**
- Hero: the centre photo plus the new 2-up «زنانه / مردانه» strip under it.
- New arrivals: a **2-column grid with compact cards**. Never a sideways strip that bleeds off-screen.
- Brand blocks: stacked.
- Look: the photos come first, then the panel, which is not sticky. Tooltips must stay inside the viewport (flip or clamp them).
- The footer wordmark is clipped.

---

## 6. Motion (Apple-style, upgradeable)

Use two registered properties:
```css
@property --t { syntax: "<number>"; inherits: true; initial-value: 0; }
@property --v { syntax: "<number>"; inherits: true; initial-value: 0; }
@keyframes ch-t { from { --t: 0 } to { --t: 1 } }
@keyframes rv-v { from { --v: 0 } to { --v: 1 } }
@supports (animation-timeline: view()) {
  .hero { view-timeline: --hero block; animation: ch-t linear both; animation-timeline: --hero; animation-range: exit 0% exit 100%; }
  .rv   { animation: rv-v linear both; animation-timeline: view(); animation-range: entry 5% cover 30%; }
}
.rv { --vd: clamp(0, calc(var(--v) * 1.25 - var(--d, 0) * .08), 1); opacity: var(--vd); transform: translate3d(0, calc((1 - var(--vd)) * 28px), 0); }
```

**Reveal targets (`.rv`):**
- Section headers.
- Each grid card, with `--d` = index % 4 for a stagger.
- Bento tiles, look photos and panel, brand blocks, trust columns, newsletter.

**JS fallback** (a hook `useScrollProgress`, active only when `!CSS.supports('animation-timeline: view()')`). In one passive scroll listener throttled with rAF, set the same variables:
- `hero --t = clamp(-rect.top / rect.height)`.
- For each `.rv`: `start = .05*min(h,vh)`, `end = .30*(vh+h)`, `--v = clamp((vh - rect.top - start)/(end - start))`.
- The fallback must produce the same values as the native path.

**Rules**
- Animate only `transform`, `opacity` and `filter`.
- Do not use framer-motion for these effects.
- **`prefers-reduced-motion: reduce`:** `.rv` shows its final state (`--v: 1`, no animation), hero `--t: 0`, ticker static, hotspot pulse off, and instant scroll for the arrows.

**Upgrade path:** later, sections can become pinned "chapters" (sticky 100svh scenes driven by `--t` with `contain 0% contain 100%`). Keep section components self-contained so that is easy.

---

## 7. Data layer

**One home query** (`HomePageQuery`), with Apollo `cache-first`:
```graphql
query HomePage {
  all: products(filter: { first: 200, onlyInStock: true, onlyWithSellers: true, archivedStatus: ACTIVE }) {
    totalCount
    edges { node { id name sku
      categories { id slug name }
      productInfos { id size sizeKind images colors { id name hexCode } }
      sellerProducts { id productInfoId price discount stockQuantity } } }
  }
  categories { id slug name }
  rate: currentExchangeRate(fromCurrencyCode: "USD", toCurrencyCode: "IRR") { rate }
}
```

**Why one big query**
- `first:200` returns the full catalogue (93 items).
- The connection's pagination is **buggy**: `first:N` returns about N/2 items and ids 70–93 are unreachable when paging. So do not page on the home page.
- Derive everything on the client with memoised selectors: newest-by-id, gender split, category counts, brand via `extractBrand`, products by SKU for the curated sections, and stock per variant.

**Missing backend pieces to add** (NestJS resolvers/DTOs; keep the existing behaviour backward compatible):
1. **Fix pagination:** apply LIMIT/OFFSET to distinct product ids *before* joining categories and variants. Make cursors stable.
2. **Real sorting:** `sort: ID_DESC | PRICE_ASC | PRICE_DESC` (enum) honoured server-side. Today `sort` and `sortOrder` are ignored.
3. **Filters:**
   - Fix `category: String` (slug), which currently throws an SQL error.
   - Add `categorySlugs: [String!]` with AND semantics, so «women» + «hoodies» works.
   - Add `brand: String`. Persist a `brand` column, backfilled from the name prefix, rather than regex at runtime.
   - Add `ids: [Int!]` so the hero, look and brand blocks can fetch exactly what they need.
   - Fix `productInfoFilter.colorId/price`, which currently throws an SQL error.
4. **`categoryCounts(onlyInStock: Boolean = true): [CategoryCount{ slug, count }]`.** Until it exists, compute counts on the client from the query above.
5. **`subscribeNewsletter(email: String!): Boolean!`:** rate-limited, store email + createdAt, idempotent.
6. **Product listing route:** add `/shop` (or extend `/`) reading `?category=women|men|hoodies|pants…` and `?brand=nike|jordan|adidas`. All home links point there (e.g. `/shop?category=women`, `/shop?brand=jordan`, `/shop?sort=new`).

Leave the existing broken `/api/cart` REST calls alone or remove them; don't depend on them.

**Prices**
- `toman = round(price × (1 - discount/100) × rate)`.
- Format with `Intl.NumberFormat('fa-IR')`, which gives Persian digits and the «٬» separator, then append « تومان».
- Never hard-code a rate.

**Cart**
- Reuse the existing cart store and mutations. Quick-add adds the product's first in-stock `productInfo` (its only size) with `sellerProductId`.
- Guests use the local cart. Checkout still requires login.

**Images**
- `${VITE_API_BASE_URL}${images[0]}`.
- Always set `width/height` (or aspect-ratio boxes) to avoid layout shift.
- `loading="lazy"` everywhere except the hero, which uses `fetchpriority="high"` on the centre image and a preload.
- Use the existing placeholder for products with no image, and never pick an image-less product for the hero, bento or look.
- Recommended (backend/nginx): serve resized WebP/AVIF variants (e.g. 480/900/1400).

---

## 8. RTL, Persian and typography rules
- `<html lang="fa" dir="rtl">`. Use logical properties only (`inset-inline-start`, `margin-inline`, `padding-inline`). Never hard-code left/right for layout.
- **All numbers shown to users are Persian digits:** prices, counts, ۷, ۱۰۰٪, ۱۴۰۵. SKUs and sizes (L, XS) stay Latin, in `<bdi dir="ltr">`.
- **English product names** are always in `<bdi dir="ltr" lang="en">` with the ellipsis at the end. Latin brand words get `lang="en"`.
- Use the **ZWNJ (نیم‌فاصله)** correctly: تازه‌ها، ست‌ها، مشاهده‌ی، تی‌شرت، علاقه‌مندی‌ها، سنت‌بالا، زرین‌پال، همه‌ی، تازه‌ی.
- Use Persian punctuation: «،» and «؛» and «؟».
- Don't apply letter-spacing to Persian text. Letter-spacing is only for Latin caps.
- Directional icons: "forward" arrows point **left**.

## 9. Accessibility
- **Landmarks:** `header`, `nav[aria-label="منوی اصلی"]`, `main#main`, `footer`, plus a skip link «رفتن به محتوا».
- Each section is `aria-labelledby` its H2. The hero H1 is the only H1.
- **All interactive elements are real `<a>`/`<button>`:**
  - Hotspots are buttons with names.
  - Tabs use `role=tab` + `aria-selected`, with arrow-key support.
  - The favourite toggle uses `aria-pressed`.
  - Quick-add buttons have `aria-label`s that include the size.
- **Focus:** `:focus-visible` outline 2px `--focus`, offset 3px.
- **Contrast:** text ≥ 4.5:1 (white on photos is guaranteed by the scrims), large text ≥ 3:1. Check both themes.
- Hero panel photos used as decoration get `alt=""` (the link has the label). Product images get a Persian alt: «{type} {Brand} — {colour}، روی مدل».
- Tap targets ≥ 40px on phone.
- Ticker duplicates are `aria-hidden`.
- Reduced motion is respected (§6).

## 10. Acceptance checklist (verify every item)
- [ ] All 10 sections render in the specified order, and match `design-reference/` and the attached screenshots at 1440×900 in **light and dark**.
- [ ] Hero H1 reads exactly **«اصل باش. اصل بپوش.»**. The header shows the dark-glass state over the hero and condenses to a 44px solid bar after the hero.
- [ ] No hard-coded products, prices or counts. Everything comes from GraphQL. The prices use the live rate.
- [ ] New arrivals are the 4 + 4 highest-id in-stock products (women/men interleaved), and the tabs filter correctly.
- [ ] Shop the look uses ids 85 / 80 / 46. Its total equals the sum of the in-stock items. Each «+» and «افزودن هر سه به سبد» add to the real cart.
- [ ] No out-of-stock product appears anywhere (HM2137 is hidden).
- [ ] Only the three verified claims appear. None of these words appear anywhere: ارسال رایگان، تحویل، پرفروش، تخفیف، کفش.
- [ ] No horizontal page overflow at 360, 390, 768, 1024, 1440 or 1920.
  - Phone hero shows the centre photo plus the زنانه/مردانه duo strip.
  - The phone new-arrivals section is a 2-column compact grid.
- [ ] Scroll reveals and hero parallax work in Chrome (native) **and** Safari/Firefox (JS fallback) with equivalent values. Under reduced motion everything is visible and static.
- [ ] Persian digits are used everywhere numbers are shown, and ZWNJ spelling is correct. English names and SKUs are isolated LTR with correct ellipsis.
- [ ] Keyboard only: everything is reachable and the focus ring is visible. The rail arrows, tabs and hotspots all work.
- [ ] axe/Lighthouse: Accessibility ≥ 95, CLS < 0.05, LCP image is the hero centre photo.
- [ ] The theme toggle persists, there is no flash of the wrong theme, and `prefers-color-scheme` is honoured when unset.
- [ ] The backend changes in §7 are behind safe, backward-compatible APIs, with tests for pagination, sort, slug/brand filters and `ids`.
- [ ] No new third-party trackers or fonts from a CDN; fonts are self-hosted.

Work in small commits:
1. Tokens and theme.
2. Header.
3. ProductCard (both sizes).
4. Sections 01–10.
5. Motion hook.
6. Data selectors.
7. Backend additions.
8. QA against this checklist. Report any item you could not meet and why.
