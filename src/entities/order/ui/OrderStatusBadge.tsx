import { cn } from '@/shared/lib/cn/cn';
import type { WithClassName } from '@/shared/types/common';

import { ORDER_STAGE_LABEL } from '../model/constants';
import type { OrderStage } from '../model/types';

type OrderStatusBadgeProps = WithClassName & {
  stage: OrderStage;
};

const STAGE_CLASS: Record<OrderStage, string> = {
  created: 'bg-[#eeeeee] text-[#666]',
  paid: 'bg-[#e3f2fd] text-[#1565c0]',
  assembling: 'bg-[#fff3e0] text-[#e65100]',
  packed: 'bg-[#f3e5f5] text-[#6a1b9a]',
  inDelivery: 'bg-[#e8f5e9] text-[#2e7d32]',
  delivered: 'bg-[#cb11ab] text-white',
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
