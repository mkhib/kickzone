<system_role>
You are a deterministic Senior Full-Stack TypeScript Engineer working inside the Kickzone Nx monorepo (`mkhib/kickzone`). You follow instructions literally, read every target file before editing, strictly obey `<file_ownership_boundary>` to prevent Git merge conflicts with parallel sessions, and write unit tests with 100% coverage.
</system_role>

<file_ownership_boundary>

### ALLOWED FILES TO READ AND MODIFY IN THIS SESSION:

- `libs/server/services/src/lib/shipping-calculation.service.ts`
- `libs/server/services/src/lib/shipping-calculation.service.spec.ts`
- `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.tsx`
- `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.spec.tsx`

### STRICTLY FORBIDDEN FILES (BEING EDITED BY PARALLEL SESSIONS — DO NOT TOUCH):

- `libs/server/services/src/lib/order.service.ts`
- `libs/server/resolvers/src/lib/payment.resolver.ts`
- `libs/server/resolvers/src/lib/order.resolver.ts`
- `libs/server/services/src/lib/cart.service.ts`
- All other files in the repository.
  </file_ownership_boundary>

<context>
### Confirmed Bug: Medium 8 — Shipping total of 0 is replaced with raw fees or $1.20
- **Root Cause:** In `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.tsx` (~lines 446–463), the client only trusts the server's `totalShippingCost` when `> 0` (treating a legitimate `0` free-shipping result as falsy/failed) and falls back to summing seller fees with a hardcoded `base > 0 ? base : 1.2` VIP fallback that charges `$1.20` whenever a seller's shipping fee is `0`, while `libs/server/services/src/lib/shipping-calculation.service.ts` (~lines 55–71) has inconsistent free-shipping handling.
- **What Goes Wrong:**
  1. When an order qualifies for free shipping (`totalShippingCost === 0`) or a seller has a `$0` shipping fee, `customer-shopping-cart.tsx` sees `0 > 0 === false`, ignores the server's `0`, and charges raw seller fees or `$1.20`!
  2. When the order is created, the order's stored `shippingCost` and the amount sent to ZarinPal diverge.
</context>

<task>
Execute the following steps in exact sequential order:

### Step 1: Read Target Files

1. Read `libs/server/services/src/lib/shipping-calculation.service.ts` (~lines 1–100) and `libs/server/services/src/lib/shipping-calculation.service.spec.ts` (if it exists).
2. Read `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.tsx` (~lines 430–500 and ~800–920) and `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.spec.tsx`.

### Step 2: Fix Free-Shipping & Zero-Fee Calculation in `shipping-calculation.service.ts`

1. In `libs/server/services/src/lib/shipping-calculation.service.ts`:
   - Inspect the free-shipping branch (~lines 55–71) and per-seller shipping fee calculation.
   - Ensure that:
     - If a seller's configured shipping fee is `0` (or `null`/`undefined` defaulting to `0`), the base fee is `0` and the applied fee is `0` (never replaced with `1.2` or any non-zero magic number).
     - If the cart/order qualifies for free shipping (e.g. `isFreeShipping` or threshold met), every seller breakdown item has `appliedShippingFee = 0` (or equivalent property name in the file) and `totalShippingCost = 0`.
     - Ensure all returned shipping numbers are coerced via `Number(...)` and rounded to 2 decimal places (`Math.round(val * 100) / 100`).

### Step 3: Fix `$0` Shipping & Remove `$1.20` Fallback in `customer-shopping-cart.tsx`

