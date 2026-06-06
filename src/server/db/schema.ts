import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import type { OrderStage } from '@/entities/order';
import type { ProductCharacteristic, ProductStatus } from '@/entities/product';

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  shortDescription: text('short_description'),
  description: text('description').notNull(),
  price: real('price').notNull(),
  oldPrice: real('old_price'),
  rating: real('rating').notNull(),
  reviewsCount: integer('reviews_count').notNull(),
  image: text('image').notNull(),
  images: text('images', { mode: 'json' }).$type<string[]>(),
  category: text('category').notNull(),
  badge: text('badge'),
  status: text('status').$type<ProductStatus>().notNull().default('inStock'),
  stockNote: text('stock_note'),
  characteristics: text('characteristics', { mode: 'json' }).$type<ProductCharacteristic[]>().notNull(),
});

export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey(),
  productId: text('product_id')
    .notNull()
    .references(() => products.id),
  authorName: text('author_name').notNull(),
  rating: integer('rating').notNull(),
  text: text('text').notNull(),
  createdAt: text('created_at').notNull(),
});

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  userId: text('user_id'),
  phone: text('phone').notNull(),
  totalPrice: real('total_price').notNull(),
  city: text('city').notNull(),
  street: text('street').notNull(),
  house: text('house').notNull(),
  flat: text('flat'),
  comment: text('comment'),
  status: text('status').$type<OrderStage>().notNull().default('created'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  paidAt: text('paid_at'),
});

export const orderItems = sqliteTable('order_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id),
  productId: text('product_id').notNull(),
  title: text('title').notNull(),
  price: real('price').notNull(),
  quantity: integer('quantity').notNull(),
  image: text('image').notNull(),
});
