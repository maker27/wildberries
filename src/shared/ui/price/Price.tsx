import { cn } from '@/shared/lib/cn/cn';
import type { WithClassName } from '@/shared/types/common';

type PriceProps = WithClassName & {
  value: number;
};

const PRICE_LOCALE = 'ru-RU';
const PRICE_CURRENCY = 'RUB';

const priceFormatter = new Intl.NumberFormat(PRICE_LOCALE, {
  style: 'currency',
  currency: PRICE_CURRENCY,
  maximumFractionDigits: 0,
});

export function formatPrice(value: number): string {
  return priceFormatter.format(value);
}

export function Price({ className, value }: PriceProps) {
  return <span className={cn('price', className)}>{formatPrice(value)}</span>;
}
