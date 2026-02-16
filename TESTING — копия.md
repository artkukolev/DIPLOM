# 🧪 Примеры использования и тестирования

## 📝 Примеры использования API

### 1. Вход в систему

**Запрос:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

**Ответ:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "fullName": "Administrator",
    "role": "admin",
    "email": "admin@school.ru"
  }
}
```

### 2. Получить список учащихся

**Запрос:**
```bash
curl -X GET "http://localhost:5000/api/students?search=Иван" \
  -H "Authorization: Bearer <TOKEN>"
```

**Ответ:**
```json
[
  {
    "id": 1,
    "firstName": "Иван",
    "lastName": "Петров",
    "grade": "9",
    "class": "9А",
    "parentName": "Мария Петровна",
    "status": "active"
  }
]
```

### 3. Создать учащегося

**Запрос:**
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "firstName": "Алиса",
    "lastName": "Смирнова",
    "patronymic": "Алексеевна",
    "dateOfBirth": "2009-03-15",
    "enrollmentDate": "2021-09-01",
    "grade": "9",
    "class": "9Б",
    "parentName": "Алексей Смирнов",
    "parentPhone": "+7(999)123-45-67",
    "parentEmail": "parent@example.com",
    "address": "ул. Красная, д. 5"
  }'
```

### 4. Создать личное дело

**Запрос:**
```bash
curl -X POST http://localhost:5000/api/records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "studentId": 1,
    "title": "Опоздания на уроки",
    "description": "Студент часто опаздывает на первый урок",
    "category": "Поведение",
    "status": "open",
    "priority": "high",
    "dueDate": "2026-03-01"
  }'
```

### 5. Обновить личное дело

**Запрос:**
```bash
curl -X PUT http://localhost:5000/api/records/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "status": "closed",
    "priority": "low"
  }'
```

## 🛠️ Тестирование в Postman

### Импорт коллекции

Создайте переменную окружения:
```
base_url: http://localhost:5000/api
token: <полученный_токен_при_входе>
```

### Тестовые сценарии

#### Сценарий 1: Новый учащийся и его дело

```
1. POST /auth/login
   - username: admin
   - password: admin123
   - Сохранить token

2. POST /students
   - firstName: Сергей
   - lastName: Козлов
   - grade: 10
   - class: 10А
   
3. POST /records
   - studentId: <id из предыдущего ответа>
   - title: Проверка успеваемости
   - priority: medium
```

#### Сценарий 2: Поиск и фильтрация

```
1. GET /students?search=Иван
2. GET /students?status=active
3. GET /students?grade=9
4. GET /students?search=Сергей&grade=10
```

#### Сценарий 3: Полный цикл личного дела

```
1. Создать дело (status: open, priority: high)
2. Обновить дело (статус в работе)
3. Завершить дело (status: closed)
4. Архивировать (status: archived)
5. Удалить (DELETE)
```

## 🧬 Unit тесты (JavaScript)

### Пример теста для API клиента

```javascript
// api.test.js
import { studentsAPI } from './api/client';

describe('Students API', () => {
  
  test('GET /students returns array', async () => {
    const response = await studentsAPI.getAll();
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('POST /students creates student', async () => {
    const data = {
      firstName: 'Test',
      lastName: 'Student',
      grade: '9',
      class: '9A'
    };
    const response = await studentsAPI.create(data);
    expect(response.data.studentId).toBeDefined();
  });

  test('DELETE /students/:id removes student', async () => {
    const studentId = 1;
    const response = await studentsAPI.delete(studentId);
    expect(response.data.message).toContain('deleted');
  });

});
```

## 🔍 Интеграционные тесты

### Тест полного потока

