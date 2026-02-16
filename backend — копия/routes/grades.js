const express = require('express');
const router = express.Router();
const db = require('../database').db;
const { authMiddleware } = require('../middleware/auth');

// Получить оценки студента
router.get('/student/:studentId', authMiddleware, (req, res) => {
  const { studentId } = req.params;
  
  db.all(
    `SELECT * FROM grades WHERE studentId = ? ORDER BY date DESC`,
    [studentId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: err.message });
      }
      res.json({ status: 'success', data: rows || [] });
    }
  );
});

// Получить оценки по предмету
router.get('/subject/:subject', authMiddleware, (req, res) => {
  const { subject } = req.params;
  
  db.all(
    `SELECT g.*, s.firstName, s.lastName FROM grades g
     LEFT JOIN students s ON g.studentId = s.id
     WHERE g.subject = ? ORDER BY g.date DESC`,
    [decodeURIComponent(subject)],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: err.message });
      }
      res.json({ status: 'success', data: rows || [] });
    }
  );
});

// Добавить оценку
router.post('/add', authMiddleware, (req, res) => {
  const { studentId, subject, grade, date, teacher, notes } = req.body;
  
  if (!studentId || !subject || grade === undefined || !date) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Обязательные поля: studentId, subject, grade, date' 
    });
  }

  const gradeValue = parseInt(grade);
  if (gradeValue < 1 || gradeValue > 5) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Оценка должна быть в диапазоне от 1 до 5' 
    });
  }

  db.run(
    `INSERT INTO grades (studentId, subject, grade, date, teacher, notes)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [studentId, subject, gradeValue, date, teacher || null, notes || null],
    function(err) {
      if (err) {
        return res.status(500).json({ status: 'error', message: err.message });
      }
      res.json({ 
        status: 'success', 
        message: 'Оценка добавлена',
        id: this.lastID 
      });
    }
  );
});

// Получить среднюю оценку студента
router.get('/average/:studentId', authMiddleware, (req, res) => {
  const { studentId } = req.params;
  
  db.get(
    `SELECT 
       COUNT(*) as total,
       COUNT(DISTINCT subject) as subjectCount,
       ROUND(AVG(grade), 2) as average,
       MAX(grade) as maxGrade,
       MIN(grade) as minGrade
     FROM grades
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

// Обновить оценку
router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { grade, notes } = req.body;
  
  if (grade !== undefined) {
    const gradeValue = parseInt(grade);
    if (gradeValue < 1 || gradeValue > 5) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Оценка должна быть в диапазоне от 1 до 5' 
      });
    }
  }

  const updates = [];
  const values = [];

  if (grade !== undefined) {
    updates.push('grade = ?');
    values.push(parseInt(grade));
  }

  if (notes !== undefined) {
    updates.push('notes = ?');
    values.push(notes);
  }

  if (updates.length === 0) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Нет данных для обновления' 
    });
  }

  values.push(id);

  db.run(
    `UPDATE grades SET ${updates.join(', ')} WHERE id = ?`,
    values,
    (err) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: err.message });
      }
      res.json({ status: 'success', message: 'Оценка обновлена' });
    }
  );
});

// Удалить оценку
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM grades WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    res.json({ status: 'success', message: 'Оценка удалена' });
  });
});

module.exports = router;
