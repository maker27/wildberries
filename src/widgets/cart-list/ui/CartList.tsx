'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { selectCartItems, useCartStore } from '@/entities/cart';
import { RemoveFromCartButton } from '@/features/remove-from-cart';
import { CartQuantityControl } from '@/features/update-cart-item';
import { routes } from '@/shared/config/routes';
import { Price } from '@/shared/ui/price/Price';
import { Spinner } from '@/shared/ui/spinner/Spinner';
import { EmptyState } from '@/shared/ui/empty-state/EmptyState';
import { Button } from '@/shared/ui/button/Button';

export function CartList() {
  const items = useCartStore(selectCartItems);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => setIsHydrated(true), []);

  if (!isHydrated) {
    return (
      <div className="cart-list flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        action={
          <Link href={routes.home}>
            <Button>В каталог</Button>
          </Link>
        }
        description="Добавьте товары из каталога, чтобы оформить заказ."
        title="Корзина пуста"
      />
    );
  }

  return (
    <ul className="cart-list flex flex-col gap-3">
      {items.map((item) => (
        <li
          className="cart-list__item flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm"
          key={item.productId}
        >
          <Link className="cart-list__image relative h-20 w-20 shrink-0 overflow-hidden rounded-lg" href={routes.product(item.productId)}>
            <Image alt={item.title} className="object-cover" fill sizes="80px" src={item.image} />
          </Link>

          <div className="cart-list__info flex flex-1 flex-col gap-1">
            <Link className="cart-list__title text-sm font-medium text-[#1a1a1a] hover:text-[#cb11ab]" href={routes.product(item.productId)}>
              {item.title}
            </Link>
            <Price className="cart-list__price text-base font-bold" value={item.price * item.quantity} />
            <RemoveFromCartButton productId={item.productId} />
          </div>

          <CartQuantityControl productId={item.productId} quantity={item.quantity} />
        </li>
      ))}
    </ul>
  );
}
