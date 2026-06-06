import 'server-only';

import { asc, eq } from 'drizzle-orm';

import type { Product } from '@/entities/product';
import type { Review } from '@/entities/review';

import { db, schema } from '../db/client';

type ProductRow = typeof schema.products.$inferSelect;

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    price: row.price,
    oldPrice: row.oldPrice ?? undefined,
    rating: row.rating,
    reviewsCount: row.reviewsCount,
    image: row.image,
    images: row.images ?? undefined,
    category: row.category,
    characteristics: row.characteristics,
  };
}

export function getProducts(): Product[] {
  return db.select().from(schema.products).all().map(mapProduct);
}

export function getProduct(id: string): Product | null {
  const row = db.select().from(schema.products).where(eq(schema.products.id, id)).get();

  return row ? mapProduct(row) : null;
}

export function getReviews(productId: string): Review[] {
  return db
    .select()
    .from(schema.reviews)
    .where(eq(schema.reviews.productId, productId))
    .orderBy(asc(schema.reviews.createdAt))
    .all();
}
