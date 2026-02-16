import React, { useState, useEffect } from 'react';
import api from '../api/client';

const statusColors = {
  present: { bg: 'bg-green-100', text: 'text-green-700', label: 'Присутствует' },
  absent: { bg: 'bg-red-100', text: 'text-red-700', label: 'Отсутствует' },
  late: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Опоздание' },
  excused: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Уважительная' }
};

export default function AttendanceMarking() {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, [selectedDate]);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/students');
      setStudents(response.data.data || response.data || []);
    } catch (err) {
      setError('Ошибка при загрузке студентов');
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await api.get(`/attendance/date/${selectedDate}`);
      const attendanceData = {};
      (response.data.data || []).forEach(record => {
        attendanceData[record.studentId] = record.status;
      });
      setAttendance(attendanceData);
    } catch (err) {
      // Игнорируем ошибку при отсутствии данных
    }
  };

  const handleStatusChange = async (studentId, status) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/attendance/mark', {
        studentId,
        date: selectedDate,
        status
      });

      setAttendance(prev => ({
        ...prev,
        [studentId]: status
      }));

      setSuccess('Посещаемость отмечена');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Ошибка при сохранении: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async (studentId) => {
    try {
      const response = await api.get(`/attendance/stats/${studentId}`);
      setStats(prev => ({
        ...prev,
        [studentId]: response.data.data
      }));
    } catch (err) {
      console.error('Ошибка статистики:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Date Selector */}
      <div className="bg-white p-6 rounded-lg shadow">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Дата</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
          ✓ {success}
        </div>
      )}

      {/* Students List */}
      <div className="space-y-3">
        {students.map(student => (
          <div
            key={student.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {student.lastName} {student.firstName} {student.patronymic || ''}
                </h3>
                <p className="text-sm text-gray-600">Класс: {student.class || student.grade}</p>
              </div>

              {/* Status Buttons */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(statusColors).map(([status, colors]) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(student.id, status)}
                    disabled={loading}
                    className={`px-3 py-2 rounded-lg font-medium transition text-sm ${
                      attendance[student.id] === status
                        ? `${colors.bg} ${colors.text} ring-2 ring-purple-500`
                        : `${colors.bg} ${colors.text} hover:opacity-75`
                    } disabled:opacity-50`}
                  >
                    {colors.label}
                  </button>
                ))}
              </div>

              {/* Stats Button */}
              <button
                onClick={() => fetchStatistics(student.id)}
                className="text-purple-600 hover:text-purple-800 font-semibold text-sm"
              >
                📊 Статистика
              </button>
            </div>

            {/* Statistics */}
            {stats[student.id] && (
              <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{stats[student.id].total || 0}</div>
                  <div className="text-gray-600">Всего</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">{stats[student.id].present || 0}</div>
                  <div className="text-gray-600">Присут.</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-red-600">{stats[student.id].absent || 0}</div>
                  <div className="text-gray-600">Отсут.</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-yellow-600">{stats[student.id].late || 0}</div>
                  <div className="text-gray-600">Опозд.</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-600">{stats[student.id].excused || 0}</div>
                  <div className="text-gray-600">Уважит.</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {students.length === 0 && (
        <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-600">
          Студенты не найдены
        </div>
      )}
    </div>
  );
}
