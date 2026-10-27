<system_role>
You are a deterministic Senior FinTech & Full-Stack TypeScript Engineer working inside the Kickzone Nx monorepo (`mkhib/kickzone`). You follow instructions literally, read every target file before editing, strictly obey `<file_ownership_boundary>` to prevent Git merge conflicts with parallel sessions, and write unit tests with 100% coverage.
</system_role>

<file_ownership_boundary>

### ALLOWED FILES TO READ AND MODIFY IN THIS SESSION:

- `libs/server/resolvers/src/lib/payment.resolver.ts`
- `libs/server/resolvers/src/lib/payment.resolver.spec.ts`
- `libs/client/shared/hooks/currency/src/lib/useExchangeRate.tsx`
- `libs/client/shared/hooks/currency/src/lib/useExchangeRate.spec.tsx`

### READ-ONLY CONTEXT FILES (DO NOT MODIFY):

- `libs/server/services/src/lib/currency.service.ts`
- `libs/server/services/src/lib/order.service.ts`

### STRICTLY FORBIDDEN FILES (BEING EDITED BY PARALLEL SESSIONS — DO NOT TOUCH):

- `libs/server/services/src/lib/order.service.ts`
- `libs/server/resolvers/src/lib/order.resolver.ts`
- `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.tsx`
- All other files in the repository.
  </file_ownership_boundary>

<context>
### Confirmed Bug: Critical 1 — Payment amount is whatever the client sends; missing FX rate becomes 1
- **Root Cause:** `PaymentResolver.requestZarinPalPayment` (`libs/server/resolvers/src/lib/payment.resolver.ts`) stores and charges `input.amount` directly from the client without computing or comparing it against `order.total * exchangeRate`, while `useExchangeRate` (`libs/client/shared/hooks/currency/src/lib/useExchangeRate.tsx`) uses `rate: data?.currentExchangeRate?.rate || 1`, causing unseeded/missing exchange rates to default to `1`.
- **What Goes Wrong:**
  1. When no USD->IRR/IRT exchange rate is set in the database, `useExchangeRate` falls back to `1`, so an `$80` order requests `80` Tomans from ZarinPal, verifies `80` Tomans, marks the order `CONFIRMED`, and decrements stock!
  2. Any caller can send `amount: 1000` (1,000 Tomans) to `requestZarinPalPayment` for a `$2,000` order, pay 1,000 Tomans, and get the order confirmed.
</context>

<task>
Execute the following steps in exact sequential order:

### Step 1: Read Target and Context Files

1. Read `libs/server/resolvers/src/lib/payment.resolver.ts` and `libs/server/services/src/lib/currency.service.ts` (read-only).
2. Read `libs/client/shared/hooks/currency/src/lib/useExchangeRate.tsx` and search (read-only) how `useExchangeRate` is called across `libs/client/` so you preserve its TypeScript return type compatibility.

### Step 2: Enforce Server-Calculated Payment Amount & Exchange Rate in `payment.resolver.ts`

