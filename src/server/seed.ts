import { mockProducts } from '@/mock/products';
import { mockReviews } from '@/mock/reviews';

import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

import * as schema from './db/schema';

type Db = BetterSQLite3Database<typeof schema>;

export function seedDatabase(db: Db): void {
  const existing = db.select().from(schema.products).all();

  if (existing.length > 0) {
    return;
  }

  db.transaction((tx) => {
    for (const product of mockProducts) {
      tx.insert(schema.products)
        .values({
          id: product.id,
          title: product.title,
          slug: product.slug,
          shortDescription: product.shortDescription,
          description: product.description,
          price: product.price,
          oldPrice: product.oldPrice,
          rating: product.rating,
          reviewsCount: product.reviewsCount,
          image: product.image,
          images: product.images,
          category: product.category,
          badge: product.badge,
          status: product.status,
          stockNote: product.stockNote,
          characteristics: product.characteristics,
        })
        .run();
    }

    for (const review of mockReviews) {
      tx.insert(schema.reviews)
        .values({
          id: review.id,
          productId: review.productId,
          authorName: review.authorName,
          rating: review.rating,
          text: review.text,
          createdAt: review.createdAt,
        })
        .run();
    }
  });
}
