# Testing coverage checklist (Phase 3+)

Incremental expansion after critical-path smoke e2e and high-risk unit tests.

## Done in this rollout

- Product editor CI fix (`admin-product-editor:test`)
- Chromium Playwright critical-path smoke: admins / sellers / customers
- CI: `kickzone_cl` runs affected e2e (excludes API e2e for now)
- Unit: cart store, customer login hook, product-info-colors util, roles guard
- API e2e: existing checkout suite + cancel/stock edge coverage

## Remaining screens (customers)

- [ ] customer-payment / payment-callback
- [ ] customer-orders
- [ ] customer-checkout (dialog flow beyond cart shell)
- [ ] reset-password
- [ ] home marketing edges
- [ ] unauthorized

## Remaining screens (sellers)

- [ ] sellers products list
- [ ] seller-orders details
- [ ] setup-password
- [ ] unauthorized
- [ ] catalog edit deep flows (images, stock)

## Remaining screens (admins)

- [ ] translation-management
- [ ] language-settings
- [ ] currency-management edges
- [ ] contact
- [ ] authenticated product-editor save journey (needs test API + credentials)

## Server / API

- [ ] Wire `kickzone-api-e2e` into CI once stable/sqlite fixtures are reliable on runners
- [ ] More service specs: ColorService / CategoryService CRUD + seed
- [ ] GraphQL auth / catalog guards beyond RolesGuard
- [ ] Controllers HTTP smoke

## E2e expansion notes

1. Prefer Chromium-only in CI; add Firefox/WebKit later.
2. Authenticated journeys need seeded users + API (or GraphQL route stubs).
3. Keep smoke redirects for unauthenticated protected routes as the baseline.
