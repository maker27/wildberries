'use client';

import Link from 'next/link';

import { selectCartCount, useCartStore } from '@/entities/cart';
import { useUserStore } from '@/entities/user';
import { routes } from '@/shared/config/routes';
import { Container } from '@/shared/ui/container/Container';

export function Header() {
  const cartCount = useCartStore(selectCartCount);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  return (
    <header className="header sticky top-0 z-40 border-b border-[#ececec] bg-white">
      <Container className="header__inner flex h-16 items-center justify-between">
        <Link className="header__logo text-xl font-bold text-[#cb11ab]" href={routes.home}>
          WB
        </Link>

        <nav className="header__nav flex items-center gap-6 text-sm">
          <Link className="header__link relative flex items-center gap-1 text-[#1a1a1a]" href={routes.cart}>
            Корзина
            {cartCount > 0 ? (
              <span className="header__cart-count flex h-5 min-w-5 items-center justify-center rounded-full bg-[#cb11ab] px-1 text-xs font-medium text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>

          {user ? (
            <div className="header__user flex items-center gap-3">
              <span className="header__phone text-[#777]">{user.phone}</span>
              <button
                className="header__logout text-[#cb11ab] hover:underline"
                onClick={logout}
                type="button"
              >
                Выйти
              </button>
            </div>
          ) : (
            <Link className="header__link text-[#1a1a1a]" href={routes.auth}>
              Войти
            </Link>
          )}
        </nav>
      </Container>
    </header>
  );
}
