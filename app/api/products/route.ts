import { NextResponse } from 'next/server';

import { getProducts } from '@/server/data/products';

export function GET() {
  const products = getProducts();

  return NextResponse.json(products);
}
