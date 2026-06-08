'use client';

import { useCartStore } from '@/entities/cart';
import { cn } from '@/shared/lib/cn/cn';

type CartQuantityControlProps = {
  productId: string;
  quantity: number;
};

const buttonClass =
  'cart-quantity__button flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white text-lg leading-none text-fg transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-40';

export function CartQuantityControl({ productId, quantity }: CartQuantityControlProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <div className={cn('cart-quantity flex items-center gap-2')}>
      <button
        aria-label="Уменьшить количество"
        className={buttonClass}
        onClick={() => updateQuantity(productId, quantity - 1)}
        type="button"
      >
        −
      </button>
      <span className="cart-quantity__value w-8 text-center text-sm font-medium">{quantity}</span>
      <button
        aria-label="Увеличить количество"
        className={buttonClass}
        onClick={() => updateQuantity(productId, quantity + 1)}
        type="button"
      >
        +
      </button>
    </div>
  );
}
