import { describe, it, expect, beforeEach } from 'vitest';
import {
  useWishlistStore,
  useWishlistItems,
  useWishlistCount,
  useIsFavorite,
  WishlistItem,
} from './customer-wishlist-store';
import { renderHook, act } from '@testing-library/react';

const mockItem1: WishlistItem = {
  id: 101,
  name: 'Oversized Silk Blend Hoodie',
  brand: 'SAINTBALA',
  price: 450,
  productCode: 'SB-HD-001',
};

const mockItem2: WishlistItem = {
  id: 102,
  name: 'Monogram Technical Runner',
  brand: 'SAINTBALA',
  price: 680,
  productCode: 'SB-RN-002',
};

describe('customer-wishlist-store', () => {
  beforeEach(() => {
    useWishlistStore.setState({
      items: [],
      isLoading: false,
      error: null,
      lastUpdated: null,
    });
  });

  it('starts with an empty items array', () => {
    const state = useWishlistStore.getState();
    expect(state.items).toEqual([]);
    expect(state.isItemFavorite(101)).toBe(false);
  });

  it('adds an item safely and prevents duplicate additions', () => {
    useWishlistStore.getState().addItem(mockItem1);
    expect(useWishlistStore.getState().items).toHaveLength(1);
    expect(useWishlistStore.getState().isItemFavorite(101)).toBe(true);

    // Re-adding same item should not duplicate
    useWishlistStore.getState().addItem(mockItem1);
    expect(useWishlistStore.getState().items).toHaveLength(1);
  });

  it('removes an item by id', () => {
    useWishlistStore.getState().addItem(mockItem1);
    useWishlistStore.getState().addItem(mockItem2);
    expect(useWishlistStore.getState().items).toHaveLength(2);

    useWishlistStore.getState().removeItem(101);
    expect(useWishlistStore.getState().items).toHaveLength(1);
    expect(useWishlistStore.getState().isItemFavorite(101)).toBe(false);
    expect(useWishlistStore.getState().isItemFavorite(102)).toBe(true);
  });

  it('toggles an item between added and removed', () => {
    useWishlistStore.getState().toggleItem(mockItem1);
    expect(useWishlistStore.getState().isItemFavorite(101)).toBe(true);

    useWishlistStore.getState().toggleItem(mockItem1);
    expect(useWishlistStore.getState().isItemFavorite(101)).toBe(false);
  });

  it('clears all items in the wishlist', () => {
    useWishlistStore.getState().addItem(mockItem1);
    useWishlistStore.getState().addItem(mockItem2);
    expect(useWishlistStore.getState().items).toHaveLength(2);

    useWishlistStore.getState().clearWishlist();
    expect(useWishlistStore.getState().items).toEqual([]);
  });

  it('handles null, undefined, and malformed inputs defensively without throwing', () => {
    // @ts-expect-error test invalid invocation
    useWishlistStore.getState().addItem(null);
    // @ts-expect-error test invalid invocation
    useWishlistStore.getState().addItem(undefined);
    // @ts-expect-error test item without id
    useWishlistStore.getState().addItem({ name: 'No ID' });

    expect(useWishlistStore.getState().items).toEqual([]);

    // @ts-expect-error test invalid invocation
    useWishlistStore.getState().removeItem(null);
    // @ts-expect-error test invalid invocation
    useWishlistStore.getState().removeItem(undefined);
    // @ts-expect-error test invalid invocation
    expect(useWishlistStore.getState().isItemFavorite(null)).toBe(false);
    // @ts-expect-error test invalid invocation
    expect(useWishlistStore.getState().isItemFavorite(undefined)).toBe(false);
  });

  it('hook selectors return defensive defaults when state has empty or corrupted items', () => {
    const { result: itemsResult } = renderHook(() => useWishlistItems());
    const { result: countResult } = renderHook(() => useWishlistCount());
    const { result: isFavResult } = renderHook(() => useIsFavorite(101));

    expect(itemsResult.current).toEqual([]);
    expect(countResult.current).toBe(0);
    expect(isFavResult.current).toBe(false);

    act(() => {
      useWishlistStore.getState().addItem(mockItem1);
    });

    expect(itemsResult.current).toHaveLength(1);
    expect(countResult.current).toBe(1);
    expect(isFavResult.current).toBe(true);
  });
});
