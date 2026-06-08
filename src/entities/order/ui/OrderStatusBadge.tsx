import { cn } from '@/shared/lib/cn/cn';
import type { WithClassName } from '@/shared/types/common';

import { ORDER_STAGE_LABEL } from '../model/constants';
import type { OrderStage } from '../model/types';

type OrderStatusBadgeProps = WithClassName & {
  stage: OrderStage;
};

const STAGE_CLASS: Record<OrderStage, string> = {
  created: 'bg-track text-muted',
  paid: 'bg-info-soft text-info',
  assembling: 'bg-warning-soft text-warning',
  packed: 'bg-purple-soft text-purple',
  inDelivery: 'bg-success-soft text-success',
  delivered: 'bg-accent text-white',
};

export function OrderStatusBadge({ className, stage }: OrderStatusBadgeProps) {
  return (
    <span
      className={cn(
        'order-status-badge inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        STAGE_CLASS[stage],
        className,
      )}
    >
      {ORDER_STAGE_LABEL[stage]}
    </span>
  );
}
