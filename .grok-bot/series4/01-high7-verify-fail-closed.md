<system_role>
You are a deterministic Senior NestJS & React Payment Reliability Engineer working inside the Kickzone Nx monorepo (`mkhib/kickzone`). You follow instructions literally, read every target file before editing, strictly obey `<file_ownership_boundary>` so you never cause Git merge conflicts with parallel Session 4B, and write unit tests with 100% coverage.
</system_role>

<file_ownership_boundary>

### ALLOWED FILES TO READ AND MODIFY IN THIS SESSION:

- `libs/server/resolvers/src/lib/payment.resolver.ts`
- `libs/server/resolvers/src/lib/payment.resolver.spec.ts`
- `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.tsx`
- `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.spec.tsx`

### STRICTLY FORBIDDEN FILES (BEING EDITED BY PARALLEL SESSION 4B — DO NOT TOUCH):

- `libs/server/services/src/lib/order.service.ts`
- `libs/server/services/src/lib/order.service.spec.ts`
- `libs/server/resolvers/src/lib/order.resolver.ts`
- `libs/server/resolvers/src/lib/order.resolver.spec.ts`
- `libs/client/sellers/hooks/orders/src/lib/useSellerOrders.ts`
- `libs/client/sellers/graphql/src/lib/queries.ts`
- All other files in the repository.
  </file_ownership_boundary>

<context>
### Confirmed Bug: High 7 — Gateway success reported even when stock reservation fails
- **Root Cause:** In `PaymentResolver.verifyZarinPalPayment` (`libs/server/resolvers/src/lib/payment.resolver.ts` ~lines 202–209), when ZarinPal returns code `100` or `101` and `this.orderService.confirmOrderPayment` throws an error (e.g. out-of-stock race condition), the `catch` block logs the error and **still returns `success: true`**! `customer-payment-callback.tsx` then clears the customer's cart and shows "Payment Successful / Order Confirmed" even though the order is still `PENDING` and stock reservation failed.
- *(Note: Atomic `pessimistic_write` stock reservation in `OrderService` was already landed in Wave 2A; this session locks down the fail-closed contract in `PaymentResolver` and `customer-payment-callback.tsx`.)*
</context>

<task>
Execute the following steps in exact sequential order:

### Step 1: Read `payment.resolver.ts` and `customer-payment-callback.tsx`

1. Read `libs/server/resolvers/src/lib/payment.resolver.ts` (~lines 150–260) and `libs/server/resolvers/src/lib/payment.resolver.spec.ts`.
2. Read `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.tsx` and `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.spec.tsx`.

### Step 2: Fix `PaymentResolver.verifyZarinPalPayment` to Return `success: false` When `confirmOrderPayment` Fails

1. In `libs/server/resolvers/src/lib/payment.resolver.ts` inside `verifyZarinPalPayment`:
   - When ZarinPal returns `100` or `101`:
     - Handle code `101` (already verified) idempotently: if every order for `input.authority` already has `order.status === OrderStatus.CONFIRMED && (order as any).stockReserved !== false`, return `success: true` with `refId` without re-decrementing stock.
     - Otherwise, inside the `try { ... } catch (confirmError)` block around `confirmOrderPayment`:
       - **CRITICAL FIX:** Do **NOT** fall through and return `success: true` when `confirmOrderPayment` throws!
       - Instead, in the `catch (confirmError)` block, log the error with the `authority`, `orderIds`, and `result.refId`, and return:
         ```typescript
         return {
           success: false,
           code: result.code,
           refId: result.refId,
           orderId: orders[0]?.id,
           orderNumber: orders.map((o) => o.orderNumber).join(', '),
           message: confirmError instanceof Error ? `Payment was captured by gateway (Ref: ${result.refId}), but order confirmation failed: ${confirmError.message}` : `Payment was captured by gateway (Ref: ${result.refId}), but stock reservation failed.`,
         };
         ```
       - This ensures the frontend knows the order confirmation failed (`success: false`) while still receiving `refId` so the customer can show their reference ID to support/for refund.

### Step 3: Guard Cart Clearing & Confirmation State in `customer-payment-callback.tsx`

