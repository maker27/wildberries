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
      className="remove-from-cart text-sm text-[#999] transition-colors hover:text-[#e53935]"
      onClick={() => removeItem(productId)}
      type="button"
    >
      Удалить
    </button>
  );
}