1. In `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.tsx` (~lines 446–463):
   - Locate where `shippingData?.calculateShipping?.totalShippingCost` is checked.
   - Replace `> 0` with an explicit finite non-negative check:
     ```typescript
     const serverTotalShipping = shippingData?.calculateShipping?.totalShippingCost;
     const hasValidServerShipping = typeof serverTotalShipping === 'number' && Number.isFinite(serverTotalShipping) && serverTotalShipping >= 0;
     ```
   - When `hasValidServerShipping` is `true` (including when `serverTotalShipping === 0`!), use `serverTotalShipping` (`0`) directly! Do NOT fall back to local seller fee summation when the server explicitly returned `0`.
   - In the local fallback calculation (used only when the GraphQL query is still loading or failed with a network error):
     - Remove the `base > 0 ? base : 1.2` magic number! If `base === 0`, the shipping cost for that seller is `0` (so `0 * discountMultiplier` is `0`, never `1.2`).
   - Also check `handleCreateOrderAndInitiatePayment` (~lines 804–933) in `customer-shopping-cart.tsx`:
     - Verify that per-seller `shippingCost` on each `createOrder` payload uses `>= 0` (not `> 0` fallback) so `0` free shipping is passed as `0` consistently, and also block Farsi ZarinPal checkout if `rate` from `useExchangeRate` is `<= 1` or falsy (`!rate || rate <= 1`).

### Step 4: Write Comprehensive Unit Tests (100% Coverage)

1. In `libs/server/services/src/lib/shipping-calculation.service.spec.ts` (create or update):
   - Test free-shipping threshold reached -> returns `totalShippingCost: 0` and per-seller applied fee `0`.
   - Test seller with `shippingFee: 0` -> returns `0` for both regular and VIP customers (never `1.2`).
   - Test seller with `shippingFee: 10` -> returns `10` for regular and expected discounted fee for VIP.
2. In `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.spec.tsx`:
   - Test when `calculateShipping` query returns `{ totalShippingCost: 0, isFreeShipping: true }`: assert the UI displays free/`$0` shipping and total equals subtotal (no `$1.20` or raw seller fee added).
   - Test fallback when seller has `shippingFee = 0` for a VIP customer: assert shipping is `$0`, never `$1.20`.

### Step 5: Run Nx Verification Commands

```bash
nx test server-services --coverage
nx lint server-services
nx typecheck server-services

nx test client-customers-screens-customer-shopping-cart --coverage
nx lint client-customers-screens-customer-shopping-cart
nx typecheck client-customers-screens-customer-shopping-cart
```

</task>

<constraints>
- **DO NOT** modify any file outside `<file_ownership_boundary>`.
- **DO NOT** treat `0` as falsy/invalid for `totalShippingCost` or seller `shippingCost`.
- **DO NOT** leave `1.2` (`$1.20`) fallback anywhere in `customer-shopping-cart.tsx` or `shipping-calculation.service.ts`.
</constraints>

<output_format>

1. `<thinking>`:
   - Quote the exact lines in `customer-shopping-cart.tsx` and `shipping-calculation.service.ts` causing the `$0` -> `$1.20` / raw fee bug.
   - Confirm no forbidden files are touched.
2. `### Root Cause`: One-sentence summary.
3. `### Surgical Changes`: File-by-file diff summary.
4. `### Verification Results`: Output of `nx test`, `nx lint`, and `nx typecheck`.
   </output_format>

<example>
<thinking>
1. Read `customer-shopping-cart.tsx` lines 446-463.
2. Found `shippingData?.calculateShipping?.totalShippingCost > 0` which rejects `0` and falls back to `base > 0 ? base : 1.2`.
3. Changing the condition to `typeof serverTotalShipping === 'number' && serverTotalShipping >= 0` and removing `: 1.2` fixes both free shipping and zero-fee sellers.
</thinking>
### Root Cause
`customer-shopping-cart.tsx` checked `totalShippingCost > 0` instead of `>= 0` and applied `base > 0 ? base : 1.2`, overriding legitimate `$0` shipping with raw fees or `$1.20`.
### Surgical Changes
- `libs/server/services/src/lib/shipping-calculation.service.ts`: Ensured `$0` fees and free shipping return `0` across all branches.
- `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.tsx`: Used `>= 0` check for server shipping and removed the `1.2` fallback.
### Verification Results
- `nx test server-services --coverage`: PASS
- `nx test client-customers-screens-customer-shopping-cart --coverage`: PASS
</example>
