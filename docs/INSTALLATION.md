# Инструкция по установке и запуску

## Требования

- Node.js (версия 14+)
- npm (версия 6+)
- macOS, Windows или Linux

## Пошаговая установка

### 1. Установка зависимостей

```bash
# Перейти в корневую папку проекта
cd DIPLOM

# Установить зависимости для backend и frontend
npm install

# Установить зависимости для frontend
cd frontend
npm install
cd ..
```

### 2. Запуск приложения

#### Вариант 1: Запуск обоих серверов одновременно

```bash
npm run dev
```

Это запустит:
- Backend на `http://localhost:5000`
- Frontend на `http://localhost:3000`

#### Вариант 2: Запуск серверов отдельно

**Терминал 1 - Backend:**
```bash
npm start
```

**Терминал 2 - Frontend:**
```bash
npm run client
```

### 3. Открыть приложение

Откройте браузер и перейдите на:
```
http://localhost:3000
```

### 4. Вход в систему

Используйте тестовые учётные данные:
- **Пользователь:** admin
Используйте тестовые учётные данные:
- **Пользователь:** admin
- **Пароль:** admin123

### 5. Новые возможности интерфейса

После входа вы увидите обновлённый **ELLE-inspired дизайн**:

- **💎 Премиальный интерфейс** - элегантный дизайн в стиле журнала ELLE
- **🌸 Женственная эстетика** - лавандовые и фиолетовые тона
- **📖 Изящная типографика** - Playfair Display для заголовков, Inter для текста
- **🌙 Темная/светлая тема** - переключатель в верхней части боковой панели
- **📱 Адаптивный дизайн** - оптимизировано для всех устройств
- **⚡ Плавные анимации** - элегантные переходы и микро-взаимодействия

## Структура файлов

```
DIPLOM/
├── backend/
│   ├── server.js              # Главный файл сервера
│   ├── database.js            # Инициализация и управление БД
│   ├── package.json
│   ├── routes/
│   │   ├── auth.js            # Маршруты аутентификации
│   │   ├── students.js        # CRUD операции для учащихся
│   │   ├── records.js         # CRUD операции для личных дел
│   │   └── documents.js       # Управление документами
│   ├── middleware/
│   │   └── auth.js            # Middleware для проверки токена
│   └── students.db            # База данных SQLite
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js      # API клиент для работы с бэком
│   │   ├── components/
│   │   │   ├── StudentForm.js       # Форма добавления/редактирования
│   │   │   ├── StudentList.js       # Список учащихся
│   │   │   ├── RecordsView.js       # Просмотр личных дел
│   │   │   └── RecordForm.js        # Форма добавления дела
│   │   ├── pages/
│   │   │   ├── Login.js             # Страница входа
│   │   │   └── Dashboard.js         # Главная панель
│   │   ├── App.js             # Главный компонент
│   │   ├── index.js           # Точка входа
│   │   ├── index.css          # Apple-inspired дизайн система
│   │   └── index.js           # Точка входа
│   └── package.json
│
├── docs/
│   ├── API.md                 # Документация API
│   ├── USER_GUIDE.md          # Руководство пользователя
│   └── INSTALLATION.md        # Этот файл
│
├── README.md                  # Описание проекта
└── package.json               # Корневой package.json
```

## Решение проблем

### Ошибка: "Port 5000 is already in use"

Закройте процесс, занимающий порт 5000, или измените порт в `backend/server.js`:

```javascript
const PORT = process.env.PORT || 5001; // Измените на 5001 или другой порт
```

### Ошибка: "Port 3000 is already in use"

В терминале frontend'а перед запуском выполните:

```bash
# macOS/Linux
PORT=3001 npm start

# Windows
set PORT=3001 && npm start
```

### Ошибка: "Cannot find module"

Переустановите зависимости:

```bash
rm -rf node_modules frontend/node_modules
npm install
cd frontend && npm install && cd ..
```

### БД не инициализируется

Убедитесь, что папка `backend/` имеет права на запись. Удалите файл `backend/students.db` и перезапустите сервер.

## Переменные окружения

Создайте файл `.env` в корне проекта:

```env
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## Скрипты npm

| Команда | Описание |
|---------|---------|
| `npm start` | Запуск backend сервера |
| `npm run dev` | Запуск backend и frontend одновременно |
| `npm run server` | Запуск backend в режиме разработки с nodemon |
| `npm run client` | Запуск frontend |
| `npm run build` | Сборка frontend для production |

## Технический стек

**Backend:**
- Node.js + Express.js
- SQLite3 для базы данных
- JWT для аутентификации
- bcryptjs для хеширования паролей

**Frontend:**
- React 18+
- React Router для навигации
- Axios для API запросов
- **ELLE-inspired CSS** - кастомная дизайн система в стиле журнала ELLE
- CSS Custom Properties для динамического темизирования
- Playfair Display & Inter шрифты

## Лицензия

MIT

## Поддержка

Если у вас возникли проблемы, проверьте:
1. Версию Node.js: `node --version`
2. Наличие необходимых портов: `lsof -i :5000` и `lsof -i :3000`
3. Логи backend: смотрите вывод в терминале
4. Консоль браузера: F12 → Console для ошибок frontend
