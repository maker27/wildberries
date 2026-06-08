import { type ReactNode } from 'react';

import { cn } from '@/shared/lib/cn/cn';
import type { WithClassName } from '@/shared/types/common';

type EmptyStateProps = WithClassName & {
  action?: ReactNode;
  description?: string;
  title: string;
};

export function EmptyState({ action, className, description, title }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'empty-state flex flex-col items-center justify-center gap-3 rounded-xl bg-white px-6 py-16 text-center',
        className,
      )}
    >
      <h2 className="empty-state__title text-fg text-lg font-semibold">{title}</h2>
      {description ? <p className="empty-state__description text-muted text-sm">{description}</p> : null}
      {action ? <div className="empty-state__action mt-2">{action}</div> : null}
    </div>
  );
}
