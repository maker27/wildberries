'use client';

import { type PropsWithChildren, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

import { type CartProduct, useCartStore } from '@/entities/cart';
import { useUserStore } from '@/entities/user';
import { type AppStore, makeStore } from '@/shared/api/store';

type ProvidersProps = PropsWithChildren<{
  cartProducts: CartProduct[];
}>;

export function Providers({ cartProducts, children }: ProvidersProps) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const rehydrateCart = async () => {
      await useCartStore.persist.rehydrate();
      useCartStore.getState().syncWithProducts(cartProducts);
    };

    void rehydrateCart();
    void useUserStore.persist.rehydrate();
  }, [cartProducts]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
