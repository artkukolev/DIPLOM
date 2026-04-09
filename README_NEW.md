# 📚 Система управления личными делами учащихся

> Полнофункциональное веб-приложение для управления документами студентов, с красивым современным интерфейсом.

## 🎯 Статус: ✅ ГОТОВ К ПРЕДЗАЩИТЕ

### Ключевые особенности

- 🎨 **Минималистичный дизайн** с лавандовой палитрой
- 🌙 **Полная поддержка тёмной темы**
- 📱 **100% адаптивный дизайн** (мобиль, планшет, десктоп)
- ⚡ **Плавные анимации** на Framer Motion
- 🔐 **Система ролей** (6 типов пользователей)
- 📊 **Красивые таблицы и графики**
- 🔍 **Поиск и фильтрация данных**
- 🌐 **Развёрнуто на GitHub Pages**

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev
# → http://localhost:5173

# Сборка для production
npm run build

# Тестирование
npm run test
npm run lint
```

## 📖 Демонстрация

На главной странице (Login) можно **одной кнопкой** войти как:

| Роль             | Кнопка    | Что видит               |
| ---------------- | --------- | ----------------------- |
| 👔 Директор      | Директор  | Полная статистика школы |
| ⚙️ Администратор | Админ     | Управление системой     |
| 📋 Секретарь     | Секретарь | Работа с документами    |
| 📚 Учитель       | Учитель   | Класс и оценки          |
| 👨‍👩‍👧 Родитель      | Родитель  | Данные о ребёнке        |
| 👨‍🎓 Ученик        | Ученик    | Личное дело             |

## 🎨 Страницы приложения

### 1. **Login Page** ([src/pages/LoginPage.tsx](src/pages/LoginPage.tsx))

![Status](https://img.shields.io/badge/status-✅_Done-green)

- Выбор роли в виде карточек
- Email-форма для входа
- Быстрый demo-mode для каждой роли
- Gradient background с анимацией

```
Особенности:
✨ Анимированный выбор ролей
🎯 One-click demo login
🌙 Тёмная тема
📱 Responsive
```

### 2. **Dashboard Page** ([src/pages/DashboardPage.tsx](src/pages/DashboardPage.tsx))

![Status](https://img.shields.io/badge/status-✅_Done-green)

- Приветствие с аватаром
- 4 метрических карточки (Total, Active, Classes, Inactive)
- Быстрые действия (Add, List, Audit, Profile)
- Таблица последних событий
- Animated staggerChildren

```
Особенности:
📊 Метрики в реал-тайме
⚡ Быстрые действия
🎯 Ролевой контроль доступа
📈 Animированные контейнеры
```

### 3. **Students List Page** ([src/pages/StudentsPage.tsx](src/pages/StudentsPage.tsx))

![Status](https://img.shields.io/badge/status-✅_Done-green)

- Поиск по ФИО и контактам
- Фильтры по классу и статусу
- Таблица студентов со статусами
- Экспорт в Excel
- Summary карточки

```
Особенности:
🔍 Поиск в реал-тайме
📋 Multi-filter поддержка
📊 Красивые таблицы
📈 Live statistics
```

### 4. **Student Detail Page** ([src/pages/StudentDetailPage.tsx](src/pages/StudentDetailPage.tsx))

![Status](https://img.shields.io/badge/status-✅_Done-green)

- Аватар и базовая информация
- 5 вкладок (Info, Notes, Documents, Parents, History)
- Подробные данные о студенте
- Mock-данные для демо

```
Особенности:
🗂️ Табберная навигация
📋 Подробные профили
📝 История изменений
🎯 Tab switching
```

### 5. **Profile Page** ([src/pages/ProfilePage.tsx](src/pages/ProfilePage.tsx))

![Status](https://img.shields.io/badge/status-✅_Done-green)

- Информация о текущем пользователе
- Аватар + роль + статус
- Мои данные (if student)
- Быстрые действия (3 кнопки)
- Кнопка выхода

```
Особенности:
👤 User profile
🎖️ Role badge
⚡ Quick actions
🚪 Logout
```

## 🎨 Дизайн-система

### Компоненты UI

```
src/components/ui/
├── Button.tsx      (primary, secondary, ghost, destructive)
├── Card.tsx        (default, glass, flat)
├── Input.tsx       (с вал-я, error state)
├── Badge.tsx       (success, warning, error, info)
├── Avatar.tsx      (с инициалами)
├── Table.tsx       (striped, bordered)
├── Select.tsx      (выпадающие меню)
└── Modal.tsx       (модальные окна)
```

### Цветовая палитра

```
Primary:    #A855F7 (Lavender)
Secondary:  #C084FC (Light Purple)
Light BG:   #FAF5FF
Dark BG:    #1F2937 (gray-900)

