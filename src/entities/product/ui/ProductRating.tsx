import { cn } from '@/shared/lib/cn/cn';
import type { WithClassName } from '@/shared/types/common';

type ProductRatingProps = WithClassName & {
  rating: number;
  reviewsCount: number;
};

const RATING_LOCALE = 'ru-RU';
const REVIEW_PLURAL = ['оценка', 'оценки', 'оценок'] as const;

function pluralizeReviews(count: number): string {
  const mod100 = count % 100;
  const mod10 = count % 10;

  if (mod100 >= 11 && mod100 <= 14) {
    return REVIEW_PLURAL[2];
  }
  if (mod10 === 1) {
    return REVIEW_PLURAL[0];
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return REVIEW_PLURAL[1];
  }

  return REVIEW_PLURAL[2];
}

export function ProductRating({ className, rating, reviewsCount }: ProductRatingProps) {
  const formattedRating = rating.toLocaleString(RATING_LOCALE, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const formattedCount = reviewsCount.toLocaleString(RATING_LOCALE);

  return (
    <div className={cn('product-rating flex items-center gap-1 text-xs', className)}>
      <span className="product-rating__star text-[#fbbf24]" aria-hidden="true">
        ★
      </span>
      <span className="product-rating__value font-semibold text-[#1a1a1a]">{formattedRating}</span>
      <span className="product-rating__count text-[#9a9a9a]">
        · {formattedCount} {pluralizeReviews(reviewsCount)}
      </span>
    </div>
  );
}
