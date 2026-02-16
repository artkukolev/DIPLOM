# 🏗️ Архитектура и компоненты системы

## Backend архитектура

### 📡 server.js - Главный сервер
```javascript
- Инициализирует Express приложение
- Подключает CORS и body-parser
- Регистрирует все маршруты API
- Слушает на порту 5000
- Обрабатывает ошибки
```

### 💾 database.js - Управление БД
```javascript
- Инициализирует SQLite3 БД
- Создаёт 5 таблиц
- Предоставляет методы: get, all, run
- Автоматически создаёт админ аккаунт
```

### 🔐 middleware/auth.js
```javascript
authMiddleware    - Проверяет JWT токен
adminMiddleware   - Проверяет роль администратора
```

### 🛣️ routes/auth.js - Аутентификация
```javascript
POST   /auth/login      - Вход в систему
POST   /auth/register   - Регистрация нового пользователя
GET    /auth/me         - Получить текущего пользователя
```

### 👥 routes/students.js - Управление учащимися
```javascript
GET    /students        - Список всех учащихся (с поиском)
POST   /students        - Создать учащегося
GET    /students/:id    - Получить учащегося
PUT    /students/:id    - Обновить учащегося
DELETE /students/:id    - Удалить учащегося
```

### 📋 routes/records.js - Личные дела
```javascript
GET    /records/student/:studentId  - Личные дела ученика
POST   /records                      - Создать дело
GET    /records/:id                  - Получить дело
PUT    /records/:id                  - Обновить дело
DELETE /records/:id                  - Удалить дело
```

### 📄 routes/documents.js - Документы
```javascript
GET    /documents/record/:recordId   - Документы дела
POST   /documents                    - Добавить документ
DELETE /documents/:id                - Удалить документ
```

## Frontend архитектура

### 📱 pages/Login.js - Страница входа
```
- Красивая форма входа с градиентом
- Валидация учётных данных
- Сохранение токена в localStorage
- Перенаправление на Dashboard после входа
```

### 🏠 pages/Dashboard.js - Главная страница
```
- Трёхколонный лейаут
- Левая колонка: список учащихся с поиском
- Правая колонка: профиль и личные дела
- Header с информацией о пользователе
- Кнопка выхода
```

### 📝 components/StudentForm.js
```
- Форма для добавления нового учащегося
- Поля для базовой информации
- Данные родителя/опекуна
- Валидация формы
- Редактирование существующего учащегося
```

### 👤 components/StudentList.js
```
- Список учащихся
- Выделение выбранного
- Быстрое удаление с подтверждением
- Показывает класс и уровень
```

### 📚 components/RecordsView.js
```
- Профиль учащегося с основной информацией
- Список личных дел с фильтрацией
- Цветные теги для приоритета и статуса
- Кнопка для добавления нового дела
- Удаление дел
```

### 📋 components/RecordForm.js
```
- Форма для создания личного дела
- Поля: название, описание, категория
- Выбор приоритета (3 уровня)
- Выбор статуса (открыто, закрыто, архив)
- Установка срока выполнения
```

### 🔗 api/client.js - API клиент
```
- Создаёт Axios instance с baseURL
- Автоматически добавляет JWT токен
- Интерцепторы для запросов/ответов
- Методы для всех API операций:
  * authAPI.login, register, getCurrentUser
  * studentsAPI.getAll, create, update, delete
  * recordsAPI.getByStudent, create, update, delete
  * documentsAPI.getByRecord, create, delete
```

### 🎨 CSS и стили
```
- index.css: Tailwind + кастомные стили
- tailwind.config.js: Расширенная палитра (фиолетовый, розовый, лавандовый)
- Анимации при наведении
- Градиенты и тени
- Адаптивный дизайн
```

## База данных (SQLite3)

### users таблица
```sql
id              INTEGER PRIMARY KEY
username        TEXT UNIQUE
password        TEXT (хеширован)
role            TEXT (admin / teacher)
fullName        TEXT
email           TEXT
createdAt       DATETIME
```

### students таблица
```sql
id              INTEGER PRIMARY KEY
firstName       TEXT
lastName        TEXT
patronymic      TEXT
dateOfBirth     TEXT
enrollmentDate  TEXT
grade           TEXT
class           TEXT
parentName      TEXT
parentPhone     TEXT
parentEmail     TEXT
address         TEXT
status          TEXT (active / inactive / graduated)
createdAt       DATETIME
updatedAt       DATETIME
```

### personal_records таблица
```sql
id              INTEGER PRIMARY KEY
studentId       INTEGER (FK → students)
title           TEXT
description     TEXT
category        TEXT
status          TEXT (open / closed / archived)
priority        TEXT (low / medium / high)
createdBy       INTEGER (FK → users)
dueDate         TEXT
createdAt       DATETIME
updatedAt       DATETIME
```

### documents таблица
```sql
id              INTEGER PRIMARY KEY
recordId        INTEGER (FK → personal_records)
fileName        TEXT
fileType        TEXT
fileSize        INTEGER
filePath        TEXT
documentType    TEXT
uploadedBy      INTEGER (FK → users)
uploadedAt      DATETIME
```

### audit_log таблица
```sql
id              INTEGER PRIMARY KEY
action          TEXT (CREATE / UPDATE / DELETE)
entityType      TEXT (STUDENT / RECORD / DOCUMENT)
entityId        INTEGER
userId          INTEGER (FK → users)
oldValue        TEXT (JSON)
newValue        TEXT (JSON)
createdAt       DATETIME
```

## Поток данных

```
User Input (UI)
    ↓
React Component
    ↓
API Client (axios)
    ↓
HTTP Request
    ↓
Express Route
    ↓
Auth Middleware (проверка JWT)
    ↓
Controller Logic
    ↓
Database Operation (SQLite)
    ↓
Response (JSON)
    ↓
React State Update
    ↓
Re-render UI
```

## Безопасность

```
1. JWT Authentication
   - Выдаётся при login
   - Отправляется в каждом запросе
   - Проверяется на сервере

2. Password Security
   - Хешируется с bcryptjs
   - Никогда не хранится в открытом виде
   - Проверяется при входе

3. Role-based Access
   - Admin: полный доступ
   - Teacher: просмотр и редактирование

4. CORS Protection
   - Только разрешённые источники
   - Content-Type validation

5. Audit Logging
   - Все операции записываются
   - Можно отследить кто что менял
```

## Производительность

```
- Пагинация для больших списков (готово для внедрения)
- Индексы на БД для быстрого поиска
- Кеширование в localStorage
- Ленивая загрузка компонентов
- Минимизированные CSS и JS
```

## Масштабирование

Проект готов к:
- Добавлению новых таблиц
- Микросервисной архитектуре
- Кешированию (Redis)
- Очередям задач
- API rate limiting
- Логированию (Winston, Morgan)

---

**Архитектура готова для production и легко расширяется! 🚀**
