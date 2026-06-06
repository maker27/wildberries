'use client';

import { type PropsWithChildren, useEffect } from 'react';

import { cn } from '@/shared/lib/cn/cn';

type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  title?: string;
  onClose: () => void;
}>;

export function Modal({ children, isOpen, title, onClose }: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className={cn('modal__content w-full max-w-md rounded-xl bg-white p-6 shadow-lg')}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {title ? <h2 className="modal__title mb-4 text-lg font-semibold">{title}</h2> : null}
        {children}
      </div>
    </div>
  );
}
