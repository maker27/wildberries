import { type Review, ReviewCard } from '@/entities/review';
import { EmptyState } from '@/shared/ui/empty-state/EmptyState';

type ReviewsListProps = {
  reviews: Review[];
};

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <section className="reviews-list flex flex-col gap-4">
      <h2 className="reviews-list__title text-fg text-xl font-semibold">Отзывы</h2>

      {reviews.length === 0 ? (
        <EmptyState description="Пока никто не оставил отзыв на этот товар." title="Отзывов пока нет" />
      ) : (
        <ul className="reviews-list__items flex flex-col gap-3">
          {reviews.map((review) => (
            <li className="reviews-list__item" key={review.id}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
