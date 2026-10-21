import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore, type CartItem } from './customer-cart-store';

const baseItem = {
  productId: 'p1',
  productName: 'Shoe',
  productImage: null,
  quantity: 1,
  unitPrice: 100,
  color: 'Red',
  size: '42',
  sellerId: 's1',
  sellerName: 'Store',
  sellerShippingFee: 10,
  productInfoId: 'pi1',
  sellerProductId: 'sp1',
  availableStock: 5,
};

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.setState({
      items: [],
      isLoading: false,
      error: null,
      lastUpdated: null,
    });
  });

  it('adds a new item and computes total price', () => {
    useCartStore.getState().addItem(baseItem);
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].totalPrice).toBe(100);
    expect(useCartStore.getState().getTotalItems()).toBe(1);
    expect(useCartStore.getState().getTotalPrice()).toBe(100);
  });

  it('merges quantity when the same productInfo is added again and clamps to availableStock', () => {
    useCartStore.getState().addItem(baseItem);
    useCartStore.getState().addItem({ ...baseItem, quantity: 2 });
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
    expect(items[0].totalPrice).toBe(300);

    // Try adding more than availableStock (stock is 5, currently 3)
    useCartStore.getState().addItem({ ...baseItem, quantity: 5 });
    expect(useCartStore.getState().items[0].quantity).toBe(5);
    expect(useCartStore.getState().items[0].totalPrice).toBe(500);
  });

  it('updates and removes items, respecting availableStock limit', () => {
    useCartStore.getState().addItem(baseItem);
    const id = useCartStore.getState().items[0].id;
    useCartStore.getState().updateItemQuantity(id, 4);
    expect(useCartStore.getState().items[0].totalPrice).toBe(400);

    // Clamps to availableStock (5)
    useCartStore.getState().updateItemQuantity(id, 10);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
    expect(useCartStore.getState().items[0].totalPrice).toBe(500);

    useCartStore.getState().removeItem(id);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('clears the cart and tracks sellers', () => {
    useCartStore.getState().addItem(baseItem);
    useCartStore.getState().addItem({
      ...baseItem,
      productId: 'p2',
      productInfoId: 'pi2',
      sellerId: 's2',
      sellerName: 'Other',
    });
    expect(useCartStore.getState().getUniqueSellers()).toEqual(
      expect.arrayContaining(['s1', 's2'])
    );
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('looks up items by productInfo', () => {
    useCartStore.getState().addItem(baseItem);
    const found = useCartStore
      .getState()
      .getItemByProductInfo('p1', 'pi1') as CartItem;
    expect(found.productName).toBe('Shoe');
    expect(
      useCartStore.getState().getItemByProductInfo('missing', 'x')
    ).toBeUndefined();
  });

  it('keeps distinct line items for different size or color variants of the same product', () => {
    useCartStore.getState().addItem({ ...baseItem, size: '42', color: 'Black' });
    useCartStore.getState().addItem({ ...baseItem, size: '43', color: 'Black' });
    useCartStore.getState().addItem({ ...baseItem, size: '42', color: 'White' });

    const items = useCartStore.getState().items;
    expect(items).toHaveLength(3);
    expect(items.map((i) => `${i.size}-${i.color}`)).toEqual([
      '42-Black',
      '43-Black',
      '42-White',
    ]);
  });

  it('removes only the specified item when removing by id without affecting other items', () => {
    useCartStore.getState().addItem({ ...baseItem, size: '42' });
    useCartStore.getState().addItem({ ...baseItem, size: '43' });
    useCartStore.getState().addItem({ ...baseItem, size: '44' });

    const items = useCartStore.getState().items;
    expect(items).toHaveLength(3);

    const secondItemId = items[1].id;
    useCartStore.getState().removeItem(secondItemId);

    const remaining = useCartStore.getState().items;
    expect(remaining).toHaveLength(2);
    expect(remaining.find((i) => i.id === secondItemId)).toBeUndefined();
    expect(remaining[0].size).toBe('42');
    expect(remaining[1].size).toBe('44');
  });
});

