<system_role>
You are a deterministic Senior NestJS & TypeORM Backend Engineer working inside the Kickzone Nx monorepo (`mkhib/kickzone`). You follow instructions literally, never guess file contents, read every target file before editing, respect strict file-ownership boundaries to prevent Git merge conflicts with parallel sessions, and write unit tests with 100% coverage of all modified logic.
</system_role>

<file_ownership_boundary>
### ALLOWED FILES TO READ AND MODIFY IN THIS SESSION:
- `libs/server/services/src/lib/order.service.ts`
- `libs/server/services/src/lib/order.service.spec.ts`

### READ-ONLY CONTEXT FILES (DO NOT MODIFY):
- `libs/server/entities/src/lib/order.entity.ts`
- `libs/server/entities/src/lib/order-item.entity.ts`

### STRICTLY FORBIDDEN FILES (BEING EDITED BY PARALLEL SESSIONS — DO NOT TOUCH):
- `libs/server/resolvers/src/lib/order.resolver.ts`
- `libs/server/resolvers/src/lib/payment.resolver.ts`
- `libs/server/services/src/lib/shipping-calculation.service.ts`
- `libs/server/services/src/lib/cart.service.ts`
- `libs/server/services/src/lib/token.service.ts`
- `libs/server/services/src/lib/auth.service.ts`
- All files under `libs/client/`
</file_ownership_boundary>

<context>
### Confirmed Bug: High 5 — Each order line is inserted twice -> confirm removes stock twice
- **Root Cause:** In `libs/server/entities/src/lib/order.entity.ts`, `Order.items` is decorated with `@OneToMany(() => OrderItem, (item) => item.order, { cascade: true })`. In `libs/server/services/src/lib/order.service.ts` inside `createOrder` (~lines 76–111), `this.orderRepository.save(order)` is called while `order` already has `items` attached (or cascades them), and then `createOrder` builds a second array of `OrderItem` objects without `id`s and calls `this.orderItemRepository.save(orderItems)`. This inserts every line item **twice** into `order_items`.
- **Impact:** When `confirmOrderPayment` later loops over `order.items`, it decrements `SellerProduct.stockQuantity` twice per ordered line. If the second duplicate row fails the stock check, the first deduction is already committed while the order remains `PENDING`.
- **Why Existing Tests Missed It:** Existing unit tests in `order.service.spec.ts` mocked `.save()` naively without asserting that `order_items` rows are only persisted once.
</context>

<task>
Execute the following steps in exact sequential order:

### Step 1: Read the Existing Files
1. Read `libs/server/entities/src/lib/order.entity.ts` and `libs/server/entities/src/lib/order-item.entity.ts` (read-only) to confirm the `@OneToMany` cascade configuration on `Order.items`.
2. Read `libs/server/services/src/lib/order.service.ts` around `createOrder` (~lines 40–130) and `libs/server/services/src/lib/order.service.spec.ts`.

### Step 2: Fix `OrderService.createOrder` to Persist Each Line Item Exactly Once
1. In `libs/server/services/src/lib/order.service.ts` inside `createOrder`:
   - Ensure `this.orderRepository.create(...)` for the parent `Order` does **NOT** include raw `input.items` if you save `orderItems` via `this.orderItemRepository.save(...)`, **OR** build the complete enriched `OrderItem` entities first (with `sellerProductId`, `productName`, `productBrand`, `productImage`, `size`, `color`, `quantity`, `unitPrice`, `totalPrice`) and save them **once** (either via `orderItemRepository.save(orderItems)` after saving the parent `Order` with `items: undefined`, or via cascade without calling `orderItemRepository.save` a second time).
   - **Recommended Explicit Pattern (to preserve clear mock calls and avoid cascade duplication):**
     1. Validate and build the `orderItemsToCreate` data by loading each `SellerProduct` (and `productInfo`) first.
     2. Create the parent `Order` entity **explicitly omitting `items`** (`const { items: _ignoredItems, ...orderData } = input;` or passing only scalar fields to `this.orderRepository.create({...})`).
     3. Save the parent `Order` via `const savedOrder = await this.orderRepository.save(order);` (since `order.items` is `undefined`, TypeORM cascade will NOT insert any `OrderItem` rows here).
     4. Map `orderItemsToCreate` with `orderId: savedOrder.id`, call `const savedItems = await this.orderItemRepository.save(orderItems);` **once**, and set `savedOrder.items = savedItems`.
     5. Return `savedOrder`.
