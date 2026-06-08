'use client';

import { useCartStore } from '@/entities/cart';

type RemoveFromCartButtonProps = {
  productId: string;
};

export function RemoveFromCartButton({ productId }: RemoveFromCartButtonProps) {
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <button
      aria-label="Удалить товар из корзины"
      className="remove-from-cart text-subtle hover:text-error text-sm transition-colors"
      onClick={() => removeItem(productId)}
      type="button"
    >
      Удалить
    </button>
  );
}
