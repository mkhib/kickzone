# Kickzone Architecture Map

> Auto-generated architectural index for the Kickzone monorepo.  
> This file is the single source of truth for LLM context. Regenerate via `npm run ai:sync` or the `pre-commit` hook.  
> Do not edit by hand — changes here are overwritten on sync.

---

## 1. Tooling & Monorepo Topology

| Concern | Technology | Location |
|---------|-----------|----------|
| Package manager | Yarn (v1 lockfile) | `yarn.lock` |
| Monorepo orchestrator | Nx v21.4.1 | `nx.json` |
| Backend framework | NestJS v10 | `apps/kickzone-api` |
| ORM / Database | TypeORM v0.3.20 + PostgreSQL | `libs/server/entities` |
| GraphQL server | Apollo Server v4 + `@nestjs/graphql` | `apps/kickzone-api/src/main.ts` |
| GraphQL schema (contract) | `schema.gql` (auto-generated, DO NOT MODIFY) | `libs/shared/graphql-schema/src/lib/schema.gql` |
| GraphQL codegen | `@graphql-codegen/cli` → `graphql.ts` | `libs/shared/codegen/src/lib/codegen.yml` |
| Frontend | React v19 + MUI v7 + React Router v7 | `apps/client/{admins,customers,sellers}` |
| Frontend data layer | Apollo Client v4 + Zustand v5 + i18next | `libs/client/shared/{graphql,hooks,zustand}` |
| Auth | Passport-JWT / Passport-Local, `@nestjs/jwt`, bcryptjs | `libs/server/{strategies,guards,services}` |
| Payments | ZarinPal gateway | `libs/server/{services,resolvers}` (payment) |
| Logging | Pino (`nestjs-pino`) | `apps/kickzone-api/src/app/app.module.ts` |
| I18n | i18next + typesafe-i18n | `libs/shared/shared-i18n` |

### Directory Topology & Boundary Rules

```
apps/
  kickzone-api/            # NestJS backend (GraphQL API entrypoint)
    src/app/app.module.ts  # Root module — registers all TypeORM entities + feature modules
  client/admins/           # Admin SPA (React + MUI)
  client/customers/        # Customer SPA (React + MUI)
  client/sellers/          # Seller SPA (React + MUI)
  kickzone-api-e2e/        # API e2e tests
  client/{admins,customers,sellers}-e2e/  # Playwright e2e per client

libs/
  server/
    entities/              # 21 TypeORM + @nestjs/graphql @ObjectType entities (DB schema)
    modules/               # 21 NestJS feature modules (Auth, Product, Order, Cart, ...)
    resolvers/             # GraphQL resolvers (Query/Mutation entrypoints)
    services/              # Business logic services
    controllers/           # REST controllers (auth, order — minimal)
    inputs/                # GraphQL input types (CreateProductInput, etc.)
    guards/                # NestJS guards (roles, auth)
    strategies/            # Passport strategies (JWT, Local)
    decorators/            # Custom decorators
    utils/                 # Relay connection/pagination helpers (ConnectionType, EdgeType)
  client/
    shared/
      graphql/             # Generated GraphQL TS types (used by all 3 clients)
      hooks/               # React data hooks (products, cart, orders, brands, ...)
      zustand/             # Shared Zustand stores (auth, notification, ui)
      components/          # Shared UI components (layout, data-table, snackbar, ...)
      ui/                  # Design tokens (colors, sizes, language-components)
      translations/        # i18n translation files
    admins/                # Admin feature libs (screens, hooks, router, graphql, contexts)
    customers/             # Customer feature libs (screens, hooks, router, graphql, zustand, validations)
    sellers/               # Seller feature libs (screens, hooks, router, graphql, zustand)
  shared/
    graphql-schema/        # schema.gql — single source of truth for GraphQL contract
    codegen/               # codegen.yml + generated/graphql.ts
    product-sizes/         # Product size constants
    shared-i18n/           # i18n locales
```

