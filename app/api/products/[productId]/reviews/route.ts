import { NextResponse } from 'next/server';

import { getReviews } from '@/server/data/products';

type RouteContext = {
  params: Promise<{ productId: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { productId } = await params;
  const reviews = getReviews(productId);

  return NextResponse.json(reviews);
}
