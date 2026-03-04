// 🎯 Frontend-only API Client (без бэкенда)
// Все операции работают с локальным хранилищем (localStorage)

import {
  initializeDefaultData,
  validateUser,
  storageStudents,
  storageRecords,
  storageDocuments,
  storageGrades,
  storageAttendance,
  storageTimetable,
  storageMessages,
  storageEvents,
  storageTickets,
  storageNews,
  generateId,
} from '../utils/storage';

// Инициализируем данные при загрузке
initializeDefaultData();

// Имитация задержки сети для реалистичности
const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

// Auth API
export const authAPI = {
  login: async (username, password) => {
    await delay();
    const user = validateUser(username, password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      const token = `token-${user.id}-${Date.now()}`;
      return {
        data: {
          token,
          user: userWithoutPassword,
        },
      };
    }
    throw new Error('Неверные учётные данные');
  },

  register: async (data) => {
    await delay();
    throw new Error('Регистрация отключена');
  },

  getCurrentUser: async () => {
    await delay();
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return { data: { user } };
    }
    throw new Error('Пользователь не загружен');
  },
};

// Students API
export const studentsAPI = {
  getAll: async (search = '', status = '', grade = '') => {
    await delay();
    const students = storageStudents.getAll(search, status, grade);
    return { data: students };
  },

  getById: async (id) => {
    await delay();
    const student = storageStudents.getById(id);
    if (student) {
      return { data: student };
    }
    throw new Error('Ученик не найден');
  },

  create: async (data) => {
    await delay();
    const student = storageStudents.create(data);
    return { data: student };
  },

  update: async (id, data) => {
    await delay();
    const student = storageStudents.update(id, data);
    if (student) {
      return { data: student };
    }
    throw new Error('Ошибка обновления ученика');
  },

  delete: async (id) => {
    await delay();
    storageStudents.delete(id);
    return { data: { message: 'Ученик удален' } };
  },
};

// Records API
export const recordsAPI = {
  getByStudent: async (studentId) => {
    await delay();
    const records = storageRecords.getByStudent(studentId);
    return { data: records };
  },

  getById: async (id) => {
    await delay();
    const record = storageRecords.getById(id);
    if (record) {
      return { data: record };
    }
    throw new Error('Личное дело не найдено');
  },

  create: async (data) => {
    await delay();
    const record = storageRecords.create(data);
    return { data: record };
  },

  update: async (id, data) => {
    await delay();
    const record = storageRecords.update(id, data);
    if (record) {
      return { data: record };
    }
    throw new Error('Ошибка обновления записи');
  },

  delete: async (id) => {
    await delay();
    storageRecords.delete(id);
    return { data: { message: 'Запись удалена' } };
  },
};

// Documents API
export const documentsAPI = {
  getByRecord: async (recordId) => {
    await delay();
    const documents = storageDocuments.getByRecord(recordId);
    return { data: documents };
  },

  create: async (data) => {
    await delay();
    const document = storageDocuments.create(data);
    return { data: document };
  },

  delete: async (id) => {
    await delay();
    storageDocuments.delete(id);
    return { data: { message: 'Документ удален' } };
  },
};

// Grades API
export const gradesAPI = {
  getByStudent: async (studentId) => {
    await delay();
    const grades = storageGrades.getByStudent(studentId);
    return { data: grades };
  },

  getAverage: async (studentId) => {
    await delay();
    const average = storageGrades.getAverage(studentId);
    return { data: { average } };
  },

  addGrade: async (data) => {
    await delay();
    const grade = storageGrades.addGrade(data);
    return { data: grade };
  },

  deleteGrade: async (id) => {
    await delay();
    storageGrades.deleteGrade(id);
    return { data: { message: 'Оценка удалена' } };
  },
};

// Attendance API
export const attendanceAPI = {
  getByStudent: async (studentId, date = null) => {
    await delay();
    const attendance = storageAttendance.getByStudent(studentId, date);
    return { data: attendance };
  },

  getByDate: async (date) => {
    await delay();
    const attendance = storageAttendance.getByDate(date);
    return { data: attendance };
  },

  mark: async (data) => {
    await delay();
    const attendance = storageAttendance.mark(data);
    return { data: attendance };
  },

  delete: async (id) => {
    await delay();
    storageAttendance.delete(id);
    return { data: { message: 'Запись удалена' } };
  },
};

