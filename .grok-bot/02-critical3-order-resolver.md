<system_role>
You are a deterministic Senior Application Security & NestJS GraphQL Engineer working inside the Kickzone Nx monorepo (`mkhib/kickzone`). You follow instructions literally, read every target file before editing, strictly obey `<file_ownership_boundary>` so you never cause Git merge conflicts with parallel sessions, and write unit tests with 100% coverage.
</system_role>

<file_ownership_boundary>

### ALLOWED FILES TO READ AND MODIFY IN THIS SESSION:

- `libs/server/resolvers/src/lib/order.resolver.ts`
- `libs/server/resolvers/src/lib/order.resolver.spec.ts`

### READ-ONLY CONTEXT FILES (DO NOT MODIFY):

- `libs/server/services/src/lib/order.service.ts`
- `libs/server/entities/src/lib/order.entity.ts`

### STRICTLY FORBIDDEN FILES (BEING EDITED BY PARALLEL SESSIONS — DO NOT TOUCH):

- `libs/server/services/src/lib/order.service.ts`
- `libs/server/resolvers/src/lib/payment.resolver.ts`
- All other files in the repository.
  </file_ownership_boundary>

<context>
### Confirmed Bug: Critical 3 — Any logged-in user can read or rewrite every order
- **Root Cause:** `OrderResolver` (`libs/server/resolvers/src/lib/order.resolver.ts`) uses `@UseGuards(GraphqlAuthGuard)` on `orders`, `order`, `adminSellerOrders`, `allSellerOrders`, `updateOrder`, `updateOrderStatus`, `deleteOrder`, and `cancelPendingOrder` without checking the authenticated user's role (`ADMIN`, `SELLER`, `CUSTOMER`) or resource ownership (`order.customerId` / `order.sellerId`).
- **What Goes Wrong:**
  1. Any logged-in customer or seller can call `orders`, `adminSellerOrders`, or `allSellerOrders` and read all orders across the entire marketplace.
  2. In `order(id)`, a customer can read any other customer's order (including shipping address, phone, email). Even worse, when a seller queries another seller's order, `toSellerOrder` only runs when `order.sellerId === user.id`, falling through and returning the full unredacted `Order` (with customer PII) for other sellers' orders!
  3. Any logged-in user can call `updateOrder` to overwrite `items` or totals on an existing order, or call `updateOrderStatus` to flip their own order to `CONFIRMED` or `REFUNDED`.
  4. Any logged-in user can call `deleteOrder(id)`. Furthermore, when an Admin deletes a `CONFIRMED` order, `deleteOrder` did not cancel/release stock first.
  5. `cancelPendingOrder` does not verify that the caller owns the order or that the order is currently `PENDING`.
</context>

<task>
Execute the following steps in exact sequential order:

### Step 1: Inspect `order.resolver.ts`, `order.resolver.spec.ts`, and User Context Shape

1. Read `libs/server/resolvers/src/lib/order.resolver.ts` and `libs/server/resolvers/src/lib/order.resolver.spec.ts`.
2. Read `libs/server/services/src/lib/order.service.ts` (read-only) to see the exact methods available on `this.orderService` (e.g., `findOne`, `toSellerOrder`, `updateOrderStatus`, `cancelPendingOrder`, `deleteOrder`, `updateOrder`).
3. Check how `@CurrentUser()` / `context.req.user` identifies roles in `order.resolver.ts` and sibling resolvers in `libs/server/resolvers/src/lib/` (e.g. `user.role`, `user.userType`, `user.isAdmin`, `user.id`, `user.sub`). Support the exact conventions used across the codebase (e.g. normalizing `const role = String(user?.role || user?.userType || '').toUpperCase()` and `const userId = String(user?.id || user?.sub || '')`).

### Step 2: Implement Strict Role & Ownership Guards Inside `OrderResolver`

Modify **only** `libs/server/resolvers/src/lib/order.resolver.ts` to enforce these exact rules:

