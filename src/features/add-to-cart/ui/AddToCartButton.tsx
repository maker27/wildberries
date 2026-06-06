'use client';

import type { CartItem } from '@/entities/cart';
import { Button } from '@/shared/ui/button/Button';

import { useAddToCart } from '../model/useAddToCart';

type AddToCartButtonProps = {
  disabled?: boolean;
  fullWidth?: boolean;
  item: Omit<CartItem, 'quantity'>;
};

const stepperButtonClass =
  'add-to-cart__step flex h-11 w-11 items-center justify-center rounded-lg text-xl leading-none text-[#cb11ab] transition-colors hover:bg-white active:bg-white';

export function AddToCartButton({ disabled = false, fullWidth = true, item }: AddToCartButtonProps) {
  const { quantity, addToCart, increment, decrement } = useAddToCart(item);

  if (disabled) {
    return (
      <Button disabled fullWidth={fullWidth}>
        Нет в наличии
      </Button>
    );
  }

  if (quantity > 0) {
    return (
      <div className="add-to-cart add-to-cart--in-cart flex h-11 w-full items-center justify-between rounded-lg bg-[#f3e8f5]">
        <button
          aria-label="Уменьшить количество"
          className={stepperButtonClass}
          onClick={decrement}
          type="button"
        >
          −
        </button>
        <span className="add-to-cart__count text-base font-semibold text-[#1a1a1a]">{quantity}</span>
        <button
          aria-label="Увеличить количество"
          className={stepperButtonClass}
          onClick={increment}
          type="button"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <Button fullWidth={fullWidth} onClick={addToCart}>
      В корзину
    </Button>
  );
}
