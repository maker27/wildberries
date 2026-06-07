# Дикие ягоды (маркетплейс)

Упрощённая копия маркетплейса Wildberries на Next.js. Главная цель — не объём функциональности, а **чистая архитектура**: предсказуемая структура по FSD, разделение server-state и client-state, разделение ответственности и удобство расширения.

## Что это

Небольшой, но архитектурно аккуратный интернет-магазин: каталог товаров, карточки товаров, корзина, оформление заказа, фиктивная оплата, авторизация по телефону и отслеживание заказа.

## Возможности

- **Главная** (`/`) — список из 5–10 товаров с изображением, ценой, рейтингом, отзывами, кнопкой «в корзину».
- **Страница товара** (`/products/[productId]`) — описание, характеристики, рейтинг, моковые отзывы, добавление в корзину.
- **Корзина** (`/cart`) — список товаров, изменение количества, удаление, итоговая сумма, empty-state. Хранится в Zustand + localStorage.
- **Оформление заказа** (`/checkout`) — данные получателя и адреса с валидацией. Доступ только для авторизованных (защита через `middleware.ts`).
- **Фиктивная оплата** (`/payment/[orderId]`) — кнопка «Оплатить» ставит `paidAt`.
- **Авторизация** (`/auth`) — фиктивный вход по телефону + любой 4-значный код. React Router (`MemoryRouter`) только внутри этого флоу.
- **Отслеживание заказа** (`/orders/[orderId]/tracking`) — стадии `created → paid → assembling → packed → inDelivery → delivered`. Стадия считается детерминированно от `paidAt` (5 минут на стадию), переживает перезагрузку. Уведомления через Web Notification API с fallback на in-app.

## Стек

| Слой | Технологии |
|------|-----------|
| Фреймворк | Next.js 15 (App Router), React 19, TypeScript 5 |
| Server-state | Redux Toolkit + RTK Query (только заказы) |
| Client-state | Zustand (корзина, пользователь) + localStorage |
| БД | SQLite (better-sqlite3) + Drizzle ORM |
| Валидация | Zod |
| Роутинг auth-флоу | React Router (`MemoryRouter`, изолированно) |
| Стили | Tailwind CSS 4 + BEM-нейминг |
| Качество | ESLint, Prettier, Husky, lint-staged |

## Архитектура

Проект построен по **FSD** (Feature-Sliced Design):

```
app/                  Next.js App Router (роуты, layouts, providers, API routes) — в корне репозитория
src/
  pages/              композиция страниц
  widgets/            крупные блоки UI (header, product-list, cart-list, order-tracking, ...)
  features/           пользовательские действия (add-to-cart, auth-by-phone, fake-payment, ...)
  entities/           бизнес-сущности (product, review, cart, order, user)
  shared/             UI-kit, lib, config, base API, общие типы
  server/             серверный слой вне FSD (server-only): Drizzle-схема, доступ к данным, seed
  mock/               исходные данные для seed
docs/adr/             архитектурные решения (ADR)
```

### Ключевые архитектурные решения (см. `docs/adr/`)

- **0001** — SQLite + Drizzle как хранилище.
- **0002** — каталог читается в Server Components напрямую через `src/server/`; RTK Query — только для заказов.
- **0003** — React Router используется исключительно в auth-флоу через `MemoryRouter`, не как основной роутер.
- **0004** — серверный слой `src/server/` живёт вне FSD.
- **0005** — App Router размещён в корне репозитория (`/app`).

### Разделение состояния

- **Каталог** (товары, отзывы) — Server Components, чтение из `src/server/data/` напрямую.
- **Заказы** — реальный server-state в SQLite, доступ через RTK Query поверх `/api/orders*`.
- **Корзина и пользователь** — client-state в Zustand, персист в localStorage.

## Хранилище данных

SQLite-файл лежит в `./data/app.sqlite` (WAL-режим, FK включены). Схема создаётся, а каталог наполняется из `src/mock/` **автоматически при старте** — отдельный шаг сидинга не нужен.

## Требования

- Node.js >= 22 (`nvm use 22`)

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
```

## Скрипты

```bash
npm run dev           # дев-сервер
npm run build         # прод-сборка
npm run start         # прод-сервер
npm run lint          # ESLint
npm run lint:fix      # ESLint --fix
npm run format        # Prettier --write
npm run format:check  # Prettier --check
```
