'use client';

import { type FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { routes } from '@/shared/config/routes';
import { SearchIcon } from '@/shared/ui/icons/SearchIcon';

export function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState('');

  // Подхватываем текущий запрос из URL на клиенте (без useSearchParams,
  // чтобы не требовать Suspense на статических страницах в шапке).
  useEffect(() => {
    setValue(new URLSearchParams(window.location.search).get('q') ?? '');
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = value.trim();

    router.push(query ? `${routes.home}?q=${encodeURIComponent(query)}` : routes.home);
  };

  return (
    <form className="search-bar relative flex-1" onSubmit={handleSubmit} role="search">
      <label className="sr-only" htmlFor="catalog-search">
        Поиск товаров
      </label>
      <input
        className="search-bar__input text-fg placeholder:text-muted h-11 w-full rounded-full bg-white pr-12 pl-4 text-sm outline-none"
        id="catalog-search"
        onChange={(event) => setValue(event.target.value)}
        placeholder="Найти товары"
        type="search"
        value={value}
      />
      <button
        aria-label="Найти"
        className="search-bar__submit text-accent hover:bg-accent-soft absolute top-1/2 right-1.5 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-colors"
        type="submit"
      >
        <SearchIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
