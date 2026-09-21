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

  it('merges quantity when the same productInfo is added again', () => {
    useCartStore.getState().addItem(baseItem);
    useCartStore.getState().addItem({ ...baseItem, quantity: 2 });
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
    expect(items[0].totalPrice).toBe(300);
  });

  it('updates and removes items', () => {
    useCartStore.getState().addItem(baseItem);
    const id = useCartStore.getState().items[0].id;
    useCartStore.getState().updateItemQuantity(id, 4);
    expect(useCartStore.getState().items[0].totalPrice).toBe(400);
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
});
