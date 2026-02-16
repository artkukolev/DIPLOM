import React, { useState, useEffect } from 'react';
import api from '../api/client';

export default function TimetableView() {
  const [timetable, setTimetable] = useState([]);
  const [selectedClass, setSelectedClass] = useState('10А');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  const periods = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    fetchTimetable();
  }, [selectedClass]);

  const fetchTimetable = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/timetable/class/${selectedClass}`);
      setTimetable(response.data.data || []);
    } catch (err) {
      setError('Ошибка при загрузке расписания: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getLesson = (day, period) => {
    return timetable.find(l => l.dayOfWeek === day && l.period === period);
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Загрузка расписания...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Class Selector */}
      <div className="bg-white p-6 rounded-lg shadow">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Класс</label>
        <input
          type="text"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="10А"
        />
        <button
          onClick={fetchTimetable}
          className="mt-3 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
        >
          Обновить
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Timetable Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Период</th>
                {days.map(day => (
                  <th key={day} className="px-4 py-3 text-center font-semibold text-sm sm:text-base">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map(period => (
                <tr key={period} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-700 bg-gray-50">{period} урок</td>
                  {days.map(day => {
                    const lesson = getLesson(day, period);
                    return (
                      <td
                        key={`${day}-${period}`}
                        className="px-4 py-3 border-l border-gray-200 text-sm"
                      >
                        {lesson ? (
                          <div className="space-y-1">
                            <div className="font-semibold text-gray-900">{lesson.subject}</div>
                            {lesson.teacher && (
                              <div className="text-gray-600 text-xs">👨‍🏫 {lesson.teacher}</div>
                            )}
                            {lesson.classroom && (
                              <div className="text-gray-600 text-xs">🏫 {lesson.classroom}</div>
                            )}
                            {lesson.startTime && lesson.endTime && (
                              <div className="text-gray-500 text-xs">⏰ {lesson.startTime}-{lesson.endTime}</div>
                            )}
                          </div>
                        ) : (
                          <div className="text-gray-400 italic">-</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      {timetable.length > 0 && (
        <div className="bg-gradient-to-r from-lavender-light to-pink-100 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-gray-900 mb-2">📊 Информация</h3>
          <p className="text-gray-700">
            Всего уроков: <span className="font-bold text-purple-600">{timetable.length}</span>
          </p>
          <p className="text-gray-700">
            Уроков в день: <span className="font-bold text-purple-600">{Math.ceil(timetable.length / 5)}</span>
          </p>
        </div>
      )}
    </div>
  );
}
