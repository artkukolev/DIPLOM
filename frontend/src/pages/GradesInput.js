import React, { useState, useEffect } from 'react';
import { studentsAPI, gradesAPI } from '../api/client';

export default function GradesInput() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [notes, setNotes] = useState('');
  const [studentGrades, setStudentGrades] = useState([]);
  const [average, setAverage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('add');

  const subjects = [
    'Русский язык',
    'Математика',
    'История',
    'Английский язык',
    'Информатика',
    'Физкультура'
  ];

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      fetchStudentGrades();
      fetchAverage();
    }
  }, [selectedStudent]);

  const fetchStudents = async () => {
    try {
      const response = await studentsAPI.getAll();
      setStudents(response.data || []);
    } catch (err) {
      setError('Ошибка при загрузке студентов');
    }
  };

  const fetchStudentGrades = async () => {
    try {
      const response = await gradesAPI.getByStudent(selectedStudent);
      setStudentGrades(response.data || []);
    } catch (err) {
      setStudentGrades([]);
    }
  };

  const fetchAverage = async () => {
    try {
      const response = await gradesAPI.getAverage(selectedStudent);
      setAverage(response.data);
    } catch (err) {
      setAverage(null);
    }
  };

  const handleAddGrade = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!selectedStudent || !subject || !grade) {
        throw new Error('Заполните все обязательные поля');
      }

      const gradeValue = parseInt(grade);
      if (gradeValue < 1 || gradeValue > 5) {
        throw new Error('Оценка должна быть от 1 до 5');
      }

      await gradesAPI.addGrade({
        studentId: selectedStudent,
        subject,
        grade: gradeValue,
        date: new Date().toISOString().split('T')[0],
        notes
      });

      setSuccess('✓ Оценка добавлена');
      setSubject('');
      setGrade('');
      setNotes('');
      fetchStudentGrades();
      fetchAverage();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGrade = async (gradeId) => {
    if (window.confirm('Удалить оценку?')) {
      try {
        await gradesAPI.deleteGrade(gradeId);
        setSuccess('✓ Оценка удалена');
        fetchStudentGrades();
        fetchAverage();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Ошибка при удалении: ' + err.message);
      }
    }
  };

  const getGradeColor = (gradeValue) => {
    if (gradeValue === 5) return 'text-green-600 bg-green-50';
    if (gradeValue === 4) return 'text-blue-600 bg-blue-50';
    if (gradeValue === 3) return 'text-yellow-600 bg-yellow-50';
    if (gradeValue === 2) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
          {success}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === 'add'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-600'
          }`}
        >
          ➕ Добавить оценку
        </button>
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === 'list'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-600'
          }`}
        >
          📋 Оценки студента
        </button>
      </div>

      {/* Add Grade Form */}
      {activeTab === 'add' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleAddGrade} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Студент</label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              >
                <option value="">-- Выберите студента --</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.lastName} {s.firstName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Предмет</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              >
                <option value="">-- Выберите предмет --</option>
                {subjects.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Оценка (1-5)</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              >
                <option value="">-- Выберите оценку --</option>
                {[5, 4, 3, 2, 1].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Примечание</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Дополнительные комментарии (опционально)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                rows="2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? 'Сохранение...' : 'Добавить оценку'}
            </button>
          </form>
        </div>
      )}

      {/* Student Grades List */}
      {activeTab === 'list' && (
        <div className="space-y-6">
          {selectedStudent && (
            <>
              {/* Average */}
              {average && (
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-900 mb-4">📊 Статистика</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <div className="text-3xl font-bold text-purple-600">{average.average || 0}</div>
                      <div className="text-sm text-gray-600">Средняя оценка</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600">{average.total || 0}</div>
                      <div className="text-sm text-gray-600">Всего оценок</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-600">{average.maxGrade || 0}</div>
                      <div className="text-sm text-gray-600">Лучшая</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-red-600">{average.minGrade || 0}</div>
                      <div className="text-sm text-gray-600">Худшая</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grades List */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">📝 Оценки</h3>
                {studentGrades.length > 0 ? (
                  studentGrades.map(g => (
                    <div
                      key={g.id}
                      className="bg-white p-4 rounded-lg shadow flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className={`text-4xl font-bold px-3 py-1 rounded ${getGradeColor(g.grade)}`}>
                            {g.grade}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{g.subject}</h4>
                            <p className="text-sm text-gray-600">
                              {new Date(g.date).toLocaleDateString('ru-RU')}
                            </p>
                            {g.notes && <p className="text-sm text-gray-500 mt-1">{g.notes}</p>}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteGrade(g.id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-600">
                    Оценки не добавлены
                  </div>
                )}
              </div>
            </>
          )}

          {!selectedStudent && (
            <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-600">
              Выберите студента, чтобы увидеть его оценки
            </div>
          )}
        </div>
      )}
    </div>
  );
}
