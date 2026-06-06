import { CartList } from '@/widgets/cart-list';
import { CartSummary } from '@/widgets/cart-summary';
import { Container } from '@/shared/ui/container/Container';

export function CartPage() {
  return (
    <Container className="cart-page py-6">
      <h1 className="cart-page__title mb-6 text-2xl font-bold text-[#1a1a1a]">Корзина</h1>
      <div className="cart-page__layout grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="cart-page__list lg:col-span-2">
          <CartList />
        </div>
        <div className="cart-page__summary">
          <CartSummary />
        </div>
      </div>
    </Container>
  );
}
