const express = require('express');
const router = express.Router();
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');

// Получить документы для личного дела
router.get('/record/:recordId', authMiddleware, async (req, res) => {
  try {
    const documents = await db.all(
      `SELECT d.*, u.fullName as uploadedByName
       FROM documents d
       LEFT JOIN users u ON d.uploadedBy = u.id
       WHERE d.recordId = ?
       ORDER BY d.uploadedAt DESC`,
      [req.params.recordId]
    );
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создать документ (информацию о прикреплении)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { recordId, fileName, fileType, fileSize, filePath, documentType } = req.body;

    if (!recordId || !fileName) {
      return res.status(400).json({ error: 'Record ID and file name required' });
    }

    // Проверяем существование личного дела
    const record = await db.get('SELECT id FROM personal_records WHERE id = ?', [recordId]);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const result = await db.run(
      `INSERT INTO documents (
        recordId, fileName, fileType, fileSize, filePath, documentType, uploadedBy
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [recordId, fileName, fileType, fileSize, filePath, documentType, req.user.id]
    );

    // Логируем в аудит
    await db.run(
      `INSERT INTO audit_log (action, entityType, entityId, userId, newValue)
       VALUES (?, ?, ?, ?, ?)`,
      ['CREATE', 'DOCUMENT', result.id, req.user.id, JSON.stringify(req.body)]
    );

    res.status(201).json({
      message: 'Document created successfully',
      documentId: result.id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Удалить документ
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const documentId = req.params.id;
    const document = await db.get('SELECT * FROM documents WHERE id = ?', [documentId]);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    await db.run('DELETE FROM documents WHERE id = ?', [documentId]);

    // Логируем в аудит
    await db.run(
      `INSERT INTO audit_log (action, entityType, entityId, userId, oldValue)
       VALUES (?, ?, ?, ?, ?)`,
      ['DELETE', 'DOCUMENT', documentId, req.user.id, JSON.stringify(document)]
    );

    res.json({ message: 'Document deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
