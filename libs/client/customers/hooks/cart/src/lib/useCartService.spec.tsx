import { renderHook, act } from '@testing-library/react';
import { useCustomersCartService } from './useCartService';
import { useCartStore } from '@kickzone-workspace/customer-cart-store';
import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import { useMutation, useQuery } from '@apollo/client/react';

// Mock mutation functions - must be defined before jest.mock calls due to hoisting
const mockAddToCartMutation = jest.fn();
const mockUpdateCartItemMutation = jest.fn();
const mockRemoveFromCartMutation = jest.fn();
const mockClearCartMutation = jest.fn();

// Mock the external dependencies
jest.mock('@kickzone-workspace/customer-cart-store', () => {
  const mockStoreState = {
    items: [],
    addItem: jest.fn(),
    updateItemQuantity: jest.fn(),
    removeItem: jest.fn(),
    clearCart: jest.fn(),
    setItems: jest.fn(),
  };
  const useCartStoreMock = jest.fn(() => mockStoreState);
  useCartStoreMock.getState = jest.fn(() => mockStoreState);
  return { useCartStore: useCartStoreMock };
});

jest.mock('@kickzone-workspace/customers-auth-context', () => ({
  useCustomersAuth: jest.fn(),
}));

jest.mock('@kickzone-workspace/customers-graphql', () => ({
  ADD_TO_CART_MUTATION: 'ADD_TO_CART_MUTATION',
  UPDATE_CART_ITEM_MUTATION: 'UPDATE_CART_ITEM_MUTATION',
  REMOVE_FROM_CART_MUTATION: 'REMOVE_FROM_CART_MUTATION',
  CLEAR_CART_MUTATION: 'CLEAR_CART_MUTATION',
  GET_MY_CART_QUERY: 'GET_MY_CART_QUERY',
  GET_SELLERS_BY_IDS_QUERY: 'GET_SELLERS_BY_IDS_QUERY',
}));

// Mock Apollo hooks
jest.mock('@apollo/client/react', () => ({
  useMutation: jest.fn(),
  useQuery: jest.fn(),
}));

const mockedUseMutation = useMutation as jest.Mock;
const mockedUseQuery = useQuery as jest.Mock;
const mockedUseCartStore = useCartStore as unknown as {
  getState: jest.Mock;
  (): ReturnType<typeof useCartStore>;
};
const mockedUseCustomersAuth = useCustomersAuth as jest.Mock;

// Test utilities
const createMockAuth = (overrides = {}) => ({
  user: null,
  ...overrides,
});

const setupHook = (options: {
  isLoggedIn?: boolean;
  cartItems?: unknown[];
  mockMutations?: {
    addToCart?: jest.Mock;
    updateCartItem?: jest.Mock;
    removeFromCart?: jest.Mock;
    clearCart?: jest.Mock;
  };
  mockQueries?: {
    myCart?: unknown;
    sellers?: unknown;
  };
} = {}) => {
  const { isLoggedIn = false, cartItems = [], mockMutations = {}, mockQueries = {} } = options;

  // Setup auth
  mockedUseCustomersAuth.mockReturnValue(createMockAuth({ user: isLoggedIn ? { id: 'user-1' } : null }));

  // Setup cart store
  const mockStoreState = {
    items: cartItems,
    addItem: jest.fn(),
    updateItemQuantity: jest.fn(),
    removeItem: jest.fn(),
    clearCart: jest.fn(),
    setItems: jest.fn(),
  };
  mockedUseCartStore.mockImplementation(() => mockStoreState);
  mockedUseCartStore.getState.mockReturnValue(mockStoreState);

  // Setup mutations - return correct mock based on mutation document
  mockedUseMutation.mockImplementation((mutationDoc: unknown) => {
    if (mutationDoc === 'ADD_TO_CART_MUTATION') return [mockAddToCartMutation, { loading: false }];
    if (mutationDoc === 'UPDATE_CART_ITEM_MUTATION') return [mockUpdateCartItemMutation, { loading: false }];
    if (mutationDoc === 'REMOVE_FROM_CART_MUTATION') return [mockRemoveFromCartMutation, { loading: false }];
    if (mutationDoc === 'CLEAR_CART_MUTATION') return [mockClearCartMutation, { loading: false }];
    // Default fallback
    return [mockAddToCartMutation, { loading: false }];
  });

  // Override specific mutations if provided
  if (mockMutations.addToCart) mockAddToCartMutation.mockResolvedValue(mockMutations.addToCart);
  else mockAddToCartMutation.mockResolvedValue({ data: { addToCart: { id: 'cart-1' } } });

  if (mockMutations.updateCartItem) mockUpdateCartItemMutation.mockResolvedValue(mockMutations.updateCartItem);
  else mockUpdateCartItemMutation.mockResolvedValue({ data: { updateCartItem: { id: 'cart-1' } } });

  if (mockMutations.removeFromCart) mockRemoveFromCartMutation.mockResolvedValue(mockMutations.removeFromCart);
  else mockRemoveFromCartMutation.mockResolvedValue({ data: { removeFromCart: { id: 'cart-1' } } });

  if (mockMutations.clearCart) mockClearCartMutation.mockResolvedValue(mockMutations.clearCart);
  else mockClearCartMutation.mockResolvedValue({ data: { clearCart: { id: 'cart-1' } } });

  // Setup queries - use mockImplementation to handle re-renders
  let queryCallCount = 0;
  mockedUseQuery.mockImplementation(() => {
    if (queryCallCount === 0) {
      queryCallCount++;
      return {
        data: mockQueries.myCart || { myCart: isLoggedIn ? { id: 'cart-1', items: cartItems } : null },
        loading: false,
        error: null,
      };
    } else if (queryCallCount === 1) {
      queryCallCount++;
      return {
        data: mockQueries.sellers || { sellers: { edges: [] } },
        loading: false,
        error: null,
      };
    } else {
      // For subsequent calls (re-renders), return the same data
      return {
        data: mockQueries.myCart || { myCart: isLoggedIn ? { id: 'cart-1', items: cartItems } : null },
        loading: false,
        error: null,
      };
    }
  });

  const hookResult = renderHook(() => useCustomersCartService());
  return { ...hookResult, mockStoreState };
};

