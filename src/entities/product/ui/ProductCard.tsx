import { type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/cn/cn';
import { routes } from '@/shared/config/routes';

import type { Product } from '../model/types';
import { FavoriteButton } from './FavoriteButton';
import { ProductBadge } from './ProductBadge';
import { ProductPrice } from './ProductPrice';
import { ProductRating } from './ProductRating';
import { ProductStatusBadge } from './ProductStatusBadge';

type ProductCardProps = {
  action?: ReactNode;
  product: Product;
};

function getDiscountPercent(price: number, oldPrice?: number): number | null {
  if (!oldPrice || oldPrice <= price) {
    return null;
  }

  return Math.round((1 - price / oldPrice) * 100);
}

export function ProductCard({ action, product }: ProductCardProps) {
  const isOutOfStock = product.status === 'outOfStock';
  const discountPercent = getDiscountPercent(product.price, product.oldPrice);

  return (
    <article className="product-card flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        className="product-card__image-link relative block aspect-square overflow-hidden rounded-2xl"
        href={routes.product(product.id)}
      >
        <Image
          alt={product.title}
          className={cn('product-card__image object-cover', isOutOfStock && 'opacity-60 grayscale')}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          src={product.image}
        />
        <FavoriteButton className="product-card__favorite absolute top-2 right-2" />
        <div className="product-card__overlay absolute bottom-2 left-2 flex flex-col items-start gap-1">
          {discountPercent ? (
            <span className="product-card__discount inline-flex items-center rounded-md bg-[#f5163a] px-1.5 py-0.5 text-xs font-bold text-white">
              -{discountPercent}%
            </span>
          ) : null}
          {product.badge ? (
            <ProductBadge className="product-card__badge">{product.badge}</ProductBadge>
          ) : null}
        </div>
      </Link>
      <div className="product-card__body flex flex-1 flex-col gap-1.5 p-3">
        <ProductPrice oldPrice={product.oldPrice} price={product.price} />
        <Link
          className="product-card__title line-clamp-2 text-sm text-[#1a1a1a] hover:text-[#cb11ab]"
          href={routes.product(product.id)}
        >
          {product.title}
        </Link>
        <ProductRating rating={product.rating} reviewsCount={product.reviewsCount} />
        {product.status !== 'inStock' ? (
          <ProductStatusBadge className="product-card__status self-start" status={product.status} />
        ) : null}
        {action ? <div className="product-card__action mt-auto pt-2">{action}</div> : null}
      </div>
    </article>
  );
}
