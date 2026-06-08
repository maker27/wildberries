import { cn } from '@/shared/lib/cn/cn';
import type { WithClassName } from '@/shared/types/common';

import { PRODUCT_STATUS_LABEL } from '../model/constants';
import type { ProductStatus } from '../model/types';

type ProductStatusBadgeProps = WithClassName & {
  status: ProductStatus;
};

const STATUS_CLASS: Record<ProductStatus, string> = {
  inStock: 'bg-success-soft text-success',
  lowStock: 'bg-warning-soft text-warning',
  outOfStock: 'bg-error-soft text-error-strong',
};

export function ProductStatusBadge({ className, status }: ProductStatusBadgeProps) {
  return (
    <span
      className={cn(
        'product-status-badge inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        STATUS_CLASS[status],
        className,
      )}
    >
      {PRODUCT_STATUS_LABEL[status]}
    </span>
  );
}
