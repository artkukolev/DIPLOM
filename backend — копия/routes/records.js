const express = require('express');
const router = express.Router();
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');

// Получить личные дела по учащемуся
router.get('/student/:studentId', authMiddleware, async (req, res) => {
  try {
    const records = await db.all(
      `SELECT pr.*, u.fullName as createdByName
       FROM personal_records pr
       LEFT JOIN users u ON pr.createdBy = u.id
       WHERE pr.studentId = ?
       ORDER BY pr.createdAt DESC`,
      [req.params.studentId]
    );
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить одно личное дело
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const record = await db.get(
      `SELECT pr.*, u.fullName as createdByName
       FROM personal_records pr
       LEFT JOIN users u ON pr.createdBy = u.id
       WHERE pr.id = ?`,
      [req.params.id]
    );

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    // Получаем документы
    const documents = await db.all(
      'SELECT * FROM documents WHERE recordId = ?',
      [req.params.id]
    );

    res.json({ ...record, documents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создать личное дело
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { studentId, title, description, category, status, priority, dueDate } = req.body;

    if (!studentId || !title) {
      return res.status(400).json({ error: 'Student ID and title required' });
    }

    // Проверяем существование учащегося
    const student = await db.get('SELECT id FROM students WHERE id = ?', [studentId]);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const result = await db.run(
      `INSERT INTO personal_records (
        studentId, title, description, category, status, priority, createdBy, dueDate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [studentId, title, description, category, status || 'open', priority || 'medium', req.user.id, dueDate]
    );

    // Логируем в аудит
    await db.run(
      `INSERT INTO audit_log (action, entityType, entityId, userId, newValue)
       VALUES (?, ?, ?, ?, ?)`,
      ['CREATE', 'RECORD', result.id, req.user.id, JSON.stringify(req.body)]
    );

    res.status(201).json({
      message: 'Record created successfully',
      recordId: result.id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Обновить личное дело
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const recordId = req.params.id;
    const record = await db.get('SELECT * FROM personal_records WHERE id = ?', [recordId]);

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const updates = [];
    const values = [];
    const fieldsToUpdate = ['title', 'description', 'category', 'status', 'priority', 'dueDate'];

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
    values.push(recordId);

    const query = `UPDATE personal_records SET ${updates.join(', ')} WHERE id = ?`;
    await db.run(query, values);

    // Логируем в аудит
    await db.run(
      `INSERT INTO audit_log (action, entityType, entityId, userId, oldValue, newValue)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['UPDATE', 'RECORD', recordId, req.user.id, JSON.stringify(record), JSON.stringify(req.body)]
    );

    res.json({ message: 'Record updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Удалить личное дело
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const recordId = req.params.id;
    const record = await db.get('SELECT * FROM personal_records WHERE id = ?', [recordId]);

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    await db.run('DELETE FROM personal_records WHERE id = ?', [recordId]);

    // Логируем в аудит
    await db.run(
      `INSERT INTO audit_log (action, entityType, entityId, userId, oldValue)
       VALUES (?, ?, ?, ?, ?)`,
      ['DELETE', 'RECORD', recordId, req.user.id, JSON.stringify(record)]
    );

    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