// Timetable API
export const timetableAPI = {
  getByClass: async (classId) => {
    await delay();
    const timetable = storageTimetable.getByClass(classId);
    return { data: timetable };
  },

  getByDay: async (classId, dayOfWeek) => {
    await delay();
    const timetable = storageTimetable.getByDay(classId, dayOfWeek);
    return { data: timetable };
  },

  add: async (data) => {
    await delay();
    const entry = storageTimetable.add(data);
    return { data: entry };
  },

  delete: async (id) => {
    await delay();
    storageTimetable.delete(id);
    return { data: { message: 'Запись удалена' } };
  },
};

// Support API
export const supportAPI = {
  createTicket: async (ticket) => {
    await delay();
    const newTicket = storageTickets.create(ticket);
    return { data: newTicket };
  },

  listTickets: async () => {
    await delay();
    const tickets = storageTickets.getAll();
    return { data: tickets };
  },

  updateTicket: async (id, data) => {
    await delay();
    const ticket = storageTickets.update(id, data);
    if (ticket) {
      return { data: ticket };
    }
    throw new Error('Ошибка обновления тикета');
  },

  deleteTicket: async (id) => {
    await delay();
    storageTickets.delete(id);
    return { data: { message: 'Тикет удален' } };
  },
};

// Messages API
export const messagesAPI = {
  getAll: async () => {
    await delay();
    const messages = storageMessages.getAll();
    return { data: messages };
  },

  create: async (data) => {
    await delay();
    const message = storageMessages.create(data);
    return { data: message };
  },

  markAsRead: async (id) => {
    await delay();
    const message = storageMessages.markAsRead(id);
    if (message) {
      return { data: message };
    }
    throw new Error('Ошибка обновления сообщения');
  },

  // Дополнительные методы для совместимости со старым кодом
  listConversations: async () => {
    await delay();
    const conversations = JSON.parse(localStorage.getItem('app_conversations') || '[]');
    return { data: conversations };
  },

  sendMessage: async (conversationId, text) => {
    await delay();
    let conversations = JSON.parse(localStorage.getItem('app_conversations') || '[]');
    const msgId = generateId();
    const newMessage = {
      id: msgId,
      text,
      createdAt: new Date().toISOString(),
    };

    const convIndex = conversations.findIndex((c) => c.id === conversationId);
    if (convIndex === -1) {
      conversations.push({
        id: conversationId,
        messages: [newMessage],
      });
    } else {
      conversations[convIndex].messages.push(newMessage);
    }

    localStorage.setItem('app_conversations', JSON.stringify(conversations));
    return { data: newMessage };
  },
};

// Events API
export const eventsAPI = {
  getAll: async () => {
    await delay();
    const events = storageEvents.getAll();
    return { data: events };
  },

  create: async (data) => {
    await delay();
    const event = storageEvents.create(data);
    return { data: event };
  },

  delete: async (id) => {
    await delay();
    storageEvents.delete(id);
    return { data: { message: 'Событие удалено' } };
  },
};

// News API
export const newsAPI = {
  getAll: async () => {
    await delay();
    const news = storageNews.getAll();
    return { data: news };
  },

  create: async (data) => {
    await delay();
    const article = storageNews.create(data);
    return { data: article };
  },

  update: async (id, data) => {
    await delay();
    const article = storageNews.update(id, data);
    if (article) {
      return { data: article };
    }
    throw new Error('Ошибка обновления статьи');
  },

  delete: async (id) => {
    await delay();
    storageNews.delete(id);
    return { data: { message: 'Статья удалена' } };
  },
};

// Schedule API (для совместимости со старым кодом)
export const scheduleAPI = {
  list: async () => {
    await delay();
    const schedule = JSON.parse(localStorage.getItem('app_schedule') || '[]');
    return { data: schedule };
  },

  create: async (data) => {
    await delay();
    const schedule = JSON.parse(localStorage.getItem('app_schedule') || '[]');
    const newItem = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    schedule.push(newItem);
    localStorage.setItem('app_schedule', JSON.stringify(schedule));
    return { data: newItem };
  },

  update: async (id, data) => {
    await delay();
    const schedule = JSON.parse(localStorage.getItem('app_schedule') || '[]');
    const index = schedule.findIndex((item) => item.id === id);
    if (index !== -1) {
      schedule[index] = { ...schedule[index], ...data };
      localStorage.setItem('app_schedule', JSON.stringify(schedule));
      return { data: schedule[index] };
    }
    throw new Error('Элемент расписания не найден');
  },

  delete: async (id) => {
    await delay();
    let schedule = JSON.parse(localStorage.getItem('app_schedule') || '[]');
    schedule = schedule.filter((item) => item.id !== id);
    localStorage.setItem('app_schedule', JSON.stringify(schedule));
    return { data: { message: 'Элемент удален' } };
  },
};
