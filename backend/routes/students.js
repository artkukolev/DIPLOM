const express = require('express');
const router = express.Router();
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');

// Получить всех учащихся
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { search, status, grade } = req.query;
    let query = 'SELECT * FROM students WHERE 1=1';
    const params = [];

    if (search) {
      query += ` AND (firstName LIKE ? OR lastName LIKE ? OR class LIKE ?)`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (grade) {
      query += ' AND grade = ?';
      params.push(grade);
    }

    query += ' ORDER BY lastName, firstName';
    const students = await db.all(query, params);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить одного учащегося
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const student = await db.get('SELECT * FROM students WHERE id = ?', [req.params.id]);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создать нового учащегося
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      patronymic,
      dateOfBirth,
      enrollmentDate,
      grade,
      class: studentClass,
      parentName,
      parentPhone,
      parentEmail,
      address
    } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'First and last name required' });
    }

    const result = await db.run(
      `INSERT INTO students (
        firstName, lastName, patronymic, dateOfBirth, enrollmentDate,
        grade, class, parentName, parentPhone, parentEmail, address
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName, lastName, patronymic, dateOfBirth, enrollmentDate,
        grade, studentClass, parentName, parentPhone, parentEmail, address
      ]
    );

    // Логируем в аудит
    await db.run(
      `INSERT INTO audit_log (action, entityType, entityId, userId, newValue)
       VALUES (?, ?, ?, ?, ?)`,
      ['CREATE', 'STUDENT', result.id, req.user.id, JSON.stringify(req.body)]
    );

    res.status(201).json({
      message: 'Student created successfully',
      studentId: result.id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Обновить информацию учащегося
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await db.get('SELECT * FROM students WHERE id = ?', [studentId]);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const updates = [];
    const values = [];
    const fieldsToUpdate = [
      'firstName', 'lastName', 'patronymic', 'dateOfBirth', 'enrollmentDate',
      'grade', 'class', 'parentName', 'parentPhone', 'parentEmail', 'address', 'status'
    ];

    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        updates.push(`${field} = ?`);
        values.push(req.body[field]);
      }
    });

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(studentId);

    const query = `UPDATE students SET ${updates.join(', ')} WHERE id = ?`;
    await db.run(query, values);

    // Логируем в аудит
    await db.run(
      `INSERT INTO audit_log (action, entityType, entityId, userId, oldValue, newValue)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['UPDATE', 'STUDENT', studentId, req.user.id, JSON.stringify(student), JSON.stringify(req.body)]
    );

    res.json({ message: 'Student updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Удалить учащегося
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await db.get('SELECT * FROM students WHERE id = ?', [studentId]);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await db.run('DELETE FROM students WHERE id = ?', [studentId]);

    // Логируем в аудит
    await db.run(
      `INSERT INTO audit_log (action, entityType, entityId, userId, oldValue)
       VALUES (?, ?, ?, ?, ?)`,
      ['DELETE', 'STUDENT', studentId, req.user.id, JSON.stringify(student)]
    );

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
