'use client';

import { useEffect } from 'react';

import type { CartProduct } from '../model/types';
import { useCartStore } from '../model/cartStore';

type CartSyncProps = {
  products: CartProduct[];
};

// Подтягивает актуальные название/цену/картинку из каталога и выкидывает
// товары, которых больше нет. Делаем только на /cart, а не на каждом роуте.
// rehydrate идемпотентен — гарантирует, что синк идёт после восстановления стора.
export function CartSync({ products }: CartSyncProps) {
  useEffect(() => {
    const sync = async () => {
      await useCartStore.persist.rehydrate();
      useCartStore.getState().syncWithProducts(products);
    };

    void sync();
  }, [products]);

  return null;
}
