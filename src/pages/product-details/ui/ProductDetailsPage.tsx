import { notFound } from 'next/navigation';
import Link from 'next/link';

import { getProduct, getReviews } from '@/server/data/products';
import { ProductDetails } from '@/widgets/product-details';
import { ReviewsList } from '@/widgets/reviews-list';
import { routes } from '@/shared/config/routes';
import { Container } from '@/shared/ui/container/Container';

type ProductDetailsPageProps = {
  productId: string;
};

export function ProductDetailsPage({ productId }: ProductDetailsPageProps) {
  const product = getProduct(productId);

  if (!product) {
    notFound();
  }

  const reviews = getReviews(product.id);

  return (
    <Container className="product-details-page flex flex-col gap-10 py-6">
      <Link className="product-details-page__back text-accent text-sm hover:underline" href={routes.home}>
        ← В каталог
      </Link>
      <ProductDetails product={product} />
      <ReviewsList reviews={reviews} />
    </Container>
  );
}
