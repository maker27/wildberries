import { cn } from '@/shared/lib/cn/cn';
import type { WithClassName } from '@/shared/types/common';

import { PRODUCT_STATUS_LABEL } from '../model/constants';
import type { ProductStatus } from '../model/types';

type ProductStatusBadgeProps = WithClassName & {
  status: ProductStatus;
};

const STATUS_CLASS: Record<ProductStatus, string> = {
  inStock: 'bg-[#e8f5e9] text-[#2e7d32]',
  lowStock: 'bg-[#fff3e0] text-[#e65100]',
  outOfStock: 'bg-[#fdecea] text-[#c62828]',
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