```javascript
describe('Full Student Record Workflow', () => {
  
  test('Create student and add records', async () => {
    // 1. Создаём учащегося
    const studentRes = await studentsAPI.create({
      firstName: 'Иван',
      lastName: 'Иванов',
      grade: '9',
      class: '9А'
    });
    const studentId = studentRes.data.studentId;

    // 2. Получаем учащегося
    const student = await studentsAPI.getById(studentId);
    expect(student.data.firstName).toBe('Иван');

    // 3. Создаём дело
    const recordRes = await recordsAPI.create({
      studentId,
      title: 'Тест',
      priority: 'high'
    });
    const recordId = recordRes.data.recordId;

    // 4. Обновляем дело
    await recordsAPI.update(recordId, {
      status: 'closed'
    });

    // 5. Удаляем дело
    await recordsAPI.delete(recordId);

    // 6. Удаляем учащегося
    await studentsAPI.delete(studentId);
  });

});
```

## 📊 Пример данных для тестирования

### SQL скрипт для заполнения БД

```sql
-- Добавить учащихся
INSERT INTO students (firstName, lastName, patronymic, grade, class, parentName)
VALUES 
  ('Иван', 'Петров', 'Иванович', '9', '9А', 'Петр Иванович'),
  ('Мария', 'Сидорова', 'Сергеевна', '9', '9А', 'Сергей Сидоров'),
  ('Алексей', 'Смирнов', 'Александрович', '10', '10Б', 'Александр Смирнов'),
  ('Екатерина', 'Новикова', 'Дмитриевна', '9', '9Б', 'Дмитрий Новиков'),
  ('Сергей', 'Волков', 'Петрович', '10', '10А', 'Пётр Волков');

-- Добавить личные дела
INSERT INTO personal_records (studentId, title, description, category, status, priority)
VALUES 
  (1, 'Опоздания на уроки', 'Требуется разговор с родителями', 'Поведение', 'open', 'high'),
  (1, 'Помощь с математикой', 'Низкие оценки по математике', 'Учёба', 'open', 'medium'),
  (2, 'Похвала за успехи', 'Отличница по всем предметам', 'Поведение', 'closed', 'low'),
  (3, 'Посещение факультатива', 'Интересуется программированием', 'Развитие', 'open', 'low'),
  (4, 'Конфликт с одноклассниками', 'Требуется работа психолога', 'Поведение', 'open', 'high');
```

## 🐛 Отладка

### Chrome DevTools

1. Откройте F12
2. Перейдите на вкладку Network
3. Проверяйте запросы и ответы
4. Смотрите статус коды и тела ответов

### Backend логирование

```javascript
// Добавьте логирование в routes
console.log('Request:', req.method, req.path);
console.log('Body:', req.body);
console.log('Response:', response);
```

### Проверка БД

```bash
# Установка SQLite3 CLI (если не установлено)
brew install sqlite3

# Подключение к БД
sqlite3 backend/students.db

# Просмотр таблиц
.tables

# Просмотр данных
SELECT * FROM students;
SELECT * FROM personal_records;
```

## 📈 Нагрузочное тестирование

### С помощью Apache Bench

```bash
# 100 запросов с 10 параллельными
ab -n 100 -c 10 http://localhost:5000/api/students

# С заголовком авторизации
ab -n 100 -c 10 -H "Authorization: Bearer TOKEN" \
   http://localhost:5000/api/students
```

### С помощью Hey

```bash
# Установка
go get -u github.com/rakyll/hey

# Тестирование
hey -n 100 -c 10 http://localhost:5000/api/students
```

## ✅ Чек-лист перед сдачей диплома

- [ ] Все зависимости установлены
- [ ] Backend запускается без ошибок
- [ ] Frontend загружается и работает
- [ ] Вход с учётными данными работает
- [ ] Можно добавлять учащихся
- [ ] Можно создавать личные дела
- [ ] Поиск работает корректно
- [ ] Удаление работает с подтверждением
- [ ] Все формы валидируются
- [ ] БД сохраняет данные
- [ ] Интерфейс красиво выглядит
- [ ] Документация полная

---

**Готово к тестированию и защите! 🎯**
