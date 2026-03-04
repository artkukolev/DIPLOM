import React, { useState } from 'react';
import { recordsAPI } from '../api/client';
import RecordForm from './RecordForm';

const RecordsView = ({ student, records, onRecordAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleRecordAdded = () => {
    setShowForm(false);
    onRecordAdded();
  };

  const handleDeleteRecord = async (recordId) => {
    if (window.confirm('Вы уверены, что хотите удалить это личное дело?')) {
      try {
        await recordsAPI.delete(recordId);
        onRecordAdded();
      } catch (error) {
        console.error('Error deleting record:', error);
        alert('Ошибка при удалении');
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'closed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'archived':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Student Info Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100">
          <h2 className="text-xl font-bold text-purple-900">
            👤 {student.lastName} {student.firstName}
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Класс</p>
              <p className="font-semibold text-gray-800">{student.class || '-'}</p>
            </div>
            <div>
              <p className="text-gray-600">Класс (уровень)</p>
              <p className="font-semibold text-gray-800">{student.grade || '-'}</p>
            </div>
            <div>
              <p className="text-gray-600">Статус</p>
              <p className="font-semibold text-green-600 capitalize">
                {student.status === 'active' ? 'Активен' : student.status}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Дата рождения</p>
              <p className="font-semibold text-gray-800">
                {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('ru-RU') : '-'}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Родитель</p>
              <p className="font-semibold text-gray-800">{student.parentName || '-'}</p>
            </div>
            <div>
              <p className="text-gray-600">Телефон</p>
              <p className="font-semibold text-gray-800">{student.parentPhone || '-'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Records Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-purple-900">
            📋 Личные дела ({records.length})
          </h3>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition text-sm font-bold"
          >
            + Добавить
          </button>
        </div>

        <div className="p-6">
          {showForm ? (
            <RecordForm
              studentId={student.id}
              onSubmit={handleRecordAdded}
              onCancel={() => setShowForm(false)}
            />
          ) : (
            <div className="space-y-4">
              {records.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  😔 Личных дел не найдено.<br/>
                  Добавьте первое личное дело.
                </p>
              ) : (
                records.map((record) => (
                  <div
                    key={record.id}
                    className="border-2 border-purple-200 rounded-lg p-4 hover:border-purple-400 cursor-pointer transition"
                    onClick={() => setSelectedRecord(record)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 text-lg">{record.title}</h4>
                        {record.description && (
                          <p className="text-gray-600 text-sm mt-1">{record.description}</p>
                        )}
                        <div className="flex gap-2 mt-3 flex-wrap">
                          <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(record.status)}`}>
                            {record.status === 'open' ? 'Открыто' : record.status === 'closed' ? 'Закрыто' : 'Архив'}
                          </span>
                          <span className={`text-xs px-3 py-1 rounded-full border ${getPriorityColor(record.priority)}`}>
                            {record.priority === 'high' ? '🔴 Высокий' : record.priority === 'medium' ? '🟡 Средний' : '🟢 Низкий'}
                          </span>
                          {record.category && (
                            <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-300">
                              {record.category}
                            </span>
                          )}
                        </div>
                        {record.dueDate && (
                          <p className="text-xs text-gray-500 mt-2">
                            Срок: {new Date(record.dueDate).toLocaleDateString('ru-RU')}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRecord(record.id);
                        }}
                        className="text-red-500 hover:text-red-700 text-lg ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordsView;
