import type { Metadata } from 'next';

import { Header } from '@/widgets/header';
import { getProducts } from '@/server/data/products';
import '@/shared/styles/globals.css';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Маркетплейс Дикие ягоды',
  description: 'Упрощённая версия маркетплейса на Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cartProducts = getProducts().map((product) => ({
    productId: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
  }));

  return (
    <html lang="ru">
      <body className="min-h-screen">
        <Providers cartProducts={cartProducts}>
          <Header />
          <main className="main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
