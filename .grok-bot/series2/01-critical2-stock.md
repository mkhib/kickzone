<system_role>
You are a deterministic Senior Full-Stack TypeScript & Database Concurrency Engineer working inside the Kickzone Nx monorepo (`mkhib/kickzone`). You follow instructions literally, read every target file before editing, strictly obey `<file_ownership_boundary>` to prevent Git merge conflicts with parallel sessions, and write unit tests with 100% coverage.
</system_role>

<file_ownership_boundary>

### ALLOWED FILES TO READ AND MODIFY IN THIS SESSION:

- `libs/server/entities/src/lib/order.entity.ts`
- `libs/server/services/src/lib/order.service.ts`
- `libs/server/services/src/lib/order.service.spec.ts`
- `libs/client/sellers/screens/seller-orders/src/lib/seller-orders-screen.tsx`
- `libs/client/sellers/screens/seller-orders/src/lib/seller-orders-screen.spec.tsx`

### STRICTLY FORBIDDEN FILES (BEING EDITED BY PARALLEL SESSION 2B — DO NOT TOUCH):

- `libs/server/resolvers/src/lib/payment.resolver.ts`
- `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.tsx`
- `libs/client/customers/screens/customer-payment/src/lib/use-zarinpal-payment.tsx`
- `libs/client/customers/screens/customer-payment/src/lib/zarinpal-payment-service.ts`
- `libs/client/customers/graphql/src/lib/mutations.ts`
- All other files in the repository.
  </file_ownership_boundary>

<context>
### Confirmed Bug: Critical 2 — Cancelling / refunding invents stock (+ High 7 non-atomic stock reservation)
- **Root Cause:** Stock is decremented only in `confirmOrderPayment`, yet `OrderService.updateOrderStatus(CANCELLED | REFUNDED)` unconditionally calls `restoreStock` whenever the previous status was not already `CANCELLED`/`REFUNDED`—including for unpaid `PENDING` orders and English-checkout orders whose stock was never decremented—and allows status loops (`PENDING -> CANCELLED (+qty) -> DELIVERED -> CANCELLED (+qty again)`). Additionally, `decreaseStock` / `confirmOrderPayment` modifies `SellerProduct.stockQuantity` without a database transaction or `pessimistic_write` row lock.
- **Design Invariants Required:**
  1. Add `stockReserved: boolean` (`default: false`) to `Order` (`libs/server/entities/src/lib/order.entity.ts`).
  2. Stock is decremented **if and only if** `order.stockReserved === false` when an order is confirmed (`confirmOrderPayment` for ZarinPal orders, OR `updateOrderStatus` transitioning `PENDING -> CONFIRMED` for English checkout orders), setting `order.stockReserved = true` atomically inside a `DataSource.transaction` with `pessimistic_write` locks.
  3. Stock is restored **if and only if** `order.stockReserved === true` when transitioning to `CANCELLED` or `REFUNDED`, setting `order.stockReserved = false` atomically inside a transaction. Cancelling an unpaid `PENDING` order (`stockReserved === false`) MUST NEVER increment `SellerProduct.stockQuantity`!
  4. `CANCELLED` and `REFUNDED` are **terminal states**—no order can ever transition out of `CANCELLED` or `REFUNDED`.
</context>

<task>
Execute the following steps in exact sequential order:

### Step 1: Read Target Files

1. Read `libs/server/entities/src/lib/order.entity.ts`.
2. Read `libs/server/services/src/lib/order.service.ts` and `libs/server/services/src/lib/order.service.spec.ts`.
3. Read `libs/client/sellers/screens/seller-orders/src/lib/seller-orders-screen.tsx` and its `.spec.tsx` file (if present).

### Step 2: Add `stockReserved` Column to `Order` Entity

1. In `libs/server/entities/src/lib/order.entity.ts`:
   - Add:
     ```typescript
     @Field(() => Boolean, { defaultValue: false })
     @Column({ type: 'boolean', default: false })
     stockReserved!: boolean;
     ```

### Step 3: Enforce `stockReserved`, Strict Status Transitions & Atomic `pessimistic_write` Locks in `OrderService`

