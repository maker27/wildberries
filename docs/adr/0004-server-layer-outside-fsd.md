# Серверный слой в src/server/ вне FSD

**Status:** accepted

FSD — методология фронтенда. Серверный код (схема Drizzle, подключение к БД, data-access `getProducts/getOrder/...`) живёт в отдельном `src/server/` вне слоёв FSD и помечается пакетом `server-only`.

## Почему

- Разделение клиент/сервер важнее FSD-пуризма. Если положить data-access в `entities/*/api` и реэкспортить через `index.ts`, любой client-импорт из этого слайса затащит `better-sqlite3` в клиентский бандл → ошибка билда.
- `server-only` даёт жёсткую границу на этапе сборки: серверный модуль физически нельзя импортировать в client-компонент.

## Consequences

- Route handlers и RSC импортят данные из `src/server/`.
- FSD-слои (`entities/widgets/features/...`) остаются чисто фронтовыми. Типы, общие для клиента и сервера, выносятся в слайсы (`entities/*/model/types.ts`) и не тянут серверных зависимостей.
