# React Router (MemoryRouter) только внутри auth

**Status:** accepted

Next.js App Router — единственный роутер страниц. React Router используется изолированно через `MemoryRouter` внутри одного client-компонента auth-флоу (шаги телефон → код) и нигде больше.

## Почему

- В Next.js второй роутер для навигации страниц избыточен и читается как resume-driven development.
- Единственный реальный кандидат на локальный многошаговый UI-флоу — двухшаговая авторизация. Это витрина изоляции MemoryRouter, не замена App Router.

## Consequences

- Честная формулировка для защиты: «App Router владеет URL-пространством; MemoryRouter живёт внутри одного компонента и не пересекается с ним. `useState` тоже бы справился — это демонстрация инкапсуляции стороннего роутера».
- Запрещено: `BrowserRouter`, React Router в checkout/tracking/любых других местах.
