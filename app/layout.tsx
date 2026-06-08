import type { Metadata } from 'next';

import { Header } from '@/widgets/header';
import { GitHubCorner } from '@/shared/ui/github-corner/GitHubCorner';
import '@/shared/styles/globals.css';

import { StoreRehydrator } from './providers';

export const metadata: Metadata = {
  title: 'Маркетплейс Дикие ягоды',
  description: 'Упрощённая версия маркетплейса на Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const sourceCodeUrl = process.env.NEXT_PUBLIC_SOURCE_CODE_URL;

  return (
    <html lang="ru">
      <body className="min-h-screen">
        <StoreRehydrator>
          <Header />
          <main className="main">{children}</main>
        </StoreRehydrator>
        {sourceCodeUrl ? <GitHubCorner href={sourceCodeUrl} /> : null}
      </body>
    </html>
  );
}
