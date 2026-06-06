'use client';

import { useCallback } from 'react';

import { type CartItem, selectCartItemQuantity, useCartStore } from '@/entities/cart';

type AddToCartItem = Omit<CartItem, 'quantity'>;

type UseAddToCartResult = {
  quantity: number;
  addToCart: () => void;
};

export function useAddToCart(item: AddToCartItem): UseAddToCartResult {
  const addItem = useCartStore((state) => state.addItem);
  const quantity = useCartStore(selectCartItemQuantity(item.productId));

  const addToCart = useCallback(() => {
    addItem(item);
  }, [addItem, item]);

  return { quantity, addToCart };
}
