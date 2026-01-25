# 📁 Структура проекта IThub School

Полная структура файлов и папок приложения электронного журнала.

## Главная структура

```
DIPLOM/
├── public/
│   └── index.html              # Главный HTML файл приложения
├── src/
│   ├── components/             # Переиспользуемые компоненты
│   ├── pages/                  # Страницы приложения
│   ├── App.jsx                 # Главный компонент
│   ├── App.css                 # Глобальные стили
│   └── index.tsx               # Точка входа React
├── package.json                # Конфигурация npm
├── tsconfig.json               # Конфигурация TypeScript
├── webpack.config.js           # Конфигурация Webpack
├── README.md                   # Основная документация
├── INSTALLATION.md             # Инструкция по установке
├── FEATURES.md                 # Описание функций
└── STRUCTURE.md               # Этот файл
```

## Подробная структура

### 📁 `/src`

#### Главные файлы

**App.jsx** (77 строк)
```
Главный компонент приложения, управляющий:
- Состоянием пользователя (user, currentPage, darkMode)
- Маршрутизацией между страницами
- Аутентификацией и выходом
- Темным режимом
```

**App.css** (500+ строк)
```
Глобальные стили содержат:
- CSS переменные (цвета, размеры, переходы)
- Базовые стили для всех компонентов
- Glassmorphism компоненты
- Адаптивный дизайн
- Темный режим поддержка
- Анимации и переходы
```

---

### 📁 `/src/components`

#### Navigation.jsx (90+ строк)
```jsx
export default function Navigation({ user, currentPage, setCurrentPage, onLogout, onToggleDarkMode })
```
**Функции:**
- Липкая навигационная панель
- Ссылки на все страницы
- Отображение информации о пользователе
- Кнопка темного режима
- Кнопка выхода
- Адаптивное меню для мобильных

**Структура:**
```html
<nav class="navbar">
  - Логотип/название
  - Desktop меню
  - Mobile меню (hamburger)
  - Пользовательская информация
  - Кнопки (тема, выход)
</nav>
```

#### Navigation.css (150+ строк)
```css
Стили навигации:
- Липкое позиционирование
- Glassmorphism эффекты
- Адаптивность (768px breakpoint)
- Анимации на hover
- Активное состояние ссылок
- Темный режим
```

---

### 📁 `/src/pages`

#### 1. LoginPage.jsx (129 строк)
```jsx
export default function LoginPage({ onLogin })
```
**Функции:**
- Форма входа с email и выбором роли
- 4 демо-аккаунта с быстрым входом
- Валидация формы
- Информационная секция
- Анимированные фоновые объекты

**Демо-аккаунты:**
- alexey@ithub.school (ученик)
- lyudmila@ithub.school (учитель)
- parent@ithub.school (родитель)
- admin@ithub.school (администратор)

#### LoginPage.css (250+ строк)
```css
- Форма входа со стеклянным эффектом
- Демо-кнопки в сетке 2x2
- Анимированные градиентные фоны
- Информационные карточки
- Полная адаптивность
```

---

#### 2. Dashboard.jsx (120 строк)
```jsx
export default function Dashboard({ user })
```
**Функции:**
- Приветственный баннер
- Статистика (6 карточек)
- Сегодняшние уроки
- Хронология недавних событий
- Советы и информация

**Компоненты:**
- Welcome section с персонализацией
- Stats grid (средняя оценка, оценки, задания, посещение, место)
- Lessons timeline
- Activity feed с временной шкалой
- Info cards с советами

#### Dashboard.css (350+ строк)
```css
- Стеклянные карточки
- Плавающие анимации
- Timeline для событий
- Gradient backgrounds
- Адаптивные сетки
```

---

#### 3. GradesPage.jsx (150+ строк)
```jsx
export default function GradesPage({ user })
```
**Функции:**
- Таблица оценок (10+ записей)
- Поиск по предмету/учителю
- Фильтрация по статусу и предмету
- Сортировка (дата, оценка, предмет)
- Форма добавления для учителей
- Статистика по предметам

**Данные:**
- 10 оценок по разным предметам
- Информация об учителе и дате
- Тип работы (контрольная, практическая и т.д.)

