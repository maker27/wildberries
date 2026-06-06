import { type InputHTMLAttributes, forwardRef, useId } from 'react';

import { cn } from '@/shared/lib/cn/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, id, label, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="input flex flex-col gap-1">
      {label ? (
        <label className="input__label text-sm font-medium text-[#444]" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        className={cn(
          'input__field h-10 rounded-lg border bg-white px-3 text-sm transition-colors outline-none',
          'focus:border-[#cb11ab]',
          error ? 'border-[#e53935]' : 'border-[#e0e0e0]',
          className,
        )}
        id={inputId}
        {...rest}
      />
      {error ? <span className="input__error text-xs text-[#e53935]">{error}</span> : null}
    </div>
  );
});
