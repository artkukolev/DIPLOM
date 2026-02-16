const express = require('express');
const router = express.Router();
const db = require('../database').db;
const { authMiddleware } = require('../middleware/auth');

// Получить расписание по классу
router.get('/class/:classId', authMiddleware, (req, res) => {
  const { classId } = req.params;
  
  db.all(
    `SELECT * FROM timetable WHERE classId = ? ORDER BY dayOfWeek, period`,
    [classId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: err.message });
      }
      res.json({ status: 'success', data: rows || [] });
    }
  );
});

// Получить расписание по дню
router.get('/day/:classId/:dayOfWeek', authMiddleware, (req, res) => {
  const { classId, dayOfWeek } = req.params;
  
  db.all(
    `SELECT * FROM timetable WHERE classId = ? AND dayOfWeek = ? ORDER BY period`,
    [classId, decodeURIComponent(dayOfWeek)],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: err.message });
      }
      res.json({ status: 'success', data: rows || [] });
    }
  );
});

// Добавить или обновить урок
router.post('/add', authMiddleware, (req, res) => {
  const { classId, dayOfWeek, period, subject, teacher, classroom, startTime, endTime } = req.body;
  
  if (!classId || !dayOfWeek || !period || !subject) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Обязательные поля: classId, dayOfWeek, period, subject' 
    });
  }

  db.run(
    `INSERT OR REPLACE INTO timetable 
     (classId, dayOfWeek, period, subject, teacher, classroom, startTime, endTime)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [classId, dayOfWeek, period, subject, teacher || null, classroom || null, startTime || null, endTime || null],
    function(err) {
      if (err) {
        return res.status(500).json({ status: 'error', message: err.message });
      }
      res.json({ 
        status: 'success', 
        message: 'Урок добавлен/обновлен',
        id: this.lastID 
      });
    }
  );
});

// Удалить урок
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM timetable WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    res.json({ status: 'success', message: 'Урок удален' });
  });
});

module.exports = router;
