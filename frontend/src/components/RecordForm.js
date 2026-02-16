import React, { useState } from 'react';
import { recordsAPI } from '../api/client';

const RecordForm = ({ studentId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'open',
    priority: 'medium',
    dueDate: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await recordsAPI.create({
        studentId,
        ...formData,
      });
      onSubmit();
    } catch (err) {
      setError('Ошибка при создании: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg border border-red-300 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Название *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Название личного дела"
          className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Описание
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Описание вопроса или проблемы"
          rows="3"
          className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Категория
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Поведение, учёба, здоровье и т.д."
            className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Приоритет
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
          >
            <option value="low">🟢 Низкий</option>
            <option value="medium">🟡 Средний</option>
            <option value="high">🔴 Высокий</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Статус
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
          >
            <option value="open">Открыто</option>
            <option value="closed">Закрыто</option>
            <option value="archived">Архив</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Срок выполнения
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t-2 border-purple-200">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50"
        >
          {loading ? 'Сохранение...' : 'Сохранить'}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

export default RecordForm;
