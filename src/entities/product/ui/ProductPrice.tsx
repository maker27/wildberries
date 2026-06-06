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
      <Price className="product-price__current text-xl font-bold text-[#cb11ab]" value={price} />
      {oldPrice ? (
        <Price className="product-price__old text-sm text-[#9a9a9a] line-through" value={oldPrice} />
      ) : null}
    </div>
  );
}
