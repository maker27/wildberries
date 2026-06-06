import { ProductDetailsPage } from '@/pages/product-details';

type PageProps = {
  params: Promise<{ productId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { productId } = await params;

  return <ProductDetailsPage productId={productId} />;
}
