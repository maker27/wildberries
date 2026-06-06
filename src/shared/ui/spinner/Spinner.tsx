import { cn } from '@/shared/lib/cn/cn';
import type { WithClassName } from '@/shared/types/common';

export function Spinner({ className }: WithClassName) {
  return (
    <span
      aria-label="Загрузка"
      className={cn(
        'spinner inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#e0e0e0] border-t-[#cb11ab]',
        className,
      )}
      role="status"
    />
  );
}
