import { ProductDetailsPage } from '@/pages/product-details';
import { getProducts } from '@/server/data/products';

// Каталог фиксирован в SQLite — генерируем страницы товаров статически (лучше TTFB/LCP).
export function generateStaticParams() {
  return getProducts().map((product) => ({ productId: product.id }));
}

type PageProps = {
  params: Promise<{ productId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { productId } = await params;

  return <ProductDetailsPage productId={productId} />;
}
