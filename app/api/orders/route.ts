import { NextResponse } from 'next/server';
import { z } from 'zod';

import { createOrder } from '@/server/data/orders';

const orderItemSchema = z.object({
  productId: z.string().min(1),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  image: z.string().min(1),
});

const createOrderSchema = z.object({
  userId: z.string().optional(),
  phone: z.string().min(1),
  items: z.array(orderItemSchema).min(1),
  deliveryAddress: z.object({
    city: z.string().min(1),
    street: z.string().min(1),
    house: z.string().min(1),
    flat: z.string().optional(),
    comment: z.string().optional(),
  }),
});

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = createOrderSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Validation error', issues: parsed.error.issues }, { status: 400 });
  }

  const order = createOrder(parsed.data);

  return NextResponse.json(order, { status: 201 });
}
