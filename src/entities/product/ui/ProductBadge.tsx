import { cn } from '@/shared/lib/cn/cn';
import type { WithClassName } from '@/shared/types/common';

type ProductBadgeProps = WithClassName & {
  children: string;
};

export function ProductBadge({ children, className }: ProductBadgeProps) {
  return (
    <span
      className={cn(
        'product-badge bg-accent inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium text-white shadow-sm',
        className,
      )}
    >
      {children}
    </span>
  );
}
