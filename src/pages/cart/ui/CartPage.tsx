import { CartSync } from '@/entities/cart';
import { CartList } from '@/widgets/cart-list';
import { CartSummary } from '@/widgets/cart-summary';
import { getProducts } from '@/server/data/products';
import { Container } from '@/shared/ui/container/Container';

export function CartPage() {
  const cartProducts = getProducts().map((product) => ({
    productId: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
  }));

  return (
    <Container className="cart-page flex min-h-[70vh] flex-col py-6">
      <CartSync products={cartProducts} />
      <h1 className="cart-page__title mb-6 text-2xl font-bold text-[#1a1a1a]">Корзина</h1>
      <div className="cart-page__layout flex flex-1 flex-col gap-6 lg:flex-row lg:items-start">
        <div className="cart-page__list flex flex-1 flex-col">
          <CartList />
        </div>
        <CartSummary />
      </div>
    </Container>
  );
}
