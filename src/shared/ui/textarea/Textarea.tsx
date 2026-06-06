import { type TextareaHTMLAttributes, forwardRef, useId } from 'react';

import { cn } from '@/shared/lib/cn/cn';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
  label?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, error, id, label, ...rest },
  ref,
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <div className="textarea flex flex-col gap-1">
      {label ? (
        <label className="textarea__label text-sm font-medium text-[#444]" htmlFor={textareaId}>
          {label}
        </label>
      ) : null}
      <textarea
        ref={ref}
        className={cn(
          'textarea__field min-h-24 rounded-lg border bg-white px-3 py-2 text-sm transition-colors outline-none',
          'focus:border-[#cb11ab]',
          error ? 'border-[#e53935]' : 'border-[#e0e0e0]',
          className,
        )}
        id={textareaId}
        {...rest}
      />
      {error ? <span className="textarea__error text-xs text-[#e53935]">{error}</span> : null}
    </div>
  );
});
