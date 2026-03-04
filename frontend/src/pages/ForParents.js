import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForParents() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

  const documents = [
    {
      id: 1,
      title: 'Устав школы',
      description: 'Основной документ, регулирующий деятельность школы',
      format: 'PDF',
      icon: '📋',
    },
    {
      id: 2,
      title: 'Положение для родителей',
      description: 'Права и обязанности родителей в нашей школе',
      format: 'PDF',
      icon: '📄',
    },
    {
      id: 3,
      title: 'Учебный план',
      description: 'Структура и содержание образовательной программы',
      format: 'PDF',
      icon: '📚',
    },
    {
      id: 4,
      title: 'График праздничных дней',
      description: 'Расписание выходных и каникул на прямой год',
      format: 'PDF',
      icon: '🎉',
    },
    {
      id: 5,
      title: 'Памятка по безопасности',
      description: 'Советы и рекомендации по безопасности детей',
      format: 'PDF',
      icon: '🛡️',
    },
    {
      id: 6,
      title: 'Программа развития',
      description: 'Приоритеты и цели развития школы',
      format: 'PDF',
      icon: '🎯',
    },
  ];

  const contacts = [
    {
      id: 1,
      title: 'Директор школы',
      name: 'Василий Владимирович Учебный',
      email: 'director@school.ru',
      phone: '+7 (495) 123-45-67',
      hours: 'Пн-Пт: 9:00-17:00',
    },
    {
      id: 2,
      title: 'Завуч по учебной работе',
      name: 'Ирина Ивановна Преподавателева',
      email: 'learning@school.ru',
      phone: '+7 (495) 123-45-68',
      hours: 'Пн-Пт: 8:30-16:30',
    },
    {
      id: 3,
      title: 'Педагог-психолог',
      name: 'Светлана Сергеевна Психолог',
      email: 'psychology@school.ru',
      phone: '+7 (495) 123-45-69',
      hours: 'Пн-Пт: 10:00-18:00',
    },
    {
      id: 4,
      title: 'Социальный педагог',
      name: 'Елена Петровна Социальная',
      email: 'social@school.ru',
      phone: '+7 (495) 123-45-70',
      hours: 'Пн-Пт: 9:00-17:00',
    },
  ];

  const tips = [
    {
      id: 1,
      category: '📚 Обучение',
      title: 'Помощь в домашних заданиях',
      items: [
        'Создайте благоприятные условия для учёбы дома (тихое место, хорошее освещение)',
        'Проверяйте домашнее задание, но не решайте его сами',
        'Поддерживайте мотивацию ребёнка к обучению',
        'Посещайте родительские собрания и консультации',
      ],
    },
    {
      id: 2,
      category: '🏃 Здоровье и спорт',
      title: 'Здоровый образ жизни',
      items: [
        'Обеспечьте достаточный сон (8-10 часов в день)',
        'Поощряйте физическую активность и занятия спортом',
        'Следите за правильным питанием',
        'Ограничивайте время использования гаджетов',
      ],
    },
    {
      id: 3,
      category: '💬 Общение',
      title: 'Взаимоотношения с ребёнком',
      items: [
        'Слушайте ребёнка активно и без осуждения',
        'Проводите качественное время всей семьёй',
        'Помогайте преодолевать конфликты со сверстниками',
        'Обсуждайте его интересы и проблемы',
      ],
    },
    {
      id: 4,
      category: '🛡️ Безопасность',
      title: 'Безопасность в школе и дома',
      items: [
        'Научите ребёнка правилам дорожного движения',
        'Обсуждайте вопросы безопасности в интернете',
        'Знайте, где находится ваш ребёнок',
        'Установите доверительные отношения для открытого общения',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">👨‍👩‍👧‍👦 Для родителей</h1>
              <p className="text-purple-100 mt-1">Важная информация, документы и советы</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              ← Назад
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            {[
              { id: 'info', label: '📋 Информация', icon: '📋' },
              { id: 'docs', label: '📄 Документы', icon: '📄' },
              { id: 'contacts', label: '☎️ Контакты', icon: '☎️' },
              { id: 'tips', label: '💡 Советы', icon: '💡' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">ℹ️ Информация о школе</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                  <h3 className="text-lg font-bold text-purple-900 mb-3">📍 Адрес</h3>
                  <p className="text-gray-700">г. Москва, ул. Образования, д. 42</p>
                </div>

                <div className="p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                  <h3 className="text-lg font-bold text-purple-900 mb-3">🕐 Время работы</h3>
                  <p className="text-gray-700">Пн-Пт: 8:00-17:00</p>
                  <p className="text-gray-700">Сб-Вс: Выходной</p>
                </div>

                <div className="p-6 bg-pink-50 rounded-xl border-2 border-pink-200">
                  <h3 className="text-lg font-bold text-pink-900 mb-3">👥 Численность</h3>
                  <p className="text-gray-700">Учащихся: 650 человек</p>
                  <p className="text-gray-700">Учителей: 45 человек</p>
                </div>

                <div className="p-6 bg-pink-50 rounded-xl border-2 border-pink-200">
                  <h3 className="text-lg font-bold text-pink-900 mb-3">🎓 Лицензия</h3>
                  <p className="text-gray-700">Лицензия: 77ЛО1 0001234567</p>
                  <p className="text-gray-700">Аккредитация: Есть</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-2 border-purple-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📌 Миссия школы</h3>
                <p className="text-gray-700 leading-relaxed">
                  Создание условий для личностного развития каждого ученика, формирование
                  компетентной, творческой личности, готовой к жизни в современном
                  обществе и её активному участию в социально-экономических процессах.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">📄 Документы школы</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-6 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{doc.icon}</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {doc.format}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{doc.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{doc.description}</p>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition">
                    📥 Скачать
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">☎️ Контакты администрации</h2>

            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-6 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{contact.title}</h3>
                      <p className="text-purple-600 font-semibold mt-1">{contact.name}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-gray-700">
                    <p>
                      <strong>📞 Телефон:</strong>{' '}
                      <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                        {contact.phone}
                      </a>
                    </p>
                    <p>
                      <strong>📧 Email:</strong>{' '}
                      <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                        {contact.email}
                      </a>
                    </p>
                    <p>
                      <strong>🕐 Время приёма:</strong> {contact.hours}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-300">
              <h3 className="text-lg font-bold text-yellow-900 mb-3">⚠️ Горячая линия</h3>
              <p className="text-gray-700 mb-3">
                Для срочных вопросов и жалоб: <strong>+7 (495) 999-88-77</strong>
              </p>
              <p className="text-gray-700 text-sm">
                Доступна ежедневно с 7:00 до 20:00 (кроме выходных)
              </p>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-6">
            {tips.map((section) => (
              <div key={section.id} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">{section.category.split(' ')[0]}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                    <p className="text-gray-600">{section.category}</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-lg">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-lg p-8 border-2 border-purple-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💬 Чем мы можем помочь</h3>
              <p className="text-gray-700 mb-4">
                Наша школа стремится к полному взаимодействию с родителями. Мы открыты для
                вопросов, предложений и конструктивной критики.
              </p>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition">
                👉 Обратиться в школу
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
