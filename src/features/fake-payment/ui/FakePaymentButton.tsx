'use client';

import { useRouter } from 'next/navigation';

import { usePayOrderMutation } from '@/entities/order';
import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button/Button';

type FakePaymentButtonProps = {
  orderId: string;
};

export function FakePaymentButton({ orderId }: FakePaymentButtonProps) {
  const router = useRouter();
  const [payOrder, { isLoading }] = usePayOrderMutation();

  const handleClick = async () => {
    try {
      await payOrder(orderId).unwrap();
      router.replace(routes.orderTracking(orderId));
    } catch {
      // Ошибка оплаты обрабатывается через состояние мутации ниже по дереву.
    }
  };

  return (
    <Button disabled={isLoading} fullWidth onClick={handleClick} size="lg">
      {isLoading ? 'Оплата…' : 'Оплатить'}
    </Button>
  );
}
