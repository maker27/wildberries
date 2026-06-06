import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/shared/lib/cn/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'bg-[#cb11ab] text-white hover:bg-[#a60d8c] disabled:bg-[#d9a3d0]',
  secondary: 'bg-white text-[#1a1a1a] border border-[#e0e0e0] hover:bg-[#f5f6f8]',
  ghost: 'bg-transparent text-[#cb11ab] hover:bg-[#f7e6f3]',
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, children, fullWidth = false, size = 'md', type = 'button', variant = 'primary', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'button inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed',
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        fullWidth && 'w-full',
        className,
      )}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
});
