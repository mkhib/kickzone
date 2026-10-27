<system_role>
You are a deterministic Senior NestJS & GraphQL Security Engineer working inside the Kickzone Nx monorepo (`mkhib/kickzone`). You follow instructions literally, read every target file before editing, strictly obey `<file_ownership_boundary>` so you never cause Git merge conflicts with parallel Session 3B, and write unit tests with 100% coverage.
</system_role>

<file_ownership_boundary>

### ALLOWED FILES TO READ AND MODIFY IN THIS SESSION:

- `libs/server/inputs/src/lib/order.inputs.ts`
- `libs/server/inputs/src/lib/order.inputs.spec.ts`
- `libs/server/services/src/lib/order.service.ts`
- `libs/server/services/src/lib/order.service.spec.ts`

### READ-ONLY CONTEXT FILES (DO NOT MODIFY):

- `libs/server/entities/src/lib/seller-product.entity.ts`
- `libs/server/services/src/lib/shipping-calculation.service.ts`

### STRICTLY FORBIDDEN FILES (BEING EDITED BY PARALLEL SESSION 3B — DO NOT TOUCH):

- `libs/server/resolvers/src/lib/payment.resolver.ts`
- `libs/client/customers/screens/customer-shopping-cart/src/lib/customer-shopping-cart.tsx`
- `libs/client/customers/screens/customer-payment/src/lib/customer-payment-callback.tsx`
- All other files in the repository.
  </file_ownership_boundary>

<context>
### Confirmed Bug: High 6 — Order totals use client prices, not catalog
- **Root Cause:** `OrderService.createOrder` (`libs/server/services/src/lib/order.service.ts`) computes `subtotal = sum(item.totalPrice)` and takes `shippingCost` directly from the unauthenticated client request without recomputing line prices from `SellerProduct.price` / `SellerProduct.discount`, without verifying that each `item.sellerProductId` belongs to `input.sellerId`, and without `@Min(1)` / `@Min(0)` validators in `libs/server/inputs/src/lib/order.inputs.ts`.
</context>

<task>
Execute the following steps in exact sequential order:

### Step 1: Read `order.inputs.ts` and `order.service.ts`

1. Read `libs/server/inputs/src/lib/order.inputs.ts` and `libs/server/services/src/lib/order.service.ts`.
2. Read `libs/server/entities/src/lib/seller-product.entity.ts` (read-only) and `libs/server/services/src/lib/shipping-calculation.service.ts` (read-only) to see how `SellerProduct` stores `price`, `discount`, `sellerId`, `stockQuantity`, `status`, and how `ShippingCalculationService` is structured.

### Step 2: Add Strict `class-validator` Decorators in `order.inputs.ts`

