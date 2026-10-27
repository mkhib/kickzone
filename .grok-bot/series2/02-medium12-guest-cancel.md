<system_role>
You are a deterministic Senior NestJS GraphQL & React Engineer working inside the Kickzone Nx monorepo (`mkhib/kickzone`). You follow instructions literally, read every target file before editing, strictly obey `<file_ownership_boundary>` so you never cause Git merge conflicts with parallel Session 2A, and write unit tests with 100% coverage.
</system_role>

<file_ownership_boundary>

### ALLOWED FILES TO READ AND MODIFY IN THIS SESSION:

- `libs/server/resolvers/src/lib/payment.resolver.ts`
- `libs/server/resolvers/src/lib/payment.resolver.spec.ts`
- `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.tsx`
- `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.spec.tsx`
- `libs/client/customers/screens/customer-payment/src/lib/use-zarinpal-payment.tsx`
- `libs/client/customers/screens/customer-payment/src/lib/zarinpal-payment-service.ts`
- `libs/client/customers/graphql/src/lib/mutations.ts`

### READ-ONLY CONTEXT FILES (DO NOT MODIFY):

- `libs/server/services/src/lib/order.service.ts`

### STRICTLY FORBIDDEN FILES (BEING EDITED BY PARALLEL SESSION 2A — DO NOT TOUCH):

- `libs/server/entities/src/lib/order.entity.ts`
- `libs/server/services/src/lib/order.service.ts`
- `libs/server/services/src/lib/order.service.spec.ts`
- `libs/client/sellers/screens/seller-orders/src/lib/seller-orders-screen.tsx`
- All other files in the repository.
  </file_ownership_boundary>

<context>
### Confirmed Bug: Medium 12 — Guest ZarinPal cancel leaves order PENDING
- **Root Cause:** Guests (unauthenticated users) can create orders and initiate ZarinPal payments, but `PaymentResolver.cancelPendingZarinPalOrder` (`libs/server/resolvers/src/lib/payment.resolver.ts`) has `@UseGuards(GraphqlAuthGuard)`. When a guest cancels payment on ZarinPal and returns with `Status=NOK&Authority=A000...`, `customer-payment-callback.tsx` (~lines 109–118) calls `cancelPendingZarinPalOrder`, receives an `Unauthorized` error, swallows it, and leaves the order stuck in `PENDING`.
- **How to Fix Without Touching `order.service.ts`:**
  - `OrderService` already has `findOrderByPaymentAuthority(authority)` (and `findOrdersByPaymentAuthority(authority)` added in Wave 1A), `findOne(orderId)`, and `cancelPendingOrder(orderId)`.
  - In `payment.resolver.ts`, remove `@UseGuards(GraphqlAuthGuard)` from `cancelPendingZarinPalOrder` and authenticate the cancellation by verifying that the caller passes the secret ZarinPal `authority` token matching `order.paymentAuthority` (or if `authority` is passed, find all `PENDING` orders bound to that `authority` and cancel them via `this.orderService.cancelPendingOrder(order.id)`).
</context>

<task>
Execute the following steps in exact sequential order:

### Step 1: Read Target Files

1. Read `libs/server/resolvers/src/lib/payment.resolver.ts` and `libs/server/resolvers/src/lib/payment.resolver.spec.ts`.
2. Read `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.tsx`, `libs/client/customers/screens/customer-payment/src/lib/use-zarinpal-payment.tsx`, `libs/client/customers/screens/customer-payment/src/lib/zarinpal-payment-service.ts`, and `libs/client/customers/graphql/src/lib/mutations.ts`.

### Step 2: Make `cancelPendingZarinPalOrder` Guest-Compatible & Authority-Verified in `payment.resolver.ts`

