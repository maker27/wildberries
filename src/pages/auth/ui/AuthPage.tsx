'use client';

import { useSearchParams } from 'next/navigation';

import { AuthByPhoneForm } from '@/features/auth-by-phone';
import { routes } from '@/shared/config/routes';
import { Container } from '@/shared/ui/container/Container';

export function AuthPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('returnTo') || routes.home;

  return (
    <Container className="auth-page py-10">
      <div className="auth-page__card mx-auto flex max-w-sm flex-col gap-6 rounded-xl bg-white p-8 shadow-sm">
        <h1 className="auth-page__title text-2xl font-bold text-[#1a1a1a]">Вход</h1>
        <AuthByPhoneForm redirectTo={redirectTo} />
      </div>
    </Container>
  );
}
