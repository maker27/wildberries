import { type InputHTMLAttributes, forwardRef, useId } from 'react';

import { cn } from '@/shared/lib/cn/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  hint?: string;
  label?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, hint, id, label, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="input flex flex-col gap-1">
      {label ? (
        <label className="input__label text-label text-sm font-medium" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        className={cn(
          'input__field h-10 rounded-lg border bg-white px-3 text-sm transition-colors outline-none',
          'focus:border-accent',
          error ? 'border-error' : 'border-border',
          className,
        )}
        id={inputId}
        {...rest}
      />
      {error ? <span className="input__error text-error text-xs">{error}</span> : null}
      {!error && hint ? <span className="input__hint text-subtle text-xs">{hint}</span> : null}
    </div>
  );
});
