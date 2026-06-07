import { ProductDetailsPage } from '@/pages/product-details';

// Без force-dynamic Next целиком префетчит роут и пропускает loading.tsx —
// страница «висит» старая. Dynamic-роут префетчится только до loading-boundary.
export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ productId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { productId } = await params;

  return <ProductDetailsPage productId={productId} />;
}
