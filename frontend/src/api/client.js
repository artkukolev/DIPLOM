import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен в каждый запрос
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (username, password) => {
    try {
      return await api.post('/auth/login', { username, password });
    } catch (err) {
      // fallback mock
      const roles = {
        admin: 'admin',
        teacher: 'teacher',
        student: 'student',
      };
      const role = roles[username] || 'student';
      const user = { id: Date.now(), username, fullName: username === 'admin' ? 'Системный Администратор' : username === 'teacher' ? 'Преподаватель' : 'Ученик', role };
      const token = `mock-token-${Date.now()}`;
      return { data: { token, user } };
    }
  },
  register: (data) =>
    api.post('/auth/register', data),
  getCurrentUser: async () => {
    try {
      return await api.get('/auth/me');
    } catch (err) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) return { data: { user } };
      return Promise.reject(new Error('No local user'));
    }
  },
};

// Students API
export const studentsAPI = {
  getAll: (search = '', status = '', grade = '') =>
    api.get('/students', { params: { search, status, grade } }),
  getById: (id) =>
    api.get(`/students/${id}`),
  create: (data) =>
    api.post('/students', data),
  update: (id, data) =>
    api.put(`/students/${id}`, data),
  delete: (id) =>
    api.delete(`/students/${id}`),
};

// Records API
export const recordsAPI = {
  getByStudent: (studentId) =>
    api.get(`/records/student/${studentId}`),
  getById: (id) =>
    api.get(`/records/${id}`),
  create: (data) =>
    api.post('/records', data),
  update: (id, data) =>
    api.put(`/records/${id}`, data),
  delete: (id) =>
    api.delete(`/records/${id}`),
};

// Documents API
export const documentsAPI = {
  getByRecord: (recordId) =>
    api.get(`/documents/record/${recordId}`),
  create: (data) =>
    api.post('/documents', data),
  delete: (id) =>
    api.delete(`/documents/${id}`),
};

// Support API (mock fallback)
export const supportAPI = {
  createTicket: async (ticket) => {
    try {
      return await api.post('/support/tickets', ticket);
    } catch (err) {
      const tickets = JSON.parse(localStorage.getItem('mock_tickets') || '[]');
      const newTicket = { id: Date.now(), status: 'open', createdAt: new Date().toISOString(), ...ticket };
      tickets.unshift(newTicket);
      localStorage.setItem('mock_tickets', JSON.stringify(tickets));
      return { data: newTicket };
    }
  },
  listTickets: async () => {
    try {
      return await api.get('/support/tickets');
    } catch (err) {
      const tickets = JSON.parse(localStorage.getItem('mock_tickets') || '[]');
      return { data: tickets };
    }
  },
  updateTicket: async (id, data) => {
    try {
      return await api.put(`/support/tickets/${id}`, data);
    } catch (err) {
      const tickets = JSON.parse(localStorage.getItem('mock_tickets') || '[]');
      const idx = tickets.findIndex((t) => t.id === id);
      if (idx !== -1) {
        tickets[idx] = { ...tickets[idx], ...data };
        localStorage.setItem('mock_tickets', JSON.stringify(tickets));
        return { data: tickets[idx] };
      }
      return Promise.reject(new Error('Ticket not found'));
    }
  },
};

// Schedule API (mock)
export const scheduleAPI = {
  list: async () => {
    try {
      return await api.get('/schedule');
    } catch (err) {
      const items = JSON.parse(localStorage.getItem('mock_schedule') || '[]');
      return { data: items };
    }
  },
  create: async (item) => {
    try {
      return await api.post('/schedule', item);
    } catch (err) {
      const items = JSON.parse(localStorage.getItem('mock_schedule') || '[]');
      const newItem = { id: Date.now(), ...item };
      items.push(newItem);
      localStorage.setItem('mock_schedule', JSON.stringify(items));
      return { data: newItem };
    }
  },
  update: async (id, data) => {
    try {
      return await api.put(`/schedule/${id}`, data);
    } catch (err) {
      const items = JSON.parse(localStorage.getItem('mock_schedule') || '[]');
      const idx = items.findIndex((i) => i.id === id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...data };
        localStorage.setItem('mock_schedule', JSON.stringify(items));
        return { data: items[idx] };
      }
      return Promise.reject(new Error('Schedule item not found'));
    }
  },
  delete: async (id) => {
    try {
      return await api.delete(`/schedule/${id}`);
    } catch (err) {
      let items = JSON.parse(localStorage.getItem('mock_schedule') || '[]');
      items = items.filter((i) => i.id !== id);
      localStorage.setItem('mock_schedule', JSON.stringify(items));
      return { data: { success: true } };
    }
  },
};

// Messages API (simple mock)
export const messagesAPI = {
  listConversations: async () => {
    try {
      return await api.get('/messages');
    } catch (err) {
      const conv = JSON.parse(localStorage.getItem('mock_conversations') || '[]');
      return { data: conv };
    }
  },
  sendMessage: async (conversationId, message) => {
    try {
      return await api.post(`/messages/${conversationId}`, { message });
    } catch (err) {
      const conv = JSON.parse(localStorage.getItem('mock_conversations') || '[]');
      const cidx = conv.findIndex((c) => c.id === conversationId);
      const msg = { id: Date.now(), text: message, createdAt: new Date().toISOString() };
      if (cidx === -1) {
        conv.push({ id: conversationId, messages: [msg] });
      } else {
        conv[cidx].messages.push(msg);
      }
      localStorage.setItem('mock_conversations', JSON.stringify(conv));
      return { data: msg };
    }
  },
};

export default api;
