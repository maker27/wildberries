'use client';

import { useSearchParams } from 'next/navigation';

import { AuthByPhoneForm } from '@/features/auth-by-phone';
import { routes } from '@/shared/config/routes';
import { Container } from '@/shared/ui/container/Container';

// Пускаем только внутренние пути — защита от open-redirect (//evil.com, https://…).
function sanitizeReturnTo(value: string | null | undefined): string {
  if (value && value.startsWith('/') && !value.startsWith('//')) {
    return value;
  }

  return routes.home;
}

export function AuthPage() {
  const searchParams = useSearchParams();
  const redirectTo = sanitizeReturnTo(searchParams?.get('returnTo'));

  return (
    <Container className="auth-page py-10">
      <div className="auth-page__card mx-auto flex max-w-sm flex-col gap-6 rounded-xl bg-white p-8 shadow-sm">
        <h1 className="auth-page__title text-fg text-2xl font-bold">Вход</h1>
        <AuthByPhoneForm redirectTo={redirectTo} />
      </div>
    </Container>
  );
}