1. **Helper Methods on `OrderResolver` (Private):**
   - `private getUserId(user: any): string`: returns `String(user?.id ?? user?.sub ?? '')`.
   - `private getUserRole(user: any): 'ADMIN' | 'SELLER' | 'CUSTOMER' | 'UNKNOWN'`: normalizes `user?.role ?? user?.userType` case-insensitively (`'admin' -> 'ADMIN'`, `'seller' -> 'SELLER'`, `'customer' -> 'CUSTOMER'`).
   - `private assertAdmin(user: any): void`: if `this.getUserRole(user) !== 'ADMIN'`, throw `new ForbiddenException('Admin access required')`.
2. **`orders`, `adminSellerOrders`, `allSellerOrders` Queries:**
   - Add `@CurrentUser() user: any` parameter (if not already present) and call `this.assertAdmin(user)` as the very first line.
3. **`order(id)` Query:**
   - Fetch the order via `const order = await this.orderService.findOne(id);` (if not found, throw `NotFoundException` or let service throw).
   - Check role:
     - If `'ADMIN'`: return `order`.
     - If `'SELLER'`: check `String(order.sellerId) === this.getUserId(user)`. If NOT equal, **throw `new ForbiddenException('You do not have permission to view this order')`** (NEVER fall through and return raw `order`!). When equal, return `this.orderService.toSellerOrder(order)`.
     - If `'CUSTOMER'`: check `order.customerId != null && String(order.customerId) === this.getUserId(user)`. If NOT equal, **throw `new ForbiddenException('You do not have permission to view this order')`**. When equal, return `order`.
     - Otherwise: throw `new ForbiddenException('Access denied')`.
4. **`updateOrderStatus` Mutation:**
   - Fetch the order first via `const order = await this.orderService.findOne(id)`.
   - Role check:
     - If `'ADMIN'`: allowed.
     - If `'SELLER'`: allowed **only if** `String(order.sellerId) === this.getUserId(user)`; otherwise throw `new ForbiddenException('You can only update status for your own seller orders')`.
     - If `'CUSTOMER'` or `'UNKNOWN'`: throw `new ForbiddenException('Customers are not allowed to update order status')`.
   - Call `const updated = await this.orderService.updateOrderStatus(id, status)`.
   - If caller is `'SELLER'`, return `this.orderService.toSellerOrder(updated)`.
5. **`cancelPendingOrder` Mutation:**
   - Fetch the order first via `const order = await this.orderService.findOne(orderId)`.
   - Ownership check:
     - Allowed if `'ADMIN'`, OR (`'CUSTOMER'` && `order.customerId != null && String(order.customerId) === this.getUserId(user)`), OR (`'SELLER'` && `String(order.sellerId) === this.getUserId(user)`).
     - Otherwise throw `new ForbiddenException('You do not have permission to cancel this order')`.
   - Status check:
     - Verify `order.status === OrderStatus.PENDING`. If `order.status !== OrderStatus.PENDING`, throw `new BadRequestException('Only pending orders can be cancelled')`.
   - Call `return this.orderService.cancelPendingOrder(orderId)`.
6. **`updateOrder` Mutation:**
   - Require `this.assertAdmin(user)` (only admins may call generic `updateOrder`).
   - Fetch the order first. Forbid modifying `items`, `subtotal`, `total`, `shippingCost`, `sellerId`, or `customerId` via `updateOrder` (if `(input as any).items` is present or `order.status !== OrderStatus.PENDING`, throw `new BadRequestException('Order items and financial totals cannot be rewritten after order creation')`).
7. **`deleteOrder` Mutation:**
   - Require `this.assertAdmin(user)`.
   - Fetch the order first via `const order = await this.orderService.findOne(id)`.
   - If the order had stock reserved / is in an active paid status (`order.status === OrderStatus.CONFIRMED || order.status === OrderStatus.PROCESSING || order.status === OrderStatus.SHIPPED || (order as any).stockReserved === true`), call `await this.orderService.updateOrderStatus(id, OrderStatus.CANCELLED)` before calling `await this.orderService.deleteOrder(id)` so reserved stock is restored before the row is deleted!

### Step 3: Write Exhaustive Unit Tests in `order.resolver.spec.ts` (100% Coverage)

