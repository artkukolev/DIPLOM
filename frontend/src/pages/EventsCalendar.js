import React, { useState, useEffect } from 'react';
import { eventsAPI } from '../api/client';

export default function EventsCalendar() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('event');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const eventTypes = [
    { value: 'exam', label: '📝 Экзамен' },
    { value: 'meeting', label: '👥 Собрание' },
    { value: 'holiday', label: '🎉 Праздник' },
    { value: 'event', label: '📅 Событие' },
  ];

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const response = await eventsAPI.getAll();
      setEvents(response.data || []);
    } catch (err) {
      setError('Ошибка при загрузке событий');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!title || !date) {
      setError('Заполните название и дату');
      return;
    }

    setLoading(true);
    try {
      const newEvent = await eventsAPI.create({
        title,
        date,
        time: time || '12:00',
        description,
        type,
      });
      setEvents([newEvent.data, ...events]);
      setTitle('');
      setDate('');
      setTime('');
      setDescription('');
      setType('event');
      setSuccess('✓ Событие добавлено');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Ошибка при добавлении события');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Удалить событие?')) {
      try {
        await eventsAPI.delete(id);
        setEvents(events.filter((e) => e.id !== id));
        setSuccess('✓ Событие удалено');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Ошибка при удалении события');
      }
    }
  };

  const getEventIcon = (eventType) => {
    const icons = {
      exam: '📝',
      meeting: '👥',
      holiday: '🎉',
      event: '📅',
    };
    return icons[eventType] || '📅';
  };

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">📅 Календарь мероприятий</h1>
          <p className="text-purple-100 mt-1">Важные даты и события школы</p>
        </div>
      </div>

      {/* Alerts */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-4">
            ❌ {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 mb-4">
            {success}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Добавить событие</h2>
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="Название события"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тип события
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    {eventTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата *
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Время
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="Подробное описание"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Добавление...' : '➕ Добавить'}
                </button>
              </form>
            </div>
          </div>

          {/* Events List */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">
                Предстоящие события ({sortedEvents.length})
              </h2>

              {sortedEvents.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Нет добавленных событий
                </p>
              ) : (
                <div className="space-y-3">
                  {sortedEvents.map((event) => {
                    const eventDate = new Date(event.date);
                    const isUpcoming = eventDate > new Date();

                    return (
                      <div
                        key={event.id}
                        className={`p-4 rounded-xl border-2 transition ${
                          isUpcoming
                            ? 'border-purple-200 bg-purple-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">
                                {getEventIcon(event.type)}
                              </span>
                              <h3 className="font-bold text-lg">{event.title}</h3>
                            </div>
                            {event.description && (
                              <p className="text-gray-600 text-sm mb-2">
                                {event.description}
                              </p>
                            )}
                            <div className="flex gap-4 text-sm text-gray-600">
                              <span>
                                📅{' '}
                                {eventDate.toLocaleDateString('ru-RU', {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </span>
                              {event.time && <span>🕐 {event.time}</span>}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
