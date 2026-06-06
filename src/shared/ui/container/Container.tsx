import { type PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/cn/cn';
import type { WithClassName } from '@/shared/types/common';

type ContainerProps = PropsWithChildren<WithClassName>;

export function Container({ children, className }: ContainerProps) {
  return <div className={cn('container mx-auto w-full max-w-[1280px] px-4', className)}>{children}</div>;
}
