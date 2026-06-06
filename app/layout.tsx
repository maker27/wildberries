import type { Metadata } from 'next';

import { Header } from '@/widgets/header';
import '@/shared/styles/globals.css';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Wildberries — учебный маркетплейс',
  description: 'Учебная упрощённая копия маркетплейса на Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen">
        <Providers>
          <Header />
          <main className="main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
