'use client';

import Link from 'next/link';

import type { CartItem } from '@/entities/cart';
import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button/Button';

import { useAddToCart } from '../model/useAddToCart';

type AddToCartButtonProps = {
  fullWidth?: boolean;
  item: Omit<CartItem, 'quantity'>;
};

export function AddToCartButton({ fullWidth = true, item }: AddToCartButtonProps) {
  const { quantity, addToCart } = useAddToCart(item);

  if (quantity > 0) {
    return (
      <div className="add-to-cart flex items-center gap-2">
        <Button fullWidth={fullWidth} onClick={addToCart} variant="secondary">
          В корзине: {quantity}
        </Button>
        <Link
          className="add-to-cart__link text-sm font-medium text-[#cb11ab] hover:underline"
          href={routes.cart}
        >
          Открыть
        </Link>
      </div>
    );
  }

  return (
    <Button fullWidth={fullWidth} onClick={addToCart}>
      В корзину
    </Button>
  );
}
