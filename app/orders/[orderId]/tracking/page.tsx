import { OrderTrackingPage } from '@/pages/order-tracking';

type PageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { orderId } = await params;

  return <OrderTrackingPage orderId={orderId} />;
}
