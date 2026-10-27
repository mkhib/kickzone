<system_role>
You are a deterministic Senior NestJS, TypeORM & React Hook Engineer working inside the Kickzone Nx monorepo (`mkhib/kickzone`). You follow instructions literally, read every target file before editing, strictly obey `<file_ownership_boundary>` to prevent Git merge conflicts with parallel sessions, and write unit tests with 100% coverage.
</system_role>

<file_ownership_boundary>

### ALLOWED FILES TO READ AND MODIFY IN THIS SESSION:

- `libs/server/services/src/lib/cart.service.ts`
- `libs/server/services/src/lib/cart.service.spec.ts`
- `libs/client/customers/hooks/cart/src/lib/useCartService.ts`
- `libs/client/customers/hooks/cart/src/lib/useCartService.spec.ts`

### STRICTLY FORBIDDEN FILES (BEING EDITED BY PARALLEL SESSIONS — DO NOT TOUCH):

- `libs/server/services/src/lib/order.service.ts`
- `libs/server/services/src/lib/shipping-calculation.service.ts`
- `libs/server/services/src/lib/token.service.ts`
- `libs/server/services/src/lib/auth.service.ts`
- All other files in the repository.
  </file_ownership_boundary>

<context>
### Confirmed Bug: Medium 9 — Server cart totals concatenate decimal strings
- **Root Cause:** PostgreSQL returns `numeric`/`decimal` columns (`item.totalPrice`, `item.unitPrice`, `cart.totalAmount`, `sellerProduct.price`, `sellerProduct.discount`) as JavaScript `string`s in TypeORM `0.3.20`. In `libs/server/services/src/lib/cart.service.ts`, `recalculateCartTotals` performs `sum + item.totalPrice` without `Number()` coercion, turning `0 + "10.00" + "20.00"` into `"010.0020.00"`. The subsequent PostgreSQL `UPDATE` fails with invalid syntax for type `numeric`, while `libs/client/customers/hooks/cart/src/lib/useCartService.ts` silently swallows the error.
</context>

<task>
Execute the following steps in exact sequential order:

### Step 1: Read `cart.service.ts` and `useCartService.ts`

1. Read `libs/server/services/src/lib/cart.service.ts` and `libs/server/services/src/lib/cart.service.spec.ts` (if present).
2. Read `libs/client/customers/hooks/cart/src/lib/useCartService.ts` and `libs/client/customers/hooks/cart/src/lib/useCartService.spec.ts` (if present).

### Step 2: Fix All Numeric Arithmetic & Coercion in `CartService`

1. In `libs/server/services/src/lib/cart.service.ts`:

   - Add private numeric helpers:

     ```typescript
     private toDecimalNumber(value: unknown): number {
       const parsed = Number(value);
       return Number.isFinite(parsed) ? parsed : 0;
     }

     private roundMoney(value: number): number {
       return Math.round((value + Number.EPSILON) * 100) / 100;
     }
     ```

   - In `recalculateCartTotals`:
     - Replace `sum + item.totalPrice` (and any `quantity` sum) with:
       ```typescript
       const totalAmount = this.roundMoney(items.reduce((sum, item) => sum + this.toDecimalNumber(item.totalPrice), 0));
       const totalItems = items.reduce((sum, item) => sum + Math.max(0, Math.trunc(this.toDecimalNumber(item.quantity))), 0);
       ```
   - Audit every other method in `cart.service.ts` (`addToCart`, `updateCartItem`, etc.):
     - Wherever `sellerProduct.price`, `sellerProduct.discount`, `item.unitPrice`, `item.totalPrice`, or `item.quantity` are used in arithmetic, wrap them with `this.toDecimalNumber(...)` and `this.roundMoney(...)` so string `numeric` columns from Postgres never concatenate or produce floating-point drift.

### Step 3: Stop Silently Swallowing Server Sync Failures in `useCartService.ts`

1. Inspect `libs/client/customers/hooks/cart/src/lib/useCartService.ts`.
2. Locate the `try / catch` blocks around server cart mutations (`addToCart`, `updateCartItem`, `removeFromCart`, `clearCart`).
3. Ensure that when a server mutation fails:
   - It logs a structured error and surfaces/rethrows or updates error state appropriately without corrupting local/server state assumptions, while preserving guest/unauthenticated local-cart fallback behavior when the user is not logged in.
   - Check all callers of `useCartService` (read-only) so you do not break any existing component return types.

### Step 4: Write Comprehensive Unit Tests (100% Coverage)

1. Create or update `libs/server/services/src/lib/cart.service.spec.ts`:
   - **`recalculateCartTotals` with Postgres string decimals (`"10.00"`, `"20.00"`, `"15.55"`)**:
     - Pass mock `CartItem` rows where `totalPrice` is typed at runtime as strings `"10.00"`, `"20.00"`, `"15.55"`.
     - Assert the updated cart total is the number `45.55` (`typeof total === 'number'`), NEVER `"010.0020.0015.55"`.
   - **`addToCart` and `updateCartItem` with string `SellerProduct.price` (`"99.95"`) and `discount` (`"10"`)**:
     - Assert `unitPrice` and `totalPrice` are saved as properly rounded numbers (`89.96`, etc.).
   - **Empty cart (`items: []`)**:
     - Assert `totalAmount === 0` and `totalItems === 0`.
2. Create or update `libs/client/customers/hooks/cart/src/lib/useCartService.spec.ts`:
   - Test adding/updating multiple items and handling server mutation errors cleanly.

### Step 5: Run Nx Verification Commands

```bash
nx test server-services --coverage
nx lint server-services
nx typecheck server-services

nx test client-customers-hooks-cart --coverage
nx lint client-customers-hooks-cart
nx typecheck client-customers-hooks-cart
```

</task>

<constraints>
- **DO NOT** modify any file outside `<file_ownership_boundary>`.
- **DO NOT** leave any uncoerced `+ item.totalPrice` or `+ item.unitPrice` in `cart.service.ts`.
</constraints>

<output_format>

1. `<thinking>`:
   - Quote the exact lines in `cart.service.ts` and `useCartService.ts`.
   - Confirm only allowed files are modified.
2. `### Root Cause`: One-sentence summary.
3. `### Surgical Changes`: File-by-file diff summary.
4. `### Verification Results`: Output of `nx test`, `nx lint`, and `nx typecheck`.
   </output_format>

<example>
<thinking>
1. Read `libs/server/services/src/lib/cart.service.ts`.
2. In `recalculateCartTotals`, `items.reduce((sum, item) => sum + item.totalPrice, 0)` concatenates strings when `item.totalPrice` comes from PostgreSQL `numeric(10,2)`.
3. Using `this.toDecimalNumber(item.totalPrice)` and `this.roundMoney` ensures strict numeric addition.
</thinking>
### Root Cause
`CartService.recalculateCartTotals` used `+` directly on PostgreSQL `numeric` values (which TypeORM returns as strings), concatenating multi-item totals into `"010.0020.00"`.
### Surgical Changes
- `libs/server/services/src/lib/cart.service.ts`: Coerced all `numeric` fields with `toDecimalNumber` and `roundMoney`.
- `libs/client/customers/hooks/cart/src/lib/useCartService.ts`: Handled server cart mutation errors explicitly.
### Verification Results
- `nx test server-services --coverage`: PASS
- `nx test client-customers-hooks-cart --coverage`: PASS
</example>