1. In `libs/server/resolvers/src/lib/payment.resolver.ts`:
   - Remove `@UseGuards(GraphqlAuthGuard)` from `cancelPendingZarinPalOrder`.
   - Accept:
     - `@Args('orderId', { type: () => String, nullable: true }) orderId?: string`
     - `@Args('authority', { type: () => String, nullable: true }) authority?: string`
       _(Keep `orderId` working for existing callers while allowing `authority` to be passed alongside or instead of `orderId`!)_
   - Authorization & Lookup Logic inside `cancelPendingZarinPalOrder`:
     1. Require at least a valid non-empty `authority` (or if only `orderId` is provided without `authority`, require that the order has a `paymentAuthority` or check context user ownership; specifically, to prevent unauthenticated attackers from guessing random `orderId` UUIDs without knowing the ZarinPal `authority`, require `authority` when unauthenticated and verify `order.paymentAuthority === authority`!).
     2. When `authority` is provided:
        - Look up orders matching `authority` via `this.orderService.findOrdersByPaymentAuthority ? await this.orderService.findOrdersByPaymentAuthority(authority) : [await this.orderService.findOrderByPaymentAuthority(authority)].filter(Boolean)`.
        - If `orderId` was also passed and not already in that list, fetch `await this.orderService.findOne(orderId)` and verify `order.paymentAuthority === authority`.
        - If no matching orders are found for `authority`, return `{ success: false, message: 'No matching order found for payment authority' }` (or throw `BadRequestException` depending on the mutation's return type—inspect the exact return type of `cancelPendingZarinPalOrder` in `payment.resolver.ts`!).
     3. For each matched order:
        - If `order.status === OrderStatus.CANCELLED`, treat as idempotent success.
        - If `order.status !== OrderStatus.PENDING`, reject (`Cannot cancel a non-pending order`).
        - If `order.status === OrderStatus.PENDING`, call `await this.orderService.cancelPendingOrder(order.id)`.

### Step 3: Pass `authority` in Client GraphQL Mutation, Service, Hook & Callback

1. In `libs/client/customers/graphql/src/lib/mutations.ts`:
   - Update `CANCEL_PENDING_ZARINPAL_ORDER_MUTATION` (check exact constant name) to accept `$orderId: String` (optional/nullable if updated on server, or pass `orderId`) and `$authority: String` and pass both to `cancelPendingZarinPalOrder(orderId: $orderId, authority: $authority)`.
2. In `libs/client/customers/screens/customer-payment/src/lib/zarinpal-payment-service.ts` and `use-zarinpal-payment.tsx`:
   - Update `cancelPendingOrder` / `cancelPayment` helper to accept `(orderId?: string | null, authority?: string | null)` and pass both variables to the mutation.
3. In `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.tsx` (~lines 100–130):
   - When `Status === 'NOK'` (or user cancelled payment):
     - Extract `authority` from the URL search params (`Authority` / `authority`) and `pendingOrderId` from `sessionStorage`/`localStorage`.
     - Call `cancelPendingOrder(pendingOrderId, authority)` as long as **either** `authority` or `pendingOrderId` is present (so even if `sessionStorage` was cleared or opened in a new browser tab, the `Authority` query parameter still cancels the pending order on the server!).
     - Only clear `pendingOrderId` from storage after cancellation completes, and log/surface any actual mutation failure instead of silently ignoring it.

### Step 4: Write Comprehensive Unit Tests (100% Coverage)

1. In `libs/server/resolvers/src/lib/payment.resolver.spec.ts`:
   - **Guest Cancel with Valid `authority` Test:** Unauthenticated guest calls `cancelPendingZarinPalOrder(orderId, 'A00000123')`. Order is `PENDING` and `order.paymentAuthority === 'A00000123'`. Assert `orderService.cancelPendingOrder` is called and mutation succeeds.
   - **Guest Cancel with `authority` Only (Lost `sessionStorage` `orderId`) Test:** Guest calls `cancelPendingZarinPalOrder(undefined, 'A00000123')`. Assert order is found by `authority` and cancelled.
   - **Unauthenticated Caller With Mismatched / Missing `authority` Test:** Caller passes `orderId` with wrong `authority: 'WRONG'` or no `authority`. Assert cancellation is rejected and `orderService.cancelPendingOrder` is NOT called.
   - **Already `CONFIRMED` Order Test:** Caller passes `authority` of a `CONFIRMED` order. Assert cancellation is rejected and `cancelPendingOrder` is NOT called.
   - **Idempotent Repeat `CANCELLED` Test:** Order is already `CANCELLED`. Assert repeat call succeeds idempotently.
2. In `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.spec.tsx`:
   - Test `Status=NOK&Authority=A00000123` for an unauthenticated guest session (both with and without `pendingOrderId` in `sessionStorage`). Assert `cancelPendingZarinPalOrder` is invoked with `authority: 'A00000123'`.

### Step 5: Run Nx Verification Commands

```bash
nx test server-resolvers --coverage
nx lint server-resolvers
nx typecheck server-resolvers

nx test client-customers-screens-customer-payment --coverage
nx lint client-customers-screens-customer-payment
nx typecheck client-customers-screens-customer-payment
```

</task>

<constraints>
- **DO NOT** modify `libs/server/services/src/lib/order.service.ts` or any file outside `<file_ownership_boundary>`.
- **DO NOT** require `GraphqlAuthGuard` on `cancelPendingZarinPalOrder`.
- **DO NOT** allow unauthenticated callers to cancel an order using only a guessed `orderId` without a matching `authority`.
</constraints>

<output_format>

1. `<thinking>`:
   - Trace the exact signature of `cancelPendingZarinPalOrder` in `payment.resolver.ts`, `mutations.ts`, and `customer-payment-callback.tsx`.
   - Confirm `order.service.ts` is NOT touched.
2. `### Root Cause`: One-sentence summary.
3. `### Surgical Changes`: File-by-file diff summary.
4. `### Verification Results`: Output of `nx test`, `nx lint`, and `nx typecheck`.
   </output_format>

<example>
<thinking>
1. Read `payment.resolver.ts` and `customer-payment-callback.tsx`.
2. `cancelPendingZarinPalOrder` had `@UseGuards(GraphqlAuthGuard)`, causing guest `Status=NOK` callbacks to fail with 401.
3. Removing `GraphqlAuthGuard`, verifying `order.paymentAuthority === authority`, and passing `authority` from URL params in `customer-payment-callback.tsx` fixes guest cancellation without touching `order.service.ts`.
</thinking>
### Root Cause
`cancelPendingZarinPalOrder` required `GraphqlAuthGuard`, causing unauthenticated guest `Status=NOK` callbacks to fail with 401 and leave orders stuck in `PENDING`.
### Surgical Changes
- `libs/server/resolvers/src/lib/payment.resolver.ts`: Removed `GraphqlAuthGuard` from `cancelPendingZarinPalOrder` and authenticated via matching `paymentAuthority`.
- `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.tsx` & GraphQL mutation/service: Passed `authority` to `cancelPendingZarinPalOrder`.
### Verification Results
- `nx test server-resolvers --coverage`: PASS
- `nx test client-customers-screens-customer-payment --coverage`: PASS
</example>