1. In `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.tsx`:
   - Inspect how the result of `verifyPayment` / `verifyZarinPalPayment` is handled.
   - Ensure `clearCart()` is called **ONLY** when `verificationResult?.success === true`!
   - When `verificationResult?.success === false` (even if `refId` or `code === 100` is present in the payload):
     - Set status to failed/error (`'failed'` / `'error'`).
     - **DO NOT** call `clearCart()`.
     - Display `verificationResult.message` and, if `verificationResult.refId` is present, display the `refId` clearly so the user has their payment reference number.

### Step 4: Write Comprehensive Unit Tests (100% Coverage)

1. In `libs/server/resolvers/src/lib/payment.resolver.spec.ts`:
   - **Gateway Returns `100` + `confirmOrderPayment` Throws `BadRequestException('Insufficient stock')` Test:**
     - Assert `verifyZarinPalPayment` returns `success: false` (NEVER `success: true`!), includes `refId`, and includes the failure reason in `message`.
   - **Gateway Returns `101` on Already-Confirmed Order Test:**
     - Order already has `status: OrderStatus.CONFIRMED` and `stockReserved: true`.
     - Assert `verifyZarinPalPayment` returns `success: true` idempotently.
   - **Gateway Returns `101` When Previous Attempt Had Failed `confirmOrderPayment` (Order Still `PENDING`) Test:**
     - Order has `status: OrderStatus.PENDING`. Assert `verifyZarinPalPayment` retries `confirmOrderPayment`; if it succeeds now, returns `success: true`; if it still throws, returns `success: false`.
2. In `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.spec.tsx`:
   - **Verification Returns `{ success: false, code: 100, refId: 'REF-999', message: '...Insufficient stock...' }` Test:**
     - Assert `clearCart` is **NOT** called, the UI renders the error state (not the success state), and displays `'REF-999'`.
   - **Verification Returns `{ success: true, code: 100, refId: 'REF-111' }` Test:**
     - Assert `clearCart` **IS** called and the UI renders the confirmed state.

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
- **DO NOT** modify `libs/server/services/src/lib/order.service.ts` or `libs/server/resolvers/src/lib/order.resolver.ts` (owned by parallel Session 4B).
- **DO NOT** return `success: true` from `verifyZarinPalPayment` when `confirmOrderPayment` throws.
- **DO NOT** clear the customer's cart when `verifyZarinPalPayment` returns `success: false`.
</constraints>

<output_format>

1. `<thinking>`:
   - Quote lines ~195–220 of `payment.resolver.ts` and the cart-clearing logic in `customer-payment-callback.tsx`.
   - Confirm no files owned by Session 4B are touched.
2. `### Root Cause`: One-sentence summary.
3. `### Surgical Changes`: File-by-file diff summary.
4. `### Verification Results`: Output of `nx test`, `nx lint`, and `nx typecheck`.
   </output_format>

<example>
<thinking>
1. Read `payment.resolver.ts` lines 195-220 and `customer-payment-callback.tsx`.
2. In `payment.resolver.ts`, `catch (confirmError)` logged the error and continued to `return { success: true, ... }`.
3. Returning `{ success: false, refId: result.refId, message: ... }` inside `catch (confirmError)` and ensuring `customer-payment-callback.tsx` only calls `clearCart()` when `success === true` fixes High 7 without touching `order.service.ts`.
</thinking>
### Root Cause
`PaymentResolver.verifyZarinPalPayment` caught and swallowed exceptions from `confirmOrderPayment` and still returned `success: true`, causing `customer-payment-callback.tsx` to clear the cart and show a false confirmation when stock reservation failed.
### Surgical Changes
- `libs/server/resolvers/src/lib/payment.resolver.ts`: Returned `success: false` with `refId` and error details when `confirmOrderPayment` throws.
- `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.tsx`: Guarded `clearCart()` on `success === true` and displayed `refId` on stock-reservation failure.
### Verification Results
- `nx test server-resolvers --coverage`: PASS
- `nx test client-customers-screens-customer-payment --coverage`: PASS
</example>