Success:    #10B981 (Emerald)
Warning:    #F59E0B (Amber)
Error:      #EF4444 (Red)
Info:       #3B82F6 (Blue)
```

### Типографика

```
Font Family:
- Serif:  Playfair Display (заголовки)
- Sans:   Inter (основной текст)

Line Heights:
- Body:   1.6
- Headers: 1.2
```

## 🛠️ Технический стек

| Технология    | Версия | Назначение       |
| ------------- | ------ | ---------------- |
| React         | 19.2.4 | Framework        |
| TypeScript    | 5.9    | Type safety      |
| Vite          | 8.0.2  | Build tool       |
| Tailwind CSS  | 3.3.6  | Styling          |
| Framer Motion | 10+    | Animations       |
| Zustand       | -      | State management |
| React Router  | 6      | Routing          |

## 📦 Структура проекта

```
src/
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── StudentsPage.tsx
│   ├── StudentDetailPage.tsx
│   ├── ProfilePage.tsx
│   ├── AuditLogPage.tsx
│   └── ...
├── components/
│   ├── Layout.tsx
│   ├── ProtectedRoute.tsx
│   ├── ThemeProvider.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Badge.tsx
│       ├── Avatar.tsx
│       ├── Table.tsx
│       ├── Select.tsx
│       └── Modal.tsx
├── context/
│   └── ThemeContext.tsx
├── store/
│   ├── authStore.ts
│   └── themeStore.ts
├── hooks/
│   ├── useAudit.ts
│   └── useStudents.ts
├── utils/
│   └── storage.ts
├── api/
│   └── mockDb.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🎬 Как использовать

### 1. Запуск локально

```bash
npm install
npm run dev
# открыть http://localhost:5173
```

### 2. Вход в приложение

На странице логина нажать любую кнопку роли (e.g., "Директор") и вы попадёте на Dashboard этой роли.

### 3. Навигация

- **Левая панель** — основная навигация
- **Header** — тема, профиль, выход
- **Breadcrumbs** — быстрая навигация

### 4. Переключение темы

Нажать на иконку луны/солнца в header для тёмной/светлой темы.

### 5. Экспорт данных

На странице Students нажать кнопку "Экспорт Excel" для скачивания таблицы.

## 🔧 Команды

```bash
npm run dev      # Запуск dev сервера
npm run build    # Сборка для production
npm run preview  # Preview собранного приложения
npm run test     # Запуск тестов
npm run lint     # Проверка кода
```

## 📊 Размер сборки

```
✓ Собрано успешно за 1.18 сек

dist/index.html          0.47 KB (gzip: 0.30 KB)
dist/assets/index.css   40.86 KB (gzip: 7.41 KB)
dist/assets/index.js   741.62 KB (gzip: 228.56 KB)
```

## 🧪 Готовность к демонстрации

- ✅ **Login страница** — красивая, работающая
- ✅ **Dashboard** — со всеми метриками
- ✅ **Список студентов** — с фильтрами и поиском
- ✅ **Профиль студента** — с вкладками
- ✅ **Профиль пользователя** — полный функционал
- ✅ **Тёмная тема** — во всём приложении
- ✅ **Адаптивный дизайн** — мобильно-friendly
- ✅ **Анимации** — Framer Motion на всех компонентах
- ✅ **Production build** — без ошибок

## 📝 Примечания

### Что работает реально

- ✅ Переключение ролей
- ✅ Фильтрация и поиск
- ✅ Темная/светлая тема
- ✅ Все навигационные ссылки
- ✅ Responsive дизайн

### Что используется mock-данные

- 📝 Личные записи, документы, история
- 📧 Email авторизация (не подключена к API)
- 💾 Данные сохраняются только в localStorage

## 🚀 Развёртывание

Приложение развёрнуто на **GitHub Pages**:

```
https://artemkukolev.github.io/DIPLOM/
```

```bash
npm run build   # Собрать
npm run deploy  # Запушить на GitHub Pages
```

## 📞 Контакты

Вопросы? Пишите в Issues репозитория.

---

**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Last Updated:** 10 апреля 2026  
**License:** MIT
