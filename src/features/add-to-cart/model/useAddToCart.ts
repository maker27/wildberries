'use client';

import { useCallback } from 'react';

import { type CartItem, selectCartItemQuantity, useCartStore } from '@/entities/cart';

type AddToCartItem = Omit<CartItem, 'quantity'>;

type UseAddToCartResult = {
  quantity: number;
  addToCart: () => void;
  increment: () => void;
  decrement: () => void;
};

export function useAddToCart(item: AddToCartItem): UseAddToCartResult {
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const quantity = useCartStore(selectCartItemQuantity(item.productId));

  const addToCart = useCallback(() => {
    addItem(item);
  }, [addItem, item]);

  const increment = useCallback(() => {
    updateQuantity(item.productId, quantity + 1);
  }, [updateQuantity, item.productId, quantity]);

  const decrement = useCallback(() => {
    updateQuantity(item.productId, quantity - 1);
  }, [updateQuantity, item.productId, quantity]);

  return { quantity, addToCart, increment, decrement };
}