#### GradesPage.css (350+ строк)
```css
- Таблица с hover эффектами
- Цветные значки оценок
- Поле поиска
- Фильтры
- Карточки статистики
- Badge компоненты
```

---

#### 4. SchedulePage.jsx (180+ строк)
```jsx
export default function SchedulePage()
```
**Функции:**
- Выбор дня недели
- Timeline расписания
- Информация о каждом уроке
- Перемены между уроками
- Таблица звонков
- Легенда цветов

**Данные:**
- 5 дней (Пн-Пт)
- 8 уроков в день
- Время, кабинет, учитель для каждого
- Цветные кассификация по предметам

#### SchedulePage.css (350+ строк)
```css
- Timeline с линией
- Карточки уроков с цветными границами
- Селектор дней
- Таблица звонков
- Анимированный timeline
- Цветовые коды предметов
```

---

#### 5. HomeworkPage.jsx (170+ строк)
```jsx
export default function HomeworkPage()
```
**Функции:**
- Список 8+ домашних заданий
- Фильтрация по статусу и предмету
- Статистика (к выполнению, выполнено, просрочено)
- Отметить выполненным
- Удаление заданий
- Предупреждение о просрочке
- Советы по управлению временем

**Статусы:**
- pending (в ожидании) - желтый
- completed (выполнено) - зелёный
- overdue (просрочено) - красный

#### HomeworkPage.css (350+ строк)
```css
- Карточки заданий
- Цветные левые границы по статусу
- Значки статуса
- Таблица статистики
- Форма фильтрации
- Предупреждающие баннеры
```

---

#### 6. ProfilePage.jsx (160+ строк)
```jsx
export default function ProfilePage({ user })
```
**Функции:**
- Аватар и информация пользователя
- Редактирование личных данных
- Статистика (5+ показателей)
- История событий
- Образовательная информация
- Контакт с поддержкой

**Поля профиля:**
- Имя, email, телефон, адрес
- Класс, дата рождения
- Дата присоединения

#### ProfilePage.css (350+ строк)
```css
- Аватар с градиентом
- Форма редактирования
- Карточки статистики
- Timeline событий
- Образовательные карточки
- Адаптивная сетка
```

---

#### 7. AdminPanel.jsx (220+ строк)
```jsx
export default function AdminPanel()
```
**Функции:**
- Вкладки: пользователи, предметы, параметры
- Управление пользователями (добавить, редактировать, удалить)
- Управление предметами
- Параметры системы (безопасность, уведомления)
- Резервное копирование
- Информация о БД
- Статистика (всего пользователей, учеников, учителей, здоровье системы)

**Пользователи:**
- 6+ пользователей с разными ролями
- Фильтрация, поиск, сортировка
- Переключение статуса
- Удаление пользователей

#### AdminPanel.css (400+ строк)
```css
- Табы с состояниями
- Таблица пользователей
- Карточки предметов
- Карточки параметров
- Сетка статистики
- Цветные role badges
- Статус индикаторы
```

---

## 📊 Статистика файлов

### Размеры
```
App.jsx + App.css           ~18 KB
LoginPage.jsx + .css        ~8 KB
Dashboard.jsx + .css        ~13 KB
GradesPage.jsx + .css       ~12 KB
SchedulePage.jsx + .css     ~14 KB
HomeworkPage.jsx + .css     ~13 KB
ProfilePage.jsx + .css      ~11 KB
AdminPanel.jsx + .css       ~15 KB
Navigation.jsx + .css       ~6 KB
package.json                ~1 KB
────────────────────────────────
Итого: ~111 KB (всё готово к использованию!)
```

### Строки кода
```
JSX файлы:                  ~1200 строк
CSS файлы:                  ~2500 строк
Конфигурация:               ~50 строк
────────────────────────────────
Итого: ~3750 строк
```

### Компоненты
```
Разных компонентов:         7 страниц
Вложенные компоненты:       10+
Переиспользуемые:           5+
```

---

## 🔄 Зависимости между файлами

