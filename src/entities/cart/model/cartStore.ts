import { createPersistedStore } from '@/shared/lib/storage/createPersistedStore';

import type { CartState } from './types';

const CART_STORAGE_KEY = 'wb-cart';
const MIN_QUANTITY = 1;

export const useCartStore = createPersistedStore<CartState>(
  (set) => ({
    items: [],

    addItem: (item) =>
      set((state) => {
        const existing = state.items.find((cartItem) => cartItem.productId === item.productId);

        if (existing) {
          return {
            items: state.items.map((cartItem) =>
              cartItem.productId === item.productId
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem,
            ),
          };
        }

        return { items: [...state.items, { ...item, quantity: MIN_QUANTITY }] };
      }),

    removeItem: (productId) =>
      set((state) => ({
        items: state.items.filter((cartItem) => cartItem.productId !== productId),
      })),

    updateQuantity: (productId, quantity) =>
      set((state) => {
        if (quantity < MIN_QUANTITY) {
          return {
            items: state.items.filter((cartItem) => cartItem.productId !== productId),
          };
        }

        return {
          items: state.items.map((cartItem) =>
            cartItem.productId === productId ? { ...cartItem, quantity } : cartItem,
          ),
        };
      }),

    clearCart: () => set({ items: [] }),
  }),
  {
    name: CART_STORAGE_KEY,
    partialize: (state) => ({ items: state.items }),
  },
);
