# @max-ts/kit

`@max-ts/kit` — библиотека React-компонентов для построения интерфейсов на базе единой дизайн-системы. Проект использует React 19, Rslib/Rsbuild для сборки, Vanilla Extract для типобезопасных стилей и Storybook для разработки и документации компонентов.

## Возможности

- Набор UI-компонентов для layout, отображения данных, форм, обратной связи, навигации и действий.
- Единая тема с токенами цветов, отступов, типографики, теней и радиусов скругления.
- Компоненты с TypeScript-типами, вариантами размера/вида и поддержкой `asChild`, где это применимо.
- Интеграция с Radix UI, Base UI и React Hook Form для доступных и расширяемых интерфейсов.
- Отдельный CSS-бандл `styles.css` для подключения стилей библиотеки.

## Технологии

- **React 19** — основа компонентов.
- **Rslib/Rsbuild** — сборка библиотеки в ESM-формате и генерация деклараций TypeScript.
- **Vanilla Extract** — CSS-in-TypeScript с использованием токенов темы.
- **Storybook** — разработка, просмотр и документация компонентов.
- **Vitest** — unit- и regression-тесты компонентов.
- **Biome** — форматирование и статический анализ.
- **TypeScript** — строгая типизация публичного API.

## Структура проекта

- `src/components/` — UI-компоненты библиотеки.
- `src/form/` — компоненты и утилиты для интеграции с React Hook Form.
- `src/theme/` — глобальная тема, CSS-переменные и дизайн-токены.
- `src/utils.ts` — общие утилиты, включая helpers для отступов и размеров.
- `stories/` — Storybook-истории компонентов.
- `lib/` — директория результата сборки.

## Команды

```bash
pnpm dev
```

Запускает dev-сервер с hot reload.

```bash
pnpm build
```

Собирает библиотеку через Rslib.

```bash
pnpm storybook
```

Запускает Storybook на порту `6006`.

```bash
pnpm build:storybook
```

Собирает Storybook для публикации.
```bash
pnpm test
```

Запускает unit- и regression-тесты в jsdom.

```bash
pnpm test:watch
```

Запускает Vitest в watch-режиме.

```bash
pnpm lint
```

Запускает проверки Biome и TypeScript.

## Архитектура компонентов

Компоненты обычно располагаются в отдельных директориях внутри `src/components/` и включают:

1. `ComponentName.tsx` — реализация компонента.
2. `styles.css.ts` — стили Vanilla Extract.
3. `types.ts` — публичные типы, если компоненту нужны отдельные типы.
4. `index.ts` — экспорт публичного API компонента.
5. `stories/ComponentName.stories.tsx` — Storybook-история.

При создании компонентов используются токены из `~/theme`, helpers `spacing()` и `negativeSpacing()` из `~/utils`, а также существующие паттерны вариантов `size`, `variant` и `asChild`.

## Алиасы

- `~/components` → `src/components/index.ts`
- `~/form` → `src/form/index.ts`
- `~/theme` → `src/theme/index.ts`
- `~/utils` → `src/utils.ts`

## Стилизация

Все значения цветов, отступов, типографики, теней и радиусов должны браться из дизайн-системы. Для Vanilla Extract важно не использовать селекторы дочерних элементов внутри `style()`; такие правила следует выносить в `globalStyle()`.
