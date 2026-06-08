import { getProducts } from '@/server/data/products';
import { ProductList } from '@/widgets/product-list';
import { Container } from '@/shared/ui/container/Container';
import { EmptyState } from '@/shared/ui/empty-state/EmptyState';

type HomePageProps = {
  query?: string;
};

function filterProducts(query: string) {
  const normalized = query.trim().toLowerCase();
  const products = getProducts();

  if (!normalized) {
    return products;
  }

  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(normalized) || product.category.toLowerCase().includes(normalized),
  );
}

export function HomePage({ query = '' }: HomePageProps) {
  const products = filterProducts(query);
  const hasQuery = query.trim().length > 0;
  const title = hasQuery ? `Результаты поиска: «${query.trim()}»` : 'Каталог товаров';

  return (
    <Container className="home-page py-6">
      <h1 className="home-page__title text-fg mb-6 text-2xl font-bold">{title}</h1>
      {products.length === 0 ? (
        <EmptyState
          description={hasQuery ? 'Попробуйте изменить запрос.' : 'Товары появятся здесь позже.'}
          title={hasQuery ? 'Ничего не найдено' : 'Каталог пуст'}
        />
      ) : (
        <ProductList products={products} />
      )}
    </Container>
  );
}
