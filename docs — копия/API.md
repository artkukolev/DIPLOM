# API Документация

## Базовый URL
```
http://localhost:5000/api
```

## Authentication

### POST /auth/login
Вход в систему

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "username": "admin",
    "fullName": "Administrator",
    "role": "admin",
    "email": "admin@school.ru"
  }
}
```

### GET /auth/me
Получить текущего пользователя

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "username": "admin",
    "fullName": "Administrator",
    "role": "admin",
    "email": "admin@school.ru"
  }
}
```

## Students (Учащиеся)

### GET /students
Получить список всех учащихся

**Query Parameters:**
- `search` - поиск по ФИ
- `status` - фильтр по статусу (active, inactive, graduated)
- `grade` - фильтр по классу

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "Иван",
    "lastName": "Иванов",
    "patronymic": "Иванович",
    "dateOfBirth": "2009-05-15",
    "enrollmentDate": "2021-09-01",
    "grade": "9",
    "class": "9А",
    "parentName": "Мария Ивановна",
    "parentPhone": "+7(900)000-00-00",
    "parentEmail": "parent@example.com",
    "address": "ул. Пушкина, д. 1",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

### POST /students
Создать нового учащегося

**Request:**
```json
{
  "firstName": "Иван",
  "lastName": "Иванов",
  "patronymic": "Иванович",
  "dateOfBirth": "2009-05-15",
  "enrollmentDate": "2021-09-01",
  "grade": "9",
  "class": "9А",
  "parentName": "Мария Ивановна",
  "parentPhone": "+7(900)000-00-00",
  "parentEmail": "parent@example.com",
  "address": "ул. Пушкина, д. 1"
}
```

### PUT /students/:id
Обновить информацию учащегося

**Response:**
```json
{
  "message": "Student updated successfully"
}
```

### DELETE /students/:id
Удалить учащегося

**Response:**
```json
{
  "message": "Student deleted successfully"
}
```

## Personal Records (Личные дела)

### GET /records/student/:studentId
Получить все личные дела конкретного учащегося

**Response:**
```json
[
  {
    "id": 1,
    "studentId": 1,
    "title": "Проблема с поведением на уроке",
    "description": "Постоянное нарушение дисциплины",
    "category": "Поведение",
    "status": "open",
    "priority": "high",
    "dueDate": "2024-02-15",
    "createdBy": 1,
    "createdByName": "Administrator",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

### POST /records
Создать новое личное дело

**Request:**
```json
{
  "studentId": 1,
  "title": "Проблема с поведением на уроке",
  "description": "Постоянное нарушение дисциплины",
  "category": "Поведение",
  "status": "open",
  "priority": "high",
  "dueDate": "2024-02-15"
}
```

### PUT /records/:id
Обновить личное дело

**Request:**
```json
{
  "title": "Улучшено поведение на уроке",
  "status": "closed"
}
```

### DELETE /records/:id
Удалить личное дело

## Documents (Документы)

### GET /documents/record/:recordId
Получить документы для личного дела

**Response:**
```json
[
  {
    "id": 1,
    "recordId": 1,
    "fileName": "report.pdf",
    "fileType": "application/pdf",
    "fileSize": 1024000,
    "filePath": "/uploads/documents/report.pdf",
    "documentType": "Report",
    "uploadedBy": 1,
    "uploadedByName": "Administrator",
    "uploadedAt": "2024-01-15T10:30:00Z"
  }
]
```

### POST /documents
Создать документ/прикрепление

**Request:**
```json
{
  "recordId": 1,
  "fileName": "report.pdf",
  "fileType": "application/pdf",
  "fileSize": 1024000,
  "filePath": "/uploads/documents/report.pdf",
  "documentType": "Report"
}
```

### DELETE /documents/:id
Удалить документ

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Student not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Something went wrong!",
  "message": "Error details"
}
```
