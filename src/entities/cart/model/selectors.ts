import type { CartItem, CartState } from './types';

export const selectCartItems = (state: CartState): CartItem[] => state.items;

export const selectCartTotal = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectCartCount = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartItemQuantity =
  (productId: string) =>
  (state: CartState): number =>
    state.items.find((item) => item.productId === productId)?.quantity ?? 0;
