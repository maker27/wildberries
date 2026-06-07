'use client';

import { type PropsWithChildren, useEffect } from 'react';

import { useCartStore } from '@/entities/cart';
import { useUserStore } from '@/entities/user';

// Сторы созданы со skipHydration — на клиенте их надо рехидрировать вручную.
// Нужно глобально: Header показывает счётчик корзины и пользователя на всех роутах.
// Синк корзины с каталогом вынесен на /cart, чтобы не читать БД на каждом роуте.
export function StoreRehydrator({ children }: PropsWithChildren) {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
    void useUserStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
