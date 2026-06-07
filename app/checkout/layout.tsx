import type { PropsWithChildren } from 'react';

import { StoreProvider } from '@/shared/api/StoreProvider';

// Checkout создаёт заказ через RTK Query — здесь нужен Redux-стор.
export default function CheckoutLayout({ children }: PropsWithChildren) {
  return <StoreProvider>{children}</StoreProvider>;
}
