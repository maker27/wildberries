import { NextResponse } from 'next/server';

import { getOrder, payOrder } from '@/server/data/orders';

type RouteContext = {
  params: Promise<{ orderId: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { orderId } = await params;
  const order = getOrder(orderId);

  if (!order) {
    return NextResponse.json({ message: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json(order);
}

export async function PATCH(_request: Request, { params }: RouteContext) {
  const { orderId } = await params;
  const order = payOrder(orderId);

  if (!order) {
    return NextResponse.json({ message: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json(order);
}
