import { formatDate } from '@/shared/lib/date/date';

import type { Review } from '../model/types';

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="review-card flex flex-col gap-2 rounded-xl bg-white p-4 shadow-sm">
      <header className="review-card__header flex items-center justify-between">
        <span className="review-card__author font-medium text-[#1a1a1a]">{review.authorName}</span>
        <span className="review-card__date text-xs text-[#999]">{formatDate(review.createdAt)}</span>
      </header>
      <div className="review-card__rating text-sm text-[#fbbf24]" aria-label={`Оценка ${review.rating} из 5`}>
        {'★'.repeat(review.rating)}
        <span className="text-[#e0e0e0]">{'★'.repeat(5 - review.rating)}</span>
      </div>
      <p className="review-card__text text-sm text-[#444]">{review.text}</p>
    </article>
  );
}
