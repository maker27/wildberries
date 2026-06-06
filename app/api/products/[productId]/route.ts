import { NextResponse } from 'next/server';

import { getProduct } from '@/server/data/products';

type RouteContext = {
  params: Promise<{ productId: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { productId } = await params;
  const product = getProduct(productId);

  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}