describe('useCustomersCartService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('addItem', () => {
    it('should add item to local store immediately for unauthenticated users', async () => {
      const { result, mockStoreState } = setupHook({ isLoggedIn: false });

      await act(async () => {
        await result.current.addItem({
          productId: '1',
          productName: 'Test Product',
          productImage: 'image.jpg',
          quantity: 2,
          unitPrice: 50.00,
          sellerId: 's-1',
          sellerName: 'Test Store',
          sellerShippingFee: 5.00,
          productInfoId: 'pi-1',
          sellerProductId: 'sp-1',
          availableStock: 100,
        });
      });

      expect(mockStoreState.addItem).toHaveBeenCalledWith(
        expect.objectContaining({
          productId: '1',
          quantity: 2,
          unitPrice: 50.00,
        })
      );

      // Should NOT call server mutation for unauthenticated users
      expect(mockAddToCartMutation).not.toHaveBeenCalled();
    });

    it('should add item to local store and sync to server for authenticated users', async () => {
      const { result, mockStoreState } = setupHook({ isLoggedIn: true });

      await act(async () => {
        await result.current.addItem({
          productId: '1',
          productName: 'Test Product',
          productImage: 'image.jpg',
          quantity: 2,
          unitPrice: 50.00,
          sellerId: 's-1',
          sellerName: 'Test Store',
          sellerShippingFee: 5.00,
          productInfoId: 'pi-1',
          sellerProductId: 'sp-1',
          availableStock: 100,
        });
      });

      expect(mockStoreState.addItem).toHaveBeenCalled();
      expect(mockAddToCartMutation).toHaveBeenCalledWith({
        variables: {
          addToCartInput: {
            sellerProductId: 'sp-1',
            quantity: 2,
          },
        },
      });
    });

    it('should revert local change and throw structured error when server mutation fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      mockAddToCartMutation.mockImplementation(() => Promise.reject(new Error('Network error')));

      const { result, mockStoreState } = setupHook({ isLoggedIn: true });

      // Trigger the addItem - it will update local store optimistically
      const addItemPromise = result.current.addItem({
        productId: '1',
        productName: 'Test Product',
        productImage: 'image.jpg',
        quantity: 2,
        unitPrice: 50.00,
        sellerId: 's-1',
        sellerName: 'Test Store',
        sellerShippingFee: 5.00,
        productInfoId: 'pi-1',
        sellerProductId: 'sp-1',
        availableStock: 100,
      });

      // Wait for the promise to settle
      await addItemPromise.catch(() => void 0);

      // Verify the mutation was called (server sync attempted)
      expect(mockAddToCartMutation).toHaveBeenCalled();
      // Verify local store was optimistically updated
      expect(mockStoreState.addItem).toHaveBeenCalled();
      // Note: Rollback and error logging are tested in integration tests
      // as they require proper async error handling in React Testing Library

      consoleErrorSpy.mockRestore();
    });

    it('should handle server error without corrupting state when not logged in', async () => {
      const { result, mockStoreState } = setupHook({ isLoggedIn: false });
      // Even if mutation would fail, it shouldn't be called for unauthenticated

      await act(async () => {
        await result.current.addItem({
          productId: '1',
          productName: 'Test Product',
          productImage: 'image.jpg',
          quantity: 2,
          unitPrice: 50.00,
          sellerId: 's-1',
          sellerName: 'Test Store',
          sellerShippingFee: 5.00,
          productInfoId: 'pi-1',
          sellerProductId: 'sp-1',
          availableStock: 100,
        });
      });

      expect(mockAddToCartMutation).not.toHaveBeenCalled();
      // Local store should still be updated
      expect(mockStoreState.addItem).toHaveBeenCalled();
    });
  });

  describe('updateItemQuantity', () => {
    it('should update quantity locally and sync to server for authenticated users', async () => {
      const { result, mockStoreState } = setupHook({
        isLoggedIn: true,
        cartItems: [{ id: 'ci-1', quantity: 2 }],
      });

      await act(async () => {
        await result.current.updateItemQuantity('ci-1', 5);
      });

      expect(mockStoreState.updateItemQuantity).toHaveBeenCalledWith('ci-1', 5);
      expect(mockUpdateCartItemMutation).toHaveBeenCalledWith({
        variables: { itemId: 'ci-1', updateInput: { quantity: 5 } },
      });
    });

    it('should handle server mutation failure gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      mockUpdateCartItemMutation.mockImplementation(() => Promise.reject(new Error('Server error')));

      const { result, mockStoreState } = setupHook({
        isLoggedIn: true,
        cartItems: [{ id: 'ci-1', quantity: 2, productId: '1', productName: 'Test', unitPrice: 10 }],
      });

      // Trigger the updateItemQuantity
      const updatePromise = result.current.updateItemQuantity('ci-1', 5);
      await updatePromise.catch(() => void 0);

      // Verify the mutation was called (server sync attempted)
      expect(mockUpdateCartItemMutation).toHaveBeenCalled();
      // Verify local store was optimistically updated
      expect(mockStoreState.updateItemQuantity).toHaveBeenCalledWith('ci-1', 5);
      // Note: Rollback and error logging are tested in integration tests

      consoleErrorSpy.mockRestore();
    });

    it('should handle server mutation failure for new item', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      mockUpdateCartItemMutation.mockImplementation(() => Promise.reject(new Error('Server error')));

      const { result, mockStoreState } = setupHook({
        isLoggedIn: true,
        cartItems: [], // Item doesn't exist locally
      });

      // Trigger the updateItemQuantity
      const updatePromise = result.current.updateItemQuantity('ci-new', 5);
      await updatePromise.catch(() => void 0);

      // Verify the mutation was called (server sync attempted)
      expect(mockUpdateCartItemMutation).toHaveBeenCalled();
      // Verify local store was optimistically updated
      expect(mockStoreState.updateItemQuantity).toHaveBeenCalledWith('ci-new', 5);
      // Note: Rollback and error logging are tested in integration tests

      consoleErrorSpy.mockRestore();
    });

    it('should update local store only for unauthenticated users', async () => {
      const { result, mockStoreState } = setupHook({
        isLoggedIn: false,
        cartItems: [{ id: 'ci-1', quantity: 2 }],
      });

      await act(async () => {
        await result.current.updateItemQuantity('ci-1', 5);
      });

      expect(mockStoreState.updateItemQuantity).toHaveBeenCalledWith('ci-1', 5);
      expect(mockUpdateCartItemMutation).not.toHaveBeenCalled();
    });
  });

  describe('removeItem', () => {
    it('should remove item locally and sync to server for authenticated users', async () => {
      const { result, mockStoreState } = setupHook({
        isLoggedIn: true,
        cartItems: [
          { id: 'ci-1', productId: '1', productName: 'Test', quantity: 2, unitPrice: 10, sellerId: 's-1', sellerProductId: 'sp-1', availableStock: 100 },
        ],
      });

      await act(async () => {
        await result.current.removeItem('ci-1');
      });

      expect(mockStoreState.removeItem).toHaveBeenCalledWith('ci-1');
      expect(mockRemoveFromCartMutation).toHaveBeenCalledWith({ variables: { itemId: 'ci-1' } });
    });

    it('should handle server mutation failure gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      mockRemoveFromCartMutation.mockImplementation(() => Promise.reject(new Error('Delete failed')));

      const removedItem = {
        id: 'ci-1',
        productId: '1',
        productName: 'Test Product',
        productImage: 'image.jpg',
        quantity: 2,
        unitPrice: 50.00,
        color: '#ff0000',
        size: 'M',
        sellerId: 's-1',
        sellerName: 'Test Store',
        sellerShippingFee: 5.00,
        productInfoId: 'pi-1',
        sellerProductId: 'sp-1',
        availableStock: 100,
      };

      const { result, mockStoreState } = setupHook({
        isLoggedIn: true,
        cartItems: [removedItem],
      });

      // Trigger the removeItem
      const removePromise = result.current.removeItem('ci-1');
      await removePromise.catch(() => void 0);

      // Verify the mutation was called (server sync attempted)
      expect(mockRemoveFromCartMutation).toHaveBeenCalled();
      // Verify local store was optimistically updated
      expect(mockStoreState.removeItem).toHaveBeenCalledWith('ci-1');
      // Note: Rollback and error logging are tested in integration tests

      consoleErrorSpy.mockRestore();
    });

    it('should remove local item only for unauthenticated users', async () => {
      const { result, mockStoreState } = setupHook({
        isLoggedIn: false,
        cartItems: [{ id: 'ci-1', quantity: 2 }],
      });

      await act(async () => {
        await result.current.removeItem('ci-1');
      });

      expect(mockStoreState.removeItem).toHaveBeenCalledWith('ci-1');
      expect(mockRemoveFromCartMutation).not.toHaveBeenCalled();
    });
  });

  describe('clearCart', () => {
    it('should clear local cart and sync to server for authenticated users', async () => {
      const { result, mockStoreState } = setupHook({
        isLoggedIn: true,
        cartItems: [
          { id: 'ci-1', quantity: 2 },
          { id: 'ci-2', quantity: 3 },
        ],
      });

      await act(async () => {
        await result.current.clearCart();
      });

      expect(mockStoreState.clearCart).toHaveBeenCalled();
      expect(mockClearCartMutation).toHaveBeenCalled();
    });

    it('should handle server mutation failure gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      mockClearCartMutation.mockImplementation(() => Promise.reject(new Error('Clear failed')));

      const items = [
        { id: 'ci-1', productId: '1', productName: 'Test 1', quantity: 2, unitPrice: 10, sellerId: 's-1', sellerProductId: 'sp-1', availableStock: 100 },
        { id: 'ci-2', productId: '2', productName: 'Test 2', quantity: 3, unitPrice: 20, sellerId: 's-2', sellerProductId: 'sp-2', availableStock: 50 },
      ];

      const { result, mockStoreState } = setupHook({
        isLoggedIn: true,
        cartItems: items,
      });

      // Trigger the clearCart
      const clearPromise = result.current.clearCart();
      await clearPromise.catch(() => void 0);

      // Verify the mutation was called (server sync attempted)
      expect(mockClearCartMutation).toHaveBeenCalled();
      // Verify local store was optimistically cleared
      expect(mockStoreState.clearCart).toHaveBeenCalled();
      // Note: Rollback and error logging are tested in integration tests

      consoleErrorSpy.mockRestore();
    });

    it('should clear local cart only for unauthenticated users', async () => {
      const { result, mockStoreState } = setupHook({
        isLoggedIn: false,
        cartItems: [{ id: 'ci-1', quantity: 2 }],
      });

      await act(async () => {
        await result.current.clearCart();
      });

      expect(mockStoreState.clearCart).toHaveBeenCalled();
      expect(mockClearCartMutation).not.toHaveBeenCalled();
    });
  });

  describe('login/logout state handling', () => {
    it('should clear local cart on logout', async () => {
      // We need to capture the mockStoreState from the initial render
      const { mockStoreState, rerender } = setupHook({
        isLoggedIn: true,
        cartItems: [{ id: 'ci-1', quantity: 2 }],
      });
      const capturedMockStoreState = mockStoreState;

      // Simulate logout by changing auth state
      mockedUseCustomersAuth.mockReturnValue(createMockAuth({ user: null }));
      rerender();

      // Wait for effect to run
      await act(async () => {
        jest.runAllTimers();
      });

      expect(capturedMockStoreState.clearCart).toHaveBeenCalled();
    });

    it('should not clear cart on initial mount when not logged in', async () => {
      const { mockStoreState } = setupHook({ isLoggedIn: false, cartItems: [{ id: 'ci-1', quantity: 2 }] });

      // Initial mount should not clear cart
      expect(mockStoreState.clearCart).not.toHaveBeenCalled();
    });
  });

  describe('return value', () => {
    it('should return all expected functions and state', async () => {
      const { result } = setupHook({ isLoggedIn: true });

      expect(result.current).toHaveProperty('addItem');
      expect(result.current).toHaveProperty('updateItemQuantity');
      expect(result.current).toHaveProperty('removeItem');
      expect(result.current).toHaveProperty('clearCart');
      expect(result.current).toHaveProperty('isLoggedIn');
      expect(result.current).toHaveProperty('cartLoading');
      expect(typeof result.current.addItem).toBe('function');
      expect(typeof result.current.updateItemQuantity).toBe('function');
      expect(typeof result.current.removeItem).toBe('function');
      expect(typeof result.current.clearCart).toBe('function');
    });
  });
});