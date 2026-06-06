import 'server-only';

import { randomUUID } from 'node:crypto';

import { eq } from 'drizzle-orm';

import type { CreateOrderPayload, Order } from '@/entities/order';

import { db, schema } from '../db/client';

type OrderRow = typeof schema.orders.$inferSelect;
type OrderItemRow = typeof schema.orderItems.$inferSelect;

function mapOrder(orderRow: OrderRow, itemRows: OrderItemRow[]): Order {
  return {
    id: orderRow.id,
    userId: orderRow.userId ?? undefined,
    phone: orderRow.phone,
    totalPrice: orderRow.totalPrice,
    createdAt: orderRow.createdAt,
    paidAt: orderRow.paidAt ?? undefined,
    deliveryAddress: {
      city: orderRow.city,
      street: orderRow.street,
      house: orderRow.house,
      flat: orderRow.flat ?? undefined,
      comment: orderRow.comment ?? undefined,
    },
    items: itemRows.map((item) => ({
      productId: item.productId,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
  };
}

export function createOrder(payload: CreateOrderPayload): Order {
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  const totalPrice = payload.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  db.transaction((tx) => {
    tx.insert(schema.orders)
      .values({
        id,
        userId: payload.userId,
        phone: payload.phone,
        totalPrice,
        city: payload.deliveryAddress.city,
        street: payload.deliveryAddress.street,
        house: payload.deliveryAddress.house,
        flat: payload.deliveryAddress.flat,
        comment: payload.deliveryAddress.comment,
        status: 'created',
        createdAt,
      })
      .run();

    for (const item of payload.items) {
      tx.insert(schema.orderItems)
        .values({
          orderId: id,
          productId: item.productId,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })
        .run();
    }
  });

  const created = getOrder(id);

  if (!created) {
    throw new Error('Order creation failed');
  }

  return created;
}

export function getOrder(id: string): Order | null {
  const orderRow = db.select().from(schema.orders).where(eq(schema.orders.id, id)).get();

  if (!orderRow) {
    return null;
  }

  const itemRows = db.select().from(schema.orderItems).where(eq(schema.orderItems.orderId, id)).all();

  return mapOrder(orderRow, itemRows);
}

export function payOrder(id: string): Order | null {
  const orderRow = db.select().from(schema.orders).where(eq(schema.orders.id, id)).get();

  if (!orderRow) {
    return null;
  }

  if (!orderRow.paidAt) {
    db.update(schema.orders)
      .set({ paidAt: new Date().toISOString(), status: 'paid' })
      .where(eq(schema.orders.id, id))
      .run();
  }

  return getOrder(id);
}
