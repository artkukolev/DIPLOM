const express = require('express');
const router = express.Router();
const db = require('../database').db;
const { authMiddleware } = require('../middleware/auth');

// Получить посещаемость студента
router.get('/student/:studentId', authMiddleware, (req, res) => {
  const { studentId } = req.params;
  const { date } = req.query;
  
  let query = `SELECT a.*, s.firstName, s.lastName FROM attendance a 
               LEFT JOIN students s ON a.studentId = s.id 
               WHERE a.studentId = ?`;
  let params = [studentId];

  if (date) {
    query += ` AND a.date = ?`;
    params.push(date);
  }

  db.all(query + ` ORDER BY a.date DESC`, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    res.json({ status: 'success', data: rows || [] });
  });
});

// Получить посещаемость по дате
router.get('/date/:date', authMiddleware, (req, res) => {
  const { date } = req.params;
  
  db.all(
    `SELECT a.*, s.firstName, s.lastName, s.class FROM attendance a
     LEFT JOIN students s ON a.studentId = s.id
     WHERE a.date = ? ORDER BY s.lastName`,
    [date],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: err.message });
      }
      res.json({ status: 'success', data: rows || [] });
    }
  );
});

// Отметить посещаемость
router.post('/mark', authMiddleware, (req, res) => {
  const { studentId, date, status, timetableId, notes } = req.body;
  
  if (!studentId || !date || !status) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Обязательные поля: studentId, date, status' 
    });
  }

  const validStatus = ['present', 'absent', 'late', 'excused'];
  if (!validStatus.includes(status)) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Неверный статус. Допустимые значения: present, absent, late, excused' 
    });
  }

  db.run(
    `INSERT OR REPLACE INTO attendance (studentId, date, timetableId, status, notes)
     VALUES (?, ?, ?, ?, ?)`,
    [studentId, date, timetableId || null, status, notes || null],
    function(err) {
      if (err) {
        return res.status(500).json({ status: 'error', message: err.message });
      }
      res.json({ 
        status: 'success', 
        message: 'Посещаемость отмечена',
        id: this.lastID 
      });
    }
  );
});

// Получить статистику посещаемости студента
router.get('/stats/:studentId', authMiddleware, (req, res) => {
  const { studentId } = req.params;
  
  db.get(
    `SELECT 
       COUNT(*) as total,
       SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present,
       SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent,
       SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) as late,
       SUM(CASE WHEN status = 'excused' THEN 1 ELSE 0 END) as excused
     FROM attendance
     WHERE studentId = ?`,
    [studentId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: err.message });
      }
      res.json({ status: 'success', data: row || {} });
    }
  );
});

// Удалить запись о посещаемости
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM attendance WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    res.json({ status: 'success', message: 'Запись о посещаемости удалена' });
  });
});

module.exports = router;
