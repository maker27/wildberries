import Link from 'next/link';

import { routes } from '@/shared/config/routes';
import { Container } from '@/shared/ui/container/Container';
import { CartIcon } from '@/shared/ui/icons/CartIcon';
import { Image } from '@/shared/ui/image/Image';

import { CartCounter } from './CartCounter';
import { UserMenu } from './UserMenu';

// Серверный компонент: статичная разметка шапки уходит как HTML без JS.
// Клиентские только маленькие островки — счётчик корзины и меню пользователя.
export function Header() {
  return (
    <header className="header sticky top-0 z-40 border-b border-[#ececec] bg-white">
      <Container className="header__inner flex h-16 items-center justify-between">
        <Link className="header__logo flex items-center gap-2" href={routes.home}>
          <Image alt="Дикие ягоды" height={32} src="/logo.png" width={32} />
          <span className="header__logo-text text-xl font-bold text-[#cb11ab]">Дикие ягоды</span>
        </Link>

        <nav className="header__nav flex items-center gap-6 text-sm">
          <Link className="header__link flex items-center gap-1.5 text-[#1a1a1a]" href={routes.cart}>
            <span className="header__cart-icon relative inline-flex shrink-0">
              <CartIcon className="header__icon h-5 w-5" />
              <CartCounter />
            </span>
            Корзина
          </Link>

          <UserMenu />
        </nav>
      </Container>
    </header>
  );
}
