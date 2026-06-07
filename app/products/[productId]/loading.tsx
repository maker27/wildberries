import { Container } from '@/shared/ui/container/Container';

export default function Loading() {
  return (
    <Container className="product-details-skeleton flex flex-col gap-10 py-6">
      <div className="product-details-skeleton__back h-4 w-24 animate-pulse rounded bg-[#ececec]" />
      <div className="product-details-skeleton__body grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="product-details-skeleton__image aspect-square w-full animate-pulse rounded-xl bg-[#ececec]" />
        <div className="product-details-skeleton__info flex flex-col gap-4">
          <div className="h-8 w-3/4 animate-pulse rounded bg-[#ececec]" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-[#ececec]" />
          <div className="h-10 w-1/2 animate-pulse rounded bg-[#ececec]" />
          <div className="h-20 w-full animate-pulse rounded bg-[#ececec]" />
          <div className="h-12 w-full animate-pulse rounded-lg bg-[#ececec]" />
        </div>
      </div>
    </Container>
  );
}
