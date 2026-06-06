import { cn } from '@/shared/lib/cn/cn';
import type { WithClassName } from '@/shared/types/common';

type ProductRatingProps = WithClassName & {
  rating: number;
  reviewsCount: number;
};

export function ProductRating({ className, rating, reviewsCount }: ProductRatingProps) {
  return (
    <div className={cn('product-rating flex items-center gap-1 text-sm', className)}>
      <span className="product-rating__star text-[#fbbf24]" aria-hidden="true">
        ★
      </span>
      <span className="product-rating__value font-medium text-[#1a1a1a]">{rating.toFixed(1)}</span>
      <span className="product-rating__count text-[#999]">({reviewsCount})</span>
    </div>
  );
}
