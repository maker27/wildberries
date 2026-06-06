import { notFound } from 'next/navigation';

import { getOrder } from '@/server/data/orders';
import { OrderTracking } from '@/widgets/order-tracking';
import { Container } from '@/shared/ui/container/Container';

type OrderTrackingPageProps = {
  orderId: string;
};

export function OrderTrackingPage({ orderId }: OrderTrackingPageProps) {
  const order = getOrder(orderId);

  if (!order) {
    notFound();
  }

  return (
    <Container className="order-tracking-page py-6">
      <OrderTracking order={order} />
    </Container>
  );
}