**Boundary rules:**
- `apps/kickzone-api` imports only `@kickzone-workspace/entities`, `@kickzone-workspace/modules`, `@kickzone-workspace/services`, `@kickzone-workspace/resolvers`, `@kickzone-workspace/controllers`, `@kickzone-workspace/inputs`, `@kickzone-workspace/guards`, `@kickzone-workspace/decorators`, `@kickzone-workspace/strategies`, `@kickzone-workspace/utils`.
- Server `entities` lib imports `@kickzone-workspace/utils` only (no circular imports into modules/resolvers/services).
- All three client SPAs import `@kickzone-workspace/client-shared-graphql` (generated types) and `@kickzone-workspace/shared-*` libs; they never import server code directly.
- Cross-client sharing happens only through `libs/client/shared/*`; `admins/`, `customers/`, `sellers/` are isolated from each other.

---

## 2. Core Database Entities & Schema Relationships

**21 entities** in `libs/server/entities/src/lib/`:

| Entity | File | Key relationships |
|--------|------|-------------------|
| `User` | `user.entity.ts` | `Cart` (1:N via userId), `SellerInfo` (1:1), roles: ADMIN/SELLER/CUSTOMER |
| `RefreshToken` | `refresh-token.entity.ts` | Belongs to User |
| `Product` | `product.entity.ts` | `ProductInfo` (1:N), `Category` (M:N), `Brand` (N:1), `SellerInfo` (N:1), `SellerProduct` (1:N), `ProductDescription` (1:N) |
| `ProductInfo` | `product-info.entity.ts` | `Product` (N:1), `Color` (M:N), sizes, weight, images |
| `ProductInfoColor` | `product-info-color.entity.ts` | Join ProductInfo ↔ Color |
| `Category` | `category.entity.ts` | `Product` (M:N) |
| `Brand` | `brand.entity.ts` | `Product` (1:N) |
| `Color` | `color.entity.ts` | `ProductInfo` (M:N) |
| `SellerInfo` | `seller-info.entity.ts` | `User` (1:1), `SellerProduct` (1:N), `SellerOrder` (1:N) |
| `SellerProduct` | `seller-product.entity.ts` | `SellerInfo` (N:1), `Product` (N:1), `ProductInfo` (N:1), unique index (seller, productInfoId) |
| `Order` | `order.entity.ts` | `SellerInfo` (N:1 via sellerId), `OrderItem` (1:N) |
| `OrderItem` | `order.entity.ts` | `Order` (N:1), `Product` (N:1) |
| `Cart` | `cart.entity.ts` | `User` (N:1), `CartItem` (1:N) |
| `CartItem` | `cart.entity.ts` | `Cart` (N:1), `Product` (N:1) |
| `CustomerProfile` | `customer-profile.entity.ts` | `User` (1:1 via userId) |
| `Translation` | `translation.entity.ts` | Polymorphic (entityType/entityId) |
| `Currency` | `currency.entity.ts` | `ExchangeRate` (from/to), `CurrencyPreference` |
| `ExchangeRate` | `exchange-rate.entity.ts` | `Currency` (from/to N:1), `User` (createdBy N:1) |
| `CurrencyPreference` | `currency-preference.entity.ts` | `Currency` (N:1) |
| `SiteLanguage` | `site-language.entity.ts` | `ProductDescription` (language N:1) |
| `ProductDescription` | `product-description.entity.ts` | `Product` (N:1), `SiteLanguage` (N:1) |
| `PlatformSettings` | `platform-settings.entity.ts` | Singleton settings |

**Critical invariants:**
- `synchronize: true` in `app.module.ts` — TypeORM auto-syncs schema on startup (no migrations folder in use; `migrations.json` at root is legacy/unused).
- `SellerProduct` has a unique DB index on `(seller, productInfoId)` — prevents duplicate seller listings for the same product variant.
- `OrderItem.product` and `CartItem.product` are ManyToOne to `Product` with `onDelete: 'CASCADE'`.
- `Order.sellerId` + `SellerInfo` snapshot fields (`sellerStoreName`, `sellerPhone`, `sellerAddress`) preserve seller state at order time.
- `User.password` is NOT exposed in GraphQL (`UserWithoutPassword = Omit<User, 'password'>`).

---

## 3. API Contract Flow

**Backend flow (Entity → DTO/Schema → Service → Resolver):**

