# Smart Multi-Seller Shipping Strategy

## Problem
Currently, if a customer buys 5 items from 5 different sellers, they pay 5 separate shipping fees (e.g., $5 × 5 = $25), which is expensive and poor customer experience.

## Research: How Major Platforms Handle This

### Amazon's Approach:
- **Free Shipping Threshold**: Orders over $25/$35 get free shipping
- **FBA (Fulfillment by Amazon)**: Items from FBA sellers are consolidated when possible
- **Marketplace Sellers**: Each seller charges separately, but Amazon often subsidizes or offers promotions
- **Prime Membership**: Free shipping on most items

### Best Practices from E-commerce Research:
1. **Free Shipping Threshold** - Most common (eBay, Amazon, Shopify stores)
2. **Tiered Shipping** - First seller full fee, additional sellers reduced fee
3. **Maximum Shipping Cap** - Cap total shipping costs (e.g., max $15)
4. **Platform Subsidy** - Platform covers some costs to improve customer experience

## Recommended Solution: **Smart Tiered Shipping with Free Shipping Threshold**

### Strategy Overview:
```
If cart subtotal ≥ FREE_SHIPPING_THRESHOLD (e.g., $50):
  → Shipping Cost = $0 (FREE SHIPPING!)

Else:
  → First seller: Full shipping fee
  → Additional sellers: Reduced shipping (e.g., 50% of original OR fixed $2-3)
  → Maximum cap: Total shipping cannot exceed MAX_SHIPPING_CAP (e.g., $15)
```

### Example Calculations:

**Scenario 1: Free Shipping**
- Cart Total: $75
- Sellers: 5 sellers, each charges $5 shipping
- **Result: $0 shipping** (meets threshold)

**Scenario 2: Tiered Shipping (Below Threshold)**
- Cart Total: $30
- Seller 1: $5 shipping
- Seller 2: $8 shipping  
- Seller 3: $6 shipping
- Seller 4: $4 shipping
- Seller 5: $7 shipping
- **Calculation:**
  - Seller 1: $5 (full)
  - Sellers 2-5: $8 + $6 + $4 + $7 = $25 (full)
  - **Total: $30** → **Capped at $15** (MAX_SHIPPING_CAP)
- **Final: $15 shipping**

**Scenario 3: Tiered Shipping with Discount**
- Cart Total: $40
- Seller 1: $5 shipping
- Seller 2: $6 shipping
- Seller 3: $4 shipping
- **Calculation:**
  - Seller 1: $5 (full)
  - Seller 2: $6 × 50% = $3 (reduced)
  - Seller 3: $4 × 50% = $2 (reduced)
  - **Total: $10 shipping**

### Configuration Options (Platform Settings):

```typescript
interface PlatformShippingSettings {
  // Free shipping threshold
  freeShippingThreshold: number;          // e.g., 50.00 (free if cart ≥ $50)
  freeShippingEnabled: boolean;            // Enable/disable free shipping
  
  // Multi-seller shipping logic
  additionalSellerDiscount: number;        // e.g., 0.5 (50% discount) OR 0 (no discount)
  additionalSellerFixedFee: number | null; // e.g., 2.00 (fixed $2 per additional) OR null
  
  // Maximum shipping cap
  maxShippingCap: number | null;           // e.g., 15.00 (max $15 total) OR null (no cap)
  maxShippingCapEnabled: boolean;          // Enable/disable cap
  
  // Strategy selection
  shippingStrategy: 'full_sum' | 'tiered_discount' | 'tiered_fixed' | 'highest_only' | 'average';
}
```

### Shipping Strategies Explained:

1. **`full_sum`** (Current - Not Recommended)
   - Sum all seller shipping fees
   - Example: 5 sellers × $5 = $25

2. **`tiered_discount`** (Recommended)
   - First seller: Full fee
   - Additional sellers: Apply discount percentage
   - Example: $5 + ($6×50%) + ($4×50%) + ($7×50%) = $5 + $3 + $2 + $3.5 = $13.5

3. **`tiered_fixed`** (Good Alternative)
   - First seller: Full fee
   - Additional sellers: Fixed reduced fee
   - Example: $5 + $2 + $2 + $2 + $2 = $13

4. **`highest_only`** (Simple)
   - Charge only the highest shipping fee among all sellers
   - Example: Max($5, $8, $6, $4, $7) = $8

5. **`average`** (Fair)
   - Charge average of all shipping fees
   - Example: ($5 + $8 + $6 + $4 + $7) / 5 = $6

## Implementation Plan

### Phase 1: Platform Settings Entity
- Create `PlatformSettings` entity
- Store shipping configuration
- Admin UI to manage settings

### Phase 2: Shipping Calculation Service
- Create `ShippingCalculationService`
- Implement all strategies
- Apply free shipping threshold logic
- Apply maximum cap logic

### Phase 3: Integration
- Update cart calculation
- Update order creation
- Update checkout UI to show breakdown

### Phase 4: Testing
- Test all scenarios
- Verify historical data preservation
- Test edge cases

## Recommended Default Settings

```typescript
{
  freeShippingThreshold: 50.00,      // Free shipping over $50
  freeShippingEnabled: true,
  shippingStrategy: 'tiered_discount',
  additionalSellerDiscount: 0.5,      // 50% off for additional sellers
  additionalSellerFixedFee: null,
  maxShippingCap: 15.00,              // Max $15 shipping
  maxShippingCapEnabled: true
}
```

## Benefits

✅ **Better Customer Experience**: Much cheaper shipping for multi-seller orders
✅ **Competitive**: Matches industry standards (Amazon, eBay, etc.)
✅ **Flexible**: Admin can adjust strategy based on business needs
✅ **Fair to Sellers**: First seller gets full fee, additional sellers get reduced but still compensated
✅ **Protects Platform**: Maximum cap prevents excessive shipping costs

