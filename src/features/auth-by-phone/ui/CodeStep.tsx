'use client';

import { type FormEvent, useState } from 'react';

import { Button } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input/Input';

import { CODE_LENGTH, validateCode } from '../model/authSchema';

type CodeStepProps = {
  phone: string;
  onBack: () => void;
  onSubmit: (code: string) => void;
};

export function CodeStep({ phone, onBack, onSubmit }: CodeStepProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateCode(code);

    if (validationError) {
      setError(validationError);

      return;
    }

    onSubmit(code);
  };

  return (
    <form className="code-step flex flex-col gap-4" onSubmit={handleSubmit}>
      <p className="code-step__hint text-muted text-sm">
        Мы «отправили» код на номер <span className="text-fg font-medium">{phone}</span>. Введите любые{' '}
        {CODE_LENGTH} цифры.
      </p>
      <Input
        error={error ?? undefined}
        inputMode="numeric"
        label="Код из СМС"
        maxLength={CODE_LENGTH}
        onChange={(event) => setCode(event.target.value)}
        placeholder="0000"
        value={code}
      />
      <Button fullWidth size="lg" type="submit">
        Войти
      </Button>
      <Button fullWidth onClick={onBack} type="button" variant="ghost">
        Изменить номер
      </Button>
    </form>
  );
}
