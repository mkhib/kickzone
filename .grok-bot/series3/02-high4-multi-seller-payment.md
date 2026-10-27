<system_role>
You are a deterministic Senior Full-Stack Marketplace Engineer working inside the Kickzone Nx monorepo (`mkhib/kickzone`). You follow instructions literally, read every target file before editing, strictly obey `<file_ownership_boundary>` so you never cause Git merge conflicts with parallel Session 3A, and write unit tests with 100% coverage.
</system_role>

<file_ownership_boundary>

### ALLOWED FILES TO READ AND MODIFY IN THIS SESSION:

- `libs/server/resolvers/src/lib/payment.resolver.ts`
- `libs/server/resolvers/src/lib/payment.resolver.spec.ts`
- `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.tsx`
- `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.spec.tsx`
- `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.tsx`
- `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.spec.tsx`
- `libs/client/customers/screens/customer-payment/src/lib/use-zarinpal-payment.tsx`
- `libs/client/customers/screens/customer-payment/src/lib/zarinpal-payment-service.ts`
- `libs/client/customers/graphql/src/lib/mutations.ts`

### READ-ONLY CONTEXT FILES (DO NOT MODIFY):

- `libs/server/services/src/lib/order.service.ts`

### STRICTLY FORBIDDEN FILES (BEING EDITED BY PARALLEL SESSION 3A — DO NOT TOUCH):

- `libs/server/inputs/src/lib/order.inputs.ts`
- `libs/server/services/src/lib/order.service.ts`
- `libs/server/services/src/lib/order.service.spec.ts`
- All other files in the repository.
  </file_ownership_boundary>

<context>
### Confirmed Bug: High 4 — Multi-seller cart pays and confirms only the first order
- **Root Cause:** In `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.tsx` (`handleCreateOrderAndInitiatePayment`, ~lines 804–933), checkout groups cart items by `sellerId` and creates one `Order` per seller (`orderResults`), but then requests ZarinPal payment for the entire cart total using only `orderId: orderResults[0]`. Consequently, only the first seller's order receives `paymentAuthority`, gets confirmed on callback, and has its stock decremented, while all sibling seller orders remain orphaned in `PENDING` forever.
- **How `PaymentResolver` Handles All Sibling Orders Without Touching `order.service.ts`:**
  - `OrderService` already provides `findOne(id)`, `updatePaymentAuthority(orderId, authority, amount)`, `findOrdersByPaymentAuthority(authority)` (added in Wave 1A), `confirmOrderPayment(orderId, refId)`, and `cancelPendingOrder(orderId)`.
</context>

<task>
Execute the following steps in exact sequential order:

### Step 1: Read Target Files

1. Read `libs/server/resolvers/src/lib/payment.resolver.ts` and `libs/server/resolvers/src/lib/payment.resolver.spec.ts`.
2. Read `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.tsx` (~lines 800–940), `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.tsx`, `libs/client/customers/screens/customer-payment/src/lib/use-zarinpal-payment.tsx`, `libs/client/customers/screens/customer-payment/src/lib/zarinpal-payment-service.ts`, and `libs/client/customers/graphql/src/lib/mutations.ts`.

### Step 2: Upgrade `PaymentResolver` to Support Multi-Seller `orderIds` Batching

