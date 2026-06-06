'use client';

import { useState } from 'react';

import { cn } from '@/shared/lib/cn/cn';
import type { WithClassName } from '@/shared/types/common';

export function FavoriteButton({ className }: WithClassName) {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      aria-label={isActive ? 'Убрать из избранного' : 'Добавить в избранное'}
      aria-pressed={isActive}
      className={cn(
        'favorite-button flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow-sm transition-colors hover:bg-white',
        isActive ? 'text-[#cb11ab]' : 'text-[#9a9a9a]',
        className,
      )}
      onClick={() => setIsActive((prev) => !prev)}
      type="button"
    >
      {isActive ? '♥' : '♡'}
    </button>
  );
}
