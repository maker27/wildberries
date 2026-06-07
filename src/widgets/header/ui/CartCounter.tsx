'use client';

import { selectCartCount, useCartStore } from '@/entities/cart';

// Островок: счётчик корзины из Zustand. Бейдж позиционируется absolute, чтобы
// его появление после rehydrate не двигало соседние элементы (нет CLS).
export function CartCounter() {
  const cartCount = useCartStore(selectCartCount);

  if (cartCount <= 0) {
    return null;
  }

  return (
    <span className="header__cart-count absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#cb11ab] px-1 text-[10px] leading-none font-medium text-white">
      {cartCount}
    </span>
  );
}
