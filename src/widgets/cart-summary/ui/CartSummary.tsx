'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { selectCartCount, selectCartTotal, useCartStore } from '@/entities/cart';
import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button/Button';
import { Price } from '@/shared/ui/price/Price';

export function CartSummary() {
  const total = useCartStore(selectCartTotal);
  const count = useCartStore(selectCartCount);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => setIsHydrated(true), []);

  if (!isHydrated || count === 0) {
    return null;
  }

  return (
    <aside className="cart-summary flex w-full shrink-0 flex-col gap-4 rounded-xl bg-white p-6 shadow-sm lg:w-80">
      <h2 className="cart-summary__title text-fg text-lg font-semibold">Итого</h2>
      <div className="cart-summary__row text-muted flex items-center justify-between text-sm">
        <span>Товаров</span>
        <span>{count}</span>
      </div>
      <div className="cart-summary__row flex items-center justify-between">
        <span className="text-muted">Сумма</span>
        <Price className="cart-summary__total text-fg text-xl font-bold" value={total} />
      </div>
      <Link href={routes.checkout}>
        <Button fullWidth size="lg">
          Оформить заказ
        </Button>
      </Link>
    </aside>
  );
}
