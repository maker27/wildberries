import type { PropsWithChildren } from 'react';

import { StoreProvider } from '@/shared/api/StoreProvider';

// Оплата заказа идёт через RTK Query — здесь нужен Redux-стор.
export default function PaymentLayout({ children }: PropsWithChildren) {
  return <StoreProvider>{children}</StoreProvider>;
}
