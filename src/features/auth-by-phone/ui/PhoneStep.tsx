'use client';

import { type FormEvent, useState } from 'react';

import { Button } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input/Input';

import { validatePhone } from '../model/authSchema';

type PhoneStepProps = {
  defaultValue: string;
  onSubmit: (phone: string) => void;
};

export function PhoneStep({ defaultValue, onSubmit }: PhoneStepProps) {
  const [phone, setPhone] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validatePhone(phone);

    if (validationError) {
      setError(validationError);

      return;
    }

    onSubmit(phone);
  };

  return (
    <form className="phone-step flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        autoComplete="tel"
        error={error ?? undefined}
        label="Номер телефона"
        onChange={(event) => setPhone(event.target.value)}
        placeholder="+7 999 123-45-67"
        type="tel"
        value={phone}
      />
      <Button fullWidth size="lg" type="submit">
        Получить код
      </Button>
    </form>
  );
}
