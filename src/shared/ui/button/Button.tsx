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
  primary: 'bg-accent text-white hover:bg-accent-dark disabled:bg-accent-disabled',
  secondary: 'bg-white text-fg border border-border hover:bg-canvas',
  ghost: 'bg-transparent text-accent hover:bg-accent-soft',
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
