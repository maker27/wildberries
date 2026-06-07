import type { Metadata } from 'next';

import { Header } from '@/widgets/header';
import '@/shared/styles/globals.css';

import { StoreRehydrator } from './providers';

export const metadata: Metadata = {
  title: 'Маркетплейс Дикие ягоды',
  description: 'Упрощённая версия маркетплейса на Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen">
        <StoreRehydrator>
          <Header />
          <main className="main">{children}</main>
        </StoreRehydrator>
      </body>
    </html>
  );
}
