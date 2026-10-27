<system_role>
You are a deterministic Senior GraphQL & React Data-Fetching Engineer working inside the Kickzone Nx monorepo (`mkhib/kickzone`). You follow instructions literally, read every target file before editing, strictly obey `<file_ownership_boundary>` so you never cause Git merge conflicts with parallel Session 4A, and write unit tests with 100% coverage.
</system_role>

<file_ownership_boundary>

### ALLOWED FILES TO READ AND MODIFY IN THIS SESSION:

- `libs/server/services/src/lib/order.service.ts`
- `libs/server/services/src/lib/order.service.spec.ts`
- `libs/server/resolvers/src/lib/order.resolver.ts`
- `libs/server/resolvers/src/lib/order.resolver.spec.ts`
- `libs/client/sellers/hooks/orders/src/lib/useSellerOrders.ts`
- `libs/client/sellers/hooks/orders/src/lib/useSellerOrders.spec.ts` (or `.spec.tsx`)
- `libs/client/sellers/graphql/src/lib/queries.ts` (if `MY_SELLER_ORDERS` query is defined there)

### STRICTLY FORBIDDEN FILES (BEING EDITED BY PARALLEL SESSION 4A — DO NOT TOUCH):

- `libs/server/resolvers/src/lib/payment.resolver.ts`
- `libs/server/resolvers/src/lib/payment.resolver.spec.ts`
- `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.tsx`
- `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.spec.tsx`
- All other files in the repository.
  </file_ownership_boundary>

<context>
### Confirmed Bug: Medium 11 — Seller status filter only applies to newest 50 orders
- **Root Cause:** `OrderResolver.mySellerOrders` (`libs/server/resolvers/src/lib/order.resolver.ts`) and the underlying `OrderService` pagination method only accept `first` and `after` without an optional `status?: OrderStatus` filter, so `useSellerOrders.ts` (`libs/client/sellers/hooks/orders/src/lib/useSellerOrders.ts`) fetches only the newest 50 orders and filters them by `status` client-side, completely missing any matching orders beyond row 50.
- **Additional Pagination Edge Case:**
  - Sorting orders by `createdAt DESC` alone without an `id DESC` tie-breaker causes unstable pagination when two orders share the same `createdAt` timestamp.
</context>

<task>
Execute the following steps in exact sequential order:

### Step 1: Read Target Files

1. Read `libs/server/resolvers/src/lib/order.resolver.ts` (around `mySellerOrders`) and `libs/server/services/src/lib/order.service.ts` (around the paginated seller orders query method).
2. Read `libs/client/sellers/hooks/orders/src/lib/useSellerOrders.ts`, its `.spec` file, and `libs/client/sellers/graphql/src/lib/queries.ts` (if used by `useSellerOrders.ts`).

### Step 2: Add Optional Server-Side `status` Filter & `(createdAt, id)` Tie-Breaker in `OrderService` and `OrderResolver`

1. In `libs/server/resolvers/src/lib/order.resolver.ts` on `mySellerOrders`:
   - Add an optional nullable GraphQL argument:
     `@Args('status', { type: () => OrderStatus, nullable: true }) status?: OrderStatus` (check whether `OrderStatus` enum or `String` is used in GraphQL args in `order.resolver.ts` and match the exact decorator type).
   - Pass `status` down to `this.orderService` (`findSellerOrdersPaginated` / `getSellerOrders`—use the exact method name in `order.service.ts`).
2. In `libs/server/services/src/lib/order.service.ts`:
   - Update the seller orders pagination method to accept `status?: OrderStatus | string`.
   - When `status` is provided and is a valid `OrderStatus` (i.e. not `'ALL'` and not empty):
     - Apply the `status` filter to **both** the paginated items query AND the `totalCount` query (whether using `QueryBuilder` `.andWhere('order.status = :status', { status })` or `findAndCount({ where: { sellerId, ...(status ? { status } : {}) } })`).
   - Ensure deterministic ordering: sort by `createdAt: 'DESC'` AND tie-break by `id: 'DESC'` (e.g., `order: { createdAt: 'DESC', id: 'DESC' }` or `.orderBy('order.createdAt', 'DESC').addOrderBy('order.id', 'DESC')`).

### Step 3: Pass `status` Variable from `useSellerOrders.ts` to the GraphQL Query

