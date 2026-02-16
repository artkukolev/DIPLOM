const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Инициализируем БД
db.initDatabase();

// Routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const recordsRoutes = require('./routes/records');
const documentsRoutes = require('./routes/documents');
const timetableRoutes = require('./routes/timetable');
const attendanceRoutes = require('./routes/attendance');
const gradesRoutes = require('./routes/grades');

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/grades', gradesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 System for managing student records\n`);
});