1. In `libs/server/services/src/lib/order.service.ts`:
   - Define the strict allowed status transition table:
     ```typescript
     private static readonly ALLOWED_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
       [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
       [OrderStatus.CONFIRMED]: [
         OrderStatus.PROCESSING,
         OrderStatus.SHIPPED,
         OrderStatus.CANCELLED,
         OrderStatus.REFUNDED,
       ],
       [OrderStatus.PROCESSING]: [
         OrderStatus.SHIPPED,
         OrderStatus.CANCELLED,
         OrderStatus.REFUNDED,
       ],
       [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED, OrderStatus.REFUNDED],
       [OrderStatus.DELIVERED]: [OrderStatus.REFUNDED],
       [OrderStatus.CANCELLED]: [],
       [OrderStatus.REFUNDED]: [],
     };
     ```
   - Inject `@Optional() @InjectDataSource() private readonly dataSource?: DataSource` (if not already injected). Provide a helper `private async runInTransaction<T>(fn: (manager?: EntityManager) => Promise<T>): Promise<T>` that uses `this.dataSource.transaction(fn)` when `this.dataSource?.transaction` is available, and falls back to `fn(undefined)` Using `this.orderRepository` / `this.sellerProductRepository` when running in legacy unit tests that didn't mock `DataSource`.
   - Harden `decreaseStock(order: Order, manager?: EntityManager)`:
     - **Idempotent Guard:** If `order.stockReserved === true`, return immediately without decrementing!
     - Validate every item has `Number.isInteger(Number(item.quantity)) && Number(item.quantity) > 0`. If `item.quantity <= 0`, throw `new BadRequestException('Order item quantity must be a positive integer')`.
     - Aggregate required quantities by `sellerProductId` (sorted by `sellerProductId ASC` to prevent deadlocks).
     - For each `sellerProductId` in sorted order:
       - Load `SellerProduct` (using `manager.findOne(SellerProduct, { where: { id: sellerProductId }, lock: { mode: 'pessimistic_write' } })` when `manager` is present, or `this.sellerProductRepository.findOne(...)`).
       - Verify `sellerProduct.stockQuantity >= requiredQty`. If not, throw `new BadRequestException(\`Insufficient stock for product \${sellerProductId}\`)` BEFORE mutating/saving any rows (or let the transaction roll back all changes!).
     - Only after ALL items pass the stock check, decrement `sellerProduct.stockQuantity -= requiredQty` and save each `SellerProduct`, then set `order.stockReserved = true`.
   - Harden `restoreStock(order: Order, manager?: EntityManager)`:
     - **CRITICAL GUARD:** If `!order.stockReserved`, return immediately! Do NOT touch `SellerProduct.stockQuantity`!
     - Validate `item.quantity > 0`.
     - Lock/load each `SellerProduct` in sorted `sellerProductId` order, increment `sellerProduct.stockQuantity += Number(item.quantity)`, save, and set `order.stockReserved = false`.
   - Update `confirmOrderPayment(orderId: string, refId?: string)`:
     - Run inside `this.runInTransaction`.
     - Lock/load the `Order` with `items`.
     - If `order.status === OrderStatus.CONFIRMED && order.stockReserved === true`, return `order` idempotently (safe retry for ZarinPal code `101`).
     - If `order.status !== OrderStatus.PENDING`, throw `new BadRequestException(\`Cannot confirm payment for order in status \${order.status}\`)`.
     - Call `await this.decreaseStock(order, manager)` (which sets `order.stockReserved = true`).
     - Set `order.status = OrderStatus.CONFIRMED`, `order.paymentVerifiedAt = new Date()`, and save the order.
   - Update `updateOrderStatus(id: string, status: OrderStatus)`:
     - Run inside `this.runInTransaction`.
     - Load the order with `items`.
     - If `order.status === status`, return `order` idempotently.
     - Check `OrderService.ALLOWED_STATUS_TRANSITIONS[order.status]?.includes(status)`. If false, throw `new BadRequestException(\`Invalid status transition from \${order.status} to \${status}\`)`.
     - If transitioning `PENDING -> CONFIRMED` and `!order.stockReserved` (e.g. English checkout confirmed by seller/admin), call `await this.decreaseStock(order, manager)` (which sets `order.stockReserved = true`).
     - If transitioning to `CANCELLED` or `REFUNDED`, call `await this.restoreStock(order, manager)` **only if `order.stockReserved === true`** (which sets `order.stockReserved = false`).
     - Update `order.status = status` and save.
   - Update `cancelPendingOrder(orderId: string)`:
     - Load the order. If `order.status !== OrderStatus.PENDING`, throw `new BadRequestException('Only PENDING orders can be cancelled')`.
     - Set `order.status = OrderStatus.CANCELLED`. Only call `restoreStock` if `order.stockReserved === true` (for a `PENDING` order, `stockReserved` is `false`, so stock is untouched). Save and return.
   - Update `deleteOrder(id: string)`:
     - Load the order with `items`. If `order.stockReserved === true`, call `await this.restoreStock(order)` before deleting the order so deleting a confirmed order never leaks reserved stock.

### Step 4: Restrict Seller UI Status Selector (`seller-orders-screen.tsx`)

1. Inspect `libs/client/sellers/screens/seller-orders/src/lib/seller-orders-screen.tsx`.
2. Ensure the status selector / dropdown in the Seller Orders UI only allows valid next transitions for the order's current status:
   - `PENDING`: `['PENDING', 'CONFIRMED', 'CANCELLED']`
   - `CONFIRMED`: `['CONFIRMED', 'PROCESSING', 'SHIPPED', 'CANCELLED', 'REFUNDED']`
   - `PROCESSING`: `['PROCESSING', 'SHIPPED', 'CANCELLED', 'REFUNDED']`
   - `SHIPPED`: `['SHIPPED', 'DELIVERED', 'REFUNDED']`
   - `DELIVERED`: `['DELIVERED', 'REFUNDED']`
   - `CANCELLED`: `['CANCELLED']` (disabled)
   - `REFUNDED`: `['REFUNDED']` (disabled)