1. In `libs/server/resolvers/src/lib/payment.resolver.ts`:
   - Inject `CurrencyService` into `PaymentResolver` constructor (check how `CurrencyService` is exported from `@kickzone/server-services` or `./currency.service` and how `OrderService` is injected in `PaymentResolver`).
   - Inside `requestZarinPalPayment`:
     1. Fetch the order via `const order = await this.orderService.findOne(input.orderId);`. If `!order`, throw `new BadRequestException('Order not found')` (or return `{ success: false, message: 'Order not found' }` matching the resolver's error pattern—check whether `requestZarinPalPayment` throws or returns a response object, and handle both cleanly!).
     2. Verify `order.status === OrderStatus.PENDING`. If `order.status !== OrderStatus.PENDING`, reject immediately (`Order is not in PENDING status`).
     3. Parse `const orderTotalUsd = Number(order.total);`. Verify `Number.isFinite(orderTotalUsd) && orderTotalUsd > 0`.
     4. Fetch the current exchange rate from `CurrencyService` (inspect `currency.service.ts` to use the exact method name, e.g., `getCurrentExchangeRate('USD', 'IRR')` or `getCurrentExchangeRate()`).
     5. Extract the numeric rate: `const fxRate = Number(rateRecord?.rate ?? rateRecord);`.
     6. **Fail-Closed FX Guard:** If `!Number.isFinite(fxRate) || fxRate <= 1`, reject immediately with a clear error (`'Exchange rate is not configured or invalid. Cannot process ZarinPal payment.'`). Never default to `1`!
     7. Compute the server-authoritative amount in Tomans:
        `const expectedAmount = Math.round(orderTotalUsd * fxRate);`
     8. **Client Tampering Check:** If `input.amount != null`:
        - Allow at most a small rounding tolerance (e.g., `Math.abs(Number(input.amount) - expectedAmount) > Math.max(10, Math.round(expectedAmount * 0.001))` or `> 1` Toman—check if client rounds per-item or on total). If `input.amount` deviates beyond rounding tolerance (for example, client sent `80` when `expectedAmount` is `4800000`, or client sent `1000` for a huge order), reject immediately with `'Payment amount does not match order total'`.
     9. Always pass `expectedAmount` (the server-computed amount, NEVER raw `input.amount`) to the ZarinPal request API and to `this.orderService.updatePaymentAuthority(order.id, authority, expectedAmount)`.

### Step 3: Remove the Dangerous `|| 1` Fallback in `useExchangeRate.tsx`

1. Inspect `libs/client/shared/hooks/currency/src/lib/useExchangeRate.tsx`.
2. Currently, it does:
   `rate: data?.currentExchangeRate?.rate || 1`
3. Fix `useExchangeRate.tsx`:
   - Parse `const rawRate = Number(data?.currentExchangeRate?.rate);`
   - Determine validity: `const isValidRate = Number.isFinite(rawRate) && rawRate > 1;`
   - Set `rate: isValidRate ? rawRate : null` (or if TypeScript callers require `rate: number`, check all callers first: if callers do arithmetic like `price * rate`, check whether `rate: isValidRate ? rawRate : 0` + `hasValidRate: isValidRate` or `error` prevents charging `1` Toman! Specifically: if `rate` is `0` when missing, `Math.round(total * 0)` is `0`, which immediately fails `amount > 0` validation on both client and server instead of charging `80 Tomans`!).
   - Let's provide BOTH safety layers in `useExchangeRate.tsx`:
     - Remove `|| 1`! Use `const validRate = Number.isFinite(rawRate) && rawRate > 1 ? rawRate : 0;` (or `null` if typed as `number | null`, while ensuring all existing callers compile without TS errors).
     - Add `hasValidRate: Boolean(Number.isFinite(rawRate) && rawRate > 1)` to the returned object.
     - In `convertCurrency` / `formatPrice` helpers inside `useExchangeRate.tsx` (if any), if `!isValidRate`, do not multiply by `1` as if `1 USD === 1 Toman`.

### Step 4: Write Comprehensive Unit Tests (100% Coverage)

1. Create or update `libs/server/resolvers/src/lib/payment.resolver.spec.ts`:
   - **Tampered Amount Test:** Order has `total = 80` USD, `CurrencyService` returns rate `60000` (`expectedAmount = 4800000`). Client sends `amount = 80` or `amount = 1000`. Assert `requestZarinPalPayment` rejects and does NOT call ZarinPal or save `paymentAuthority`.
   - **Missing / Unseeded Exchange Rate (`null` or `1` or `0`) Test:** `CurrencyService` returns `null` or `{ rate: 1 }` or `{ rate: 0 }`. Assert `requestZarinPalPayment` rejects (fail-closed).
   - **Non-Pending Order Test:** Order status is `CONFIRMED` or `CANCELLED`. Assert `requestZarinPalPayment` rejects.
   - **Valid Server-Computed Amount Test:** Order has `total = 80`, rate is `60000`, client sends `4800000`. Assert ZarinPal is requested with `4800000` and `updatePaymentAuthority` saves `4800000`.
2. Create or update `libs/client/shared/hooks/currency/src/lib/useExchangeRate.spec.tsx`:
   - **Missing Exchange Rate Test:** Query returns `currentExchangeRate: null`. Assert `rate` is NOT `1` (`rate === 0` or `null`) and `hasValidRate === false`.
   - **Rate Equal to 1 Test:** Query returns `rate: 1`. Assert `hasValidRate === false`.
   - **Valid Exchange Rate Test:** Query returns `rate: 65000`. Assert `rate === 65000` and `hasValidRate === true`.

### Step 5: Run Nx Verification Commands

```bash
nx test server-resolvers --coverage
nx lint server-resolvers
nx typecheck server-resolvers

nx test client-shared-hooks-currency --coverage
nx lint client-shared-hooks-currency
nx typecheck client-shared-hooks-currency
```

</task>

<constraints>
- **DO NOT** modify any file outside `<file_ownership_boundary>`. Specifically, do NOT touch `customer-shopping-cart.tsx` or `order.service.ts` in this session.
- **DO NOT** add `GraphqlAuthGuard` to `requestZarinPalPayment` or `verifyZarinPalPayment` (guest checkout must work).
- **DO NOT** allow `rate || 1` anywhere in `useExchangeRate.tsx` or `payment.resolver.ts`.
</constraints>

<output_format>

1. `<thinking>`:
   - Detail how `PaymentResolver` injects `CurrencyService` and validates `expectedAmount`.
   - Confirm only allowed files in `<file_ownership_boundary>` are touched.
2. `### Root Cause`: One-sentence summary.
3. `### Surgical Changes`: Exact changes in `payment.resolver.ts`, `payment.resolver.spec.ts`, `useExchangeRate.tsx`, and `useExchangeRate.spec.tsx`.
4. `### Verification Results`: Output of `nx test`, `nx lint`, and `nx typecheck`.
   </output_format>

<example>
<thinking>
1. Read `payment.resolver.ts` and `useExchangeRate.tsx`.
2. `requestZarinPalPayment` accepted `input.amount` without checking `order.total` or `CurrencyService`.
3. `useExchangeRate.tsx` returned `rate: data?.currentExchangeRate?.rate || 1`.
4. Injecting `CurrencyService` in `PaymentResolver` to compute `expectedAmount = Math.round(Number(order.total) * fxRate)` and replacing `|| 1` with `0` + `hasValidRate: false` in `useExchangeRate.tsx` eliminates both vulnerabilities.
</thinking>
### Root Cause
`requestZarinPalPayment` trusted client-sent `input.amount` without comparing against `order.total * exchangeRate`, while `useExchangeRate` defaulted missing exchange rates to `1`.
### Surgical Changes
- `libs/server/resolvers/src/lib/payment.resolver.ts`: Computed authoritative Toman amount from `order.total` and `CurrencyService` rate, rejecting missing rates or tampered client amounts.
- `libs/client/shared/hooks/currency/src/lib/useExchangeRate.tsx`: Removed `|| 1` fallback and added `hasValidRate`.
### Verification Results
- `nx test server-resolvers --coverage`: PASS
- `nx test client-shared-hooks-currency --coverage`: PASS
</example>
