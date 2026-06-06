import { type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/shared/config/routes';

import type { Product } from '../model/types';
import { ProductPrice } from './ProductPrice';
import { ProductRating } from './ProductRating';

type ProductCardProps = {
  action?: ReactNode;
  product: Product;
};

export function ProductCard({ action, product }: ProductCardProps) {
  return (
    <article className="product-card flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link className="product-card__image-link relative block aspect-square" href={routes.product(product.id)}>
        <Image
          alt={product.title}
          className="product-card__image object-cover"
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          src={product.image}
        />
      </Link>
      <div className="product-card__body flex flex-1 flex-col gap-2 p-4">
        <ProductPrice oldPrice={product.oldPrice} price={product.price} />
        <Link className="product-card__title text-sm font-medium text-[#1a1a1a] hover:text-[#cb11ab]" href={routes.product(product.id)}>
          {product.title}
        </Link>
        <ProductRating rating={product.rating} reviewsCount={product.reviewsCount} />
        <p className="product-card__description line-clamp-2 text-xs text-[#777]">{product.description}</p>
        {action ? <div className="product-card__action mt-auto pt-2">{action}</div> : null}
      </div>
    </article>
  );
}
