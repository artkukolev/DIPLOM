# 🚀 Развёртывание и развитие проекта

## 📦 Production развёртывание

### Вариант 1: На собственный сервер (Linux)

#### 1. Подготовка сервера
```bash
# Обновление системы
sudo apt-get update && sudo apt-get upgrade -y

# Установка Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка nginx (для reverse proxy)
sudo apt-get install -y nginx

# Установка Git
sudo apt-get install -y git

# Установка PM2 (для автозагрузки)
sudo npm install -g pm2
```

#### 2. Развёртывание приложения
```bash
# Клонирование репозитория
git clone <repository-url> /home/user/student-records
cd /home/user/student-records

# Установка зависимостей
npm install
cd frontend && npm install && cd ..

# Сборка frontend
npm run build

# Запуск с PM2
pm2 start backend/server.js --name "student-records"
pm2 startup
pm2 save
```

#### 3. Конфигурация nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # API backend
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Вариант 2: Docker контейнеризация

#### Dockerfile для backend
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY backend ./backend

EXPOSE 5000

CMD ["node", "backend/server.js"]
```

#### Dockerfile для frontend
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - JWT_SECRET=your-secret-key
      - NODE_ENV=production
    volumes:
      - ./backend:/app/backend

  frontend:
    build:
      context: .
      dockerfile: frontend/Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend

  # Опционально: PostgreSQL вместо SQLite
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=student_records
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Вариант 3: Heroku развёртывание

```bash
# Установка Heroku CLI
brew install heroku/brew/heroku

# Логин
heroku login

# Создание приложения
heroku create student-records-app

# Добавление переменных окружения
heroku config:set JWT_SECRET=your-secret-key
heroku config:set NODE_ENV=production

# Развёртывание
git push heroku main
```

## 🔒 Безопасность для production

### 1. Переменные окружения
```env
NODE_ENV=production
JWT_SECRET=very-long-and-random-secret-key-change-this
DB_ENCRYPTION_KEY=another-random-key
CORS_ORIGIN=https://yourdomain.com
```

### 2. HTTPS/SSL
```bash
# Let's Encrypt с Certbot
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
```

### 3. Rate limiting
```javascript
// backend/server.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100 // максимум 100 запросов
});

app.use('/api/', limiter);
```

### 4. Helmet.js для безопасности
```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 5. Валидация и санитизация
```bash
npm install joi express-validator
```

## 🔧 Интеграция с другими системами

### 1. Email уведомления
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Отправка уведомления о новом деле
app.post('/records', async (req, res) => {
  // ... создание дела ...
  
  await transporter.sendMail({
    to: parentEmail,
    subject: 'Новое личное дело вашего ребёнка',
    html: `<h2>${record.title}</h2><p>${record.description}</p>`
  });
});
```

### 2. Интеграция с 1С
```javascript
// Экспорт в 1С Бухгалтерия
router.get('/export/1c', authMiddleware, async (req, res) => {
  const students = await db.all('SELECT * FROM students');
  const xml = convertToXML(students);
  res.type('application/xml');
  res.send(xml);
});
```

### 3. Синхронизация с Google Classroom
```javascript
const { google } = require('googleapis');

const classroom = google.classroom({
  version: 'v1',
  auth: oauth2Client
});

// Получение список классов
const courses = await classroom.courses.list();
```

### 4. SMS уведомления
```bash
npm install twilio
```

```javascript
const twilio = require('twilio');
const client = twilio(accountSid, authToken);

client.messages.create({
  body: 'Уведомление о новом личном деле',
  from: '+1234567890',
  to: parentPhone
});
```

## 📊 Мониторинг и логирование

### Winston логирование
```bash
npm install winston
```

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal error' });
});
```

### Morgan HTTP логирование
```bash
npm install morgan
```

```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```

### Datadog мониторинг
```bash
npm install dd-trace
```

```javascript
const tracer = require('dd-trace').init();
const express = require('express');
const app = express();
```

## 🗄️ Миграция на PostgreSQL

### 1. Установка драйвера
```bash
npm install pg
```

### 2. Изменение database.js
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const get = (query, params) => {
  return pool.query(query, params).then(result => result.rows[0]);
};

const all = (query, params) => {
  return pool.query(query, params).then(result => result.rows);
};

const run = (query, params) => {
  return pool.query(query, params);
};
```

## 📈 Масштабирование

### 1. Кеширование Redis
```bash
npm install redis
```

```javascript
const redis = require('redis');
const client = redis.createClient();

router.get('/students', async (req, res) => {
  const cacheKey = `students:${req.query.search || 'all'}`;
  
  // Проверяем кеш
  const cached = await client.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));
  
  // Если кеша нет, запрашиваем БД
  const students = await db.all('SELECT * FROM students');
  
  // Кешируем результат на 1 час
  await client.setex(cacheKey, 3600, JSON.stringify(students));
  
  res.json(students);
});
```

### 2. Асинхронные задачи (Bull + Redis)
```bash
npm install bull
```

```javascript
const Queue = require('bull');
const emailQueue = new Queue('emails');

emailQueue.process(async (job) => {
  await sendEmail(job.data);
});

// Добавление задачи в очередь
emailQueue.add({ to: email, subject: 'Title' });
```

### 3. Load Balancing с nginx
```nginx
upstream backends {
  server localhost:5000;
  server localhost:5001;
  server localhost:5002;
}

server {
  listen 80;
  
  location /api {
    proxy_pass http://backends;
  }
}
```

## 🧪 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Install Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install && cd frontend && npm install
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Heroku
        run: |
          git remote add heroku https://git.heroku.com/student-records-app.git
          git push heroku main
```

## 📝 Документирование API (Swagger/OpenAPI)

```bash
npm install swagger-ui-express swagger-jsdoc
```

```javascript
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Records API',
      version: '1.0.0'
    }
  },
  apis: ['./routes/*.js']
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

## 📱 Мобильное приложение (React Native)

```bash
npx react-native init StudentRecords
```

Переиспользование API клиента из web приложения для мобилки.

---

**Проект полностью готов к масштабированию и production! 🚀**