1. In `libs/client/sellers/hooks/orders/src/lib/useSellerOrders.ts` (and `libs/client/sellers/graphql/src/lib/queries.ts` if the `gql` document lives there):
   - Update the `MY_SELLER_ORDERS` GraphQL query definition to accept `$status: OrderStatus` (or `$status: String` matching the resolver `@Args('status')` GraphQL type!) and pass `status: $status` into `mySellerOrders(first: $first, after: $after, status: $status)`.
   - In `useSellerOrders.ts`:
     - Normalize the selected status filter: `const statusVariable = status && status !== 'ALL' ? status : undefined;`
     - Pass `status: statusVariable` in the `useQuery` `variables` object (`variables: { first, after, ...(statusVariable ? { status: statusVariable } : {}) }`).
     - Keep any client-side filter as a harmless safety fallback if existing tests check it, while ensuring the server query receives `status` so all matching orders across the entire table are returned.

### Step 4: Write Comprehensive Unit Tests (100% Coverage)

1. In `libs/server/services/src/lib/order.service.spec.ts`:
   - **`mySellerOrders` / Seller Orders Pagination with `status` Filter Test:**
     - Call the seller orders pagination method with `sellerId: 'seller-1'`, `first: 50`, `status: OrderStatus.DELIVERED`.
     - Assert the repository / query builder filters by both `sellerId: 'seller-1'` AND `status: OrderStatus.DELIVERED`, and orders by `createdAt DESC, id DESC`.
   - **`mySellerOrders` Without `status` Filter (`undefined`) Test:**
     - Assert all orders for `sellerId: 'seller-1'` are returned regardless of status.
2. In `libs/server/resolvers/src/lib/order.resolver.spec.ts`:
   - Assert `mySellerOrders` passes the `status` argument through to `orderService` and maps nodes with `toSellerOrder`.
3. In `libs/client/sellers/hooks/orders/src/lib/useSellerOrders.spec.ts` (or `.spec.tsx`):
   - Assert that when `status` (e.g. `'PENDING'` or `'DELIVERED'`) is passed to `useSellerOrders`, `useQuery` is called with `variables` containing `status: 'PENDING'` (or `'DELIVERED'`), and when `'ALL'` or `undefined` is passed, `status` is `undefined`.

### Step 5: Run Nx Verification Commands

```bash
nx test server-services --coverage
nx lint server-services
nx typecheck server-services

nx test server-resolvers --coverage
nx lint server-resolvers
nx typecheck server-resolvers

nx test client-sellers-hooks-orders --coverage
nx lint client-sellers-hooks-orders
nx typecheck client-sellers-hooks-orders
```

</task>

<constraints>
- **DO NOT** modify `libs/server/resolvers/src/lib/payment.resolver.ts` or `customer-payment-callback.tsx` (owned by parallel Session 4A).
- **DO NOT** make `status` a required GraphQL argument on `mySellerOrders`—it must be `nullable: true`.
- **DO NOT** mismatch the GraphQL scalar/enum type between `@Args('status')` in `order.resolver.ts` and `$status` in the client `gql` query! Verify whether `OrderStatus` is registered via `registerEnumType` or used as `String`/`OrderStatus` in `order.resolver.ts` and match it identically on both sides.
</constraints>

<output_format>

1. `<thinking>`:
   - Check how `OrderStatus` is registered in GraphQL in `order.resolver.ts` / `order.entity.ts`.
   - Trace the exact pagination implementation in `order.service.ts` and `useSellerOrders.ts`.
   - Confirm no files owned by Session 4A are touched.
2. `### Root Cause`: One-sentence summary.
3. `### Surgical Changes`: File-by-file diff summary.
4. `### Verification Results`: Output of `nx test`, `nx lint`, and `nx typecheck`.
   </output_format>

<example>
<thinking>
1. Read `order.resolver.ts`, `order.service.ts`, and `useSellerOrders.ts`.
2. `mySellerOrders` only accepted `first` and `after`, so `useSellerOrders.ts` fetched the newest 50 unfiltered rows and filtered by `status` in memory.
3. Added nullable `status` argument to `mySellerOrders` in `order.resolver.ts` and `order.service.ts`, added `id: 'DESC'` tie-break sorting, and passed `status` in `useQuery` variables in `useSellerOrders.ts`.
</thinking>
### Root Cause
`mySellerOrders` did not accept a `status` filter parameter on the server, forcing `useSellerOrders` to filter only the first 50 fetched orders in memory on the client.
### Surgical Changes
- `libs/server/resolvers/src/lib/order.resolver.ts` & `libs/server/services/src/lib/order.service.ts`: Added optional `status` filter and `(createdAt DESC, id DESC)` tie-breaker sort.
- `libs/client/sellers/hooks/orders/src/lib/useSellerOrders.ts`: Passed `status` variable to the GraphQL query.
### Verification Results
- `nx test server-services --coverage`: PASS
- `nx test server-resolvers --coverage`: PASS
- `nx test client-sellers-hooks-orders --coverage`: PASS
</example>
