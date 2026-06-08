import { notFound } from 'next/navigation';
import Link from 'next/link';

import { getOrder } from '@/server/data/orders';
import { FakePaymentButton } from '@/features/fake-payment';
import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button/Button';
import { Container } from '@/shared/ui/container/Container';
import { Price } from '@/shared/ui/price/Price';

type PaymentPageProps = {
  orderId: string;
};

export function PaymentPage({ orderId }: PaymentPageProps) {
  const order = getOrder(orderId);

  if (!order) {
    notFound();
  }

  const isPaid = Boolean(order.paidAt);

  return (
    <Container className="payment-page py-6">
      <div className="payment-page__card mx-auto flex max-w-md flex-col gap-4 rounded-xl bg-white p-8 shadow-sm">
        <h1 className="payment-page__title text-fg text-2xl font-bold">Оплата заказа</h1>
        <div className="payment-page__amount flex items-center justify-between">
          <span className="text-muted">К оплате</span>
          <Price className="text-fg text-2xl font-bold" value={order.totalPrice} />
        </div>

        {isPaid ? (
          <div className="payment-page__paid flex flex-col gap-3">
            <p className="text-success text-sm">Заказ уже оплачен.</p>
            <Link href={routes.orderTracking(order.id)}>
              <Button fullWidth size="lg">
                Отслеживать заказ
              </Button>
            </Link>
          </div>
        ) : (
          <FakePaymentButton orderId={order.id} />
        )}
      </div>
    </Container>
  );
}