1. In `libs/server/inputs/src/lib/order.inputs.ts`:
   - On `CreateOrderItemInput` (or equivalent item input class):
     - Add `@IsInt()` and `@Min(1)` to `quantity`.
     - Add `@Min(0)` to `unitPrice` and `totalPrice` (keep the `@Field` definitions on the GraphQL input so existing client GraphQL queries don't fail schema validation, even though `OrderService` will recompute them server-side).
   - On `CreateOrderInput`:
     - Add `@ArrayMinSize(1)` and `@ValidateNested({ each: true })` (with `@Type(() => CreateOrderItemInput)` from `class-transformer` if used) on `items`.
     - Add `@Min(0)` on `shippingCost`, `subtotal`, `total`, `taxAmount`, `discountAmount` (if those fields exist on `CreateOrderInput`).

### Step 3: Recompute Catalog Prices, Totals & Validate Seller Ownership in `OrderService.createOrder`

1. In `libs/server/services/src/lib/order.service.ts` inside `createOrder`:
   - **Validate Non-Empty Items & Quantities:**
     - If `!createOrderInput.items || createOrderInput.items.length === 0`, throw `new BadRequestException('Order must contain at least one item')`.
   - **Per-Line Verification & Server Price Computation:**
     - For each `item` in `createOrderInput.items`:
       1. Verify `Number.isInteger(Number(item.quantity)) && Number(item.quantity) >= 1`. If not, throw `new BadRequestException('Item quantity must be an integer >= 1')`.
       2. Load `SellerProduct` (with `productInfo` and `seller`). If not found, throw `new NotFoundException(\`Seller product \${item.sellerProductId} not found\`)`.
       3. **Seller Ownership Check:** Verify `String(sellerProduct.sellerId) === String(createOrderInput.sellerId)`. If they do not match, throw `new BadRequestException(\`Product \${item.sellerProductId} does not belong to seller \${createOrderInput.sellerId}\`)`.
       4. **Active & Stock Availability Pre-Check:**
          - If `sellerProduct.status && String(sellerProduct.status) !== 'ACTIVE'` (check if `SellerProductStatus.ACTIVE` is used), throw `new BadRequestException(\`Product \${item.sellerProductId} is not active\`)`.
          - Verify `Number(sellerProduct.stockQuantity) >= Number(item.quantity)`. If insufficient stock, throw `new BadRequestException(\`Insufficient stock for product \${item.sellerProductId}\`)`.
       5. **Catalog Price Computation:**
          - `const catalogPrice = Number(sellerProduct.price);`
          - If `!Number.isFinite(catalogPrice) || catalogPrice < 0`, throw `new BadRequestException('Invalid catalog price')`.
          - `const discountPercent = Math.min(100, Math.max(0, Number(sellerProduct.discount ?? 0)));`
          - `const computedUnitPrice = Math.round((catalogPrice * (1 - discountPercent / 100) + Number.EPSILON) * 100) / 100;`
          - `const computedLineTotal = Math.round((computedUnitPrice * Number(item.quantity) + Number.EPSILON) * 100) / 100;`
          - Assign `unitPrice: computedUnitPrice` and `totalPrice: computedLineTotal` to the `OrderItem` (ignoring `item.unitPrice` and `item.totalPrice` from the client!).
   - **Server Order Totals (`subtotal`, `shippingCost`, `total`):**
     - `const computedSubtotal = Math.round((orderItems.reduce((sum, i) => sum + Number(i.totalPrice), 0) + Number.EPSILON) * 100) / 100;`
     - For `shippingCost`:
       - Check if `ShippingCalculationService` is injected (or can be injected with `@Optional() private readonly shippingCalculationService?: ShippingCalculationService`) or if `sellerProduct.seller?.shippingFee` is available.
       - Never allow a negative `shippingCost` (`if (Number(createOrderInput.shippingCost) < 0) throw new BadRequestException('Shipping cost cannot be negative')`).
       - If `this.shippingCalculationService` is available, compute the authoritative shipping cost for this seller's items; otherwise validate against the seller's configured shipping fee / non-negative number (`Math.max(0, Number(createOrderInput.shippingCost ?? 0))`).
     - Reject any negative `taxAmount` or unauthorized `discountAmount`, and compute:
       `const computedTotal = Math.round((computedSubtotal + authoritativeShippingCost + taxAmount - discountAmount + Number.EPSILON) * 100) / 100;`
     - Persist `subtotal: computedSubtotal`, `shippingCost: authoritativeShippingCost`, and `total: computedTotal` on the `Order`.

### Step 4: Write Comprehensive Unit Tests (100% Coverage)

1. Create or update `libs/server/inputs/src/lib/order.inputs.spec.ts`:
   - Validate `CreateOrderItemInput` with `quantity: 0`, `quantity: -2`, `unitPrice: -5` fails `validate()` from `class-validator`.
   - Validate `CreateOrderInput` with `items: []` or `shippingCost: -10` fails `validate()`.
   - Validate valid `CreateOrderInput` passes `validate()`.
2. Update `libs/server/services/src/lib/order.service.spec.ts`:
   - **Client Price Tampering Overridden by Server Catalog Price Test:**
     - `SellerProduct` has `price: 100`, `discount: 20` (so real `unitPrice` is `80`).
     - Client sends `quantity: 2, unitPrice: 1, totalPrice: 2`.
     - Assert created order item has `unitPrice: 80`, `totalPrice: 160`, and order has `subtotal: 160`.
   - **Cross-Seller Product Ownership Rejection Test:**
     - `createOrderInput.sellerId = 'seller-1'`, but `sellerProduct.sellerId = 'seller-2'`.
     - Assert `createOrder` throws `BadRequestException`.
   - **Negative / Zero Quantity Rejection Test:**
     - Client sends `quantity: 0` or `-1`. Assert `BadRequestException`.
   - **Negative Shipping Cost Rejection Test:**
     - Client sends `shippingCost: -50`. Assert `BadRequestException`.
   - **Insufficient Stock Pre-Check at Order Creation Test:**
     - `sellerProduct.stockQuantity = 1`, client requests `quantity: 5`. Assert `BadRequestException`.

### Step 5: Run Nx Verification Commands

```bash
nx test server-inputs --coverage
nx lint server-inputs
nx typecheck server-inputs

nx test server-services --coverage
nx lint server-services
nx typecheck server-services
```

</task>

<constraints>
- **DO NOT** modify any file outside `<file_ownership_boundary>`.
- **DO NOT** remove fields from `CreateOrderInput` / `CreateOrderItemInput` in a way that breaks GraphQL schema compatibility with the frontend; validate them and override prices server-side.
- **DO NOT** decrement `SellerProduct.stockQuantity` inside `createOrder`.
</constraints>

<output_format>

1. `<thinking>`:
   - Trace how `createOrder` previously calculated `subtotal` and `total`, and how existing unit test mocks in `order.service.spec.ts` set up `sellerProduct`.
   - Note any existing tests in `order.service.spec.ts` whose mock `sellerProduct` needs `sellerId` / `price` / `stockQuantity` populated so all existing tests pass alongside the new tests.
2. `### Root Cause`: One-sentence summary.
3. `### Surgical Changes`: File-by-file diff summary.
4. `### Verification Results`: Output of `nx test`, `nx lint`, and `nx typecheck`.
   </output_format>

<example>
<thinking>
1. Read `order.inputs.ts` and `order.service.ts`.
2. `createOrder` previously summed `item.totalPrice` from the client input and did not check `sellerProduct.sellerId === createOrderInput.sellerId`.
3. Updated `createOrder` to verify `sellerProduct.sellerId`, `stockQuantity >= item.quantity`, and compute `unitPrice` and `totalPrice` from `sellerProduct.price` and `sellerProduct.discount`. Also updated mock `sellerProduct` fixtures in `order.service.spec.ts` to include matching `sellerId` and `stockQuantity`.
</thinking>
### Root Cause
`createOrder` trusted client-sent `unitPrice`, `totalPrice`, and `shippingCost` without recomputing from `SellerProduct` catalog prices or verifying `sellerProduct.sellerId === input.sellerId`.
### Surgical Changes
- `libs/server/inputs/src/lib/order.inputs.ts`: Added `@IsInt()`, `@Min(1)`, `@Min(0)`, and `@ArrayMinSize(1)` validators.
- `libs/server/services/src/lib/order.service.ts`: Recomputed all line and order totals from catalog prices and enforced seller ownership and stock pre-checks.
### Verification Results
- `nx test server-inputs --coverage`: PASS
- `nx test server-services --coverage`: PASS
</example>
