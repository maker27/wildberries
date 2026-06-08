import Link from 'next/link';

import { routes } from '@/shared/config/routes';
import { Container } from '@/shared/ui/container/Container';
import { CartIcon } from '@/shared/ui/icons/CartIcon';
import { Image } from '@/shared/ui/image/Image';

import { CartCounter } from './CartCounter';
import { SearchBar } from './SearchBar';
import { UserMenu } from './UserMenu';

// Серверный компонент: статичная разметка шапки уходит как HTML без JS.
// Клиентские только маленькие островки — счётчик корзины и меню пользователя.
export function Header() {
  return (
    <header className="header from-accent to-violet sticky top-0 z-40 bg-gradient-to-r text-white">
      <Container className="header__inner flex h-16 items-center justify-between gap-4">
        <Link className="header__logo flex shrink-0 items-center gap-2" href={routes.home}>
          <Image alt="Дикие ягоды" height={32} src="/logo.png" width={32} />
          <span className="header__logo-text hidden text-xl font-bold lowercase sm:inline">дикие ягоды</span>
        </Link>

        <SearchBar />

        <nav className="header__nav flex shrink-0 items-center gap-7 text-xs">
          <Link
            className="header__link flex flex-col items-center gap-1 transition-opacity hover:opacity-80"
            href={routes.cart}
          >
            <span className="header__cart-icon relative inline-flex shrink-0">
              <CartIcon className="header__icon h-6 w-6" />
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
