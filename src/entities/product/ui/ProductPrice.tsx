import { Price } from '@/shared/ui/price/Price';
import { cn } from '@/shared/lib/cn/cn';
import type { WithClassName } from '@/shared/types/common';

type ProductPriceProps = WithClassName & {
  oldPrice?: number;
  price: number;
};

export function ProductPrice({ className, oldPrice, price }: ProductPriceProps) {
  return (
    <div className={cn('product-price flex items-baseline gap-2', className)}>
      <Price className="product-price__current text-accent text-xl font-bold" value={price} />
      {oldPrice ? (
        <Price className="product-price__old text-faint text-sm line-through" value={oldPrice} />
      ) : null}
    </div>
  );
}
