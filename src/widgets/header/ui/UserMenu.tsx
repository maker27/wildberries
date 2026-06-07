'use client';

import Link from 'next/link';

import { useUserStore } from '@/entities/user';
import { routes } from '@/shared/config/routes';
import { UserIcon } from '@/shared/ui/icons/UserIcon';

// Островок: телефон/выход или ссылка на вход. Слот имеет фиксированную min-width
// и выравнивание вправо — смена гость↔вошёл после rehydrate не двигает шапку (CLS).
export function UserMenu() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  return (
    <div className="header__user flex min-w-40 items-center justify-end gap-3">
      {user ? (
        <>
          <span className="header__phone text-[#777]">{user.phone}</span>
          <button className="header__logout text-[#cb11ab] hover:underline" onClick={logout} type="button">
            Выйти
          </button>
        </>
      ) : (
        <Link className="header__link flex items-center gap-1.5 text-[#1a1a1a]" href={routes.auth}>
          <UserIcon className="header__icon h-5 w-5 shrink-0" />
          Войти
        </Link>
      )}
    </div>
  );
}