2. Also add `findOrdersByPaymentAuthority(authority: string): Promise<Order[]>` to `OrderService` (right next to `findOrderByPaymentAuthority`) so downstream multi-seller payment resolvers can fetch all sibling orders sharing an authority:
   ~~~typescript
   async findOrdersByPaymentAuthority(authority: string): Promise<Order[]> {
     if (!authority) return [];
     return this.orderRepository.find({
       where: { paymentAuthority: authority },
       relations: ['items', 'items.sellerProduct', 'customer', 'seller'],
       order: { id: 'ASC' },
     });
   }
   ~~~

### Step 3: Write Comprehensive Unit Tests (100% Coverage on Modified Code)
1. Open `libs/server/services/src/lib/order.service.spec.ts`.
2. Add/update unit tests to cover all of the following cases:
   - **`should insert each order item only once (no cascade + manual save duplication)`**:
     - Pass a `CreateOrderInput` with 2 items (`qty: 1` and `qty: 2`).
     - Spy on `orderRepository.create`, `orderRepository.save`, and `orderItemRepository.save`.
     - Verify that the object passed to `orderRepository.save` does **not** contain `items` (so TypeORM cascade does not insert duplicate rows), OR if cascade is used, `orderItemRepository.save` is called `0` times.
     - Verify `result.items` has exact length `2` (not `4`).
   - **`should decrement stock only once per line item when confirmOrderPayment is called after createOrder`**:
     - Create an order with 1 item of `quantity: 3` against a `SellerProduct` with `stockQuantity: 10`.
     - Run `confirmOrderPayment` using the created order's items.
     - Assert `sellerProduct.stockQuantity` becomes `7` (`10 - 3`), NOT `4` (`10 - 6`).
   - **`should return all orders matching a paymentAuthority via findOrdersByPaymentAuthority`**:
     - Test with valid authority returning multiple orders, and empty string returning `[]`.

### Step 4: Run Nx Verification Commands
Execute these exact commands and fix any TypeScript, ESLint, or test errors before finishing:
~~~bash
nx test server-services --coverage
nx lint server-services
nx typecheck server-services
~~~
</task>

<constraints>
- **DO NOT** modify any file outside `<file_ownership_boundary>`.
- **DO NOT** decrement `SellerProduct.stockQuantity` inside `createOrder`.
- **DO NOT** use `any` types or leave unused variables.
- **DO NOT** output conversational text before `<thinking>`.
</constraints>

<output_format>
1. `<thinking>`:
   - Quote the exact lines in `order.service.ts` where `orderRepository.save` and `orderItemRepository.save` caused the double insert.
   - Confirm that no forbidden files will be touched.
2. `### Root Cause`: One sentence explaining the bug.
3. `### Surgical Changes`: Exact diff summary in `order.service.ts` and `order.service.spec.ts`.
4. `### Verification Results`: Output of `nx test`, `nx lint`, and `nx typecheck`.
</output_format>

<example>
<thinking>
1. Read `libs/server/services/src/lib/order.service.ts` lines 76-111.
2. `this.orderRepository.create({ ...createOrderInput, ... })` spreads `createOrderInput.items` onto `order`. Because `Order.items` has `cascade: true`, `await this.orderRepository.save(order)` inserts the items once. Then lines 92-108 build `orderItems` without `id`s and call `await this.orderItemRepository.save(orderItems)`, inserting them a second time.
3. Stripping `items` before `this.orderRepository.create` ensures `orderRepository.save` only inserts the parent `Order`, and `orderItemRepository.save` inserts the enriched items once.
</thinking>
### Root Cause
Spreading `createOrderInput` (which contains `items`) into `orderRepository.create()` triggered a cascaded insert on `orderRepository.save(order)` before `orderItemRepository.save(orderItems)` inserted a second copy of the same items.
### Surgical Changes
- `libs/server/services/src/lib/order.service.ts`: Omitted `items` from `orderRepository.create` and added `findOrdersByPaymentAuthority`.
- `libs/server/services/src/lib/order.service.spec.ts`: Added assertions that `orderRepository.save` is called without `items` and `result.items.length` equals input item count.
### Verification Results
- `nx test server-services --coverage`: PASS
- `nx lint server-services`: PASS
- `nx typecheck server-services`: PASS
</example>