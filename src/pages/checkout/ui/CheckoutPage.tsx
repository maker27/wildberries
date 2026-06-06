import { CheckoutForm } from '@/widgets/checkout-form';
import { Container } from '@/shared/ui/container/Container';

export function CheckoutPage() {
  return (
    <Container className="checkout-page py-6">
      <h1 className="checkout-page__title mb-6 text-2xl font-bold text-[#1a1a1a]">Оформление заказа</h1>
      <CheckoutForm />
    </Container>
  );
}
