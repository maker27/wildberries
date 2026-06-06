# App Router в корне репозитория, FSD — в src/

**Status:** accepted

CLAUDE.md показывал Next.js App Router в `src/app`. Фактически он размещён в корневом `/app`, а все FSD-слои остаются в `src/` (`@/*` → `./src/*`).

## Почему

- Next.js резервирует имя `pages` для Pages Router. FSD-слой `src/pages` Next воспринимает как Pages Router и падает с `Conflicting app and page files` на маршрутах `/auth`, `/cart`, `/checkout`.
- App Router и Pages Router должны резолвиться из одной базовой директории. Смешение (`src/app` + `pages` в корне) ломает генерацию типов (`.next/types/validator.ts` ссылается на несуществующий `../../app`).
- Решение: App Router и заглушка Pages Router живут в корне (`/app`, `/pages`), FSD-слои — в `src/`. Пустой `/pages` (только README) заставляет Next резолвить Pages Router туда и игнорировать `src/pages`.

## Considered Options

- **pageExtensions-колокация** (`*.page.tsx`) — отклонено: ломает читаемость (`page.page.tsx`, `layout.page.tsx`).
- **Переименовать FSD-слой `pages`** — отклонено: нарушает FSD-номенклатуру, на которой настаивает спека.

## Consequences

- `/app` и `/pages` (заглушка) — в корне; вся бизнес-логика и FSD-слои — в `src/`, импорт через `@/`.
- `src/pages` (FSD) импортируется только как `@/pages/*`, для роутинга Next невидим.
- `src/middleware.ts` переехал в корневой `middleware.ts` (требование Next при App Router в корне).