```
TypeORM Entity (@Entity + @ObjectType)
        │
        ▼
GraphQL Type (auto via @nestjs/graphql decorators on entity)
        │
        ▼
Service (business logic, @InjectRepository)   ← libs/server/services/src/lib/*.service.ts
        │
        ▼
Resolver (Query/Mutation entrypoints)         ← libs/server/resolvers/src/lib/*.resolver.ts
        │
        ▼
GraphQL Schema (schema.gql)                   ← libs/shared/graphql-schema/src/lib/schema.gql
        │
        ▼
GraphQL Codegen → generated/graphql.ts       ← libs/shared/codegen/src/lib/generated/graphql.ts
        │
        ▼
Apollo Client hooks (useQuery/useMutation)    ← libs/client/shared/hooks/* + app-specific hooks
        │
        ▼
React Components (MUI)                        ← apps/client/{admins,customers,sellers}/src/app/
```

**Key GraphQL contract surfaces in `schema.gql` (848 lines):**
- **Queries:** `products`, `product`, `categories`, `brands`, `sellers`, `sellerProductsForMe`, `orders`, `order`, `myOrders`, `mySellerOrders`, `myCart`, `currencies`, `siteLanguages`, `me`, `myProfile`, `users`, `customers`, `colors`, `calculateShippingCost`, `getTranslation`, ...
- **Mutations:** `createProduct`, `updateProduct`, `archiveProduct`, `createOrder`, `updateOrderStatus`, `addToCart`, `updateCartItem`, `createSellerProduct`, `createSeller`, `createUser`, `login`, `refresh`, `setCurrencyPreference`, `requestZarinPalPayment`, `verifyZarinPalPayment`, `createSiteLanguage`, `setTranslation`, ...
- **Enums:** `UserRole` (ADMIN/SELLER/CUSTOMER), `OrderStatus` (PENDING/CONFIRMED/PROCESSING/SHIPPED/DELIVERED/CANCELLED/REFUNDED), `SizeKind` (Apparel/Footwear), `ProductArchivedStatus` (ALL/ACTIVE/ARCHIVED)
- **Scalars:** `DateTime`, `Upload`
- **Pagination:** Relay-style `Connection`/`Edge`/`PageInfo` for `User`, `Product`, `Seller`, `Order`, `SellerOrder`

---

## 4. High-Risk Blast Radius Hotspots

These files are imported across multiple modules. Changes here have the widest downstream impact:

| Hotspot file | Imported by | Risk if changed |
|--------------|-------------|-----------------|
| `libs/shared/graphql-schema/src/lib/schema.gql` | All resolvers, all 3 client SPAs, codegen | Breaking GraphQL contract — requires coordinated client + server regen |
| `libs/server/entities/src/lib/index.ts` | `apps/kickzone-api/src/app/app.module.ts`, all modules/services/resolvers | Adding/removing an entity changes TypeORM registration |
| `libs/server/modules/src/lib/index.ts` | `apps/kickzone-api/src/app/app.module.ts` | Adding/removing a module changes app wiring |
| `libs/server/entities/src/lib/product.entity.ts` | OrderItem, CartItem, SellerProduct, ProductInfo, ProductDescription, services/resolvers | Product shape changes cascade to cart/order/catalog |
| `libs/server/entities/src/lib/user.entity.ts` | Cart, Order, SellerInfo, CustomerProfile, auth resolvers | User shape changes cascade to auth/cart/order |
| `libs/server/utils/src/lib/pagination.ts` | All entity Connection/Edge types | Changes break all paginated GraphQL queries |
| `libs/client/shared/graphql/src/lib/*` (generated) | All 3 client SPAs, all hooks | Regenerated types change — requires client typecheck |
| `libs/client/shared/zustand/shared-ui-store/src/index.ts` | All client components | Global UI state shape changes affect every screen |
| `apps/kickzone-api/src/app/app.module.ts` | N/A (entrypoint) | Adding entities/modules requires edits here + `entities` array |

**Sync trigger rule:** Any change to `*.ts`, `*.tsx`, `*.graphql`, `*.prisma`, or `project.json` under `apps/`, `libs/`, or root-level config should trigger `npm run ai:sync` to regenerate `.ai-context/repo-skeleton.xml` and `.ai-context/dependency-graph.md`.
