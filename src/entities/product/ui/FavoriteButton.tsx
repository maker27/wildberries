'use client';

import { type MouseEvent, useState } from 'react';

import { cn } from '@/shared/lib/cn/cn';
import type { WithClassName } from '@/shared/types/common';

export function FavoriteButton({ className }: WithClassName) {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsActive((prev) => !prev);
  };

  return (
    <button
      aria-label={isActive ? 'Убрать из избранного' : 'Добавить в избранное'}
      aria-pressed={isActive}
      className={cn(
        'favorite-button flex h-7 w-7 items-center justify-center transition-transform hover:scale-110',
        isActive ? 'text-accent' : 'text-white',
        className,
      )}
      onClick={handleButtonClick}
      type="button"
    >
      <svg
        className="favorite-button__icon h-6 w-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
        fill={isActive ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 20.7 4.3 13a5 5 0 0 1 7.1-7.1l.6.6.6-.6A5 5 0 0 1 19.7 13L12 20.7Z" />
      </svg>
    </button>
  );
}
