'use client';

import { type PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';

import { type AppStore, makeStore } from './store';

// Redux нужен только для server-state заказов (RTK Query), поэтому провайдер
// оборачивает лишь order-роуты (checkout/payment), а не весь app.
export function StoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