```
App.jsx
├── App.css (глобальные стили)
├── Navigation.jsx
│   └── Navigation.css
├── LoginPage.jsx
│   └── LoginPage.css
├── Dashboard.jsx
│   └── Dashboard.css
├── GradesPage.jsx
│   └── GradesPage.css
├── SchedulePage.jsx
│   └── SchedulePage.css
├── HomeworkPage.jsx
│   └── HomeworkPage.css
├── ProfilePage.jsx
│   └── ProfilePage.css
└── AdminPanel.jsx
    └── AdminPanel.css
```

---

## 📦 Внешние библиотеки

```json
{
  "react": "18.2.0",           // Основная библиотека
  "react-dom": "18.2.0",       // Рендеринг в DOM
  "react-icons": "4.12.0",     // Иконки (Font Awesome, Feather)
  "react-scripts": "5.0.1"     // Create React App
}
```

**Использованные иконки (react-icons):**
- FaHome, FaGraduate, FaCalendar, FaListCheck, FaUser, FaCog, FaSignOutAlt (Navigation)
- FaEnvelope, FaLock, FaChalkboardUser, FaShieldAlt, FaGraduate (LoginPage)
- FaGraduate, FaBook, FaListCheck, FaCalendar, FaTrophy, FaClipboard (Dashboard)
- FaFilter, FaSort, FaSearch, FaPlus, FaTrash, FaEdit (Grades)
- FaCalendar, FaClock, FaMapMarkerAlt, FaChalkboardUser (Schedule)
- FaClipboard, FaTrash, FaCheck, FaClock, FaExclamationCircle, FaPlus (Homework)
- FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBook, FaTrophy, FaCalendar, FaEdit, FaSave (Profile)
- FaUsers, FaBook, FaChartBar, FaCog, FaTrash, FaEdit, FaPlus, FaSearch (AdminPanel)

---

## 🎨 CSS Переменные (App.css)

```css
:root {
  /* Цвета IThub */
  --primary: #9D7BD1;              /* Лавандовый */
  --primary-dark: #7B5CA8;         /* Фиолетовый */
  --secondary: #C77DCA;            /* Розово-фиолетовый */
  --accent: #FF6B9D;               /* Розовый */
  
  /* Фоны */
  --bg-light: #F5F2F9;             /* Светлый фон */
  --bg-dark: #1A0F2E;              /* Тёмный фон */
  --bg-dark-secondary: #2D1B4E;    /* Дополнительный тёмный */
  
  /* Текст */
  --text-dark: #333333;            /* Тёмный текст */
  --text-light: #6B7280;           /* Светлый текст */
  --text-white: #FFFFFF;           /* Белый текст */
  
  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.15);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  
  /* Размеры */
  --spacing-xs: 0.5rem;
  --spacing-sm: 0.75rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Радиус */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  
  /* Переходы */
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Градиенты */
  --gradient-1: linear-gradient(135deg, #F5F2F9, #E8DFF5);
  --gradient-2: linear-gradient(135deg, #9D7BD1, #C77DCA);
  --gradient-3: linear-gradient(135deg, #7B5CA8, #FF6B9D);
}
```

---

## 📱 Точки разрыва адаптивности

```css
/* Desktop - 1200px и выше */
Полная версия всех элементов

/* Tablet - 768px до 1199px */
@media (max-width: 1024px)
- Сжатые сетки
- Уменьшенные размеры шрифтов
- Оптимизированное расположение

/* Mobile - до 768px */
@media (max-width: 768px)
- Мобильное меню (hamburger)
- Одноколонная сетка
- Увеличены области нажатия
- Вертикальное расположение элементов

/* Малые телефоны - до 480px */
@media (max-width: 480px)
- Минимальные отступы
- Переадаптированные формы
- Скрыты некоторые колонки таблиц
```

---

## ✅ Чек-лист полноты

- [x] Все 7 страниц созданы
- [x] Все CSS файлы существуют
- [x] Импорты CSS в компонентах
- [x] Навигация работает
- [x] Темный режим реализован
- [x] Адаптивный дизайн на всех брейкпойнтах
- [x] Glassmorphism эффекты везде
- [x] Демо-данные во всех компонентах
- [x] Функциональность (фильтры, поиск, редактирование)
- [x] localStorage для сохранения сессии
- [x] Документация полная

---

**Приложение полностью готово к использованию! 🎉**

Все файлы созданы, все компоненты работают, все стили применены.
