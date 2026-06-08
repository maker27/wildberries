'use client';

import { useState } from 'react';
import Link from 'next/link';

import { useUserStore } from '@/entities/user';
import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button/Button';
import { UserIcon } from '@/shared/ui/icons/UserIcon';
import { Modal } from '@/shared/ui/modal/Modal';

// Островок: иконка-«профиль» с подписью. Стек-вёрстка (иконка над подписью)
// и фиксированная min-width — смена гость↔вошёл после rehydrate не двигает шапку.
export function UserMenu() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutOpen(false);
  };

  return (
    <div className="header__user flex min-w-12 justify-center">
      {user ? (
        <button
          className="header__logout flex flex-col items-center gap-1 transition-opacity hover:opacity-80"
          onClick={() => setIsLogoutOpen(true)}
          type="button"
        >
          <UserIcon className="header__icon h-6 w-6 shrink-0" />
          Выйти
        </button>
      ) : (
        <Link
          className="header__link flex flex-col items-center gap-1 transition-opacity hover:opacity-80"
          href={routes.auth}
        >
          <UserIcon className="header__icon h-6 w-6 shrink-0" />
          Войти
        </Link>
      )}

      <Modal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} title="Выйти из аккаунта?">
        <div className="header__logout-modal flex flex-col gap-4">
          <p className="text-muted text-sm">
            {user ? `Вы вошли как ${user.phone}. ` : ''}Вы вернётесь к просмотру каталога как гость.
          </p>
          <div className="header__logout-actions flex justify-end gap-3">
            <Button onClick={() => setIsLogoutOpen(false)} variant="secondary">
              Отмена
            </Button>
            <Button onClick={handleLogoutConfirm}>Выйти</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