1. In `libs/server/resolvers/src/lib/payment.resolver.ts`:
   - On the ZarinPal payment request input type (e.g. `ZarinPalPaymentRequestInput` or `@Args`):
     - Add `@Field(() => [String], { nullable: true }) orderIds?: string[];` while keeping `@Field(() => String, { nullable: true }) orderId?: string;` for backward compatibility.
   - Inside `requestZarinPalPayment`:
     1. Normalize the list of order IDs:
        ```typescript
        const targetOrderIds = Array.from(new Set([...(input.orderIds ?? []), ...(input.orderId ? [input.orderId] : [])].filter((id): id is string => typeof id === 'string' && id.trim().length > 0)));
        ```
        If `targetOrderIds.length === 0`, reject (`'At least one orderId is required'`).
     2. Load all orders in `targetOrderIds` via `await Promise.all(targetOrderIds.map((id) => this.orderService.findOne(id)))`.
     3. Verify:
        - Every order exists and has `order.status === OrderStatus.PENDING`.
        - All orders belong to the same checkout customer/guest (`String(order.customerId ?? '') === String(orders[0].customerId ?? '')` and `String(order.customerEmail ?? '').toLowerCase() === String(orders[0].customerEmail ?? '').toLowerCase()`). If a caller tries to batch another customer's order ID, reject immediately!
     4. Sum the USD totals across all orders in the batch:
        `const batchTotalUsd = orders.reduce((sum, o) => sum + Number(o.total), 0);`
     5. Multiply by the server exchange rate from `CurrencyService` (`const expectedBatchAmount = Math.round(batchTotalUsd * fxRate)`), and verify `input.amount` matches `expectedBatchAmount` within rounding tolerance (`<= Math.max(10, targetOrderIds.length * 2)` Tomans).
     6. Request a single ZarinPal payment for `expectedBatchAmount`.
     7. Save the returned `authority` and `expectedBatchAmount` onto **EVERY** order in `orders`:
        ```typescript
        for (const order of orders) {
          await this.orderService.updatePaymentAuthority(order.id, result.authority, expectedBatchAmount);
        }
        ```
   - Inside `verifyZarinPalPayment`:
     1. Look up **all** orders bound to `input.authority` using:
        ```typescript
        const orders = this.orderService.findOrdersByPaymentAuthority ? await this.orderService.findOrdersByPaymentAuthority(input.authority) : [await this.orderService.findOrderByPaymentAuthority(input.authority)].filter((o): o is NonNullable<typeof o> => Boolean(o));
        ```
     2. Verify `orders.length > 0`.
     3. Pre-verify before confirming that every `PENDING` order in `orders` has sufficient stock on all its `items[i].sellerProduct` rows so one sibling order cannot confirm if another sibling order in the same batch is out of stock!
     4. When ZarinPal returns code `100` or `101`:
        - Loop through **all** `orders` in deterministic order (`id ASC`):
          - If an order is still `PENDING`, call `await this.orderService.confirmOrderPayment(order.id, result.refId)`.
        - Include `orderIds: orders.map((o) => o.id)` (and `orderId: orders[0].id`, `orderNumber: orders.map((o) => o.orderNumber).join(', ')`) on the verification response.
     5. When ZarinPal verification fails (non-100/101):
        - Cancel **all** `PENDING` orders in `orders` via `this.orderService.cancelPendingOrder(order.id)`.
   - Inside `cancelPendingZarinPalOrder`:
     - Ensure that when `authority` (or `orderIds`) is provided, **all** `PENDING` sibling orders sharing that `authority` are cancelled.

### Step 3: Update Client Checkout & Payment Callback to Pass All `orderIds`

1. In `libs/client/customers/graphql/src/lib/mutations.ts`, `zarinpal-payment-service.ts`, and `use-zarinpal-payment.tsx`:
   - Add `orderIds?: string[]` to the `requestZarinPalPayment` mutation input/variables and service/hook types.
   - Store `pendingOrderIds: JSON.stringify(orderIds)` alongside `pendingOrderId: orderIds[0]` in `sessionStorage`/`localStorage`.
2. In `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.tsx` (`handleCreateOrderAndInitiatePayment`, ~lines 804–933):
   - Pass `orderIds: orderResults` (all created seller order IDs) as well as `orderId: orderResults[0]` when calling ZarinPal payment initiation!
   - If order creation or payment initiation fails midway after some orders in `orderResults` were already created, cancel those created `orderResults` so no orphan `PENDING` orders are left behind.
3. In `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.tsx`:
   - Clean up `pendingOrderIds` as well as `pendingOrderId` from storage when verification or cancellation completes.