### Step 5: Write Exhaustive Unit Tests (100% Coverage)

1. In `libs/server/services/src/lib/order.service.spec.ts`:
   - **Unpaid `PENDING -> CANCELLED` Does NOT Invent Stock:** Order is `PENDING` (`stockReserved: false`, product stock = `10`, qty = `2`). Call `updateOrderStatus(id, CANCELLED)`. Assert product stock stays `10` (NOT `12`!) and `sellerProductRepository.save` is NOT called.
   - **Status Loop Exploit Blocked (`CANCELLED -> DELIVERED -> CANCELLED`):** Attempt `updateOrderStatus(id, DELIVERED)` on a `CANCELLED` order. Assert `BadRequestException` is thrown.
   - **English Checkout `PENDING -> CONFIRMED -> CANCELLED` Stock Lifecycle:**
     - `PENDING` (`stockReserved: false`, stock = `10`, qty = `2`) -> `updateOrderStatus(id, CONFIRMED)`: assert stock becomes `8` and `stockReserved === true`.
     - Then `updateOrderStatus(id, CANCELLED)`: assert stock returns to `10` and `stockReserved === false`.
   - **`CONFIRMED -> REFUNDED` Restores Once, Then Blocks Further Transitions:**
     - `CONFIRMED` (`stockReserved: true`, stock = `8`, qty = `2`) -> `updateOrderStatus(id, REFUNDED)`: assert stock becomes `10` and `stockReserved === false`.
     - Attempt `REFUNDED -> CANCELLED`: assert `BadRequestException` and stock remains `10`.
   - **Atomic Multi-Item Stock Check Failure (No Partial Deduction):**
     - Order has 2 items: Item 1 (`stockQuantity: 5, qty: 2`), Item 2 (`stockQuantity: 1, qty: 3`). Call `confirmOrderPayment`. Assert `BadRequestException` is thrown and Item 1's stock is NOT saved as `3`.
   - **Negative Quantity Rejection:** Item with `quantity: -3` throws `BadRequestException`.
   - **`cancelPendingOrder` on `CONFIRMED` Order Rejection:** Throws `BadRequestException`.
2. In `libs/client/sellers/screens/seller-orders/src/lib/seller-orders-screen.spec.tsx`:
   - Verify that terminal orders (`CANCELLED` / `REFUNDED`) cannot transition to `DELIVERED` or `CONFIRMED` in the UI.

### Step 6: Run Nx Verification Commands

```bash
nx test server-services --coverage
nx lint server-services
nx typecheck server-services

nx test client-sellers-screens-seller-orders --coverage
nx lint client-sellers-screens-seller-orders
nx typecheck client-sellers-screens-seller-orders
```

</task>

<constraints>
- **DO NOT** modify any file outside `<file_ownership_boundary>`.
- **DO NOT** increment `SellerProduct.stockQuantity` when cancelling an order with `stockReserved === false`.
- **DO NOT** allow any transition out of `CANCELLED` or `REFUNDED`.
</constraints>

<output_format>

1. `<thinking>`:
   - Trace every stock transition path in `order.service.ts` and UI status option in `seller-orders-screen.tsx`.
   - Confirm only allowed files in `<file_ownership_boundary>` are modified.
2. `### Root Cause`: One-sentence summary.
3. `### Surgical Changes`: File-by-file diff summary.
4. `### Verification Results`: Output of `nx test`, `nx lint`, and `nx typecheck`.
   </output_format>

<example>
<thinking>
1. Inspected `order.entity.ts`, `order.service.ts`, and `seller-orders-screen.tsx`.
2. `updateOrderStatus` restored stock whenever `status` was `CANCELLED` or `REFUNDED`, even if the order was `PENDING` and never had stock reserved.
3. Added `stockReserved` to `Order`, enforced `ALLOWED_STATUS_TRANSITIONS`, gated `restoreStock` on `order.stockReserved === true`, and restricted Seller UI status options.
</thinking>
### Root Cause
`updateOrderStatus` unconditionally restored stock on `CANCELLED`/`REFUNDED` without tracking whether stock was ever reserved (`stockReserved`), and allowed transitions out of terminal states.
### Surgical Changes
- `libs/server/entities/src/lib/order.entity.ts`: Added `stockReserved: boolean`.
- `libs/server/services/src/lib/order.service.ts`: Enforced `ALLOWED_STATUS_TRANSITIONS`, atomic all-or-nothing stock reservation, and `stockReserved` invariant.
- `libs/client/sellers/screens/seller-orders/src/lib/seller-orders-screen.tsx`: Filtered status dropdown options by allowed transitions.
### Verification Results
- `nx test server-services --coverage`: PASS
- `nx test client-sellers-screens-seller-orders --coverage`: PASS
</example>