Update `libs/server/resolvers/src/lib/order.resolver.spec.ts` to test every single endpoint and role combination:

1. `orders`, `adminSellerOrders`, `allSellerOrders`:
   - Rejects `CUSTOMER` and `SELLER` with `ForbiddenException`.
   - Allows `ADMIN`.
2. `order(id)`:
   - `CUSTOMER` can read own order (`customerId === user.id`), throws `ForbiddenException` on another customer's order or guest order (`customerId === null`).
   - `SELLER` can read own order (`sellerId === user.id`) and receives redacted `toSellerOrder(order)` output; throws `ForbiddenException` on another seller's order (verifying PII leak is closed).
   - `ADMIN` can read any order.
3. `updateOrderStatus`:
   - `CUSTOMER` throws `ForbiddenException`.
   - `SELLER` on another seller's order throws `ForbiddenException`.
   - `SELLER` on own order succeeds and returns `toSellerOrder`.
   - `ADMIN` on any order succeeds.
4. `cancelPendingOrder`:
   - `CUSTOMER` on another customer's order throws `ForbiddenException`.
   - `CUSTOMER` on own `CONFIRMED` order throws `BadRequestException('Only pending orders can be cancelled')`.
   - `CUSTOMER` on own `PENDING` order succeeds.
5. `updateOrder`:
   - Non-admin throws `ForbiddenException`.
   - Admin attempting to pass `items` or update a `CONFIRMED` order throws `BadRequestException`.
6. `deleteOrder`:
   - Non-admin throws `ForbiddenException`.
   - Admin deleting a `CONFIRMED` order calls `updateOrderStatus(id, OrderStatus.CANCELLED)` first to restore stock, then `deleteOrder(id)`.
   - Admin deleting a `PENDING` or `CANCELLED` order calls `deleteOrder(id)` directly.

### Step 4: Run Nx Verification Commands

```bash
nx test server-resolvers --coverage
nx lint server-resolvers
nx typecheck server-resolvers
```

</task>

<constraints>
- **DO NOT** modify `libs/server/services/src/lib/order.service.ts` or any file outside `<file_ownership_boundary>`.
- **DO NOT** add `GraphqlAuthGuard` to `createOrder` (guest checkout must remain unguarded).
- **DO NOT** allow `order(id)` to return an unredacted `Order` to a seller under any circumstance.
</constraints>

<output_format>

1. `<thinking>`:
   - List every query/mutation in `order.resolver.ts` and the exact role/ownership check added.
   - Confirm only `order.resolver.ts` and `order.resolver.spec.ts` are modified.
2. `### Root Cause`: One-sentence summary.
3. `### Surgical Changes`: Summary of changes in `order.resolver.ts` and `order.resolver.spec.ts`.
4. `### Verification Results`: Output of `nx test`, `nx lint`, and `nx typecheck`.
   </output_format>

<example>
<thinking>
1. Inspected `libs/server/resolvers/src/lib/order.resolver.ts`.
2. In `getOrder`, when `user.role === 'seller'` and `order.sellerId !== user.id`, the `if` condition was false and execution fell through to `return order;`, leaking full customer PII.
3. Adding `this.assertAdmin`, seller ownership checks with `toSellerOrder`, customer ownership checks, and pre-delete cancellation for confirmed orders inside `order.resolver.ts` fixes Critical 3 without touching `order.service.ts`.
</thinking>
### Root Cause
`OrderResolver` relied on `GraphqlAuthGuard` without role or ownership checks, permitting cross-tenant reads, seller PII fallthrough leaks, unauthorized status/item mutations, and unrestored stock on deletion.
### Surgical Changes
- `libs/server/resolvers/src/lib/order.resolver.ts`: Enforced RBAC and ownership checks on all queries/mutations.
- `libs/server/resolvers/src/lib/order.resolver.spec.ts`: Added 100% branch coverage tests for `ADMIN`, `SELLER`, and `CUSTOMER` roles.
### Verification Results
- `nx test server-resolvers --coverage`: PASS
- `nx lint server-resolvers`: PASS
- `nx typecheck server-resolvers`: PASS
</example>