### Step 4: Write Comprehensive Unit Tests (100% Coverage)

1. In `libs/server/resolvers/src/lib/payment.resolver.spec.ts`:
   - **Multi-Seller Batch `requestZarinPalPayment` Test:** Pass `orderIds: ['order-1', 'order-2']` (`total: 40` and `total: 60`, rate `= 60000`). Assert ZarinPal is requested once for `6000000` and `updatePaymentAuthority` is called for **both** `'order-1'` and `'order-2'` with the shared `authority`.
   - **Cross-Customer Batch Spoofing Rejection Test:** `'order-1'` belongs to `'cust-A'` and `'order-2'` belongs to `'cust-B'`. Assert `requestZarinPalPayment` rejects.
   - **Multi-Seller Batch `verifyZarinPalPayment` Confirms All Sibling Orders Test:** `findOrdersByPaymentAuthority` returns `['order-1', 'order-2']`. Assert `confirmOrderPayment` is called for **both** `'order-1'` and `'order-2'`.
   - **Multi-Seller Batch `verifyZarinPalPayment` Failed Gateway Cancels All Sibling Orders Test:** Gateway returns failure code `-51`. Assert `cancelPendingOrder` is called for **both** `'order-1'` and `'order-2'`.
2. In `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.spec.tsx`:
   - Test a cart with items from 2 different sellers (`seller-1` and `seller-2`) in `fa` locale: assert `createOrder` is called twice and `requestZarinPalPayment` receives `orderIds: ['order-1', 'order-2']` (both order IDs, not just the first).

### Step 5: Run Nx Verification Commands

```bash
nx test server-resolvers --coverage
nx lint server-resolvers
nx typecheck server-resolvers

nx test client-customers-screens-customer-shopping-cart --coverage
nx lint client-customers-screens-customer-shopping-cart
nx typecheck client-customers-screens-customer-shopping-cart

nx test client-customers-screens-customer-payment --coverage
nx lint client-customers-screens-customer-payment
nx typecheck client-customers-screens-customer-payment
```

</task>

<constraints>
- **DO NOT** modify `libs/server/services/src/lib/order.service.ts` or `libs/server/inputs/src/lib/order.inputs.ts` (owned by parallel Session 3A).
- **DO NOT** break single-order callers that pass `orderId: string`.
</constraints>

<output_format>

1. `<thinking>`:
   - Trace how `orderResults` are created in `customer-shopping-cart.tsx` and bound to `authority` in `payment.resolver.ts`.
   - Confirm no files owned by Session 3A are modified.
2. `### Root Cause`: One-sentence summary.
3. `### Surgical Changes`: File-by-file diff summary.
4. `### Verification Results`: Output of `nx test`, `nx lint`, and `nx typecheck`.
   </output_format>

<example>
<thinking>
1. Read `customer-shopping-cart.tsx` and `payment.resolver.ts`.
2. `customer-shopping-cart.tsx` passed only `orderResults[0]` to `requestZarinPalPayment`, leaving `orderResults[1..n]` without a `paymentAuthority`.
3. Updated `payment.resolver.ts` to accept `orderIds: string[]`, bind the shared `authority` to all sibling orders, and confirm/cancel all sibling orders matching `authority` on callback.
</thinking>
### Root Cause
Multi-seller checkout created one `Order` per seller but only sent `orderResults[0]` to `requestZarinPalPayment`, leaving sibling orders unbound to the ZarinPal authority and stuck in `PENDING`.
### Surgical Changes
- `libs/server/resolvers/src/lib/payment.resolver.ts`: Added `orderIds` batch authority binding, batch verification, and batch cancellation.
- `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.tsx` & payment files: Passed all `orderIds` from `orderResults` to ZarinPal payment initiation.
### Verification Results
- `nx test server-resolvers --coverage`: PASS
- `nx test client-customers-screens-customer-shopping-cart --coverage`: PASS
</example>
