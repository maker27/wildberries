import { type ReactNode } from 'react';
import Link from 'next/link';

import { Image } from '@/shared/ui/image/Image';
import { BLUR_DATA_URL } from '@/shared/ui/image/blurPlaceholder';
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
  priority?: boolean;
  product: Product;
};

function getDiscountPercent(price: number, oldPrice?: number): number | null {
  if (!oldPrice || oldPrice <= price) {
    return null;
  }

  return Math.round((1 - price / oldPrice) * 100);
}

export function ProductCard({ action, priority = false, product }: ProductCardProps) {
  const isOutOfStock = product.status === 'outOfStock';
  const discountPercent = getDiscountPercent(product.price, product.oldPrice);

  return (
    <article className="product-card flex flex-col">
      <Link
        className="product-card__image-link relative block aspect-square overflow-hidden rounded-2xl"
        href={routes.product(product.id)}
      >
        <Image
          alt={product.title}
          blurDataURL={BLUR_DATA_URL}
          className={cn('product-card__image object-cover', isOutOfStock && 'opacity-60 grayscale')}
          fill
          placeholder="blur"
          priority={priority}
          sizes="(max-width: 640px) calc((100vw - 48px) / 2), (max-width: 768px) calc((100vw - 64px) / 3), (max-width: 1024px) calc((100vw - 80px) / 4), (max-width: 1280px) calc((100vw - 96px) / 5), 200px"
          src={product.image}
        />
        <FavoriteButton className="product-card__favorite absolute top-2 right-2" />
        <div className="product-card__overlay absolute bottom-2 left-2 flex flex-col items-start gap-1">
          {discountPercent ? (
            <span className="product-card__discount bg-sale inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-bold text-white">
              -{discountPercent}%
            </span>
          ) : null}
          {product.badge ? (
            <ProductBadge className="product-card__badge">{product.badge}</ProductBadge>
          ) : null}
        </div>
      </Link>
      <div className="product-card__body flex flex-1 flex-col gap-1 pt-2">
        {discountPercent ? (
          <span className="product-card__good-price bg-accent-soft text-accent inline-flex items-center gap-1 self-start rounded px-1.5 py-0.5 text-[11px] font-medium">
            👍 Хорошая цена
          </span>
        ) : null}
        <ProductPrice oldPrice={product.oldPrice} price={product.price} />
        <Link
          className="product-card__title text-fg hover:text-accent line-clamp-2 text-sm"
          href={routes.product(product.id)}
        >
          {product.title}
        </Link>
        <ProductRating rating={product.rating} reviewsCount={product.reviewsCount} />
        {product.status !== 'inStock' ? (
          <ProductStatusBadge className="product-card__status self-start" status={product.status} />
        ) : null}
        <p className="product-card__delivery text-muted mt-auto pt-2 text-xs">
          Доставка <span className="text-fg font-semibold">завтра</span>
        </p>
        {action ? <div className="product-card__action pt-2">{action}</div> : null}
      </div>
    </article>
  );
}
