const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'students.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

const initDatabase = () => {
  db.serialize(() => {
    // Таблица администраторов и учителей
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT CHECK(role IN ('admin', 'teacher')) NOT NULL,
        fullName TEXT NOT NULL,
        email TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Таблица учащихся
    db.run(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        patronymic TEXT,
        dateOfBirth TEXT,
        enrollmentDate TEXT,
        grade TEXT,
        class TEXT,
        parentName TEXT,
        parentPhone TEXT,
        parentEmail TEXT,
        address TEXT,
        status TEXT CHECK(status IN ('active', 'inactive', 'graduated')) DEFAULT 'active',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Таблица личных дел
    db.run(`
      CREATE TABLE IF NOT EXISTS personal_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        studentId INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        status TEXT CHECK(status IN ('open', 'closed', 'archived')) DEFAULT 'open',
        priority TEXT CHECK(priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
        createdBy INTEGER,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        dueDate TEXT,
        FOREIGN KEY(studentId) REFERENCES students(id) ON DELETE CASCADE,
        FOREIGN KEY(createdBy) REFERENCES users(id)
      )
    `);

    // Таблица документов
    db.run(`
      CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recordId INTEGER NOT NULL,
        fileName TEXT NOT NULL,
        fileType TEXT,
        fileSize INTEGER,
        filePath TEXT,
        documentType TEXT,
        uploadedBy INTEGER,
        uploadedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(recordId) REFERENCES personal_records(id) ON DELETE CASCADE,
        FOREIGN KEY(uploadedBy) REFERENCES users(id)
      )
    `);

    // Таблица истории изменений
    db.run(`
      CREATE TABLE IF NOT EXISTS audit_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT NOT NULL,
        entityType TEXT,
        entityId INTEGER,
        userId INTEGER,
        oldValue TEXT,
        newValue TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(userId) REFERENCES users(id)
      )
    `);

    // Таблица расписания
    db.run(`
      CREATE TABLE IF NOT EXISTS timetable (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        classId TEXT NOT NULL,
        dayOfWeek TEXT NOT NULL,
        period INTEGER NOT NULL,
        subject TEXT NOT NULL,
        teacher TEXT,
        classroom TEXT,
        startTime TEXT,
        endTime TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(classId, dayOfWeek, period)
      )
    `);

    // Таблица журнала посещаемости
    db.run(`
      CREATE TABLE IF NOT EXISTS attendance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        studentId INTEGER NOT NULL,
        date TEXT NOT NULL,
        timetableId INTEGER,
        status TEXT CHECK(status IN ('present', 'absent', 'late', 'excused')) DEFAULT 'present',
        notes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(studentId) REFERENCES students(id),
        FOREIGN KEY(timetableId) REFERENCES timetable(id),
        UNIQUE(studentId, date, timetableId)
      )
    `);

    // Таблица оценок
    db.run(`
      CREATE TABLE IF NOT EXISTS grades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        studentId INTEGER NOT NULL,
        subject TEXT NOT NULL,
        grade INTEGER CHECK(grade >= 1 AND grade <= 5),
        date TEXT NOT NULL,
        teacher TEXT,
        notes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(studentId) REFERENCES students(id)
      )
    `);

    console.log('✅ Database tables initialized');

    // Создаём админа по умолчанию
    const bcrypt = require('bcryptjs');
    const adminPassword = bcrypt.hashSync('admin123', 10);
    
    // Проверяем есть ли уже админ
    db.get('SELECT id FROM users WHERE username = ?', ['admin'], (err, row) => {
      if (err) {
        console.error('❌ Error checking admin account:', err);
        return;
      }
      
      if (!row) {
        // Админа нет, создаём
        db.run(
          `INSERT INTO users (username, password, role, fullName, email) 
           VALUES (?, ?, ?, ?, ?)`,
          ['admin', adminPassword, 'admin', 'Administrator', 'admin@school.ru'],
          (err) => {
            if (err) {
              console.error('❌ Error creating admin account:', err);
            } else {
              console.log('✅ Default admin account created');
            }
          }
        );
      } else {
        console.log('✅ Admin account already exists');
      }
    });

    // Создаём расписание по умолчанию
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
    const subjects = ['Русский язык', 'Математика', 'История', 'Английский язык', 'Информатика', 'Физкультура'];
    const times = [
      { period: 1, start: '09:00', end: '09:45' },
      { period: 2, start: '10:00', end: '10:45' },
      { period: 3, start: '11:00', end: '11:45' },
      { period: 4, start: '12:00', end: '12:45' },
      { period: 5, start: '13:30', end: '14:15' },
      { period: 6, start: '14:30', end: '15:15' }
    ];

    // Проверяем есть ли уже расписание
    db.get('SELECT id FROM timetable LIMIT 1', [], (err, row) => {
      if (err) {
        console.error('❌ Error checking timetable:', err);
        return;
      }

      if (!row) {
        // Расписание не существует, создаём стандартное
        const classId = '10А';
        days.forEach((day, dayIndex) => {
          for (let period = 1; period <= 6; period++) {
            const subjectIdx = (dayIndex * 6 + period - 1) % subjects.length;
            const timeInfo = times[period - 1];
            const subject = subjects[subjectIdx];
            const teacher = `Учитель ${(dayIndex + period) % 5 + 1}`;

            db.run(
              `INSERT OR IGNORE INTO timetable 
               (classId, dayOfWeek, period, subject, teacher, classroom, startTime, endTime)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
              [classId, day, period, subject, teacher, `Кабинет ${100 + dayIndex * 10 + period}`, timeInfo.start, timeInfo.end],
              (err) => {
                if (err) {
                  console.error('❌ Error creating timetable entry:', err);
                }
              }
            );
          }
        });
        console.log('✅ Default timetable created');
      } else {
        console.log('✅ Timetable already exists');
      }
    });
  });
};

const get = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const all = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
};

const run = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

module.exports = {
  db,
  initDatabase,
  get,
  all,
  run
};
