import {
  createSellerProductSchema,
  createSellerSchema,
  sellerProductFormSchema,
  updateSellerProductSchema,
  updateSellerSchema,
} from './seller';

describe('seller schemas', () => {
  const seller = {
    name: 'Ali',
    lastName: 'Rezaei',
    username: 'ali',
    email: 'ali@example.com',
    password: 'secret123',
    storeName: 'Ali Kicks',
  };

  it('accepts a valid seller and optional fields as null', () => {
    expect(createSellerSchema.safeParse({ ...seller, phone: null, shippingFee: 5 }).success).toBe(true);
    expect(updateSellerSchema.safeParse({ id: 1, email: null, isActive: false }).success).toBe(true);
  });

  it('rejects missing required seller fields and bad emails', () => {
    expect(createSellerSchema.safeParse({ ...seller, storeName: '' }).success).toBe(false);
    expect(createSellerSchema.safeParse({ ...seller, email: 'nope' }).success).toBe(false);
    expect(updateSellerSchema.safeParse({ id: 1, email: 'nope' }).success).toBe(false);
  });

  const product = { productInfoId: 3, price: 150, costPrice: 0, discount: 10, stockQuantity: 0 };

  it('mirrors the seller product limits', () => {
    expect(createSellerProductSchema.safeParse(product).success).toBe(true);
    expect(createSellerProductSchema.safeParse({ ...product, price: 0 }).success).toBe(false);
    expect(createSellerProductSchema.safeParse({ ...product, discount: 101 }).success).toBe(false);
    expect(createSellerProductSchema.safeParse({ ...product, stockQuantity: 1.5 }).success).toBe(false);
    expect(updateSellerProductSchema.safeParse({ id: 'sp1', stockQuantity: 0 }).success).toBe(true);
    expect(updateSellerProductSchema.safeParse({ id: '' }).success).toBe(false);
  });

  it('the editor form also requires a positive cost price', () => {
    expect(sellerProductFormSchema.safeParse(product).success).toBe(false);
    expect(sellerProductFormSchema.safeParse({ ...product, costPrice: 100 }).success).toBe(true);
  });
});