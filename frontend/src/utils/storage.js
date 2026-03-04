// Система управления локальным хранилищем данных
const STORAGE_KEYS = {
  USERS: 'app_users',
  STUDENTS: 'app_students',
  RECORDS: 'app_records',
  DOCUMENTS: 'app_documents',
  GRADES: 'app_grades',
  ATTENDANCE: 'app_attendance',
  TIMETABLE: 'app_timetable',
  MESSAGES: 'app_messages',
  EVENTS: 'app_events',
  NEWS: 'app_news',
  TICKETS: 'app_tickets',
};

/**
 * Генерирует уникальный ID
 */
export const generateId = () => Date.now() + Math.random();

/**
 * Получает данные из localStorage
 */
const getStorageData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return null;
  }
};

/**
 * Сохраняет данные в localStorage
 */
const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing ${key}:`, error);
  }
};

/**
 * Инициализирует базовые данные для демонстрации
 */
export const initializeDefaultData = () => {
  // Проверяем, есть ли уже данные
  if (localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
    return; // Данные уже инициализированы
  }

  // Создаём пользователей
  const defaultUsers = [
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      fullName: 'Администратор системы',
      email: 'admin@school.ru',
    },
    {
      id: 2,
      username: 'teacher',
      password: 'teacher123',
      role: 'teacher',
      fullName: 'Иван Иванович Преподаватель',
      email: 'teacher@school.ru',
    },
    {
      id: 3,
      username: 'student',
      password: 'student123',
      role: 'student',
      fullName: 'Петров Петр Петрович',
      email: 'student@school.ru',
    },
  ];

  // Создаём учащихся
  const defaultStudents = [
    {
      id: generateId(),
      firstName: 'Петр',
      lastName: 'Петров',
      patronymic: 'Петрович',
      dateOfBirth: '2008-05-15',
      enrollmentDate: '2020-09-01',
      grade: '10',
      class: '10-А',
      parentName: 'Владимир Петрович Петров',
      parentPhone: '+7 (999) 111-22-33',
      parentEmail: 'parent@example.ru',
      address: 'г. Москва, ул. Чистая, д. 15',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      firstName: 'Анна',
      lastName: 'Сидорова',
      patronymic: 'Ивановна',
      dateOfBirth: '2008-08-22',
      enrollmentDate: '2020-09-01',
      grade: '10',
      class: '10-А',
      parentName: 'Иван Сергеевич Сидоров',
      parentPhone: '+7 (999) 222-33-44',
      parentEmail: 'parent2@example.ru',
      address: 'г. Москва, пр. Ленина, д. 25',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      firstName: 'Максим',
      lastName: 'Иванов',
      patronymic: 'Сергеевич',
      dateOfBirth: '2008-03-10',
      enrollmentDate: '2020-09-01',
      grade: '10',
      class: '10-Б',
      parentName: 'Сергей Иванович Иванов',
      parentPhone: '+7 (999) 333-44-55',
      parentEmail: 'parent3@example.ru',
      address: 'г. Москва, ул. Новая, д. 5',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      firstName: 'Елена',
      lastName: 'Смирнова',
      patronymic: 'Александровна',
      dateOfBirth: '2007-11-30',
      enrollmentDate: '2019-09-01',
      grade: '11',
      class: '11-А',
      parentName: 'Александр Викторович Смирнов',
      parentPhone: '+7 (999) 444-55-66',
      parentEmail: 'parent4@example.ru',
      address: 'г. Москва, ул. Цветная, д. 10',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Создаём личные дела
  const defaultRecords = [
    {
      id: generateId(),
      studentId: defaultStudents[0].id,
      title: 'Перевод в 11 класс',
      description: 'Документы для перевода в следующий класс',
      category: 'Перевод',
      status: 'open',
      priority: 'high',
      createdBy: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: '2024-06-01',
    },
    {
      id: generateId(),
      studentId: defaultStudents[0].id,
      title: 'Справка о состоянии здоровья',
      description: 'Медицинская справка для спортивной секции',
      category: 'Медицина',
      status: 'closed',
      priority: 'medium',
      createdBy: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: '2024-02-01',
    },
    {
      id: generateId(),
      studentId: defaultStudents[1].id,
      title: 'Заявление на участие в олимпиаде',
      description: 'Документы для всероссийской олимпиады школьников',
      category: 'Олимпиады',
      status: 'open',
      priority: 'high',
      createdBy: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: '2024-05-15',
    },
  ];

  // Создаём оценки
  const defaultGrades = [
    {
      id: generateId(),
      studentId: defaultStudents[0].id,
      subject: 'Математика',
      grade: 5,
      date: '2024-02-15',
      teacher: 'Иванов И.И.',
      notes: 'Контрольная работа',
    },
    {
      id: generateId(),
      studentId: defaultStudents[0].id,
      subject: 'Математика',
      grade: 4,
      date: '2024-02-10',
      teacher: 'Иванов И.И.',
      notes: 'Самостоятельная работа',
    },
    {
      id: generateId(),
      studentId: defaultStudents[0].id,
      subject: 'Русский язык',
      grade: 5,
      date: '2024-02-12',
      teacher: 'Петрова М.А.',
      notes: 'Сочинение',
    },
    {
      id: generateId(),
      studentId: defaultStudents[0].id,
      subject: 'История',
      grade: 4,
      date: '2024-02-08',
      teacher: 'Сидоров В.П.',
      notes: 'Устный ответ',
    },
    {
      id: generateId(),
      studentId: defaultStudents[1].id,
      subject: 'Математика',
      grade: 4,
      date: '2024-02-15',
      teacher: 'Иванов И.И.',
      notes: 'Контрольная работа',
    },
  ];

  // Создаём посещаемость
  const today = new Date();
  const defaultAttendance = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    for (const student of defaultStudents.slice(0, 3)) {
      const statuses = ['present', 'present', 'present', 'absent', 'late', 'excused'];
      defaultAttendance.push({
        id: generateId(),
        studentId: student.id,
        date: dateStr,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        notes: '',
      });
    }
  }

  // Создаём расписание
  const defaultTimetable = [
    {
      id: generateId(),
      classId: '10-А',
      dayOfWeek: 'Понедельник',
      period: 1,
      subject: 'Математика',
      teacher: 'Иванов И.И.',
      classroom: '301',
      startTime: '08:30',
      endTime: '09:15',
    },
    {
      id: generateId(),
      classId: '10-А',
      dayOfWeek: 'Понедельник',
      period: 2,
      subject: 'Русский язык',
      teacher: 'Петрова М.А.',
      classroom: '205',
      startTime: '09:25',
      endTime: '10:10',
    },
    {
      id: generateId(),
      classId: '10-А',
      dayOfWeek: 'Понедельник',
      period: 3,
      subject: 'История',
      teacher: 'Сидоров В.П.',
      classroom: '401',
      startTime: '10:20',
      endTime: '11:05',
    },
    {
      id: generateId(),
      classId: '10-А',
      dayOfWeek: 'Вторник',
      period: 1,
      subject: 'Математика',
      teacher: 'Иванов И.И.',
      classroom: '301',
      startTime: '08:30',
      endTime: '09:15',
    },
    {
      id: generateId(),
      classId: '10-А',
      dayOfWeek: 'Вторник',
      period: 2,
      subject: 'Физика',
      teacher: 'Козлов А.В.',
      classroom: '302',
      startTime: '09:25',
      endTime: '10:10',
    },
  ];

  // Создаём сообщения
  const defaultMessages = [
    {
      id: generateId(),
      from: 'teacher',
      to: 'student',
      text: 'Петр, не забудь про домашнее задание по математике!',
      subject: 'Домашнее задание',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      from: 'admin',
      to: 'all',
      text: 'Школа закрыта на ремонт с 1 по 7 марта',
      subject: 'Объявление',
      read: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // Создаём события
  const defaultEvents = [
    {
      id: generateId(),
      title: 'Экзамен по математике',
      date: '2024-06-10',
      time: '10:00',
      description: 'Выпускной экзамен для 11 класса',
      type: 'exam',
    },
    {
      id: generateId(),
      title: 'Родительское собрание',
      date: '2024-03-15',
      time: '18:00',
      description: 'Общешкольное родительское собрание',
      type: 'meeting',
    },
    {
      id: generateId(),
      title: 'День знаний',
      date: '2024-09-01',
      time: '09:00',
      description: 'Начало учебного года',
      type: 'holiday',
    },
  ];

  // Сохраняем все данные
  setStorageData(STORAGE_KEYS.USERS, defaultUsers);
  setStorageData(STORAGE_KEYS.STUDENTS, defaultStudents);
  setStorageData(STORAGE_KEYS.RECORDS, defaultRecords);
  setStorageData(STORAGE_KEYS.GRADES, defaultGrades);
  setStorageData(STORAGE_KEYS.ATTENDANCE, defaultAttendance);
  setStorageData(STORAGE_KEYS.TIMETABLE, defaultTimetable);
  setStorageData(STORAGE_KEYS.MESSAGES, defaultMessages);
  setStorageData(STORAGE_KEYS.EVENTS, defaultEvents);
  setStorageData(STORAGE_KEYS.DOCUMENTS, []);
  setStorageData(STORAGE_KEYS.NEWS, []);
  setStorageData(STORAGE_KEYS.TICKETS, []);
};

/**
 * Проверяет учётные данные пользователя
 */
export const validateUser = (username, password) => {
  const users = getStorageData(STORAGE_KEYS.USERS) || [];
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  return user || null;
};

/**
 * --- STUDENTS OPERATIONS ---
 */
export const storageStudents = {
  getAll: (search = '', status = '', grade = '') => {
    let students = getStorageData(STORAGE_KEYS.STUDENTS) || [];

    if (search) {
      const searchLower = search.toLowerCase();
      students = students.filter(
        (s) =>
          s.firstName.toLowerCase().includes(searchLower) ||
          s.lastName.toLowerCase().includes(searchLower) ||
          s.class.toLowerCase().includes(searchLower)
      );
    }

    if (status) {
      students = students.filter((s) => s.status === status);
    }

    if (grade) {
      students = students.filter((s) => s.grade === grade);
    }

    return students;
  },

  getById: (id) => {
    const students = getStorageData(STORAGE_KEYS.STUDENTS) || [];
    return students.find((s) => s.id === id);
  },

  create: (data) => {
    const students = getStorageData(STORAGE_KEYS.STUDENTS) || [];
    const newStudent = {
      id: generateId(),
      ...data,
      status: data.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    students.push(newStudent);
    setStorageData(STORAGE_KEYS.STUDENTS, students);
    return newStudent;
  },

  update: (id, data) => {
    const students = getStorageData(STORAGE_KEYS.STUDENTS) || [];
    const index = students.findIndex((s) => s.id === id);
    if (index !== -1) {
      students[index] = {
        ...students[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      setStorageData(STORAGE_KEYS.STUDENTS, students);
      return students[index];
    }
    return null;
  },

  delete: (id) => {
    let students = getStorageData(STORAGE_KEYS.STUDENTS) || [];
    students = students.filter((s) => s.id !== id);
    setStorageData(STORAGE_KEYS.STUDENTS, students);
    return true;
  },
};

/**
 * --- RECORDS OPERATIONS ---
 */
export const storageRecords = {
  getByStudent: (studentId) => {
    const records = getStorageData(STORAGE_KEYS.RECORDS) || [];
    return records.filter((r) => r.studentId === studentId);
  },

  getById: (id) => {
    const records = getStorageData(STORAGE_KEYS.RECORDS) || [];
    return records.find((r) => r.id === id);
  },

  create: (data) => {
    const records = getStorageData(STORAGE_KEYS.RECORDS) || [];
    const newRecord = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    records.push(newRecord);
    setStorageData(STORAGE_KEYS.RECORDS, records);
    return newRecord;
  },

  update: (id, data) => {
    const records = getStorageData(STORAGE_KEYS.RECORDS) || [];
    const index = records.findIndex((r) => r.id === id);
    if (index !== -1) {
      records[index] = {
        ...records[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      setStorageData(STORAGE_KEYS.RECORDS, records);
      return records[index];
    }
    return null;
  },

  delete: (id) => {
    let records = getStorageData(STORAGE_KEYS.RECORDS) || [];
    records = records.filter((r) => r.id !== id);
    setStorageData(STORAGE_KEYS.RECORDS, records);
    return true;
  },
};

/**
 * --- DOCUMENTS OPERATIONS ---
 */
export const storageDocuments = {
  getByRecord: (recordId) => {
    const documents = getStorageData(STORAGE_KEYS.DOCUMENTS) || [];
    return documents.filter((d) => d.recordId === recordId);
  },

  create: (data) => {
    const documents = getStorageData(STORAGE_KEYS.DOCUMENTS) || [];
    const newDocument = {
      id: generateId(),
      ...data,
      uploadedAt: new Date().toISOString(),
    };
    documents.push(newDocument);
    setStorageData(STORAGE_KEYS.DOCUMENTS, documents);
    return newDocument;
  },

  delete: (id) => {
    let documents = getStorageData(STORAGE_KEYS.DOCUMENTS) || [];
    documents = documents.filter((d) => d.id !== id);
    setStorageData(STORAGE_KEYS.DOCUMENTS, documents);
    return true;
  },
};

/**
 * --- GRADES OPERATIONS ---
 */
export const storageGrades = {
  getByStudent: (studentId) => {
    const grades = getStorageData(STORAGE_KEYS.GRADES) || [];
    return grades.filter((g) => g.studentId === studentId);
  },

  getAverage: (studentId) => {
    const grades = storageGrades.getByStudent(studentId);
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, g) => acc + g.grade, 0);
    return (sum / grades.length).toFixed(2);
  },

  addGrade: (data) => {
    const grades = getStorageData(STORAGE_KEYS.GRADES) || [];
    const newGrade = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    grades.push(newGrade);
    setStorageData(STORAGE_KEYS.GRADES, grades);
    return newGrade;
  },

  deleteGrade: (id) => {
    let grades = getStorageData(STORAGE_KEYS.GRADES) || [];
    grades = grades.filter((g) => g.id !== id);
    setStorageData(STORAGE_KEYS.GRADES, grades);
    return true;
  },
};

/**
 * --- ATTENDANCE OPERATIONS ---
 */
export const storageAttendance = {
  getByStudent: (studentId, date = null) => {
    let attendance = getStorageData(STORAGE_KEYS.ATTENDANCE) || [];
    attendance = attendance.filter((a) => a.studentId === studentId);

    if (date) {
      attendance = attendance.filter((a) => a.date === date);
    }

    return attendance;
  },

  getByDate: (date) => {
    const attendance = getStorageData(STORAGE_KEYS.ATTENDANCE) || [];
    return attendance.filter((a) => a.date === date);
  },

  mark: (data) => {
    const attendance = getStorageData(STORAGE_KEYS.ATTENDANCE) || [];
    const existingIndex = attendance.findIndex(
      (a) => a.studentId === data.studentId && a.date === data.date
    );

    if (existingIndex !== -1) {
      attendance[existingIndex] = {
        ...attendance[existingIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
    } else {
      const newAttendance = {
        id: generateId(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      attendance.push(newAttendance);
    }

    setStorageData(STORAGE_KEYS.ATTENDANCE, attendance);
    return attendance[existingIndex !== -1 ? existingIndex : attendance.length - 1];
  },

  delete: (id) => {
    let attendance = getStorageData(STORAGE_KEYS.ATTENDANCE) || [];
    attendance = attendance.filter((a) => a.id !== id);
    setStorageData(STORAGE_KEYS.ATTENDANCE, attendance);
    return true;
  },
};

/**
 * --- TIMETABLE OPERATIONS ---
 */
export const storageTimetable = {
  getByClass: (classId) => {
    const timetable = getStorageData(STORAGE_KEYS.TIMETABLE) || [];
    return timetable.filter((t) => t.classId === classId);
  },

  getByDay: (classId, dayOfWeek) => {
    const timetable = getStorageData(STORAGE_KEYS.TIMETABLE) || [];
    return timetable.filter(
      (t) => t.classId === classId && t.dayOfWeek === dayOfWeek
    );
  },

  add: (data) => {
    const timetable = getStorageData(STORAGE_KEYS.TIMETABLE) || [];
    const newEntry = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    timetable.push(newEntry);
    setStorageData(STORAGE_KEYS.TIMETABLE, timetable);
    return newEntry;
  },

  delete: (id) => {
    let timetable = getStorageData(STORAGE_KEYS.TIMETABLE) || [];
    timetable = timetable.filter((t) => t.id !== id);
    setStorageData(STORAGE_KEYS.TIMETABLE, timetable);
    return true;
  },
};

/**
 * --- MESSAGES OPERATIONS ---
 */
export const storageMessages = {
  getAll: () => {
    return getStorageData(STORAGE_KEYS.MESSAGES) || [];
  },

  create: (data) => {
    const messages = getStorageData(STORAGE_KEYS.MESSAGES) || [];
    const newMessage = {
      id: generateId(),
      ...data,
      read: false,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    setStorageData(STORAGE_KEYS.MESSAGES, messages);
    return newMessage;
  },

  markAsRead: (id) => {
    const messages = getStorageData(STORAGE_KEYS.MESSAGES) || [];
    const index = messages.findIndex((m) => m.id === id);
    if (index !== -1) {
      messages[index].read = true;
      setStorageData(STORAGE_KEYS.MESSAGES, messages);
      return messages[index];
    }
    return null;
  },
};

/**
 * --- EVENTS OPERATIONS ---
 */
export const storageEvents = {
  getAll: () => {
    return getStorageData(STORAGE_KEYS.EVENTS) || [];
  },

  create: (data) => {
    const events = getStorageData(STORAGE_KEYS.EVENTS) || [];
    const newEvent = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    events.push(newEvent);
    setStorageData(STORAGE_KEYS.EVENTS, events);
    return newEvent;
  },

  delete: (id) => {
    let events = getStorageData(STORAGE_KEYS.EVENTS) || [];
    events = events.filter((e) => e.id !== id);
    setStorageData(STORAGE_KEYS.EVENTS, events);
    return true;
  },
};

/**
 * --- TICKETS OPERATIONS ---
 */
export const storageTickets = {
  getAll: () => {
    return getStorageData(STORAGE_KEYS.TICKETS) || [];
  },

  create: (data) => {
    const tickets = getStorageData(STORAGE_KEYS.TICKETS) || [];
    const newTicket = {
      id: generateId(),
      ...data,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tickets.push(newTicket);
    setStorageData(STORAGE_KEYS.TICKETS, tickets);
    return newTicket;
  },

  update: (id, data) => {
    const tickets = getStorageData(STORAGE_KEYS.TICKETS) || [];
    const index = tickets.findIndex((t) => t.id === id);
    if (index !== -1) {
      tickets[index] = {
        ...tickets[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      setStorageData(STORAGE_KEYS.TICKETS, tickets);
      return tickets[index];
    }
    return null;
  },

  delete: (id) => {
    let tickets = getStorageData(STORAGE_KEYS.TICKETS) || [];
    tickets = tickets.filter((t) => t.id !== id);
    setStorageData(STORAGE_KEYS.TICKETS, tickets);
    return true;
  },
};

/**
 * --- NEWS OPERATIONS ---
 */
export const storageNews = {
  getAll: () => {
    return getStorageData(STORAGE_KEYS.NEWS) || [];
  },

  create: (data) => {
    const news = getStorageData(STORAGE_KEYS.NEWS) || [];
    const newArticle = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    news.unshift(newArticle);
    setStorageData(STORAGE_KEYS.NEWS, news);
    return newArticle;
  },

  update: (id, data) => {
    const news = getStorageData(STORAGE_KEYS.NEWS) || [];
    const index = news.findIndex((n) => n.id === id);
    if (index !== -1) {
      news[index] = {
        ...news[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      setStorageData(STORAGE_KEYS.NEWS, news);
      return news[index];
    }
    return null;
  },

  delete: (id) => {
    let news = getStorageData(STORAGE_KEYS.NEWS) || [];
    news = news.filter((n) => n.id !== id);
    setStorageData(STORAGE_KEYS.NEWS, news);
    return true;
  },
};
