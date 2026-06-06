'use client';

import { type PropsWithChildren, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

import { useCartStore } from '@/entities/cart';
import { useUserStore } from '@/entities/user';
import { type AppStore, makeStore } from '@/shared/api/store';

export function Providers({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    void useCartStore.persist.rehydrate();
    void useUserStore.persist.rehydrate();
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
