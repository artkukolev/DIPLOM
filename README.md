# School Personal Records Management (DIPLOM)

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0.1-cyan?logo=vite)](https://vitejs.dev/)
[![MUI](https://img.shields.io/badge/MUI-7.3.9-0081CB?logo=mui)](https://mui.com/)
[![Zod](https://img.shields.io/badge/Zod-4.x-000000?logo=zod)](https://zod.dev/)

Школьная система управления личными делами учащихся на React + TypeScript с RBAC и мок-сервисом данных.

## Особенности

- Роли: `admin`, `director`, `teacher`, `secretary`, `parent`, `student`
- CRUD для учеников и их личных дел
- Поиск, фильтры и сохранение фильтрации
- Журнал аудита и история изменений
- Тема: светлая / тёмная
- Формы: `react-hook-form` + `zod`
- Состояние: `zustand` + `@tanstack/react-query`
- UI: `@mui/material`
- Тесты: `vitest` + `@testing-library/react`
- GitHub Pages-ready: `HashRouter` + относительный `base` для Vite

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте `http://localhost:5173`.

## Сборка

```bash
npm run build
```

## GitHub Pages

```bash
npm run deploy
```

Скрипт `deploy` выполняет сборку и публикует содержимое `dist/` на ветку `gh-pages`.

## Тесты

```bash
npm test
npm run test:coverage
```

## Локальные аккаунты

- `admin@example.com`
- `director@example.com`
- `teacher@example.com`
- `secretary@example.com`
- `parent@example.com`
- `student@example.com`

## Структура проекта

- `src/api` — мок-сервер
- `src/hooks` — хуки запросов
- `src/store` — Zustand-сторы
- `src/pages` — страницы
- `src/components` — компоненты UI
- `docs/` — документация

## Документация

Дополнительные инструкции находятся в папке `docs/`.
