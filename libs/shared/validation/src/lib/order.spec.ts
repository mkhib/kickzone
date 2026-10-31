import {
  ORDER_STATUSES,
  createOrderSchema,
  shippingAddressSchema,
  updateOrderSchema,
  updateOrderStatusSchema,
} from './order';

const shipping = {
  customerName: 'Ali Rezaei',
  customerEmail: '',
  customerPhone: '+98 912 123 4567',
  shippingAddress: 'Valiasr St, No 12',
  city: 'Tehran',
  state: 'Tehran',
  zipCode: '1234567890',
  country: 'Iran',
};

const item = {
  productId: '101',
  sellerProductId: '301',
  productName: 'Air Jordan 1',
  productImage: null,
  quantity: 2,
  unitPrice: 100,
  totalPrice: 200,
  color: 'Black',
  size: '42',
};

const order = { ...shipping, sellerId: 1, items: [item], notes: '', shippingCost: 0 };

describe('shippingAddressSchema', () => {
  it('accepts a valid address with an empty optional email', () => {
    expect(shippingAddressSchema.safeParse(shipping).success).toBe(true);
  });

  it('accepts Farsi letters in name, city and state', () => {
    const fa = { ...shipping, customerName: 'علی رضایی', city: 'تهران', state: 'تهران' };
    expect(shippingAddressSchema.safeParse(fa).success).toBe(true);
  });

  it('accepts a valid email and keeps its case', () => {
    const r = shippingAddressSchema.parse({ ...shipping, customerEmail: ' Ali@Example.com ' });
    expect(r.customerEmail).toBe('Ali@Example.com');
  });

  it.each([
    ['customerName', 'A'],
    ['customerName', 'Ali123'],
    ['customerEmail', 'not-an-email'],
    ['customerPhone', '12'],
    ['customerPhone', 'abc-defg-hij'],
    ['shippingAddress', 'ab'],
    ['city', 'T1'],
    ['state', ''],
    ['zipCode', '12'],
    ['zipCode', '12#45'],
    ['country', 'I'],
  ])('rejects invalid %s=%j', (field, value) => {
    expect(shippingAddressSchema.safeParse({ ...shipping, [field]: value }).success).toBe(false);
  });

  it('trims surrounding whitespace', () => {
    const r = shippingAddressSchema.parse({ ...shipping, city: '  Tehran  ' });
    expect(r.city).toBe('Tehran');
  });
});

describe('createOrderSchema', () => {
  it('accepts a valid order, including a guest-token note', () => {
    const r = createOrderSchema.safeParse({ ...order, notes: '[GuestToken: abc]' });
    expect(r.success).toBe(true);
  });

  it('rejects an order without items', () => {
    expect(createOrderSchema.safeParse({ ...order, items: [] }).success).toBe(false);
  });

  it('rejects sellerId 0, negative shipping cost and negative prices', () => {
    expect(createOrderSchema.safeParse({ ...order, sellerId: 0 }).success).toBe(false);
    expect(createOrderSchema.safeParse({ ...order, shippingCost: -1 }).success).toBe(false);
    expect(
      createOrderSchema.safeParse({ ...order, items: [{ ...item, unitPrice: -5 }] }).success
    ).toBe(false);
  });

  it('rejects item quantity 0 and above the cart cap', () => {
    expect(createOrderSchema.safeParse({ ...order, items: [{ ...item, quantity: 0 }] }).success).toBe(false);
    expect(createOrderSchema.safeParse({ ...order, items: [{ ...item, quantity: 1000 }] }).success).toBe(false);
  });

  it('allows a missing shipping cost and notes', () => {
    const { notes: _n, shippingCost: _s, ...rest } = order;
    expect(createOrderSchema.safeParse(rest).success).toBe(true);
  });
});

describe('updateOrderSchema', () => {
  it('accepts an empty patch and all-null fields', () => {
    expect(updateOrderSchema.safeParse({}).success).toBe(true);
    expect(
      updateOrderSchema.safeParse({ city: null, notes: null, trackingNumber: null, items: null }).success
    ).toBe(true);
  });

  it('keeps items so the resolver can still reject item rewrites', () => {
    const r = updateOrderSchema.parse({ items: [item] });
    expect(r.items).toHaveLength(1);
  });

  it('rejects an invalid field in the patch', () => {
    expect(updateOrderSchema.safeParse({ zipCode: '1' }).success).toBe(false);
    expect(updateOrderSchema.safeParse({ trackingNumber: '' }).success).toBe(false);
  });
});

describe('updateOrderStatusSchema', () => {
  it('accepts every known status', () => {
    for (const status of ORDER_STATUSES) {
      expect(updateOrderStatusSchema.safeParse({ id: 'o-1', status }).success).toBe(true);
    }
  });

  it('rejects unknown status and empty id', () => {
    expect(updateOrderStatusSchema.safeParse({ id: 'o-1', status: 'LOST' }).success).toBe(false);
    expect(updateOrderStatusSchema.safeParse({ id: ' ', status: 'PENDING' }).success).toBe(false);
  });
});
