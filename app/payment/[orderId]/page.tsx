import { PaymentPage } from '@/pages/payment';

type PageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { orderId } = await params;

  return <PaymentPage orderId={orderId} />;
}
