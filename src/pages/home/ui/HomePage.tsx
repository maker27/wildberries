import { getProducts } from '@/server/data/products';
import { ProductList } from '@/widgets/product-list';
import { Container } from '@/shared/ui/container/Container';
import { EmptyState } from '@/shared/ui/empty-state/EmptyState';

export function HomePage() {
  const products = getProducts();

  return (
    <Container className="home-page py-6">
      <h1 className="home-page__title mb-6 text-2xl font-bold text-[#1a1a1a]">Каталог товаров</h1>
      {products.length === 0 ? (
        <EmptyState description="Товары появятся здесь позже." title="Каталог пуст" />
      ) : (
        <ProductList products={products} />
      )}
    </Container>
  );
}
